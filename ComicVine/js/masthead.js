(function(e) {
    "use strict";
    var t = e.Phoenix;
    if (!t) {
        e.Phoenix = t = {}
    }
    var s = t.Masthead = t.Masthead || {};
    var a = s.Views = s.Views || {};
    var n = t.jQuery || {};
    var o = n.getDocument ? n.getDocument() : $(document);
    var r = n.getWindow ? n.getWindow() : $(window);
    var i = e.scrollMonitor;
    const c = {
        open: "masthead-open",
        nav: "masthead-nav-open",
        search: "masthead-search-open"
    };
    const l = {
        open: false,
        nav: false,
        search: false
    };
    const h = ".js-masthead-default";
    var u = function(e, t) {
        let s = e.$el, a = [], n = [], o;
        const r = document.body.classList
          , i = "prevent-scroll";
        $.each(t, (function(e, t) {
            o = c[e];
            if (undefined !== o) {
                if (true === t) {
                    a.push(o)
                } else {
                    n.push(o)
                }
            }
        }
        ));
        if (!t.open) {
            e.trigger("beforeClose")
        }
        $.extend(e.states, t);
        s.data("states", e.states);
        if (a.length > 0) {
            a = a.join(" ");
            s.addClass(a)
        }
        if (n.length > 0) {
            n = n.join(" ");
            s.removeClass(n)
        }
        if (!r.contains(i) && (t.nav || t.search)) {
            r.add(i)
        } else {
            r.remove(i)
        }
        if (t.open) {
            e.trigger("open")
        } else {
            e.trigger("close")
        }
        e.trigger("change", t)
    };
    var v = function() {
        var e = r.width();
        return function() {
            var t = r.width();
            if (t !== e) {
                e = t;
                return true
            }
            return false
        }
    }();
    a.Masthead = Backbone.View.extend({
        events: {
            "touchend .js-masthead-overlay": "overlayClose",
            "click .js-masthead-overlay": "overlayClose",
            "open .js-masthead-menu": "navOpen",
            "mouseleave .js-masthead-menu": "navClose",
            "click .js-masthead-toggle": "toggle",
            "focus .js-masthead-search-mobile .js-site-search-query": "lockMobileSearhScroll",
            "blur .js-masthead-search-mobile .js-site-search-query": "unlockMobileSearchScroll",
            "blur .js-masthead-search .js-masthead-toggle": "closeInactiveSearch",
            "keydown .js-site-search": "handleSearchHotkey",
            "open .js-masthead-subnav": "subnavOpen",
            "close .js-masthead-subnav": "subnavClose",
            "resize .js-masthead-subnav": "resizeSubnav"
        },
        hasTouchEvents: false,
        $subnav: null,
        $searchInput: null,
        states: null,
        initialize: function(e) {
            var t = this;
            t.states = $.extend({}, l);
            t.$searchInput = t.$(".js-masthead-search .js-site-search-query");
            r.on("resize", (function() {
                if (v()) {
                    t.close()
                }
            }
            ));
            o.one("touchstart", (function() {
                t.hasTouchEvents = true
            }
            ));
            t.on("all", (function(e, s) {
                t.$el.trigger(e, s)
            }
            ));
            if (i) {
                t.$el.on("heightChange", (function() {
                    i.recalculateLocations()
                }
                ))
            }
        },
        open: function() {
            u(this, {
                open: true
            })
        },
        close: function() {
            u(this, l)
        },
        navOpen: function(e) {
            var t = this;
            if (t.states.nav) {
                return
            }
            t.open()
        },
        navClose: function(e) {
            var t = this;
            if (t.states.nav) {
                return
            }
            t.close()
        },
        overlayClose: function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.close()
        },
        toggle: function(e) {
            var t = this
              , s = t.states
              , a = $(e.currentTarget)
              , n = a.data("toggle")
              , o = $.extend({}, l);
            o.open = o[n] = !s[n];
            u(t, o)
        },
        lockMobileSearchScroll: function(e) {
            const t = document.querySelector(h);
            if (t) {
                t.scrollTop = 0;
                t.style = "overflow:hidden;"
            }
        },
        unlockMobileSearchScroll: function(e) {
            const t = document.querySelector(h);
            if (t) {
                t.style = ""
            }
        },
        closeInactiveSearch: function(e) {
            var t = this, s = t.states.search, a;
            if (!s) {
                return
            }
            a = t.$searchInput;
            if (!a.data("searchActivated")) {
                this.close()
            }
        },
        handleSearchHotkey: function(e) {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
                return
            }
            if (e.which === 27) {
                this.close()
            }
        },
        subnavClose: function(e) {
            this.$subnav = null
        },
        subnavOpen: function(e) {
            this.$subnav = $(e.target)
        },
        resizeSubnav: function(e) {
            const t = this.$subnav;
            const s = t.offset();
            const a = i.viewportBottom - s.top;
            const n = "masthead-subnav--scroll";
            t.css({
                height: "auto",
                "max-height": "none"
            });
            if (t.outerHeight() > a) {
                t.addClass(n);
                t.css({
                    height: a,
                    "max-height": a
                })
            } else {
                t.removeClass(n)
            }
        }
    })
}
)(this);
(function(e) {
    "use strict";
    var n = e.Phoenix, t, i;
    if (!n) {
        e.Phoenix = n = {}
    }
    t = n.Masthead = n.Masthead || {};
    i = t.Views = t.Views || {};
    var s = "masthead-nav-item-open";
    var a = function(e, n) {
        var t = e.$el;
        e.isOpen = n;
        t.toggleClass(s, n);
        if (n) {
            t.trigger("open");
            e.trigger("open")
        } else {
            e.trigger("close")
        }
    };
    i.Menu = Backbone.View.extend({
        $toggle: null,
        $menuLink: null,
        isOpen: false,
        preventClickHandler: null,
        events: {
            "click .js-masthead-menu-toggle": "toggle",
            "mouseenter .js-masthead-menu-link": "checkMenu",
            "touchend .js-masthead-menu-link": "checkMenu"
        },
        Masthead: null,
        initialize: function(e) {
            var n = this;
            n.Masthead = e.Masthead;
            n.$toggle = e.$toggle;
            n.$menuLink = e.$menuLink;
            n.Masthead.on("change", (function(e) {
                if (e.search || !e.nav && !e.open) {
                    n.close()
                }
            }
            ))
        },
        close: function() {
            a(this, false)
        },
        toggle: function(e) {
            a(this, !this.$el.hasClass(s))
        },
        checkMenu: function(e) {
            var n = this
              , t = n.$toggle
              , i = n.isOpen;
            if (!t.length || this.$toggle.is(":hidden")) {
                if (!i) {
                    e.preventDefault();
                    a(n, true);
                    if (e.type === "touchend") {
                        n.$el.trigger("mouseenter")
                    }
                }
            }
        }
    })
}
)(this);
(function(e) {
    "use strict";
    var a = e.Phoenix, i, s;
    if (!a) {
        e.Phoenix = a = {}
    }
    i = a.Masthead = a.Masthead || {};
    s = i.Views = i.Views || {};
    s.Search = Backbone.View.extend({
        $searchQuery: null,
        Masthead: null,
        initialize: function(e) {
            var a = this, i;
            a.Masthead = e.Masthead;
            i = a.$searchQuery = e.$searchQuery;
            a.Masthead.on("change", (function(e) {
                if (e.search) {
                    i.focus()
                } else {
                    if (document.activeElement === i[0]) {
                        i.blur()
                    }
                }
            }
            ))
        }
    })
}
)(this);
(function(e) {
    "use strict";
    var n = ".js-masthead";
    var a = e.Phoenix || {}, t = a.Masthead, i;
    if (!e.Phoenix) {
        e.Phoenix = a
    }
    if (!t || !Backbone) {
        return
    }
    i = t.Views;
    var s = a.jQuery || {};
    var r = s.getDocument ? s.getDocument() : $(document);
    var h = function(e) {
        var n = window.location.pathname, a = e.find(".js-masthead-nav-item"), t;
        a.each((function() {
            var e = $(this), a;
            a = e.find("a");
            a.each((function() {
                var a = $(this).attr("href");
                if (n.indexOf(a) === 0) {
                    t = e;
                    return false
                }
            }
            ));
            if (t) {
                return false
            }
        }
        ));
        if (t) {
            t.addClass("masthead-nav-item-active")
        }
    };
    var u = function(e) {
        var n = e.$(".js-masthead-menu")
          , a = null
          , t = [];
        n.each((function() {
            var n = $(this), s = n.find(".js-masthead-menu-toggle"), r = n.find(".js-masthead-menu-link"), h = n.find(".js-masthead-subnav"), u;
            u = new i.Menu({
                Masthead: e,
                el: n,
                $toggle: s,
                $menuLink: r
            });
            u.on("open", (function() {
                if (a) {
                    a.close()
                }
                a = u;
                h.trigger("open")
            }
            ));
            u.on("close", (function() {
                if (a === u) {
                    a = null;
                    h.trigger("close")
                }
            }
            ));
            t.push(u)
        }
        ));
        return t
    };
    var f = function(e) {
        var n = e.$(".js-masthead-search"), a = n.find(".js-site-search-query"), t;
        t = new i.Search({
            Masthead: e,
            el: n,
            $searchQuery: a
        })
    };
    $((function() {
        var e = $(n);
        if (!e || !e.length) {
            return
        }
        var a = new i.Masthead({
            el: e
        });
        u(a);
        f(a);
        h(e.find(".js-masthead-site-nav"))
    }
    ))
}
)(this);
