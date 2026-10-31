'use strict';

function esc(value) {
    return String(value)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function stripTags(html) {
    return String(html).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
        .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

/** "A, B and C" / "A, B y C" */
function joinList(items, lastWord) {
    if (items.length <= 1) return items.join('');
    return `${items.slice(0, -1).join(', ')} ${lastWord} ${items[items.length - 1]}`;
}

function link(item) {
    return item.href ? `<a href="${esc(item.href)}">${esc(item.name)}</a>` : esc(item.name);
}

module.exports = { esc, stripTags, joinList, link };
