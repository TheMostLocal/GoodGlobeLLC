(self.webpackChunkcomicvine = self.webpackChunkcomicvine || []).push([[9024], {
    2474: (e,i,t)=>{
        var l = t(9755);
        !function(e) {
            "use strict";
            var i, t, s, a = e.Phoenix;
            a || (e.Phoenix = a = {}),
            i = a.VideoPlayer = a.VideoPlayer || {},
            t = i.Views = i.Views || {},
            s = i.Controls = i.Controls || {};
            var r = "_gamesVideoAutoplayer"
              , o = function(e, i) {
                var t = e.Player;
                e.states.autoplayUserDisabled = i,
                t.setStates(e.states)
            };
            s.Autoplay = t.AbstractPreference.extend({
                name: "autoplay",
                saveToCookie: !1,
                states: {
                    autoplayUserDisabled: !1
                },
                els: {
                    $autoPlayToggle: null
                },
                hasStoredValue: !1,
                events: {
                    "click .js-vid-autoplay": "toggleAutoplay",
                    "click .js-vid-modal-autoplay": "toggleModal"
                },
                Player: null,
                initialize: function(e) {
                    var i, l = this;
                    t.AbstractPreference.prototype.initialize.call(l, e),
                    (i = l.els.$autoPlayToggle = l.$(".js-vid-autoplay")) && i.length ? l.loadPreference() : l.disable(!0)
                },
                loadPreference: function(e) {
                    var i, t = this;
                    return e && void 0 !== e.autoplayUserDisabled ? o(t, e.autoplayUserDisabled) : a.userLoggedIn() ? t.els.$autoPlayToggle.length > 0 && 1 === t.els.$autoPlayToggle.data("user-autoplay-disabled") && o(t, !0) : (i = a.Storage.get(r)) && function(e, i) {
                        i && !0 === i.autoplayUserDisabled && e.els.$autoPlayToggle.length > 0 && o(e, i.autoplayUserDisabled),
                        e.hasStoredValue = !0
                    }(t, i),
                    t.states
                },
                setPreference: function() {
                    var e = this
                      , i = {
                        autoplayUserDisabled: e.states.autoplayUserDisabled
                    };
                    return a.userLoggedIn() ? function(e) {
                        l.ajax({
                            url: "/api/user/settings/autoplay",
                            data: {
                                autoplayDisabled: e.states.autoplayUserDisabled
                            },
                            type: "POST"
                        })
                    }(e) : (a.Storage.set(r, i, 7),
                    e.hasStoredValue = !0),
                    e.savePreferences(i),
                    i
                },
                toggleAutoplay: function() {
                    var e = this;
                    a.userLoggedIn() || !1 !== e.hasStoredValue || e.toggleModal(e),
                    o(e, !e.states.autoplayUserDisabled),
                    e.setPreference()
                },
                toggleModal: function() {
                    var e = this.Player
                      , i = !e.states.autoplayModal;
                    e.setStates({
                        autoplayModal: i
                    })
                }
            })
        }(window)
    }
    ,
    2546: (e,i,t)=>{
        var l = t(9755);
        !function(e) {
            "use strict";
            var i, t, s, a = e.Phoenix;
            a || (e.Phoenix = a = {}),
            i = a.VideoPlayer = a.VideoPlayer || {},
            t = i.Views = i.Views || {},
            s = i.Controls = i.Controls || {};
            i.log;
            s.Clip = Backbone.View.extend({
                name: "clip",
                $els: {
                    slider: l(".js-clip-slider"),
                    container: l(".av-clip-container"),
                    message: l("#clip-create-content-form .js-clip-message"),
                    link: l("#clip-create-content-form .js-clip-link"),
                    section: l(".js-clip-section"),
                    clipClose: l(".js-close-clip"),
                    loading: l(".js-clip-loading"),
                    handles: l(".av-clip-handle"),
                    sliderEnd: l(".av-clip-handle.end"),
                    sliderStart: l(".av-clip-handle.start"),
                    vidBuffer: l(".js-vid-buffer"),
                    posMarker: l(".js-clip-pos-marker"),
                    timeCodes: l(".js-clip-time"),
                    form: l("#clip-create-content-form"),
                    clipEnabled: l(".js-trim-enabled"),
                    clipStart: l('input[name="videoUserClip[start]"], input[name="trim-start"]'),
                    clipEnd: l('input[name="videoUserClip[end]"], input[name="trim-end"]'),
                    clipDuration: l('input[name="videoUserClip[duration]"]'),
                    clipRuler: l(".js-clip-ruler"),
                    clipBump: l(".js-clip-bump"),
                    vidPosition: l(".js-vid-position"),
                    tooltips: l(".js-clip-controls .js-vid-tooltip"),
                    clipPosition: null
                },
                states: {},
                events: {
                    "click .js-vid-buffer": "markStartProgress"
                },
                Player: null,
                vidLength: 0,
                rulerWidth: 0,
                vidBufferWidth: 0,
                vidBufferPixelRatio: 0,
                pixelRatio: 0,
                clipStart: 0,
                clipEnd: 0,
                ignoreClick: !1,
                initialized: !1,
                enabled: !1,
                initialize: function(e) {
                    var l, s = this;
                    t.AbstractPreference.prototype.initialize.call(s, e),
                    l = s.Player = e.Player,
                    s.els,
                    l.on("clipCreate", (function() {
                        if (l.states.started) {
                            s.initControls();
                            var e = l.getCurrentTime();
                            s.setTime(e, e + 60)
                        } else
                            l.once("videoProgress", (function() {
                                s.initControls()
                            }
                            ));
                        s.toggleEnabled(!0)
                    }
                    )),
                    l.$el.hasClass("is-clip") && l.setStates({
                        customStartTimeDisabled: !0
                    }),
                    l.$el.hasClass("is-clip-trim") && (l.videoJSON.videoStreams.adaptive_stream = l.videoJSON.videoStreams.adaptive_stream.split("?")[0],
                    l.trigger("clipCreate"),
                    s.initControls(!0),
                    l.once("videoProgress", (function() {
                        s.$els.container.removeClass(i.classnames.hide),
                        s.initDuration();
                        var e = parseInt(s.$els.clipStart.val())
                          , t = parseInt(s.$els.clipEnd.val());
                        e >= 0 && t > 0 ? s.setTime(e, t) : s.setTime(0, l.getDuration())
                    }
                    )))
                },
                initControls: function(e) {
                    var t = this;
                    if (!t.initialized) {
                        t.initialized = !0,
                        !0 !== e && t.$els.container.removeClass(i.classnames.hide),
                        t.initDuration(),
                        t.initSlider(),
                        t.initTooltips(),
                        t.initForm(),
                        t.Player.$el.on("contentProgress", (function(e) {
                            t.onProgress(e)
                        }
                        )),
                        l(window).on("resize", (function() {
                            t.initDuration(),
                            t.clipStart >= 0 && t.setTime(t.clipStart, t.clipEnd)
                        }
                        )),
                        t.$els.clipRuler.on("click", _.bind(t.markStartRuler, t)),
                        t.$els.clipBump.on("click", _.bind(t.bumpClip, t)),
                        t.$els.clipClose.on("click", _.bind(t.closeClip, t)),
                        t.$els.vidPosition.before('<div class="av-clip-position av-position js-clip-position"></div>'),
                        t.$els.clipPosition = l(".js-clip-position");
                        var s = parseInt(i.query("start"));
                        s ? t.setTime(s, s + 60) : t.setTime(0, 60)
                    }
                },
                initForm: function() {
                    var e = this;
                    e.$els.form.ajaxForm((function(t) {
                        e.$els.loading.removeClass(i.classnames.hide);
                        var s = l(this)
                          , r = s.attr("action")
                          , o = s.serialize();
                        l.ajax({
                            url: r,
                            type: "POST",
                            data: o,
                            success: function(t) {
                                if (t.success) {
                                    var l = e.$els.message
                                      , s = e.$els.link;
                                    s.attr("href", t.url + "?autoplay=1"),
                                    s.text(window.location.protocol + "//" + window.location.host + t.url),
                                    l.removeClass(i.classnames.hide)
                                } else
                                    a.Ui.showErrorMessage("Error creating clip.")
                            },
                            error: function() {
                                a.Ui.showErrorMessage("Error creating clip.")
                            },
                            complete: function() {
                                e.$els.loading.addClass(i.classnames.hide)
                            }
                        }),
                        t.preventDefault()
                    }
                    ))
                },
                initDuration: function() {
                    var e = this;
                    e.vidLength = e.Player.getDuration(),
                    e.rulerWidth = e.$els.clipRuler.width() - 10,
                    e.pixelRatio = e.vidLength / e.rulerWidth
                },
                initTooltips: function() {
                    this.$els.tooltips.tooltip({
                        animation: !1,
                        delay: 0,
                        template: '<div class="av-vid-tooltip" role="tooltip"><div class="av-vid-tooltip-arrow tooltip-arrow"></div><div class="av-vid-tooltip-inner tooltip-inner"></div></div>'
                    })
                },
                initSlider: function() {
                    var e = this;
                    window.a = 0,
                    e.$els.handles.draggabilly({
                        axis: "x",
                        containment: ".js-clip-ruler"
                    }).on("dragMove", (function(i, t, s) {
                        var a = e.$els.clipRuler.offset().left
                          , r = l(i.target);
                        return r.offset({
                            left: e.moveSlider(r, r.position().left, !1) + a
                        }),
                        !1
                    }
                    )).on("dragEnd", (function(i, t) {
                        l(i.target).hasClass("end") ? (e.calculateTime(!0, !1),
                        e.seekTo(e.clipEnd - 1)) : e.calculateTime(!0, !0);
                        var s = e.$els.clipRuler.offset().left
                          , a = l(i.target);
                        a.offset({
                            left: e.moveSlider(a, a.position().left, !1) + s
                        }),
                        e.ignoreClick = !0,
                        setTimeout((function() {
                            e.ignoreClick = !1
                        }
                        ), 1)
                    }
                    ))
                },
                setTime: function(e, t) {
                    var l = this;
                    if (e < 0 && (e = 0),
                    t > l.vidLength && (t = l.vidLength),
                    !(t <= e)) {
                        l.$els.slider.removeClass(i.classnames.hide),
                        l.clipStart = e,
                        l.clipEnd = t;
                        var s = e / l.vidLength
                          , a = t / l.vidLength;
                        l.moveSliderRatio(l.$els.sliderStart, s, !0),
                        l.moveSliderRatio(l.$els.sliderEnd, a),
                        l.updateProgress(),
                        l.updateTimeCodes(),
                        l.updateForm()
                    }
                },
                seekTo: function(e) {
                    this.Player.seekTo(e),
                    this.updatePosMarker(e)
                },
                calculateTime: function(e, i) {
                    var t = this
                      , l = t.$els.sliderEnd.position().left
                      , s = t.$els.sliderStart.position().left;
                    t.setTime(s * t.pixelRatio, l * t.pixelRatio),
                    i && t.seekTo(t.clipStart),
                    e && t.Player.play()
                },
                updateForm: function() {
                    var e = this;
                    e.$els.clipStart.val(e.clipStart),
                    e.$els.clipEnd.val(e.clipEnd),
                    e.$els.clipDuration.val(e.clipEnd - e.clipStart),
                    e.$els.clipEnabled.val("true")
                },
                updateTimeCodes: function() {
                    var e = this;
                    e.$els.timeCodes.filter(".start").text(i.convertTime(e.clipStart)),
                    e.$els.timeCodes.filter(".end").text(i.convertTime(e.clipEnd))
                },
                moveSliderRatio: function(e, i, t) {
                    return this.moveSlider(e, this.rulerWidth * i, t)
                },
                moveSlider: function(e, i, t) {
                    var l = this
                      , s = l.$els.sliderEnd.position().left
                      , a = l.$els.sliderStart.position().left;
                    if (e.hasClass("start"))
                        i + 10 >= s && i >= a && (t ? l.moveSlider(l.$els.sliderEnd, i + 10, !1) : i = s - 10),
                        l.$els.slider.css("margin-left", i),
                        l.$els.slider.css("width", s - i);
                    else {
                        a + 10 >= s && i <= s && (i = a + 10);
                        var r = parseInt(l.$els.slider.css("margin-left").replace("px", ""));
                        l.$els.slider.css("width", i - r)
                    }
                    return e.css("left", i),
                    i
                },
                updateProgress: function() {
                    var e = this;
                    e.vidBufferWidth = e.$els.vidBuffer.width(),
                    e.vidBufferPixelRatio = e.vidBufferWidth / e.vidLength,
                    e.$els.clipPosition.css("left", e.vidBufferPixelRatio * e.clipStart),
                    e.$els.clipPosition.css("width", e.vidBufferPixelRatio * (e.clipEnd - e.clipStart))
                },
                updatePosMarker: function(e) {
                    var i = this;
                    i.$els.posMarker.css("left", e / i.vidLength * i.$els.clipRuler.width())
                },
                onProgress: function() {
                    var e = this;
                    if (e.enabled) {
                        0 === e.vidLength && (e.initDuration(),
                        e.setTime(0, 60));
                        var i = e.Player.getCurrentTime();
                        (i > e.clipEnd || i < e.clipStart) && e.Player.seekTo(e.clipStart),
                        e.updateProgress(),
                        e.updatePosMarker(i)
                    }
                },
                markStartRuler: function(e) {
                    var t = this;
                    if (!t.ignoreClick) {
                        var s = i.getEventInContainerRatio(e, t.$els.clipRuler);
                        if (l(e.target).hasClass("av-clip-slider") || l(e.target).parents(".av-clip-slider").length > 0) {
                            var a = s * t.vidLength;
                            t.seekTo(a)
                        } else
                            t.moveSliderRatio(t.$els.sliderStart, s, !0),
                            t.calculateTime(!0, !0)
                    }
                },
                markStartProgress: function(e) {
                    var t = this
                      , l = i.getEventInContainerRatio(e, t.$els.vidBuffer);
                    t.moveSliderRatio(t.$els.sliderStart, l, !0),
                    t.calculateTime(!0, !0)
                },
                bumpClip: function(e) {
                    var i = this
                      , t = l(e.currentTarget)
                      , s = t.data("handle")
                      , a = parseInt(t.data("seconds"));
                    if ("start" === s)
                        if (0 === a)
                            i.setTime(0, i.clipEnd),
                            i.seekTo(r);
                        else if (99 === a)
                            i.setTime(i.Player.getCurrentTime(), i.clipEnd);
                        else {
                            var r = i.clipStart + a;
                            i.setTime(r, i.clipEnd),
                            i.seekTo(r)
                        }
                    else if (0 === a)
                        i.setTime(i.clipStart, i.vidLength),
                        i.seekTo(i.vidLength - 1);
                    else if (99 === a)
                        i.setTime(i.clipStart, i.Player.getCurrentTime());
                    else {
                        var o = i.clipEnd + a;
                        i.setTime(i.clipStart, o),
                        i.seekTo(o - 1)
                    }
                },
                toggleEnabled: function(e) {
                    var i = this;
                    i.enabled = !!e,
                    e ? (i.$els.section.slideDown(),
                    i.$els.container.show()) : (i.$els.section.slideUp(),
                    i.$els.container.hide())
                },
                closeClip: function(e) {
                    return this.toggleEnabled(!1),
                    e.preventDefault(),
                    !1
                }
            })
        }(window)
    }
    ,
    5398: (e,i,t)=>{
        "use strict";
        t(8738),
        t(200),
        t(8540),
        t(3428),
        t(7122),
        t(9900),
        t(3137),
        t(8390),
        t(5917),
        t(2099),
        t(8153),
        t(5287),
        t(4538),
        t(1102),
        t(7908),
        t(1179),
        t(19),
        t(2474),
        t(2546),
        t(2587),
        t(5121),
        t(2631),
        t(5618),
        t(6683),
        t(2396),
        t(2759),
        t(1285),
        t(7520),
        t(197),
        t(5463)
    }
}, e=>{
    e.O(0, [9755, 8342], (()=>{
        return i = 5398,
        e(e.s = i);
        var i
    }
    ));
    e.O()
}
]);
