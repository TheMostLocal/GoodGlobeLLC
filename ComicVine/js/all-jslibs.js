(function(e) {
    if (typeof exports === "object" && exports && typeof module === "object" && module && module.exports === exports) {
        e(require("jquery"))
    } else if (typeof define === "function" && define.amd) {
        define(["jquery"], e)
    } else {
        e(jQuery)
    }
}
)((function(e) {
    var i = f();
    var t = 86400;
    var r = {
        am: "am",
        pm: "pm",
        AM: "AM",
        PM: "PM",
        decimal: ".",
        mins: "mins",
        hr: "hr",
        hrs: "hrs"
    };
    var a = {
        init: function(i) {
            return this.each((function() {
                var t = e(this);
                var s = [];
                for (var o in e.fn.timepicker.defaults) {
                    if (t.data(o)) {
                        s[o] = t.data(o)
                    }
                }
                var c = e.extend({}, e.fn.timepicker.defaults, s, i);
                if (c.lang) {
                    r = e.extend(r, c.lang)
                }
                c = n(c);
                t.data("timepicker-settings", c);
                t.addClass("ui-timepicker-input");
                if (c.useSelect) {
                    l(t)
                } else {
                    t.prop("autocomplete", "off");
                    t.on("click.timepicker focus.timepicker", a.show);
                    t.on("change.timepicker", v);
                    t.on("keydown.timepicker", T);
                    t.on("keyup.timepicker", b);
                    v.call(t.get(0))
                }
            }
            ))
        },
        show: function(i) {
            var t = e(this);
            var r = t.data("timepicker-settings");
            if (i) {
                if (!r.showOnFocus) {
                    return true
                }
                i.preventDefault()
            }
            if (r.useSelect) {
                t.data("timepicker-list").focus();
                return
            }
            if (p(t)) {
                t.blur()
            }
            var n = t.data("timepicker-list");
            if (t.prop("readonly")) {
                return
            }
            if (!n || n.length === 0 || typeof r.durationTime === "function") {
                l(t);
                n = t.data("timepicker-list")
            }
            if (s(n)) {
                return
            }
            a.hide();
            n.show();
            var o = {};
            if (r.orientation == "rtl") {
                o.left = t.offset().left + t.outerWidth() - n.outerWidth() + parseInt(n.css("marginLeft").replace("px", ""), 10)
            } else {
                o.left = t.offset().left + parseInt(n.css("marginLeft").replace("px", ""), 10)
            }
            if (t.offset().top + t.outerHeight(true) + n.outerHeight() > e(window).height() + e(window).scrollTop()) {
                n.addClass("ui-timepicker-positioned-top");
                o.top = t.offset().top - n.outerHeight() + parseInt(n.css("marginTop").replace("px", ""), 10)
            } else {
                n.removeClass("ui-timepicker-positioned-top");
                o.top = t.offset().top + t.outerHeight() + parseInt(n.css("marginTop").replace("px", ""), 10)
            }
            n.offset(o);
            var c = n.find(".ui-timepicker-selected");
            if (!c.length) {
                if (g(t)) {
                    c = d(t, n, C(g(t)))
                } else if (r.scrollDefault) {
                    c = d(t, n, r.scrollDefault)
                }
            }
            if (c && c.length) {
                var u = n.scrollTop() + c.position().top - c.outerHeight();
                n.scrollTop(u)
            } else {
                n.scrollTop(0)
            }
            e(document).on("touchstart.ui-timepicker mousedown.ui-timepicker", m);
            if (r.closeOnWindowScroll) {
                e(document).on("scroll.ui-timepicker", m)
            }
            t.trigger("showTimepicker");
            return this
        },
        hide: function(i) {
            var t = e(this);
            var r = t.data("timepicker-settings");
            if (r && r.useSelect) {
                t.blur()
            }
            e(".ui-timepicker-wrapper").each((function() {
                var i = e(this);
                if (!s(i)) {
                    return
                }
                var t = i.data("timepicker-input");
                var r = t.data("timepicker-settings");
                if (r && r.selectOnBlur) {
                    y(t)
                }
                i.hide();
                t.trigger("hideTimepicker")
            }
            ));
            return this
        },
        option: function(i, t) {
            return this.each((function() {
                var r = e(this);
                var a = r.data("timepicker-settings");
                var s = r.data("timepicker-list");
                if (typeof i == "object") {
                    a = e.extend(a, i)
                } else if (typeof i == "string" && typeof t != "undefined") {
                    a[i] = t
                } else if (typeof i == "string") {
                    return a[i]
                }
                a = n(a);
                r.data("timepicker-settings", a);
                if (s) {
                    s.remove();
                    r.data("timepicker-list", false)
                }
                if (a.useSelect) {
                    l(r)
                }
            }
            ))
        },
        getSecondsFromMidnight: function() {
            return C(g(this))
        },
        getTime: function(e) {
            var i = this;
            var t = g(i);
            if (!t) {
                return null
            }
            if (!e) {
                e = new Date
            }
            var r = C(t);
            var a = new Date(e);
            a.setHours(r / 3600);
            a.setMinutes(r % 3600 / 60);
            a.setSeconds(r % 60);
            a.setMilliseconds(0);
            return a
        },
        setTime: function(e) {
            var i = this;
            var t = i.data("timepicker-settings");
            if (t.forceRoundTime) {
                var r = u(e, t)
            } else {
                var r = x(C(e), t.timeFormat)
            }
            k(i, r);
            if (i.data("timepicker-list")) {
                h(i, i.data("timepicker-list"))
            }
            return this
        },
        remove: function() {
            var e = this;
            if (!e.hasClass("ui-timepicker-input")) {
                return
            }
            var i = e.data("timepicker-settings");
            e.removeAttr("autocomplete", "off");
            e.removeClass("ui-timepicker-input");
            e.removeData("timepicker-settings");
            e.off(".timepicker");
            if (e.data("timepicker-list")) {
                e.data("timepicker-list").remove()
            }
            if (i.useSelect) {
                e.show()
            }
            e.removeData("timepicker-list");
            return this
        }
    };
    function s(e) {
        var i = e[0];
        return i.offsetWidth > 0 && i.offsetHeight > 0
    }
    function n(i) {
        if (i.minTime) {
            i.minTime = C(i.minTime)
        }
        if (i.maxTime) {
            i.maxTime = C(i.maxTime)
        }
        if (i.durationTime && typeof i.durationTime !== "function") {
            i.durationTime = C(i.durationTime)
        }
        if (i.scrollDefault == "now") {
            i.scrollDefault = C(new Date)
        } else if (i.scrollDefault) {
            i.scrollDefault = C(i.scrollDefault)
        } else if (i.minTime) {
            i.scrollDefault = i.minTime
        }
        if (i.scrollDefault) {
            i.scrollDefault = c(i.scrollDefault, i)
        }
        if (e.type(i.timeFormat) === "string" && i.timeFormat.match(/[gh]/)) {
            i._twelveHourTime = true
        }
        if (i.disableTimeRanges.length > 0) {
            for (var t in i.disableTimeRanges) {
                i.disableTimeRanges[t] = [C(i.disableTimeRanges[t][0]), C(i.disableTimeRanges[t][1])]
            }
            i.disableTimeRanges = i.disableTimeRanges.sort((function(e, i) {
                return e[0] - i[0]
            }
            ));
            for (var t = i.disableTimeRanges.length - 1; t > 0; t--) {
                if (i.disableTimeRanges[t][0] <= i.disableTimeRanges[t - 1][1]) {
                    i.disableTimeRanges[t - 1] = [Math.min(i.disableTimeRanges[t][0], i.disableTimeRanges[t - 1][0]), Math.max(i.disableTimeRanges[t][1], i.disableTimeRanges[t - 1][1])];
                    i.disableTimeRanges.splice(t, 1)
                }
            }
        }
        return i
    }
    function l(i) {
        var r = i.data("timepicker-settings");
        var s = i.data("timepicker-list");
        if (s && s.length) {
            s.remove();
            i.data("timepicker-list", false)
        }
        if (r.useSelect) {
            s = e("<select />", {
                class: "ui-timepicker-select"
            });
            var n = s
        } else {
            s = e("<ul />", {
                class: "ui-timepicker-list"
            });
            var n = e("<div />", {
                class: "ui-timepicker-wrapper",
                tabindex: -1
            });
            n.css({
                display: "none",
                position: "absolute"
            }).append(s)
        }
        if (r.noneOption) {
            if (r.noneOption === true) {
                r.noneOption = r.useSelect ? "Time..." : "None"
            }
            if (e.isArray(r.noneOption)) {
                for (var l in r.noneOption) {
                    if (parseInt(l, 10) == l) {
                        var c = o(r.noneOption[l], r.useSelect);
                        s.append(c)
                    }
                }
            } else {
                var c = o(r.noneOption, r.useSelect);
                s.append(c)
            }
        }
        if (r.className) {
            n.addClass(r.className)
        }
        if ((r.minTime !== null || r.durationTime !== null) && r.showDuration) {
            n.addClass("ui-timepicker-with-duration");
            n.addClass("ui-timepicker-step-" + r.step)
        }
        var f = r.minTime;
        if (typeof r.durationTime === "function") {
            f = C(r.durationTime())
        } else if (r.durationTime !== null) {
            f = r.durationTime
        }
        var m = r.minTime !== null ? r.minTime : 0;
        var d = r.maxTime !== null ? r.maxTime : m + t - 1;
        if (d <= m) {
            d += t
        }
        if (d === t - 1 && e.type(r.timeFormat) === "string" && r.timeFormat.indexOf("H") !== -1) {
            d = t
        }
        var v = r.disableTimeRanges;
        var g = 0;
        var T = v.length;
        for (var l = m; l <= d; l += r.step * 60) {
            var b = l;
            var H = x(b, r.timeFormat);
            if (r.useSelect) {
                var D = e("<option />", {
                    value: H
                });
                D.text(H)
            } else {
                var D = e("<li />");
                D.data("time", b <= 86400 ? b : b % 86400);
                D.text(H)
            }
            if ((r.minTime !== null || r.durationTime !== null) && r.showDuration) {
                var R = w(l - f, r.step);
                if (r.useSelect) {
                    D.text(D.text() + " (" + R + ")")
                } else {
                    var S = e("<span />", {
                        class: "ui-timepicker-duration"
                    });
                    S.text(" (" + R + ")");
                    D.append(S)
                }
            }
            if (g < T) {
                if (b >= v[g][1]) {
                    g += 1
                }
                if (v[g] && b >= v[g][0] && b < v[g][1]) {
                    if (r.useSelect) {
                        D.prop("disabled", true)
                    } else {
                        D.addClass("ui-timepicker-disabled")
                    }
                }
            }
            s.append(D)
        }
        n.data("timepicker-input", i);
        i.data("timepicker-list", n);
        if (r.useSelect) {
            if (i.val()) {
                s.val(u(i.val(), r))
            }
            s.on("focus", (function() {
                e(this).data("timepicker-input").trigger("showTimepicker")
            }
            ));
            s.on("blur", (function() {
                e(this).data("timepicker-input").trigger("hideTimepicker")
            }
            ));
            s.on("change", (function() {
                k(i, e(this).val(), "select")
            }
            ));
            k(i, s.val());
            i.hide().after(s)
        } else {
            var M = r.appendTo;
            if (typeof M === "string") {
                M = e(M)
            } else if (typeof M === "function") {
                M = M(i)
            }
            M.append(n);
            h(i, s);
            s.on("mousedown", "li", (function(t) {
                i.off("focus.timepicker");
                i.on("focus.timepicker-ie-hack", (function() {
                    i.off("focus.timepicker-ie-hack");
                    i.on("focus.timepicker", a.show)
                }
                ));
                if (!p(i)) {
                    i[0].focus()
                }
                s.find("li").removeClass("ui-timepicker-selected");
                e(this).addClass("ui-timepicker-selected");
                if (y(i)) {
                    i.trigger("hideTimepicker");
                    n.hide()
                }
            }
            ))
        }
    }
    function o(i, t) {
        var r, a, s;
        if (typeof i == "object") {
            r = i.label;
            a = i.className;
            s = i.value
        } else if (typeof i == "string") {
            r = i
        } else {
            e.error("Invalid noneOption value")
        }
        if (t) {
            return e("<option />", {
                value: s,
                class: a,
                text: r
            })
        } else {
            return e("<li />", {
                class: a,
                text: r
            }).data("time", s)
        }
    }
    function c(i, t) {
        if (!e.isNumeric(i)) {
            i = C(i)
        }
        if (i === null) {
            return null
        } else {
            var r = i % (t.step * 60);
            if (r >= t.step * 30) {
                i += t.step * 60 - r
            } else {
                i -= r
            }
            return i
        }
    }
    function u(e, i) {
        e = c(e, i);
        if (e !== null) {
            return x(e, i.timeFormat)
        }
    }
    function f() {
        return new Date(1970,1,1,0,0,0)
    }
    function m(i) {
        var t = e(i.target);
        var r = t.closest(".ui-timepicker-input");
        if (r.length === 0 && t.closest(".ui-timepicker-wrapper").length === 0) {
            a.hide();
            e(document).unbind(".ui-timepicker")
        }
    }
    function p(e) {
        var i = e.data("timepicker-settings");
        return (window.navigator.msMaxTouchPoints || "ontouchstart"in document) && i.disableTouchKeyboard
    }
    function d(i, t, r) {
        if (!r && r !== 0) {
            return false
        }
        var a = i.data("timepicker-settings");
        var s = false;
        var n = a.step * 30;
        t.find("li").each((function(i, t) {
            var a = e(t);
            if (typeof a.data("time") != "number") {
                return
            }
            var l = a.data("time") - r;
            if (Math.abs(l) < n || l == n) {
                s = a;
                return false
            }
        }
        ));
        return s
    }
    function h(e, i) {
        i.find("li").removeClass("ui-timepicker-selected");
        var t = C(g(e), e.data("timepicker-settings"));
        if (t === null) {
            return
        }
        var r = d(e, i, t);
        if (r) {
            var a = r.offset().top - i.offset().top;
            if (a + r.outerHeight() > i.outerHeight() || a < 0) {
                i.scrollTop(i.scrollTop() + r.position().top - r.outerHeight())
            }
            r.addClass("ui-timepicker-selected")
        }
    }
    function v(i, t) {
        if (this.value === "" || t == "timepicker") {
            return
        }
        var r = e(this);
        var a = r.data("timepicker-list");
        if (r.is(":focus") && (!i || i.type != "change")) {
            return
        }
        var s = C(this.value);
        if (s === null) {
            r.trigger("timeFormatError");
            return
        }
        var n = r.data("timepicker-settings");
        var l = false;
        if (n.minTime !== null && s < n.minTime) {
            l = true
        } else if (n.maxTime !== null && s > n.maxTime) {
            l = true
        }
        e.each(n.disableTimeRanges, (function() {
            if (s >= this[0] && s < this[1]) {
                l = true;
                return false
            }
        }
        ));
        if (n.forceRoundTime) {
            var o = s % (n.step * 60);
            if (o >= n.step * 30) {
                s += n.step * 60 - o
            } else {
                s -= o
            }
        }
        var c = x(s, n.timeFormat);
        if (l) {
            if (k(r, c, "error")) {
                r.trigger("timeRangeError")
            }
        } else {
            k(r, c)
        }
    }
    function g(e) {
        if (e.is("input")) {
            return e.val()
        } else {
            return e.data("ui-timepicker-value")
        }
    }
    function k(e, i, t) {
        if (e.is("input")) {
            e.val(i);
            var r = e.data("timepicker-settings");
            if (r.useSelect && t != "select") {
                e.data("timepicker-list").val(u(i, r))
            }
        }
        if (e.data("ui-timepicker-value") != i) {
            e.data("ui-timepicker-value", i);
            if (t == "select") {
                e.trigger("selectTime").trigger("changeTime").trigger("change", "timepicker")
            } else if (t != "error") {
                e.trigger("changeTime")
            }
            return true
        } else {
            e.trigger("selectTime");
            return false
        }
    }
    function T(i) {
        var t = e(this);
        var r = t.data("timepicker-list");
        if (!r || !s(r)) {
            if (i.keyCode == 40) {
                a.show.call(t.get(0));
                r = t.data("timepicker-list");
                if (!p(t)) {
                    t.focus()
                }
            } else {
                return true
            }
        }
        switch (i.keyCode) {
        case 13:
            if (y(t)) {
                a.hide.apply(this)
            }
            i.preventDefault();
            return false;
        case 38:
            var n = r.find(".ui-timepicker-selected");
            if (!n.length) {
                r.find("li").each((function(i, t) {
                    if (e(t).position().top > 0) {
                        n = e(t);
                        return false
                    }
                }
                ));
                n.addClass("ui-timepicker-selected")
            } else if (!n.is(":first-child")) {
                n.removeClass("ui-timepicker-selected");
                n.prev().addClass("ui-timepicker-selected");
                if (n.prev().position().top < n.outerHeight()) {
                    r.scrollTop(r.scrollTop() - n.outerHeight())
                }
            }
            return false;
        case 40:
            n = r.find(".ui-timepicker-selected");
            if (n.length === 0) {
                r.find("li").each((function(i, t) {
                    if (e(t).position().top > 0) {
                        n = e(t);
                        return false
                    }
                }
                ));
                n.addClass("ui-timepicker-selected")
            } else if (!n.is(":last-child")) {
                n.removeClass("ui-timepicker-selected");
                n.next().addClass("ui-timepicker-selected");
                if (n.next().position().top + 2 * n.outerHeight() > r.outerHeight()) {
                    r.scrollTop(r.scrollTop() + n.outerHeight())
                }
            }
            return false;
        case 27:
            r.find("li").removeClass("ui-timepicker-selected");
            a.hide();
            break;
        case 9:
            a.hide();
            break;
        default:
            return true
        }
    }
    function b(i) {
        var t = e(this);
        var r = t.data("timepicker-list");
        if (!r || !s(r)) {
            return true
        }
        if (!t.data("timepicker-settings").typeaheadHighlight) {
            r.find("li").removeClass("ui-timepicker-selected");
            return true
        }
        switch (i.keyCode) {
        case 96:
        case 97:
        case 98:
        case 99:
        case 100:
        case 101:
        case 102:
        case 103:
        case 104:
        case 105:
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
        case 65:
        case 77:
        case 80:
        case 186:
        case 8:
        case 46:
            h(t, r);
            break;
        default:
            return
        }
    }
    function y(e) {
        var i = e.data("timepicker-settings");
        var t = e.data("timepicker-list");
        var r = null;
        var a = t.find(".ui-timepicker-selected");
        if (a.hasClass("ui-timepicker-disabled")) {
            return false
        }
        if (a.length) {
            r = a.data("time")
        }
        if (r !== null) {
            if (typeof r == "string") {
                e.val(r);
                e.trigger("selectTime").trigger("changeTime").trigger("change", "timepicker")
            } else {
                var s = x(r, i.timeFormat);
                k(e, s, "select")
            }
        }
        return true
    }
    function w(e, i) {
        e = Math.abs(e);
        var t = Math.round(e / 60), a = [], s, n;
        if (t < 60) {
            a = [t, r.mins]
        } else {
            s = Math.floor(t / 60);
            n = t % 60;
            if (i == 30 && n == 30) {
                s += r.decimal + 5
            }
            a.push(s);
            a.push(s == 1 ? r.hr : r.hrs);
            if (i != 30 && n) {
                a.push(n);
                a.push(r.mins)
            }
        }
        return a.join(" ")
    }
    function x(a, s) {
        if (a === null) {
            return
        }
        var n = new Date(i.valueOf() + a * 1e3);
        if (isNaN(n.getTime())) {
            return
        }
        if (e.type(s) === "function") {
            return s(n)
        }
        var l = "";
        var o, c;
        for (var u = 0; u < s.length; u++) {
            c = s.charAt(u);
            switch (c) {
            case "a":
                l += n.getHours() > 11 ? r.pm : r.am;
                break;
            case "A":
                l += n.getHours() > 11 ? r.pm.toUpperCase() : r.am.toUpperCase();
                break;
            case "g":
                o = n.getHours() % 12;
                l += o === 0 ? "12" : o;
                break;
            case "G":
                l += n.getHours();
                break;
            case "h":
                o = n.getHours() % 12;
                if (o !== 0 && o < 10) {
                    o = "0" + o
                }
                l += o === 0 ? "12" : o;
                break;
            case "H":
                o = n.getHours();
                if (a === t)
                    o = 24;
                l += o > 9 ? o : "0" + o;
                break;
            case "i":
                var f = n.getMinutes();
                l += f > 9 ? f : "0" + f;
                break;
            case "s":
                a = n.getSeconds();
                l += a > 9 ? a : "0" + a;
                break;
            case "\\":
                u++;
                l += s.charAt(u);
                break;
            default:
                l += c
            }
        }
        return l
    }
    function C(e, i) {
        if (e === "")
            return null;
        if (!e || e + 0 == e)
            return e;
        if (typeof e == "object") {
            return e.getHours() * 3600 + e.getMinutes() * 60 + e.getSeconds()
        }
        e = e.toLowerCase();
        if (e.slice(-1) == "a" || e.slice(-1) == "p") {
            e += "m"
        }
        var a = new RegExp("^([0-2]?[0-9])\\W?([0-5][0-9])?\\W?([0-5][0-9])?\\s*(" + r.am + "|" + r.pm + ")?$");
        var s = e.match(a);
        if (!s) {
            return null
        }
        var n = parseInt(s[1] * 1, 10);
        var l = s[4];
        var o = n;
        if (n <= 12 && l) {
            if (n == 12) {
                o = s[4] == r.pm ? 12 : 0
            } else {
                o = n + (s[4] == r.pm ? 12 : 0)
            }
        }
        var c = s[2] * 1 || 0;
        var u = s[3] * 1 || 0;
        var f = o * 3600 + c * 60 + u;
        if (!l && i && i._twelveHourTime && i.scrollDefault) {
            var m = f - i.scrollDefault;
            if (m < 0 && m >= t / -2) {
                f = (f + t / 2) % t
            }
        }
        return f
    }
    function H(e) {
        return ("0" + e).slice(-2)
    }
    e.fn.timepicker = function(i) {
        if (!this.length)
            return this;
        if (a[i]) {
            if (!this.hasClass("ui-timepicker-input")) {
                return this
            }
            return a[i].apply(this, Array.prototype.slice.call(arguments, 1))
        } else if (typeof i === "object" || !i) {
            return a.init.apply(this, arguments)
        } else {
            e.error("Method " + i + " does not exist on jQuery.timepicker")
        }
    }
    ;
    e.fn.timepicker.defaults = {
        className: null,
        minTime: null,
        maxTime: null,
        durationTime: null,
        step: 30,
        showDuration: false,
        showOnFocus: true,
        timeFormat: "g:ia",
        scrollDefault: null,
        selectOnBlur: false,
        disableTouchKeyboard: false,
        forceRoundTime: false,
        appendTo: "body",
        orientation: "ltr",
        disableTimeRanges: [],
        closeOnWindowScroll: false,
        typeaheadHighlight: true,
        noneOption: false
    }
}
));
/**
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * @name timeago
 * @version 1.5.2
 * @requires jQuery v1.2.3+
 * @author Ryan McGeary
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Copyright (c) 2008-2015, Ryan McGeary (ryan -[at]- mcgeary [*dot*] org)
 */
(function(t) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], t)
    } else if (typeof module === "object" && typeof module.exports === "object") {
        t(require("jquery"))
    } else {
        t(jQuery)
    }
}
)((function(t) {
    t.timeago = function(e) {
        if (e instanceof Date) {
            return n(e)
        } else if (typeof e === "string") {
            return n(t.timeago.parse(e))
        } else if (typeof e === "number") {
            return n(new Date(e))
        } else {
            return n(t.timeago.datetime(e))
        }
    }
    ;
    var e = t.timeago;
    t.extend(t.timeago, {
        settings: {
            refreshMillis: 6e4,
            allowPast: true,
            allowFuture: false,
            localeTitle: false,
            cutoff: 0,
            autoDispose: true,
            strings: {
                prefixAgo: null,
                prefixFromNow: null,
                suffixAgo: "ago",
                suffixFromNow: "from now",
                inPast: "any moment now",
                seconds: "less than a minute",
                minute: "about a minute",
                minutes: "%d minutes",
                hour: "about an hour",
                hours: "about %d hours",
                day: "a day",
                days: "%d days",
                month: "about a month",
                months: "%d months",
                year: "about a year",
                years: "%d years",
                wordSeparator: " ",
                numbers: []
            }
        },
        inWords: function(e) {
            if (!this.settings.allowPast && !this.settings.allowFuture) {
                throw "timeago allowPast and allowFuture settings can not both be set to false."
            }
            var i = this.settings.strings;
            var a = i.prefixAgo;
            var r = i.suffixAgo;
            if (this.settings.allowFuture) {
                if (e < 0) {
                    a = i.prefixFromNow;
                    r = i.suffixFromNow
                }
            }
            if (!this.settings.allowPast && e >= 0) {
                return this.settings.strings.inPast
            }
            var n = Math.abs(e) / 1e3;
            var o = n / 60;
            var s = o / 60;
            var u = s / 24;
            var l = u / 365;
            function m(a, r) {
                var n = t.isFunction(a) ? a(r, e) : a;
                var o = i.numbers && i.numbers[r] || r;
                return n.replace(/%d/i, o)
            }
            var f = n < 45 && m(i.seconds, Math.round(n)) || n < 90 && m(i.minute, 1) || o < 45 && m(i.minutes, Math.round(o)) || o < 90 && m(i.hour, 1) || s < 24 && m(i.hours, Math.round(s)) || s < 42 && m(i.day, 1) || u < 30 && m(i.days, Math.round(u)) || u < 45 && m(i.month, 1) || u < 365 && m(i.months, Math.round(u / 30)) || l < 1.5 && m(i.year, 1) || m(i.years, Math.round(l));
            var d = i.wordSeparator || "";
            if (i.wordSeparator === undefined) {
                d = " "
            }
            return t.trim([a, f, r].join(d))
        },
        parse: function(e) {
            var i = t.trim(e);
            i = i.replace(/\.\d+/, "");
            i = i.replace(/-/, "/").replace(/-/, "/");
            i = i.replace(/T/, " ").replace(/Z/, " UTC");
            i = i.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2");
            i = i.replace(/([\+\-]\d\d)$/, " $100");
            return new Date(i)
        },
        datetime: function(i) {
            var a = e.isTime(i) ? t(i).attr("datetime") : t(i).attr("title");
            return e.parse(a)
        },
        isTime: function(e) {
            return t(e).get(0).tagName.toLowerCase() === "time"
        }
    });
    var i = {
        init: function() {
            var i = t.proxy(a, this);
            i();
            var r = e.settings;
            if (r.refreshMillis > 0) {
                this._timeagoInterval = setInterval(i, r.refreshMillis)
            }
        },
        update: function(i) {
            var r = i instanceof Date ? i : e.parse(i);
            t(this).data("timeago", {
                datetime: r
            });
            if (e.settings.localeTitle)
                t(this).attr("title", r.toLocaleString());
            a.apply(this)
        },
        updateFromDOM: function() {
            t(this).data("timeago", {
                datetime: e.parse(e.isTime(this) ? t(this).attr("datetime") : t(this).attr("title"))
            });
            a.apply(this)
        },
        dispose: function() {
            if (this._timeagoInterval) {
                window.clearInterval(this._timeagoInterval);
                this._timeagoInterval = null
            }
        }
    };
    t.fn.timeago = function(t, e) {
        var a = t ? i[t] : i.init;
        if (!a) {
            throw new Error("Unknown function name '" + t + "' for timeago")
        }
        this.each((function() {
            a.call(this, e)
        }
        ));
        return this
    }
    ;
    function a() {
        var i = e.settings;
        if (i.autoDispose && !t.contains(document.documentElement, this)) {
            t(this).timeago("dispose");
            return this
        }
        var a = r(this);
        if (!isNaN(a.datetime)) {
            if (i.cutoff == 0 || Math.abs(o(a.datetime)) < i.cutoff) {
                t(this).text(n(a.datetime))
            }
        }
        return this
    }
    function r(i) {
        i = t(i);
        if (!i.data("timeago")) {
            i.data("timeago", {
                datetime: e.datetime(i)
            });
            var a = t.trim(i.text());
            if (e.settings.localeTitle) {
                i.attr("title", i.data("timeago").datetime.toLocaleString())
            } else if (a.length > 0 && !(e.isTime(i) && i.attr("title"))) {
                i.attr("title", a)
            }
        }
        return i.data("timeago")
    }
    function n(t) {
        return e.inWords(o(t))
    }
    function o(t) {
        return (new Date).getTime() - t.getTime()
    }
    document.createElement("abbr");
    document.createElement("time")
}
));
!function(t) {
    t((function() {
        "use strict";
        t.support.transition = function() {
            var t = function() {
                var t = document.createElement("bootstrap"), e = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd",
                    msTransition: "MSTransitionEnd",
                    transition: "transitionend"
                }, i;
                for (i in e) {
                    if (t.style[i] !== undefined) {
                        return e[i]
                    }
                }
            }();
            return t && {
                end: t
            }
        }()
    }
    ))
}(window.jQuery);
!function(t) {
    "use strict";
    var e = function(e, i) {
        this.options = i;
        this.$element = t(e).delegate('[data-dismiss="modal"]', "click.dismiss.modal", t.proxy(this.hide, this))
    };
    e.prototype = {
        constructor: e,
        toggle: function() {
            return this[!this.isShown ? "show" : "hide"]()
        },
        show: function() {
            var e = this
              , i = t.Event("show");
            this.$element.trigger(i);
            if (this.isShown || i.isDefaultPrevented())
                return;
            t("body").addClass("modal-open");
            this.isShown = true;
            a.call(this);
            s.call(this, (function() {
                var i = t.support.transition && e.$element.hasClass("fade");
                if (!e.$element.parent().length) {
                    e.$element.appendTo(document.body)
                }
                e.$element.show();
                if (i) {
                    e.$element[0].offsetWidth
                }
                e.$element.addClass("in");
                i ? e.$element.one(t.support.transition.end, (function() {
                    e.$element.trigger("shown")
                }
                )) : e.$element.trigger("shown")
            }
            ))
        },
        hide: function(e) {
            e && e.preventDefault();
            var s = this;
            e = t.Event("hide");
            this.$element.trigger(e);
            if (!this.isShown || e.isDefaultPrevented())
                return;
            this.isShown = false;
            t("body").removeClass("modal-open");
            a.call(this);
            this.$element.removeClass("in");
            t.support.transition && this.$element.hasClass("fade") ? i.call(this) : n.call(this)
        }
    };
    function i() {
        var e = this
          , i = setTimeout((function() {
            e.$element.off(t.support.transition.end);
            n.call(e)
        }
        ), 500);
        this.$element.one(t.support.transition.end, (function() {
            clearTimeout(i);
            n.call(e)
        }
        ))
    }
    function n(t) {
        this.$element.hide().trigger("hidden");
        s.call(this)
    }
    function s(e) {
        var i = this
          , n = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var s = t.support.transition && n;
            this.$backdrop = t('<div class="modal-backdrop ' + n + '" />').appendTo(document.body);
            if (this.options.backdrop != "static") {
                this.$backdrop.click(t.proxy(this.hide, this))
            }
            if (s)
                this.$backdrop[0].offsetWidth;
            this.$backdrop.addClass("in");
            s ? this.$backdrop.one(t.support.transition.end, e) : e()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(t.support.transition.end, t.proxy(o, this)) : o.call(this)
        } else if (e) {
            e()
        }
    }
    function o() {
        this.$backdrop.remove();
        this.$backdrop = null
    }
    function a() {
        var e = this;
        if (this.isShown && this.options.keyboard) {
            t(document).on("keyup.dismiss.modal", (function(t) {
                t.which == 27 && e.hide()
            }
            ))
        } else if (!this.isShown) {
            t(document).off("keyup.dismiss.modal")
        }
    }
    t.fn.modal = function(i) {
        return this.each((function() {
            var n = t(this)
              , s = n.data("modal")
              , o = t.extend({}, t.fn.modal.defaults, n.data(), typeof i == "object" && i);
            if (!s)
                n.data("modal", s = new e(this,o));
            if (typeof i == "string")
                s[i]();
            else if (o.show)
                s.show()
        }
        ))
    }
    ;
    t.fn.modal.defaults = {
        backdrop: true,
        keyboard: true,
        show: true
    };
    t.fn.modal.Constructor = e;
    t((function() {
        t("body").on("click.modal.data-api", '[data-toggle="modal"]', (function(e) {
            var i = t(this), n, s = t(i.attr("data-target") || (n = i.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "")), o = s.data("modal") ? "toggle" : t.extend({}, s.data(), i.data());
            e.preventDefault();
            s.modal(o)
        }
        ))
    }
    ))
}(window.jQuery);
!function(t) {
    "use strict";
    var e = '[data-toggle="dropdown"]'
      , i = function(e) {
        var i = t(e).on("click.dropdown.data-api", this.toggle);
        t("html").on("click.dropdown.data-api", (function() {
            i.parent().removeClass("open")
        }
        ))
    };
    i.prototype = {
        constructor: i,
        toggle: function(e) {
            var i = t(this), s, o, a;
            if (i.is(".disabled, :disabled"))
                return;
            o = i.attr("data-target");
            if (!o) {
                o = i.attr("href");
                o = o && o.replace(/.*(?=#[^\s]*$)/, "")
            }
            s = t(o);
            s.length || (s = i.parent());
            a = s.hasClass("open");
            n();
            if (!a)
                s.toggleClass("open");
            return false
        }
    };
    function n() {
        t(e).parent().removeClass("open")
    }
    t.fn.dropdown = function(e) {
        return this.each((function() {
            var n = t(this)
              , s = n.data("dropdown");
            if (!s)
                n.data("dropdown", s = new i(this));
            if (typeof e == "string")
                s[e].call(n)
        }
        ))
    }
    ;
    t.fn.dropdown.Constructor = i;
    t((function() {
        t("html").on("click.dropdown.data-api", n);
        t("body").on("click.dropdown", ".dropdown form", (function(t) {
            t.stopPropagation()
        }
        )).on("click.dropdown.data-api", e, i.prototype.toggle)
    }
    ))
}(window.jQuery);
!function(t) {
    "use strict";
    function e(e, i) {
        var n = t.proxy(this.process, this), s = t(e).is("body") ? t(window) : t(e), o;
        this.options = t.extend({}, t.fn.scrollspy.defaults, i);
        this.$scrollElement = s.on("scroll.scroll.data-api", n);
        this.selector = (this.options.target || (o = t(e).attr("href")) && o.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a";
        this.$body = t("body");
        this.refresh();
        this.process()
    }
    e.prototype = {
        constructor: e,
        refresh: function() {
            var e = this, i;
            this.offsets = t([]);
            this.targets = t([]);
            i = this.$body.find(this.selector).map((function() {
                var e = t(this)
                  , i = e.data("target") || e.attr("href")
                  , n = /^#\w/.test(i) && t(i);
                return n && i.length && [[n.position().top, i]] || null
            }
            )).sort((function(t, e) {
                return t[0] - e[0]
            }
            )).each((function() {
                e.offsets.push(this[0]);
                e.targets.push(this[1])
            }
            ))
        },
        process: function() {
            var t = this.$scrollElement.scrollTop() + this.options.offset, e = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, i = e - this.$scrollElement.height(), n = this.offsets, s = this.targets, o = this.activeTarget, a;
            if (t >= i) {
                return o != (a = s.last()[0]) && this.activate(a)
            }
            for (a = n.length; a--; ) {
                o != s[a] && t >= n[a] && (!n[a + 1] || t <= n[a + 1]) && this.activate(s[a])
            }
        },
        activate: function(e) {
            var i, n;
            this.activeTarget = e;
            t(this.selector).parent(".active").removeClass("active");
            n = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]';
            i = t(n).parent("li").addClass("active");
            if (i.parent(".dropdown-menu")) {
                i = i.closest("li.dropdown").addClass("active")
            }
            i.trigger("activate")
        }
    };
    t.fn.scrollspy = function(i) {
        return this.each((function() {
            var n = t(this)
              , s = n.data("scrollspy")
              , o = typeof i == "object" && i;
            if (!s)
                n.data("scrollspy", s = new e(this,o));
            if (typeof i == "string")
                s[i]()
        }
        ))
    }
    ;
    t.fn.scrollspy.Constructor = e;
    t.fn.scrollspy.defaults = {
        offset: 10
    };
    t((function() {
        t('[data-spy="scroll"]').each((function() {
            var e = t(this);
            e.scrollspy(e.data())
        }
        ))
    }
    ))
}(window.jQuery);
!function(t) {
    "use strict";
    var e = function(e) {
        this.element = t(e)
    };
    e.prototype = {
        constructor: e,
        show: function() {
            var e = this.element, i = e.closest("ul:not(.dropdown-menu)"), n = e.attr("data-target"), s, o, a;
            if (!n) {
                n = e.attr("href");
                n = n && n.replace(/.*(?=#[^\s]*$)/, "")
            }
            if (e.parent("li").hasClass("active"))
                return;
            s = i.find(".active a").last()[0];
            a = t.Event("show", {
                relatedTarget: s
            });
            e.trigger(a);
            if (a.isDefaultPrevented())
                return;
            o = t(n);
            this.activate(e.parent("li"), i);
            this.activate(o, o.parent(), (function() {
                e.trigger({
                    type: "shown",
                    relatedTarget: s
                })
            }
            ))
        },
        activate: function(e, i, n) {
            var s = i.find("> .active")
              , o = n && t.support.transition && s.hasClass("fade");
            function a() {
                s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active");
                e.addClass("active");
                if (o) {
                    e[0].offsetWidth;
                    e.addClass("in")
                } else {
                    e.removeClass("fade")
                }
                if (e.parent(".dropdown-menu")) {
                    e.closest("li.dropdown").addClass("active")
                }
                n && n()
            }
            o ? s.one(t.support.transition.end, a) : a();
            s.removeClass("in")
        }
    };
    t.fn.tab = function(i) {
        return this.each((function() {
            var n = t(this)
              , s = n.data("tab");
            if (!s)
                n.data("tab", s = new e(this));
            if (typeof i == "string")
                s[i]()
        }
        ))
    }
    ;
    t.fn.tab.Constructor = e;
    t((function() {
        t("body").on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', (function(e) {
            e.preventDefault();
            t(this).tab("show")
        }
        ))
    }
    ))
}(window.jQuery);
!function(t) {
    "use strict";
    var e = function(t, e) {
        this.init("tooltip", t, e)
    };
    e.prototype = {
        constructor: e,
        init: function(e, i, n) {
            var s, o;
            this.type = e;
            this.$element = t(i);
            this.options = this.getOptions(n);
            this.enabled = true;
            if (this.options.trigger != "manual") {
                s = this.options.trigger == "hover" ? "mouseenter" : "focus";
                o = this.options.trigger == "hover" ? "mouseleave" : "blur";
                this.$element.on(s, this.options.selector, t.proxy(this.enter, this));
                this.$element.on(o, this.options.selector, t.proxy(this.leave, this))
            }
            this.options.selector ? this._options = t.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        },
        getOptions: function(e) {
            e = t.extend({}, t.fn[this.type].defaults, e, this.$element.data());
            if (e.delay && typeof e.delay == "number") {
                e.delay = {
                    show: e.delay,
                    hide: e.delay
                }
            }
            return e
        },
        enter: function(e) {
            var i = t(e.currentTarget)[this.type](this._options).data(this.type);
            if (!i.options.delay || !i.options.delay.show)
                return i.show();
            clearTimeout(this.timeout);
            i.hoverState = "in";
            this.timeout = setTimeout((function() {
                if (i.hoverState == "in")
                    i.show()
            }
            ), i.options.delay.show)
        },
        leave: function(e) {
            var i = t(e.currentTarget)[this.type](this._options).data(this.type);
            if (this.timeout)
                clearTimeout(this.timeout);
            if (!i.options.delay || !i.options.delay.hide)
                return i.hide();
            i.hoverState = "out";
            this.timeout = setTimeout((function() {
                if (i.hoverState == "out")
                    i.hide()
            }
            ), i.options.delay.hide)
        },
        show: function() {
            var t, e, i, n, s, o, a;
            if (this.hasContent() && this.enabled) {
                t = this.tip();
                this.setContent();
                if (this.options.animation) {
                    t.addClass("fade")
                }
                o = typeof this.options.placement == "function" ? this.options.placement.call(this, t[0], this.$element[0]) : this.options.placement;
                e = /in/.test(o);
                t.remove().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).appendTo(e ? this.$element : document.body);
                i = this.getPosition(e);
                n = t[0].offsetWidth;
                s = t[0].offsetHeight;
                switch (e ? o.split(" ")[1] : o) {
                case "bottom":
                    a = {
                        top: i.top + i.height,
                        left: i.left + i.width / 2 - n / 2
                    };
                    break;
                case "top":
                    a = {
                        top: i.top - s,
                        left: i.left + i.width / 2 - n / 2
                    };
                    break;
                case "left":
                    a = {
                        top: i.top + i.height / 2 - s / 2,
                        left: i.left - n
                    };
                    break;
                case "right":
                    a = {
                        top: i.top + i.height / 2 - s / 2,
                        left: i.left + i.width
                    };
                    break
                }
                t.css(a).addClass(o).addClass("in")
            }
        },
        isHTML: function(t) {
            return typeof t != "string" || t.charAt(0) === "<" && t.charAt(t.length - 1) === ">" && t.length >= 3 || /^(?:[^<]*<[\w\W]+>[^>]*$)/.exec(t)
        },
        setContent: function() {
            var t = this.tip()
              , e = this.getTitle();
            t.find(".tooltip-inner")[this.isHTML(e) ? "html" : "text"](e);
            t.removeClass("fade in top bottom left right")
        },
        hide: function() {
            var e = this
              , i = this.tip();
            i.removeClass("in");
            function n() {
                var e = setTimeout((function() {
                    i.off(t.support.transition.end).remove()
                }
                ), 500);
                i.one(t.support.transition.end, (function() {
                    clearTimeout(e);
                    i.remove()
                }
                ))
            }
            t.support.transition && this.$tip.hasClass("fade") ? n() : i.remove()
        },
        fixTitle: function() {
            var t = this.$element;
            if (t.attr("title") || typeof t.attr("data-original-title") != "string") {
                t.attr("data-original-title", t.attr("title") || "").removeAttr("title")
            }
        },
        hasContent: function() {
            return this.getTitle()
        },
        getPosition: function(e) {
            return t.extend({}, e ? {
                top: 0,
                left: 0
            } : this.$element.offset(), {
                width: this.$element[0].offsetWidth,
                height: this.$element[0].offsetHeight
            })
        },
        getTitle: function() {
            var t, e = this.$element, i = this.options;
            t = e.attr("data-original-title") || (typeof i.title == "function" ? i.title.call(e[0]) : i.title);
            return t
        },
        tip: function() {
            return this.$tip = this.$tip || t(this.options.template)
        },
        validate: function() {
            if (!this.$element[0].parentNode) {
                this.hide();
                this.$element = null;
                this.options = null
            }
        },
        enable: function() {
            this.enabled = true
        },
        disable: function() {
            this.enabled = false
        },
        toggleEnabled: function() {
            this.enabled = !this.enabled
        },
        toggle: function() {
            this[this.tip().hasClass("in") ? "hide" : "show"]()
        }
    };
    t.fn.tooltip = function(i) {
        return this.each((function() {
            var n = t(this)
              , s = n.data("tooltip")
              , o = typeof i == "object" && i;
            if (!s)
                n.data("tooltip", s = new e(this,o));
            if (typeof i == "string")
                s[i]()
        }
        ))
    }
    ;
    t.fn.tooltip.Constructor = e;
    t.fn.tooltip.defaults = {
        animation: true,
        placement: "top",
        selector: false,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover",
        title: "",
        delay: 0
    }
}(window.jQuery);
!function(t) {
    "use strict";
    var e = function(t, e) {
        this.init("popover", t, e)
    };
    e.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype, {
        constructor: e,
        setContent: function() {
            var t = this.tip()
              , e = this.getTitle()
              , i = this.getContent();
            t.find(".popover-title")[this.isHTML(e) ? "html" : "text"](e);
            t.find(".popover-content > *")[this.isHTML(i) ? "html" : "text"](i);
            t.removeClass("fade top bottom left right in")
        },
        hasContent: function() {
            return this.getTitle() || this.getContent()
        },
        getContent: function() {
            var t, e = this.$element, i = this.options;
            t = e.attr("data-content") || (typeof i.content == "function" ? i.content.call(e[0]) : i.content);
            return t
        },
        tip: function() {
            if (!this.$tip) {
                this.$tip = t(this.options.template)
            }
            return this.$tip
        }
    });
    t.fn.popover = function(i) {
        return this.each((function() {
            var n = t(this)
              , s = n.data("popover")
              , o = typeof i == "object" && i;
            if (!s)
                n.data("popover", s = new e(this,o));
            if (typeof i == "string")
                s[i]()
        }
        ))
    }
    ;
    t.fn.popover.Constructor = e;
    t.fn.popover.defaults = t.extend({}, t.fn.tooltip.defaults, {
        placement: "right",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
    })
}(window.jQuery);
!function(t) {
    "use strict";
    var e = '[data-dismiss="alert"]'
      , i = function(i) {
        t(i).on("click", e, this.close)
    };
    i.prototype.close = function(e) {
        var i = t(this), n = i.attr("data-target"), s;
        if (!n) {
            n = i.attr("href");
            n = n && n.replace(/.*(?=#[^\s]*$)/, "")
        }
        s = t(n);
        e && e.preventDefault();
        s.length || (s = i.hasClass("alert") ? i : i.parent());
        s.trigger(e = t.Event("close"));
        if (e.isDefaultPrevented())
            return;
        s.removeClass("in");
        function o() {
            s.trigger("closed").remove()
        }
        t.support.transition && s.hasClass("fade") ? s.on(t.support.transition.end, o) : o()
    }
    ;
    t.fn.alert = function(e) {
        return this.each((function() {
            var n = t(this)
              , s = n.data("alert");
            if (!s)
                n.data("alert", s = new i(this));
            if (typeof e == "string")
                s[e].call(n)
        }
        ))
    }
    ;
    t.fn.alert.Constructor = i;
    t((function() {
        t("body").on("click.alert.data-api", e, i.prototype.close)
    }
    ))
}(window.jQuery);
!function(t) {
    "use strict";
    var e = function(e, i) {
        this.$element = t(e);
        this.options = t.extend({}, t.fn.button.defaults, i)
    };
    e.prototype.setState = function(t) {
        var e = "disabled"
          , i = this.$element
          , n = i.data()
          , s = i.is("input") ? "val" : "html";
        t = t + "Text";
        n.resetText || i.data("resetText", i[s]());
        i[s](n[t] || this.options[t]);
        setTimeout((function() {
            t == "loadingText" ? i.addClass(e).attr(e, e) : i.removeClass(e).removeAttr(e)
        }
        ), 0)
    }
    ;
    e.prototype.toggle = function() {
        var t = this.$element.parent('[data-toggle="buttons-radio"]');
        t && t.find(".active").removeClass("active");
        this.$element.toggleClass("active")
    }
    ;
    t.fn.button = function(i) {
        return this.each((function() {
            var n = t(this)
              , s = n.data("button")
              , o = typeof i == "object" && i;
            if (!s)
                n.data("button", s = new e(this,o));
            if (i == "toggle")
                s.toggle();
            else if (i)
                s.setState(i)
        }
        ))
    }
    ;
    t.fn.button.defaults = {
        loadingText: "loading..."
    };
    t.fn.button.Constructor = e;
    t((function() {
        t("body").on("click.button.data-api", "[data-toggle^=button]", (function(e) {
            var i = t(e.target);
            if (!i.hasClass("btn"))
                i = i.closest(".btn");
            i.button("toggle")
        }
        ))
    }
    ))
}(window.jQuery);
!function(t) {
    "use strict";
    var e = function(e, i) {
        this.$element = t(e);
        this.options = t.extend({}, t.fn.collapse.defaults, i);
        if (this.options.parent) {
            this.$parent = t(this.options.parent)
        }
        this.options.toggle && this.toggle()
    };
    e.prototype = {
        constructor: e,
        dimension: function() {
            var t = this.$element.hasClass("width");
            return t ? "width" : "height"
        },
        show: function() {
            var e, i, n, s;
            if (this.transitioning)
                return;
            e = this.dimension();
            i = t.camelCase(["scroll", e].join("-"));
            n = this.$parent && this.$parent.find("> .accordion-group > .in");
            if (n && n.length) {
                s = n.data("collapse");
                if (s && s.transitioning)
                    return;
                n.collapse("hide");
                s || n.data("collapse", null)
            }
            this.$element[e](0);
            this.transition("addClass", t.Event("show"), "shown");
            this.$element[e](this.$element[0][i])
        },
        hide: function() {
            var e;
            if (this.transitioning)
                return;
            e = this.dimension();
            this.reset(this.$element[e]());
            this.transition("removeClass", t.Event("hide"), "hidden");
            this.$element[e](0)
        },
        reset: function(t) {
            var e = this.dimension();
            this.$element.removeClass("collapse")[e](t || "auto")[0].offsetWidth;
            this.$element[t !== null ? "addClass" : "removeClass"]("collapse");
            return this
        },
        transition: function(e, i, n) {
            var s = this
              , o = function() {
                if (i.type == "show")
                    s.reset();
                s.transitioning = 0;
                s.$element.trigger(n)
            };
            this.$element.trigger(i);
            if (i.isDefaultPrevented())
                return;
            this.transitioning = 1;
            this.$element[e]("in");
            t.support.transition && this.$element.hasClass("collapse") ? this.$element.one(t.support.transition.end, o) : o()
        },
        toggle: function() {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }
    };
    t.fn.collapse = function(i) {
        return this.each((function() {
            var n = t(this)
              , s = n.data("collapse")
              , o = typeof i == "object" && i;
            if (!s)
                n.data("collapse", s = new e(this,o));
            if (typeof i == "string")
                s[i]()
        }
        ))
    }
    ;
    t.fn.collapse.defaults = {
        toggle: true
    };
    t.fn.collapse.Constructor = e;
    t((function() {
        t("body").on("click.collapse.data-api", "[data-toggle=collapse]", (function(e) {
            var i = t(this), n, s = i.attr("data-target") || e.preventDefault() || (n = i.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""), o = t(s).data("collapse") ? "toggle" : i.data();
            t(s).collapse(o)
        }
        ))
    }
    ))
}(window.jQuery);
!function(t) {
    "use strict";
    var e = function(e, i) {
        this.$element = t(e);
        this.options = i;
        this.options.slide && this.slide(this.options.slide);
        this.options.pause == "hover" && this.$element.on("mouseenter", t.proxy(this.pause, this)).on("mouseleave", t.proxy(this.cycle, this))
    };
    e.prototype = {
        cycle: function(e) {
            if (!e)
                this.paused = false;
            this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval));
            return this
        },
        to: function(e) {
            var i = this.$element.find(".active")
              , n = i.parent().children()
              , s = n.index(i)
              , o = this;
            if (e > n.length - 1 || e < 0)
                return;
            if (this.sliding) {
                return this.$element.one("slid", (function() {
                    o.to(e)
                }
                ))
            }
            if (s == e) {
                return this.pause().cycle()
            }
            return this.slide(e > s ? "next" : "prev", t(n[e]))
        },
        pause: function(t) {
            if (!t)
                this.paused = true;
            clearInterval(this.interval);
            this.interval = null;
            return this
        },
        next: function() {
            if (this.sliding)
                return;
            return this.slide("next")
        },
        prev: function() {
            if (this.sliding)
                return;
            return this.slide("prev")
        },
        slide: function(e, i) {
            var n = this.$element.find(".active")
              , s = i || n[e]()
              , o = this.interval
              , a = e == "next" ? "left" : "right"
              , r = e == "next" ? "first" : "last"
              , l = this
              , h = t.Event("slide");
            this.sliding = true;
            o && this.pause();
            s = s.length ? s : this.$element.find(".item")[r]();
            if (s.hasClass("active"))
                return;
            if (t.support.transition && this.$element.hasClass("slide")) {
                this.$element.trigger(h);
                if (h.isDefaultPrevented())
                    return;
                s.addClass(e);
                s[0].offsetWidth;
                n.addClass(a);
                s.addClass(a);
                this.$element.one(t.support.transition.end, (function() {
                    s.removeClass([e, a].join(" ")).addClass("active");
                    n.removeClass(["active", a].join(" "));
                    l.sliding = false;
                    setTimeout((function() {
                        l.$element.trigger("slid")
                    }
                    ), 0)
                }
                ))
            } else {
                this.$element.trigger(h);
                if (h.isDefaultPrevented())
                    return;
                n.removeClass("active");
                s.addClass("active");
                this.sliding = false;
                this.$element.trigger("slid")
            }
            o && this.cycle();
            return this
        }
    };
    t.fn.carousel = function(i) {
        return this.each((function() {
            var n = t(this)
              , s = n.data("carousel")
              , o = t.extend({}, t.fn.carousel.defaults, typeof i == "object" && i);
            if (!s)
                n.data("carousel", s = new e(this,o));
            if (typeof i == "number")
                s.to(i);
            else if (typeof i == "string" || (i = o.slide))
                s[i]();
            else if (o.interval)
                s.cycle()
        }
        ))
    }
    ;
    t.fn.carousel.defaults = {
        interval: 5e3,
        pause: "hover"
    };
    t.fn.carousel.Constructor = e;
    t((function() {
        t("body").on("click.carousel.data-api", "[data-slide]", (function(e) {
            var i = t(this), n, s = t(i.attr("data-target") || (n = i.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "")), o = !s.data("modal") && t.extend({}, s.data(), i.data());
            s.carousel(o);
            e.preventDefault()
        }
        ))
    }
    ))
}(window.jQuery);
/*!
 * Datepicker for Bootstrap v1.6.1 (https://github.com/eternicode/bootstrap-datepicker)
 *
 * Copyright 2012 Stefan Petre
 * Improvements by Andrew Rowls
 * Licensed under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 */
(function(t) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], t)
    } else if (typeof exports === "object") {
        t(require("jquery"))
    } else {
        t(jQuery)
    }
}
)((function(t, e) {
    function i() {
        return new Date(Date.UTC.apply(Date, arguments))
    }
    function a() {
        var t = new Date;
        return i(t.getFullYear(), t.getMonth(), t.getDate())
    }
    function s(t, e) {
        return t.getUTCFullYear() === e.getUTCFullYear() && t.getUTCMonth() === e.getUTCMonth() && t.getUTCDate() === e.getUTCDate()
    }
    function n(t) {
        return function() {
            return this[t].apply(this, arguments)
        }
    }
    function r(t) {
        return t && !isNaN(t.getTime())
    }
    var o = function() {
        var e = {
            get: function(t) {
                return this.slice(t)[0]
            },
            contains: function(t) {
                var e = t && t.valueOf();
                for (var i = 0, a = this.length; i < a; i++)
                    if (this[i].valueOf() === e)
                        return i;
                return -1
            },
            remove: function(t) {
                this.splice(t, 1)
            },
            replace: function(e) {
                if (!e)
                    return;
                if (!t.isArray(e))
                    e = [e];
                this.clear();
                this.push.apply(this, e)
            },
            clear: function() {
                this.length = 0
            },
            copy: function() {
                var t = new o;
                t.replace(this);
                return t
            }
        };
        return function() {
            var i = [];
            i.push.apply(i, arguments);
            t.extend(i, e);
            return i
        }
    }();
    var h = function(e, i) {
        t(e).data("datepicker", this);
        this._process_options(i);
        this.dates = new o;
        this.viewDate = this.o.defaultViewDate;
        this.focusDate = null;
        this.element = t(e);
        this.isInput = this.element.is("input");
        this.inputField = this.isInput ? this.element : this.element.find("input");
        this.component = this.element.hasClass("date") ? this.element.find(".add-on, .input-group-addon, .btn") : false;
        this.hasInput = this.component && this.inputField.length;
        if (this.component && this.component.length === 0)
            this.component = false;
        this.isInline = !this.component && this.element.is("div");
        this.picker = t(v.template);
        if (this._check_template(this.o.templates.leftArrow)) {
            this.picker.find(".prev").html(this.o.templates.leftArrow)
        }
        if (this._check_template(this.o.templates.rightArrow)) {
            this.picker.find(".next").html(this.o.templates.rightArrow)
        }
        this._buildEvents();
        this._attachEvents();
        if (this.isInline) {
            this.picker.addClass("datepicker-inline").appendTo(this.element)
        } else {
            this.picker.addClass("datepicker-dropdown dropdown-menu")
        }
        if (this.o.rtl) {
            this.picker.addClass("datepicker-rtl")
        }
        this.viewMode = this.o.startView;
        if (this.o.calendarWeeks)
            this.picker.find("thead .datepicker-title, tfoot .today, tfoot .clear").attr("colspan", (function(t, e) {
                return parseInt(e) + 1
            }
            ));
        this._allow_update = false;
        this.setStartDate(this._o.startDate);
        this.setEndDate(this._o.endDate);
        this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);
        this.setDaysOfWeekHighlighted(this.o.daysOfWeekHighlighted);
        this.setDatesDisabled(this.o.datesDisabled);
        this.fillDow();
        this.fillMonths();
        this._allow_update = true;
        this.update();
        this.showMode();
        if (this.isInline) {
            this.show()
        }
    };
    h.prototype = {
        constructor: h,
        _resolveViewName: function(t, i) {
            if (t === 0 || t === "days" || t === "month") {
                return 0
            }
            if (t === 1 || t === "months" || t === "year") {
                return 1
            }
            if (t === 2 || t === "years" || t === "decade") {
                return 2
            }
            if (t === 3 || t === "decades" || t === "century") {
                return 3
            }
            if (t === 4 || t === "centuries" || t === "millennium") {
                return 4
            }
            return i === e ? false : i
        },
        _check_template: function(i) {
            try {
                if (i === e || i === "") {
                    return false
                }
                if ((i.match(/[<>]/g) || []).length <= 0) {
                    return true
                }
                var a = t(i);
                return a.length > 0
            } catch (t) {
                return false
            }
        },
        _process_options: function(e) {
            this._o = t.extend({}, this._o, e);
            var s = this.o = t.extend({}, this._o);
            var n = s.language;
            if (!D[n]) {
                n = n.split("-")[0];
                if (!D[n])
                    n = p.language
            }
            s.language = n;
            s.startView = this._resolveViewName(s.startView, 0);
            s.minViewMode = this._resolveViewName(s.minViewMode, 0);
            s.maxViewMode = this._resolveViewName(s.maxViewMode, 4);
            s.startView = Math.min(s.startView, s.maxViewMode);
            s.startView = Math.max(s.startView, s.minViewMode);
            if (s.multidate !== true) {
                s.multidate = Number(s.multidate) || false;
                if (s.multidate !== false)
                    s.multidate = Math.max(0, s.multidate)
            }
            s.multidateSeparator = String(s.multidateSeparator);
            s.weekStart %= 7;
            s.weekEnd = (s.weekStart + 6) % 7;
            var r = v.parseFormat(s.format);
            if (s.startDate !== -Infinity) {
                if (!!s.startDate) {
                    if (s.startDate instanceof Date)
                        s.startDate = this._local_to_utc(this._zero_time(s.startDate));
                    else
                        s.startDate = v.parseDate(s.startDate, r, s.language, s.assumeNearbyYear)
                } else {
                    s.startDate = -Infinity
                }
            }
            if (s.endDate !== Infinity) {
                if (!!s.endDate) {
                    if (s.endDate instanceof Date)
                        s.endDate = this._local_to_utc(this._zero_time(s.endDate));
                    else
                        s.endDate = v.parseDate(s.endDate, r, s.language, s.assumeNearbyYear)
                } else {
                    s.endDate = Infinity
                }
            }
            s.daysOfWeekDisabled = s.daysOfWeekDisabled || [];
            if (!t.isArray(s.daysOfWeekDisabled))
                s.daysOfWeekDisabled = s.daysOfWeekDisabled.split(/[,\s]*/);
            s.daysOfWeekDisabled = t.map(s.daysOfWeekDisabled, (function(t) {
                return parseInt(t, 10)
            }
            ));
            s.daysOfWeekHighlighted = s.daysOfWeekHighlighted || [];
            if (!t.isArray(s.daysOfWeekHighlighted))
                s.daysOfWeekHighlighted = s.daysOfWeekHighlighted.split(/[,\s]*/);
            s.daysOfWeekHighlighted = t.map(s.daysOfWeekHighlighted, (function(t) {
                return parseInt(t, 10)
            }
            ));
            s.datesDisabled = s.datesDisabled || [];
            if (!t.isArray(s.datesDisabled)) {
                s.datesDisabled = [s.datesDisabled]
            }
            s.datesDisabled = t.map(s.datesDisabled, (function(t) {
                return v.parseDate(t, r, s.language, s.assumeNearbyYear)
            }
            ));
            var o = String(s.orientation).toLowerCase().split(/\s+/g)
              , h = s.orientation.toLowerCase();
            o = t.grep(o, (function(t) {
                return /^auto|left|right|top|bottom$/.test(t)
            }
            ));
            s.orientation = {
                x: "auto",
                y: "auto"
            };
            if (!h || h === "auto")
                ;
            else if (o.length === 1) {
                switch (o[0]) {
                case "top":
                case "bottom":
                    s.orientation.y = o[0];
                    break;
                case "left":
                case "right":
                    s.orientation.x = o[0];
                    break
                }
            } else {
                h = t.grep(o, (function(t) {
                    return /^left|right$/.test(t)
                }
                ));
                s.orientation.x = h[0] || "auto";
                h = t.grep(o, (function(t) {
                    return /^top|bottom$/.test(t)
                }
                ));
                s.orientation.y = h[0] || "auto"
            }
            if (s.defaultViewDate) {
                var l = s.defaultViewDate.year || (new Date).getFullYear();
                var d = s.defaultViewDate.month || 0;
                var f = s.defaultViewDate.day || 1;
                s.defaultViewDate = i(l, d, f)
            } else {
                s.defaultViewDate = a()
            }
        },
        _events: [],
        _secondaryEvents: [],
        _applyEvents: function(t) {
            for (var i = 0, a, s, n; i < t.length; i++) {
                a = t[i][0];
                if (t[i].length === 2) {
                    s = e;
                    n = t[i][1]
                } else if (t[i].length === 3) {
                    s = t[i][1];
                    n = t[i][2]
                }
                a.on(n, s)
            }
        },
        _unapplyEvents: function(t) {
            for (var i = 0, a, s, n; i < t.length; i++) {
                a = t[i][0];
                if (t[i].length === 2) {
                    n = e;
                    s = t[i][1]
                } else if (t[i].length === 3) {
                    n = t[i][1];
                    s = t[i][2]
                }
                a.off(s, n)
            }
        },
        _buildEvents: function() {
            var e = {
                keyup: t.proxy((function(e) {
                    if (t.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) === -1)
                        this.update()
                }
                ), this),
                keydown: t.proxy(this.keydown, this),
                paste: t.proxy(this.paste, this)
            };
            if (this.o.showOnFocus === true) {
                e.focus = t.proxy(this.show, this)
            }
            if (this.isInput) {
                this._events = [[this.element, e]]
            } else if (this.component && this.hasInput) {
                this._events = [[this.inputField, e], [this.component, {
                    click: t.proxy(this.show, this)
                }]]
            } else {
                this._events = [[this.element, {
                    click: t.proxy(this.show, this),
                    keydown: t.proxy(this.keydown, this)
                }]]
            }
            this._events.push([this.element, "*", {
                blur: t.proxy((function(t) {
                    this._focused_from = t.target
                }
                ), this)
            }], [this.element, {
                blur: t.proxy((function(t) {
                    this._focused_from = t.target
                }
                ), this)
            }]);
            if (this.o.immediateUpdates) {
                this._events.push([this.element, {
                    "changeYear changeMonth": t.proxy((function(t) {
                        this.update(t.date)
                    }
                    ), this)
                }])
            }
            this._secondaryEvents = [[this.picker, {
                click: t.proxy(this.click, this)
            }], [t(window), {
                resize: t.proxy(this.place, this)
            }], [t(document), {
                mousedown: t.proxy((function(t) {
                    if (!(this.element.is(t.target) || this.element.find(t.target).length || this.picker.is(t.target) || this.picker.find(t.target).length || this.isInline)) {
                        this.hide()
                    }
                }
                ), this)
            }]]
        },
        _attachEvents: function() {
            this._detachEvents();
            this._applyEvents(this._events)
        },
        _detachEvents: function() {
            this._unapplyEvents(this._events)
        },
        _attachSecondaryEvents: function() {
            this._detachSecondaryEvents();
            this._applyEvents(this._secondaryEvents)
        },
        _detachSecondaryEvents: function() {
            this._unapplyEvents(this._secondaryEvents)
        },
        _trigger: function(e, i) {
            var a = i || this.dates.get(-1)
              , s = this._utc_to_local(a);
            this.element.trigger({
                type: e,
                date: s,
                dates: t.map(this.dates, this._utc_to_local),
                format: t.proxy((function(t, e) {
                    if (arguments.length === 0) {
                        t = this.dates.length - 1;
                        e = this.o.format
                    } else if (typeof t === "string") {
                        e = t;
                        t = this.dates.length - 1
                    }
                    e = e || this.o.format;
                    var i = this.dates.get(t);
                    return v.formatDate(i, e, this.o.language)
                }
                ), this)
            })
        },
        show: function() {
            if (this.inputField.prop("disabled") || this.inputField.prop("readonly") && this.o.enableOnReadonly === false)
                return;
            if (!this.isInline)
                this.picker.appendTo(this.o.container);
            this.place();
            this.picker.show();
            this._attachSecondaryEvents();
            this._trigger("show");
            if ((window.navigator.msMaxTouchPoints || "ontouchstart"in document) && this.o.disableTouchKeyboard) {
                t(this.element).blur()
            }
            return this
        },
        hide: function() {
            if (this.isInline || !this.picker.is(":visible"))
                return this;
            this.focusDate = null;
            this.picker.hide().detach();
            this._detachSecondaryEvents();
            this.viewMode = this.o.startView;
            this.showMode();
            if (this.o.forceParse && this.inputField.val())
                this.setValue();
            this._trigger("hide");
            return this
        },
        destroy: function() {
            this.hide();
            this._detachEvents();
            this._detachSecondaryEvents();
            this.picker.remove();
            delete this.element.data().datepicker;
            if (!this.isInput) {
                delete this.element.data().date
            }
            return this
        },
        paste: function(e) {
            var i;
            if (e.originalEvent.clipboardData && e.originalEvent.clipboardData.types && t.inArray("text/plain", e.originalEvent.clipboardData.types) !== -1) {
                i = e.originalEvent.clipboardData.getData("text/plain")
            } else if (window.clipboardData) {
                i = window.clipboardData.getData("Text")
            } else {
                return
            }
            this.setDate(i);
            this.update();
            e.preventDefault()
        },
        _utc_to_local: function(t) {
            return t && new Date(t.getTime() + t.getTimezoneOffset() * 6e4)
        },
        _local_to_utc: function(t) {
            return t && new Date(t.getTime() - t.getTimezoneOffset() * 6e4)
        },
        _zero_time: function(t) {
            return t && new Date(t.getFullYear(),t.getMonth(),t.getDate())
        },
        _zero_utc_time: function(t) {
            return t && new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()))
        },
        getDates: function() {
            return t.map(this.dates, this._utc_to_local)
        },
        getUTCDates: function() {
            return t.map(this.dates, (function(t) {
                return new Date(t)
            }
            ))
        },
        getDate: function() {
            return this._utc_to_local(this.getUTCDate())
        },
        getUTCDate: function() {
            var t = this.dates.get(-1);
            if (typeof t !== "undefined") {
                return new Date(t)
            } else {
                return null
            }
        },
        clearDates: function() {
            if (this.inputField) {
                this.inputField.val("")
            }
            this.update();
            this._trigger("changeDate");
            if (this.o.autoclose) {
                this.hide()
            }
        },
        setDates: function() {
            var e = t.isArray(arguments[0]) ? arguments[0] : arguments;
            this.update.apply(this, e);
            this._trigger("changeDate");
            this.setValue();
            return this
        },
        setUTCDates: function() {
            var e = t.isArray(arguments[0]) ? arguments[0] : arguments;
            this.update.apply(this, t.map(e, this._utc_to_local));
            this._trigger("changeDate");
            this.setValue();
            return this
        },
        setDate: n("setDates"),
        setUTCDate: n("setUTCDates"),
        remove: n("destroy"),
        setValue: function() {
            var t = this.getFormattedDate();
            this.inputField.val(t);
            return this
        },
        getFormattedDate: function(i) {
            if (i === e)
                i = this.o.format;
            var a = this.o.language;
            return t.map(this.dates, (function(t) {
                return v.formatDate(t, i, a)
            }
            )).join(this.o.multidateSeparator)
        },
        getStartDate: function() {
            return this.o.startDate
        },
        setStartDate: function(t) {
            this._process_options({
                startDate: t
            });
            this.update();
            this.updateNavArrows();
            return this
        },
        getEndDate: function() {
            return this.o.endDate
        },
        setEndDate: function(t) {
            this._process_options({
                endDate: t
            });
            this.update();
            this.updateNavArrows();
            return this
        },
        setDaysOfWeekDisabled: function(t) {
            this._process_options({
                daysOfWeekDisabled: t
            });
            this.update();
            this.updateNavArrows();
            return this
        },
        setDaysOfWeekHighlighted: function(t) {
            this._process_options({
                daysOfWeekHighlighted: t
            });
            this.update();
            return this
        },
        setDatesDisabled: function(t) {
            this._process_options({
                datesDisabled: t
            });
            this.update();
            this.updateNavArrows()
        },
        place: function() {
            if (this.isInline)
                return this;
            var e = this.picker.outerWidth()
              , i = this.picker.outerHeight()
              , a = 10
              , s = t(this.o.container)
              , n = s.width()
              , r = this.o.container === "body" ? t(document).scrollTop() : s.scrollTop()
              , o = s.offset();
            var h = [];
            this.element.parents().each((function() {
                var e = t(this).css("z-index");
                if (e !== "auto" && e !== 0)
                    h.push(parseInt(e))
            }
            ));
            var l = Math.max.apply(Math, h) + this.o.zIndexOffset;
            var d = this.component ? this.component.parent().offset() : this.element.offset();
            var f = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
            var u = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
            var c = d.left - o.left
              , p = d.top - o.top;
            if (this.o.container !== "body") {
                p += r
            }
            this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom " + "datepicker-orient-right datepicker-orient-left");
            if (this.o.orientation.x !== "auto") {
                this.picker.addClass("datepicker-orient-" + this.o.orientation.x);
                if (this.o.orientation.x === "right")
                    c -= e - u
            } else {
                if (d.left < 0) {
                    this.picker.addClass("datepicker-orient-left");
                    c -= d.left - a
                } else if (c + e > n) {
                    this.picker.addClass("datepicker-orient-right");
                    c += u - e
                } else {
                    this.picker.addClass("datepicker-orient-left")
                }
            }
            var g = this.o.orientation.y, D;
            if (g === "auto") {
                D = -r + p - i;
                g = D < 0 ? "bottom" : "top"
            }
            this.picker.addClass("datepicker-orient-" + g);
            if (g === "top")
                p -= i + parseInt(this.picker.css("padding-top"));
            else
                p += f;
            if (this.o.rtl) {
                var v = n - (c + u);
                this.picker.css({
                    top: p,
                    right: v,
                    zIndex: l
                })
            } else {
                this.picker.css({
                    top: p,
                    left: c,
                    zIndex: l
                })
            }
            return this
        },
        _allow_update: true,
        update: function() {
            if (!this._allow_update)
                return this;
            var e = this.dates.copy()
              , i = []
              , a = false;
            if (arguments.length) {
                t.each(arguments, t.proxy((function(t, e) {
                    if (e instanceof Date)
                        e = this._local_to_utc(e);
                    i.push(e)
                }
                ), this));
                a = true
            } else {
                i = this.isInput ? this.element.val() : this.element.data("date") || this.inputField.val();
                if (i && this.o.multidate)
                    i = i.split(this.o.multidateSeparator);
                else
                    i = [i];
                delete this.element.data().date
            }
            i = t.map(i, t.proxy((function(t) {
                return v.parseDate(t, this.o.format, this.o.language, this.o.assumeNearbyYear)
            }
            ), this));
            i = t.grep(i, t.proxy((function(t) {
                return !this.dateWithinRange(t) || !t
            }
            ), this), true);
            this.dates.replace(i);
            if (this.dates.length)
                this.viewDate = new Date(this.dates.get(-1));
            else if (this.viewDate < this.o.startDate)
                this.viewDate = new Date(this.o.startDate);
            else if (this.viewDate > this.o.endDate)
                this.viewDate = new Date(this.o.endDate);
            else
                this.viewDate = this.o.defaultViewDate;
            if (a) {
                this.setValue()
            } else if (i.length) {
                if (String(e) !== String(this.dates))
                    this._trigger("changeDate")
            }
            if (!this.dates.length && e.length)
                this._trigger("clearDate");
            this.fill();
            this.element.change();
            return this
        },
        fillDow: function() {
            var e = this.o.weekStart
              , i = "<tr>";
            if (this.o.calendarWeeks) {
                this.picker.find(".datepicker-days .datepicker-switch").attr("colspan", (function(t, e) {
                    return parseInt(e) + 1
                }
                ));
                i += '<th class="cw">&#160;</th>'
            }
            while (e < this.o.weekStart + 7) {
                i += '<th class="dow';
                if (t.inArray(e, this.o.daysOfWeekDisabled) > -1)
                    i += " disabled";
                i += '">' + D[this.o.language].daysMin[e++ % 7] + "</th>"
            }
            i += "</tr>";
            this.picker.find(".datepicker-days thead").append(i)
        },
        fillMonths: function() {
            var t = this._utc_to_local(this.viewDate);
            var e = ""
              , i = 0;
            while (i < 12) {
                var a = t && t.getMonth() === i ? " focused" : "";
                e += '<span class="month' + a + '">' + D[this.o.language].monthsShort[i++] + "</span>"
            }
            this.picker.find(".datepicker-months td").html(e)
        },
        setRange: function(e) {
            if (!e || !e.length)
                delete this.range;
            else
                this.range = t.map(e, (function(t) {
                    return t.valueOf()
                }
                ));
            this.fill()
        },
        getClassNames: function(e) {
            var i = []
              , a = this.viewDate.getUTCFullYear()
              , s = this.viewDate.getUTCMonth()
              , n = new Date;
            if (e.getUTCFullYear() < a || e.getUTCFullYear() === a && e.getUTCMonth() < s) {
                i.push("old")
            } else if (e.getUTCFullYear() > a || e.getUTCFullYear() === a && e.getUTCMonth() > s) {
                i.push("new")
            }
            if (this.focusDate && e.valueOf() === this.focusDate.valueOf())
                i.push("focused");
            if (this.o.todayHighlight && e.getUTCFullYear() === n.getFullYear() && e.getUTCMonth() === n.getMonth() && e.getUTCDate() === n.getDate()) {
                i.push("today")
            }
            if (this.dates.contains(e) !== -1)
                i.push("active");
            if (!this.dateWithinRange(e)) {
                i.push("disabled")
            }
            if (this.dateIsDisabled(e)) {
                i.push("disabled", "disabled-date")
            }
            if (t.inArray(e.getUTCDay(), this.o.daysOfWeekHighlighted) !== -1) {
                i.push("highlighted")
            }
            if (this.range) {
                if (e > this.range[0] && e < this.range[this.range.length - 1]) {
                    i.push("range")
                }
                if (t.inArray(e.valueOf(), this.range) !== -1) {
                    i.push("selected")
                }
                if (e.valueOf() === this.range[0]) {
                    i.push("range-start")
                }
                if (e.valueOf() === this.range[this.range.length - 1]) {
                    i.push("range-end")
                }
            }
            return i
        },
        _fill_yearsView: function(i, a, s, n, r, o, h, l) {
            var d, f, u, c, p, g, D, v, y, m, w;
            d = "";
            f = this.picker.find(i);
            u = parseInt(r / s, 10) * s;
            p = parseInt(o / n, 10) * n;
            g = parseInt(h / n, 10) * n;
            c = t.map(this.dates, (function(t) {
                return parseInt(t.getUTCFullYear() / n, 10) * n
            }
            ));
            f.find(".datepicker-switch").text(u + "-" + (u + n * 9));
            D = u - n;
            for (v = -1; v < 11; v += 1) {
                y = [a];
                m = null;
                if (v === -1) {
                    y.push("old")
                } else if (v === 10) {
                    y.push("new")
                }
                if (t.inArray(D, c) !== -1) {
                    y.push("active")
                }
                if (D < p || D > g) {
                    y.push("disabled")
                }
                if (D === this.viewDate.getFullYear()) {
                    y.push("focused")
                }
                if (l !== t.noop) {
                    w = l(new Date(D,0,1));
                    if (w === e) {
                        w = {}
                    } else if (typeof w === "boolean") {
                        w = {
                            enabled: w
                        }
                    } else if (typeof w === "string") {
                        w = {
                            classes: w
                        }
                    }
                    if (w.enabled === false) {
                        y.push("disabled")
                    }
                    if (w.classes) {
                        y = y.concat(w.classes.split(/\s+/))
                    }
                    if (w.tooltip) {
                        m = w.tooltip
                    }
                }
                d += '<span class="' + y.join(" ") + '"' + (m ? ' title="' + m + '"' : "") + ">" + D + "</span>";
                D += n
            }
            f.find("td").html(d)
        },
        fill: function() {
            var a = new Date(this.viewDate), s = a.getUTCFullYear(), n = a.getUTCMonth(), r = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity, o = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity, h = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity, l = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity, d = D[this.o.language].today || D["en"].today || "", f = D[this.o.language].clear || D["en"].clear || "", u = D[this.o.language].titleFormat || D["en"].titleFormat, c, p;
            if (isNaN(s) || isNaN(n))
                return;
            this.picker.find(".datepicker-days .datepicker-switch").text(v.formatDate(a, u, this.o.language));
            this.picker.find("tfoot .today").text(d).toggle(this.o.todayBtn !== false);
            this.picker.find("tfoot .clear").text(f).toggle(this.o.clearBtn !== false);
            this.picker.find("thead .datepicker-title").text(this.o.title).toggle(this.o.title !== "");
            this.updateNavArrows();
            this.fillMonths();
            var g = i(s, n - 1, 28)
              , y = v.getDaysInMonth(g.getUTCFullYear(), g.getUTCMonth());
            g.setUTCDate(y);
            g.setUTCDate(y - (g.getUTCDay() - this.o.weekStart + 7) % 7);
            var m = new Date(g);
            if (g.getUTCFullYear() < 100) {
                m.setUTCFullYear(g.getUTCFullYear())
            }
            m.setUTCDate(m.getUTCDate() + 42);
            m = m.valueOf();
            var w = [];
            var k;
            while (g.valueOf() < m) {
                if (g.getUTCDay() === this.o.weekStart) {
                    w.push("<tr>");
                    if (this.o.calendarWeeks) {
                        var C = new Date(+g + (this.o.weekStart - g.getUTCDay() - 7) % 7 * 864e5)
                          , b = new Date(Number(C) + (7 + 4 - C.getUTCDay()) % 7 * 864e5)
                          , _ = new Date(Number(_ = i(b.getUTCFullYear(), 0, 1)) + (7 + 4 - _.getUTCDay()) % 7 * 864e5)
                          , T = (b - _) / 864e5 / 7 + 1;
                        w.push('<td class="cw">' + T + "</td>")
                    }
                }
                k = this.getClassNames(g);
                k.push("day");
                if (this.o.beforeShowDay !== t.noop) {
                    p = this.o.beforeShowDay(this._utc_to_local(g));
                    if (p === e)
                        p = {};
                    else if (typeof p === "boolean")
                        p = {
                            enabled: p
                        };
                    else if (typeof p === "string")
                        p = {
                            classes: p
                        };
                    if (p.enabled === false)
                        k.push("disabled");
                    if (p.classes)
                        k = k.concat(p.classes.split(/\s+/));
                    if (p.tooltip)
                        c = p.tooltip
                }
                k = t.unique(k);
                w.push('<td class="' + k.join(" ") + '"' + (c ? ' title="' + c + '"' : "") + ">" + g.getUTCDate() + "</td>");
                c = null;
                if (g.getUTCDay() === this.o.weekEnd) {
                    w.push("</tr>")
                }
                g.setUTCDate(g.getUTCDate() + 1)
            }
            this.picker.find(".datepicker-days tbody").empty().append(w.join(""));
            var M = D[this.o.language].monthsTitle || D["en"].monthsTitle || "Months";
            var U = this.picker.find(".datepicker-months").find(".datepicker-switch").text(this.o.maxViewMode < 2 ? M : s).end().find("span").removeClass("active");
            t.each(this.dates, (function(t, e) {
                if (e.getUTCFullYear() === s)
                    U.eq(e.getUTCMonth()).addClass("active")
            }
            ));
            if (s < r || s > h) {
                U.addClass("disabled")
            }
            if (s === r) {
                U.slice(0, o).addClass("disabled")
            }
            if (s === h) {
                U.slice(l + 1).addClass("disabled")
            }
            if (this.o.beforeShowMonth !== t.noop) {
                var F = this;
                t.each(U, (function(i, a) {
                    var n = new Date(s,i,1);
                    var r = F.o.beforeShowMonth(n);
                    if (r === e)
                        r = {};
                    else if (typeof r === "boolean")
                        r = {
                            enabled: r
                        };
                    else if (typeof r === "string")
                        r = {
                            classes: r
                        };
                    if (r.enabled === false && !t(a).hasClass("disabled"))
                        t(a).addClass("disabled");
                    if (r.classes)
                        t(a).addClass(r.classes);
                    if (r.tooltip)
                        t(a).prop("title", r.tooltip)
                }
                ))
            }
            this._fill_yearsView(".datepicker-years", "year", 10, 1, s, r, h, this.o.beforeShowYear);
            this._fill_yearsView(".datepicker-decades", "decade", 100, 10, s, r, h, this.o.beforeShowDecade);
            this._fill_yearsView(".datepicker-centuries", "century", 1e3, 100, s, r, h, this.o.beforeShowCentury)
        },
        updateNavArrows: function() {
            if (!this._allow_update)
                return;
            var t = new Date(this.viewDate)
              , e = t.getUTCFullYear()
              , i = t.getUTCMonth();
            switch (this.viewMode) {
            case 0:
                if (this.o.startDate !== -Infinity && e <= this.o.startDate.getUTCFullYear() && i <= this.o.startDate.getUTCMonth()) {
                    this.picker.find(".prev").css({
                        visibility: "hidden"
                    })
                } else {
                    this.picker.find(".prev").css({
                        visibility: "visible"
                    })
                }
                if (this.o.endDate !== Infinity && e >= this.o.endDate.getUTCFullYear() && i >= this.o.endDate.getUTCMonth()) {
                    this.picker.find(".next").css({
                        visibility: "hidden"
                    })
                } else {
                    this.picker.find(".next").css({
                        visibility: "visible"
                    })
                }
                break;
            case 1:
            case 2:
            case 3:
            case 4:
                if (this.o.startDate !== -Infinity && e <= this.o.startDate.getUTCFullYear() || this.o.maxViewMode < 2) {
                    this.picker.find(".prev").css({
                        visibility: "hidden"
                    })
                } else {
                    this.picker.find(".prev").css({
                        visibility: "visible"
                    })
                }
                if (this.o.endDate !== Infinity && e >= this.o.endDate.getUTCFullYear() || this.o.maxViewMode < 2) {
                    this.picker.find(".next").css({
                        visibility: "hidden"
                    })
                } else {
                    this.picker.find(".next").css({
                        visibility: "visible"
                    })
                }
                break
            }
        },
        click: function(e) {
            e.preventDefault();
            e.stopPropagation();
            var s, n, r, o, h, l, d;
            s = t(e.target);
            if (s.hasClass("datepicker-switch")) {
                this.showMode(1)
            }
            var f = s.closest(".prev, .next");
            if (f.length > 0) {
                n = v.modes[this.viewMode].navStep * (f.hasClass("prev") ? -1 : 1);
                if (this.viewMode === 0) {
                    this.viewDate = this.moveMonth(this.viewDate, n);
                    this._trigger("changeMonth", this.viewDate)
                } else {
                    this.viewDate = this.moveYear(this.viewDate, n);
                    if (this.viewMode === 1) {
                        this._trigger("changeYear", this.viewDate)
                    }
                }
                this.fill()
            }
            if (s.hasClass("today") && !s.hasClass("day")) {
                this.showMode(-2);
                this._setDate(a(), this.o.todayBtn === "linked" ? null : "view")
            }
            if (s.hasClass("clear")) {
                this.clearDates()
            }
            if (!s.hasClass("disabled")) {
                if (s.hasClass("day")) {
                    r = parseInt(s.text(), 10) || 1;
                    o = this.viewDate.getUTCFullYear();
                    h = this.viewDate.getUTCMonth();
                    if (s.hasClass("old")) {
                        if (h === 0) {
                            h = 11;
                            o = o - 1;
                            l = true;
                            d = true
                        } else {
                            h = h - 1;
                            l = true
                        }
                    }
                    if (s.hasClass("new")) {
                        if (h === 11) {
                            h = 0;
                            o = o + 1;
                            l = true;
                            d = true
                        } else {
                            h = h + 1;
                            l = true
                        }
                    }
                    this._setDate(i(o, h, r));
                    if (d) {
                        this._trigger("changeYear", this.viewDate)
                    }
                    if (l) {
                        this._trigger("changeMonth", this.viewDate)
                    }
                }
                if (s.hasClass("month")) {
                    this.viewDate.setUTCDate(1);
                    r = 1;
                    h = s.parent().find("span").index(s);
                    o = this.viewDate.getUTCFullYear();
                    this.viewDate.setUTCMonth(h);
                    this._trigger("changeMonth", this.viewDate);
                    if (this.o.minViewMode === 1) {
                        this._setDate(i(o, h, r));
                        this.showMode()
                    } else {
                        this.showMode(-1)
                    }
                    this.fill()
                }
                if (s.hasClass("year") || s.hasClass("decade") || s.hasClass("century")) {
                    this.viewDate.setUTCDate(1);
                    r = 1;
                    h = 0;
                    o = parseInt(s.text(), 10) || 0;
                    this.viewDate.setUTCFullYear(o);
                    if (s.hasClass("year")) {
                        this._trigger("changeYear", this.viewDate);
                        if (this.o.minViewMode === 2) {
                            this._setDate(i(o, h, r))
                        }
                    }
                    if (s.hasClass("decade")) {
                        this._trigger("changeDecade", this.viewDate);
                        if (this.o.minViewMode === 3) {
                            this._setDate(i(o, h, r))
                        }
                    }
                    if (s.hasClass("century")) {
                        this._trigger("changeCentury", this.viewDate);
                        if (this.o.minViewMode === 4) {
                            this._setDate(i(o, h, r))
                        }
                    }
                    this.showMode(-1);
                    this.fill()
                }
            }
            if (this.picker.is(":visible") && this._focused_from) {
                t(this._focused_from).focus()
            }
            delete this._focused_from
        },
        _toggle_multidate: function(t) {
            var e = this.dates.contains(t);
            if (!t) {
                this.dates.clear()
            }
            if (e !== -1) {
                if (this.o.multidate === true || this.o.multidate > 1 || this.o.toggleActive) {
                    this.dates.remove(e)
                }
            } else if (this.o.multidate === false) {
                this.dates.clear();
                this.dates.push(t)
            } else {
                this.dates.push(t)
            }
            if (typeof this.o.multidate === "number")
                while (this.dates.length > this.o.multidate)
                    this.dates.remove(0)
        },
        _setDate: function(t, e) {
            if (!e || e === "date")
                this._toggle_multidate(t && new Date(t));
            if (!e || e === "view")
                this.viewDate = t && new Date(t);
            this.fill();
            this.setValue();
            if (!e || e !== "view") {
                this._trigger("changeDate")
            }
            if (this.inputField) {
                this.inputField.change()
            }
            if (this.o.autoclose && (!e || e === "date")) {
                this.hide()
            }
        },
        moveDay: function(t, e) {
            var i = new Date(t);
            i.setUTCDate(t.getUTCDate() + e);
            return i
        },
        moveWeek: function(t, e) {
            return this.moveDay(t, e * 7)
        },
        moveMonth: function(t, e) {
            if (!r(t))
                return this.o.defaultViewDate;
            if (!e)
                return t;
            var i = new Date(t.valueOf()), a = i.getUTCDate(), s = i.getUTCMonth(), n = Math.abs(e), o, h;
            e = e > 0 ? 1 : -1;
            if (n === 1) {
                h = e === -1 ? function() {
                    return i.getUTCMonth() === s
                }
                : function() {
                    return i.getUTCMonth() !== o
                }
                ;
                o = s + e;
                i.setUTCMonth(o);
                if (o < 0 || o > 11)
                    o = (o + 12) % 12
            } else {
                for (var l = 0; l < n; l++)
                    i = this.moveMonth(i, e);
                o = i.getUTCMonth();
                i.setUTCDate(a);
                h = function() {
                    return o !== i.getUTCMonth()
                }
            }
            while (h()) {
                i.setUTCDate(--a);
                i.setUTCMonth(o)
            }
            return i
        },
        moveYear: function(t, e) {
            return this.moveMonth(t, e * 12)
        },
        moveAvailableDate: function(t, e, i) {
            do {
                t = this[i](t, e);
                if (!this.dateWithinRange(t))
                    return false;
                i = "moveDay"
            } while (this.dateIsDisabled(t));
            return t
        },
        weekOfDateIsDisabled: function(e) {
            return t.inArray(e.getUTCDay(), this.o.daysOfWeekDisabled) !== -1
        },
        dateIsDisabled: function(e) {
            return this.weekOfDateIsDisabled(e) || t.grep(this.o.datesDisabled, (function(t) {
                return s(e, t)
            }
            )).length > 0
        },
        dateWithinRange: function(t) {
            return t >= this.o.startDate && t <= this.o.endDate
        },
        keydown: function(t) {
            if (!this.picker.is(":visible")) {
                if (t.keyCode === 40 || t.keyCode === 27) {
                    this.show();
                    t.stopPropagation()
                }
                return
            }
            var e = false, i, a, s = this.focusDate || this.viewDate;
            switch (t.keyCode) {
            case 27:
                if (this.focusDate) {
                    this.focusDate = null;
                    this.viewDate = this.dates.get(-1) || this.viewDate;
                    this.fill()
                } else
                    this.hide();
                t.preventDefault();
                t.stopPropagation();
                break;
            case 37:
            case 38:
            case 39:
            case 40:
                if (!this.o.keyboardNavigation || this.o.daysOfWeekDisabled.length === 7)
                    break;
                i = t.keyCode === 37 || t.keyCode === 38 ? -1 : 1;
                if (this.viewMode === 0) {
                    if (t.ctrlKey) {
                        a = this.moveAvailableDate(s, i, "moveYear");
                        if (a)
                            this._trigger("changeYear", this.viewDate)
                    } else if (t.shiftKey) {
                        a = this.moveAvailableDate(s, i, "moveMonth");
                        if (a)
                            this._trigger("changeMonth", this.viewDate)
                    } else if (t.keyCode === 37 || t.keyCode === 39) {
                        a = this.moveAvailableDate(s, i, "moveDay")
                    } else if (!this.weekOfDateIsDisabled(s)) {
                        a = this.moveAvailableDate(s, i, "moveWeek")
                    }
                } else if (this.viewMode === 1) {
                    if (t.keyCode === 38 || t.keyCode === 40) {
                        i = i * 4
                    }
                    a = this.moveAvailableDate(s, i, "moveMonth")
                } else if (this.viewMode === 2) {
                    if (t.keyCode === 38 || t.keyCode === 40) {
                        i = i * 4
                    }
                    a = this.moveAvailableDate(s, i, "moveYear")
                }
                if (a) {
                    this.focusDate = this.viewDate = a;
                    this.setValue();
                    this.fill();
                    t.preventDefault()
                }
                break;
            case 13:
                if (!this.o.forceParse)
                    break;
                s = this.focusDate || this.dates.get(-1) || this.viewDate;
                if (this.o.keyboardNavigation) {
                    this._toggle_multidate(s);
                    e = true
                }
                this.focusDate = null;
                this.viewDate = this.dates.get(-1) || this.viewDate;
                this.setValue();
                this.fill();
                if (this.picker.is(":visible")) {
                    t.preventDefault();
                    t.stopPropagation();
                    if (this.o.autoclose)
                        this.hide()
                }
                break;
            case 9:
                this.focusDate = null;
                this.viewDate = this.dates.get(-1) || this.viewDate;
                this.fill();
                this.hide();
                break
            }
            if (e) {
                if (this.dates.length)
                    this._trigger("changeDate");
                else
                    this._trigger("clearDate");
                if (this.inputField) {
                    this.inputField.change()
                }
            }
        },
        showMode: function(t) {
            if (t) {
                this.viewMode = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, this.viewMode + t))
            }
            this.picker.children("div").hide().filter(".datepicker-" + v.modes[this.viewMode].clsName).show();
            this.updateNavArrows()
        }
    };
    var l = function(e, i) {
        t(e).data("datepicker", this);
        this.element = t(e);
        this.inputs = t.map(i.inputs, (function(t) {
            return t.jquery ? t[0] : t
        }
        ));
        delete i.inputs;
        c.call(t(this.inputs), i).on("changeDate", t.proxy(this.dateUpdated, this));
        this.pickers = t.map(this.inputs, (function(e) {
            return t(e).data("datepicker")
        }
        ));
        this.updateDates()
    };
    l.prototype = {
        updateDates: function() {
            this.dates = t.map(this.pickers, (function(t) {
                return t.getUTCDate()
            }
            ));
            this.updateRanges()
        },
        updateRanges: function() {
            var e = t.map(this.dates, (function(t) {
                return t.valueOf()
            }
            ));
            t.each(this.pickers, (function(t, i) {
                i.setRange(e)
            }
            ))
        },
        dateUpdated: function(e) {
            if (this.updating)
                return;
            this.updating = true;
            var i = t(e.target).data("datepicker");
            if (typeof i === "undefined") {
                return
            }
            var a = i.getUTCDate()
              , s = t.inArray(e.target, this.inputs)
              , n = s - 1
              , r = s + 1
              , o = this.inputs.length;
            if (s === -1)
                return;
            t.each(this.pickers, (function(t, e) {
                if (!e.getUTCDate())
                    e.setUTCDate(a)
            }
            ));
            if (a < this.dates[n]) {
                while (n >= 0 && a < this.dates[n]) {
                    this.pickers[n--].setUTCDate(a)
                }
            } else if (a > this.dates[r]) {
                while (r < o && a > this.dates[r]) {
                    this.pickers[r++].setUTCDate(a)
                }
            }
            this.updateDates();
            delete this.updating
        },
        remove: function() {
            t.map(this.pickers, (function(t) {
                t.remove()
            }
            ));
            delete this.element.data().datepicker
        }
    };
    function d(e, i) {
        var a = t(e).data(), s = {}, n, r = new RegExp("^" + i.toLowerCase() + "([A-Z])");
        i = new RegExp("^" + i.toLowerCase());
        function o(t, e) {
            return e.toLowerCase()
        }
        for (var h in a)
            if (i.test(h)) {
                n = h.replace(r, o);
                s[n] = a[h]
            }
        return s
    }
    function f(e) {
        var i = {};
        if (!D[e]) {
            e = e.split("-")[0];
            if (!D[e])
                return
        }
        var a = D[e];
        t.each(g, (function(t, e) {
            if (e in a)
                i[e] = a[e]
        }
        ));
        return i
    }
    var u = t.fn.datepicker;
    var c = function(i) {
        var a = Array.apply(null, arguments);
        a.shift();
        var s;
        this.each((function() {
            var e = t(this)
              , n = e.data("datepicker")
              , r = typeof i === "object" && i;
            if (!n) {
                var o = d(this, "date")
                  , u = t.extend({}, p, o, r)
                  , c = f(u.language)
                  , g = t.extend({}, p, c, o, r);
                if (e.hasClass("input-daterange") || g.inputs) {
                    t.extend(g, {
                        inputs: g.inputs || e.find("input").toArray()
                    });
                    n = new l(this,g)
                } else {
                    n = new h(this,g)
                }
                e.data("datepicker", n)
            }
            if (typeof i === "string" && typeof n[i] === "function") {
                s = n[i].apply(n, a)
            }
        }
        ));
        if (s === e || s instanceof h || s instanceof l)
            return this;
        if (this.length > 1)
            throw new Error("Using only allowed for the collection of a single element (" + i + " function)");
        else
            return s
    };
    t.fn.datepicker = c;
    var p = t.fn.datepicker.defaults = {
        assumeNearbyYear: false,
        autoclose: false,
        beforeShowDay: t.noop,
        beforeShowMonth: t.noop,
        beforeShowYear: t.noop,
        beforeShowDecade: t.noop,
        beforeShowCentury: t.noop,
        calendarWeeks: false,
        clearBtn: false,
        toggleActive: false,
        daysOfWeekDisabled: [],
        daysOfWeekHighlighted: [],
        datesDisabled: [],
        endDate: Infinity,
        forceParse: true,
        format: "mm/dd/yyyy",
        keyboardNavigation: true,
        language: "en",
        minViewMode: 0,
        maxViewMode: 4,
        multidate: false,
        multidateSeparator: ",",
        orientation: "auto",
        rtl: false,
        startDate: -Infinity,
        startView: 0,
        todayBtn: false,
        todayHighlight: false,
        weekStart: 0,
        disableTouchKeyboard: false,
        enableOnReadonly: true,
        showOnFocus: true,
        zIndexOffset: 10,
        container: "body",
        immediateUpdates: false,
        title: "",
        templates: {
            leftArrow: "&laquo;",
            rightArrow: "&raquo;"
        }
    };
    var g = t.fn.datepicker.locale_opts = ["format", "rtl", "weekStart"];
    t.fn.datepicker.Constructor = h;
    var D = t.fn.datepicker.dates = {
        en: {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            today: "Today",
            clear: "Clear",
            titleFormat: "MM yyyy"
        }
    };
    var v = {
        modes: [{
            clsName: "days",
            navFnc: "Month",
            navStep: 1
        }, {
            clsName: "months",
            navFnc: "FullYear",
            navStep: 1
        }, {
            clsName: "years",
            navFnc: "FullYear",
            navStep: 10
        }, {
            clsName: "decades",
            navFnc: "FullDecade",
            navStep: 100
        }, {
            clsName: "centuries",
            navFnc: "FullCentury",
            navStep: 1e3
        }],
        isLeapYear: function(t) {
            return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0
        },
        getDaysInMonth: function(t, e) {
            return [31, v.isLeapYear(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e]
        },
        validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
        nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
        parseFormat: function(t) {
            if (typeof t.toValue === "function" && typeof t.toDisplay === "function")
                return t;
            var e = t.replace(this.validParts, "\0").split("\0")
              , i = t.match(this.validParts);
            if (!e || !e.length || !i || i.length === 0) {
                throw new Error("Invalid date format.")
            }
            return {
                separators: e,
                parts: i
            }
        },
        parseDate: function(s, n, r, o) {
            if (!s)
                return e;
            if (s instanceof Date)
                return s;
            if (typeof n === "string")
                n = v.parseFormat(n);
            if (n.toValue)
                return n.toValue(s, n, r);
            var l = /([\-+]\d+)([dmwy])/, d = s.match(/([\-+]\d+)([dmwy])/g), f = {
                d: "moveDay",
                m: "moveMonth",
                w: "moveWeek",
                y: "moveYear"
            }, u = {
                yesterday: "-1d",
                today: "+0d",
                tomorrow: "+1d"
            }, c, p, g, y;
            if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(s)) {
                s = new Date;
                for (g = 0; g < d.length; g++) {
                    c = l.exec(d[g]);
                    p = parseInt(c[1]);
                    y = f[c[2]];
                    s = h.prototype[y](s, p)
                }
                return i(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate())
            }
            if (typeof u[s] !== "undefined") {
                s = u[s];
                d = s.match(/([\-+]\d+)([dmwy])/g);
                if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(s)) {
                    s = new Date;
                    for (g = 0; g < d.length; g++) {
                        c = l.exec(d[g]);
                        p = parseInt(c[1]);
                        y = f[c[2]];
                        s = h.prototype[y](s, p)
                    }
                    return i(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate())
                }
            }
            d = s && s.match(this.nonpunctuation) || [];
            s = new Date;
            function m(t, e) {
                if (e === true)
                    e = 10;
                if (t < 100) {
                    t += 2e3;
                    if (t > (new Date).getFullYear() + e) {
                        t -= 100
                    }
                }
                return t
            }
            var w = {}, k = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"], C = {
                yyyy: function(t, e) {
                    return t.setUTCFullYear(o ? m(e, o) : e)
                },
                yy: function(t, e) {
                    return t.setUTCFullYear(o ? m(e, o) : e)
                },
                m: function(t, e) {
                    if (isNaN(t))
                        return t;
                    e -= 1;
                    while (e < 0)
                        e += 12;
                    e %= 12;
                    t.setUTCMonth(e);
                    while (t.getUTCMonth() !== e)
                        t.setUTCDate(t.getUTCDate() - 1);
                    return t
                },
                d: function(t, e) {
                    return t.setUTCDate(e)
                }
            }, b, _;
            C["M"] = C["MM"] = C["mm"] = C["m"];
            C["dd"] = C["d"];
            s = a();
            var T = n.parts.slice();
            if (d.length !== T.length) {
                T = t(T).filter((function(e, i) {
                    return t.inArray(i, k) !== -1
                }
                )).toArray()
            }
            function M() {
                var t = this.slice(0, d[g].length)
                  , e = d[g].slice(0, t.length);
                return t.toLowerCase() === e.toLowerCase()
            }
            if (d.length === T.length) {
                var U;
                for (g = 0,
                U = T.length; g < U; g++) {
                    b = parseInt(d[g], 10);
                    c = T[g];
                    if (isNaN(b)) {
                        switch (c) {
                        case "MM":
                            _ = t(D[r].months).filter(M);
                            b = t.inArray(_[0], D[r].months) + 1;
                            break;
                        case "M":
                            _ = t(D[r].monthsShort).filter(M);
                            b = t.inArray(_[0], D[r].monthsShort) + 1;
                            break
                        }
                    }
                    w[c] = b
                }
                var F, x;
                for (g = 0; g < k.length; g++) {
                    x = k[g];
                    if (x in w && !isNaN(w[x])) {
                        F = new Date(s);
                        C[x](F, w[x]);
                        if (!isNaN(F))
                            s = F
                    }
                }
            }
            return s
        },
        formatDate: function(e, i, a) {
            if (!e)
                return "";
            if (typeof i === "string")
                i = v.parseFormat(i);
            if (i.toDisplay)
                return i.toDisplay(e, i, a);
            var s = {
                d: e.getUTCDate(),
                D: D[a].daysShort[e.getUTCDay()],
                DD: D[a].days[e.getUTCDay()],
                m: e.getUTCMonth() + 1,
                M: D[a].monthsShort[e.getUTCMonth()],
                MM: D[a].months[e.getUTCMonth()],
                yy: e.getUTCFullYear().toString().substring(2),
                yyyy: e.getUTCFullYear()
            };
            s.dd = (s.d < 10 ? "0" : "") + s.d;
            s.mm = (s.m < 10 ? "0" : "") + s.m;
            e = [];
            var n = t.extend([], i.separators);
            for (var r = 0, o = i.parts.length; r <= o; r++) {
                if (n.length)
                    e.push(n.shift());
                e.push(s[i.parts[r]])
            }
            return e.join("")
        },
        headTemplate: "<thead>" + "<tr>" + '<th colspan="7" class="datepicker-title"></th>' + "</tr>" + "<tr>" + '<th class="prev">&laquo;</th>' + '<th colspan="5" class="datepicker-switch"></th>' + '<th class="next">&raquo;</th>' + "</tr>" + "</thead>",
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate: "<tfoot>" + "<tr>" + '<th colspan="7" class="today"></th>' + "</tr>" + "<tr>" + '<th colspan="7" class="clear"></th>' + "</tr>" + "</tfoot>"
    };
    v.template = '<div class="datepicker">' + '<div class="datepicker-days">' + '<table class="table-condensed">' + v.headTemplate + "<tbody></tbody>" + v.footTemplate + "</table>" + "</div>" + '<div class="datepicker-months">' + '<table class="table-condensed">' + v.headTemplate + v.contTemplate + v.footTemplate + "</table>" + "</div>" + '<div class="datepicker-years">' + '<table class="table-condensed">' + v.headTemplate + v.contTemplate + v.footTemplate + "</table>" + "</div>" + '<div class="datepicker-decades">' + '<table class="table-condensed">' + v.headTemplate + v.contTemplate + v.footTemplate + "</table>" + "</div>" + '<div class="datepicker-centuries">' + '<table class="table-condensed">' + v.headTemplate + v.contTemplate + v.footTemplate + "</table>" + "</div>" + "</div>";
    t.fn.datepicker.DPGlobal = v;
    t.fn.datepicker.noConflict = function() {
        t.fn.datepicker = u;
        return this
    }
    ;
    t.fn.datepicker.version = "1.6.1";
    t(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', (function(e) {
        var i = t(this);
        if (i.data("datepicker"))
            return;
        e.preventDefault();
        c.call(i, "show")
    }
    ));
    t((function() {
        c.call(t('[data-provide="datepicker-inline"]'))
    }
    ))
}
));
(function(t) {
    var a = function(t) {
        return (t || "ui-id") + "-" + Math.floor(Math.random() * 1e3 + 1)
    };
    var e = $(".nav-tabs, .nav-pills")
      , r = e.children("li")
      , i = e.find('[data-toggle="tab"], [data-toggle="pill"]');
    if (i) {
        e.attr("role", "tablist");
        r.attr("role", "presentation");
        i.attr("role", "tab")
    }
    i.each((function(t) {
        var e = $($(this).attr("href"))
          , r = $($(this).attr("href") + "-radio")
          , i = $(this)
          , l = i.attr("id") || a("ui-tab");
        i.attr("id", l);
        if (i.parent().hasClass("active")) {
            i.attr({
                tabIndex: "0",
                "aria-selected": "true",
                "aria-controls": i.attr("href").substr(1)
            });
            e.attr({
                role: "tabpanel",
                tabIndex: "0",
                "aria-hidden": "false",
                "aria-labelledby": l
            });
            r.prop("checked", true)
        } else {
            i.attr({
                tabIndex: "-1",
                "aria-selected": "false",
                "aria-controls": i.attr("href").substr(1)
            });
            e.attr({
                role: "tabpanel",
                tabIndex: "-1",
                "aria-hidden": "true",
                "aria-labelledby": l
            });
            r.prop("checked", false)
        }
    }
    ));
    $.fn.tab.Constructor.prototype.keydown = function(t) {
        var a = $(this), e, r = a.closest("ul[role=tablist] "), i, l = t.which || t.keyCode;
        a = $(this);
        if (!/(37|38|39|40)/.test(l))
            return;
        e = r.find("[role=tab]:visible");
        i = e.index(e.filter(":focus"));
        if (l == 38 || l == 37)
            i--;
        if (l == 39 || l == 40)
            i++;
        if (i < 0)
            i = e.length - 1;
        if (i == e.length)
            i = 0;
        var o = e.eq(i);
        if (o.attr("role") === "tab") {
            o.tab("show").focus()
        }
        t.preventDefault();
        t.stopPropagation()
    }
    ;
    $(document).on("keydown.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', $.fn.tab.Constructor.prototype.keydown);
    var l = $.fn.tab.Constructor.prototype.activate;
    $.fn.tab.Constructor.prototype.activate = function(t, a, e) {
        var r = a.find("> .active");
        r.find("[data-toggle=tab], [data-toggle=pill]").attr({
            tabIndex: "-1",
            "aria-selected": false
        });
        r.find("[data-toggle=tab], [data-toggle=pill]").next().prop("checked", false);
        r.filter(".tab-pane").attr({
            "aria-hidden": true,
            tabIndex: "-1"
        });
        l.apply(this, arguments);
        t.addClass("active");
        t.find("[data-toggle=tab], [data-toggle=pill]").attr({
            tabIndex: "0",
            "aria-selected": true
        });
        t.find("[data-toggle=tab], [data-toggle=pill]").next().prop("checked", true);
        t.filter(".tab-pane").attr({
            "aria-hidden": false,
            tabIndex: "0"
        })
    }
}
)(this);
(function(e) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], e)
    } else {
        e(jQuery)
    }
}
)((function(e, t) {
    var n = 6
      , i = e.event.add
      , a = e.event.remove
      , o = function(t, n, i) {
        e.event.trigger(n, i, t)
    }
      , r = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e, t) {
            return window.setTimeout((function() {
                e()
            }
            ), 25)
        }
    }()
      , u = {
        textarea: true,
        input: true,
        select: true
    }
      , c = {
        move: "mousemove",
        cancel: "mouseup dragstart",
        end: "mouseup"
    }
      , d = {
        move: "touchmove",
        cancel: "touchend",
        end: "touchend"
    };
    function f(e) {
        var t = e
          , n = false
          , i = false;
        function a(e) {
            if (n) {
                t();
                r(a);
                i = true;
                n = false
            } else {
                i = false
            }
        }
        this.kick = function(e) {
            n = true;
            if (!i) {
                a()
            }
        }
        ;
        this.end = function(e) {
            var a = t;
            if (!e) {
                return
            }
            if (!i) {
                e()
            } else {
                t = n ? function() {
                    a();
                    e()
                }
                : e;
                n = true
            }
        }
    }
    function m() {
        return true
    }
    function s() {
        return false
    }
    function v(e) {
        e.preventDefault()
    }
    function p(e) {
        if (u[e.target.tagName.toLowerCase()]) {
            return
        }
        e.preventDefault()
    }
    function g(e) {
        return e.which === 1 && !e.ctrlKey && !e.altKey
    }
    function l(e, t) {
        var n, i;
        if (e.identifiedTouch) {
            return e.identifiedTouch(t)
        }
        n = -1;
        i = e.length;
        while (++n < i) {
            if (e[n].identifier === t) {
                return e[n]
            }
        }
    }
    function h(e, t) {
        var n = l(e.changedTouches, t.identifier);
        if (!n) {
            return
        }
        if (n.pageX === t.pageX && n.pageY === t.pageY) {
            return
        }
        return n
    }
    function X(e) {
        var t;
        if (!g(e)) {
            return
        }
        t = {
            target: e.target,
            startX: e.pageX,
            startY: e.pageY,
            timeStamp: e.timeStamp
        };
        i(document, c.move, Y, t);
        i(document, c.cancel, w, t)
    }
    function Y(e) {
        var t = e.data;
        q(e, t, e, y)
    }
    function w(e) {
        y()
    }
    function y() {
        a(document, c.move, Y);
        a(document, c.cancel, y)
    }
    function T(e) {
        var t, n;
        if (u[e.target.tagName.toLowerCase()]) {
            return
        }
        t = e.changedTouches[0];
        n = {
            target: t.target,
            startX: t.pageX,
            startY: t.pageY,
            timeStamp: e.timeStamp,
            identifier: t.identifier
        };
        i(document, d.move + "." + t.identifier, S, n);
        i(document, d.cancel + "." + t.identifier, k, n)
    }
    function S(e) {
        var t = e.data
          , n = h(e, t);
        if (!n) {
            return
        }
        q(e, t, n, _)
    }
    function k(e) {
        var t = e.data
          , n = l(e.changedTouches, t.identifier);
        if (!n) {
            return
        }
        _(t.identifier)
    }
    function _(e) {
        a(document, "." + e, S);
        a(document, "." + e, k)
    }
    function q(e, t, i, a) {
        var o = i.pageX - t.startX
          , r = i.pageY - t.startY;
        if (o * o + r * r < n * n) {
            return
        }
        F(e, t, i, o, r, a)
    }
    function A() {
        this._handled = m;
        return false
    }
    function D(e) {
        e._handled()
    }
    function F(e, t, n, i, a, r) {
        var u = t.target, c, d;
        c = e.targetTouches;
        d = e.timeStamp - t.timeStamp;
        t.type = "movestart";
        t.distX = i;
        t.distY = a;
        t.deltaX = i;
        t.deltaY = a;
        t.pageX = n.pageX;
        t.pageY = n.pageY;
        t.velocityX = i / d;
        t.velocityY = a / d;
        t.targetTouches = c;
        t.finger = c ? c.length : 1;
        t._handled = A;
        t._preventTouchmoveDefault = function() {
            e.preventDefault()
        }
        ;
        o(t.target, t);
        r(t.identifier)
    }
    function R(e) {
        var t = e.data.event
          , n = e.data.timer;
        N(t, e, e.timeStamp, n)
    }
    function x(e) {
        var t = e.data.event
          , n = e.data.timer;
        j();
        O(t, n, (function() {
            setTimeout((function() {
                a(t.target, "click", s)
            }
            ), 0)
        }
        ))
    }
    function j(e) {
        a(document, c.move, R);
        a(document, c.end, x)
    }
    function C(e) {
        var t = e.data.event
          , n = e.data.timer
          , i = h(e, t);
        if (!i) {
            return
        }
        e.preventDefault();
        t.targetTouches = e.targetTouches;
        N(t, i, e.timeStamp, n)
    }
    function K(e) {
        var t = e.data.event
          , n = e.data.timer
          , i = l(e.changedTouches, t.identifier);
        if (!i) {
            return
        }
        L(t);
        O(t, n)
    }
    function L(e) {
        a(document, "." + e.identifier, C);
        a(document, "." + e.identifier, K)
    }
    function N(e, t, n, i) {
        var a = n - e.timeStamp;
        e.type = "move";
        e.distX = t.pageX - e.startX;
        e.distY = t.pageY - e.startY;
        e.deltaX = t.pageX - e.pageX;
        e.deltaY = t.pageY - e.pageY;
        e.velocityX = .3 * e.velocityX + .7 * e.deltaX / a;
        e.velocityY = .3 * e.velocityY + .7 * e.deltaY / a;
        e.pageX = t.pageX;
        e.pageY = t.pageY;
        i.kick()
    }
    function O(e, t, n) {
        t.end((function() {
            e.type = "moveend";
            o(e.target, e);
            return n && n()
        }
        ))
    }
    function b(e, t, n) {
        i(this, "dragstart.move drag.move", v);
        i(this, "mousedown.move", p);
        i(this, "movestart.move", D);
        return true
    }
    function z(e) {
        a(this, "dragstart drag", v);
        a(this, "mousedown touchstart", p);
        a(this, "movestart", D);
        return true
    }
    e.event.special.movestart = {
        setup: b,
        teardown: z,
        _default: function(e) {
            var n, a;
            if (!e._handled()) {
                return
            }
            n = {
                target: e.target,
                startX: e.startX,
                startY: e.startY,
                pageX: e.pageX,
                pageY: e.pageY,
                distX: e.distX,
                distY: e.distY,
                deltaX: e.deltaX,
                deltaY: e.deltaY,
                velocityX: e.velocityX,
                velocityY: e.velocityY,
                timeStamp: e.timeStamp,
                identifier: e.identifier,
                targetTouches: e.targetTouches,
                finger: e.finger
            };
            a = {
                event: n,
                timer: new f((function(t) {
                    o(e.target, n)
                }
                ))
            };
            if (e.identifier === t) {
                i(e.target, "click", s);
                i(document, c.move, R, a);
                i(document, c.end, x, a)
            } else {
                e._preventTouchmoveDefault();
                i(document, d.move + "." + e.identifier, C, a);
                i(document, d.end + "." + e.identifier, K, a)
            }
        }
    };
    e.event.special.move = {
        setup: function() {
            i(this, "movestart.move", e.noop)
        },
        teardown: function() {
            a(this, "movestart.move", e.noop)
        }
    };
    e.event.special.moveend = {
        setup: function() {
            i(this, "movestart.moveend", e.noop)
        },
        teardown: function() {
            a(this, "movestart.moveend", e.noop)
        }
    };
    i(document, "mousedown.move", X);
    i(document, "touchstart.move", T);
    if (typeof Array.prototype.indexOf === "function") {
        (function(e, t) {
            var n = ["changedTouches", "targetTouches"]
              , i = n.length;
            while (i--) {
                if (e.event.props.indexOf(n[i]) === -1) {
                    e.event.props.push(n[i])
                }
            }
        }
        )(e)
    }
}
));
(function(t) {
    "use strict";
    t.fn.twentytwenty = function(e) {
        var e = t.extend({
            default_offset_pct: .5
        }, e);
        return this.each((function() {
            var n = e.default_offset_pct;
            var i = t(this);
            var a = i.find("img:first");
            var d = i.find("img:last");
            i.append("<div class='twentytwenty-handle-wrapper'><div class='twentytwenty-handle'></div></div>");
            var o = i.find(".twentytwenty-handle");
            o.append("<div class='twentytwenty-left-arrow'></div>");
            o.append("<div class='twentytwenty-right-arrow'></div>");
            i.addClass("twentytwenty-container");
            a.addClass("twentytwenty-before");
            d.addClass("twentytwenty-after");
            var s = i.find("figcaption").height() || 0;
            var f = function(t) {
                var e = a.width();
                var n = a.height();
                return {
                    w: e + "px",
                    h: n + "px",
                    cw: t * e + "px"
                }
            };
            var c = function(t) {
                a.css("clip", "rect(0," + t.cw + "," + t.h + ",0)");
                i.css("height", t.h + s);
                i.find("a:last, .twentytwenty-handle-wrapper").css("height", t.h)
            };
            var r = function(t) {
                var e = f(t);
                if (e.h === "0px") {
                    a.on("load", (function() {
                        r(t)
                    }
                    ))
                }
                o.css("left", e.cw);
                c(e)
            };
            t(window).on("resize.twentytwenty", (function(t) {
                r(n)
            }
            ));
            var w = 0;
            var y = 0;
            i.on("movestart", (function(t) {
                if (t.distX > t.distY && t.distX < -t.distY || t.distX < t.distY && t.distX > -t.distY) {
                    t.preventDefault()
                }
                i.addClass("active");
                w = i.offset().left;
                y = a.width()
            }
            ));
            i.on("moveend", (function(t) {
                i.removeClass("active")
            }
            ));
            i.on("move", (function(t) {
                if (i.hasClass("active")) {
                    n = (t.pageX - w) / y;
                    if (n < 0) {
                        n = 0
                    }
                    if (n > 1) {
                        n = 1
                    }
                    r(n)
                }
            }
            ));
            i.find("img").on("mousedown", (function(t) {
                t.preventDefault()
            }
            ));
            o.on("mousedown", (function(t) {
                w = i.offset().left;
                y = a.width();
                n = (t.pageX - w) / y;
                if (n < 0) {
                    n = 0
                }
                if (n > 1) {
                    n = 1
                }
                r(n)
            }
            ));
            t(window).trigger("resize.twentytwenty")
        }
        ))
    }
}
)(jQuery);
$((function() {
    "use strict";
    $('[data-embed-type="comparison"]').twentytwenty();
    if (typeof tinymce !== "undefined") {
        tinymce.onAddEditor.add((function(t, e) {
            $(e.getDoc()).find('[data-embed-type="comparison"]').twentytwenty();
            e.onExecCommand.add((function(t, e, n, i) {
                if (e == "mceEmbedImage") {
                    $(t.getDoc()).find('[data-embed-type="comparison"]').twentytwenty()
                }
            }
            ));
            e.onInit.add((function(t) {
                $(t.getDoc()).find('[data-embed-type="comparison"]').twentytwenty()
            }
            ))
        }
        ))
    }
}
));
(function(t) {
    t.fn.unveil = function(e, i) {
        var a = 0;
        var r = t(window), l = window.devicePixelRatio > 1, n = l ? "data-src-retina" : "data-src", s = this, o = t(this).selector, d;
        var u = t.extend({
            threshold: 1e3,
            replaceTag: "<iframe>",
            delay: 0,
            mode: "img",
            loadingClass: "loading",
            checkHidden: true
        }, e);
        var h = t(u.replaceTag);
        function c() {
            if (u.mode === "img") {
                var e = this.getAttribute(n)
                  , a = this.getAttribute("data-srcset");
                e = e || this.getAttribute("data-src");
                if (a) {
                    this.setAttribute("srcset", a)
                }
                if (e) {
                    this.setAttribute("src", e);
                    if (typeof i === "function")
                        i.call(this)
                }
            } else {
                var r = h.clone();
                var l = t(this);
                var s = l.prop("attributes");
                t.each(s, (function() {
                    r.attr(this.name, this.value)
                }
                ));
                r.removeClass(u.loadingClass);
                l.replaceWith(r);
                if (typeof i === "function")
                    i.call(this)
            }
        }
        this.one("unveil", c);
        this.attr("data-lazy-load", false);
        function f() {
            var e = t(this);
            if (u.checkHidden && e.is(":hidden"))
                return;
            var i = r.scrollTop()
              , a = i + r.height()
              , l = e.offset().top
              , n = l + e.height();
            return n >= i - u.threshold && l <= a + u.threshold
        }
        function v() {
            var e = t(o).filter("[data-lazy-load=true]");
            if (e.length > 0) {
                e.one("unveil", c);
                e.attr("data-lazy-load", false);
                e.trigger("unveil")
            }
            var i = s.filter(f);
            if (u.delay > 0) {
                a = setTimeout((function() {
                    stillInView = i.filter(f);
                    d = stillInView.trigger("unveil")
                }
                ), u.delay)
            } else {
                d = i.trigger("unveil")
            }
            s = s.not(d)
        }
        r.on("scroll.unveil resize.unveil lookup.unveil", v);
        v();
        return this
    }
}
)(window.jQuery || window.Zepto);
/*!
 * jQuery.scrollTo
 * Copyright (c) 2007-2015 Ariel Flesler - aflesler ○ gmail • com | http://flesler.blogspot.com
 * Licensed under MIT
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * @projectDescription Lightweight, cross-browser and highly customizable animated scrolling with jQuery
 * @author Ariel Flesler
 * @version 2.1.2
 */
(function(e) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define(["jquery"], e)
    } else if (typeof module !== "undefined" && module.exports) {
        module.exports = e(require("jquery"))
    } else {
        e(jQuery)
    }
}
)((function(e) {
    "use strict";
    var t = e.scrollTo = function(t, n, o) {
        return e(window).scrollTo(t, n, o)
    }
    ;
    t.defaults = {
        axis: "xy",
        duration: 0,
        limit: true
    };
    function n(t) {
        return !t.nodeName || e.inArray(t.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) !== -1
    }
    e.fn.scrollTo = function(i, r, s) {
        if (typeof r === "object") {
            s = r;
            r = 0
        }
        if (typeof s === "function") {
            s = {
                onAfter: s
            }
        }
        if (i === "max") {
            i = 9e9
        }
        s = e.extend({}, t.defaults, s);
        r = r || s.duration;
        var f = s.queue && s.axis.length > 1;
        if (f) {
            r /= 2
        }
        s.offset = o(s.offset);
        s.over = o(s.over);
        return this.each((function() {
            if (i === null)
                return;
            var u = n(this), a = u ? this.contentWindow || window : this, l = e(a), c = i, d = {}, m;
            switch (typeof c) {
            case "number":
            case "string":
                if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(c)) {
                    c = o(c);
                    break
                }
                c = u ? e(c) : e(c, a);
            case "object":
                if (c.length === 0)
                    return;
                if (c.is || c.style) {
                    m = (c = e(c)).offset()
                }
            }
            var p = e.isFunction(s.offset) && s.offset(a, c) || s.offset;
            e.each(s.axis.split(""), (function(e, n) {
                var o = n === "x" ? "Left" : "Top"
                  , i = o.toLowerCase()
                  , r = "scroll" + o
                  , x = l[r]()
                  , v = t.max(a, n);
                if (m) {
                    d[r] = m[i] + (u ? 0 : x - l.offset()[i]);
                    if (s.margin) {
                        d[r] -= parseInt(c.css("margin" + o), 10) || 0;
                        d[r] -= parseInt(c.css("border" + o + "Width"), 10) || 0
                    }
                    d[r] += p[i] || 0;
                    if (s.over[i]) {
                        d[r] += c[n === "x" ? "width" : "height"]() * s.over[i]
                    }
                } else {
                    var w = c[i];
                    d[r] = w.slice && w.slice(-1) === "%" ? parseFloat(w) / 100 * v : w
                }
                if (s.limit && /^\d+$/.test(d[r])) {
                    d[r] = d[r] <= 0 ? 0 : Math.min(d[r], v)
                }
                if (!e && s.axis.length > 1) {
                    if (x === d[r]) {
                        d = {}
                    } else if (f) {
                        h(s.onAfterFirst);
                        d = {}
                    }
                }
            }
            ));
            h(s.onAfter);
            function h(t) {
                var n = e.extend({}, s, {
                    queue: true,
                    duration: r,
                    complete: t && function() {
                        t.call(a, c, s)
                    }
                });
                l.animate(d, n)
            }
        }
        ))
    }
    ;
    t.max = function(t, o) {
        var i = o === "x" ? "Width" : "Height"
          , r = "scroll" + i;
        if (!n(t))
            return t[r] - e(t)[i.toLowerCase()]();
        var s = "client" + i
          , f = t.ownerDocument || t.document
          , u = f.documentElement
          , a = f.body;
        return Math.max(u[r], a[r]) - Math.min(u[s], a[s])
    }
    ;
    function o(t) {
        return e.isFunction(t) || e.isPlainObject(t) ? t : {
            top: t,
            left: t
        }
    }
    e.Tween.propHooks.scrollLeft = e.Tween.propHooks.scrollTop = {
        get: function(t) {
            return e(t.elem)[t.prop]()
        },
        set: function(t) {
            var n = this.get(t);
            if (t.options.interrupt && t._last && t._last !== n) {
                return e(t.elem).stop()
            }
            var o = Math.round(t.now);
            if (n !== o) {
                e(t.elem)[t.prop](o);
                t._last = this.get(t)
            }
        }
    };
    return t
}
));
var StringMunger = function() {
    return {
        munge: function(r, n, e) {
            r = n + r;
            var t = [];
            var a = r.length;
            for (var u = 0; u < a; u++) {
                var h = r.charCodeAt(u);
                if (h + e > 65535) {
                    h = h - 65535
                } else {
                    h += e
                }
                t.push(h)
            }
            return String.fromCharCode.apply(this, t)
        },
        unmunge: function(r, n, e) {
            var t = [];
            var a = r.length;
            for (var u = 0; u < a; u++) {
                var h = r.charCodeAt(u);
                if (h - e < 0) {
                    h = h + 65535
                } else {
                    h -= e
                }
                t.push(h)
            }
            return String.fromCharCode.apply(this, t).substr(n.length)
        }
    }
}();
(function(e, n) {
    if (typeof define === "function" && define.amd) {
        define([], n)
    } else if (typeof module !== "undefined" && module.exports) {
        module.exports = n()
    } else {
        e.lscache = n()
    }
}
)(this, (function() {
    var e = "lscache-";
    var n = "-cacheexpiration";
    var t = 10;
    var r = 60 * 1e3;
    var i = Math.floor(864e13 / r);
    var o;
    var a;
    var u = "";
    var f = false;
    function c() {
        var e = "__lscachetest__";
        var n = e;
        if (o !== undefined) {
            return o
        }
        try {
            if (!localStorage) {
                return false
            }
        } catch (e) {
            return false
        }
        try {
            p(e, n);
            m(e);
            o = true
        } catch (e) {
            if (l(e) && localStorage.length) {
                o = true
            } else {
                o = false
            }
        }
        return o
    }
    function l(e) {
        return e && (e.name === "QUOTA_EXCEEDED_ERR" || e.name === "NS_ERROR_DOM_QUOTA_REACHED" || e.name === "QuotaExceededError")
    }
    function s() {
        if (a === undefined) {
            a = window.JSON != null
        }
        return a
    }
    function h(e) {
        return e.replace(/[[\]{}()*+?.\\^$|]/g, "\\$&")
    }
    function d(e) {
        return e + n
    }
    function v() {
        return Math.floor((new Date).getTime() / r)
    }
    function g(n) {
        return localStorage.getItem(e + u + n)
    }
    function p(n, t) {
        localStorage.removeItem(e + u + n);
        localStorage.setItem(e + u + n, t)
    }
    function m(n) {
        localStorage.removeItem(e + u + n)
    }
    function w(t) {
        var r = new RegExp("^" + e + h(u) + "(.*)");
        for (var i = localStorage.length - 1; i >= 0; --i) {
            var o = localStorage.key(i);
            o = o && o.match(r);
            o = o && o[1];
            if (o && o.indexOf(n) < 0) {
                t(o, d(o))
            }
        }
    }
    function y(e) {
        var n = d(e);
        m(e);
        m(n)
    }
    function S(e) {
        var n = d(e);
        var r = g(n);
        if (r) {
            var i = parseInt(r, t);
            if (v() >= i) {
                m(e);
                m(n);
                return true
            }
        }
    }
    function E(e, n) {
        if (!f)
            return;
        if (!("console"in window) || typeof window.console.warn !== "function")
            return;
        window.console.warn("lscache - " + e);
        if (n)
            window.console.warn("lscache - The error was: " + n.message)
    }
    var x = {
        set: function(e, n, r) {
            if (!c())
                return;
            if (!s())
                return;
            try {
                n = JSON.stringify(n)
            } catch (e) {
                return
            }
            try {
                p(e, n)
            } catch (r) {
                if (l(r)) {
                    var o = [];
                    var a;
                    w((function(e, n) {
                        var r = g(n);
                        if (r) {
                            r = parseInt(r, t)
                        } else {
                            r = i
                        }
                        o.push({
                            key: e,
                            size: (g(e) || "").length,
                            expiration: r
                        })
                    }
                    ));
                    o.sort((function(e, n) {
                        return n.expiration - e.expiration
                    }
                    ));
                    var u = (n || "").length;
                    while (o.length && u > 0) {
                        a = o.pop();
                        E("Cache is full, removing item with key '" + e + "'");
                        y(a.key);
                        u -= a.size
                    }
                    try {
                        p(e, n)
                    } catch (n) {
                        E("Could not add item with key '" + e + "', perhaps it's too big?", n);
                        return
                    }
                } else {
                    E("Could not add item with key '" + e + "'", r);
                    return
                }
            }
            if (r) {
                p(d(e), (v() + r).toString(t))
            } else {
                m(d(e))
            }
        },
        get: function(e) {
            if (!c())
                return null;
            if (S(e)) {
                return null
            }
            var n = g(e);
            if (!n || !s()) {
                return n
            }
            try {
                return JSON.parse(n)
            } catch (e) {
                return n
            }
        },
        remove: function(e) {
            if (!c())
                return;
            y(e)
        },
        supported: function() {
            return c()
        },
        flush: function() {
            if (!c())
                return;
            w((function(e) {
                y(e)
            }
            ))
        },
        flushExpired: function() {
            if (!c())
                return;
            w((function(e) {
                S(e)
            }
            ))
        },
        setBucket: function(e) {
            u = e
        },
        resetBucket: function() {
            u = ""
        },
        enableWarnings: function(e) {
            f = e
        }
    };
    return x
}
));
/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
(function(e) {
    var n;
    if (typeof define === "function" && define.amd) {
        define(e);
        n = true
    }
    if (typeof exports === "object") {
        module.exports = e();
        n = true
    }
    if (!n) {
        var t = window.Cookies;
        var r = window.Cookies = e();
        r.noConflict = function() {
            window.Cookies = t;
            return r
        }
    }
}
)((function() {
    function e() {
        var e = 0;
        var n = {};
        for (; e < arguments.length; e++) {
            var t = arguments[e];
            for (var r in t) {
                n[r] = t[r]
            }
        }
        return n
    }
    function n(t) {
        function r(n, o, i) {
            if (typeof document === "undefined") {
                return
            }
            if (arguments.length > 1) {
                i = e({
                    path: "/"
                }, r.defaults, i);
                if (typeof i.expires === "number") {
                    i.expires = new Date(new Date * 1 + i.expires * 864e5)
                }
                i.expires = i.expires ? i.expires.toUTCString() : "";
                try {
                    var c = JSON.stringify(o);
                    if (/^[\{\[]/.test(c)) {
                        o = c
                    }
                } catch (e) {}
                o = t.write ? t.write(o, n) : encodeURIComponent(String(o)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                n = encodeURIComponent(String(n)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
                var f = "";
                for (var a in i) {
                    if (!i[a]) {
                        continue
                    }
                    f += "; " + a;
                    if (i[a] === true) {
                        continue
                    }
                    f += "=" + i[a].split(";")[0]
                }
                return document.cookie = n + "=" + o + f
            }
            var u = {};
            var s = function(e) {
                return e.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent)
            };
            var p = document.cookie ? document.cookie.split("; ") : [];
            var d = 0;
            for (; d < p.length; d++) {
                var l = p[d].split("=");
                var v = l.slice(1).join("=");
                if (!this.json && v.charAt(0) === '"') {
                    v = v.slice(1, -1)
                }
                try {
                    var C = s(l[0]);
                    v = (t.read || t)(v, C) || s(v);
                    if (this.json) {
                        try {
                            v = JSON.parse(v)
                        } catch (e) {}
                    }
                    u[C] = v;
                    if (n === C) {
                        break
                    }
                } catch (e) {}
            }
            return n ? u[n] : u
        }
        r.set = r;
        r.get = function(e) {
            return r.call(r, e)
        }
        ;
        r.getJSON = function(e) {
            return r.call({
                json: true
            }, e)
        }
        ;
        r.remove = function(n, t) {
            r(n, "", e(t, {
                expires: -1
            }))
        }
        ;
        r.defaults = {};
        r.withConverter = n;
        return r
    }
    return n((function() {}
    ))
}
));
