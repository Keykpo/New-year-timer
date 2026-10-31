#!/usr/bin/env node
'use strict';

/**
 * Offline check of vercel.json: emulates the legacy `builds` + `routes` config against the
 * files on disk and verifies that
 *   - every sitemap URL resolves to a deployed file (200),
 *   - every internal link/asset in the deployed HTML resolves (directly or via one redirect),
 *   - expected redirects happen,
 *   - private files (server, admin scripts, SEO sources) are NOT deployed.
 *
 * It is an approximation of Vercel's router, not a replacement for checking a preview deploy.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://newyeartimers.com';
const vercel = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));

function globToRegex(glob) {
    let re = '';
    for (let i = 0; i < glob.length; i++) {
        const ch = glob[i];
        if (ch === '*' && glob[i + 1] === '*' && glob[i + 2] === '/') { re += '(?:.*/)?'; i += 2; }
        else if (ch === '*') re += '[^/]*';
        else re += ch.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
    }
    return new RegExp(`^${re}$`);
}

const staticGlobs = vercel.builds.filter(b => b.use === '@vercel/static').map(b => globToRegex(b.src));
const lambdaGlobs = vercel.builds.filter(b => b.use !== '@vercel/static').map(b => globToRegex(b.src));
const isDeployed = rel => staticGlobs.some(r => r.test(rel)) && fs.existsSync(path.join(ROOT, rel));

function route(urlPath) {
    for (const r of vercel.routes) {
        const m = new RegExp(`^${r.src}$`).exec(urlPath);
        if (!m) continue;
        const sub = s => s.replace(/\$(\d)/g, (_, n) => m[+n] || '');
        if (r.status && r.headers && r.headers.Location) return { status: r.status, location: sub(r.headers.Location) };
        if (r.dest) {
            const dest = decodeURIComponent(sub(r.dest)).replace(/^\//, '');
            if (lambdaGlobs.some(g => g.test(dest) || g.test(dest + '.js'))) return { status: 200, file: dest, fn: true };
            return isDeployed(dest) ? { status: 200, file: dest } : { status: 404, file: dest };
        }
    }
    return { status: 404 };
}

function resolve(urlPath, hops = 0) {
    const r = route(urlPath);
    if (r.status >= 300 && r.status < 400 && hops < 3) return { ...resolve(r.location, hops + 1), redirectedFrom: urlPath };
    return r;
}

const failures = [];
const expect = (cond, msg) => { if (!cond) failures.push(msg); };

// 1. Sitemap URLs must be 200 without redirects
const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
for (const loc of locs) {
    const r = route(new URL(loc).pathname);
    expect(r.status === 200, `sitemap URL ${loc} -> ${r.status}${r.location ? ' ' + r.location : ''}`);
}

// 2. Internal links and assets of every deployed HTML page
let checkedLinks = 0;
const htmlFiles = [];
(function walk(dir) {
    for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
        const rel = dir ? `${dir}/${e.name}` : e.name;
        if (e.isDirectory()) { if (!['node_modules', '.git', 'seo'].includes(e.name)) walk(rel); }
        else if (rel.endsWith('.html') && isDeployed(rel)) htmlFiles.push(rel);
    }
})('');
for (const file of htmlFiles) {
    const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
    const pageUrl = new URL('/' + file.replace(/index\.html$/, ''), SITE);
    for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
        const ref = m[1];
        if (/^(mailto:|javascript:|data:|#)/.test(ref)) continue;
        const u = new URL(ref, pageUrl);
        if (u.origin !== SITE || u.pathname.startsWith('/api/')) continue;
        checkedLinks++;
        const r = resolve(u.pathname);
        expect(r.status === 200, `${file}: ${ref} -> ${r.status}`);
    }
}

// 3. Redirects
for (const [from, to] of [['/blog', '/blog/'], ['/es', '/es/'], ['/countdown', '/countdown/'],
    ['/countdown/japan', '/countdown/japan/'], ['/es/cuenta-regresiva', '/es/cuenta-regresiva/'], ['/es/cuenta-regresiva/mexico', '/es/cuenta-regresiva/mexico/']]) {
    const r = route(from);
    expect(r.status === 308 && r.location === to, `redirect ${from} -> expected 308 ${to}, got ${r.status} ${r.location || ''}`);
}

// 4. Must be served
for (const p of ['/', '/index.html', '/es/', '/countdown/', '/robots.txt', '/sitemap.xml', '/ads.txt', '/style.css', '/script.js',
    '/config.js', '/countdown.js', '/countdown.css', '/sw.js', '/worker.js', '/og-image.jpg', '/favicon.svg', '/about.html',
    '/privacy-policy.html', '/.well-known/security.txt', '/b454da5080b2d036562b141ca976ea5f.html']) {
    expect(route(p).status === 200, `${p} should be served (got ${route(p).status})`);
}

// 5. Must NOT be served
for (const p of ['/server.js', '/add-100-more-wishes.js', '/delete-last-100-wishes.js', '/update-empty-wishes.js', '/package.json',
    '/seo/build.js', '/seo/manifest.json', '/firebase-rules-test.json', '/index.html.backup', '/SEO_IMPLEMENTATION_REPORT.md', '/countdown/does-not-exist/']) {
    expect(route(p).status === 404, `${p} must not be served (got ${route(p).status})`);
}

console.log(`sitemap URLs checked: ${locs.length}`);
console.log(`HTML pages checked: ${htmlFiles.length}, internal links/assets checked: ${checkedLinks}`);
if (failures.length) {
    failures.forEach(f => console.error('FAIL ' + f));
    console.error(`\n${failures.length} failure(s)`);
    process.exit(1);
}
console.log('route checks OK');
