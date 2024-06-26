/**!
 * Sortable
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
(function e(t) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define(t)
    } else if (typeof module != "undefined" && typeof module.exports != "undefined") {
        module.exports = t()
    } else {
        window["Sortable"] = t()
    }
}
)((function e() {
    "use strict";
    if (typeof window === "undefined" || !window.document) {
        return function e() {
            throw new Error("Sortable.js requires a window with a document")
        }
    }
    var t, i, n, r, o, l, a, s, f, c, u, d, h, p, g = [], v = false, m = false, b = false, w = [], _, y, D, S, C, T, E, x, N = false, M = false, X, Y, k, P, I = /\s+/g, A = "Sortable" + (new Date).getTime(), O = window, B = O.document, H = O.parseInt, R = O.setTimeout, L = O.jQuery || O.Zepto, W = O.Polymer, F = {
        capture: false,
        passive: false
    }, z = !!navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie|iemobile)/i), j = !!navigator.userAgent.match(/Edge/i), U = j || z ? "cssFloat" : "float", V = "draggable"in B.createElement("div"), q = function() {
        if (z) {
            return false
        }
        var e = B.createElement("x");
        e.style.cssText = "pointer-events:auto";
        return e.style.pointerEvents === "auto"
    }(), G = false, K = false, Z = Math.abs, Q = Math.min, J = [], $ = function(e, t) {
        var i = _e(e)
          , n = H(i.width) - H(i.paddingLeft) - H(i.paddingRight) - H(i.borderLeftWidth) - H(i.borderRightWidth)
          , r = xe(e, 0, t)
          , o = xe(e, 1, t)
          , l = r && _e(r)
          , a = o && _e(o)
          , s = l && H(l.marginLeft) + H(l.marginRight) + ze(r).width
          , f = a && H(a.marginLeft) + H(a.marginRight) + ze(o).width;
        if (i.display === "flex") {
            return i.flexDirection === "column" || i.flexDirection === "column-reverse" ? "vertical" : "horizontal"
        }
        if (i.display === "grid") {
            return i.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal"
        }
        if (r && l.float !== "none") {
            var c = l.float === "left" ? "left" : "right";
            return o && (a.clear === "both" || a.clear === c) ? "vertical" : "horizontal"
        }
        return r && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || s >= n && i[U] === "none" || o && i[U] === "none" && s + f > n) ? "vertical" : "horizontal"
    }, ee = function(e, t) {
        for (var i = 0; i < w.length; i++) {
            if (w[i].children.length)
                continue;
            var n = ze(w[i])
              , r = w[i][A].options.emptyInsertThreshold
              , o = e >= n.left - r && e <= n.right + r
              , l = t >= n.top - r && t <= n.bottom + r;
            if (o && l) {
                return w[i]
            }
        }
    }, te = function(e, t, i, n, r) {
        var o = ze(i)
          , l = n === "vertical" ? o.left : o.top
          , a = n === "vertical" ? o.right : o.bottom
          , s = n === "vertical" ? e : t;
        return l < s && s < a
    }, ie = function(e, i, n) {
        var r = e === t && P || ze(e)
          , o = i === t && P || ze(i)
          , l = n === "vertical" ? r.left : r.top
          , a = n === "vertical" ? r.right : r.bottom
          , s = n === "vertical" ? r.width : r.height
          , f = n === "vertical" ? o.left : o.top
          , c = n === "vertical" ? o.right : o.bottom
          , u = n === "vertical" ? o.width : o.height;
        return l === f || a === c || l + s / 2 === f + u / 2
    }, ne = function(e, t) {
        if (!e || !e.getBoundingClientRect)
            return O;
        var i = e;
        var n = false;
        do {
            if (i.clientWidth < i.scrollWidth || i.clientHeight < i.scrollHeight) {
                var r = _e(i);
                if (i.clientWidth < i.scrollWidth && (r.overflowX == "auto" || r.overflowX == "scroll") || i.clientHeight < i.scrollHeight && (r.overflowY == "auto" || r.overflowY == "scroll")) {
                    if (!i || !i.getBoundingClientRect || i === B.body)
                        return O;
                    if (n || t)
                        return i;
                    n = true
                }
            }
        } while (i = i.parentNode);
        return O
    }, re = Oe((function(e, t, i, n) {
        if (t.scroll) {
            var r = i ? i[A] : window
              , o = t.scrollSensitivity
              , l = t.scrollSpeed
              , a = e.clientX
              , u = e.clientY
              , d = window.innerWidth
              , h = window.innerHeight
              , p = false;
            if (f !== i) {
                oe();
                s = t.scroll;
                c = t.scrollFn;
                if (s === true) {
                    s = ne(i, true);
                    f = s
                }
            }
            var m = 0;
            var b = s;
            do {
                var w = b, _ = ze(w), y = _.top, D = _.bottom, S = _.left, T = _.right, E = _.width, x = _.height, N, M, X, Y, k, P, I, H, R;
                if (w !== O) {
                    N = w.scrollWidth;
                    M = w.scrollHeight;
                    X = _e(w);
                    P = E < N && (X.overflowX === "auto" || X.overflowX === "scroll");
                    I = x < M && (X.overflowY === "auto" || X.overflowY === "scroll");
                    H = w.scrollLeft;
                    R = w.scrollTop
                } else {
                    N = B.documentElement.scrollWidth;
                    M = B.documentElement.scrollHeight;
                    X = _e(B.documentElement);
                    P = E < N && (X.overflowX === "auto" || X.overflowX === "scroll" || X.overflowX === "visible");
                    I = x < M && (X.overflowY === "auto" || X.overflowY === "scroll" || X.overflowY === "visible");
                    H = B.documentElement.scrollLeft;
                    R = B.documentElement.scrollTop
                }
                Y = P && (Z(T - a) <= o && H + E < N) - (Z(S - a) <= o && !!H);
                k = I && (Z(D - u) <= o && R + x < M) - (Z(y - u) <= o && !!R);
                if (!g[m]) {
                    for (var L = 0; L <= m; L++) {
                        if (!g[L]) {
                            g[L] = {}
                        }
                    }
                }
                if (g[m].vx != Y || g[m].vy != k || g[m].el !== w) {
                    g[m].el = w;
                    g[m].vx = Y;
                    g[m].vy = k;
                    clearInterval(g[m].pid);
                    if (w && (Y != 0 || k != 0)) {
                        p = true;
                        g[m].pid = setInterval(function() {
                            if (n && this.layer === 0) {
                                he.active._emulateDragOver(true)
                            }
                            var t = g[this.layer].vy ? g[this.layer].vy * l : 0;
                            var i = g[this.layer].vx ? g[this.layer].vx * l : 0;
                            if ("function" === typeof c) {
                                if (c.call(r, i, t, e, C, g[this.layer].el) !== "continue") {
                                    return
                                }
                            }
                            if (g[this.layer].el === O) {
                                O.scrollTo(O.pageXOffset + i, O.pageYOffset + t)
                            } else {
                                g[this.layer].el.scrollTop += t;
                                g[this.layer].el.scrollLeft += i
                            }
                        }
                        .bind({
                            layer: m
                        }), 24)
                    }
                }
                m++
            } while (t.bubbleScroll && b !== O && (b = ne(b, false)));
            v = p
        }
    }
    ), 30), oe = function() {
        g.forEach((function(e) {
            clearInterval(e.pid)
        }
        ));
        g = []
    }, le = function(e) {
        function t(e, i) {
            return function(n, r, o, l) {
                var a = n.options.group.name && r.options.group.name && n.options.group.name === r.options.group.name;
                if (e == null && (i || a)) {
                    return true
                } else if (e == null || e === false) {
                    return false
                } else if (i && e === "clone") {
                    return e
                } else if (typeof e === "function") {
                    return t(e(n, r, o, l), i)(n, r, o, l)
                } else {
                    var s = (i ? n : r).options.group.name;
                    return e === true || typeof e === "string" && e === s || e.join && e.indexOf(s) > -1
                }
            }
        }
        var i = {};
        var n = e.group;
        if (!n || typeof n != "object") {
            n = {
                name: n
            }
        }
        i.name = n.name;
        i.checkPull = t(n.pull, true);
        i.checkPut = t(n.put);
        i.revertClone = n.revertClone;
        e.group = i
    }, ae = function(e) {
        if (!t || !t.parentNode)
            return;
        t.parentNode[A] && t.parentNode[A]._computeIsAligned(e)
    }, se = function(e, t) {
        var i = t;
        while (!i[A]) {
            i = i.parentNode
        }
        return e === i
    }, fe = function(e, t, i) {
        var n = e.parentNode;
        while (n && !n[A]) {
            n = n.parentNode
        }
        if (n) {
            n[A][i](He(t, {
                artificialBubble: true
            }))
        }
    }, ce = function() {
        if (!q && n) {
            _e(n, "display", "none")
        }
    }, ue = function() {
        if (!q && n) {
            _e(n, "display", "")
        }
    };
    B.addEventListener("click", (function(e) {
        if (b) {
            e.preventDefault();
            e.stopPropagation && e.stopPropagation();
            e.stopImmediatePropagation && e.stopImmediatePropagation();
            b = false;
            return false
        }
    }
    ), true);
    var de = function(e) {
        e = e.touches ? e.touches[0] : e;
        if (t) {
            var i = ee(e.clientX, e.clientY);
            if (i) {
                i[A]._onDragOver({
                    clientX: e.clientX,
                    clientY: e.clientY,
                    target: i,
                    rootEl: i
                })
            }
        }
    };
    me(B, "dragover", de);
    me(B, "mousemove", de);
    me(B, "touchmove", de);
    function he(e, t) {
        if (!(e && e.nodeType && e.nodeType === 1)) {
            throw "Sortable: `el` must be HTMLElement, not " + {}.toString.call(e)
        }
        this.el = e;
        this.options = t = He({}, t);
        e[A] = this;
        var i = {
            group: null,
            sort: true,
            disabled: false,
            store: null,
            handle: null,
            scroll: true,
            scrollSensitivity: 30,
            scrollSpeed: 10,
            bubbleScroll: true,
            draggable: /[uo]l/i.test(e.nodeName) ? ">li" : ">*",
            swapThreshold: 1,
            invertSwap: false,
            invertedSwapThreshold: null,
            removeCloneOnHide: true,
            direction: function() {
                return $(e, this.options)
            },
            ghostClass: "sortable-ghost",
            chosenClass: "sortable-chosen",
            dragClass: "sortable-drag",
            ignore: "a, img",
            filter: null,
            preventOnFilter: true,
            animation: 0,
            easing: null,
            setData: function(e, t) {
                e.setData("Text", t.textContent)
            },
            dropBubble: false,
            dragoverBubble: false,
            dataIdAttr: "data-id",
            delay: 0,
            touchStartThreshold: H(window.devicePixelRatio, 10) || 1,
            forceFallback: false,
            fallbackClass: "sortable-fallback",
            fallbackOnBody: false,
            fallbackTolerance: 0,
            fallbackOffset: {
                x: 0,
                y: 0
            },
            supportPointer: he.supportPointer !== false && ("PointerEvent"in window || window.navigator && "msPointerEnabled"in window.navigator),
            emptyInsertThreshold: 5
        };
        for (var n in i) {
            !(n in t) && (t[n] = i[n])
        }
        le(t);
        for (var r in this) {
            if (r.charAt(0) === "_" && typeof this[r] === "function") {
                this[r] = this[r].bind(this)
            }
        }
        this.nativeDraggable = t.forceFallback ? false : V;
        if (t.supportPointer) {
            me(e, "pointerdown", this._onTapStart)
        } else {
            me(e, "mousedown", this._onTapStart);
            me(e, "touchstart", this._onTapStart)
        }
        if (this.nativeDraggable) {
            me(e, "dragover", this);
            me(e, "dragenter", this)
        }
        w.push(this.el);
        t.store && t.store.get && this.sort(t.store.get(this) || [])
    }
    he.prototype = {
        constructor: he,
        _computeIsAligned: function(e) {
            var i;
            if (n && !q) {
                ce();
                i = B.elementFromPoint(e.clientX, e.clientY);
                ue()
            } else {
                i = e.target
            }
            i = pe(i, this.options.draggable, this.el, false);
            if (K)
                return;
            if (!t || t.parentNode !== this.el)
                return;
            var r = this.el.children;
            for (var o = 0; o < r.length; o++) {
                if (pe(r[o], this.options.draggable, this.el, false) && r[o] !== i) {
                    r[o].sortableMouseAligned = te(e.clientX, e.clientY, r[o], this._getDirection(e, null), this.options)
                }
            }
            if (!pe(i, this.options.draggable, this.el, true)) {
                E = null
            }
            K = true;
            R((function() {
                K = false
            }
            ), 30)
        },
        _getDirection: function(e, i) {
            return typeof this.options.direction === "function" ? this.options.direction.call(this, e, i, t) : this.options.direction
        },
        _onTapStart: function(e) {
            if (!e.cancelable)
                return;
            var i = this, n = this.el, r = this.options, o = r.preventOnFilter, l = e.type, s = e.touches && e.touches[0], f = (s || e).target, c = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || f, u = r.filter, d;
            Le(n);
            if (z && !e.artificialBubble && !se(n, f)) {
                return
            }
            if (t) {
                return
            }
            if (/mousedown|pointerdown/.test(l) && e.button !== 0 || r.disabled) {
                return
            }
            if (c.isContentEditable) {
                return
            }
            f = pe(f, r.draggable, n, false);
            if (!f) {
                if (z) {
                    fe(n, e, "_onTapStart")
                }
                return
            }
            if (a === f) {
                return
            }
            d = Pe(f, r.draggable);
            if (typeof u === "function") {
                if (u.call(this, e, f, this)) {
                    Se(i, c, "filter", f, n, n, d);
                    o && e.cancelable && e.preventDefault();
                    return
                }
            } else if (u) {
                u = u.split(",").some((function(e) {
                    e = pe(c, e.trim(), n, false);
                    if (e) {
                        Se(i, e, "filter", f, n, n, d);
                        return true
                    }
                }
                ));
                if (u) {
                    o && e.cancelable && e.preventDefault();
                    return
                }
            }
            if (r.handle && !pe(c, r.handle, n, false)) {
                return
            }
            this._prepareDragStart(e, s, f, d)
        },
        _handleAutoScroll: function(e, i) {
            if (!t || !this.options.scroll)
                return;
            var n = e.clientX
              , r = e.clientY
              , o = B.elementFromPoint(n, r)
              , l = this;
            if (i || j || z) {
                re(e, l.options, o, i);
                var a = ne(o, true);
                if (v && (!_ || n !== y || r !== D)) {
                    _ && clearInterval(_);
                    _ = setInterval((function() {
                        if (!t)
                            return;
                        var o = ne(B.elementFromPoint(n, r), true);
                        if (o !== a) {
                            a = o;
                            oe();
                            re(e, l.options, a, i)
                        }
                    }
                    ), 10);
                    y = n;
                    D = r
                }
            } else {
                if (!l.options.bubbleScroll || ne(o, true) === window) {
                    oe();
                    return
                }
                re(e, l.options, ne(o, false), false)
            }
        },
        _prepareDragStart: function(e, n, r, s) {
            var f = this, c = f.el, d = f.options, p = c.ownerDocument, g;
            if (r && !t && r.parentNode === c) {
                o = c;
                t = r;
                i = t.parentNode;
                l = t.nextSibling;
                a = r;
                h = d.group;
                u = s;
                S = {
                    target: t,
                    clientX: (n || e).clientX,
                    clientY: (n || e).clientY
                };
                this._lastX = (n || e).clientX;
                this._lastY = (n || e).clientY;
                t.style["will-change"] = "all";
                t.style.transition = "";
                t.style.transform = "";
                g = function() {
                    f._disableDelayedDrag();
                    t.draggable = f.nativeDraggable;
                    f._triggerDragStart(e, n);
                    Se(f, o, "choose", t, o, o, u);
                    we(t, d.chosenClass, true)
                }
                ;
                d.ignore.split(",").forEach((function(e) {
                    De(t, e.trim(), Te)
                }
                ));
                if (d.supportPointer) {
                    me(p, "pointerup", f._onDrop)
                } else {
                    me(p, "mouseup", f._onDrop);
                    me(p, "touchend", f._onDrop);
                    me(p, "touchcancel", f._onDrop)
                }
                if (d.delay) {
                    me(p, "mouseup", f._disableDelayedDrag);
                    me(p, "touchend", f._disableDelayedDrag);
                    me(p, "touchcancel", f._disableDelayedDrag);
                    me(p, "mousemove", f._delayedDragTouchMoveHandler);
                    me(p, "touchmove", f._delayedDragTouchMoveHandler);
                    d.supportPointer && me(p, "pointermove", f._delayedDragTouchMoveHandler);
                    f._dragStartTimer = R(g, d.delay)
                } else {
                    g()
                }
            }
        },
        _delayedDragTouchMoveHandler: function(e) {
            var t = e.touches ? e.touches[0] : e;
            if (Q(Z(t.clientX - this._lastX), Z(t.clientY - this._lastY)) >= this.options.touchStartThreshold) {
                this._disableDelayedDrag()
            }
        },
        _disableDelayedDrag: function() {
            var e = this.el.ownerDocument;
            clearTimeout(this._dragStartTimer);
            be(e, "mouseup", this._disableDelayedDrag);
            be(e, "touchend", this._disableDelayedDrag);
            be(e, "touchcancel", this._disableDelayedDrag);
            be(e, "mousemove", this._delayedDragTouchMoveHandler);
            be(e, "touchmove", this._delayedDragTouchMoveHandler);
            be(e, "pointermove", this._delayedDragTouchMoveHandler)
        },
        _triggerDragStart: function(e, i) {
            i = i || (e.pointerType == "touch" ? e : null);
            if (!this.nativeDraggable || i) {
                if (this.options.supportPointer) {
                    me(B, "pointermove", this._onTouchMove)
                } else if (i) {
                    me(B, "touchmove", this._onTouchMove)
                } else {
                    me(B, "mousemove", this._onTouchMove)
                }
            } else {
                me(t, "dragend", this);
                me(o, "dragstart", this._onDragStart)
            }
            try {
                if (B.selection) {
                    We((function() {
                        B.selection.empty()
                    }
                    ))
                } else {
                    window.getSelection().removeAllRanges()
                }
            } catch (e) {}
        },
        _dragStarted: function(e) {
            m = false;
            if (o && t) {
                if (this.nativeDraggable) {
                    me(B, "dragover", this._handleAutoScroll);
                    me(B, "dragover", ae)
                }
                var i = this.options;
                !e && we(t, i.dragClass, false);
                we(t, i.ghostClass, true);
                _e(t, "transform", "");
                he.active = this;
                e && this._appendGhost();
                Se(this, o, "start", t, o, o, u)
            } else {
                this._nulling()
            }
        },
        _emulateDragOver: function(e) {
            if (C) {
                if (this._lastX === C.clientX && this._lastY === C.clientY && !e) {
                    return
                }
                this._lastX = C.clientX;
                this._lastY = C.clientY;
                ce();
                var i = B.elementFromPoint(C.clientX, C.clientY);
                var n = i;
                while (i && i.shadowRoot) {
                    i = i.shadowRoot.elementFromPoint(C.clientX, C.clientY);
                    n = i
                }
                if (n) {
                    do {
                        if (n[A]) {
                            var r;
                            r = n[A]._onDragOver({
                                clientX: C.clientX,
                                clientY: C.clientY,
                                target: i,
                                rootEl: n
                            });
                            if (r && !this.options.dragoverBubble) {
                                break
                            }
                        }
                        i = n
                    } while (n = n.parentNode)
                }
                t.parentNode[A]._computeIsAligned(C);
                ue()
            }
        },
        _onTouchMove: function(e) {
            if (S) {
                var t = this.options
                  , i = t.fallbackTolerance
                  , r = t.fallbackOffset
                  , o = e.touches ? e.touches[0] : e
                  , l = n && ye(n)
                  , a = n && l && l.a
                  , s = n && l && l.d
                  , f = (o.clientX - S.clientX + r.x) / (a ? a : 1)
                  , c = (o.clientY - S.clientY + r.y) / (s ? s : 1)
                  , u = e.touches ? "translate3d(" + f + "px," + c + "px,0)" : "translate(" + f + "px," + c + "px)";
                if (!he.active && !m) {
                    if (i && Q(Z(o.clientX - this._lastX), Z(o.clientY - this._lastY)) < i) {
                        return
                    }
                    this._onDragStart(e, true)
                }
                this._handleAutoScroll(o, true);
                T = true;
                C = o;
                _e(n, "webkitTransform", u);
                _e(n, "mozTransform", u);
                _e(n, "msTransform", u);
                _e(n, "transform", u);
                e.cancelable && e.preventDefault()
            }
        },
        _appendGhost: function() {
            if (!n) {
                var e = ze(t, this.options.fallbackOnBody ? B.body : o, true)
                  , i = _e(t)
                  , r = this.options;
                n = t.cloneNode(true);
                we(n, r.ghostClass, false);
                we(n, r.fallbackClass, true);
                we(n, r.dragClass, true);
                _e(n, "box-sizing", "border-box");
                _e(n, "margin", 0);
                _e(n, "top", e.top);
                _e(n, "left", e.left);
                _e(n, "width", e.width);
                _e(n, "height", e.height);
                _e(n, "opacity", "0.8");
                _e(n, "position", "fixed");
                _e(n, "zIndex", "100000");
                _e(n, "pointerEvents", "none");
                r.fallbackOnBody && B.body.appendChild(n) || o.appendChild(n)
            }
        },
        _onDragStart: function(e, i) {
            var n = this;
            var l = e.dataTransfer;
            var a = n.options;
            r = Re(t);
            r.draggable = false;
            r.style["will-change"] = "";
            this._hideClone();
            we(r, n.options.chosenClass, false);
            n._cloneId = We((function() {
                if (!n.options.removeCloneOnHide) {
                    o.insertBefore(r, t)
                }
                Se(n, o, "clone", t)
            }
            ));
            !i && we(t, a.dragClass, true);
            if (i) {
                b = true;
                n._loopId = setInterval(n._emulateDragOver, 50)
            } else {
                be(B, "mouseup", n._onDrop);
                be(B, "touchend", n._onDrop);
                be(B, "touchcancel", n._onDrop);
                if (l) {
                    l.effectAllowed = "move";
                    a.setData && a.setData.call(n, l, t)
                }
                me(B, "drop", n);
                _e(t, "transform", "translateZ(0)")
            }
            m = true;
            n._dragStartId = We(n._dragStarted.bind(n, i));
            me(B, "selectstart", n)
        },
        _onDragOver: function(e) {
            var r = this.el, a = e.target, s, f, c, d = this.options, g = d.group, m = he.active, w = h === g, _ = d.sort, y = this;
            if (G)
                return;
            if (z && !e.rootEl && !e.artificialBubble && !se(r, a)) {
                return
            }
            function D() {
                if (m) {
                    we(t, p ? p.options.ghostClass : m.options.ghostClass, false);
                    we(t, d.ghostClass, true)
                }
                if (p !== y && y !== he.active) {
                    p = y
                } else if (y === he.active) {
                    p = null
                }
                if (a === t && !t.animated || a === r && !a.animated) {
                    E = null
                }
                if (!d.dragoverBubble && !e.rootEl && a !== B) {
                    y._handleAutoScroll(e);
                    t.parentNode[A]._computeIsAligned(e)
                }
                !d.dragoverBubble && e.stopPropagation && e.stopPropagation();
                return true
            }
            function S() {
                Se(y, o, "change", a, r, o, u, Pe(t, d.draggable), e)
            }
            if (e.preventDefault !== void 0) {
                e.cancelable && e.preventDefault()
            }
            T = true;
            a = pe(a, d.draggable, r, true);
            if (!!pe(e.target, null, t, true) || a.animated) {
                return D()
            }
            if (a !== t) {
                b = false
            }
            if (m && !d.disabled && (w ? _ || (c = !o.contains(t)) : p === this || (this.lastPutMode = h.checkPull(this, m, t, e)) && g.checkPut(this, m, t, e))) {
                var C = this._getDirection(e, a);
                s = ze(t);
                if (c) {
                    this._hideClone();
                    i = o;
                    if (l) {
                        o.insertBefore(t, l)
                    } else {
                        o.appendChild(t)
                    }
                    return D()
                }
                if (r.children.length === 0 || r.children[0] === n || Me(e, C, r) && !t.animated) {
                    if (r.children.length !== 0 && r.children[0] !== n && r === e.target) {
                        a = Ne(r)
                    }
                    if (a) {
                        f = ze(a)
                    }
                    if (w) {
                        m._hideClone()
                    } else {
                        m._showClone(this)
                    }
                    if (Ce(o, r, t, s, a, f, e, !!a) !== false) {
                        r.appendChild(t);
                        i = r;
                        P = null;
                        S();
                        this._animate(s, t);
                        a && this._animate(f, a);
                        return D()
                    }
                } else if (a && a !== t && a.parentNode === r) {
                    var k = 0, I, O = a.sortableMouseAligned, H = t.parentNode !== r, L = je(a, C === "vertical" ? "top" : "left");
                    if (E !== a) {
                        X = null;
                        I = ze(a)[C === "vertical" ? "top" : "left"];
                        N = false
                    }
                    if (ie(t, a, C) && O || H || L || d.invertSwap || X === "insert" || X === "swap") {
                        if (X !== "swap") {
                            M = d.invertSwap || H || v || L
                        }
                        k = Xe(e, a, C, d.swapThreshold, d.invertedSwapThreshold == null ? d.swapThreshold : d.invertedSwapThreshold, M, E === a);
                        X = "swap"
                    } else {
                        k = Ye(a, d);
                        X = "insert"
                    }
                    if (k === 0)
                        return D();
                    P = null;
                    E = a;
                    x = k;
                    f = ze(a);
                    var W = a.nextElementSibling
                      , F = false;
                    F = k === 1;
                    var j = Ce(o, r, t, s, a, f, e, F);
                    if (j !== false) {
                        if (j === 1 || j === -1) {
                            F = j === 1
                        }
                        G = true;
                        R(Ee, 30);
                        if (w) {
                            m._hideClone()
                        } else {
                            m._showClone(this)
                        }
                        if (F && !W) {
                            r.appendChild(t)
                        } else {
                            a.parentNode.insertBefore(t, F ? W : a)
                        }
                        i = t.parentNode;
                        if (I !== undefined && !M) {
                            Y = Z(I - ze(a)[C === "vertical" ? "top" : "left"])
                        }
                        S();
                        !H && this._animate(f, a);
                        this._animate(s, t);
                        return D()
                    }
                }
                if (r.contains(t)) {
                    return D()
                }
            }
            if (z && !e.rootEl) {
                fe(r, e, "_onDragOver")
            }
            return false
        },
        _animate: function(e, i) {
            var n = this.options.animation;
            if (n) {
                var r = ze(i);
                if (i === t) {
                    P = r
                }
                if (e.nodeType === 1) {
                    e = ze(e)
                }
                if (e.left + e.width / 2 !== r.left + r.width / 2 || e.top + e.height / 2 !== r.top + r.height / 2) {
                    var o = ye(this.el)
                      , l = o && o.a
                      , a = o && o.d;
                    _e(i, "transition", "none");
                    _e(i, "transform", "translate3d(" + (e.left - r.left) / (l ? l : 1) + "px," + (e.top - r.top) / (a ? a : 1) + "px,0)");
                    k = i.offsetWidth;
                    _e(i, "transition", "transform " + n + "ms" + (this.options.easing ? " " + this.options.easing : ""));
                    _e(i, "transform", "translate3d(0,0,0)")
                }
                typeof i.animated === "number" && clearTimeout(i.animated);
                i.animated = R((function() {
                    _e(i, "transition", "");
                    _e(i, "transform", "");
                    i.animated = false
                }
                ), n)
            }
        },
        _offUpEvents: function() {
            var e = this.el.ownerDocument;
            be(B, "touchmove", this._onTouchMove);
            be(B, "pointermove", this._onTouchMove);
            be(e, "mouseup", this._onDrop);
            be(e, "touchend", this._onDrop);
            be(e, "pointerup", this._onDrop);
            be(e, "touchcancel", this._onDrop);
            be(B, "selectstart", this)
        },
        _onDrop: function(e) {
            var a = this.el
              , s = this.options;
            m = false;
            v = false;
            M = false;
            N = false;
            clearInterval(this._loopId);
            clearInterval(_);
            oe();
            Be();
            clearTimeout(this._dragStartTimer);
            Fe(this._cloneId);
            Fe(this._dragStartId);
            be(B, "mousemove", this._onTouchMove);
            if (this.nativeDraggable) {
                be(B, "drop", this);
                be(a, "dragstart", this._onDragStart);
                be(B, "dragover", this._handleAutoScroll);
                be(B, "dragover", ae)
            }
            this._offUpEvents();
            if (e) {
                if (T) {
                    e.cancelable && e.preventDefault();
                    !s.dropBubble && e.stopPropagation()
                }
                n && n.parentNode && n.parentNode.removeChild(n);
                if (o === i || p && p.lastPutMode !== "clone") {
                    r && r.parentNode && r.parentNode.removeChild(r)
                }
                if (t) {
                    if (this.nativeDraggable) {
                        be(t, "dragend", this)
                    }
                    Te(t);
                    t.style["will-change"] = "";
                    we(t, p ? p.options.ghostClass : this.options.ghostClass, false);
                    we(t, this.options.chosenClass, false);
                    Se(this, o, "unchoose", t, i, o, u, null, e);
                    if (o !== i) {
                        d = Pe(t, s.draggable);
                        if (d >= 0) {
                            Se(null, i, "add", t, i, o, u, d, e);
                            Se(this, o, "remove", t, i, o, u, d, e);
                            Se(null, i, "sort", t, i, o, u, d, e);
                            Se(this, o, "sort", t, i, o, u, d, e)
                        }
                        p && p.save()
                    } else {
                        if (t.nextSibling !== l) {
                            d = Pe(t, s.draggable);
                            if (d >= 0) {
                                Se(this, o, "update", t, i, o, u, d, e);
                                Se(this, o, "sort", t, i, o, u, d, e)
                            }
                        }
                    }
                    if (he.active) {
                        if (d == null || d === -1) {
                            d = u
                        }
                        Se(this, o, "end", t, i, o, u, d, e);
                        this.save()
                    }
                }
            }
            this._nulling()
        },
        _nulling: function() {
            o = t = i = n = l = r = a = s = f = g.length = _ = y = D = S = C = T = d = u = E = x = k = P = p = h = he.active = null;
            J.forEach((function(e) {
                e.checked = true
            }
            ));
            J.length = 0
        },
        handleEvent: function(e) {
            switch (e.type) {
            case "drop":
            case "dragend":
                this._onDrop(e);
                break;
            case "dragenter":
            case "dragover":
                if (t) {
                    this._onDragOver(e);
                    ve(e)
                }
                break;
            case "selectstart":
                e.preventDefault();
                break
            }
        },
        toArray: function() {
            var e = [], t, i = this.el.children, n = 0, r = i.length, o = this.options;
            for (; n < r; n++) {
                t = i[n];
                if (pe(t, o.draggable, this.el, false)) {
                    e.push(t.getAttribute(o.dataIdAttr) || ke(t))
                }
            }
            return e
        },
        sort: function(e) {
            var t = {}
              , i = this.el;
            this.toArray().forEach((function(e, n) {
                var r = i.children[n];
                if (pe(r, this.options.draggable, i, false)) {
                    t[e] = r
                }
            }
            ), this);
            e.forEach((function(e) {
                if (t[e]) {
                    i.removeChild(t[e]);
                    i.appendChild(t[e])
                }
            }
            ))
        },
        save: function() {
            var e = this.options.store;
            e && e.set && e.set(this)
        },
        closest: function(e, t) {
            return pe(e, t || this.options.draggable, this.el, false)
        },
        option: function(e, t) {
            var i = this.options;
            if (t === void 0) {
                return i[e]
            } else {
                i[e] = t;
                if (e === "group") {
                    le(i)
                }
            }
        },
        destroy: function() {
            var e = this.el;
            e[A] = null;
            be(e, "mousedown", this._onTapStart);
            be(e, "touchstart", this._onTapStart);
            be(e, "pointerdown", this._onTapStart);
            if (this.nativeDraggable) {
                be(e, "dragover", this);
                be(e, "dragenter", this)
            }
            Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), (function(e) {
                e.removeAttribute("draggable")
            }
            ));
            this._onDrop();
            w.splice(w.indexOf(this.el), 1);
            this.el = e = null
        },
        _hideClone: function() {
            if (!r.cloneHidden) {
                _e(r, "display", "none");
                r.cloneHidden = true;
                if (r.parentNode && this.options.removeCloneOnHide) {
                    r.parentNode.removeChild(r)
                }
            }
        },
        _showClone: function(e) {
            if (e.lastPutMode !== "clone") {
                this._hideClone();
                return
            }
            if (r.cloneHidden) {
                if (o.contains(t) && !this.options.group.revertClone) {
                    o.insertBefore(r, t)
                } else if (l) {
                    o.insertBefore(r, l)
                } else {
                    o.appendChild(r)
                }
                if (this.options.group.revertClone) {
                    this._animate(t, r)
                }
                _e(r, "display", "");
                r.cloneHidden = false
            }
        }
    };
    function pe(e, t, i, n) {
        if (e) {
            i = i || B;
            do {
                if (t != null && (t[0] === ">" && e.parentNode === i && Ie(e, t.substring(1)) || Ie(e, t)) || n && e === i) {
                    return e
                }
                if (e === i)
                    break
            } while (e = ge(e))
        }
        return null
    }
    function ge(e) {
        return e.host && e !== B && e.host.nodeType ? e.host : e.parentNode
    }
    function ve(e) {
        if (e.dataTransfer) {
            e.dataTransfer.dropEffect = "move"
        }
        e.cancelable && e.preventDefault()
    }
    function me(e, t, i) {
        e.addEventListener(t, i, F)
    }
    function be(e, t, i) {
        e.removeEventListener(t, i, F)
    }
    function we(e, t, i) {
        if (e && t) {
            if (e.classList) {
                e.classList[i ? "add" : "remove"](t)
            } else {
                var n = (" " + e.className + " ").replace(I, " ").replace(" " + t + " ", " ");
                e.className = (n + (i ? " " + t : "")).replace(I, " ")
            }
        }
    }
    function _e(e, t, i) {
        var n = e && e.style;
        if (n) {
            if (i === void 0) {
                if (B.defaultView && B.defaultView.getComputedStyle) {
                    i = B.defaultView.getComputedStyle(e, "")
                } else if (e.currentStyle) {
                    i = e.currentStyle
                }
                return t === void 0 ? i : i[t]
            } else {
                if (!(t in n) && t.indexOf("webkit") === -1) {
                    t = "-webkit-" + t
                }
                n[t] = i + (typeof i === "string" ? "" : "px")
            }
        }
    }
    function ye(e) {
        var t = "";
        do {
            var i = _e(e, "transform");
            if (i && i !== "none") {
                t = i + " " + t
            }
        } while (e = e.parentNode);
        if (window.DOMMatrix) {
            return new DOMMatrix(t)
        } else if (window.WebKitCSSMatrix) {
            return new WebKitCSSMatrix(t)
        } else if (window.CSSMatrix) {
            return new CSSMatrix(t)
        }
    }
    function De(e, t, i) {
        if (e) {
            var n = e.getElementsByTagName(t)
              , r = 0
              , o = n.length;
            if (i) {
                for (; r < o; r++) {
                    i(n[r], r)
                }
            }
            return n
        }
        return []
    }
    function Se(e, t, i, n, o, l, a, s, f) {
        e = e || t[A];
        var c, u = e.options, d = "on" + i.charAt(0).toUpperCase() + i.substr(1);
        if (window.CustomEvent && !z && !j) {
            c = new CustomEvent(i,{
                bubbles: true,
                cancelable: true
            })
        } else {
            c = B.createEvent("Event");
            c.initEvent(i, true, true)
        }
        c.to = o || t;
        c.from = l || t;
        c.item = n || t;
        c.clone = r;
        c.oldIndex = a;
        c.newIndex = s;
        c.originalEvent = f;
        if (t) {
            t.dispatchEvent(c)
        }
        if (u[d]) {
            u[d].call(e, c)
        }
    }
    function Ce(e, t, i, n, r, o, l, a) {
        var s, f = e[A], c = f.options.onMove, u;
        if (window.CustomEvent && !z && !j) {
            s = new CustomEvent("move",{
                bubbles: true,
                cancelable: true
            })
        } else {
            s = B.createEvent("Event");
            s.initEvent("move", true, true)
        }
        s.to = t;
        s.from = e;
        s.dragged = i;
        s.draggedRect = n;
        s.related = r || t;
        s.relatedRect = o || ze(t);
        s.willInsertAfter = a;
        s.originalEvent = l;
        e.dispatchEvent(s);
        if (c) {
            u = c.call(f, s, l)
        }
        return u
    }
    function Te(e) {
        e.draggable = false
    }
    function Ee() {
        G = false
    }
    function xe(e, i, r) {
        var o = 0
          , l = 0
          , a = e.children;
        while (l < a.length) {
            if (a[l].style.display !== "none" && a[l] !== n && a[l] !== t && pe(a[l], r.draggable, e, false)) {
                if (o === i) {
                    return a[l]
                }
                o++
            }
            l++
        }
        return null
    }
    function Ne(e) {
        var t = e.lastElementChild;
        while (t === n || t.style.display === "none") {
            t = t.previousElementSibling;
            if (!t)
                break
        }
        return t || null
    }
    function Me(e, t, i) {
        var n = ze(Ne(i))
          , r = t === "vertical" ? e.clientY : e.clientX
          , o = t === "vertical" ? e.clientX : e.clientY
          , l = t === "vertical" ? n.bottom : n.right
          , a = t === "vertical" ? n.left : n.top
          , s = t === "vertical" ? n.right : n.bottom
          , f = 10;
        return t === "vertical" ? o > s + f || o <= s && r > l && o >= a : r > l && o > a || r <= l && o > s + f
    }
    function Xe(e, i, n, r, o, l, a) {
        var s = ze(i)
          , f = n === "vertical" ? e.clientY : e.clientX
          , c = n === "vertical" ? s.height : s.width
          , u = n === "vertical" ? s.top : s.left
          , d = n === "vertical" ? s.bottom : s.right
          , h = ze(t)
          , p = false;
        if (!l) {
            if (a && Y < c * r) {
                if (!N && (x === 1 ? f > u + c * o / 2 : f < d - c * o / 2)) {
                    N = true
                }
                if (!N) {
                    var g = n === "vertical" ? h.top : h.left
                      , v = n === "vertical" ? h.bottom : h.right;
                    if (x === 1 ? f < u + Y : f > d - Y) {
                        return x * -1
                    }
                } else {
                    p = true
                }
            } else {
                if (f > u + c * (1 - r) / 2 && f < d - c * (1 - r) / 2) {
                    return f > u + c / 2 ? -1 : 1
                }
            }
        }
        p = p || l;
        if (p) {
            if (f < u + c * o / 2 || f > d - c * o / 2) {
                return f > u + c / 2 ? 1 : -1
            }
        }
        return 0
    }
    function Ye(e, i) {
        var n = Pe(t, i.draggable)
          , r = Pe(e, i.draggable);
        if (n < r) {
            return 1
        } else {
            return -1
        }
    }
    function ke(e) {
        var t = e.tagName + e.className + e.src + e.href + e.textContent
          , i = t.length
          , n = 0;
        while (i--) {
            n += t.charCodeAt(i)
        }
        return n.toString(36)
    }
    function Pe(e, t) {
        var i = 0;
        if (!e || !e.parentNode) {
            return -1
        }
        while (e && (e = e.previousElementSibling)) {
            if (e.nodeName.toUpperCase() !== "TEMPLATE" && e !== r) {
                i++
            }
        }
        return i
    }
    function Ie(e, t) {
        if (e) {
            try {
                if (e.matches) {
                    return e.matches(t)
                } else if (e.msMatchesSelector) {
                    return e.msMatchesSelector(t)
                } else if (e.webkitMatchesSelector) {
                    return e.webkitMatchesSelector(t)
                }
            } catch (e) {
                return false
            }
        }
        return false
    }
    var Ae;
    function Oe(e, t) {
        return function() {
            if (!Ae) {
                var i = arguments
                  , n = this;
                Ae = R((function() {
                    if (i.length === 1) {
                        e.call(n, i[0])
                    } else {
                        e.apply(n, i)
                    }
                    Ae = void 0
                }
                ), t)
            }
        }
    }
    function Be() {
        clearTimeout(Ae);
        Ae = void 0
    }
    function He(e, t) {
        if (e && t) {
            for (var i in t) {
                if (t.hasOwnProperty(i)) {
                    e[i] = t[i]
                }
            }
        }
        return e
    }
    function Re(e) {
        if (W && W.dom) {
            return W.dom(e).cloneNode(true)
        } else if (L) {
            return L(e).clone(true)[0]
        } else {
            return e.cloneNode(true)
        }
    }
    function Le(e) {
        J.length = 0;
        var t = e.getElementsByTagName("input");
        var i = t.length;
        while (i--) {
            var n = t[i];
            n.checked && J.push(n)
        }
    }
    function We(e) {
        return R(e, 0)
    }
    function Fe(e) {
        return clearTimeout(e)
    }
    function ze(e, t, i) {
        if (!e.getBoundingClientRect && e !== O)
            return;
        var n, r, o, l, a, s, f;
        if (e !== O) {
            n = e.getBoundingClientRect();
            r = n.top;
            o = n.left;
            l = n.bottom;
            a = n.right;
            s = n.height;
            f = n.width
        } else {
            r = 0;
            o = 0;
            l = window.innerHeight;
            a = window.innerWidth;
            s = window.innerHeight;
            f = window.innerWidth
        }
        if (i && e !== O) {
            t = t || e.parentNode;
            if (!z) {
                do {
                    if (t && t.getBoundingClientRect && _e(t, "transform") !== "none") {
                        var c = t.getBoundingClientRect();
                        r -= c.top + H(_e(t, "border-top-width"));
                        o -= c.left + H(_e(t, "border-left-width"));
                        l = r + n.height;
                        a = o + n.width;
                        break
                    }
                } while (t = t.parentNode)
            }
            var u = ye(e)
              , d = u && u.a
              , h = u && u.d;
            if (u) {
                r /= h;
                o /= d;
                f /= d;
                s /= h;
                l = r + s;
                a = o + f
            }
        }
        return {
            top: r,
            left: o,
            bottom: l,
            right: a,
            width: f,
            height: s
        }
    }
    function je(e, t) {
        var i = ne(i, true)
          , n = ze(e)[t];
        while (i) {
            var r = ze(i)[t], o;
            if (t === "top" || t === "left") {
                o = n >= r
            } else {
                o = n <= r
            }
            if (!o)
                return true;
            if (i === O)
                break;
            i = ne(i, false)
        }
        return false
    }
    me(B, "touchmove", (function(e) {
        if ((he.active || m) && e.cancelable) {
            e.preventDefault()
        }
    }
    ));
    he.utils = {
        on: me,
        off: be,
        css: _e,
        find: De,
        is: function(e, t) {
            return !!pe(e, t, e, false)
        },
        extend: He,
        throttle: Oe,
        closest: pe,
        toggleClass: we,
        clone: Re,
        index: Pe,
        nextTick: We,
        cancelNextTick: Fe,
        detectDirection: $,
        getChild: xe
    };
    he.create = function(e, t) {
        return new he(e,t)
    }
    ;
    he.version = "1.8.3";
    return he
}
));
/*!
 * Draggabilly PACKAGED v2.2.0
 * Make that shiz draggable
 * https://draggabilly.desandro.com
 * MIT license
 */
(function(t, e) {
    if (typeof define == "function" && define.amd) {
        define("jquery-bridget/jquery-bridget", ["jquery"], (function(i) {
            return e(t, i)
        }
        ))
    } else if (typeof module == "object" && module.exports) {
        module.exports = e(t, require("jquery"))
    } else {
        t.jQueryBridget = e(t, t.jQuery)
    }
}
)(window, (function t(e, i) {
    "use strict";
    var n = Array.prototype.slice;
    var o = e.console;
    var r = typeof o == "undefined" ? function() {}
    : function(t) {
        o.error(t)
    }
    ;
    function s(t, o, s) {
        s = s || i || e.jQuery;
        if (!s) {
            return
        }
        if (!o.prototype.option) {
            o.prototype.option = function(t) {
                if (!s.isPlainObject(t)) {
                    return
                }
                this.options = s.extend(true, this.options, t)
            }
        }
        s.fn[t] = function(t) {
            if (typeof t == "string") {
                var e = n.call(arguments, 1);
                return u(this, t, e)
            }
            h(this, t);
            return this
        }
        ;
        function u(e, i, n) {
            var o;
            var a = "$()." + t + '("' + i + '")';
            e.each((function(e, u) {
                var h = s.data(u, t);
                if (!h) {
                    r(t + " not initialized. Cannot call methods, i.e. " + a);
                    return
                }
                var d = h[i];
                if (!d || i.charAt(0) == "_") {
                    r(a + " is not a valid method");
                    return
                }
                var f = d.apply(h, n);
                o = o === undefined ? f : o
            }
            ));
            return o !== undefined ? o : e
        }
        function h(e, i) {
            e.each((function(e, n) {
                var r = s.data(n, t);
                if (r) {
                    r.option(i);
                    r._init()
                } else {
                    r = new o(n,i);
                    s.data(n, t, r)
                }
            }
            ))
        }
        a(s)
    }
    function a(t) {
        if (!t || t && t.bridget) {
            return
        }
        t.bridget = s
    }
    a(i || e.jQuery);
    return s
}
));
/*!
 * getSize v2.0.2
 * measure size of elements
 * MIT license
 */
(function(t, e) {
    "use strict";
    if (typeof define == "function" && define.amd) {
        define("get-size/get-size", [], (function() {
            return e()
        }
        ))
    } else if (typeof module == "object" && module.exports) {
        module.exports = e()
    } else {
        t.getSize = e()
    }
}
)(window, (function t() {
    "use strict";
    function e(t) {
        var e = parseFloat(t);
        var i = t.indexOf("%") == -1 && !isNaN(e);
        return i && e
    }
    function i() {}
    var n = typeof console == "undefined" ? i : function(t) {
        console.error(t)
    }
    ;
    var o = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
    var r = o.length;
    function s() {
        var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        };
        for (var e = 0; e < r; e++) {
            var i = o[e];
            t[i] = 0
        }
        return t
    }
    function a(t) {
        var e = getComputedStyle(t);
        if (!e) {
            n("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? " + "See http://bit.ly/getsizebug1")
        }
        return e
    }
    var u = false;
    var h;
    function d() {
        if (u) {
            return
        }
        u = true;
        var t = document.createElement("div");
        t.style.width = "200px";
        t.style.padding = "1px 2px 3px 4px";
        t.style.borderStyle = "solid";
        t.style.borderWidth = "1px 2px 3px 4px";
        t.style.boxSizing = "border-box";
        var i = document.body || document.documentElement;
        i.appendChild(t);
        var n = a(t);
        f.isBoxSizeOuter = h = e(n.width) == 200;
        i.removeChild(t)
    }
    function f(t) {
        d();
        if (typeof t == "string") {
            t = document.querySelector(t)
        }
        if (!t || typeof t != "object" || !t.nodeType) {
            return
        }
        var i = a(t);
        if (i.display == "none") {
            return s()
        }
        var n = {};
        n.width = t.offsetWidth;
        n.height = t.offsetHeight;
        var u = n.isBorderBox = i.boxSizing == "border-box";
        for (var f = 0; f < r; f++) {
            var c = o[f];
            var p = i[c];
            var v = parseFloat(p);
            n[c] = !isNaN(v) ? v : 0
        }
        var l = n.paddingLeft + n.paddingRight;
        var g = n.paddingTop + n.paddingBottom;
        var m = n.marginLeft + n.marginRight;
        var y = n.marginTop + n.marginBottom;
        var b = n.borderLeftWidth + n.borderRightWidth;
        var E = n.borderTopWidth + n.borderBottomWidth;
        var _ = u && h;
        var x = e(i.width);
        if (x !== false) {
            n.width = x + (_ ? 0 : l + b)
        }
        var P = e(i.height);
        if (P !== false) {
            n.height = P + (_ ? 0 : g + E)
        }
        n.innerWidth = n.width - (l + b);
        n.innerHeight = n.height - (g + E);
        n.outerWidth = n.width + m;
        n.outerHeight = n.height + y;
        return n
    }
    return f
}
));
(function(t, e) {
    if (typeof define == "function" && define.amd) {
        define("ev-emitter/ev-emitter", e)
    } else if (typeof module == "object" && module.exports) {
        module.exports = e()
    } else {
        t.EvEmitter = e()
    }
}
)(typeof window != "undefined" ? window : this, (function() {
    function t() {}
    var e = t.prototype;
    e.on = function(t, e) {
        if (!t || !e) {
            return
        }
        var i = this._events = this._events || {};
        var n = i[t] = i[t] || [];
        if (n.indexOf(e) == -1) {
            n.push(e)
        }
        return this
    }
    ;
    e.once = function(t, e) {
        if (!t || !e) {
            return
        }
        this.on(t, e);
        var i = this._onceEvents = this._onceEvents || {};
        var n = i[t] = i[t] || {};
        n[e] = true;
        return this
    }
    ;
    e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (!i || !i.length) {
            return
        }
        var n = i.indexOf(e);
        if (n != -1) {
            i.splice(n, 1)
        }
        return this
    }
    ;
    e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (!i || !i.length) {
            return
        }
        i = i.slice(0);
        e = e || [];
        var n = this._onceEvents && this._onceEvents[t];
        for (var o = 0; o < i.length; o++) {
            var r = i[o];
            var s = n && n[r];
            if (s) {
                this.off(t, r);
                delete n[r]
            }
            r.apply(this, e)
        }
        return this
    }
    ;
    e.allOff = function() {
        delete this._events;
        delete this._onceEvents
    }
    ;
    return t
}
));
/*!
 * Unipointer v2.3.0
 * base class for doing one thing with pointer event
 * MIT license
 */
(function(t, e) {
    if (typeof define == "function" && define.amd) {
        define("unipointer/unipointer", ["ev-emitter/ev-emitter"], (function(i) {
            return e(t, i)
        }
        ))
    } else if (typeof module == "object" && module.exports) {
        module.exports = e(t, require("ev-emitter"))
    } else {
        t.Unipointer = e(t, t.EvEmitter)
    }
}
)(window, (function t(e, i) {
    function n() {}
    function o() {}
    var r = o.prototype = Object.create(i.prototype);
    r.bindStartEvent = function(t) {
        this._bindStartEvent(t, true)
    }
    ;
    r.unbindStartEvent = function(t) {
        this._bindStartEvent(t, false)
    }
    ;
    r._bindStartEvent = function(t, i) {
        i = i === undefined ? true : i;
        var n = i ? "addEventListener" : "removeEventListener";
        var o = "mousedown";
        if (e.PointerEvent) {
            o = "pointerdown"
        } else if ("ontouchstart"in e) {
            o = "touchstart"
        }
        t[n](o, this)
    }
    ;
    r.handleEvent = function(t) {
        var e = "on" + t.type;
        if (this[e]) {
            this[e](t)
        }
    }
    ;
    r.getTouch = function(t) {
        for (var e = 0; e < t.length; e++) {
            var i = t[e];
            if (i.identifier == this.pointerIdentifier) {
                return i
            }
        }
    }
    ;
    r.onmousedown = function(t) {
        var e = t.button;
        if (e && (e !== 0 && e !== 1)) {
            return
        }
        this._pointerDown(t, t)
    }
    ;
    r.ontouchstart = function(t) {
        this._pointerDown(t, t.changedTouches[0])
    }
    ;
    r.onpointerdown = function(t) {
        this._pointerDown(t, t)
    }
    ;
    r._pointerDown = function(t, e) {
        if (t.button || this.isPointerDown) {
            return
        }
        this.isPointerDown = true;
        this.pointerIdentifier = e.pointerId !== undefined ? e.pointerId : e.identifier;
        this.pointerDown(t, e)
    }
    ;
    r.pointerDown = function(t, e) {
        this._bindPostStartEvents(t);
        this.emitEvent("pointerDown", [t, e])
    }
    ;
    var s = {
        mousedown: ["mousemove", "mouseup"],
        touchstart: ["touchmove", "touchend", "touchcancel"],
        pointerdown: ["pointermove", "pointerup", "pointercancel"]
    };
    r._bindPostStartEvents = function(t) {
        if (!t) {
            return
        }
        var i = s[t.type];
        i.forEach((function(t) {
            e.addEventListener(t, this)
        }
        ), this);
        this._boundPointerEvents = i
    }
    ;
    r._unbindPostStartEvents = function() {
        if (!this._boundPointerEvents) {
            return
        }
        this._boundPointerEvents.forEach((function(t) {
            e.removeEventListener(t, this)
        }
        ), this);
        delete this._boundPointerEvents
    }
    ;
    r.onmousemove = function(t) {
        this._pointerMove(t, t)
    }
    ;
    r.onpointermove = function(t) {
        if (t.pointerId == this.pointerIdentifier) {
            this._pointerMove(t, t)
        }
    }
    ;
    r.ontouchmove = function(t) {
        var e = this.getTouch(t.changedTouches);
        if (e) {
            this._pointerMove(t, e)
        }
    }
    ;
    r._pointerMove = function(t, e) {
        this.pointerMove(t, e)
    }
    ;
    r.pointerMove = function(t, e) {
        this.emitEvent("pointerMove", [t, e])
    }
    ;
    r.onmouseup = function(t) {
        this._pointerUp(t, t)
    }
    ;
    r.onpointerup = function(t) {
        if (t.pointerId == this.pointerIdentifier) {
            this._pointerUp(t, t)
        }
    }
    ;
    r.ontouchend = function(t) {
        var e = this.getTouch(t.changedTouches);
        if (e) {
            this._pointerUp(t, e)
        }
    }
    ;
    r._pointerUp = function(t, e) {
        this._pointerDone();
        this.pointerUp(t, e)
    }
    ;
    r.pointerUp = function(t, e) {
        this.emitEvent("pointerUp", [t, e])
    }
    ;
    r._pointerDone = function() {
        this._pointerReset();
        this._unbindPostStartEvents();
        this.pointerDone()
    }
    ;
    r._pointerReset = function() {
        this.isPointerDown = false;
        delete this.pointerIdentifier
    }
    ;
    r.pointerDone = n;
    r.onpointercancel = function(t) {
        if (t.pointerId == this.pointerIdentifier) {
            this._pointerCancel(t, t)
        }
    }
    ;
    r.ontouchcancel = function(t) {
        var e = this.getTouch(t.changedTouches);
        if (e) {
            this._pointerCancel(t, e)
        }
    }
    ;
    r._pointerCancel = function(t, e) {
        this._pointerDone();
        this.pointerCancel(t, e)
    }
    ;
    r.pointerCancel = function(t, e) {
        this.emitEvent("pointerCancel", [t, e])
    }
    ;
    o.getPointerPoint = function(t) {
        return {
            x: t.pageX,
            y: t.pageY
        }
    }
    ;
    return o
}
));
/*!
 * Unidragger v2.3.0
 * Draggable base class
 * MIT license
 */
(function(t, e) {
    if (typeof define == "function" && define.amd) {
        define("unidragger/unidragger", ["unipointer/unipointer"], (function(i) {
            return e(t, i)
        }
        ))
    } else if (typeof module == "object" && module.exports) {
        module.exports = e(t, require("unipointer"))
    } else {
        t.Unidragger = e(t, t.Unipointer)
    }
}
)(window, (function t(e, i) {
    function n() {}
    var o = n.prototype = Object.create(i.prototype);
    o.bindHandles = function() {
        this._bindHandles(true)
    }
    ;
    o.unbindHandles = function() {
        this._bindHandles(false)
    }
    ;
    o._bindHandles = function(t) {
        t = t === undefined ? true : t;
        var i = t ? "addEventListener" : "removeEventListener";
        var n = t ? this._touchActionValue : "";
        for (var o = 0; o < this.handles.length; o++) {
            var r = this.handles[o];
            this._bindStartEvent(r, t);
            r[i]("click", this);
            if (e.PointerEvent) {
                r.style.touchAction = n
            }
        }
    }
    ;
    o._touchActionValue = "none";
    o.pointerDown = function(t, e) {
        var i = this.okayPointerDown(t);
        if (!i) {
            return
        }
        this.pointerDownPointer = e;
        t.preventDefault();
        this.pointerDownBlur();
        this._bindPostStartEvents(t);
        this.emitEvent("pointerDown", [t, e])
    }
    ;
    var r = {
        TEXTAREA: true,
        INPUT: true,
        SELECT: true,
        OPTION: true
    };
    var s = {
        radio: true,
        checkbox: true,
        button: true,
        submit: true,
        image: true,
        file: true
    };
    o.okayPointerDown = function(t) {
        var e = r[t.target.nodeName];
        var i = s[t.target.type];
        var n = !e || i;
        if (!n) {
            this._pointerReset()
        }
        return n
    }
    ;
    o.pointerDownBlur = function() {
        var t = document.activeElement;
        var e = t && t.blur && t != document.body;
        if (e) {
            t.blur()
        }
    }
    ;
    o.pointerMove = function(t, e) {
        var i = this._dragPointerMove(t, e);
        this.emitEvent("pointerMove", [t, e, i]);
        this._dragMove(t, e, i)
    }
    ;
    o._dragPointerMove = function(t, e) {
        var i = {
            x: e.pageX - this.pointerDownPointer.pageX,
            y: e.pageY - this.pointerDownPointer.pageY
        };
        if (!this.isDragging && this.hasDragStarted(i)) {
            this._dragStart(t, e)
        }
        return i
    }
    ;
    o.hasDragStarted = function(t) {
        return Math.abs(t.x) > 3 || Math.abs(t.y) > 3
    }
    ;
    o.pointerUp = function(t, e) {
        this.emitEvent("pointerUp", [t, e]);
        this._dragPointerUp(t, e)
    }
    ;
    o._dragPointerUp = function(t, e) {
        if (this.isDragging) {
            this._dragEnd(t, e)
        } else {
            this._staticClick(t, e)
        }
    }
    ;
    o._dragStart = function(t, e) {
        this.isDragging = true;
        this.isPreventingClicks = true;
        this.dragStart(t, e)
    }
    ;
    o.dragStart = function(t, e) {
        this.emitEvent("dragStart", [t, e])
    }
    ;
    o._dragMove = function(t, e, i) {
        if (!this.isDragging) {
            return
        }
        this.dragMove(t, e, i)
    }
    ;
    o.dragMove = function(t, e, i) {
        t.preventDefault();
        this.emitEvent("dragMove", [t, e, i])
    }
    ;
    o._dragEnd = function(t, e) {
        this.isDragging = false;
        setTimeout(function() {
            delete this.isPreventingClicks
        }
        .bind(this));
        this.dragEnd(t, e)
    }
    ;
    o.dragEnd = function(t, e) {
        this.emitEvent("dragEnd", [t, e])
    }
    ;
    o.onclick = function(t) {
        if (this.isPreventingClicks) {
            t.preventDefault()
        }
    }
    ;
    o._staticClick = function(t, e) {
        if (this.isIgnoringMouseUp && t.type == "mouseup") {
            return
        }
        this.staticClick(t, e);
        if (t.type != "mouseup") {
            this.isIgnoringMouseUp = true;
            setTimeout(function() {
                delete this.isIgnoringMouseUp
            }
            .bind(this), 400)
        }
    }
    ;
    o.staticClick = function(t, e) {
        this.emitEvent("staticClick", [t, e])
    }
    ;
    n.getPointerPoint = i.getPointerPoint;
    return n
}
));
/*!
 * Draggabilly v2.2.0
 * Make that shiz draggable
 * https://draggabilly.desandro.com
 * MIT license
 */
(function(t, e) {
    if (typeof define == "function" && define.amd) {
        define(["get-size/get-size", "unidragger/unidragger"], (function(i, n) {
            return e(t, i, n)
        }
        ))
    } else if (typeof module == "object" && module.exports) {
        module.exports = e(t, require("get-size"), require("unidragger"))
    } else {
        t.Draggabilly = e(t, t.getSize, t.Unidragger)
    }
}
)(window, (function t(e, i, n) {
    function o(t, e) {
        for (var i in e) {
            t[i] = e[i]
        }
        return t
    }
    function r() {}
    var s = e.jQuery;
    function a(t, e) {
        this.element = typeof t == "string" ? document.querySelector(t) : t;
        if (s) {
            this.$element = s(this.element)
        }
        this.options = o({}, this.constructor.defaults);
        this.option(e);
        this._create()
    }
    var u = a.prototype = Object.create(n.prototype);
    a.defaults = {};
    u.option = function(t) {
        o(this.options, t)
    }
    ;
    var h = {
        relative: true,
        absolute: true,
        fixed: true
    };
    u._create = function() {
        this.position = {};
        this._getPosition();
        this.startPoint = {
            x: 0,
            y: 0
        };
        this.dragPoint = {
            x: 0,
            y: 0
        };
        this.startPosition = o({}, this.position);
        var t = getComputedStyle(this.element);
        if (!h[t.position]) {
            this.element.style.position = "relative"
        }
        this.on("pointerDown", this.onPointerDown);
        this.on("pointerMove", this.onPointerMove);
        this.on("pointerUp", this.onPointerUp);
        this.enable();
        this.setHandles()
    }
    ;
    u.setHandles = function() {
        this.handles = this.options.handle ? this.element.querySelectorAll(this.options.handle) : [this.element];
        this.bindHandles()
    }
    ;
    u.dispatchEvent = function(t, e, i) {
        var n = [e].concat(i);
        this.emitEvent(t, n);
        this.dispatchJQueryEvent(t, e, i)
    }
    ;
    u.dispatchJQueryEvent = function(t, i, n) {
        var o = e.jQuery;
        if (!o || !this.$element) {
            return
        }
        var r = o.Event(i);
        r.type = t;
        this.$element.trigger(r, n)
    }
    ;
    u._getPosition = function() {
        var t = getComputedStyle(this.element);
        var e = this._getPositionCoord(t.left, "width");
        var i = this._getPositionCoord(t.top, "height");
        this.position.x = isNaN(e) ? 0 : e;
        this.position.y = isNaN(i) ? 0 : i;
        this._addTransformPosition(t)
    }
    ;
    u._getPositionCoord = function(t, e) {
        if (t.indexOf("%") != -1) {
            var n = i(this.element.parentNode);
            return !n ? 0 : parseFloat(t) / 100 * n[e]
        }
        return parseInt(t, 10)
    }
    ;
    u._addTransformPosition = function(t) {
        var e = t.transform;
        if (e.indexOf("matrix") !== 0) {
            return
        }
        var i = e.split(",");
        var n = e.indexOf("matrix3d") === 0 ? 12 : 4;
        var o = parseInt(i[n], 10);
        var r = parseInt(i[n + 1], 10);
        this.position.x += o;
        this.position.y += r
    }
    ;
    u.onPointerDown = function(t, e) {
        this.element.classList.add("is-pointer-down");
        this.dispatchJQueryEvent("pointerDown", t, [e])
    }
    ;
    u.dragStart = function(t, e) {
        if (!this.isEnabled) {
            return
        }
        this._getPosition();
        this.measureContainment();
        this.startPosition.x = this.position.x;
        this.startPosition.y = this.position.y;
        this.setLeftTop();
        this.dragPoint.x = 0;
        this.dragPoint.y = 0;
        this.element.classList.add("is-dragging");
        this.dispatchEvent("dragStart", t, [e]);
        this.animate()
    }
    ;
    u.measureContainment = function() {
        var t = this.getContainer();
        if (!t) {
            return
        }
        var e = i(this.element);
        var n = i(t);
        var o = this.element.getBoundingClientRect();
        var r = t.getBoundingClientRect();
        var s = n.borderLeftWidth + n.borderRightWidth;
        var a = n.borderTopWidth + n.borderBottomWidth;
        var u = this.relativeStartPosition = {
            x: o.left - (r.left + n.borderLeftWidth),
            y: o.top - (r.top + n.borderTopWidth)
        };
        this.containSize = {
            width: n.width - s - u.x - e.width,
            height: n.height - a - u.y - e.height
        }
    }
    ;
    u.getContainer = function() {
        var t = this.options.containment;
        if (!t) {
            return
        }
        var e = t instanceof HTMLElement;
        if (e) {
            return t
        }
        if (typeof t == "string") {
            return document.querySelector(t)
        }
        return this.element.parentNode
    }
    ;
    u.onPointerMove = function(t, e, i) {
        this.dispatchJQueryEvent("pointerMove", t, [e, i])
    }
    ;
    u.dragMove = function(t, e, i) {
        if (!this.isEnabled) {
            return
        }
        var n = i.x;
        var o = i.y;
        var r = this.options.grid;
        var s = r && r[0];
        var a = r && r[1];
        n = d(n, s);
        o = d(o, a);
        n = this.containDrag("x", n, s);
        o = this.containDrag("y", o, a);
        n = this.options.axis == "y" ? 0 : n;
        o = this.options.axis == "x" ? 0 : o;
        this.position.x = this.startPosition.x + n;
        this.position.y = this.startPosition.y + o;
        this.dragPoint.x = n;
        this.dragPoint.y = o;
        this.dispatchEvent("dragMove", t, [e, i])
    }
    ;
    function d(t, e, i) {
        i = i || "round";
        return e ? Math[i](t / e) * e : t
    }
    u.containDrag = function(t, e, i) {
        if (!this.options.containment) {
            return e
        }
        var n = t == "x" ? "width" : "height";
        var o = this.relativeStartPosition[t];
        var r = d(-o, i, "ceil");
        var s = this.containSize[n];
        s = d(s, i, "floor");
        return Math.max(r, Math.min(s, e))
    }
    ;
    u.onPointerUp = function(t, e) {
        this.element.classList.remove("is-pointer-down");
        this.dispatchJQueryEvent("pointerUp", t, [e])
    }
    ;
    u.dragEnd = function(t, e) {
        if (!this.isEnabled) {
            return
        }
        this.element.style.transform = "";
        this.setLeftTop();
        this.element.classList.remove("is-dragging");
        this.dispatchEvent("dragEnd", t, [e])
    }
    ;
    u.animate = function() {
        if (!this.isDragging) {
            return
        }
        this.positionDrag();
        var t = this;
        requestAnimationFrame((function e() {
            t.animate()
        }
        ))
    }
    ;
    u.setLeftTop = function() {
        this.element.style.left = this.position.x + "px";
        this.element.style.top = this.position.y + "px"
    }
    ;
    u.positionDrag = function() {
        this.element.style.transform = "translate3d( " + this.dragPoint.x + "px, " + this.dragPoint.y + "px, 0)"
    }
    ;
    u.staticClick = function(t, e) {
        this.dispatchEvent("staticClick", t, [e])
    }
    ;
    u.setPosition = function(t, e) {
        this.position.x = t;
        this.position.y = e;
        this.setLeftTop()
    }
    ;
    u.enable = function() {
        this.isEnabled = true
    }
    ;
    u.disable = function() {
        this.isEnabled = false;
        if (this.isDragging) {
            this.dragEnd()
        }
    }
    ;
    u.destroy = function() {
        this.disable();
        this.element.style.transform = "";
        this.element.style.left = "";
        this.element.style.top = "";
        this.element.style.position = "";
        this.unbindHandles();
        if (this.$element) {
            this.$element.removeData("draggabilly")
        }
    }
    ;
    u._init = r;
    if (s && s.bridget) {
        s.bridget("draggabilly", a)
    }
    return a
}
));
(function() {
    var n = this;
    var r = n._;
    var t = Array.prototype
      , e = Object.prototype
      , i = Function.prototype;
    var u = t.push
      , a = t.slice
      , f = e.toString
      , o = e.hasOwnProperty;
    var c = Array.isArray
      , l = Object.keys
      , s = i.bind
      , v = Object.create;
    var p = function() {};
    var h = function(n) {
        if (n instanceof h)
            return n;
        if (!(this instanceof h))
            return new h(n);
        this._wrapped = n
    };
    if (typeof exports !== "undefined") {
        if (typeof module !== "undefined" && module.exports) {
            exports = module.exports = h
        }
        exports._ = h
    } else {
        n._ = h
    }
    h.VERSION = "1.8.3";
    var y = function(n, r, t) {
        if (r === void 0)
            return n;
        switch (t == null ? 3 : t) {
        case 1:
            return function(t) {
                return n.call(r, t)
            }
            ;
        case 2:
            return function(t, e) {
                return n.call(r, t, e)
            }
            ;
        case 3:
            return function(t, e, i) {
                return n.call(r, t, e, i)
            }
            ;
        case 4:
            return function(t, e, i, u) {
                return n.call(r, t, e, i, u)
            }
        }
        return function() {
            return n.apply(r, arguments)
        }
    };
    var d = function(n, r, t) {
        if (n == null)
            return h.identity;
        if (h.isFunction(n))
            return y(n, r, t);
        if (h.isObject(n))
            return h.matcher(n);
        return h.property(n)
    };
    h.iteratee = function(n, r) {
        return d(n, r, Infinity)
    }
    ;
    var g = function(n, r) {
        return function(t) {
            var e = arguments.length;
            if (e < 2 || t == null)
                return t;
            for (var i = 1; i < e; i++) {
                var u = arguments[i]
                  , a = n(u)
                  , f = a.length;
                for (var o = 0; o < f; o++) {
                    var c = a[o];
                    if (!r || t[c] === void 0)
                        t[c] = u[c]
                }
            }
            return t
        }
    };
    var m = function(n) {
        if (!h.isObject(n))
            return {};
        if (v)
            return v(n);
        p.prototype = n;
        var r = new p;
        p.prototype = null;
        return r
    };
    var b = function(n) {
        return function(r) {
            return r == null ? void 0 : r[n]
        }
    };
    var w = Math.pow(2, 53) - 1;
    var x = b("length");
    var _ = function(n) {
        var r = x(n);
        return typeof r == "number" && r >= 0 && r <= w
    };
    h.each = h.forEach = function(n, r, t) {
        r = y(r, t);
        var e, i;
        if (_(n)) {
            for (e = 0,
            i = n.length; e < i; e++) {
                r(n[e], e, n)
            }
        } else {
            var u = h.keys(n);
            for (e = 0,
            i = u.length; e < i; e++) {
                r(n[u[e]], u[e], n)
            }
        }
        return n
    }
    ;
    h.map = h.collect = function(n, r, t) {
        r = d(r, t);
        var e = !_(n) && h.keys(n)
          , i = (e || n).length
          , u = Array(i);
        for (var a = 0; a < i; a++) {
            var f = e ? e[a] : a;
            u[a] = r(n[f], f, n)
        }
        return u
    }
    ;
    function j(n) {
        function r(r, t, e, i, u, a) {
            for (; u >= 0 && u < a; u += n) {
                var f = i ? i[u] : u;
                e = t(e, r[f], f, r)
            }
            return e
        }
        return function(t, e, i, u) {
            e = y(e, u, 4);
            var a = !_(t) && h.keys(t)
              , f = (a || t).length
              , o = n > 0 ? 0 : f - 1;
            if (arguments.length < 3) {
                i = t[a ? a[o] : o];
                o += n
            }
            return r(t, e, i, a, o, f)
        }
    }
    h.reduce = h.foldl = h.inject = j(1);
    h.reduceRight = h.foldr = j(-1);
    h.find = h.detect = function(n, r, t) {
        var e;
        if (_(n)) {
            e = h.findIndex(n, r, t)
        } else {
            e = h.findKey(n, r, t)
        }
        if (e !== void 0 && e !== -1)
            return n[e]
    }
    ;
    h.filter = h.select = function(n, r, t) {
        var e = [];
        r = d(r, t);
        h.each(n, (function(n, t, i) {
            if (r(n, t, i))
                e.push(n)
        }
        ));
        return e
    }
    ;
    h.reject = function(n, r, t) {
        return h.filter(n, h.negate(d(r)), t)
    }
    ;
    h.every = h.all = function(n, r, t) {
        r = d(r, t);
        var e = !_(n) && h.keys(n)
          , i = (e || n).length;
        for (var u = 0; u < i; u++) {
            var a = e ? e[u] : u;
            if (!r(n[a], a, n))
                return false
        }
        return true
    }
    ;
    h.some = h.any = function(n, r, t) {
        r = d(r, t);
        var e = !_(n) && h.keys(n)
          , i = (e || n).length;
        for (var u = 0; u < i; u++) {
            var a = e ? e[u] : u;
            if (r(n[a], a, n))
                return true
        }
        return false
    }
    ;
    h.contains = h.includes = h.include = function(n, r, t, e) {
        if (!_(n))
            n = h.values(n);
        if (typeof t != "number" || e)
            t = 0;
        return h.indexOf(n, r, t) >= 0
    }
    ;
    h.invoke = function(n, r) {
        var t = a.call(arguments, 2);
        var e = h.isFunction(r);
        return h.map(n, (function(n) {
            var i = e ? r : n[r];
            return i == null ? i : i.apply(n, t)
        }
        ))
    }
    ;
    h.pluck = function(n, r) {
        return h.map(n, h.property(r))
    }
    ;
    h.where = function(n, r) {
        return h.filter(n, h.matcher(r))
    }
    ;
    h.findWhere = function(n, r) {
        return h.find(n, h.matcher(r))
    }
    ;
    h.max = function(n, r, t) {
        var e = -Infinity, i = -Infinity, u, a;
        if (r == null && n != null) {
            n = _(n) ? n : h.values(n);
            for (var f = 0, o = n.length; f < o; f++) {
                u = n[f];
                if (u > e) {
                    e = u
                }
            }
        } else {
            r = d(r, t);
            h.each(n, (function(n, t, u) {
                a = r(n, t, u);
                if (a > i || a === -Infinity && e === -Infinity) {
                    e = n;
                    i = a
                }
            }
            ))
        }
        return e
    }
    ;
    h.min = function(n, r, t) {
        var e = Infinity, i = Infinity, u, a;
        if (r == null && n != null) {
            n = _(n) ? n : h.values(n);
            for (var f = 0, o = n.length; f < o; f++) {
                u = n[f];
                if (u < e) {
                    e = u
                }
            }
        } else {
            r = d(r, t);
            h.each(n, (function(n, t, u) {
                a = r(n, t, u);
                if (a < i || a === Infinity && e === Infinity) {
                    e = n;
                    i = a
                }
            }
            ))
        }
        return e
    }
    ;
    h.shuffle = function(n) {
        var r = _(n) ? n : h.values(n);
        var t = r.length;
        var e = Array(t);
        for (var i = 0, u; i < t; i++) {
            u = h.random(0, i);
            if (u !== i)
                e[i] = e[u];
            e[u] = r[i]
        }
        return e
    }
    ;
    h.sample = function(n, r, t) {
        if (r == null || t) {
            if (!_(n))
                n = h.values(n);
            return n[h.random(n.length - 1)]
        }
        return h.shuffle(n).slice(0, Math.max(0, r))
    }
    ;
    h.sortBy = function(n, r, t) {
        r = d(r, t);
        return h.pluck(h.map(n, (function(n, t, e) {
            return {
                value: n,
                index: t,
                criteria: r(n, t, e)
            }
        }
        )).sort((function(n, r) {
            var t = n.criteria;
            var e = r.criteria;
            if (t !== e) {
                if (t > e || t === void 0)
                    return 1;
                if (t < e || e === void 0)
                    return -1
            }
            return n.index - r.index
        }
        )), "value")
    }
    ;
    var A = function(n) {
        return function(r, t, e) {
            var i = {};
            t = d(t, e);
            h.each(r, (function(e, u) {
                var a = t(e, u, r);
                n(i, e, a)
            }
            ));
            return i
        }
    };
    h.groupBy = A((function(n, r, t) {
        if (h.has(n, t))
            n[t].push(r);
        else
            n[t] = [r]
    }
    ));
    h.indexBy = A((function(n, r, t) {
        n[t] = r
    }
    ));
    h.countBy = A((function(n, r, t) {
        if (h.has(n, t))
            n[t]++;
        else
            n[t] = 1
    }
    ));
    h.toArray = function(n) {
        if (!n)
            return [];
        if (h.isArray(n))
            return a.call(n);
        if (_(n))
            return h.map(n, h.identity);
        return h.values(n)
    }
    ;
    h.size = function(n) {
        if (n == null)
            return 0;
        return _(n) ? n.length : h.keys(n).length
    }
    ;
    h.partition = function(n, r, t) {
        r = d(r, t);
        var e = []
          , i = [];
        h.each(n, (function(n, t, u) {
            (r(n, t, u) ? e : i).push(n)
        }
        ));
        return [e, i]
    }
    ;
    h.first = h.head = h.take = function(n, r, t) {
        if (n == null)
            return void 0;
        if (r == null || t)
            return n[0];
        return h.initial(n, n.length - r)
    }
    ;
    h.initial = function(n, r, t) {
        return a.call(n, 0, Math.max(0, n.length - (r == null || t ? 1 : r)))
    }
    ;
    h.last = function(n, r, t) {
        if (n == null)
            return void 0;
        if (r == null || t)
            return n[n.length - 1];
        return h.rest(n, Math.max(0, n.length - r))
    }
    ;
    h.rest = h.tail = h.drop = function(n, r, t) {
        return a.call(n, r == null || t ? 1 : r)
    }
    ;
    h.compact = function(n) {
        return h.filter(n, h.identity)
    }
    ;
    var k = function(n, r, t, e) {
        var i = []
          , u = 0;
        for (var a = e || 0, f = x(n); a < f; a++) {
            var o = n[a];
            if (_(o) && (h.isArray(o) || h.isArguments(o))) {
                if (!r)
                    o = k(o, r, t);
                var c = 0
                  , l = o.length;
                i.length += l;
                while (c < l) {
                    i[u++] = o[c++]
                }
            } else if (!t) {
                i[u++] = o
            }
        }
        return i
    };
    h.flatten = function(n, r) {
        return k(n, r, false)
    }
    ;
    h.without = function(n) {
        return h.difference(n, a.call(arguments, 1))
    }
    ;
    h.uniq = h.unique = function(n, r, t, e) {
        if (!h.isBoolean(r)) {
            e = t;
            t = r;
            r = false
        }
        if (t != null)
            t = d(t, e);
        var i = [];
        var u = [];
        for (var a = 0, f = x(n); a < f; a++) {
            var o = n[a]
              , c = t ? t(o, a, n) : o;
            if (r) {
                if (!a || u !== c)
                    i.push(o);
                u = c
            } else if (t) {
                if (!h.contains(u, c)) {
                    u.push(c);
                    i.push(o)
                }
            } else if (!h.contains(i, o)) {
                i.push(o)
            }
        }
        return i
    }
    ;
    h.union = function() {
        return h.uniq(k(arguments, true, true))
    }
    ;
    h.intersection = function(n) {
        var r = [];
        var t = arguments.length;
        for (var e = 0, i = x(n); e < i; e++) {
            var u = n[e];
            if (h.contains(r, u))
                continue;
            for (var a = 1; a < t; a++) {
                if (!h.contains(arguments[a], u))
                    break
            }
            if (a === t)
                r.push(u)
        }
        return r
    }
    ;
    h.difference = function(n) {
        var r = k(arguments, true, true, 1);
        return h.filter(n, (function(n) {
            return !h.contains(r, n)
        }
        ))
    }
    ;
    h.zip = function() {
        return h.unzip(arguments)
    }
    ;
    h.unzip = function(n) {
        var r = n && h.max(n, x).length || 0;
        var t = Array(r);
        for (var e = 0; e < r; e++) {
            t[e] = h.pluck(n, e)
        }
        return t
    }
    ;
    h.object = function(n, r) {
        var t = {};
        for (var e = 0, i = x(n); e < i; e++) {
            if (r) {
                t[n[e]] = r[e]
            } else {
                t[n[e][0]] = n[e][1]
            }
        }
        return t
    }
    ;
    function O(n) {
        return function(r, t, e) {
            t = d(t, e);
            var i = x(r);
            var u = n > 0 ? 0 : i - 1;
            for (; u >= 0 && u < i; u += n) {
                if (t(r[u], u, r))
                    return u
            }
            return -1
        }
    }
    h.findIndex = O(1);
    h.findLastIndex = O(-1);
    h.sortedIndex = function(n, r, t, e) {
        t = d(t, e, 1);
        var i = t(r);
        var u = 0
          , a = x(n);
        while (u < a) {
            var f = Math.floor((u + a) / 2);
            if (t(n[f]) < i)
                u = f + 1;
            else
                a = f
        }
        return u
    }
    ;
    function I(n, r, t) {
        return function(e, i, u) {
            var f = 0
              , o = x(e);
            if (typeof u == "number") {
                if (n > 0) {
                    f = u >= 0 ? u : Math.max(u + o, f)
                } else {
                    o = u >= 0 ? Math.min(u + 1, o) : u + o + 1
                }
            } else if (t && u && o) {
                u = t(e, i);
                return e[u] === i ? u : -1
            }
            if (i !== i) {
                u = r(a.call(e, f, o), h.isNaN);
                return u >= 0 ? u + f : -1
            }
            for (u = n > 0 ? f : o - 1; u >= 0 && u < o; u += n) {
                if (e[u] === i)
                    return u
            }
            return -1
        }
    }
    h.indexOf = I(1, h.findIndex, h.sortedIndex);
    h.lastIndexOf = I(-1, h.findLastIndex);
    h.range = function(n, r, t) {
        if (r == null) {
            r = n || 0;
            n = 0
        }
        t = t || 1;
        var e = Math.max(Math.ceil((r - n) / t), 0);
        var i = Array(e);
        for (var u = 0; u < e; u++,
        n += t) {
            i[u] = n
        }
        return i
    }
    ;
    var F = function(n, r, t, e, i) {
        if (!(e instanceof r))
            return n.apply(t, i);
        var u = m(n.prototype);
        var a = n.apply(u, i);
        if (h.isObject(a))
            return a;
        return u
    };
    h.bind = function(n, r) {
        if (s && n.bind === s)
            return s.apply(n, a.call(arguments, 1));
        if (!h.isFunction(n))
            throw new TypeError("Bind must be called on a function");
        var t = a.call(arguments, 2);
        var e = function() {
            return F(n, e, r, this, t.concat(a.call(arguments)))
        };
        return e
    }
    ;
    h.partial = function(n) {
        var r = a.call(arguments, 1);
        var t = function() {
            var e = 0
              , i = r.length;
            var u = Array(i);
            for (var a = 0; a < i; a++) {
                u[a] = r[a] === h ? arguments[e++] : r[a]
            }
            while (e < arguments.length)
                u.push(arguments[e++]);
            return F(n, t, this, this, u)
        };
        return t
    }
    ;
    h.bindAll = function(n) {
        var r, t = arguments.length, e;
        if (t <= 1)
            throw new Error("bindAll must be passed function names");
        for (r = 1; r < t; r++) {
            e = arguments[r];
            n[e] = h.bind(n[e], n)
        }
        return n
    }
    ;
    h.memoize = function(n, r) {
        var t = function(e) {
            var i = t.cache;
            var u = "" + (r ? r.apply(this, arguments) : e);
            if (!h.has(i, u))
                i[u] = n.apply(this, arguments);
            return i[u]
        };
        t.cache = {};
        return t
    }
    ;
    h.delay = function(n, r) {
        var t = a.call(arguments, 2);
        return setTimeout((function() {
            return n.apply(null, t)
        }
        ), r)
    }
    ;
    h.defer = h.partial(h.delay, h, 1);
    h.throttle = function(n, r, t) {
        var e, i, u;
        var a = null;
        var f = 0;
        if (!t)
            t = {};
        var o = function() {
            f = t.leading === false ? 0 : h.now();
            a = null;
            u = n.apply(e, i);
            if (!a)
                e = i = null
        };
        return function() {
            var c = h.now();
            if (!f && t.leading === false)
                f = c;
            var l = r - (c - f);
            e = this;
            i = arguments;
            if (l <= 0 || l > r) {
                if (a) {
                    clearTimeout(a);
                    a = null
                }
                f = c;
                u = n.apply(e, i);
                if (!a)
                    e = i = null
            } else if (!a && t.trailing !== false) {
                a = setTimeout(o, l)
            }
            return u
        }
    }
    ;
    h.debounce = function(n, r, t) {
        var e, i, u, a, f;
        var o = function() {
            var c = h.now() - a;
            if (c < r && c >= 0) {
                e = setTimeout(o, r - c)
            } else {
                e = null;
                if (!t) {
                    f = n.apply(u, i);
                    if (!e)
                        u = i = null
                }
            }
        };
        return function() {
            u = this;
            i = arguments;
            a = h.now();
            var c = t && !e;
            if (!e)
                e = setTimeout(o, r);
            if (c) {
                f = n.apply(u, i);
                u = i = null
            }
            return f
        }
    }
    ;
    h.wrap = function(n, r) {
        return h.partial(r, n)
    }
    ;
    h.negate = function(n) {
        return function() {
            return !n.apply(this, arguments)
        }
    }
    ;
    h.compose = function() {
        var n = arguments;
        var r = n.length - 1;
        return function() {
            var t = r;
            var e = n[r].apply(this, arguments);
            while (t--)
                e = n[t].call(this, e);
            return e
        }
    }
    ;
    h.after = function(n, r) {
        return function() {
            if (--n < 1) {
                return r.apply(this, arguments)
            }
        }
    }
    ;
    h.before = function(n, r) {
        var t;
        return function() {
            if (--n > 0) {
                t = r.apply(this, arguments)
            }
            if (n <= 1)
                r = null;
            return t
        }
    }
    ;
    h.once = h.partial(h.before, 2);
    var S = !{
        toString: null
    }.propertyIsEnumerable("toString");
    var E = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
    function M(n, r) {
        var t = E.length;
        var i = n.constructor;
        var u = h.isFunction(i) && i.prototype || e;
        var a = "constructor";
        if (h.has(n, a) && !h.contains(r, a))
            r.push(a);
        while (t--) {
            a = E[t];
            if (a in n && n[a] !== u[a] && !h.contains(r, a)) {
                r.push(a)
            }
        }
    }
    h.keys = function(n) {
        if (!h.isObject(n))
            return [];
        if (l)
            return l(n);
        var r = [];
        for (var t in n)
            if (h.has(n, t))
                r.push(t);
        if (S)
            M(n, r);
        return r
    }
    ;
    h.allKeys = function(n) {
        if (!h.isObject(n))
            return [];
        var r = [];
        for (var t in n)
            r.push(t);
        if (S)
            M(n, r);
        return r
    }
    ;
    h.values = function(n) {
        var r = h.keys(n);
        var t = r.length;
        var e = Array(t);
        for (var i = 0; i < t; i++) {
            e[i] = n[r[i]]
        }
        return e
    }
    ;
    h.mapObject = function(n, r, t) {
        r = d(r, t);
        var e = h.keys(n), i = e.length, u = {}, a;
        for (var f = 0; f < i; f++) {
            a = e[f];
            u[a] = r(n[a], a, n)
        }
        return u
    }
    ;
    h.pairs = function(n) {
        var r = h.keys(n);
        var t = r.length;
        var e = Array(t);
        for (var i = 0; i < t; i++) {
            e[i] = [r[i], n[r[i]]]
        }
        return e
    }
    ;
    h.invert = function(n) {
        var r = {};
        var t = h.keys(n);
        for (var e = 0, i = t.length; e < i; e++) {
            r[n[t[e]]] = t[e]
        }
        return r
    }
    ;
    h.functions = h.methods = function(n) {
        var r = [];
        for (var t in n) {
            if (h.isFunction(n[t]))
                r.push(t)
        }
        return r.sort()
    }
    ;
    h.extend = g(h.allKeys);
    h.extendOwn = h.assign = g(h.keys);
    h.findKey = function(n, r, t) {
        r = d(r, t);
        var e = h.keys(n), i;
        for (var u = 0, a = e.length; u < a; u++) {
            i = e[u];
            if (r(n[i], i, n))
                return i
        }
    }
    ;
    h.pick = function(n, r, t) {
        var e = {}, i = n, u, a;
        if (i == null)
            return e;
        if (h.isFunction(r)) {
            a = h.allKeys(i);
            u = y(r, t)
        } else {
            a = k(arguments, false, false, 1);
            u = function(n, r, t) {
                return r in t
            }
            ;
            i = Object(i)
        }
        for (var f = 0, o = a.length; f < o; f++) {
            var c = a[f];
            var l = i[c];
            if (u(l, c, i))
                e[c] = l
        }
        return e
    }
    ;
    h.omit = function(n, r, t) {
        if (h.isFunction(r)) {
            r = h.negate(r)
        } else {
            var e = h.map(k(arguments, false, false, 1), String);
            r = function(n, r) {
                return !h.contains(e, r)
            }
        }
        return h.pick(n, r, t)
    }
    ;
    h.defaults = g(h.allKeys, true);
    h.create = function(n, r) {
        var t = m(n);
        if (r)
            h.extendOwn(t, r);
        return t
    }
    ;
    h.clone = function(n) {
        if (!h.isObject(n))
            return n;
        return h.isArray(n) ? n.slice() : h.extend({}, n)
    }
    ;
    h.tap = function(n, r) {
        r(n);
        return n
    }
    ;
    h.isMatch = function(n, r) {
        var t = h.keys(r)
          , e = t.length;
        if (n == null)
            return !e;
        var i = Object(n);
        for (var u = 0; u < e; u++) {
            var a = t[u];
            if (r[a] !== i[a] || !(a in i))
                return false
        }
        return true
    }
    ;
    var N = function(n, r, t, e) {
        if (n === r)
            return n !== 0 || 1 / n === 1 / r;
        if (n == null || r == null)
            return n === r;
        if (n instanceof h)
            n = n._wrapped;
        if (r instanceof h)
            r = r._wrapped;
        var i = f.call(n);
        if (i !== f.call(r))
            return false;
        switch (i) {
        case "[object RegExp]":
        case "[object String]":
            return "" + n === "" + r;
        case "[object Number]":
            if (+n !== +n)
                return +r !== +r;
            return +n === 0 ? 1 / +n === 1 / r : +n === +r;
        case "[object Date]":
        case "[object Boolean]":
            return +n === +r
        }
        var u = i === "[object Array]";
        if (!u) {
            if (typeof n != "object" || typeof r != "object")
                return false;
            var a = n.constructor
              , o = r.constructor;
            if (a !== o && !(h.isFunction(a) && a instanceof a && h.isFunction(o) && o instanceof o) && ("constructor"in n && "constructor"in r)) {
                return false
            }
        }
        t = t || [];
        e = e || [];
        var c = t.length;
        while (c--) {
            if (t[c] === n)
                return e[c] === r
        }
        t.push(n);
        e.push(r);
        if (u) {
            c = n.length;
            if (c !== r.length)
                return false;
            while (c--) {
                if (!N(n[c], r[c], t, e))
                    return false
            }
        } else {
            var l = h.keys(n), s;
            c = l.length;
            if (h.keys(r).length !== c)
                return false;
            while (c--) {
                s = l[c];
                if (!(h.has(r, s) && N(n[s], r[s], t, e)))
                    return false
            }
        }
        t.pop();
        e.pop();
        return true
    };
    h.isEqual = function(n, r) {
        return N(n, r)
    }
    ;
    h.isEmpty = function(n) {
        if (n == null)
            return true;
        if (_(n) && (h.isArray(n) || h.isString(n) || h.isArguments(n)))
            return n.length === 0;
        return h.keys(n).length === 0
    }
    ;
    h.isElement = function(n) {
        return !!(n && n.nodeType === 1)
    }
    ;
    h.isArray = c || function(n) {
        return f.call(n) === "[object Array]"
    }
    ;
    h.isObject = function(n) {
        var r = typeof n;
        return r === "function" || r === "object" && !!n
    }
    ;
    h.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], (function(n) {
        h["is" + n] = function(r) {
            return f.call(r) === "[object " + n + "]"
        }
    }
    ));
    if (!h.isArguments(arguments)) {
        h.isArguments = function(n) {
            return h.has(n, "callee")
        }
    }
    if (typeof /./ != "function" && typeof Int8Array != "object") {
        h.isFunction = function(n) {
            return typeof n == "function" || false
        }
    }
    h.isFinite = function(n) {
        return isFinite(n) && !isNaN(parseFloat(n))
    }
    ;
    h.isNaN = function(n) {
        return h.isNumber(n) && n !== +n
    }
    ;
    h.isBoolean = function(n) {
        return n === true || n === false || f.call(n) === "[object Boolean]"
    }
    ;
    h.isNull = function(n) {
        return n === null
    }
    ;
    h.isUndefined = function(n) {
        return n === void 0
    }
    ;
    h.has = function(n, r) {
        return n != null && o.call(n, r)
    }
    ;
    h.noConflict = function() {
        n._ = r;
        return this
    }
    ;
    h.identity = function(n) {
        return n
    }
    ;
    h.constant = function(n) {
        return function() {
            return n
        }
    }
    ;
    h.noop = function() {}
    ;
    h.property = b;
    h.propertyOf = function(n) {
        return n == null ? function() {}
        : function(r) {
            return n[r]
        }
    }
    ;
    h.matcher = h.matches = function(n) {
        n = h.extendOwn({}, n);
        return function(r) {
            return h.isMatch(r, n)
        }
    }
    ;
    h.times = function(n, r, t) {
        var e = Array(Math.max(0, n));
        r = y(r, t, 1);
        for (var i = 0; i < n; i++)
            e[i] = r(i);
        return e
    }
    ;
    h.random = function(n, r) {
        if (r == null) {
            r = n;
            n = 0
        }
        return n + Math.floor(Math.random() * (r - n + 1))
    }
    ;
    h.now = Date.now || function() {
        return (new Date).getTime()
    }
    ;
    var B = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    };
    var T = h.invert(B);
    var R = function(n) {
        var r = function(r) {
            return n[r]
        };
        var t = "(?:" + h.keys(n).join("|") + ")";
        var e = RegExp(t);
        var i = RegExp(t, "g");
        return function(n) {
            n = n == null ? "" : "" + n;
            return e.test(n) ? n.replace(i, r) : n
        }
    };
    h.escape = R(B);
    h.unescape = R(T);
    h.result = function(n, r, t) {
        var e = n == null ? void 0 : n[r];
        if (e === void 0) {
            e = t
        }
        return h.isFunction(e) ? e.call(n) : e
    }
    ;
    var q = 0;
    h.uniqueId = function(n) {
        var r = ++q + "";
        return n ? n + r : r
    }
    ;
    h.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var K = /(.)^/;
    var z = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\u2028": "u2028",
        "\u2029": "u2029"
    };
    var D = /\\|'|\r|\n|\u2028|\u2029/g;
    var L = function(n) {
        return "\\" + z[n]
    };
    h.template = function(n, r, t) {
        if (!r && t)
            r = t;
        r = h.defaults({}, r, h.templateSettings);
        var e = RegExp([(r.escape || K).source, (r.interpolate || K).source, (r.evaluate || K).source].join("|") + "|$", "g");
        var i = 0;
        var u = "__p+='";
        n.replace(e, (function(r, t, e, a, f) {
            u += n.slice(i, f).replace(D, L);
            i = f + r.length;
            if (t) {
                u += "'+\n((__t=(" + t + "))==null?'':_.escape(__t))+\n'"
            } else if (e) {
                u += "'+\n((__t=(" + e + "))==null?'':__t)+\n'"
            } else if (a) {
                u += "';\n" + a + "\n__p+='"
            }
            return r
        }
        ));
        u += "';\n";
        if (!r.variable)
            u = "with(obj||{}){\n" + u + "}\n";
        u = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + u + "return __p;\n";
        try {
            var a = new Function(r.variable || "obj","_",u)
        } catch (n) {
            n.source = u;
            throw n
        }
        var f = function(n) {
            return a.call(this, n, h)
        };
        var o = r.variable || "obj";
        f.source = "function(" + o + "){\n" + u + "}";
        return f
    }
    ;
    h.chain = function(n) {
        var r = h(n);
        r._chain = true;
        return r
    }
    ;
    var P = function(n, r) {
        return n._chain ? h(r).chain() : r
    };
    h.mixin = function(n) {
        h.each(h.functions(n), (function(r) {
            var t = h[r] = n[r];
            h.prototype[r] = function() {
                var n = [this._wrapped];
                u.apply(n, arguments);
                return P(this, t.apply(h, n))
            }
        }
        ))
    }
    ;
    h.mixin(h);
    h.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], (function(n) {
        var r = t[n];
        h.prototype[n] = function() {
            var t = this._wrapped;
            r.apply(t, arguments);
            if ((n === "shift" || n === "splice") && t.length === 0)
                delete t[0];
            return P(this, t)
        }
    }
    ));
    h.each(["concat", "join", "slice"], (function(n) {
        var r = t[n];
        h.prototype[n] = function() {
            return P(this, r.apply(this._wrapped, arguments))
        }
    }
    ));
    h.prototype.value = function() {
        return this._wrapped
    }
    ;
    h.prototype.valueOf = h.prototype.toJSON = h.prototype.value;
    h.prototype.toString = function() {
        return "" + this._wrapped
    }
    ;
    if (typeof define === "function" && define.amd) {
        define("underscore", [], (function() {
            return h
        }
        ))
    }
}
).call(this);
(function(t) {
    var e = typeof self == "object" && self.self == self && self || typeof global == "object" && global.global == global && global;
    if (typeof define === "function" && define.amd) {
        define(["underscore", "jquery", "exports"], (function(i, r, n) {
            e.Backbone = t(e, n, i, r)
        }
        ))
    } else if (typeof exports !== "undefined") {
        var i = require("underscore"), r;
        try {
            r = require("jquery")
        } catch (t) {}
        t(e, exports, i, r)
    } else {
        e.Backbone = t(e, {}, e._, e.jQuery || e.Zepto || e.ender || e.$)
    }
}
)((function(t, e, i, r) {
    var n = t.Backbone;
    var s = Array.prototype.slice;
    e.VERSION = "1.2.3";
    e.$ = r;
    e.noConflict = function() {
        t.Backbone = n;
        return this
    }
    ;
    e.emulateHTTP = false;
    e.emulateJSON = false;
    var a = function(t, e, r) {
        switch (t) {
        case 1:
            return function() {
                return i[e](this[r])
            }
            ;
        case 2:
            return function(t) {
                return i[e](this[r], t)
            }
            ;
        case 3:
            return function(t, n) {
                return i[e](this[r], h(t, this), n)
            }
            ;
        case 4:
            return function(t, n, s) {
                return i[e](this[r], h(t, this), n, s)
            }
            ;
        default:
            return function() {
                var t = s.call(arguments);
                t.unshift(this[r]);
                return i[e].apply(i, t)
            }
        }
    };
    var o = function(t, e, r) {
        i.each(e, (function(e, n) {
            if (i[n])
                t.prototype[n] = a(e, n, r)
        }
        ))
    };
    var h = function(t, e) {
        if (i.isFunction(t))
            return t;
        if (i.isObject(t) && !e._isModel(t))
            return l(t);
        if (i.isString(t))
            return function(e) {
                return e.get(t)
            }
            ;
        return t
    };
    var l = function(t) {
        var e = i.matches(t);
        return function(t) {
            return e(t.attributes)
        }
    };
    var u = e.Events = {};
    var c = /\s+/;
    var f = function(t, e, r, n, s) {
        var a = 0, o;
        if (r && typeof r === "object") {
            if (n !== void 0 && "context"in s && s.context === void 0)
                s.context = n;
            for (o = i.keys(r); a < o.length; a++) {
                e = f(t, e, o[a], r[o[a]], s)
            }
        } else if (r && c.test(r)) {
            for (o = r.split(c); a < o.length; a++) {
                e = t(e, o[a], n, s)
            }
        } else {
            e = t(e, r, n, s)
        }
        return e
    };
    u.on = function(t, e, i) {
        return d(this, t, e, i)
    }
    ;
    var d = function(t, e, i, r, n) {
        t._events = f(v, t._events || {}, e, i, {
            context: r,
            ctx: t,
            listening: n
        });
        if (n) {
            var s = t._listeners || (t._listeners = {});
            s[n.id] = n
        }
        return t
    };
    u.listenTo = function(t, e, r) {
        if (!t)
            return this;
        var n = t._listenId || (t._listenId = i.uniqueId("l"));
        var s = this._listeningTo || (this._listeningTo = {});
        var a = s[n];
        if (!a) {
            var o = this._listenId || (this._listenId = i.uniqueId("l"));
            a = s[n] = {
                obj: t,
                objId: n,
                id: o,
                listeningTo: s,
                count: 0
            }
        }
        d(t, e, r, this, a);
        return this
    }
    ;
    var v = function(t, e, i, r) {
        if (i) {
            var n = t[e] || (t[e] = []);
            var s = r.context
              , a = r.ctx
              , o = r.listening;
            if (o)
                o.count++;
            n.push({
                callback: i,
                context: s,
                ctx: s || a,
                listening: o
            })
        }
        return t
    };
    u.off = function(t, e, i) {
        if (!this._events)
            return this;
        this._events = f(g, this._events, t, e, {
            context: i,
            listeners: this._listeners
        });
        return this
    }
    ;
    u.stopListening = function(t, e, r) {
        var n = this._listeningTo;
        if (!n)
            return this;
        var s = t ? [t._listenId] : i.keys(n);
        for (var a = 0; a < s.length; a++) {
            var o = n[s[a]];
            if (!o)
                break;
            o.obj.off(e, r, this)
        }
        if (i.isEmpty(n))
            this._listeningTo = void 0;
        return this
    }
    ;
    var g = function(t, e, r, n) {
        if (!t)
            return;
        var s = 0, a;
        var o = n.context
          , h = n.listeners;
        if (!e && !r && !o) {
            var l = i.keys(h);
            for (; s < l.length; s++) {
                a = h[l[s]];
                delete h[a.id];
                delete a.listeningTo[a.objId]
            }
            return
        }
        var u = e ? [e] : i.keys(t);
        for (; s < u.length; s++) {
            e = u[s];
            var c = t[e];
            if (!c)
                break;
            var f = [];
            for (var d = 0; d < c.length; d++) {
                var v = c[d];
                if (r && r !== v.callback && r !== v.callback._callback || o && o !== v.context) {
                    f.push(v)
                } else {
                    a = v.listening;
                    if (a && --a.count === 0) {
                        delete h[a.id];
                        delete a.listeningTo[a.objId]
                    }
                }
            }
            if (f.length) {
                t[e] = f
            } else {
                delete t[e]
            }
        }
        if (i.size(t))
            return t
    };
    u.once = function(t, e, r) {
        var n = f(p, {}, t, e, i.bind(this.off, this));
        return this.on(n, void 0, r)
    }
    ;
    u.listenToOnce = function(t, e, r) {
        var n = f(p, {}, e, r, i.bind(this.stopListening, this, t));
        return this.listenTo(t, n)
    }
    ;
    var p = function(t, e, r, n) {
        if (r) {
            var s = t[e] = i.once((function() {
                n(e, s);
                r.apply(this, arguments)
            }
            ));
            s._callback = r
        }
        return t
    };
    u.trigger = function(t) {
        if (!this._events)
            return this;
        var e = Math.max(0, arguments.length - 1);
        var i = Array(e);
        for (var r = 0; r < e; r++)
            i[r] = arguments[r + 1];
        f(m, this._events, t, void 0, i);
        return this
    }
    ;
    var m = function(t, e, i, r) {
        if (t) {
            var n = t[e];
            var s = t.all;
            if (n && s)
                s = s.slice();
            if (n)
                _(n, r);
            if (s)
                _(s, [e].concat(r))
        }
        return t
    };
    var _ = function(t, e) {
        var i, r = -1, n = t.length, s = e[0], a = e[1], o = e[2];
        switch (e.length) {
        case 0:
            while (++r < n)
                (i = t[r]).callback.call(i.ctx);
            return;
        case 1:
            while (++r < n)
                (i = t[r]).callback.call(i.ctx, s);
            return;
        case 2:
            while (++r < n)
                (i = t[r]).callback.call(i.ctx, s, a);
            return;
        case 3:
            while (++r < n)
                (i = t[r]).callback.call(i.ctx, s, a, o);
            return;
        default:
            while (++r < n)
                (i = t[r]).callback.apply(i.ctx, e);
            return
        }
    };
    u.bind = u.on;
    u.unbind = u.off;
    i.extend(e, u);
    var y = e.Model = function(t, e) {
        var r = t || {};
        e || (e = {});
        this.cid = i.uniqueId(this.cidPrefix);
        this.attributes = {};
        if (e.collection)
            this.collection = e.collection;
        if (e.parse)
            r = this.parse(r, e) || {};
        r = i.defaults({}, r, i.result(this, "defaults"));
        this.set(r, e);
        this.changed = {};
        this.initialize.apply(this, arguments)
    }
    ;
    i.extend(y.prototype, u, {
        changed: null,
        validationError: null,
        idAttribute: "id",
        cidPrefix: "c",
        initialize: function() {},
        toJSON: function(t) {
            return i.clone(this.attributes)
        },
        sync: function() {
            return e.sync.apply(this, arguments)
        },
        get: function(t) {
            return this.attributes[t]
        },
        escape: function(t) {
            return i.escape(this.get(t))
        },
        has: function(t) {
            return this.get(t) != null
        },
        matches: function(t) {
            return !!i.iteratee(t, this)(this.attributes)
        },
        set: function(t, e, r) {
            if (t == null)
                return this;
            var n;
            if (typeof t === "object") {
                n = t;
                r = e
            } else {
                (n = {})[t] = e
            }
            r || (r = {});
            if (!this._validate(n, r))
                return false;
            var s = r.unset;
            var a = r.silent;
            var o = [];
            var h = this._changing;
            this._changing = true;
            if (!h) {
                this._previousAttributes = i.clone(this.attributes);
                this.changed = {}
            }
            var l = this.attributes;
            var u = this.changed;
            var c = this._previousAttributes;
            for (var f in n) {
                e = n[f];
                if (!i.isEqual(l[f], e))
                    o.push(f);
                if (!i.isEqual(c[f], e)) {
                    u[f] = e
                } else {
                    delete u[f]
                }
                s ? delete l[f] : l[f] = e
            }
            this.id = this.get(this.idAttribute);
            if (!a) {
                if (o.length)
                    this._pending = r;
                for (var d = 0; d < o.length; d++) {
                    this.trigger("change:" + o[d], this, l[o[d]], r)
                }
            }
            if (h)
                return this;
            if (!a) {
                while (this._pending) {
                    r = this._pending;
                    this._pending = false;
                    this.trigger("change", this, r)
                }
            }
            this._pending = false;
            this._changing = false;
            return this
        },
        unset: function(t, e) {
            return this.set(t, void 0, i.extend({}, e, {
                unset: true
            }))
        },
        clear: function(t) {
            var e = {};
            for (var r in this.attributes)
                e[r] = void 0;
            return this.set(e, i.extend({}, t, {
                unset: true
            }))
        },
        hasChanged: function(t) {
            if (t == null)
                return !i.isEmpty(this.changed);
            return i.has(this.changed, t)
        },
        changedAttributes: function(t) {
            if (!t)
                return this.hasChanged() ? i.clone(this.changed) : false;
            var e = this._changing ? this._previousAttributes : this.attributes;
            var r = {};
            for (var n in t) {
                var s = t[n];
                if (i.isEqual(e[n], s))
                    continue;
                r[n] = s
            }
            return i.size(r) ? r : false
        },
        previous: function(t) {
            if (t == null || !this._previousAttributes)
                return null;
            return this._previousAttributes[t]
        },
        previousAttributes: function() {
            return i.clone(this._previousAttributes)
        },
        fetch: function(t) {
            t = i.extend({
                parse: true
            }, t);
            var e = this;
            var r = t.success;
            t.success = function(i) {
                var n = t.parse ? e.parse(i, t) : i;
                if (!e.set(n, t))
                    return false;
                if (r)
                    r.call(t.context, e, i, t);
                e.trigger("sync", e, i, t)
            }
            ;
            z(this, t);
            return this.sync("read", this, t)
        },
        save: function(t, e, r) {
            var n;
            if (t == null || typeof t === "object") {
                n = t;
                r = e
            } else {
                (n = {})[t] = e
            }
            r = i.extend({
                validate: true,
                parse: true
            }, r);
            var s = r.wait;
            if (n && !s) {
                if (!this.set(n, r))
                    return false
            } else {
                if (!this._validate(n, r))
                    return false
            }
            var a = this;
            var o = r.success;
            var h = this.attributes;
            r.success = function(t) {
                a.attributes = h;
                var e = r.parse ? a.parse(t, r) : t;
                if (s)
                    e = i.extend({}, n, e);
                if (e && !a.set(e, r))
                    return false;
                if (o)
                    o.call(r.context, a, t, r);
                a.trigger("sync", a, t, r)
            }
            ;
            z(this, r);
            if (n && s)
                this.attributes = i.extend({}, h, n);
            var l = this.isNew() ? "create" : r.patch ? "patch" : "update";
            if (l === "patch" && !r.attrs)
                r.attrs = n;
            var u = this.sync(l, this, r);
            this.attributes = h;
            return u
        },
        destroy: function(t) {
            t = t ? i.clone(t) : {};
            var e = this;
            var r = t.success;
            var n = t.wait;
            var s = function() {
                e.stopListening();
                e.trigger("destroy", e, e.collection, t)
            };
            t.success = function(i) {
                if (n)
                    s();
                if (r)
                    r.call(t.context, e, i, t);
                if (!e.isNew())
                    e.trigger("sync", e, i, t)
            }
            ;
            var a = false;
            if (this.isNew()) {
                i.defer(t.success)
            } else {
                z(this, t);
                a = this.sync("delete", this, t)
            }
            if (!n)
                s();
            return a
        },
        url: function() {
            var t = i.result(this, "urlRoot") || i.result(this.collection, "url") || F();
            if (this.isNew())
                return t;
            var e = this.get(this.idAttribute);
            return t.replace(/[^\/]$/, "$&/") + encodeURIComponent(e)
        },
        parse: function(t, e) {
            return t
        },
        clone: function() {
            return new this.constructor(this.attributes)
        },
        isNew: function() {
            return !this.has(this.idAttribute)
        },
        isValid: function(t) {
            return this._validate({}, i.defaults({
                validate: true
            }, t))
        },
        _validate: function(t, e) {
            if (!e.validate || !this.validate)
                return true;
            t = i.extend({}, this.attributes, t);
            var r = this.validationError = this.validate(t, e) || null;
            if (!r)
                return true;
            this.trigger("invalid", this, r, i.extend(e, {
                validationError: r
            }));
            return false
        }
    });
    var b = {
        keys: 1,
        values: 1,
        pairs: 1,
        invert: 1,
        pick: 0,
        omit: 0,
        chain: 1,
        isEmpty: 1
    };
    o(y, b, "attributes");
    var x = e.Collection = function(t, e) {
        e || (e = {});
        if (e.model)
            this.model = e.model;
        if (e.comparator !== void 0)
            this.comparator = e.comparator;
        this._reset();
        this.initialize.apply(this, arguments);
        if (t)
            this.reset(t, i.extend({
                silent: true
            }, e))
    }
    ;
    var w = {
        add: true,
        remove: true,
        merge: true
    };
    var E = {
        add: true,
        remove: false
    };
    var k = function(t, e, i) {
        i = Math.min(Math.max(i, 0), t.length);
        var r = Array(t.length - i);
        var n = e.length;
        for (var s = 0; s < r.length; s++)
            r[s] = t[s + i];
        for (s = 0; s < n; s++)
            t[s + i] = e[s];
        for (s = 0; s < r.length; s++)
            t[s + n + i] = r[s]
    };
    i.extend(x.prototype, u, {
        model: y,
        initialize: function() {},
        toJSON: function(t) {
            return this.map((function(e) {
                return e.toJSON(t)
            }
            ))
        },
        sync: function() {
            return e.sync.apply(this, arguments)
        },
        add: function(t, e) {
            return this.set(t, i.extend({
                merge: false
            }, e, E))
        },
        remove: function(t, e) {
            e = i.extend({}, e);
            var r = !i.isArray(t);
            t = r ? [t] : i.clone(t);
            var n = this._removeModels(t, e);
            if (!e.silent && n)
                this.trigger("update", this, e);
            return r ? n[0] : n
        },
        set: function(t, e) {
            if (t == null)
                return;
            e = i.defaults({}, e, w);
            if (e.parse && !this._isModel(t))
                t = this.parse(t, e);
            var r = !i.isArray(t);
            t = r ? [t] : t.slice();
            var n = e.at;
            if (n != null)
                n = +n;
            if (n < 0)
                n += this.length + 1;
            var s = [];
            var a = [];
            var o = [];
            var h = {};
            var l = e.add;
            var u = e.merge;
            var c = e.remove;
            var f = false;
            var d = this.comparator && n == null && e.sort !== false;
            var v = i.isString(this.comparator) ? this.comparator : null;
            var g;
            for (var p = 0; p < t.length; p++) {
                g = t[p];
                var m = this.get(g);
                if (m) {
                    if (u && g !== m) {
                        var _ = this._isModel(g) ? g.attributes : g;
                        if (e.parse)
                            _ = m.parse(_, e);
                        m.set(_, e);
                        if (d && !f)
                            f = m.hasChanged(v)
                    }
                    if (!h[m.cid]) {
                        h[m.cid] = true;
                        s.push(m)
                    }
                    t[p] = m
                } else if (l) {
                    g = t[p] = this._prepareModel(g, e);
                    if (g) {
                        a.push(g);
                        this._addReference(g, e);
                        h[g.cid] = true;
                        s.push(g)
                    }
                }
            }
            if (c) {
                for (p = 0; p < this.length; p++) {
                    g = this.models[p];
                    if (!h[g.cid])
                        o.push(g)
                }
                if (o.length)
                    this._removeModels(o, e)
            }
            var y = false;
            var b = !d && l && c;
            if (s.length && b) {
                y = this.length != s.length || i.some(this.models, (function(t, e) {
                    return t !== s[e]
                }
                ));
                this.models.length = 0;
                k(this.models, s, 0);
                this.length = this.models.length
            } else if (a.length) {
                if (d)
                    f = true;
                k(this.models, a, n == null ? this.length : n);
                this.length = this.models.length
            }
            if (f)
                this.sort({
                    silent: true
                });
            if (!e.silent) {
                for (p = 0; p < a.length; p++) {
                    if (n != null)
                        e.index = n + p;
                    g = a[p];
                    g.trigger("add", g, this, e)
                }
                if (f || y)
                    this.trigger("sort", this, e);
                if (a.length || o.length)
                    this.trigger("update", this, e)
            }
            return r ? t[0] : t
        },
        reset: function(t, e) {
            e = e ? i.clone(e) : {};
            for (var r = 0; r < this.models.length; r++) {
                this._removeReference(this.models[r], e)
            }
            e.previousModels = this.models;
            this._reset();
            t = this.add(t, i.extend({
                silent: true
            }, e));
            if (!e.silent)
                this.trigger("reset", this, e);
            return t
        },
        push: function(t, e) {
            return this.add(t, i.extend({
                at: this.length
            }, e))
        },
        pop: function(t) {
            var e = this.at(this.length - 1);
            return this.remove(e, t)
        },
        unshift: function(t, e) {
            return this.add(t, i.extend({
                at: 0
            }, e))
        },
        shift: function(t) {
            var e = this.at(0);
            return this.remove(e, t)
        },
        slice: function() {
            return s.apply(this.models, arguments)
        },
        get: function(t) {
            if (t == null)
                return void 0;
            var e = this.modelId(this._isModel(t) ? t.attributes : t);
            return this._byId[t] || this._byId[e] || this._byId[t.cid]
        },
        at: function(t) {
            if (t < 0)
                t += this.length;
            return this.models[t]
        },
        where: function(t, e) {
            return this[e ? "find" : "filter"](t)
        },
        findWhere: function(t) {
            return this.where(t, true)
        },
        sort: function(t) {
            var e = this.comparator;
            if (!e)
                throw new Error("Cannot sort a set without a comparator");
            t || (t = {});
            var r = e.length;
            if (i.isFunction(e))
                e = i.bind(e, this);
            if (r === 1 || i.isString(e)) {
                this.models = this.sortBy(e)
            } else {
                this.models.sort(e)
            }
            if (!t.silent)
                this.trigger("sort", this, t);
            return this
        },
        pluck: function(t) {
            return i.invoke(this.models, "get", t)
        },
        fetch: function(t) {
            t = i.extend({
                parse: true
            }, t);
            var e = t.success;
            var r = this;
            t.success = function(i) {
                var n = t.reset ? "reset" : "set";
                r[n](i, t);
                if (e)
                    e.call(t.context, r, i, t);
                r.trigger("sync", r, i, t)
            }
            ;
            z(this, t);
            return this.sync("read", this, t)
        },
        create: function(t, e) {
            e = e ? i.clone(e) : {};
            var r = e.wait;
            t = this._prepareModel(t, e);
            if (!t)
                return false;
            if (!r)
                this.add(t, e);
            var n = this;
            var s = e.success;
            e.success = function(t, e, i) {
                if (r)
                    n.add(t, i);
                if (s)
                    s.call(i.context, t, e, i)
            }
            ;
            t.save(null, e);
            return t
        },
        parse: function(t, e) {
            return t
        },
        clone: function() {
            return new this.constructor(this.models,{
                model: this.model,
                comparator: this.comparator
            })
        },
        modelId: function(t) {
            return t[this.model.prototype.idAttribute || "id"]
        },
        _reset: function() {
            this.length = 0;
            this.models = [];
            this._byId = {}
        },
        _prepareModel: function(t, e) {
            if (this._isModel(t)) {
                if (!t.collection)
                    t.collection = this;
                return t
            }
            e = e ? i.clone(e) : {};
            e.collection = this;
            var r = new this.model(t,e);
            if (!r.validationError)
                return r;
            this.trigger("invalid", this, r.validationError, e);
            return false
        },
        _removeModels: function(t, e) {
            var i = [];
            for (var r = 0; r < t.length; r++) {
                var n = this.get(t[r]);
                if (!n)
                    continue;
                var s = this.indexOf(n);
                this.models.splice(s, 1);
                this.length--;
                if (!e.silent) {
                    e.index = s;
                    n.trigger("remove", n, this, e)
                }
                i.push(n);
                this._removeReference(n, e)
            }
            return i.length ? i : false
        },
        _isModel: function(t) {
            return t instanceof y
        },
        _addReference: function(t, e) {
            this._byId[t.cid] = t;
            var i = this.modelId(t.attributes);
            if (i != null)
                this._byId[i] = t;
            t.on("all", this._onModelEvent, this)
        },
        _removeReference: function(t, e) {
            delete this._byId[t.cid];
            var i = this.modelId(t.attributes);
            if (i != null)
                delete this._byId[i];
            if (this === t.collection)
                delete t.collection;
            t.off("all", this._onModelEvent, this)
        },
        _onModelEvent: function(t, e, i, r) {
            if ((t === "add" || t === "remove") && i !== this)
                return;
            if (t === "destroy")
                this.remove(e, r);
            if (t === "change") {
                var n = this.modelId(e.previousAttributes());
                var s = this.modelId(e.attributes);
                if (n !== s) {
                    if (n != null)
                        delete this._byId[n];
                    if (s != null)
                        this._byId[s] = e
                }
            }
            this.trigger.apply(this, arguments)
        }
    });
    var S = {
        forEach: 3,
        each: 3,
        map: 3,
        collect: 3,
        reduce: 4,
        foldl: 4,
        inject: 4,
        reduceRight: 4,
        foldr: 4,
        find: 3,
        detect: 3,
        filter: 3,
        select: 3,
        reject: 3,
        every: 3,
        all: 3,
        some: 3,
        any: 3,
        include: 3,
        includes: 3,
        contains: 3,
        invoke: 0,
        max: 3,
        min: 3,
        toArray: 1,
        size: 1,
        first: 3,
        head: 3,
        take: 3,
        initial: 3,
        rest: 3,
        tail: 3,
        drop: 3,
        last: 3,
        without: 0,
        difference: 0,
        indexOf: 3,
        shuffle: 1,
        lastIndexOf: 3,
        isEmpty: 1,
        chain: 1,
        sample: 3,
        partition: 3,
        groupBy: 3,
        countBy: 3,
        sortBy: 3,
        indexBy: 3
    };
    o(x, S, "models");
    var I = e.View = function(t) {
        this.cid = i.uniqueId("view");
        i.extend(this, i.pick(t, P));
        this._ensureElement();
        this.initialize.apply(this, arguments)
    }
    ;
    var T = /^(\S+)\s*(.*)$/;
    var P = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
    i.extend(I.prototype, u, {
        tagName: "div",
        $: function(t) {
            return this.$el.find(t)
        },
        initialize: function() {},
        render: function() {
            return this
        },
        remove: function() {
            this._removeElement();
            this.stopListening();
            return this
        },
        _removeElement: function() {
            this.$el.remove()
        },
        setElement: function(t) {
            this.undelegateEvents();
            this._setElement(t);
            this.delegateEvents();
            return this
        },
        _setElement: function(t) {
            this.$el = t instanceof e.$ ? t : e.$(t);
            this.el = this.$el[0]
        },
        delegateEvents: function(t) {
            t || (t = i.result(this, "events"));
            if (!t)
                return this;
            this.undelegateEvents();
            for (var e in t) {
                var r = t[e];
                if (!i.isFunction(r))
                    r = this[r];
                if (!r)
                    continue;
                var n = e.match(T);
                this.delegate(n[1], n[2], i.bind(r, this))
            }
            return this
        },
        delegate: function(t, e, i) {
            this.$el.on(t + ".delegateEvents" + this.cid, e, i);
            return this
        },
        undelegateEvents: function() {
            if (this.$el)
                this.$el.off(".delegateEvents" + this.cid);
            return this
        },
        undelegate: function(t, e, i) {
            this.$el.off(t + ".delegateEvents" + this.cid, e, i);
            return this
        },
        _createElement: function(t) {
            return document.createElement(t)
        },
        _ensureElement: function() {
            if (!this.el) {
                var t = i.extend({}, i.result(this, "attributes"));
                if (this.id)
                    t.id = i.result(this, "id");
                if (this.className)
                    t["class"] = i.result(this, "className");
                this.setElement(this._createElement(i.result(this, "tagName")));
                this._setAttributes(t)
            } else {
                this.setElement(i.result(this, "el"))
            }
        },
        _setAttributes: function(t) {
            this.$el.attr(t)
        }
    });
    e.sync = function(t, r, n) {
        var s = H[t];
        i.defaults(n || (n = {}), {
            emulateHTTP: e.emulateHTTP,
            emulateJSON: e.emulateJSON
        });
        var a = {
            type: s,
            dataType: "json"
        };
        if (!n.url) {
            a.url = i.result(r, "url") || F()
        }
        if (n.data == null && r && (t === "create" || t === "update" || t === "patch")) {
            a.contentType = "application/json";
            a.data = JSON.stringify(n.attrs || r.toJSON(n))
        }
        if (n.emulateJSON) {
            a.contentType = "application/x-www-form-urlencoded";
            a.data = a.data ? {
                model: a.data
            } : {}
        }
        if (n.emulateHTTP && (s === "PUT" || s === "DELETE" || s === "PATCH")) {
            a.type = "POST";
            if (n.emulateJSON)
                a.data._method = s;
            var o = n.beforeSend;
            n.beforeSend = function(t) {
                t.setRequestHeader("X-HTTP-Method-Override", s);
                if (o)
                    return o.apply(this, arguments)
            }
        }
        if (a.type !== "GET" && !n.emulateJSON) {
            a.processData = false
        }
        var h = n.error;
        n.error = function(t, e, i) {
            n.textStatus = e;
            n.errorThrown = i;
            if (h)
                h.call(n.context, t, e, i)
        }
        ;
        var l = n.xhr = e.ajax(i.extend(a, n));
        r.trigger("request", r, l, n);
        return l
    }
    ;
    var H = {
        create: "POST",
        update: "PUT",
        patch: "PATCH",
        delete: "DELETE",
        read: "GET"
    };
    e.ajax = function() {
        return e.$.ajax.apply(e.$, arguments)
    }
    ;
    var $ = e.Router = function(t) {
        t || (t = {});
        if (t.routes)
            this.routes = t.routes;
        this._bindRoutes();
        this.initialize.apply(this, arguments)
    }
    ;
    var A = /\((.*?)\)/g;
    var C = /(\(\?)?:\w+/g;
    var R = /\*\w+/g;
    var j = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    i.extend($.prototype, u, {
        initialize: function() {},
        route: function(t, r, n) {
            if (!i.isRegExp(t))
                t = this._routeToRegExp(t);
            if (i.isFunction(r)) {
                n = r;
                r = ""
            }
            if (!n)
                n = this[r];
            var s = this;
            e.history.route(t, (function(i) {
                var a = s._extractParameters(t, i);
                if (s.execute(n, a, r) !== false) {
                    s.trigger.apply(s, ["route:" + r].concat(a));
                    s.trigger("route", r, a);
                    e.history.trigger("route", s, r, a)
                }
            }
            ));
            return this
        },
        execute: function(t, e, i) {
            if (t)
                t.apply(this, e)
        },
        navigate: function(t, i) {
            e.history.navigate(t, i);
            return this
        },
        _bindRoutes: function() {
            if (!this.routes)
                return;
            this.routes = i.result(this, "routes");
            var t, e = i.keys(this.routes);
            while ((t = e.pop()) != null) {
                this.route(t, this.routes[t])
            }
        },
        _routeToRegExp: function(t) {
            t = t.replace(j, "\\$&").replace(A, "(?:$1)?").replace(C, (function(t, e) {
                return e ? t : "([^/?]+)"
            }
            )).replace(R, "([^?]*?)");
            return new RegExp("^" + t + "(?:\\?([\\s\\S]*))?$")
        },
        _extractParameters: function(t, e) {
            var r = t.exec(e).slice(1);
            return i.map(r, (function(t, e) {
                if (e === r.length - 1)
                    return t || null;
                return t ? decodeURIComponent(t) : null
            }
            ))
        }
    });
    var M = e.History = function() {
        this.handlers = [];
        this.checkUrl = i.bind(this.checkUrl, this);
        if (typeof window !== "undefined") {
            this.location = window.location;
            this.history = window.history
        }
    }
    ;
    var N = /^[#\/]|\s+$/g;
    var O = /^\/+|\/+$/g;
    var U = /#.*$/;
    M.started = false;
    i.extend(M.prototype, u, {
        interval: 50,
        atRoot: function() {
            var t = this.location.pathname.replace(/[^\/]$/, "$&/");
            return t === this.root && !this.getSearch()
        },
        matchRoot: function() {
            var t = this.decodeFragment(this.location.pathname);
            var e = t.slice(0, this.root.length - 1) + "/";
            return e === this.root
        },
        decodeFragment: function(t) {
            return decodeURI(t.replace(/%25/g, "%2525"))
        },
        getSearch: function() {
            var t = this.location.href.replace(/#.*/, "").match(/\?.+/);
            return t ? t[0] : ""
        },
        getHash: function(t) {
            var e = (t || this).location.href.match(/#(.*)$/);
            return e ? e[1] : ""
        },
        getPath: function() {
            var t = this.decodeFragment(this.location.pathname + this.getSearch()).slice(this.root.length - 1);
            return t.charAt(0) === "/" ? t.slice(1) : t
        },
        getFragment: function(t) {
            if (t == null) {
                if (this._usePushState || !this._wantsHashChange) {
                    t = this.getPath()
                } else {
                    t = this.getHash()
                }
            }
            return t.replace(N, "")
        },
        start: function(t) {
            if (M.started)
                throw new Error("Backbone.history has already been started");
            M.started = true;
            this.options = i.extend({
                root: "/"
            }, this.options, t);
            this.root = this.options.root;
            this._wantsHashChange = this.options.hashChange !== false;
            this._hasHashChange = "onhashchange"in window && (document.documentMode === void 0 || document.documentMode > 7);
            this._useHashChange = this._wantsHashChange && this._hasHashChange;
            this._wantsPushState = !!this.options.pushState;
            this._hasPushState = !!(this.history && this.history.pushState);
            this._usePushState = this._wantsPushState && this._hasPushState;
            this.fragment = this.getFragment();
            this.root = ("/" + this.root + "/").replace(O, "/");
            if (this._wantsHashChange && this._wantsPushState) {
                if (!this._hasPushState && !this.atRoot()) {
                    var e = this.root.slice(0, -1) || "/";
                    this.location.replace(e + "#" + this.getPath());
                    return true
                } else if (this._hasPushState && this.atRoot()) {
                    this.navigate(this.getHash(), {
                        replace: true
                    })
                }
            }
            if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
                this.iframe = document.createElement("iframe");
                this.iframe.src = "javascript:0";
                this.iframe.style.display = "none";
                this.iframe.tabIndex = -1;
                var r = document.body;
                var n = r.insertBefore(this.iframe, r.firstChild).contentWindow;
                n.document.open();
                n.document.close();
                n.location.hash = "#" + this.fragment
            }
            var s = window.addEventListener || function(t, e) {
                return attachEvent("on" + t, e)
            }
            ;
            if (this._usePushState) {
                s("popstate", this.checkUrl, false)
            } else if (this._useHashChange && !this.iframe) {
                s("hashchange", this.checkUrl, false)
            } else if (this._wantsHashChange) {
                this._checkUrlInterval = setInterval(this.checkUrl, this.interval)
            }
            if (!this.options.silent)
                return this.loadUrl()
        },
        stop: function() {
            var t = window.removeEventListener || function(t, e) {
                return detachEvent("on" + t, e)
            }
            ;
            if (this._usePushState) {
                t("popstate", this.checkUrl, false)
            } else if (this._useHashChange && !this.iframe) {
                t("hashchange", this.checkUrl, false)
            }
            if (this.iframe) {
                document.body.removeChild(this.iframe);
                this.iframe = null
            }
            if (this._checkUrlInterval)
                clearInterval(this._checkUrlInterval);
            M.started = false
        },
        route: function(t, e) {
            this.handlers.unshift({
                route: t,
                callback: e
            })
        },
        checkUrl: function(t) {
            var e = this.getFragment();
            if (e === this.fragment && this.iframe) {
                e = this.getHash(this.iframe.contentWindow)
            }
            if (e === this.fragment)
                return false;
            if (this.iframe)
                this.navigate(e);
            this.loadUrl()
        },
        loadUrl: function(t) {
            if (!this.matchRoot())
                return false;
            t = this.fragment = this.getFragment(t);
            return i.some(this.handlers, (function(e) {
                if (e.route.test(t)) {
                    e.callback(t);
                    return true
                }
            }
            ))
        },
        navigate: function(t, e) {
            if (!M.started)
                return false;
            if (!e || e === true)
                e = {
                    trigger: !!e
                };
            t = this.getFragment(t || "");
            var i = this.root;
            if (t === "" || t.charAt(0) === "?") {
                i = i.slice(0, -1) || "/"
            }
            var r = i + t;
            t = this.decodeFragment(t.replace(U, ""));
            if (this.fragment === t)
                return;
            this.fragment = t;
            if (this._usePushState) {
                this.history[e.replace ? "replaceState" : "pushState"]({}, document.title, r)
            } else if (this._wantsHashChange) {
                this._updateHash(this.location, t, e.replace);
                if (this.iframe && t !== this.getHash(this.iframe.contentWindow)) {
                    var n = this.iframe.contentWindow;
                    if (!e.replace) {
                        n.document.open();
                        n.document.close()
                    }
                    this._updateHash(n.location, t, e.replace)
                }
            } else {
                return this.location.assign(r)
            }
            if (e.trigger)
                return this.loadUrl(t)
        },
        _updateHash: function(t, e, i) {
            if (i) {
                var r = t.href.replace(/(javascript:|#).*$/, "");
                t.replace(r + "#" + e)
            } else {
                t.hash = "#" + e
            }
        }
    });
    e.history = new M;
    var q = function(t, e) {
        var r = this;
        var n;
        if (t && i.has(t, "constructor")) {
            n = t.constructor
        } else {
            n = function() {
                return r.apply(this, arguments)
            }
        }
        i.extend(n, r, e);
        var s = function() {
            this.constructor = n
        };
        s.prototype = r.prototype;
        n.prototype = new s;
        if (t)
            i.extend(n.prototype, t);
        n.__super__ = r.prototype;
        return n
    };
    y.extend = x.extend = $.extend = I.extend = M.extend = q;
    var F = function() {
        throw new Error('A "url" property or function must be specified')
    };
    var z = function(t, e) {
        var i = e.error;
        e.error = function(r) {
            if (i)
                i.call(e.context, t, r, e);
            t.trigger("error", t, r, e)
        }
    };
    return e
}
));
(function(t) {
    if (typeof define !== "undefined" && define.amd) {
        define([], t)
    } else if (typeof module !== "undefined" && module.exports) {
        module.exports = t()
    } else {
        window.scrollMonitor = t()
    }
}
)((function() {
    var t = function() {
        return window.pageYOffset || document.documentElement && document.documentElement.scrollTop || document.body.scrollTop
    };
    var i = {};
    var e = [];
    var o = "visibilityChange";
    var s = "enterViewport";
    var n = "fullyEnterViewport";
    var r = "exitViewport";
    var h = "partiallyExitViewport";
    var l = "locationChange";
    var c = "stateChange";
    var a = [o, s, n, r, h, l, c];
    var p = {
        top: 0,
        bottom: 0
    };
    var u = function() {
        return window.innerHeight || document.documentElement.clientHeight
    };
    var w = function() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight)
    };
    i.viewportTop = null;
    i.viewportBottom = null;
    i.documentHeight = null;
    i.viewportHeight = u();
    var f;
    var m;
    var d;
    function v() {
        i.viewportTop = t();
        i.viewportBottom = i.viewportTop + i.viewportHeight;
        i.documentHeight = w();
        if (i.documentHeight !== f) {
            d = e.length;
            while (d--) {
                e[d].recalculateLocation()
            }
            f = i.documentHeight
        }
    }
    function b() {
        i.viewportHeight = u();
        v();
        I()
    }
    var g;
    function V() {
        clearTimeout(g);
        g = setTimeout(b, 100)
    }
    var y;
    function I() {
        y = e.length;
        while (y--) {
            e[y].update()
        }
        y = e.length;
        while (y--) {
            e[y].triggerCallbacks()
        }
    }
    function k(t, e) {
        var u = this;
        this.watchItem = t;
        if (!e) {
            this.offsets = p
        } else if (e === +e) {
            this.offsets = {
                top: e,
                bottom: e
            }
        } else {
            this.offsets = {
                top: e.top || p.top,
                bottom: e.bottom || p.bottom
            }
        }
        this.callbacks = {};
        for (var w = 0, f = a.length; w < f; w++) {
            u.callbacks[a[w]] = []
        }
        this.locked = false;
        var d;
        var v;
        var b;
        var g;
        var V;
        var y;
        function I(t) {
            if (t.length === 0) {
                return
            }
            V = t.length;
            while (V--) {
                y = t[V];
                y.callback.call(u, m);
                if (y.isOne) {
                    t.splice(V, 1)
                }
            }
        }
        this.triggerCallbacks = function t() {
            if (this.isInViewport && !d) {
                I(this.callbacks[s])
            }
            if (this.isFullyInViewport && !v) {
                I(this.callbacks[n])
            }
            if (this.isAboveViewport !== b && this.isBelowViewport !== g) {
                I(this.callbacks[o]);
                if (!v && !this.isFullyInViewport) {
                    I(this.callbacks[n]);
                    I(this.callbacks[h])
                }
                if (!d && !this.isInViewport) {
                    I(this.callbacks[s]);
                    I(this.callbacks[r])
                }
            }
            if (!this.isFullyInViewport && v) {
                I(this.callbacks[h])
            }
            if (!this.isInViewport && d) {
                I(this.callbacks[r])
            }
            if (this.isInViewport !== d) {
                I(this.callbacks[o])
            }
            switch (true) {
            case d !== this.isInViewport:
            case v !== this.isFullyInViewport:
            case b !== this.isAboveViewport:
            case g !== this.isBelowViewport:
                I(this.callbacks[c])
            }
            d = this.isInViewport;
            v = this.isFullyInViewport;
            b = this.isAboveViewport;
            g = this.isBelowViewport
        }
        ;
        this.recalculateLocation = function() {
            if (this.locked) {
                return
            }
            var t = this.top;
            var e = this.bottom;
            if (this.watchItem.nodeName) {
                var o = this.watchItem.style.display;
                if (o === "none") {
                    this.watchItem.style.display = ""
                }
                var s = this.watchItem.getBoundingClientRect();
                this.top = s.top + i.viewportTop;
                this.bottom = s.bottom + i.viewportTop;
                if (o === "none") {
                    this.watchItem.style.display = o
                }
            } else if (this.watchItem === +this.watchItem) {
                if (this.watchItem > 0) {
                    this.top = this.bottom = this.watchItem
                } else {
                    this.top = this.bottom = i.documentHeight - this.watchItem
                }
            } else {
                this.top = this.watchItem.top;
                this.bottom = this.watchItem.bottom
            }
            this.top -= this.offsets.top;
            this.bottom += this.offsets.bottom;
            this.height = this.bottom - this.top;
            if ((t !== undefined || e !== undefined) && (this.top !== t || this.bottom !== e)) {
                I(this.callbacks[l])
            }
        }
        ;
        this.recalculateLocation();
        this.update();
        d = this.isInViewport;
        v = this.isFullyInViewport;
        b = this.isAboveViewport;
        g = this.isBelowViewport
    }
    k.prototype = {
        on: function(t, i, e) {
            switch (true) {
            case t === o && !this.isInViewport && this.isAboveViewport:
            case t === s && this.isInViewport:
            case t === n && this.isFullyInViewport:
            case t === r && this.isAboveViewport && !this.isInViewport:
            case t === h && this.isAboveViewport:
                i.call(this, m);
                if (e) {
                    return
                }
            }
            if (this.callbacks[t]) {
                this.callbacks[t].push({
                    callback: i,
                    isOne: e || false
                })
            } else {
                throw new Error("Tried to add a scroll monitor listener of type " + t + ". Your options are: " + a.join(", "))
            }
        },
        off: function(t, i) {
            if (this.callbacks[t]) {
                for (var e = 0, o; o = this.callbacks[t][e]; e++) {
                    if (o.callback === i) {
                        this.callbacks[t].splice(e, 1);
                        break
                    }
                }
            } else {
                throw new Error("Tried to remove a scroll monitor listener of type " + t + ". Your options are: " + a.join(", "))
            }
        },
        one: function(t, i) {
            this.on(t, i, true)
        },
        recalculateSize: function() {
            this.height = this.watchItem.offsetHeight + this.offsets.top + this.offsets.bottom;
            this.bottom = this.top + this.height
        },
        update: function() {
            this.isAboveViewport = this.top < i.viewportTop;
            this.isBelowViewport = this.bottom > i.viewportBottom;
            this.isInViewport = this.top <= i.viewportBottom && this.bottom >= i.viewportTop;
            this.isFullyInViewport = this.top >= i.viewportTop && this.bottom <= i.viewportBottom || this.isAboveViewport && this.isBelowViewport
        },
        destroy: function() {
            var t = e.indexOf(this)
              , i = this;
            e.splice(t, 1);
            for (var o = 0, s = a.length; o < s; o++) {
                i.callbacks[a[o]].length = 0
            }
        },
        lock: function() {
            this.locked = true
        },
        unlock: function() {
            this.locked = false
        }
    };
    var H = function(t) {
        return function(i, e) {
            this.on.call(this, t, i, e)
        }
    };
    for (var E = 0, T = a.length; E < T; E++) {
        var B = a[E];
        k.prototype[B] = H(B)
    }
    try {
        v()
    } catch (t) {
        try {
            window.$(v)
        } catch (t) {
            throw new Error("If you must put scrollMonitor in the <head>, you must use jQuery.")
        }
    }
    function A(t) {
        m = t;
        v();
        I()
    }
    if (window.addEventListener) {
        window.addEventListener("scroll", A);
        window.addEventListener("resize", V)
    } else {
        window.attachEvent("onscroll", A);
        window.attachEvent("onresize", V)
    }
    i.beget = i.create = function(t, i) {
        if (typeof t === "string") {
            t = document.querySelector(t)
        } else if (t && t.length > 0) {
            t = t[0]
        }
        var o = new k(t,i);
        e.push(o);
        o.update();
        return o
    }
    ;
    i.update = function() {
        m = null;
        v();
        I()
    }
    ;
    i.recalculateLocations = function() {
        i.documentHeight = 0;
        i.update()
    }
    ;
    return i
}
));
/*!
 * jQuery Cookie Plugin v1.2
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function(e, n) {
    const o = /\+/g;
    function t(e) {
        return e
    }
    function i(e) {
        return decodeURIComponent(e.replace(o, " "))
    }
    const r = e.cookie = function(o, s, u) {
        if (s !== undefined) {
            u = e.extend({}, r.defaults, u);
            if (s === null) {
                u.expires = -1
            }
            if (typeof u.expires === "number") {
                const e = u.expires;
                const n = u.expires = new Date;
                n.setDate(n.getDate() + e)
            }
            s = r.json ? JSON.stringify(s) : String(s);
            return n.cookie = [encodeURIComponent(o), "=", r.raw ? s : encodeURIComponent(s), u.expires ? "; expires=" + u.expires.toUTCString() : "", u.path ? "; path=" + u.path : "", u.domain ? "; domain=" + u.domain : "", u.secure ? "; secure" : ""].join("")
        }
        const c = r.raw ? t : i;
        const f = n.cookie.split("; ");
        for (let e = 0, n; n = f[e] && f[e].split("="); e++) {
            if (c(n.shift()) === o) {
                const e = c(n.join("="));
                return r.json ? JSON.parse(e) : e
            }
        }
        return null
    }
    ;
    r.defaults = {};
    e.removeCookie = function(n, o) {
        if (e.cookie(n) !== null) {
            e.cookie(n, null, o);
            return true
        }
        return false
    }
}
)(jQuery, document);
!function(t) {
    "use strict";
    var e = function(t, e) {
        this.init("tooltip", t, e)
    };
    e.prototype = {
        constructor: e,
        init: function(e, i, o) {
            var s, n;
            this.type = e;
            this.$element = t(i);
            this.options = this.getOptions(o);
            this.enabled = true;
            if (this.options.trigger == "click") {
                this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this))
            } else if (this.options.trigger != "manual") {
                s = this.options.trigger == "hover" ? "mouseenter" : "focus";
                n = this.options.trigger == "hover" ? "mouseleave" : "blur";
                this.$element.on(s + "." + this.type, this.options.selector, t.proxy(this.enter, this));
                this.$element.on(n + "." + this.type, this.options.selector, t.proxy(this.leave, this))
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
            var t, e, i, o, s, n, h;
            if (this.hasContent() && this.enabled) {
                t = this.tip();
                this.setContent();
                if (this.options.animation) {
                    t.addClass("fade")
                }
                n = typeof this.options.placement == "function" ? this.options.placement.call(this, t[0], this.$element[0]) : this.options.placement;
                e = /in/.test(n);
                t.remove().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).appendTo(e ? this.$element : document.body);
                i = this.getPosition(e);
                o = t[0].offsetWidth;
                s = t[0].offsetHeight;
                switch (e ? n.split(" ")[1] : n) {
                case "bottom":
                    h = {
                        top: i.top + i.height,
                        left: i.left + i.width / 2 - o / 2
                    };
                    break;
                case "top":
                    h = {
                        top: i.top - s,
                        left: i.left + i.width / 2 - o / 2
                    };
                    break;
                case "left":
                    h = {
                        top: i.top + i.height / 2 - s / 2,
                        left: i.left - o
                    };
                    break;
                case "right":
                    h = {
                        top: i.top + i.height / 2 - s / 2,
                        left: i.left + i.width
                    };
                    break
                }
                t.css(h).addClass(n).addClass("in")
            }
        },
        setContent: function() {
            var t = this.tip()
              , e = this.getTitle();
            t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e);
            t.removeClass("fade in top bottom left right")
        },
        hide: function() {
            var e = this
              , i = this.tip();
            i.removeClass("in");
            function o() {
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
            t.support.transition && this.$tip.hasClass("fade") ? o() : i.remove();
            return this
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
        },
        destroy: function() {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    };
    t.fn.tooltip = function(i) {
        return this.each((function() {
            var o = t(this)
              , s = o.data("tooltip")
              , n = typeof i == "object" && i;
            if (!s)
                o.data("tooltip", s = new e(this,n));
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
        delay: 0,
        html: true
    }
}(window.jQuery);
(function(n) {
    "use strict";
    var e = n.Phoenix;
    var i = n.PhoenixLoader;
    if (!e) {
        e = n.Phoenix = function() {}
    }
    var a = e.jQuery || {};
    var t = a.getBody ? a.getBody() : $(document.body);
    var d = a.getDocument ? a.getDocument() : $(document);
    var r = "g" + "ui" + "lt_d" + "ete" + "c" + "te" + "d";
    var o = function() {
        var n;
        return function() {
            if (undefined === n) {
                n = $(".ad-settings")
            }
            return n
        }
    }();
    e.hasAds = function() {
        var n;
        return function() {
            if (undefined === n) {
                var e = o();
                n = e && e.length > 0
            }
            return n
        }
    }();
    e.hasPageEventAds = function() {
        var n;
        return function() {
            if (undefined === n) {
                var e = o();
                n = t.hasClass("has-page-events") || e && e.length > 1
            }
            return n
        }
    }();
    e.hasAdsInitialized = function() {
        var n = false;
        d.one("ads_initialized", (function() {
            n = true
        }
        ));
        return function() {
            return n
        }
    }();
    e.hasGuilt = function() {
        var n = false;
        d.one(r, (function() {
            n = true
        }
        ));
        return function() {
            return n
        }
    }();
    var u = e.hasSkyboxAdDiv = function() {
        var n;
        return function() {
            if (n === undefined) {
                n = $('.js-mapped-ad[data-ad-type*="skybox"]').length > 0
            }
            return n
        }
    }();
    var f = e.hasNavPlusLeaderAdDiv = function() {
        var n;
        return function() {
            if (n === undefined) {
                n = $('.js-mapped-ad[data-ad-type="nav-ad-plus-leader"]').length > 0
            }
            return n
        }
    }();
    var s = e.hasSkyboxAdLoaded = function() {
        var n, a;
        if (u()) {
            d.one("ads_initialized", (function() {
                if (i.keyScriptsFailed() || e.hasGuilt()) {
                    n = false
                } else {
                    d.on("ad_rendered", a = function(e, i) {
                        const r = i.adData;
                        if (r.divId && r.divId.indexOf("skybox") >= 0) {
                            if (r.isBlank || r.isBlocked) {
                                n = false
                            } else {
                                d.one("ad_load_" + r.divId, (function() {
                                    if (t.hasClass("skybox-loaded") || $("#skyboxSpacer").length > 0) {
                                        n = true
                                    } else {
                                        n = false
                                    }
                                }
                                ))
                            }
                            d.off("ad_rendered", a)
                        }
                    }
                    )
                }
            }
            ))
        } else {
            n = false
        }
        return function() {
            return n
        }
    }();
    e.onNoSkyboxAdLoaded = function() {
        var n = ".noSkyboxAdLoaded";
        var a = false;
        var t = [];
        var o = function() {
            if (i && i.keyScriptsFailed && i.keyScriptsFailed()) {
                u();
                return
            }
            d.on("ad_rendered" + n, (function(i, a) {
                const r = a.adData;
                if (r.divId && r.divId.indexOf("skybox") >= 0) {
                    if (r.isBlank) {
                        u()
                    } else {
                        d.one("ad_load_" + r.divId + n, (function() {
                            if (!e.hasSkyboxAdLoaded()) {
                                u()
                            } else {
                                t = null
                            }
                        }
                        ))
                    }
                }
            }
            ))
        };
        var u = function() {
            var n, e;
            for (n = 0; n < t.length; n++) {
                e = t[n];
                e()
            }
            t = null
        };
        return function(i) {
            if (s() === false) {
                i();
                return
            }
            t.push(i);
            if (!a) {
                a = true;
                if (e.hasAdsInitialized()) {
                    o()
                } else {
                    d.one("ads_initialized" + n, (function() {
                        o()
                    }
                    ))
                }
                d.one(r + n, (function() {
                    d.off(n);
                    u()
                }
                ))
            }
        }
    }();
    $((function() {
        setTimeout((function() {
            if (i.keyScriptsFailed() && !e.hasAdsInitialized()) {
                d.trigger("tracking_initialized");
                d.trigger("ads_initialized")
            }
        }
        ), 0)
    }
    ))
}
)(window);
(function(n) {
    "use strict";
    const t = ["ftag", "vndid"];
    const i = ["ftag", "socc", "ttag", "utm_source", "utm_medium", "utm_campaign", "vndid"];
    const s = function(n, t) {
        let i = window.location[n].substring(1);
        if (i.length > 0 && i.indexOf("=") > 0) {
            i = i.split("&").map((n=>n.split("="))).filter((n=>t.includes(n[0]) && typeof n[1] !== "undefined"));
            if (i.length > 0) {
                const n = {};
                i.forEach((t=>{
                    n[t[0]] = t[1]
                }
                ));
                return n
            }
        }
        return null
    };
    const e = n.Phoenix = n.Phoenix || function() {}
    ;
    e.CampaignParams = {
        getParams(n) {
            n = n || {};
            const e = n.hashParamKeys || t;
            const a = n.queryParamKeys || i;
            const c = s("hash", e);
            const o = s("search", a);
            let u;
            if (o || c) {
                u = Object.assign({}, o, c)
            }
            if (undefined === u) {
                u = null
            }
            return u
        }
    }
}
)(window);
(function(n) {
    "use strict";
    const e = n.Phoenix = n.Phoenix || {}
      , t = $(document);
    const o = Backbone.View.extend({
        initialize: function(n) {
            const e = this;
            e.on("all", (function(n, t) {
                e.$el.trigger(n, t)
            }
            ))
        }
    });
    e.Events = new o({
        el: t
    });
    e.pageEventCount = 0;
    t.on("on_page_event.pageEventCount on_tracking_event.pageEventCount", (function() {
        e.pageEventCount++
    }
    ))
}
)(window);
(function(t) {
    "use strict";
    var i = {};
    var e = {
        offset: 0,
        zIndex: 100,
        noStop: false,
        bottom: false,
        unstickyOnAjax: true,
        resizeOnAjax: true,
        stickyCondition: null,
        noStopOnBody: false,
        append: true
    };
    var a = [];
    t.sticky = function(n, r, o, s) {
        var f = t(n);
        f.data("stickyEnabled", true);
        f.trigger("stickyEnabled");
        r = r || {};
        r = t.extend(r, f.data());
        t.destroySticky = function(e) {
            var n = t(e);
            t(window).off("scroll", i[e].scroll);
            t(window).off("resize", i[e].resize);
            i[e] = null;
            n.each((function() {
                var i = t(this);
                var e = w(i);
                var n = parseInt(e.originalTop, 10);
                var r = t.inArray(n, a);
                if (r >= 0) {
                    a.splice(r, 1)
                }
                k(i);
                l(i);
                i.removeAttr("data-original-pos");
                i.removeAttr("data-original-width");
                i.data("sticky-stopped", false);
                i.data("stickied", false)
            }
            ));
            n.data("stickyEnabled", false);
            n.trigger("stickyDisabled")
        }
        ;
        r = t.extend({}, e, r);
        function d() {
            var i = [];
            if (n instanceof jQuery) {
                i = n
            } else {
                i = t(n)
            }
            if (i.length <= 0) {
                return
            }
            i.each((function() {
                var i = t(this);
                if (i.attr("data-sticky-disabled") === "true") {
                    return
                }
                var e = i.outerHeight();
                var n = i.outerWidth();
                var o = t(window).height();
                if (e >= o || e === 0 || n === 0) {
                    return
                }
                var s = w(i);
                var f = parseInt(s.originalTop, 10);
                var d = s.originalLeft;
                var c = s.originalWidth;
                if (t.inArray(f, a) < 0) {
                    a.push(f);
                    a.sort((function(t, i) {
                        return t - i
                    }
                    ))
                }
                if (!h(i) && t(window).scrollTop() > f) {
                    if (r.stickyCondition !== null) {
                        if (!r.stickyCondition(i)) {
                            return
                        }
                    }
                    p(i, d, c);
                    if (!r.noStop) {
                        u(i, f)
                    }
                } else if (h(i) && t(window).scrollTop() <= f) {
                    u(i, f);
                    l(i)
                }
                if (!r.noStop && h(i)) {
                    u(i, f)
                }
                if (r.bottom !== false && h(i)) {
                    v(i, r.bottom)
                }
            }
            ))
        }
        function c() {
            var i = [];
            if (n instanceof jQuery) {
                i = n
            } else {
                i = t(n)
            }
            i.each((function() {
                var i = t(this);
                i.removeAttr("data-original-pos");
                i.removeAttr("data-original-width");
                if (i.data("sticky-stopped")) {
                    k(i)
                }
                if (i.data("stickied")) {
                    l(i)
                }
                i.data("sticky-stopped", false);
                i.data("stickied", false)
            }
            ));
            a = []
        }
        t(window).on("scroll", d);
        t(window).resize(c);
        i[n] = {
            scroll: d,
            resize: c
        };
        function p(i, e, a) {
            i.css("position", "fixed").css("top", r.offset + "px").css("left", e + "px").css("width", a + "px").css("margin-top", "0px").css("z-index", r.zIndex);
            if (o) {
                o(i)
            }
            i.data("stickied", true);
            i.trigger("sticky");
            if (!i.data("has-listener")) {
                t(document).ajaxStop((function() {
                    if (r.resizeOnAjax) {
                        c();
                        d()
                    }
                    if (r.unstickyOnAjax) {
                        if (i.data("sticky-stopped")) {
                            k(i)
                        }
                        if (i.data("stickied")) {
                            l(i)
                        }
                    }
                }
                ));
                i.data("has-listener", true)
            }
        }
        function l(t) {
            t.css("position", "").css("top", "").css("left", "").css("width", "").css("margin-top", "").css("z-index", "");
            if (s) {
                s(t)
            }
            t.data("stickied", false);
            t.trigger("unsticky")
        }
        function u(i, e) {
            var n = t.inArray(e, a);
            var r = a.slice(n + 1);
            var o = r[0];
            if (o !== undefined) {
                var s = i.outerHeight() + t(window).scrollTop();
                var f = i.data("sticky-stopped");
                if (!f && s >= o) {
                    g(i, o)
                } else if (f && s < o) {
                    k(i)
                }
            }
        }
        function v(i, e) {
            var a = y(i, e);
            var n = a.offset().top + a.outerHeight();
            if (n > 0) {
                var r = i.outerHeight() + t(window).scrollTop();
                var o = i.data("sticky-stopped");
                if (!o && r >= n) {
                    g(i, n)
                } else if (o && r < n) {
                    k(i)
                }
            }
        }
        function y(i, e) {
            var a = null;
            var n = i.data("sticky-stopped-parent");
            if (e === "parent") {
                if (n) {
                    a = n
                } else {
                    a = i.parent()
                }
            } else {
                if (e.ancestor !== undefined) {
                    if (n) {
                        a = n.parents(e.ancestor).first()
                    } else {
                        a = i.parents(e.ancestor).first()
                    }
                } else {
                    a = t(e)
                }
            }
            return a
        }
        function g(i, e) {
            var a = i.outerHeight();
            i.css("position", "absolute");
            i.css("top", e - a + "px");
            i.data("sticky-stopped", true);
            if (!r.noStopOnBody) {
                i.data("sticky-stopped-parent", i.parent());
                t("body").append(i)
            }
        }
        function k(t) {
            t.css("position", "fixed");
            t.css("top", r.offset + "px");
            t.data("sticky-stopped", false);
            var i = t.data("sticky-stopped-parent");
            if (i) {
                if (r.append) {
                    i.append(t)
                } else {
                    i.prepend(t)
                }
            }
            t.removeData("sticky-stopped-parent")
        }
        function h(t) {
            return t.data("stickied") || false
        }
        function w(t) {
            var i = t.attr("data-original-pos");
            var e = t.attr("data-original-width");
            if (!i) {
                m(t);
                i = t.attr("data-original-pos");
                e = t.attr("data-original-width")
            }
            return {
                originalPos: i,
                originalTop: i.split(";")[0],
                originalLeft: i.split(";")[1],
                originalWidth: e
            }
        }
        function m(i) {
            var e = Number(i.css("margin-left").replace("px", ""));
            var a = i.offset().left - e;
            var n = i.offset().top + ";" + a;
            var o = i.outerWidth();
            i.attr("data-original-pos", n);
            i.attr("data-original-width", o);
            t(document).ajaxStop((function(e) {
                if (r.unstickyOnAjax) {
                    i.removeAttr("data-original-pos");
                    i.removeAttr("data-original-width");
                    t(document).unbind(e)
                }
            }
            ))
        }
    }
    ;
    t(window).on("load", (function() {
        "use strict";
        t.sticky(".js-sticky-element", {
            offset: 20,
            noStop: false,
            noStopOnBody: true
        });
        t.sticky(".mceEditor .toolbars", {
            bottom: "parent",
            noStopOnBody: true,
            unstickyOnAjax: false
        }, (function(t) {
            i(t)
        }
        ), (function(t) {
            e(t)
        }
        ));
        t.sticky(".sticky-nav", {
            noStopOnBody: true
        }, (function(t) {
            i(t)
        }
        ), (function(t) {
            e(t)
        }
        ));
        t.sticky(".sticky-li-row", {
            unstickyOnAjax: false,
            bottom: {
                ancestor: "div"
            },
            stickyCondition: function(t) {
                var i = 5;
                var e = t.parents("ul").first();
                var a = e.find("li");
                var n = t.parents("div.js-no-sticky");
                if (n.length > 0) {
                    return false
                }
                if (a.length < i) {
                    return false
                } else {
                    return true
                }
            },
            append: false
        }, (function(t) {
            i(t)
        }
        ), (function(t) {
            e(t)
        }
        ));
        var i = function(t, i) {
            var e = null;
            if (typeof i !== undefined) {
                e = t.parents(i).first()
            } else {
                e = t.parent()
            }
            var a = parseInt(e.css("padding-top"), 10);
            t.parent().css("padding-top", t.outerHeight() + a + "px")
        };
        var e = function(t, i) {
            var e = null;
            if (typeof i !== undefined) {
                e = t.parents(i).first()
            } else {
                e = t.parent()
            }
            t.parent().css("padding-top", "")
        };
        if (!(navigator.userAgent.indexOf("MSIE ") > -1 || navigator.userAgent.indexOf("Trident/") > -1)) {
            var a = new ResizeObserver((function(i) {
                const e = t(".mceEditor .toolbars");
                var a = e.offset().left;
                var n = e.offset().top + ";" + a;
                var r = e.outerWidth();
                e.attr("data-original-pos", n);
                e.attr("data-original-width", r)
            }
            ));
            const i = ["js-forum-messages", ".js-forum-comments"];
            for (const t of i) {
                let i = document.getElementsByClassName(t)[0];
                if (i) {
                    a.observe(i)
                }
            }
        }
    }
    ))
}
)(jQuery);
