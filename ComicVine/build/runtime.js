(()=>{
    "use strict";
    var e, r, t, o = {}, n = {};
    function i(e) {
        var r = n[e];
        if (void 0 !== r)
            return r.exports;
        var t = n[e] = {
            exports: {}
        };
        return o[e].call(t.exports, t, t.exports, i),
        t.exports
    }
    i.m = o,
    e = [],
    i.O = (r,t,o,n)=>{
        if (!t) {
            var a = 1 / 0;
            for (d = 0; d < e.length; d++) {
                for (var [t,o,n] = e[d], l = !0, c = 0; c < t.length; c++)
                    (!1 & n || a >= n) && Object.keys(i.O).every((e=>i.O[e](t[c]))) ? t.splice(c--, 1) : (l = !1,
                    n < a && (a = n));
                if (l) {
                    e.splice(d--, 1);
                    var u = o();
                    void 0 !== u && (r = u)
                }
            }
            return r
        }
        n = n || 0;
        for (var d = e.length; d > 0 && e[d - 1][2] > n; d--)
            e[d] = e[d - 1];
        e[d] = [t, o, n]
    }
    ,
    i.n = e=>{
        var r = e && e.__esModule ? ()=>e.default : ()=>e;
        return i.d(r, {
            a: r
        }),
        r
    }
    ,
    i.d = (e,r)=>{
        for (var t in r)
            i.o(r, t) && !i.o(e, t) && Object.defineProperty(e, t, {
                enumerable: !0,
                get: r[t]
            })
    }
    ,
    i.f = {},
    i.e = e=>Promise.all(Object.keys(i.f).reduce(((r,t)=>(i.f[t](e, r),
    r)), [])),
    i.u = e=>e + "." + {
        52: "9ddc529a",
        1639: "156e3844",
        2755: "bd6a82d7",
        4854: "e4689e8d",
        6108: "1769d689",
        8909: "27aeee3f",
        9669: "e08b6ad9",
        9755: "c9b2e6c4"
    }[e] + ".js",
    i.miniCssF = e=>{}
    ,
    i.g = function() {
        if ("object" == typeof globalThis)
            return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window)
                return window
        }
    }(),
    i.o = (e,r)=>Object.prototype.hasOwnProperty.call(e, r),
    r = {},
    t = "comicvine:",
    i.l = (e,o,n,a)=>{
        if (r[e])
            r[e].push(o);
        else {
            var l, c;
            if (void 0 !== n)
                for (var u = document.getElementsByTagName("script"), d = 0; d < u.length; d++) {
                    var s = u[d];
                    if (s.getAttribute("src") == e || s.getAttribute("data-webpack") == t + n) {
                        l = s;
                        break
                    }
                }
            l || (c = !0,
            (l = document.createElement("script")).charset = "utf-8",
            l.timeout = 120,
            i.nc && l.setAttribute("nonce", i.nc),
            l.setAttribute("data-webpack", t + n),
            l.src = e),
            r[e] = [o];
            var f = (t,o)=>{
                l.onerror = l.onload = null,
                clearTimeout(p);
                var n = r[e];
                if (delete r[e],
                l.parentNode && l.parentNode.removeChild(l),
                n && n.forEach((e=>e(o))),
                t)
                    return t(o)
            }
              , p = setTimeout(f.bind(null, void 0, {
                type: "timeout",
                target: l
            }), 12e4);
            l.onerror = f.bind(null, l.onerror),
            l.onload = f.bind(null, l.onload),
            c && document.head.appendChild(l)
        }
    }
    ,
    i.r = e=>{
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    i.p = "/build/",
    (()=>{
        var e = {
            3666: 0
        };
        i.f.j = (r,t)=>{
            var o = i.o(e, r) ? e[r] : void 0;
            if (0 !== o)
                if (o)
                    t.push(o[2]);
                else if (3666 != r) {
                    var n = new Promise(((t,n)=>o = e[r] = [t, n]));
                    t.push(o[2] = n);
                    var a = i.p + i.u(r)
                      , l = new Error;
                    i.l(a, (t=>{
                        if (i.o(e, r) && (0 !== (o = e[r]) && (e[r] = void 0),
                        o)) {
                            var n = t && ("load" === t.type ? "missing" : t.type)
                              , a = t && t.target && t.target.src;
                            l.message = "Loading chunk " + r + " failed.\n(" + n + ": " + a + ")",
                            l.name = "ChunkLoadError",
                            l.type = n,
                            l.request = a,
                            o[1](l)
                        }
                    }
                    ), "chunk-" + r, r)
                } else
                    e[r] = 0
        }
        ,
        i.O.j = r=>0 === e[r];
        var r = (r,t)=>{
            var o, n, [a,l,c] = t, u = 0;
            if (a.some((r=>0 !== e[r]))) {
                for (o in l)
                    i.o(l, o) && (i.m[o] = l[o]);
                if (c)
                    var d = c(i)
            }
            for (r && r(t); u < a.length; u++)
                n = a[u],
                i.o(e, n) && e[n] && e[n][0](),
                e[n] = 0;
            return i.O(d)
        }
          , t = self.webpackChunkcomicvine = self.webpackChunkcomicvine || [];
        t.forEach(r.bind(null, 0)),
        t.push = r.bind(null, t.push.bind(t))
    }
    )()
}
)();
