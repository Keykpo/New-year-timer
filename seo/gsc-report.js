#!/usr/bin/env node
'use strict';

/**
 * Search Console report from CSV exports (no API credentials needed).
 *
 * In Search Console > Performance > Search results, set the date range, open the "Pages"
 * tab and click Export > Download CSV. Unzip and pass "Pages.csv":
 *
 *   node seo/gsc-report.js path/to/Pages.csv [path/to/previous/Pages.csv]
 *
 * Prints: totals, pages in the sitemap with no impressions, top pages, metrics per language
 * section, and (with a previous export) the pages gaining or losing the most clicks.
 * Numbers come only from the files you pass in; nothing is estimated.
 */

const fs = require('fs');
const path = require('path');

function parseCsv(text) {
    const rows = [];
    let row = [], cell = '', quoted = false;
    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (quoted) {
            if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
            else if (ch === '"') quoted = false;
            else cell += ch;
        } else if (ch === '"') quoted = true;
        else if (ch === ',') { row.push(cell); cell = ''; }
        else if (ch === '\n' || ch === '\r') {
            if (ch === '\r' && text[i + 1] === '\n') i++;
            row.push(cell); rows.push(row); row = []; cell = '';
        } else cell += ch;
    }
    if (cell || row.length) { row.push(cell); rows.push(row); }
    return rows.filter(r => r.some(c => c.trim()));
}

function load(file) {
    const [header, ...rows] = parseCsv(fs.readFileSync(file, 'utf8').replace(/^﻿/, ''));
    // Column order in GSC exports: page, clicks, impressions, CTR, position (header text is localized)
    return new Map(rows.map(r => [r[0], {
        clicks: Number(r[1]) || 0,
        impressions: Number(r[2]) || 0,
        position: Number(String(r[4]).replace(',', '.')) || 0
    }]));
}

const [current, previous] = process.argv.slice(2);
if (!current) {
    console.error('Usage: node seo/gsc-report.js Pages.csv [previous-Pages.csv]');
    process.exit(1);
}

const data = load(current);
const sitemap = fs.readFileSync(path.join(__dirname, '..', 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

const sum = (rows, k) => rows.reduce((n, r) => n + r[k], 0);
const all = [...data.values()];
const clicks = sum(all, 'clicks');
const impressions = sum(all, 'impressions');
console.log(`Pages with data: ${data.size} | clicks: ${clicks} | impressions: ${impressions} | CTR: ${impressions ? (100 * clicks / impressions).toFixed(2) : 0}%`);

const sections = { 'EN home + blog': u => !/\/(es|countdown)\//.test(u), 'EN countdown': u => u.includes('/countdown/') && !u.includes('/es/'), 'ES': u => u.includes('/es/') };
console.log('\nBy section:');
for (const [name, test] of Object.entries(sections)) {
    const rows = [...data].filter(([u]) => test(new URL(u).pathname + '/')).map(([, v]) => v);
    console.log(`  ${name.padEnd(16)} pages ${String(rows.length).padStart(4)}  clicks ${String(sum(rows, 'clicks')).padStart(6)}  impressions ${String(sum(rows, 'impressions')).padStart(8)}`);
}

const noImpressions = urls.filter(u => !data.has(u) || data.get(u).impressions === 0);
console.log(`\nSitemap URLs without impressions in this period: ${noImpressions.length} of ${urls.length}`);
noImpressions.slice(0, 40).forEach(u => console.log('  ' + u));
if (noImpressions.length > 40) console.log(`  ... and ${noImpressions.length - 40} more`);

console.log('\nTop 15 pages by clicks:');
[...data].sort((a, b) => b[1].clicks - a[1].clicks).slice(0, 15)
    .forEach(([u, v]) => console.log(`  ${String(v.clicks).padStart(6)} clicks  ${String(v.impressions).padStart(8)} impr  pos ${v.position.toFixed(1).padStart(5)}  ${u}`));

if (previous) {
    const before = load(previous);
    const deltas = [...new Set([...data.keys(), ...before.keys()])]
        .map(u => ({ u, d: (data.get(u) || { clicks: 0 }).clicks - (before.get(u) || { clicks: 0 }).clicks }))
        .filter(x => x.d !== 0)
        .sort((a, b) => b.d - a.d);
    console.log('\nBiggest gains (clicks):');
    deltas.slice(0, 10).filter(x => x.d > 0).forEach(x => console.log(`  +${x.d}  ${x.u}`));
    console.log('\nBiggest losses (clicks):');
    deltas.slice(-10).reverse().filter(x => x.d < 0).forEach(x => console.log(`  ${x.d}  ${x.u}`));
}
