"use strict";
(self.webpackChunkcomicvine = self.webpackChunkcomicvine || []).push([[9150], {
    8008: (e,t,a)=>{
        var r = a(249);
        const n = new r.ZP("tracking")
          , s = {
            click: [{
                delegateSelector: "[data-track-page-event]:not(form)"
            }],
            submit: [{
                delegateSelector: "form[data-track-page-event]"
            }]
        };
        const i = class {
            constructor({ParamsManager: e, ServicesManager: t}) {
                this.ParamsManager = e,
                this.ServicesManager = t,
                this.pageLoadTrackPageEvents()
            }
            initialize() {
                n.log("[MANAGER] Initializing"),
                this.initPageEventListeners()
            }
            initPageEventListeners() {
                document.addEventListener("update_tracking_params", (e=>{
                    const {eventName: t, trackingParamsOverride: a, trackingParamsUpdateType: r=!0} = e.detail;
                    t && a && (n.log(`[MANAGER] ${"string" == typeof r ? r : "update"} tracking params for [${t}] with: `, a),
                    this.ParamsManager.getParams({
                        eventName: t,
                        trackingParamsOverride: a,
                        trackingParamsUpdateType: r
                    }, !0))
                }
                )),
                document.addEventListener("on_page_event", (e=>{
                    const {eventName: t} = e.detail;
                    this.trackPageView({
                        eventName: t
                    })
                }
                )),
                document.addEventListener("on_tracking_event", (e=>{
                    const {detail: t} = e;
                    this.trackPageView(t)
                }
                ));
                for (const [e,t] of Object.entries(s))
                    for (const a of t) {
                        const {delegateSelector: t} = a;
                        t && (n.log(`[MANAGER] Add [${e}] event listener to document for ${t} elements`),
                        document.addEventListener(e, (a=>{
                            const r = a.target.closest(t);
                            r && (n.log(`[MANAGER] [${e}] event from document for ${t} element detected`),
                            this.trackPageEvent({
                                eventTarget: r
                            }))
                        }
                        )))
                    }
                n.log("[MANAGER] Document event listeners initialized")
            }
            pageLoadTrackPageEvents() {
                document.querySelectorAll("meta.js-track-page-event").forEach((e=>{
                    this.trackPageEvent({
                        paramsAttributeKey: "content",
                        eventTarget: e
                    })
                }
                ))
            }
            trackPageEvent(e) {
                n.log("[MANAGER] trackPageEvent: ", e),
                this.ServicesManager.callServiceMethod({
                    methodName: "trackPageEvent",
                    baseTrackingParams: this.ParamsManager.getTrackPageEventParams(e)
                })
            }
            trackPageView(e) {
                n.log("[MANAGER] trackPageView: ", e),
                this.ServicesManager.callServiceMethod({
                    methodName: "trackPageView",
                    serviceTrackingParams: this.ParamsManager.getParams(e, !0)
                })
            }
        }
        ;
        var o = a(9996)
          , c = a.n(o)
          , l = a(9896);
        const g = new class {
            constructor(e=window) {
                const {utag_data: t={}} = e;
                e.utag_data || (e.utag_data = t),
                this.srcWindow = e
            }
            setValue(e, t) {
                this.srcWindow.utag_data[e] = t,
                this.srcWindow.document.dispatchEvent(new Event("utag_data_updated"))
            }
            setValues(e, t=[]) {
                t.length > 0 && t.forEach((e=>delete this.srcWindow.utag_data[e])),
                Object.assign(this.srcWindow.utag_data, e),
                this.srcWindow.document.dispatchEvent(new Event("utag_data_updated"))
            }
        }
          , d = "pageLoad";
        class u {
            constructor() {
                this.pageLoadEventName = d,
                this.trackingParams = {},
                this.getParams({
                    eventName: this.pageLoadEventName
                })
            }
            getTrackPageEventParams({paramsAttributeKey: e="data-track-page-event", eventTarget: t}) {
                if (!t)
                    return {};
                const a = t.getAttribute(e);
                let r;
                if (a)
                    try {
                        r = JSON.parse(a)
                    } catch (e) {
                        n.error("[PARAMS] Track page event data must be JSON parseable: ", e)
                    }
                return r || (r = {}),
                r
            }
            getParams({eventName: e="pageLoad", trackingParamsOverride: t, trackingParamsUpdateType: a=!0}, r=!1) {
                const s = e === this.pageLoadEventName;
                let i = !1
                  , o = this.trackingParams[e];
                return void 0 === o ? (i = !0,
                o = t || (s ? l.D.getTrackingSettings() : this.getParamsFromEventMetaElements(e))) : t && a && (i = !0,
                o = "replace" === a ? t : c()(o, t)),
                i && (this.trackingParams[e] = o),
                n.log(`[PARAMS] Tracking params for ${e}: `, o),
                null !== o && (o = c().all([o])),
                r && o.tealium && o.tealium.utagData && this.updateGlobalUtagData(o.tealium.utagData),
                o
            }
            getParamsFromEventMetaElements(e) {
                let t = {};
                const a = `${e}-`;
                let r = 0;
                return document.querySelectorAll(`.${a}tracking-settings`).forEach((e=>{
                    const a = e.dataset
                      , s = a.trackingService;
                    try {
                        const e = a.settings ? JSON.parse(a.settings) : null;
                        null !== e ? (t[s] = e,
                        r += 1) : n.error(`[PARAMS] Missing settings for ${s}`)
                    } catch (e) {
                        n.error(`[PARAMS] Failed to retrieve settings for ${s}: `, e)
                    }
                }
                )),
                0 === r && (t = null),
                t
            }
            hasParams(e) {
                let t = this.trackingParams[e];
                return void 0 === t && (t = this.getParams({
                    eventName: e
                })),
                null !== t && Object.keys(t).length > 0
            }
            updateGlobalUtagData(e) {
                if (this.previousUtagData) {
                    n.log("[PARAMS] Previous utag data params passed into updateGlobalUtagData: ", JSON.stringify(this.previousUtagData));
                    const t = Object.keys(this.previousUtagData)
                      , a = Object.keys(e)
                      , r = t.filter((e=>!a.includes(e)));
                    r.length > 0 && n.log(`[PARAMS] Remove ${JSON.stringify(r)} from utag_data`)
                }
                this.previousUtagData = e,
                n.log(`[PARAMS] Update window.utag_data with: ${JSON.stringify(e)}`),
                g.setValues(e, undefined)
            }
        }
        class m {
            constructor(e) {
                this.params = e
            }
            canTrackPageEvent() {
                return "function" == typeof this.trackPageEvent
            }
            canTrackPageView() {
                return "function" == typeof this.trackPageView
            }
        }
        class h extends m {
            constructor(e) {
                super(e),
                this.hasComscoreService = !1
            }
            trackPageView(e) {
                this.hasComscoreService || (this.hasComscoreService = void 0 !== window.COMSCORE),
                this.hasComscoreService && e && (n.log("[COMSCORE SERVICE] trackPageView", e),
                window.COMSCORE.beacon(e))
            }
        }
        const v = {
            randomUUID: "undefined" != typeof crypto && crypto.randomUUID && crypto.randomUUID.bind(crypto)
        };
        let p;
        const k = new Uint8Array(16);
        function E() {
            if (!p && (p = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto),
            !p))
                throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
            return p(k)
        }
        const S = [];
        for (let e = 0; e < 256; ++e)
            S.push((e + 256).toString(16).slice(1));
        function f(e, t=0) {
            return (S[e[t + 0]] + S[e[t + 1]] + S[e[t + 2]] + S[e[t + 3]] + "-" + S[e[t + 4]] + S[e[t + 5]] + "-" + S[e[t + 6]] + S[e[t + 7]] + "-" + S[e[t + 8]] + S[e[t + 9]] + "-" + S[e[t + 10]] + S[e[t + 11]] + S[e[t + 12]] + S[e[t + 13]] + S[e[t + 14]] + S[e[t + 15]]).toLowerCase()
        }
        const y = function(e, t, a) {
            if (v.randomUUID && !t && !e)
                return v.randomUUID();
            const r = (e = e || {}).random || (e.rng || E)();
            if (r[6] = 15 & r[6] | 64,
            r[8] = 63 & r[8] | 128,
            t) {
                a = a || 0;
                for (let e = 0; e < 16; ++e)
                    t[a + e] = r[e];
                return t
            }
            return f(r)
        };
        const P = new class {
            constructor() {
                this.guidMetaElement = document.getElementById("view-guid-meta"),
                this.guid = this.guidMetaElement ? this.guidMetaElement.getAttribute("content") : ""
            }
            get() {
                return this.guid
            }
            update() {
                this.guid = y(),
                this.guidMetaElement && this.guidMetaElement.setAttribute("content", this.guid)
            }
        }
        ;
        P.get() || P.update(),
        document.addEventListener("pre_page_event", (()=>{
            P.update()
        }
        ));
        const w = P
          , b = {
            event: "eventName",
            click_id: "commerceClickId",
            retailer: "merchantName",
            price: "merchantPrice",
            auth_method: "authMethod"
        };
        class T extends m {
            constructor(e) {
                super(e),
                window.dataLayer = window.dataLayer || [],
                this.trackPageView(e)
            }
            trackPageEvent(e) {
                const t = this.getPageEventParams(e);
                window.dataLayer.push(t),
                n.log(`[GTM SERVICE] Track GoogleTagManager page event: ${JSON.stringify(t)}`)
            }
            trackPageView(e) {
                const t = {
                    event: "Pageview",
                    pageview_id: this.getPageViewGuid(),
                    ...e,
                    ...this.getUserPageVars()
                };
                window.dataLayer.push(t),
                n.log(`[GTM SERVICE] Track GoogleTagManager page view: ${JSON.stringify(t)}`)
            }
            getPageEventParams(e) {
                const t = {};
                for (const [a,r] of Object.entries(b))
                    e[r] && (t[a] = e[r]);
                return t
            }
            getPageViewGuid() {
                return w.get()
            }
            getUserPageVars() {
                return {
                    registered_user_id: l.D.getUserVar("userId")
                }
            }
        }
        const A = class {
            constructor() {
                n.log("[API RESULT EVENT] Initializing")
            }
            getParams(e, t) {
                const a = e
                  , {detail: r} = a;
                if (n.log("[API RESULT EVENT] getParams event: ", e),
                !r)
                    return void n.error("[API RESULT EVENT] Missing customEvent.detail");
                let s = r.trackingToken;
                if ("string" == typeof s) {
                    if ("$" === s.charAt(0)) {
                        const e = this.getLookupTable()
                          , t = {};
                        s.split(";").forEach((e=>{
                            const a = e.split("=");
                            t[a[0]] = a[1]
                        }
                        )),
                        s = e[t.table][t.event]
                    }
                    if ("event9999" !== s)
                        return {
                            customLinkType: t,
                            eventTrackingData: {
                                events: s
                            }
                        }
                } else
                    n.error("[API RESULT EVENT] Tracking token for apiResultEvent should be a string: ", s)
            }
            getLookupTable() {
                if (!this.lookupTable) {
                    const e = document.getElementById("trackingEventsLookup").getAttribute("content");
                    try {
                        this.lookupTable = JSON.parse(e)
                    } catch (e) {
                        n.error("[API RESULT EVENT] Invalid tracking events lookup content: ", e),
                        this.lookupTable = {}
                    }
                }
                return this.lookupTable
            }
        }
          , L = {
            api_result_event: [{
                customLinkType: "trackApiCall"
            }],
            click: [{
                customLinkType: "trackClick",
                delegateSelector: ".js-event-tracking"
            }, {
                customLinkType: "trackCommentPost",
                delegateSelector: ".js-comment-post-event-tracking"
            }, {
                customLinkType: "trackForumPost",
                delegateSelector: ".js-forum-post-event-tracking"
            }, {
                customLinkType: "trackLeadClick",
                delegateSelector: ".js-lead-click-event-tracking"
            }, {
                customLinkType: "trackPodcastDownloadClick",
                delegateSelector: ".js-podcast-download-event-tracking"
            }, {
                customLinkType: "trackSearchRelatedVideoClick",
                delegateSelector: ".js-search-video-event-tracking"
            }, {
                customLinkType: "trackVideoDownloadClick",
                delegateSelector: ".js-video-download-event-tracking"
            }],
            customEventTracking: [{
                customLinkType: "trackCustom",
                delegateSelector: ".js-custom-event-tracking"
            }, {
                customLinkType: "trackCustom",
                delegateSelector: ".js-event-tracking"
            }, {
                customLinkType: "trackUpvoteClick",
                delegateSelector: ".js-upvote-event-tracking"
            }],
            followEventTracking: [{
                customLinkType: "trackGameFollowClick",
                delegateSelector: ".js-game-follow-event-tracking"
            }, {
                customLinkType: "trackGBShowFollowClick",
                delegateSelector: ".js-gb-show-follow-event-tracking"
            }, {
                customLinkType: "trackShowFollowClick",
                delegateSelector: ".js-show-follow-event-tracking"
            }, {
                customLinkType: "trackUserFollowClick",
                delegateSelector: ".js-user-follow-event-tracking"
            }],
            newsletterSubscribe: [{
                customLinkType: "trackNewsletterSignUp",
                delegateSelector: ".js-newsletter-signup-event-tracking"
            }],
            trackAcceptNotifications: [{
                customLinkType: "trackAcceptNotifications"
            }]
        };
        const C = new class {
            constructor() {
                this.currentAttemptIndex = 0,
                this.maxAttemptCount = 10,
                this.omObject = void 0,
                this.timeoutDurations = {
                    0: 100,
                    1: 100,
                    2: 200,
                    3: 300,
                    4: 500,
                    5: 800,
                    6: 1300,
                    7: 2100,
                    8: 3400,
                    9: 5500
                }
            }
            async isAvailable() {
                return await this.checkAdobeAvailable()
            }
            getOmObject() {
                return this.omObject
            }
            checkAdobeAvailable() {
                return this.adobeReadyPromise || (this.adobeReadyPromise = new Promise((e=>{
                    const t = ()=>{
                        n.log("Looking for global s or om objects" + (this.currentAttemptIndex > 0 ? `  (retry #${this.currentAttemptIndex})` : "")),
                        this.omObject = window.om;
                        const a = window.s
                          , r = void 0 !== this.omObject && void 0 !== a;
                        if (r || this.currentAttemptIndex === this.maxAttemptCount)
                            n.log(r ? "Found global s or om objects" : "Unable to find global s or om objects"),
                            e(r);
                        else {
                            const e = this.timeoutDurations[this.currentAttemptIndex];
                            this.currentAttemptIndex++,
                            setTimeout((()=>{
                                t()
                            }
                            ), e)
                        }
                    }
                    ;
                    t()
                }
                ))),
                this.adobeReadyPromise
            }
        }
        ;
        class M {
            constructor() {
                n.log("[CUSTOM EVENTS] Initializing"),
                this.initSectionTagging(),
                this.initPageEventListeners(),
                this.trackPageLoadEvents(),
                this.trackImpressions()
            }
            getEventTrackingData(e, t) {
                if (!e)
                    return {};
                const a = t ? e.dataset[t] : e.dataset.eventTracking;
                let r;
                if (a)
                    try {
                        r = {
                            ...JSON.parse(a),
                            eventTarget: e
                        }
                    } catch (e) {
                        n.error("[CUSTOM EVENTS] Event tracking data needs to be JSON parseable: ", e)
                    }
                return r || (r = {
                    eventTarget: e
                }),
                r
            }
            initPageEventListeners() {
                const {jQuery: e} = window
                  , t = e ? e(document) : void 0;
                for (const [e,a] of Object.entries(L))
                    for (const r of a) {
                        const {customLinkType: a, delegateSelector: s} = r;
                        "trackApiCall" !== a ? t && (s ? (n.log(`[CUSTOM EVENTS] Add jQuery [${e}] event handling on document for ${s} elements for ${a}`),
                        t.on(e, s, (e=>{
                            this.handleDelegateCustomEventTracking(e, a, s)
                        }
                        ))) : (n.log(`[CUSTOM EVENTS] Add jQuery [${e}] event handling on document for ${a}`),
                        t.on(e, (e=>{
                            this.handleCustomEventTracking(e, a)
                        }
                        )))) : (n.log(`[CUSTOM EVENTS] Add [${e}] event listener to document for ${a}`),
                        document.addEventListener("api_result_event", (e=>{
                            this.handleApiResultEventTracking(e, a)
                        }
                        )))
                    }
                document.addEventListener("on_page_event", (()=>{
                    this.handleOnPageEvent()
                }
                ))
            }
            initSectionTagging() {
                document.querySelectorAll(".js-click-tag").forEach((e=>{
                    const t = e;
                    t.setAttribute("section", t.dataset.clickTag),
                    t.removeAttribute("data-click-tag"),
                    t.classList.remove("js-click-tag")
                }
                ))
            }
            handleApiResultEventTracking(e, t) {
                this.ApiResultEventManager || (this.ApiResultEventManager = new A);
                const a = this.ApiResultEventManager.getParams(e, t);
                a && this.trackCustomEvent(a)
            }
            handleCustomEventTracking(e, t) {
                n.log(`[CUSTOM EVENTS] [${e.type}] event handler on document`),
                this.trackCustomEvent({
                    customLinkType: t
                })
            }
            handleDelegateCustomEventTracking(e, t, a) {
                n.log(`[CUSTOM EVENTS] [${e.type}] event handler on document for ${a} elements`);
                const r = e.target.closest(a)
                  , s = this.getEventTrackingData(r);
                this.trackCustomEvent({
                    customLinkType: t,
                    eventTrackingData: s
                })
            }
            handleOnPageEvent() {
                this.initSectionTagging(),
                this.trackImpressions()
            }
            async trackCustomEvent({customLinkType: e, eventTrackingData: t}) {
                let a = "";
                if (await C.isAvailable()) {
                    const r = C.getOmObject();
                    if ("function" == typeof r[e])
                        return n.log(`[CUSTOM EVENTS] Call ${e} with tracking data:`, t),
                        r[e](t),
                        Promise.resolve();
                    a = `${e} method does not exist`
                } else
                    a = "Unable to track custom event -- om object does not exist";
                return n.error(`[CUSTOM EVENTS] ${a}`),
                Promise.reject(new Error(a))
            }
            trackImpressions() {
                const e = document.querySelectorAll(".js-impression-tracking");
                e.length > 0 && e.forEach((e=>{
                    const t = e;
                    t.classList.remove("js-impression-tracking"),
                    this.trackCustomEvent({
                        customLinkType: "trackImpression",
                        eventTrackingData: this.getEventTrackingData(t, "impression-tracking")
                    })
                }
                ))
            }
            trackPageLoadEvents() {
                const e = document.getElementById("trackingPageLoadEvents");
                if (e) {
                    try {
                        JSON.parse(e.getAttribute("content")).forEach((e=>{
                            const t = new CustomEvent("api_result_event",{
                                detail: {
                                    trackingToken: e
                                }
                            });
                            n.log("[CUSTOM EVENTS] Dispatch custom api_result_event: ", t),
                            document.dispatchEvent(t)
                        }
                        ))
                    } catch (e) {
                        n.error("Invalid page load events: ", e)
                    }
                    e.remove()
                }
            }
        }
        const O = new r.ZP("loader")
          , V = (e,t={
            async: !0
        },a=!1)=>new Promise(((r,n)=>{
            try {
                const s = a ? null : document.querySelector('script[src="' + e + '"]');
                if (a && O.log(`Force load ${e}`),
                s)
                    s.addEventListener("load", r),
                    s.addEventListener("error", (()=>{
                        n(new Error(`Loading script src = '${e}' errored.`))
                    }
                    )),
                    s.addEventListener("abort", (()=>{
                        n(new Error(`Loading script src = '${e}' was aborted.`))
                    }
                    ));
                else {
                    O.log("Loading Script ... ", e);
                    const a = document.createElement("script");
                    a.type = "text/javascript",
                    a.async = t.async,
                    a.src = e,
                    a.addEventListener("load", (()=>{
                        O.log("Script Loaded  ", e),
                        r()
                    }
                    )),
                    a.addEventListener("error", (()=>{
                        n(new Error(`Loading script src = '${e}' errored.`))
                    }
                    )),
                    a.addEventListener("abort", (()=>{
                        n(new Error(`Loading script src = '${e}' was aborted.`))
                    }
                    ));
                    const s = document.head || document.getElementsByTagName("head")[0];
                    s ? s.appendChild(a) : n(new Error(`Unable to get <head> element to append script src = '${e}' to.`))
                }
            } catch (t) {
                O.error("Error Loading Script ", e),
                n(t)
            }
        }
        ));
        class N extends m {
            constructor(e) {
                super(e),
                this.featureFlagServiceKeys = ["facebookPixel", "nielsen", "omniture", "qualtrics", "trackonomics"],
                this.scriptLoaded = !1;
                new M;
                this.trackPageView(e)
            }
            async trackPageView(e) {
                const t = this.getUtagDataParams(e)
                  , {tealiumScript: a} = e;
                if (!this.scriptLoaded)
                    return n.log("[TEALIUM SERVICE] Set window.utag_data params to: ", JSON.stringify(t)),
                    g.setValues(t),
                    n.log(`[TEALIUM SERVICE] Load ${a}`),
                    V(a).then((()=>{
                        this.scriptLoaded = !0
                    }
                    )).catch((e=>{
                        n.error(`[TEALIUM SERVICE] ${e}`)
                    }
                    ));
                if (await C.isAvailable()) {
                    const e = C.getOmObject();
                    "function" == typeof e.trackView && (n.log("[TEALIUM SERVICE] Call om.trackView with params: ", JSON.stringify(t)),
                    e.trackView(t))
                } else
                    n.error("[TEALIUM SERVICE] Unable to track page view -- om object does not exist")
            }
            getContextParams() {
                const e = {
                    pageViewGuid: this.getPageViewGuid(),
                    seamlessScrollPage: this.getSeamlessScrollPage()
                };
                return n.log("[TEALIUM SERVICE] Context params: ", JSON.stringify(e)),
                e
            }
            getPageViewGuid() {
                return w.get()
            }
            getSeamlessScrollPage() {
                if (void 0 === this.contextSeamlessScrollPage) {
                    const e = document.querySelector(".js-seamless-content");
                    this.contextSeamlessScrollPage = e ? "1" : void 0
                }
                return this.contextSeamlessScrollPage
            }
            getUtagDataParams(e) {
                const {utagData: t} = e;
                n.log("[TEALIUM SERVICE] Utag data params passed into getUtagDataParams: ", JSON.stringify(t));
                const a = {
                    ...this.getContextParams(),
                    ...this.getUtagServicesParams(),
                    ...t
                };
                return n.log("[TEALIUM SERVICE] Get utagDataParams: ", JSON.stringify(a)),
                a
            }
            getUtagServicesParams() {
                const e = {}
                  , t = l.D.getFeatureFlags()
                  , {utag_data: a={}} = window;
                if ("object" == typeof t && null !== t)
                    for (const [r,n] of Object.entries(t)) {
                        const t = `services.${r}.enabled`;
                        this.featureFlagServiceKeys.includes(r) && !1 !== a[t] && (e[t] = n)
                    }
                return n.log("[TEALIUM SERVICE] Get services params: ", JSON.stringify(e)),
                e
            }
        }
        class j extends m {
            constructor(e) {
                super(e),
                this.hasTrackonomics = !1,
                this.initPageEventListeners()
            }
            refreshTrackonomics() {
                if (this.hasTrackonomics || (this.hasTrackonomics = "object" == typeof window.trx),
                this.hasTrackonomics) {
                    const {trx: e} = window;
                    try {
                        e && e.MagicLinks && (e.magicLinksEngine = new e.MagicLinks(!1),
                        e.magicLinksEngine.run(!0),
                        n.log("[TRACKONOMICS SERVICE] Reran funnel relay"))
                    } catch (e) {
                        n.error("[TRACKONOMICS SERVICE] Failed to rerun funnel relay: ", e)
                    }
                }
            }
            initPageEventListeners() {
                const {jQuery: e} = window;
                if (!e)
                    return;
                e(document).on("ajaxContentLoaded", (()=>{
                    this.refreshTrackonomics()
                }
                ))
            }
        }
        const R = class {
            constructor() {
                this.services = {}
            }
            async hasServices(e) {
                return (await this.getServices({
                    serviceNames: Object.keys(e),
                    serviceTrackingParams: e
                })).length > 0
            }
            callServiceMethod({methodName: e, baseTrackingParams: t, serviceNames: a, serviceTrackingParams: r}) {
                a || (a = r ? Object.keys(r) : this.getServiceNames()),
                this.getServices({
                    serviceNames: a,
                    serviceTrackingParams: r
                }).then((a=>{
                    a.forEach((({serviceName: a, trackingService: s})=>{
                        let i = {
                            ...t
                        };
                        (null == r ? void 0 : r[a]) && (i = {
                            ...i,
                            ...r[a]
                        }),
                        void 0 !== s && "function" == typeof s[e] && (n.log(`[SERVICES] Calling ${a}.${e} with settings: ${JSON.stringify(i)}`),
                        s[e](i))
                    }
                    ))
                }
                ))
            }
            getService(e, t) {
                const {PhoenixLoader: a} = window;
                let r, s, i = !1, o = "", c = `Service not found: ${e}`;
                return new Promise((l=>{
                    "comscore" === e && (n.log("[SERVICES] Add comscore to tracking services"),
                    i = !0,
                    r = "comscore",
                    o = "Comscore added",
                    c = "Comscore disabled",
                    s = h),
                    "google_tag_manager" === e && (n.log("[SERVICES] Add google tag manager to tracking services"),
                    i = !0,
                    r = "google_tag_manager",
                    o = "Google Tag Manager added",
                    c = "Google Tag Manager disabled",
                    s = T),
                    "tealium" === e && (n.log("[SERVICES] Add tealium to tracking services"),
                    i = !0,
                    r = "tealium",
                    c = "Tealium disabled",
                    o = "Tealium added",
                    s = N),
                    "trackonomics" === e && (n.log("[SERVICES] Add trackonomics to tracking services"),
                    i = !0,
                    r = "trackonomics",
                    c = "Trackonomics disabled",
                    o = "Trackonomics added",
                    s = j),
                    !0 === i ? a.gdprConsentCallback(r, (()=>{
                        this.services[e] = new s(t),
                        n.log(`[SERVICES] ${o}`),
                        l({
                            serviceName: e,
                            trackingService: this.services[e]
                        })
                    }
                    ), "performance", (()=>{
                        n.error(`[SERVICES] ${c}`),
                        l({
                            errorMessage: c,
                            serviceName: e,
                            trackingService: void 0
                        })
                    }
                    )) : (n.error(`[SERVICES] ${c}`),
                    l({
                        errorMessage: c,
                        serviceName: e,
                        trackingService: void 0
                    }))
                }
                ))
            }
            getServiceNames() {
                return Object.keys(this.services)
            }
            getServices({serviceNames: e, serviceTrackingParams: t={}}) {
                const a = [];
                return e.forEach((e=>{
                    const r = t[e];
                    let n;
                    this.services[e] ? n = Promise.resolve({
                        serviceName: e,
                        trackingService: this.services[e]
                    }) : r && (n = this.getService(e, r)),
                    n && a.push(n)
                }
                )),
                Promise.all(a)
            }
        }
          , {Phoenix: I, PhoenixLoader: U} = window;
        let $;
        if (I && I.Storage)
            $ = I.Storage.get("jsDebug");
        else {
            const e = new URLSearchParams(window.location.search).get("jsDebug");
            $ = "string" == typeof e ? e.split(",") : []
        }
        $ && r.yM.setEnabledServices($);
        const _ = []
          , D = {
            PhoenixLoaderReady: void 0 === U
        }
          , x = ()=>{
            n.log("[ROADBLOCKS] ", JSON.stringify(D))
        }
        ;
        x(),
        D.PhoenixLoaderReady || _.push(new Promise((e=>{
            U.gdprConsentCallback(!0, (function() {
                D.PhoenixLoaderReady = !0,
                n.log("[ROADBLOCKS] Privacy consent allowed"),
                x(),
                e()
            }
            ), "performance")
        }
        )));
        Promise.all(_).then((async()=>{
            n.log("Tracking initialization begin"),
            n.log("Initialize ParamsManager");
            const e = new u
              , t = e.hasParams(d);
            n.log("Has tracking params: ", t),
            n.log("Initialize ServicesManager");
            const a = new R
              , r = e.getParams({
                eventName: d
            })
              , s = await a.hasServices(r);
            if (n.log("Has tracking services: ", s),
            t && s) {
                new i({
                    ParamsManager: e,
                    ServicesManager: a
                }).initialize()
            } else
                n.error("Unable to initialize: missing tracking params and services");
            I && I.Storage && I.Storage.remove("referringPageTypes"),
            n.log("Tracking initialization end"),
            document.dispatchEvent(new Event("tracking_initialized"))
        }
        ))
    }
    ,
    9896: (e,t,a)=>{
        a.d(t, {
            D: ()=>r,
            Z: ()=>n
        });
        const r = new class {
            constructor() {
                const {sitePageVars: e} = window;
                this.sitePageVars = e
            }
            getFeatureFlags() {
                return this.sitePageVars ? this.sitePageVars.featureFlags : null
            }
            getTrackingSettings() {
                return this.sitePageVars && this.sitePageVars.trackingSettings ? this.sitePageVars.trackingSettings : null
            }
            getUserVar(e) {
                return this.sitePageVars && this.sitePageVars.user ? this.sitePageVars.user[e] : null
            }
        }
          , n = r
    }
    ,
    249: (e,t,a)=>{
        a.d(t, {
            cG: ()=>i,
            yM: ()=>o,
            ZP: ()=>c
        });
        const r = {
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
          , n = {}
          , s = (e,t)=>Math.floor(Math.random() * (t - e + 1)) + e;
        class i {
            constructor(e) {
                return this.enabled = !1,
                this.color = {
                    r: s(0, 360),
                    g: s(35, 80),
                    b: s(20, 45)
                },
                this.name = e,
                o.add(this),
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
                return n[e]
            }
            _call(e, ...t) {
                if (console && this.enabled) {
                    const a = Array.prototype.slice.call(t)
                      , n = this.browserArgs(e, a);
                    r[e].apply ? r[e].apply(r, n) : r[e](n)
                }
                return this
            }
        }
        const o = new class {
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
          , c = i
    }
    ,
    9996: e=>{
        var t = function(e) {
            return function(e) {
                return !!e && "object" == typeof e
            }(e) && !function(e) {
                var t = Object.prototype.toString.call(e);
                return "[object RegExp]" === t || "[object Date]" === t || function(e) {
                    return e.$$typeof === a
                }(e)
            }(e)
        };
        var a = "function" == typeof Symbol && Symbol.for ? Symbol.for("react.element") : 60103;
        function r(e, t) {
            return !1 !== t.clone && t.isMergeableObject(e) ? c((a = e,
            Array.isArray(a) ? [] : {}), e, t) : e;
            var a
        }
        function n(e, t, a) {
            return e.concat(t).map((function(e) {
                return r(e, a)
            }
            ))
        }
        function s(e) {
            return Object.keys(e).concat(function(e) {
                return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter((function(t) {
                    return e.propertyIsEnumerable(t)
                }
                )) : []
            }(e))
        }
        function i(e, t) {
            try {
                return t in e
            } catch (e) {
                return !1
            }
        }
        function o(e, t, a) {
            var n = {};
            return a.isMergeableObject(e) && s(e).forEach((function(t) {
                n[t] = r(e[t], a)
            }
            )),
            s(t).forEach((function(s) {
                (function(e, t) {
                    return i(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t))
                }
                )(e, s) || (i(e, s) && a.isMergeableObject(t[s]) ? n[s] = function(e, t) {
                    if (!t.customMerge)
                        return c;
                    var a = t.customMerge(e);
                    return "function" == typeof a ? a : c
                }(s, a)(e[s], t[s], a) : n[s] = r(t[s], a))
            }
            )),
            n
        }
        function c(e, a, s) {
            (s = s || {}).arrayMerge = s.arrayMerge || n,
            s.isMergeableObject = s.isMergeableObject || t,
            s.cloneUnlessOtherwiseSpecified = r;
            var i = Array.isArray(a);
            return i === Array.isArray(e) ? i ? s.arrayMerge(e, a, s) : o(e, a, s) : r(a, s)
        }
        c.all = function(e, t) {
            if (!Array.isArray(e))
                throw new Error("first argument should be an array");
            return e.reduce((function(e, a) {
                return c(e, a, t)
            }
            ), {})
        }
        ;
        var l = c;
        e.exports = l
    }
}, e=>{
    var t;
    t = 8008,
    e(e.s = t)
}
]);
