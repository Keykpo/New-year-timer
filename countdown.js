// Live countdown and local-time conversion for the "countdown by country" pages.
(function () {
    'use strict';

    var lang = document.documentElement.lang || 'en';

    function pad(n) {
        return String(n).padStart(2, '0');
    }

    document.querySelectorAll('[data-countdown-target]').forEach(function (el) {
        var target = Date.parse(el.getAttribute('data-countdown-target'));
        var units = {};
        el.querySelectorAll('[data-unit]').forEach(function (u) {
            units[u.getAttribute('data-unit')] = u;
        });

        function tick() {
            var diff = target - Date.now();
            if (diff <= 0) {
                el.classList.add('is-done');
                var done = el.querySelector('.nyt-done');
                if (done) done.hidden = false;
                return false;
            }
            units.days.textContent = pad(Math.floor(diff / 86400000));
            units.hours.textContent = pad(Math.floor((diff % 86400000) / 3600000));
            units.minutes.textContent = pad(Math.floor((diff % 3600000) / 60000));
            units.seconds.textContent = pad(Math.floor((diff % 60000) / 1000));
            return true;
        }

        if (tick()) {
            var timer = setInterval(function () {
                if (!tick()) clearInterval(timer);
            }, 1000);
        }
    });

    var fmt;
    try {
        fmt = new Intl.DateTimeFormat(lang, { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });
    } catch (e) {
        fmt = null;
    }
    if (fmt) {
        document.querySelectorAll('[data-local-time]').forEach(function (el) {
            el.textContent = fmt.format(new Date(el.getAttribute('data-local-time')));
        });
    }
})();
