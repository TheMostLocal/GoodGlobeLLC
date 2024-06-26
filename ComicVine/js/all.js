$((function() {
    "use strict";
    var e = function() {
        $("#feed-view-details").addClass("on");
        $("#feed-view-river").removeClass("on");
        $("#feed-view-compact").removeClass("on");
        $("#feed-view-grid").removeClass("on");
        var e = $("#river .editorial");
        if (e.length === 0) {
            e = $("#feed-view-details").parents(".feed-hdr").first().siblings(".editorial")
        }
        e.addClass("details");
        e.removeClass("compact");
        e.removeClass("river");
        e.removeClass("grid row")
    };
    var i = function() {
        $("#feed-view-compact").addClass("on");
        $("#feed-view-river").removeClass("on");
        $("#feed-view-details").removeClass("on");
        $("#feed-view-grid").removeClass("on");
        var e = $("#river .editorial");
        if (e.length === 0) {
            e = $("#feed-view-compact").parents(".feed-hdr").first().siblings(".editorial")
        }
        e.addClass("compact");
        e.removeClass("details");
        e.removeClass("list");
        e.removeClass("grid row")
    };
    var r = function() {
        $("#feed-view-river").addClass("on");
        $("#feed-view-details").removeClass("on");
        $("#feed-view-compact").removeClass("on");
        $("#feed-view-grid").removeClass("on");
        var e = $("#river .editorial");
        if (e.length === 0) {
            e = $("#feed-view-river").parents(".feed-hdr").first().siblings(".editorial")
        }
        if (e.length == 0) {
            e = $("#feed-view-river").parents(".feed-hdr").siblings().find(".editorial")
        }
        e.addClass("river");
        e.removeClass("details");
        e.removeClass("compact");
        e.removeClass("grid row")
    };
    var s = function() {
        $("#feed-view-grid").addClass("on");
        $("#feed-view-river").removeClass("on");
        $("#feed-view-details").removeClass("on");
        $("#feed-view-compact").removeClass("on");
        var e = $("#river .editorial");
        if (e.length === 0) {
            e = $("#feed-view-river").parents(".feed-hdr").first().siblings(".editorial")
        }
        if (e.length == 0) {
            e = $("#feed-view-river").parents(".feed-hdr").siblings().find(".editorial")
        }
        e.addClass("grid row");
        e.removeClass("river");
        e.removeClass("details");
        e.removeClass("compact")
    };
    var a = function(e, i) {
        if (e !== undefined) {
            $.cookie("feed-group-" + e, i, {
                expires: 365,
                path: "/"
            })
        }
    };
    $(document).on("click", "#feed-view-details", (function(i) {
        var r = $(this).parents("dl:first").attr("data-feed-group");
        e();
        i.preventDefault();
        a(r, "Details")
    }
    ));
    $(document).on("click", "#feed-view-compact", (function(e) {
        var r = $(this).parents("dl:first").attr("data-feed-group");
        i();
        e.preventDefault();
        a(r, "Compact")
    }
    ));
    $(document).on("click", "#feed-view-river", (function(e) {
        var i = $(this).parents("dl:first").attr("data-feed-group");
        r();
        e.preventDefault();
        a(i, "River")
    }
    ));
    $(document).on("click", "#feed-view-grid", (function(e) {
        var i = $(this).parents("dl:first").attr("data-feed-group");
        s();
        e.preventDefault();
        a(i, "Grid")
    }
    ))
}
));
Phoenix.Cryptography = function() {}
;
Phoenix.Cryptography.random = function(r, e) {
    r = parseInt(r, 10);
    e = parseInt(e, 10);
    if (!isNaN(r) && !isNaN(e)) {
        return Math.floor(Math.random() * (e - r + 1)) + r
    }
    return Math.random()
}
;
Phoenix.Cryptography.randomString = function(r, e) {
    if (!r) {
        r = 32
    }
    var a = "0123456789";
    var o = "abcdef";
    var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var i = n.toLowerCase() + n + a + "+/";
    var t = "";
    if (e !== undefined) {
        if (e === "alphanumeric") {
            i = n.toLowerCase() + n + a
        } else if (e === "base56") {
            i = n.toLowerCase() + n + a.substr(2)
        } else if (e === "alpha") {
            i = n.toLowerCase() + n
        } else if (e === "base36") {
            i = n + a
        } else if (e === "hexadecimal") {
            i = o + a
        } else if (e === "numeric") {
            i = a
        }
    }
    for (var s = 0, f = i.length - 1; s < r; s++) {
        t += i.charAt(Phoenix.Cryptography.random(0, f))
    }
    return t
}
;
(function() {
    "use strict";
    let {Phoenix: e} = window;
    if (!e) {
        e = window.Phoenix = function() {}
    }
    e.jQuery = function() {
        const e = {};
        const n = {
            setWindow() {
                e.win = $(window);
                return e.win
            },
            setDocument() {
                e.doc = $(document);
                return e.doc
            },
            setHtml() {
                e.html = $("html");
                return e.html
            },
            setBody() {
                e.body = $("body");
                return e.body
            },
            setWrapper() {
                e.wrapper = $("#wrapper");
                return e.wrapper
            },
            setMessageBlock() {
                e.messageBlock = $("#message-block");
                return e.messageBlock
            },
            setLoadingScreen(n) {
                if (!n) {
                    n = "Very busy&hellip;"
                }
                e.loadingScreen = $('<div class="modal-backdrop"></div><div class="loading-global">' + n + "</div>").data("msg", n);
                return e.loadingScreen
            }
        };
        const t = {
            getWindow() {
                return e.win || n.setWindow()
            },
            getDocument() {
                return e.doc || n.setDocument()
            },
            getHtml() {
                return e.html || n.setHtml()
            },
            getBody() {
                return e.body || n.setBody()
            },
            getWrapper() {
                return e.wrapper || n.setWrapper()
            },
            getMessageBlock() {
                return e.messageBlock || n.setMessageBlock()
            },
            getLoadingScreen(t, r) {
                return e.loadingScreen && (e.loadingScreen.data("msg") === t || r) ? e.loadingScreen : n.setLoadingScreen(t)
            },
            getEvents(e) {
                const n = function() {
                    const e = $(this);
                    const t = e.data("events");
                    if (t === undefined) {
                        return
                    }
                    window.console.log(e, t);
                    if (e.children().length !== 0) {
                        n(e.children())
                    }
                };
                const t = e.data("events");
                if (t !== undefined) {
                    window.console.log(e, e.data("events"))
                }
                e.children().each(n)
            }
        };
        return t
    }()
}
)();
Phoenix.Grammar = {};
Phoenix.Grammar._humanizeCache = {};
Phoenix.Grammar._underscorizeCache = {};
Phoenix.Grammar._camelizeCache = {
    upper: {},
    lower: {}
};
Phoenix.Grammar._rules = {
    humanize: {},
    camelize: {},
    singularize: {},
    pluralize: {},
    underscorize: {}
};
Phoenix.Grammar._pluralizeCache = {};
Phoenix.Grammar._singularizeCache = {};
Phoenix.Grammar._singularToPluralRules = [[/([ml])ouse$/i, "ice"], [/(media|info(rmation)?|news)$/i, ""], [/(phot|log|vide)o$/i, "os"], [/^(q)uiz$/i, "uizzes"], [/(c)hild$/i, "hildren"], [/(p)erson$/i, "eople"], [/(m)an$/i, "en"], [/([ieu]s|[ieuo]x)$/i, "es"], [/([cs]h)$/i, "es"], [/(ss)$/i, "es"], [/([aeo]l)f$/i, "ves"], [/([^d]ea)f$/i, "ves"], [/(ar)f$/i, "ves"], [/([nlw]i)fe$/i, "ves"], [/([aeiou]y)$/i, "s"], [/([^aeiou])y$/i, "ies"], [/([^o])o$/i, "oes"], [/s$/i, "ses"], [/(.)$/i, "s"]];
Phoenix.Grammar._pluralToSingularRules = [[/([ml])ice$/i, "ouse"], [/(media|info(rmation)?|news)$/i, ""], [/(q)uizzes$/i, "uiz"], [/(c)hildren$/i, "ild"], [/(p)eople$/i, "erson"], [/(m)en$/i, "an"], [/((?!sh).)oes$/i, "o"], [/((?!o)[ieu]s|[ieuo]x)es$/i, ""], [/([cs]h)es$/i, ""], [/(ss)es$/i, ""], [/([aeo]l)ves$/i, "f"], [/([^d]ea)ves$/i, "f"], [/(ar)ves$/i, "f"], [/([nlw]i)ves$/i, "fe"], [/([aeiou]y)s$/i, ""], [/([^aeiou])ies$/i, "y"], [/(la)ses$/i, "s"], [/(.)s$/i, ""]];
Phoenix.Grammar._commonize = function(e, r, a) {
    if (a[e]) {
        return a[e]
    }
    var i = e;
    e = e.charAt(0).toLowerCase() + e.substr(1);
    if (e.indexOf("_") !== -1 && e.toLowerCase() === e) {} else if (e.indexOf(" ") !== -1) {
        e = e.replace(/\s+/g, "_").toLowerCase()
    } else {
        var n;
        do {
            n = e;
            e = e.replace(/([a-zA-Z])([0-9])/, "$1" + r + "$2");
            e = e.replace(/([a-z0-9A-Z])([A-Z])/, "$1" + r + "$2")
        } while (n !== e);
        e = e.toLowerCase()
    }
    a[i] = e;
    return e
}
;
Phoenix.Grammar.underscorize = function(e) {
    if (Phoenix.Grammar._rules.underscorize[e] !== undefined) {
        return Phoenix.Grammar._rules.underscorize[e]
    }
    return Phoenix.Grammar._commonize(e, "_", Phoenix.Grammar._underscorizeCache)
}
;
Phoenix.Grammar.humanize = function(e) {
    if (Phoenix.Grammar._rules.humanize[e] !== undefined) {
        return Phoenix.Grammar._rules.humanize[e]
    }
    if (Phoenix.Grammar._humanizeCache[e]) {
        return Phoenix.Grammar._humanizeCache[e]
    }
    var r = e;
    if (e.indexOf(" ") === -1) {
        if (e.indexOf("_") === -1) {
            e = Phoenix.Grammar.underscorize(e)
        }
        e = e.replace(/_/g, " ");
        var a = e.split(" ");
        for (var i = 0; i < a.length; i++) {
            a[i] = a[i].charAt(0).toUpperCase() + a[i].substr(1)
        }
        e = a.join(" ");
        var n = /(\b(api|css|gif|html|id|jpg|js|mp3|pdf|php|png|sql|swf|url|xhtml|xml)\b)/gi;
        e = e.replace(n, (function(e) {
            return e.toUpperCase()
        }
        ));
        e = e.replace(/\.(\w+)$/, (function(e, r) {
            return "." + r.charAt(0).toUpperCase() + r.substr(1)
        }
        ))
    }
    Phoenix.Grammar._humanizeCache[r] = e;
    return e
}
;
Phoenix.Grammar.camelize = function(e, r, a) {
    if (Phoenix.Grammar._rules.camelize[e] !== undefined) {
        return Phoenix.Grammar._rules.camelize[e]
    }
    if (r && Phoenix.Grammar._camelizeCache.upper[e]) {
        return Phoenix.Grammar._camelizeCache.upper[e]
    } else if (!r && Phoenix.Grammar._camelizeCache.lower[e]) {
        return Phoenix.Grammar._camelizeCache.lower[e]
    }
    if (r === undefined) {
        r = false
    }
    if (a === undefined) {
        a = "_"
    }
    var i = e;
    if (e.indexOf(" ") !== -1) {
        e = e.replace(/\s+/g, a).toLowerCase()
    }
    if (e.indexOf(a) === -1) {
        if (r) {
            e = e.charAt(0).toUpperCase() + e.substr(1)
        }
    } else {
        var n = e.indexOf(a);
        var m;
        var u = [];
        while (n !== -1) {
            m = e.charAt(0).toUpperCase();
            u.push(m + e.substr(1, n - 1));
            e = e.substr(n + 1);
            n = e.indexOf(a)
        }
        u.push(e.charAt(0).toUpperCase() + e.substr(1));
        e = u.join("");
        if (!r) {
            e = e.charAt(0).toLowerCase() + e.substr(1)
        }
    }
    if (r) {
        Phoenix.Grammar._camelizeCache.upper[i] = e
    } else {
        Phoenix.Grammar._camelizeCache.lower[i] = e
    }
    return e
}
;
Phoenix.Grammar.inflectOnQuantity = function(e, r, a) {
    if (e !== 1) {
        return a.replace("%d", e.toString())
    }
    return r
}
;
Phoenix.Grammar._splitLastWord = function(e) {
    if (e.indexOf(" ") !== -1) {
        return [e.substr(0, e.lastIndexOf(" ") + 1), e.substr(e.lastIndexOf(" ") + 1)]
    }
    if (e === Phoenix.Grammar.underscorize(e)) {
        if (e.indexOf(" ") === -1) {
            return ["", e]
        }
        return [e.substr(0, e.lastIndexOf("_") + 1), e.substr(e.lastIndexOf("_") + 1)]
    }
    var r = e.match(/(.*)((?=[a-zA-Z_]|^)(?:[0-9]+|[A-Z][a-z]*)|(?=[0-9A-Z_]|^)(?:[A-Z][a-z]*))$/);
    if (r.length && r.length === 3) {
        return [r[1], r[2]]
    }
    return ["", e]
}
;
Phoenix.Grammar.pluralize = function(e) {
    if (Phoenix.Grammar._rules.pluralize[e] !== undefined) {
        return Phoenix.Grammar._rules.pluralize[e]
    }
    if (Phoenix.Grammar._pluralizeCache[e] !== undefined) {
        return Phoenix.Grammar._pluralizeCache[e]
    }
    var r = e;
    var a = null;
    var i, n;
    var m = Phoenix.Grammar._splitLastWord(e);
    var u, o, s;
    i = m[0];
    n = m[1];
    for (var l = 0; l < Phoenix.Grammar._singularToPluralRules.length; l++) {
        o = Phoenix.Grammar._singularToPluralRules[l][0];
        u = Phoenix.Grammar._singularToPluralRules[l][1];
        if (o.test(n)) {
            s = n.match(o);
            a = i + n.replace(o, (s[1] ? "$1" : "") + u);
            break
        }
    }
    Phoenix.Grammar._pluralizeCache[r] = a;
    return a
}
;
Phoenix.Grammar.singularize = function(e) {
    if (Phoenix.Grammar._rules.singularize[e] !== undefined) {
        return Phoenix.Grammar._rules.singularize[e]
    }
    if (Phoenix.Grammar._singularizeCache[e] !== undefined) {
        return Phoenix.Grammar._singularizeCache[e]
    }
    var r = e;
    var a = null;
    var i, n, m;
    var u, o, s;
    m = Phoenix.Grammar._splitLastWord(e);
    i = m[0];
    n = m[1];
    for (var l = 0; l < Phoenix.Grammar._pluralToSingularRules.length; l++) {
        o = Phoenix.Grammar._pluralToSingularRules[l][0];
        u = Phoenix.Grammar._pluralToSingularRules[l][1];
        if (o.test(n)) {
            s = n.match(o);
            a = i + n.replace(o, (s[1] ? "$1" : "") + u);
            break
        }
    }
    Phoenix.Grammar._singularizeCache[r] = a;
    return a
}
;
Phoenix.Grammar.addSingularPluralRule = function(e, r) {
    Phoenix.Grammar._rules.singularize[r] = e;
    Phoenix.Grammar._rules.pluralize[e] = r
}
;
Phoenix.Grammar.addHumanizeRule = function(e, r) {
    Phoenix.Grammar._rules.humanize[e] = r
}
;
Phoenix.Grammar.addCamelUnderscoreRule = function(e, r) {
    Phoenix.Grammar._rules.camelize[r] = e;
    Phoenix.Grammar._rules.underscorize[e] = r
}
;
(function(e) {
    "use strict";
    var s = e.Phoenix
      , r = e.setTimeout
      , n = e.clearTimeout
      , o = 5e3
      , t = 400
      , i = s.jQuery.getMessageBlock()
      , a = " "
      , f = "in"
      , c = "message-success"
      , u = "message-danger"
      , g = "message-info"
      , l = "transitioning"
      , m = [l, u, g, c]
      , d = "successReferrer"
      , h = "successMessage"
      , v = "errorReferrer"
      , M = "errorMessage"
      , S = "error"
      , w = "notification"
      , k = "success"
      , p = false
      , I = null;
    var y = function(e) {
        i.text("").removeClass(m.join(a));
        if (!!e) {
            try {
                e()
            } catch (e) {}
        }
    };
    var j = function(e, m, j, z) {
        var P, b, L, T, Q, U = "", x = [], B = false, C = false;
        if (I) {
            n(I);
            I = null
        }
        switch (m) {
        case S:
            x.push(u);
            B = v;
            C = M;
            break;
        case w:
            if (z) {
                x.push("flash-message")
            }
            x.push(g);
            break;
        case k:
            x.push(c);
            B = d;
            C = h;
            break;
        default:
            break
        }
        if (x.length > 0) {
            x.push(f);
            U = x.join(a)
        } else {
            U = f
        }
        j = j || {};
        P = j.callback;
        b = j.afterPost || false;
        L = j.permanent || false;
        T = j.hideDelay || o;
        Q = j.hideDuration || t;
        if (!!window.Modernizr && Modernizr.sessionstorage && b === true && !!B && !!C) {
            sessionStorage.setItem(B, location.href);
            sessionStorage.setItem(C, e)
        } else {
            if (p) {
                s.Ui.clearPermanentMessage()
            }
            i.addClass(U).addClass(l).html(e).fadeIn();
            if (L === false) {
                I = r((function() {
                    n(I);
                    I = null;
                    i.fadeOut(Q, (function() {
                        y(P)
                    }
                    ))
                }
                ), T)
            } else {
                p = true
            }
        }
    };
    s.Ui = {
        showSuccessMessage: function(e, s) {
            j(e, k, s)
        },
        showMessageBar: function(e) {
            j(e)
        },
        showErrorMessage: function(e, s) {
            j(e, S, s)
        },
        showNotificationMessage: function(e, s, r) {
            j(e, w, s, r)
        },
        showPermanentMessage: function(e) {
            j(e, w, {
                permanent: true
            })
        },
        checkSuccessMessages: function() {
            if (!window.Modernizr || !Modernizr.sessionstorage)
                return;
            var e = sessionStorage.getItem(d);
            if (e) {
                if (e === document.referrer) {
                    var s = sessionStorage.getItem(h);
                    j(s, k)
                }
                sessionStorage.removeItem(h);
                sessionStorage.removeItem(d)
            }
        },
        removePermanentMessage: function(e) {
            i.fadeOut(t, (function() {
                y(e)
            }
            ))
        },
        clearPermanentMessage: function() {
            i.hide();
            y()
        },
        checkErrorMessages: function() {
            if (!window.Modernizr || !Modernizr.sessionstorage)
                return;
            var e = sessionStorage.getItem(v);
            if (e) {
                if (e === document.referrer) {
                    var s = sessionStorage.getItem(M);
                    j(s, S)
                }
                sessionStorage.removeItem(M);
                sessionStorage.removeItem(v)
            }
        },
        showLoadingScreen: function(e) {
            var n = s.jQuery.getLoadingScreen(e);
            s.jQuery.getBody().append(n);
            if (e === "Looking up link info...") {
                r((function() {
                    n.remove()
                }
                ), 5e3)
            }
        },
        hideLoadingScreen: function() {
            var e = s.jQuery.getLoadingScreen(null, true);
            e.remove()
        },
        convertTime: function(e, s, r) {
            if (e && e.toString().indexOf(":") > 0) {
                return e
            }
            if (!e || e < 0) {
                e = 0
            }
            var n = Math.floor(e / 60 % 60);
            var o = Math.floor(e / 3600);
            var t = Math.floor(e % 60);
            if (t < 10) {
                t = "0" + t
            }
            if (n < 10) {
                n = "0" + n
            }
            if (e > 3600 || s === true) {
                return o + ":" + n + ":" + t
            } else {
                return n + ":" + t
            }
        },
        convertTimeToSeconds: function(e) {
            if (e) {
                var s = e.split(":");
                if (s.length >= 3) {
                    return +s[0] * 60 * 60 + +s[1] * 60 + +s[2]
                } else if (s.length === 2) {
                    return +s[0] * 60 + +s[1]
                } else if (!isNaN(e)) {
                    return parseInt(e)
                }
            }
            return 0
        }
    };
    $((function() {
        s.Ui.checkSuccessMessages();
        s.Ui.checkErrorMessages()
    }
    ))
}
)(this);
Phoenix.Core = {
    _debugEnabled: false,
    keycodes: {
        enterKey: 13,
        rightArrow: 39,
        leftArrow: 37,
        upArrow: 38,
        downArrow: 40,
        escapeKey: 27
    },
    isTrue: function(e, n) {
        if (n === undefined) {
            n = false
        }
        if (typeof e === "string") {
            e = e.toLowerCase()
        }
        return !!e || "true" === e || n
    },
    getDebug: function() {
        return Phoenix.Core._debugEnabled
    },
    enableDebugging: function(e) {
        Phoenix.Core._debugEnabled = e ? true : false
    },
    debug: function(e) {
        if (Phoenix.Core._debugEnabled) {
            console.log(e)
        }
    },
    basename: function(e) {
        var n = e.split("/");
        return n[n.length - 1]
    }
};
Phoenix.Uploader = function() {
    "use strict";
    return this
}
;
Phoenix.Uploader._init = function(e, i) {
    "use strict";
    var t;
    var a = ["main", "url", "previous", "search", "progress"];
    var r = {
        progressItem: true,
        searchItem: true,
        searchListItem: true,
        searchImageItem: true
    };
    var s = {
        previewImage: true
    };
    $.each(i["modals"]["uploader"], (function(i, t) {
        if (r[i] !== undefined) {
            e._templates[i] = $(t)
        } else if (s[i] !== undefined) {
            e._templates[i] = $(t)
        } else {
            e._modals[i] = $(t)
        }
        if (i !== "main" && r[i] === undefined && s[i] === undefined) {
            e._modals[i].modal(Phoenix.Uploader.SUBMODAL_OPTIONS)
        }
    }
    ));
    for (t = 0; t < a.length; t++) {
        e._modals[a[t]].appendTo(document.body)
    }
    e._templates["previewImage"].insertAfter(e._modals["search"]);
    e._modals["progress"].on("hidden", (function() {
        e._abortXHR();
        e._resetAll()
    }
    ));
    e._modals["main"].find(".modal-footer").addClass("hide");
    e._modals["main"].modal({
        show: false,
        keyboard: true,
        backdrop: "static"
    });
    e._modals["previous"].on("hidden", (function() {
        var i = $(this);
        e._templates["previewImage"].find("img").attr("src", "");
        e._templates["previewImage"].find(".width").text("");
        e._templates["previewImage"].find(".height").text("");
        i.find(".galleries > li:not(:first-child)").remove();
        i.find(".images-in-gallery > li:not(.loading)").remove()
    }
    ));
    if (typeof window.File === "undefined") {
        e._modals["main"].find(".modal-body > p").addClass("hide")
    }
    Phoenix.jQuery.getDocument().trigger("uploaderReady");
    return e
}
;
Phoenix.Uploader.DEFAULT_OPTIONS = {
    complete: function(e) {
        "use strict";
        Phoenix.Core.debug("> complete");
        Phoenix.Core.debug(e)
    },
    error: function(e) {
        "use strict";
        Phoenix.Core.debug("> error");
        Phoenix.Core.debug(e);
        if (e.statusText) {
            Phoenix.Ui.showErrorMessage("Problem occured while uploading image: " + e.statusText)
        }
    },
    logger: function(e) {
        "use strict";
        Phoenix.Core.debug("> logger");
        Phoenix.Core.debug(e)
    },
    type: "image",
    headerText: "Where does your image live?",
    postURL: "/images/upload",
    urlPostURL: "/images/url-submit",
    placeholderIcon: "",
    fileType: ["image/gif", "image/jpeg", "image/png"],
    multiple: false,
    drop: true,
    dropText: "Or drag and drop your image to this window.",
    urlFieldCount: 3,
    showButtons: ["desktop", "url-address", "search-site", "previous-uploads"]
};
Phoenix.Uploader.SUBMODAL_OPTIONS = {
    backdrop: false,
    show: false
};
Phoenix.Uploader.EVENT_NAMESPACE = "uploader";
Phoenix.Uploader.prototype._modals = {
    main: null,
    url: null,
    search: null,
    previous: null,
    progress: null
};
Phoenix.Uploader.prototype._templates = {
    progressItem: null,
    searchImageItem: null
};
Phoenix.Uploader._instance = null;
Phoenix.Uploader._fileReader = null;
Phoenix.Uploader._lastDroppedFiles = [];
Phoenix.Uploader.getInstance = function(e) {
    "use strict";
    if (Phoenix.Uploader._instance === null) {
        Phoenix.Uploader._instance = new Phoenix.Uploader
    }
    if (typeof e === "function") {
        e.apply(Phoenix.Uploader._instance, [])
    }
    return Phoenix.Uploader._instance
}
;
Phoenix.Uploader.prototype.getDefaultProgressListener = function(e) {
    "use strict";
    var i = this;
    return function(t, a) {
        var r = $(e[0].children[a]);
        if (!t.lengthComputable) {
            Phoenix.Core.debug("defaultProgressListener(): length not computable!");
            i._currentOptions.logger({
                message: "Unable to calculate progress percentage."
            });
            r.find(".bar").css("width", "100%");
            r.find(".percent").text("Saving... please wait");
            return
        }
        var s = t["loaded"] || t["position"];
        var n = t["total"] || t["totalSize"];
        var o = Math.round(s / n * 100);
        r.find(".bar").css("width", o + "%");
        r.find(".percent").text(o + "%");
        if (o > 99) {
            r.find(".percent").text("Saving... please wait")
        }
    }
}
;
Phoenix.Uploader.prototype._resetAll = function() {
    "use strict";
    var e = this._modals["progress"];
    var i = this._modals["url"];
    var t = this._modals["search"];
    var a = this._modals["previous"];
    var r = t.find(".galleries > li");
    this._lastDroppedFiles = [];
    e.find("li").remove();
    $.each(this._modals, (function(e, i) {
        i.modal("hide")
    }
    ));
    t.find("input").val("");
    a.find("input").val("");
    i.find("input").each((function(e) {
        if (e === 0) {
            $(this).val("");
            return true
        }
        $(this).remove()
    }
    ));
    r.each((function(e) {
        if (e === 0) {
            return true
        }
        $(this).remove();
        e++
    }
    ));
    a.find(".galleries > li").remove();
    this._templates["previewImage"].find("img").attr("href", "");
    this._templates["previewImage"].find(".width").text("");
    this._templates["previewImage"].find(".height").text("");
    return this
}
;
Phoenix.Uploader.prototype._xhr = null;
Phoenix.Uploader.prototype._sendFiles = function(e) {
    "use strict";
    var i = this._lastDroppedFiles;
    var t = this;
    var a = this._modals["progress"].find("ul");
    var r = {};
    var s = false;
    var n = false;
    var o = false;
    if (i.length === 0) {
        Phoenix.Core.debug("_sendFiles(): files.length === 0!");
        return this
    }
    if (e === undefined) {
        e = this.getDefaultProgressListener(a)
    }
    var l = function(e, l) {
        var d, u;
        var f;
        var c;
        if (e.successful) {
            $(t._modals["progress"].find(".progress")[l]).addClass("progress-success");
            $(t._modals["progress"].find(".progress")[l]).removeClass("active");
            $(a.find(".bar")[l]).css("width", "100%");
            $(a.find(".percent")[l]).text("Done!");
            c = 0;
            $.each(e["successful"], (function(t, a) {
                if (i[c] === undefined) {
                    return false
                }
                if (typeof e["successful"][t] == "string" || e["successful"][t]instanceof String) {
                    if (i[c].name) {
                        e["successful"]["clientName"] = i[c].name
                    }
                    if (i[c].type) {
                        e["successful"]["clientType"] = i[c].type
                    }
                } else {
                    if (i[c].name) {
                        e["successful"][t]["clientName"] = i[c].name
                    }
                    if (i[c].type) {
                        e["successful"][t]["clientType"] = i[c].type
                    }
                }
                if ($.isEmptyObject(r)) {
                    r["successful"] = e["successful"]
                } else {
                    r["successful"][t] = e["successful"][t]
                }
                c++
            }
            ));
            s = true;
            if (o) {
                t._currentOptions.complete(r);
                t._resetAll()
            }
        } else if (e.error) {
            if (t._currentOptions.type === "image") {
                f = "images"
            } else {
                f = "files"
            }
            var p = typeof e.error === "string" ? e.error : e.statusText;
            Phoenix.Ui.showErrorMessage("Error uploading " + f + ": " + p);
            t._currentOptions.error($.extend({}, {
                status: p
            }, e));
            $(t._modals["progress"].find(".progress")[l]).addClass("progress-danger");
            $(t._modals["progress"].find(".progress")[l]).removeClass("active");
            $(a.find(".bar")[l]).css("width", "100%");
            $(a.find(".percent")[l]).text("Failed!");
            s = true;
            n = true;
            if (o && !n) {
                t._resetAll()
            }
        }
        if (o) {
            try {
                t._modals["main"].find("input[type=file]")[0].value = ""
            } catch (e) {
                u = $("#js-uploader-file-input");
                d = $("#js-uploader-file-input").clone(true);
                d.val("");
                u.remove();
                t._modals["main"].prepend(d)
            }
        }
    };
    var d = function(i, t, a, r) {
        if (s) {
            s = false;
            i.append("files[0]", t[a]);
            if (a == t.length - 1) {
                o = true
            }
            $.ajax({
                url: r,
                type: "POST",
                data: i,
                cache: false,
                dataType: "json",
                processData: false,
                contentType: false,
                success: function(e) {
                    l(e, a)
                },
                error: function(e) {
                    l(e, a)
                },
                xhr: function() {
                    var i = new window.XMLHttpRequest;
                    i.upload.addEventListener("loadstart", (function() {}
                    ), false);
                    i.upload.addEventListener("progress", (function(i) {
                        e(i, a)
                    }
                    ), false);
                    return i
                }
            })
        } else {
            window.setTimeout((function() {
                d.call(this, i, t, a, r)
            }
            ), 1e3)
        }
    };
    for (var u = 0; u < i.length; u++) {
        var f = new FormData(this._modals["main"].find("form")[0]);
        if (u == 0) {
            s = true
        }
        d.call(this, f, i, u, this._currentOptions.postURL)
    }
    return this
}
;
Phoenix.Uploader.prototype._abortXHR = function() {
    "use strict";
    if (this._xhr !== null) {
        this._xhr.abort()
    }
    return this
}
;
Phoenix.Uploader.prototype._commonFileOnRead = function(e, i) {
    "use strict";
    var t = this;
    return function() {
        var a = i._modals["progress"];
        var r = a.find("ul");
        var s = i._templates["progressItem"].clone();
        s.find("img").attr("src", t.type.substr(0, 6) === "image/" ? this.result : i._currentOptions.placeholderIcon);
        s.find(".details > .name").text(t.name);
        s.find(".details > .percent").text("1%");
        s.find(".progress > .bar").css("width", "1%");
        r.append(s);
        if (e) {
            var n = "image";
            if (i._currentOptions.type === "media") {
                n = "file"
            }
            if (i._currentOptions.multiple) {
                n += "s"
            }
            a.find(".js-modal-title").text("Uploading " + n);
            a.modal("show");
            i._sendFiles()
        }
    }
}
;
Phoenix.Uploader.prototype._modalFileUpload = function(e, i, t) {
    "use strict";
    var a = this._modals["progress"];
    var r = "images";
    var s = this;
    if (this._fileReader.readyState == 0) {
        this._fileReader.onloadend = s._commonFileOnRead.call(e, t, s);
        this._fileReader.readAsDataURL(e);
        a.find(".js-modal-title").text("Uploading " + r);
        a.modal("show")
    } else if (this._fileReader.readyState == 2) {
        this._fileReader = new FileReader;
        this._fileReader.onloadend = s._commonFileOnRead.call(e, t, s);
        this._fileReader.readAsDataURL(e)
    } else {
        window.setTimeout((function() {
            s._modalFileUpload.call(s, e, s._fileReader, t)
        }
        ), 200)
    }
}
;
Phoenix.Uploader.prototype._createListItem = function(e, i) {
    "use strict";
    if (this._currentOptions.type !== "image" || i === undefined) {
        i = this._currentOptions.placeholderIcon
    }
    var t = this._templates["progressItem"].clone();
    t.find("img").attr("src", i);
    t.find(".details > .name").text(e);
    t.find(".details > .percent").text("1%");
    t.find(".progress > .bar").css("width", "1%");
    return t
}
;
Phoenix.Uploader._sendURLsCallback = function() {
    "use strict";
    var e = this._modals["url"];
    var i = e.find('[type="url"]');
    var t = {};
    var a = 0;
    var r = typeof i[0].checkValidity === "function";
    var s = this;
    var n = this._modals["progress"];
    var o = n.find("ul");
    var l = e.find(".error-message");
    var d = false;
    var u = 0;
    l.addClass("hide");
    i.each((function() {
        var e = $(this).val();
        if (!e) {
            return
        }
        if (r && !this.checkValidity() || !/^https?\:\/\//.test(e)) {
            l.removeClass("hide");
            d = true;
            return false
        }
        var i = e.split(/https?\:\/\//);
        var n;
        if (!i[0]) {
            n = i[1]
        } else {
            n = i[0]
        }
        n = n.substr(0, 20) + "...";
        var f;
        t["urls[" + a + "]"] = e;
        f = s._createListItem(n, e);
        o.append(f);
        u++;
        a++
    }
    ));
    if (a === 0 || d) {
        return
    }
    var f = function(e, i) {
        var t = o.children("li");
        t.find(".progress > .bar").css("width", i + "%");
        t.find(".details > .percent").text(e)
    };
    f("", 0);
    n.modal("show");
    setTimeout((function() {
        f("Saving... please wait", 25)
    }
    ), 200);
    this._xhr = $.post(this._currentOptions.urlPostURL, t, (function(e) {
        f("Done", 100);
        n.find(".progress").addClass("progress-success");
        n.find(".progress").removeClass("active");
        $.each(e["successful"], (function(i, t) {
            e["successful"][i]["clientName"] = t["name"] ? t["name"] : "";
            e["successful"][i]["clientType"] = t["mimeType"] ? t["mimeType"] : ""
        }
        ));
        setTimeout((function() {
            s._resetAll();
            s._currentOptions.complete(e);
            s._resetAll()
        }
        ), 300)
    }
    ), "json").error((function(e) {
        var i;
        try {
            i = JSON.parse(e.responseText)
        } catch (e) {
            i = {
                url: "An unknown error occurred. Please try again."
            }
        }
        s._resetAll();
        s._currentOptions.error(i)
    }
    ))
}
;
Phoenix.Uploader.prototype._eventsBound = {
    desktopButtonClick: false,
    fileInputChange: false,
    urlModalNext: false,
    searchModalNext: false,
    searchModalClose: false,
    previousModalNext: false,
    previousModalClose: false,
    urlAddFieldClick: false,
    searchFieldAutocomplete: false,
    dragAndDrop: false,
    previousModalShown: false,
    modalEditClick: false,
    modalSelectButtonClick: false,
    modalPreviewClick: false,
    previousModalScroll: false,
    galleryImageClick: false,
    searchModalTagClick: false
};
Phoenix.Uploader._currentSearchGUID = null;
Phoenix.Uploader._addURLFieldCallback = function(e) {
    "use strict";
    var i = $(this);
    var t = i.parent();
    var a = t.find("input").length;
    if (a === 10) {
        e.preventDefault();
        return false
    }
    var r = t.find("input:first-child").clone();
    r.val("").insertBefore(i);
    e.preventDefault();
    return false
}
;
Phoenix.Uploader.prototype._enableDragAndDrop = function(e) {
    "use strict";
    if (typeof window.File === "undefined") {
        return this
    }
    var i = Phoenix.jQuery.getBody();
    var t = this;
    var a = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!e.originalEvent.dataTransfer || !e.originalEvent.dataTransfer.files) {
            return false
        }
        t._lastDroppedFiles = e.originalEvent.dataTransfer.files;
        if (!t._currentOptions.multiple) {
            t._lastDroppedFiles = [t._lastDroppedFiles[0]]
        }
        t._fileReader = new FileReader;
        if (t._lastDroppedFiles.length > 100) {
            var i = "Too many files! Calm yoself, less is more";
            Phoenix.Ui.showErrorMessage("Error uploading: " + i);
            return false
        }
        for (var a = 0; a < t._lastDroppedFiles.length; a++) {
            var r = t._lastDroppedFiles[a];
            t._modalFileUpload(r, t._fileReader, a === t._lastDroppedFiles.length - 1)
        }
        return false
    };
    var r = function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false
    };
    if (!e && this._eventsBound.dragAndDrop) {
        i.unbind("dragover." + Phoenix.Uploader.EVENT_NAMESPACE);
        i.unbind("drop." + Phoenix.Uploader.EVENT_NAMESPACE);
        this._eventsBound.dragAndDrop = false;
        return this
    }
    if (!this._eventsBound.dragAndDrop) {
        i.bind("dragover." + Phoenix.Uploader.EVENT_NAMESPACE, r);
        i.bind("dragenter." + Phoenix.Uploader.EVENT_NAMESPACE, r);
        i.bind("drop." + Phoenix.Uploader.EVENT_NAMESPACE, a);
        this._eventsBound.dragAndDrop = true
    }
    return this
}
;
Phoenix.Uploader.show = function() {
    "use strict";
    var e = /Safari\/\d+/.test(navigator.userAgent) && navigator.vendor === "Apple Computer, Inc.";
    Phoenix.Uploader.getInstance((function() {
        var i = this;
        var t = this._modals["main"];
        var a = false;
        var r, s, n;
        var o;
        if (!t) {
            return
        }
        var l = $("#js-uploader-file-input");
        var d = $("#js-desktop-button");
        var u = this._modals["url"];
        var f = u.find(".js-add-another");
        t.find(".js-modal-title").text(this._currentOptions.headerText);
        if (e) {
            t.on("shown", (function() {
                l.css($.extend({}, {
                    width: d.outerWidth()
                }, d.position()));
                l.css("top", parseInt(l.css("top"), 10) + 1);
                t.off("shown")
            }
            ))
        } else if (!this._eventsBound.desktopButtonClick) {
            if (typeof window.File === "function" || typeof window.File === "object") {
                $(window).bind("blur", (function() {
                    d.prop("disabled", true);
                    setTimeout((function() {
                        d.prop("disabled", false)
                    }
                    ), 2e3)
                }
                )).bind("focus", (function() {
                    d.prop("disabled", false)
                }
                ));
                d.on("click", (function(e) {
                    l.trigger("click");
                    e.preventDefault();
                    return false
                }
                ));
                l.css("left", -1e4)
            } else {
                l.addClass("hide");
                d.prop("disabled", true)
            }
            this._eventsBound.desktopButtonClick = true
        }
        if (!this._eventsBound.fileInputChange) {
            if (typeof window.File === "function" || typeof window.File === "object") {
                l.change((function() {
                    if (this.files && this.files.length) {
                        i._lastDroppedFiles = this.files;
                        i._fileReader = new FileReader;
                        if (this.files.length > 100) {
                            var e = "Too many files! Calm yoself, less is more";
                            Phoenix.Ui.showErrorMessage("Error uploading: " + e);
                            return false
                        }
                        for (var t = 0; t < this.files.length; t++) {
                            var a = this.files[t];
                            i._modalFileUpload(a, i._fileReader, t === this.files.length - 1)
                        }
                    }
                }
                ))
            }
            this._eventsBound.fileInputChange = true
        }
        l.prop("multiple", this._currentOptions.multiple);
        l.attr("accept", this._currentOptions.fileType.join(","));
        if (!this._currentOptions.multiple) {
            f.addClass("hide")
        } else {
            f.removeClass("hide");
            if (!this._eventsBound.urlAddFieldClick) {
                f.on("click", Phoenix.Uploader._addURLFieldCallback);
                this._eventsBound.urlAddFieldClick = true
            }
        }
        if (!this._eventsBound.urlModalNext) {
            u.find(".js-btn-next").on("click", (function(e) {
                Phoenix.Uploader._sendURLsCallback.apply(i, []);
                e.preventDefault();
                return false
            }
            ));
            this._eventsBound.urlModalNext = true
        }
        var c = function() {
            Phoenix.Core.debug("Error occurred while getting data.");
            Phoenix.Core.debug(arguments, true)
        };
        var p = i._modals["search"].find(".images-in-gallery");
        var h = i._modals["search"].find(".galleries");
        var m = function(e) {
            return function(t, a) {
                var r = a["original"];
                var s = a["thumbnail"];
                var n = i._templates["searchImageItem"].clone();
                var o = n.find(".dimensions");
                n.attr("data-original-url", r);
                n.attr("data-original-width", a["width"]);
                n.attr("data-original-height", a["height"]);
                n.attr("data-image-id", a["id"]);
                n.attr("data-mimetype", a["mimetype"]);
                n.find("img").attr("src", s);
                n.find("a").attr("title", a["caption"]);
                o.find(".width").text(a["width"]);
                o.find(".height").text(a["height"]);
                n.insertBefore(e.children("li.loading"))
            }
        };
        var g = function(e) {
            return function(i, t) {
                var a = t["name"];
                var r = t["id"];
                var s, n;
                if (a.toLowerCase() === "all images") {
                    n = e.find(".all-images-link").parent();
                    if (n.length === 0) {
                        n = $('<li class="selected"/>');
                        n.append($('<a href="#" class="all-images-link"/>').text("All Images"));
                        e.append(n)
                    }
                    n.children("a").attr("data-id", r);
                    return
                }
                s = $("<li>");
                s.append($('<a href="#">').text(a).attr("data-id", r));
                e.append(s)
            }
        };
        var v = function(e, i) {
            return function(t) {
                var a = t["images"];
                var r = t["tags"];
                var s = p.parent().find(".js-no-images");
                var n = p.parent().find("li.loading");
                var o = p.parent().find(".js-error");
                n.addClass("hide");
                s.addClass("hide");
                o.addClass("hide");
                if (i === undefined || i) {
                    p.find("li:not(.loading)").remove()
                }
                if (a === undefined || r === undefined || a.length === 0) {
                    s.removeClass("hide");
                    return
                }
                $.each(a, m(p));
                if (e) {
                    $.each(r, g(h))
                }
            }
        };
        var _ = function(e, t, a) {
            return function(r) {
                var s = $(this);
                var n = parseInt(s.attr("data-id"), 10);
                var o = {
                    count: 16,
                    tag: n
                };
                var l = s.parent().find(".js-no-images");
                var d = p.parent().find("li.loading");
                var u = p.parent().find(".js-error");
                d.removeClass("hide");
                l.addClass("hide");
                u.addClass("hide");
                if (isNaN(n)) {
                    d.addClass("hide");
                    u.removeClass("hide");
                    r.preventDefault();
                    return false
                }
                p.find("li:not(.loading)").remove();
                s.parents(".galleries").find("li").removeClass("selected");
                s.parent().addClass("selected");
                if (a) {
                    o = $.extend({}, o, {
                        object: i._currentSearchGUID
                    })
                }
                $.post(e, o, t(false), "json").error((function() {
                    c();
                    d.addClass("hide");
                    u.removeClass("hide")
                }
                ));
                r.preventDefault();
                return false
            }
        };
        if (!this._eventsBound.searchFieldAutocomplete) {
            var x = this._modals["search"].find("input");
            x.autocomplete({
                autoRedirect: false,
                delay: 0,
                showNotificationBar: true,
                onItemSelect: function(e) {
                    if (!Object.keys(e).length) {
                        return false
                    }
                    i._modals["search"].children("form").trigger("reset");
                    if (isNaN(e["contentTypeId"])) {
                        return false
                    }
                    if (isNaN(e["id"])) {
                        return false
                    }
                    var t = e["contentTypeId"] + "-" + e["id"];
                    var a = {
                        object: t,
                        count: 16
                    };
                    i._modals["search"].find("li:not(.loading)").remove();
                    i._modals["search"].find("li.loading").removeClass("hide");
                    i._modals["search"].find(".js-error").addClass("hide");
                    i._modals["search"].find(".js-no-images").addClass("hide");
                    i._currentSearchGUID = t;
                    AjaxApiRequest.makePostApiRequest("/api/image/object-image/", a, v(true), (function() {
                        c();
                        i._modals["search"].find("li.loading").addClass("hide");
                        i._modals["search"].find(".js-error").removeClass("hide")
                    }
                    ));
                    return false
                }
            });
            this._eventsBound.searchFieldAutocomplete = true
        }
        if (!this._eventsBound.searchModalClose) {
            var C = function() {
                var e = $(this);
                e.find(".galleries > li:not(:first-child)").removeAttr("data-id").remove();
                e.find(".images-in-gallery > li:not(.loading)").remove()
            };
            this._modals["search"].on("hidden", C);
            this._eventsBound.searchModalClose = true
        }
        if (!this._eventsBound.searchModalTagClick) {
            this._modals["search"].on("click", ".galleries > li > a", _("/api/image/object-image/", v, true));
            this._eventsBound.searchModalTagClick = true
        }
        o = function(e, t) {
            return function(a) {
                var r = a["images"];
                var s = a["tags"];
                var n = i._modals["previous"].find(".images-in-gallery");
                var o = i._modals["previous"].find(".galleries");
                var l = o.parent().find("li.loading");
                var d = o.parent().find(".js-no-images");
                var u = o.parent().find(".js-error");
                l.addClass("hide");
                d.addClass("hide");
                u.addClass("hide");
                if (t === undefined || t) {
                    n.children("li:not(.loading)").remove()
                }
                if (r === undefined || s === undefined || !r.length) {
                    d.removeClass("hide");
                    return
                }
                $.each(r, m(n));
                if (e) {
                    $.each(s, g(o))
                }
            }
        }
        ;
        if (!this._eventsBound.previousModalShown) {
            this._modals["previous"].on("show", (function() {
                var e = $(this).find(".loading");
                e.removeClass("hide");
                AjaxApiRequest.makePostApiRequest("/api/image/user-image/", {
                    count: 16
                }, o(true), (function() {
                    e.addClass("hide")
                }
                ))
            }
            ));
            this._modals["previous"].on("click", ".galleries > li > a", (function(e) {
                var i = $(this);
                var t = parseInt(i.attr("data-id"), 10);
                var a = i.parents(".galleries");
                var r = a.siblings(".images-in-gallery-container");
                if (isNaN(t)) {
                    r.find(".js-error").removeClass("hide");
                    e.preventDefault();
                    return false
                }
                r.find("li:not(.loading)").remove();
                r.find("li.loading").removeClass("hide");
                a.find("li").removeClass("selected");
                i.parent().addClass("selected");
                AjaxApiRequest.makePostApiRequest("/api/image/user-image/", {
                    count: 16,
                    tag: t
                }, o(), (function() {
                    c();
                    r.find("li.loading").addClass("hide");
                    r.find(".js-error").removeClass("hide")
                }
                ));
                e.preventDefault();
                return false
            }
            ));
            this._eventsBound.previousModalShown = true
        }
        var y = function(e) {
            return function() {
                var t = $(this).parents("li");
                var a;
                var r = t.attr("data-original-url");
                if (!i._currentOptions.multiple) {
                    t.parent().children("li").removeClass("selected")
                }
                t.addClass("selected");
                a = {
                    successful: {}
                };
                a["successful"][r] = {
                    url: r,
                    clientName: Phoenix.Core.basename(r),
                    clientType: t.attr("data-mimetype"),
                    id: null,
                    guid: null
                };
                a.from = e;
                i._currentOptions.complete(a)
            }
        };
        if (!this._eventsBound.modalEditClick) {
            this._modals["previous"].on("click", "li span.js-edit", y("previous"));
            this._modals["search"].on("click", "li span.js-edit", y("search"));
            this._eventsBound.modalEditClick = true
        }
        if (!this._eventsBound.modalPreviewClick) {
            var w = function() {
                var e = i._templates["previewImage"];
                var t = $(this).parents("li");
                var a = t.attr("data-original-url");
                var r = t.attr("data-original-width");
                var s = t.attr("data-original-height");
                var n = t.find("a").attr("title");
                e.find(".width").text(r);
                e.find(".height").text(s);
                e.find("img").attr("src", a).attr("title", n);
                e.removeClass("hide")
            };
            this._modals["previous"].on("click", "li span.js-preview", w);
            this._modals["search"].on("click", "li span.js-preview", w);
            this._templates["previewImage"].on("click", (function() {
                $(this).addClass("hide")
            }
            ));
            this._eventsBound.modalPreviewClick = true
        }
        if (!this._eventsBound.modalSelectButtonClick) {
            var P = function(e) {
                return function(a) {
                    var r = i._modals[e];
                    var s = r.find(".images-in-gallery > li.selected");
                    var n = {
                        successful: {}
                    };
                    if (s.length !== 0) {
                        s.each((function() {
                            var e = $(this).attr("data-original-url");
                            var i = parseInt($(this).attr("data-image-id"), 10);
                            n["successful"][e] = {
                                url: e,
                                id: isNaN(i) ? null : i,
                                guid: isNaN(i) ? null : "1300-" + i
                            }
                        }
                        ));
                        i._currentOptions.complete(n);
                        r.modal("hide");
                        t.modal("hide")
                    }
                    a.preventDefault();
                    return false
                }
            };
            this._modals["previous"].on("click", ".btn-success", P("previous"));
            this._modals["search"].on("click", ".btn-success", P("search"));
            this._eventsBound.modalSelectButtonClick = true
        }
        var b = function(e, t, r, s, n, o) {
            return function() {
                if (this.scrollHeight - this.offsetHeight === this.scrollTop && !a) {
                    var r = s.find("li:not(.loading)").length;
                    var l = parseInt(t.parent().find(".galleries > .selected > a").attr("data-id"), 10);
                    var d = {
                        count: 16,
                        start: r,
                        tag: l
                    };
                    var u = t.find("li.loading");
                    u.removeClass("hide");
                    if (isNaN(l)) {
                        u.addClass("hide");
                        return
                    }
                    if (o) {
                        d = $.extend({}, d, {
                            object: i._currentSearchGUID
                        })
                    }
                    a = true;
                    AjaxApiRequest.makePostApiRequest(e, d, (function(e) {
                        a = false;
                        u.addClass("hide");
                        n(false, false)(e);
                        if (!e || !e["images"] || !e["images"].length) {
                            t.find(".js-no-images").hide()
                        }
                    }
                    ), (function() {
                        u.addClass("hide");
                        window.alert("Error loading images. Please try again")
                    }
                    ))
                }
            }
        };
        if (!this._eventsBound.previousModalScroll) {
            r = this._modals["previous"].find(".images-in-gallery-container");
            s = this._modals["previous"].find(".images-in-gallery-container > .navigation");
            n = this._modals["previous"].find(".images-in-gallery");
            r.on("scroll", b("/api/image/user-image/", r, s, n, o));
            this._eventsBound.previousModalScroll = true
        }
        if (!this._eventsBound.searchModalScroll) {
            r = this._modals["search"].find(".images-in-gallery-container");
            s = this._modals["search"].find(".images-in-gallery-container > .navigation");
            n = this._modals["search"].find(".images-in-gallery");
            r.on("scroll", b("/api/image/object-image/", r, s, n, v, true));
            this._eventsBound.searchModalScroll = true
        }
        if (!this._eventsBound.galleryImageClick) {
            var U = function(e) {
                var t = $(this);
                var a = t.parent();
                if (a.hasClass("selected")) {
                    a.removeClass("selected")
                } else {
                    if (!i._currentOptions.multiple) {
                        a.parent().find(".selected").removeClass("selected")
                    }
                    a.addClass("selected")
                }
                e.preventDefault();
                return false
            };
            this._modals["previous"].on("click", ".images-in-gallery > li > a", U);
            this._modals["search"].on("click", ".images-in-gallery > li > a", U);
            this._eventsBound.galleryImageClick = true
        }
        this._enableDragAndDrop(this._currentOptions.drop);
        this._modals["main"].find(".modal-body > p").text(this._currentOptions.dropText)
    }
    ))
}
;
Phoenix.Uploader.uploadDataURIImage = function(e, i, t, a) {
    "use strict";
    var r = typeof Blob === "function" && typeof FormData === "function" && typeof Uint8Array === "function" && typeof ArrayBuffer === "function" && typeof DataView === "function";
    var s, n, o;
    var l, d, u, f;
    var c, p;
    if (r) {
        s = new XMLHttpRequest;
        n = new FormData;
        i = Phoenix.Core.basename(i);
        if (e.split(",")[0].indexOf("base64") >= 0) {
            l = window.atob(e.split(",")[1])
        } else {
            l = window.unescape(e.split(",")[1])
        }
        d = e.split(",")[0].split(":")[1].split(";")[0];
        u = new ArrayBuffer(l.length);
        f = new Uint8Array(u);
        for (c = 0,
        p = l.length; c < p; c++) {
            f[c] = l.charCodeAt(c)
        }
        n.append("filename", i);
        n.append("blob", new window.Blob([new DataView(u)],{
            type: d
        }));
        s.addEventListener("error", (function() {
            Phoenix.Core.debug({
                message: "An error occurred during the request.",
                args: arguments
            })
        }
        ), false);
        s.addEventListener("readystatechange", (function() {
            var e;
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        e = JSON.parse(this.responseText);
                        t({
                            successful: {
                                editedImage: {
                                    name: i,
                                    id: e["id"],
                                    url: e["url"],
                                    guid: "1300-" + e["id"]
                                }
                            }
                        })
                    } catch (e) {
                        a()
                    }
                }
            }
        }
        ), false);
        s.open("POST", "/images/upload/blob/");
        s.setRequestHeader("Cache-Control", "no-cache");
        s.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        s.send(n)
    } else {
        o = {
            filename: i,
            data_uri: e
        };
        if (!o["filename"]) {
            o["filename"] = Phoenix.Cryptography.randomString(16, "alphanumeric")
        }
        o["filename"] = Phoenix.Core.basename(o["filename"]);
        AjaxApiRequest.makePostApiRequest("/images/upload/data-uri/", o, (function(e) {
            t({
                successful: {
                    editedImage: {
                        name: o["filename"],
                        id: e["id"],
                        url: e["url"],
                        guid: "1300-" + e["id"]
                    }
                }
            })
        }
        ))
    }
}
;
Phoenix.Uploader.prototype._currentOptions = Phoenix.Uploader.DEFAULT_OPTIONS;
$((function() {
    "use strict";
    var e = $("meta[name=modal-cdn-url]").attr("content");
    $.getJSON(e, (function(e) {
        Phoenix.Uploader._init(Phoenix.Uploader.getInstance(), e)
    }
    ));
    $.uploader = function(e) {
        Phoenix.Uploader.getInstance((function() {
            if (e.multiple === undefined) {
                e.multiple = false
            }
            this._currentOptions = $.extend({}, Phoenix.Uploader.DEFAULT_OPTIONS, e);
            this._originalCallback = this._currentOptions.complete;
            var i = this;
            var t = ["desktop", "url-address", "search-site", "previous-uploads"];
            if (!this._modals["progress"]) {
                return
            }
            this._modals["progress"].find(".modal-header > .close").on("click", (function(e) {
                i._abortXHR();
                i._resetAll();
                e.preventDefault();
                return false
            }
            ));
            $.each(t, (function(e, t) {
                var a = $('button[data-target="#js-' + t + '-modal"]');
                if (0 <= $.inArray(t, i._currentOptions.showButtons)) {
                    a.removeClass("hide")
                } else {
                    a.addClass("hide")
                }
            }
            ));
            Phoenix.Uploader.show()
        }
        ))
    }
}
));
$((function() {
    "use strict";
    var e = function(e) {
        if (!e.length) {
            return
        }
        var a = e.closest(e.data("search-parent-selector"))
          , t = e.find("select")
          , r = e.find("#search-main, .js-site-search-query")
          , s = e.data("search-landing") == true
          , i = true
          , n = e.data("search-results-length")
          , l = true;
        if (!n) {
            a = e;
            i = true;
            n = 10;
            l = false
        }
        e.find("input").on("focusin", (function() {
            e.addClass("is-focused");
            $("body").addClass("has-search-focused")
        }
        ));
        e.find("input").on("focusout", (function() {
            e.removeClass("is-focused");
            $("body").removeClass("has-search-focused")
        }
        ));
        var o = {};
        if (e.find('[name="from_cms"]').length) {
            o["cms"] = 1
        }
        o["header"] = 1;
        t.on("change", (function() {
            if (r.val().length === 0) {
                return
            }
            var e = $.Event("keydown");
            e.keyCode = 27;
            r.trigger(e);
            e = $.Event("keydown");
            e.keyCode = 13;
            r.trigger(e, true)
        }
        ));
        return r.autocomplete({
            autoRedirect: true,
            searchIndex: [],
            selectFirst: true,
            showNotificationBar: true,
            notificationBarSearch: s,
            notificationSearchUrl: "/search/",
            extraParams: o,
            parentModal: a,
            autoWidth: null,
            enableForMedia: "(min-width: 321px)",
            preventDefaultReturn: false,
            finishOnBlur: false,
            bodyOnClickFilter: e,
            selectFiltering: true,
            maxItemsToShow: n,
            showMore: i,
            flexboxAutocomplete: l
        })
    };
    (function() {
        var a = $("#siteSearch, .js-site-search");
        a.each((function() {
            e($(this))
        }
        ))
    }
    )()
}
));
$((function() {
    "use strict";
    var e = $("#serp-search")
      , a = e.find("select")
      , t = e.find("input[name='q']");
    if (e.length === 0) {
        return
    }
    var r;
    var s = $("#default-content .primary-content .search-results");
    var i = false;
    r = function(e, r) {
        var n = {
            page: 1,
            q: t.val(),
            srp: true,
            module: "site"
        };
        var l = 0;
        var o;
        if (i) {
            return
        }
        if (r) {
            n = $.extend({}, n, r)
        }
        if (e) {
            n["client"] = e
        }
        s.addClass("loading");
        if (a.val()) {
            n["i"] = a.val()
        }
        o = s.children("li").clone(true);
        s.children("li").remove();
        AjaxApiRequest.makeGetApiRequest("/jsonsearch/", n, (function(e) {
            var t = $(e["pagination"]), r, l = _.template($("#resultTemplate").html());
            history.pushState({}, "", "/search/?" + ("i"in n ? "i=" + n["i"] + "&" : "") + "q=" + n["q"]);
            $.each(e["results"], (function(e, a) {
                if (a["deck"]) {
                    a["deck"] = a["deck"].replace(/(<([^>]+)>)/gi, "")
                } else {
                    a["deck"] = ""
                }
                s.append(l({
                    result: a
                }))
            }
            ));
            if ($(t[0]).hasClass("paginate")) {
                r = s.siblings(".paginate");
                if (r.length === 0) {
                    t.insertAfter(s)
                } else {
                    r.replaceWith(t)
                }
                t.find("a").each((function() {
                    var e = $(this);
                    var t = parseInt($(this).text(), 10);
                    var r = "/search/?q=" + n["q"];
                    var s = 0;
                    var i = e.parent();
                    if (i.hasClass("results")) {
                        return
                    }
                    if (a.val()) {
                        r += "&i=" + a.val()
                    }
                    if (isNaN(t)) {
                        if (i.hasClass("next")) {
                            t = n["page"] + 1
                        } else if (i.hasClass("prev")) {
                            t = n["page"] - 1
                        } else {
                            t = 1
                        }
                    }
                    r += "&page=" + t;
                    e.attr("href", r)
                }
                ))
            } else {
                r = s.siblings(".paginate");
                r.replaceWith("")
            }
            i = false;
            s.removeClass("loading")
        }
        ), (function() {
            i = false;
            s.append(o);
            s.removeClass("loading");
            Phoenix.Ui.showErrorMessage("Error occurred while loading results, showing previous results")
        }
        ))
    }
    ;
    e.on("submit", (function() {
        a.prop("disabled", !a.val())
    }
    ));
    a.on("change", (function() {
        r("search")
    }
    ))
}
));
(function(a, t) {
    "use strict";
    var e = function(a, e) {
        var i = t(a.target), n = a.data.callback, r;
        i.data("invalid", null);
        i.trigger("preSend");
        r = i.data("invalid");
        if (r) {
            a.preventDefault();
            a.stopPropagation()
        } else {
            if (n !== undefined) {
                n.call(this, a, e)
            }
        }
    };
    var i = "data-ajaxForm";
    t.ajaxFormOn = function(a, i) {
        t(document).on("submit", a, {
            callback: i
        }, e)
    }
    ;
    t.fn.ajaxForm = function(a, i) {
        if (i == null) {
            i = a;
            a = undefined
        }
        return this.each((function() {
            var n = t(this);
            if (n.data("ajax-initalized")) {
                return
            }
            n.data("ajax-initalized", true).attr("data-ajaxForm", "true").on("submit", a, {
                element: this,
                callback: i
            }, (function(a, t) {
                e.call(this, a, t)
            }
            ))
        }
        ))
    }
    ;
    t.fn.isAjaxForm = function() {
        return t(this).attr(i) === "true"
    }
    ;
    t((function() {
        function a() {
            t(".js-ajax-form").ajaxForm((function(a) {
                a.preventDefault();
                var e = t(this);
                var i = t("button[type=submit]");
                var n = new FormData(e[0]);
                Phoenix.Ui.showLoadingScreen("Saving&hellip;");
                i.attr("disabled", "disabled");
                var r = t(this).attr("action");
                var o = t(this).attr("method");
                t.ajax({
                    url: r,
                    data: n,
                    type: o,
                    contentType: false,
                    processData: false,
                    success: function(a) {
                        e.trigger("postSend");
                        Phoenix.Ui.showSuccessMessage("Saved", true)
                    },
                    error: function(a, t, e) {
                        Phoenix.Ui.showErrorMessage("Error Saving")
                    },
                    complete: function() {
                        Phoenix.Ui.hideLoadingScreen();
                        i.removeAttr("disabled");
                        if (e.data("dismiss")) {
                            t(e.data("dismiss")).modal("hide")
                        }
                    }
                });
                return false
            }
            ))
        }
        a();
        t(document).on("riverPaginate", a)
    }
    ))
}
)(this, jQuery);
var FuzzyDate = function() {
    "use strict";
    return this
};
FuzzyDate.prototype.selectors = [".fuzzy-datetime", ".wiki-datetime"];
FuzzyDate.prototype.initAll = function() {
    "use strict";
    $(this.selectors.join(",")).each((function() {
        var e = $(this);
        var t = e.find('input[type="hidden"]');
        var a;
        if (t.length) {
            a = parseInt(t.val(), 10);
            if (isNaN(a)) {
                a = 0
            }
        }
        e.wikiDatePicker(a)
    }
    ));
    return this
}
;
FuzzyDate.transformDate = function(e, t) {
    if (!e) {
        return ""
    }
    var a = e.getFullYear();
    var i = e.getMonth() + 1;
    var n = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var r = ["Q1", "Q2", "Q3", "Q4"];
    switch (t) {
    case 0:
        var f = e.getDate();
        return (i > 9 ? i : "0" + i) + "/" + (f > 9 ? f : "0" + f) + "/" + a;
        break;
    case 1:
        return n[i - 1] + " " + a;
    case 2:
        return r[Math.floor((i + 1) / 3)] + " " + a;
    case 3:
        return a
    }
}
;
$((function() {
    "use strict";
    var e = (new FuzzyDate).initAll();
    $(this).ajaxComplete(e.initAll.bind(e))
}
));
(function(e) {
    "use strict";
    e.fn.wikiDateDisplay = function() {
        return this.each((function() {
            var t = e(this);
            if (typeof t.data("type") === "undefined") {
                return
            }
            var a = new Date(t.text());
            if (isNaN(a.getTime())) {
                return
            }
            var i = FuzzyDate.transformDate(a, t.data("type"));
            t.text(i)
        }
        ))
    }
    ;
    e.fn.wikiDatePicker = function(t, a, i, n, r, f, s, l) {
        return this.each((function() {
            var o = e(this);
            if (o.data("fuzzy-date") && !a) {
                return
            }
            var p = o.find("input.datepicker-input");
            var u = o.find("select");
            var v = o.find('input[type="hidden"]');
            var d = o.find("a.swap");
            var c = o;
            if (p.length === 0 && typeof i !== "undefined") {
                p = i
            }
            if (u.length !== 3 && typeof n !== "undefined") {
                u = n
            }
            if (v.length <= 1 && typeof r !== "undefined") {
                v = r
            }
            if (d.length !== 1 && typeof f !== "undefined") {
                d = f
            }
            var h = p.length !== 0;
            var g = u.length === 3;
            var D = v.length >= 1;
            var y = d.length === 1 && d.children("span").length === 2;
            var w;
            var k;
            var z;
            var m = 0;
            var I = 1;
            var F = 2;
            var b = 3;
            if (typeof a !== "undefined" && a && t !== 0 && t !== 1 && p.length === 1 && typeof t !== "undefined" && t.length > 1) {
                if (t.indexOf("T") !== -1) {
                    t = t.split("T")[0];
                    t = t.split("-")[1] + "/" + t.split("-")[2] + "/" + t.split("-")[0]
                }
                p.datepicker("setDate", new Date(t));
                t = 0;
                if (typeof s !== "undefined") {
                    t = parseInt(s, 10)
                }
            }
            if (l) {
                p.datepicker("setDate", new Date)
            }
            var N = t === undefined ? m : parseInt(t, 10);
            if (!N) {
                N = m
            }
            var M = function(e) {
                if (e === undefined) {
                    e = new Date(p.val())
                }
                var t = e.getMonth() + 1;
                var a = Math.floor((t - 1 + 3) / 3);
                var i = e.getFullYear();
                if (N === m || N === I) {
                    w.find("option").prop("selected", false);
                    w.find('option[value="' + t + '"]').prop("selected", true)
                }
                if (N === F) {
                    z.find("option").prop("selected", false);
                    z.find('option[value="' + a + '"]').prop("selected", true)
                }
                k.find("option").prop("selected", false);
                k.find('option[value="' + i + '"]').prop("selected", true)
            };
            var A = function() {
                var t = parseInt(v.val(), 10);
                var a = [];
                if (t === m && (!p.data().datepicker.getDate() || !p.val())) {
                    u.each((function() {
                        var t = e(this);
                        t.find("option").prop("selected", false);
                        t.find("option:first").prop("selected", true)
                    }
                    ))
                } else {
                    u.each((function() {
                        var t = parseInt(e(this).val(), 10);
                        if (t) {
                            a.push(t)
                        }
                    }
                    ));
                    if (!a.length) {
                        p.val("").prop("value", "").attr("value", "")
                    }
                }
            };
            var $ = function() {
                var e = !!parseInt(w.val(), 10);
                var t = !!parseInt(z.val(), 10);
                var a = !!parseInt(k.val(), 10);
                if (!e && !t && a) {
                    N = b;
                    v.val(b)
                }
            };
            var Q = function(t) {
                return function() {
                    var a = parseInt(e(this).val(), 10);
                    var i = new Date(p.val());
                    var n = "set" + t;
                    if (!i || isNaN(i.getTime())) {
                        i = new Date
                    }
                    if (!a) {
                        A();
                        $();
                        return
                    }
                    if (n !== "setFullYear") {
                        a -= 1
                    }
                    if (n === "setFullYear") {
                        $()
                    }
                    if (n === "setMonth") {
                        N = I;
                        v.val(N);
                        Y()
                    }
                    i[n](a);
                    i.setDate(1);
                    p.datepicker("setDate", i);
                    A()
                }
            };
            var Y = function() {
                z.find("option").prop("selected", false);
                z.find("option:first").prop("selected", true)
            };
            var x = function() {
                var e = new Date(p.val());
                e.setDate(1);
                p.datepicker("setDate", e);
                w.find("option").prop("selected", false);
                w.find("option:first").prop("selected", true)
            };
            if (isNaN(t) || t > b) {
                N = m;
                v.val(m)
            }
            if (!(h && g && D && y)) {
                return
            }
            if (typeof p.data().datepicker === "undefined") {
                p.datepicker()
            }
            u.each((function() {
                var t = this.getAttribute("name");
                var a = e(this);
                if (/\]\[month\]$/.test(t)) {
                    w = a;
                    a.on("change", Q("Month"))
                } else if (/\]\[year\]$/.test(t)) {
                    k = a;
                    a.on("change", Q("FullYear"))
                }
            }
            ));
            u.filter((function() {
                var t = /\]\[quarter\]$/.test(this.getAttribute("name"));
                if (t) {
                    z = e(this)
                }
                return t
            }
            )).on("change", (function() {
                var t = parseInt(e(this).val(), 10);
                var a = new Date(p.val());
                var i = {
                    1: 1,
                    2: 4,
                    3: 7,
                    4: 10
                };
                if (!t) {
                    $();
                    A();
                    return
                }
                if (!a) {
                    a = new Date
                }
                N = F;
                a.setDate(1);
                a.setMonth(i[t] - 1);
                p.datepicker("setDate", a);
                x();
                A();
                v.val(N)
            }
            ));
            if (p.val()) {
                if (typeof a !== "undefined" && a) {
                    M(new Date(p.val()))
                }
            } else {
                M()
            }
            p.on("changeDate", (function(e) {
                M(e.date)
            }
            ));
            o.on("click", "a.swap", (function(t) {
                var a = e(this);
                var i = parseInt(v.val(), 10);
                var n;
                if (isNaN(i)) {
                    i = m
                }
                if (i === m) {
                    n = I
                } else {
                    n = m
                }
                v.val(n);
                a.children("span").toggleClass("hide");
                c.find("div").get().filter((e=>e.classList.contains("release-date-picker") || !!e.id.match(/_release_date$/))).forEach((e=>e.toggleAttribute("data-hide")));
                if (!p.data().datepicker.getDate() || !p.val()) {
                    u.each((function() {
                        var t = e(this);
                        t.find("option").prop("selected", false);
                        t.find("option:first").prop("selected", true)
                    }
                    ))
                }
                if (n !== m && parseInt(z.val(), 10)) {
                    N = F;
                    x();
                    v.val(F)
                }
                if (n !== m && !parseInt(z.val(), 10) && !parseInt(w.val(), 10)) {
                    N = b;
                    x();
                    Y();
                    v.val(b)
                }
                t.preventDefault();
                return false
            }
            ));
            N = parseInt(N, 10);
            if (N !== m && !!w.parent().attr("data-hide")) {
                d.trigger("click")
            }
            if (N === F) {
                x();
                v.val(F)
            }
            if (N === I) {
                Y();
                v.val(I)
            }
            if (N === b) {
                x();
                Y();
                v.val(b)
            }
            o.find(".datetime-now-button").remove();
            o.data("fuzzy-date", true)
        }
        ))
    }
}
)(window["jQuery"]);
var scrollToHeader = function(e) {
    "use strict";
    var n = e.offset().top;
    $("html, body").animate({
        scrollTop: n - 100
    }, 1e3)
};
$((function() {
    "use strict";
    var e = $(".js-toc-generate");
    if (e.length === 0) {
        var n = $(document).find(".js-toc-container");
        n.parent().find(".toc").remove();
        n.remove();
        return
    }
    var a = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;"
    };
    function t(e) {
        return a[e] || e
    }
    function l(e) {
        return e.replace(/[&<>]/g, t)
    }
    e.each((function(e) {
        var n = $(this);
        var a = e;
        var t = n.find(".js-toc-container");
        var i = n.find(".js-toc-content");
        if (i.length === 0) {
            t.parent().find(".toc").remove();
            t.remove();
            return
        }
        var o = i.find("h2, h3, h4");
        var r = $('<ul class="sub-nav-toc"></ul>');
        var s = [];
        var f = r;
        var c = false;
        var p = false;
        o.each((function(e) {
            var n = $(this);
            var t = $('<a class="block" href="#toc-' + a + "-" + e + '">' + l(n.text()) + "</a>");
            var i = $("<li></li>");
            var o = null;
            var r = null;
            t.appendTo(i);
            t.on("click", (function(t) {
                t.preventDefault();
                scrollToHeader(n);
                location.hash = "toc-" + a + "-" + e
            }
            ));
            n.attr("name", "toc-" + a + "-" + e);
            if (n.is("h2")) {
                if (c) {
                    o = s.pop();
                    r = o.find("li:last");
                    if (r.length > 0) {
                        f.appendTo(r)
                    } else {
                        f.appendTo(o)
                    }
                    f = o;
                    c = false
                }
                if (p) {
                    o = s.pop();
                    r = o.find("li:last");
                    if (r.length > 0) {
                        f.appendTo(r)
                    } else {
                        f.appendTo(o)
                    }
                    f = o;
                    p = false
                }
            } else if (n.is("h3")) {
                if (c) {
                    o = s.pop();
                    r = o.find("li:last");
                    if (r.length > 0) {
                        f.appendTo(r)
                    } else {
                        f.appendTo(o)
                    }
                    f = o;
                    c = false
                }
                if (!p) {
                    s.push(f);
                    f = $("<ul></ul>");
                    p = true
                }
            } else if (n.is("h4")) {
                if (!c) {
                    s.push(f);
                    f = $("<ul></ul>");
                    c = true
                }
            }
            i.appendTo(f)
        }
        ));
        var d = null;
        while ((d = s.pop()) !== undefined) {
            if (c) {
                var u = d.find("li:last");
                if (u.length > 0) {
                    f.appendTo(u)
                } else {
                    f.appendTo(d)
                }
                c = false
            } else if (p) {
                var u = d.find("li:last");
                if (u.length > 0) {
                    f.appendTo(u)
                } else {
                    f.appendTo(d)
                }
                p = false
            } else {
                f.appendTo(d);
                f = d
            }
        }
        if (r.html() === "") {
            t.parent().find(".toc").remove();
            t.remove()
        }
        if (r.is("ul")) {
            r.children().appendTo(t)
        } else {
            r.appendTo(t)
        }
    }
    ))
}
));
$((function() {
    "use strict";
    $(".js-toc-static-links").on("click", (function(e) {
        e.preventDefault();
        var n = $(this).attr("href");
        n = n.slice(1);
        var a = $('[name="' + n + '"]');
        scrollToHeader(a);
        location.hash = n
    }
    ))
}
));
$(window).on("load", (function() {
    "use strict";
    var e = location.hash.slice(1);
    if (e.indexOf("toc-") >= 0) {
        var n = $("h2, h3, h4").filter("[name=" + e + "]");
        scrollToHeader(n)
    }
}
));
(function(e, t) {
    "use strict";
    var r = t(e.document);
    var a = "Woops! Something happened and we are working on it!";
    var s = "forum-add-ajax";
    var i = "forum-new-comment-ajax";
    var n = "forum-edit-ajax";
    var o = "forum-reply-ajax";
    var l = "." + s;
    var f = "." + i;
    var d = "." + n;
    var u = "." + o;
    var c = "textarea.js-editor-textarea";
    var v = "messageElement";
    var m = "messageBodyElement";
    var h = "messageUserElement";
    var g = "<div class='loading'></div>";
    var p = "<div class='alert alert-error'><div>";
    var j = function() {
        return t.fn.richTextEditor !== undefined
    };
    var w = function() {
        return t.fn.ajaxForm !== undefined
    };
    e.initCollectionBlock = function(e) {
        var r;
        var x = function() {
            return e
        };
        var y = function() {
            if (r === undefined) {
                r = e.find(".js-reply");
                if (r.length === 0) {
                    r = t(".js-reply")
                }
            }
            return r
        };
        var b = function(e) {
            if (e === undefined) {
                e = y()
            }
            return e.find(c)
        };
        var T = function(e) {
            var t = e.data(v);
            if (t === undefined) {
                t = e.closest(".js-message").first();
                e.data(v, t)
            }
            return t
        };
        var k = function(e) {
            var t = e.data(m);
            if (t === undefined) {
                t = T(e).find(".js-message-body").first();
                var r = t.find(".message");
                if (r.length) {
                    t = r
                }
                e.data(m, t)
            }
            return t
        };
        var E = function(e) {
            var t = e.data(h);
            if (t === undefined) {
                var r = T(e);
                t = null;
                if (r.length === 0) {
                    t = T(e).find(".js-avatar-user").first()
                } else {
                    t = T(e).find(".message-user").first()
                }
                e.data(h, t)
            }
            return t
        };
        var C = function() {
            if (!w()) {
                return
            }
            e.ajaxForm([l, d, u, f].join(","), (function(r) {
                r.preventDefault();
                var l = t(r.target), f = l.serializeArray(), d = t(g), u, c;
                l.next("div.alert").remove();
                d.insertAfter(l);
                l.find("input[type=submit], button").prop("disabled", true);
                t.ajax({
                    type: "POST",
                    url: l.attr("action"),
                    data: f,
                    success: function(r) {
                        if (r.csrfToken) {
                            var f = l.find("input[data-bb]").val(r.csrfToken).removeAttr("data-decrypted");
                            if (r.csrfTokenId) {
                                l.find("input[name*='_token_id']").val(r.csrfTokenId);
                                var v = f.attr("data-token-id");
                                f.attr("data-token-id", v.substring(0, v.length - r.csrfTokenId.length) + r.csrfTokenId)
                            }
                        }
                        if (r.success === 0) {
                            var m = r.errMessage ? r.errMessage : a;
                            Phoenix.Ui.showErrorMessage(m);
                            l.after(t(p).text(m));
                            d.remove();
                            return
                        }
                        c = b(l);
                        if (l.hasClass(o)) {
                            c = b(l);
                            if (j() && c.length > 0) {
                                c.richTextEditor("remove")
                            }
                            l.closest(".js-message").replaceWith(r.html);
                            l.remove();
                            d.remove();
                            Phoenix.Ui.showSuccessMessage("Reply added.")
                        } else if (l.hasClass(s)) {
                            c = b(l);
                            if (j() && c.length > 0) {
                                c.richTextEditor("clear")
                            }
                            d.remove();
                            var h = x().find(".js-forum-messages");
                            t(r.html).hide().appendTo(h).slideDown();
                            Phoenix.Ui.showSuccessMessage("Message added.")
                        } else if (l.hasClass(i)) {
                            if (j() && c.length > 0) {
                                c.richTextEditor("clear")
                            }
                            d.remove();
                            var h = e.find(".js-forum-comments");
                            if (h.data("sort") === "DESC") {
                                t(r.html).hide().prependTo(h).slideDown()
                            } else {
                                t(r.html).hide().appendTo(h).slideDown()
                            }
                            Phoenix.Ui.showSuccessMessage("Comment added.")
                        } else if (l.hasClass(n)) {
                            u = k(l);
                            if (j() && c.length > 0) {
                                c.richTextEditor("remove")
                            }
                            l.parents(".js-message").find(".message-options").removeClass("hide");
                            l.remove();
                            d.remove();
                            u.html(r.html);
                            Phoenix.Ui.showSuccessMessage("Message modified.")
                        } else {
                            Phoenix.Ui.showSuccessMessage("Saved.")
                        }
                    },
                    error: function() {
                        Phoenix.Ui.showErrorMessage(a);
                        l.parents(".js-message").find(".js-forum-edit").removeClass("hide");
                        d.remove();
                        l.show()
                    },
                    complete: function() {
                        t(document).trigger("image-viewer-rescrape");
                        if (typeof grecaptcha !== "undefined") {
                            grecaptcha.reset(l.find(".g-recaptcha").data("id"))
                        }
                        l.find("input[type=submit], button").prop("disabled", false)
                    }
                })
            }
            ))
        };
        var P = function() {
            e.on("click", ".js-forum-comments .js-forum-edit, .js-forum-messages .js-forum-edit", (function(e) {
                var r = t(this);
                e.preventDefault();
                var s = k(r);
                var i = T(r);
                i.find(".message-options:first").addClass("hide");
                t.ajax({
                    url: r.attr("href"),
                    success: function(e) {
                        var r;
                        var a = s.html();
                        s.html(t.parseHTML(e.html));
                        r = b(s);
                        if (r.length === 1) {
                            if (j()) {
                                r.richTextEditor();
                                r.richTextEditor("focus")
                            }
                        }
                        s.find(".js-cancel-edit").on("click", (function() {
                            if (r.length === 1) {
                                if (j()) {
                                    r.richTextEditor("remove")
                                }
                            }
                            s.html(a);
                            i.find(".message-options:first").removeClass("hide")
                        }
                        ))
                    },
                    error: function() {
                        Phoenix.Ui.showErrorMessage(a)
                    },
                    complete: function() {
                        t(document).trigger("image-viewer-rescrape")
                    }
                })
            }
            ))
        };
        var M = function(r) {
            var s = x();
            if (!s.hasClass("js-ajax-pagination")) {
                return
            }
            if (!window.history.pushState) {
                return
            }
            var i = location.href;
            var n = false;
            var o = false;
            s.on("click", '.paginate a[href*="page="]', (function(e) {
                if (!n) {
                    window.history.replaceState({
                        name: "ForumPaginate",
                        url: i
                    }, "", i);
                    n = true
                }
                e.preventDefault();
                var r = t(this);
                var a = r.attr("href");
                l(a);
                window.history.pushState({
                    name: "ForumPaginate",
                    url: a
                }, "", a);
                o = true
            }
            ));
            var l = function(i) {
                var n = t(g);
                var o = e.find(".container").offset().top;
                var l = t(window);
                n.height(s.height());
                s.hide();
                s.after(n);
                if (l.scrollTop() > o) {
                    t("html, body").animate({
                        scrollTop: o
                    }, 300)
                }
                t.ajax({
                    cache: false,
                    url: i,
                    success: function(t) {
                        var a = e.find(".paginate");
                        if (!t.success) {
                            window.location = i;
                            return
                        } else {
                            var o = Phoenix.jQuery.getDocument();
                            document.dispatchEvent(new Event("pre_page_event"));
                            document.dispatchEvent(new CustomEvent("on_page_event",{
                                detail: {
                                    eventName: "pageLoad"
                                }
                            }))
                        }
                        s.html(t.html.list);
                        a.html(t.html.pagination);
                        n.remove();
                        s.show();
                        if (r) {
                            r()
                        }
                    },
                    error: function() {
                        n.remove();
                        s.show();
                        Phoenix.Ui.showErrorMessage(a)
                    },
                    complete: function() {
                        t(document).trigger("image-viewer-rescrape")
                    }
                })
            };
            t(window).on("popstate", "", (function(e) {
                if (!o) {
                    return
                }
                var t = e.originalEvent.state;
                if (t && t.name === "ForumPaginate") {
                    l(t.url)
                }
            }
            ))
        };
        var S = function() {
            var r = e.find(".js-poll-form");
            r.ajaxForm((function(e) {
                e.preventDefault();
                var r = t(e.target);
                var s = r.serializeArray();
                t.ajax({
                    type: "POST",
                    url: r.attr("action"),
                    data: s,
                    success: function(e) {
                        r.parents(".js-message-body").html(e.html)
                    },
                    error: function() {
                        Phoenix.Ui.showErrorMessage(a)
                    }
                })
            }
            ))
        };
        var D = function() {
            e.find(".js-forum-reply, .js-forum-quote").remove()
        };
        var U = function() {
            x().on("click", ".js-forum-reply-inline, .js-forum-quote-inline", (function(e) {
                var r = t(e.target), a = E(r), i = t(g), n = {}, l, f = {};
                e.preventDefault();
                r.closest(".js-message").find(".js-forum-reply-inline:first").addClass("hide");
                var d = t('<div class="message js-message"></div>');
                r.closest(".js-message").children(".message-wrap").after(d);
                d.append(i);
                AjaxApiRequest.makeGetApiRequest("/forums/comment/new/" + r.data("topic-id") + "/", {}, (function(e) {
                    i.remove();
                    d.html(t.parseHTML(e.html));
                    if (a.length === 1) {
                        n.slug = a.data("user-slug");
                        n.profile = a.data("user-profile")
                    }
                    var u = d.find("form").removeClass(s).addClass(o);
                    var c = b(u);
                    u.find("#forum_message_" + r.data("topic-id") + "_replyTo").val(r.data("reply-id"));
                    if (r.hasClass("js-forum-quote-inline") && j()) {
                        l = k(r);
                        f.user = n;
                        f.html = l.html();
                        c.richTextEditor("quote", f)
                    } else {
                        if (j() === false) {
                            c.val("@" + n.slug + ": " + c.val())
                        } else {
                            c.richTextEditor();
                            c.richTextEditor("reply", n)
                        }
                    }
                    d.find(".js-cancel-reply").on("click", (function() {
                        if (c.length === 1) {
                            if (j()) {
                                c.richTextEditor("remove")
                            }
                        }
                        r.closest(".js-message").find(".js-forum-reply-inline:first").removeClass("hide");
                        d.remove()
                    }
                    ))
                }
                ))
            }
            ));
            x().on("click", ".js-forum-reply, .js-forum-quote", (function(e) {
                var r = t(e.target), a = E(r), s = b(), i = {}, n, o = {};
                e.preventDefault();
                var l = s.parents(".editor").first().offset().top;
                t("html, body").animate({
                    scrollTop: l - 100
                }, 500);
                if (a.length === 1) {
                    i.slug = a.data("user-slug");
                    i.profile = a.data("user-profile")
                }
                if (r.hasClass("js-forum-quote") && j()) {
                    n = k(r);
                    o.user = i;
                    o.html = n.html();
                    s.richTextEditor("quote", o)
                } else {
                    if (j() === false) {
                        s.val("@" + i.slug + ": " + s.val())
                    } else {
                        s.richTextEditor("reply", i)
                    }
                }
            }
            ))
        };
        var q = function() {
            e.on("click", '[data-embed-type="spoiler"] .header', (function() {
                t(this).siblings(".content").toggleClass("hide-element")
            }
            ))
        };
        var _ = function() {
            e.on("click", ".js-best-answer", (function() {
                var r = t(this);
                var a = false;
                e.find(".js-best-answer-header").remove();
                var s = r.parents(".js-message");
                if (s.hasClass("answer")) {
                    a = true
                }
                e.find(".js-message.answer").each((function() {
                    var e = t(this);
                    var r = e.find(".js-best-answer");
                    var a = r.attr("data-toggle-value");
                    r.attr("data-toggle-value", " " + r.text());
                    r.text(a);
                    e.removeClass("answer")
                }
                ));
                if (!a) {
                    s.addClass("answer")
                }
            }
            ))
        };
        var A = function() {
            e.on("click", ".btn-toggle-visibility", (function(e) {
                var r = t(this);
                e.preventDefault();
                var a = r.attr("data-toggle-label");
                if (a) {
                    r.attr("data-toggle-label", r.text());
                    r.text(a)
                }
                var s = r.attr("data-toggle-target");
                if (s) {
                    var i = t(s);
                    i.toggleClass("hide");
                    if (r.attr("href") !== "#") {
                        i.load(r.attr("href"));
                        r.attr("href", "#")
                    }
                }
            }
            ))
        };
        var F = function(e) {
            if (t(".js-forum-messages .js-message").length === 0) {
                return
            }
            var r = 5e3;
            var a = "button";
            var s = function(e) {
                var r = t(".js-post-render-topic");
                if (r.length === 0) {
                    return null
                } else {
                    return {
                        url: r.data("base-url") + "?page=" + e.page + "#js-message-" + e.savedPosition,
                        index: e.savedPosition,
                        page: e.page
                    }
                }
            };
            var i = function() {
                if (!!Modernizr && Modernizr.sessionstorage) {
                    var e = sessionStorage["savedPosition:" + window.location.pathname];
                    if (e === "true") {
                        return true
                    } else {
                        sessionStorage["savedPosition:" + window.location.pathname] = "true"
                    }
                }
                return false
            };
            var n = function(e) {
                if (a === "button") {
                    t(".js-last-read").attr("href", e.url).removeClass("hidden")
                } else if (!i()) {
                    Phoenix.Ui.showNotificationMessage('Would you like to continue where you left off? <a class="btn" href="' + e.url + '">Take me there</a>', {
                        hideDelay: r
                    })
                }
            };
            var o = function(e, r) {
                if (r === null) {
                    return
                }
                var a = t(".js-message:last");
                var i = s(r);
                if (i) {
                    var o = parseInt(i.index);
                    var l = parseInt(a.attr("id").split("-")[2]);
                    if (o > l) {
                        n(i)
                    } else {
                        var f = "#js-message-" + i.index;
                        if (window.location.hash !== f && t(f).length > 0) {
                            n(i)
                        }
                    }
                }
            };
            if (e) {
                PostRender.executePostRender()
            }
            PostRender.getPostRenderData("ForumBundle", o)
        };
        _();
        q();
        F();
        if (w() === false) {
            return
        }
        var R = function() {
            F(true)
        };
        M(R);
        P();
        C();
        S();
        A();
        U();
        if (j() === false) {
            return
        }
    }
    ;
    t((function() {
        t(".js-comments-block, .js-forum-block, .js-profile-blog, .js-user-list, .js-moderation-block, .js-pm-block, .js-content-entity-body").each((function() {
            e.initCollectionBlock(t(this))
        }
        ))
    }
    ))
}
)(this, this.jQuery);
(function(e, t) {
    "use strict";
    var a = t(e.document);
    var i = "Whoops! Something happened and we are working on it!";
    var n = t("#js-loading-html").attr("content");
    var o = t(n);
    var r = "comment-sort-dir";
    var l = window.location.hash;
    var c = function(e) {
        t.cookie(r, e, {
            path: "/",
            expires: 30
        })
    };
    var d = function() {
        return t.cookie(r)
    };
    var m = function(e) {
        e = e.first();
        var a = e.find(".paginate-refresh a, a.js-comments-reload")
          , n = a.attr("href");
        e.on("change", ".js-paginate-order-switch", (function(e) {
            e.preventDefault();
            e.stopPropagation();
            c(t(this).find(":selected").data("dir"));
            r(t(this).val(), false)
        }
        ));
        e.on("click", ".feed-hdr a, a.js-comments-reload", (function(e) {
            e.preventDefault();
            e.stopPropagation();
            var a = t(this);
            if (!a.hasClass("primary-button--disabled")) {
                var i = a.attr("href")
                  , n = a.data("dir")
                  , o = !!(a.parents("paginate-refresh").length > 0);
                c(n);
                if (o) {
                    r(i, true)
                } else {
                    r(i, false);
                    s.pageName = l(s.pageName, i);
                    t("#comments-block .feed-hdr:not(:first) li").removeClass("on");
                    t("#comments-block .feed-hdr:not(:first) li").eq(a.parent("li").index()).addClass("on");
                    void s.t()
                }
            }
        }
        ));
        e.on("change", ".feed-hdr select", (function(e) {
            e.preventDefault();
            e.stopPropagation();
            var a = t(this)
              , i = a.find("option:selected").attr("href");
            if (!i) {
                i = a.find("option:selected").data("url")
            }
            r(i, false);
            s.pageName = l(s.pageName, i);
            void s.t()
        }
        ));
        e.on("click", ".js-paginate-order-switch a", (function(a) {
            a.preventDefault();
            a.stopPropagation();
            if (e.find(".feed-hdr a").length > 0) {
                e.find(".feed-hdr a:not(.on)").first().trigger("click")
            } else {
                r(t(this).val(), false)
            }
        }
        ));
        var r = function(s, n) {
            var r = e
              , l = r.offset().top
              , c = t(window)
              , m = s.indexOf("?")
              , f = d();
            s = e.data("ajaxUrl") + (m > 0 ? s.slice(m) : "");
            if (f && s.indexOf("comment_direction") === -1) {
                s += (m > 0 ? "&" : "?") + "comment_direction=" + f
            }
            if (n) {
                var h = r.find(".symbol-refresh").attr("class", "symbol symbol-refresh spin")
            } else {
                o.height("150px");
                r.hide();
                o.show();
                r.after(o)
            }
            a.data("dir", f);
            a.attr("href", s);
            if (c.scrollTop() > l && !(n && a.data("dir") === "ASC")) {
                t("html, body").animate({
                    scrollTop: l
                }, 300)
            }
            t.ajax({
                url: s,
                success: function(e) {
                    if (r.data("etag") === e.etag) {
                        var i = t("<span> No new comments</span>").hide();
                        r.find(".paginate-refresh").after(i);
                        i.fadeIn().delay(1250).fadeOut(400, (function() {
                            i.remove()
                        }
                        ));
                        return
                    }
                    r.data("etag", e.etag);
                    if (e.success === 0) {
                        Phoenix.Ui.showErrorMessage(e.errMessage);
                        return
                    }
                    var s = t(e.html);
                    s.filter(".paginate-messages-top").replaceAll(r.find(".paginate-messages-top"));
                    s.filter(".paginate-messages-bottom").replaceAll(r.find(".paginate-messages-bottom"));
                    s.filter(".comment-messages").replaceAll(r.find(".comment-messages"));
                    r.find(".comment-messages").after(s.filter("script"));
                    var o = new Date(r.data("last-updated"));
                    r.find(".comment-messages .js-message time").each((function() {
                        var e = t(this);
                        if (new Date(e.attr("datetime")) > o) {
                            t('<span class="text-xsmall individual-message-role role-new" > New</span>').hide().insertAfter(e).fadeIn()
                        } else {
                            e.next("span").remove()
                        }
                    }
                    ));
                    r.data("last-updated", e.lastUpdated);
                    t(document).trigger("image-viewer-rescrape");
                    t(document).trigger("loadComments");
                    if (n && a.data("dir") === "ASC") {
                        t("html, body").animate({
                            scrollTop: r.offset().top + r.height() - t(window).height()
                        })
                    }
                },
                error: function() {
                    Phoenix.Ui.showErrorMessage(i)
                },
                complete: function() {
                    if (n) {
                        h.attr("class", "symbol symbol-refresh")
                    } else {
                        o.remove();
                        r.show()
                    }
                }
            })
        };
        var l = function(e, t) {
            var a = e.match(/:p([0-9]):/i);
            var i = a ? a[1] : null;
            var n = t.split("comment_page=")[1];
            if (!n)
                n = 1;
            if (!i) {
                return s.pageName
            }
            return e.split(":p" + i + ":").join(":p" + n + ":")
        }
    };
    var f;
    var h = function() {
        var s = t(".js-load-comments"), n;
        if (undefined === f) {
            n = s
        } else {
            n = s.not(f)
        }
        if (!n || n.length < 1) {
            return
        }
        n.on("click.loadComments", (function(s) {
            s.preventDefault();
            var n = t(this)
              , r = l.match(/#js-message-(\d+)/i)
              , c = {
                comment_page: 1,
                wrap: 1
            }
              , f = d();
            if (r && r[1]) {
                c.message_id = r[1]
            }
            if (f) {
                c.comment_direction = f
            }
            n.addClass("hide");
            n.closest(".js-load-comments-container").removeClass("hide");
            o.show();
            n.after(o);
            t.ajax({
                url: n.data("ajaxUrl"),
                data: c,
                success: function(i) {
                    var s = t(i.html);
                    n.removeClass("js-load-comments");
                    n.trigger("commentsLoaded", [s]);
                    if (n.parent().hasClass("js-comments-block")) {
                        n.parent().replaceWith(s)
                    } else {
                        n.replaceWith(s)
                    }
                    s.trigger("commentsInserted");
                    t(document).trigger("loadComments");
                    if (/#js-message-(\d+)/i.test(l)) {
                        var o = t(l)
                          , r = t("#masthead.is-nav-fixed");
                        if (o.length) {
                            window.scrollTo(0, o.offset().top - (r ? r.outerHeight() : 0))
                        }
                    }
                    l = "";
                    m(s);
                    if (t.fn.richTextEditor !== undefined) {
                        s.find(".js-editor-textarea").richTextEditor()
                    }
                    a.trigger("image-viewer-rescrape");
                    if (typeof e.initCollectionBlock === "function") {
                        e.initCollectionBlock(s)
                    }
                },
                error: function() {
                    Phoenix.Ui.showErrorMessage(i)
                },
                complete: function() {
                    o.remove();
                    n.removeClass("hide")
                }
            })
        }
        ));
        n.each((function() {
            var e = t(this)
              , i = this.getBoundingClientRect()
              , s = t(window).height();
            if (/#comments-block-(\d+)/i.test(l) || /#js-message-(\d+)/i.test(l)) {
                e.trigger("click.loadComments")
            } else if (e.hasClass("js-loading-comments")) {
                if (a.height() <= s || a.scrollTop() > 0 || i.top >= 0 && i.top <= s) {
                    e.trigger("click.loadComments")
                } else {
                    t(window).one("scroll", (function() {
                        e.trigger("click.loadComments")
                    }
                    ))
                }
            }
        }
        ));
        f = s
    };
    t((function() {
        t(".js-comments-block").each((function() {
            m(t(this))
        }
        ));
        h()
    }
    ));
    a.ajaxComplete(h);
    a.on("loadComments", h);
    t(window).bind("hashchange", (function(e) {
        var a = window.location.hash.substr(1);
        if (!f) {
            return
        }
        f.each((function() {
            if (this.parentElement && this.parentElement.id === a) {
                t(this).trigger("click.loadComments")
            }
        }
        ))
    }
    ))
}
)(this, jQuery);
Phoenix._uploaderButtonAjaxBound = false;
Phoenix._uploaderReadyBound = false;
Phoenix._uploaderReadyNonAjaxTriggered = false;
$((function e(t) {
    "use strict";
    const o = ".image-widget-container";
    const n = [o + " .btn", o + " .clickable"].join(",");
    let i = $(o);
    const r = $(document);
    let a;
    const l = function(e, t, o) {
        const n = o.$clickedButton;
        const i = o.$container;
        let r = o.$hiddenInput;
        const a = o.$hiddenInputColor;
        const l = o.$button;
        const s = o.$clonedContainer;
        if (!l.hasClass("hide") && l.children("img").length === 0) {
            l.addClass("hide")
        }
        const d = i.find("img");
        let u = d.length === 0;
        const p = $();
        let f = $();
        let g;
        const h = document.querySelector(".image-preview-desktop > .js-image-preview-container");
        const m = document.querySelectorAll(".image-preview-mobile .js-image-preview-container");
        const x = function() {
            Phoenix.Ui.showErrorMessage("Unable to load image");
            g.parent().replaceWith(s)
        };
        const P = function(e) {
            return function() {
                if (this.width < 10 || this.height < 10) {
                    x()
                }
                if (typeof e === "function") {
                    e()
                }
            }
        };
        if (u) {
            g = $('<img class="clickable">');
            f = $('<a class="image-widget" href="#">').append(g)
        } else {
            g = $(d[0])
        }
        if (e.successful === undefined) {
            return x()
        }
        const w = function(e, o) {
            g.on("error", x);
            g.on("load", P(t));
            g[0].src = o.url;
            if (h) {
                const t = h.querySelector("img");
                if (t) {
                    t.remove()
                }
                const n = document.createElement("img");
                n.src = o.url;
                n.alt = e || "Image Crop Preview";
                h.prepend(n);
                h.classList.remove("hide-element")
            }
            m.forEach((e=>{
                const t = e.querySelector(".image-preview-background");
                if (t) {
                    t.remove()
                }
                const n = document.createElement("div");
                n.style.backgroundImage = `url(${o.url})`;
                n.classList.add("image-preview-background");
                n.classList.add("width-100");
                e.prepend(n)
            }
            ));
            const n = document.querySelector(".image-preview-container--mobile");
            if (n) {
                n.classList.remove("hide-element")
            }
            if (o.id) {
                if (r.length === 0 || !r) {
                    r = i.find("input[data-type=image_id]")
                }
                r.val(o.id);
                if (a.length > 0 && a.data("route")) {
                    a.data("route", a.data("route").replace(/\/\d+$/gm, "/" + o.id));
                    c(i, o.url)
                }
            } else {
                x()
            }
        };
        $.each(e.successful, (function(t, o) {
            if (Phoenix.UploaderButton._successHandler) {
                o.embargo = !!e["image-embargo"];
                const i = Phoenix.UploaderButton._successHandler(n, t, o);
                if (i === true) {
                    u = false
                }
            } else {
                w(t, o)
            }
        }
        ));
        if (u) {
            i.find(".btn-primary").addClass("hide");
            f.prependTo(i);
            p.appendTo(i)
        } else if (d.length < 1) {
            l.removeClass("hide")
        }
        for (const e in Phoenix.UploaderButton._callbackFunctions) {
            if (i.is(e) || i.find(e).length > 0 || i.parent().find(e).length > 0) {
                Phoenix.UploaderButton._callbackFunctions[e].call(g)
            }
        }
    };
    const s = function(e, t) {
        const o = e.errors;
        const n = t.$button;
        if (e.crossOriginError) {
            Phoenix.Ui.showErrorMessage("An error occurred while loading the image. The image editor will be closed.");
            return l(e, null, t)
        }
        if (n.hasClass("hide")) {
            n.removeClass("hide")
        }
        if (e.status === 413) {
            return Phoenix.Ui.showErrorMessage("Image is too large, please upload a smaller image.")
        }
        if (o !== undefined) {
            if (o.url) {
                return Phoenix.Ui.showErrorMessage(o.url)
            }
            if (o.file) {
                return Phoenix.Ui.showErrorMessage(o.file)
            }
        }
        if (e.message) {
            return Phoenix.Ui.showErrorMessage("Problem occured while uploading image: " + e.message)
        }
    };
    const c = function(e, t) {
        const o = e.find("input[data-type=image_color]");
        if (!t || o.length === 0) {
            return
        }
        const n = [];
        Vibrant.from(t).getPalette((function(t, i) {
            const r = "DarkVibrant";
            for (const e in i) {
                if (Object.prototype.hasOwnProperty.call(i, e)) {
                    const t = $('<div class="js-select-color" data-palette="' + e + '" data-color="' + i[e].hex + '" style="background-color:' + i[e].hex + '"></div>');
                    if (e === r) {
                        n.unshift(t)
                    } else {
                        n.push(t)
                    }
                }
            }
            if (n.length === 0) {
                return
            }
            const a = n.reduce($.merge);
            let l = e.find(".js-image-widget-palette-picker");
            if (l.length === 0) {
                e.append('<p>Select Color</p><div class="js-image-widget-palette-picker image-widget-palette-picker"></div>');
                l = e.find(".js-image-widget-palette-picker")
            }
            l.html("").append(a);
            a.on("click", (function() {
                e.find(".color-selected").removeClass("color-selected");
                $(this).addClass("color-selected");
                const t = $(this).data("color");
                o.val(t);
                $.ajax(o.data("route"), {
                    type: "POST",
                    data: {
                        backgroundColor: t
                    }
                })
            }
            ));
            if (o.val()) {
                a.filter('[data-color="' + o.val() + '"]').addClass("color-selected")
            }
            if (e.find(".color-selected").length === 0) {
                a.first().trigger("click")
            }
        }
        ))
    };
    const d = function(e) {
        const t = $(this);
        const n = t.closest(o);
        const i = n.find("input[data-type=image_id]");
        const r = n.find("input[data-type=image_color]");
        const c = n.find(".image-widget, .btn-primary");
        const d = c.parent().clone(true);
        const u = {
            $clickedButton: t,
            $container: n,
            $hiddenInput: i,
            $hiddenInputColor: r,
            $button: c,
            $clonedContainer: d
        };
        const p = t.data("multiple");
        $.uploader({
            complete(e, t) {
                l(e, t, u)
            },
            error(e) {
                s(e, u)
            },
            type: "image",
            postURL: "/images/upload",
            urlPostURL: "/images/url-submit",
            headerText: "Where does your image live?",
            multiple: p,
            fileType: ["image/jpeg", "image/gif", "image/png"],
            drop: true,
            dropText: "Or drag and drop your image to this window."
        });
        a.modal("show");
        PhoenixDatePicker.initializeDatePickers();
        e.preventDefault();
        return false
    };
    const u = function(e) {
        e.each((function() {
            const e = $(this);
            if (e.data("uploader")) {
                return
            }
            r.trigger("uploaderReady", [e]);
            c(e, e.find("img").attr("src"))
        }
        ))
    };
    if (!Phoenix._uploaderButtonAjaxBound) {
        r.on("ajaxComplete", (function() {
            e(true)
        }
        ));
        Phoenix._uploaderButtonAjaxBound = true
    }
    if (!Phoenix._uploaderReadyBound) {
        r.on("uploaderReady", (function(e, t) {
            a = $("#js-uploader");
            if (t) {
                i = t
            }
            if (i.data("uploader")) {
                return
            }
            i.data("uploader", true);
            i.data("uploaderCompleteHandler", l)
        }
        ));
        Phoenix._uploaderReadyBound = true;
        r.one("uploaderReady", (function() {
            r.on("click.uploaderButton", n, d)
        }
        ))
    }
    if (t === true) {
        u(i)
    } else if (!Phoenix._uploaderReadyNonAjaxTriggered) {
        u(i);
        Phoenix._uploaderReadyNonAjaxTriggered = true
    }
}
));
Phoenix.UploaderButton = function() {
    "use strict";
    return this
}
;
Phoenix.UploaderButton._callbackFunctions = {};
Phoenix.UploaderButton._successHandler = null;
Phoenix.UploaderButton.setCallbackFunction = function(e, t) {
    "use strict";
    Phoenix.UploaderButton._callbackFunctions[e] = t
}
;
Phoenix.UploaderButton.setSuccessHandler = function(e) {
    "use strict";
    Phoenix.UploaderButton._successHandler = e
}
;
$((function() {
    "use strict";
    var t = "_promos_seen";
    $("a[data-promo-id], .js-video-player[data-promo-id]").on("click", (function() {
        var a = $.cookie(t);
        var r = new Date;
        var e = parseInt($(this).attr("data-promo-id"), 10);
        var i = parseInt($(this).attr("data-top-slot-allowed"), 10) === 1;
        var o = [];
        var n = $("#promo-id-" + e).children("a").data();
        if (!e || n && n.cms === true) {
            return
        }
        if (parseInt($(this).parent().attr("data-pinned"), 10) === 1) {
            return
        }
        r.setMonth(r.getMonth() + 1);
        if (a && a.charAt(0) === "[") {
            a = JSON.parse(a)
        } else {
            a = []
        }
        for (var s = 0; s < a.length; s = s + 1) {
            if (a[s] === e) {
                continue
            }
            for (var p = 0, d = false; p < o.length; p++) {
                if (o[p] === a[s]) {
                    d = true;
                    break
                }
            }
            if (!d) {
                o.push(a[s])
            }
        }
        o.push(e);
        $.cookie(t, JSON.stringify(o.slice(-20)), {
            expires: r,
            path: "/"
        })
    }
    ))
}
));
(function(a, e, t) {
    var c = false;
    var n = function() {
        var n = e.createElement("script");
        n.type = "text/javascript";
        n.src = "https://www.google.com/recaptcha/api.js?onload=recaptchaOnloadCallback&render=explicit";
        n.async = n.defer = true;
        e.getElementsByTagName("head")[0].appendChild(n);
        t.recaptchaOnloadCallback = function() {
            c = true;
            r()
        }
        ;
        a(e).ajaxSuccess((function() {
            r()
        }
        ))
    };
    var r = function() {
        if (!c) {
            return
        }
        a(".g-recaptcha").each((function() {
            var e = a(this);
            if (typeof e.data("id") === "undefined") {
                var t = grecaptcha.render(this, {
                    sitekey: e.data("site-key")
                });
                a(this).data("id", t)
            }
        }
        ))
    };
    n()
}
)(jQuery, document, window);
const AjaxApiRequest = function() {
    "use strict";
    const e = {
        makeApiRequest(e, t, i, a, o) {
            if (typeof t === "undefined" || typeof i === "undefined") {
                throw new TypeError("Must specify params, and post or get for makeApiRequest")
            }
            return n(e, t, i, null, a, o)
        },
        makeGetApiRequest(e, t, i, a) {
            if (typeof t === "function") {
                a = i;
                i = t;
                t = null
            }
            return n(e, t, false, null, i, a)
        },
        makePostApiRequest(e, t, i, a) {
            if (typeof t === "function") {
                a = i;
                i = t;
                t = null
            }
            return n(e, t, true, null, i, a)
        },
        eoo: null
    };
    (function() {
        $(".js-ajax-api-request").on("click", (function(e) {
            e.preventDefault();
            const t = $(this);
            let i = "";
            const a = t.attr("data-api-url-from");
            if (typeof a !== "undefined") {
                i = $(a).val()
            } else {
                i = t.attr("href")
            }
            if (t.data("add-class")) {
                n(i, null, true, (function() {
                    t.toggleClass(t.data("add-class"));
                    t.attr("href", "#null")
                }
                ))
            } else {
                n(i, null, true)
            }
        }
        ));
        $(".js-ajax-api-request-select").on("change", (function() {
            n($(this).val())
        }
        ));
        $(".js-ajax-api-track-form-submit").on("click", (function(e) {
            const n = $(this);
            const i = n.attr("data-tracking-token");
            if (!t(i)) {
                return
            }
            if (n.data().formPostLatch === undefined) {
                e.preventDefault();
                document.dispatchEvent(new CustomEvent("api_result_event",{
                    detail: {
                        trackingToken: i
                    }
                }));
                n.prop("disabled", true);
                n.data().formPostLatch = true;
                setTimeout((function() {
                    n.prop("disabled", false);
                    if (navigator.userAgent.search("Firefox") == -1) {
                        n.trigger("click")
                    } else {
                        const e = n.parents("form");
                        if (e[0]) {
                            if (typeof tinymce !== "undefined") {
                                tinymce.triggerSave()
                            }
                            e.submit()
                        }
                    }
                }
                ), 250)
            } else {
                delete n.data().formPostLatch
            }
        }
        ))
    }
    )();
    function t(e) {
        return typeof e !== "undefined" && e && e !== ""
    }
    function n(e, t, n, i, a, o) {
        if (typeof n === "undefined") {
            n = false
        }
        if (typeof a === "undefined") {
            a = function() {}
        }
        if (typeof o === "undefined") {
            o = function() {}
        }
        if (!i) {
            i = {}
        }
        if (!Object.prototype.hasOwnProperty.call(i, "timeout")) {
            i.timeout = null
        }
        const u = $.ajax({
            type: n ? "POST" : "GET",
            url: e,
            data: t,
            timeout: i.timeout,
            success(e, t, n) {
                if (typeof e !== "undefined" && e && typeof e.trackingToken !== "undefined") {
                    const {trackingToken: t} = e;
                    document.dispatchEvent(new CustomEvent("api_result_event",{
                        detail: {
                            trackingToken: t
                        }
                    }))
                }
                a(e, t, n)
            },
            error(e, t, n) {
                o(n, e)
            },
            statusCode: {
                0(e) {},
                303(e) {},
                302(e) {}
            }
        });
        return u
    }
    return e
}();
var PostRender = function() {
    var e = {
        getPostRenderData: function(e, n, t) {
            if (o) {
                setTimeout((function() {
                    r(e, n, t)
                }
                ), 0)
            } else {
                f.push({
                    bundle: e,
                    completionFn: n,
                    errorFn: t
                })
            }
        },
        executePostRender: function() {
            if (u) {
                d.abort();
                u = false
            } else {
                f = []
            }
            o = null;
            i = "";
            n()
        },
        flushCache: function() {
            if (typeof Storage != "undefined") {
                localStorage[window.location.pathname + "postRender"] = null
            }
        },
        eoo: null
    };
    function n() {
        if (typeof CanCachePostRenderData != "undefined" && CanCachePostRenderData && typeof Storage != "undefined") {
            a = true;
            var e = localStorage[window.location.pathname + "postRender"];
            if (e) {
                try {
                    o = JSON.parse(StringMunger.unmunge(e, "prd", 235));
                    if (Date.now() > o.expires) {
                        o = null
                    }
                } catch (e) {
                    o = null
                }
            }
        }
        if (o) {
            return R(o)
        }
        var n = {};
        $("[data-post-render-param]").each((function(e, t) {
            var r = $(t);
            var o = r.attr("data-post-render-param");
            var a = r.attr("data-post-render-value");
            var i = o.endsWith("[]");
            if (i) {
                o = o.substr(0, o.length - 2)
            }
            var f = o.split(".");
            if (typeof n[f[0]] == "undefined") {
                n[f[0]] = {}
            }
            if (i) {
                if (typeof n[f[0]][f[1]] == "undefined") {
                    n[f[0]][f[1]] = [a]
                } else {
                    n[f[0]][f[1]].push(a)
                }
            } else {
                n[f[0]][f[1]] = a
            }
        }
        ));
        const t = new URL(window.location.href);
        var s = "to"
          , l = "ll"
          , p = "ca"
          , c = "an"
          , v = "Ph"
          , h = "ph";
        var g = {
            pjs: window[p + l + v + c + s + "m"] || window["_" + h + c + s + "m"] ? true : false
        };
        let m = {
            page: t.pathname,
            params: n,
            signature: g
        };
        const w = t.searchParams.get("ip_override");
        if (w) {
            m.ip_override = w
        }
        u = true;
        d = AjaxApiRequest.makePostApiRequest("/postRender", m, (function(e) {
            u = false;
            if (e.result != "ok") {
                o = "error";
                i = "server error: " + e.error
            } else {
                o = e.data;
                if (a) {
                    o.expires = Date.now() + (PostRenderMaxAge ? PostRenderMaxAge : 86400);
                    localStorage[window.location.pathname + "postRender"] = StringMunger.munge(JSON.stringify(o), "prd", 235)
                }
            }
            R()
        }
        ), (function(e) {
            u = false;
            o = "error";
            i = "network error: " + e;
            R()
        }
        ));
        function R() {
            f.forEach((function(e) {
                r(e.bundle, e.completionFn, e.errorFn)
            }
            ));
            let e = new Event("postRenderComplete");
            window.dispatchEvent(e)
        }
    }
    var t = true;
    $((function() {
        if (t) {
            n()
        }
        t = false
    }
    ));
    function r(e, n, t) {
        if (o === "error") {
            if (typeof t == "function") {
                t(i)
            }
            return
        }
        if (e && typeof o[e] == "undefined") {
            if (typeof t == "function") {
                t("bundle does not provide post render data")
            }
            return
        }
        n(o._common, e ? o[e] : undefined)
    }
    var o = null;
    var a = false;
    var i = "";
    var f = [];
    var d;
    var u = false;
    return e
}();
if (!String.prototype.endsWith) {
    Object.defineProperty(String.prototype, "endsWith", {
        value: function(e, n) {
            var t = this.toString();
            if (n === undefined || n > t.length) {
                n = t.length
            }
            n -= e.length;
            var r = t.indexOf(e, n);
            return r !== -1 && r === n
        }
    })
}
(function(e, o) {
    "use strict";
    var a;
    const {AjaxApiRequest: t, PostRender: l} = window;
    l.getPostRenderData("GameBundle", (function(r, i) {
        a = i;
        l.getPostRenderData("FollowBundle", (function(l, r) {
            var i = o(".stacks");
            o.each(i, (function(e, t) {
                var l = o(t)
                  , i = l.attr("data-post-render-value");
                l.removeAttr("data-post-render-param");
                if (o(".js-game-card-follow").length) {
                    var n = "/api/follow/unfollowGameRelease/" + i;
                    var s = false;
                    var f = a[i];
                    if (!f) {
                        return true
                    }
                    var c = Object.keys(f.platforms).length > 1;
                    if (c) {
                        var d = null;
                        o.each(f.platforms, (function(e, a) {
                            var t = "/api/follow/followGameRelease/" + i + "-" + a.abbreviation;
                            var n = "/api/follow/unfollowGameRelease/" + i;
                            var f = r[i][a.name];
                            var c = o("<div>").append(l.find(".stacks-list__item").clone()).html().trim();
                            if (f) {
                                s = true;
                                c = c.replace(/%following%/g, "following")
                            } else {
                                c = c.replace(/%following%/g, "")
                            }
                            c = c.replace(/%platformFollowURL%/g, t).replace(/%platformUnfollowURL%/g, n).replace(/%isFollowingThisPlatform%/g, f).replace(/%platformName%/g, a.name);
                            if (d == null) {
                                d = c
                            } else {
                                d += c
                            }
                        }
                        ))
                    } else {
                        if (Object.keys(f.platforms)[0] != null) {
                            var g = "/api/follow/followGameRelease/" + i + "-" + f.platforms[Object.keys(f.platforms)[0]].abbreviation
                              , p = l.find(".js-game-card-follow")
                              , m = l.find(".js-game-card-follow-toggle")
                              , u = p.data("stacks-event-hierarchy");
                            p.removeAttr("data-post-render-param");
                            m.attr("data-follow-url", g);
                            m.addClass("js-game-follow-event-tracking");
                            l.find(".js-pop-over-container").remove();
                            if (u) {
                                m.attr("data-event-tracking", u)
                            }
                            s = r[i][f.platforms[0].name]
                        }
                    }
                    l.find(".stacks-list__item").replaceWith(d);
                    let e = o("<div>").append(l.clone()).html().trim();
                    e = e.replace(/%isFollowing%/g, s).replace(/%followText%/g, "Follow").replace(/%followingText%/g, "Following").replace(/%multiplatform%/g, c).replace(/%getUnFollowGameReleaseApiUrl%/g, n);
                    e = o(e);
                    if (s) {
                        e.find(".game-card-follow-text").text("Following")
                    }
                    l.replaceWith(e)
                } else {
                    let e = o("<div>").append(l.clone()).html().trim();
                    e = e.replace(/%gameName%/g, a[i].game.name);
                    e = o(e);
                    e.find(".js-game-image").attr("src", a[i].image);
                    l.replaceWith(e)
                }
            }
            ));
            o(".stacks").removeClass("game-card-loading");
            var n = false;
            var s = function() {
                var a = false
                  , l = o(".js-game-card-follow")
                  , r = o(".js-game-card-follow-toggle")
                  , i = o(".js-box-art");
                r.tooltip();
                i.tooltip();
                var f = function(e) {
                    e.each((function(e, a) {
                        var t = o(a)
                          , l = t.parent(".js-game-card-follow")
                          , r = l.attr("data-following") === "true";
                        t.tooltip(r ? "disable" : "enable");
                        t.find(".game-card-follow-text").text(l.data(r ? "following-text" : "follow-text"))
                    }
                    ))
                };
                var c = function(e) {
                    if (a) {
                        return false
                    }
                    a = true;
                    return o.post(e).fail((function() {
                        Phoenix.Ui.showErrorMessage("An error occurred. Please try again later.")
                    }
                    )).always((function() {
                        a = false
                    }
                    ))
                };
                var d = function() {
                    var e = "event-tracking";
                    return function(a, t) {
                        var l = a.data(e), r;
                        if (typeof l === "string") {
                            r = l;
                            l = undefined
                        }
                        if (undefined === l) {
                            l = {};
                            if (r) {
                                l.clickGenericText = r
                            }
                            if (t.eventTracking) {
                                o.extend(l, t.eventTracking)
                            }
                            if (!o.isEmptyObject(l)) {
                                a.attr(`data-${e}`, JSON.stringify(l))
                            }
                        }
                        if (undefined !== l && !o.isEmptyObject(l)) {
                            a.trigger("followEventTracking")
                        }
                    }
                }();
                r.each((function() {
                    var e = o(this);
                    if (typeof e.data("click-registered") === "undefined") {
                        e.on("click", (function(e) {
                            e.preventDefault();
                            var a = o(this)
                              , t = a.parent(".js-game-card-follow")
                              , l = t.attr("data-following") === "true"
                              , r = a.data("game-id")
                              , i = o('[data-game-id="' + r + '"]');
                            if (a.data("multiplatform") && !l) {
                                return false
                            }
                            var n = a.data(l ? "unfollow-url" : "follow-url");
                            const s = c(n);
                            if (s !== false) {
                                s.done((function(e) {
                                    if (!e.success) {
                                        Phoenix.Ui.showErrorMessage(e.reason || "An unknown error occurred. Please try again later.");
                                        return
                                    }
                                    l = !l;
                                    t.attr("data-following", "" + l);
                                    if (a.find(".symbol_checkmark").length > 0) {
                                        var n = a.find(".symbol_checkmark")
                                          , s = a.find(".symbol_plus")
                                          , c = a.find(".symbol-with-follow-text");
                                        if (l) {
                                            c.addClass("text-color--light");
                                            n.removeClass("hide");
                                            s.addClass("hide")
                                        } else {
                                            c.removeClass("text-color--light");
                                            s.removeClass("hide");
                                            n.addClass("hide")
                                        }
                                    }
                                    var g = l ? "You're now following this game!" : "You're no longer following this game.";
                                    i.each((function(e, a) {
                                        o(a).parent(".js-game-card-follow").attr("data-following", "" + l)
                                    }
                                    ));
                                    if (!l && a.data("multiplatform")) {
                                        o('[data-popover-game-id="' + r + '"]').find(".js-game-card-follow-platform").attr("data-following", "" + l).removeClass("following")
                                    }
                                    f(i);
                                    Phoenix.Ui.showSuccessMessage(g);
                                    if (l) {
                                        d(a, e)
                                    }
                                }
                                ))
                            }
                        }
                        ));
                        e.data("click-registered", true)
                    }
                }
                ));
                o(".js-game-card-follow-platform").each((function() {
                    var e = o(this);
                    if (typeof e.data("click-registered") === "undefined") {
                        e.on("click", (function(e) {
                            e.preventDefault();
                            var a = o(this)
                              , t = a.attr("data-following") === "true"
                              , l = a.data("follow-url")
                              , r = a.data("unfollow-url")
                              , i = a.parents(".js-game-follow").data("popover-game-id")
                              , n = o('[data-popover-game-id="' + i + '"]')
                              , s = o('[data-game-id="' + i + '"]')
                              , g = n.find('.js-game-card-follow-platform[data-follow-url="' + l + '"]')
                              , p = t ? r : l;
                            const m = c(p);
                            if (m) {
                                m.done((function(e) {
                                    if (!e.success) {
                                        Phoenix.Ui.showErrorMessage(e.reason || "An unknown error occurred. Please try again later.");
                                        return
                                    }
                                    var l;
                                    t = !t;
                                    g.attr("data-following", "" + t);
                                    if (t) {
                                        l = "You're now following this release!";
                                        g.addClass("following")
                                    } else {
                                        l = "You're no longer following this release.";
                                        g.removeClass("following")
                                    }
                                    s.each((function(e, a) {
                                        var t = false;
                                        n.find(".js-game-card-follow-platform").map((function(e, a) {
                                            if (o(a).attr("data-following") === "true") {
                                                t = true
                                            }
                                        }
                                        ));
                                        o(this).parent(".js-game-card-follow").attr("data-following", "" + t)
                                    }
                                    ));
                                    f(s);
                                    Phoenix.Ui.showSuccessMessage(l);
                                    if (t) {
                                        d(a, e)
                                    }
                                }
                                ))
                            }
                        }
                        ));
                        e.data("click-registered", true)
                    }
                }
                ));
                o(".js-game-card-follow-form").each((function(e, a) {
                    var l = o(a);
                    if (typeof l.data("submit-registered") === "undefined") {
                        l.submit((function(e) {
                            var a = o(this);
                            e.preventDefault();
                            var l = a.find("input[name=email]").val();
                            t.makePostApiRequest(a.attr("action"), {
                                email: l
                            }, (function(e) {
                                if (typeof e !== "undefined" && !e.success) {
                                    a.find(".error").html(e.reason)
                                } else {
                                    a.addClass("hidden");
                                    a.siblings(".js-game-card-follow-others").removeClass("hidden").find("input[name=email]").val(l);
                                    setTimeout(PhoenixPopover.hidePopover, 4e3)
                                }
                            }
                            ), (function() {
                                a.find(".error").html("An error occured, please try again")
                            }
                            ))
                        }
                        ));
                        l.data("submit-registered", true)
                    }
                }
                ));
                o(".js-expand-collapse-section").on("click", (function(e) {
                    e.preventDefault();
                    var a = o(".expandable");
                    if (a.css("max-height") === "0px") {
                        a.css("max-height", a.prop("scrollHeight"))
                    } else {
                        a.css("max-height", "")
                    }
                }
                ));
                o(".collapse_bar").on("click", (function(e) {
                    e.preventDefault();
                    var a = o(".expandable");
                    a.css("max-height", "")
                }
                ));
                o(".form_section").on("DOMSubtreeModified", ".error", (function() {
                    var e = o(".expandable");
                    e.css("max-height", e.prop("scrollHeight"))
                }
                ));
                o(".js-pop-over-container.js-game-follow").each((function() {
                    var e = o(this);
                    if (typeof e.data("popover:shown-registered") === "undefined") {
                        e.on("popover:shown", (function(e, a) {
                            var t = o(this);
                            if (a.toggle.parent(".js-game-card-follow").attr("data-following") === "true") {
                                PhoenixPopover.hidePopover();
                                return
                            }
                            if (t.hasClass("js-game-follow-unreg")) {
                                t.css({
                                    display: "block"
                                })
                            } else {
                                t.css({
                                    width: a.toggle.css("width"),
                                    display: "block"
                                })
                            }
                            t.position({
                                my: "center top",
                                at: "center bottom",
                                of: a.toggle,
                                collision: "fit"
                            })
                        }
                        ))
                    }
                }
                ));
                PhoenixPopover.init();
                if (!n) {
                    o(e).ajaxComplete(s);
                    n = true
                }
            };
            s();
            o(e).on("on_page_event", s)
        }
        ), (function(e) {
            console.error(e)
        }
        ))
    }
    ))
}
)(document, window.jQuery);
var PhoenixPopover = function() {
    var e = {
        init() {
            $(".js-pop-over-toggle").each((function(e, l) {
                var r = $(l);
                if (typeof r.data("toggle-init") === "undefined") {
                    const e = r.closest(".js-pop-over-parent");
                    var i = e.find(".js-pop-over-container");
                    var n = {
                        element: i,
                        width: i.width(),
                        height: i.height(),
                        toggle: r,
                        clickOffsetX: 0,
                        clickOffsetY: 0
                    };
                    r.data("popOverContainer", n);
                    $("body").append(i.detach());
                    i.css({
                        position: "absolute"
                    });
                    r.on("keypress click", (function(e) {
                        if (e.type == "keydown") {
                            if (e.keyCode != 13 && e.keyCode != 32) {
                                return
                            }
                        }
                        if (o) {
                            t();
                            return
                        }
                        o = $(this).data("popOverContainer");
                        if (o) {
                            e.stopPropagation();
                            var l = 0;
                            if (e.clientX + o.width > $(document).width()) {
                                o.element.addClass("popover-position-left");
                                l = e.clientX - o.width - o.clickOffsetX
                            } else {
                                o.element.addClass("popover-position-right");
                                l = e.clientX + o.clickOffsetX
                            }
                            o.element.css({
                                top: e.clientY + $(window).scrollTop() + o.clickOffsetY,
                                left: l
                            });
                            o.element.show();
                            o.element.find("a:first").focus();
                            $("body").on("click", a);
                            o.element.trigger("popover:shown", o)
                        }
                    }
                    ));
                    r.data("toggle-init", true)
                }
            }
            ))
        },
        hidePopover() {
            if (o) {
                t()
            }
        },
        eoo: null
    };
    var o = null;
    function a(e) {
        var a = $(".js-game-follow-unreg").length > 0;
        if (o != null && (!$.contains(o.element[0], e.target) && a || !a)) {
            t()
        }
    }
    function t() {
        o.element.hide();
        o.element.removeClass("popover-position-left");
        o.element.removeClass("popover-position-right");
        o = null;
        $("body").off("click", a)
    }
    return e
}();
(function() {
    "use strict";
    const t = window.$ || window.jQuery;
    var e = function() {
        t(".js-load-forever").each((function() {
            var e = t(this);
            const a = this;
            if (e.data("loadForeverInitialized")) {
                return
            }
            e.data("loadForeverInitialized", true);
            var r = e.attr("data-page-name") || "page";
            var i = e.attr("data-show-more-type") || "";
            let n = "";
            if (e.attr("data-custom-route")) {
                n = e.attr("data-custom-route")
            } else if (i !== "") {
                n = "river/content/" + i
            }
            var o = e.attr("data-target") || ".js-load-forever-container";
            var f = typeof e.attr("data-no-scroll") !== "undefined";
            var l = e.attr("data-end-of-line-text") || "Sorry that's all folks";
            var d = t('<div class="loading"></div>');
            var s = true;
            var c = 1;
            var v = false;
            v = e.attr("data-max-page");
            if (!v) {
                v = false
            }
            var u = function() {
                var t = e.data("end-of-line");
                e.find("a").text(l);
                e.find("a").attr("href", t);
                e.find("a").attr("target", "_blank");
                e.text(l);
                e.attr("href", t);
                e.attr("target", "_blank");
                e.show();
                s = false
            };
            e.on("click", (function(i) {
                if (e.text() === "View more news") {
                    window.open(window.location.origin + "/news/", "_blank")
                }
                if (!s) {
                    return
                }
                if (v !== false && c >= v) {
                    return
                }
                i.preventDefault();
                c = c + 1;
                e.before(d);
                e.hide();
                t.get(n + "?" + r + "=" + c, (function(r) {
                    var i = null;
                    if (r.html || r.river) {
                        var n = r.html || r.river;
                        i = t("<div>" + n + "</div>")
                    } else {
                        i = t(r)
                    }
                    var l = i.find(o).html();
                    var d = false;
                    var s = t(l);
                    if (s.filter("ul").html() != undefined) {
                        d = s.filter("ul").html().trim() === ""
                    }
                    if (l === "" || d || i.find(".river--empty").length > 0) {
                        u();
                        return
                    }
                    t(o).append(s);
                    if (!f) {
                        t("html, body").animate({
                            scrollTop: s.offset().top
                        })
                    }
                    if (v !== false && c >= v) {
                        u()
                    }
                    if (i.find(".js-noPagesRemaining").length === 0) {
                        const r = a.querySelector("a");
                        if (r) {
                            let e;
                            let a;
                            try {
                                a = JSON.parse(r.dataset.eventTracking);
                                e = a.clickGenericText
                            } catch (t) {
                                a = r.dataset.eventTracking
                            }
                            if (typeof a === "string") {
                                e = a;
                                a = {}
                            }
                            if (e) {
                                var g = e.lastIndexOf("|") + 1;
                                if (t.isNumeric(e.substring(g))) {
                                    const t = `${e.substring(0, g)}${c}`;
                                    a.clickGenericText = t;
                                    r.setAttribute("data-event-tracking", JSON.stringify(a))
                                }
                            }
                        }
                        e.show()
                    }
                }
                )).complete((function() {
                    d.remove();
                    t(document).trigger("riverPaginate")
                }
                ))
            }
            ))
        }
        ))
    };
    t(e);
    t(document).on("ajaxContentLoaded", e)
}
)();
(function(e) {
    "use strict";
    var t = $(document);
    var a = "/api/video/";
    var r = "delete-saved-time/";
    var s = "mark-watched/";
    var i = function(e, t) {
        if (t) {
            var a = e.times && e.times[t] ? e.times[t] : 0;
            var r = $.cookie(e.cookie.replace("%d", t));
            return Math.max(a, r)
        }
        return 0
    };
    var o = function(e, t, i) {
        e.trigger("removeItem");
        var o = i > 1 ? s : r;
        $.ajax({
            type: "POST",
            url: a + o,
            data: {
                video_id: t,
                mark_next: false
            },
            success: function(t) {
                if (t.success) {
                    e.parents("li").fadeOut(500, (function() {
                        var e = $(this).parent();
                        $(this).remove();
                        e.trigger("removeItem")
                    }
                    ));
                    e.siblings(".content-progress").remove();
                    e.remove()
                } else {
                    Phoenix.Ui.showErrorMessage("Could not clear saved time.", {})
                }
            },
            error: function() {
                Phoenix.Ui.showErrorMessage("Could not clear saved time.", {})
            },
            complete: function() {}
        })
    };
    var n = function(e, t) {
        if (!t.enabled) {
            return
        }
        var a = t.cookie.indexOf("video") >= 0 ? "video" : "podcast";
        $(".js-progress-stats").each((function() {
            var e = $(this).data("id");
            var r = $(this).data("type");
            var s = i(t, e);
            if (s > 0 && a === r) {
                var n = $(this).data("length");
                var d = s / n * 100;
                $(this).append('<span style="width:' + d + '%"></span>');
                $(this).addClass("has-data").removeClass("js-progress-stats");
                var v = $(this).siblings(".js-progress-remove");
                v.removeClass("hide").click((function(t) {
                    o($(this), e, s);
                    t.preventDefault();
                    return false
                }
                ))
            }
        }
        ))
    };
    $((function() {
        PostRender.getPostRenderData("VideoBundle", n);
        PostRender.getPostRenderData("PodcastBundle", n)
    }
    ));
    t.on("riverPaginate", (function() {
        PostRender.getPostRenderData("VideoBundle", n);
        PostRender.getPostRenderData("PodcastBundle", n)
    }
    ))
}
)(this);
(function(e, s) {
    "use strict";
    function i() {
        s("a.btn-ban:not(.initialized)").on("click", (function() {
            if (s(this).is("a") === true && s(this).attr("href") !== "") {
                var e = s(this);
                AjaxApiRequest.makePostApiRequest(e.attr("href"), (function() {
                    e.addClass("active");
                    var s = e.closest(".btn-group");
                    s.children(".btn-unban").first().removeClass("hide");
                    s.children(".btn-ban-parent").first().addClass("hide");
                    Phoenix.Ui.showSuccessMessage("User banned");
                    e.parents(".js-avatar-user").first().addClass("banned")
                }
                ), (function() {
                    Phoenix.Ui.showErrorMessage("Woops! Something happened and we are working on it!")
                }
                ));
                return false
            }
        }
        )).addClass("initialized");
        s("a.btn-unban:not(.initialized)").on("click", (function() {
            if (s(this).is("a") === true && s(this).attr("href") !== "") {
                var e = s(this);
                AjaxApiRequest.makePostApiRequest(e.attr("href"), (function() {
                    e.addClass("hide");
                    e.next(".btn-ban-parent").removeClass("hide");
                    Phoenix.Ui.showSuccessMessage("User unbanned");
                    e.parents(".js-avatar-user").first().removeClass("banned")
                }
                ), (function() {
                    Phoenix.Ui.showErrorMessage("Woops! Something happened and we are working on it!")
                }
                ));
                return false
            }
        }
        )).addClass("initialized");
        s(".js-ban-widget .btn-ban:not(.initialized), .js-ban-widget .btn-unban:not(.initialized)").on("click", (function() {
            var e = s(this);
            AjaxApiRequest.makePostApiRequest(e.attr("href"), (function(s) {
                if (s.error) {
                    Phoenix.Ui.showSuccessMessage(s.message)
                } else {
                    if (e.hasClass("btn-unban")) {
                        Phoenix.Ui.showSuccessMessage("User unbanned")
                    } else {
                        Phoenix.Ui.showSuccessMessage("User banned")
                    }
                }
            }
            ), (function(e) {
                Phoenix.Ui.showErrorMessage("Woops! Something happened and we are working on it!s")
            }
            ));
            return false
        }
        )).addClass("initialized");
        s(".js-ban-time-widget button:not(.initialized)").on("click", (function(e) {
            var i = s.trim(s(".js-ban-widget input").val());
            if (!i) {
                Phoenix.Ui.showErrorMessage("Must enter ban value.")
            } else {
                var n = i.split(" ");
                var t = 0;
                var a = false;
                s.each(n, (function() {
                    var e = this;
                    if (e.length > 1) {
                        var s = e[e.length - 1];
                        var i = parseInt(e.slice(0, e.length - 1), 10);
                        if (isNaN(i)) {
                            Phoenix.Ui.showErrorMessage("Format string weird, should be like 1w 2d 3h");
                            a = true;
                            return false
                        }
                        switch (s) {
                        case "mo":
                            t = t + i * 44640;
                            break;
                        case "w":
                            t = t + i * 10080;
                            break;
                        case "d":
                            t = t + i * 1440;
                            break;
                        case "h":
                            t = t + i * 60;
                            break;
                        case "m":
                            t = t + i * 1;
                            break;
                        default:
                            Phoenix.Ui.showErrorMessage("Format string weird, should be like 1w 2d 3h");
                            a = true;
                            return false
                        }
                    }
                }
                ));
                var r = s(this);
                if (!a && t !== 0) {
                    var o = r.attr("href");
                    o = o.replace("REPLACEME", t);
                    AjaxApiRequest.makePostApiRequest(o, (function() {
                        Phoenix.Ui.showSuccessMessage("User banned for " + i)
                    }
                    ), (function() {
                        Phoenix.Ui.showErrorMessage("Woops! Something happened and we are working on it!")
                    }
                    ))
                }
            }
            e.preventDefault();
            e.preventPropagation()
        }
        )).addClass("initialized");
        s(".btn-nuke:not(.initialized)").on("click", (function() {
            var e = window.confirm("With great power comes great responsibility.  This will ban the user and delete all their messages and topics.  Are you sure you want to nuke this user?");
            if (e) {
                var i = window.confirm("Are you really sure?  Also, this process will take a while (Up to 2 minutes).  Just sit and wait after clicking for the status message bar to appear.");
                if (!i) {
                    return false
                }
            } else {
                return false
            }
            if (s(this).is("a,button") === true && s(this).attr("href") !== "") {
                var n = s(this);
                AjaxApiRequest.makePostApiRequest(n.attr("href"), (function() {
                    n.addClass("active");
                    var e = n.closest(".btn-group");
                    e.children(".btn-unban").first().removeClass("hide");
                    e.children(".btn-ban-parent").first().addClass("hide");
                    Phoenix.Ui.showSuccessMessage("User nuked!")
                }
                ), (function() {
                    Phoenix.Ui.showErrorMessage("Woops! Something happened and we are working on it!")
                }
                ));
                return false
            }
        }
        )).addClass("initialized");
        s(".btn-un-nuke:not(.initialized)").on("click", (function() {
            var e = window.confirm("Are you sure you want to undo the nuke of this user? This will unban the user and undelete their messages and comments");
            if (!e) {
                return false
            }
            if (s(this).is("a,button") === true && s(this).attr("href") !== "") {
                var i = s(this);
                AjaxApiRequest.makePostApiRequest(i.attr("href"), (function() {
                    i.addClass("active");
                    Phoenix.Ui.showSuccessMessage("User un-nuked!")
                }
                ), (function() {
                    Phoenix.Ui.showErrorMessage("Woops! Something happened and we are working on it!")
                }
                ));
                return false
            }
        }
        )).addClass("initialized")
    }
    s((function() {
        i();
        s(document).on("loadComments", i)
    }
    ))
}
)(this, this.jQuery);
$((function() {
    "use strict";
    var t = function() {
        if ($(this).is("button") === true && $(this).attr("href") !== "") {
            var t = $(this);
            var i = t.find(".js-btn-community-add-text");
            var a = t.data("community-type");
            var n = $(this).hasClass("js-community-image");
            var o = t.data("community-mark");
            var e, m;
            if (n) {
                m = t.data("community-guid");
                e = m.split("-")[1]
            } else {
                e = t.data("community-id")
            }
            $.ajax({
                data: {
                    entityTypeId: a,
                    entityId: e,
                    mark: o
                },
                type: "POST",
                url: t.attr("href"),
                success: function(a) {
                    Phoenix.Ui.showSuccessMessage(a.msg);
                    var e = window.location.pathname;
                    if (n) {
                        t.hide()
                    } else if (e === "/community/") {
                        t.hide();
                        window.location.reload(true)
                    } else if (o) {
                        i.html("Remove from Community");
                        t.data("community-mark", 0)
                    } else {
                        i.html("Feature on Community");
                        t.data("community-mark", 1)
                    }
                },
                error: function() {
                    Phoenix.Ui.showErrorMessage("Whoops! Something went wrong")
                }
            })
        }
    };
    var i = function() {
        $("#default-body").on("click", ".js-btn-community-add", t);
        $("#forums").on("click", ".js-btn-community-add", t)
    };
    i()
}
));
$((function() {
    "use strict";
    function e() {
        var e = window.confirm("Are you sure you want to mark this as spam? Associated user will be nuked!");
        if (!e) {
            return false
        }
        if ($(this).is("a,button") === true && $(this).attr("href") !== "") {
            var s = $(this);
            $.ajax({
                url: s.attr("href"),
                success: function() {
                    Phoenix.Ui.showSuccessMessage("Marked as Spam!");
                    t([parseInt(s.parent().parent().attr("id"))])
                },
                error: function() {
                    Phoenix.Ui.showErrorMessage("Woops! Something bad happened with the request")
                }
            });
            return false
        }
    }
    function s() {
        $("#spam-table").on("click", ".js-btn-spam", e);
        $("#js-topic-move").on("click", ".js-btn-spam", (function() {
            var e = window.confirm("Are you sure you want to mark this as spam? Associated user will be nuked!");
            if (!e) {
                return false
            } else {
                return true
            }
        }
        ));
        $("#spam-table").on("click", ".js-btn-not-spam", (function() {
            if ($(this).is("a,button") === true && $(this).attr("href") !== "") {
                var e = $(this);
                $.ajax({
                    url: e.attr("href"),
                    success: function() {
                        e.addClass("active");
                        Phoenix.Ui.showSuccessMessage("Marked as NOT spam");
                        t([parseInt(e.parent().parent().attr("id"))])
                    },
                    error: function() {
                        Phoenix.Ui.showErrorMessage("Woops! Something bad happened with the request")
                    }
                });
                return false
            }
        }
        ));
        $("#spam-heading").on("click", ".js-btn-mass-spam", (function() {
            if ($("input:checkbox[name=records]:checked").length == 0) {
                window.confirm("Mass spam requires checked checkboxes to work.");
                return false
            }
            var e = window.confirm("Are you sure you want to mark checked as spam? Associated user(s) will be nuked!");
            if (!e) {
                return false
            }
            if ($(this).is("button") === true && $(this).attr("href") !== "") {
                var s = $(this);
                var a = [];
                $("input:checkbox[name=records]:checked").each((function() {
                    a.push($(this).val())
                }
                ));
                $.ajax({
                    url: s.attr("href"),
                    data: {
                        records: a
                    },
                    success: function() {
                        Phoenix.Ui.showSuccessMessage("Marked checked as Spam!");
                        t(a)
                    },
                    error: function() {
                        Phoenix.Ui.showErrorMessage("Woops! Something bad happened with the request")
                    }
                });
                return false
            }
        }
        ));
        $("#spam-heading").on("click", ".js-btn-mass-not-spam", (function() {
            if ($("input:checkbox[name=records]:checked").length == 0) {
                window.confirm("Mass not spam requires checked checkboxes to work.");
                return false
            }
            if ($(this).is("button") === true && $(this).attr("href") !== "") {
                var e = $(this);
                var s = [];
                $("input:checkbox[name=records]:checked").each((function() {
                    s.push($(this).val())
                }
                ));
                $.ajax({
                    url: e.attr("href"),
                    data: {
                        records: s
                    },
                    success: function() {
                        Phoenix.Ui.showSuccessMessage("Marked checked as NOT Spam!");
                        t(s)
                    },
                    error: function() {
                        Phoenix.Ui.showErrorMessage("Woops! Something bad happened with the request")
                    }
                });
                return false
            }
        }
        ))
    }
    function t(e) {
        var s = parseInt($("#spam-table").data("last-spam-id"));
        var t = null;
        $.ajax({
            url: "/spam/" + s + "/" + e.length,
            success: function(e) {
                $(e).each((function(e, s) {
                    t = s.spamRecord;
                    var a = s.username;
                    var r = s.userPage;
                    var n = s.spamLink;
                    if (t) {
                        var o = "";
                        switch (t.entityTypeId) {
                        case 2020:
                            o = "Forum Topic";
                            break;
                        case 2040:
                            o = "Forum Message";
                            break;
                        case 2200:
                            o = "User Review";
                            break
                        }
                        $("<tr class='spam-record-row' id=" + t.id + ">" + "<td class='spam-type'><a title='Link to Spam' href='" + n + "'>" + o + "</a></td>" + "<td class='spam-score'>" + t.spamScore + "</td>" + "<td class='spam-title'><div class='spam-record-title'>" + t.title + "</div></td>" + "<td><div class='spam-record-body'>" + t.body + "</div></td>" + "<td class='spam-user'><a title='Link to user profile page' href='" + r + "'>" + a + "</a></td>" + "<td class='spam-points'>" + t.forumPoints + "</td>" + "<td>" + "<button href='/spam/mark/" + t.id + "/2' class='btn btn-mini btn-danger js-btn-spam'>Spam</button>" + "<button href='/spam/mark/" + t.id + "/1' class='btn btn-mini js-btn-not-spam'>Not Spam</button>" + "</td>" + "<td class='spam-massSpam center inner-space-vertical'><input type='checkbox' name='records' value='" + t.id + "' /></td>" + "</tr>").insertAfter($(".spam-record-row").last())
                    }
                }
                ));
                $("#spam-table").data("last-spam-id", $(e).last()[0].spamRecord.id)
            },
            complete: function() {
                $(e).each((function(e, s) {
                    $("#" + s).fadeOut(800, (function() {
                        $("#" + s).remove()
                    }
                    ))
                }
                ))
            },
            error: function() {
                console.log("something went error")
            }
        })
    }
    s()
}
));
$((function() {
    "use strict";
    var a = false;
    var t = false;
    var e = 0;
    $(document).on("click", ".js-dropdown-paginate a.primary-button--disabled", (function(a) {
        a.preventDefault()
    }
    ));
    $(document).on("click", ".js-simple-paginator a:not(.primary-button--disabled)", (function(i) {
        i.preventDefault();
        var r = $(this).parents(".js-simple-paginator");
        var o = r.data("pushstate") === false ? false : true;
        var s = r.data("warning");
        if (s) {
            $(this).data("warning", "");
            if (!confirm(s)) {
                return
            }
        }
        var l = $(this);
        var p = l.parents(".js-simple-paginator-container");
        if (p.attr("data-paginator-number") === null) {
            p.attr("data-paginator-number", e);
            e = e + 1
        }
        var u = p.attr("data-paginator-number");
        if (!a && window.history.pushState && o) {
            window.history.replaceState({
                name: "SimplePaginate",
                url: location.href
            }, "", location.href);
            a = true
        }
        var d = l.attr("href");
        n(l, d);
        if (window.history.pushState && o) {
            window.history.pushState({
                name: "SimplePaginate",
                href: d
            }, "", d);
            t = true
        }
    }
    ));
    var n = function(a, t) {
        var e = $('<div class="loading"></div>');
        var n = a.parents(".js-simple-paginator-container");
        n.addClass("hide");
        n.after(e);
        AjaxApiRequest.makeGetApiRequest(t, (function(a) {
            e.remove();
            n.html(a.html);
            n.removeClass("hide");
            $(document).trigger("loadComments")
        }
        ))
    };
    if (window.history.pushState) {
        $(window).on("popstate", "", (function(a) {
            if (!t) {
                return
            }
            var e = a.originalEvent.state;
            if (e && e.name === "SimplePaginate") {
                console.log("popping");
                console.log('.js-simple-paginator a[href="' + e.url + '"]');
                console.log(e.url);
                n($('.js-simple-paginator a[href="' + e.url + '"]'), e.url)
            }
        }
        ))
    }
    $(document).on("change", ".js-navigation select", (function(a) {
        var t = $(this).find(":selected").attr("href");
        window.location = t
    }
    ))
}
));
$((function() {
    "use strict";
    $(document).on("click", ".js-slider a.js-slide-button", (function(e) {
        e.preventDefault();
        var s = $(this);
        var t = s.attr("href");
        var i = $('<div class="loading"></div>');
        s.parents(".js-slider").children().addClass("hide");
        s.parents(".js-slider").append(i);
        AjaxApiRequest.makeGetApiRequest(t, (function(e) {
            var t = s.parents(".js-slider").first();
            i.remove();
            t.html(e.html)
        }
        ))
    }
    ))
}
));
$((function() {
    "use strict";
    var s = "expandable__show-less";
    var a = "expandable__show-more";
    var e = ".js-expandable";
    var n = ".js-expand";
    var i = function(n) {
        n.siblings(e).removeClass(s).addClass(a);
        n.addClass("hide")
    };
    var t = function() {
        $(e).each((function() {
            var s = $(this)
              , a = s.siblings(n);
            if (parseInt(s.css("height"), 10) < parseInt(s.css("max-height"), 10)) {
                i(a)
            }
        }
        ))
    };
    t();
    $(document).on("click", n, (function(s) {
        s.preventDefault();
        i($(this))
    }
    ))
}
));
$((function() {
    "use strict";
    $(document).on("click", ".js-unhide-list", (function(i) {
        i.preventDefault();
        var e = $(this).parents("ul").first();
        var s = e.find("li.hide");
        s.removeClass("hide");
        $(this).addClass("hide")
    }
    ));
    $(document).on("click", ".js-replace-list", (function(i) {
        i.preventDefault();
        var e = $(this).parents("ul").first();
        var s = e.find("li:not(.hide)");
        var t = e.find("li.hide");
        t.removeClass("hide");
        s.addClass("hide");
        $(this).addClass("hide")
    }
    ))
}
));
$((function() {
    "use strict";
    var e = $("body")
      , s = $(".search-input")
      , a = false;
    $("#js-btn-mobile-nav").on("click", (function(s) {
        if (e.hasClass("mobile-slide-search")) {
            e.removeClass("mobile-slide-search");
            e.addClass("mobile-slide-nav")
        } else if (e.hasClass("mobile-slide")) {
            e.removeClass("mobile-slide");
            e.removeClass("mobile-slide-nav");
            e.removeClass("mobile-slide-search")
        } else if (e.hasClass("mobile-nav-user")) {
            e.removeClass("mobile-nav-user");
            e.addClass("mobile-slide");
            e.addClass("mobile-slide-nav")
        } else {
            e.addClass("mobile-slide");
            e.addClass("mobile-slide-nav")
        }
        s.preventDefault();
        if (!a) {
            $("#site-wrapper").on("click", (function(s) {
                if (e.hasClass("mobile-slide")) {
                    s.preventDefault()
                }
                e.removeClass("mobile-slide");
                e.removeClass("mobile-slide-nav");
                e.removeClass("mobile-slide-search")
            }
            ));
            a = true
        }
    }
    ));
    $("#js-btn-mobile-search").on("click", (function(a) {
        if (e.hasClass("mobile-slide-nav")) {
            e.removeClass("mobile-slide-nav");
            e.addClass("mobile-slide-search");
            s.focus()
        } else if (e.hasClass("mobile-slide")) {
            e.removeClass("mobile-slide");
            e.removeClass("mobile-slide-nav");
            e.removeClass("mobile-slide-search");
            s.blur()
        } else {
            e.addClass("mobile-slide");
            e.addClass("mobile-slide-search");
            s.focus()
        }
        a.preventDefault()
    }
    ));
    $(".js-dropnav-toggle").on("click", (function(e) {
        $(this).toggleClass("is-active");
        var s = $(this).siblings("ul");
        if (s.length === 0) {
            s = $(this).siblings().children("ul")
        }
        var a = $(this).parents(".subnav");
        s.toggleClass("block");
        a.toggleClass("menu-open")
    }
    ));
    $(".js-sidenav-toggle").on("click", (function() {
        var e = $(this);
        e.toggleClass("is-active");
        var s = e.siblings("ul");
        s.toggleClass("show")
    }
    ));
    $("#nav-main .dropdown-toggle").on("click", (function() {
        $("html, body").animate({
            scrollTop: $(this).offset().top
        }, 300)
    }
    ));
    var l = navigator.userAgent.match(/iPad/i) != null;
    if (l) {
        $("ul.mhead-userBox li.dropnav", ".mhead-container").on("click", (function(e) {
            if ($(".dropnav-menu", this).is(":visible")) {
                return $(this)
            }
            e.preventDefault();
            $("li", "nav.mhead-nav").removeClass("hover");
            $("ul.mhead-userBox li .dropnav-menu", ".mhead-container").hide();
            $(".dropnav-menu", this).toggle();
            return false
        }
        ));
        $("li.dropnav-submenu__item", "nav.mhead-nav").on("click", (function() {
            window.location.href = $(this).children("a").attr("href")
        }
        ));
        $("li:has(ul),li:has(dl)", "nav.mhead-nav,nav#nav-main").doubleTapToGo();
        $(".dropnav", ".header-section").doubleTapToGo()
    }
}
));
(function(e, s, a, l) {
    e.fn.doubleTapToGo = function(l) {
        if (!("ontouchstart"in s) && !navigator.msMaxTouchPoints && !navigator.userAgent.toLowerCase().match(/windows phone os 7/i))
            return false;
        this.each((function() {
            var l = false;
            e(this).unbind("mouseover mouseout");
            e(this).on("click", (function(a) {
                a.stopPropagation();
                a.preventDefault();
                var i = e(this);
                var o = e(a.target);
                e("ul.mhead-userBox li .dropnav-menu", ".mhead-container").hide();
                if (i[0] != l[0]) {
                    i.siblings("li").removeClass("dropnav-menu__active");
                    if (i.hasClass("dropnav-menu__item")) {
                        i.addClass("dropnav-menu__active")
                    } else {
                        e("li:has(ul),li:has(dl)", "nav.mhead-nav,nav#nav-main").removeClass("hover");
                        i.siblings("li").removeClass("hover");
                        i.addClass("hover")
                    }
                    l = i;
                    return false
                } else {
                    l = false;
                    if (o && o.attr("href") && o.attr("href").length) {
                        s.location.href = o.attr("href")
                    } else {
                        return o
                    }
                    return false
                }
            }
            ));
            e(a).on("click touchstart MSPointerDown", (function(s) {
                var a = true
                  , i = e(s.target).parents();
                for (var o = 0; o < i.length; o++) {
                    if (i[o] == l[0]) {
                        a = false
                    }
                }
                if (a)
                    l = false
            }
            ))
        }
        ));
        return this
    }
}
)(jQuery, window, document);
$((function() {
    "use strict";
    $(".js-ajax-button-loader").on("click", (function(e) {
        e.preventDefault();
        var t = $(this);
        var a = t.data("ajax-href");
        var i = $('<div class="loading"></div>');
        var n = t.data("show-hide-button");
        if (n === "yes") {
            t.text("Hide")
        } else {
            t.hide()
        }
        t.parent().append(i);
        AjaxApiRequest.makeApiRequest(a, null, false, (function(e) {
            var a = t.parent();
            if (n === "yes") {
                t.show();
                var s = $("<div></div>").html(e.html);
                s.addClass(t.data("show-hide-container-class"));
                a.append(s);
                t.text("Hide");
                var d = false;
                i.remove();
                t.unbind();
                t.on("click", (function(e) {
                    if (d) {
                        s.show();
                        t.text("Hide");
                        d = false
                    } else {
                        s.hide();
                        t.text("Show");
                        d = true
                    }
                    e.stopPropagation();
                    e.preventDefault()
                }
                ))
            } else {
                a.html(e.html)
            }
        }
        ))
    }
    ))
}
));
$((function() {
    "use strict";
    $(document).on("click", ".js-uiTools-classSwitch--trigger", (function(s) {
        const t = $(s.currentTarget)
          , a = t.closest(".js-uiTools-classSwitch--target");
        var o = a.attr("data-uitools-onclass")
          , l = a.attr("data-uitools-offclass");
        if (a.hasClass(o)) {
            a.removeClass(o).addClass(l);
            return
        }
        if (a.hasClass(l)) {
            a.removeClass(l).addClass(o);
            return
        }
    }
    ))
}
));
$((function() {
    "use strict";
    var e = false;
    var n = $("li.js-notification");
    var t = null;
    var i = function(n, i, a, s) {
        return function() {
            if (e) {
                return
            }
            var r = this
              , o = $(r);
            e = true;
            var f = o.find(i);
            var u = f.parent().find(".loading");
            const c = o.find(".js-masthead-subnav");
            if (u.length === 0) {
                u = $('<div class="loading"></div>')
            }
            o.find(a).remove();
            f.after(u);
            t = $.get(n, (function(e, n, i) {
                if (!e.success) {
                    return
                }
                var r = e.messages;
                f.after(r);
                t = i;
                if (typeof s === "function") {
                    s(o.find(a))
                }
            }
            )).fail((function(n, i, a) {
                t = n;
                e = false;
                if (i === "abort" || n.readyState === 0) {
                    return
                }
                Phoenix.Ui.showErrorMessage("There was a problem displaying recent messages, try again later.")
            }
            )).done((function(n, i, a) {
                t = a;
                e = false;
                f.parent().find(".loading").remove();
                if (c.length > 0) {
                    c.trigger("resize")
                }
            }
            ))
        }
    };
    $("li.pm").mouseenter((function(e) {
        i("/pm/unread/", ".js-unread-messages", ".js-inbox-message").call(this)
    }
    )).mouseleave((function() {
        if (t && typeof t.abort === "function") {
            t.abort()
        }
    }
    ));
    n.mouseenter((function(e) {
        $(this).find(".js-notification-show-more").remove();
        i("/notifications/unread/", ".js-unread-notifications", ".js-notification-message", (function(e) {
            var t = n.find(".js-alert-status"), i;
            if (t.length > 0) {
                i = t.data("alert-active-classname");
                if (i) {
                    t.removeClass(i)
                }
            }
            n.children("a:first .bubble-count").text("0");
            setTimeout((function() {
                e.each((function() {
                    $(this).removeClass("unread").addClass("read")
                }
                ))
            }
            ), 5e3)
        }
        )).call(this, e)
    }
    )).mouseleave((function() {
        if (t && typeof t.abort === "function") {
            t.abort()
        }
    }
    ))
}
));
$((function() {
    "use strict";
    $(document).on("click", ".js-table-paginator a", (function(t) {
        t.preventDefault();
        var a = $(this);
        var e = a.attr("href");
        var o = $('<div class="loading"></div>');
        var n = a.parents("div.js-table-pagintor-table");
        n.hide();
        n.after(o);
        $.ajax({
            url: e,
            type: "GET",
            dataType: "html",
            success: function(t) {
                n.html(t);
                o.remove();
                n.show();
                $("html, body").animate({
                    scrollTop: n.offset().top
                }, 300)
            },
            complete: function() {
                o.remove();
                n.show()
            }
        })
    }
    ))
}
));
$((function() {
    "use strict";
    if (!window.history || !window.history.pushState) {
        return
    }
    var e = $(window);
    var t = ["Refreshing results...", "Working...", "We'll be right back...", "Contemplate your navel for a bit while we work this out...", "Do your chair exercises while we grab your stuff...", "Don't go away! It's coming...", "You kids and your instant gratification culture! Chill...", "Scouring our internets to find your stuff. Hang tight...", "You have encountered a level 3 ogre. Play with him for a bit...", "Of course the stuff you want is on the server in the basement. Hang on...", "Look at you! All getting fancy with sorting! BRB...", "Relax, the sorting elves are working...", "Hang on while we remember the order of the alphabet...", "Why u make us work so hard?", "What is this? Burger King&reg;? Are we supposed to do it Your Way&reg;?", "I like turtles...", "Usermon uses Sort. It was very effective...", "Hey! That tickles!", "Settle down Beavis..."];
    var r = location.href;
    var a = false;
    var n;
    var i = window.replaceState;
    var o = $('meta[name="js-sort-filter-text"]').attr("content");
    const s = new URLSearchParams(window.location.search);
    function l(e, t) {
        var r = Phoenix.jQuery.getDocument();
        if (!e) {
            e = "pageLoad"
        }
        document.dispatchEvent(new Event("pre_page_event"));
        document.dispatchEvent(new CustomEvent("on_page_event",{
            detail: {
                eventName: e,
                trackingParamsOverride: t
            }
        }))
    }
    function c(e) {
        window.history.pushState({
            name: "FilterSort",
            url: e
        }, "", e);
        n = true
    }
    function f(e) {
        if (!a) {
            if (window.history.replaceState && i) {
                window.history.replaceState({
                    name: "FilterSort",
                    url: e
                }, "", e);
                a = true;
                n = true
            }
        }
    }
    function u(e) {
        var r = $("#js-sort-filter-results");
        if (!r[0]) {
            window.location = e;
            return
        }
        var a = t[h(0, t.length - 1)];
        if (o === "no") {
            a = "Refreshing results..."
        }
        r.html("<div class='loading'>" + a + "</div>").load(e + " #js-sort-filter-results > *", (function() {
            c(e);
            l()
        }
        ))
    }
    function d(e) {
        var t = $("#js-sort-filter-results");
        if (!t[0]) {
            window.location = e;
            return
        }
        t.addClass("loading-overlay").load(e + " #js-sort-filter-results > *", (function() {
            window.history.pushState({
                name: "FilterSort",
                url: e
            }, "", e);
            n = true;
            t.removeClass("loading-overlay");
            document.dispatchEvent(new Event("pre_page_event"));
            document.dispatchEvent(new CustomEvent("on_page_event",{
                detail: {
                    eventName: "pageLoad"
                }
            }))
        }
        ))
    }
    e.on("popstate.FilterSort", (function(e) {
        if (!n) {
            return
        }
        var t = e.originalEvent.state;
        if (t && t.name === "FilterSort") {
            u(t.url)
        }
    }
    ));
    $("select.js-filter").on("change", (function() {
        if (!a) {
            window.history.pushState({
                name: "FilterSort",
                url: r
            }, "", r);
            a = true;
            n = true
        }
        const e = new URL(window.location.href);
        const t = e.searchParams;
        const i = this.parentNode.querySelectorAll("select");
        i.forEach((e=>{
            let r = e.value.toString();
            let a = e.dataset.filterQuery;
            if (r === "0" || r === "") {
                t.delete(a)
            } else if (a !== undefined) {
                t.set(a, r)
            }
        }
        ));
        u(e.href)
    }
    )).add($("select.js-filter-passive")).each((function(e, t) {
        const r = $(t);
        const a = r.attr("data-filter-query");
        const n = s.get(a);
        if (n) {
            r.find('option[value="' + decodeURIComponent(n) + '"]').attr("selected", "selected")
        }
    }
    ));
    $(".js-filter-special").on("click", "thead a", (function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!a) {
            window.history.pushState({
                name: "FilterSort",
                url: r
            }, "", r);
            a = true;
            n = true
        }
        d(this.getAttribute("href"))
    }
    ));
    $(".js-filter-activate").on("click", (function() {
        const e = this.dataset.filters.split(",");
        const t = new URL(window.location.href);
        const r = t.searchParams;
        e.forEach((e=>{
            const t = document.querySelector(`[data-filter-query=${e.trim()}]`);
            const a = t.dataset.filterQuery;
            const n = t.value.toString();
            if (n === "0" || n === "") {
                r.delete(a)
            } else {
                r.set(a, n)
            }
        }
        ));
        u(t.href)
    }
    ));
    $(".js-filter-replace").on("change", (function() {
        const e = `/${this.dataset.filterReplace}/`;
        const t = JSON.parse(this.dataset.filterAppend);
        const r = new URL(window.location.href);
        const a = r.searchParams;
        const n = a.keys();
        for (const e of n) {
            a.delete(e)
        }
        if (window.location.pathname.includes(e)) {
            r.pathname = window.location.pathname.replace(e, `/${this.value}/`)
        } else if (t) {
            r.pathname = window.location.pathname + this.value + "/"
        }
        window.location.href = r.href
    }
    ));
    $(".js-filter-clear-filters").on("click", (function() {
        const e = this.dataset.filters.split(",");
        const t = new URL(window.location.href);
        const r = t.searchParams;
        e.forEach((e=>{
            const t = document.querySelector(`[data-filter-query=${e.trim()}]`);
            const a = t.dataset.filterQuery;
            r.delete(a);
            if (t.className.includes("js-filter-text")) {
                t.value = ""
            } else {
                t.value = 0
            }
        }
        ));
        u(t.href)
    }
    ));
    $(".js-sort").each((function(e, t) {
        const r = $(t);
        const a = s.get("sort");
        const n = s.get("direction");
        if (a && n) {
            r.find('option[data-sort-param="' + a + '"][data-sort-direction="' + n + '"]').attr("selected", "selected")
        }
    }
    )).on("change", (function() {
        f(r);
        var e = $(this);
        var t = e.children(":selected");
        var a = t.attr("data-sort-param");
        var n = t.attr("data-sort-direction");
        if (!a || !n) {
            return
        }
        const i = new URLSearchParams(location.search);
        i.set("sort", a);
        i.set("direction", n);
        const o = `${location.pathname}?${i.toString()}`;
        u(o)
    }
    ));
    $(document).on("click", ".js-order-buttons a", (function(e) {
        f(r);
        e.preventDefault();
        e.stopPropagation();
        const t = this.dataset.orderby;
        const a = this.dataset.direction;
        if (!t || !a) {
            return
        }
        const n = new URL(window.location.href);
        n.searchParams.set("orderby", t);
        n.searchParams.set("direction", a);
        u(`${n.pathname}${n.search}`)
    }
    ));
    $(".js-filter").find(".filter-list__label").on("click", (function() {
        $(this).closest(".filter-list__item").toggleClass("js-active")
    }
    ));
    function h(e, t) {
        return Math.floor(Math.random() * (1 + t - e)) + e
    }
    (function() {
        var t = {};
        var a = 0;
        var n = "filter-url";
        var i = "filter-cache-key";
        var o = "is-loading-filter";
        var s = "on";
        var c = ".js-filter-json";
        var u = "option, .js-filter-option";
        var d = ".on, :selected";
        var h = function() {
            var t = false;
            return function() {
                if (true === t) {
                    return
                }
                t = true;
                e.on("popstate.JsonFilter", v)
            }
        }();
        var v = function(e) {
            var r = (e.originalEvent || {}).state || {}, a, n, i, o, l, c, f, u;
            if (r.name !== "JsonFilter") {
                return
            }
            a = r.filterSetKey;
            n = t[a];
            i = r.filterState;
            o = i.filterValue;
            c = n.$filter;
            u = n.$options;
            l = c.is("select");
            if (true === l) {
                f = u.filter('[value="' + o + '"]')
            } else {
                f = u.filter("[data-filter-value=" + o + "]")
            }
            i.$selected = f;
            $.extend(n, i);
            if (true === l) {
                c[0].selectedIndex = f[0].index
            } else {
                u.filter(d).removeClass(s);
                f.addClass(s)
            }
            P(n)
        };
        var p = function(e, t) {
            switch (t) {
            case "abort":
                break;
            case "timeout":
                break;
            default:
                break
            }
        };
        var w = function(e, t) {
            var r = e.$results, a = j(e), n = false, o, s;
            r.contents().detach();
            if (t && t.$contents) {
                n = true;
                r.append(t.$contents)
            } else {
                r.html(t.html)
            }
            r.data(i, a);
            if (!e.noHistory && e.updateHistory) {
                m(e, y(e, false))
            }
            if (e.updateHistory && r.data("triggerPageLoadEvent")) {
                if (t && t.trackingParams) {
                    o = "pageLoad_" + a;
                    s = t.trackingParams
                }
                l(o, s)
            }
            if (false === n) {
                b(e)
            }
        };
        var g = function(e) {
            return e.slice(0, 1)
        };
        var m = function(e, t) {
            var a;
            f(r);
            a = {
                name: "JsonFilter",
                filterSetKey: e.key,
                filterState: {
                    filterKey: e.filterKey,
                    filterValue: e.filterValue,
                    updateHistory: false
                }
            };
            window.history.pushState(a, "", t)
        };
        var y = function(e, t) {
            var r = e.$filter
              , a = e.$selected
              , i = a.data(n);
            if (!i) {
                i = r.data(n)
            }
            if (!i) {
                i = location.href
            }
            if (false !== t) {
                i += i.indexOf("?") < 0 ? "?" : "&";
                i += "ajax"
            }
            return i
        };
        var S = function(e) {
            var t = e.$pod
              , r = e.requestSettings;
            if (r) {
                return r
            }
            r = {
                dataType: "json",
                beforeSend: function() {
                    t.addClass(o)
                },
                error: [function(t, r) {
                    p(e, r)
                }
                ],
                success: [function(t) {
                    w(e, t);
                    document.dispatchEvent(new Event("ajaxContentLoaded"))
                }
                ]
            };
            r.complete = [function() {
                t.removeClass(o);
                r.complete = g(r.complete);
                r.error = g(r.error);
                r.success = g(r.success)
            }
            ];
            e.requestSettings = r;
            return r
        };
        var k = function(e) {
            var t = e.noData, r = e.filterKey, a = e.filterValue, n, i = S(e);
            i.url = y(e);
            if (!t && r && a) {
                n = {};
                n[r] = a
            }
            if (e.filterExtraData) {
                if (!n) {
                    n = {}
                }
                n = Object.assign(n, e.filterExtraData)
            }
            if (n) {
                i.data = n
            }
            return i
        };
        var j = function(e) {
            return e.filterKey + "_" + e.filterValue
        };
        var b = function(e, t) {
            var r = e.$results, a = e.cache, n = r.data(i), o = {}, s;
            if (!n) {
                n = j(e);
                r.data(i, n)
            }
            s = a[n];
            if (t) {
                delete t.html;
                o = t
            }
            o.$contents = r.contents();
            if (s) {
                a[n] = $.extend(s, o)
            } else {
                a[n] = o
            }
            return a
        };
        var x = function(e, t) {
            return e[t]
        };
        var E = function(e) {
            var t = e.$results
              , r = t.contents()
              , a = t.data(i)
              , n = x(e.cache, a)
              , o = n.$contents;
            if (o && r.is(o)) {
                return false
            }
            return true
        };
        var P = function(e) {
            var t = j(e), r, a = e.$request, n = x(e.cache, t) || {}, i = n.$contents;
            if (a) {
                a.abort();
                e.$request = null
            }
            if (i) {
                w(e, n)
            } else {
                r = k(e);
                e.$request = $.ajax(r)
            }
        };
        var C = function(e) {
            var r, n, i, o, s, l, c, f, h, v, p;
            r = e.closest(".js-filter-pod");
            if (r && r.length > 0) {
                n = r.find(".js-filter-results")
            } else {
                r = false
            }
            i = e.find(u);
            if (!r || !(n && n.length > 0) || !(i && i.length > 0)) {
                return false
            }
            c = e.data();
            f = c.filterExtraData;
            o = i.filter(d);
            if (!o || o.length === 0) {
                o = i.first()
            }
            h = c.filterQuery;
            v = o.val() || o.data("filter-value");
            l = a += 1;
            s = {
                $filter: e,
                $options: i,
                $pod: r,
                $results: n,
                $request: null,
                $selected: o,
                cache: {},
                key: l,
                filterExtraData: f,
                filterKey: h,
                filterValue: v,
                noData: !!c.filterNodata,
                noHistory: !!c.filterNohistory,
                updateHistory: false
            };
            if (!s.noHistory) {
                p = {
                    pageTitle: $("title").text(),
                    pageDescription: $('meta[name="description"]').attr("content")
                }
            }
            b(s, p);
            t[l] = s;
            return s
        };
        var H = function() {
            var e = $(this), t, r = C(e);
            if (!r) {
                return
            }
            if (!r.noHistory) {
                h()
            }
            t = r.$options;
            if (e.is("select")) {
                e.on("change", (function() {
                    var e = t.filter(d);
                    if (r.$selected && e.is(r.$selected)) {
                        return
                    }
                    if (E(r)) {
                        b(r)
                    }
                    r.$selected = e;
                    r.filterValue = e.val();
                    r.updateHistory = true;
                    P(r)
                }
                ))
            } else {
                t.on("click", (function(e) {
                    var a = $(this)
                      , n = t.filter(d);
                    e.preventDefault();
                    if (a.is(n)) {
                        return
                    }
                    if (E(r)) {
                        b(r)
                    }
                    n.removeClass(s);
                    a.addClass(s);
                    r.$selected = a;
                    r.filterValue = a.data("filter-value");
                    r.updateHistory = true;
                    P(r)
                }
                ))
            }
        };
        $("a[data-filter-cookie]").on("click", (function() {
            L($(this).data("filter-cookie"))
        }
        ));
        var L = function(e) {
            if (!document || !e.name || !e.value || !e.length) {
                return
            }
            $.cookie(e.name, e.value, {
                expires: parseInt(e.length)
            })
        };
        var R = function() {
            var e = $(c);
            if (e && e.length > 0) {
                e.each(H)
            }
        };
        R()
    }
    )();
    (function() {
        var e = $(".js-filter-load-page");
        if (e && e.length > 0) {
            e.each((function() {
                var e = $(this);
                e.on("change", (function() {
                    const e = new URLSearchParams(window.location.search);
                    const t = e.has("score") ? `?score=${e.get("score")}` : "";
                    location.href = `${$(this.options[this.selectedIndex]).data("filterUrl")}${t}`
                }
                ))
            }
            ))
        }
    }
    )()
}
));
(function(t, n) {
    "use strict";
    var e = window.location.pathname;
    function i() {
        var t = n("#nav-main");
        var e = n(".js-highlightable-sub-nav");
        a(t, true, true);
        e.each((function(t, e) {
            a(n(this), true)
        }
        ))
    }
    function a(t, i, a) {
        var r = t.find("li");
        var f = null;
        var h = r.first();
        if (!a) {
            f = h
        }
        r.each((function(t, a) {
            var r = n(this).children("a").attr("href");
            if (r == "#") {
                r = n(this).children("a").next().attr("href")
            }
            if (typeof r !== "undefined" && (i || r.length === e.length) && e.indexOf(r) === 0) {
                f = n(this)
            } else if (typeof r === "undefined" && f !== null && e.length !== f.children("a").attr("href").length && e.length !== h.children("a").attr("href").length && f.children("a").attr("href").length == h.children("a").attr("href").length) {
                n(this).find("dd").each((function(t, a) {
                    r = n(this).children("a").attr("href");
                    if (typeof r !== "undefined" && i || r.length === e.length && e.indexOf(r) === 0) {
                        f = n(this).closest("li")
                    }
                }
                ))
            }
        }
        ));
        if (f) {
            f.addClass("active")
        }
    }
    var r = function() {
        var t = n(".js-dropnav-active");
        if (typeof n.fn.menuAim === "undefined") {
            return false
        }
        n.each(t, (function() {
            var t = n(this);
            if (t.data("hover-init")) {
                return
            }
            var e = "right";
            if (t.attr("data-direction")) {
                e = t.attr("data-direction")
            }
            t.menuAim({
                activate: function(t) {
                    n(t).addClass("dropnav-menu__active")
                },
                deactivate: function(t) {
                    n(t).removeClass("dropnav-menu__active")
                },
                submenuDirection: e
            });
            t.data("hover-init", true)
        }
        ))
    };
    var f = function() {
        n(".js-dropnav").on("focusin", (function(t) {
            n(this).addClass("hover")
        }
        ));
        n(".js-dropnav").on("focusout", (function(t) {
            var e = this;
            setTimeout((function() {
                if (n(e).has(":focus").length === 0) {
                    n(e).removeClass("hover")
                }
            }
            ), 0)
        }
        ))
    };
    n((function() {
        i();
        r();
        f()
    }
    ));
    n(document).ajaxComplete((function() {
        r()
    }
    ))
}
)(this, jQuery);
(function() {
    "use strict";
    window.PhoenixUtils = {
        getHtmlTemplate: function(n) {
            var r = $('script[type="text/template/' + n + '"]');
            if (!r.length) {
                return ""
            }
            return r.html().trim()
        },
        cloneObject: function(n) {
            try {
                return JSON.parse(JSON.stringify(n))
            } catch (n) {
                return null
            }
        },
        fromJson: function(n) {
            try {
                return JSON.parse(n)
            } catch (n) {
                return null
            }
        },
        toJson: function(n) {
            try {
                return JSON.stringify(n)
            } catch (n) {
                return null
            }
        },
        capitalizeString: function(n) {
            return n.charAt(0).toUpperCase() + n.slice(1)
        },
        snakeToCamel: function(n) {
            return n.replace(/(\_\w)/g, (function(n) {
                return n[1].toUpperCase()
            }
            ))
        },
        getBrowser: function() {
            if (typeof navigator.userAgent == "undefined") {
                return "unknown"
            }
            if (navigator.userAgent.search("Chrome") != -1) {
                return "chrome"
            }
            if (navigator.userAgent.search("Firefox") != -1) {
                return "firefox"
            }
            if (navigator.userAgent.search("Safari") != -1) {
                return "safari"
            }
            if (navigator.userAgent.search("MSIE") != -1) {
                return "ie"
            }
            return "unknown"
        },
        getIEVersion: function() {
            return parseFloat(navigator.appVersion.split("MSIE")[1])
        },
        getOS: function() {
            var n = navigator.appVersion;
            if (n.indexOf("Windows") != -1) {
                var r = n.indexOf("Windows NT");
                if (r == -1) {
                    return "Windows9x"
                }
                var e = n.substr(r + 11, 3);
                if (e == "6.2") {
                    return "Windows8"
                }
                if (e == "6.1") {
                    return "Windows7"
                }
                if (e == "6.0") {
                    return "WindowsVista"
                }
                if (e == "5.1") {
                    return "WindowsXP"
                }
                if (e == "5.0") {
                    return "Windows2K"
                }
                return "WindowsNT"
            }
            if (n.indexOf("iPad") != -1) {
                return "iOS-iPad"
            }
            if (n.indexOf("iPhone") != -1) {
                return "iOS-iPhone"
            }
            if (n.indexOf("iPod") != -1) {
                return "iOS-iPod"
            }
            if (n.indexOf("Android") != -1) {
                return "Android"
            }
            if (n.indexOf("Mac") != -1) {
                return "MacOS"
            }
            if (n.indexOf("X11") != -1) {
                return "UNIX"
            }
            if (n.indexOf("Linux") != -1) {
                return "Linux"
            }
            return "Unknown"
        },
        eoo: null
    }
}
)();
(function(t) {
    "use strict";
    var a = $(".js-schedule--vertical")
      , e = !!a.length;
    if (!e) {
        return
    }
    var n = $(document);
    var i = $(".js-schedule-time-slots");
    var r = $(".js-schedule-time")
      , s = $(".js-schedule-event")
      , d = $(".js-schedule-tabs")
      , c = $(".js-schedule-day");
    var u = {};
    var f = function() {
        var t;
        return function() {
            if (!t) {
                if (i && i.length) {
                    t = i.data("slot-duration")
                } else {
                    t = 20
                }
            }
            return t
        }
    }();
    var v = function() {
        var t;
        return function() {
            if (!t) {
                t = f() * 60
            }
            return t
        }
    }();
    var l = function() {
        var t;
        return function() {
            if (!t) {
                t = r.outerHeight()
            }
            return t
        }
    }();
    var h = function() {
        var t;
        return function() {
            if (!t) {
                t = 1 / 60 / f() * l()
            }
            return t
        }
    }();
    var o = function() {
        var t = function() {
            var t;
            return function() {
                if (!t) {
                    var a = r.first().data("attr-start")
                      , e = r.last().data("attr-start") + i.data("slot-duration") * 6e3 - 1;
                    t = {
                        "data-day-start": a,
                        "data-day-end": e
                    }
                }
                return t
            }
        }();
        var a = function(a) {
            var e, n, i;
            if (a && a.length > 0) {
                a.each((function() {
                    var t = $(this)
                      , a = t.data("attr-start")
                      , i = t.data("attr-length") + a - 1;
                    if (!e || e > a) {
                        e = a
                    }
                    if (!n || n < i) {
                        n = i
                    }
                }
                ));
                i = {
                    "data-day-start": e,
                    "data-day-end": n
                }
            } else {
                i = t()
            }
            return i
        };
        return function() {
            if (!c || c.length < 1) {
                return
            }
            c.each((function() {
                var t = $(this)
                  , e = t.data("event-date")
                  , n = ".js-schedule-event--" + e
                  , i = $(n);
                u[e] = i;
                t.append(i);
                t.attr(a(i))
            }
            ))
        }
    }();
    var g = function(t, a) {
        var e = h();
        if (!a) {
            a = r.data("attr-start")
        }
        if (!t) {
            t = s
        }
        t.each((function() {
            var t = $(this);
            var n = t.data("attr-start");
            var i = t.data("attr-length");
            t.css({
                top: (n - a) * e,
                height: i * e
            })
        }
        ))
    };
    var y = function() {
        var t, a, e, n, i, s;
        var d;
        var f;
        var l;
        var h;
        var o = "schedule__col--active";
        var y = "schedule-day-picker--disabled";
        var j = function() {
            var a = "js-schedule-day--" + f
              , e = "js-schedule-day-slot--" + f;
            c.each((function() {
                var e = $(this)
                  , n = e.hasClass(a);
                e.toggleClass(o, n);
                if (n) {
                    t = e
                }
            }
            ));
            n.each((function() {
                var t = $(this);
                t.toggleClass(o, t.hasClass(e))
            }
            ))
        };
        var C = function() {
            var a = t.data("day-start"), e = t.data("day-end"), n = v(), i;
            r.each((function() {
                var t = $(this)
                  , r = false
                  , s = t.data("attr-start")
                  , d = s + n - 1;
                if (d < a || s > e) {
                    r = true
                }
                if (!r && !i) {
                    i = s
                }
                t.toggleClass("dn", r)
            }
            ));
            g(u[f], i)
        };
        var m = function() {
            var t = d.toDateString();
            i.toggleClass(y, t === l.toDateString());
            s.toggleClass(y, t === h.toDateString())
        };
        var p = function() {
            m();
            j();
            C()
        };
        var k = function(t) {
            d.setTime(d.getTime() + t);
            f = d.getTime() / 1e3;
            p()
        };
        return function() {
            e = $(".js-schedule-day-picker");
            if (!e || e.length < 1) {
                return
            }
            n = e.find(".js-schedule-day-slot");
            a = e.find(".js-schedule-day-slot--active");
            i = e.find(".js-schedule-day-picker--prev");
            s = e.find(".js-schedule-day-picker--next");
            f = a.data("event-date");
            d = new Date(f * 1e3);
            l = new Date(e.data("event-start") * 1e3);
            h = new Date(e.data("event-end") * 1e3);
            i.on("click", (function() {
                k(-864e5)
            }
            ));
            s.on("click", (function() {
                k(864e5)
            }
            ));
            p()
        }
    }();
    var j = function() {
        d.find("li").each((function(t, a) {
            $(this).on("click", (function(t) {
                var a = $(this).data("attr-day")
                  , e = $(".js-schedule-date")
                  , n = $(this).siblings("li");
                if (n.hasClass("active")) {
                    n.removeClass("active");
                    $(this).addClass("active")
                }
                if (e) {
                    var i = e.find("em");
                    i.html($(this).data("attr-date"))
                }
                C(a);
                t.preventDefault()
            }
            ));
            if ($(this).hasClass("active")) {
                C($(this).data("attr-day"))
            }
        }
        ))
    };
    var C = function(t) {
        var a = t;
        s.each((function(t, e) {
            s.not($(this).addClass("hidden"));
            $(this).each((function() {
                if (a === $(this).data("attr-day")) {
                    if ($(this).hasClass("hidden")) {
                        $(this).removeClass("hidden")
                    }
                }
            }
            ))
        }
        ))
    };
    var m = function() {
        o();
        g();
        y();
        j();
        a.addClass("schedule--initialized")
    };
    $((function() {
        m()
    }
    ))
}
)(this);
(function(o) {
    "use strict";
    var t = o.Phoenix;
    if (!t) {
        o.Phoenix = t = {}
    }
    var n = t.jQuery || {};
    var e = n.getDocument ? n.getDocument() : $(document);
    var r = n.getWindow ? n.getWindow() : $(window);
    (function() {
        var t, n = o.scrollMonitor;
        var l = function() {
            r.one("scroll", (function() {
                t = null
            }
            ))
        };
        var i = function(o, t) {
            window.scrollTo({
                top: o,
                left: 0
            });
            if (t && typeof t === "function") {
                t()
            }
            l()
        };
        var f = function() {
            var o = $("html,body"), e = "scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", r, i;
            var f = function(o) {
                var t = Math.floor((n.viewportTop - o) / 4);
                if (t < 0) {
                    t = Math.abs(t)
                }
                return t
            };
            return function(c, u, a) {
                if (!u) {
                    u = f(c)
                }
                o.one(e, i = function() {
                    o.stop()
                }
                );
                o.animate({
                    scrollTop: c
                }, {
                    duration: u,
                    start: function() {
                        r = false
                    },
                    complete: function() {
                        if (r) {
                            return
                        }
                        r = true;
                        o.off(e, i);
                        if (n.viewportTop !== c) {
                            window.scrollTo({
                                top: c,
                                left: 0
                            })
                        }
                        window.setTimeout((function() {
                            l()
                        }
                        ), 100)
                    },
                    fail: function() {
                        r = true;
                        t = null
                    }
                }).promise().then((function() {
                    if (a && typeof a === "function") {
                        a()
                    }
                }
                ))
            }
        }();
        var c = function(o) {
            var n, e, r, l, c, u;
            if (!o || typeof o !== "object") {
                return
            }
            n = o.scrollEvent;
            e = o.scrollBehavior;
            r = o.scrollDuration;
            l = o.$topElement;
            c = o.onScrollComplete;
            if (!l.length) {
                return
            }
            if (n) {
                n.preventDefault()
            }
            if (l.is(t)) {
                return
            }
            t = l;
            u = Math.floor(l.offset().top);
            if (e === "instant") {
                i(u, c)
            } else {
                f(u, r, c)
            }
        };
        e.on("click", '.js-scroll-to[href^="#"],.js-scroll-to[data-scroll-to]', (function(o) {
            var t = $(this), n = t.data("scroll-behavior"), e, r;
            r = t.attr("href");
            if (!r) {
                r = t.data("scroll-to")
            }
            e = $(r);
            c({
                scrollEvent: o,
                scrollBehavior: n,
                $topElement: e
            })
        }
        ));
        e.on("scrollto", (function(o, t) {
            c(t)
        }
        ))
    }
    )()
}
)(this);
$((function() {
    if (!Phoenix.userLoggedIn()) {
        return
    }
    $.get("/api/user/im-here", (function(e) {
        if (e.msg) {
            $("#liveMessageContent").html(e.msg);
            $("#liveMessageOverlay").toggle()
        }
    }
    ));
    setInterval((function() {
        $.get("/api/user/thump-thump", (function(e) {
            if (e.msg) {
                $("#liveMessageContent").html(e.msg);
                $("#liveMessageOverlay").toggle()
            }
        }
        ))
    }
    ), 18e4)
}
));
function closeOverlay() {
    $("#liveMessageOverlay").toggle()
}
(function(l) {
    "use strict";
    var n = [];
    var a = function() {
        var l = {
            init: function(l) {
                t = l.find(".js-poll-not-voted");
                e = l.find(".js-poll-voted");
                i = l.find(".js-poll-options");
                s = l.find(".js-poll-tally");
                r = i.find(".js-poll-option");
                d = l.find(".js-poll-submit");
                v = l.find(".js-poll-error");
                f = v.find(".js-error-text");
                n = l.data("poll-id");
                a = l.data("voting-allowed");
                o = l.data("user-voted");
                if (!a || o) {
                    var h = e.data("tally");
                    p(h);
                    c(h);
                    e.removeClass("hidden")
                } else {
                    t.removeClass("hidden")
                }
                if (r.length) {
                    u()
                }
                return this
            },
            eoo: null
        };
        var n = null;
        var a = false;
        var o = false;
        var t = null;
        var e = null;
        var i = null;
        var s = null;
        var r = null;
        var d = null;
        var v = null;
        var f = null;
        function u() {
            r.click((function() {
                var l = $(this);
                if (l.hasClass("js-poll-option-selected")) {
                    return
                }
                var n = i.find(".js-poll-option-selected");
                if (n[0]) {
                    n.removeClass("js-poll-option-selected")
                }
                l.addClass("js-poll-option-selected")
            }
            ));
            d.click((function() {
                var l = i.find(".js-poll-option-selected");
                if (!l[0]) {
                    return
                }
                v.addClass("hidden");
                var a = l.data("poll-option-id");
                AjaxApiRequest.makeApiRequest("/poll/" + n + "/vote/" + a, null, false, (function(l) {
                    if (l.tally) {
                        p(l.tally);
                        c(l.tally);
                        e.removeClass("hidden");
                        t.addClass("hidden")
                    }
                    if (!l.success) {
                        h(l.error)
                    }
                }
                ), (function(l, n, a) {
                    if (l || n || a) {}
                    console.log("voting error " + a)
                }
                ))
            }
            ));
            $("#designer-values-submit").click((function() {
                var l = $(".js-designer-tally-values");
                var n = 0;
                var a = 0;
                l.each((function(l, o) {
                    n++;
                    a += parseInt($(o).val(), 10)
                }
                ));
                if (a != 100) {
                    if (a > 100) {
                        l.val(100 / n)
                    } else {
                        var o = (100 - a) / n;
                        l.each((function(l, a) {
                            var t = $(a);
                            n++;
                            t.val(parseInt(t.val(), 10) + o)
                        }
                        ))
                    }
                }
            }
            ))
        }
        function p(l) {
            s.find(".js-option-tally").each((function(n, a) {
                var o = $(a);
                var t = parseInt(o.data("poll-option-id"), 10);
                o.text(l[t] + "%")
            }
            ))
        }
        function c(l) {
            s.find(".js-option-pollbar").each((function(n, a) {
                var o = $(a);
                var t = parseInt(o.data("poll-option-id"), 10);
                if (o.hasClass("js-option-pollbar--height")) {
                    o.css("height", l[t] + "%")
                } else {
                    o.css("width", l[t] + "%")
                }
            }
            ))
        }
        function h(l) {
            f.text(l);
            v.removeClass("hidden")
        }
        return l
    };
    $((function() {
        $(".js-poll-container:not([data-post-render-param])").each((function(l, o) {
            n.push((new a).init($(o)))
        }
        ))
    }
    ))
}
)(window);
eval(function(e, t, r, n, i, o) {
    i = function(e) {
        return (e < t ? "" : i(parseInt(e / t))) + ((e = e % t) > 35 ? String.fromCharCode(e + 29) : e.toString(36))
    }
    ;
    if (!"".replace(/^/, String)) {
        while (r--) {
            o[i(r)] = n[r] || i(r)
        }
        n = [function(e) {
            return o[e]
        }
        ];
        i = function() {
            return "\\w+"
        }
        ;
        r = 1
    }
    while (r--) {
        if (n[r]) {
            e = e.replace(new RegExp("\\b" + i(r) + "\\b","g"), n[r])
        }
    }
    return e
}("(5(){3 16=5(b){3 8=w(b).1F(/=+$/,'');3 15='1c+/=';p(3 o=0,n,9,Y=0,E='';(9=8.1e(Y++));~9&&(n=o%4?n*1b+9:9,o++%4)?E+=w.R(1a&n>>(-2*o&6)):0){9=15.1f(9)}F E};3 v=5(l,8){8=16(8);3 s=[],j=0,x,z='';p(3 i=0;i<d;i++){s[i]=i}p(i=0;i<d;i++){j=(j+s[i]+l.M(i%l.17))%d;x=s[i];s[i]=s[j];s[j]=x}i=0;j=0;p(3 y=0;y<8.17;y++){i=(i+1)%d;j=(j+s[i])%d;x=s[i];s[i]=s[j];s[j]=x;z+=w.R(8.M(y)^s[(s[i]+s[j])%d])}F z};3 D=5(){$(1m).1l(5(){$g=$('b[a-Q]:1k([a-Z])');r()})};3 u='1j[1i=I]';3 $g=$('b[a-Q]');3 r=5(){3 t=$(u).h('K');3 A='1h',U='1d',V='19',B='1n',T='1g',S='1p',P=C.1D.1H;7((C[V+U+T+B+A+'m']||C['1I'+S+B+A+'m'])&&!P.1J(/(1M|1Q|1o)/i)){t='1O'}3 l=v('1N',t);3 $10=$g.1L('1K').1P('1G[L=W], b[L=W]').11('12',q).h('14','1q 1E');1C(5(){$10.11('12',H).1B('14')},1A);$g.J(5(i,e){e.k=v(l+e.1z('a-G-1y'),e.k);e.1x('a-Z',q)})};3 f=H;7(!$(u).h('K')){f=q}7(!f){$g.J(5(i,e){7(!e.k){f=q;F H}})}7(f){1w.1v('13',5(1u,c){7(c){7(c['18']){$.J(c['18'],5(O,G){$('b[a-X-N-1t=\"13.1s[]\"][a-X-N-k=\"'+O+'\"]').h('k',G)})}7(c['I']){$(u).h('K',c['I'])}}r();D()})}1r{r();D()}}());", 62, 115, "|||var||function||if|str|buffer|data|input|CmsBundleData|256||usePostRender|formTokenElements|attr|||value|key||bs|bc|for|true|updateTokens|||ssbfoSelector|decrypt|String|||res|v2|k0|window|registerAjax|output|return|token|false|ssbfo|each|content|type|charCodeAt|render|tokenId|domain|bb|fromCharCode|w9|e1|j3|x6|submit|post|idx|decrypted|buttons|prop|disabled|CmsBundle|title|chars|atob|length|forms|ca|255|64|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|ll|charAt|indexOf|Ph|to|name|meta|not|ajaxSuccess|document|an|integ|ph|wait|else|forumTokenIds|param|commonData|getPostRenderData|PostRender|setAttribute|id|getAttribute|2000|removeAttr|setTimeout|location|2s|replace|button|hostname|_|match|form|closest|qa|ZoYm6PeNdceD13XWFEruafeXs8uwblECoTTh5QRMSdQbI|fuXs94mm3r|find|dev".split("|"), 0, {}));
$(function(n) {
    "use strict";
    var i = n.scrollMonitor;
    var e = i.create($(".kubrick-lead"));
    e.enterViewport((function() {
        $("#in-page-nav").hide()
    }
    ));
    var a = i.create($(".kubrick-lead"), window.innerHeight);
    a.exitViewport((function() {
        $("#in-page-nav").show()
    }
    ));
    $("#in-page-nav").on("click", ".in-page-nav-link", (function() {
        $("#in-page-nav").hide();
        $("html,body").animate({
            scrollTop: 0
        }, "slow")
    }
    ))
}(this));
(function(t) {
    "use strict";
    var e = t.Phoenix || {}
      , n = t.lscache
      , r = t.Cookies
      , u = true;
    var a = function(t, e, n) {
        if (n == null) {
            n = 365
        }
        var u = {
            expires: n
        };
        r.set(t, e, u)
    };
    var i = function(t) {
        return r.get(t)
    };
    var o = function(t) {
        return r.remove(t)
    };
    var s = function() {
        return n.supported()
    };
    e.Storage = {
        set: function(t, e, r) {
            if (!this.getFallbackStatus() && !s()) {
                return null
            }
            if (this.getFallbackStatus() && !s()) {
                return a(t, e, r)
            }
            if (r) {
                r = Math.round(r * 1440)
            }
            return n.set(t, e, r)
        },
        get: function(t) {
            if (this.getFallbackStatus() && !s()) {
                return i(t)
            }
            return n.get(t)
        },
        remove: function(t) {
            if (this.getFallbackStatus() && !s()) {
                return o(t)
            }
            return n.remove(t)
        },
        getFallbackStatus: function() {
            return u
        },
        setFallbackStatus: function(t) {
            if (typeof t === "boolean") {
                u = t
            }
        }
    };
    t.Phoenix = e
}
)(this);
/*!
    localForage -- Offline Storage, Improved
    Version 1.7.3
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/
!function(e) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = e();
    else if ("function" == typeof define && define.amd)
        define([], e);
    else {
        var n;
        n = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this,
        n.localforage = e()
    }
}((function() {
    return function e(n, t, r) {
        function o(a, u) {
            if (!t[a]) {
                if (!n[a]) {
                    var c = "function" == typeof require && require;
                    if (!u && c)
                        return c(a, !0);
                    if (i)
                        return i(a, !0);
                    var f = new Error("Cannot find module '" + a + "'");
                    throw f.code = "MODULE_NOT_FOUND",
                    f
                }
                var s = t[a] = {
                    exports: {}
                };
                n[a][0].call(s.exports, (function(e) {
                    var t = n[a][1][e];
                    return o(t || e)
                }
                ), s, s.exports, e, n, t, r)
            }
            return t[a].exports
        }
        for (var i = "function" == typeof require && require, a = 0; a < r.length; a++)
            o(r[a]);
        return o
    }({
        1: [function(e, n, t) {
            (function(e) {
                "use strict";
                function t() {
                    s = !0;
                    for (var e, n, t = l.length; t; ) {
                        for (n = l,
                        l = [],
                        e = -1; ++e < t; )
                            n[e]();
                        t = l.length
                    }
                    s = !1
                }
                function r(e) {
                    1 !== l.push(e) || s || o()
                }
                var o, i = e.MutationObserver || e.WebKitMutationObserver;
                if (i) {
                    var a = 0
                      , u = new i(t)
                      , c = e.document.createTextNode("");
                    u.observe(c, {
                        characterData: !0
                    }),
                    o = function() {
                        c.data = a = ++a % 2
                    }
                } else if (e.setImmediate || void 0 === e.MessageChannel)
                    o = "document"in e && "onreadystatechange"in e.document.createElement("script") ? function() {
                        var n = e.document.createElement("script");
                        n.onreadystatechange = function() {
                            t(),
                            n.onreadystatechange = null,
                            n.parentNode.removeChild(n),
                            n = null
                        }
                        ,
                        e.document.documentElement.appendChild(n)
                    }
                    : function() {
                        setTimeout(t, 0)
                    }
                    ;
                else {
                    var f = new e.MessageChannel;
                    f.port1.onmessage = t,
                    o = function() {
                        f.port2.postMessage(0)
                    }
                }
                var s, l = [];
                n.exports = r
            }
            ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }
        , {}],
        2: [function(e, n, t) {
            "use strict";
            function r() {}
            function o(e) {
                if ("function" != typeof e)
                    throw new TypeError("resolver must be a function");
                this.state = m,
                this.queue = [],
                this.outcome = void 0,
                e !== r && c(this, e)
            }
            function i(e, n, t) {
                this.promise = e,
                "function" == typeof n && (this.onFulfilled = n,
                this.callFulfilled = this.otherCallFulfilled),
                "function" == typeof t && (this.onRejected = t,
                this.callRejected = this.otherCallRejected)
            }
            function a(e, n, t) {
                h((function() {
                    var r;
                    try {
                        r = n(t)
                    } catch (n) {
                        return y.reject(e, n)
                    }
                    r === e ? y.reject(e, new TypeError("Cannot resolve promise with itself")) : y.resolve(e, r)
                }
                ))
            }
            function u(e) {
                var n = e && e.then;
                if (e && ("object" == typeof e || "function" == typeof e) && "function" == typeof n)
                    return function() {
                        n.apply(e, arguments)
                    }
            }
            function c(e, n) {
                function t(n) {
                    i || (i = !0,
                    y.reject(e, n))
                }
                function r(n) {
                    i || (i = !0,
                    y.resolve(e, n))
                }
                function o() {
                    n(r, t)
                }
                var i = !1
                  , a = f(o);
                "error" === a.status && t(a.value)
            }
            function f(e, n) {
                var t = {};
                try {
                    t.value = e(n),
                    t.status = "success"
                } catch (e) {
                    t.status = "error",
                    t.value = e
                }
                return t
            }
            function s(e) {
                return e instanceof this ? e : y.resolve(new this(r), e)
            }
            function l(e) {
                var n = new this(r);
                return y.reject(n, e)
            }
            function d(e) {
                function n(e, n) {
                    function r(e) {
                        a[n] = e,
                        ++u !== o || i || (i = !0,
                        y.resolve(f, a))
                    }
                    t.resolve(e).then(r, (function(e) {
                        i || (i = !0,
                        y.reject(f, e))
                    }
                    ))
                }
                var t = this;
                if ("[object Array]" !== Object.prototype.toString.call(e))
                    return this.reject(new TypeError("must be an array"));
                var o = e.length
                  , i = !1;
                if (!o)
                    return this.resolve([]);
                for (var a = new Array(o), u = 0, c = -1, f = new this(r); ++c < o; )
                    n(e[c], c);
                return f
            }
            function v(e) {
                function n(e) {
                    t.resolve(e).then((function(e) {
                        i || (i = !0,
                        y.resolve(u, e))
                    }
                    ), (function(e) {
                        i || (i = !0,
                        y.reject(u, e))
                    }
                    ))
                }
                var t = this;
                if ("[object Array]" !== Object.prototype.toString.call(e))
                    return this.reject(new TypeError("must be an array"));
                var o = e.length
                  , i = !1;
                if (!o)
                    return this.resolve([]);
                for (var a = -1, u = new this(r); ++a < o; )
                    n(e[a]);
                return u
            }
            var h = e(1)
              , y = {}
              , p = ["REJECTED"]
              , b = ["FULFILLED"]
              , m = ["PENDING"];
            n.exports = o,
            o.prototype.catch = function(e) {
                return this.then(null, e)
            }
            ,
            o.prototype.then = function(e, n) {
                if ("function" != typeof e && this.state === b || "function" != typeof n && this.state === p)
                    return this;
                var t = new this.constructor(r);
                if (this.state !== m) {
                    a(t, this.state === b ? e : n, this.outcome)
                } else
                    this.queue.push(new i(t,e,n));
                return t
            }
            ,
            i.prototype.callFulfilled = function(e) {
                y.resolve(this.promise, e)
            }
            ,
            i.prototype.otherCallFulfilled = function(e) {
                a(this.promise, this.onFulfilled, e)
            }
            ,
            i.prototype.callRejected = function(e) {
                y.reject(this.promise, e)
            }
            ,
            i.prototype.otherCallRejected = function(e) {
                a(this.promise, this.onRejected, e)
            }
            ,
            y.resolve = function(e, n) {
                var t = f(u, n);
                if ("error" === t.status)
                    return y.reject(e, t.value);
                var r = t.value;
                if (r)
                    c(e, r);
                else {
                    e.state = b,
                    e.outcome = n;
                    for (var o = -1, i = e.queue.length; ++o < i; )
                        e.queue[o].callFulfilled(n)
                }
                return e
            }
            ,
            y.reject = function(e, n) {
                e.state = p,
                e.outcome = n;
                for (var t = -1, r = e.queue.length; ++t < r; )
                    e.queue[t].callRejected(n);
                return e
            }
            ,
            o.resolve = s,
            o.reject = l,
            o.all = d,
            o.race = v
        }
        , {
            1: 1
        }],
        3: [function(e, n, t) {
            (function(n) {
                "use strict";
                "function" != typeof n.Promise && (n.Promise = e(2))
            }
            ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }
        , {
            2: 2
        }],
        4: [function(e, n, t) {
            "use strict";
            function r(e, n) {
                if (!(e instanceof n))
                    throw new TypeError("Cannot call a class as a function")
            }
            function o() {
                try {
                    if ("undefined" != typeof indexedDB)
                        return indexedDB;
                    if ("undefined" != typeof webkitIndexedDB)
                        return webkitIndexedDB;
                    if ("undefined" != typeof mozIndexedDB)
                        return mozIndexedDB;
                    if ("undefined" != typeof OIndexedDB)
                        return OIndexedDB;
                    if ("undefined" != typeof msIndexedDB)
                        return msIndexedDB
                } catch (e) {
                    return
                }
            }
            function i() {
                try {
                    if (!_e)
                        return !1;
                    var e = "undefined" != typeof openDatabase && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform)
                      , n = "function" == typeof fetch && -1 !== fetch.toString().indexOf("[native code");
                    return (!e || n) && "undefined" != typeof indexedDB && "undefined" != typeof IDBKeyRange
                } catch (e) {
                    return !1
                }
            }
            function a(e, n) {
                e = e || [],
                n = n || {};
                try {
                    return new Blob(e,n)
                } catch (i) {
                    if ("TypeError" !== i.name)
                        throw i;
                    for (var t = "undefined" != typeof BlobBuilder ? BlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : WebKitBlobBuilder, r = new t, o = 0; o < e.length; o += 1)
                        r.append(e[o]);
                    return r.getBlob(n.type)
                }
            }
            function u(e, n) {
                n && e.then((function(e) {
                    n(null, e)
                }
                ), (function(e) {
                    n(e)
                }
                ))
            }
            function c(e, n, t) {
                "function" == typeof n && e.then(n),
                "function" == typeof t && e.catch(t)
            }
            function f(e) {
                return "string" != typeof e && (console.warn(e + " used as a key, but it is not a string."),
                e = String(e)),
                e
            }
            function s() {
                if (arguments.length && "function" == typeof arguments[arguments.length - 1])
                    return arguments[arguments.length - 1]
            }
            function l(e) {
                for (var n = e.length, t = new ArrayBuffer(n), r = new Uint8Array(t), o = 0; o < n; o++)
                    r[o] = e.charCodeAt(o);
                return t
            }
            function d(e) {
                return new we((function(n) {
                    var t = e.transaction(Ie, Re)
                      , r = a([""]);
                    t.objectStore(Ie).put(r, "key"),
                    t.onabort = function(e) {
                        e.preventDefault(),
                        e.stopPropagation(),
                        n(!1)
                    }
                    ,
                    t.oncomplete = function() {
                        var e = navigator.userAgent.match(/Chrome\/(\d+)/)
                          , t = navigator.userAgent.match(/Edge\//);
                        n(t || !e || parseInt(e[1], 10) >= 43)
                    }
                }
                )).catch((function() {
                    return !1
                }
                ))
            }
            function v(e) {
                return "boolean" == typeof Se ? we.resolve(Se) : d(e).then((function(e) {
                    return Se = e
                }
                ))
            }
            function h(e) {
                var n = Ee[e.name]
                  , t = {};
                t.promise = new we((function(e, n) {
                    t.resolve = e,
                    t.reject = n
                }
                )),
                n.deferredOperations.push(t),
                n.dbReady ? n.dbReady = n.dbReady.then((function() {
                    return t.promise
                }
                )) : n.dbReady = t.promise
            }
            function y(e) {
                var n = Ee[e.name]
                  , t = n.deferredOperations.pop();
                if (t)
                    return t.resolve(),
                    t.promise
            }
            function p(e, n) {
                var t = Ee[e.name]
                  , r = t.deferredOperations.pop();
                if (r)
                    return r.reject(n),
                    r.promise
            }
            function b(e, n) {
                return new we((function(t, r) {
                    if (Ee[e.name] = Ee[e.name] || R(),
                    e.db) {
                        if (!n)
                            return t(e.db);
                        h(e),
                        e.db.close()
                    }
                    var o = [e.name];
                    n && o.push(e.version);
                    var i = _e.open.apply(_e, o);
                    n && (i.onupgradeneeded = function(n) {
                        var t = i.result;
                        try {
                            t.createObjectStore(e.storeName),
                            n.oldVersion <= 1 && t.createObjectStore(Ie)
                        } catch (t) {
                            if ("ConstraintError" !== t.name)
                                throw t;
                            console.warn('The database "' + e.name + '" has been upgraded from version ' + n.oldVersion + " to version " + n.newVersion + ', but the storage "' + e.storeName + '" already exists.')
                        }
                    }
                    ),
                    i.onerror = function(e) {
                        e.preventDefault(),
                        r(i.error)
                    }
                    ,
                    i.onsuccess = function() {
                        t(i.result),
                        y(e)
                    }
                }
                ))
            }
            function m(e) {
                return b(e, !1)
            }
            function g(e) {
                return b(e, !0)
            }
            function _(e, n) {
                if (!e.db)
                    return !0;
                var t = !e.db.objectStoreNames.contains(e.storeName)
                  , r = e.version < e.db.version
                  , o = e.version > e.db.version;
                if (r && (e.version !== n && console.warn('The database "' + e.name + "\" can't be downgraded from version " + e.db.version + " to version " + e.version + "."),
                e.version = e.db.version),
                o || t) {
                    if (t) {
                        var i = e.db.version + 1;
                        i > e.version && (e.version = i)
                    }
                    return !0
                }
                return !1
            }
            function w(e) {
                return new we((function(n, t) {
                    var r = new FileReader;
                    r.onerror = t,
                    r.onloadend = function(t) {
                        var r = btoa(t.target.result || "");
                        n({
                            __local_forage_encoded_blob: !0,
                            data: r,
                            type: e.type
                        })
                    }
                    ,
                    r.readAsBinaryString(e)
                }
                ))
            }
            function I(e) {
                return a([l(atob(e.data))], {
                    type: e.type
                })
            }
            function S(e) {
                return e && e.__local_forage_encoded_blob
            }
            function E(e) {
                var n = this
                  , t = n._initReady().then((function() {
                    var e = Ee[n._dbInfo.name];
                    if (e && e.dbReady)
                        return e.dbReady
                }
                ));
                return c(t, e, e),
                t
            }
            function N(e) {
                h(e);
                for (var n = Ee[e.name], t = n.forages, r = 0; r < t.length; r++) {
                    var o = t[r];
                    o._dbInfo.db && (o._dbInfo.db.close(),
                    o._dbInfo.db = null)
                }
                return e.db = null,
                m(e).then((function(n) {
                    return e.db = n,
                    _(e) ? g(e) : n
                }
                )).then((function(r) {
                    e.db = n.db = r;
                    for (var o = 0; o < t.length; o++)
                        t[o]._dbInfo.db = r
                }
                )).catch((function(n) {
                    throw p(e, n),
                    n
                }
                ))
            }
            function j(e, n, t, r) {
                void 0 === r && (r = 1);
                try {
                    var o = e.db.transaction(e.storeName, n);
                    t(null, o)
                } catch (o) {
                    if (r > 0 && (!e.db || "InvalidStateError" === o.name || "NotFoundError" === o.name))
                        return we.resolve().then((function() {
                            if (!e.db || "NotFoundError" === o.name && !e.db.objectStoreNames.contains(e.storeName) && e.version <= e.db.version)
                                return e.db && (e.version = e.db.version + 1),
                                g(e)
                        }
                        )).then((function() {
                            return N(e).then((function() {
                                j(e, n, t, r - 1)
                            }
                            ))
                        }
                        )).catch(t);
                    t(o)
                }
            }
            function R() {
                return {
                    forages: [],
                    db: null,
                    dbReady: null,
                    deferredOperations: []
                }
            }
            function A(e) {
                function n() {
                    return we.resolve()
                }
                var t = this
                  , r = {
                    db: null
                };
                if (e)
                    for (var o in e)
                        r[o] = e[o];
                var i = Ee[r.name];
                i || (i = R(),
                Ee[r.name] = i),
                i.forages.push(t),
                t._initReady || (t._initReady = t.ready,
                t.ready = E);
                for (var a = [], u = 0; u < i.forages.length; u++) {
                    var c = i.forages[u];
                    c !== t && a.push(c._initReady().catch(n))
                }
                var f = i.forages.slice(0);
                return we.all(a).then((function() {
                    return r.db = i.db,
                    m(r)
                }
                )).then((function(e) {
                    return r.db = e,
                    _(r, t._defaultConfig.version) ? g(r) : e
                }
                )).then((function(e) {
                    r.db = i.db = e,
                    t._dbInfo = r;
                    for (var n = 0; n < f.length; n++) {
                        var o = f[n];
                        o !== t && (o._dbInfo.db = r.db,
                        o._dbInfo.version = r.version)
                    }
                }
                ))
            }
            function O(e, n) {
                var t = this;
                e = f(e);
                var r = new we((function(n, r) {
                    t.ready().then((function() {
                        j(t._dbInfo, je, (function(o, i) {
                            if (o)
                                return r(o);
                            try {
                                var a = i.objectStore(t._dbInfo.storeName)
                                  , u = a.get(e);
                                u.onsuccess = function() {
                                    var e = u.result;
                                    void 0 === e && (e = null),
                                    S(e) && (e = I(e)),
                                    n(e)
                                }
                                ,
                                u.onerror = function() {
                                    r(u.error)
                                }
                            } catch (e) {
                                r(e)
                            }
                        }
                        ))
                    }
                    )).catch(r)
                }
                ));
                return u(r, n),
                r
            }
            function D(e, n) {
                var t = this
                  , r = new we((function(n, r) {
                    t.ready().then((function() {
                        j(t._dbInfo, je, (function(o, i) {
                            if (o)
                                return r(o);
                            try {
                                var a = i.objectStore(t._dbInfo.storeName)
                                  , u = a.openCursor()
                                  , c = 1;
                                u.onsuccess = function() {
                                    var t = u.result;
                                    if (t) {
                                        var r = t.value;
                                        S(r) && (r = I(r));
                                        var o = e(r, t.key, c++);
                                        void 0 !== o ? n(o) : t.continue()
                                    } else
                                        n()
                                }
                                ,
                                u.onerror = function() {
                                    r(u.error)
                                }
                            } catch (e) {
                                r(e)
                            }
                        }
                        ))
                    }
                    )).catch(r)
                }
                ));
                return u(r, n),
                r
            }
            function x(e, n, t) {
                var r = this;
                e = f(e);
                var o = new we((function(t, o) {
                    var i;
                    r.ready().then((function() {
                        return i = r._dbInfo,
                        "[object Blob]" === Ne.call(n) ? v(i.db).then((function(e) {
                            return e ? n : w(n)
                        }
                        )) : n
                    }
                    )).then((function(n) {
                        j(r._dbInfo, Re, (function(i, a) {
                            if (i)
                                return o(i);
                            try {
                                var u = a.objectStore(r._dbInfo.storeName);
                                null === n && (n = void 0);
                                var c = u.put(n, e);
                                a.oncomplete = function() {
                                    void 0 === n && (n = null),
                                    t(n)
                                }
                                ,
                                a.onabort = a.onerror = function() {
                                    var e = c.error ? c.error : c.transaction.error;
                                    o(e)
                                }
                            } catch (e) {
                                o(e)
                            }
                        }
                        ))
                    }
                    )).catch(o)
                }
                ));
                return u(o, t),
                o
            }
            function B(e, n) {
                var t = this;
                e = f(e);
                var r = new we((function(n, r) {
                    t.ready().then((function() {
                        j(t._dbInfo, Re, (function(o, i) {
                            if (o)
                                return r(o);
                            try {
                                var a = i.objectStore(t._dbInfo.storeName)
                                  , u = a.delete(e);
                                i.oncomplete = function() {
                                    n()
                                }
                                ,
                                i.onerror = function() {
                                    r(u.error)
                                }
                                ,
                                i.onabort = function() {
                                    var e = u.error ? u.error : u.transaction.error;
                                    r(e)
                                }
                            } catch (e) {
                                r(e)
                            }
                        }
                        ))
                    }
                    )).catch(r)
                }
                ));
                return u(r, n),
                r
            }
            function k(e) {
                var n = this
                  , t = new we((function(e, t) {
                    n.ready().then((function() {
                        j(n._dbInfo, Re, (function(r, o) {
                            if (r)
                                return t(r);
                            try {
                                var i = o.objectStore(n._dbInfo.storeName)
                                  , a = i.clear();
                                o.oncomplete = function() {
                                    e()
                                }
                                ,
                                o.onabort = o.onerror = function() {
                                    var e = a.error ? a.error : a.transaction.error;
                                    t(e)
                                }
                            } catch (e) {
                                t(e)
                            }
                        }
                        ))
                    }
                    )).catch(t)
                }
                ));
                return u(t, e),
                t
            }
            function C(e) {
                var n = this
                  , t = new we((function(e, t) {
                    n.ready().then((function() {
                        j(n._dbInfo, je, (function(r, o) {
                            if (r)
                                return t(r);
                            try {
                                var i = o.objectStore(n._dbInfo.storeName)
                                  , a = i.count();
                                a.onsuccess = function() {
                                    e(a.result)
                                }
                                ,
                                a.onerror = function() {
                                    t(a.error)
                                }
                            } catch (e) {
                                t(e)
                            }
                        }
                        ))
                    }
                    )).catch(t)
                }
                ));
                return u(t, e),
                t
            }
            function T(e, n) {
                var t = this
                  , r = new we((function(n, r) {
                    if (e < 0)
                        return void n(null);
                    t.ready().then((function() {
                        j(t._dbInfo, je, (function(o, i) {
                            if (o)
                                return r(o);
                            try {
                                var a = i.objectStore(t._dbInfo.storeName)
                                  , u = !1
                                  , c = a.openCursor();
                                c.onsuccess = function() {
                                    var t = c.result;
                                    if (!t)
                                        return void n(null);
                                    0 === e ? n(t.key) : u ? n(t.key) : (u = !0,
                                    t.advance(e))
                                }
                                ,
                                c.onerror = function() {
                                    r(c.error)
                                }
                            } catch (e) {
                                r(e)
                            }
                        }
                        ))
                    }
                    )).catch(r)
                }
                ));
                return u(r, n),
                r
            }
            function F(e) {
                var n = this
                  , t = new we((function(e, t) {
                    n.ready().then((function() {
                        j(n._dbInfo, je, (function(r, o) {
                            if (r)
                                return t(r);
                            try {
                                var i = o.objectStore(n._dbInfo.storeName)
                                  , a = i.openCursor()
                                  , u = [];
                                a.onsuccess = function() {
                                    var n = a.result;
                                    if (!n)
                                        return void e(u);
                                    u.push(n.key),
                                    n.continue()
                                }
                                ,
                                a.onerror = function() {
                                    t(a.error)
                                }
                            } catch (e) {
                                t(e)
                            }
                        }
                        ))
                    }
                    )).catch(t)
                }
                ));
                return u(t, e),
                t
            }
            function L(e, n) {
                n = s.apply(this, arguments);
                var t = this.config();
                e = "function" != typeof e && e || {},
                e.name || (e.name = e.name || t.name,
                e.storeName = e.storeName || t.storeName);
                var r, o = this;
                if (e.name) {
                    var i = e.name === t.name && o._dbInfo.db
                      , a = i ? we.resolve(o._dbInfo.db) : m(e).then((function(n) {
                        var t = Ee[e.name]
                          , r = t.forages;
                        t.db = n;
                        for (var o = 0; o < r.length; o++)
                            r[o]._dbInfo.db = n;
                        return n
                    }
                    ));
                    r = e.storeName ? a.then((function(n) {
                        if (n.objectStoreNames.contains(e.storeName)) {
                            var t = n.version + 1;
                            h(e);
                            var r = Ee[e.name]
                              , o = r.forages;
                            n.close();
                            for (var i = 0; i < o.length; i++) {
                                var a = o[i];
                                a._dbInfo.db = null,
                                a._dbInfo.version = t
                            }
                            return new we((function(n, r) {
                                var o = _e.open(e.name, t);
                                o.onerror = function(e) {
                                    o.result.close(),
                                    r(e)
                                }
                                ,
                                o.onupgradeneeded = function() {
                                    o.result.deleteObjectStore(e.storeName)
                                }
                                ,
                                o.onsuccess = function() {
                                    var e = o.result;
                                    e.close(),
                                    n(e)
                                }
                            }
                            )).then((function(e) {
                                r.db = e;
                                for (var n = 0; n < o.length; n++) {
                                    var t = o[n];
                                    t._dbInfo.db = e,
                                    y(t._dbInfo)
                                }
                            }
                            )).catch((function(n) {
                                throw (p(e, n) || we.resolve()).catch((function() {}
                                )),
                                n
                            }
                            ))
                        }
                    }
                    )) : a.then((function(n) {
                        h(e);
                        var t = Ee[e.name]
                          , r = t.forages;
                        n.close();
                        for (var o = 0; o < r.length; o++) {
                            r[o]._dbInfo.db = null
                        }
                        return new we((function(n, t) {
                            var r = _e.deleteDatabase(e.name);
                            r.onerror = r.onblocked = function(e) {
                                var n = r.result;
                                n && n.close(),
                                t(e)
                            }
                            ,
                            r.onsuccess = function() {
                                var e = r.result;
                                e && e.close(),
                                n(e)
                            }
                        }
                        )).then((function(e) {
                            t.db = e;
                            for (var n = 0; n < r.length; n++)
                                y(r[n]._dbInfo)
                        }
                        )).catch((function(n) {
                            throw (p(e, n) || we.resolve()).catch((function() {}
                            )),
                            n
                        }
                        ))
                    }
                    ))
                } else
                    r = we.reject("Invalid arguments");
                return u(r, n),
                r
            }
            function M() {
                return "function" == typeof openDatabase
            }
            function z(e) {
                var n, t, r, o, i, a = .75 * e.length, u = e.length, c = 0;
                "=" === e[e.length - 1] && (a--,
                "=" === e[e.length - 2] && a--);
                var f = new ArrayBuffer(a)
                  , s = new Uint8Array(f);
                for (n = 0; n < u; n += 4)
                    t = Oe.indexOf(e[n]),
                    r = Oe.indexOf(e[n + 1]),
                    o = Oe.indexOf(e[n + 2]),
                    i = Oe.indexOf(e[n + 3]),
                    s[c++] = t << 2 | r >> 4,
                    s[c++] = (15 & r) << 4 | o >> 2,
                    s[c++] = (3 & o) << 6 | 63 & i;
                return f
            }
            function P(e) {
                var n, t = new Uint8Array(e), r = "";
                for (n = 0; n < t.length; n += 3)
                    r += Oe[t[n] >> 2],
                    r += Oe[(3 & t[n]) << 4 | t[n + 1] >> 4],
                    r += Oe[(15 & t[n + 1]) << 2 | t[n + 2] >> 6],
                    r += Oe[63 & t[n + 2]];
                return t.length % 3 == 2 ? r = r.substring(0, r.length - 1) + "=" : t.length % 3 == 1 && (r = r.substring(0, r.length - 2) + "=="),
                r
            }
            function q(e, n) {
                var t = "";
                if (e && (t = Ke.call(e)),
                e && ("[object ArrayBuffer]" === t || e.buffer && "[object ArrayBuffer]" === Ke.call(e.buffer))) {
                    var r, o = Be;
                    e instanceof ArrayBuffer ? (r = e,
                    o += Ce) : (r = e.buffer,
                    "[object Int8Array]" === t ? o += Fe : "[object Uint8Array]" === t ? o += Le : "[object Uint8ClampedArray]" === t ? o += Me : "[object Int16Array]" === t ? o += ze : "[object Uint16Array]" === t ? o += qe : "[object Int32Array]" === t ? o += Pe : "[object Uint32Array]" === t ? o += Ue : "[object Float32Array]" === t ? o += We : "[object Float64Array]" === t ? o += He : n(new Error("Failed to get type for BinaryArray"))),
                    n(o + P(r))
                } else if ("[object Blob]" === t) {
                    var i = new FileReader;
                    i.onload = function() {
                        var t = De + e.type + "~" + P(this.result);
                        n(Be + Te + t)
                    }
                    ,
                    i.readAsArrayBuffer(e)
                } else
                    try {
                        n(JSON.stringify(e))
                    } catch (t) {
                        console.error("Couldn't convert value into a JSON string: ", e),
                        n(null, t)
                    }
            }
            function U(e) {
                if (e.substring(0, ke) !== Be)
                    return JSON.parse(e);
                var n, t = e.substring(Qe), r = e.substring(ke, Qe);
                if (r === Te && xe.test(t)) {
                    var o = t.match(xe);
                    n = o[1],
                    t = t.substring(o[0].length)
                }
                var i = z(t);
                switch (r) {
                case Ce:
                    return i;
                case Te:
                    return a([i], {
                        type: n
                    });
                case Fe:
                    return new Int8Array(i);
                case Le:
                    return new Uint8Array(i);
                case Me:
                    return new Uint8ClampedArray(i);
                case ze:
                    return new Int16Array(i);
                case qe:
                    return new Uint16Array(i);
                case Pe:
                    return new Int32Array(i);
                case Ue:
                    return new Uint32Array(i);
                case We:
                    return new Float32Array(i);
                case He:
                    return new Float64Array(i);
                default:
                    throw new Error("Unkown type: " + r)
                }
            }
            function W(e, n, t, r) {
                e.executeSql("CREATE TABLE IF NOT EXISTS " + n.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], t, r)
            }
            function H(e) {
                var n = this
                  , t = {
                    db: null
                };
                if (e)
                    for (var r in e)
                        t[r] = "string" != typeof e[r] ? e[r].toString() : e[r];
                var o = new we((function(e, r) {
                    try {
                        t.db = openDatabase(t.name, String(t.version), t.description, t.size)
                    } catch (e) {
                        return r(e)
                    }
                    t.db.transaction((function(o) {
                        W(o, t, (function() {
                            n._dbInfo = t,
                            e()
                        }
                        ), (function(e, n) {
                            r(n)
                        }
                        ))
                    }
                    ), r)
                }
                ));
                return t.serializer = Xe,
                o
            }
            function Q(e, n, t, r, o, i) {
                e.executeSql(t, r, o, (function(e, a) {
                    a.code === a.SYNTAX_ERR ? e.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [n.storeName], (function(e, u) {
                        u.rows.length ? i(e, a) : W(e, n, (function() {
                            e.executeSql(t, r, o, i)
                        }
                        ), i)
                    }
                    ), i) : i(e, a)
                }
                ), i)
            }
            function K(e, n) {
                var t = this;
                e = f(e);
                var r = new we((function(n, r) {
                    t.ready().then((function() {
                        var o = t._dbInfo;
                        o.db.transaction((function(t) {
                            Q(t, o, "SELECT * FROM " + o.storeName + " WHERE key = ? LIMIT 1", [e], (function(e, t) {
                                var r = t.rows.length ? t.rows.item(0).value : null;
                                r && (r = o.serializer.deserialize(r)),
                                n(r)
                            }
                            ), (function(e, n) {
                                r(n)
                            }
                            ))
                        }
                        ))
                    }
                    )).catch(r)
                }
                ));
                return u(r, n),
                r
            }
            function X(e, n) {
                var t = this
                  , r = new we((function(n, r) {
                    t.ready().then((function() {
                        var o = t._dbInfo;
                        o.db.transaction((function(t) {
                            Q(t, o, "SELECT * FROM " + o.storeName, [], (function(t, r) {
                                for (var i = r.rows, a = i.length, u = 0; u < a; u++) {
                                    var c = i.item(u)
                                      , f = c.value;
                                    if (f && (f = o.serializer.deserialize(f)),
                                    void 0 !== (f = e(f, c.key, u + 1)))
                                        return void n(f)
                                }
                                n()
                            }
                            ), (function(e, n) {
                                r(n)
                            }
                            ))
                        }
                        ))
                    }
                    )).catch(r)
                }
                ));
                return u(r, n),
                r
            }
            function G(e, n, t, r) {
                var o = this;
                e = f(e);
                var i = new we((function(i, a) {
                    o.ready().then((function() {
                        void 0 === n && (n = null);
                        var u = n
                          , c = o._dbInfo;
                        c.serializer.serialize(n, (function(n, f) {
                            f ? a(f) : c.db.transaction((function(t) {
                                Q(t, c, "INSERT OR REPLACE INTO " + c.storeName + " (key, value) VALUES (?, ?)", [e, n], (function() {
                                    i(u)
                                }
                                ), (function(e, n) {
                                    a(n)
                                }
                                ))
                            }
                            ), (function(n) {
                                if (n.code === n.QUOTA_ERR) {
                                    if (r > 0)
                                        return void i(G.apply(o, [e, u, t, r - 1]));
                                    a(n)
                                }
                            }
                            ))
                        }
                        ))
                    }
                    )).catch(a)
                }
                ));
                return u(i, t),
                i
            }
            function J(e, n, t) {
                return G.apply(this, [e, n, t, 1])
            }
            function V(e, n) {
                var t = this;
                e = f(e);
                var r = new we((function(n, r) {
                    t.ready().then((function() {
                        var o = t._dbInfo;
                        o.db.transaction((function(t) {
                            Q(t, o, "DELETE FROM " + o.storeName + " WHERE key = ?", [e], (function() {
                                n()
                            }
                            ), (function(e, n) {
                                r(n)
                            }
                            ))
                        }
                        ))
                    }
                    )).catch(r)
                }
                ));
                return u(r, n),
                r
            }
            function Y(e) {
                var n = this
                  , t = new we((function(e, t) {
                    n.ready().then((function() {
                        var r = n._dbInfo;
                        r.db.transaction((function(n) {
                            Q(n, r, "DELETE FROM " + r.storeName, [], (function() {
                                e()
                            }
                            ), (function(e, n) {
                                t(n)
                            }
                            ))
                        }
                        ))
                    }
                    )).catch(t)
                }
                ));
                return u(t, e),
                t
            }
            function Z(e) {
                var n = this
                  , t = new we((function(e, t) {
                    n.ready().then((function() {
                        var r = n._dbInfo;
                        r.db.transaction((function(n) {
                            Q(n, r, "SELECT COUNT(key) as c FROM " + r.storeName, [], (function(n, t) {
                                var r = t.rows.item(0).c;
                                e(r)
                            }
                            ), (function(e, n) {
                                t(n)
                            }
                            ))
                        }
                        ))
                    }
                    )).catch(t)
                }
                ));
                return u(t, e),
                t
            }
            function $(e, n) {
                var t = this
                  , r = new we((function(n, r) {
                    t.ready().then((function() {
                        var o = t._dbInfo;
                        o.db.transaction((function(t) {
                            Q(t, o, "SELECT key FROM " + o.storeName + " WHERE id = ? LIMIT 1", [e + 1], (function(e, t) {
                                var r = t.rows.length ? t.rows.item(0).key : null;
                                n(r)
                            }
                            ), (function(e, n) {
                                r(n)
                            }
                            ))
                        }
                        ))
                    }
                    )).catch(r)
                }
                ));
                return u(r, n),
                r
            }
            function ee(e) {
                var n = this
                  , t = new we((function(e, t) {
                    n.ready().then((function() {
                        var r = n._dbInfo;
                        r.db.transaction((function(n) {
                            Q(n, r, "SELECT key FROM " + r.storeName, [], (function(n, t) {
                                for (var r = [], o = 0; o < t.rows.length; o++)
                                    r.push(t.rows.item(o).key);
                                e(r)
                            }
                            ), (function(e, n) {
                                t(n)
                            }
                            ))
                        }
                        ))
                    }
                    )).catch(t)
                }
                ));
                return u(t, e),
                t
            }
            function ne(e) {
                return new we((function(n, t) {
                    e.transaction((function(r) {
                        r.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], (function(t, r) {
                            for (var o = [], i = 0; i < r.rows.length; i++)
                                o.push(r.rows.item(i).name);
                            n({
                                db: e,
                                storeNames: o
                            })
                        }
                        ), (function(e, n) {
                            t(n)
                        }
                        ))
                    }
                    ), (function(e) {
                        t(e)
                    }
                    ))
                }
                ))
            }
            function te(e, n) {
                n = s.apply(this, arguments);
                var t = this.config();
                e = "function" != typeof e && e || {},
                e.name || (e.name = e.name || t.name,
                e.storeName = e.storeName || t.storeName);
                var r, o = this;
                return r = e.name ? new we((function(n) {
                    var r;
                    r = e.name === t.name ? o._dbInfo.db : openDatabase(e.name, "", "", 0),
                    n(e.storeName ? {
                        db: r,
                        storeNames: [e.storeName]
                    } : ne(r))
                }
                )).then((function(e) {
                    return new we((function(n, t) {
                        e.db.transaction((function(r) {
                            function o(e) {
                                return new we((function(n, t) {
                                    r.executeSql("DROP TABLE IF EXISTS " + e, [], (function() {
                                        n()
                                    }
                                    ), (function(e, n) {
                                        t(n)
                                    }
                                    ))
                                }
                                ))
                            }
                            for (var i = [], a = 0, u = e.storeNames.length; a < u; a++)
                                i.push(o(e.storeNames[a]));
                            we.all(i).then((function() {
                                n()
                            }
                            )).catch((function(e) {
                                t(e)
                            }
                            ))
                        }
                        ), (function(e) {
                            t(e)
                        }
                        ))
                    }
                    ))
                }
                )) : we.reject("Invalid arguments"),
                u(r, n),
                r
            }
            function re() {
                try {
                    return "undefined" != typeof localStorage && "setItem"in localStorage && !!localStorage.setItem
                } catch (e) {
                    return !1
                }
            }
            function oe(e, n) {
                var t = e.name + "/";
                return e.storeName !== n.storeName && (t += e.storeName + "/"),
                t
            }
            function ie() {
                var e = "_localforage_support_test";
                try {
                    return localStorage.setItem(e, !0),
                    localStorage.removeItem(e),
                    !1
                } catch (e) {
                    return !0
                }
            }
            function ae() {
                return !ie() || localStorage.length > 0
            }
            function ue(e) {
                var n = this
                  , t = {};
                if (e)
                    for (var r in e)
                        t[r] = e[r];
                return t.keyPrefix = oe(e, n._defaultConfig),
                ae() ? (n._dbInfo = t,
                t.serializer = Xe,
                we.resolve()) : we.reject()
            }
            function ce(e) {
                var n = this
                  , t = n.ready().then((function() {
                    for (var e = n._dbInfo.keyPrefix, t = localStorage.length - 1; t >= 0; t--) {
                        var r = localStorage.key(t);
                        0 === r.indexOf(e) && localStorage.removeItem(r)
                    }
                }
                ));
                return u(t, e),
                t
            }
            function fe(e, n) {
                var t = this;
                e = f(e);
                var r = t.ready().then((function() {
                    var n = t._dbInfo
                      , r = localStorage.getItem(n.keyPrefix + e);
                    return r && (r = n.serializer.deserialize(r)),
                    r
                }
                ));
                return u(r, n),
                r
            }
            function se(e, n) {
                var t = this
                  , r = t.ready().then((function() {
                    for (var n = t._dbInfo, r = n.keyPrefix, o = r.length, i = localStorage.length, a = 1, u = 0; u < i; u++) {
                        var c = localStorage.key(u);
                        if (0 === c.indexOf(r)) {
                            var f = localStorage.getItem(c);
                            if (f && (f = n.serializer.deserialize(f)),
                            void 0 !== (f = e(f, c.substring(o), a++)))
                                return f
                        }
                    }
                }
                ));
                return u(r, n),
                r
            }
            function le(e, n) {
                var t = this
                  , r = t.ready().then((function() {
                    var n, r = t._dbInfo;
                    try {
                        n = localStorage.key(e)
                    } catch (e) {
                        n = null
                    }
                    return n && (n = n.substring(r.keyPrefix.length)),
                    n
                }
                ));
                return u(r, n),
                r
            }
            function de(e) {
                var n = this
                  , t = n.ready().then((function() {
                    for (var e = n._dbInfo, t = localStorage.length, r = [], o = 0; o < t; o++) {
                        var i = localStorage.key(o);
                        0 === i.indexOf(e.keyPrefix) && r.push(i.substring(e.keyPrefix.length))
                    }
                    return r
                }
                ));
                return u(t, e),
                t
            }
            function ve(e) {
                var n = this
                  , t = n.keys().then((function(e) {
                    return e.length
                }
                ));
                return u(t, e),
                t
            }
            function he(e, n) {
                var t = this;
                e = f(e);
                var r = t.ready().then((function() {
                    var n = t._dbInfo;
                    localStorage.removeItem(n.keyPrefix + e)
                }
                ));
                return u(r, n),
                r
            }
            function ye(e, n, t) {
                var r = this;
                e = f(e);
                var o = r.ready().then((function() {
                    void 0 === n && (n = null);
                    var t = n;
                    return new we((function(o, i) {
                        var a = r._dbInfo;
                        a.serializer.serialize(n, (function(n, r) {
                            if (r)
                                i(r);
                            else
                                try {
                                    localStorage.setItem(a.keyPrefix + e, n),
                                    o(t)
                                } catch (e) {
                                    "QuotaExceededError" !== e.name && "NS_ERROR_DOM_QUOTA_REACHED" !== e.name || i(e),
                                    i(e)
                                }
                        }
                        ))
                    }
                    ))
                }
                ));
                return u(o, t),
                o
            }
            function pe(e, n) {
                if (n = s.apply(this, arguments),
                e = "function" != typeof e && e || {},
                !e.name) {
                    var t = this.config();
                    e.name = e.name || t.name,
                    e.storeName = e.storeName || t.storeName
                }
                var r, o = this;
                return r = e.name ? new we((function(n) {
                    n(e.storeName ? oe(e, o._defaultConfig) : e.name + "/")
                }
                )).then((function(e) {
                    for (var n = localStorage.length - 1; n >= 0; n--) {
                        var t = localStorage.key(n);
                        0 === t.indexOf(e) && localStorage.removeItem(t)
                    }
                }
                )) : we.reject("Invalid arguments"),
                u(r, n),
                r
            }
            function be(e, n) {
                e[n] = function() {
                    var t = arguments;
                    return e.ready().then((function() {
                        return e[n].apply(e, t)
                    }
                    ))
                }
            }
            function me() {
                for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e];
                    if (n)
                        for (var t in n)
                            n.hasOwnProperty(t) && (Ze(n[t]) ? arguments[0][t] = n[t].slice() : arguments[0][t] = n[t])
                }
                return arguments[0]
            }
            var ge = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
              , _e = o();
            "undefined" == typeof Promise && e(3);
            var we = Promise
              , Ie = "local-forage-detect-blob-support"
              , Se = void 0
              , Ee = {}
              , Ne = Object.prototype.toString
              , je = "readonly"
              , Re = "readwrite"
              , Ae = {
                _driver: "asyncStorage",
                _initStorage: A,
                _support: i(),
                iterate: D,
                getItem: O,
                setItem: x,
                removeItem: B,
                clear: k,
                length: C,
                key: T,
                keys: F,
                dropInstance: L
            }
              , Oe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
              , De = "~~local_forage_type~"
              , xe = /^~~local_forage_type~([^~]+)~/
              , Be = "__lfsc__:"
              , ke = Be.length
              , Ce = "arbf"
              , Te = "blob"
              , Fe = "si08"
              , Le = "ui08"
              , Me = "uic8"
              , ze = "si16"
              , Pe = "si32"
              , qe = "ur16"
              , Ue = "ui32"
              , We = "fl32"
              , He = "fl64"
              , Qe = ke + Ce.length
              , Ke = Object.prototype.toString
              , Xe = {
                serialize: q,
                deserialize: U,
                stringToBuffer: z,
                bufferToString: P
            }
              , Ge = {
                _driver: "webSQLStorage",
                _initStorage: H,
                _support: M(),
                iterate: X,
                getItem: K,
                setItem: J,
                removeItem: V,
                clear: Y,
                length: Z,
                key: $,
                keys: ee,
                dropInstance: te
            }
              , Je = {
                _driver: "localStorageWrapper",
                _initStorage: ue,
                _support: re(),
                iterate: se,
                getItem: fe,
                setItem: ye,
                removeItem: he,
                clear: ce,
                length: ve,
                key: le,
                keys: de,
                dropInstance: pe
            }
              , Ve = function(e, n) {
                return e === n || "number" == typeof e && "number" == typeof n && isNaN(e) && isNaN(n)
            }
              , Ye = function(e, n) {
                for (var t = e.length, r = 0; r < t; ) {
                    if (Ve(e[r], n))
                        return !0;
                    r++
                }
                return !1
            }
              , Ze = Array.isArray || function(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            }
              , $e = {}
              , en = {}
              , nn = {
                INDEXEDDB: Ae,
                WEBSQL: Ge,
                LOCALSTORAGE: Je
            }
              , tn = [nn.INDEXEDDB._driver, nn.WEBSQL._driver, nn.LOCALSTORAGE._driver]
              , rn = ["dropInstance"]
              , on = ["clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem"].concat(rn)
              , an = {
                description: "",
                driver: tn.slice(),
                name: "localforage",
                size: 4980736,
                storeName: "keyvaluepairs",
                version: 1
            }
              , un = function() {
                function e(n) {
                    r(this, e);
                    for (var t in nn)
                        if (nn.hasOwnProperty(t)) {
                            var o = nn[t]
                              , i = o._driver;
                            this[t] = i,
                            $e[i] || this.defineDriver(o)
                        }
                    this._defaultConfig = me({}, an),
                    this._config = me({}, this._defaultConfig, n),
                    this._driverSet = null,
                    this._initDriver = null,
                    this._ready = !1,
                    this._dbInfo = null,
                    this._wrapLibraryMethodsWithReady(),
                    this.setDriver(this._config.driver).catch((function() {}
                    ))
                }
                return e.prototype.config = function(e) {
                    if ("object" === (void 0 === e ? "undefined" : ge(e))) {
                        if (this._ready)
                            return new Error("Can't call config() after localforage has been used.");
                        for (var n in e) {
                            if ("storeName" === n && (e[n] = e[n].replace(/\W/g, "_")),
                            "version" === n && "number" != typeof e[n])
                                return new Error("Database version must be a number.");
                            this._config[n] = e[n]
                        }
                        return !("driver"in e && e.driver) || this.setDriver(this._config.driver)
                    }
                    return "string" == typeof e ? this._config[e] : this._config
                }
                ,
                e.prototype.defineDriver = function(e, n, t) {
                    var r = new we((function(n, t) {
                        try {
                            var r = e._driver
                              , o = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
                            if (!e._driver)
                                return void t(o);
                            for (var i = on.concat("_initStorage"), a = 0, c = i.length; a < c; a++) {
                                var f = i[a];
                                if ((!Ye(rn, f) || e[f]) && "function" != typeof e[f])
                                    return void t(o)
                            }
                            (function() {
                                for (var n = function(e) {
                                    return function() {
                                        var n = new Error("Method " + e + " is not implemented by the current driver")
                                          , t = we.reject(n);
                                        return u(t, arguments[arguments.length - 1]),
                                        t
                                    }
                                }, t = 0, r = rn.length; t < r; t++) {
                                    var o = rn[t];
                                    e[o] || (e[o] = n(o))
                                }
                            }
                            )();
                            var s = function(t) {
                                $e[r] && console.info("Redefining LocalForage driver: " + r),
                                $e[r] = e,
                                en[r] = t,
                                n()
                            };
                            "_support"in e ? e._support && "function" == typeof e._support ? e._support().then(s, t) : s(!!e._support) : s(!0)
                        } catch (e) {
                            t(e)
                        }
                    }
                    ));
                    return c(r, n, t),
                    r
                }
                ,
                e.prototype.driver = function() {
                    return this._driver || null
                }
                ,
                e.prototype.getDriver = function(e, n, t) {
                    var r = $e[e] ? we.resolve($e[e]) : we.reject(new Error("Driver not found."));
                    return c(r, n, t),
                    r
                }
                ,
                e.prototype.getSerializer = function(e) {
                    var n = we.resolve(Xe);
                    return c(n, e),
                    n
                }
                ,
                e.prototype.ready = function(e) {
                    var n = this
                      , t = n._driverSet.then((function() {
                        return null === n._ready && (n._ready = n._initDriver()),
                        n._ready
                    }
                    ));
                    return c(t, e, e),
                    t
                }
                ,
                e.prototype.setDriver = function(e, n, t) {
                    function r() {
                        a._config.driver = a.driver()
                    }
                    function o(e) {
                        return a._extend(e),
                        r(),
                        a._ready = a._initStorage(a._config),
                        a._ready
                    }
                    function i(e) {
                        return function() {
                            function n() {
                                for (; t < e.length; ) {
                                    var i = e[t];
                                    return t++,
                                    a._dbInfo = null,
                                    a._ready = null,
                                    a.getDriver(i).then(o).catch(n)
                                }
                                r();
                                var u = new Error("No available storage method found.");
                                return a._driverSet = we.reject(u),
                                a._driverSet
                            }
                            var t = 0;
                            return n()
                        }
                    }
                    var a = this;
                    Ze(e) || (e = [e]);
                    var u = this._getSupportedDrivers(e)
                      , f = null !== this._driverSet ? this._driverSet.catch((function() {
                        return we.resolve()
                    }
                    )) : we.resolve();
                    return this._driverSet = f.then((function() {
                        var e = u[0];
                        return a._dbInfo = null,
                        a._ready = null,
                        a.getDriver(e).then((function(e) {
                            a._driver = e._driver,
                            r(),
                            a._wrapLibraryMethodsWithReady(),
                            a._initDriver = i(u)
                        }
                        ))
                    }
                    )).catch((function() {
                        r();
                        var e = new Error("No available storage method found.");
                        return a._driverSet = we.reject(e),
                        a._driverSet
                    }
                    )),
                    c(this._driverSet, n, t),
                    this._driverSet
                }
                ,
                e.prototype.supports = function(e) {
                    return !!en[e]
                }
                ,
                e.prototype._extend = function(e) {
                    me(this, e)
                }
                ,
                e.prototype._getSupportedDrivers = function(e) {
                    for (var n = [], t = 0, r = e.length; t < r; t++) {
                        var o = e[t];
                        this.supports(o) && n.push(o)
                    }
                    return n
                }
                ,
                e.prototype._wrapLibraryMethodsWithReady = function() {
                    for (var e = 0, n = on.length; e < n; e++)
                        be(this, on[e])
                }
                ,
                e.prototype.createInstance = function(n) {
                    return new e(n)
                }
                ,
                e
            }()
              , cn = new un;
            n.exports = cn
        }
        , {
            3: 3
        }]
    }, {}, [4])(4)
}
));
$((function() {
    "use strict";
    var a = $(".js-show-loader");
    var s = ".js-show-loader-shows";
    var t = a.find(".js-show-loader-video");
    var e = a.find(".js-show-loader-info");
    var o = "/api/show/{slug}/latest";
    a.on("click", s + " li", (function(a) {
        a.preventDefault();
        var s = $(this);
        if (s.hasClass("is-today")) {
            return false
        }
        s.siblings().removeClass("is-today");
        s.addClass("is-today");
        var i = s.attr("data-day");
        var r = s.attr("data-slug");
        t.fadeOut("slow");
        e.children().fadeOut("slow", (function() {
            AjaxApiRequest.makeGetApiRequest(o.replace("{slug}", r), (function(a) {
                if (i !== "Today") {
                    e.find(".js-show-loader-last").removeClass("hide")
                } else {
                    e.find(".js-show-loader-last").addClass("hide")
                }
                e.find(".js-show-loader-day").text(i + "'s");
                e.find(".js-show-loader-title").text(a.title);
                e.find(".js-show-loader-title").attr("href", a.url);
                e.find(".js-show-loader-comments").text(a.commentCount).parent("a").attr("href", a.url);
                t.find(".av-wrapper").css("background-image", "");
                t.find(".av-wrapper").html(a.html);
                t.fadeIn("slow");
                e.children().fadeIn("slow")
            }
            ))
        }
        ))
    }
    ));
    $(".js-show-loader-initial").on("click", (function() {
        var a = $(this).attr("data-video-url");
        $(this).parent().css("background-image", "");
        $(this).parent().html(a)
    }
    ))
}
));
$((function() {
    $('#toc_list a[href*="#"]').on("click", (function() {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var t = $(this.hash);
            t = t.length ? t : $("[name=" + this.hash.slice(1) + "]");
            if (t.length) {
                $("html,body").animate({
                    scrollTop: t.offset().top - ($("#masthead-logo").is(":hidden") ? 0 : $("#masthead").height())
                }, 1e3);
                return false
            }
        }
    }
    ));
    $('a[data-toggle="collapse"]').on("click", (function() {
        var t = $(this);
        if (t.text() === "hide") {
            t.text("show")
        } else if (t.text() === "show") {
            t.text("hide")
        }
    }
    ))
}
));
/**
 * @license 
 * jQuery Tools @VERSION Rangeinput - HTML5 <input type="range" /> for humans
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/rangeinput/
 *
 * Since: Mar 2010
 * Date: @DATE 
 */
(function(e) {
    e.tools = e.tools || {
        version: "@VERSION"
    };
    var t;
    t = e.tools.rangeinput = {
        conf: {
            min: 0,
            max: 100,
            step: "any",
            steps: 0,
            value: 0,
            precision: undefined,
            vertical: 0,
            keyboard: true,
            progress: false,
            speed: 100,
            css: {
                input: "range",
                slider: "slider",
                progress: "progress",
                handle: "handle"
            }
        }
    };
    var n, r;
    e.fn.drag = function(t) {
        t = e.extend({
            x: true,
            y: true,
            drag: true
        }, t);
        n = n || e(document).on("mousedown mouseup", (function(i) {
            var a = e(i.target);
            if (i.type == "mousedown" && a.data("drag")) {
                var u = a.position()
                  , f = i.pageX - u.left
                  , s = i.pageY - u.top
                  , d = true;
                n.on("mousemove.drag", (function(e) {
                    var n = e.pageX - f
                      , i = e.pageY - s
                      , u = {};
                    if (t.x) {
                        u.left = n
                    }
                    if (t.y) {
                        u.top = i
                    }
                    if (d) {
                        a.trigger("dragStart");
                        d = false
                    }
                    if (t.drag) {
                        a.css(u)
                    }
                    a.trigger("drag", [i, n]);
                    r = a
                }
                ));
                i.preventDefault()
            } else {
                try {
                    if (r) {
                        r.trigger("dragEnd")
                    }
                } finally {
                    n.off("mousemove.drag");
                    r = null
                }
            }
        }
        ));
        return this.data("drag", true)
    }
    ;
    function i(e, t) {
        var n = Math.pow(10, t);
        return Math.round(e * n) / n
    }
    function a(e, t) {
        var n = parseInt(e.css(t), 10);
        if (n) {
            return n
        }
        var r = e[0].currentStyle;
        return r && r.width && parseInt(r.width, 10)
    }
    function u(e) {
        var t = e.data("events");
        return t && t.onSlide
    }
    function f(t, n) {
        var r = this, f = n.css, s = e("<div><div/><a href='#'/></div>").data("rangeinput", r), d, o, p, l, g;
        t.before(s);
        var c = s.addClass(f.slider).find("a").addClass(f.handle)
          , v = s.find("div").addClass(f.progress);
        e.each("min,max,step,value".split(","), (function(e, r) {
            var i = t.attr(r);
            if (parseFloat(i)) {
                n[r] = parseFloat(i, 10)
            }
        }
        ));
        var h = n.max - n.min
          , y = n.step == "any" ? 0 : n.step
          , m = n.precision;
        if (m === undefined) {
            m = y.toString().split(".");
            m = m.length === 2 ? m[1].length : 0
        }
        if (t.attr("type") == "range") {
            var w = t.clone().wrap("<div/>").parent().html()
              , x = e(w.replace(/type/i, "type=text data-orig-type"));
            x.val(n.value);
            t.replaceWith(x);
            t = x
        }
        t.addClass(f.input);
        var D = e(r).add(t)
          , S = true;
        function b(e, a, u, f) {
            if (u === undefined) {
                u = a / l * h
            } else if (f) {
                u -= n.min
            }
            if (y) {
                u = Math.round(u / y) * y
            }
            if (a === undefined || y) {
                a = u * l / h
            }
            if (isNaN(u)) {
                return r
            }
            a = Math.max(0, Math.min(a, l));
            u = a / l * h;
            if (f || !d) {
                u += n.min
            }
            if (d) {
                if (f) {
                    a = l - a
                } else {
                    u = n.max - u
                }
            }
            u = i(u, m);
            var s = e.type == "click";
            if (S && o !== undefined && !s) {
                e.type = "onSlide";
                D.trigger(e, [u, a]);
                if (e.isDefaultPrevented()) {
                    return r
                }
            }
            var p = s ? n.speed : 0
              , w = s ? function() {
                e.type = "change";
                D.trigger(e, [u])
            }
            : null;
            if (d) {
                c.animate({
                    top: a
                }, p, w);
                if (n.progress) {
                    v.animate({
                        height: l - a + c.height() / 2
                    }, p)
                }
            } else {
                c.animate({
                    left: a
                }, p, w);
                if (n.progress) {
                    v.animate({
                        width: a + c.width() / 2
                    }, p)
                }
            }
            o = u;
            g = a;
            t.val(u);
            return r
        }
        e.extend(r, {
            getValue: function() {
                return o
            },
            setValue: function(t, n) {
                k();
                return b(n || e.Event("api"), undefined, t, true)
            },
            getConf: function() {
                return n
            },
            getProgress: function() {
                return v
            },
            getHandle: function() {
                return c
            },
            getInput: function() {
                return t
            },
            step: function(t, i) {
                i = i || e.Event();
                var a = n.step == "any" ? 1 : n.step;
                r.setValue(o + a * (t || 1), i)
            },
            stepUp: function(e) {
                return r.step(e || 1)
            },
            stepDown: function(e) {
                return r.step(-e || -1)
            }
        });
        e.each("onSlide,change".split(","), (function(t, i) {
            if (e.isFunction(n[i])) {
                e(r).on(i, n[i])
            }
            r[i] = function(t) {
                if (t) {
                    e(r).on(i, t)
                }
                return r
            }
        }
        ));
        c.drag({
            drag: false
        }).on("dragStart", (function() {
            k();
            S = u(e(r)) || u(t)
        }
        )).on("drag", (function(e, n, r) {
            if (t.is(":disabled")) {
                return false
            }
            b(e, d ? n : r)
        }
        )).on("dragEnd", (function(e) {
            if (!e.isDefaultPrevented()) {
                e.type = "change";
                D.trigger(e, [o])
            }
        }
        )).click((function(e) {
            return e.preventDefault()
        }
        ));
        s.click((function(e) {
            if (t.is(":disabled") || e.target == c[0]) {
                return e.preventDefault()
            }
            k();
            var n = d ? c.height() / 2 : c.width() / 2;
            b(e, d ? l - p - n + e.pageY : e.pageX - p - n)
        }
        ));
        if (n.keyboard) {
            t.keydown((function(n) {
                if (t.attr("readonly")) {
                    return
                }
                var i = n.keyCode
                  , a = e([75, 76, 38, 33, 39]).index(i) != -1
                  , u = e([74, 72, 40, 34, 37]).index(i) != -1;
                if ((a || u) && !(n.shiftKey || n.altKey || n.ctrlKey)) {
                    if (a) {
                        r.step(i == 33 ? 10 : 1, n)
                    } else if (u) {
                        r.step(i == 34 ? -10 : -1, n)
                    }
                    return n.preventDefault()
                }
            }
            ))
        }
        t.blur((function(t) {
            var n = e(this).val();
            if (n !== o) {
                r.setValue(n, t)
            }
        }
        ));
        e.extend(t[0], {
            stepUp: r.stepUp,
            stepDown: r.stepDown
        });
        function k() {
            d = n.vertical || a(s, "height") > a(s, "width");
            if (d) {
                l = a(s, "height") - a(c, "height");
                p = s.offset().top + l
            } else {
                l = a(s, "width") - a(c, "width");
                p = s.offset().left
            }
        }
        function C() {
            k();
            r.setValue(n.value !== undefined ? n.value : n.min)
        }
        C();
        if (!l) {
            e(window).on("load", C)
        }
    }
    e.expr[":"].range = function(t) {
        var n = t.getAttribute("type");
        return n && n == "range" || !!e(t).filter("input").data("rangeinput")
    }
    ;
    e.fn.rangeinput = function(n) {
        if (this.data("rangeinput")) {
            return this
        }
        n = e.extend(true, {}, t.conf, n);
        var r;
        this.each((function() {
            var t = new f(e(this),e.extend(true, {}, n));
            var i = t.getInput().data("rangeinput", t);
            r = r ? r.add(i) : i
        }
        ));
        return r ? r : this
    }
}
)(jQuery);
(function(e) {
    e.fn.menuAim = function(e) {
        this.each((function() {
            t.call(this, e)
        }
        ));
        return this
    }
    ;
    function t(t) {
        var n = e(this)
          , i = null
          , u = []
          , o = null
          , r = null
          , f = e.extend({
            rowSelector: "> li",
            submenuSelector: "*",
            submenuDirection: "right",
            tolerance: 75,
            enter: e.noop,
            exit: e.noop,
            activate: e.noop,
            deactivate: e.noop,
            exitMenu: e.noop
        }, t);
        var c = 3
          , l = 300;
        var a = function(e) {
            u.push({
                x: e.pageX,
                y: e.pageY
            });
            if (u.length > c) {
                u.shift()
            }
        };
        var s = function() {
            if (r) {
                clearTimeout(r)
            }
            if (f.exitMenu(this)) {
                if (i) {
                    f.deactivate(i)
                }
                i = null
            }
        };
        var v = function() {
            if (r) {
                clearTimeout(r)
            }
            f.enter(this);
            y(this)
        }
          , h = function() {
            f.exit(this)
        };
        var m = function() {
            x(this)
        };
        var x = function(e) {
            if (e == i) {
                return
            }
            if (i) {
                f.deactivate(i)
            }
            f.activate(e);
            i = e
        };
        var y = function(e) {
            var t = p();
            if (t) {
                r = setTimeout((function() {
                    y(e)
                }
                ), t)
            } else {
                x(e)
            }
        };
        var p = function() {
            if (!i || !e(i).is(f.submenuSelector)) {
                return 0
            }
            var t = n.offset()
              , r = {
                x: t.left,
                y: t.top - f.tolerance
            }
              , c = {
                x: t.left + n.outerWidth(),
                y: r.y
            }
              , a = {
                x: t.left,
                y: t.top + n.outerHeight() + f.tolerance
            }
              , s = {
                x: t.left + n.outerWidth(),
                y: a.y
            }
              , v = u[u.length - 1]
              , h = u[0];
            if (!v) {
                return 0
            }
            if (!h) {
                h = v
            }
            if (h.x < t.left || h.x > s.x || h.y < t.top || h.y > s.y) {
                return 0
            }
            if (o && v.x == o.x && v.y == o.y) {
                return 0
            }
            function m(e, t) {
                return (t.y - e.y) / (t.x - e.x)
            }
            var x = c
              , y = s;
            if (f.submenuDirection == "left") {
                x = a;
                y = r
            } else if (f.submenuDirection == "below") {
                x = s;
                y = a
            } else if (f.submenuDirection == "above") {
                x = r;
                y = c
            }
            var p = m(v, x)
              , b = m(v, y)
              , d = m(h, x)
              , g = m(h, y);
            if (p < d && b > g) {
                o = v;
                return l
            }
            o = null;
            return 0
        };
        n.mouseleave(s).find(f.rowSelector).mouseenter(v).mouseleave(h).click(m);
        e(document).mousemove(a)
    }
}
)(jQuery);
(function(t) {
    "use strict";
    var a = false;
    if (!!window.Modernizr && !!Modernizr.video && !!Modernizr.video.h264) {
        a = true
    }
    var i = $(document)
      , e = $(window);
    var r = "stopped";
    var n = "parent";
    var o = "parentElement";
    var v = "videoClip";
    var d = "watcher";
    var f = "resize.videoClip";
    var c = [], u, s = false;
    var l = function(t) {
        var a = $(t);
        if (!a.data(r)) {
            t.pause();
            a.data(r, true)
        }
    };
    var p = function() {
        u.each((function() {
            l(this)
        }
        ))
    };
    var h = function() {
        s = true;
        p()
    };
    var y = function(t) {
        if (true === s) {
            return
        }
        var a = $(t), i;
        if (!!a.data(r)) {
            a.data(r, false);
            i = t.play();
            if (i) {
                i.catch((function(t) {
                    a.data(r, true)
                }
                ))
            }
        }
    };
    var w = function(t) {
        var a = t.data(o), i, e;
        if (undefined === a) {
            i = t.data(v);
            if (!i) {
                i = t
            }
            e = t.data(n);
            if (!e) {
                e = "[data-no-video-clip-style]"
            }
            a = i.closest(e);
            if (0 === a.length) {
                a = null
            }
            t.data(o, a)
        }
        return a
    };
    var m = function(t, a) {
        var i = w(t), e;
        if (!!i) {
            if (a) {
                i.removeAttr("style")
            } else {
                e = i.data("no-video-clip-style");
                if (!!e && e !== i.attr("style")) {
                    i.attr("style", e)
                }
            }
        }
    };
    var z = function(t, a) {
        var i = a.data(d);
        if ("hidden" === t.css("visibility")) {
            m(a);
            l(t[0])
        } else {
            m(a, true);
            if (i.isInViewport) {
                y(t[0])
            }
        }
    };
    var M = function(t) {
        var a, i, r = t.attr("content"), n = t.data(), o;
        try {
            n["src"] = r;
            i = $("<video/>", n);
            t.replaceWith(i);
            t.data(v, i)
        } catch (a) {
            i = undefined;
            m(t)
        }
        if (!!i) {
            a = i[0];
            c.push(a);
            o = scrollMonitor.create(a);
            o.enterViewport((function() {
                y(a)
            }
            ));
            o.exitViewport((function() {
                l(a)
            }
            ));
            t.data(d, o);
            z(i, t);
            e.on(f, (function() {
                z(i, t)
            }
            ))
        }
    };
    var V = function() {
        var t = $(this);
        if (true === a) {
            M(t)
        } else {
            m(t)
        }
    };
    var C = function() {
        var t = $("meta.js-video-clip");
        t.each(V);
        u = $(c);
        i.on("video_play", h)
    };
    $(C)
}
)(this);
(function(a) {
    "use strict";
    var t = ".js-clipboard-set";
    var i = ".js-clipboard-btn";
    var e = ".js-clipboard-target";
    var r = "is-clipboard-copied";
    var o = 0;
    var d = 2e3;
    var n = "clipboard-copied-delay";
    var c = "clipboard-copied-msg";
    var l = function(a) {
        if (a.data("clipboard-initialized")) {
            return
        }
        var t = a.find(e).first(), r = a.find(i).first(), d;
        if (0 === t.length || 0 === r.length) {
            return
        }
        if (t.hasClass("js-toggle-field")) {
            r.attr("data-clipboard-text", t.attr("value"));
            t.on("change.clipboard", (function() {
                r.attr("data-clipboard-text", t.attr("value"))
            }
            ))
        } else {
            d = t.attr("id");
            if (!d) {
                o += 1;
                d = "js-clipboard-target-" + o;
                t.attr("id", d)
            }
            r.attr("data-clipboard-target", "#" + d)
        }
        a.data("clipboard-initialized", true)
    };
    var s = function(a) {
        var t = $(a.trigger)
          , i = t.data(n) || d
          , e = t.data(c)
          , o = t.data("copiedTimeoutId");
        if (!!e) {
            Phoenix.Ui.showSuccessMessage(e)
        }
        if (!!o) {
            clearTimeout(o);
            t.data("copiedTimeoutId", false)
        }
        t.addClass(r);
        o = setTimeout((function() {
            t.removeClass(r);
            t.data("copiedTimeoutId", false)
        }
        ), i);
        t.data("copiedTimeoutId", o)
    };
    var u = function() {
        var e = $(i), r = a.Clipboard, o = "function" === typeof r, d;
        if (!o || 0 === e.length) {
            if (0 < e.length) {
                e.remove()
            }
            return
        }
        $(document.body).on("mousedown.clipboardButton", i, (function() {
            var a = $(this)
              , i = a.closest(t);
            if (!i.length) {
                return
            }
            l(i)
        }
        ));
        d = new r(i);
        d.on("success", s)
    };
    $(window).on("load", u)
}
)(this);
/*!
 * clipboard.js v1.7.1
 * https://zenorocha.github.io/clipboard.js
 *
 * Licensed MIT © Zeno Rocha
 */
(function(e) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = e()
    } else if (typeof define === "function" && define.amd) {
        define([], e)
    } else {
        var t;
        if (typeof window !== "undefined") {
            t = window
        } else if (typeof global !== "undefined") {
            t = global
        } else if (typeof self !== "undefined") {
            t = self
        } else {
            t = this
        }
        t.Clipboard = e()
    }
}
)((function() {
    var e, t, n;
    return function e(t, n, i) {
        function r(a, c) {
            if (!n[a]) {
                if (!t[a]) {
                    var l = typeof require == "function" && require;
                    if (!c && l)
                        return l(a, !0);
                    if (o)
                        return o(a, !0);
                    var u = new Error("Cannot find module '" + a + "'");
                    throw u.code = "MODULE_NOT_FOUND",
                    u
                }
                var s = n[a] = {
                    exports: {}
                };
                t[a][0].call(s.exports, (function(e) {
                    var n = t[a][1][e];
                    return r(n ? n : e)
                }
                ), s, s.exports, e, t, n, i)
            }
            return n[a].exports
        }
        var o = typeof require == "function" && require;
        for (var a = 0; a < i.length; a++)
            r(i[a]);
        return r
    }({
        1: [function(e, t, n) {
            var i = 9;
            if (typeof Element !== "undefined" && !Element.prototype.matches) {
                var r = Element.prototype;
                r.matches = r.matchesSelector || r.mozMatchesSelector || r.msMatchesSelector || r.oMatchesSelector || r.webkitMatchesSelector
            }
            function o(e, t) {
                while (e && e.nodeType !== i) {
                    if (typeof e.matches === "function" && e.matches(t)) {
                        return e
                    }
                    e = e.parentNode
                }
            }
            t.exports = o
        }
        , {}],
        2: [function(e, t, n) {
            var i = e("./closest");
            function r(e, t, n, i, r) {
                var a = o.apply(this, arguments);
                e.addEventListener(n, a, r);
                return {
                    destroy: function() {
                        e.removeEventListener(n, a, r)
                    }
                }
            }
            function o(e, t, n, r) {
                return function(n) {
                    n.delegateTarget = i(n.target, t);
                    if (n.delegateTarget) {
                        r.call(e, n)
                    }
                }
            }
            t.exports = r
        }
        , {
            "./closest": 1
        }],
        3: [function(e, t, n) {
            n.node = function(e) {
                return e !== undefined && e instanceof HTMLElement && e.nodeType === 1
            }
            ;
            n.nodeList = function(e) {
                var t = Object.prototype.toString.call(e);
                return e !== undefined && (t === "[object NodeList]" || t === "[object HTMLCollection]") && "length"in e && (e.length === 0 || n.node(e[0]))
            }
            ;
            n.string = function(e) {
                return typeof e === "string" || e instanceof String
            }
            ;
            n.fn = function(e) {
                var t = Object.prototype.toString.call(e);
                return t === "[object Function]"
            }
        }
        , {}],
        4: [function(e, t, n) {
            var i = e("./is");
            var r = e("delegate");
            function o(e, t, n) {
                if (!e && !t && !n) {
                    throw new Error("Missing required arguments")
                }
                if (!i.string(t)) {
                    throw new TypeError("Second argument must be a String")
                }
                if (!i.fn(n)) {
                    throw new TypeError("Third argument must be a Function")
                }
                if (i.node(e)) {
                    return a(e, t, n)
                } else if (i.nodeList(e)) {
                    return c(e, t, n)
                } else if (i.string(e)) {
                    return l(e, t, n)
                } else {
                    throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")
                }
            }
            function a(e, t, n) {
                e.addEventListener(t, n);
                return {
                    destroy: function() {
                        e.removeEventListener(t, n)
                    }
                }
            }
            function c(e, t, n) {
                Array.prototype.forEach.call(e, (function(e) {
                    e.addEventListener(t, n)
                }
                ));
                return {
                    destroy: function() {
                        Array.prototype.forEach.call(e, (function(e) {
                            e.removeEventListener(t, n)
                        }
                        ))
                    }
                }
            }
            function l(e, t, n) {
                return r(document.body, e, t, n)
            }
            t.exports = o
        }
        , {
            "./is": 3,
            delegate: 2
        }],
        5: [function(e, t, n) {
            function i(e) {
                var t;
                if (e.nodeName === "SELECT") {
                    e.focus();
                    t = e.value
                } else if (e.nodeName === "INPUT" || e.nodeName === "TEXTAREA") {
                    var n = e.hasAttribute("readonly");
                    if (!n) {
                        e.setAttribute("readonly", "")
                    }
                    e.select();
                    e.setSelectionRange(0, e.value.length);
                    if (!n) {
                        e.removeAttribute("readonly")
                    }
                    t = e.value
                } else {
                    if (e.hasAttribute("contenteditable")) {
                        e.focus()
                    }
                    var i = window.getSelection();
                    var r = document.createRange();
                    r.selectNodeContents(e);
                    i.removeAllRanges();
                    i.addRange(r);
                    t = i.toString()
                }
                return t
            }
            t.exports = i
        }
        , {}],
        6: [function(e, t, n) {
            function i() {}
            i.prototype = {
                on: function(e, t, n) {
                    var i = this.e || (this.e = {});
                    (i[e] || (i[e] = [])).push({
                        fn: t,
                        ctx: n
                    });
                    return this
                },
                once: function(e, t, n) {
                    var i = this;
                    function r() {
                        i.off(e, r);
                        t.apply(n, arguments)
                    }
                    r._ = t;
                    return this.on(e, r, n)
                },
                emit: function(e) {
                    var t = [].slice.call(arguments, 1);
                    var n = ((this.e || (this.e = {}))[e] || []).slice();
                    var i = 0;
                    var r = n.length;
                    for (i; i < r; i++) {
                        n[i].fn.apply(n[i].ctx, t)
                    }
                    return this
                },
                off: function(e, t) {
                    var n = this.e || (this.e = {});
                    var i = n[e];
                    var r = [];
                    if (i && t) {
                        for (var o = 0, a = i.length; o < a; o++) {
                            if (i[o].fn !== t && i[o].fn._ !== t)
                                r.push(i[o])
                        }
                    }
                    r.length ? n[e] = r : delete n[e];
                    return this
                }
            };
            t.exports = i
        }
        , {}],
        7: [function(t, n, i) {
            (function(r, o) {
                if (typeof e === "function" && e.amd) {
                    e(["module", "select"], o)
                } else if (typeof i !== "undefined") {
                    o(n, t("select"))
                } else {
                    var a = {
                        exports: {}
                    };
                    o(a, r.select);
                    r.clipboardAction = a.exports
                }
            }
            )(this, (function(e, t) {
                "use strict";
                var n = i(t);
                function i(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }
                var r = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ;
                function o(e, t) {
                    if (!(e instanceof t)) {
                        throw new TypeError("Cannot call a class as a function")
                    }
                }
                var a = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var i = t[n];
                            i.enumerable = i.enumerable || false;
                            i.configurable = true;
                            if ("value"in i)
                                i.writable = true;
                            Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, n, i) {
                        if (n)
                            e(t.prototype, n);
                        if (i)
                            e(t, i);
                        return t
                    }
                }();
                var c = function() {
                    function e(t) {
                        o(this, e);
                        this.resolveOptions(t);
                        this.initSelection()
                    }
                    a(e, [{
                        key: "resolveOptions",
                        value: function e() {
                            var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                            this.action = t.action;
                            this.container = t.container;
                            this.emitter = t.emitter;
                            this.target = t.target;
                            this.text = t.text;
                            this.trigger = t.trigger;
                            this.selectedText = ""
                        }
                    }, {
                        key: "initSelection",
                        value: function e() {
                            if (this.text) {
                                this.selectFake()
                            } else if (this.target) {
                                this.selectTarget()
                            }
                        }
                    }, {
                        key: "selectFake",
                        value: function e() {
                            var t = this;
                            var i = document.documentElement.getAttribute("dir") == "rtl";
                            this.removeFake();
                            this.fakeHandlerCallback = function() {
                                return t.removeFake()
                            }
                            ;
                            this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || true;
                            this.fakeElem = document.createElement("textarea");
                            this.fakeElem.style.fontSize = "12pt";
                            this.fakeElem.style.border = "0";
                            this.fakeElem.style.padding = "0";
                            this.fakeElem.style.margin = "0";
                            this.fakeElem.style.position = "absolute";
                            this.fakeElem.style[i ? "right" : "left"] = "-9999px";
                            var r = window.pageYOffset || document.documentElement.scrollTop;
                            this.fakeElem.style.top = r + "px";
                            this.fakeElem.setAttribute("readonly", "");
                            this.fakeElem.value = this.text;
                            this.container.appendChild(this.fakeElem);
                            this.selectedText = (0,
                            n.default)(this.fakeElem);
                            this.copyText()
                        }
                    }, {
                        key: "removeFake",
                        value: function e() {
                            if (this.fakeHandler) {
                                this.container.removeEventListener("click", this.fakeHandlerCallback);
                                this.fakeHandler = null;
                                this.fakeHandlerCallback = null
                            }
                            if (this.fakeElem) {
                                this.container.removeChild(this.fakeElem);
                                this.fakeElem = null
                            }
                        }
                    }, {
                        key: "selectTarget",
                        value: function e() {
                            this.selectedText = (0,
                            n.default)(this.target);
                            this.copyText()
                        }
                    }, {
                        key: "copyText",
                        value: function e() {
                            var t = void 0;
                            try {
                                t = document.execCommand(this.action)
                            } catch (e) {
                                t = false
                            }
                            this.handleResult(t)
                        }
                    }, {
                        key: "handleResult",
                        value: function e(t) {
                            this.emitter.emit(t ? "success" : "error", {
                                action: this.action,
                                text: this.selectedText,
                                trigger: this.trigger,
                                clearSelection: this.clearSelection.bind(this)
                            })
                        }
                    }, {
                        key: "clearSelection",
                        value: function e() {
                            if (this.trigger) {
                                this.trigger.focus()
                            }
                            window.getSelection().removeAllRanges()
                        }
                    }, {
                        key: "destroy",
                        value: function e() {
                            this.removeFake()
                        }
                    }, {
                        key: "action",
                        set: function e() {
                            var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "copy";
                            this._action = t;
                            if (this._action !== "copy" && this._action !== "cut") {
                                throw new Error('Invalid "action" value, use either "copy" or "cut"')
                            }
                        },
                        get: function e() {
                            return this._action
                        }
                    }, {
                        key: "target",
                        set: function e(t) {
                            if (t !== undefined) {
                                if (t && (typeof t === "undefined" ? "undefined" : r(t)) === "object" && t.nodeType === 1) {
                                    if (this.action === "copy" && t.hasAttribute("disabled")) {
                                        throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute')
                                    }
                                    if (this.action === "cut" && (t.hasAttribute("readonly") || t.hasAttribute("disabled"))) {
                                        throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes')
                                    }
                                    this._target = t
                                } else {
                                    throw new Error('Invalid "target" value, use a valid Element')
                                }
                            }
                        },
                        get: function e() {
                            return this._target
                        }
                    }]);
                    return e
                }();
                e.exports = c
            }
            ))
        }
        , {
            select: 5
        }],
        8: [function(t, n, i) {
            (function(r, o) {
                if (typeof e === "function" && e.amd) {
                    e(["module", "./clipboard-action", "tiny-emitter", "good-listener"], o)
                } else if (typeof i !== "undefined") {
                    o(n, t("./clipboard-action"), t("tiny-emitter"), t("good-listener"))
                } else {
                    var a = {
                        exports: {}
                    };
                    o(a, r.clipboardAction, r.tinyEmitter, r.goodListener);
                    r.clipboard = a.exports
                }
            }
            )(this, (function(e, t, n, i) {
                "use strict";
                var r = c(t);
                var o = c(n);
                var a = c(i);
                function c(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }
                var l = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ;
                function u(e, t) {
                    if (!(e instanceof t)) {
                        throw new TypeError("Cannot call a class as a function")
                    }
                }
                var s = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var i = t[n];
                            i.enumerable = i.enumerable || false;
                            i.configurable = true;
                            if ("value"in i)
                                i.writable = true;
                            Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, n, i) {
                        if (n)
                            e(t.prototype, n);
                        if (i)
                            e(t, i);
                        return t
                    }
                }();
                function f(e, t) {
                    if (!e) {
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
                    }
                    return t && (typeof t === "object" || typeof t === "function") ? t : e
                }
                function d(e, t) {
                    if (typeof t !== "function" && t !== null) {
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t)
                    }
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: false,
                            writable: true,
                            configurable: true
                        }
                    });
                    if (t)
                        Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t
                }
                var h = function(e) {
                    d(t, e);
                    function t(e, n) {
                        u(this, t);
                        var i = f(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                        i.resolveOptions(n);
                        i.listenClick(e);
                        return i
                    }
                    s(t, [{
                        key: "resolveOptions",
                        value: function e() {
                            var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                            this.action = typeof t.action === "function" ? t.action : this.defaultAction;
                            this.target = typeof t.target === "function" ? t.target : this.defaultTarget;
                            this.text = typeof t.text === "function" ? t.text : this.defaultText;
                            this.container = l(t.container) === "object" ? t.container : document.body
                        }
                    }, {
                        key: "listenClick",
                        value: function e(t) {
                            var n = this;
                            this.listener = (0,
                            a.default)(t, "click", (function(e) {
                                return n.onClick(e)
                            }
                            ))
                        }
                    }, {
                        key: "onClick",
                        value: function e(t) {
                            var n = t.delegateTarget || t.currentTarget;
                            if (this.clipboardAction) {
                                this.clipboardAction = null
                            }
                            this.clipboardAction = new r.default({
                                action: this.action(n),
                                target: this.target(n),
                                text: this.text(n),
                                container: this.container,
                                trigger: n,
                                emitter: this
                            })
                        }
                    }, {
                        key: "defaultAction",
                        value: function e(t) {
                            return p("action", t)
                        }
                    }, {
                        key: "defaultTarget",
                        value: function e(t) {
                            var n = p("target", t);
                            if (n) {
                                return document.querySelector(n)
                            }
                        }
                    }, {
                        key: "defaultText",
                        value: function e(t) {
                            return p("text", t)
                        }
                    }, {
                        key: "destroy",
                        value: function e() {
                            this.listener.destroy();
                            if (this.clipboardAction) {
                                this.clipboardAction.destroy();
                                this.clipboardAction = null
                            }
                        }
                    }], [{
                        key: "isSupported",
                        value: function e() {
                            var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ["copy", "cut"];
                            var n = typeof t === "string" ? [t] : t;
                            var i = !!document.queryCommandSupported;
                            n.forEach((function(e) {
                                i = i && !!document.queryCommandSupported(e)
                            }
                            ));
                            return i
                        }
                    }]);
                    return t
                }(o.default);
                function p(e, t) {
                    var n = "data-clipboard-" + e;
                    if (!t.hasAttribute(n)) {
                        return
                    }
                    return t.getAttribute(n)
                }
                e.exports = h
            }
            ))
        }
        , {
            "./clipboard-action": 7,
            "good-listener": 4,
            "tiny-emitter": 6
        }]
    }, {}, [8])(8)
}
));
(function(e) {
    "use strict";
    var t = $(document);
    var a = ".js-video-player, .js-video-player-new";
    var n = ".js-vid-postplay";
    var r = ".js-vid-postplay-countdown";
    var o = ".js-vid-postplay-timer";
    var i = ".js-vid-postplay-close";
    var d = ".js-vid-postplay-stop";
    var s = ".js-vid-postplay-next";
    var f = ".js-vid-postplay-action";
    var l = ".js-vid-postplay-videos";
    var u = ".js-vid-postplay-video";
    var c = "is-postplay-counting";
    var v = "is-postplay-complete";
    var p = "is-vid-postplay";
    var y = "is-countdown-stopped";
    var h = "is-countdown-disabled";
    var w = "countdown-timeout-id";
    var m = "postplay-started";
    var x = "postplay-id";
    var g = "redir-tracking";
    var P = "event-tracking";
    var C = "postPlayUserPreffDisabled";
    var V = "postPlayUserPreffCount";
    var j;
    var S = "enterViewport";
    var k = "exitViewport";
    var T = 10;
    var H = 1e3;
    var I = 10;
    var N = 500;
    var O = 0;
    var b = {
        videoTimeRemaining: 0,
        countdown: {
            timeValue: 0,
            delayStart: 0,
            delayOverride: 0
        },
        deferred: false,
        canceled: false,
        paused: false,
        noCountdown: false,
        playerContentEnded: false,
        nonIframeXHR: null,
        nextVideoPlayer: null
    };
    var D = {};
    var E;
    var R = function() {
        var e, t, a, n, r, o, i, d = [], s, f;
        var c = function() {
            var e = f.watchedCookieName, t;
            if (!e) {
                return
            }
            t = JSON.parse($.cookie(e));
            if (!t) {
                t = []
            }
            d = t
        };
        var v = function() {
            var e = f.watchedCookieName, t = f.watchedCookieDays, a;
            if (undefined === d) {
                return
            }
            try {
                a = JSON.stringify(d)
            } catch (e) {
                a = false
            }
            $.cookie(e, a, {
                path: "/",
                expires: t
            })
        };
        var p = function() {
            var e = [], t, a;
            for (a = 0; a < d.length; a++) {
                t = d[a];
                if (0 > $.inArray(t, s)) {
                    e.push(t)
                }
            }
            d = e
        };
        var y = function(e) {
            var a = t[0].querySelectorAll(u), n, r, f;
            for (f = 0; f < a.length; f++) {
                n = $(a[f]);
                r = n.data("id");
                if (!o) {
                    o = n
                }
                if (0 <= d.indexOf(r)) {
                    s.push(r)
                } else {
                    i = n;
                    break
                }
            }
            if (a.length === 1 && s.length > 0) {
                Phoenix.Storage.set(V, j + 1)
            }
        };
        var h = function() {
            var n, d = e.$timer, s;
            if (o !== i) {
                r = t.find(l);
                r.prepend(i)
            }
            n = i.find("a");
            if (false === $.contains(i[0], d[0])) {
                n.append(d)
            }
            s = n.text();
            a.text("Next up: " + s);
            a.attr({
                href: n.attr("href"),
                title: s
            })
        };
        return function(r, d) {
            f = r.data("video");
            e = d;
            j = f.postPlayMax || 100;
            t = e.$postPlay;
            a = e.$nextControl;
            n = e.$countdown;
            c();
            o = i = null;
            s = [];
            y(r);
            if (null === i) {
                i = o;
                p();
                v()
            }
            h();
            d.$nextVideo = i
        }
    }();
    var M = function(e, t) {
        var a = t.find(n)
          , l = a.find(s)
          , u = a.find(f)
          , v = a.find([i, d].join(","))
          , p = $.extend({}, b, {
            $player: t,
            $postPlay: a,
            $countdown: a.find(r),
            $nextControl: l,
            $nextVideo: null,
            $timer: a.find(o),
            watcher: scrollMonitor.create(t),
            noCountdown: a.data("no-countdown") ? true : false,
            noNext: a.data("no-next") ? true : false
        });
        a.on("remove", (function() {
            F(p)
        }
        ));
        p.enterViewportHandler = function() {
            B(p)
        }
        ;
        p.exitViewportHandler = function() {
            F(p);
            p.watcher.off(S);
            p.watcher.on(S, (function() {
                K(p)
            }
            ))
        }
        ;
        if (v && v.length > 0) {
            v.on("click", (function(e) {
                var t = $(this);
                if (a.hasClass(c)) {
                    e.stopPropagation();
                    e.preventDefault();
                    Phoenix.Storage.set(C, true);
                    if (t.is(i)) {
                        _(p)
                    } else {
                        z(p)
                    }
                }
            }
            ))
        }
        l.on("click", (function() {
            Q(p)
        }
        ));
        u.on("click", (function(e) {
            if ($(e.target).parents(".js-vid-postplay-timer").length > 0) {
                Phoenix.Storage.set(C, false)
            }
            Phoenix.Storage.set(V, 0);
            var t = $(this).closest(p.$nextVideo);
            if (t.length > 0) {
                Q(p)
            } else {
                z(p)
            }
        }
        ));
        u.each((function(e) {
            var t = $(this)
              , a = t.data(P);
            if (a) {
                a += "|" + (e + 1);
                t.data(P, a)
            }
        }
        ));
        if (p.noNext === false) {
            R(t, p)
        }
        D[e] = p
    };
    var X = function(e) {
        var t = e.data(x);
        if (!t) {
            O++;
            t = O;
            e.data(x, t);
            M(t, e)
        }
        return D[t]
    };
    var A = function(e, t) {
        var a = e.data(x);
        if (!a || !t) {
            return
        }
        _(t);
        t.watcher.destroy();
        delete D[a]
    };
    var J = function(e) {
        var t = e.$nextControl
          , a = t.data(g);
        if (a) {
            t.data(P, a);
            t.trigger("customEventTracking")
        }
        window.location = t.attr("href") + "?autoplay=1"
    };
    var U = function() {
        var t = function(t) {
            if (t.$player.hasClass(p)) {
                var a = e.Phoenix, n, r, o, i, d;
                if (a && a.VideoPlayer) {
                    o = a.VideoPlayer;
                    i = t.$player;
                    d = $(t.nextVideoPlayer);
                    r = i.data("id");
                    if (o.hasInstance(r)) {
                        i.replaceWith(d);
                        o.removeInstance(r);
                        A(i, t);
                        d.trigger("ajaxPlayerLoaded")
                    }
                }
            }
        };
        var a = function(e) {
            if (e.nonIframeXHR) {
                return
            }
            var a = e.$nextVideo
              , n = a.data("id")
              , r = "/videos/embed/" + n + "/";
            var o = $.ajax({
                async: true,
                cache: false,
                data: {
                    nonIframe: "1",
                    autoplay: "1"
                },
                dataType: "json",
                success: function(a) {
                    e.nonIframeXHR = null;
                    e.nextVideoPlayer = a.html;
                    t(e)
                },
                type: "GET",
                url: r
            });
            e.nonIframeXHR = o
        };
        return function(e) {
            if (e.nextVideoPlayer) {
                t(e)
            } else {
                a(e)
            }
        }
    }();
    var W = function(e) {
        var t = e.data(w);
        clearTimeout(t);
        t = null;
        e.data(w, t)
    };
    var q = function(e, t, a) {
        var n = e.$countdown, r = e.videoTimeRemaining, o, i;
        W(n);
        if (Math.floor(r) > t) {
            t = Math.floor(r);
            a = (r - t) * H + I
        }
        o = t - 1;
        n.text(t);
        e.countdown = {
            timeValue: t,
            delayStart: Date.now(),
            delayOverride: null
        };
        if (e.$postPlay.data("enabled") === false || Phoenix.Storage.get(C) || Phoenix.Storage.get(V) > j) {
            n.text("");
            z(e);
            return
        }
        if (e.paused) {
            return
        }
        if (a) {}
        if (0 >= t) {
            setTimeout((function() {
                Q(e, true)
            }
            ), N)
        } else {
            i = setTimeout((function() {
                q(e, o)
            }
            ), a || H);
            n.data(w, i)
        }
    };
    var B = function(e) {
        var t = e.$countdown, a;
        W(e.$countdown);
        L(e);
        e.watcher.on(k, e.exitViewportHandler);
        e.$postPlay.removeClass(v).addClass(c);
        e.$timer.removeClass(y);
        a = setTimeout((function() {
            q(e, T)
        }
        ), I);
        t.data(w, a)
    };
    var G = function(e) {
        if (!e.deferred) {
            e.deferred = true;
            e.watcher.on(S, e.enterViewportHandler)
        }
    };
    var L = function(e) {
        if (e.deferred) {
            e.deferred = false;
            e.watcher.off(S, e.enterViewportHandler)
        }
    };
    var z = function(e) {
        $.extend(e, b);
        W(e.$countdown);
        L(e);
        e.$postPlay.removeClass(c);
        e.$timer.addClass(y)
    };
    var F = function(e) {
        if (!e.paused && e.countdown.timeValue > 0) {
            var t = Date.now()
              , a = t - e.countdown.delayStart;
            W(e.$countdown);
            L(e);
            e.paused = true;
            e.countdown.delayOverride = a
        }
    };
    var K = function(e) {
        if (e.paused) {
            e.paused = false;
            q(e, e.countdown.timeValue, e.countdown.delayOverride)
        }
    };
    var Q = function(e, t) {
        z(e);
        e.$postPlay.addClass(v);
        if (t) {
            if (e.$player.data("non-iframe-embed")) {
                U(e)
            } else {
                J(e)
            }
        }
    };
    var Y = function(e) {
        var t = e.$player;
        z(e);
        t.removeClass(p);
        t.trigger("hidePostPlay")
    };
    var Z = function(e) {
        var t = e.$player;
        t.addClass(p);
        t.trigger("showPostPlay")
    };
    var _ = function(e) {
        Y(e);
        e.canceled = true
    };
    var ee = function(e) {
        var t;
        if (true === e.data(m)) {
            return
        }
        var a = Phoenix.Storage.get(V) || 0;
        Phoenix.Storage.set(V, ++a);
        e.trigger("postPlayStart");
        E = t = X(e);
        e.data(m, true);
        Z(t);
        if (t) {
            t.canceled = false;
            if (t.countdown && !t.noCountdown) {
                if (t.watcher.isInViewport) {
                    B(t)
                } else {
                    G(t)
                }
            } else {
                t.$timer.addClass(h)
            }
        }
    };
    var te = function(e) {
        var t;
        if (!e.data(m)) {
            return
        }
        t = X(e);
        e.data(m, false);
        if (t) {
            Y(t)
        }
    };
    var ae = function(e, t) {
        var a = X(e);
        if (a) {
            a.playerContentEnded = t
        }
    };
    var ne = function(e) {
        var t = X(e);
        if (t) {
            return t.playerContentEnded
        }
        return false
    };
    var re = function() {
        var e = false;
        t.on({
            videoDone: function() {
                if (!e) {
                    return
                }
                var t = $(this);
                ee(t);
                ae(t, true)
            },
            videoStart: function() {
                te($(this))
            },
            contentStart: function() {
                e = true;
                te($(this))
            },
            adStart: function() {
                te($(this))
            },
            adEnd: function() {
                var e = $(this);
                if (ne(e)) {
                    ee(e)
                }
            }
        }, a)
    };
    var oe = function(e) {
        re();
        t.on({
            rteBlur: function() {
                if (E && !E.canceled) {
                    G(E)
                }
            },
            rteTyping: function() {
                if (E) {
                    z(E)
                }
            }
        }, ".js-editor-textarea")
    };
    $((function() {
        var e = $(n);
        if (e && 0 < e.length) {
            oe(e)
        }
        $(".js-preshow-iframe").on("load", (function() {
            this.contentWindow.$(".js-video-player, .js-video-player-new").on("postPlayStart", (function() {
                $(".js-preshow-title").remove()
            }
            ))
        }
        ))
    }
    ))
}
)(this);
$((function() {
    "use strict";
    (function() {
        var t = $(".js-forum-layout")
          , a = !!t.length;
        if (!a) {
            return
        }
        var e = document.querySelector("#forums #forum-content")
          , s = "container-fluid"
          , o = "container";
        var i = function() {
            var t = $(this).attr("data-type-layout");
            var a = $.cookie("forumLayout");
            if (a == "container") {
                e.classList.remove(s);
                e.classList.add(o)
            } else if (a == "container-fluid") {
                e.classList.remove(o);
                e.classList.add(s)
            }
        };
        var n = function(t, a) {
            if (t !== undefined) {
                $.cookie(t, a, {
                    expires: 365,
                    path: "/"
                })
            }
        };
        $(document).on("click", ".js-forum-layout", (function(t) {
            var a = $(this).attr("data-type-layout");
            n("forumLayout", a);
            i()
        }
        ));
        var r = $(".table-forums .is-topic-sticky").last()
          , u = !!r.length;
        if (!u) {
            return
        }
        function c() {
            if (!r.hasClass("is-last-sticky")) {
                r.addClass("is-last-sticky")
            }
        }
        c()
    }
    )();
    (function() {
        var t = function(t, a) {
            if (a === null) {
                return
            }
            $(".js-posts").each((function() {
                var t = $(this).find("meta.js-post-render-topic");
                var e = t.data("post-render-value");
                var s = t.data("full-message-count");
                var o = $.grep(a, (function(t) {
                    return t.topic == e
                }
                ));
                if (o && o.length > 0 && o[0].savedPosition > 0) {
                    var i = o[0];
                    var n = s - i.savedPosition;
                    if (n > 0) {
                        $(this).append('<a class="saved-position" title="' + n + ' New posts. Continue where you left off" href="' + t.data("base-url") + "?page=" + i.page + "#js-message-" + i.savedPosition + '">&raquo;</a>')
                    }
                }
            }
            ))
        };
        if ($("meta.js-post-render-topic").length > 0) {
            PostRender.getPostRenderData("ForumBundle", t)
        }
    }
    )()
}
));
(function(i) {
    "use strict";
    var t = i.Phoenix, o, e;
    if (!t) {
        i.Phoenix = t = {}
    }
    o = t.CarouselStrip = t.CarouselStrip || {};
    o.Views = o.Views || {};
    var s = "disabled";
    var r = function(i, t) {
        var o = i.$el.find(".js-carousel-strip__body");
        if (o.length === 0) {
            return
        }
        i.scrollSize = o[0].getBoundingClientRect().width;
        i.scrollPosition = i.scrollSize * (-1 * (i.currentPosition / i.itemsPerScroll));
        if (i.scrollPosition > 0) {
            i.scrollPosition = 0
        }
        var e = i.els.$strip;
        if (i.numItems > i.itemsPerScroll) {
            var s = Math.floor(i.numItems / i.itemsPerScroll);
            var r = i.numItems % i.itemsPerScroll === 0;
            if (r) {
                s--
            }
            i.lastFullScrollPosition = i.els.$viewport.width() * s
        }
        if (t) {
            i.doScroll(e, i.scrollPosition, true)
        }
    };
    var n = function(i) {
        if (i.hasClass("content-strip__expansion")) {
            i.css("height", "auto");
            i.css("height", i.height())
        }
    };
    var l = function(i) {
        var t = i.els.$strip
          , o = parseFloat(t.data("position"), 10);
        if (!o) {
            o = 0
        }
        return o
    };
    var c = function(i, t) {
        if (t < 0) {
            if (i.endPosition + i.itemsPerScroll > i.numItems) {
                i.currentPosition = i.numItems - i.itemsPerScroll
            } else {
                i.currentPosition = i.currentPosition + i.itemsPerScroll
            }
        } else {
            if (i.currentPosition - i.itemsPerScroll < 0) {
                i.currentPosition = 0
            } else {
                i.currentPosition -= i.itemsPerScroll
            }
        }
        i.endPosition = i.currentPosition + i.itemsPerScroll;
        if (i.endPosition > i.numItems) {
            i.endPosition = i.numItems
        }
    };
    var a = function(i, t) {
        var o = i.els.$prevButton
          , e = i.els.$nextButton;
        t = t || 0;
        if (t + 50 >= 0) {
            o.addClass(s)
        } else {
            o.removeClass(s)
        }
        if (Math.abs(t) + 50 >= i.lastFullScrollPosition) {
            e.addClass(s)
        } else {
            e.removeClass(s)
        }
    };
    var u = function(i) {
        var t = Math.floor(i.objectPosition / i.itemsPerScroll);
        if (i.objectPosition % i.itemsPerScroll === 0) {
            t--
        }
        if (t === 0) {
            return
        }
        i.scrollPosition = -1 * i.scrollSize * t;
        i.currentSection = t * -1;
        i.currentPosition = t * i.itemsPerScroll;
        i.endPosition = i.currentPosition + i.itemsPerScroll;
        i.doScroll(i.els.$strip, i.scrollPosition)
    };
    e = o.Views.Scroller = Backbone.View.extend({
        els: null,
        lastFullScrollPosition: 0,
        scrollSize: null,
        scrollPosition: null,
        actualPosition: null,
        currentSection: 0,
        itemsPerScroll: 4,
        numItems: 0,
        objectPosition: 1,
        transitionTimer: 0,
        events: {
            "click .js-carousel-strip__control": "scroll"
        },
        initialize: function(i) {
            var t = this
              , o = i.els.$strip
              , e = t.$el.data("object-position");
            t.$el.addClass("carousel-strip--scroller-ready");
            o.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", (function(i) {
                $(this).data("transitioning", false)
            }
            ));
            o.on("removeItem", (function(i) {
                t.recompute()
            }
            ));
            t.els = i.els;
            t.numItems = t.els.$strip.children().length;
            t.itemsPerScroll = t.$el.data("viewport") > 0 ? t.$el.data("viewport") : 4;
            t.objectPosition = e ? e : t.objectPosition;
            t.currentPosition = t.objectPosition - 1;
            if (t.currentPosition != t.currentSection * t.numItems) {
                t.currentPosition = t.currentSection * t.numItems
            }
            t.endPosition = t.currentPosition + t.itemsPerScroll > t.numItems ? t.numItems : t.currentPosition + t.itemsPerScroll;
            t.on("resize", (function() {
                r(t, true);
                n(o)
            }
            ));
            r(t, false);
            t.displayCardItems(o);
            n(o);
            if (t.objectPosition && t.objectPosition + 1 > t.itemsPerScroll) {
                u(t)
            }
            a(t, t.scrollPosition)
        },
        recompute: function() {
            var i = this
              , t = i.els.$strip;
            i.numItems = t.children().length;
            if (t.children(":not(.more)").length === 0) {
                t.parents(".pod--carousel-strip").remove()
            } else {
                r(i, true);
                a(i, i.scrollPosition)
            }
            i.displayCardItems(t);
            n(t)
        },
        scroll: function(i) {
            var t = this
              , o = $(i.currentTarget)
              , e = t.els.$strip
              , r = o.data("control-dir")
              , n = l(t)
              , u = t.scrollPosition;
            if (!o.hasClass(s) && !e.data("transitioning")) {
                u = r * t.scrollSize + n;
                t.scrollPosition = u;
                t.currentSection += r;
                c(t, r);
                t.doScroll(e, t.scrollPosition);
                a(t, t.scrollPosition)
            }
        },
        doScroll: function(i, t, o) {
            var e = this;
            var s = t;
            var r = e.actualPosition = parseFloat(i.css("margin-left"));
            var n = (e.numItems - e.itemsPerScroll) * (e.scrollSize / e.itemsPerScroll) * -1;
            if (t > 0) {
                s = 0;
                t = 0
            }
            if (e.numItems > e.itemsPerScroll && t < n) {
                s = n
            } else if (!o && s !== 0 && Math.abs(r - s) + 50 < e.scrollSize) {
                s = r + e.scrollSize
            }
            i.data("transitioning", true);
            clearTimeout(e.transitionTimer);
            e.transitionTimer = setTimeout((function() {
                i.data("transitioning", false)
            }
            ), 600);
            i.css("margin-left", s);
            e.displayCardItems(i);
            i.data("position", t)
        },
        displayCardItems: function(i) {
            var t = this;
            i.children().css({
                opacity: 0,
                "pointer-events": "none"
            });
            for (var o = t.currentPosition; o < t.endPosition; o++) {
                var e = ":eq(" + o + ")";
                i.children(e).css({
                    opacity: 1,
                    "pointer-events": "all"
                })
            }
        }
    })
}
)(this);
(function(i) {
    "use strict";
    var r = i.Phoenix || {}, t = r.CarouselStrip, n, e = [], o = $(document), s = $(window);
    if (!t) {
        return
    }
    n = t.Views;
    var a = ".js-carousel-strip";
    var u = "carousel-initialized";
    var l = function(i) {
        if (e.length === 0) {
            s.on("resize", (function() {
                f()
            }
            ))
        }
        e.push(i)
    };
    var c = function(i) {
        var r = i.find("div.js-carousel-strip__viewport")
          , t = r.find("ul.js-carousel-strip__strip")
          , n = i.find(".js-carousel-strip__control--prev .js-carousel-strip__control")
          , e = i.find(".js-carousel-strip__control--next .js-carousel-strip__control");
        return {
            $viewport: r,
            $strip: t,
            $prevButton: n,
            $nextButton: e
        }
    };
    var f = function() {
        var i;
        for (i = 0; i < e.length; i++) {
            e[i].trigger("resize")
        }
    };
    t.initialize = function(i) {
        var r = i.data(u);
        if (r) {
            return
        }
        i.data(u, true);
        var t = new n.Scroller({
            el: i,
            els: c(i)
        });
        i.addClass("carousel-strip--initialized");
        l(t)
    }
    ;
    var d = function(i) {
        var r;
        if (i) {
            r = i.find(a)
        } else {
            r = $(a)
        }
        if (!r || !r.length) {
            return
        }
        r.each((function() {
            t.initialize($(this))
        }
        ))
    };
    s.on("load", (function() {
        d()
    }
    ));
    o.on("ajaxCarouselLoaded", (function(i, r) {
        d(r)
    }
    ))
}
)(this);
