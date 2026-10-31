'use strict';

const { esc, joinList, link } = require('../lib/html');

const y = items => joinList(items, 'y');
const fmtHours = h => (h === 1 ? '1 hora' : `${String(h).replace('.', ',')} horas`);

module.exports = {
    lang: 'es',
    ui: {
        nav: { countdown: 'Cuenta regresiva', byCountry: 'Por país', blog: 'Blog (inglés)', about: 'Acerca de' },
        home: 'Inicio',
        hub: 'Cuenta regresiva por país',
        days: 'Días', hours: 'Horas', minutes: 'Minutos', seconds: 'Segundos',
        happyNewYear: year => `¡Feliz Año Nuevo ${year}!`,
        liveCountdown: city => `Cuenta regresiva en vivo — ${city}`,
        localMidnight: 'Medianoche local',
        yourTime: 'Tu hora local',
        region: 'Región',
        utcOffset: 'Diferencia UTC',
        midnightUtc: 'Medianoche en UTC',
        city: 'Ciudad',
        localTime: 'Hora local en ese momento',
        countries: 'Países y regiones',
        alreadyIn: year => `ya en ${year}`,
        relatedReading: 'Lecturas relacionadas (en inglés)',
        faq: 'Preguntas frecuentes',
        cta: { title: 'Cuenta regresiva en tu zona horaria', text: 'Nuestra cuenta regresiva principal se ajusta automáticamente a tu ubicación.', button: 'Abrir la cuenta regresiva' },
        otherLanguage: 'Read in English',
        footerCopy: year => `© ${year} New Year Timers.`,
        privacy: 'Política de privacidad (inglés)',
        dst: 'horario de verano',
        more: n => `${n} más`
    },

    home(d) {
        return {
            title: `Cuenta regresiva para Año Nuevo ${d.year} | ¿Cuánto falta?`,
            description: `¿Cuánto falta para Año Nuevo ${d.year}? Cuenta regresiva con días, horas, minutos y segundos hasta la medianoche en tu zona horaria y la hora de Año Nuevo en cada país.`,
            ogTitle: `Cuenta regresiva para Año Nuevo ${d.year} en vivo`,
            ogDescription: `¿Cuánto falta para ${d.year}? Cuenta regresiva hasta la medianoche en tu zona horaria, la hora de Año Nuevo en cada país y un muro de deseos mundial.`,
            appName: `Cuenta regresiva Año Nuevo ${d.year}`,
            appDescription: `Cuenta regresiva en vivo para Año Nuevo ${d.year} en la zona horaria del visitante, con la hora de Año Nuevo en cada país y un muro de deseos mundial.`,
            imageAlt: `Cuenta regresiva para Año Nuevo ${d.year}`
        };
    },

    country(d) {
        const c = d.c;
        const p = c.primary;
        let title = `¿Cuánto falta para Año Nuevo ${d.year} ${c.in}? Cuenta regresiva`;
        if (title.length > 65) title = `Cuenta regresiva Año Nuevo ${d.year} ${c.in}`;
        const description = c.multi
            ? `Cuenta regresiva en vivo para Año Nuevo ${d.year} ${c.in}. La medianoche llega primero a ${c.first.city} a las ${c.first.utcTime} UTC; mira sus ${c.offsetCount} husos horarios.`
            : `Cuenta regresiva en vivo para Año Nuevo ${d.year} ${c.in}. La medianoche (${p.offsetLabel}) llega a las ${p.utcTime} UTC del ${p.utcDateShort}. Hora en el mundo.`;

        const sections = [];

        let when;
        if (c.multi) {
            when = `<p>${esc(c.Ref)} tiene ${c.offsetCount} diferencias horarias distintas en Nochevieja, así que ${d.year} llega por etapas. ` +
                `La primera región en celebrarlo es <strong>${esc(c.first.city)}</strong> (${c.first.offsetLabel}), a las ${c.first.utcTime} UTC del ${c.first.utcDate}, ` +
                `y la última es <strong>${esc(c.last.city)}</strong> (${c.last.offsetLabel}), ${fmtHours(c.spanHours)} más tarde.</p>` +
                `<p>La cuenta regresiva de arriba corresponde a ${esc(p.city)}, donde la medianoche llega a las ${p.utcTime} UTC.</p>`;
        } else {
            when = `<p>${esc(c.Ref)} usa un único huso horario en Nochevieja, <strong>${p.offsetLabel}</strong>, por lo que todo el país recibe ${d.year} al mismo tiempo: ` +
                `la medianoche local equivale a las <strong>${p.utcTime} UTC del ${p.utcDate}</strong>.</p>`;
        }
        if (p.dst) {
            when += `<p>El 31 de diciembre ${esc(p.city)} está en ${this.ui.dst}, por eso su diferencia es ${p.offsetLabel} en lugar de la habitual ${p.stdLabel}.</p>`;
        }
        when += `<p>El día de Año Nuevo ${d.year} cae en <strong>${d.newYearsWeekday}</strong>.</p>`;
        if (c.multi) {
            when += `<div class="table-wrap"><table class="tz-table"><thead><tr><th>${this.ui.region}</th><th>${this.ui.utcOffset}</th><th>${this.ui.midnightUtc}</th><th>${this.ui.yourTime}</th></tr></thead><tbody>` +
                c.zones.map(z => `<tr><td>${esc(z.cityFull)}</td><td>${z.offsetLabel}${z.dst ? ' *' : ''}</td><td>${z.utcTime} · ${z.utcDateShort}</td><td data-local-time="${z.iso}">—</td></tr>`).join('') +
                `</tbody></table></div>` +
                (c.zones.some(z => z.dst) ? `<p class="table-note">* Con ${this.ui.dst} el 31 de diciembre.</p>` : '');
        }
        sections.push({ h2: `¿A qué hora empieza el Año Nuevo ${d.year} ${c.in}?`, html: when });

        let order;
        if (d.isWorldFirst) {
            order = `<p>${esc(c.Ref)} es el primer país del mundo en entrar en ${d.year}: ${esc(p.city)} llega a la medianoche a las ${p.utcTime} UTC del ${p.utcDate}, ` +
                `cuando en Europa todavía es la mañana del 31 de diciembre. Los últimos lugares habitados, Samoa Americana y Niue (UTC-11:00), lo celebran ${fmtHours(d.hoursBeforeLast)} después.</p>`;
        } else {
            order = `<p>Los primeros lugares del planeta en entrar en ${d.year} son las islas de la Línea, en Kiribati (UTC+14:00). ${esc(p.city)} llega <strong>${fmtHours(d.hoursAfterFirst)} más tarde</strong>, ` +
                `y los últimos lugares habitados, Samoa Americana y Niue (UTC-11:00), lo celebran ${fmtHours(d.hoursBeforeLast)} después que ${esc(p.city)}.</p>`;
        }
        if (d.earlierCount) order += `<p>Cuando el reloj marca la medianoche en ${esc(p.city)}, ${d.earlierCount} de los ${d.totalCountries} países de nuestra <a href="${d.links.hub}">tabla mundial de husos horarios</a> ya tienen al menos una región celebrando ${d.year}.</p>`;
        if (d.before || d.after) {
            order += '<ul>';
            if (d.before) order += `<li><strong>Justo antes (${d.before.offsetLabel}):</strong> ${y(d.before.countries.map(link))}</li>`;
            if (d.after) order += `<li><strong>Justo después (${d.after.offsetLabel}):</strong> ${y(d.after.countries.map(link))}</li>`;
            order += '</ul>';
        }
        sections.push({ h2: `${c.Ref} en la cuenta regresiva mundial`, html: order });

        if (d.peers.length) {
            sections.push({
                h2: `¿Qué países celebran a la misma hora que ${c.ref}?`,
                html: `<p>Estos países también llegan a la medianoche con ${p.offsetLabel}, es decir, reciben ${d.year} exactamente al mismo tiempo que ${esc(p.city)}: ${y(d.peers.map(link))}.</p>`
            });
        }

        sections.push({
            h2: `¿Qué hora es en el mundo cuando es medianoche ${c.in}?`,
            html: `<p>Cuando en ${esc(p.city)} son las 00:00 del 1 de enero de ${d.year}, esta es la hora local en otras ciudades:</p>` +
                `<div class="table-wrap"><table class="tz-table"><thead><tr><th>${this.ui.city}</th><th>${this.ui.localTime}</th></tr></thead><tbody>` +
                d.refTimes.map(r => `<tr><td>${esc(r.city)}</td><td>${esc(r.time)}${r.celebrated ? ` <span class="tag">${this.ui.alreadyIn(d.year)}</span>` : ''}</td></tr>`).join('') +
                `</tbody></table></div>`
        });

        if (c.traditions) {
            sections.push({ h2: `Tradiciones de Año Nuevo ${c.in}`, html: `<p>${esc(c.traditions)}</p>` });
        }

        const faq = [
            {
                q: `¿A qué hora es Año Nuevo ${d.year} ${c.in} en UTC?`,
                a: `La medianoche en ${p.city} equivale a las ${p.utcTime} UTC del ${p.utcDate}.` +
                    (c.multi ? ` Otras regiones de ${c.ref} lo celebran después, con hasta ${fmtHours(c.spanHours)} de diferencia.` : '')
            },
            {
                q: `¿Cuántos husos horarios tiene ${c.ref} en Nochevieja?`,
                a: c.multi
                    ? `${c.Ref} usa ${c.offsetCount} diferencias horarias distintas el 31 de diciembre, desde ${c.first.offsetLabel} en ${c.first.city} hasta ${c.last.offsetLabel} en ${c.last.city}.`
                    : `Uno. Todo el país usa ${p.offsetLabel} en Nochevieja.`
            },
            {
                q: `¿Hay horario de verano ${c.in} en Nochevieja?`,
                a: p.dst
                    ? `Sí. El 31 de diciembre ${p.city} usa ${p.offsetLabel}; su hora estándar es ${p.stdLabel}.`
                    : (p.observesDst
                        ? `No. ${p.city} está en su hora estándar (${p.offsetLabel}) el 31 de diciembre; el horario de verano solo se aplica en verano.`
                        : `No. ${p.city} mantiene ${p.offsetLabel} todo el año.`)
            }
        ];
        if (d.before && !d.isWorldFirst) {
            faq.push({
                q: `¿Qué países celebran el Año Nuevo justo antes que ${c.ref}?`,
                a: `El huso horario anterior en llegar a la medianoche es ${d.before.offsetLabel}, que incluye ${y(d.before.countries.map(x => x.name))}.`
            });
        }

        return {
            title, description,
            h1: `Cuenta regresiva para Año Nuevo ${d.year} ${c.in}`,
            lead: `¿Cuánto falta para ${d.year} ${c.in}? La cuenta regresiva en vivo llega hasta la medianoche en ${p.city}. Debajo tienes la hora exacta de Año Nuevo en UTC, ` +
                `todos los husos horarios del país y la hora local en el resto del mundo en ese momento.`,
            sections, faq,
            breadcrumb: c.name
        };
    },

    hub(d) {
        return {
            title: `Año Nuevo ${d.year} en el mundo: hora y cuenta regresiva por país`,
            description: `¿Qué país recibe primero el Año Nuevo ${d.year}? Consulta a qué hora llega la medianoche en cada país y huso horario, de Kiribati (UTC+14) a Samoa Americana (UTC-11).`,
            h1: `Cuenta regresiva para Año Nuevo ${d.year} por país`,
            lead: `El Año Nuevo no llega a todas partes a la vez. Desde la primera medianoche en Kiribati hasta la última en Samoa Americana, la celebración tarda unas 25 horas en recorrer el mundo habitado. ` +
                `Aquí tienes todos los países ordenados según el momento en que entran en ${d.year}.`,
            sections: [
                {
                    h2: `¿Qué país recibe primero el Año Nuevo?`,
                    html: `<p>Las islas de la Línea de <a href="${d.firstHref}">Kiribati</a>, entre ellas Kiritimati (isla de Navidad), son los primeros lugares habitados en recibir el año nuevo, con UTC+14:00: las 10:00 UTC del 31 de diciembre. ` +
                        `Poco después llegan Samoa, Tonga y las islas Chatham de Nueva Zelanda, y Auckland es la primera gran ciudad en celebrarlo.</p>` +
                        `<p>Los últimos lugares habitados son Samoa Americana y Niue (UTC-11:00), que llegan a la medianoche a las 11:00 UTC del 1 de enero. Las deshabitadas islas Baker y Howland (UTC-12:00) son, técnicamente, las últimas.</p>`
                },
                {
                    h2: `Por qué el horario de verano cambia el orden`,
                    html: `<p>El 31 de diciembre es verano en el hemisferio sur, así que lugares como Sídney, Auckland o Santiago de Chile están en horario de verano y celebran una hora antes de lo que indicaría su hora estándar. ` +
                        `Las horas de esta página ya incluyen esos cambios.</p>`
                }
            ],
            tableTitle: `A qué hora llega la medianoche en cada huso horario`,
            tableIntro: `Horas calculadas para el 1 de enero de ${d.year}. La columna "Tu hora local" convierte cada momento a la zona horaria de tu dispositivo.`,
            gridTitle: `Cuenta regresiva por país`,
            faq: [
                { q: `¿Qué país recibe primero el Año Nuevo ${d.year}?`, a: `Kiribati. Sus islas de la Línea, entre ellas Kiritimati, usan UTC+14:00 y llegan a la medianoche a las 10:00 UTC del 31 de diciembre de ${d.year - 1}.` },
                { q: `¿Cuál es el último país en recibir el Año Nuevo?`, a: `Entre los lugares habitados, Samoa Americana y Niue son los últimos, con UTC-11:00 (las 11:00 UTC del 1 de enero de ${d.year}). Las deshabitadas islas Baker y Howland, con UTC-12:00, son las últimas de todas.` },
                { q: `¿Cuánto tarda el Año Nuevo en llegar a todo el mundo?`, a: `Unas 26 horas desde el primer huso horario (UTC+14:00) hasta el último (UTC-12:00), o unas 25 horas si solo se cuentan los lugares habitados.` }
            ]
        };
    }
};
