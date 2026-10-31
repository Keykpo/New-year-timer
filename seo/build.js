#!/usr/bin/env node
'use strict';

/**
 * SEO build: generates localized pages, programmatic country pages, the sitemap and
 * validates the result. No dependencies; run with `npm run seo:build`.
 *
 *   node seo/build.js           build + validate (exit 1 on errors)
 *   node seo/build.js --dry     validate only, write nothing
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const vm = require('vm');
const { execFileSync } = require('child_process');

const config = require('./config');
const countries = require('./data/countries');
const time = require('./lib/time');
const { esc, stripTags } = require('./lib/html');
const locales = { en: require('./locales/en'), es: require('./locales/es') };

const ROOT = path.resolve(__dirname, '..');
const DRY = process.argv.includes('--dry');
const YEAR = config.year;
const LANGS = Object.keys(config.languages);
const WORLD_LAST_INHABITED = -11 * 60;

const errors = [];
const warnings = [];
const pages = []; // { lang, key, path, file, html, alternates: {lang: path}, title, description }

const abs = p => config.siteUrl + p;
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const jsonLd = obj => `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2).replace(/</g, '\\u003c')}\n</script>`;

// ---------------------------------------------------------------------------
// 1. Dataset validation
// ---------------------------------------------------------------------------

function validateDataset() {
    const seen = new Set();
    const slugs = Object.fromEntries(LANGS.map(l => [l, new Map()]));
    for (const c of countries) {
        if (seen.has(c.id)) errors.push(`Duplicate country id: ${c.id}`);
        seen.add(c.id);
        if (!['published', 'draft', 'archived'].includes(c.status)) errors.push(`${c.id}: invalid status ${c.status}`);
        if (!c.zones || !c.zones.length) errors.push(`${c.id}: no zones`);
        for (const [tz] of c.zones || []) {
            try { time.offsetMinutes(tz, Date.UTC(YEAR, 0, 1)); } catch (e) { errors.push(`${c.id}: unknown time zone ${tz}`); }
        }
        for (const l of LANGS) {
            if (!c.name || !c.name[l]) errors.push(`${c.id}: missing name.${l}`);
            const s = c.slug && c.slug[l];
            if (!s || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s)) errors.push(`${c.id}: invalid slug.${l} "${s}"`);
            if (c.status === 'published') {
                if (slugs[l].has(s)) errors.push(`Duplicate ${l} slug "${s}" (${slugs[l].get(s)} / ${c.id})`);
                slugs[l].set(s, c.id);
            }
        }
    }
}

// ---------------------------------------------------------------------------
// 2. Time zone model
// ---------------------------------------------------------------------------

const active = countries.filter(c => c.status !== 'archived');
const published = active.filter(c => c.status === 'published');

function zoneModel(tz) {
    const instant = time.newYearInstant(tz, YEAR);
    const offset = time.offsetMinutes(tz, instant);
    const std = time.standardOffset(tz, YEAR - 1);
    const summer = Math.max(time.offsetMinutes(tz, Date.UTC(YEAR - 1, 0, 15)), time.offsetMinutes(tz, Date.UTC(YEAR - 1, 6, 15)));
    return { tz, instant, offset, offsetLabel: time.formatOffset(offset), dst: offset > std, stdLabel: time.formatOffset(std), observesDst: summer !== std };
}

const world = active.map(c => ({ c, zones: c.zones.map(([tz, en, es]) => ({ ...zoneModel(tz), city: { en, es } })) }));
const worldOffsets = [...new Set(world.flatMap(w => w.zones.map(z => z.offset)))].sort((a, b) => b - a);
const WORLD_FIRST = worldOffsets[0];

// "Sydney / Melbourne / Canberra" -> "Sydney", "New York (Eastern)" -> "New York"
const shortCity = label => label.replace(/\s*\(.*\)$/, '').split(' / ')[0];

function countryHref(c, lang) {
    return c.status === 'published' ? config.languages[lang].country(c.slug[lang]) : null;
}

function inPhrase(c, lang) {
    if (c.in && c.in[lang]) return c.in[lang];
    return (lang === 'es' ? 'en ' : 'in ') + c.name[lang];
}

/** Countries (any zone) at a given offset, published first, capped. */
function countriesAtOffset(offset, lang, excludeId, cap) {
    const list = world
        .filter(w => w.c.id !== excludeId && w.zones.some(z => z.offset === offset))
        .map(w => {
            // Multi-zone countries: name the region that matches this offset, e.g. "Ecuador (Galápagos Islands)"
            const partial = new Set(w.zones.map(z => z.offset)).size > 1;
            const region = partial ? ` (${shortCity(w.zones.find(z => z.offset === offset).city[lang])})` : '';
            return { name: w.c.name[lang] + region, href: countryHref(w.c, lang) };
        })
        .sort((a, b) => (!!b.href - !!a.href) || a.name.localeCompare(b.name, lang));
    if (list.length > cap) {
        const rest = list.length - cap;
        return [...list.slice(0, cap), { name: locales[lang].ui.more(rest), href: null }];
    }
    return list;
}

function formatUtc(ms, lang) {
    const loc = config.languages[lang].locale;
    const t = time.format(ms, 'UTC', 'en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
    if (lang === 'es') {
        const wd = time.format(ms, 'UTC', loc, { weekday: 'long' });
        const dm = time.format(ms, 'UTC', loc, { day: 'numeric', month: 'long' });
        const yr = time.format(ms, 'UTC', loc, { year: 'numeric' });
        return { time: t, date: `${wd} ${dm} de ${yr}`, short: dm };
    }
    return {
        time: t,
        date: time.format(ms, 'UTC', loc, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
        short: time.format(ms, 'UTC', loc, { month: 'short', day: 'numeric' })
    };
}

function newYearsDay(lang) {
    const ms = Date.UTC(YEAR, 0, 1, 12);
    const loc = config.languages[lang].locale;
    const weekday = time.format(ms, 'UTC', loc, { weekday: 'long' });
    const date = lang === 'es'
        ? `${weekday} 1 de enero de ${YEAR}`
        : time.format(ms, 'UTC', loc, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    return { weekday, date };
}

// ---------------------------------------------------------------------------
// 3. Blog index for contextual "related reading" links
// ---------------------------------------------------------------------------

const blogPosts = fs.readdirSync(path.join(ROOT, 'blog'))
    .filter(f => f.endsWith('.html') && f !== 'index.html')
    .map(f => {
        const html = read(`blog/${f}`);
        const title = stripTags((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || f);
        const article = (html.match(/<article[\s\S]*?<\/article>/) || [html])[0];
        return { file: f, href: `/blog/${f}`, title, text: stripTags(article) };
    });

function relatedPosts(c) {
    const terms = [...new Set([c.name.en, ...(c.blogMatch || [])])];
    return blogPosts
        .map(p => ({ p, score: terms.reduce((n, t) => n + (p.text.split(t).length - 1), 0) }))
        .filter(x => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(x => ({ title: x.p.title, href: x.p.href }));
}

// ---------------------------------------------------------------------------
// 4. Shared layout for generated pages
// ---------------------------------------------------------------------------

function hreflangLinks(alternates) {
    const lines = LANGS.filter(l => alternates[l]).map(l => `    <link rel="alternate" hreflang="${l}" href="${abs(alternates[l])}">`);
    const def = alternates[config.defaultLanguage];
    if (def) lines.push(`    <link rel="alternate" hreflang="x-default" href="${abs(def)}">`);
    return lines.join('\n');
}

function socialMeta(lang, p, alternates) {
    const L = config.languages[lang];
    const others = LANGS.filter(l => l !== lang && alternates[l]).map(l => `    <meta property="og:locale:alternate" content="${config.languages[l].ogLocale}">`);
    return [
        `    <meta property="og:type" content="website">`,
        `    <meta property="og:url" content="${abs(p.path)}">`,
        `    <meta property="og:title" content="${esc(p.ogTitle || p.title)}">`,
        `    <meta property="og:description" content="${esc(p.ogDescription || p.description)}">`,
        `    <meta property="og:image" content="${abs(config.ogImage.url)}">`,
        `    <meta property="og:image:width" content="${config.ogImage.width}">`,
        `    <meta property="og:image:height" content="${config.ogImage.height}">`,
        `    <meta property="og:image:type" content="${config.ogImage.type}">`,
        `    <meta property="og:image:alt" content="${esc(p.imageAlt || p.h1 || p.title)}">`,
        `    <meta property="og:site_name" content="${config.siteName}">`,
        `    <meta property="og:locale" content="${L.ogLocale}">`,
        ...others,
        ``,
        `    <meta name="twitter:card" content="summary_large_image">`,
        `    <meta name="twitter:title" content="${esc(p.ogTitle || p.title)}">`,
        `    <meta name="twitter:description" content="${esc(p.ogDescription || p.description)}">`,
        `    <meta name="twitter:image" content="${abs(config.ogImage.url)}">`,
        `    <meta name="twitter:image:alt" content="${esc(p.imageAlt || p.h1 || p.title)}">`
    ].join('\n');
}

function breadcrumbSchema(items) {
    return {
        '@type': 'BreadcrumbList',
        itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) }))
    };
}

function faqSchema(faq) {
    return {
        '@type': 'FAQPage',
        mainEntity: faq.map(f => ({ '@type': 'Question', name: stripTags(f.q), acceptedAnswer: { '@type': 'Answer', text: stripTags(f.a) } }))
    };
}

function layout(lang, p) {
    const L = config.languages[lang];
    const ui = locales[lang].ui;
    const otherLang = LANGS.find(l => l !== lang && p.alternates[l]);
    const crumbs = p.breadcrumbs.map((b, i) => i === p.breadcrumbs.length - 1
        ? `<li aria-current="page">${esc(b.name)}</li>`
        : `<li><a href="${b.path}">${esc(b.name)}</a></li>`).join('\n                ');

    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
    <!-- Generated by seo/build.js - do not edit by hand -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${config.gaId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${config.gaId}');
    </script>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(p.title)}</title>
    <meta name="description" content="${esc(p.description)}">
    <meta name="robots" content="${p.index === false ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
    <link rel="canonical" href="${abs(p.path)}">
${hreflangLinks(p.alternates)}

${socialMeta(lang, p, p.alternates)}

    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <meta name="theme-color" content="#0f172a">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Orbitron:wght@600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/blog/blog.css">
    <link rel="stylesheet" href="/countdown.css">
    <link rel="stylesheet" href="/ads.css">

    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.adsenseClient}" crossorigin="anonymous"></script>

    ${jsonLd({ '@context': 'https://schema.org', '@graph': p.schema })}
</head>
<body>
    <nav class="blog-nav">
        <div class="nav-container">
            <a href="${L.home}" class="nav-logo">NYT ${YEAR}</a>
            <ul class="nav-links">
                <li><a href="${L.home}">${ui.nav.countdown}</a></li>
                <li><a href="${L.hub}">${ui.nav.byCountry}</a></li>
                <li><a href="/blog/">${ui.nav.blog}</a></li>
            </ul>
            <button class="dark-mode-toggle" id="darkModeToggle" aria-label="Toggle dark mode">&#127769;</button>
        </div>
    </nav>

    <main class="blog-container">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
            <ol>
                ${crumbs}
            </ol>
        </nav>

        <header class="article-header">
            <h1 class="article-title">${esc(p.h1)}</h1>
            <p class="page-lead">${esc(p.lead)}</p>
        </header>
${p.top || ''}
        <div class="ad-slot ad-slot--display" data-ad="COUNTRY_AFTER_COUNTDOWN"></div>

        <article class="article-content">
${p.body}
        </article>
${p.after || ''}
        <div class="ad-slot ad-slot--multiplex" data-ad="COUNTRY_MULTIPLEX"></div>

        <section class="cta-section">
            <h3>${ui.cta.title}</h3>
            <p>${ui.cta.text}</p>
            <a href="${L.home}" class="cta-button">${ui.cta.button}</a>
        </section>
    </main>

    <footer class="blog-footer">
        <div class="footer-content">
            <div class="footer-links">
                <a href="${L.home}">${ui.nav.countdown}</a>
                <a href="${L.hub}">${ui.hub}</a>
                <a href="/blog/">${ui.nav.blog}</a>
                <a href="/about.html">${ui.nav.about}</a>
                <a href="/privacy-policy.html">${ui.privacy}</a>${otherLang ? `
                <a href="${p.alternates[otherLang]}" hreflang="${otherLang}" lang="${otherLang}">${ui.otherLanguage}</a>` : ''}
            </div>
            <p class="footer-copyright">${ui.footerCopy(YEAR - 1)}</p>
        </div>
    </footer>

    <script>
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (localStorage.getItem('darkMode') === 'enabled') document.body.classList.add('dark-mode');
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
        });
    </script>
    <script src="/countdown.js" defer></script>
    <script src="/ads.js" defer></script>
</body>
</html>
`;
}

// The in-content ad goes after the second section (never before the first one).
function sectionsHtml(sections) {
    return sections.map((s, i) => `            <h2>${esc(s.h2)}</h2>\n            ${s.html}` +
        (i === 1 ? '\n\n            <div class="ad-slot ad-slot--inarticle" data-ad="COUNTRY_MIDDLE"></div>' : '')).join('\n\n');
}

function faqHtml(lang, faq) {
    return `\n            <section class="faq-block">\n                <h2>${locales[lang].ui.faq}</h2>\n` +
        faq.map(f => `                <h3>${esc(f.q)}</h3>\n                <p>${esc(f.a)}</p>`).join('\n') +
        `\n            </section>`;
}

function countdownWidget(lang, instant, city, offsetLabel) {
    const ui = locales[lang].ui;
    const iso = new Date(instant).toISOString();
    const unit = (key, label) => `<div class="nyt-unit"><span class="nyt-value" data-unit="${key}">--</span><span class="nyt-label">${label}</span></div>`;
    return `
        <section class="nyt-countdown" data-countdown-target="${iso}" aria-label="${esc(ui.liveCountdown(city))}">
            <p class="nyt-countdown-title">${esc(ui.liveCountdown(city))}</p>
            <div class="nyt-units">
                ${unit('days', ui.days)}${unit('hours', ui.hours)}${unit('minutes', ui.minutes)}${unit('seconds', ui.seconds)}
            </div>
            <p class="nyt-done" hidden>${esc(ui.happyNewYear(YEAR))}</p>
            <p class="nyt-countdown-note">${ui.localMidnight}: ${offsetLabel} · ${ui.yourTime}: <span data-local-time="${iso}">—</span></p>
        </section>
`;
}

// ---------------------------------------------------------------------------
// 5. Country pages
// ---------------------------------------------------------------------------

function buildCountryPage(w, lang) {
    const c = w.c;
    const L = config.languages[lang];
    const loc = locales[lang];
    const zones = w.zones
        .map(z => {
            const u = formatUtc(z.instant, lang);
            return { ...z, city: shortCity(z.city[lang]), cityFull: z.city[lang], utcTime: u.time, utcDate: u.date, utcDateShort: u.short, iso: new Date(z.instant).toISOString() };
        });
    const primary = zones[0];
    const sorted = [...zones].sort((a, b) => b.offset - a.offset);
    const offsetCount = new Set(zones.map(z => z.offset)).size;
    const idx = worldOffsets.indexOf(primary.offset);

    const refs = config.referenceZones[lang]
        .filter(([tz]) => time.offsetMinutes(tz, primary.instant) !== primary.offset)
        .map(([tz, city]) => ({
            city,
            time: time.format(primary.instant, tz, L.locale, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }),
            celebrated: primary.instant >= time.newYearInstant(tz, YEAR)
        }));

    // Nearest neighbouring offset (before/after) that has at least one other country.
    const group = step => {
        for (let i = idx + step; i >= 0 && i < worldOffsets.length; i += step) {
            const list = countriesAtOffset(worldOffsets[i], lang, c.id, 8);
            if (list.length) return { offsetLabel: time.formatOffset(worldOffsets[i]), countries: list };
        }
        return null;
    };
    const ny = newYearsDay(lang);
    const d = {
        year: YEAR,
        newYearsWeekday: ny.weekday,
        c: {
            name: c.name[lang], in: inPhrase(c, lang), traditions: c.traditions && c.traditions[lang],
            // Name as used mid-sentence ("the United States", "el Reino Unido") and at sentence start
            ref: inPhrase(c, lang).replace(/^(in|en) /, ''),
            Ref: (s => s[0].toUpperCase() + s.slice(1))(inPhrase(c, lang).replace(/^(in|en) /, '')),
            multi: offsetCount > 1, offsetCount, zones: sorted, primary,
            first: sorted[0], last: sorted[sorted.length - 1],
            spanHours: time.hours(sorted[0].offset - sorted[sorted.length - 1].offset)
        },
        isWorldFirst: primary.offset === WORLD_FIRST,
        hoursAfterFirst: time.hours(WORLD_FIRST - primary.offset),
        hoursBeforeLast: time.hours(primary.offset - WORLD_LAST_INHABITED),
        earlierCount: world.filter(o => o.c.id !== c.id && o.zones.some(z => z.instant < primary.instant)).length,
        totalCountries: world.length,
        peers: countriesAtOffset(primary.offset, lang, c.id, 12),
        before: group(-1),
        after: group(1),
        refTimes: refs,
        links: { home: L.home, hub: L.hub }
    };
    const content = loc.country(d);
    const related = relatedPosts(c);
    const pagePath = L.country(c.slug[lang]);
    const alternates = Object.fromEntries(LANGS.map(l => [l, config.languages[l].country(c.slug[l])]));
    const breadcrumbs = [
        { name: loc.ui.home, path: L.home },
        { name: loc.ui.hub, path: L.hub },
        { name: content.breadcrumb, path: pagePath }
    ];

    const after = related.length ? `
        <section class="related-articles">
            <h3>${loc.ui.relatedReading}</h3>
            <div class="related-grid">
                ${related.map(r => `<div class="related-card"><a href="${r.href}"${lang !== 'en' ? ' hreflang="en"' : ''}>${esc(r.title)}</a></div>`).join('\n                ')}
            </div>
        </section>
` : '';

    return {
        lang, key: `country:${c.id}`, path: pagePath, alternates, breadcrumbs,
        title: content.title, description: content.description, h1: content.h1, lead: content.lead,
        top: countdownWidget(lang, primary.instant, primary.city, primary.offsetLabel),
        body: sectionsHtml(content.sections) + faqHtml(lang, content.faq),
        after,
        schema: [
            { '@type': 'WebPage', '@id': abs(pagePath), url: abs(pagePath), name: content.title, description: content.description, inLanguage: lang, isPartOf: { '@id': abs('/#website') } },
            breadcrumbSchema(breadcrumbs),
            faqSchema(content.faq)
        ]
    };
}

// ---------------------------------------------------------------------------
// 6. Hub pages (countdown by country)
// ---------------------------------------------------------------------------

function buildHubPage(lang) {
    const L = config.languages[lang];
    const loc = locales[lang];
    const kiribati = published.find(c => c.id === 'kiribati');
    const content = loc.hub({ year: YEAR, firstHref: kiribati ? L.country(kiribati.slug[lang]) : L.hub });

    const rows = worldOffsets.map(o => {
        const entries = world
            .filter(w => w.zones.some(z => z.offset === o))
            .map(w => {
                const multi = new Set(w.zones.map(z => z.offset)).size > 1;
                const z = w.zones.find(x => x.offset === o);
                const label = multi ? `${w.c.name[lang]} (${shortCity(z.city[lang])})` : w.c.name[lang];
                const href = countryHref(w.c, lang);
                return { label, href, sort: w.c.name[lang] };
            })
            .sort((a, b) => a.sort.localeCompare(b.sort, lang));
        const instant = world.flatMap(w => w.zones).find(z => z.offset === o).instant;
        const u = formatUtc(instant, lang);
        const iso = new Date(instant).toISOString();
        return `<tr><td>${time.formatOffset(o)}</td><td>${u.time} · ${u.short}</td><td data-local-time="${iso}">—</td><td>${entries.map(e => e.href ? `<a href="${e.href}">${esc(e.label)}</a>` : esc(e.label)).join(', ')}</td></tr>`;
    }).join('\n                    ');

    const ui = loc.ui;
    const table = `
            <h2>${esc(content.tableTitle)}</h2>
            <p>${esc(content.tableIntro)}</p>
            <div class="table-wrap">
                <table class="tz-table tz-table-world">
                    <thead><tr><th>${ui.utcOffset}</th><th>${ui.midnightUtc}</th><th>${ui.yourTime}</th><th>${ui.countries}</th></tr></thead>
                    <tbody>
                    ${rows}
                    </tbody>
                </table>
            </div>`;

    const cards = published
        .map(c => ({ c, z: world.find(w => w.c.id === c.id).zones[0] }))
        .sort((a, b) => a.c.name[lang].localeCompare(b.c.name[lang], lang))
        .map(({ c, z }) => `<div class="related-card"><a href="${L.country(c.slug[lang])}">${esc(c.name[lang])}</a><span class="card-meta">${z.offsetLabel}</span></div>`)
        .join('\n                ');

    const breadcrumbs = [{ name: ui.home, path: L.home }, { name: ui.hub, path: L.hub }];
    return {
        lang, key: 'hub', path: L.hub,
        alternates: Object.fromEntries(LANGS.map(l => [l, config.languages[l].hub])),
        breadcrumbs,
        title: content.title, description: content.description, h1: content.h1, lead: content.lead,
        body: sectionsHtml(content.sections) + '\n' + table + `

            <h2>${esc(content.gridTitle)}</h2>
            <div class="related-grid country-grid">
                ${cards}
            </div>` + faqHtml(lang, content.faq),
        schema: [
            { '@type': 'CollectionPage', '@id': abs(L.hub), url: abs(L.hub), name: content.title, description: content.description, inLanguage: lang, isPartOf: { '@id': abs('/#website') } },
            breadcrumbSchema(breadcrumbs),
            faqSchema(content.faq)
        ]
    };
}

// ---------------------------------------------------------------------------
// 7. Home pages (index.html is the template; /es/ is derived from it)
// ---------------------------------------------------------------------------

function loadUiTranslations() {
    const src = read('script.js');
    const m = src.match(/const translations = (\{[\s\S]*?\n\});/);
    if (!m) throw new Error('Could not find the translations object in script.js');
    return vm.runInNewContext(`(${m[1]})`);
}

/** Ad placeholder; what renders there (if anything) is configured in /ads.js. */
function adSlot(name, kind) {
    return `            <div class="ad-slot ad-slot--${kind}" data-ad="${name}"></div>`;
}

function renderHomeContent(lang) {
    const ny = newYearsDay(lang);
    return read(`seo/content/home.${lang}.html`)
        .replace(/^\{\{ad ([A-Z0-9_]+) ([a-z]+)\}\}$/gm, (_, name, kind) => adSlot(name, kind))
        .replace(/\{\{year\}\}/g, YEAR)
        .replace(/\{\{prevYear\}\}/g, YEAR - 1)
        .replace(/\{\{newYearsWeekday\}\}/g, ny.weekday)
        .replace(/\{\{newYearsDate\}\}/g, ny.date)
        .replace(/\n$/, '');
}

function extractFaq(html) {
    const faq = [];
    const re = /<h4[^>]*>([\s\S]*?)<\/h4>\s*<p[^>]*>([\s\S]*?)<\/p>/g;
    let m;
    while ((m = re.exec(html))) faq.push({ q: stripTags(m[1]), a: stripTags(m[2]) });
    return faq;
}

function homeHead(lang, alternates) {
    const L = config.languages[lang];
    const h = locales[lang].home({ year: YEAR });
    const p = { ...h, path: L.home };
    return {
        meta: `    <title>${esc(h.title)}</title>
    <meta name="description" content="${esc(h.description)}">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">${lang === 'en' ? `
    <meta name="google-site-verification" content="ohsHQuxUF9k64q8oLQdeSyZ8l-apuZbeNAhdzAYUnVI">` : ''}
    <link rel="canonical" href="${abs(L.home)}">

    <!-- Hreflang: only languages with fully localized pages -->
${hreflangLinks(alternates)}

    <!-- Open Graph / Twitter -->
${socialMeta(lang, p, alternates)}
    <meta name="twitter:site" content="@newyeartimers">`,
        h
    };
}

function homeSchema(lang, h, faq) {
    const L = config.languages[lang];
    return [
        { '@type': 'Organization', '@id': abs('/#organization'), name: config.siteName, url: abs('/') },
        { '@type': 'WebSite', '@id': abs('/#website'), name: config.siteName, url: abs('/'), inLanguage: LANGS, publisher: { '@id': abs('/#organization') } },
        {
            '@type': 'WebApplication', '@id': abs(L.home + '#app'), name: h.appName, url: abs(L.home), description: h.appDescription,
            applicationCategory: 'EntertainmentApplication', operatingSystem: 'Any', browserRequirements: 'Requires JavaScript.',
            inLanguage: lang, isAccessibleForFree: true,
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            publisher: { '@id': abs('/#organization') }
        },
        faqSchema(faq)
    ];
}

function replaceRegion(html, name, content) {
    const re = new RegExp(`(<!-- SEO:${name}:START -->)[\\s\\S]*?([ \\t]*<!-- SEO:${name}:END -->)`);
    if (!re.test(html)) throw new Error(`Region ${name} not found in index.html`);
    return html.replace(re, (_, a, b) => `${a}\n${content}\n${b}`);
}

function footerNav(lang) {
    const L = config.languages[lang];
    const ui = locales[lang].ui;
    const other = LANGS.find(l => l !== lang);
    const style = 'color: #94a3b8; text-decoration: none; margin: 0 0.75rem;';
    return `            <p style="margin-top: 0.75rem; font-size: 0.9rem;">
                <a href="${L.hub}" style="${style}">${ui.hub}</a>
                <a href="${config.languages[other].home}" hreflang="${other}" lang="${other}" style="${style}">${ui.otherLanguage}</a>
            </p>`;
}

function buildHomes() {
    const alternates = Object.fromEntries(LANGS.map(l => [l, config.languages[l].home]));
    const translations = loadUiTranslations();
    let template = read('index.html');
    const out = {};

    for (const lang of LANGS) {
        const content = renderHomeContent(lang);
        const faq = extractFaq(content);
        if (faq.length < 3) errors.push(`home.${lang}: FAQ extraction found only ${faq.length} questions`);
        const { meta, h } = homeHead(lang, alternates);
        let html = template;
        html = replaceRegion(html, 'HEAD-META', meta);
        html = replaceRegion(html, 'HEAD-SCHEMA', `    ${jsonLd({ '@context': 'https://schema.org', '@graph': homeSchema(lang, h, faq) }).replace(/\n/g, '\n    ')}`);
        html = replaceRegion(html, 'CONTENT', content);
        html = replaceRegion(html, 'FOOTER-NAV', footerNav(lang));

        if (lang !== config.defaultLanguage) {
            const t = translations[lang];
            if (!t) throw new Error(`script.js has no UI translations for ${lang}`);
            html = html.replace(/<html lang="[^"]*"[^>]*>/, `<html lang="${lang}" data-page-lang="${lang}">`);
            // Pre-render UI strings so the raw HTML is already in the page language.
            html = html.replace(/(<(\w+)\b[^>]*\sdata-i18n="(\w+)"[^>]*>)([^<]*)(<\/\2>)/g,
                (all, open, tag, key, inner, close) => (t[key] ? `${open}${esc(t[key]).replace(/&quot;/g, '"')}${close}` : all));
            html = html.replace(/(<(\w+)\b[^>]*\sdata-i18n-html="(\w+)"[^>]*>)([\s\S]*?)(<\/\2>)/g,
                (all, open, tag, key, inner, close) => (t[key] ? `${open}\n                    ${t[key]}\n                ${close}` : all));
            // Make relative asset/page URLs absolute so they resolve from /es/.
            html = html.replace(/\s(href|src)="(?!https?:|\/|#|data:|mailto:|javascript:)([^"]+)"/g, ' $1="/$2"');
        } else {
            template = html; // keep regenerated regions for index.html itself
        }

        out[lang] = html;
        pages.push({
            lang, key: 'home', path: config.languages[lang].home,
            file: lang === config.defaultLanguage ? 'index.html' : config.languages[lang].home.replace(/^\//, '') + 'index.html',
            html, alternates, title: h.title, description: h.description
        });
    }
    return out;
}

// ---------------------------------------------------------------------------
// 8. Sitemap with real lastmod values
// ---------------------------------------------------------------------------

const MANIFEST = path.join(__dirname, 'manifest.json');
const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, 'utf8')) : {};
const today = new Date().toISOString().slice(0, 10);

function gitDate(file) {
    try {
        const dirty = execFileSync('git', ['status', '--porcelain', '--', file], { cwd: ROOT, encoding: 'utf8' }).trim();
        if (dirty) return today;
        return execFileSync('git', ['log', '-1', '--format=%cs', '--', file], { cwd: ROOT, encoding: 'utf8' }).trim() || today;
    } catch (e) {
        return today;
    }
}

function lastmodFor(urlPath, content, fallback) {
    const hash = crypto.createHash('sha1').update(content).digest('hex');
    const prev = manifest[urlPath];
    if (prev && prev.hash === hash) return prev.lastmod;
    const lastmod = prev ? today : fallback;
    manifest[urlPath] = { hash, lastmod };
    return lastmod;
}

function buildSitemap() {
    const entries = [];
    for (const p of pages) {
        if (p.index === false) continue;
        entries.push({ loc: p.path, lastmod: lastmodFor(p.path, p.html, p.key === 'home' ? gitDate(p.file) : today), alternates: p.alternates });
    }
    const statics = [{ path: '/about.html', file: 'about.html' }, { path: '/blog/', file: 'blog/index.html' },
        ...blogPosts.map(b => ({ path: b.href, file: `blog/${b.file}` }))];
    for (const s of statics) {
        const html = read(s.file);
        if (/<meta name="robots" content="[^"]*noindex/i.test(html)) continue;
        entries.push({ loc: s.path, lastmod: lastmodFor(s.path, html, gitDate(s.file)) });
    }

    const body = entries.map(e => {
        const alt = e.alternates
            ? LANGS.filter(l => e.alternates[l]).map(l => `\n    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(e.alternates[l])}"/>`).join('') +
              `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(e.alternates[config.defaultLanguage])}"/>`
            : '';
        return `  <url>\n    <loc>${abs(e.loc)}</loc>\n    <lastmod>${e.lastmod}</lastmod>${alt}\n  </url>`;
    }).join('\n');

    return { count: entries.length, xml: `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by seo/build.js - do not edit by hand -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
` };
}

// ---------------------------------------------------------------------------
// 9. Output validation
// ---------------------------------------------------------------------------

function fileForUrl(urlPath) {
    let p = decodeURIComponent(urlPath.split(/[?#]/)[0]);
    if (p.endsWith('/')) p += 'index.html';
    return p.replace(/^\//, '');
}

function validateOutput(written) {
    const titles = new Map();
    const descs = new Map();
    for (const p of pages) {
        const where = `${p.path}`;
        if (!p.title || !p.description) errors.push(`${where}: missing title/description`);
        if (p.title.length > 70) warnings.push(`${where}: title is ${p.title.length} chars`);
        if (p.description.length > 165 || p.description.length < 70) warnings.push(`${where}: description is ${p.description.length} chars`);
        for (const [map, val, label] of [[titles, p.title, 'title'], [descs, p.description, 'description']]) {
            if (map.has(val)) errors.push(`Duplicate ${label}: ${where} and ${map.get(val)}`);
            map.set(val, where);
        }
        const html = p.html;
        if ((html.match(/<h1[\s>]/g) || []).length !== 1) errors.push(`${where}: expected exactly one <h1>`);
        const canon = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
        if (canon !== abs(p.path)) errors.push(`${where}: canonical ${canon} is not self-referencing`);
        for (const l of LANGS) {
            if (p.alternates[l] && !html.includes(`hreflang="${l}" href="${abs(p.alternates[l])}"`)) errors.push(`${where}: missing hreflang ${l}`);
        }
        for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
            try { JSON.parse(m[1]); } catch (e) { errors.push(`${where}: invalid JSON-LD (${e.message})`); }
        }
    }

    // hreflang reciprocity
    const byPath = new Map(pages.map(p => [p.path, p]));
    for (const p of pages) {
        for (const [l, alt] of Object.entries(p.alternates)) {
            const other = byPath.get(alt);
            if (!other) { errors.push(`${p.path}: hreflang ${l} points to ungenerated ${alt}`); continue; }
            if (other.alternates[p.lang] !== p.path) errors.push(`${p.path}: hreflang not reciprocal with ${alt}`);
        }
    }

    // internal links (generated pages + static pages)
    const exists = f => written.has(f) || fs.existsSync(path.join(ROOT, f));
    const sources = [...pages.map(p => ({ path: p.path, html: p.html })),
        { path: '/about.html', html: read('about.html') },
        ...['blog/index.html', ...blogPosts.map(b => `blog/${b.file}`)].map(f => ({ path: '/' + f, html: read(f) }))];
    for (const s of sources) {
        const base = new URL(s.path, config.siteUrl);
        for (const m of s.html.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
            const href = m[1];
            if (/^(https?:|mailto:|#|javascript:)/.test(href) && !href.startsWith(config.siteUrl)) continue;
            const u = new URL(href, base);
            if (u.origin !== config.siteUrl || u.pathname.startsWith('/api/')) continue;
            if (!exists(fileForUrl(u.pathname))) errors.push(`Broken internal link on ${s.path}: ${href}`);
        }
    }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
    validateDataset();
    if (errors.length) return finish(new Set());

    buildHomes();
    for (const lang of LANGS) {
        const hub = buildHubPage(lang);
        pages.push({ ...hub, html: layout(lang, hub) });
        for (const w of world.filter(x => x.c.status === 'published')) {
            const page = buildCountryPage(w, lang);
            pages.push({ ...page, html: layout(lang, page) });
        }
    }
    for (const p of pages) if (!p.file) p.file = fileForUrl(p.path);

    const sitemap = buildSitemap();
    const written = new Set(pages.map(p => p.file));
    validateOutput(written);

    if (!DRY && !errors.length) {
        // Remove country pages that are no longer published.
        for (const lang of LANGS) {
            const dir = path.join(ROOT, config.languages[lang].hub);
            if (!fs.existsSync(dir)) continue;
            for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
                const rel = path.posix.join(config.languages[lang].hub.replace(/^\//, ''), entry.name, 'index.html');
                if (entry.isDirectory() && fs.existsSync(path.join(ROOT, rel)) && !written.has(rel)) {
                    fs.rmSync(path.join(dir, entry.name), { recursive: true });
                    console.log(`removed unpublished page ${rel}`);
                }
            }
        }
        for (const p of pages) {
            const target = path.join(ROOT, p.file);
            fs.mkdirSync(path.dirname(target), { recursive: true });
            fs.writeFileSync(target, p.html);
        }
        fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap.xml);
        fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
    }

    console.log(`pages generated: ${pages.length} (${LANGS.map(l => `${l}: ${pages.filter(p => p.lang === l).length}`).join(', ')})`);
    console.log(`country pages: ${published.length} countries x ${LANGS.length} languages; ${active.length - published.length} countries in draft`);
    console.log(`sitemap URLs: ${sitemap.count}`);
    finish(written);
}

function finish() {
    for (const w of warnings) console.warn(`warning: ${w}`);
    for (const e of errors) console.error(`error: ${e}`);
    if (errors.length) {
        console.error(`\n${errors.length} error(s) - nothing was written.`);
        process.exit(1);
    }
    console.log(DRY ? 'dry run OK (nothing written)' : 'build OK');
}

main();
