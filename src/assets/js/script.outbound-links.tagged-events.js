! function() {
    var a, r = window.location,
        o = window.document,
        e = o.currentScript,
        l = e.getAttribute("data-api") || new URL(e.src).origin + "/api/event",
        s = e.getAttribute("data-domain");

    function u(e, t, n) {
        t && console.warn("Ignoring Event: " + t), n && n.callback && n.callback(), "pageview" === e && (a = !0)
    }
    var c = r.href,
        p = {},
        d = -1,
        f = !1,
        v = null,
        h = 0;

    function w() {
        var e = o.body || {},
            t = o.documentElement || {};
        return Math.max(e.scrollHeight || 0, e.offsetHeight || 0, e.clientHeight || 0, t.scrollHeight || 0, t.offsetHeight || 0, t.clientHeight || 0)
    }

    function g() {
        var e = o.body || {},
            t = o.documentElement || {},
            n = window.innerHeight || t.clientHeight || 0,
            t = window.scrollY || t.scrollTop || e.scrollTop || 0;
        return m <= n ? m : t + n
    }

    function t() {
        return v ? h + (Date.now() - v) : h
    }
    var m = w(),
        b = g();

    function y() {
        var e = t();
        !a && (d < b || 3e3 <= e) && (d = b, e = {
            n: "engagement",
            sd: Math.round(b / m * 100),
            d: s,
            u: c,
            p: p,
            e: e,
            v: 5
        }, v = null, h = 0, k(l, e))
    }

    function L() {
        "visible" === o.visibilityState && o.hasFocus() && null === v ? v = Date.now() : "hidden" !== o.visibilityState && o.hasFocus() || (h = t(), v = null, y())
    }

    function n(e, t) {
        var n = "pageview" === e;
        if (n && f && (y(), m = w(), b = g()), /^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(r.hostname) || "file:" === r.protocol) return u(e, "localhost", t);
        if ((window._phantom || window.__nightmare || window.navigator.webdriver || window.Cypress) && !window.__plausible) return u(e, null, t);
        try {
            if ("true" === window.localStorage.plausible_ignore) return u(e, "localStorage flag", t)
        } catch (e) {}
        var i = {};
        i.n = e, i.v = 5, i.u = r.href, i.d = s, i.r = o.referrer || null, t && t.meta && (i.m = JSON.stringify(t.meta)), t && t.props && (i.p = t.props), t && !1 === t.interactive && (i.i = !1), n && (a = !1, c = i.u, p = i.p, d = -1, h = 0, v = Date.now(), f || (o.addEventListener("visibilitychange", L), window.addEventListener("blur", L), window.addEventListener("focus", L), f = !0)), k(l, i, t)
    }

    function k(e, t, n) {
        window.fetch && fetch(e, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            keepalive: !0,
            body: JSON.stringify(t)
        }).then(function(e) {
            n && n.callback && n.callback({
                status: e.status
            })
        }).catch(function() {})
    }
    window.addEventListener("load", function() {
        m = w();
        var e = 0,
            t = setInterval(function() {
                m = w(), 15 == ++e && clearInterval(t)
            }, 200)
    }), o.addEventListener("scroll", function() {
        m = w();
        var e = g();
        b < e && (b = e)
    });
    var i = window.plausible && window.plausible.q || [];
    window.plausible = n;
    for (var E, S = 0; S < i.length; S++) n.apply(this, i[S]);

    function N(e) {
        e && E === r.pathname || (E = r.pathname, n("pageview"))
    }

    function H() {
        N(!0)
    }
    var _, e = window.history;

    function x(e) {
        return e && e.tagName && "a" === e.tagName.toLowerCase()
    }
    e.pushState && (_ = e.pushState, e.pushState = function() {
        _.apply(this, arguments), H()
    }, window.addEventListener("popstate", H)), "hidden" === o.visibilityState || "prerender" === o.visibilityState ? o.addEventListener("visibilitychange", function() {
        E || "visible" !== o.visibilityState || N()
    }) : N(), window.addEventListener("pageshow", function(e) {
        e.persisted && N()
    });
    var C = 1;

    function T(e) {
        var t, n;
        if ("auxclick" !== e.type || e.button === C) return (t = (e => {
            for (; e && (void 0 === e.tagName || !x(e) || !e.href);) e = e.parentNode;
            return e
        })(e.target)) && t.href && t.href.split("?")[0], ! function e(t, n) {
            if (!t || $ < n) return !1;
            if (K(t)) return !0;
            return e(t.parentNode, n + 1)
        }(t, 0) && (n = t) && n.href && n.host && n.host !== r.host ? D(e, t, {
            name: "Outbound Link: Click",
            props: {
                url: t.href
            }
        }) : void 0
    }

    function D(e, t, n) {
        var i, a = !1;

        function r() {
            a || (a = !0, window.location = t.href)
        }((e, t) => !e.defaultPrevented && (t = !t.target || t.target.match(/^_(self|parent|top)$/i), e = !(e.ctrlKey || e.metaKey || e.shiftKey) && "click" === e.type, t) && e)(e, t) ? (i = {
            props: n.props,
            callback: r
        }, plausible(n.name, i), setTimeout(r, 5e3), e.preventDefault()) : (i = {
            props: n.props
        }, plausible(n.name, i))
    }

    function O(e) {
        var e = K(e) ? e : e && e.parentNode,
            t = {
                name: null,
                props: {}
            },
            n = e && e.classList;
        if (n)
            for (var i = 0; i < n.length; i++) {
                var a, r = n.item(i).match(/plausible-event-(.+)(=|--)(.+)/);
                r && (a = r[1], r = r[3].replace(/\+/g, " "), "name" == a.toLowerCase() ? t.name = r : t.props[a] = r)
            }
        return t
    }
    o.addEventListener("click", T), o.addEventListener("auxclick", T);
    var $ = 3;

    function I(e) {
        if ("auxclick" !== e.type || e.button === C) {
            for (var t, n, i, a, r = e.target, o = 0; o <= $ && r; o++) {
                if ((i = r) && i.tagName && "form" === i.tagName.toLowerCase()) return;
                x(r) && (t = r), K(r) && (n = r), r = r.parentNode
            }
            n && (a = O(n), t ? (a.props.url = t.href, D(e, t, a)) : ((e = {}).props = a.props, plausible(a.name, e)))
        }
    }

    function K(e) {
        var t = e && e.classList;
        if (t)
            for (var n = 0; n < t.length; n++)
                if (t.item(n).match(/plausible-event-name(=|--)(.+)/)) return !0;
        return !1
    }
    o.addEventListener("submit", function(e) {
        var t, n = e.target,
            i = O(n);

        function a() {
            t || (t = !0, n.submit())
        }
        i.name && (e.preventDefault(), t = !1, setTimeout(a, 5e3), e = {
            props: i.props,
            callback: a
        }, plausible(i.name, e))
    }), o.addEventListener("click", I), o.addEventListener("auxclick", I)
}();