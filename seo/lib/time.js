'use strict';

// Time zone helpers built on the ICU data bundled with Node (no dependencies).

const formatters = new Map();

function partsFormatter(tz) {
    if (!formatters.has(tz)) {
        formatters.set(tz, new Intl.DateTimeFormat('en-US', {
            timeZone: tz, hourCycle: 'h23',
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        }));
    }
    return formatters.get(tz);
}

/** UTC offset (minutes) of `tz` at the instant `ms`. Throws RangeError for unknown zones. */
function offsetMinutes(tz, ms) {
    const p = {};
    for (const { type, value } of partsFormatter(tz).formatToParts(new Date(ms))) p[type] = value;
    const asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
    return Math.round((asUtc - Math.floor(ms / 1000) * 1000) / 60000);
}

/** Instant (ms) when local time in `tz` reaches 00:00 on 1 January `year`. */
function newYearInstant(tz, year) {
    const wall = Date.UTC(year, 0, 1);
    let t = wall - offsetMinutes(tz, wall) * 60000;
    t = wall - offsetMinutes(tz, t) * 60000;
    return t;
}

/** Offset without daylight saving time (the smaller of mid-January and mid-July). */
function standardOffset(tz, year) {
    return Math.min(offsetMinutes(tz, Date.UTC(year, 0, 15)), offsetMinutes(tz, Date.UTC(year, 6, 15)));
}

function formatOffset(min) {
    const sign = min < 0 ? '-' : '+';
    const abs = Math.abs(min);
    return `UTC${sign}${String(Math.floor(abs / 60)).padStart(2, '0')}:${String(abs % 60).padStart(2, '0')}`;
}

/** Hours as a human number: 9, 5.5, 12.75 */
function hours(min) {
    return Math.round((min / 60) * 100) / 100;
}

function format(ms, tz, locale, options) {
    return new Intl.DateTimeFormat(locale, { timeZone: tz, ...options }).format(new Date(ms));
}

module.exports = { offsetMinutes, newYearInstant, standardOffset, formatOffset, hours, format };
