'use strict';

const { esc, joinList, link } = require('../lib/html');

const and = items => joinList(items, 'and');
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
const fmtHours = h => (h === 1 ? '1 hour' : `${h} hours`);

module.exports = {
    lang: 'en',
    ui: {
        nav: { countdown: 'Countdown', byCountry: 'By country', blog: 'Blog', about: 'About' },
        home: 'Home',
        hub: 'Countdown by country',
        days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds',
        happyNewYear: year => `Happy New Year ${year}!`,
        liveCountdown: city => `Live countdown — ${city}`,
        localMidnight: 'Local midnight',
        yourTime: 'Your local time',
        region: 'Region',
        utcOffset: 'UTC offset',
        midnightUtc: 'Midnight in UTC',
        city: 'City',
        localTime: 'Local time at that moment',
        countries: 'Countries and regions',
        alreadyIn: year => `already in ${year}`,
        relatedReading: 'Related reading',
        faq: 'Frequently asked questions',
        cta: { title: 'Count down in your own time zone', text: 'Our main countdown automatically adjusts to wherever you are.', button: 'Open the countdown' },
        otherLanguage: 'Leer en español',
        footerCopy: year => `© ${year} New Year Timers.`,
        privacy: 'Privacy Policy',
        dst: 'daylight saving time',
        more: n => `${n} more`
    },

    home(d) {
        return {
            title: `Countdown to New Year ${d.year} | Free Live New Year Countdown Timer`,
            description: `Free live countdown to New Year ${d.year} in your time zone: days, hours, minutes and seconds until midnight, plus the New Year countdown for every country.`,
            ogTitle: `Countdown to New Year ${d.year} | Free Live Countdown Timer`,
            ogDescription: `How long until New Year ${d.year}? A live countdown to midnight in your time zone, the time New Year arrives in every country, and a global wishes wall.`,
            appName: `New Year ${d.year} Countdown Timer`,
            appDescription: `Live countdown to New Year ${d.year} in the visitor's time zone, with the time New Year arrives in every country and a global wishes wall.`,
            imageAlt: `New Year ${d.year} countdown timer`
        };
    },

    country(d) {
        const c = d.c;
        const p = c.primary;
        const title = `New Year ${d.year} Countdown ${c.in} | Live Timer`;
        const description = c.multi
            ? `Live countdown to New Year ${d.year} ${c.in}. Midnight arrives first in ${c.first.city} at ${c.first.utcTime} UTC; see all ${c.offsetCount} time zones and world times.`
            : `Live countdown to New Year ${d.year} ${c.in}. Midnight (${p.offsetLabel}) is at ${p.utcTime} UTC on ${p.utcDateShort}. See world times and who celebrates first.`;

        const sections = [];

        // When does it start
        let when;
        if (c.multi) {
            when = `<p>${esc(c.Ref)} spans ${plural(c.offsetCount, 'different UTC offset')} on New Year's Eve, so ${d.year} arrives in waves. ` +
                `The first region to celebrate is <strong>${esc(c.first.city)}</strong> (${c.first.offsetLabel}) at ${c.first.utcTime} UTC on ${c.first.utcDate}, ` +
                `and the last is <strong>${esc(c.last.city)}</strong> (${c.last.offsetLabel}), ${fmtHours(c.spanHours)} later.</p>` +
                `<p>The countdown above follows ${esc(p.city)}, where midnight falls at ${p.utcTime} UTC.</p>`;
        } else {
            when = `<p>${esc(c.Ref)} uses a single time zone on New Year's Eve, <strong>${p.offsetLabel}</strong>, so the whole country welcomes ${d.year} at the same moment: ` +
                `midnight local time corresponds to <strong>${p.utcTime} UTC on ${p.utcDate}</strong>.</p>`;
        }
        if (p.dst) {
            when += `<p>On December 31 ${esc(p.city)} is on ${this.ui.dst}, so the offset is ${p.offsetLabel} instead of the standard ${p.stdLabel}.</p>`;
        }
        when += `<p>New Year's Day ${d.year} falls on a <strong>${d.newYearsWeekday}</strong>.</p>`;
        if (c.multi) {
            when += `<div class="table-wrap"><table class="tz-table"><thead><tr><th>${this.ui.region}</th><th>${this.ui.utcOffset}</th><th>${this.ui.midnightUtc}</th><th>${this.ui.yourTime}</th></tr></thead><tbody>` +
                c.zones.map(z => `<tr><td>${esc(z.cityFull)}</td><td>${z.offsetLabel}${z.dst ? ' *' : ''}</td><td>${z.utcTime} · ${z.utcDateShort}</td><td data-local-time="${z.iso}">—</td></tr>`).join('') +
                `</tbody></table></div>` +
                (c.zones.some(z => z.dst) ? `<p class="table-note">* ${this.ui.dst} in effect on December 31.</p>` : '');
        }
        sections.push({ h2: `When does New Year ${d.year} start ${c.in}?`, html: when });

        // Place in the world order
        let order;
        if (d.isWorldFirst) {
            order = `<p>${esc(c.Ref)} is the first country in the world to enter ${d.year}: ${esc(p.city)} reaches midnight at ${p.utcTime} UTC on ${p.utcDate}, ` +
                `while it is still the morning of December 31 in Europe. The last inhabited places, American Samoa and Niue (UTC-11:00), follow ${fmtHours(d.hoursBeforeLast)} later.</p>`;
        } else {
            order = `<p>The first places on Earth to enter ${d.year} are the Line Islands of Kiribati (UTC+14:00). ${esc(p.city)} follows <strong>${fmtHours(d.hoursAfterFirst)} later</strong>, ` +
                `and the last inhabited places, American Samoa and Niue (UTC-11:00), celebrate ${fmtHours(d.hoursBeforeLast)} after ${esc(p.city)}.</p>`;
        }
        if (d.earlierCount) order += `<p>When the clock strikes midnight in ${esc(p.city)}, ${d.earlierCount} of the ${d.totalCountries} countries in our <a href="${d.links.hub}">world time zone table</a> already have at least one region celebrating ${d.year}.</p>`;
        if (d.before || d.after) {
            order += '<ul>';
            if (d.before) order += `<li><strong>Just before (${d.before.offsetLabel}):</strong> ${and(d.before.countries.map(link))}</li>`;
            if (d.after) order += `<li><strong>Just after (${d.after.offsetLabel}):</strong> ${and(d.after.countries.map(link))}</li>`;
            order += '</ul>';
        }
        sections.push({ h2: `${c.Ref} in the global New Year countdown`, html: order });

        if (d.peers.length) {
            sections.push({
                h2: `Who celebrates at the same time as ${c.ref}?`,
                html: `<p>These countries also reach midnight at ${p.offsetLabel}, so they welcome ${d.year} at exactly the same moment as ${esc(p.city)}: ${and(d.peers.map(link))}.</p>`
            });
        }

        sections.push({
            h2: `What time is it around the world at midnight ${c.in}?`,
            html: `<p>When ${esc(p.city)} hits 00:00 on January 1, ${d.year}, this is the local time in other major cities:</p>` +
                `<div class="table-wrap"><table class="tz-table"><thead><tr><th>${this.ui.city}</th><th>${this.ui.localTime}</th></tr></thead><tbody>` +
                d.refTimes.map(r => `<tr><td>${esc(r.city)}</td><td>${esc(r.time)}${r.celebrated ? ` <span class="tag">${this.ui.alreadyIn(d.year)}</span>` : ''}</td></tr>`).join('') +
                `</tbody></table></div>`
        });

        if (c.traditions) {
            sections.push({ h2: `New Year traditions ${c.in}`, html: `<p>${esc(c.traditions)}</p>` });
        }

        const faq = [
            {
                q: `What time is New Year ${d.year} ${c.in} in UTC?`,
                a: `Midnight in ${p.city} corresponds to ${p.utcTime} UTC on ${p.utcDate}.` +
                    (c.multi ? ` Other regions of ${c.ref} follow, up to ${fmtHours(c.spanHours)} apart.` : '')
            },
            {
                q: `How many time zones does ${c.ref} have on New Year's Eve?`,
                a: c.multi
                    ? `${c.Ref} uses ${c.offsetCount} different UTC offsets on December 31, from ${c.first.offsetLabel} in ${c.first.city} to ${c.last.offsetLabel} in ${c.last.city}.`
                    : `One. The whole country uses ${p.offsetLabel} on New Year's Eve.`
            },
            {
                q: `Is daylight saving time in effect ${c.in} on New Year's Eve?`,
                a: p.dst
                    ? `Yes. On December 31 ${p.city} uses ${p.offsetLabel}; its standard time is ${p.stdLabel}.`
                    : (p.observesDst
                        ? `No. ${p.city} is on standard time (${p.offsetLabel}) on December 31; daylight saving time is only used in summer.`
                        : `No. ${p.city} keeps ${p.offsetLabel} all year round.`)
            }
        ];
        if (d.before && !d.isWorldFirst) {
            faq.push({
                q: `Which countries celebrate New Year just before ${c.ref}?`,
                a: `The previous time zone to reach midnight is ${d.before.offsetLabel}, which includes ${and(d.before.countries.map(x => x.name))}.`
            });
        }

        return {
            title, description,
            h1: `New Year ${d.year} Countdown ${c.in}`,
            lead: `How long until ${d.year} ${c.in}? The live countdown below runs to midnight in ${p.city}. Underneath you'll find the exact time New Year arrives in UTC, ` +
                `every time zone in the country, and the local time around the world at that moment.`,
            sections, faq,
            breadcrumb: c.name
        };
    },

    hub(d) {
        return {
            title: `New Year ${d.year} Around the World: Countdown by Country & Time Zone`,
            description: `Which country celebrates New Year ${d.year} first? See when midnight arrives in every country and time zone, from Kiribati (UTC+14) to American Samoa (UTC-11).`,
            h1: `New Year ${d.year} Countdown by Country`,
            lead: `New Year doesn't arrive everywhere at once. From the first stroke of midnight in Kiribati to the last one in American Samoa, the celebration takes about 25 hours to travel around the inhabited world. ` +
                `This page lists every country by the moment it enters ${d.year}.`,
            sections: [
                {
                    h2: `Which country celebrates New Year first?`,
                    html: `<p>The Line Islands of <a href="${d.firstHref}">Kiribati</a>, including Kiritimati (Christmas Island), are the first inhabited places to welcome the new year, at UTC+14:00 — that is 10:00 UTC on December 31. ` +
                        `Samoa, Tonga and New Zealand's Chatham Islands follow shortly after, and Auckland is the first major city to celebrate.</p>` +
                        `<p>The last inhabited places are American Samoa and Niue (UTC-11:00), which reach midnight at 11:00 UTC on January 1. The uninhabited Baker and Howland Islands (UTC-12:00) are technically the very last.</p>`
                },
                {
                    h2: `Why daylight saving time changes the order`,
                    html: `<p>On December 31 it is summer in the Southern Hemisphere, so places such as Sydney, Auckland and Santiago de Chile are on daylight saving time and celebrate one hour earlier than their standard offset suggests. ` +
                        `The times on this page already include those changes.</p>`
                }
            ],
            tableTitle: `When midnight arrives in each time zone`,
            tableIntro: `Times are calculated for January 1, ${d.year}. The "Your local time" column converts each moment to the time zone of your device.`,
            gridTitle: `Countdown pages by country`,
            faq: [
                { q: `Which country celebrates New Year ${d.year} first?`, a: `Kiribati. Its Line Islands, including Kiritimati, use UTC+14:00 and reach midnight at 10:00 UTC on December 31 ${d.year - 1}.` },
                { q: `Which country celebrates New Year last?`, a: `Among inhabited places, American Samoa and Niue are last, at UTC-11:00 (11:00 UTC on January 1 ${d.year}). The uninhabited Baker and Howland Islands, at UTC-12:00, are the very last.` },
                { q: `How long does it take for New Year to reach the whole world?`, a: `About 26 hours from the first time zone (UTC+14:00) to the last one (UTC-12:00), or about 25 hours counting only inhabited places.` }
            ]
        };
    }
};
