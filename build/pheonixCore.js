(self.webpackChunkcomicvine = self.webpackChunkcomicvine || []).push([[4385], {
    2811: ()=>{
        !function() {
            const e = document.documentElement;
            e.dataset.useragent = navigator.userAgent,
            e.dataset.platform = navigator.platform
        }()
    }
    ,
    8698: ()=>{
        window.addEventListener("DOMContentLoaded", (()=>{
            const e = window.Phoenix
              , t = e ? e.jQuery : void 0
              , n = e ? e.Ui : void 0
              , o = t ? t.getMessageBlock() : void 0
              , r = o ? o.html() : void 0
              , i = r ? r.trim() : "";
            n && "" !== i && o && !o.hasClass("transitioning") && n.showMessageBar(i)
        }
        ))
    }
    ,
    6532: (e,t,n)=>{
        var o = n(9755);
        window.addEventListener("DOMContentLoaded", (()=>{
            const e = o;
            if (!e || !e.fn.autocomplete)
                return;
            const t = function() {
                e(".search-autocomplete").each((function() {
                    var t = e(this)
                      , n = t.data("autocomplete-indexes")
                      , o = {};
                    !0 !== t.data("initialized") && (e(this).data("cms") && (o.cms = 1),
                    n ? t.autocomplete({
                        autoRedirect: !0,
                        searchIndex: n,
                        selectFirst: !0,
                        showNotificationBar: !0,
                        extraParams: o
                    }) : t.autocomplete({
                        showNotificationBar: !0,
                        extraParams: o
                    }),
                    t.data("initialized", !0))
                }
                ))
            };
            t();
            const n = e(document);
            n.ajaxStop(t),
            n.on("newAutoCompleteAdded", t)
        }
        ))
    }
    ,
    3738: (e,t,n)=>{
        var o = n(9755);
        window.addEventListener("DOMContentLoaded", (()=>{
            const e = document.querySelector('meta[name="deviceType"]')
              , t = e ? e.getAttribute("content") : ""
              , n = o
              , r = document.querySelectorAll(".tipsy");
            "phone" === t || !n || "function" != typeof n.fn.tooltip || r.length < 1 || n(r).tooltip({
                animation: !1
            })
        }
        ))
    }
    ,
    3929: ()=>{
        !function() {
            if (void 0 === window.performance || "function" != typeof window.performance.getEntriesByName)
                return;
            "undefined" == typeof newrelic && (window.newrelic = {},
            newrelic.addToTrace = function() {
                console.log("nr:addToTrace", Array.prototype.slice.call(arguments))
            }
            ,
            newrelic.setCustomAttribute = function() {
                console.log("nr:setCustomAttribute", Array.prototype.slice.call(arguments))
            }
            ,
            newrelic.addPageAction = function() {
                console.log("nr:addPageAction", Array.prototype.slice.call(arguments))
            }
            );
            const e = function(e, t) {
                if ("object" != typeof newrelic)
                    return;
                const n = {
                    name: e,
                    start: Math.round(performance.timing.navigationStart + t, 0)
                };
                e.indexOf("nr_") >= 0 && (newrelic.addToTrace(n),
                newrelic.setCustomAttribute(e, t / 1e3))
            };
            if ("undefined" != typeof newrelic) {
                newrelic.setCustomAttribute("pageTitle", document.title);
                const n = performance.getEntriesByType("mark");
                for (var t = 0; t < n.length; t++)
                    e(n[t].name, n[t].startTime);
                const o = performance.mark;
                performance.mark = function() {
                    const t = Date.now()
                      , n = [].slice.call(arguments, 0);
                    return n.length > 0 && window.newrelic && e(n[0], t - performance.timing.navigationStart),
                    o.apply(this, n)
                }
                ,
                window.performance = performance
            }
        }()
    }
    ,
    9659: (e,t,n)=>{
        "use strict";
        var o = n(249);
        const r = new o.cG("initDebugManager")
          , {Phoenix: i} = window
          , a = new URLSearchParams(window.location.search).get("jsDebug");
        let c = "string" == typeof a ? a.split(",") : [];
        i && i.Storage && (c.length ? i.Storage.set("jsDebug", c.join(), 1) : c = i.Storage.get("jsDebug")),
        c && o.yM.setEnabledServices(c),
        r.log(c);
        n(2811),
        n(8698),
        n(6532),
        n(3738),
        n(3929);
        document.querySelector(".js-time-countdown") && n.e(52).then(n.bind(n, 52)).then((e=>{
            new (0,
            e.default)
        }
        ))
    }
    ,
    249: (e,t,n)=>{
        "use strict";
        n.d(t, {
            cG: ()=>a,
            yM: ()=>c,
            ZP: ()=>s
        });
        const o = {
            error(...e) {
                try {
                    console.error(...e)
                } catch (e) {}
            },
            info(...e) {
                try {
                    console.info(...e)
                } catch (e) {}
            },
            log(...e) {
                try {
                    console.log(...e)
                } catch (e) {}
            },
            profile(...e) {
                try {
                    console.profile(...e)
                } catch (e) {}
            },
            profileEnd(...e) {
                try {
                    console.profileEnd(...e)
                } catch (e) {}
            },
            timeStamp(...e) {
                try {
                    console.timeStamp(...e)
                } catch (e) {}
            },
            trace(...e) {
                try {
                    console.trace(...e)
                } catch (e) {}
            },
            warn(...e) {
                try {
                    console.warn(...e)
                } catch (e) {}
            }
        }
          , r = {}
          , i = (e,t)=>Math.floor(Math.random() * (t - e + 1)) + e;
        class a {
            constructor(e) {
                return this.enabled = !1,
                this.color = {
                    r: i(0, 360),
                    g: i(35, 80),
                    b: i(20, 45)
                },
                this.name = e,
                c.add(this),
                this
            }
            browserArgs(e, t) {
                return ["log"].includes(e) && t.unshift(`%c ${this.name} `, `color:#fff;border-radius:3px;background-color: hsl(${this.color.r}, ${this.color.g}%, ${this.color.b}%);`),
                t
            }
            disable() {
                return this.enabled = !1,
                this
            }
            enable() {
                return this.enabled = !0,
                this
            }
            error(...e) {
                return this._call("error", ...e)
            }
            info(...e) {
                return this._call("info", ...e)
            }
            log(...e) {
                return this._call("log", ...e)
            }
            profile(...e) {
                return this._call("profile", ...e)
            }
            profileEnd(...e) {
                return this._call("profileEnd", ...e)
            }
            timeStamp(...e) {
                return this._call("timeStamp", ...e)
            }
            trace(...e) {
                return this._call("trace", ...e)
            }
            warn(...e) {
                return this._call("warn", ...e)
            }
            get(e) {
                return r[e]
            }
            _call(e, ...t) {
                if (console && this.enabled) {
                    const n = Array.prototype.slice.call(t)
                      , r = this.browserArgs(e, n);
                    o[e].apply ? o[e].apply(o, r) : o[e](r)
                }
                return this
            }
        }
        const c = new class {
            constructor() {
                if (this.instances = {},
                this.enabledServices = [],
                this.instance)
                    return this.instance;
                this.instance = this
            }
            add(e) {
                this.instances[e.name] = e
            }
            setEnabledServices(e) {
                this.enabledServices = e,
                this.detectServices()
            }
            detectServices() {
                Object.keys(this.instances).forEach((e=>{
                    const t = this.instances[e];
                    this.enabledServices.includes(t.name) || this.enabledServices.includes("all") ? (console.log("Enabling: ", e),
                    t.enable()) : t.disable()
                }
                ))
            }
        }
          , s = a
    }
}, e=>{
    e.O(0, [9755], (()=>{
        return t = 9659,
        e(e.s = t);
        var t
    }
    ));
    e.O()
}
]);
