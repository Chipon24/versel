(() => {
    var __webpack_modules__ = {
        124: (module, __unused_webpack_exports, __webpack_require__) => {
            var root = __webpack_require__(325);
            var now = function() {
                return root.Date.now();
            };
            module.exports = now;
        },
        125: (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.d(__webpack_exports__, {
                C: () => C,
                Q: () => stegaClean
            });
            var s = {
                0: 8203,
                1: 8204,
                2: 8205,
                3: 8290,
                4: 8291,
                5: 8288,
                6: 65279,
                7: 8289,
                8: 119155,
                9: 119156,
                a: 119157,
                b: 119158,
                c: 119159,
                d: 119160,
                e: 119161,
                f: 119162
            }, c = {
                0: 8203,
                1: 8204,
                2: 8205,
                3: 65279
            }, u = new Array(4).fill(String.fromCodePoint(c[0])).join("");
            function E(t) {
                let e = JSON.stringify(t);
                return `${u}${Array.from(e).map((r => {
                    let n = r.charCodeAt(0);
                    if (n > 255) throw new Error(`Only ASCII edit info can be encoded. Error attempting to encode ${e} on character ${r} (${n})`);
                    return Array.from(n.toString(4).padStart(4, "0")).map((o => String.fromCodePoint(c[o]))).join("");
                })).join("")}`;
            }
            function I(t) {
                return !Number.isNaN(Number(t)) || /[a-z]/i.test(t) && !/\d+(?:[-:\/]\d+){2}(?:T\d+(?:[-:\/]\d+){1,2}(\.\d+)?Z?)?/.test(t) ? !1 : !!Date.parse(t);
            }
            function T(t) {
                try {
                    new URL(t, t.startsWith("/") ? "https://acme.com" : void 0);
                } catch {
                    return !1;
                }
                return !0;
            }
            function C(t, e, r = "auto") {
                return r === !0 || r === "auto" && (I(t) || T(t)) ? t : `${t}${E(e)}`;
            }
            Object.fromEntries(Object.entries(c).map((t => t.reverse())));
            Object.fromEntries(Object.entries(s).map((t => t.reverse())));
            var S = `${Object.values(s).map((t => `\\u{${t.toString(16)}}`)).join("")}`, f = new RegExp(`[${S}]{4,}`, "gu");
            function _(t) {
                var e;
                return {
                    cleaned: t.replace(f, ""),
                    encoded: ((e = t.match(f)) == null ? void 0 : e[0]) || ""
                };
            }
            function O(t) {
                return t && JSON.parse(_(JSON.stringify(t)).cleaned);
            }
            function stegaClean(result) {
                return O(result);
            }
        },
        128: (module, __unused_webpack_exports, __webpack_require__) => {
            var trimmedEndIndex = __webpack_require__(800);
            var reTrimStart = /^\s+/;
            function baseTrim(string) {
                return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
            }
            module.exports = baseTrim;
        },
        221: (module, __unused_webpack_exports, __webpack_require__) => {
            var isObject = __webpack_require__(805), now = __webpack_require__(124), toNumber = __webpack_require__(374);
            var FUNC_ERROR_TEXT = "Expected a function";
            var nativeMax = Math.max, nativeMin = Math.min;
            function debounce(func, wait, options) {
                var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
                if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
                wait = toNumber(wait) || 0;
                if (isObject(options)) {
                    leading = !!options.leading;
                    maxing = "maxWait" in options;
                    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
                    trailing = "trailing" in options ? !!options.trailing : trailing;
                }
                function invokeFunc(time) {
                    var args = lastArgs, thisArg = lastThis;
                    lastArgs = lastThis = void 0;
                    lastInvokeTime = time;
                    result = func.apply(thisArg, args);
                    return result;
                }
                function leadingEdge(time) {
                    lastInvokeTime = time;
                    timerId = setTimeout(timerExpired, wait);
                    return leading ? invokeFunc(time) : result;
                }
                function remainingWait(time) {
                    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
                    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
                }
                function shouldInvoke(time) {
                    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
                    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
                }
                function timerExpired() {
                    var time = now();
                    if (shouldInvoke(time)) return trailingEdge(time);
                    timerId = setTimeout(timerExpired, remainingWait(time));
                }
                function trailingEdge(time) {
                    timerId = void 0;
                    if (trailing && lastArgs) return invokeFunc(time);
                    lastArgs = lastThis = void 0;
                    return result;
                }
                function cancel() {
                    if (timerId !== void 0) clearTimeout(timerId);
                    lastInvokeTime = 0;
                    lastArgs = lastCallTime = lastThis = timerId = void 0;
                }
                function flush() {
                    return timerId === void 0 ? result : trailingEdge(now());
                }
                function debounced() {
                    var time = now(), isInvoking = shouldInvoke(time);
                    lastArgs = arguments;
                    lastThis = this;
                    lastCallTime = time;
                    if (isInvoking) {
                        if (timerId === void 0) return leadingEdge(lastCallTime);
                        if (maxing) {
                            clearTimeout(timerId);
                            timerId = setTimeout(timerExpired, wait);
                            return invokeFunc(lastCallTime);
                        }
                    }
                    if (timerId === void 0) timerId = setTimeout(timerExpired, wait);
                    return result;
                }
                debounced.cancel = cancel;
                debounced.flush = flush;
                return debounced;
            }
            module.exports = debounce;
        },
        227: function(module) {
            /**
 * lightgallery | 2.8.1 | November 13th 2024
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */
            !function(e, t) {
                true ? module.exports = t() : 0;
            }(0, (function() {
                "use strict";
                var e = function() {
                    return (e = Object.assign || function(e) {
                        for (var t, o = 1, i = arguments.length; o < i; o++) for (var s in t = arguments[o]) Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
                        return e;
                    }).apply(this, arguments);
                }, t = {
                    scale: 1,
                    zoom: !0,
                    infiniteZoom: !0,
                    actualSize: !0,
                    showZoomInOutIcons: !1,
                    actualSizeIcons: {
                        zoomIn: "lg-zoom-in",
                        zoomOut: "lg-zoom-out"
                    },
                    enableZoomAfter: 300,
                    zoomPluginStrings: {
                        zoomIn: "Zoom in",
                        zoomOut: "Zoom out",
                        viewActualSize: "View actual size"
                    }
                }, o = "lgContainerResize", i = "lgBeforeOpen", s = "lgAfterOpen", a = "lgSlideItemLoad", n = "lgAfterSlide", r = "lgRotateLeft", l = "lgRotateRight", c = "lgFlipHorizontal", g = "lgFlipVertical";
                return function() {
                    function h(o, i) {
                        return this.core = o, this.$LG = i, this.settings = e(e({}, t), this.core.settings), 
                        this;
                    }
                    return h.prototype.buildTemplates = function() {
                        var e = this.settings.showZoomInOutIcons ? '<button id="' + this.core.getIdName("lg-zoom-in") + '" type="button" aria-label="' + this.settings.zoomPluginStrings.zoomIn + '" class="lg-zoom-in lg-icon"></button><button id="' + this.core.getIdName("lg-zoom-out") + '" type="button" aria-label="' + this.settings.zoomPluginStrings.zoomOut + '" class="lg-zoom-out lg-icon"></button>' : "";
                        this.settings.actualSize && (e += '<button id="' + this.core.getIdName("lg-actual-size") + '" type="button" aria-label="' + this.settings.zoomPluginStrings.viewActualSize + '" class="' + this.settings.actualSizeIcons.zoomIn + ' lg-icon"></button>'), 
                        this.core.outer.addClass("lg-use-transition-for-zoom"), this.core.$toolbar.first().append(e);
                    }, h.prototype.enableZoom = function(e) {
                        var t = this, o = this.settings.enableZoomAfter + e.detail.delay;
                        this.$LG("body").first().hasClass("lg-from-hash") && e.detail.delay ? o = 0 : this.$LG("body").first().removeClass("lg-from-hash"), 
                        this.zoomableTimeout = setTimeout((function() {
                            t.isImageSlide(t.core.index) && (t.core.getSlideItem(e.detail.index).addClass("lg-zoomable"), 
                            e.detail.index === t.core.index && t.setZoomEssentials());
                        }), o + 30);
                    }, h.prototype.enableZoomOnSlideItemLoad = function() {
                        this.core.LGel.on(a + ".zoom", this.enableZoom.bind(this));
                    }, h.prototype.getDragCords = function(e) {
                        return {
                            x: e.pageX,
                            y: e.pageY
                        };
                    }, h.prototype.getSwipeCords = function(e) {
                        return {
                            x: e.touches[0].pageX,
                            y: e.touches[0].pageY
                        };
                    }, h.prototype.getDragAllowedAxises = function(e, t) {
                        if (!this.containerRect) return {
                            allowX: !1,
                            allowY: !1
                        };
                        var o = this.core.getSlideItem(this.core.index).find(".lg-image").first().get(), i = 0, s = 0, a = o.getBoundingClientRect();
                        e ? (i = o.offsetHeight * e, s = o.offsetWidth * e) : t ? (i = a.height + t * a.height, 
                        s = a.width + t * a.width) : (i = a.height, s = a.width);
                        var n = i > this.containerRect.height;
                        return {
                            allowX: s > this.containerRect.width,
                            allowY: n
                        };
                    }, h.prototype.setZoomEssentials = function() {
                        this.containerRect = this.core.$content.get().getBoundingClientRect();
                    }, h.prototype.zoomImage = function(e, t, o, i) {
                        if (!(Math.abs(t) <= 0)) {
                            var s, a, n = this.containerRect.width / 2 + this.containerRect.left, r = this.containerRect.height / 2 + this.containerRect.top + this.scrollTop;
                            1 === e && (this.positionChanged = !1);
                            var l = this.getDragAllowedAxises(0, t), c = l.allowY, g = l.allowX;
                            this.positionChanged && (s = this.left / (this.scale - t), a = this.top / (this.scale - t), 
                            this.pageX = n - s, this.pageY = r - a, this.positionChanged = !1);
                            var h, m, u = this.getPossibleSwipeDragCords(t), d = n - this.pageX, f = r - this.pageY;
                            if (e - t > 1) {
                                var p = (e - t) / Math.abs(t);
                                h = (d = (t < 0 ? -d : d) + this.left * (p + (t < 0 ? -1 : 1))) / p, m = (f = (t < 0 ? -f : f) + this.top * (p + (t < 0 ? -1 : 1))) / p;
                            } else h = d * (p = (e - t) * t), m = f * p;
                            o && (g ? this.isBeyondPossibleLeft(h, u.minX) ? h = u.minX : this.isBeyondPossibleRight(h, u.maxX) && (h = u.maxX) : e > 1 && (h < u.minX ? h = u.minX : h > u.maxX && (h = u.maxX)), 
                            c ? this.isBeyondPossibleTop(m, u.minY) ? m = u.minY : this.isBeyondPossibleBottom(m, u.maxY) && (m = u.maxY) : e > 1 && (m < u.minY ? m = u.minY : m > u.maxY && (m = u.maxY))), 
                            this.setZoomStyles({
                                x: h,
                                y: m,
                                scale: e
                            }), this.left = h, this.top = m, i && this.setZoomImageSize();
                        }
                    }, h.prototype.resetImageTranslate = function(e) {
                        if (this.isImageSlide(e)) {
                            var t = this.core.getSlideItem(e).find(".lg-image").first();
                            this.imageReset = !1, t.removeClass("reset-transition reset-transition-y reset-transition-x"), 
                            this.core.outer.removeClass("lg-actual-size"), t.css("width", "auto").css("height", "auto"), 
                            setTimeout((function() {
                                t.removeClass("no-transition");
                            }), 10);
                        }
                    }, h.prototype.setZoomImageSize = function() {
                        var e = this, t = this.core.getSlideItem(this.core.index).find(".lg-image").first();
                        setTimeout((function() {
                            var o = e.getCurrentImageActualSizeScale();
                            e.scale >= o && (t.addClass("no-transition"), e.imageReset = !0);
                        }), 500), setTimeout((function() {
                            var o = e.getCurrentImageActualSizeScale();
                            if (e.scale >= o) {
                                var i = e.getDragAllowedAxises(e.scale);
                                t.css("width", t.get().naturalWidth + "px").css("height", t.get().naturalHeight + "px"), 
                                e.core.outer.addClass("lg-actual-size"), i.allowX && i.allowY ? t.addClass("reset-transition") : i.allowX && !i.allowY ? t.addClass("reset-transition-x") : !i.allowX && i.allowY && t.addClass("reset-transition-y");
                            }
                        }), 550);
                    }, h.prototype.setZoomStyles = function(e) {
                        var t = this.core.getSlideItem(this.core.index).find(".lg-img-wrap").first(), o = this.core.getSlideItem(this.core.index).find(".lg-image").first(), i = this.core.outer.find(".lg-current .lg-dummy-img").first();
                        this.scale = e.scale, o.css("transform", "scale3d(" + e.scale + ", " + e.scale + ", 1)"), 
                        i.css("transform", "scale3d(" + e.scale + ", " + e.scale + ", 1)");
                        var s = "translate3d(" + e.x + "px, " + e.y + "px, 0)";
                        t.css("transform", s);
                    }, h.prototype.setActualSize = function(e, t) {
                        var o = this;
                        if (!this.zoomInProgress) {
                            this.zoomInProgress = !0;
                            var i = this.core.galleryItems[this.core.index];
                            this.resetImageTranslate(e), setTimeout((function() {
                                if (i.src && !o.core.outer.hasClass("lg-first-slide-loading")) {
                                    var e = o.getCurrentImageActualSizeScale(), s = o.scale;
                                    o.core.outer.hasClass("lg-zoomed") ? o.scale = 1 : o.scale = o.getScale(e), o.setPageCords(t), 
                                    o.beginZoom(o.scale), o.zoomImage(o.scale, o.scale - s, !0, !0);
                                }
                            }), 50), setTimeout((function() {
                                o.core.outer.removeClass("lg-grabbing").addClass("lg-grab");
                            }), 60), setTimeout((function() {
                                o.zoomInProgress = !1;
                            }), 610);
                        }
                    }, h.prototype.getNaturalWidth = function(e) {
                        var t = this.core.getSlideItem(e).find(".lg-image").first(), o = this.core.galleryItems[e].width;
                        return o ? parseFloat(o) : t.get().naturalWidth;
                    }, h.prototype.getActualSizeScale = function(e, t) {
                        return e >= t ? e / t || 2 : 1;
                    }, h.prototype.getCurrentImageActualSizeScale = function() {
                        var e = this.core.getSlideItem(this.core.index).find(".lg-image").first().get().offsetWidth, t = this.getNaturalWidth(this.core.index) || e;
                        return this.getActualSizeScale(t, e);
                    }, h.prototype.getPageCords = function(e) {
                        var t = {};
                        if (e) t.x = e.pageX || e.touches[0].pageX, t.y = e.pageY || e.touches[0].pageY; else {
                            var o = this.core.$content.get().getBoundingClientRect();
                            t.x = o.width / 2 + o.left, t.y = o.height / 2 + this.scrollTop + o.top;
                        }
                        return t;
                    }, h.prototype.setPageCords = function(e) {
                        var t = this.getPageCords(e);
                        this.pageX = t.x, this.pageY = t.y;
                    }, h.prototype.manageActualPixelClassNames = function() {
                        this.core.getElementById("lg-actual-size").removeClass(this.settings.actualSizeIcons.zoomIn).addClass(this.settings.actualSizeIcons.zoomOut);
                    }, h.prototype.beginZoom = function(e) {
                        return this.core.outer.removeClass("lg-zoom-drag-transition lg-zoom-dragging"), 
                        e > 1 ? (this.core.outer.addClass("lg-zoomed"), this.manageActualPixelClassNames()) : this.resetZoom(), 
                        e > 1;
                    }, h.prototype.getScale = function(e) {
                        var t = this.getCurrentImageActualSizeScale();
                        return e < 1 ? e = 1 : e > t && (e = t), e;
                    }, h.prototype.init = function() {
                        var e = this;
                        if (this.settings.zoom) {
                            this.buildTemplates(), this.enableZoomOnSlideItemLoad();
                            var t = null;
                            this.core.outer.on("dblclick.lg", (function(t) {
                                e.$LG(t.target).hasClass("lg-image") && e.setActualSize(e.core.index, t);
                            })), this.core.outer.on("touchstart.lg", (function(o) {
                                var i = e.$LG(o.target);
                                1 === o.touches.length && i.hasClass("lg-image") && (t ? (clearTimeout(t), t = null, 
                                o.preventDefault(), e.setActualSize(e.core.index, o)) : t = setTimeout((function() {
                                    t = null;
                                }), 300));
                            })), this.core.LGel.on(o + ".zoom " + l + ".zoom " + r + ".zoom " + c + ".zoom " + g + ".zoom", (function() {
                                if (e.core.lgOpened && e.isImageSlide(e.core.index) && !e.core.touchAction) {
                                    var t = e.core.getSlideItem(e.core.index).find(".lg-img-wrap").first();
                                    e.top = 0, e.left = 0, e.setZoomEssentials(), e.setZoomSwipeStyles(t, {
                                        x: 0,
                                        y: 0
                                    }), e.positionChanged = !0;
                                }
                            })), this.$LG(window).on("scroll.lg.zoom.global" + this.core.lgId, (function() {
                                e.core.lgOpened && (e.scrollTop = e.$LG(window).scrollTop());
                            })), this.core.getElementById("lg-zoom-out").on("click.lg", (function() {
                                if (e.isImageSlide(e.core.index)) {
                                    var t = 0;
                                    e.imageReset && (e.resetImageTranslate(e.core.index), t = 50), setTimeout((function() {
                                        var t = e.scale - e.settings.scale;
                                        t < 1 && (t = 1), e.beginZoom(t), e.zoomImage(t, -e.settings.scale, !0, !e.settings.infiniteZoom);
                                    }), t);
                                }
                            })), this.core.getElementById("lg-zoom-in").on("click.lg", (function() {
                                e.zoomIn();
                            })), this.core.getElementById("lg-actual-size").on("click.lg", (function() {
                                e.setActualSize(e.core.index);
                            })), this.core.LGel.on(i + ".zoom", (function() {
                                e.core.outer.find(".lg-item").removeClass("lg-zoomable");
                            })), this.core.LGel.on(s + ".zoom", (function() {
                                e.scrollTop = e.$LG(window).scrollTop(), e.pageX = e.core.outer.width() / 2, e.pageY = e.core.outer.height() / 2 + e.scrollTop, 
                                e.scale = 1;
                            })), this.core.LGel.on(n + ".zoom", (function(t) {
                                var o = t.detail.prevIndex;
                                e.scale = 1, e.positionChanged = !1, e.zoomInProgress = !1, e.resetZoom(o), e.resetImageTranslate(o), 
                                e.isImageSlide(e.core.index) && e.setZoomEssentials();
                            })), this.zoomDrag(), this.pinchZoom(), this.zoomSwipe(), this.zoomableTimeout = !1, 
                            this.positionChanged = !1, this.zoomInProgress = !1;
                        }
                    }, h.prototype.zoomIn = function() {
                        if (this.isImageSlide(this.core.index)) {
                            var e = this.scale + this.settings.scale;
                            this.settings.infiniteZoom || (e = this.getScale(e)), this.beginZoom(e), this.zoomImage(e, Math.min(this.settings.scale, e - this.scale), !0, !this.settings.infiniteZoom);
                        }
                    }, h.prototype.resetZoom = function(e) {
                        this.core.outer.removeClass("lg-zoomed lg-zoom-drag-transition");
                        var t = this.core.getElementById("lg-actual-size"), o = this.core.getSlideItem(void 0 !== e ? e : this.core.index);
                        t.removeClass(this.settings.actualSizeIcons.zoomOut).addClass(this.settings.actualSizeIcons.zoomIn), 
                        o.find(".lg-img-wrap").first().removeAttr("style"), o.find(".lg-image").first().removeAttr("style"), 
                        this.scale = 1, this.left = 0, this.top = 0, this.setPageCords();
                    }, h.prototype.getTouchDistance = function(e) {
                        return Math.sqrt((e.touches[0].pageX - e.touches[1].pageX) * (e.touches[0].pageX - e.touches[1].pageX) + (e.touches[0].pageY - e.touches[1].pageY) * (e.touches[0].pageY - e.touches[1].pageY));
                    }, h.prototype.pinchZoom = function() {
                        var e = this, t = 0, o = !1, i = 1, s = 0, a = this.core.getSlideItem(this.core.index);
                        this.core.outer.on("touchstart.lg", (function(o) {
                            if (a = e.core.getSlideItem(e.core.index), e.isImageSlide(e.core.index) && 2 === o.touches.length) {
                                if (o.preventDefault(), e.core.outer.hasClass("lg-first-slide-loading")) return;
                                i = e.scale || 1, e.core.outer.removeClass("lg-zoom-drag-transition lg-zoom-dragging"), 
                                e.setPageCords(o), e.resetImageTranslate(e.core.index), e.core.touchAction = "pinch", 
                                t = e.getTouchDistance(o);
                            }
                        })), this.core.$inner.on("touchmove.lg", (function(n) {
                            if (2 === n.touches.length && "pinch" === e.core.touchAction && (e.$LG(n.target).hasClass("lg-item") || a.get().contains(n.target))) {
                                n.preventDefault();
                                var r = e.getTouchDistance(n), l = t - r;
                                if (!o && Math.abs(l) > 5 && (o = !0), o) {
                                    s = e.scale;
                                    var c = Math.max(1, i + .02 * -l);
                                    e.scale = Math.round(100 * (c + Number.EPSILON)) / 100;
                                    var g = e.scale - s;
                                    e.zoomImage(e.scale, Math.round(100 * (g + Number.EPSILON)) / 100, !1, !1);
                                }
                            }
                        })), this.core.$inner.on("touchend.lg", (function(i) {
                            if ("pinch" === e.core.touchAction && (e.$LG(i.target).hasClass("lg-item") || a.get().contains(i.target))) {
                                if (o = !1, t = 0, e.scale <= 1) e.resetZoom(); else {
                                    var s = e.getCurrentImageActualSizeScale();
                                    if (e.scale >= s) {
                                        var n = s - e.scale;
                                        0 === n && (n = .01), e.zoomImage(s, n, !1, !0);
                                    }
                                    e.manageActualPixelClassNames(), e.core.outer.addClass("lg-zoomed");
                                }
                                e.core.touchAction = void 0;
                            }
                        }));
                    }, h.prototype.touchendZoom = function(e, t, o, i, s) {
                        var a = t.x - e.x, n = t.y - e.y, r = Math.abs(a) / s + 1, l = Math.abs(n) / s + 1;
                        r > 2 && (r += 1), l > 2 && (l += 1), a *= r, n *= l;
                        var c = this.core.getSlideItem(this.core.index).find(".lg-img-wrap").first(), g = {};
                        g.x = this.left + a, g.y = this.top + n;
                        var h = this.getPossibleSwipeDragCords();
                        (Math.abs(a) > 15 || Math.abs(n) > 15) && (i && (this.isBeyondPossibleTop(g.y, h.minY) ? g.y = h.minY : this.isBeyondPossibleBottom(g.y, h.maxY) && (g.y = h.maxY)), 
                        o && (this.isBeyondPossibleLeft(g.x, h.minX) ? g.x = h.minX : this.isBeyondPossibleRight(g.x, h.maxX) && (g.x = h.maxX)), 
                        i ? this.top = g.y : g.y = this.top, o ? this.left = g.x : g.x = this.left, this.setZoomSwipeStyles(c, g), 
                        this.positionChanged = !0);
                    }, h.prototype.getZoomSwipeCords = function(e, t, o, i, s) {
                        var a = {};
                        if (i) {
                            if (a.y = this.top + (t.y - e.y), this.isBeyondPossibleTop(a.y, s.minY)) {
                                var n = s.minY - a.y;
                                a.y = s.minY - n / 6;
                            } else if (this.isBeyondPossibleBottom(a.y, s.maxY)) {
                                var r = a.y - s.maxY;
                                a.y = s.maxY + r / 6;
                            }
                        } else a.y = this.top;
                        if (o) {
                            if (a.x = this.left + (t.x - e.x), this.isBeyondPossibleLeft(a.x, s.minX)) {
                                var l = s.minX - a.x;
                                a.x = s.minX - l / 6;
                            } else if (this.isBeyondPossibleRight(a.x, s.maxX)) {
                                var c = a.x - s.maxX;
                                a.x = s.maxX + c / 6;
                            }
                        } else a.x = this.left;
                        return a;
                    }, h.prototype.isBeyondPossibleLeft = function(e, t) {
                        return e >= t;
                    }, h.prototype.isBeyondPossibleRight = function(e, t) {
                        return e <= t;
                    }, h.prototype.isBeyondPossibleTop = function(e, t) {
                        return e >= t;
                    }, h.prototype.isBeyondPossibleBottom = function(e, t) {
                        return e <= t;
                    }, h.prototype.isImageSlide = function(e) {
                        var t = this.core.galleryItems[e];
                        return "image" === this.core.getSlideType(t);
                    }, h.prototype.getPossibleSwipeDragCords = function(e) {
                        var t = this.core.getSlideItem(this.core.index).find(".lg-image").first(), o = this.core.mediaContainerPosition.bottom, i = t.get().getBoundingClientRect(), s = i.height, a = i.width;
                        return e && (s += e * s, a += e * a), {
                            minY: (s - this.containerRect.height) / 2,
                            maxY: (this.containerRect.height - s) / 2 + o,
                            minX: (a - this.containerRect.width) / 2,
                            maxX: (this.containerRect.width - a) / 2
                        };
                    }, h.prototype.setZoomSwipeStyles = function(e, t) {
                        e.css("transform", "translate3d(" + t.x + "px, " + t.y + "px, 0)");
                    }, h.prototype.zoomSwipe = function() {
                        var e, t, o = this, i = {}, s = {}, a = !1, n = !1, r = !1, l = new Date, c = (new Date, 
                        this.core.getSlideItem(this.core.index));
                        this.core.$inner.on("touchstart.lg", (function(s) {
                            if (o.isImageSlide(o.core.index) && (c = o.core.getSlideItem(o.core.index), (o.$LG(s.target).hasClass("lg-item") || c.get().contains(s.target)) && 1 === s.touches.length && o.core.outer.hasClass("lg-zoomed"))) {
                                s.preventDefault(), l = new Date, o.core.touchAction = "zoomSwipe", t = o.core.getSlideItem(o.core.index).find(".lg-img-wrap").first();
                                var a = o.getDragAllowedAxises(0);
                                r = a.allowY, ((n = a.allowX) || r) && (i = o.getSwipeCords(s)), e = o.getPossibleSwipeDragCords(), 
                                o.core.outer.addClass("lg-zoom-dragging lg-zoom-drag-transition");
                            }
                        })), this.core.$inner.on("touchmove.lg", (function(l) {
                            if (1 === l.touches.length && "zoomSwipe" === o.core.touchAction && (o.$LG(l.target).hasClass("lg-item") || c.get().contains(l.target))) {
                                l.preventDefault(), o.core.touchAction = "zoomSwipe", s = o.getSwipeCords(l);
                                var g = o.getZoomSwipeCords(i, s, n, r, e);
                                (Math.abs(s.x - i.x) > 15 || Math.abs(s.y - i.y) > 15) && (a = !0, o.setZoomSwipeStyles(t, g));
                            }
                        })), this.core.$inner.on("touchend.lg", (function(e) {
                            if ("zoomSwipe" === o.core.touchAction && (o.$LG(e.target).hasClass("lg-item") || c.get().contains(e.target))) {
                                if (e.preventDefault(), o.core.touchAction = void 0, o.core.outer.removeClass("lg-zoom-dragging"), 
                                !a) return;
                                a = !1;
                                var t = (new Date).valueOf() - l.valueOf();
                                o.touchendZoom(i, s, n, r, t);
                            }
                        }));
                    }, h.prototype.zoomDrag = function() {
                        var e, t, o, i, s = this, a = {}, n = {}, r = !1, l = !1, c = !1, g = !1;
                        this.core.outer.on("mousedown.lg.zoom", (function(t) {
                            if (s.isImageSlide(s.core.index)) {
                                var n = s.core.getSlideItem(s.core.index);
                                if (s.$LG(t.target).hasClass("lg-item") || n.get().contains(t.target)) {
                                    e = new Date, i = s.core.getSlideItem(s.core.index).find(".lg-img-wrap").first();
                                    var l = s.getDragAllowedAxises(0);
                                    g = l.allowY, c = l.allowX, s.core.outer.hasClass("lg-zoomed") && s.$LG(t.target).hasClass("lg-object") && (c || g) && (t.preventDefault(), 
                                    a = s.getDragCords(t), o = s.getPossibleSwipeDragCords(), r = !0, s.core.outer.removeClass("lg-grab").addClass("lg-grabbing lg-zoom-drag-transition lg-zoom-dragging"));
                                }
                            }
                        })), this.$LG(window).on("mousemove.lg.zoom.global" + this.core.lgId, (function(e) {
                            if (r) {
                                l = !0, n = s.getDragCords(e);
                                var t = s.getZoomSwipeCords(a, n, c, g, o);
                                s.setZoomSwipeStyles(i, t);
                            }
                        })), this.$LG(window).on("mouseup.lg.zoom.global" + this.core.lgId, (function(o) {
                            if (r) {
                                if (t = new Date, r = !1, s.core.outer.removeClass("lg-zoom-dragging"), l && (a.x !== n.x || a.y !== n.y)) {
                                    n = s.getDragCords(o);
                                    var i = t.valueOf() - e.valueOf();
                                    s.touchendZoom(a, n, c, g, i);
                                }
                                l = !1;
                            }
                            s.core.outer.removeClass("lg-grabbing").addClass("lg-grab");
                        }));
                    }, h.prototype.closeGallery = function() {
                        this.resetZoom(), this.zoomInProgress = !1;
                    }, h.prototype.destroy = function() {
                        this.$LG(window).off(".lg.zoom.global" + this.core.lgId), this.core.LGel.off(".lg.zoom"), 
                        this.core.LGel.off(".zoom"), clearTimeout(this.zoomableTimeout), this.zoomableTimeout = !1;
                    }, h;
                }();
            }));
        },
        325: (module, __unused_webpack_exports, __webpack_require__) => {
            var freeGlobal = __webpack_require__(840);
            var freeSelf = typeof self == "object" && self && self.Object === Object && self;
            var root = freeGlobal || freeSelf || Function("return this")();
            module.exports = root;
        },
        346: module => {
            function isObjectLike(value) {
                return value != null && typeof value == "object";
            }
            module.exports = isObjectLike;
        },
        350: module => {
            var objectProto = Object.prototype;
            var nativeObjectToString = objectProto.toString;
            function objectToString(value) {
                return nativeObjectToString.call(value);
            }
            module.exports = objectToString;
        },
        374: (module, __unused_webpack_exports, __webpack_require__) => {
            var baseTrim = __webpack_require__(128), isObject = __webpack_require__(805), isSymbol = __webpack_require__(394);
            var NAN = 0 / 0;
            var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
            var reIsBinary = /^0b[01]+$/i;
            var reIsOctal = /^0o[0-7]+$/i;
            var freeParseInt = parseInt;
            function toNumber(value) {
                if (typeof value == "number") return value;
                if (isSymbol(value)) return NAN;
                if (isObject(value)) {
                    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
                    value = isObject(other) ? other + "" : other;
                }
                if (typeof value != "string") return value === 0 ? value : +value;
                value = baseTrim(value);
                var isBinary = reIsBinary.test(value);
                return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
            }
            module.exports = toNumber;
        },
        394: (module, __unused_webpack_exports, __webpack_require__) => {
            var baseGetTag = __webpack_require__(552), isObjectLike = __webpack_require__(346);
            var symbolTag = "[object Symbol]";
            function isSymbol(value) {
                return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
            }
            module.exports = isSymbol;
        },
        552: (module, __unused_webpack_exports, __webpack_require__) => {
            var Symbol = __webpack_require__(873), getRawTag = __webpack_require__(659), objectToString = __webpack_require__(350);
            var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
            var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
            function baseGetTag(value) {
                if (value == null) return value === void 0 ? undefinedTag : nullTag;
                return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
            }
            module.exports = baseGetTag;
        },
        659: (module, __unused_webpack_exports, __webpack_require__) => {
            var Symbol = __webpack_require__(873);
            var objectProto = Object.prototype;
            var hasOwnProperty = objectProto.hasOwnProperty;
            var nativeObjectToString = objectProto.toString;
            var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
            function getRawTag(value) {
                var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
                try {
                    value[symToStringTag] = void 0;
                    var unmasked = true;
                } catch (e) {}
                var result = nativeObjectToString.call(value);
                if (unmasked) if (isOwn) value[symToStringTag] = tag; else delete value[symToStringTag];
                return result;
            }
            module.exports = getRawTag;
        },
        757: function(module) {
            /**
 * lightgallery | 2.8.1 | November 13th 2024
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */
            !function(t, e) {
                true ? module.exports = e() : 0;
            }(0, (function() {
                "use strict";
                var t = function() {
                    return (t = Object.assign || function(t) {
                        for (var e, i = 1, s = arguments.length; i < s; i++) for (var h in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, h) && (t[h] = e[h]);
                        return t;
                    }).apply(this, arguments);
                }, e = {
                    thumbnail: !0,
                    animateThumb: !0,
                    currentPagerPosition: "middle",
                    alignThumbnails: "middle",
                    thumbWidth: 100,
                    thumbHeight: "80px",
                    thumbMargin: 5,
                    appendThumbnailsTo: ".lg-components",
                    toggleThumb: !1,
                    enableThumbDrag: !0,
                    enableThumbSwipe: !0,
                    thumbnailSwipeThreshold: 10,
                    loadYouTubeThumbnail: !0,
                    youTubeThumbSize: 1,
                    thumbnailPluginStrings: {
                        toggleThumbnails: "Toggle thumbnails"
                    }
                }, i = "lgContainerResize", s = "lgUpdateSlides", h = "lgBeforeOpen", n = "lgBeforeSlide";
                return function() {
                    function o(t, e) {
                        return this.thumbOuterWidth = 0, this.thumbTotalWidth = 0, this.translateX = 0, 
                        this.thumbClickable = !1, this.core = t, this.$LG = e, this;
                    }
                    return o.prototype.init = function() {
                        this.settings = t(t({}, e), this.core.settings), this.thumbOuterWidth = 0, this.thumbTotalWidth = this.core.galleryItems.length * (this.settings.thumbWidth + this.settings.thumbMargin), 
                        this.translateX = 0, this.setAnimateThumbStyles(), this.core.settings.allowMediaOverlap || (this.settings.toggleThumb = !1), 
                        this.settings.thumbnail && (this.build(), this.settings.animateThumb ? (this.settings.enableThumbDrag && this.enableThumbDrag(), 
                        this.settings.enableThumbSwipe && this.enableThumbSwipe(), this.thumbClickable = !1) : this.thumbClickable = !0, 
                        this.toggleThumbBar(), this.thumbKeyPress());
                    }, o.prototype.build = function() {
                        var t = this;
                        this.setThumbMarkup(), this.manageActiveClassOnSlideChange(), this.$lgThumb.first().on("click.lg touchend.lg", (function(e) {
                            var i = t.$LG(e.target);
                            i.hasAttribute("data-lg-item-id") && setTimeout((function() {
                                if (t.thumbClickable && !t.core.lgBusy) {
                                    var e = parseInt(i.attr("data-lg-item-id"));
                                    t.core.slide(e, !1, !0, !1);
                                }
                            }), 50);
                        })), this.core.LGel.on(n + ".thumb", (function(e) {
                            var i = e.detail.index;
                            t.animateThumb(i);
                        })), this.core.LGel.on(h + ".thumb", (function() {
                            t.thumbOuterWidth = t.core.outer.get().offsetWidth;
                        })), this.core.LGel.on(s + ".thumb", (function() {
                            t.rebuildThumbnails();
                        })), this.core.LGel.on(i + ".thumb", (function() {
                            t.core.lgOpened && setTimeout((function() {
                                t.thumbOuterWidth = t.core.outer.get().offsetWidth, t.animateThumb(t.core.index), 
                                t.thumbOuterWidth = t.core.outer.get().offsetWidth;
                            }), 50);
                        }));
                    }, o.prototype.setThumbMarkup = function() {
                        var t = "lg-thumb-outer ";
                        this.settings.alignThumbnails && (t += "lg-thumb-align-" + this.settings.alignThumbnails);
                        var e = '<div class="' + t + '">\n        <div class="lg-thumb lg-group">\n        </div>\n        </div>';
                        this.core.outer.addClass("lg-has-thumb"), ".lg-components" === this.settings.appendThumbnailsTo ? this.core.$lgComponents.append(e) : this.core.outer.append(e), 
                        this.$thumbOuter = this.core.outer.find(".lg-thumb-outer").first(), this.$lgThumb = this.core.outer.find(".lg-thumb").first(), 
                        this.settings.animateThumb && this.core.outer.find(".lg-thumb").css("transition-duration", this.core.settings.speed + "ms").css("width", this.thumbTotalWidth + "px").css("position", "relative"), 
                        this.setThumbItemHtml(this.core.galleryItems);
                    }, o.prototype.enableThumbDrag = function() {
                        var t = this, e = {
                            cords: {
                                startX: 0,
                                endX: 0
                            },
                            isMoved: !1,
                            newTranslateX: 0,
                            startTime: new Date,
                            endTime: new Date,
                            touchMoveTime: 0
                        }, i = !1;
                        this.$thumbOuter.addClass("lg-grab"), this.core.outer.find(".lg-thumb").first().on("mousedown.lg.thumb", (function(s) {
                            t.thumbTotalWidth > t.thumbOuterWidth && (s.preventDefault(), e.cords.startX = s.pageX, 
                            e.startTime = new Date, t.thumbClickable = !1, i = !0, t.core.outer.get().scrollLeft += 1, 
                            t.core.outer.get().scrollLeft -= 1, t.$thumbOuter.removeClass("lg-grab").addClass("lg-grabbing"));
                        })), this.$LG(window).on("mousemove.lg.thumb.global" + this.core.lgId, (function(s) {
                            t.core.lgOpened && i && (e.cords.endX = s.pageX, e = t.onThumbTouchMove(e));
                        })), this.$LG(window).on("mouseup.lg.thumb.global" + this.core.lgId, (function() {
                            t.core.lgOpened && (e.isMoved ? e = t.onThumbTouchEnd(e) : t.thumbClickable = !0, 
                            i && (i = !1, t.$thumbOuter.removeClass("lg-grabbing").addClass("lg-grab")));
                        }));
                    }, o.prototype.enableThumbSwipe = function() {
                        var t = this, e = {
                            cords: {
                                startX: 0,
                                endX: 0
                            },
                            isMoved: !1,
                            newTranslateX: 0,
                            startTime: new Date,
                            endTime: new Date,
                            touchMoveTime: 0
                        };
                        this.$lgThumb.on("touchstart.lg", (function(i) {
                            t.thumbTotalWidth > t.thumbOuterWidth && (i.preventDefault(), e.cords.startX = i.targetTouches[0].pageX, 
                            t.thumbClickable = !1, e.startTime = new Date);
                        })), this.$lgThumb.on("touchmove.lg", (function(i) {
                            t.thumbTotalWidth > t.thumbOuterWidth && (i.preventDefault(), e.cords.endX = i.targetTouches[0].pageX, 
                            e = t.onThumbTouchMove(e));
                        })), this.$lgThumb.on("touchend.lg", (function() {
                            e.isMoved ? e = t.onThumbTouchEnd(e) : t.thumbClickable = !0;
                        }));
                    }, o.prototype.rebuildThumbnails = function() {
                        var t = this;
                        this.$thumbOuter.addClass("lg-rebuilding-thumbnails"), setTimeout((function() {
                            t.thumbTotalWidth = t.core.galleryItems.length * (t.settings.thumbWidth + t.settings.thumbMargin), 
                            t.$lgThumb.css("width", t.thumbTotalWidth + "px"), t.$lgThumb.empty(), t.setThumbItemHtml(t.core.galleryItems), 
                            t.animateThumb(t.core.index);
                        }), 50), setTimeout((function() {
                            t.$thumbOuter.removeClass("lg-rebuilding-thumbnails");
                        }), 200);
                    }, o.prototype.setTranslate = function(t) {
                        this.$lgThumb.css("transform", "translate3d(-" + t + "px, 0px, 0px)");
                    }, o.prototype.getPossibleTransformX = function(t) {
                        return t > this.thumbTotalWidth - this.thumbOuterWidth && (t = this.thumbTotalWidth - this.thumbOuterWidth), 
                        t < 0 && (t = 0), t;
                    }, o.prototype.animateThumb = function(t) {
                        if (this.$lgThumb.css("transition-duration", this.core.settings.speed + "ms"), this.settings.animateThumb) {
                            var e = 0;
                            switch (this.settings.currentPagerPosition) {
                              case "left":
                                e = 0;
                                break;

                              case "middle":
                                e = this.thumbOuterWidth / 2 - this.settings.thumbWidth / 2;
                                break;

                              case "right":
                                e = this.thumbOuterWidth - this.settings.thumbWidth;
                            }
                            this.translateX = (this.settings.thumbWidth + this.settings.thumbMargin) * t - 1 - e, 
                            this.translateX > this.thumbTotalWidth - this.thumbOuterWidth && (this.translateX = this.thumbTotalWidth - this.thumbOuterWidth), 
                            this.translateX < 0 && (this.translateX = 0), this.setTranslate(this.translateX);
                        }
                    }, o.prototype.onThumbTouchMove = function(t) {
                        return t.newTranslateX = this.translateX, t.isMoved = !0, t.touchMoveTime = (new Date).valueOf(), 
                        t.newTranslateX -= t.cords.endX - t.cords.startX, t.newTranslateX = this.getPossibleTransformX(t.newTranslateX), 
                        this.setTranslate(t.newTranslateX), this.$thumbOuter.addClass("lg-dragging"), t;
                    }, o.prototype.onThumbTouchEnd = function(t) {
                        t.isMoved = !1, t.endTime = new Date, this.$thumbOuter.removeClass("lg-dragging");
                        var e = t.endTime.valueOf() - t.startTime.valueOf(), i = t.cords.endX - t.cords.startX, s = Math.abs(i) / e;
                        return s > .15 && t.endTime.valueOf() - t.touchMoveTime < 30 ? ((s += 1) > 2 && (s += 1), 
                        s += s * (Math.abs(i) / this.thumbOuterWidth), this.$lgThumb.css("transition-duration", Math.min(s - 1, 2) + "settings"), 
                        i *= s, this.translateX = this.getPossibleTransformX(this.translateX - i), this.setTranslate(this.translateX)) : this.translateX = t.newTranslateX, 
                        Math.abs(t.cords.endX - t.cords.startX) < this.settings.thumbnailSwipeThreshold && (this.thumbClickable = !0), 
                        t;
                    }, o.prototype.getThumbHtml = function(t, e, i) {
                        var s, h = this.core.galleryItems[e].__slideVideoInfo || {};
                        s = h.youtube && this.settings.loadYouTubeThumbnail ? "//img.youtube.com/vi/" + h.youtube[1] + "/" + this.settings.youTubeThumbSize + ".jpg" : t;
                        var n = document.createElement("div");
                        n.setAttribute("data-lg-item-id", e + ""), n.className = "lg-thumb-item " + (e === this.core.index ? "active" : ""), 
                        n.style.cssText = "width: " + this.settings.thumbWidth + "px; height: " + this.settings.thumbHeight + "; margin-right: " + this.settings.thumbMargin + "px;";
                        var o = document.createElement("img");
                        return o.alt = i || "", o.setAttribute("data-lg-item-id", e + ""), o.src = s, n.appendChild(o), 
                        n;
                    }, o.prototype.setThumbItemHtml = function(t) {
                        for (var e = 0; e < t.length; e++) {
                            var i = this.getThumbHtml(t[e].thumb, e, t[e].alt);
                            this.$lgThumb.append(i);
                        }
                    }, o.prototype.setAnimateThumbStyles = function() {
                        this.settings.animateThumb && this.core.outer.addClass("lg-animate-thumb");
                    }, o.prototype.manageActiveClassOnSlideChange = function() {
                        var t = this;
                        this.core.LGel.on(n + ".thumb", (function(e) {
                            var i = t.core.outer.find(".lg-thumb-item"), s = e.detail.index;
                            i.removeClass("active"), i.eq(s).addClass("active");
                        }));
                    }, o.prototype.toggleThumbBar = function() {
                        var t = this;
                        this.settings.toggleThumb && (this.core.outer.addClass("lg-can-toggle"), this.core.$toolbar.append('<button type="button" aria-label="' + this.settings.thumbnailPluginStrings.toggleThumbnails + '" class="lg-toggle-thumb lg-icon"></button>'), 
                        this.core.outer.find(".lg-toggle-thumb").first().on("click.lg", (function() {
                            t.core.outer.toggleClass("lg-components-open");
                        })));
                    }, o.prototype.thumbKeyPress = function() {
                        var t = this;
                        this.$LG(window).on("keydown.lg.thumb.global" + this.core.lgId, (function(e) {
                            t.core.lgOpened && t.settings.toggleThumb && (38 === e.keyCode ? (e.preventDefault(), 
                            t.core.outer.addClass("lg-components-open")) : 40 === e.keyCode && (e.preventDefault(), 
                            t.core.outer.removeClass("lg-components-open")));
                        }));
                    }, o.prototype.destroy = function() {
                        this.settings.thumbnail && (this.$LG(window).off(".lg.thumb.global" + this.core.lgId), 
                        this.core.LGel.off(".lg.thumb"), this.core.LGel.off(".thumb"), this.$thumbOuter.remove(), 
                        this.core.outer.removeClass("lg-has-thumb"));
                    }, o;
                }();
            }));
        },
        800: module => {
            var reWhitespace = /\s/;
            function trimmedEndIndex(string) {
                var index = string.length;
                while (index-- && reWhitespace.test(string.charAt(index))) ;
                return index;
            }
            module.exports = trimmedEndIndex;
        },
        805: module => {
            function isObject(value) {
                var type = typeof value;
                return value != null && (type == "object" || type == "function");
            }
            module.exports = isObject;
        },
        840: (module, __unused_webpack_exports, __webpack_require__) => {
            var freeGlobal = typeof __webpack_require__.g == "object" && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;
            module.exports = freeGlobal;
        },
        873: (module, __unused_webpack_exports, __webpack_require__) => {
            var root = __webpack_require__(325);
            var Symbol = root.Symbol;
            module.exports = Symbol;
        },
        969: (module, __unused_webpack_exports, __webpack_require__) => {
            var debounce = __webpack_require__(221), isObject = __webpack_require__(805);
            var FUNC_ERROR_TEXT = "Expected a function";
            function throttle(func, wait, options) {
                var leading = true, trailing = true;
                if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
                if (isObject(options)) {
                    leading = "leading" in options ? !!options.leading : leading;
                    trailing = "trailing" in options ? !!options.trailing : trailing;
                }
                return debounce(func, wait, {
                    leading,
                    maxWait: wait,
                    trailing
                });
            }
            module.exports = throttle;
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== void 0) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
    __webpack_require__.m = __webpack_modules__;
    (() => {
        var getProto = Object.getPrototypeOf ? obj => Object.getPrototypeOf(obj) : obj => obj.__proto__;
        var leafPrototypes;
        __webpack_require__.t = function(value, mode) {
            if (mode & 1) value = this(value);
            if (mode & 8) return value;
            if (typeof value === "object" && value) {
                if (mode & 4 && value.__esModule) return value;
                if (mode & 16 && typeof value.then === "function") return value;
            }
            var ns = Object.create(null);
            __webpack_require__.r(ns);
            var def = {};
            leafPrototypes = leafPrototypes || [ null, getProto({}), getProto([]), getProto(getProto) ];
            for (var current = mode & 2 && value; typeof current == "object" && !~leafPrototypes.indexOf(current); current = getProto(current)) Object.getOwnPropertyNames(current).forEach((key => def[key] = () => value[key]));
            def["default"] = () => value;
            __webpack_require__.d(ns, def);
            return ns;
        };
    })();
    (() => {
        __webpack_require__.d = (exports, definition) => {
            for (var key in definition) if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) Object.defineProperty(exports, key, {
                enumerable: true,
                get: definition[key]
            });
        };
    })();
    (() => {
        __webpack_require__.f = {};
        __webpack_require__.e = chunkId => Promise.all(Object.keys(__webpack_require__.f).reduce(((promises, key) => {
            __webpack_require__.f[key](chunkId, promises);
            return promises;
        }), []));
    })();
    (() => {
        __webpack_require__.u = chunkId => chunkId + ".app.js";
    })();
    (() => {
        __webpack_require__.miniCssF = chunkId => {};
    })();
    (() => {
        __webpack_require__.g = function() {
            if (typeof globalThis === "object") return globalThis;
            try {
                return this || new Function("return this")();
            } catch (e) {
                if (typeof window === "object") return window;
            }
        }();
    })();
    (() => {
        __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    })();
    (() => {
        var inProgress = {};
        var dataWebpackPrefix = "fls-start:";
        __webpack_require__.l = (url, done, key, chunkId) => {
            if (inProgress[url]) {
                inProgress[url].push(done);
                return;
            }
            var script, needAttach;
            if (key !== void 0) {
                var scripts = document.getElementsByTagName("script");
                for (var i = 0; i < scripts.length; i++) {
                    var s = scripts[i];
                    if (s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) {
                        script = s;
                        break;
                    }
                }
            }
            if (!script) {
                needAttach = true;
                script = document.createElement("script");
                script.charset = "utf-8";
                script.timeout = 120;
                if (__webpack_require__.nc) script.setAttribute("nonce", __webpack_require__.nc);
                script.setAttribute("data-webpack", dataWebpackPrefix + key);
                script.src = url;
            }
            inProgress[url] = [ done ];
            var onScriptComplete = (prev, event) => {
                script.onerror = script.onload = null;
                clearTimeout(timeout);
                var doneFns = inProgress[url];
                delete inProgress[url];
                script.parentNode && script.parentNode.removeChild(script);
                doneFns && doneFns.forEach((fn => fn(event)));
                if (prev) return prev(event);
            };
            var timeout = setTimeout(onScriptComplete.bind(null, void 0, {
                type: "timeout",
                target: script
            }), 12e4);
            script.onerror = onScriptComplete.bind(null, script.onerror);
            script.onload = onScriptComplete.bind(null, script.onload);
            needAttach && document.head.appendChild(script);
        };
    })();
    (() => {
        __webpack_require__.r = exports => {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) Object.defineProperty(exports, Symbol.toStringTag, {
                value: "Module"
            });
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
        };
    })();
    (() => {
        __webpack_require__.p = "/";
    })();
    (() => {
        var installedChunks = {
            792: 0
        };
        __webpack_require__.f.j = (chunkId, promises) => {
            var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : void 0;
            if (installedChunkData !== 0) if (installedChunkData) promises.push(installedChunkData[2]); else if (true) {
                var promise = new Promise(((resolve, reject) => installedChunkData = installedChunks[chunkId] = [ resolve, reject ]));
                promises.push(installedChunkData[2] = promise);
                var url = __webpack_require__.p + __webpack_require__.u(chunkId);
                var error = new Error;
                var loadingEnded = event => {
                    if (__webpack_require__.o(installedChunks, chunkId)) {
                        installedChunkData = installedChunks[chunkId];
                        if (installedChunkData !== 0) installedChunks[chunkId] = void 0;
                        if (installedChunkData) {
                            var errorType = event && (event.type === "load" ? "missing" : event.type);
                            var realSrc = event && event.target && event.target.src;
                            error.message = "Loading chunk " + chunkId + " failed.\n(" + errorType + ": " + realSrc + ")";
                            error.name = "ChunkLoadError";
                            error.type = errorType;
                            error.request = realSrc;
                            installedChunkData[1](error);
                        }
                    }
                };
                __webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
            }
        };
        var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
            var [chunkIds, moreModules, runtime] = data;
            var moduleId, chunkId, i = 0;
            if (chunkIds.some((id => installedChunks[id] !== 0))) {
                for (moduleId in moreModules) if (__webpack_require__.o(moreModules, moduleId)) __webpack_require__.m[moduleId] = moreModules[moduleId];
                if (runtime) runtime(__webpack_require__);
            }
            if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
            for (;i < chunkIds.length; i++) {
                chunkId = chunkIds[i];
                if (__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) installedChunks[chunkId][0]();
                installedChunks[chunkId] = 0;
            }
        };
        var chunkLoadingGlobal = self["webpackChunkfls_start"] = self["webpackChunkfls_start"] || [];
        chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
        chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
    })();
    (() => {
        "use strict";
        function isWebp() {
            function testWebP(callback) {
                let webP = new Image;
                webP.onload = webP.onerror = function() {
                    callback(webP.height == 2);
                };
                webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
            }
            testWebP((function(support) {
                let className = support === true ? "webp" : "no-webp";
                document.documentElement.classList.add(className);
            }));
        }
        let isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
            }
        };
        function addTouchClass() {
            if (isMobile.any()) document.documentElement.classList.add("touch");
        }
        function addLoadedClass() {
            if (!document.documentElement.classList.contains("loading")) window.addEventListener("load", (function() {
                setTimeout((function() {
                    document.documentElement.classList.add("loaded");
                }), 0);
            }));
        }
        let bodyLockStatus = true;
        let bodyLockToggle = (delay = 500) => {
            if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
        };
        let bodyUnlock = (delay = 500) => {
            if (bodyLockStatus) {
                const lockPaddingElements = document.querySelectorAll("[data-lp]");
                setTimeout((() => {
                    lockPaddingElements.forEach((lockPaddingElement => {
                        lockPaddingElement.style.paddingRight = "";
                    }));
                    document.body.style.paddingRight = "";
                    document.documentElement.classList.remove("lock");
                }), delay);
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        let bodyLock = (delay = 500) => {
            if (bodyLockStatus) {
                const lockPaddingElements = document.querySelectorAll("[data-lp]");
                const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
                lockPaddingElements.forEach((lockPaddingElement => {
                    lockPaddingElement.style.paddingRight = lockPaddingValue;
                }));
                document.body.style.paddingRight = lockPaddingValue;
                document.documentElement.classList.add("lock");
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        function menuInit() {
            if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
                if (bodyLockStatus && e.target.closest(".icon-menu")) {
                    bodyLockToggle();
                    document.documentElement.classList.toggle("menu-open");
                }
            }));
        }
        function ssr_window_esm_isObject(obj) {
            return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
        }
        function extend(target, src) {
            if (target === void 0) target = {};
            if (src === void 0) src = {};
            const noExtend = [ "__proto__", "constructor", "prototype" ];
            Object.keys(src).filter((key => noExtend.indexOf(key) < 0)).forEach((key => {
                if (typeof target[key] === "undefined") target[key] = src[key]; else if (ssr_window_esm_isObject(src[key]) && ssr_window_esm_isObject(target[key]) && Object.keys(src[key]).length > 0) extend(target[key], src[key]);
            }));
        }
        const ssrDocument = {
            body: {},
            addEventListener() {},
            removeEventListener() {},
            activeElement: {
                blur() {},
                nodeName: ""
            },
            querySelector() {
                return null;
            },
            querySelectorAll() {
                return [];
            },
            getElementById() {
                return null;
            },
            createEvent() {
                return {
                    initEvent() {}
                };
            },
            createElement() {
                return {
                    children: [],
                    childNodes: [],
                    style: {},
                    setAttribute() {},
                    getElementsByTagName() {
                        return [];
                    }
                };
            },
            createElementNS() {
                return {};
            },
            importNode() {
                return null;
            },
            location: {
                hash: "",
                host: "",
                hostname: "",
                href: "",
                origin: "",
                pathname: "",
                protocol: "",
                search: ""
            }
        };
        function ssr_window_esm_getDocument() {
            const doc = typeof document !== "undefined" ? document : {};
            extend(doc, ssrDocument);
            return doc;
        }
        const ssrWindow = {
            document: ssrDocument,
            navigator: {
                userAgent: ""
            },
            location: {
                hash: "",
                host: "",
                hostname: "",
                href: "",
                origin: "",
                pathname: "",
                protocol: "",
                search: ""
            },
            history: {
                replaceState() {},
                pushState() {},
                go() {},
                back() {}
            },
            CustomEvent: function CustomEvent() {
                return this;
            },
            addEventListener() {},
            removeEventListener() {},
            getComputedStyle() {
                return {
                    getPropertyValue() {
                        return "";
                    }
                };
            },
            Image() {},
            Date() {},
            screen: {},
            setTimeout() {},
            clearTimeout() {},
            matchMedia() {
                return {};
            },
            requestAnimationFrame(callback) {
                if (typeof setTimeout === "undefined") {
                    callback();
                    return null;
                }
                return setTimeout(callback, 0);
            },
            cancelAnimationFrame(id) {
                if (typeof setTimeout === "undefined") return;
                clearTimeout(id);
            }
        };
        function ssr_window_esm_getWindow() {
            const win = typeof window !== "undefined" ? window : {};
            extend(win, ssrWindow);
            return win;
        }
        function utils_classesToTokens(classes) {
            if (classes === void 0) classes = "";
            return classes.trim().split(" ").filter((c => !!c.trim()));
        }
        function deleteProps(obj) {
            const object = obj;
            Object.keys(object).forEach((key => {
                try {
                    object[key] = null;
                } catch (e) {}
                try {
                    delete object[key];
                } catch (e) {}
            }));
        }
        function utils_nextTick(callback, delay) {
            if (delay === void 0) delay = 0;
            return setTimeout(callback, delay);
        }
        function utils_now() {
            return Date.now();
        }
        function utils_getComputedStyle(el) {
            const window = ssr_window_esm_getWindow();
            let style;
            if (window.getComputedStyle) style = window.getComputedStyle(el, null);
            if (!style && el.currentStyle) style = el.currentStyle;
            if (!style) style = el.style;
            return style;
        }
        function utils_getTranslate(el, axis) {
            if (axis === void 0) axis = "x";
            const window = ssr_window_esm_getWindow();
            let matrix;
            let curTransform;
            let transformMatrix;
            const curStyle = utils_getComputedStyle(el);
            if (window.WebKitCSSMatrix) {
                curTransform = curStyle.transform || curStyle.webkitTransform;
                if (curTransform.split(",").length > 6) curTransform = curTransform.split(", ").map((a => a.replace(",", "."))).join(", ");
                transformMatrix = new window.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
            } else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
                matrix = transformMatrix.toString().split(",");
            }
            if (axis === "x") if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; else if (matrix.length === 16) curTransform = parseFloat(matrix[12]); else curTransform = parseFloat(matrix[4]);
            if (axis === "y") if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; else if (matrix.length === 16) curTransform = parseFloat(matrix[13]); else curTransform = parseFloat(matrix[5]);
            return curTransform || 0;
        }
        function utils_isObject(o) {
            return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
        }
        function isNode(node) {
            if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") return node instanceof HTMLElement;
            return node && (node.nodeType === 1 || node.nodeType === 11);
        }
        function utils_extend() {
            const to = Object(arguments.length <= 0 ? void 0 : arguments[0]);
            const noExtend = [ "__proto__", "constructor", "prototype" ];
            for (let i = 1; i < arguments.length; i += 1) {
                const nextSource = i < 0 || arguments.length <= i ? void 0 : arguments[i];
                if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
                    const keysArray = Object.keys(Object(nextSource)).filter((key => noExtend.indexOf(key) < 0));
                    for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
                        const nextKey = keysArray[nextIndex];
                        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                        if (desc !== void 0 && desc.enumerable) if (utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]); else if (!utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) {
                            to[nextKey] = {};
                            if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]);
                        } else to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
        function utils_setCSSProperty(el, varName, varValue) {
            el.style.setProperty(varName, varValue);
        }
        function animateCSSModeScroll(_ref) {
            let {swiper, targetPosition, side} = _ref;
            const window = ssr_window_esm_getWindow();
            const startPosition = -swiper.translate;
            let startTime = null;
            let time;
            const duration = swiper.params.speed;
            swiper.wrapperEl.style.scrollSnapType = "none";
            window.cancelAnimationFrame(swiper.cssModeFrameID);
            const dir = targetPosition > startPosition ? "next" : "prev";
            const isOutOfBound = (current, target) => dir === "next" && current >= target || dir === "prev" && current <= target;
            const animate = () => {
                time = (new Date).getTime();
                if (startTime === null) startTime = time;
                const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
                const easeProgress = .5 - Math.cos(progress * Math.PI) / 2;
                let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
                if (isOutOfBound(currentPosition, targetPosition)) currentPosition = targetPosition;
                swiper.wrapperEl.scrollTo({
                    [side]: currentPosition
                });
                if (isOutOfBound(currentPosition, targetPosition)) {
                    swiper.wrapperEl.style.overflow = "hidden";
                    swiper.wrapperEl.style.scrollSnapType = "";
                    setTimeout((() => {
                        swiper.wrapperEl.style.overflow = "";
                        swiper.wrapperEl.scrollTo({
                            [side]: currentPosition
                        });
                    }));
                    window.cancelAnimationFrame(swiper.cssModeFrameID);
                    return;
                }
                swiper.cssModeFrameID = window.requestAnimationFrame(animate);
            };
            animate();
        }
        function utils_getSlideTransformEl(slideEl) {
            return slideEl.querySelector(".swiper-slide-transform") || slideEl.shadowRoot && slideEl.shadowRoot.querySelector(".swiper-slide-transform") || slideEl;
        }
        function utils_elementChildren(element, selector) {
            if (selector === void 0) selector = "";
            const window = ssr_window_esm_getWindow();
            const children = [ ...element.children ];
            if (window.HTMLSlotElement && element instanceof HTMLSlotElement) children.push(...element.assignedElements());
            if (!selector) return children;
            return children.filter((el => el.matches(selector)));
        }
        function elementIsChildOfSlot(el, slot) {
            const elementsQueue = [ slot ];
            while (elementsQueue.length > 0) {
                const elementToCheck = elementsQueue.shift();
                if (el === elementToCheck) return true;
                elementsQueue.push(...elementToCheck.children, ...elementToCheck.shadowRoot ? elementToCheck.shadowRoot.children : [], ...elementToCheck.assignedElements ? elementToCheck.assignedElements() : []);
            }
        }
        function elementIsChildOf(el, parent) {
            const window = ssr_window_esm_getWindow();
            let isChild = parent.contains(el);
            if (!isChild && window.HTMLSlotElement && parent instanceof HTMLSlotElement) {
                const children = [ ...parent.assignedElements() ];
                isChild = children.includes(el);
                if (!isChild) isChild = elementIsChildOfSlot(el, parent);
            }
            return isChild;
        }
        function showWarning(text) {
            try {
                console.warn(text);
                return;
            } catch (err) {}
        }
        function utils_createElement(tag, classes) {
            if (classes === void 0) classes = [];
            const el = document.createElement(tag);
            el.classList.add(...Array.isArray(classes) ? classes : utils_classesToTokens(classes));
            return el;
        }
        function elementPrevAll(el, selector) {
            const prevEls = [];
            while (el.previousElementSibling) {
                const prev = el.previousElementSibling;
                if (selector) {
                    if (prev.matches(selector)) prevEls.push(prev);
                } else prevEls.push(prev);
                el = prev;
            }
            return prevEls;
        }
        function elementNextAll(el, selector) {
            const nextEls = [];
            while (el.nextElementSibling) {
                const next = el.nextElementSibling;
                if (selector) {
                    if (next.matches(selector)) nextEls.push(next);
                } else nextEls.push(next);
                el = next;
            }
            return nextEls;
        }
        function elementStyle(el, prop) {
            const window = ssr_window_esm_getWindow();
            return window.getComputedStyle(el, null).getPropertyValue(prop);
        }
        function utils_elementIndex(el) {
            let child = el;
            let i;
            if (child) {
                i = 0;
                while ((child = child.previousSibling) !== null) if (child.nodeType === 1) i += 1;
                return i;
            }
            return;
        }
        function utils_elementParents(el, selector) {
            const parents = [];
            let parent = el.parentElement;
            while (parent) {
                if (selector) {
                    if (parent.matches(selector)) parents.push(parent);
                } else parents.push(parent);
                parent = parent.parentElement;
            }
            return parents;
        }
        function utils_elementTransitionEnd(el, callback) {
            function fireCallBack(e) {
                if (e.target !== el) return;
                callback.call(el, e);
                el.removeEventListener("transitionend", fireCallBack);
            }
            if (callback) el.addEventListener("transitionend", fireCallBack);
        }
        function elementOuterSize(el, size, includeMargins) {
            const window = ssr_window_esm_getWindow();
            if (includeMargins) return el[size === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-right" : "margin-top")) + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-left" : "margin-bottom"));
            return el.offsetWidth;
        }
        function utils_makeElementsArray(el) {
            return (Array.isArray(el) ? el : [ el ]).filter((e => !!e));
        }
        let support;
        function calcSupport() {
            const window = ssr_window_esm_getWindow();
            const document = ssr_window_esm_getDocument();
            return {
                smoothScroll: document.documentElement && document.documentElement.style && "scrollBehavior" in document.documentElement.style,
                touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch)
            };
        }
        function getSupport() {
            if (!support) support = calcSupport();
            return support;
        }
        let deviceCached;
        function calcDevice(_temp) {
            let {userAgent} = _temp === void 0 ? {} : _temp;
            const support = getSupport();
            const window = ssr_window_esm_getWindow();
            const platform = window.navigator.platform;
            const ua = userAgent || window.navigator.userAgent;
            const device = {
                ios: false,
                android: false
            };
            const screenWidth = window.screen.width;
            const screenHeight = window.screen.height;
            const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
            const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            const windows = platform === "Win32";
            let macos = platform === "MacIntel";
            const iPadScreens = [ "1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810" ];
            if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
                ipad = ua.match(/(Version)\/([\d.]+)/);
                if (!ipad) ipad = [ 0, 1, "13_0_0" ];
                macos = false;
            }
            if (android && !windows) {
                device.os = "android";
                device.android = true;
            }
            if (ipad || iphone || ipod) {
                device.os = "ios";
                device.ios = true;
            }
            return device;
        }
        function getDevice(overrides) {
            if (overrides === void 0) overrides = {};
            if (!deviceCached) deviceCached = calcDevice(overrides);
            return deviceCached;
        }
        let browser;
        function calcBrowser() {
            const window = ssr_window_esm_getWindow();
            const device = getDevice();
            let needPerspectiveFix = false;
            function isSafari() {
                const ua = window.navigator.userAgent.toLowerCase();
                return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
            }
            if (isSafari()) {
                const ua = String(window.navigator.userAgent);
                if (ua.includes("Version/")) {
                    const [major, minor] = ua.split("Version/")[1].split(" ")[0].split(".").map((num => Number(num)));
                    needPerspectiveFix = major < 16 || major === 16 && minor < 2;
                }
            }
            const isWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent);
            const isSafariBrowser = isSafari();
            const need3dFix = isSafariBrowser || isWebView && device.ios;
            return {
                isSafari: needPerspectiveFix || isSafariBrowser,
                needPerspectiveFix,
                need3dFix,
                isWebView
            };
        }
        function getBrowser() {
            if (!browser) browser = calcBrowser();
            return browser;
        }
        function Resize(_ref) {
            let {swiper, on, emit} = _ref;
            const window = ssr_window_esm_getWindow();
            let observer = null;
            let animationFrame = null;
            const resizeHandler = () => {
                if (!swiper || swiper.destroyed || !swiper.initialized) return;
                emit("beforeResize");
                emit("resize");
            };
            const createObserver = () => {
                if (!swiper || swiper.destroyed || !swiper.initialized) return;
                observer = new ResizeObserver((entries => {
                    animationFrame = window.requestAnimationFrame((() => {
                        const {width, height} = swiper;
                        let newWidth = width;
                        let newHeight = height;
                        entries.forEach((_ref2 => {
                            let {contentBoxSize, contentRect, target} = _ref2;
                            if (target && target !== swiper.el) return;
                            newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
                            newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
                        }));
                        if (newWidth !== width || newHeight !== height) resizeHandler();
                    }));
                }));
                observer.observe(swiper.el);
            };
            const removeObserver = () => {
                if (animationFrame) window.cancelAnimationFrame(animationFrame);
                if (observer && observer.unobserve && swiper.el) {
                    observer.unobserve(swiper.el);
                    observer = null;
                }
            };
            const orientationChangeHandler = () => {
                if (!swiper || swiper.destroyed || !swiper.initialized) return;
                emit("orientationchange");
            };
            on("init", (() => {
                if (swiper.params.resizeObserver && typeof window.ResizeObserver !== "undefined") {
                    createObserver();
                    return;
                }
                window.addEventListener("resize", resizeHandler);
                window.addEventListener("orientationchange", orientationChangeHandler);
            }));
            on("destroy", (() => {
                removeObserver();
                window.removeEventListener("resize", resizeHandler);
                window.removeEventListener("orientationchange", orientationChangeHandler);
            }));
        }
        function Observer(_ref) {
            let {swiper, extendParams, on, emit} = _ref;
            const observers = [];
            const window = ssr_window_esm_getWindow();
            const attach = function(target, options) {
                if (options === void 0) options = {};
                const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
                const observer = new ObserverFunc((mutations => {
                    if (swiper.__preventObserver__) return;
                    if (mutations.length === 1) {
                        emit("observerUpdate", mutations[0]);
                        return;
                    }
                    const observerUpdate = function observerUpdate() {
                        emit("observerUpdate", mutations[0]);
                    };
                    if (window.requestAnimationFrame) window.requestAnimationFrame(observerUpdate); else window.setTimeout(observerUpdate, 0);
                }));
                observer.observe(target, {
                    attributes: typeof options.attributes === "undefined" ? true : options.attributes,
                    childList: swiper.isElement || (typeof options.childList === "undefined" ? true : options).childList,
                    characterData: typeof options.characterData === "undefined" ? true : options.characterData
                });
                observers.push(observer);
            };
            const init = () => {
                if (!swiper.params.observer) return;
                if (swiper.params.observeParents) {
                    const containerParents = utils_elementParents(swiper.hostEl);
                    for (let i = 0; i < containerParents.length; i += 1) attach(containerParents[i]);
                }
                attach(swiper.hostEl, {
                    childList: swiper.params.observeSlideChildren
                });
                attach(swiper.wrapperEl, {
                    attributes: false
                });
            };
            const destroy = () => {
                observers.forEach((observer => {
                    observer.disconnect();
                }));
                observers.splice(0, observers.length);
            };
            extendParams({
                observer: false,
                observeParents: false,
                observeSlideChildren: false
            });
            on("init", init);
            on("destroy", destroy);
        }
        var eventsEmitter = {
            on(events, handler, priority) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if (typeof handler !== "function") return self;
                const method = priority ? "unshift" : "push";
                events.split(" ").forEach((event => {
                    if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
                    self.eventsListeners[event][method](handler);
                }));
                return self;
            },
            once(events, handler, priority) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if (typeof handler !== "function") return self;
                function onceHandler() {
                    self.off(events, onceHandler);
                    if (onceHandler.__emitterProxy) delete onceHandler.__emitterProxy;
                    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                    handler.apply(self, args);
                }
                onceHandler.__emitterProxy = handler;
                return self.on(events, onceHandler, priority);
            },
            onAny(handler, priority) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if (typeof handler !== "function") return self;
                const method = priority ? "unshift" : "push";
                if (self.eventsAnyListeners.indexOf(handler) < 0) self.eventsAnyListeners[method](handler);
                return self;
            },
            offAny(handler) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if (!self.eventsAnyListeners) return self;
                const index = self.eventsAnyListeners.indexOf(handler);
                if (index >= 0) self.eventsAnyListeners.splice(index, 1);
                return self;
            },
            off(events, handler) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if (!self.eventsListeners) return self;
                events.split(" ").forEach((event => {
                    if (typeof handler === "undefined") self.eventsListeners[event] = []; else if (self.eventsListeners[event]) self.eventsListeners[event].forEach(((eventHandler, index) => {
                        if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) self.eventsListeners[event].splice(index, 1);
                    }));
                }));
                return self;
            },
            emit() {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if (!self.eventsListeners) return self;
                let events;
                let data;
                let context;
                for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                if (typeof args[0] === "string" || Array.isArray(args[0])) {
                    events = args[0];
                    data = args.slice(1, args.length);
                    context = self;
                } else {
                    events = args[0].events;
                    data = args[0].data;
                    context = args[0].context || self;
                }
                data.unshift(context);
                const eventsArray = Array.isArray(events) ? events : events.split(" ");
                eventsArray.forEach((event => {
                    if (self.eventsAnyListeners && self.eventsAnyListeners.length) self.eventsAnyListeners.forEach((eventHandler => {
                        eventHandler.apply(context, [ event, ...data ]);
                    }));
                    if (self.eventsListeners && self.eventsListeners[event]) self.eventsListeners[event].forEach((eventHandler => {
                        eventHandler.apply(context, data);
                    }));
                }));
                return self;
            }
        };
        function updateSize() {
            const swiper = this;
            let width;
            let height;
            const el = swiper.el;
            if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) width = swiper.params.width; else width = el.clientWidth;
            if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) height = swiper.params.height; else height = el.clientHeight;
            if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) return;
            width = width - parseInt(elementStyle(el, "padding-left") || 0, 10) - parseInt(elementStyle(el, "padding-right") || 0, 10);
            height = height - parseInt(elementStyle(el, "padding-top") || 0, 10) - parseInt(elementStyle(el, "padding-bottom") || 0, 10);
            if (Number.isNaN(width)) width = 0;
            if (Number.isNaN(height)) height = 0;
            Object.assign(swiper, {
                width,
                height,
                size: swiper.isHorizontal() ? width : height
            });
        }
        function updateSlides() {
            const swiper = this;
            function getDirectionPropertyValue(node, label) {
                return parseFloat(node.getPropertyValue(swiper.getDirectionLabel(label)) || 0);
            }
            const params = swiper.params;
            const {wrapperEl, slidesEl, size: swiperSize, rtlTranslate: rtl, wrongRTL} = swiper;
            const isVirtual = swiper.virtual && params.virtual.enabled;
            const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
            const slides = utils_elementChildren(slidesEl, `.${swiper.params.slideClass}, swiper-slide`);
            const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
            let snapGrid = [];
            const slidesGrid = [];
            const slidesSizesGrid = [];
            let offsetBefore = params.slidesOffsetBefore;
            if (typeof offsetBefore === "function") offsetBefore = params.slidesOffsetBefore.call(swiper);
            let offsetAfter = params.slidesOffsetAfter;
            if (typeof offsetAfter === "function") offsetAfter = params.slidesOffsetAfter.call(swiper);
            const previousSnapGridLength = swiper.snapGrid.length;
            const previousSlidesGridLength = swiper.slidesGrid.length;
            let spaceBetween = params.spaceBetween;
            let slidePosition = -offsetBefore;
            let prevSlideSize = 0;
            let index = 0;
            if (typeof swiperSize === "undefined") return;
            if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize; else if (typeof spaceBetween === "string") spaceBetween = parseFloat(spaceBetween);
            swiper.virtualSize = -spaceBetween;
            slides.forEach((slideEl => {
                if (rtl) slideEl.style.marginLeft = ""; else slideEl.style.marginRight = "";
                slideEl.style.marginBottom = "";
                slideEl.style.marginTop = "";
            }));
            if (params.centeredSlides && params.cssMode) {
                utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-before", "");
                utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-after", "");
            }
            const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
            if (gridEnabled) swiper.grid.initSlides(slides); else if (swiper.grid) swiper.grid.unsetSlides();
            let slideSize;
            const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key => typeof params.breakpoints[key].slidesPerView !== "undefined")).length > 0;
            for (let i = 0; i < slidesLength; i += 1) {
                slideSize = 0;
                let slide;
                if (slides[i]) slide = slides[i];
                if (gridEnabled) swiper.grid.updateSlide(i, slide, slides);
                if (slides[i] && elementStyle(slide, "display") === "none") continue;
                if (params.slidesPerView === "auto") {
                    if (shouldResetSlideSize) slides[i].style[swiper.getDirectionLabel("width")] = ``;
                    const slideStyles = getComputedStyle(slide);
                    const currentTransform = slide.style.transform;
                    const currentWebKitTransform = slide.style.webkitTransform;
                    if (currentTransform) slide.style.transform = "none";
                    if (currentWebKitTransform) slide.style.webkitTransform = "none";
                    if (params.roundLengths) slideSize = swiper.isHorizontal() ? elementOuterSize(slide, "width", true) : elementOuterSize(slide, "height", true); else {
                        const width = getDirectionPropertyValue(slideStyles, "width");
                        const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
                        const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
                        const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
                        const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
                        const boxSizing = slideStyles.getPropertyValue("box-sizing");
                        if (boxSizing && boxSizing === "border-box") slideSize = width + marginLeft + marginRight; else {
                            const {clientWidth, offsetWidth} = slide;
                            slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
                        }
                    }
                    if (currentTransform) slide.style.transform = currentTransform;
                    if (currentWebKitTransform) slide.style.webkitTransform = currentWebKitTransform;
                    if (params.roundLengths) slideSize = Math.floor(slideSize);
                } else {
                    slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
                    if (params.roundLengths) slideSize = Math.floor(slideSize);
                    if (slides[i]) slides[i].style[swiper.getDirectionLabel("width")] = `${slideSize}px`;
                }
                if (slides[i]) slides[i].swiperSlideSize = slideSize;
                slidesSizesGrid.push(slideSize);
                if (params.centeredSlides) {
                    slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                    if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                    if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                    if (Math.abs(slidePosition) < 1 / 1e3) slidePosition = 0;
                    if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                    if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                    slidesGrid.push(slidePosition);
                } else {
                    if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                    if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                    slidesGrid.push(slidePosition);
                    slidePosition = slidePosition + slideSize + spaceBetween;
                }
                swiper.virtualSize += slideSize + spaceBetween;
                prevSlideSize = slideSize;
                index += 1;
            }
            swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
            if (rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) wrapperEl.style.width = `${swiper.virtualSize + spaceBetween}px`;
            if (params.setWrapperSize) wrapperEl.style[swiper.getDirectionLabel("width")] = `${swiper.virtualSize + spaceBetween}px`;
            if (gridEnabled) swiper.grid.updateWrapperSize(slideSize, snapGrid);
            if (!params.centeredSlides) {
                const newSlidesGrid = [];
                for (let i = 0; i < snapGrid.length; i += 1) {
                    let slidesGridItem = snapGrid[i];
                    if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
                    if (snapGrid[i] <= swiper.virtualSize - swiperSize) newSlidesGrid.push(slidesGridItem);
                }
                snapGrid = newSlidesGrid;
                if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) snapGrid.push(swiper.virtualSize - swiperSize);
            }
            if (isVirtual && params.loop) {
                const size = slidesSizesGrid[0] + spaceBetween;
                if (params.slidesPerGroup > 1) {
                    const groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
                    const groupSize = size * params.slidesPerGroup;
                    for (let i = 0; i < groups; i += 1) snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
                }
                for (let i = 0; i < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i += 1) {
                    if (params.slidesPerGroup === 1) snapGrid.push(snapGrid[snapGrid.length - 1] + size);
                    slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
                    swiper.virtualSize += size;
                }
            }
            if (snapGrid.length === 0) snapGrid = [ 0 ];
            if (spaceBetween !== 0) {
                const key = swiper.isHorizontal() && rtl ? "marginLeft" : swiper.getDirectionLabel("marginRight");
                slides.filter(((_, slideIndex) => {
                    if (!params.cssMode || params.loop) return true;
                    if (slideIndex === slides.length - 1) return false;
                    return true;
                })).forEach((slideEl => {
                    slideEl.style[key] = `${spaceBetween}px`;
                }));
            }
            if (params.centeredSlides && params.centeredSlidesBounds) {
                let allSlidesSize = 0;
                slidesSizesGrid.forEach((slideSizeValue => {
                    allSlidesSize += slideSizeValue + (spaceBetween || 0);
                }));
                allSlidesSize -= spaceBetween;
                const maxSnap = allSlidesSize > swiperSize ? allSlidesSize - swiperSize : 0;
                snapGrid = snapGrid.map((snap => {
                    if (snap <= 0) return -offsetBefore;
                    if (snap > maxSnap) return maxSnap + offsetAfter;
                    return snap;
                }));
            }
            if (params.centerInsufficientSlides) {
                let allSlidesSize = 0;
                slidesSizesGrid.forEach((slideSizeValue => {
                    allSlidesSize += slideSizeValue + (spaceBetween || 0);
                }));
                allSlidesSize -= spaceBetween;
                const offsetSize = (params.slidesOffsetBefore || 0) + (params.slidesOffsetAfter || 0);
                if (allSlidesSize + offsetSize < swiperSize) {
                    const allSlidesOffset = (swiperSize - allSlidesSize - offsetSize) / 2;
                    snapGrid.forEach(((snap, snapIndex) => {
                        snapGrid[snapIndex] = snap - allSlidesOffset;
                    }));
                    slidesGrid.forEach(((snap, snapIndex) => {
                        slidesGrid[snapIndex] = snap + allSlidesOffset;
                    }));
                }
            }
            Object.assign(swiper, {
                slides,
                snapGrid,
                slidesGrid,
                slidesSizesGrid
            });
            if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
                utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
                utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
                const addToSnapGrid = -swiper.snapGrid[0];
                const addToSlidesGrid = -swiper.slidesGrid[0];
                swiper.snapGrid = swiper.snapGrid.map((v => v + addToSnapGrid));
                swiper.slidesGrid = swiper.slidesGrid.map((v => v + addToSlidesGrid));
            }
            if (slidesLength !== previousSlidesLength) swiper.emit("slidesLengthChange");
            if (snapGrid.length !== previousSnapGridLength) {
                if (swiper.params.watchOverflow) swiper.checkOverflow();
                swiper.emit("snapGridLengthChange");
            }
            if (slidesGrid.length !== previousSlidesGridLength) swiper.emit("slidesGridLengthChange");
            if (params.watchSlidesProgress) swiper.updateSlidesOffset();
            swiper.emit("slidesUpdated");
            if (!isVirtual && !params.cssMode && (params.effect === "slide" || params.effect === "fade")) {
                const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
                const hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
                if (slidesLength <= params.maxBackfaceHiddenSlides) {
                    if (!hasClassBackfaceClassAdded) swiper.el.classList.add(backFaceHiddenClass);
                } else if (hasClassBackfaceClassAdded) swiper.el.classList.remove(backFaceHiddenClass);
            }
        }
        function updateAutoHeight(speed) {
            const swiper = this;
            const activeSlides = [];
            const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
            let newHeight = 0;
            let i;
            if (typeof speed === "number") swiper.setTransition(speed); else if (speed === true) swiper.setTransition(swiper.params.speed);
            const getSlideByIndex = index => {
                if (isVirtual) return swiper.slides[swiper.getSlideIndexByData(index)];
                return swiper.slides[index];
            };
            if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1) if (swiper.params.centeredSlides) (swiper.visibleSlides || []).forEach((slide => {
                activeSlides.push(slide);
            })); else for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
                const index = swiper.activeIndex + i;
                if (index > swiper.slides.length && !isVirtual) break;
                activeSlides.push(getSlideByIndex(index));
            } else activeSlides.push(getSlideByIndex(swiper.activeIndex));
            for (i = 0; i < activeSlides.length; i += 1) if (typeof activeSlides[i] !== "undefined") {
                const height = activeSlides[i].offsetHeight;
                newHeight = height > newHeight ? height : newHeight;
            }
            if (newHeight || newHeight === 0) swiper.wrapperEl.style.height = `${newHeight}px`;
        }
        function updateSlidesOffset() {
            const swiper = this;
            const slides = swiper.slides;
            const minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
            for (let i = 0; i < slides.length; i += 1) slides[i].swiperSlideOffset = (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
        }
        const toggleSlideClasses$1 = (slideEl, condition, className) => {
            if (condition && !slideEl.classList.contains(className)) slideEl.classList.add(className); else if (!condition && slideEl.classList.contains(className)) slideEl.classList.remove(className);
        };
        function updateSlidesProgress(translate) {
            if (translate === void 0) translate = this && this.translate || 0;
            const swiper = this;
            const params = swiper.params;
            const {slides, rtlTranslate: rtl, snapGrid} = swiper;
            if (slides.length === 0) return;
            if (typeof slides[0].swiperSlideOffset === "undefined") swiper.updateSlidesOffset();
            let offsetCenter = -translate;
            if (rtl) offsetCenter = translate;
            swiper.visibleSlidesIndexes = [];
            swiper.visibleSlides = [];
            let spaceBetween = params.spaceBetween;
            if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiper.size; else if (typeof spaceBetween === "string") spaceBetween = parseFloat(spaceBetween);
            for (let i = 0; i < slides.length; i += 1) {
                const slide = slides[i];
                let slideOffset = slide.swiperSlideOffset;
                if (params.cssMode && params.centeredSlides) slideOffset -= slides[0].swiperSlideOffset;
                const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
                const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
                const slideBefore = -(offsetCenter - slideOffset);
                const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
                const isFullyVisible = slideBefore >= 0 && slideBefore <= swiper.size - swiper.slidesSizesGrid[i];
                const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
                if (isVisible) {
                    swiper.visibleSlides.push(slide);
                    swiper.visibleSlidesIndexes.push(i);
                }
                toggleSlideClasses$1(slide, isVisible, params.slideVisibleClass);
                toggleSlideClasses$1(slide, isFullyVisible, params.slideFullyVisibleClass);
                slide.progress = rtl ? -slideProgress : slideProgress;
                slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
            }
        }
        function updateProgress(translate) {
            const swiper = this;
            if (typeof translate === "undefined") {
                const multiplier = swiper.rtlTranslate ? -1 : 1;
                translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
            }
            const params = swiper.params;
            const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
            let {progress, isBeginning, isEnd, progressLoop} = swiper;
            const wasBeginning = isBeginning;
            const wasEnd = isEnd;
            if (translatesDiff === 0) {
                progress = 0;
                isBeginning = true;
                isEnd = true;
            } else {
                progress = (translate - swiper.minTranslate()) / translatesDiff;
                const isBeginningRounded = Math.abs(translate - swiper.minTranslate()) < 1;
                const isEndRounded = Math.abs(translate - swiper.maxTranslate()) < 1;
                isBeginning = isBeginningRounded || progress <= 0;
                isEnd = isEndRounded || progress >= 1;
                if (isBeginningRounded) progress = 0;
                if (isEndRounded) progress = 1;
            }
            if (params.loop) {
                const firstSlideIndex = swiper.getSlideIndexByData(0);
                const lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
                const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
                const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
                const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
                const translateAbs = Math.abs(translate);
                if (translateAbs >= firstSlideTranslate) progressLoop = (translateAbs - firstSlideTranslate) / translateMax; else progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
                if (progressLoop > 1) progressLoop -= 1;
            }
            Object.assign(swiper, {
                progress,
                progressLoop,
                isBeginning,
                isEnd
            });
            if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
            if (isBeginning && !wasBeginning) swiper.emit("reachBeginning toEdge");
            if (isEnd && !wasEnd) swiper.emit("reachEnd toEdge");
            if (wasBeginning && !isBeginning || wasEnd && !isEnd) swiper.emit("fromEdge");
            swiper.emit("progress", progress);
        }
        const toggleSlideClasses = (slideEl, condition, className) => {
            if (condition && !slideEl.classList.contains(className)) slideEl.classList.add(className); else if (!condition && slideEl.classList.contains(className)) slideEl.classList.remove(className);
        };
        function updateSlidesClasses() {
            const swiper = this;
            const {slides, params, slidesEl, activeIndex} = swiper;
            const isVirtual = swiper.virtual && params.virtual.enabled;
            const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
            const getFilteredSlide = selector => utils_elementChildren(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
            let activeSlide;
            let prevSlide;
            let nextSlide;
            if (isVirtual) if (params.loop) {
                let slideIndex = activeIndex - swiper.virtual.slidesBefore;
                if (slideIndex < 0) slideIndex = swiper.virtual.slides.length + slideIndex;
                if (slideIndex >= swiper.virtual.slides.length) slideIndex -= swiper.virtual.slides.length;
                activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
            } else activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`); else if (gridEnabled) {
                activeSlide = slides.find((slideEl => slideEl.column === activeIndex));
                nextSlide = slides.find((slideEl => slideEl.column === activeIndex + 1));
                prevSlide = slides.find((slideEl => slideEl.column === activeIndex - 1));
            } else activeSlide = slides[activeIndex];
            if (activeSlide) if (!gridEnabled) {
                nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
                if (params.loop && !nextSlide) nextSlide = slides[0];
                prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
                if (params.loop && !prevSlide === 0) prevSlide = slides[slides.length - 1];
            }
            slides.forEach((slideEl => {
                toggleSlideClasses(slideEl, slideEl === activeSlide, params.slideActiveClass);
                toggleSlideClasses(slideEl, slideEl === nextSlide, params.slideNextClass);
                toggleSlideClasses(slideEl, slideEl === prevSlide, params.slidePrevClass);
            }));
            swiper.emitSlidesClasses();
        }
        const processLazyPreloader = (swiper, imageEl) => {
            if (!swiper || swiper.destroyed || !swiper.params) return;
            const slideSelector = () => swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
            const slideEl = imageEl.closest(slideSelector());
            if (slideEl) {
                let lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
                if (!lazyEl && swiper.isElement) if (slideEl.shadowRoot) lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`); else requestAnimationFrame((() => {
                    if (slideEl.shadowRoot) {
                        lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
                        if (lazyEl) lazyEl.remove();
                    }
                }));
                if (lazyEl) lazyEl.remove();
            }
        };
        const unlazy = (swiper, index) => {
            if (!swiper.slides[index]) return;
            const imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
            if (imageEl) imageEl.removeAttribute("loading");
        };
        const preload = swiper => {
            if (!swiper || swiper.destroyed || !swiper.params) return;
            let amount = swiper.params.lazyPreloadPrevNext;
            const len = swiper.slides.length;
            if (!len || !amount || amount < 0) return;
            amount = Math.min(amount, len);
            const slidesPerView = swiper.params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
            const activeIndex = swiper.activeIndex;
            if (swiper.params.grid && swiper.params.grid.rows > 1) {
                const activeColumn = activeIndex;
                const preloadColumns = [ activeColumn - amount ];
                preloadColumns.push(...Array.from({
                    length: amount
                }).map(((_, i) => activeColumn + slidesPerView + i)));
                swiper.slides.forEach(((slideEl, i) => {
                    if (preloadColumns.includes(slideEl.column)) unlazy(swiper, i);
                }));
                return;
            }
            const slideIndexLastInView = activeIndex + slidesPerView - 1;
            if (swiper.params.rewind || swiper.params.loop) for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
                const realIndex = (i % len + len) % len;
                if (realIndex < activeIndex || realIndex > slideIndexLastInView) unlazy(swiper, realIndex);
            } else for (let i = Math.max(activeIndex - amount, 0); i <= Math.min(slideIndexLastInView + amount, len - 1); i += 1) if (i !== activeIndex && (i > slideIndexLastInView || i < activeIndex)) unlazy(swiper, i);
        };
        function getActiveIndexByTranslate(swiper) {
            const {slidesGrid, params} = swiper;
            const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
            let activeIndex;
            for (let i = 0; i < slidesGrid.length; i += 1) if (typeof slidesGrid[i + 1] !== "undefined") {
                if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) activeIndex = i; else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) activeIndex = i + 1;
            } else if (translate >= slidesGrid[i]) activeIndex = i;
            if (params.normalizeSlideIndex) if (activeIndex < 0 || typeof activeIndex === "undefined") activeIndex = 0;
            return activeIndex;
        }
        function updateActiveIndex(newActiveIndex) {
            const swiper = this;
            const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
            const {snapGrid, params, activeIndex: previousIndex, realIndex: previousRealIndex, snapIndex: previousSnapIndex} = swiper;
            let activeIndex = newActiveIndex;
            let snapIndex;
            const getVirtualRealIndex = aIndex => {
                let realIndex = aIndex - swiper.virtual.slidesBefore;
                if (realIndex < 0) realIndex = swiper.virtual.slides.length + realIndex;
                if (realIndex >= swiper.virtual.slides.length) realIndex -= swiper.virtual.slides.length;
                return realIndex;
            };
            if (typeof activeIndex === "undefined") activeIndex = getActiveIndexByTranslate(swiper);
            if (snapGrid.indexOf(translate) >= 0) snapIndex = snapGrid.indexOf(translate); else {
                const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
                snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
            }
            if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
            if (activeIndex === previousIndex && !swiper.params.loop) {
                if (snapIndex !== previousSnapIndex) {
                    swiper.snapIndex = snapIndex;
                    swiper.emit("snapIndexChange");
                }
                return;
            }
            if (activeIndex === previousIndex && swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
                swiper.realIndex = getVirtualRealIndex(activeIndex);
                return;
            }
            const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
            let realIndex;
            if (swiper.virtual && params.virtual.enabled && params.loop) realIndex = getVirtualRealIndex(activeIndex); else if (gridEnabled) {
                const firstSlideInColumn = swiper.slides.find((slideEl => slideEl.column === activeIndex));
                let activeSlideIndex = parseInt(firstSlideInColumn.getAttribute("data-swiper-slide-index"), 10);
                if (Number.isNaN(activeSlideIndex)) activeSlideIndex = Math.max(swiper.slides.indexOf(firstSlideInColumn), 0);
                realIndex = Math.floor(activeSlideIndex / params.grid.rows);
            } else if (swiper.slides[activeIndex]) {
                const slideIndex = swiper.slides[activeIndex].getAttribute("data-swiper-slide-index");
                if (slideIndex) realIndex = parseInt(slideIndex, 10); else realIndex = activeIndex;
            } else realIndex = activeIndex;
            Object.assign(swiper, {
                previousSnapIndex,
                snapIndex,
                previousRealIndex,
                realIndex,
                previousIndex,
                activeIndex
            });
            if (swiper.initialized) preload(swiper);
            swiper.emit("activeIndexChange");
            swiper.emit("snapIndexChange");
            if (swiper.initialized || swiper.params.runCallbacksOnInit) {
                if (previousRealIndex !== realIndex) swiper.emit("realIndexChange");
                swiper.emit("slideChange");
            }
        }
        function updateClickedSlide(el, path) {
            const swiper = this;
            const params = swiper.params;
            let slide = el.closest(`.${params.slideClass}, swiper-slide`);
            if (!slide && swiper.isElement && path && path.length > 1 && path.includes(el)) [ ...path.slice(path.indexOf(el) + 1, path.length) ].forEach((pathEl => {
                if (!slide && pathEl.matches && pathEl.matches(`.${params.slideClass}, swiper-slide`)) slide = pathEl;
            }));
            let slideFound = false;
            let slideIndex;
            if (slide) for (let i = 0; i < swiper.slides.length; i += 1) if (swiper.slides[i] === slide) {
                slideFound = true;
                slideIndex = i;
                break;
            }
            if (slide && slideFound) {
                swiper.clickedSlide = slide;
                if (swiper.virtual && swiper.params.virtual.enabled) swiper.clickedIndex = parseInt(slide.getAttribute("data-swiper-slide-index"), 10); else swiper.clickedIndex = slideIndex;
            } else {
                swiper.clickedSlide = void 0;
                swiper.clickedIndex = void 0;
                return;
            }
            if (params.slideToClickedSlide && swiper.clickedIndex !== void 0 && swiper.clickedIndex !== swiper.activeIndex) swiper.slideToClickedSlide();
        }
        var update = {
            updateSize,
            updateSlides,
            updateAutoHeight,
            updateSlidesOffset,
            updateSlidesProgress,
            updateProgress,
            updateSlidesClasses,
            updateActiveIndex,
            updateClickedSlide
        };
        function getSwiperTranslate(axis) {
            if (axis === void 0) axis = this.isHorizontal() ? "x" : "y";
            const swiper = this;
            const {params, rtlTranslate: rtl, translate, wrapperEl} = swiper;
            if (params.virtualTranslate) return rtl ? -translate : translate;
            if (params.cssMode) return translate;
            let currentTranslate = utils_getTranslate(wrapperEl, axis);
            currentTranslate += swiper.cssOverflowAdjustment();
            if (rtl) currentTranslate = -currentTranslate;
            return currentTranslate || 0;
        }
        function setTranslate(translate, byController) {
            const swiper = this;
            const {rtlTranslate: rtl, params, wrapperEl, progress} = swiper;
            let x = 0;
            let y = 0;
            const z = 0;
            if (swiper.isHorizontal()) x = rtl ? -translate : translate; else y = translate;
            if (params.roundLengths) {
                x = Math.floor(x);
                y = Math.floor(y);
            }
            swiper.previousTranslate = swiper.translate;
            swiper.translate = swiper.isHorizontal() ? x : y;
            if (params.cssMode) wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y; else if (!params.virtualTranslate) {
                if (swiper.isHorizontal()) x -= swiper.cssOverflowAdjustment(); else y -= swiper.cssOverflowAdjustment();
                wrapperEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
            }
            let newProgress;
            const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
            if (translatesDiff === 0) newProgress = 0; else newProgress = (translate - swiper.minTranslate()) / translatesDiff;
            if (newProgress !== progress) swiper.updateProgress(translate);
            swiper.emit("setTranslate", swiper.translate, byController);
        }
        function minTranslate() {
            return -this.snapGrid[0];
        }
        function maxTranslate() {
            return -this.snapGrid[this.snapGrid.length - 1];
        }
        function translateTo(translate, speed, runCallbacks, translateBounds, internal) {
            if (translate === void 0) translate = 0;
            if (speed === void 0) speed = this.params.speed;
            if (runCallbacks === void 0) runCallbacks = true;
            if (translateBounds === void 0) translateBounds = true;
            const swiper = this;
            const {params, wrapperEl} = swiper;
            if (swiper.animating && params.preventInteractionOnTransition) return false;
            const minTranslate = swiper.minTranslate();
            const maxTranslate = swiper.maxTranslate();
            let newTranslate;
            if (translateBounds && translate > minTranslate) newTranslate = minTranslate; else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate; else newTranslate = translate;
            swiper.updateProgress(newTranslate);
            if (params.cssMode) {
                const isH = swiper.isHorizontal();
                if (speed === 0) wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate; else {
                    if (!swiper.support.smoothScroll) {
                        animateCSSModeScroll({
                            swiper,
                            targetPosition: -newTranslate,
                            side: isH ? "left" : "top"
                        });
                        return true;
                    }
                    wrapperEl.scrollTo({
                        [isH ? "left" : "top"]: -newTranslate,
                        behavior: "smooth"
                    });
                }
                return true;
            }
            if (speed === 0) {
                swiper.setTransition(0);
                swiper.setTranslate(newTranslate);
                if (runCallbacks) {
                    swiper.emit("beforeTransitionStart", speed, internal);
                    swiper.emit("transitionEnd");
                }
            } else {
                swiper.setTransition(speed);
                swiper.setTranslate(newTranslate);
                if (runCallbacks) {
                    swiper.emit("beforeTransitionStart", speed, internal);
                    swiper.emit("transitionStart");
                }
                if (!swiper.animating) {
                    swiper.animating = true;
                    if (!swiper.onTranslateToWrapperTransitionEnd) swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
                        if (!swiper || swiper.destroyed) return;
                        if (e.target !== this) return;
                        swiper.wrapperEl.removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                        swiper.onTranslateToWrapperTransitionEnd = null;
                        delete swiper.onTranslateToWrapperTransitionEnd;
                        swiper.animating = false;
                        if (runCallbacks) swiper.emit("transitionEnd");
                    };
                    swiper.wrapperEl.addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                }
            }
            return true;
        }
        var translate = {
            getTranslate: getSwiperTranslate,
            setTranslate,
            minTranslate,
            maxTranslate,
            translateTo
        };
        function setTransition(duration, byController) {
            const swiper = this;
            if (!swiper.params.cssMode) {
                swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
                swiper.wrapperEl.style.transitionDelay = duration === 0 ? `0ms` : "";
            }
            swiper.emit("setTransition", duration, byController);
        }
        function transitionEmit(_ref) {
            let {swiper, runCallbacks, direction, step} = _ref;
            const {activeIndex, previousIndex} = swiper;
            let dir = direction;
            if (!dir) if (activeIndex > previousIndex) dir = "next"; else if (activeIndex < previousIndex) dir = "prev"; else dir = "reset";
            swiper.emit(`transition${step}`);
            if (runCallbacks && activeIndex !== previousIndex) {
                if (dir === "reset") {
                    swiper.emit(`slideResetTransition${step}`);
                    return;
                }
                swiper.emit(`slideChangeTransition${step}`);
                if (dir === "next") swiper.emit(`slideNextTransition${step}`); else swiper.emit(`slidePrevTransition${step}`);
            }
        }
        function transitionStart(runCallbacks, direction) {
            if (runCallbacks === void 0) runCallbacks = true;
            const swiper = this;
            const {params} = swiper;
            if (params.cssMode) return;
            if (params.autoHeight) swiper.updateAutoHeight();
            transitionEmit({
                swiper,
                runCallbacks,
                direction,
                step: "Start"
            });
        }
        function transitionEnd(runCallbacks, direction) {
            if (runCallbacks === void 0) runCallbacks = true;
            const swiper = this;
            const {params} = swiper;
            swiper.animating = false;
            if (params.cssMode) return;
            swiper.setTransition(0);
            transitionEmit({
                swiper,
                runCallbacks,
                direction,
                step: "End"
            });
        }
        var transition = {
            setTransition,
            transitionStart,
            transitionEnd
        };
        function slideTo(index, speed, runCallbacks, internal, initial) {
            if (index === void 0) index = 0;
            if (runCallbacks === void 0) runCallbacks = true;
            if (typeof index === "string") index = parseInt(index, 10);
            const swiper = this;
            let slideIndex = index;
            if (slideIndex < 0) slideIndex = 0;
            const {params, snapGrid, slidesGrid, previousIndex, activeIndex, rtlTranslate: rtl, wrapperEl, enabled} = swiper;
            if (!enabled && !internal && !initial || swiper.destroyed || swiper.animating && params.preventInteractionOnTransition) return false;
            if (typeof speed === "undefined") speed = swiper.params.speed;
            const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
            let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
            if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
            const translate = -snapGrid[snapIndex];
            if (params.normalizeSlideIndex) for (let i = 0; i < slidesGrid.length; i += 1) {
                const normalizedTranslate = -Math.floor(translate * 100);
                const normalizedGrid = Math.floor(slidesGrid[i] * 100);
                const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
                if (typeof slidesGrid[i + 1] !== "undefined") {
                    if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) slideIndex = i; else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) slideIndex = i + 1;
                } else if (normalizedTranslate >= normalizedGrid) slideIndex = i;
            }
            if (swiper.initialized && slideIndex !== activeIndex) {
                if (!swiper.allowSlideNext && (rtl ? translate > swiper.translate && translate > swiper.minTranslate() : translate < swiper.translate && translate < swiper.minTranslate())) return false;
                if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) if ((activeIndex || 0) !== slideIndex) return false;
            }
            if (slideIndex !== (previousIndex || 0) && runCallbacks) swiper.emit("beforeSlideChangeStart");
            swiper.updateProgress(translate);
            let direction;
            if (slideIndex > activeIndex) direction = "next"; else if (slideIndex < activeIndex) direction = "prev"; else direction = "reset";
            const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
            const isInitialVirtual = isVirtual && initial;
            if (!isInitialVirtual && (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate)) {
                swiper.updateActiveIndex(slideIndex);
                if (params.autoHeight) swiper.updateAutoHeight();
                swiper.updateSlidesClasses();
                if (params.effect !== "slide") swiper.setTranslate(translate);
                if (direction !== "reset") {
                    swiper.transitionStart(runCallbacks, direction);
                    swiper.transitionEnd(runCallbacks, direction);
                }
                return false;
            }
            if (params.cssMode) {
                const isH = swiper.isHorizontal();
                const t = rtl ? translate : -translate;
                if (speed === 0) {
                    if (isVirtual) {
                        swiper.wrapperEl.style.scrollSnapType = "none";
                        swiper._immediateVirtual = true;
                    }
                    if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
                        swiper._cssModeVirtualInitialSet = true;
                        requestAnimationFrame((() => {
                            wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                        }));
                    } else wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                    if (isVirtual) requestAnimationFrame((() => {
                        swiper.wrapperEl.style.scrollSnapType = "";
                        swiper._immediateVirtual = false;
                    }));
                } else {
                    if (!swiper.support.smoothScroll) {
                        animateCSSModeScroll({
                            swiper,
                            targetPosition: t,
                            side: isH ? "left" : "top"
                        });
                        return true;
                    }
                    wrapperEl.scrollTo({
                        [isH ? "left" : "top"]: t,
                        behavior: "smooth"
                    });
                }
                return true;
            }
            const browser = getBrowser();
            const isSafari = browser.isSafari;
            if (isVirtual && !initial && isSafari && swiper.isElement) swiper.virtual.update(false, false, slideIndex);
            swiper.setTransition(speed);
            swiper.setTranslate(translate);
            swiper.updateActiveIndex(slideIndex);
            swiper.updateSlidesClasses();
            swiper.emit("beforeTransitionStart", speed, internal);
            swiper.transitionStart(runCallbacks, direction);
            if (speed === 0) swiper.transitionEnd(runCallbacks, direction); else if (!swiper.animating) {
                swiper.animating = true;
                if (!swiper.onSlideToWrapperTransitionEnd) swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
                    if (!swiper || swiper.destroyed) return;
                    if (e.target !== this) return;
                    swiper.wrapperEl.removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
                    swiper.onSlideToWrapperTransitionEnd = null;
                    delete swiper.onSlideToWrapperTransitionEnd;
                    swiper.transitionEnd(runCallbacks, direction);
                };
                swiper.wrapperEl.addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
            }
            return true;
        }
        function slideToLoop(index, speed, runCallbacks, internal) {
            if (index === void 0) index = 0;
            if (runCallbacks === void 0) runCallbacks = true;
            if (typeof index === "string") {
                const indexAsNumber = parseInt(index, 10);
                index = indexAsNumber;
            }
            const swiper = this;
            if (swiper.destroyed) return;
            if (typeof speed === "undefined") speed = swiper.params.speed;
            const gridEnabled = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
            let newIndex = index;
            if (swiper.params.loop) if (swiper.virtual && swiper.params.virtual.enabled) newIndex += swiper.virtual.slidesBefore; else {
                let targetSlideIndex;
                if (gridEnabled) {
                    const slideIndex = newIndex * swiper.params.grid.rows;
                    targetSlideIndex = swiper.slides.find((slideEl => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex)).column;
                } else targetSlideIndex = swiper.getSlideIndexByData(newIndex);
                const cols = gridEnabled ? Math.ceil(swiper.slides.length / swiper.params.grid.rows) : swiper.slides.length;
                const {centeredSlides} = swiper.params;
                let slidesPerView = swiper.params.slidesPerView;
                if (slidesPerView === "auto") slidesPerView = swiper.slidesPerViewDynamic(); else {
                    slidesPerView = Math.ceil(parseFloat(swiper.params.slidesPerView, 10));
                    if (centeredSlides && slidesPerView % 2 === 0) slidesPerView += 1;
                }
                let needLoopFix = cols - targetSlideIndex < slidesPerView;
                if (centeredSlides) needLoopFix = needLoopFix || targetSlideIndex < Math.ceil(slidesPerView / 2);
                if (internal && centeredSlides && swiper.params.slidesPerView !== "auto" && !gridEnabled) needLoopFix = false;
                if (needLoopFix) {
                    const direction = centeredSlides ? targetSlideIndex < swiper.activeIndex ? "prev" : "next" : targetSlideIndex - swiper.activeIndex - 1 < swiper.params.slidesPerView ? "next" : "prev";
                    swiper.loopFix({
                        direction,
                        slideTo: true,
                        activeSlideIndex: direction === "next" ? targetSlideIndex + 1 : targetSlideIndex - cols + 1,
                        slideRealIndex: direction === "next" ? swiper.realIndex : void 0
                    });
                }
                if (gridEnabled) {
                    const slideIndex = newIndex * swiper.params.grid.rows;
                    newIndex = swiper.slides.find((slideEl => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex)).column;
                } else newIndex = swiper.getSlideIndexByData(newIndex);
            }
            requestAnimationFrame((() => {
                swiper.slideTo(newIndex, speed, runCallbacks, internal);
            }));
            return swiper;
        }
        function slideNext(speed, runCallbacks, internal) {
            if (runCallbacks === void 0) runCallbacks = true;
            const swiper = this;
            const {enabled, params, animating} = swiper;
            if (!enabled || swiper.destroyed) return swiper;
            if (typeof speed === "undefined") speed = swiper.params.speed;
            let perGroup = params.slidesPerGroup;
            if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
            const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
            const isVirtual = swiper.virtual && params.virtual.enabled;
            if (params.loop) {
                if (animating && !isVirtual && params.loopPreventsSliding) return false;
                swiper.loopFix({
                    direction: "next"
                });
                swiper._clientLeft = swiper.wrapperEl.clientLeft;
                if (swiper.activeIndex === swiper.slides.length - 1 && params.cssMode) {
                    requestAnimationFrame((() => {
                        swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
                    }));
                    return true;
                }
            }
            if (params.rewind && swiper.isEnd) return swiper.slideTo(0, speed, runCallbacks, internal);
            return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
        }
        function slidePrev(speed, runCallbacks, internal) {
            if (runCallbacks === void 0) runCallbacks = true;
            const swiper = this;
            const {params, snapGrid, slidesGrid, rtlTranslate, enabled, animating} = swiper;
            if (!enabled || swiper.destroyed) return swiper;
            if (typeof speed === "undefined") speed = swiper.params.speed;
            const isVirtual = swiper.virtual && params.virtual.enabled;
            if (params.loop) {
                if (animating && !isVirtual && params.loopPreventsSliding) return false;
                swiper.loopFix({
                    direction: "prev"
                });
                swiper._clientLeft = swiper.wrapperEl.clientLeft;
            }
            const translate = rtlTranslate ? swiper.translate : -swiper.translate;
            function normalize(val) {
                if (val < 0) return -Math.floor(Math.abs(val));
                return Math.floor(val);
            }
            const normalizedTranslate = normalize(translate);
            const normalizedSnapGrid = snapGrid.map((val => normalize(val)));
            const isFreeMode = params.freeMode && params.freeMode.enabled;
            let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
            if (typeof prevSnap === "undefined" && (params.cssMode || isFreeMode)) {
                let prevSnapIndex;
                snapGrid.forEach(((snap, snapIndex) => {
                    if (normalizedTranslate >= snap) prevSnapIndex = snapIndex;
                }));
                if (typeof prevSnapIndex !== "undefined") prevSnap = isFreeMode ? snapGrid[prevSnapIndex] : snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
            }
            let prevIndex = 0;
            if (typeof prevSnap !== "undefined") {
                prevIndex = slidesGrid.indexOf(prevSnap);
                if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
                if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
                    prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
                    prevIndex = Math.max(prevIndex, 0);
                }
            }
            if (params.rewind && swiper.isBeginning) {
                const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
                return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
            } else if (params.loop && swiper.activeIndex === 0 && params.cssMode) {
                requestAnimationFrame((() => {
                    swiper.slideTo(prevIndex, speed, runCallbacks, internal);
                }));
                return true;
            }
            return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
        }
        function slideReset(speed, runCallbacks, internal) {
            if (runCallbacks === void 0) runCallbacks = true;
            const swiper = this;
            if (swiper.destroyed) return;
            if (typeof speed === "undefined") speed = swiper.params.speed;
            return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
        }
        function slideToClosest(speed, runCallbacks, internal, threshold) {
            if (runCallbacks === void 0) runCallbacks = true;
            if (threshold === void 0) threshold = .5;
            const swiper = this;
            if (swiper.destroyed) return;
            if (typeof speed === "undefined") speed = swiper.params.speed;
            let index = swiper.activeIndex;
            const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
            const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
            const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
            if (translate >= swiper.snapGrid[snapIndex]) {
                const currentSnap = swiper.snapGrid[snapIndex];
                const nextSnap = swiper.snapGrid[snapIndex + 1];
                if (translate - currentSnap > (nextSnap - currentSnap) * threshold) index += swiper.params.slidesPerGroup;
            } else {
                const prevSnap = swiper.snapGrid[snapIndex - 1];
                const currentSnap = swiper.snapGrid[snapIndex];
                if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) index -= swiper.params.slidesPerGroup;
            }
            index = Math.max(index, 0);
            index = Math.min(index, swiper.slidesGrid.length - 1);
            return swiper.slideTo(index, speed, runCallbacks, internal);
        }
        function slideToClickedSlide() {
            const swiper = this;
            if (swiper.destroyed) return;
            const {params, slidesEl} = swiper;
            const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
            let slideToIndex = swiper.clickedIndex;
            let realIndex;
            const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
            if (params.loop) {
                if (swiper.animating) return;
                realIndex = parseInt(swiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
                if (params.centeredSlides) if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
                    swiper.loopFix();
                    slideToIndex = swiper.getSlideIndex(utils_elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
                    utils_nextTick((() => {
                        swiper.slideTo(slideToIndex);
                    }));
                } else swiper.slideTo(slideToIndex); else if (slideToIndex > swiper.slides.length - slidesPerView) {
                    swiper.loopFix();
                    slideToIndex = swiper.getSlideIndex(utils_elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
                    utils_nextTick((() => {
                        swiper.slideTo(slideToIndex);
                    }));
                } else swiper.slideTo(slideToIndex);
            } else swiper.slideTo(slideToIndex);
        }
        var slide = {
            slideTo,
            slideToLoop,
            slideNext,
            slidePrev,
            slideReset,
            slideToClosest,
            slideToClickedSlide
        };
        function loopCreate(slideRealIndex, initial) {
            const swiper = this;
            const {params, slidesEl} = swiper;
            if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
            const initSlides = () => {
                const slides = utils_elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
                slides.forEach(((el, index) => {
                    el.setAttribute("data-swiper-slide-index", index);
                }));
            };
            const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
            const slidesPerGroup = params.slidesPerGroup * (gridEnabled ? params.grid.rows : 1);
            const shouldFillGroup = swiper.slides.length % slidesPerGroup !== 0;
            const shouldFillGrid = gridEnabled && swiper.slides.length % params.grid.rows !== 0;
            const addBlankSlides = amountOfSlides => {
                for (let i = 0; i < amountOfSlides; i += 1) {
                    const slideEl = swiper.isElement ? utils_createElement("swiper-slide", [ params.slideBlankClass ]) : utils_createElement("div", [ params.slideClass, params.slideBlankClass ]);
                    swiper.slidesEl.append(slideEl);
                }
            };
            if (shouldFillGroup) {
                if (params.loopAddBlankSlides) {
                    const slidesToAdd = slidesPerGroup - swiper.slides.length % slidesPerGroup;
                    addBlankSlides(slidesToAdd);
                    swiper.recalcSlides();
                    swiper.updateSlides();
                } else showWarning("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
                initSlides();
            } else if (shouldFillGrid) {
                if (params.loopAddBlankSlides) {
                    const slidesToAdd = params.grid.rows - swiper.slides.length % params.grid.rows;
                    addBlankSlides(slidesToAdd);
                    swiper.recalcSlides();
                    swiper.updateSlides();
                } else showWarning("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
                initSlides();
            } else initSlides();
            swiper.loopFix({
                slideRealIndex,
                direction: params.centeredSlides ? void 0 : "next",
                initial
            });
        }
        function loopFix(_temp) {
            let {slideRealIndex, slideTo = true, direction, setTranslate, activeSlideIndex, initial, byController, byMousewheel} = _temp === void 0 ? {} : _temp;
            const swiper = this;
            if (!swiper.params.loop) return;
            swiper.emit("beforeLoopFix");
            const {slides, allowSlidePrev, allowSlideNext, slidesEl, params} = swiper;
            const {centeredSlides, initialSlide} = params;
            swiper.allowSlidePrev = true;
            swiper.allowSlideNext = true;
            if (swiper.virtual && params.virtual.enabled) {
                if (slideTo) if (!params.centeredSlides && swiper.snapIndex === 0) swiper.slideTo(swiper.virtual.slides.length, 0, false, true); else if (params.centeredSlides && swiper.snapIndex < params.slidesPerView) swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true); else if (swiper.snapIndex === swiper.snapGrid.length - 1) swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
                swiper.allowSlidePrev = allowSlidePrev;
                swiper.allowSlideNext = allowSlideNext;
                swiper.emit("loopFix");
                return;
            }
            let slidesPerView = params.slidesPerView;
            if (slidesPerView === "auto") slidesPerView = swiper.slidesPerViewDynamic(); else {
                slidesPerView = Math.ceil(parseFloat(params.slidesPerView, 10));
                if (centeredSlides && slidesPerView % 2 === 0) slidesPerView += 1;
            }
            const slidesPerGroup = params.slidesPerGroupAuto ? slidesPerView : params.slidesPerGroup;
            let loopedSlides = slidesPerGroup;
            if (loopedSlides % slidesPerGroup !== 0) loopedSlides += slidesPerGroup - loopedSlides % slidesPerGroup;
            loopedSlides += params.loopAdditionalSlides;
            swiper.loopedSlides = loopedSlides;
            const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
            if (slides.length < slidesPerView + loopedSlides || swiper.params.effect === "cards" && slides.length < slidesPerView + loopedSlides * 2) showWarning("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters"); else if (gridEnabled && params.grid.fill === "row") showWarning("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
            const prependSlidesIndexes = [];
            const appendSlidesIndexes = [];
            const cols = gridEnabled ? Math.ceil(slides.length / params.grid.rows) : slides.length;
            const isInitialOverflow = initial && cols - initialSlide < slidesPerView && !centeredSlides;
            let activeIndex = isInitialOverflow ? initialSlide : swiper.activeIndex;
            if (typeof activeSlideIndex === "undefined") activeSlideIndex = swiper.getSlideIndex(slides.find((el => el.classList.contains(params.slideActiveClass)))); else activeIndex = activeSlideIndex;
            const isNext = direction === "next" || !direction;
            const isPrev = direction === "prev" || !direction;
            let slidesPrepended = 0;
            let slidesAppended = 0;
            const activeColIndex = gridEnabled ? slides[activeSlideIndex].column : activeSlideIndex;
            const activeColIndexWithShift = activeColIndex + (centeredSlides && typeof setTranslate === "undefined" ? -slidesPerView / 2 + .5 : 0);
            if (activeColIndexWithShift < loopedSlides) {
                slidesPrepended = Math.max(loopedSlides - activeColIndexWithShift, slidesPerGroup);
                for (let i = 0; i < loopedSlides - activeColIndexWithShift; i += 1) {
                    const index = i - Math.floor(i / cols) * cols;
                    if (gridEnabled) {
                        const colIndexToPrepend = cols - index - 1;
                        for (let i = slides.length - 1; i >= 0; i -= 1) if (slides[i].column === colIndexToPrepend) prependSlidesIndexes.push(i);
                    } else prependSlidesIndexes.push(cols - index - 1);
                }
            } else if (activeColIndexWithShift + slidesPerView > cols - loopedSlides) {
                slidesAppended = Math.max(activeColIndexWithShift - (cols - loopedSlides * 2), slidesPerGroup);
                if (isInitialOverflow) slidesAppended = Math.max(slidesAppended, slidesPerView - cols + initialSlide + 1);
                for (let i = 0; i < slidesAppended; i += 1) {
                    const index = i - Math.floor(i / cols) * cols;
                    if (gridEnabled) slides.forEach(((slide, slideIndex) => {
                        if (slide.column === index) appendSlidesIndexes.push(slideIndex);
                    })); else appendSlidesIndexes.push(index);
                }
            }
            swiper.__preventObserver__ = true;
            requestAnimationFrame((() => {
                swiper.__preventObserver__ = false;
            }));
            if (swiper.params.effect === "cards" && slides.length < slidesPerView + loopedSlides * 2) {
                if (appendSlidesIndexes.includes(activeSlideIndex)) appendSlidesIndexes.splice(appendSlidesIndexes.indexOf(activeSlideIndex), 1);
                if (prependSlidesIndexes.includes(activeSlideIndex)) prependSlidesIndexes.splice(prependSlidesIndexes.indexOf(activeSlideIndex), 1);
            }
            if (isPrev) prependSlidesIndexes.forEach((index => {
                slides[index].swiperLoopMoveDOM = true;
                slidesEl.prepend(slides[index]);
                slides[index].swiperLoopMoveDOM = false;
            }));
            if (isNext) appendSlidesIndexes.forEach((index => {
                slides[index].swiperLoopMoveDOM = true;
                slidesEl.append(slides[index]);
                slides[index].swiperLoopMoveDOM = false;
            }));
            swiper.recalcSlides();
            if (params.slidesPerView === "auto") swiper.updateSlides(); else if (gridEnabled && (prependSlidesIndexes.length > 0 && isPrev || appendSlidesIndexes.length > 0 && isNext)) swiper.slides.forEach(((slide, slideIndex) => {
                swiper.grid.updateSlide(slideIndex, slide, swiper.slides);
            }));
            if (params.watchSlidesProgress) swiper.updateSlidesOffset();
            if (slideTo) if (prependSlidesIndexes.length > 0 && isPrev) {
                if (typeof slideRealIndex === "undefined") {
                    const currentSlideTranslate = swiper.slidesGrid[activeIndex];
                    const newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
                    const diff = newSlideTranslate - currentSlideTranslate;
                    if (byMousewheel) swiper.setTranslate(swiper.translate - diff); else {
                        swiper.slideTo(activeIndex + Math.ceil(slidesPrepended), 0, false, true);
                        if (setTranslate) {
                            swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
                            swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
                        }
                    }
                } else if (setTranslate) {
                    const shift = gridEnabled ? prependSlidesIndexes.length / params.grid.rows : prependSlidesIndexes.length;
                    swiper.slideTo(swiper.activeIndex + shift, 0, false, true);
                    swiper.touchEventsData.currentTranslate = swiper.translate;
                }
            } else if (appendSlidesIndexes.length > 0 && isNext) if (typeof slideRealIndex === "undefined") {
                const currentSlideTranslate = swiper.slidesGrid[activeIndex];
                const newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];
                const diff = newSlideTranslate - currentSlideTranslate;
                if (byMousewheel) swiper.setTranslate(swiper.translate - diff); else {
                    swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
                    if (setTranslate) {
                        swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
                        swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
                    }
                }
            } else {
                const shift = gridEnabled ? appendSlidesIndexes.length / params.grid.rows : appendSlidesIndexes.length;
                swiper.slideTo(swiper.activeIndex - shift, 0, false, true);
            }
            swiper.allowSlidePrev = allowSlidePrev;
            swiper.allowSlideNext = allowSlideNext;
            if (swiper.controller && swiper.controller.control && !byController) {
                const loopParams = {
                    slideRealIndex,
                    direction,
                    setTranslate,
                    activeSlideIndex,
                    byController: true
                };
                if (Array.isArray(swiper.controller.control)) swiper.controller.control.forEach((c => {
                    if (!c.destroyed && c.params.loop) c.loopFix({
                        ...loopParams,
                        slideTo: c.params.slidesPerView === params.slidesPerView ? slideTo : false
                    });
                })); else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) swiper.controller.control.loopFix({
                    ...loopParams,
                    slideTo: swiper.controller.control.params.slidesPerView === params.slidesPerView ? slideTo : false
                });
            }
            swiper.emit("loopFix");
        }
        function loopDestroy() {
            const swiper = this;
            const {params, slidesEl} = swiper;
            if (!params.loop || !slidesEl || swiper.virtual && swiper.params.virtual.enabled) return;
            swiper.recalcSlides();
            const newSlidesOrder = [];
            swiper.slides.forEach((slideEl => {
                const index = typeof slideEl.swiperSlideIndex === "undefined" ? slideEl.getAttribute("data-swiper-slide-index") * 1 : slideEl.swiperSlideIndex;
                newSlidesOrder[index] = slideEl;
            }));
            swiper.slides.forEach((slideEl => {
                slideEl.removeAttribute("data-swiper-slide-index");
            }));
            newSlidesOrder.forEach((slideEl => {
                slidesEl.append(slideEl);
            }));
            swiper.recalcSlides();
            swiper.slideTo(swiper.realIndex, 0);
        }
        var loop = {
            loopCreate,
            loopFix,
            loopDestroy
        };
        function setGrabCursor(moving) {
            const swiper = this;
            if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
            const el = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
            if (swiper.isElement) swiper.__preventObserver__ = true;
            el.style.cursor = "move";
            el.style.cursor = moving ? "grabbing" : "grab";
            if (swiper.isElement) requestAnimationFrame((() => {
                swiper.__preventObserver__ = false;
            }));
        }
        function unsetGrabCursor() {
            const swiper = this;
            if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
            if (swiper.isElement) swiper.__preventObserver__ = true;
            swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
            if (swiper.isElement) requestAnimationFrame((() => {
                swiper.__preventObserver__ = false;
            }));
        }
        var grabCursor = {
            setGrabCursor,
            unsetGrabCursor
        };
        function closestElement(selector, base) {
            if (base === void 0) base = this;
            function __closestFrom(el) {
                if (!el || el === ssr_window_esm_getDocument() || el === ssr_window_esm_getWindow()) return null;
                if (el.assignedSlot) el = el.assignedSlot;
                const found = el.closest(selector);
                if (!found && !el.getRootNode) return null;
                return found || __closestFrom(el.getRootNode().host);
            }
            return __closestFrom(base);
        }
        function preventEdgeSwipe(swiper, event, startX) {
            const window = ssr_window_esm_getWindow();
            const {params} = swiper;
            const edgeSwipeDetection = params.edgeSwipeDetection;
            const edgeSwipeThreshold = params.edgeSwipeThreshold;
            if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) {
                if (edgeSwipeDetection === "prevent") {
                    event.preventDefault();
                    return true;
                }
                return false;
            }
            return true;
        }
        function onTouchStart(event) {
            const swiper = this;
            const document = ssr_window_esm_getDocument();
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            const data = swiper.touchEventsData;
            if (e.type === "pointerdown") {
                if (data.pointerId !== null && data.pointerId !== e.pointerId) return;
                data.pointerId = e.pointerId;
            } else if (e.type === "touchstart" && e.targetTouches.length === 1) data.touchId = e.targetTouches[0].identifier;
            if (e.type === "touchstart") {
                preventEdgeSwipe(swiper, e, e.targetTouches[0].pageX);
                return;
            }
            const {params, touches, enabled} = swiper;
            if (!enabled) return;
            if (!params.simulateTouch && e.pointerType === "mouse") return;
            if (swiper.animating && params.preventInteractionOnTransition) return;
            if (!swiper.animating && params.cssMode && params.loop) swiper.loopFix();
            let targetEl = e.target;
            if (params.touchEventsTarget === "wrapper") if (!elementIsChildOf(targetEl, swiper.wrapperEl)) return;
            if ("which" in e && e.which === 3) return;
            if ("button" in e && e.button > 0) return;
            if (data.isTouched && data.isMoved) return;
            const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
            const eventPath = e.composedPath ? e.composedPath() : e.path;
            if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) targetEl = eventPath[0];
            const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
            const isTargetShadow = !!(e.target && e.target.shadowRoot);
            if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
                swiper.allowClick = true;
                return;
            }
            if (params.swipeHandler) if (!targetEl.closest(params.swipeHandler)) return;
            touches.currentX = e.pageX;
            touches.currentY = e.pageY;
            const startX = touches.currentX;
            const startY = touches.currentY;
            if (!preventEdgeSwipe(swiper, e, startX)) return;
            Object.assign(data, {
                isTouched: true,
                isMoved: false,
                allowTouchCallbacks: true,
                isScrolling: void 0,
                startMoving: void 0
            });
            touches.startX = startX;
            touches.startY = startY;
            data.touchStartTime = utils_now();
            swiper.allowClick = true;
            swiper.updateSize();
            swiper.swipeDirection = void 0;
            if (params.threshold > 0) data.allowThresholdMove = false;
            let preventDefault = true;
            if (targetEl.matches(data.focusableElements)) {
                preventDefault = false;
                if (targetEl.nodeName === "SELECT") data.isTouched = false;
            }
            if (document.activeElement && document.activeElement.matches(data.focusableElements) && document.activeElement !== targetEl && (e.pointerType === "mouse" || e.pointerType !== "mouse" && !targetEl.matches(data.focusableElements))) document.activeElement.blur();
            const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
            if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) e.preventDefault();
            if (params.freeMode && params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) swiper.freeMode.onTouchStart();
            swiper.emit("touchStart", e);
        }
        function onTouchMove(event) {
            const document = ssr_window_esm_getDocument();
            const swiper = this;
            const data = swiper.touchEventsData;
            const {params, touches, rtlTranslate: rtl, enabled} = swiper;
            if (!enabled) return;
            if (!params.simulateTouch && event.pointerType === "mouse") return;
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            if (e.type === "pointermove") {
                if (data.touchId !== null) return;
                const id = e.pointerId;
                if (id !== data.pointerId) return;
            }
            let targetTouch;
            if (e.type === "touchmove") {
                targetTouch = [ ...e.changedTouches ].find((t => t.identifier === data.touchId));
                if (!targetTouch || targetTouch.identifier !== data.touchId) return;
            } else targetTouch = e;
            if (!data.isTouched) {
                if (data.startMoving && data.isScrolling) swiper.emit("touchMoveOpposite", e);
                return;
            }
            const pageX = targetTouch.pageX;
            const pageY = targetTouch.pageY;
            if (e.preventedByNestedSwiper) {
                touches.startX = pageX;
                touches.startY = pageY;
                return;
            }
            if (!swiper.allowTouchMove) {
                if (!e.target.matches(data.focusableElements)) swiper.allowClick = false;
                if (data.isTouched) {
                    Object.assign(touches, {
                        startX: pageX,
                        startY: pageY,
                        currentX: pageX,
                        currentY: pageY
                    });
                    data.touchStartTime = utils_now();
                }
                return;
            }
            if (params.touchReleaseOnEdges && !params.loop) if (swiper.isVertical()) {
                if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
                    data.isTouched = false;
                    data.isMoved = false;
                    return;
                }
            } else if (rtl && (pageX > touches.startX && -swiper.translate <= swiper.maxTranslate() || pageX < touches.startX && -swiper.translate >= swiper.minTranslate())) return; else if (!rtl && (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate())) return;
            if (document.activeElement && document.activeElement.matches(data.focusableElements) && document.activeElement !== e.target && e.pointerType !== "mouse") document.activeElement.blur();
            if (document.activeElement) if (e.target === document.activeElement && e.target.matches(data.focusableElements)) {
                data.isMoved = true;
                swiper.allowClick = false;
                return;
            }
            if (data.allowTouchCallbacks) swiper.emit("touchMove", e);
            touches.previousX = touches.currentX;
            touches.previousY = touches.currentY;
            touches.currentX = pageX;
            touches.currentY = pageY;
            const diffX = touches.currentX - touches.startX;
            const diffY = touches.currentY - touches.startY;
            if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
            if (typeof data.isScrolling === "undefined") {
                let touchAngle;
                if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) data.isScrolling = false; else if (diffX * diffX + diffY * diffY >= 25) {
                    touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
                    data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
                }
            }
            if (data.isScrolling) swiper.emit("touchMoveOpposite", e);
            if (typeof data.startMoving === "undefined") if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) data.startMoving = true;
            if (data.isScrolling || e.type === "touchmove" && data.preventTouchMoveFromPointerMove) {
                data.isTouched = false;
                return;
            }
            if (!data.startMoving) return;
            swiper.allowClick = false;
            if (!params.cssMode && e.cancelable) e.preventDefault();
            if (params.touchMoveStopPropagation && !params.nested) e.stopPropagation();
            let diff = swiper.isHorizontal() ? diffX : diffY;
            let touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
            if (params.oneWayMovement) {
                diff = Math.abs(diff) * (rtl ? 1 : -1);
                touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
            }
            touches.diff = diff;
            diff *= params.touchRatio;
            if (rtl) {
                diff = -diff;
                touchesDiff = -touchesDiff;
            }
            const prevTouchesDirection = swiper.touchesDirection;
            swiper.swipeDirection = diff > 0 ? "prev" : "next";
            swiper.touchesDirection = touchesDiff > 0 ? "prev" : "next";
            const isLoop = swiper.params.loop && !params.cssMode;
            const allowLoopFix = swiper.touchesDirection === "next" && swiper.allowSlideNext || swiper.touchesDirection === "prev" && swiper.allowSlidePrev;
            if (!data.isMoved) {
                if (isLoop && allowLoopFix) swiper.loopFix({
                    direction: swiper.swipeDirection
                });
                data.startTranslate = swiper.getTranslate();
                swiper.setTransition(0);
                if (swiper.animating) {
                    const evt = new window.CustomEvent("transitionend", {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            bySwiperTouchMove: true
                        }
                    });
                    swiper.wrapperEl.dispatchEvent(evt);
                }
                data.allowMomentumBounce = false;
                if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) swiper.setGrabCursor(true);
                swiper.emit("sliderFirstMove", e);
            }
            let loopFixed;
            (new Date).getTime();
            if (params._loopSwapReset !== false && data.isMoved && data.allowThresholdMove && prevTouchesDirection !== swiper.touchesDirection && isLoop && allowLoopFix && Math.abs(diff) >= 1) {
                Object.assign(touches, {
                    startX: pageX,
                    startY: pageY,
                    currentX: pageX,
                    currentY: pageY,
                    startTranslate: data.currentTranslate
                });
                data.loopSwapReset = true;
                data.startTranslate = data.currentTranslate;
                return;
            }
            swiper.emit("sliderMove", e);
            data.isMoved = true;
            data.currentTranslate = diff + data.startTranslate;
            let disableParentSwiper = true;
            let resistanceRatio = params.resistanceRatio;
            if (params.touchReleaseOnEdges) resistanceRatio = 0;
            if (diff > 0) {
                if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.slidesSizesGrid[swiper.activeIndex + 1] - (params.slidesPerView !== "auto" && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.activeIndex + 1] + swiper.params.spaceBetween : 0) - swiper.params.spaceBetween : swiper.minTranslate())) swiper.loopFix({
                    direction: "prev",
                    setTranslate: true,
                    activeSlideIndex: 0
                });
                if (data.currentTranslate > swiper.minTranslate()) {
                    disableParentSwiper = false;
                    if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
                }
            } else if (diff < 0) {
                if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween + (params.slidesPerView !== "auto" && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween : 0) : swiper.maxTranslate())) swiper.loopFix({
                    direction: "next",
                    setTranslate: true,
                    activeSlideIndex: swiper.slides.length - (params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
                });
                if (data.currentTranslate < swiper.maxTranslate()) {
                    disableParentSwiper = false;
                    if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
                }
            }
            if (disableParentSwiper) e.preventedByNestedSwiper = true;
            if (!swiper.allowSlideNext && swiper.swipeDirection === "next" && data.currentTranslate < data.startTranslate) data.currentTranslate = data.startTranslate;
            if (!swiper.allowSlidePrev && swiper.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) data.currentTranslate = data.startTranslate;
            if (!swiper.allowSlidePrev && !swiper.allowSlideNext) data.currentTranslate = data.startTranslate;
            if (params.threshold > 0) if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
                if (!data.allowThresholdMove) {
                    data.allowThresholdMove = true;
                    touches.startX = touches.currentX;
                    touches.startY = touches.currentY;
                    data.currentTranslate = data.startTranslate;
                    touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
                    return;
                }
            } else {
                data.currentTranslate = data.startTranslate;
                return;
            }
            if (!params.followFinger || params.cssMode) return;
            if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            if (params.freeMode && params.freeMode.enabled && swiper.freeMode) swiper.freeMode.onTouchMove();
            swiper.updateProgress(data.currentTranslate);
            swiper.setTranslate(data.currentTranslate);
        }
        function onTouchEnd(event) {
            const swiper = this;
            const data = swiper.touchEventsData;
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            let targetTouch;
            const isTouchEvent = e.type === "touchend" || e.type === "touchcancel";
            if (!isTouchEvent) {
                if (data.touchId !== null) return;
                if (e.pointerId !== data.pointerId) return;
                targetTouch = e;
            } else {
                targetTouch = [ ...e.changedTouches ].find((t => t.identifier === data.touchId));
                if (!targetTouch || targetTouch.identifier !== data.touchId) return;
            }
            if ([ "pointercancel", "pointerout", "pointerleave", "contextmenu" ].includes(e.type)) {
                const proceed = [ "pointercancel", "contextmenu" ].includes(e.type) && (swiper.browser.isSafari || swiper.browser.isWebView);
                if (!proceed) return;
            }
            data.pointerId = null;
            data.touchId = null;
            const {params, touches, rtlTranslate: rtl, slidesGrid, enabled} = swiper;
            if (!enabled) return;
            if (!params.simulateTouch && e.pointerType === "mouse") return;
            if (data.allowTouchCallbacks) swiper.emit("touchEnd", e);
            data.allowTouchCallbacks = false;
            if (!data.isTouched) {
                if (data.isMoved && params.grabCursor) swiper.setGrabCursor(false);
                data.isMoved = false;
                data.startMoving = false;
                return;
            }
            if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) swiper.setGrabCursor(false);
            const touchEndTime = utils_now();
            const timeDiff = touchEndTime - data.touchStartTime;
            if (swiper.allowClick) {
                const pathTree = e.path || e.composedPath && e.composedPath();
                swiper.updateClickedSlide(pathTree && pathTree[0] || e.target, pathTree);
                swiper.emit("tap click", e);
                if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) swiper.emit("doubleTap doubleClick", e);
            }
            data.lastClickTime = utils_now();
            utils_nextTick((() => {
                if (!swiper.destroyed) swiper.allowClick = true;
            }));
            if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 && !data.loopSwapReset || data.currentTranslate === data.startTranslate && !data.loopSwapReset) {
                data.isTouched = false;
                data.isMoved = false;
                data.startMoving = false;
                return;
            }
            data.isTouched = false;
            data.isMoved = false;
            data.startMoving = false;
            let currentPos;
            if (params.followFinger) currentPos = rtl ? swiper.translate : -swiper.translate; else currentPos = -data.currentTranslate;
            if (params.cssMode) return;
            if (params.freeMode && params.freeMode.enabled) {
                swiper.freeMode.onTouchEnd({
                    currentPos
                });
                return;
            }
            const swipeToLast = currentPos >= -swiper.maxTranslate() && !swiper.params.loop;
            let stopIndex = 0;
            let groupSize = swiper.slidesSizesGrid[0];
            for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
                const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
                if (typeof slidesGrid[i + increment] !== "undefined") {
                    if (swipeToLast || currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
                        stopIndex = i;
                        groupSize = slidesGrid[i + increment] - slidesGrid[i];
                    }
                } else if (swipeToLast || currentPos >= slidesGrid[i]) {
                    stopIndex = i;
                    groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
                }
            }
            let rewindFirstIndex = null;
            let rewindLastIndex = null;
            if (params.rewind) if (swiper.isBeginning) rewindLastIndex = params.virtual && params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1; else if (swiper.isEnd) rewindFirstIndex = 0;
            const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
            const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
            if (timeDiff > params.longSwipesMs) {
                if (!params.longSwipes) {
                    swiper.slideTo(swiper.activeIndex);
                    return;
                }
                if (swiper.swipeDirection === "next") if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment); else swiper.slideTo(stopIndex);
                if (swiper.swipeDirection === "prev") if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + increment); else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) swiper.slideTo(rewindLastIndex); else swiper.slideTo(stopIndex);
            } else {
                if (!params.shortSwipes) {
                    swiper.slideTo(swiper.activeIndex);
                    return;
                }
                const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
                if (!isNavButtonTarget) {
                    if (swiper.swipeDirection === "next") swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
                    if (swiper.swipeDirection === "prev") swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
                } else if (e.target === swiper.navigation.nextEl) swiper.slideTo(stopIndex + increment); else swiper.slideTo(stopIndex);
            }
        }
        function onResize() {
            const swiper = this;
            const {params, el} = swiper;
            if (el && el.offsetWidth === 0) return;
            if (params.breakpoints) swiper.setBreakpoint();
            const {allowSlideNext, allowSlidePrev, snapGrid} = swiper;
            const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
            swiper.allowSlideNext = true;
            swiper.allowSlidePrev = true;
            swiper.updateSize();
            swiper.updateSlides();
            swiper.updateSlidesClasses();
            const isVirtualLoop = isVirtual && params.loop;
            if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) swiper.slideTo(swiper.slides.length - 1, 0, false, true); else if (swiper.params.loop && !isVirtual) swiper.slideToLoop(swiper.realIndex, 0, false, true); else swiper.slideTo(swiper.activeIndex, 0, false, true);
            if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
                clearTimeout(swiper.autoplay.resizeTimeout);
                swiper.autoplay.resizeTimeout = setTimeout((() => {
                    if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) swiper.autoplay.resume();
                }), 500);
            }
            swiper.allowSlidePrev = allowSlidePrev;
            swiper.allowSlideNext = allowSlideNext;
            if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
        }
        function onClick(e) {
            const swiper = this;
            if (!swiper.enabled) return;
            if (!swiper.allowClick) {
                if (swiper.params.preventClicks) e.preventDefault();
                if (swiper.params.preventClicksPropagation && swiper.animating) {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }
            }
        }
        function onScroll() {
            const swiper = this;
            const {wrapperEl, rtlTranslate, enabled} = swiper;
            if (!enabled) return;
            swiper.previousTranslate = swiper.translate;
            if (swiper.isHorizontal()) swiper.translate = -wrapperEl.scrollLeft; else swiper.translate = -wrapperEl.scrollTop;
            if (swiper.translate === 0) swiper.translate = 0;
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
            let newProgress;
            const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
            if (translatesDiff === 0) newProgress = 0; else newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
            if (newProgress !== swiper.progress) swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
            swiper.emit("setTranslate", swiper.translate, false);
        }
        function onLoad(e) {
            const swiper = this;
            processLazyPreloader(swiper, e.target);
            if (swiper.params.cssMode || swiper.params.slidesPerView !== "auto" && !swiper.params.autoHeight) return;
            swiper.update();
        }
        function onDocumentTouchStart() {
            const swiper = this;
            if (swiper.documentTouchHandlerProceeded) return;
            swiper.documentTouchHandlerProceeded = true;
            if (swiper.params.touchReleaseOnEdges) swiper.el.style.touchAction = "auto";
        }
        const events = (swiper, method) => {
            const document = ssr_window_esm_getDocument();
            const {params, el, wrapperEl, device} = swiper;
            const capture = !!params.nested;
            const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
            const swiperMethod = method;
            if (!el || typeof el === "string") return;
            document[domMethod]("touchstart", swiper.onDocumentTouchStart, {
                passive: false,
                capture
            });
            el[domMethod]("touchstart", swiper.onTouchStart, {
                passive: false
            });
            el[domMethod]("pointerdown", swiper.onTouchStart, {
                passive: false
            });
            document[domMethod]("touchmove", swiper.onTouchMove, {
                passive: false,
                capture
            });
            document[domMethod]("pointermove", swiper.onTouchMove, {
                passive: false,
                capture
            });
            document[domMethod]("touchend", swiper.onTouchEnd, {
                passive: true
            });
            document[domMethod]("pointerup", swiper.onTouchEnd, {
                passive: true
            });
            document[domMethod]("pointercancel", swiper.onTouchEnd, {
                passive: true
            });
            document[domMethod]("touchcancel", swiper.onTouchEnd, {
                passive: true
            });
            document[domMethod]("pointerout", swiper.onTouchEnd, {
                passive: true
            });
            document[domMethod]("pointerleave", swiper.onTouchEnd, {
                passive: true
            });
            document[domMethod]("contextmenu", swiper.onTouchEnd, {
                passive: true
            });
            if (params.preventClicks || params.preventClicksPropagation) el[domMethod]("click", swiper.onClick, true);
            if (params.cssMode) wrapperEl[domMethod]("scroll", swiper.onScroll);
            if (params.updateOnWindowResize) swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true); else swiper[swiperMethod]("observerUpdate", onResize, true);
            el[domMethod]("load", swiper.onLoad, {
                capture: true
            });
        };
        function attachEvents() {
            const swiper = this;
            const {params} = swiper;
            swiper.onTouchStart = onTouchStart.bind(swiper);
            swiper.onTouchMove = onTouchMove.bind(swiper);
            swiper.onTouchEnd = onTouchEnd.bind(swiper);
            swiper.onDocumentTouchStart = onDocumentTouchStart.bind(swiper);
            if (params.cssMode) swiper.onScroll = onScroll.bind(swiper);
            swiper.onClick = onClick.bind(swiper);
            swiper.onLoad = onLoad.bind(swiper);
            events(swiper, "on");
        }
        function detachEvents() {
            const swiper = this;
            events(swiper, "off");
        }
        var events$1 = {
            attachEvents,
            detachEvents
        };
        const isGridEnabled = (swiper, params) => swiper.grid && params.grid && params.grid.rows > 1;
        function setBreakpoint() {
            const swiper = this;
            const {realIndex, initialized, params, el} = swiper;
            const breakpoints = params.breakpoints;
            if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return;
            const document = ssr_window_esm_getDocument();
            const breakpointsBase = params.breakpointsBase === "window" || !params.breakpointsBase ? params.breakpointsBase : "container";
            const breakpointContainer = [ "window", "container" ].includes(params.breakpointsBase) || !params.breakpointsBase ? swiper.el : document.querySelector(params.breakpointsBase);
            const breakpoint = swiper.getBreakpoint(breakpoints, breakpointsBase, breakpointContainer);
            if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
            const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : void 0;
            const breakpointParams = breakpointOnlyParams || swiper.originalParams;
            const wasMultiRow = isGridEnabled(swiper, params);
            const isMultiRow = isGridEnabled(swiper, breakpointParams);
            const wasGrabCursor = swiper.params.grabCursor;
            const isGrabCursor = breakpointParams.grabCursor;
            const wasEnabled = params.enabled;
            if (wasMultiRow && !isMultiRow) {
                el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
                swiper.emitContainerClasses();
            } else if (!wasMultiRow && isMultiRow) {
                el.classList.add(`${params.containerModifierClass}grid`);
                if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") el.classList.add(`${params.containerModifierClass}grid-column`);
                swiper.emitContainerClasses();
            }
            if (wasGrabCursor && !isGrabCursor) swiper.unsetGrabCursor(); else if (!wasGrabCursor && isGrabCursor) swiper.setGrabCursor();
            [ "navigation", "pagination", "scrollbar" ].forEach((prop => {
                if (typeof breakpointParams[prop] === "undefined") return;
                const wasModuleEnabled = params[prop] && params[prop].enabled;
                const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
                if (wasModuleEnabled && !isModuleEnabled) swiper[prop].disable();
                if (!wasModuleEnabled && isModuleEnabled) swiper[prop].enable();
            }));
            const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
            const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
            const wasLoop = params.loop;
            if (directionChanged && initialized) swiper.changeDirection();
            utils_extend(swiper.params, breakpointParams);
            const isEnabled = swiper.params.enabled;
            const hasLoop = swiper.params.loop;
            Object.assign(swiper, {
                allowTouchMove: swiper.params.allowTouchMove,
                allowSlideNext: swiper.params.allowSlideNext,
                allowSlidePrev: swiper.params.allowSlidePrev
            });
            if (wasEnabled && !isEnabled) swiper.disable(); else if (!wasEnabled && isEnabled) swiper.enable();
            swiper.currentBreakpoint = breakpoint;
            swiper.emit("_beforeBreakpoint", breakpointParams);
            if (initialized) if (needsReLoop) {
                swiper.loopDestroy();
                swiper.loopCreate(realIndex);
                swiper.updateSlides();
            } else if (!wasLoop && hasLoop) {
                swiper.loopCreate(realIndex);
                swiper.updateSlides();
            } else if (wasLoop && !hasLoop) swiper.loopDestroy();
            swiper.emit("breakpoint", breakpointParams);
        }
        function getBreakpoint(breakpoints, base, containerEl) {
            if (base === void 0) base = "window";
            if (!breakpoints || base === "container" && !containerEl) return;
            let breakpoint = false;
            const window = ssr_window_esm_getWindow();
            const currentHeight = base === "window" ? window.innerHeight : containerEl.clientHeight;
            const points = Object.keys(breakpoints).map((point => {
                if (typeof point === "string" && point.indexOf("@") === 0) {
                    const minRatio = parseFloat(point.substr(1));
                    const value = currentHeight * minRatio;
                    return {
                        value,
                        point
                    };
                }
                return {
                    value: point,
                    point
                };
            }));
            points.sort(((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10)));
            for (let i = 0; i < points.length; i += 1) {
                const {point, value} = points[i];
                if (base === "window") {
                    if (window.matchMedia(`(min-width: ${value}px)`).matches) breakpoint = point;
                } else if (value <= containerEl.clientWidth) breakpoint = point;
            }
            return breakpoint || "max";
        }
        var breakpoints = {
            setBreakpoint,
            getBreakpoint
        };
        function prepareClasses(entries, prefix) {
            const resultClasses = [];
            entries.forEach((item => {
                if (typeof item === "object") Object.keys(item).forEach((classNames => {
                    if (item[classNames]) resultClasses.push(prefix + classNames);
                })); else if (typeof item === "string") resultClasses.push(prefix + item);
            }));
            return resultClasses;
        }
        function addClasses() {
            const swiper = this;
            const {classNames, params, rtl, el, device} = swiper;
            const suffixes = prepareClasses([ "initialized", params.direction, {
                "free-mode": swiper.params.freeMode && params.freeMode.enabled
            }, {
                autoheight: params.autoHeight
            }, {
                rtl
            }, {
                grid: params.grid && params.grid.rows > 1
            }, {
                "grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column"
            }, {
                android: device.android
            }, {
                ios: device.ios
            }, {
                "css-mode": params.cssMode
            }, {
                centered: params.cssMode && params.centeredSlides
            }, {
                "watch-progress": params.watchSlidesProgress
            } ], params.containerModifierClass);
            classNames.push(...suffixes);
            el.classList.add(...classNames);
            swiper.emitContainerClasses();
        }
        function swiper_core_removeClasses() {
            const swiper = this;
            const {el, classNames} = swiper;
            if (!el || typeof el === "string") return;
            el.classList.remove(...classNames);
            swiper.emitContainerClasses();
        }
        var classes = {
            addClasses,
            removeClasses: swiper_core_removeClasses
        };
        function checkOverflow() {
            const swiper = this;
            const {isLocked: wasLocked, params} = swiper;
            const {slidesOffsetBefore} = params;
            if (slidesOffsetBefore) {
                const lastSlideIndex = swiper.slides.length - 1;
                const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
                swiper.isLocked = swiper.size > lastSlideRightEdge;
            } else swiper.isLocked = swiper.snapGrid.length === 1;
            if (params.allowSlideNext === true) swiper.allowSlideNext = !swiper.isLocked;
            if (params.allowSlidePrev === true) swiper.allowSlidePrev = !swiper.isLocked;
            if (wasLocked && wasLocked !== swiper.isLocked) swiper.isEnd = false;
            if (wasLocked !== swiper.isLocked) swiper.emit(swiper.isLocked ? "lock" : "unlock");
        }
        var checkOverflow$1 = {
            checkOverflow
        };
        var defaults = {
            init: true,
            direction: "horizontal",
            oneWayMovement: false,
            swiperElementNodeName: "SWIPER-CONTAINER",
            touchEventsTarget: "wrapper",
            initialSlide: 0,
            speed: 300,
            cssMode: false,
            updateOnWindowResize: true,
            resizeObserver: true,
            nested: false,
            createElements: false,
            eventsPrefix: "swiper",
            enabled: true,
            focusableElements: "input, select, option, textarea, button, video, label",
            width: null,
            height: null,
            preventInteractionOnTransition: false,
            userAgent: null,
            url: null,
            edgeSwipeDetection: false,
            edgeSwipeThreshold: 20,
            autoHeight: false,
            setWrapperSize: false,
            virtualTranslate: false,
            effect: "slide",
            breakpoints: void 0,
            breakpointsBase: "window",
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerGroup: 1,
            slidesPerGroupSkip: 0,
            slidesPerGroupAuto: false,
            centeredSlides: false,
            centeredSlidesBounds: false,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: true,
            centerInsufficientSlides: false,
            watchOverflow: true,
            roundLengths: false,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: true,
            shortSwipes: true,
            longSwipes: true,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: true,
            allowTouchMove: true,
            threshold: 5,
            touchMoveStopPropagation: false,
            touchStartPreventDefault: true,
            touchStartForcePreventDefault: false,
            touchReleaseOnEdges: false,
            uniqueNavElements: true,
            resistance: true,
            resistanceRatio: .85,
            watchSlidesProgress: false,
            grabCursor: false,
            preventClicks: true,
            preventClicksPropagation: true,
            slideToClickedSlide: false,
            loop: false,
            loopAddBlankSlides: true,
            loopAdditionalSlides: 0,
            loopPreventsSliding: true,
            rewind: false,
            allowSlidePrev: true,
            allowSlideNext: true,
            swipeHandler: null,
            noSwiping: true,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: true,
            maxBackfaceHiddenSlides: 10,
            containerModifierClass: "swiper-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-blank",
            slideActiveClass: "swiper-slide-active",
            slideVisibleClass: "swiper-slide-visible",
            slideFullyVisibleClass: "swiper-slide-fully-visible",
            slideNextClass: "swiper-slide-next",
            slidePrevClass: "swiper-slide-prev",
            wrapperClass: "swiper-wrapper",
            lazyPreloaderClass: "swiper-lazy-preloader",
            lazyPreloadPrevNext: 0,
            runCallbacksOnInit: true,
            _emitClasses: false
        };
        function moduleExtendParams(params, allModulesParams) {
            return function extendParams(obj) {
                if (obj === void 0) obj = {};
                const moduleParamName = Object.keys(obj)[0];
                const moduleParams = obj[moduleParamName];
                if (typeof moduleParams !== "object" || moduleParams === null) {
                    utils_extend(allModulesParams, obj);
                    return;
                }
                if (params[moduleParamName] === true) params[moduleParamName] = {
                    enabled: true
                };
                if (moduleParamName === "navigation" && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].prevEl && !params[moduleParamName].nextEl) params[moduleParamName].auto = true;
                if ([ "pagination", "scrollbar" ].indexOf(moduleParamName) >= 0 && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].el) params[moduleParamName].auto = true;
                if (!(moduleParamName in params && "enabled" in moduleParams)) {
                    utils_extend(allModulesParams, obj);
                    return;
                }
                if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) params[moduleParamName].enabled = true;
                if (!params[moduleParamName]) params[moduleParamName] = {
                    enabled: false
                };
                utils_extend(allModulesParams, obj);
            };
        }
        const prototypes = {
            eventsEmitter,
            update,
            translate,
            transition,
            slide,
            loop,
            grabCursor,
            events: events$1,
            breakpoints,
            checkOverflow: checkOverflow$1,
            classes
        };
        const extendedDefaults = {};
        class swiper_core_Swiper {
            constructor() {
                let el;
                let params;
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") params = args[0]; else [el, params] = args;
                if (!params) params = {};
                params = utils_extend({}, params);
                if (el && !params.el) params.el = el;
                const document = ssr_window_esm_getDocument();
                if (params.el && typeof params.el === "string" && document.querySelectorAll(params.el).length > 1) {
                    const swipers = [];
                    document.querySelectorAll(params.el).forEach((containerEl => {
                        const newParams = utils_extend({}, params, {
                            el: containerEl
                        });
                        swipers.push(new swiper_core_Swiper(newParams));
                    }));
                    return swipers;
                }
                const swiper = this;
                swiper.__swiper__ = true;
                swiper.support = getSupport();
                swiper.device = getDevice({
                    userAgent: params.userAgent
                });
                swiper.browser = getBrowser();
                swiper.eventsListeners = {};
                swiper.eventsAnyListeners = [];
                swiper.modules = [ ...swiper.__modules__ ];
                if (params.modules && Array.isArray(params.modules)) swiper.modules.push(...params.modules);
                const allModulesParams = {};
                swiper.modules.forEach((mod => {
                    mod({
                        params,
                        swiper,
                        extendParams: moduleExtendParams(params, allModulesParams),
                        on: swiper.on.bind(swiper),
                        once: swiper.once.bind(swiper),
                        off: swiper.off.bind(swiper),
                        emit: swiper.emit.bind(swiper)
                    });
                }));
                const swiperParams = utils_extend({}, defaults, allModulesParams);
                swiper.params = utils_extend({}, swiperParams, extendedDefaults, params);
                swiper.originalParams = utils_extend({}, swiper.params);
                swiper.passedParams = utils_extend({}, params);
                if (swiper.params && swiper.params.on) Object.keys(swiper.params.on).forEach((eventName => {
                    swiper.on(eventName, swiper.params.on[eventName]);
                }));
                if (swiper.params && swiper.params.onAny) swiper.onAny(swiper.params.onAny);
                Object.assign(swiper, {
                    enabled: swiper.params.enabled,
                    el,
                    classNames: [],
                    slides: [],
                    slidesGrid: [],
                    snapGrid: [],
                    slidesSizesGrid: [],
                    isHorizontal() {
                        return swiper.params.direction === "horizontal";
                    },
                    isVertical() {
                        return swiper.params.direction === "vertical";
                    },
                    activeIndex: 0,
                    realIndex: 0,
                    isBeginning: true,
                    isEnd: false,
                    translate: 0,
                    previousTranslate: 0,
                    progress: 0,
                    velocity: 0,
                    animating: false,
                    cssOverflowAdjustment() {
                        return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
                    },
                    allowSlideNext: swiper.params.allowSlideNext,
                    allowSlidePrev: swiper.params.allowSlidePrev,
                    touchEventsData: {
                        isTouched: void 0,
                        isMoved: void 0,
                        allowTouchCallbacks: void 0,
                        touchStartTime: void 0,
                        isScrolling: void 0,
                        currentTranslate: void 0,
                        startTranslate: void 0,
                        allowThresholdMove: void 0,
                        focusableElements: swiper.params.focusableElements,
                        lastClickTime: 0,
                        clickTimeout: void 0,
                        velocities: [],
                        allowMomentumBounce: void 0,
                        startMoving: void 0,
                        pointerId: null,
                        touchId: null
                    },
                    allowClick: true,
                    allowTouchMove: swiper.params.allowTouchMove,
                    touches: {
                        startX: 0,
                        startY: 0,
                        currentX: 0,
                        currentY: 0,
                        diff: 0
                    },
                    imagesToLoad: [],
                    imagesLoaded: 0
                });
                swiper.emit("_swiper");
                if (swiper.params.init) swiper.init();
                return swiper;
            }
            getDirectionLabel(property) {
                if (this.isHorizontal()) return property;
                return {
                    width: "height",
                    "margin-top": "margin-left",
                    "margin-bottom ": "margin-right",
                    "margin-left": "margin-top",
                    "margin-right": "margin-bottom",
                    "padding-left": "padding-top",
                    "padding-right": "padding-bottom",
                    marginRight: "marginBottom"
                }[property];
            }
            getSlideIndex(slideEl) {
                const {slidesEl, params} = this;
                const slides = utils_elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
                const firstSlideIndex = utils_elementIndex(slides[0]);
                return utils_elementIndex(slideEl) - firstSlideIndex;
            }
            getSlideIndexByData(index) {
                return this.getSlideIndex(this.slides.find((slideEl => slideEl.getAttribute("data-swiper-slide-index") * 1 === index)));
            }
            recalcSlides() {
                const swiper = this;
                const {slidesEl, params} = swiper;
                swiper.slides = utils_elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
            }
            enable() {
                const swiper = this;
                if (swiper.enabled) return;
                swiper.enabled = true;
                if (swiper.params.grabCursor) swiper.setGrabCursor();
                swiper.emit("enable");
            }
            disable() {
                const swiper = this;
                if (!swiper.enabled) return;
                swiper.enabled = false;
                if (swiper.params.grabCursor) swiper.unsetGrabCursor();
                swiper.emit("disable");
            }
            setProgress(progress, speed) {
                const swiper = this;
                progress = Math.min(Math.max(progress, 0), 1);
                const min = swiper.minTranslate();
                const max = swiper.maxTranslate();
                const current = (max - min) * progress + min;
                swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            emitContainerClasses() {
                const swiper = this;
                if (!swiper.params._emitClasses || !swiper.el) return;
                const cls = swiper.el.className.split(" ").filter((className => className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0));
                swiper.emit("_containerClasses", cls.join(" "));
            }
            getSlideClasses(slideEl) {
                const swiper = this;
                if (swiper.destroyed) return "";
                return slideEl.className.split(" ").filter((className => className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0)).join(" ");
            }
            emitSlidesClasses() {
                const swiper = this;
                if (!swiper.params._emitClasses || !swiper.el) return;
                const updates = [];
                swiper.slides.forEach((slideEl => {
                    const classNames = swiper.getSlideClasses(slideEl);
                    updates.push({
                        slideEl,
                        classNames
                    });
                    swiper.emit("_slideClass", slideEl, classNames);
                }));
                swiper.emit("_slideClasses", updates);
            }
            slidesPerViewDynamic(view, exact) {
                if (view === void 0) view = "current";
                if (exact === void 0) exact = false;
                const swiper = this;
                const {params, slides, slidesGrid, slidesSizesGrid, size: swiperSize, activeIndex} = swiper;
                let spv = 1;
                if (typeof params.slidesPerView === "number") return params.slidesPerView;
                if (params.centeredSlides) {
                    let slideSize = slides[activeIndex] ? Math.ceil(slides[activeIndex].swiperSlideSize) : 0;
                    let breakLoop;
                    for (let i = activeIndex + 1; i < slides.length; i += 1) if (slides[i] && !breakLoop) {
                        slideSize += Math.ceil(slides[i].swiperSlideSize);
                        spv += 1;
                        if (slideSize > swiperSize) breakLoop = true;
                    }
                    for (let i = activeIndex - 1; i >= 0; i -= 1) if (slides[i] && !breakLoop) {
                        slideSize += slides[i].swiperSlideSize;
                        spv += 1;
                        if (slideSize > swiperSize) breakLoop = true;
                    }
                } else if (view === "current") for (let i = activeIndex + 1; i < slides.length; i += 1) {
                    const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
                    if (slideInView) spv += 1;
                } else for (let i = activeIndex - 1; i >= 0; i -= 1) {
                    const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
                    if (slideInView) spv += 1;
                }
                return spv;
            }
            update() {
                const swiper = this;
                if (!swiper || swiper.destroyed) return;
                const {snapGrid, params} = swiper;
                if (params.breakpoints) swiper.setBreakpoint();
                [ ...swiper.el.querySelectorAll('[loading="lazy"]') ].forEach((imageEl => {
                    if (imageEl.complete) processLazyPreloader(swiper, imageEl);
                }));
                swiper.updateSize();
                swiper.updateSlides();
                swiper.updateProgress();
                swiper.updateSlidesClasses();
                function setTranslate() {
                    const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
                    const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
                    swiper.setTranslate(newTranslate);
                    swiper.updateActiveIndex();
                    swiper.updateSlidesClasses();
                }
                let translated;
                if (params.freeMode && params.freeMode.enabled && !params.cssMode) {
                    setTranslate();
                    if (params.autoHeight) swiper.updateAutoHeight();
                } else {
                    if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !params.centeredSlides) {
                        const slides = swiper.virtual && params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
                        translated = swiper.slideTo(slides.length - 1, 0, false, true);
                    } else translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
                    if (!translated) setTranslate();
                }
                if (params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
                swiper.emit("update");
            }
            changeDirection(newDirection, needUpdate) {
                if (needUpdate === void 0) needUpdate = true;
                const swiper = this;
                const currentDirection = swiper.params.direction;
                if (!newDirection) newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
                if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") return swiper;
                swiper.el.classList.remove(`${swiper.params.containerModifierClass}${currentDirection}`);
                swiper.el.classList.add(`${swiper.params.containerModifierClass}${newDirection}`);
                swiper.emitContainerClasses();
                swiper.params.direction = newDirection;
                swiper.slides.forEach((slideEl => {
                    if (newDirection === "vertical") slideEl.style.width = ""; else slideEl.style.height = "";
                }));
                swiper.emit("changeDirection");
                if (needUpdate) swiper.update();
                return swiper;
            }
            changeLanguageDirection(direction) {
                const swiper = this;
                if (swiper.rtl && direction === "rtl" || !swiper.rtl && direction === "ltr") return;
                swiper.rtl = direction === "rtl";
                swiper.rtlTranslate = swiper.params.direction === "horizontal" && swiper.rtl;
                if (swiper.rtl) {
                    swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`);
                    swiper.el.dir = "rtl";
                } else {
                    swiper.el.classList.remove(`${swiper.params.containerModifierClass}rtl`);
                    swiper.el.dir = "ltr";
                }
                swiper.update();
            }
            mount(element) {
                const swiper = this;
                if (swiper.mounted) return true;
                let el = element || swiper.params.el;
                if (typeof el === "string") el = document.querySelector(el);
                if (!el) return false;
                el.swiper = swiper;
                if (el.parentNode && el.parentNode.host && el.parentNode.host.nodeName === swiper.params.swiperElementNodeName.toUpperCase()) swiper.isElement = true;
                const getWrapperSelector = () => `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
                const getWrapper = () => {
                    if (el && el.shadowRoot && el.shadowRoot.querySelector) {
                        const res = el.shadowRoot.querySelector(getWrapperSelector());
                        return res;
                    }
                    return utils_elementChildren(el, getWrapperSelector())[0];
                };
                let wrapperEl = getWrapper();
                if (!wrapperEl && swiper.params.createElements) {
                    wrapperEl = utils_createElement("div", swiper.params.wrapperClass);
                    el.append(wrapperEl);
                    utils_elementChildren(el, `.${swiper.params.slideClass}`).forEach((slideEl => {
                        wrapperEl.append(slideEl);
                    }));
                }
                Object.assign(swiper, {
                    el,
                    wrapperEl,
                    slidesEl: swiper.isElement && !el.parentNode.host.slideSlots ? el.parentNode.host : wrapperEl,
                    hostEl: swiper.isElement ? el.parentNode.host : el,
                    mounted: true,
                    rtl: el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl",
                    rtlTranslate: swiper.params.direction === "horizontal" && (el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl"),
                    wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box"
                });
                return true;
            }
            init(el) {
                const swiper = this;
                if (swiper.initialized) return swiper;
                const mounted = swiper.mount(el);
                if (mounted === false) return swiper;
                swiper.emit("beforeInit");
                if (swiper.params.breakpoints) swiper.setBreakpoint();
                swiper.addClasses();
                swiper.updateSize();
                swiper.updateSlides();
                if (swiper.params.watchOverflow) swiper.checkOverflow();
                if (swiper.params.grabCursor && swiper.enabled) swiper.setGrabCursor();
                if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true); else swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
                if (swiper.params.loop) swiper.loopCreate(void 0, true);
                swiper.attachEvents();
                const lazyElements = [ ...swiper.el.querySelectorAll('[loading="lazy"]') ];
                if (swiper.isElement) lazyElements.push(...swiper.hostEl.querySelectorAll('[loading="lazy"]'));
                lazyElements.forEach((imageEl => {
                    if (imageEl.complete) processLazyPreloader(swiper, imageEl); else imageEl.addEventListener("load", (e => {
                        processLazyPreloader(swiper, e.target);
                    }));
                }));
                preload(swiper);
                swiper.initialized = true;
                preload(swiper);
                swiper.emit("init");
                swiper.emit("afterInit");
                return swiper;
            }
            destroy(deleteInstance, cleanStyles) {
                if (deleteInstance === void 0) deleteInstance = true;
                if (cleanStyles === void 0) cleanStyles = true;
                const swiper = this;
                const {params, el, wrapperEl, slides} = swiper;
                if (typeof swiper.params === "undefined" || swiper.destroyed) return null;
                swiper.emit("beforeDestroy");
                swiper.initialized = false;
                swiper.detachEvents();
                if (params.loop) swiper.loopDestroy();
                if (cleanStyles) {
                    swiper.removeClasses();
                    if (el && typeof el !== "string") el.removeAttribute("style");
                    if (wrapperEl) wrapperEl.removeAttribute("style");
                    if (slides && slides.length) slides.forEach((slideEl => {
                        slideEl.classList.remove(params.slideVisibleClass, params.slideFullyVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
                        slideEl.removeAttribute("style");
                        slideEl.removeAttribute("data-swiper-slide-index");
                    }));
                }
                swiper.emit("destroy");
                Object.keys(swiper.eventsListeners).forEach((eventName => {
                    swiper.off(eventName);
                }));
                if (deleteInstance !== false) {
                    if (swiper.el && typeof swiper.el !== "string") swiper.el.swiper = null;
                    deleteProps(swiper);
                }
                swiper.destroyed = true;
                return null;
            }
            static extendDefaults(newDefaults) {
                utils_extend(extendedDefaults, newDefaults);
            }
            static get extendedDefaults() {
                return extendedDefaults;
            }
            static get defaults() {
                return defaults;
            }
            static installModule(mod) {
                if (!swiper_core_Swiper.prototype.__modules__) swiper_core_Swiper.prototype.__modules__ = [];
                const modules = swiper_core_Swiper.prototype.__modules__;
                if (typeof mod === "function" && modules.indexOf(mod) < 0) modules.push(mod);
            }
            static use(module) {
                if (Array.isArray(module)) {
                    module.forEach((m => swiper_core_Swiper.installModule(m)));
                    return swiper_core_Swiper;
                }
                swiper_core_Swiper.installModule(module);
                return swiper_core_Swiper;
            }
        }
        Object.keys(prototypes).forEach((prototypeGroup => {
            Object.keys(prototypes[prototypeGroup]).forEach((protoMethod => {
                swiper_core_Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
            }));
        }));
        swiper_core_Swiper.use([ Resize, Observer ]);
        function create_element_if_not_defined_createElementIfNotDefined(swiper, originalParams, params, checkProps) {
            if (swiper.params.createElements) Object.keys(checkProps).forEach((key => {
                if (!params[key] && params.auto === true) {
                    let element = utils_elementChildren(swiper.el, `.${checkProps[key]}`)[0];
                    if (!element) {
                        element = utils_createElement("div", checkProps[key]);
                        element.className = checkProps[key];
                        swiper.el.append(element);
                    }
                    params[key] = element;
                    originalParams[key] = element;
                }
            }));
            return params;
        }
        function Navigation(_ref) {
            let {swiper, extendParams, on, emit} = _ref;
            extendParams({
                navigation: {
                    nextEl: null,
                    prevEl: null,
                    hideOnClick: false,
                    disabledClass: "swiper-button-disabled",
                    hiddenClass: "swiper-button-hidden",
                    lockClass: "swiper-button-lock",
                    navigationDisabledClass: "swiper-navigation-disabled"
                }
            });
            swiper.navigation = {
                nextEl: null,
                prevEl: null
            };
            function getEl(el) {
                let res;
                if (el && typeof el === "string" && swiper.isElement) {
                    res = swiper.el.querySelector(el) || swiper.hostEl.querySelector(el);
                    if (res) return res;
                }
                if (el) {
                    if (typeof el === "string") res = [ ...document.querySelectorAll(el) ];
                    if (swiper.params.uniqueNavElements && typeof el === "string" && res && res.length > 1 && swiper.el.querySelectorAll(el).length === 1) res = swiper.el.querySelector(el); else if (res && res.length === 1) res = res[0];
                }
                if (el && !res) return el;
                return res;
            }
            function toggleEl(el, disabled) {
                const params = swiper.params.navigation;
                el = utils_makeElementsArray(el);
                el.forEach((subEl => {
                    if (subEl) {
                        subEl.classList[disabled ? "add" : "remove"](...params.disabledClass.split(" "));
                        if (subEl.tagName === "BUTTON") subEl.disabled = disabled;
                        if (swiper.params.watchOverflow && swiper.enabled) subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
                    }
                }));
            }
            function update() {
                const {nextEl, prevEl} = swiper.navigation;
                if (swiper.params.loop) {
                    toggleEl(prevEl, false);
                    toggleEl(nextEl, false);
                    return;
                }
                toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
                toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
            }
            function onPrevClick(e) {
                e.preventDefault();
                if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
                swiper.slidePrev();
                emit("navigationPrev");
            }
            function onNextClick(e) {
                e.preventDefault();
                if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
                swiper.slideNext();
                emit("navigationNext");
            }
            function init() {
                const params = swiper.params.navigation;
                swiper.params.navigation = create_element_if_not_defined_createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
                    nextEl: "swiper-button-next",
                    prevEl: "swiper-button-prev"
                });
                if (!(params.nextEl || params.prevEl)) return;
                let nextEl = getEl(params.nextEl);
                let prevEl = getEl(params.prevEl);
                Object.assign(swiper.navigation, {
                    nextEl,
                    prevEl
                });
                nextEl = utils_makeElementsArray(nextEl);
                prevEl = utils_makeElementsArray(prevEl);
                const initButton = (el, dir) => {
                    if (el) el.addEventListener("click", dir === "next" ? onNextClick : onPrevClick);
                    if (!swiper.enabled && el) el.classList.add(...params.lockClass.split(" "));
                };
                nextEl.forEach((el => initButton(el, "next")));
                prevEl.forEach((el => initButton(el, "prev")));
            }
            function destroy() {
                let {nextEl, prevEl} = swiper.navigation;
                nextEl = utils_makeElementsArray(nextEl);
                prevEl = utils_makeElementsArray(prevEl);
                const destroyButton = (el, dir) => {
                    el.removeEventListener("click", dir === "next" ? onNextClick : onPrevClick);
                    el.classList.remove(...swiper.params.navigation.disabledClass.split(" "));
                };
                nextEl.forEach((el => destroyButton(el, "next")));
                prevEl.forEach((el => destroyButton(el, "prev")));
            }
            on("init", (() => {
                if (swiper.params.navigation.enabled === false) disable(); else {
                    init();
                    update();
                }
            }));
            on("toEdge fromEdge lock unlock", (() => {
                update();
            }));
            on("destroy", (() => {
                destroy();
            }));
            on("enable disable", (() => {
                let {nextEl, prevEl} = swiper.navigation;
                nextEl = utils_makeElementsArray(nextEl);
                prevEl = utils_makeElementsArray(prevEl);
                if (swiper.enabled) {
                    update();
                    return;
                }
                [ ...nextEl, ...prevEl ].filter((el => !!el)).forEach((el => el.classList.add(swiper.params.navigation.lockClass)));
            }));
            on("click", ((_s, e) => {
                let {nextEl, prevEl} = swiper.navigation;
                nextEl = utils_makeElementsArray(nextEl);
                prevEl = utils_makeElementsArray(prevEl);
                const targetEl = e.target;
                let targetIsButton = prevEl.includes(targetEl) || nextEl.includes(targetEl);
                if (swiper.isElement && !targetIsButton) {
                    const path = e.path || e.composedPath && e.composedPath();
                    if (path) targetIsButton = path.find((pathEl => nextEl.includes(pathEl) || prevEl.includes(pathEl)));
                }
                if (swiper.params.navigation.hideOnClick && !targetIsButton) {
                    if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
                    let isHidden;
                    if (nextEl.length) isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass); else if (prevEl.length) isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass);
                    if (isHidden === true) emit("navigationShow"); else emit("navigationHide");
                    [ ...nextEl, ...prevEl ].filter((el => !!el)).forEach((el => el.classList.toggle(swiper.params.navigation.hiddenClass)));
                }
            }));
            const enable = () => {
                swiper.el.classList.remove(...swiper.params.navigation.navigationDisabledClass.split(" "));
                init();
                update();
            };
            const disable = () => {
                swiper.el.classList.add(...swiper.params.navigation.navigationDisabledClass.split(" "));
                destroy();
            };
            Object.assign(swiper.navigation, {
                enable,
                disable,
                update,
                init,
                destroy
            });
        }
        function classes_to_selector_classesToSelector(classes) {
            if (classes === void 0) classes = "";
            return `.${classes.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`;
        }
        function Pagination(_ref) {
            let {swiper, extendParams, on, emit} = _ref;
            const pfx = "swiper-pagination";
            extendParams({
                pagination: {
                    el: null,
                    bulletElement: "span",
                    clickable: false,
                    hideOnClick: false,
                    renderBullet: null,
                    renderProgressbar: null,
                    renderFraction: null,
                    renderCustom: null,
                    progressbarOpposite: false,
                    type: "bullets",
                    dynamicBullets: false,
                    dynamicMainBullets: 1,
                    formatFractionCurrent: number => number,
                    formatFractionTotal: number => number,
                    bulletClass: `${pfx}-bullet`,
                    bulletActiveClass: `${pfx}-bullet-active`,
                    modifierClass: `${pfx}-`,
                    currentClass: `${pfx}-current`,
                    totalClass: `${pfx}-total`,
                    hiddenClass: `${pfx}-hidden`,
                    progressbarFillClass: `${pfx}-progressbar-fill`,
                    progressbarOppositeClass: `${pfx}-progressbar-opposite`,
                    clickableClass: `${pfx}-clickable`,
                    lockClass: `${pfx}-lock`,
                    horizontalClass: `${pfx}-horizontal`,
                    verticalClass: `${pfx}-vertical`,
                    paginationDisabledClass: `${pfx}-disabled`
                }
            });
            swiper.pagination = {
                el: null,
                bullets: []
            };
            let bulletSize;
            let dynamicBulletIndex = 0;
            function isPaginationDisabled() {
                return !swiper.params.pagination.el || !swiper.pagination.el || Array.isArray(swiper.pagination.el) && swiper.pagination.el.length === 0;
            }
            function setSideBullets(bulletEl, position) {
                const {bulletActiveClass} = swiper.params.pagination;
                if (!bulletEl) return;
                bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
                if (bulletEl) {
                    bulletEl.classList.add(`${bulletActiveClass}-${position}`);
                    bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
                    if (bulletEl) bulletEl.classList.add(`${bulletActiveClass}-${position}-${position}`);
                }
            }
            function getMoveDirection(prevIndex, nextIndex, length) {
                prevIndex %= length;
                nextIndex %= length;
                if (nextIndex === prevIndex + 1) return "next"; else if (nextIndex === prevIndex - 1) return "previous";
                return;
            }
            function onBulletClick(e) {
                const bulletEl = e.target.closest(classes_to_selector_classesToSelector(swiper.params.pagination.bulletClass));
                if (!bulletEl) return;
                e.preventDefault();
                const index = utils_elementIndex(bulletEl) * swiper.params.slidesPerGroup;
                if (swiper.params.loop) {
                    if (swiper.realIndex === index) return;
                    const moveDirection = getMoveDirection(swiper.realIndex, index, swiper.slides.length);
                    if (moveDirection === "next") swiper.slideNext(); else if (moveDirection === "previous") swiper.slidePrev(); else swiper.slideToLoop(index);
                } else swiper.slideTo(index);
            }
            function update() {
                const rtl = swiper.rtl;
                const params = swiper.params.pagination;
                if (isPaginationDisabled()) return;
                let el = swiper.pagination.el;
                el = utils_makeElementsArray(el);
                let current;
                let previousIndex;
                const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
                const total = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
                if (swiper.params.loop) {
                    previousIndex = swiper.previousRealIndex || 0;
                    current = swiper.params.slidesPerGroup > 1 ? Math.floor(swiper.realIndex / swiper.params.slidesPerGroup) : swiper.realIndex;
                } else if (typeof swiper.snapIndex !== "undefined") {
                    current = swiper.snapIndex;
                    previousIndex = swiper.previousSnapIndex;
                } else {
                    previousIndex = swiper.previousIndex || 0;
                    current = swiper.activeIndex || 0;
                }
                if (params.type === "bullets" && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
                    const bullets = swiper.pagination.bullets;
                    let firstIndex;
                    let lastIndex;
                    let midIndex;
                    if (params.dynamicBullets) {
                        bulletSize = elementOuterSize(bullets[0], swiper.isHorizontal() ? "width" : "height", true);
                        el.forEach((subEl => {
                            subEl.style[swiper.isHorizontal() ? "width" : "height"] = `${bulletSize * (params.dynamicMainBullets + 4)}px`;
                        }));
                        if (params.dynamicMainBullets > 1 && previousIndex !== void 0) {
                            dynamicBulletIndex += current - (previousIndex || 0);
                            if (dynamicBulletIndex > params.dynamicMainBullets - 1) dynamicBulletIndex = params.dynamicMainBullets - 1; else if (dynamicBulletIndex < 0) dynamicBulletIndex = 0;
                        }
                        firstIndex = Math.max(current - dynamicBulletIndex, 0);
                        lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
                        midIndex = (lastIndex + firstIndex) / 2;
                    }
                    bullets.forEach((bulletEl => {
                        const classesToRemove = [ ...[ "", "-next", "-next-next", "-prev", "-prev-prev", "-main" ].map((suffix => `${params.bulletActiveClass}${suffix}`)) ].map((s => typeof s === "string" && s.includes(" ") ? s.split(" ") : s)).flat();
                        bulletEl.classList.remove(...classesToRemove);
                    }));
                    if (el.length > 1) bullets.forEach((bullet => {
                        const bulletIndex = utils_elementIndex(bullet);
                        if (bulletIndex === current) bullet.classList.add(...params.bulletActiveClass.split(" ")); else if (swiper.isElement) bullet.setAttribute("part", "bullet");
                        if (params.dynamicBullets) {
                            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) bullet.classList.add(...`${params.bulletActiveClass}-main`.split(" "));
                            if (bulletIndex === firstIndex) setSideBullets(bullet, "prev");
                            if (bulletIndex === lastIndex) setSideBullets(bullet, "next");
                        }
                    })); else {
                        const bullet = bullets[current];
                        if (bullet) bullet.classList.add(...params.bulletActiveClass.split(" "));
                        if (swiper.isElement) bullets.forEach(((bulletEl, bulletIndex) => {
                            bulletEl.setAttribute("part", bulletIndex === current ? "bullet-active" : "bullet");
                        }));
                        if (params.dynamicBullets) {
                            const firstDisplayedBullet = bullets[firstIndex];
                            const lastDisplayedBullet = bullets[lastIndex];
                            for (let i = firstIndex; i <= lastIndex; i += 1) if (bullets[i]) bullets[i].classList.add(...`${params.bulletActiveClass}-main`.split(" "));
                            setSideBullets(firstDisplayedBullet, "prev");
                            setSideBullets(lastDisplayedBullet, "next");
                        }
                    }
                    if (params.dynamicBullets) {
                        const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
                        const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
                        const offsetProp = rtl ? "right" : "left";
                        bullets.forEach((bullet => {
                            bullet.style[swiper.isHorizontal() ? offsetProp : "top"] = `${bulletsOffset}px`;
                        }));
                    }
                }
                el.forEach(((subEl, subElIndex) => {
                    if (params.type === "fraction") {
                        subEl.querySelectorAll(classes_to_selector_classesToSelector(params.currentClass)).forEach((fractionEl => {
                            fractionEl.textContent = params.formatFractionCurrent(current + 1);
                        }));
                        subEl.querySelectorAll(classes_to_selector_classesToSelector(params.totalClass)).forEach((totalEl => {
                            totalEl.textContent = params.formatFractionTotal(total);
                        }));
                    }
                    if (params.type === "progressbar") {
                        let progressbarDirection;
                        if (params.progressbarOpposite) progressbarDirection = swiper.isHorizontal() ? "vertical" : "horizontal"; else progressbarDirection = swiper.isHorizontal() ? "horizontal" : "vertical";
                        const scale = (current + 1) / total;
                        let scaleX = 1;
                        let scaleY = 1;
                        if (progressbarDirection === "horizontal") scaleX = scale; else scaleY = scale;
                        subEl.querySelectorAll(classes_to_selector_classesToSelector(params.progressbarFillClass)).forEach((progressEl => {
                            progressEl.style.transform = `translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`;
                            progressEl.style.transitionDuration = `${swiper.params.speed}ms`;
                        }));
                    }
                    if (params.type === "custom" && params.renderCustom) {
                        subEl.innerHTML = params.renderCustom(swiper, current + 1, total);
                        if (subElIndex === 0) emit("paginationRender", subEl);
                    } else {
                        if (subElIndex === 0) emit("paginationRender", subEl);
                        emit("paginationUpdate", subEl);
                    }
                    if (swiper.params.watchOverflow && swiper.enabled) subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
                }));
            }
            function render() {
                const params = swiper.params.pagination;
                if (isPaginationDisabled()) return;
                const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.grid && swiper.params.grid.rows > 1 ? swiper.slides.length / Math.ceil(swiper.params.grid.rows) : swiper.slides.length;
                let el = swiper.pagination.el;
                el = utils_makeElementsArray(el);
                let paginationHTML = "";
                if (params.type === "bullets") {
                    let numberOfBullets = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
                    if (swiper.params.freeMode && swiper.params.freeMode.enabled && numberOfBullets > slidesLength) numberOfBullets = slidesLength;
                    for (let i = 0; i < numberOfBullets; i += 1) if (params.renderBullet) paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass); else paginationHTML += `<${params.bulletElement} ${swiper.isElement ? 'part="bullet"' : ""} class="${params.bulletClass}"></${params.bulletElement}>`;
                }
                if (params.type === "fraction") if (params.renderFraction) paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass); else paginationHTML = `<span class="${params.currentClass}"></span>` + " / " + `<span class="${params.totalClass}"></span>`;
                if (params.type === "progressbar") if (params.renderProgressbar) paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass); else paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
                swiper.pagination.bullets = [];
                el.forEach((subEl => {
                    if (params.type !== "custom") subEl.innerHTML = paginationHTML || "";
                    if (params.type === "bullets") swiper.pagination.bullets.push(...subEl.querySelectorAll(classes_to_selector_classesToSelector(params.bulletClass)));
                }));
                if (params.type !== "custom") emit("paginationRender", el[0]);
            }
            function init() {
                swiper.params.pagination = create_element_if_not_defined_createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
                    el: "swiper-pagination"
                });
                const params = swiper.params.pagination;
                if (!params.el) return;
                let el;
                if (typeof params.el === "string" && swiper.isElement) el = swiper.el.querySelector(params.el);
                if (!el && typeof params.el === "string") el = [ ...document.querySelectorAll(params.el) ];
                if (!el) el = params.el;
                if (!el || el.length === 0) return;
                if (swiper.params.uniqueNavElements && typeof params.el === "string" && Array.isArray(el) && el.length > 1) {
                    el = [ ...swiper.el.querySelectorAll(params.el) ];
                    if (el.length > 1) el = el.find((subEl => {
                        if (utils_elementParents(subEl, ".swiper")[0] !== swiper.el) return false;
                        return true;
                    }));
                }
                if (Array.isArray(el) && el.length === 1) el = el[0];
                Object.assign(swiper.pagination, {
                    el
                });
                el = utils_makeElementsArray(el);
                el.forEach((subEl => {
                    if (params.type === "bullets" && params.clickable) subEl.classList.add(...(params.clickableClass || "").split(" "));
                    subEl.classList.add(params.modifierClass + params.type);
                    subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
                    if (params.type === "bullets" && params.dynamicBullets) {
                        subEl.classList.add(`${params.modifierClass}${params.type}-dynamic`);
                        dynamicBulletIndex = 0;
                        if (params.dynamicMainBullets < 1) params.dynamicMainBullets = 1;
                    }
                    if (params.type === "progressbar" && params.progressbarOpposite) subEl.classList.add(params.progressbarOppositeClass);
                    if (params.clickable) subEl.addEventListener("click", onBulletClick);
                    if (!swiper.enabled) subEl.classList.add(params.lockClass);
                }));
            }
            function destroy() {
                const params = swiper.params.pagination;
                if (isPaginationDisabled()) return;
                let el = swiper.pagination.el;
                if (el) {
                    el = utils_makeElementsArray(el);
                    el.forEach((subEl => {
                        subEl.classList.remove(params.hiddenClass);
                        subEl.classList.remove(params.modifierClass + params.type);
                        subEl.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
                        if (params.clickable) {
                            subEl.classList.remove(...(params.clickableClass || "").split(" "));
                            subEl.removeEventListener("click", onBulletClick);
                        }
                    }));
                }
                if (swiper.pagination.bullets) swiper.pagination.bullets.forEach((subEl => subEl.classList.remove(...params.bulletActiveClass.split(" "))));
            }
            on("changeDirection", (() => {
                if (!swiper.pagination || !swiper.pagination.el) return;
                const params = swiper.params.pagination;
                let {el} = swiper.pagination;
                el = utils_makeElementsArray(el);
                el.forEach((subEl => {
                    subEl.classList.remove(params.horizontalClass, params.verticalClass);
                    subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
                }));
            }));
            on("init", (() => {
                if (swiper.params.pagination.enabled === false) disable(); else {
                    init();
                    render();
                    update();
                }
            }));
            on("activeIndexChange", (() => {
                if (typeof swiper.snapIndex === "undefined") update();
            }));
            on("snapIndexChange", (() => {
                update();
            }));
            on("snapGridLengthChange", (() => {
                render();
                update();
            }));
            on("destroy", (() => {
                destroy();
            }));
            on("enable disable", (() => {
                let {el} = swiper.pagination;
                if (el) {
                    el = utils_makeElementsArray(el);
                    el.forEach((subEl => subEl.classList[swiper.enabled ? "remove" : "add"](swiper.params.pagination.lockClass)));
                }
            }));
            on("lock unlock", (() => {
                update();
            }));
            on("click", ((_s, e) => {
                const targetEl = e.target;
                const el = utils_makeElementsArray(swiper.pagination.el);
                if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el && el.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
                    if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
                    const isHidden = el[0].classList.contains(swiper.params.pagination.hiddenClass);
                    if (isHidden === true) emit("paginationShow"); else emit("paginationHide");
                    el.forEach((subEl => subEl.classList.toggle(swiper.params.pagination.hiddenClass)));
                }
            }));
            const enable = () => {
                swiper.el.classList.remove(swiper.params.pagination.paginationDisabledClass);
                let {el} = swiper.pagination;
                if (el) {
                    el = utils_makeElementsArray(el);
                    el.forEach((subEl => subEl.classList.remove(swiper.params.pagination.paginationDisabledClass)));
                }
                init();
                render();
                update();
            };
            const disable = () => {
                swiper.el.classList.add(swiper.params.pagination.paginationDisabledClass);
                let {el} = swiper.pagination;
                if (el) {
                    el = utils_makeElementsArray(el);
                    el.forEach((subEl => subEl.classList.add(swiper.params.pagination.paginationDisabledClass)));
                }
                destroy();
            };
            Object.assign(swiper.pagination, {
                enable,
                disable,
                render,
                update,
                init,
                destroy
            });
        }
        function Autoplay(_ref) {
            let {swiper, extendParams, on, emit, params} = _ref;
            swiper.autoplay = {
                running: false,
                paused: false,
                timeLeft: 0
            };
            extendParams({
                autoplay: {
                    enabled: false,
                    delay: 3e3,
                    waitForTransition: true,
                    disableOnInteraction: false,
                    stopOnLastSlide: false,
                    reverseDirection: false,
                    pauseOnMouseEnter: false
                }
            });
            let timeout;
            let raf;
            let autoplayDelayTotal = params && params.autoplay ? params.autoplay.delay : 3e3;
            let autoplayDelayCurrent = params && params.autoplay ? params.autoplay.delay : 3e3;
            let autoplayTimeLeft;
            let autoplayStartTime = (new Date).getTime();
            let wasPaused;
            let isTouched;
            let pausedByTouch;
            let touchStartTimeout;
            let slideChanged;
            let pausedByInteraction;
            let pausedByPointerEnter;
            function onTransitionEnd(e) {
                if (!swiper || swiper.destroyed || !swiper.wrapperEl) return;
                if (e.target !== swiper.wrapperEl) return;
                swiper.wrapperEl.removeEventListener("transitionend", onTransitionEnd);
                if (pausedByPointerEnter || e.detail && e.detail.bySwiperTouchMove) return;
                resume();
            }
            const calcTimeLeft = () => {
                if (swiper.destroyed || !swiper.autoplay.running) return;
                if (swiper.autoplay.paused) wasPaused = true; else if (wasPaused) {
                    autoplayDelayCurrent = autoplayTimeLeft;
                    wasPaused = false;
                }
                const timeLeft = swiper.autoplay.paused ? autoplayTimeLeft : autoplayStartTime + autoplayDelayCurrent - (new Date).getTime();
                swiper.autoplay.timeLeft = timeLeft;
                emit("autoplayTimeLeft", timeLeft, timeLeft / autoplayDelayTotal);
                raf = requestAnimationFrame((() => {
                    calcTimeLeft();
                }));
            };
            const getSlideDelay = () => {
                let activeSlideEl;
                if (swiper.virtual && swiper.params.virtual.enabled) activeSlideEl = swiper.slides.find((slideEl => slideEl.classList.contains("swiper-slide-active"))); else activeSlideEl = swiper.slides[swiper.activeIndex];
                if (!activeSlideEl) return;
                const currentSlideDelay = parseInt(activeSlideEl.getAttribute("data-swiper-autoplay"), 10);
                return currentSlideDelay;
            };
            const run = delayForce => {
                if (swiper.destroyed || !swiper.autoplay.running) return;
                cancelAnimationFrame(raf);
                calcTimeLeft();
                let delay = typeof delayForce === "undefined" ? swiper.params.autoplay.delay : delayForce;
                autoplayDelayTotal = swiper.params.autoplay.delay;
                autoplayDelayCurrent = swiper.params.autoplay.delay;
                const currentSlideDelay = getSlideDelay();
                if (!Number.isNaN(currentSlideDelay) && currentSlideDelay > 0 && typeof delayForce === "undefined") {
                    delay = currentSlideDelay;
                    autoplayDelayTotal = currentSlideDelay;
                    autoplayDelayCurrent = currentSlideDelay;
                }
                autoplayTimeLeft = delay;
                const speed = swiper.params.speed;
                const proceed = () => {
                    if (!swiper || swiper.destroyed) return;
                    if (swiper.params.autoplay.reverseDirection) {
                        if (!swiper.isBeginning || swiper.params.loop || swiper.params.rewind) {
                            swiper.slidePrev(speed, true, true);
                            emit("autoplay");
                        } else if (!swiper.params.autoplay.stopOnLastSlide) {
                            swiper.slideTo(swiper.slides.length - 1, speed, true, true);
                            emit("autoplay");
                        }
                    } else if (!swiper.isEnd || swiper.params.loop || swiper.params.rewind) {
                        swiper.slideNext(speed, true, true);
                        emit("autoplay");
                    } else if (!swiper.params.autoplay.stopOnLastSlide) {
                        swiper.slideTo(0, speed, true, true);
                        emit("autoplay");
                    }
                    if (swiper.params.cssMode) {
                        autoplayStartTime = (new Date).getTime();
                        requestAnimationFrame((() => {
                            run();
                        }));
                    }
                };
                if (delay > 0) {
                    clearTimeout(timeout);
                    timeout = setTimeout((() => {
                        proceed();
                    }), delay);
                } else requestAnimationFrame((() => {
                    proceed();
                }));
                return delay;
            };
            const start = () => {
                autoplayStartTime = (new Date).getTime();
                swiper.autoplay.running = true;
                run();
                emit("autoplayStart");
            };
            const stop = () => {
                swiper.autoplay.running = false;
                clearTimeout(timeout);
                cancelAnimationFrame(raf);
                emit("autoplayStop");
            };
            const pause = (internal, reset) => {
                if (swiper.destroyed || !swiper.autoplay.running) return;
                clearTimeout(timeout);
                if (!internal) pausedByInteraction = true;
                const proceed = () => {
                    emit("autoplayPause");
                    if (swiper.params.autoplay.waitForTransition) swiper.wrapperEl.addEventListener("transitionend", onTransitionEnd); else resume();
                };
                swiper.autoplay.paused = true;
                if (reset) {
                    if (slideChanged) autoplayTimeLeft = swiper.params.autoplay.delay;
                    slideChanged = false;
                    proceed();
                    return;
                }
                const delay = autoplayTimeLeft || swiper.params.autoplay.delay;
                autoplayTimeLeft = delay - ((new Date).getTime() - autoplayStartTime);
                if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop) return;
                if (autoplayTimeLeft < 0) autoplayTimeLeft = 0;
                proceed();
            };
            const resume = () => {
                if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop || swiper.destroyed || !swiper.autoplay.running) return;
                autoplayStartTime = (new Date).getTime();
                if (pausedByInteraction) {
                    pausedByInteraction = false;
                    run(autoplayTimeLeft);
                } else run();
                swiper.autoplay.paused = false;
                emit("autoplayResume");
            };
            const onVisibilityChange = () => {
                if (swiper.destroyed || !swiper.autoplay.running) return;
                const document = ssr_window_esm_getDocument();
                if (document.visibilityState === "hidden") {
                    pausedByInteraction = true;
                    pause(true);
                }
                if (document.visibilityState === "visible") resume();
            };
            const onPointerEnter = e => {
                if (e.pointerType !== "mouse") return;
                pausedByInteraction = true;
                pausedByPointerEnter = true;
                if (swiper.animating || swiper.autoplay.paused) return;
                pause(true);
            };
            const onPointerLeave = e => {
                if (e.pointerType !== "mouse") return;
                pausedByPointerEnter = false;
                if (swiper.autoplay.paused) resume();
            };
            const attachMouseEvents = () => {
                if (swiper.params.autoplay.pauseOnMouseEnter) {
                    swiper.el.addEventListener("pointerenter", onPointerEnter);
                    swiper.el.addEventListener("pointerleave", onPointerLeave);
                }
            };
            const detachMouseEvents = () => {
                if (swiper.el && typeof swiper.el !== "string") {
                    swiper.el.removeEventListener("pointerenter", onPointerEnter);
                    swiper.el.removeEventListener("pointerleave", onPointerLeave);
                }
            };
            const attachDocumentEvents = () => {
                const document = ssr_window_esm_getDocument();
                document.addEventListener("visibilitychange", onVisibilityChange);
            };
            const detachDocumentEvents = () => {
                const document = ssr_window_esm_getDocument();
                document.removeEventListener("visibilitychange", onVisibilityChange);
            };
            on("init", (() => {
                if (swiper.params.autoplay.enabled) {
                    attachMouseEvents();
                    attachDocumentEvents();
                    start();
                }
            }));
            on("destroy", (() => {
                detachMouseEvents();
                detachDocumentEvents();
                if (swiper.autoplay.running) stop();
            }));
            on("_freeModeStaticRelease", (() => {
                if (pausedByTouch || pausedByInteraction) resume();
            }));
            on("_freeModeNoMomentumRelease", (() => {
                if (!swiper.params.autoplay.disableOnInteraction) pause(true, true); else stop();
            }));
            on("beforeTransitionStart", ((_s, speed, internal) => {
                if (swiper.destroyed || !swiper.autoplay.running) return;
                if (internal || !swiper.params.autoplay.disableOnInteraction) pause(true, true); else stop();
            }));
            on("sliderFirstMove", (() => {
                if (swiper.destroyed || !swiper.autoplay.running) return;
                if (swiper.params.autoplay.disableOnInteraction) {
                    stop();
                    return;
                }
                isTouched = true;
                pausedByTouch = false;
                pausedByInteraction = false;
                touchStartTimeout = setTimeout((() => {
                    pausedByInteraction = true;
                    pausedByTouch = true;
                    pause(true);
                }), 200);
            }));
            on("touchEnd", (() => {
                if (swiper.destroyed || !swiper.autoplay.running || !isTouched) return;
                clearTimeout(touchStartTimeout);
                clearTimeout(timeout);
                if (swiper.params.autoplay.disableOnInteraction) {
                    pausedByTouch = false;
                    isTouched = false;
                    return;
                }
                if (pausedByTouch && swiper.params.cssMode) resume();
                pausedByTouch = false;
                isTouched = false;
            }));
            on("slideChange", (() => {
                if (swiper.destroyed || !swiper.autoplay.running) return;
                slideChanged = true;
            }));
            Object.assign(swiper.autoplay, {
                start,
                stop,
                pause,
                resume
            });
        }
        function effect_init_effectInit(params) {
            const {effect, swiper, on, setTranslate, setTransition, overwriteParams, perspective, recreateShadows, getEffectParams} = params;
            on("beforeInit", (() => {
                if (swiper.params.effect !== effect) return;
                swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);
                if (perspective && perspective()) swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
                const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
                Object.assign(swiper.params, overwriteParamsResult);
                Object.assign(swiper.originalParams, overwriteParamsResult);
            }));
            on("setTranslate", (() => {
                if (swiper.params.effect !== effect) return;
                setTranslate();
            }));
            on("setTransition", ((_s, duration) => {
                if (swiper.params.effect !== effect) return;
                setTransition(duration);
            }));
            on("transitionEnd", (() => {
                if (swiper.params.effect !== effect) return;
                if (recreateShadows) {
                    if (!getEffectParams || !getEffectParams().slideShadows) return;
                    swiper.slides.forEach((slideEl => {
                        slideEl.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((shadowEl => shadowEl.remove()));
                    }));
                    recreateShadows();
                }
            }));
            let requireUpdateOnVirtual;
            on("virtualUpdate", (() => {
                if (swiper.params.effect !== effect) return;
                if (!swiper.slides.length) requireUpdateOnVirtual = true;
                requestAnimationFrame((() => {
                    if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {
                        setTranslate();
                        requireUpdateOnVirtual = false;
                    }
                }));
            }));
        }
        function effect_target_effectTarget(effectParams, slideEl) {
            const transformEl = utils_getSlideTransformEl(slideEl);
            if (transformEl !== slideEl) {
                transformEl.style.backfaceVisibility = "hidden";
                transformEl.style["-webkit-backface-visibility"] = "hidden";
            }
            return transformEl;
        }
        function effect_virtual_transition_end_effectVirtualTransitionEnd(_ref) {
            let {swiper, duration, transformElements, allSlides} = _ref;
            const {activeIndex} = swiper;
            const getSlide = el => {
                if (!el.parentElement) {
                    const slide = swiper.slides.find((slideEl => slideEl.shadowRoot && slideEl.shadowRoot === el.parentNode));
                    return slide;
                }
                return el.parentElement;
            };
            if (swiper.params.virtualTranslate && duration !== 0) {
                let eventTriggered = false;
                let transitionEndTarget;
                if (allSlides) transitionEndTarget = transformElements; else transitionEndTarget = transformElements.filter((transformEl => {
                    const el = transformEl.classList.contains("swiper-slide-transform") ? getSlide(transformEl) : transformEl;
                    return swiper.getSlideIndex(el) === activeIndex;
                }));
                transitionEndTarget.forEach((el => {
                    utils_elementTransitionEnd(el, (() => {
                        if (eventTriggered) return;
                        if (!swiper || swiper.destroyed) return;
                        eventTriggered = true;
                        swiper.animating = false;
                        const evt = new window.CustomEvent("transitionend", {
                            bubbles: true,
                            cancelable: true
                        });
                        swiper.wrapperEl.dispatchEvent(evt);
                    }));
                }));
            }
        }
        function EffectFade(_ref) {
            let {swiper, extendParams, on} = _ref;
            extendParams({
                fadeEffect: {
                    crossFade: false
                }
            });
            const setTranslate = () => {
                const {slides} = swiper;
                const params = swiper.params.fadeEffect;
                for (let i = 0; i < slides.length; i += 1) {
                    const slideEl = swiper.slides[i];
                    const offset = slideEl.swiperSlideOffset;
                    let tx = -offset;
                    if (!swiper.params.virtualTranslate) tx -= swiper.translate;
                    let ty = 0;
                    if (!swiper.isHorizontal()) {
                        ty = tx;
                        tx = 0;
                    }
                    const slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(slideEl.progress), 0) : 1 + Math.min(Math.max(slideEl.progress, -1), 0);
                    const targetEl = effect_target_effectTarget(params, slideEl);
                    targetEl.style.opacity = slideOpacity;
                    targetEl.style.transform = `translate3d(${tx}px, ${ty}px, 0px)`;
                }
            };
            const setTransition = duration => {
                const transformElements = swiper.slides.map((slideEl => utils_getSlideTransformEl(slideEl)));
                transformElements.forEach((el => {
                    el.style.transitionDuration = `${duration}ms`;
                }));
                effect_virtual_transition_end_effectVirtualTransitionEnd({
                    swiper,
                    duration,
                    transformElements,
                    allSlides: true
                });
            };
            effect_init_effectInit({
                effect: "fade",
                swiper,
                on,
                setTranslate,
                setTransition,
                overwriteParams: () => ({
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    watchSlidesProgress: true,
                    spaceBetween: 0,
                    virtualTranslate: !swiper.params.cssMode
                })
            });
        }
        function initSliders() {
            if (document.querySelector(".swiper")) new swiper_core_Swiper(".swiper", {
                modules: [ Navigation, Pagination, Autoplay, EffectFade ],
                slidesPerView: 1,
                spaceBetween: 0,
                speed: 1100,
                loop: true,
                preloadImages: false,
                autoplay: {
                    delay: 3e3,
                    disableOnInteraction: false,
                    waitForTransition: false
                },
                effect: "fade",
                fadeEffect: {
                    crossFade: true
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true
                },
                navigation: {
                    prevEl: ".swiper-button-prev",
                    nextEl: ".swiper-button-next"
                },
                on: {}
            });
        }
        window.addEventListener("load", (function(e) {
            initSliders();
        }));
        const e = !(typeof navigator > "u") && "ReactNative" === navigator.product, t = {
            timeout: e ? 6e4 : 12e4
        }, _commonjsHelpers_r = function(r) {
            const a = {
                ...t,
                ..."string" == typeof r ? {
                    url: r
                } : r
            };
            if (a.timeout = n(a.timeout), a.query) {
                const {url: t, searchParams: r} = function(t) {
                    const r = t.indexOf("?");
                    if (-1 === r) return {
                        url: t,
                        searchParams: new URLSearchParams
                    };
                    const n = t.slice(0, r), a = t.slice(r + 1);
                    if (!e) return {
                        url: n,
                        searchParams: new URLSearchParams(a)
                    };
                    if ("function" != typeof decodeURIComponent) throw new Error("Broken `URLSearchParams` implementation, and `decodeURIComponent` is not defined");
                    const s = new URLSearchParams;
                    for (const e of a.split("&")) {
                        const [t, r] = e.split("=");
                        t && s.append(o(t), o(r || ""));
                    }
                    return {
                        url: n,
                        searchParams: s
                    };
                }(a.url);
                for (const [e, o] of Object.entries(a.query)) {
                    if (void 0 !== o) if (Array.isArray(o)) for (const t of o) r.append(e, t); else r.append(e, o);
                    const n = r.toString();
                    n && (a.url = `${t}?${n}`);
                }
            }
            return a.method = a.body && !a.method ? "POST" : (a.method || "GET").toUpperCase(), 
            a;
        };
        function o(e) {
            return decodeURIComponent(e.replace(/\+/g, " "));
        }
        function n(e) {
            if (!1 === e || 0 === e) return !1;
            if (e.connect || e.socket) return e;
            const r = Number(e);
            return isNaN(r) ? n(t.timeout) : {
                connect: r,
                socket: r
            };
        }
        const a = /^https?:\/\//i, s = function(e) {
            if (!a.test(e.url)) throw new Error(`"${e.url}" is not a valid URL`);
        };
        function c(e) {
            return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
        }
        const index_browser_o = [ "request", "response", "progress", "error", "abort" ], index_browser_s = [ "processOptions", "validateOptions", "interceptRequest", "finalizeOptions", "onRequest", "onResponse", "onError", "onReturn", "onHeaders" ];
        function index_browser_n(r, a) {
            const i = [], u = index_browser_s.reduce(((e, t) => (e[t] = e[t] || [], e)), {
                processOptions: [ _commonjsHelpers_r ],
                validateOptions: [ s ]
            });
            function l(e) {
                const t = index_browser_o.reduce(((e, t) => (e[t] = function() {
                    const e = Object.create(null);
                    let t = 0;
                    return {
                        publish: function(t) {
                            for (const r in e) e[r](t);
                        },
                        subscribe: function(r) {
                            const o = t++;
                            return e[o] = r, function() {
                                delete e[o];
                            };
                        }
                    };
                }(), e)), {}), r = (e => function(t, r, ...o) {
                    const s = "onError" === t;
                    let n = r;
                    for (let r = 0; r < e[t].length && (n = (0, e[t][r])(n, ...o), !s || n); r++) ;
                    return n;
                })(u), s = r("processOptions", e);
                r("validateOptions", s);
                const n = {
                    options: s,
                    channels: t,
                    applyMiddleware: r
                };
                let i;
                const l = t.request.subscribe((e => {
                    i = a(e, ((o, s) => ((e, o, s) => {
                        let n = e, a = o;
                        if (!n) try {
                            a = r("onResponse", o, s);
                        } catch (e) {
                            a = null, n = e;
                        }
                        n = n && r("onError", n, s), n ? t.error.publish(n) : a && t.response.publish(a);
                    })(o, s, e)));
                }));
                t.abort.subscribe((() => {
                    l(), i && i.abort();
                }));
                const c = r("onReturn", t, n);
                return c === t && t.request.publish(n), c;
            }
            return l.use = function(e) {
                if (!e) throw new Error("Tried to add middleware that resolved to falsey value");
                if ("function" == typeof e) throw new Error("Tried to add middleware that was a function. It probably expects you to pass options to it.");
                if (e.onReturn && u.onReturn.length > 0) throw new Error("Tried to add new middleware with `onReturn` handler, but another handler has already been registered for this event");
                return index_browser_s.forEach((t => {
                    e[t] && u[t].push(e[t]);
                })), i.push(e), l;
            }, l.clone = () => index_browser_n(i, a), r.forEach(l.use), l;
        }
        var index_browser_a, i, u = c(function() {
            if (i) return index_browser_a;
            i = 1;
            var e = function(e) {
                return e.replace(/^\s+|\s+$/g, "");
            };
            return index_browser_a = function(t) {
                if (!t) return {};
                for (var r = {}, o = e(t).split("\n"), s = 0; s < o.length; s++) {
                    var n = o[s], a = n.indexOf(":"), i = e(n.slice(0, a)).toLowerCase(), u = e(n.slice(a + 1));
                    typeof r[i] > "u" ? r[i] = u : (l = r[i], "[object Array]" === Object.prototype.toString.call(l) ? r[i].push(u) : r[i] = [ r[i], u ]);
                }
                var l;
                return r;
            };
        }());
        class l {
            onabort;
            onerror;
            onreadystatechange;
            ontimeout;
            readyState=0;
            response;
            responseText="";
            responseType="";
            status;
            statusText;
            withCredentials;
            #e;
            #t;
            #r;
            #o={};
            #s;
            #n={};
            #a;
            open(e, t, r) {
                this.#e = e, this.#t = t, this.#r = "", this.readyState = 1, this.onreadystatechange?.(), 
                this.#s = void 0;
            }
            abort() {
                this.#s && this.#s.abort();
            }
            getAllResponseHeaders() {
                return this.#r;
            }
            setRequestHeader(e, t) {
                this.#o[e] = t;
            }
            setInit(e, t = !0) {
                this.#n = e, this.#a = t;
            }
            send(e) {
                const t = "arraybuffer" !== this.responseType, r = {
                    ...this.#n,
                    method: this.#e,
                    headers: this.#o,
                    body: e
                };
                "function" == typeof AbortController && this.#a && (this.#s = new AbortController, 
                typeof EventTarget < "u" && this.#s.signal instanceof EventTarget && (r.signal = this.#s.signal)), 
                typeof document < "u" && (r.credentials = this.withCredentials ? "include" : "omit"), 
                fetch(this.#t, r).then((e => (e.headers.forEach(((e, t) => {
                    this.#r += `${t}: ${e}\r\n`;
                })), this.status = e.status, this.statusText = e.statusText, this.readyState = 3, 
                this.onreadystatechange?.(), t ? e.text() : e.arrayBuffer()))).then((e => {
                    "string" == typeof e ? this.responseText = e : this.response = e, this.readyState = 4, 
                    this.onreadystatechange?.();
                })).catch((e => {
                    "AbortError" !== e.name ? this.onerror?.(e) : this.onabort?.();
                }));
            }
        }
        const index_browser_c = "function" == typeof XMLHttpRequest ? "xhr" : "fetch", h = "xhr" === index_browser_c ? XMLHttpRequest : l, d = (e, t) => {
            const r = e.options, o = e.applyMiddleware("finalizeOptions", r), s = {}, n = e.applyMiddleware("interceptRequest", void 0, {
                adapter: index_browser_c,
                context: e
            });
            if (n) {
                const e = setTimeout(t, 0, null, n);
                return {
                    abort: () => clearTimeout(e)
                };
            }
            let a = new h;
            a instanceof l && "object" == typeof o.fetch && a.setInit(o.fetch, o.useAbortSignal ?? !0);
            const i = o.headers, d = o.timeout;
            let p = !1, f = !1, b = !1;
            if (a.onerror = e => {
                m(a instanceof l ? e instanceof Error ? e : new Error(`Request error while attempting to reach is ${o.url}`, {
                    cause: e
                }) : new Error(`Request error while attempting to reach is ${o.url}${e.lengthComputable ? `(${e.loaded} of ${e.total} bytes transferred)` : ""}`));
            }, a.ontimeout = e => {
                m(new Error(`Request timeout while attempting to reach ${o.url}${e.lengthComputable ? `(${e.loaded} of ${e.total} bytes transferred)` : ""}`));
            }, a.onabort = () => {
                w(!0), p = !0;
            }, a.onreadystatechange = () => {
                d && (w(), s.socket = setTimeout((() => y("ESOCKETTIMEDOUT")), d.socket)), !p && 4 === a.readyState && 0 !== a.status && function() {
                    if (!(p || f || b)) {
                        if (0 === a.status) return void m(new Error("Unknown XHR error"));
                        w(), f = !0, t(null, {
                            body: a.response || ("" === a.responseType || "text" === a.responseType ? a.responseText : ""),
                            url: o.url,
                            method: o.method,
                            headers: u(a.getAllResponseHeaders()),
                            statusCode: a.status,
                            statusMessage: a.statusText
                        });
                    }
                }();
            }, a.open(o.method, o.url, !0), a.withCredentials = !!o.withCredentials, i && a.setRequestHeader) for (const e in i) i.hasOwnProperty(e) && a.setRequestHeader(e, i[e]);
            return o.rawBody && (a.responseType = "arraybuffer"), e.applyMiddleware("onRequest", {
                options: o,
                adapter: index_browser_c,
                request: a,
                context: e
            }), a.send(o.body || null), d && (s.connect = setTimeout((() => y("ETIMEDOUT")), d.connect)), 
            {
                abort: function() {
                    p = !0, a && a.abort();
                }
            };
            function y(t) {
                b = !0, a.abort();
                const r = new Error("ESOCKETTIMEDOUT" === t ? `Socket timed out on request to ${o.url}` : `Connection timed out on request to ${o.url}`);
                r.code = t, e.channels.error.publish(r);
            }
            function w(e) {
                (e || p || a.readyState >= 2 && s.connect) && clearTimeout(s.connect), s.socket && clearTimeout(s.socket);
            }
            function m(e) {
                if (f) return;
                w(!0), f = !0, a = null;
                const r = e || new Error(`Network error while attempting to reach ${o.url}`);
                r.isNetworkError = !0, r.request = o, t(r);
            }
        }, p = (e = [], t = d) => index_browser_n(e, t);
        function middleware_browser_n(e) {
            return {};
        }
        var middleware_browser_a, middleware_browser_c, middleware_browser_u, middleware_browser_l, middleware_browser_p, middleware_browser_d = {
            exports: {}
        };
        c((middleware_browser_p || (middleware_browser_p = 1, function(e, t) {
            t.formatArgs = function(t) {
                if (t[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + t[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), 
                !this.useColors) return;
                const s = "color: " + this.color;
                t.splice(1, 0, s, "color: inherit");
                let n = 0, r = 0;
                t[0].replace(/%[a-zA-Z%]/g, (e => {
                    "%%" !== e && (n++, "%c" === e && (r = n));
                })), t.splice(r, 0, s);
            }, t.save = function(e) {
                try {
                    e ? t.storage.setItem("debug", e) : t.storage.removeItem("debug");
                } catch {}
            }, t.load = function() {
                let e;
                try {
                    e = t.storage.getItem("debug");
                } catch {}
                return !e && typeof process < "u" && "env" in process && (e = process.env.DEBUG), 
                e;
            }, t.useColors = function() {
                if (typeof window < "u" && window.process && ("renderer" === window.process.type || window.process.__nwjs)) return !0;
                if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
                let e;
                return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator < "u" && navigator.userAgent && (e = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(e[1], 10) >= 31 || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
            }, t.storage = function() {
                try {
                    return localStorage;
                } catch {}
            }(), t.destroy = (() => {
                let e = !1;
                return () => {
                    e || (e = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
                };
            })(), t.colors = [ "#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33" ], 
            t.log = console.debug || console.log || (() => {}), e.exports = (middleware_browser_l ? middleware_browser_u : (middleware_browser_l = 1, 
            middleware_browser_u = function(e) {
                function t(e) {
                    let n, r, o, i = null;
                    function a(...e) {
                        if (!a.enabled) return;
                        const s = a, r = Number(new Date), o = r - (n || r);
                        s.diff = o, s.prev = n, s.curr = r, n = r, e[0] = t.coerce(e[0]), "string" != typeof e[0] && e.unshift("%O");
                        let i = 0;
                        e[0] = e[0].replace(/%([a-zA-Z%])/g, ((n, r) => {
                            if ("%%" === n) return "%";
                            i++;
                            const o = t.formatters[r];
                            if ("function" == typeof o) {
                                const t = e[i];
                                n = o.call(s, t), e.splice(i, 1), i--;
                            }
                            return n;
                        })), t.formatArgs.call(s, e), (s.log || t.log).apply(s, e);
                    }
                    return a.namespace = e, a.useColors = t.useColors(), a.color = t.selectColor(e), 
                    a.extend = s, a.destroy = t.destroy, Object.defineProperty(a, "enabled", {
                        enumerable: !0,
                        configurable: !1,
                        get: () => null !== i ? i : (r !== t.namespaces && (r = t.namespaces, o = t.enabled(e)), 
                        o),
                        set: e => {
                            i = e;
                        }
                    }), "function" == typeof t.init && t.init(a), a;
                }
                function s(e, s) {
                    const n = t(this.namespace + (typeof s > "u" ? ":" : s) + e);
                    return n.log = this.log, n;
                }
                function n(e, t) {
                    let s = 0, n = 0, r = -1, o = 0;
                    for (;s < e.length; ) if (n < t.length && (t[n] === e[s] || "*" === t[n])) "*" === t[n] ? (r = n, 
                    o = s, n++) : (s++, n++); else {
                        if (-1 === r) return !1;
                        n = r + 1, o++, s = o;
                    }
                    for (;n < t.length && "*" === t[n]; ) n++;
                    return n === t.length;
                }
                return t.debug = t, t.default = t, t.coerce = function(e) {
                    return e instanceof Error ? e.stack || e.message : e;
                }, t.disable = function() {
                    const e = [ ...t.names, ...t.skips.map((e => "-" + e)) ].join(",");
                    return t.enable(""), e;
                }, t.enable = function(e) {
                    t.save(e), t.namespaces = e, t.names = [], t.skips = [];
                    const s = ("string" == typeof e ? e : "").trim().replace(" ", ",").split(",").filter(Boolean);
                    for (const e of s) "-" === e[0] ? t.skips.push(e.slice(1)) : t.names.push(e);
                }, t.enabled = function(e) {
                    for (const s of t.skips) if (n(e, s)) return !1;
                    for (const s of t.names) if (n(e, s)) return !0;
                    return !1;
                }, t.humanize = function() {
                    if (middleware_browser_c) return middleware_browser_a;
                    middleware_browser_c = 1;
                    var e = 1e3, t = 60 * e, s = 60 * t, n = 24 * s, r = 7 * n;
                    function o(e, t, s, n) {
                        var r = t >= 1.5 * s;
                        return Math.round(e / s) + " " + n + (r ? "s" : "");
                    }
                    return middleware_browser_a = function(i, a) {
                        a = a || {};
                        var c, u, l = typeof i;
                        if ("string" === l && i.length > 0) return function(o) {
                            if (!((o = String(o)).length > 100)) {
                                var i = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(o);
                                if (i) {
                                    var a = parseFloat(i[1]);
                                    switch ((i[2] || "ms").toLowerCase()) {
                                      case "years":
                                      case "year":
                                      case "yrs":
                                      case "yr":
                                      case "y":
                                        return 315576e5 * a;

                                      case "weeks":
                                      case "week":
                                      case "w":
                                        return a * r;

                                      case "days":
                                      case "day":
                                      case "d":
                                        return a * n;

                                      case "hours":
                                      case "hour":
                                      case "hrs":
                                      case "hr":
                                      case "h":
                                        return a * s;

                                      case "minutes":
                                      case "minute":
                                      case "mins":
                                      case "min":
                                      case "m":
                                        return a * t;

                                      case "seconds":
                                      case "second":
                                      case "secs":
                                      case "sec":
                                      case "s":
                                        return a * e;

                                      case "milliseconds":
                                      case "millisecond":
                                      case "msecs":
                                      case "msec":
                                      case "ms":
                                        return a;

                                      default:
                                        return;
                                    }
                                }
                            }
                        }(i);
                        if ("number" === l && isFinite(i)) return a.long ? (c = i, (u = Math.abs(c)) >= n ? o(c, u, n, "day") : u >= s ? o(c, u, s, "hour") : u >= t ? o(c, u, t, "minute") : u >= e ? o(c, u, e, "second") : c + " ms") : function(r) {
                            var o = Math.abs(r);
                            return o >= n ? Math.round(r / n) + "d" : o >= s ? Math.round(r / s) + "h" : o >= t ? Math.round(r / t) + "m" : o >= e ? Math.round(r / e) + "s" : r + "ms";
                        }(i);
                        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(i));
                    };
                }(), t.destroy = function() {
                    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
                }, Object.keys(e).forEach((s => {
                    t[s] = e[s];
                })), t.names = [], t.skips = [], t.formatters = {}, t.selectColor = function(e) {
                    let s = 0;
                    for (let t = 0; t < e.length; t++) s = (s << 5) - s + e.charCodeAt(t), s |= 0;
                    return t.colors[Math.abs(s) % t.colors.length];
                }, t.enable(t.load()), t;
            }))(t);
            const {formatters: s} = e.exports;
            s.j = function(e) {
                try {
                    return JSON.stringify(e);
                } catch (e) {
                    return "[UnexpectedJSONParseError]: " + e.message;
                }
            };
        }(middleware_browser_d, middleware_browser_d.exports)), middleware_browser_d.exports));
        Object.prototype.hasOwnProperty;
        Error;
        const F = typeof Buffer > "u" ? () => !1 : e => Buffer.isBuffer(e);
        function O(e) {
            return "[object Object]" === Object.prototype.toString.call(e);
        }
        function j(e) {
            if (!1 === O(e)) return !1;
            const t = e.constructor;
            if (void 0 === t) return !0;
            const s = t.prototype;
            return !(!1 === O(s) || !1 === s.hasOwnProperty("isPrototypeOf"));
        }
        const v = [ "boolean", "string", "number" ];
        function x() {
            return {
                processOptions: e => {
                    const t = e.body;
                    return !t || "function" == typeof t.pipe || F(t) || -1 === v.indexOf(typeof t) && !Array.isArray(t) && !j(t) ? e : Object.assign({}, e, {
                        body: JSON.stringify(e.body),
                        headers: Object.assign({}, e.headers, {
                            "Content-Type": "application/json"
                        })
                    });
                }
            };
        }
        function E(e) {
            return {
                onResponse: s => {
                    const n = s.headers["content-type"] || "", r = e && e.force || -1 !== n.indexOf("application/json");
                    return s.body && n && r ? Object.assign({}, s, {
                        body: t(s.body)
                    }) : s;
                },
                processOptions: e => Object.assign({}, e, {
                    headers: Object.assign({
                        Accept: "application/json"
                    }, e.headers)
                })
            };
            function t(e) {
                try {
                    return JSON.parse(e);
                } catch (e) {
                    throw e.message = `Failed to parsed response body as JSON: ${e.message}`, e;
                }
            }
        }
        let R = {};
        typeof globalThis < "u" ? R = globalThis : typeof window < "u" ? R = window : typeof global < "u" ? R = global : typeof self < "u" && (R = self);
        var q = R;
        function A(e = {}) {
            const t = e.implementation || q.Observable;
            if (!t) throw new Error("`Observable` is not available in global scope, and no implementation was passed");
            return {
                onReturn: (e, s) => new t((t => (e.error.subscribe((e => t.error(e))), e.progress.subscribe((e => t.next(Object.assign({
                    type: "progress"
                }, e)))), e.response.subscribe((e => {
                    t.next(Object.assign({
                        type: "response"
                    }, e)), t.complete();
                })), e.request.publish(s), () => e.abort.publish())))
            };
        }
        function S() {
            return {
                onRequest: e => {
                    if ("xhr" !== e.adapter) return;
                    const t = e.request, s = e.context;
                    function n(e) {
                        return t => {
                            const n = t.lengthComputable ? t.loaded / t.total * 100 : -1;
                            s.channels.progress.publish({
                                stage: e,
                                percent: n,
                                total: t.total,
                                loaded: t.loaded,
                                lengthComputable: t.lengthComputable
                            });
                        };
                    }
                    "upload" in t && "onprogress" in t.upload && (t.upload.onprogress = n("upload")), 
                    "onprogress" in t && (t.onprogress = n("download"));
                }
            };
        }
        const N = (e = {}) => {
            const t = e.implementation || Promise;
            if (!t) throw new Error("`Promise` is not available in global scope, and no implementation was passed");
            return {
                onReturn: (s, n) => new t(((t, r) => {
                    const o = n.options.cancelToken;
                    o && o.promise.then((e => {
                        s.abort.publish(e), r(e);
                    })), s.error.subscribe(r), s.response.subscribe((s => {
                        t(e.onlyBody ? s.body : s);
                    })), setTimeout((() => {
                        try {
                            s.request.publish(n);
                        } catch (e) {
                            r(e);
                        }
                    }), 0);
                }))
            };
        };
        class T {
            __CANCEL__=!0;
            message;
            constructor(e) {
                this.message = e;
            }
            toString() {
                return "Cancel" + (this.message ? `: ${this.message}` : "");
            }
        }
        class I {
            promise;
            reason;
            constructor(e) {
                if ("function" != typeof e) throw new TypeError("executor must be a function.");
                let t = null;
                this.promise = new Promise((e => {
                    t = e;
                })), e((e => {
                    this.reason || (this.reason = new T(e), t(this.reason));
                }));
            }
            static source=() => {
                let e;
                return {
                    token: new I((t => {
                        e = t;
                    })),
                    cancel: e
                };
            };
        }
        N.Cancel = T, N.CancelToken = I, N.isCancel = e => !(!e || !e?.__CANCEL__);
        var $ = (e, t, s) => ("GET" === s.method || "HEAD" === s.method) && (e.isNetworkError || !1);
        function _(e) {
            return 100 * Math.pow(2, e) + 100 * Math.random();
        }
        const P = (e = {}) => (e => {
            const t = e.maxRetries || 5, s = e.retryDelay || _, n = e.shouldRetry;
            return {
                onError: (e, r) => {
                    const o = r.options, i = o.maxRetries || t, a = o.retryDelay || s, c = o.shouldRetry || n, u = o.attemptNumber || 0;
                    if (null !== (l = o.body) && "object" == typeof l && "function" == typeof l.pipe || !c(e, u, o) || u >= i) return e;
                    var l;
                    const p = Object.assign({}, r, {
                        options: Object.assign({}, o, {
                            attemptNumber: u + 1
                        })
                    });
                    return setTimeout((() => r.channels.request.publish(p)), a(u)), null;
                }
            };
        })({
            shouldRetry: $,
            ...e
        });
        P.shouldRetry = $;
        class z extends Error {
            request;
            code;
            constructor(e, t) {
                super(e.message), this.request = t, this.code = e.code;
            }
        }
        H = middleware_browser_n;
        var H;
        var extendStatics = function(d, b) {
            extendStatics = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(d, b) {
                d.__proto__ = b;
            } || function(d, b) {
                for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
            };
            return extendStatics(d, b);
        };
        function __extends(d, b) {
            if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __);
        }
        function __awaiter(thisArg, _arguments, P, generator) {
            function adopt(value) {
                return value instanceof P ? value : new P((function(resolve) {
                    resolve(value);
                }));
            }
            return new (P || (P = Promise))((function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            }));
        }
        function __generator(thisArg, body) {
            var f, y, t, _ = {
                label: 0,
                sent: function() {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: []
            }, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
            return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
                return this;
            }), g;
            function verb(n) {
                return function(v) {
                    return step([ n, v ]);
                };
            }
            function step(op) {
                if (f) throw new TypeError("Generator is already executing.");
                while (g && (g = 0, op[0] && (_ = 0)), _) try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
                    0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                    if (y = 0, t) op = [ op[0] & 2, t.value ];
                    switch (op[0]) {
                      case 0:
                      case 1:
                        t = op;
                        break;

                      case 4:
                        _.label++;
                        return {
                            value: op[1],
                            done: false
                        };

                      case 5:
                        _.label++;
                        y = op[1];
                        op = [ 0 ];
                        continue;

                      case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;

                      default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();
                        continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [ 6, e ];
                    y = 0;
                } finally {
                    f = t = 0;
                }
                if (op[0] & 5) throw op[1];
                return {
                    value: op[0] ? op[1] : void 0,
                    done: true
                };
            }
        }
        Object.create;
        function __values(o) {
            var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
            if (m) return m.call(o);
            if (o && typeof o.length === "number") return {
                next: function() {
                    if (o && i >= o.length) o = void 0;
                    return {
                        value: o && o[i++],
                        done: !o
                    };
                }
            };
            throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
        }
        function __read(o, n) {
            var m = typeof Symbol === "function" && o[Symbol.iterator];
            if (!m) return o;
            var r, e, i = m.call(o), ar = [];
            try {
                while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
            } catch (error) {
                e = {
                    error
                };
            } finally {
                try {
                    if (r && !r.done && (m = i["return"])) m.call(i);
                } finally {
                    if (e) throw e.error;
                }
            }
            return ar;
        }
        function __spreadArray(to, from, pack) {
            if (pack || arguments.length === 2) for (var ar, i = 0, l = from.length; i < l; i++) if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
            return to.concat(ar || Array.prototype.slice.call(from));
        }
        function __await(v) {
            return this instanceof __await ? (this.v = v, this) : new __await(v);
        }
        function __asyncGenerator(thisArg, _arguments, generator) {
            if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
            var i, g = generator.apply(thisArg, _arguments || []), q = [];
            return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), 
            verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
                return this;
            }, i;
            function awaitReturn(f) {
                return function(v) {
                    return Promise.resolve(v).then(f, reject);
                };
            }
            function verb(n, f) {
                if (g[n]) {
                    i[n] = function(v) {
                        return new Promise((function(a, b) {
                            q.push([ n, v, a, b ]) > 1 || resume(n, v);
                        }));
                    };
                    if (f) i[n] = f(i[n]);
                }
            }
            function resume(n, v) {
                try {
                    step(g[n](v));
                } catch (e) {
                    settle(q[0][3], e);
                }
            }
            function step(r) {
                r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
            }
            function fulfill(value) {
                resume("next", value);
            }
            function reject(value) {
                resume("throw", value);
            }
            function settle(f, v) {
                if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
            }
        }
        function __asyncValues(o) {
            if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
            var i, m = o[Symbol.asyncIterator];
            return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), 
            i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
                return this;
            }, i);
            function verb(n) {
                i[n] = o[n] && function(v) {
                    return new Promise((function(resolve, reject) {
                        v = o[n](v), settle(resolve, reject, v.done, v.value);
                    }));
                };
            }
            function settle(resolve, reject, d, v) {
                Promise.resolve(v).then((function(v) {
                    resolve({
                        value: v,
                        done: d
                    });
                }), reject);
            }
        }
        Object.create;
        typeof SuppressedError === "function" && SuppressedError;
        function isFunction(value) {
            return typeof value === "function";
        }
        function createErrorClass(createImpl) {
            var _super = function(instance) {
                Error.call(instance);
                instance.stack = (new Error).stack;
            };
            var ctorFunc = createImpl(_super);
            ctorFunc.prototype = Object.create(Error.prototype);
            ctorFunc.prototype.constructor = ctorFunc;
            return ctorFunc;
        }
        var UnsubscriptionError = createErrorClass((function(_super) {
            return function UnsubscriptionErrorImpl(errors) {
                _super(this);
                this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map((function(err, i) {
                    return i + 1 + ") " + err.toString();
                })).join("\n  ") : "";
                this.name = "UnsubscriptionError";
                this.errors = errors;
            };
        }));
        function arrRemove(arr, item) {
            if (arr) {
                var index = arr.indexOf(item);
                0 <= index && arr.splice(index, 1);
            }
        }
        var Subscription = function() {
            function Subscription(initialTeardown) {
                this.initialTeardown = initialTeardown;
                this.closed = false;
                this._parentage = null;
                this._finalizers = null;
            }
            Subscription.prototype.unsubscribe = function() {
                var e_1, _a, e_2, _b;
                var errors;
                if (!this.closed) {
                    this.closed = true;
                    var _parentage = this._parentage;
                    if (_parentage) {
                        this._parentage = null;
                        if (Array.isArray(_parentage)) try {
                            for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                                var parent_1 = _parentage_1_1.value;
                                parent_1.remove(this);
                            }
                        } catch (e_1_1) {
                            e_1 = {
                                error: e_1_1
                            };
                        } finally {
                            try {
                                if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                            } finally {
                                if (e_1) throw e_1.error;
                            }
                        } else _parentage.remove(this);
                    }
                    var initialFinalizer = this.initialTeardown;
                    if (isFunction(initialFinalizer)) try {
                        initialFinalizer();
                    } catch (e) {
                        errors = e instanceof UnsubscriptionError ? e.errors : [ e ];
                    }
                    var _finalizers = this._finalizers;
                    if (_finalizers) {
                        this._finalizers = null;
                        try {
                            for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
                                var finalizer = _finalizers_1_1.value;
                                try {
                                    execFinalizer(finalizer);
                                } catch (err) {
                                    errors = errors !== null && errors !== void 0 ? errors : [];
                                    if (err instanceof UnsubscriptionError) errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors)); else errors.push(err);
                                }
                            }
                        } catch (e_2_1) {
                            e_2 = {
                                error: e_2_1
                            };
                        } finally {
                            try {
                                if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
                            } finally {
                                if (e_2) throw e_2.error;
                            }
                        }
                    }
                    if (errors) throw new UnsubscriptionError(errors);
                }
            };
            Subscription.prototype.add = function(teardown) {
                var _a;
                if (teardown && teardown !== this) if (this.closed) execFinalizer(teardown); else {
                    if (teardown instanceof Subscription) {
                        if (teardown.closed || teardown._hasParent(this)) return;
                        teardown._addParent(this);
                    }
                    (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
                }
            };
            Subscription.prototype._hasParent = function(parent) {
                var _parentage = this._parentage;
                return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
            };
            Subscription.prototype._addParent = function(parent) {
                var _parentage = this._parentage;
                this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [ _parentage, parent ] : parent;
            };
            Subscription.prototype._removeParent = function(parent) {
                var _parentage = this._parentage;
                if (_parentage === parent) this._parentage = null; else if (Array.isArray(_parentage)) arrRemove(_parentage, parent);
            };
            Subscription.prototype.remove = function(teardown) {
                var _finalizers = this._finalizers;
                _finalizers && arrRemove(_finalizers, teardown);
                if (teardown instanceof Subscription) teardown._removeParent(this);
            };
            Subscription.EMPTY = function() {
                var empty = new Subscription;
                empty.closed = true;
                return empty;
            }();
            return Subscription;
        }();
        var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
        function isSubscription(value) {
            return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
        }
        function execFinalizer(finalizer) {
            if (isFunction(finalizer)) finalizer(); else finalizer.unsubscribe();
        }
        var config = {
            onUnhandledError: null,
            onStoppedNotification: null,
            Promise: void 0,
            useDeprecatedSynchronousErrorHandling: false,
            useDeprecatedNextContext: false
        };
        var timeoutProvider = {
            setTimeout: function(handler, timeout) {
                var args = [];
                for (var _i = 2; _i < arguments.length; _i++) args[_i - 2] = arguments[_i];
                var delegate = timeoutProvider.delegate;
                if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) return delegate.setTimeout.apply(delegate, __spreadArray([ handler, timeout ], __read(args)));
                return setTimeout.apply(void 0, __spreadArray([ handler, timeout ], __read(args)));
            },
            clearTimeout: function(handle) {
                var delegate = timeoutProvider.delegate;
                return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
            },
            delegate: void 0
        };
        function reportUnhandledError(err) {
            timeoutProvider.setTimeout((function() {
                var onUnhandledError = config.onUnhandledError;
                if (onUnhandledError) onUnhandledError(err); else throw err;
            }));
        }
        function noop() {}
        var COMPLETE_NOTIFICATION = function() {
            return createNotification("C", void 0, void 0);
        }();
        function errorNotification(error) {
            return createNotification("E", void 0, error);
        }
        function nextNotification(value) {
            return createNotification("N", value, void 0);
        }
        function createNotification(kind, value, error) {
            return {
                kind,
                value,
                error
            };
        }
        var context = null;
        function errorContext(cb) {
            if (config.useDeprecatedSynchronousErrorHandling) {
                var isRoot = !context;
                if (isRoot) context = {
                    errorThrown: false,
                    error: null
                };
                cb();
                if (isRoot) {
                    var _a = context, errorThrown = _a.errorThrown, error = _a.error;
                    context = null;
                    if (errorThrown) throw error;
                }
            } else cb();
        }
        function captureError(err) {
            if (config.useDeprecatedSynchronousErrorHandling && context) {
                context.errorThrown = true;
                context.error = err;
            }
        }
        var Subscriber = function(_super) {
            __extends(Subscriber, _super);
            function Subscriber(destination) {
                var _this = _super.call(this) || this;
                _this.isStopped = false;
                if (destination) {
                    _this.destination = destination;
                    if (isSubscription(destination)) destination.add(_this);
                } else _this.destination = EMPTY_OBSERVER;
                return _this;
            }
            Subscriber.create = function(next, error, complete) {
                return new SafeSubscriber(next, error, complete);
            };
            Subscriber.prototype.next = function(value) {
                if (this.isStopped) handleStoppedNotification(nextNotification(value), this); else this._next(value);
            };
            Subscriber.prototype.error = function(err) {
                if (this.isStopped) handleStoppedNotification(errorNotification(err), this); else {
                    this.isStopped = true;
                    this._error(err);
                }
            };
            Subscriber.prototype.complete = function() {
                if (this.isStopped) handleStoppedNotification(COMPLETE_NOTIFICATION, this); else {
                    this.isStopped = true;
                    this._complete();
                }
            };
            Subscriber.prototype.unsubscribe = function() {
                if (!this.closed) {
                    this.isStopped = true;
                    _super.prototype.unsubscribe.call(this);
                    this.destination = null;
                }
            };
            Subscriber.prototype._next = function(value) {
                this.destination.next(value);
            };
            Subscriber.prototype._error = function(err) {
                try {
                    this.destination.error(err);
                } finally {
                    this.unsubscribe();
                }
            };
            Subscriber.prototype._complete = function() {
                try {
                    this.destination.complete();
                } finally {
                    this.unsubscribe();
                }
            };
            return Subscriber;
        }(Subscription);
        var _bind = Function.prototype.bind;
        function bind(fn, thisArg) {
            return _bind.call(fn, thisArg);
        }
        var ConsumerObserver = function() {
            function ConsumerObserver(partialObserver) {
                this.partialObserver = partialObserver;
            }
            ConsumerObserver.prototype.next = function(value) {
                var partialObserver = this.partialObserver;
                if (partialObserver.next) try {
                    partialObserver.next(value);
                } catch (error) {
                    handleUnhandledError(error);
                }
            };
            ConsumerObserver.prototype.error = function(err) {
                var partialObserver = this.partialObserver;
                if (partialObserver.error) try {
                    partialObserver.error(err);
                } catch (error) {
                    handleUnhandledError(error);
                } else handleUnhandledError(err);
            };
            ConsumerObserver.prototype.complete = function() {
                var partialObserver = this.partialObserver;
                if (partialObserver.complete) try {
                    partialObserver.complete();
                } catch (error) {
                    handleUnhandledError(error);
                }
            };
            return ConsumerObserver;
        }();
        var SafeSubscriber = function(_super) {
            __extends(SafeSubscriber, _super);
            function SafeSubscriber(observerOrNext, error, complete) {
                var _this = _super.call(this) || this;
                var partialObserver;
                if (isFunction(observerOrNext) || !observerOrNext) partialObserver = {
                    next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
                    error: error !== null && error !== void 0 ? error : void 0,
                    complete: complete !== null && complete !== void 0 ? complete : void 0
                }; else {
                    var context_1;
                    if (_this && config.useDeprecatedNextContext) {
                        context_1 = Object.create(observerOrNext);
                        context_1.unsubscribe = function() {
                            return _this.unsubscribe();
                        };
                        partialObserver = {
                            next: observerOrNext.next && bind(observerOrNext.next, context_1),
                            error: observerOrNext.error && bind(observerOrNext.error, context_1),
                            complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
                        };
                    } else partialObserver = observerOrNext;
                }
                _this.destination = new ConsumerObserver(partialObserver);
                return _this;
            }
            return SafeSubscriber;
        }(Subscriber);
        function handleUnhandledError(error) {
            if (config.useDeprecatedSynchronousErrorHandling) captureError(error); else reportUnhandledError(error);
        }
        function defaultErrorHandler(err) {
            throw err;
        }
        function handleStoppedNotification(notification, subscriber) {
            var onStoppedNotification = config.onStoppedNotification;
            onStoppedNotification && timeoutProvider.setTimeout((function() {
                return onStoppedNotification(notification, subscriber);
            }));
        }
        var EMPTY_OBSERVER = {
            closed: true,
            next: noop,
            error: defaultErrorHandler,
            complete: noop
        };
        var observable = function() {
            return typeof Symbol === "function" && Symbol.observable || "@@observable";
        }();
        function identity_identity(x) {
            return x;
        }
        function pipe() {
            var fns = [];
            for (var _i = 0; _i < arguments.length; _i++) fns[_i] = arguments[_i];
            return pipeFromArray(fns);
        }
        function pipeFromArray(fns) {
            if (fns.length === 0) return identity_identity;
            if (fns.length === 1) return fns[0];
            return function piped(input) {
                return fns.reduce((function(prev, fn) {
                    return fn(prev);
                }), input);
            };
        }
        var Observable_Observable = function() {
            function Observable(subscribe) {
                if (subscribe) this._subscribe = subscribe;
            }
            Observable.prototype.lift = function(operator) {
                var observable = new Observable;
                observable.source = this;
                observable.operator = operator;
                return observable;
            };
            Observable.prototype.subscribe = function(observerOrNext, error, complete) {
                var _this = this;
                var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
                errorContext((function() {
                    var _a = _this, operator = _a.operator, source = _a.source;
                    subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
                }));
                return subscriber;
            };
            Observable.prototype._trySubscribe = function(sink) {
                try {
                    return this._subscribe(sink);
                } catch (err) {
                    sink.error(err);
                }
            };
            Observable.prototype.forEach = function(next, promiseCtor) {
                var _this = this;
                promiseCtor = getPromiseCtor(promiseCtor);
                return new promiseCtor((function(resolve, reject) {
                    var subscriber = new SafeSubscriber({
                        next: function(value) {
                            try {
                                next(value);
                            } catch (err) {
                                reject(err);
                                subscriber.unsubscribe();
                            }
                        },
                        error: reject,
                        complete: resolve
                    });
                    _this.subscribe(subscriber);
                }));
            };
            Observable.prototype._subscribe = function(subscriber) {
                var _a;
                return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
            };
            Observable.prototype[observable] = function() {
                return this;
            };
            Observable.prototype.pipe = function() {
                var operations = [];
                for (var _i = 0; _i < arguments.length; _i++) operations[_i] = arguments[_i];
                return pipeFromArray(operations)(this);
            };
            Observable.prototype.toPromise = function(promiseCtor) {
                var _this = this;
                promiseCtor = getPromiseCtor(promiseCtor);
                return new promiseCtor((function(resolve, reject) {
                    var value;
                    _this.subscribe((function(x) {
                        return value = x;
                    }), (function(err) {
                        return reject(err);
                    }), (function() {
                        return resolve(value);
                    }));
                }));
            };
            Observable.create = function(subscribe) {
                return new Observable(subscribe);
            };
            return Observable;
        }();
        function getPromiseCtor(promiseCtor) {
            var _a;
            return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
        }
        function isObserver(value) {
            return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
        }
        function isSubscriber(value) {
            return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
        }
        var isArrayLike = function(x) {
            return x && typeof x.length === "number" && typeof x !== "function";
        };
        function isPromise(value) {
            return isFunction(value === null || value === void 0 ? void 0 : value.then);
        }
        function isInteropObservable(input) {
            return isFunction(input[observable]);
        }
        function isAsyncIterable(obj) {
            return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
        }
        function createInvalidObservableTypeError(input) {
            return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
        }
        function getSymbolIterator() {
            if (typeof Symbol !== "function" || !Symbol.iterator) return "@@iterator";
            return Symbol.iterator;
        }
        var iterator_iterator = getSymbolIterator();
        function isIterable(input) {
            return isFunction(input === null || input === void 0 ? void 0 : input[iterator_iterator]);
        }
        function readableStreamLikeToAsyncGenerator(readableStream) {
            return __asyncGenerator(this, arguments, (function readableStreamLikeToAsyncGenerator_1() {
                var reader, _a, value, done;
                return __generator(this, (function(_b) {
                    switch (_b.label) {
                      case 0:
                        reader = readableStream.getReader();
                        _b.label = 1;

                      case 1:
                        _b.trys.push([ 1, , 9, 10 ]);
                        _b.label = 2;

                      case 2:
                        if (false) ;
                        return [ 4, __await(reader.read()) ];

                      case 3:
                        _a = _b.sent(), value = _a.value, done = _a.done;
                        if (!done) return [ 3, 5 ];
                        return [ 4, __await(void 0) ];

                      case 4:
                        return [ 2, _b.sent() ];

                      case 5:
                        return [ 4, __await(value) ];

                      case 6:
                        return [ 4, _b.sent() ];

                      case 7:
                        _b.sent();
                        return [ 3, 2 ];

                      case 8:
                        return [ 3, 10 ];

                      case 9:
                        reader.releaseLock();
                        return [ 7 ];

                      case 10:
                        return [ 2 ];
                    }
                }));
            }));
        }
        function isReadableStreamLike(obj) {
            return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
        }
        function innerFrom(input) {
            if (input instanceof Observable_Observable) return input;
            if (input != null) {
                if (isInteropObservable(input)) return fromInteropObservable(input);
                if (isArrayLike(input)) return fromArrayLike(input);
                if (isPromise(input)) return fromPromise(input);
                if (isAsyncIterable(input)) return fromAsyncIterable(input);
                if (isIterable(input)) return fromIterable(input);
                if (isReadableStreamLike(input)) return fromReadableStreamLike(input);
            }
            throw createInvalidObservableTypeError(input);
        }
        function fromInteropObservable(obj) {
            return new Observable_Observable((function(subscriber) {
                var obs = obj[observable]();
                if (isFunction(obs.subscribe)) return obs.subscribe(subscriber);
                throw new TypeError("Provided object does not correctly implement Symbol.observable");
            }));
        }
        function fromArrayLike(array) {
            return new Observable_Observable((function(subscriber) {
                for (var i = 0; i < array.length && !subscriber.closed; i++) subscriber.next(array[i]);
                subscriber.complete();
            }));
        }
        function fromPromise(promise) {
            return new Observable_Observable((function(subscriber) {
                promise.then((function(value) {
                    if (!subscriber.closed) {
                        subscriber.next(value);
                        subscriber.complete();
                    }
                }), (function(err) {
                    return subscriber.error(err);
                })).then(null, reportUnhandledError);
            }));
        }
        function fromIterable(iterable) {
            return new Observable_Observable((function(subscriber) {
                var e_1, _a;
                try {
                    for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                        var value = iterable_1_1.value;
                        subscriber.next(value);
                        if (subscriber.closed) return;
                    }
                } catch (e_1_1) {
                    e_1 = {
                        error: e_1_1
                    };
                } finally {
                    try {
                        if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
                    } finally {
                        if (e_1) throw e_1.error;
                    }
                }
                subscriber.complete();
            }));
        }
        function fromAsyncIterable(asyncIterable) {
            return new Observable_Observable((function(subscriber) {
                innerFrom_process(asyncIterable, subscriber).catch((function(err) {
                    return subscriber.error(err);
                }));
            }));
        }
        function fromReadableStreamLike(readableStream) {
            return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
        }
        function innerFrom_process(asyncIterable, subscriber) {
            var asyncIterable_1, asyncIterable_1_1;
            var e_2, _a;
            return __awaiter(this, void 0, void 0, (function() {
                var value, e_2_1;
                return __generator(this, (function(_b) {
                    switch (_b.label) {
                      case 0:
                        _b.trys.push([ 0, 5, 6, 11 ]);
                        asyncIterable_1 = __asyncValues(asyncIterable);
                        _b.label = 1;

                      case 1:
                        return [ 4, asyncIterable_1.next() ];

                      case 2:
                        if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [ 3, 4 ];
                        value = asyncIterable_1_1.value;
                        subscriber.next(value);
                        if (subscriber.closed) return [ 2 ];
                        _b.label = 3;

                      case 3:
                        return [ 3, 1 ];

                      case 4:
                        return [ 3, 11 ];

                      case 5:
                        e_2_1 = _b.sent();
                        e_2 = {
                            error: e_2_1
                        };
                        return [ 3, 11 ];

                      case 6:
                        _b.trys.push([ 6, , 9, 10 ]);
                        if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [ 3, 8 ];
                        return [ 4, _a.call(asyncIterable_1) ];

                      case 7:
                        _b.sent();
                        _b.label = 8;

                      case 8:
                        return [ 3, 10 ];

                      case 9:
                        if (e_2) throw e_2.error;
                        return [ 7 ];

                      case 10:
                        return [ 7 ];

                      case 11:
                        subscriber.complete();
                        return [ 2 ];
                    }
                }));
            }));
        }
        function defer(observableFactory) {
            return new Observable_Observable((function(subscriber) {
                innerFrom(observableFactory()).subscribe(subscriber);
            }));
        }
        function isObservable(obj) {
            return !!obj && (obj instanceof Observable_Observable || isFunction(obj.lift) && isFunction(obj.subscribe));
        }
        function isScheduler(value) {
            return value && isFunction(value.schedule);
        }
        function last(arr) {
            return arr[arr.length - 1];
        }
        function args_popResultSelector(args) {
            return isFunction(last(args)) ? args.pop() : void 0;
        }
        function args_popScheduler(args) {
            return isScheduler(last(args)) ? args.pop() : void 0;
        }
        function popNumber(args, defaultValue) {
            return typeof last(args) === "number" ? args.pop() : defaultValue;
        }
        function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
            if (delay === void 0) delay = 0;
            if (repeat === void 0) repeat = false;
            var scheduleSubscription = scheduler.schedule((function() {
                work();
                if (repeat) parentSubscription.add(this.schedule(null, delay)); else this.unsubscribe();
            }), delay);
            parentSubscription.add(scheduleSubscription);
            if (!repeat) return scheduleSubscription;
        }
        function hasLift(source) {
            return isFunction(source === null || source === void 0 ? void 0 : source.lift);
        }
        function operate(init) {
            return function(source) {
                if (hasLift(source)) return source.lift((function(liftedSource) {
                    try {
                        return init(liftedSource, this);
                    } catch (err) {
                        this.error(err);
                    }
                }));
                throw new TypeError("Unable to lift unknown Observable type");
            };
        }
        function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
            return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
        }
        var OperatorSubscriber = function(_super) {
            __extends(OperatorSubscriber, _super);
            function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
                var _this = _super.call(this, destination) || this;
                _this.onFinalize = onFinalize;
                _this.shouldUnsubscribe = shouldUnsubscribe;
                _this._next = onNext ? function(value) {
                    try {
                        onNext(value);
                    } catch (err) {
                        destination.error(err);
                    }
                } : _super.prototype._next;
                _this._error = onError ? function(err) {
                    try {
                        onError(err);
                    } catch (err) {
                        destination.error(err);
                    } finally {
                        this.unsubscribe();
                    }
                } : _super.prototype._error;
                _this._complete = onComplete ? function() {
                    try {
                        onComplete();
                    } catch (err) {
                        destination.error(err);
                    } finally {
                        this.unsubscribe();
                    }
                } : _super.prototype._complete;
                return _this;
            }
            OperatorSubscriber.prototype.unsubscribe = function() {
                var _a;
                if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                    var closed_1 = this.closed;
                    _super.prototype.unsubscribe.call(this);
                    !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
                }
            };
            return OperatorSubscriber;
        }(Subscriber);
        function observeOn(scheduler, delay) {
            if (delay === void 0) delay = 0;
            return operate((function(source, subscriber) {
                source.subscribe(createOperatorSubscriber(subscriber, (function(value) {
                    return executeSchedule(subscriber, scheduler, (function() {
                        return subscriber.next(value);
                    }), delay);
                }), (function() {
                    return executeSchedule(subscriber, scheduler, (function() {
                        return subscriber.complete();
                    }), delay);
                }), (function(err) {
                    return executeSchedule(subscriber, scheduler, (function() {
                        return subscriber.error(err);
                    }), delay);
                })));
            }));
        }
        function subscribeOn(scheduler, delay) {
            if (delay === void 0) delay = 0;
            return operate((function(source, subscriber) {
                subscriber.add(scheduler.schedule((function() {
                    return source.subscribe(subscriber);
                }), delay));
            }));
        }
        function scheduleObservable(input, scheduler) {
            return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
        }
        function schedulePromise(input, scheduler) {
            return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
        }
        function scheduleArray(input, scheduler) {
            return new Observable_Observable((function(subscriber) {
                var i = 0;
                return scheduler.schedule((function() {
                    if (i === input.length) subscriber.complete(); else {
                        subscriber.next(input[i++]);
                        if (!subscriber.closed) this.schedule();
                    }
                }));
            }));
        }
        function scheduleIterable(input, scheduler) {
            return new Observable_Observable((function(subscriber) {
                var iterator;
                executeSchedule(subscriber, scheduler, (function() {
                    iterator = input[iterator_iterator]();
                    executeSchedule(subscriber, scheduler, (function() {
                        var _a;
                        var value;
                        var done;
                        try {
                            _a = iterator.next(), value = _a.value, done = _a.done;
                        } catch (err) {
                            subscriber.error(err);
                            return;
                        }
                        if (done) subscriber.complete(); else subscriber.next(value);
                    }), 0, true);
                }));
                return function() {
                    return isFunction(iterator === null || iterator === void 0 ? void 0 : iterator.return) && iterator.return();
                };
            }));
        }
        function scheduleAsyncIterable(input, scheduler) {
            if (!input) throw new Error("Iterable cannot be null");
            return new Observable_Observable((function(subscriber) {
                executeSchedule(subscriber, scheduler, (function() {
                    var iterator = input[Symbol.asyncIterator]();
                    executeSchedule(subscriber, scheduler, (function() {
                        iterator.next().then((function(result) {
                            if (result.done) subscriber.complete(); else subscriber.next(result.value);
                        }));
                    }), 0, true);
                }));
            }));
        }
        function scheduleReadableStreamLike(input, scheduler) {
            return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
        }
        function scheduled(input, scheduler) {
            if (input != null) {
                if (isInteropObservable(input)) return scheduleObservable(input, scheduler);
                if (isArrayLike(input)) return scheduleArray(input, scheduler);
                if (isPromise(input)) return schedulePromise(input, scheduler);
                if (isAsyncIterable(input)) return scheduleAsyncIterable(input, scheduler);
                if (isIterable(input)) return scheduleIterable(input, scheduler);
                if (isReadableStreamLike(input)) return scheduleReadableStreamLike(input, scheduler);
            }
            throw createInvalidObservableTypeError(input);
        }
        function from_from(input, scheduler) {
            return scheduler ? scheduled(input, scheduler) : innerFrom(input);
        }
        function of() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
            var scheduler = args_popScheduler(args);
            return from_from(args, scheduler);
        }
        function map(project, thisArg) {
            return operate((function(source, subscriber) {
                var index = 0;
                source.subscribe(createOperatorSubscriber(subscriber, (function(value) {
                    subscriber.next(project.call(thisArg, value, index++));
                })));
            }));
        }
        function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
            var buffer = [];
            var active = 0;
            var index = 0;
            var isComplete = false;
            var checkComplete = function() {
                if (isComplete && !buffer.length && !active) subscriber.complete();
            };
            var outerNext = function(value) {
                return active < concurrent ? doInnerSub(value) : buffer.push(value);
            };
            var doInnerSub = function(value) {
                expand && subscriber.next(value);
                active++;
                var innerComplete = false;
                innerFrom(project(value, index++)).subscribe(createOperatorSubscriber(subscriber, (function(innerValue) {
                    onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
                    if (expand) outerNext(innerValue); else subscriber.next(innerValue);
                }), (function() {
                    innerComplete = true;
                }), void 0, (function() {
                    if (innerComplete) try {
                        active--;
                        var _loop_1 = function() {
                            var bufferedValue = buffer.shift();
                            if (innerSubScheduler) executeSchedule(subscriber, innerSubScheduler, (function() {
                                return doInnerSub(bufferedValue);
                            })); else doInnerSub(bufferedValue);
                        };
                        while (buffer.length && active < concurrent) _loop_1();
                        checkComplete();
                    } catch (err) {
                        subscriber.error(err);
                    }
                })));
            };
            source.subscribe(createOperatorSubscriber(subscriber, outerNext, (function() {
                isComplete = true;
                checkComplete();
            })));
            return function() {
                additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
            };
        }
        function mergeMap(project, resultSelector, concurrent) {
            if (concurrent === void 0) concurrent = 1 / 0;
            if (isFunction(resultSelector)) return mergeMap((function(a, i) {
                return map((function(b, ii) {
                    return resultSelector(a, b, i, ii);
                }))(innerFrom(project(a, i)));
            }), concurrent); else if (typeof resultSelector === "number") concurrent = resultSelector;
            return operate((function(source, subscriber) {
                return mergeInternals(source, subscriber, project, concurrent);
            }));
        }
        var EmptyError = createErrorClass((function(_super) {
            return function EmptyErrorImpl() {
                _super(this);
                this.name = "EmptyError";
                this.message = "no elements in sequence";
            };
        }));
        function lastValueFrom(source, config) {
            var hasConfig = typeof config === "object";
            return new Promise((function(resolve, reject) {
                var _hasValue = false;
                var _value;
                source.subscribe({
                    next: function(value) {
                        _value = value;
                        _hasValue = true;
                    },
                    error: reject,
                    complete: function() {
                        if (_hasValue) resolve(_value); else if (hasConfig) resolve(config.defaultValue); else reject(new EmptyError);
                    }
                });
            }));
        }
        var ObjectUnsubscribedError = createErrorClass((function(_super) {
            return function ObjectUnsubscribedErrorImpl() {
                _super(this);
                this.name = "ObjectUnsubscribedError";
                this.message = "object unsubscribed";
            };
        }));
        var Subject = function(_super) {
            __extends(Subject, _super);
            function Subject() {
                var _this = _super.call(this) || this;
                _this.closed = false;
                _this.currentObservers = null;
                _this.observers = [];
                _this.isStopped = false;
                _this.hasError = false;
                _this.thrownError = null;
                return _this;
            }
            Subject.prototype.lift = function(operator) {
                var subject = new AnonymousSubject(this, this);
                subject.operator = operator;
                return subject;
            };
            Subject.prototype._throwIfClosed = function() {
                if (this.closed) throw new ObjectUnsubscribedError;
            };
            Subject.prototype.next = function(value) {
                var _this = this;
                errorContext((function() {
                    var e_1, _a;
                    _this._throwIfClosed();
                    if (!_this.isStopped) {
                        if (!_this.currentObservers) _this.currentObservers = Array.from(_this.observers);
                        try {
                            for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
                                var observer = _c.value;
                                observer.next(value);
                            }
                        } catch (e_1_1) {
                            e_1 = {
                                error: e_1_1
                            };
                        } finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            } finally {
                                if (e_1) throw e_1.error;
                            }
                        }
                    }
                }));
            };
            Subject.prototype.error = function(err) {
                var _this = this;
                errorContext((function() {
                    _this._throwIfClosed();
                    if (!_this.isStopped) {
                        _this.hasError = _this.isStopped = true;
                        _this.thrownError = err;
                        var observers = _this.observers;
                        while (observers.length) observers.shift().error(err);
                    }
                }));
            };
            Subject.prototype.complete = function() {
                var _this = this;
                errorContext((function() {
                    _this._throwIfClosed();
                    if (!_this.isStopped) {
                        _this.isStopped = true;
                        var observers = _this.observers;
                        while (observers.length) observers.shift().complete();
                    }
                }));
            };
            Subject.prototype.unsubscribe = function() {
                this.isStopped = this.closed = true;
                this.observers = this.currentObservers = null;
            };
            Object.defineProperty(Subject.prototype, "observed", {
                get: function() {
                    var _a;
                    return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
                },
                enumerable: false,
                configurable: true
            });
            Subject.prototype._trySubscribe = function(subscriber) {
                this._throwIfClosed();
                return _super.prototype._trySubscribe.call(this, subscriber);
            };
            Subject.prototype._subscribe = function(subscriber) {
                this._throwIfClosed();
                this._checkFinalizedStatuses(subscriber);
                return this._innerSubscribe(subscriber);
            };
            Subject.prototype._innerSubscribe = function(subscriber) {
                var _this = this;
                var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
                if (hasError || isStopped) return EMPTY_SUBSCRIPTION;
                this.currentObservers = null;
                observers.push(subscriber);
                return new Subscription((function() {
                    _this.currentObservers = null;
                    arrRemove(observers, subscriber);
                }));
            };
            Subject.prototype._checkFinalizedStatuses = function(subscriber) {
                var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
                if (hasError) subscriber.error(thrownError); else if (isStopped) subscriber.complete();
            };
            Subject.prototype.asObservable = function() {
                var observable = new Observable_Observable;
                observable.source = this;
                return observable;
            };
            Subject.create = function(destination, source) {
                return new AnonymousSubject(destination, source);
            };
            return Subject;
        }(Observable_Observable);
        var AnonymousSubject = function(_super) {
            __extends(AnonymousSubject, _super);
            function AnonymousSubject(destination, source) {
                var _this = _super.call(this) || this;
                _this.destination = destination;
                _this.source = source;
                return _this;
            }
            AnonymousSubject.prototype.next = function(value) {
                var _a, _b;
                (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
            };
            AnonymousSubject.prototype.error = function(err) {
                var _a, _b;
                (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
            };
            AnonymousSubject.prototype.complete = function() {
                var _a, _b;
                (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
            };
            AnonymousSubject.prototype._subscribe = function(subscriber) {
                var _a, _b;
                return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
            };
            return AnonymousSubject;
        }(Subject);
        var dateTimestampProvider = {
            now: function() {
                return (dateTimestampProvider.delegate || Date).now();
            },
            delegate: void 0
        };
        var ReplaySubject = function(_super) {
            __extends(ReplaySubject, _super);
            function ReplaySubject(_bufferSize, _windowTime, _timestampProvider) {
                if (_bufferSize === void 0) _bufferSize = 1 / 0;
                if (_windowTime === void 0) _windowTime = 1 / 0;
                if (_timestampProvider === void 0) _timestampProvider = dateTimestampProvider;
                var _this = _super.call(this) || this;
                _this._bufferSize = _bufferSize;
                _this._windowTime = _windowTime;
                _this._timestampProvider = _timestampProvider;
                _this._buffer = [];
                _this._infiniteTimeWindow = true;
                _this._infiniteTimeWindow = _windowTime === 1 / 0;
                _this._bufferSize = Math.max(1, _bufferSize);
                _this._windowTime = Math.max(1, _windowTime);
                return _this;
            }
            ReplaySubject.prototype.next = function(value) {
                var _a = this, isStopped = _a.isStopped, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow, _timestampProvider = _a._timestampProvider, _windowTime = _a._windowTime;
                if (!isStopped) {
                    _buffer.push(value);
                    !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
                }
                this._trimBuffer();
                _super.prototype.next.call(this, value);
            };
            ReplaySubject.prototype._subscribe = function(subscriber) {
                this._throwIfClosed();
                this._trimBuffer();
                var subscription = this._innerSubscribe(subscriber);
                var _a = this, _infiniteTimeWindow = _a._infiniteTimeWindow, _buffer = _a._buffer;
                var copy = _buffer.slice();
                for (var i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) subscriber.next(copy[i]);
                this._checkFinalizedStatuses(subscriber);
                return subscription;
            };
            ReplaySubject.prototype._trimBuffer = function() {
                var _a = this, _bufferSize = _a._bufferSize, _timestampProvider = _a._timestampProvider, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow;
                var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
                _bufferSize < 1 / 0 && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
                if (!_infiniteTimeWindow) {
                    var now = _timestampProvider.now();
                    var last = 0;
                    for (var i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) last = i;
                    last && _buffer.splice(0, last + 1);
                }
            };
            return ReplaySubject;
        }(Subject);
        function share(options) {
            if (options === void 0) options = {};
            var _a = options.connector, connector = _a === void 0 ? function() {
                return new Subject;
            } : _a, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
            return function(wrapperSource) {
                var connection;
                var resetConnection;
                var subject;
                var refCount = 0;
                var hasCompleted = false;
                var hasErrored = false;
                var cancelReset = function() {
                    resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
                    resetConnection = void 0;
                };
                var reset = function() {
                    cancelReset();
                    connection = subject = void 0;
                    hasCompleted = hasErrored = false;
                };
                var resetAndUnsubscribe = function() {
                    var conn = connection;
                    reset();
                    conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
                };
                return operate((function(source, subscriber) {
                    refCount++;
                    if (!hasErrored && !hasCompleted) cancelReset();
                    var dest = subject = subject !== null && subject !== void 0 ? subject : connector();
                    subscriber.add((function() {
                        refCount--;
                        if (refCount === 0 && !hasErrored && !hasCompleted) resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
                    }));
                    dest.subscribe(subscriber);
                    if (!connection && refCount > 0) {
                        connection = new SafeSubscriber({
                            next: function(value) {
                                return dest.next(value);
                            },
                            error: function(err) {
                                hasErrored = true;
                                cancelReset();
                                resetConnection = handleReset(reset, resetOnError, err);
                                dest.error(err);
                            },
                            complete: function() {
                                hasCompleted = true;
                                cancelReset();
                                resetConnection = handleReset(reset, resetOnComplete);
                                dest.complete();
                            }
                        });
                        innerFrom(source).subscribe(connection);
                    }
                }))(wrapperSource);
            };
        }
        function handleReset(reset, on) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) args[_i - 2] = arguments[_i];
            if (on === true) {
                reset();
                return;
            }
            if (on === false) return;
            var onSubscriber = new SafeSubscriber({
                next: function() {
                    onSubscriber.unsubscribe();
                    reset();
                }
            });
            return innerFrom(on.apply(void 0, __spreadArray([], __read(args)))).subscribe(onSubscriber);
        }
        function shareReplay(configOrBufferSize, windowTime, scheduler) {
            var _a, _b, _c;
            var bufferSize;
            var refCount = false;
            if (configOrBufferSize && typeof configOrBufferSize === "object") _a = configOrBufferSize.bufferSize, 
            bufferSize = _a === void 0 ? 1 / 0 : _a, _b = configOrBufferSize.windowTime, windowTime = _b === void 0 ? 1 / 0 : _b, 
            _c = configOrBufferSize.refCount, refCount = _c === void 0 ? false : _c, scheduler = configOrBufferSize.scheduler; else bufferSize = configOrBufferSize !== null && configOrBufferSize !== void 0 ? configOrBufferSize : 1 / 0;
            return share({
                connector: function() {
                    return new ReplaySubject(bufferSize, windowTime, scheduler);
                },
                resetOnError: true,
                resetOnComplete: false,
                resetOnRefCountZero: refCount
            });
        }
        function catchError(selector) {
            return operate((function(source, subscriber) {
                var innerSub = null;
                var syncUnsub = false;
                var handledResult;
                innerSub = source.subscribe(createOperatorSubscriber(subscriber, void 0, void 0, (function(err) {
                    handledResult = innerFrom(selector(err, catchError(selector)(source)));
                    if (innerSub) {
                        innerSub.unsubscribe();
                        innerSub = null;
                        handledResult.subscribe(subscriber);
                    } else syncUnsub = true;
                })));
                if (syncUnsub) {
                    innerSub.unsubscribe();
                    innerSub = null;
                    handledResult.subscribe(subscriber);
                }
            }));
        }
        function mergeAll(concurrent) {
            if (concurrent === void 0) concurrent = 1 / 0;
            return mergeMap(identity_identity, concurrent);
        }
        function concatAll() {
            return mergeAll(1);
        }
        function concat() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
            return concatAll()(from_from(args, args_popScheduler(args)));
        }
        var Action = function(_super) {
            __extends(Action, _super);
            function Action(scheduler, work) {
                return _super.call(this) || this;
            }
            Action.prototype.schedule = function(state, delay) {
                if (delay === void 0) delay = 0;
                return this;
            };
            return Action;
        }(Subscription);
        var intervalProvider = {
            setInterval: function(handler, timeout) {
                var args = [];
                for (var _i = 2; _i < arguments.length; _i++) args[_i - 2] = arguments[_i];
                var delegate = intervalProvider.delegate;
                if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) return delegate.setInterval.apply(delegate, __spreadArray([ handler, timeout ], __read(args)));
                return setInterval.apply(void 0, __spreadArray([ handler, timeout ], __read(args)));
            },
            clearInterval: function(handle) {
                var delegate = intervalProvider.delegate;
                return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
            },
            delegate: void 0
        };
        var AsyncAction = function(_super) {
            __extends(AsyncAction, _super);
            function AsyncAction(scheduler, work) {
                var _this = _super.call(this, scheduler, work) || this;
                _this.scheduler = scheduler;
                _this.work = work;
                _this.pending = false;
                return _this;
            }
            AsyncAction.prototype.schedule = function(state, delay) {
                var _a;
                if (delay === void 0) delay = 0;
                if (this.closed) return this;
                this.state = state;
                var id = this.id;
                var scheduler = this.scheduler;
                if (id != null) this.id = this.recycleAsyncId(scheduler, id, delay);
                this.pending = true;
                this.delay = delay;
                this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay);
                return this;
            };
            AsyncAction.prototype.requestAsyncId = function(scheduler, _id, delay) {
                if (delay === void 0) delay = 0;
                return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
            };
            AsyncAction.prototype.recycleAsyncId = function(_scheduler, id, delay) {
                if (delay === void 0) delay = 0;
                if (delay != null && this.delay === delay && this.pending === false) return id;
                if (id != null) intervalProvider.clearInterval(id);
                return;
            };
            AsyncAction.prototype.execute = function(state, delay) {
                if (this.closed) return new Error("executing a cancelled action");
                this.pending = false;
                var error = this._execute(state, delay);
                if (error) return error; else if (this.pending === false && this.id != null) this.id = this.recycleAsyncId(this.scheduler, this.id, null);
            };
            AsyncAction.prototype._execute = function(state, _delay) {
                var errored = false;
                var errorValue;
                try {
                    this.work(state);
                } catch (e) {
                    errored = true;
                    errorValue = e ? e : new Error("Scheduled action threw falsy error");
                }
                if (errored) {
                    this.unsubscribe();
                    return errorValue;
                }
            };
            AsyncAction.prototype.unsubscribe = function() {
                if (!this.closed) {
                    var _a = this, id = _a.id, scheduler = _a.scheduler;
                    var actions = scheduler.actions;
                    this.work = this.state = this.scheduler = null;
                    this.pending = false;
                    arrRemove(actions, this);
                    if (id != null) this.id = this.recycleAsyncId(scheduler, id, null);
                    this.delay = null;
                    _super.prototype.unsubscribe.call(this);
                }
            };
            return AsyncAction;
        }(Action);
        var Scheduler = function() {
            function Scheduler(schedulerActionCtor, now) {
                if (now === void 0) now = Scheduler.now;
                this.schedulerActionCtor = schedulerActionCtor;
                this.now = now;
            }
            Scheduler.prototype.schedule = function(work, delay, state) {
                if (delay === void 0) delay = 0;
                return new this.schedulerActionCtor(this, work).schedule(state, delay);
            };
            Scheduler.now = dateTimestampProvider.now;
            return Scheduler;
        }();
        var AsyncScheduler = function(_super) {
            __extends(AsyncScheduler, _super);
            function AsyncScheduler(SchedulerAction, now) {
                if (now === void 0) now = Scheduler.now;
                var _this = _super.call(this, SchedulerAction, now) || this;
                _this.actions = [];
                _this._active = false;
                return _this;
            }
            AsyncScheduler.prototype.flush = function(action) {
                var actions = this.actions;
                if (this._active) {
                    actions.push(action);
                    return;
                }
                var error;
                this._active = true;
                do {
                    if (error = action.execute(action.state, action.delay)) break;
                } while (action = actions.shift());
                this._active = false;
                if (error) {
                    while (action = actions.shift()) action.unsubscribe();
                    throw error;
                }
            };
            return AsyncScheduler;
        }(Scheduler);
        var asyncScheduler = new AsyncScheduler(AsyncAction);
        var async_async = asyncScheduler;
        function isValidDate(value) {
            return value instanceof Date && !isNaN(value);
        }
        function timer(dueTime, intervalOrScheduler, scheduler) {
            if (dueTime === void 0) dueTime = 0;
            if (scheduler === void 0) scheduler = async_async;
            var intervalDuration = -1;
            if (intervalOrScheduler != null) if (isScheduler(intervalOrScheduler)) scheduler = intervalOrScheduler; else intervalDuration = intervalOrScheduler;
            return new Observable_Observable((function(subscriber) {
                var due = isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
                if (due < 0) due = 0;
                var n = 0;
                return scheduler.schedule((function() {
                    if (!subscriber.closed) {
                        subscriber.next(n++);
                        if (0 <= intervalDuration) this.schedule(void 0, intervalDuration); else subscriber.complete();
                    }
                }), due);
            }));
        }
        function throwError(errorOrErrorFactory, scheduler) {
            var errorFactory = isFunction(errorOrErrorFactory) ? errorOrErrorFactory : function() {
                return errorOrErrorFactory;
            };
            var init = function(subscriber) {
                return subscriber.error(errorFactory());
            };
            return new Observable_Observable(scheduler ? function(subscriber) {
                return scheduler.schedule(init, 0, subscriber);
            } : init);
        }
        function tap(observerOrNext, error, complete) {
            var tapObserver = isFunction(observerOrNext) || error || complete ? {
                next: observerOrNext,
                error,
                complete
            } : observerOrNext;
            return tapObserver ? operate((function(source, subscriber) {
                var _a;
                (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
                var isUnsub = true;
                source.subscribe(createOperatorSubscriber(subscriber, (function(value) {
                    var _a;
                    (_a = tapObserver.next) === null || _a === void 0 ? void 0 : _a.call(tapObserver, value);
                    subscriber.next(value);
                }), (function() {
                    var _a;
                    isUnsub = false;
                    (_a = tapObserver.complete) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
                    subscriber.complete();
                }), (function(err) {
                    var _a;
                    isUnsub = false;
                    (_a = tapObserver.error) === null || _a === void 0 ? void 0 : _a.call(tapObserver, err);
                    subscriber.error(err);
                }), (function() {
                    var _a, _b;
                    if (isUnsub) (_a = tapObserver.unsubscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
                    (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
                })));
            })) : identity_identity;
        }
        function finalize(callback) {
            return operate((function(source, subscriber) {
                try {
                    source.subscribe(subscriber);
                } finally {
                    subscriber.add(callback);
                }
            }));
        }
        var EMPTY = new Observable_Observable((function(subscriber) {
            return subscriber.complete();
        }));
        function merge() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
            var scheduler = args_popScheduler(args);
            var concurrent = popNumber(args, 1 / 0);
            var sources = args;
            return !sources.length ? EMPTY : sources.length === 1 ? innerFrom(sources[0]) : mergeAll(concurrent)(from_from(sources, scheduler));
        }
        var stegaClean = __webpack_require__(125);
        function combineLatestInit(observables, scheduler, valueTransform) {
            if (valueTransform === void 0) valueTransform = identity_identity;
            return function(subscriber) {
                maybeSchedule(scheduler, (function() {
                    var length = observables.length;
                    var values = new Array(length);
                    var active = length;
                    var remainingFirstValues = length;
                    var _loop_1 = function(i) {
                        maybeSchedule(scheduler, (function() {
                            var source = from_from(observables[i], scheduler);
                            var hasFirstValue = false;
                            source.subscribe(createOperatorSubscriber(subscriber, (function(value) {
                                values[i] = value;
                                if (!hasFirstValue) {
                                    hasFirstValue = true;
                                    remainingFirstValues--;
                                }
                                if (!remainingFirstValues) subscriber.next(valueTransform(values.slice()));
                            }), (function() {
                                if (! --active) subscriber.complete();
                            })));
                        }), subscriber);
                    };
                    for (var i = 0; i < length; i++) _loop_1(i);
                }), subscriber);
            };
        }
        function maybeSchedule(scheduler, execute, subscription) {
            if (scheduler) executeSchedule(subscription, scheduler, execute); else execute();
        }
        var isArray = Array.isArray;
        function argsOrArgArray(args) {
            return args.length === 1 && isArray(args[0]) ? args[0] : args;
        }
        var mapOneOrManyArgs_isArray = Array.isArray;
        function callOrApply(fn, args) {
            return mapOneOrManyArgs_isArray(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
        }
        function mapOneOrManyArgs_mapOneOrManyArgs(fn) {
            return map((function(args) {
                return callOrApply(fn, args);
            }));
        }
        function combineLatest_combineLatest() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
            var resultSelector = args_popResultSelector(args);
            return resultSelector ? pipe(combineLatest_combineLatest.apply(void 0, __spreadArray([], __read(args))), mapOneOrManyArgs_mapOneOrManyArgs(resultSelector)) : operate((function(source, subscriber) {
                combineLatestInit(__spreadArray([ source ], __read(argsOrArgArray(args))))(subscriber);
            }));
        }
        function combineLatestWith() {
            var otherSources = [];
            for (var _i = 0; _i < arguments.length; _i++) otherSources[_i] = arguments[_i];
            return combineLatest_combineLatest.apply(void 0, __spreadArray([], __read(otherSources)));
        }
        function filter(predicate, thisArg) {
            return operate((function(source, subscriber) {
                var index = 0;
                source.subscribe(createOperatorSubscriber(subscriber, (function(value) {
                    return predicate.call(thisArg, value, index++) && subscriber.next(value);
                })));
            }));
        }
        class ClientError extends Error {
            response;
            statusCode=400;
            responseBody;
            details;
            constructor(res) {
                const props = extractErrorProps(res);
                super(props.message), Object.assign(this, props);
            }
        }
        class ServerError extends Error {
            response;
            statusCode=500;
            responseBody;
            details;
            constructor(res) {
                const props = extractErrorProps(res);
                super(props.message), Object.assign(this, props);
            }
        }
        function extractErrorProps(res) {
            const body = res.body, props = {
                response: res,
                statusCode: res.statusCode,
                responseBody: stringifyBody(body, res),
                message: "",
                details: void 0
            };
            if (body.error && body.message) return props.message = `${body.error} - ${body.message}`, 
            props;
            if (isMutationError(body) || isActionError(body)) {
                const allItems = body.error.items || [], items = allItems.slice(0, 5).map((item => item.error?.description)).filter(Boolean);
                let itemsStr = items.length ? `:\n- ${items.join(`\n- `)}` : "";
                return allItems.length > 5 && (itemsStr += `\n...and ${allItems.length - 5} more`), 
                props.message = `${body.error.description}${itemsStr}`, props.details = body.error, 
                props;
            }
            return body.error && body.error.description ? (props.message = body.error.description, 
            props.details = body.error, props) : (props.message = body.error || body.message || httpErrorMessage(res), 
            props);
        }
        function isMutationError(body) {
            return isPlainObject(body) && isPlainObject(body.error) && body.error.type === "mutationError" && typeof body.error.description == "string";
        }
        function isActionError(body) {
            return isPlainObject(body) && isPlainObject(body.error) && body.error.type === "actionError" && typeof body.error.description == "string";
        }
        function isPlainObject(obj) {
            return typeof obj == "object" && obj !== null && !Array.isArray(obj);
        }
        function httpErrorMessage(res) {
            const statusMessage = res.statusMessage ? ` ${res.statusMessage}` : "";
            return `${res.method}-request to ${res.url} resulted in HTTP ${res.statusCode}${statusMessage}`;
        }
        function stringifyBody(body, res) {
            return (res.headers["content-type"] || "").toLowerCase().indexOf("application/json") !== -1 ? JSON.stringify(body, null, 2) : body;
        }
        class CorsOriginError extends Error {
            projectId;
            addOriginUrl;
            constructor({projectId: projectId2}) {
                super("CorsOriginError"), this.name = "CorsOriginError", this.projectId = projectId2;
                const url = new URL(`https://sanity.io/manage/project/${projectId2}/api`);
                if (typeof location < "u") {
                    const {origin} = location;
                    url.searchParams.set("cors", "add"), url.searchParams.set("origin", origin), this.addOriginUrl = url, 
                    this.message = `The current origin is not allowed to connect to the Live Content API. Add it here: ${url}`;
                } else this.message = `The current origin is not allowed to connect to the Live Content API. Change your configuration here: ${url}`;
            }
        }
        const httpError = {
            onResponse: res => {
                if (res.statusCode >= 500) throw new ServerError(res);
                if (res.statusCode >= 400) throw new ClientError(res);
                return res;
            }
        };
        function printWarnings() {
            const seen = {};
            return {
                onResponse: res => {
                    const warn = res.headers["x-sanity-warning"], warnings = Array.isArray(warn) ? warn : [ warn ];
                    for (const msg of warnings) !msg || seen[msg] || (seen[msg] = !0, console.warn(msg));
                    return res;
                }
            };
        }
        function defineHttpRequest(envMiddleware2) {
            return p([ P({
                shouldRetry
            }), ...envMiddleware2, printWarnings(), x(), E(), S(), httpError, A({
                implementation: Observable_Observable
            }) ]);
        }
        function shouldRetry(err, attempt, options) {
            if (options.maxRetries === 0) return !1;
            const isSafe = options.method === "GET" || options.method === "HEAD", isQuery = (options.uri || options.url).startsWith("/data/query"), isRetriableResponse = err.response && (err.response.statusCode === 429 || err.response.statusCode === 502 || err.response.statusCode === 503);
            return (isSafe || isQuery) && isRetriableResponse ? !0 : P.shouldRetry(err, attempt, options);
        }
        const BASE_URL = "https://www.sanity.io/help/";
        function generateHelpUrl(slug) {
            return BASE_URL + slug;
        }
        const VALID_ASSET_TYPES = [ "image", "file" ], VALID_INSERT_LOCATIONS = [ "before", "after", "replace" ], dataset = name => {
            if (!/^(~[a-z0-9]{1}[-\w]{0,63}|[a-z0-9]{1}[-\w]{0,63})$/.test(name)) throw new Error("Datasets can only contain lowercase characters, numbers, underscores and dashes, and start with tilde, and be maximum 64 characters");
        }, projectId = id => {
            if (!/^[-a-z0-9]+$/i.test(id)) throw new Error("`projectId` can only contain only a-z, 0-9 and dashes");
        }, validateAssetType = type => {
            if (VALID_ASSET_TYPES.indexOf(type) === -1) throw new Error(`Invalid asset type: ${type}. Must be one of ${VALID_ASSET_TYPES.join(", ")}`);
        }, validateObject = (op, val) => {
            if (val === null || typeof val != "object" || Array.isArray(val)) throw new Error(`${op}() takes an object of properties`);
        }, validateDocumentId = (op, id) => {
            if (typeof id != "string" || !/^[a-z0-9_][a-z0-9_.-]{0,127}$/i.test(id) || id.includes("..")) throw new Error(`${op}(): "${id}" is not a valid document ID`);
        }, requireDocumentId = (op, doc) => {
            if (!doc._id) throw new Error(`${op}() requires that the document contains an ID ("_id" property)`);
            validateDocumentId(op, doc._id);
        }, validateInsert = (at, selector, items) => {
            const signature = "insert(at, selector, items)";
            if (VALID_INSERT_LOCATIONS.indexOf(at) === -1) {
                const valid = VALID_INSERT_LOCATIONS.map((loc => `"${loc}"`)).join(", ");
                throw new Error(`${signature} takes an "at"-argument which is one of: ${valid}`);
            }
            if (typeof selector != "string") throw new Error(`${signature} takes a "selector"-argument which must be a string`);
            if (!Array.isArray(items)) throw new Error(`${signature} takes an "items"-argument which must be an array`);
        }, hasDataset = config => {
            if (!config.dataset) throw new Error("`dataset` must be provided to perform queries");
            return config.dataset || "";
        }, requestTag = tag => {
            if (typeof tag != "string" || !/^[a-z0-9._-]{1,75}$/i.test(tag)) throw new Error("Tag can only contain alphanumeric characters, underscores, dashes and dots, and be between one and 75 characters long.");
            return tag;
        };
        function once(fn) {
            let returnValue, didCall = !1;
            return (...args) => (didCall || (returnValue = fn(...args), didCall = !0), returnValue);
        }
        const createWarningPrinter = message => once(((...args) => console.warn(message.join(" "), ...args))), printCdnAndWithCredentialsWarning = createWarningPrinter([ "Because you set `withCredentials` to true, we will override your `useCdn`", "setting to be false since (cookie-based) credentials are never set on the CDN" ]), printCdnWarning = createWarningPrinter([ "Since you haven't set a value for `useCdn`, we will deliver content using our", "global, edge-cached API-CDN. If you wish to have content delivered faster, set", "`useCdn: false` to use the Live API. Note: You may incur higher costs using the live API." ]), printCdnPreviewDraftsWarning = createWarningPrinter([ "The Sanity client is configured with the `perspective` set to `drafts` or `previewDrafts`, which doesn't support the API-CDN.", "The Live API will be used instead. Set `useCdn: false` in your configuration to hide this warning." ]), printPreviewDraftsDeprecationWarning = createWarningPrinter([ "The `previewDrafts` perspective has been renamed to  `drafts` and will be removed in a future API version" ]), printBrowserTokenWarning = createWarningPrinter([ "You have configured Sanity client to use a token in the browser. This may cause unintentional security issues.", `See ${generateHelpUrl("js-client-browser-token")} for more information and how to hide this warning.` ]), printNoApiVersionSpecifiedWarning = createWarningPrinter([ "Using the Sanity client without specifying an API version is deprecated.", `See ${generateHelpUrl("js-client-api-version")}` ]), printNoDefaultExport = createWarningPrinter([ "The default export of @sanity/client has been deprecated. Use the named export `createClient` instead." ]), defaultCdnHost = "apicdn.sanity.io", defaultConfig = {
            apiHost: "https://api.sanity.io",
            apiVersion: "1",
            useProjectHostname: !0,
            stega: {
                enabled: !1
            }
        }, LOCALHOSTS = [ "localhost", "127.0.0.1", "0.0.0.0" ], isLocal = host => LOCALHOSTS.indexOf(host) !== -1;
        function validateApiVersion(apiVersion) {
            if (apiVersion === "1" || apiVersion === "X") return;
            const apiDate = new Date(apiVersion);
            if (!(/^\d{4}-\d{2}-\d{2}$/.test(apiVersion) && apiDate instanceof Date && apiDate.getTime() > 0)) throw new Error("Invalid API version string, expected `1` or date in format `YYYY-MM-DD`");
        }
        const VALID_PERSPECTIVE = /^[a-z0-9_]+$/i;
        function validateApiPerspective(perspective) {
            if (Array.isArray(perspective) && perspective.includes("raw")) throw new TypeError('Invalid API perspective value: "raw". The raw-perspective can not be combined with other perspectives');
            const invalid = (Array.isArray(perspective) ? perspective : [ perspective ]).filter((perspectiveName => typeof perspectiveName != "string" || !VALID_PERSPECTIVE.test(perspectiveName)));
            if (invalid.length > 0) {
                const formatted = invalid.map((v => JSON.stringify(v)));
                throw new TypeError(`Invalid API perspective value${invalid.length === 1 ? "" : "s"}: ${formatted.join(", ")}, expected \`published\`, \`drafts\`, \`raw\` or a release identifier string`);
            }
        }
        const initConfig = (config, prevConfig) => {
            const specifiedConfig = {
                ...prevConfig,
                ...config,
                stega: {
                    ...typeof prevConfig.stega == "boolean" ? {
                        enabled: prevConfig.stega
                    } : prevConfig.stega || defaultConfig.stega,
                    ...typeof config.stega == "boolean" ? {
                        enabled: config.stega
                    } : config.stega || {}
                }
            };
            specifiedConfig.apiVersion || printNoApiVersionSpecifiedWarning();
            const newConfig = {
                ...defaultConfig,
                ...specifiedConfig
            }, projectBased = newConfig.useProjectHostname;
            if (typeof Promise > "u") {
                const helpUrl = generateHelpUrl("js-client-promise-polyfill");
                throw new Error(`No native Promise-implementation found, polyfill needed - see ${helpUrl}`);
            }
            if (projectBased && !newConfig.projectId) throw new Error("Configuration must contain `projectId`");
            if (typeof newConfig.perspective < "u" && validateApiPerspective(newConfig.perspective), 
            "encodeSourceMap" in newConfig) throw new Error("It looks like you're using options meant for '@sanity/preview-kit/client'. 'encodeSourceMap' is not supported in '@sanity/client'. Did you mean 'stega.enabled'?");
            if ("encodeSourceMapAtPath" in newConfig) throw new Error("It looks like you're using options meant for '@sanity/preview-kit/client'. 'encodeSourceMapAtPath' is not supported in '@sanity/client'. Did you mean 'stega.filter'?");
            if (typeof newConfig.stega.enabled != "boolean") throw new Error(`stega.enabled must be a boolean, received ${newConfig.stega.enabled}`);
            if (newConfig.stega.enabled && newConfig.stega.studioUrl === void 0) throw new Error("stega.studioUrl must be defined when stega.enabled is true");
            if (newConfig.stega.enabled && typeof newConfig.stega.studioUrl != "string" && typeof newConfig.stega.studioUrl != "function") throw new Error(`stega.studioUrl must be a string or a function, received ${newConfig.stega.studioUrl}`);
            const isBrowser = typeof window < "u" && window.location && window.location.hostname, isLocalhost = isBrowser && isLocal(window.location.hostname);
            isBrowser && isLocalhost && newConfig.token && newConfig.ignoreBrowserTokenWarning !== !0 ? printBrowserTokenWarning() : typeof newConfig.useCdn > "u" && printCdnWarning(), 
            projectBased && projectId(newConfig.projectId), newConfig.dataset && dataset(newConfig.dataset), 
            "requestTagPrefix" in newConfig && (newConfig.requestTagPrefix = newConfig.requestTagPrefix ? requestTag(newConfig.requestTagPrefix).replace(/\.+$/, "") : void 0), 
            newConfig.apiVersion = `${newConfig.apiVersion}`.replace(/^v/, ""), newConfig.isDefaultApi = newConfig.apiHost === defaultConfig.apiHost, 
            newConfig.useCdn === !0 && newConfig.withCredentials && printCdnAndWithCredentialsWarning(), 
            newConfig.useCdn = newConfig.useCdn !== !1 && !newConfig.withCredentials, validateApiVersion(newConfig.apiVersion);
            const hostParts = newConfig.apiHost.split("://", 2), protocol = hostParts[0], host = hostParts[1], cdnHost = newConfig.isDefaultApi ? defaultCdnHost : host;
            return newConfig.useProjectHostname ? (newConfig.url = `${protocol}://${newConfig.projectId}.${host}/v${newConfig.apiVersion}`, 
            newConfig.cdnUrl = `${protocol}://${newConfig.projectId}.${cdnHost}/v${newConfig.apiVersion}`) : (newConfig.url = `${newConfig.apiHost}/v${newConfig.apiVersion}`, 
            newConfig.cdnUrl = newConfig.url), newConfig;
        };
        class ConnectionFailedError extends Error {
            name="ConnectionFailedError";
        }
        class DisconnectError extends Error {
            name="DisconnectError";
            reason;
            constructor(message, reason, options = {}) {
                super(message, options), this.reason = reason;
            }
        }
        class ChannelError extends Error {
            name="ChannelError";
            data;
            constructor(message, data) {
                super(message), this.data = data;
            }
        }
        class MessageError extends Error {
            name="MessageError";
            data;
            constructor(message, data, options = {}) {
                super(message, options), this.data = data;
            }
        }
        class MessageParseError extends Error {
            name="MessageParseError";
        }
        const REQUIRED_EVENTS = [ "channelError", "disconnect" ];
        function connectEventSource(initEventSource, events) {
            return defer((() => {
                const es = initEventSource();
                return isObservable(es) ? es : of(es);
            })).pipe(mergeMap((es => connectWithESInstance(es, events))));
        }
        function connectWithESInstance(es, events) {
            return new Observable_Observable((observer => {
                const emitOpen = events.includes("open"), emitReconnect = events.includes("reconnect");
                function onError(evt) {
                    if ("data" in evt) {
                        const [parseError, event] = parseEvent(evt);
                        observer.error(parseError ? new MessageParseError("Unable to parse EventSource error message", {
                            cause: event
                        }) : new MessageError((event?.data).message, event));
                        return;
                    }
                    es.readyState === es.CLOSED ? observer.error(new ConnectionFailedError("EventSource connection failed")) : emitReconnect && observer.next({
                        type: "reconnect"
                    });
                }
                function onOpen() {
                    observer.next({
                        type: "open"
                    });
                }
                function onMessage(message) {
                    const [parseError, event] = parseEvent(message);
                    if (parseError) {
                        observer.error(new MessageParseError("Unable to parse EventSource message", {
                            cause: parseError
                        }));
                        return;
                    }
                    if (message.type === "channelError") {
                        observer.error(new ChannelError(extractErrorMessage(event?.data), event.data));
                        return;
                    }
                    if (message.type === "disconnect") {
                        observer.error(new DisconnectError(`Server disconnected client: ${event.data?.reason || "unknown error"}`));
                        return;
                    }
                    observer.next({
                        type: message.type,
                        id: message.lastEventId,
                        ...event.data ? {
                            data: event.data
                        } : {}
                    });
                }
                es.addEventListener("error", onError), emitOpen && es.addEventListener("open", onOpen);
                const cleanedEvents = [ ...new Set([ ...REQUIRED_EVENTS, ...events ]) ].filter((type => type !== "error" && type !== "open" && type !== "reconnect"));
                return cleanedEvents.forEach((type => es.addEventListener(type, onMessage))), () => {
                    es.removeEventListener("error", onError), emitOpen && es.removeEventListener("open", onOpen), 
                    cleanedEvents.forEach((type => es.removeEventListener(type, onMessage))), es.close();
                };
            }));
        }
        function parseEvent(message) {
            try {
                const data = typeof message.data == "string" && JSON.parse(message.data);
                return [ null, {
                    type: message.type,
                    id: message.lastEventId,
                    ...isEmptyObject(data) ? {} : {
                        data
                    }
                } ];
            } catch (err) {
                return [ err, null ];
            }
        }
        function extractErrorMessage(err) {
            return err.error ? err.error.description ? err.error.description : typeof err.error == "string" ? err.error : JSON.stringify(err.error, null, 2) : err.message || "Unknown listener error";
        }
        function isEmptyObject(data) {
            for (const _ in data) return !1;
            return !0;
        }
        function getSelection(sel) {
            if (typeof sel == "string") return {
                id: sel
            };
            if (Array.isArray(sel)) return {
                query: "*[_id in $ids]",
                params: {
                    ids: sel
                }
            };
            if (typeof sel == "object" && sel !== null && "query" in sel && typeof sel.query == "string") return "params" in sel && typeof sel.params == "object" && sel.params !== null ? {
                query: sel.query,
                params: sel.params
            } : {
                query: sel.query
            };
            const selectionOpts = [ "* Document ID (<docId>)", "* Array of document IDs", "* Object containing `query`" ].join(`\n`);
            throw new Error(`Unknown selection - must be one of:\n\n${selectionOpts}`);
        }
        class BasePatch {
            selection;
            operations;
            constructor(selection, operations = {}) {
                this.selection = selection, this.operations = operations;
            }
            set(attrs) {
                return this._assign("set", attrs);
            }
            setIfMissing(attrs) {
                return this._assign("setIfMissing", attrs);
            }
            diffMatchPatch(attrs) {
                return validateObject("diffMatchPatch", attrs), this._assign("diffMatchPatch", attrs);
            }
            unset(attrs) {
                if (!Array.isArray(attrs)) throw new Error("unset(attrs) takes an array of attributes to unset, non-array given");
                return this.operations = Object.assign({}, this.operations, {
                    unset: attrs
                }), this;
            }
            inc(attrs) {
                return this._assign("inc", attrs);
            }
            dec(attrs) {
                return this._assign("dec", attrs);
            }
            insert(at, selector, items) {
                return validateInsert(at, selector, items), this._assign("insert", {
                    [at]: selector,
                    items
                });
            }
            append(selector, items) {
                return this.insert("after", `${selector}[-1]`, items);
            }
            prepend(selector, items) {
                return this.insert("before", `${selector}[0]`, items);
            }
            splice(selector, start, deleteCount, items) {
                const delAll = typeof deleteCount > "u" || deleteCount === -1, startIndex = start < 0 ? start - 1 : start, delCount = delAll ? -1 : Math.max(0, start + deleteCount), delRange = startIndex < 0 && delCount >= 0 ? "" : delCount, rangeSelector = `${selector}[${startIndex}:${delRange}]`;
                return this.insert("replace", rangeSelector, items || []);
            }
            ifRevisionId(rev) {
                return this.operations.ifRevisionID = rev, this;
            }
            serialize() {
                return {
                    ...getSelection(this.selection),
                    ...this.operations
                };
            }
            toJSON() {
                return this.serialize();
            }
            reset() {
                return this.operations = {}, this;
            }
            _assign(op, props, merge2 = !0) {
                return validateObject(op, props), this.operations = Object.assign({}, this.operations, {
                    [op]: Object.assign({}, merge2 && this.operations[op] || {}, props)
                }), this;
            }
            _set(op, props) {
                return this._assign(op, props, !1);
            }
        }
        class ObservablePatch extends BasePatch {
            #client;
            constructor(selection, operations, client) {
                super(selection, operations), this.#client = client;
            }
            clone() {
                return new ObservablePatch(this.selection, {
                    ...this.operations
                }, this.#client);
            }
            commit(options) {
                if (!this.#client) throw new Error("No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method");
                const returnFirst = typeof this.selection == "string", opts = Object.assign({
                    returnFirst,
                    returnDocuments: !0
                }, options);
                return this.#client.mutate({
                    patch: this.serialize()
                }, opts);
            }
        }
        class Patch extends BasePatch {
            #client;
            constructor(selection, operations, client) {
                super(selection, operations), this.#client = client;
            }
            clone() {
                return new Patch(this.selection, {
                    ...this.operations
                }, this.#client);
            }
            commit(options) {
                if (!this.#client) throw new Error("No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method");
                const returnFirst = typeof this.selection == "string", opts = Object.assign({
                    returnFirst,
                    returnDocuments: !0
                }, options);
                return this.#client.mutate({
                    patch: this.serialize()
                }, opts);
            }
        }
        const defaultMutateOptions = {
            returnDocuments: !1
        };
        class BaseTransaction {
            operations;
            trxId;
            constructor(operations = [], transactionId) {
                this.operations = operations, this.trxId = transactionId;
            }
            create(doc) {
                return validateObject("create", doc), this._add({
                    create: doc
                });
            }
            createIfNotExists(doc) {
                const op = "createIfNotExists";
                return validateObject(op, doc), requireDocumentId(op, doc), this._add({
                    [op]: doc
                });
            }
            createOrReplace(doc) {
                const op = "createOrReplace";
                return validateObject(op, doc), requireDocumentId(op, doc), this._add({
                    [op]: doc
                });
            }
            delete(documentId) {
                return validateDocumentId("delete", documentId), this._add({
                    delete: {
                        id: documentId
                    }
                });
            }
            transactionId(id) {
                return id ? (this.trxId = id, this) : this.trxId;
            }
            serialize() {
                return [ ...this.operations ];
            }
            toJSON() {
                return this.serialize();
            }
            reset() {
                return this.operations = [], this;
            }
            _add(mut) {
                return this.operations.push(mut), this;
            }
        }
        class Transaction extends BaseTransaction {
            #client;
            constructor(operations, client, transactionId) {
                super(operations, transactionId), this.#client = client;
            }
            clone() {
                return new Transaction([ ...this.operations ], this.#client, this.trxId);
            }
            commit(options) {
                if (!this.#client) throw new Error("No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method");
                return this.#client.mutate(this.serialize(), Object.assign({
                    transactionId: this.trxId
                }, defaultMutateOptions, options || {}));
            }
            patch(patchOrDocumentId, patchOps) {
                const isBuilder = typeof patchOps == "function", isPatch = typeof patchOrDocumentId != "string" && patchOrDocumentId instanceof Patch, isMutationSelection = typeof patchOrDocumentId == "object" && ("query" in patchOrDocumentId || "id" in patchOrDocumentId);
                if (isPatch) return this._add({
                    patch: patchOrDocumentId.serialize()
                });
                if (isBuilder) {
                    const patch = patchOps(new Patch(patchOrDocumentId, {}, this.#client));
                    if (!(patch instanceof Patch)) throw new Error("function passed to `patch()` must return the patch");
                    return this._add({
                        patch: patch.serialize()
                    });
                }
                if (isMutationSelection) {
                    const patch = new Patch(patchOrDocumentId, patchOps || {}, this.#client);
                    return this._add({
                        patch: patch.serialize()
                    });
                }
                return this._add({
                    patch: {
                        id: patchOrDocumentId,
                        ...patchOps
                    }
                });
            }
        }
        class ObservableTransaction extends BaseTransaction {
            #client;
            constructor(operations, client, transactionId) {
                super(operations, transactionId), this.#client = client;
            }
            clone() {
                return new ObservableTransaction([ ...this.operations ], this.#client, this.trxId);
            }
            commit(options) {
                if (!this.#client) throw new Error("No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method");
                return this.#client.mutate(this.serialize(), Object.assign({
                    transactionId: this.trxId
                }, defaultMutateOptions, options || {}));
            }
            patch(patchOrDocumentId, patchOps) {
                const isBuilder = typeof patchOps == "function";
                if (typeof patchOrDocumentId != "string" && patchOrDocumentId instanceof ObservablePatch) return this._add({
                    patch: patchOrDocumentId.serialize()
                });
                if (isBuilder) {
                    const patch = patchOps(new ObservablePatch(patchOrDocumentId, {}, this.#client));
                    if (!(patch instanceof ObservablePatch)) throw new Error("function passed to `patch()` must return the patch");
                    return this._add({
                        patch: patch.serialize()
                    });
                }
                return this._add({
                    patch: {
                        id: patchOrDocumentId,
                        ...patchOps
                    }
                });
            }
        }
        const projectHeader = "X-Sanity-Project-ID";
        function requestOptions(config, overrides = {}) {
            const headers = {}, token = overrides.token || config.token;
            token && (headers.Authorization = `Bearer ${token}`), !overrides.useGlobalApi && !config.useProjectHostname && config.projectId && (headers[projectHeader] = config.projectId);
            const withCredentials = !!(typeof overrides.withCredentials > "u" ? config.token || config.withCredentials : overrides.withCredentials), timeout = typeof overrides.timeout > "u" ? config.timeout : overrides.timeout;
            return Object.assign({}, overrides, {
                headers: Object.assign({}, headers, overrides.headers || {}),
                timeout: typeof timeout > "u" ? 5 * 60 * 1e3 : timeout,
                proxy: overrides.proxy || config.proxy,
                json: !0,
                withCredentials,
                fetch: typeof overrides.fetch == "object" && typeof config.fetch == "object" ? {
                    ...config.fetch,
                    ...overrides.fetch
                } : overrides.fetch || config.fetch
            });
        }
        const encodeQueryString = ({query, params = {}, options = {}}) => {
            const searchParams = new URLSearchParams, {tag, includeMutations, returnQuery, ...opts} = options;
            tag && searchParams.append("tag", tag), searchParams.append("query", query);
            for (const [key, value] of Object.entries(params)) searchParams.append(`$${key}`, JSON.stringify(value));
            for (const [key, value] of Object.entries(opts)) value && searchParams.append(key, `${value}`);
            return returnQuery === !1 && searchParams.append("returnQuery", "false"), includeMutations === !1 && searchParams.append("includeMutations", "false"), 
            `?${searchParams}`;
        }, excludeFalsey = (param, defValue) => param === !1 ? void 0 : typeof param > "u" ? defValue : param, getMutationQuery = (options = {}) => ({
            dryRun: options.dryRun,
            returnIds: !0,
            returnDocuments: excludeFalsey(options.returnDocuments, !0),
            visibility: options.visibility || "sync",
            autoGenerateArrayKeys: options.autoGenerateArrayKeys,
            skipCrossDatasetReferenceValidation: options.skipCrossDatasetReferenceValidation
        }), isResponse = event => event.type === "response", getBody = event => event.body, indexBy = (docs, attr) => docs.reduce(((indexed, doc) => (indexed[attr(doc)] = doc, 
        indexed)), Object.create(null)), getQuerySizeLimit = 11264;
        function _fetch(client, httpRequest, _stega, query, _params = {}, options = {}) {
            const stega = "stega" in options ? {
                ..._stega || {},
                ...typeof options.stega == "boolean" ? {
                    enabled: options.stega
                } : options.stega || {}
            } : _stega, params = stega.enabled ? (0, stegaClean.Q)(_params) : _params, mapResponse = options.filterResponse === !1 ? res => res : res => res.result, {cache, next, ...opts} = {
                useAbortSignal: typeof options.signal < "u",
                resultSourceMap: stega.enabled ? "withKeyArraySelector" : options.resultSourceMap,
                ...options,
                returnQuery: options.filterResponse === !1 && options.returnQuery !== !1
            }, reqOpts = typeof cache < "u" || typeof next < "u" ? {
                ...opts,
                fetch: {
                    cache,
                    next
                }
            } : opts, $request = _dataRequest(client, httpRequest, "query", {
                query,
                params
            }, reqOpts);
            return stega.enabled ? $request.pipe(combineLatestWith(from_from(__webpack_require__.e(359).then(__webpack_require__.bind(__webpack_require__, 359)).then((function(n) {
                return n.stegaEncodeSourceMap$1;
            })).then((({stegaEncodeSourceMap}) => stegaEncodeSourceMap)))), map((([res, stegaEncodeSourceMap]) => {
                const result = stegaEncodeSourceMap(res.result, res.resultSourceMap, stega);
                return mapResponse({
                    ...res,
                    result
                });
            }))) : $request.pipe(map(mapResponse));
        }
        function _getDocument(client, httpRequest, id, opts = {}) {
            const options = {
                uri: _getDataUrl(client, "doc", id),
                json: !0,
                tag: opts.tag,
                signal: opts.signal
            };
            return _requestObservable(client, httpRequest, options).pipe(filter(isResponse), map((event => event.body.documents && event.body.documents[0])));
        }
        function _getDocuments(client, httpRequest, ids, opts = {}) {
            const options = {
                uri: _getDataUrl(client, "doc", ids.join(",")),
                json: !0,
                tag: opts.tag,
                signal: opts.signal
            };
            return _requestObservable(client, httpRequest, options).pipe(filter(isResponse), map((event => {
                const indexed = indexBy(event.body.documents || [], (doc => doc._id));
                return ids.map((id => indexed[id] || null));
            })));
        }
        function _createIfNotExists(client, httpRequest, doc, options) {
            return requireDocumentId("createIfNotExists", doc), _create(client, httpRequest, doc, "createIfNotExists", options);
        }
        function _createOrReplace(client, httpRequest, doc, options) {
            return requireDocumentId("createOrReplace", doc), _create(client, httpRequest, doc, "createOrReplace", options);
        }
        function _delete(client, httpRequest, selection, options) {
            return _dataRequest(client, httpRequest, "mutate", {
                mutations: [ {
                    delete: getSelection(selection)
                } ]
            }, options);
        }
        function _mutate(client, httpRequest, mutations, options) {
            let mut;
            mutations instanceof Patch || mutations instanceof ObservablePatch ? mut = {
                patch: mutations.serialize()
            } : mutations instanceof Transaction || mutations instanceof ObservableTransaction ? mut = mutations.serialize() : mut = mutations;
            const muts = Array.isArray(mut) ? mut : [ mut ], transactionId = options && options.transactionId || void 0;
            return _dataRequest(client, httpRequest, "mutate", {
                mutations: muts,
                transactionId
            }, options);
        }
        function _action(client, httpRequest, actions, options) {
            const acts = Array.isArray(actions) ? actions : [ actions ], transactionId = options && options.transactionId || void 0, skipCrossDatasetReferenceValidation = options && options.skipCrossDatasetReferenceValidation || void 0, dryRun = options && options.dryRun || void 0;
            return _dataRequest(client, httpRequest, "actions", {
                actions: acts,
                transactionId,
                skipCrossDatasetReferenceValidation,
                dryRun
            }, options);
        }
        function _dataRequest(client, httpRequest, endpoint, body, options = {}) {
            const isMutation = endpoint === "mutate", isAction = endpoint === "actions", isQuery = endpoint === "query", strQuery = isMutation || isAction ? "" : encodeQueryString(body), useGet = !isMutation && !isAction && strQuery.length < getQuerySizeLimit, stringQuery = useGet ? strQuery : "", returnFirst = options.returnFirst, {timeout, token, tag, headers, returnQuery, lastLiveEventId, cacheMode} = options, uri = _getDataUrl(client, endpoint, stringQuery), reqOptions = {
                method: useGet ? "GET" : "POST",
                uri,
                json: !0,
                body: useGet ? void 0 : body,
                query: isMutation && getMutationQuery(options),
                timeout,
                headers,
                token,
                tag,
                returnQuery,
                perspective: options.perspective,
                resultSourceMap: options.resultSourceMap,
                lastLiveEventId: Array.isArray(lastLiveEventId) ? lastLiveEventId[0] : lastLiveEventId,
                cacheMode,
                canUseCdn: isQuery,
                signal: options.signal,
                fetch: options.fetch,
                useAbortSignal: options.useAbortSignal,
                useCdn: options.useCdn
            };
            return _requestObservable(client, httpRequest, reqOptions).pipe(filter(isResponse), map(getBody), map((res => {
                if (!isMutation) return res;
                const results = res.results || [];
                if (options.returnDocuments) return returnFirst ? results[0] && results[0].document : results.map((mut => mut.document));
                const key = returnFirst ? "documentId" : "documentIds", ids = returnFirst ? results[0] && results[0].id : results.map((mut => mut.id));
                return {
                    transactionId: res.transactionId,
                    results,
                    [key]: ids
                };
            })));
        }
        function _create(client, httpRequest, doc, op, options = {}) {
            const mutation = {
                [op]: doc
            }, opts = Object.assign({
                returnFirst: !0,
                returnDocuments: !0
            }, options);
            return _dataRequest(client, httpRequest, "mutate", {
                mutations: [ mutation ]
            }, opts);
        }
        function _requestObservable(client, httpRequest, options) {
            const uri = options.url || options.uri, config = client.config(), canUseCdn = typeof options.canUseCdn > "u" ? [ "GET", "HEAD" ].indexOf(options.method || "GET") >= 0 && uri.indexOf("/data/") === 0 : options.canUseCdn;
            let useCdn = (options.useCdn ?? config.useCdn) && canUseCdn;
            const tag = options.tag && config.requestTagPrefix ? [ config.requestTagPrefix, options.tag ].join(".") : options.tag || config.requestTagPrefix;
            if (tag && options.tag !== null && (options.query = {
                tag: requestTag(tag),
                ...options.query
            }), [ "GET", "HEAD", "POST" ].indexOf(options.method || "GET") >= 0 && uri.indexOf("/data/query/") === 0) {
                const resultSourceMap = options.resultSourceMap ?? config.resultSourceMap;
                resultSourceMap !== void 0 && resultSourceMap !== !1 && (options.query = {
                    resultSourceMap,
                    ...options.query
                });
                const perspectiveOption = options.perspective || config.perspective;
                typeof perspectiveOption < "u" && (perspectiveOption === "previewDrafts" && printPreviewDraftsDeprecationWarning(), 
                validateApiPerspective(perspectiveOption), options.query = {
                    perspective: Array.isArray(perspectiveOption) ? perspectiveOption.join(",") : perspectiveOption,
                    ...options.query
                }, (Array.isArray(perspectiveOption) && perspectiveOption.length > 0 || perspectiveOption === "previewDrafts" || perspectiveOption === "drafts") && useCdn && (useCdn = !1, 
                printCdnPreviewDraftsWarning())), options.lastLiveEventId && (options.query = {
                    ...options.query,
                    lastLiveEventId: options.lastLiveEventId
                }), options.returnQuery === !1 && (options.query = {
                    returnQuery: "false",
                    ...options.query
                }), useCdn && options.cacheMode == "noStale" && (options.query = {
                    cacheMode: "noStale",
                    ...options.query
                });
            }
            const reqOptions = requestOptions(config, Object.assign({}, options, {
                url: _getUrl(client, uri, useCdn)
            })), request = new Observable_Observable((subscriber => httpRequest(reqOptions, config.requester).subscribe(subscriber)));
            return options.signal ? request.pipe(_withAbortSignal(options.signal)) : request;
        }
        function _request(client, httpRequest, options) {
            return _requestObservable(client, httpRequest, options).pipe(filter((event => event.type === "response")), map((event => event.body)));
        }
        function _getDataUrl(client, operation, path) {
            const config = client.config(), catalog = hasDataset(config), baseUri = `/${operation}/${catalog}`;
            return `/data${path ? `${baseUri}/${path}` : baseUri}`.replace(/\/($|\?)/, "$1");
        }
        function _getUrl(client, uri, canUseCdn = !1) {
            const {url, cdnUrl} = client.config();
            return `${canUseCdn ? cdnUrl : url}/${uri.replace(/^\//, "")}`;
        }
        function _withAbortSignal(signal) {
            return input => new Observable_Observable((observer => {
                const abort = () => observer.error(_createAbortError(signal));
                if (signal && signal.aborted) {
                    abort();
                    return;
                }
                const subscription = input.subscribe(observer);
                return signal.addEventListener("abort", abort), () => {
                    signal.removeEventListener("abort", abort), subscription.unsubscribe();
                };
            }));
        }
        const isDomExceptionSupported = !!globalThis.DOMException;
        function _createAbortError(signal) {
            if (isDomExceptionSupported) return new DOMException(signal?.reason ?? "The operation was aborted.", "AbortError");
            const error = new Error(signal?.reason ?? "The operation was aborted.");
            return error.name = "AbortError", error;
        }
        class ObservableAssetsClient {
            #client;
            #httpRequest;
            constructor(client, httpRequest) {
                this.#client = client, this.#httpRequest = httpRequest;
            }
            upload(assetType, body, options) {
                return _upload(this.#client, this.#httpRequest, assetType, body, options);
            }
        }
        class AssetsClient {
            #client;
            #httpRequest;
            constructor(client, httpRequest) {
                this.#client = client, this.#httpRequest = httpRequest;
            }
            upload(assetType, body, options) {
                const observable2 = _upload(this.#client, this.#httpRequest, assetType, body, options);
                return lastValueFrom(observable2.pipe(filter((event => event.type === "response")), map((event => event.body.document))));
            }
        }
        function _upload(client, httpRequest, assetType, body, opts = {}) {
            validateAssetType(assetType);
            let meta = opts.extract || void 0;
            meta && !meta.length && (meta = [ "none" ]);
            const dataset2 = hasDataset(client.config()), assetEndpoint = assetType === "image" ? "images" : "files", options = optionsFromFile(opts, body), {tag, label, title, description, creditLine, filename, source} = options, query = {
                label,
                title,
                description,
                filename,
                meta,
                creditLine
            };
            return source && (query.sourceId = source.id, query.sourceName = source.name, query.sourceUrl = source.url), 
            _requestObservable(client, httpRequest, {
                tag,
                method: "POST",
                timeout: options.timeout || 0,
                uri: `/assets/${assetEndpoint}/${dataset2}`,
                headers: options.contentType ? {
                    "Content-Type": options.contentType
                } : {},
                query,
                body
            });
        }
        function optionsFromFile(opts, file) {
            return typeof File > "u" || !(file instanceof File) ? opts : Object.assign({
                filename: opts.preserveFilename === !1 ? void 0 : file.name,
                contentType: file.type
            }, opts);
        }
        var index_browser_defaults = (obj, defaults2) => Object.keys(defaults2).concat(Object.keys(obj)).reduce(((target, prop) => (target[prop] = typeof obj[prop] > "u" ? defaults2[prop] : obj[prop], 
        target)), {});
        const pick = (obj, props) => props.reduce(((selection, prop) => (typeof obj[prop] > "u" || (selection[prop] = obj[prop]), 
        selection)), {}), eventSourcePolyfill = defer((() => __webpack_require__.e(58).then(__webpack_require__.t.bind(__webpack_require__, 58, 19)))).pipe(map((({default: EventSource2}) => EventSource2)), shareReplay(1));
        function reconnectOnConnectionFailure() {
            return function(source) {
                return source.pipe(catchError(((err, caught) => err instanceof ConnectionFailedError ? concat(of({
                    type: "reconnect"
                }), timer(1e3).pipe(mergeMap((() => caught)))) : throwError((() => err)))));
            };
        }
        const MAX_URL_LENGTH = 14800, possibleOptions = [ "includePreviousRevision", "includeResult", "includeMutations", "includeAllVersions", "visibility", "effectFormat", "tag" ], defaultOptions = {
            includeResult: !0
        };
        function _listen(query, params, opts = {}) {
            const {url, token, withCredentials, requestTagPrefix} = this.config(), tag = opts.tag && requestTagPrefix ? [ requestTagPrefix, opts.tag ].join(".") : opts.tag, options = {
                ...index_browser_defaults(opts, defaultOptions),
                tag
            }, listenOpts = pick(options, possibleOptions), qs = encodeQueryString({
                query,
                params,
                options: {
                    tag,
                    ...listenOpts
                }
            }), uri = `${url}${_getDataUrl(this, "listen", qs)}`;
            if (uri.length > MAX_URL_LENGTH) return throwError((() => new Error("Query too large for listener")));
            const listenFor = options.events ? options.events : [ "mutation" ], esOptions = {};
            return (token || withCredentials) && (esOptions.withCredentials = !0), token && (esOptions.headers = {
                Authorization: `Bearer ${token}`
            }), connectEventSource((() => (typeof EventSource > "u" || esOptions.headers ? eventSourcePolyfill : of(EventSource)).pipe(map((EventSource2 => new EventSource2(uri, esOptions))))), listenFor).pipe(reconnectOnConnectionFailure(), filter((event => listenFor.includes(event.type))), map((event => ({
                type: event.type,
                ..."data" in event ? event.data : {}
            }))));
        }
        function shareReplayLatest(configOrPredicate, config) {
            return _shareReplayLatest(typeof configOrPredicate == "function" ? {
                predicate: configOrPredicate,
                ...config
            } : configOrPredicate);
        }
        function _shareReplayLatest(config) {
            return source => {
                let latest, emitted = !1;
                const {predicate, ...shareConfig} = config, wrapped = source.pipe(tap((value => {
                    config.predicate(value) && (emitted = !0, latest = value);
                })), finalize((() => {
                    emitted = !1, latest = void 0;
                })), share(shareConfig)), emitLatest = new Observable_Observable((subscriber => {
                    emitted && subscriber.next(latest), subscriber.complete();
                }));
                return merge(wrapped, emitLatest);
            };
        }
        const requiredApiVersion = "2021-03-25";
        class LiveClient {
            #client;
            constructor(client) {
                this.#client = client;
            }
            events({includeDrafts = !1, tag: _tag} = {}) {
                const {projectId: projectId2, apiVersion: _apiVersion, token, withCredentials, requestTagPrefix} = this.#client.config(), apiVersion = _apiVersion.replace(/^v/, "");
                if (apiVersion !== "X" && apiVersion < requiredApiVersion) throw new Error(`The live events API requires API version ${requiredApiVersion} or later. The current API version is ${apiVersion}. Please update your API version to use this feature.`);
                if (includeDrafts && !token && !withCredentials) throw new Error("The live events API requires a token or withCredentials when 'includeDrafts: true'. Please update your client configuration. The token should have the lowest possible access role.");
                const path = _getDataUrl(this.#client, "live/events"), url = new URL(this.#client.getUrl(path, !1)), tag = _tag && requestTagPrefix ? [ requestTagPrefix, _tag ].join(".") : _tag;
                tag && url.searchParams.set("tag", tag), includeDrafts && url.searchParams.set("includeDrafts", "true");
                const esOptions = {};
                includeDrafts && token && (esOptions.headers = {
                    Authorization: `Bearer ${token}`
                }), includeDrafts && withCredentials && (esOptions.withCredentials = !0);
                const key = `${url.href}::${JSON.stringify(esOptions)}`, existing = eventsCache.get(key);
                if (existing) return existing;
                const events = connectEventSource((() => (typeof EventSource > "u" || esOptions.headers ? eventSourcePolyfill : of(EventSource)).pipe(map((EventSource2 => new EventSource2(url.href, esOptions))))), [ "message", "restart", "welcome", "reconnect" ]).pipe(reconnectOnConnectionFailure(), map((event => {
                    if (event.type === "message") {
                        const {data, ...rest} = event;
                        return {
                            ...rest,
                            tags: data.tags
                        };
                    }
                    return event;
                }))), checkCors = fetchObservable(url, {
                    method: "OPTIONS",
                    mode: "cors",
                    credentials: esOptions.withCredentials ? "include" : "omit",
                    headers: esOptions.headers
                }).pipe(mergeMap((() => EMPTY)), catchError((() => {
                    throw new CorsOriginError({
                        projectId: projectId2
                    });
                }))), observable2 = concat(checkCors, events).pipe(finalize((() => eventsCache.delete(key))), shareReplayLatest({
                    predicate: event => event.type === "welcome"
                }));
                return eventsCache.set(key, observable2), observable2;
            }
        }
        function fetchObservable(url, init) {
            return new Observable_Observable((observer => {
                const controller = new AbortController, signal = controller.signal;
                return fetch(url, {
                    ...init,
                    signal: controller.signal
                }).then((response => {
                    observer.next(response), observer.complete();
                }), (err => {
                    signal.aborted || observer.error(err);
                })), () => controller.abort();
            }));
        }
        const eventsCache = new Map;
        class ObservableDatasetsClient {
            #client;
            #httpRequest;
            constructor(client, httpRequest) {
                this.#client = client, this.#httpRequest = httpRequest;
            }
            create(name, options) {
                return _modify(this.#client, this.#httpRequest, "PUT", name, options);
            }
            edit(name, options) {
                return _modify(this.#client, this.#httpRequest, "PATCH", name, options);
            }
            delete(name) {
                return _modify(this.#client, this.#httpRequest, "DELETE", name);
            }
            list() {
                return _request(this.#client, this.#httpRequest, {
                    uri: "/datasets",
                    tag: null
                });
            }
        }
        class DatasetsClient {
            #client;
            #httpRequest;
            constructor(client, httpRequest) {
                this.#client = client, this.#httpRequest = httpRequest;
            }
            create(name, options) {
                return lastValueFrom(_modify(this.#client, this.#httpRequest, "PUT", name, options));
            }
            edit(name, options) {
                return lastValueFrom(_modify(this.#client, this.#httpRequest, "PATCH", name, options));
            }
            delete(name) {
                return lastValueFrom(_modify(this.#client, this.#httpRequest, "DELETE", name));
            }
            list() {
                return lastValueFrom(_request(this.#client, this.#httpRequest, {
                    uri: "/datasets",
                    tag: null
                }));
            }
        }
        function _modify(client, httpRequest, method, name, options) {
            return dataset(name), _request(client, httpRequest, {
                method,
                uri: `/datasets/${name}`,
                body: options,
                tag: null
            });
        }
        class ObservableProjectsClient {
            #client;
            #httpRequest;
            constructor(client, httpRequest) {
                this.#client = client, this.#httpRequest = httpRequest;
            }
            list(options) {
                const uri = options?.includeMembers === !1 ? "/projects?includeMembers=false" : "/projects";
                return _request(this.#client, this.#httpRequest, {
                    uri
                });
            }
            getById(projectId2) {
                return _request(this.#client, this.#httpRequest, {
                    uri: `/projects/${projectId2}`
                });
            }
        }
        class ProjectsClient {
            #client;
            #httpRequest;
            constructor(client, httpRequest) {
                this.#client = client, this.#httpRequest = httpRequest;
            }
            list(options) {
                const uri = options?.includeMembers === !1 ? "/projects?includeMembers=false" : "/projects";
                return lastValueFrom(_request(this.#client, this.#httpRequest, {
                    uri
                }));
            }
            getById(projectId2) {
                return lastValueFrom(_request(this.#client, this.#httpRequest, {
                    uri: `/projects/${projectId2}`
                }));
            }
        }
        class ObservableUsersClient {
            #client;
            #httpRequest;
            constructor(client, httpRequest) {
                this.#client = client, this.#httpRequest = httpRequest;
            }
            getById(id) {
                return _request(this.#client, this.#httpRequest, {
                    uri: `/users/${id}`
                });
            }
        }
        class UsersClient {
            #client;
            #httpRequest;
            constructor(client, httpRequest) {
                this.#client = client, this.#httpRequest = httpRequest;
            }
            getById(id) {
                return lastValueFrom(_request(this.#client, this.#httpRequest, {
                    uri: `/users/${id}`
                }));
            }
        }
        class ObservableSanityClient {
            assets;
            datasets;
            live;
            projects;
            users;
            #clientConfig;
            #httpRequest;
            listen=_listen;
            constructor(httpRequest, config = defaultConfig) {
                this.config(config), this.#httpRequest = httpRequest, this.assets = new ObservableAssetsClient(this, this.#httpRequest), 
                this.datasets = new ObservableDatasetsClient(this, this.#httpRequest), this.live = new LiveClient(this), 
                this.projects = new ObservableProjectsClient(this, this.#httpRequest), this.users = new ObservableUsersClient(this, this.#httpRequest);
            }
            clone() {
                return new ObservableSanityClient(this.#httpRequest, this.config());
            }
            config(newConfig) {
                if (newConfig === void 0) return {
                    ...this.#clientConfig
                };
                if (this.#clientConfig && this.#clientConfig.allowReconfigure === !1) throw new Error("Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client");
                return this.#clientConfig = initConfig(newConfig, this.#clientConfig || {}), this;
            }
            withConfig(newConfig) {
                const thisConfig = this.config();
                return new ObservableSanityClient(this.#httpRequest, {
                    ...thisConfig,
                    ...newConfig,
                    stega: {
                        ...thisConfig.stega || {},
                        ...typeof newConfig?.stega == "boolean" ? {
                            enabled: newConfig.stega
                        } : newConfig?.stega || {}
                    }
                });
            }
            fetch(query, params, options) {
                return _fetch(this, this.#httpRequest, this.#clientConfig.stega, query, params, options);
            }
            getDocument(id, options) {
                return _getDocument(this, this.#httpRequest, id, options);
            }
            getDocuments(ids, options) {
                return _getDocuments(this, this.#httpRequest, ids, options);
            }
            create(document, options) {
                return _create(this, this.#httpRequest, document, "create", options);
            }
            createIfNotExists(document, options) {
                return _createIfNotExists(this, this.#httpRequest, document, options);
            }
            createOrReplace(document, options) {
                return _createOrReplace(this, this.#httpRequest, document, options);
            }
            delete(selection, options) {
                return _delete(this, this.#httpRequest, selection, options);
            }
            mutate(operations, options) {
                return _mutate(this, this.#httpRequest, operations, options);
            }
            patch(selection, operations) {
                return new ObservablePatch(selection, operations, this);
            }
            transaction(operations) {
                return new ObservableTransaction(operations, this);
            }
            action(operations, options) {
                return _action(this, this.#httpRequest, operations, options);
            }
            request(options) {
                return _request(this, this.#httpRequest, options);
            }
            getUrl(uri, canUseCdn) {
                return _getUrl(this, uri, canUseCdn);
            }
            getDataUrl(operation, path) {
                return _getDataUrl(this, operation, path);
            }
        }
        class SanityClient {
            assets;
            datasets;
            live;
            projects;
            users;
            observable;
            #clientConfig;
            #httpRequest;
            listen=_listen;
            constructor(httpRequest, config = defaultConfig) {
                this.config(config), this.#httpRequest = httpRequest, this.assets = new AssetsClient(this, this.#httpRequest), 
                this.datasets = new DatasetsClient(this, this.#httpRequest), this.live = new LiveClient(this), 
                this.projects = new ProjectsClient(this, this.#httpRequest), this.users = new UsersClient(this, this.#httpRequest), 
                this.observable = new ObservableSanityClient(httpRequest, config);
            }
            clone() {
                return new SanityClient(this.#httpRequest, this.config());
            }
            config(newConfig) {
                if (newConfig === void 0) return {
                    ...this.#clientConfig
                };
                if (this.#clientConfig && this.#clientConfig.allowReconfigure === !1) throw new Error("Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client");
                return this.observable && this.observable.config(newConfig), this.#clientConfig = initConfig(newConfig, this.#clientConfig || {}), 
                this;
            }
            withConfig(newConfig) {
                const thisConfig = this.config();
                return new SanityClient(this.#httpRequest, {
                    ...thisConfig,
                    ...newConfig,
                    stega: {
                        ...thisConfig.stega || {},
                        ...typeof newConfig?.stega == "boolean" ? {
                            enabled: newConfig.stega
                        } : newConfig?.stega || {}
                    }
                });
            }
            fetch(query, params, options) {
                return lastValueFrom(_fetch(this, this.#httpRequest, this.#clientConfig.stega, query, params, options));
            }
            getDocument(id, options) {
                return lastValueFrom(_getDocument(this, this.#httpRequest, id, options));
            }
            getDocuments(ids, options) {
                return lastValueFrom(_getDocuments(this, this.#httpRequest, ids, options));
            }
            create(document, options) {
                return lastValueFrom(_create(this, this.#httpRequest, document, "create", options));
            }
            createIfNotExists(document, options) {
                return lastValueFrom(_createIfNotExists(this, this.#httpRequest, document, options));
            }
            createOrReplace(document, options) {
                return lastValueFrom(_createOrReplace(this, this.#httpRequest, document, options));
            }
            delete(selection, options) {
                return lastValueFrom(_delete(this, this.#httpRequest, selection, options));
            }
            mutate(operations, options) {
                return lastValueFrom(_mutate(this, this.#httpRequest, operations, options));
            }
            patch(documentId, operations) {
                return new Patch(documentId, operations, this);
            }
            transaction(operations) {
                return new Transaction(operations, this);
            }
            action(operations, options) {
                return lastValueFrom(_action(this, this.#httpRequest, operations, options));
            }
            request(options) {
                return lastValueFrom(_request(this, this.#httpRequest, options));
            }
            dataRequest(endpoint, body, options) {
                return lastValueFrom(_dataRequest(this, this.#httpRequest, endpoint, body, options));
            }
            getUrl(uri, canUseCdn) {
                return _getUrl(this, uri, canUseCdn);
            }
            getDataUrl(operation, path) {
                return _getDataUrl(this, operation, path);
            }
        }
        function defineCreateClientExports(envMiddleware2, ClassConstructor) {
            return {
                requester: defineHttpRequest(envMiddleware2),
                createClient: config => {
                    const clientRequester = defineHttpRequest(envMiddleware2);
                    return new ClassConstructor(((options, requester2) => (requester2 || clientRequester)({
                        maxRedirects: 0,
                        maxRetries: config.maxRetries,
                        retryDelay: config.retryDelay,
                        ...options
                    })), config);
                }
            };
        }
        function defineDeprecatedCreateClient(createClient2) {
            return function(config) {
                return printNoDefaultExport(), createClient2(config);
            };
        }
        var envMiddleware = [];
        const exp = defineCreateClientExports(envMiddleware, SanityClient), createClient = (exp.requester, 
        exp.createClient);
        defineDeprecatedCreateClient(createClient);
        const sanityClient = createClient({
            projectId: "qniqk200",
            dataset: "production",
            useCdn: true,
            apiVersion: "2024-03-21"
        });
        async function getPosts(start = 0, limit = 6) {
            const query = `*[_type == "post"] | order(publishDate desc) [${start}...${start + limit}]{\n    title,\n    meta_title,\n    publishDate,\n    description,\n    "slug": slug.current,\n    "poster": poster.asset->url,\n    \n  }`;
            try {
                const posts = await sanityClient.fetch(query);
                console.log("Отримані пости:", posts);
                return posts;
            } catch (error) {
                console.error("Помилка отримання постів:", error);
                return [];
            }
        }
        async function getSingle(slug) {
            const query = `*[_type == "post" && slug.current == "${slug}"][0]{\n    title,\n    meta_title,\n    publishDate,\n    "slug": slug.current,\n    \n    "content": content[] {\n      ...,\n      _type == "block" => {\n        _key,\n        _type,\n        style,\n        "children": children[] {\n          _key,\n          "text": text\n        }\n      },\n      _type == "blokPostImage" => {\n        _key,\n        "imageUrl": asset->url,\n        "alt": image.alt\n      }\n    }\n  }`;
            try {
                const single = await sanityClient.fetch(query);
                console.log("Отриманий пост:", single);
                return single;
            } catch (error) {
                console.error("Помилка отримання поста:", error);
                return null;
            }
        }
        async function getHero() {
            const query = `*[_type == "hero"]{\n    heroTitle,\n    heroDescription\n  }`;
            return await sanityClient.fetch(query);
        }
        async function getPerson() {
            const query = `*[_type == "person"]{\n    personName,\n    personPosition,\n    personDescription,\n    "personImage": personImage.asset->url,\n  }`;
            return await sanityClient.fetch(query);
        }
        async function getHeroSlider() {
            const query = `*[_type == "heroMedia"]{\n    heroTitle,\n    heroDescription,\n    "heroGallery": heroGallery[].asset->url\n  }`;
            return await sanityClient.fetch(query);
        }
        async function getGallery() {
            const query = `*[_type == "galleries"]{\n    galleryTitle,\n    gallery[] {\n      alt,\n      "url": asset->url\n    }\n  }`;
            return await sanityClient.fetch(query);
        }
        document.addEventListener("DOMContentLoaded", (async () => {
            const heroContainer = document.getElementById("hero");
            if (!heroContainer) {
                console.error("Контейнер для Hero не знайдений");
                return;
            }
            try {
                const hero = await getHero();
                console.log(hero);
                if (Array.isArray(hero) && hero.length > 0) {
                    const {heroTitle, heroDescription} = hero[0];
                    if (heroTitle || heroDescription) {
                        const heroElement = document.createElement("div");
                        heroElement.classList.add("hero-content");
                        if (heroTitle) {
                            const titleElement = document.createElement("h1");
                            titleElement.textContent = heroTitle;
                            heroElement.appendChild(titleElement);
                        }
                        if (heroDescription) {
                            const descriptionElement = document.createElement("h2");
                            descriptionElement.textContent = heroDescription;
                            heroElement.appendChild(descriptionElement);
                        }
                        heroContainer.appendChild(heroElement);
                    }
                }
            } catch (error) {
                console.error("Помилка завантаження даних Hero:", error);
            }
        }));
        document.addEventListener("DOMContentLoaded", (async () => {
            if (!window.location.pathname.endsWith("post.html")) return;
            const urlParams = new URLSearchParams(window.location.search);
            const slug = urlParams.get("slug");
            if (!slug) {
                document.body.innerHTML = "<h1>Пост не знайдено</h1>";
                return;
            }
            try {
                const single = await getSingle(slug);
                console.log("Отримані дані:", single);
                if (!single || Object.keys(single).length === 0) {
                    document.body.innerHTML = "<h1>Пост не знайдено</h1>";
                    return;
                }
                document.getElementById("post-single").innerHTML = `\n        <h1>${single.title}</h1>\n        \n        <div>${new Date(single.publishDate).toLocaleDateString()}</div>\n        \n      `;
                const singleElement = document.createElement("article");
                singleElement.classList.add("post-block");
                const postContent = document.createElement("div");
                postContent.classList.add("post-content-s");
                if (Array.isArray(single.content)) single.content.forEach((block => {
                    if (block._type === "contentText" && block.children) {
                        const text = block.children.map((child => child.text || "")).join(" ").trim();
                        if (text) {
                            let element;
                            if (block.style === "h4") element = document.createElement("h4"); else if (block.style === "blockquote") element = document.createElement("blockquote"); else element = document.createElement("p");
                            element.textContent = text;
                            postContent.appendChild(element);
                        }
                    }
                    if (block._type === "blokPostImage" && block.imageUrl) {
                        const image = document.createElement("img");
                        image.src = block.imageUrl;
                        image.alt = block.alt || "Зображення";
                        postContent.appendChild(image);
                    }
                }));
                singleElement.append(postContent);
                document.getElementById("post-single").append(singleElement);
            } catch (error) {
                console.error("Помилка отримання поста:", error);
                document.body.innerHTML = "<h1>Помилка завантаження поста</h1>";
            }
        }));
        document.addEventListener("DOMContentLoaded", (async () => {
            const personContainer = document.getElementById("person");
            if (!personContainer) {
                console.error("Контейнер для Person не знайдений");
                return;
            }
            try {
                const personData = await getPerson();
                console.log(personData);
                if (!Array.isArray(personData) || personData.length === 0) {
                    personContainer.innerHTML = "<p>Немає даних про Person</p>";
                    return;
                }
                personData.forEach((person => {
                    if (person?.personName && person?.personPosition && person?.personDescription && person?.personImage) {
                        const personElement = document.createElement("div");
                        personElement.classList.add("person-content");
                        personElement.innerHTML = `\n          <div class="person-header">\n            <h4>${person.personName}</h4>\n            <img src="${person.personImage}" alt="${person.personName}">\n          </div>\n           <div class="person-details">\n                <h5>${person.personPosition}</h5>\n                <p>${person.personDescription}</p>\n            </div>\n          `;
                        personContainer.appendChild(personElement);
                    }
                }));
            } catch (error) {
                console.error("Помилка завантаження даних Person:", error);
                personContainer.innerHTML = "<p>Не вдалося завантажити дані Person</p>";
            }
        }));
        document.addEventListener("DOMContentLoaded", (async () => {
            const heroMediaContainer = document.getElementById("heroMedia");
            if (!heroMediaContainer) {
                console.error("Контейнер для heroMedia не знайдений");
                return;
            }
            try {
                const heroMedia = await getHeroSlider();
                console.log(heroMedia);
                if (heroMedia && heroMedia[0]) {
                    const {heroMediaTitle, heroMediaDescription, heroGallery} = heroMedia[0];
                    const titleElement = heroMediaContainer.querySelector(".heroMedia__title");
                    if (heroMediaTitle && titleElement) titleElement.textContent = heroMediaTitle;
                    const descriptionElement = heroMediaContainer.querySelector(".heroMedia__description");
                    if (heroMediaDescription && descriptionElement) descriptionElement.textContent = heroMediaDescription;
                    const swiperWrapper = heroMediaContainer.querySelector(".heroMedia__wrapper");
                    if (heroGallery && heroGallery.length > 0 && swiperWrapper) {
                        swiperWrapper.innerHTML = "";
                        heroGallery.forEach((imgSrc => {
                            const slide = document.createElement("div");
                            slide.classList.add("heroMedia__slide", "swiper-slide");
                            slide.innerHTML = `<img src="${imgSrc}" alt="heroMedia image">`;
                            swiperWrapper.appendChild(slide);
                        }));
                    }
                }
            } catch (error) {
                console.error("Помилка завантаження heroMedia:", error);
            }
        }));
        /*!
 * lightgallery | 2.8.1 | November 13th 2024
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */
        /*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
        var lightgallery_es5_assign = function() {
            lightgallery_es5_assign = Object.assign || function __assign(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
            return lightgallery_es5_assign.apply(this, arguments);
        };
        function lightgallery_es5_spreadArrays() {
            for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
            var r = Array(s), k = 0;
            for (i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
            k++) r[k] = a[j];
            return r;
        }
        var lGEvents = {
            afterAppendSlide: "lgAfterAppendSlide",
            init: "lgInit",
            hasVideo: "lgHasVideo",
            containerResize: "lgContainerResize",
            updateSlides: "lgUpdateSlides",
            afterAppendSubHtml: "lgAfterAppendSubHtml",
            beforeOpen: "lgBeforeOpen",
            afterOpen: "lgAfterOpen",
            slideItemLoad: "lgSlideItemLoad",
            beforeSlide: "lgBeforeSlide",
            afterSlide: "lgAfterSlide",
            posterClick: "lgPosterClick",
            dragStart: "lgDragStart",
            dragMove: "lgDragMove",
            dragEnd: "lgDragEnd",
            beforeNextSlide: "lgBeforeNextSlide",
            beforePrevSlide: "lgBeforePrevSlide",
            beforeClose: "lgBeforeClose",
            afterClose: "lgAfterClose",
            rotateLeft: "lgRotateLeft",
            rotateRight: "lgRotateRight",
            flipHorizontal: "lgFlipHorizontal",
            flipVertical: "lgFlipVertical",
            autoplay: "lgAutoplay",
            autoplayStart: "lgAutoplayStart",
            autoplayStop: "lgAutoplayStop"
        };
        var lightGalleryCoreSettings = {
            mode: "lg-slide",
            easing: "ease",
            speed: 400,
            licenseKey: "0000-0000-000-0000",
            height: "100%",
            width: "100%",
            addClass: "",
            startClass: "lg-start-zoom",
            backdropDuration: 300,
            container: "",
            startAnimationDuration: 400,
            zoomFromOrigin: true,
            hideBarsDelay: 0,
            showBarsAfter: 1e4,
            slideDelay: 0,
            supportLegacyBrowser: true,
            allowMediaOverlap: false,
            videoMaxSize: "1280-720",
            loadYouTubePoster: true,
            defaultCaptionHeight: 0,
            ariaLabelledby: "",
            ariaDescribedby: "",
            resetScrollPosition: true,
            hideScrollbar: false,
            closable: true,
            swipeToClose: true,
            closeOnTap: true,
            showCloseIcon: true,
            showMaximizeIcon: false,
            loop: true,
            escKey: true,
            keyPress: true,
            trapFocus: true,
            controls: true,
            slideEndAnimation: true,
            hideControlOnEnd: false,
            mousewheel: false,
            getCaptionFromTitleOrAlt: true,
            appendSubHtmlTo: ".lg-sub-html",
            subHtmlSelectorRelative: false,
            preload: 2,
            numberOfSlideItemsInDom: 10,
            selector: "",
            selectWithin: "",
            nextHtml: "",
            prevHtml: "",
            index: 0,
            iframeWidth: "100%",
            iframeHeight: "100%",
            iframeMaxWidth: "100%",
            iframeMaxHeight: "100%",
            download: true,
            counter: true,
            appendCounterTo: ".lg-toolbar",
            swipeThreshold: 50,
            enableSwipe: true,
            enableDrag: true,
            dynamic: false,
            dynamicEl: [],
            extraProps: [],
            exThumbImage: "",
            isMobile: void 0,
            mobileSettings: {
                controls: false,
                showCloseIcon: false,
                download: false
            },
            plugins: [],
            strings: {
                closeGallery: "Close gallery",
                toggleMaximize: "Toggle maximize",
                previousSlide: "Previous slide",
                nextSlide: "Next slide",
                download: "Download",
                playVideo: "Play video",
                mediaLoadingFailed: "Oops... Failed to load content..."
            }
        };
        function initLgPolyfills() {
            (function() {
                if (typeof window.CustomEvent === "function") return false;
                function CustomEvent(event, params) {
                    params = params || {
                        bubbles: false,
                        cancelable: false,
                        detail: null
                    };
                    var evt = document.createEvent("CustomEvent");
                    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                    return evt;
                }
                window.CustomEvent = CustomEvent;
            })();
            (function() {
                if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
            })();
        }
        var lgQuery = function() {
            function lgQuery(selector) {
                this.cssVenderPrefixes = [ "TransitionDuration", "TransitionTimingFunction", "Transform", "Transition" ];
                this.selector = this._getSelector(selector);
                this.firstElement = this._getFirstEl();
                return this;
            }
            lgQuery.generateUUID = function() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(c) {
                    var r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
                    return v.toString(16);
                }));
            };
            lgQuery.prototype._getSelector = function(selector, context) {
                if (context === void 0) context = document;
                if (typeof selector !== "string") return selector;
                context = context || document;
                var fl = selector.substring(0, 1);
                if (fl === "#") return context.querySelector(selector); else return context.querySelectorAll(selector);
            };
            lgQuery.prototype._each = function(func) {
                if (!this.selector) return this;
                if (this.selector.length !== void 0) [].forEach.call(this.selector, func); else func(this.selector, 0);
                return this;
            };
            lgQuery.prototype._setCssVendorPrefix = function(el, cssProperty, value) {
                var property = cssProperty.replace(/-([a-z])/gi, (function(s, group1) {
                    return group1.toUpperCase();
                }));
                if (this.cssVenderPrefixes.indexOf(property) !== -1) {
                    el.style[property.charAt(0).toLowerCase() + property.slice(1)] = value;
                    el.style["webkit" + property] = value;
                    el.style["moz" + property] = value;
                    el.style["ms" + property] = value;
                    el.style["o" + property] = value;
                } else el.style[property] = value;
            };
            lgQuery.prototype._getFirstEl = function() {
                if (this.selector && this.selector.length !== void 0) return this.selector[0]; else return this.selector;
            };
            lgQuery.prototype.isEventMatched = function(event, eventName) {
                var eventNamespace = eventName.split(".");
                return event.split(".").filter((function(e) {
                    return e;
                })).every((function(e) {
                    return eventNamespace.indexOf(e) !== -1;
                }));
            };
            lgQuery.prototype.attr = function(attr, value) {
                if (value === void 0) {
                    if (!this.firstElement) return "";
                    return this.firstElement.getAttribute(attr);
                }
                this._each((function(el) {
                    el.setAttribute(attr, value);
                }));
                return this;
            };
            lgQuery.prototype.find = function(selector) {
                return $LG(this._getSelector(selector, this.selector));
            };
            lgQuery.prototype.first = function() {
                if (this.selector && this.selector.length !== void 0) return $LG(this.selector[0]); else return $LG(this.selector);
            };
            lgQuery.prototype.eq = function(index) {
                return $LG(this.selector[index]);
            };
            lgQuery.prototype.parent = function() {
                return $LG(this.selector.parentElement);
            };
            lgQuery.prototype.get = function() {
                return this._getFirstEl();
            };
            lgQuery.prototype.removeAttr = function(attributes) {
                var attrs = attributes.split(" ");
                this._each((function(el) {
                    attrs.forEach((function(attr) {
                        return el.removeAttribute(attr);
                    }));
                }));
                return this;
            };
            lgQuery.prototype.wrap = function(className) {
                if (!this.firstElement) return this;
                var wrapper = document.createElement("div");
                wrapper.className = className;
                this.firstElement.parentNode.insertBefore(wrapper, this.firstElement);
                this.firstElement.parentNode.removeChild(this.firstElement);
                wrapper.appendChild(this.firstElement);
                return this;
            };
            lgQuery.prototype.addClass = function(classNames) {
                if (classNames === void 0) classNames = "";
                this._each((function(el) {
                    classNames.split(" ").forEach((function(className) {
                        if (className) el.classList.add(className);
                    }));
                }));
                return this;
            };
            lgQuery.prototype.removeClass = function(classNames) {
                this._each((function(el) {
                    classNames.split(" ").forEach((function(className) {
                        if (className) el.classList.remove(className);
                    }));
                }));
                return this;
            };
            lgQuery.prototype.hasClass = function(className) {
                if (!this.firstElement) return false;
                return this.firstElement.classList.contains(className);
            };
            lgQuery.prototype.hasAttribute = function(attribute) {
                if (!this.firstElement) return false;
                return this.firstElement.hasAttribute(attribute);
            };
            lgQuery.prototype.toggleClass = function(className) {
                if (!this.firstElement) return this;
                if (this.hasClass(className)) this.removeClass(className); else this.addClass(className);
                return this;
            };
            lgQuery.prototype.css = function(property, value) {
                var _this = this;
                this._each((function(el) {
                    _this._setCssVendorPrefix(el, property, value);
                }));
                return this;
            };
            lgQuery.prototype.on = function(events, listener) {
                var _this = this;
                if (!this.selector) return this;
                events.split(" ").forEach((function(event) {
                    if (!Array.isArray(lgQuery.eventListeners[event])) lgQuery.eventListeners[event] = [];
                    lgQuery.eventListeners[event].push(listener);
                    _this.selector.addEventListener(event.split(".")[0], listener);
                }));
                return this;
            };
            lgQuery.prototype.once = function(event, listener) {
                var _this = this;
                this.on(event, (function() {
                    _this.off(event);
                    listener(event);
                }));
                return this;
            };
            lgQuery.prototype.off = function(event) {
                var _this = this;
                if (!this.selector) return this;
                Object.keys(lgQuery.eventListeners).forEach((function(eventName) {
                    if (_this.isEventMatched(event, eventName)) {
                        lgQuery.eventListeners[eventName].forEach((function(listener) {
                            _this.selector.removeEventListener(eventName.split(".")[0], listener);
                        }));
                        lgQuery.eventListeners[eventName] = [];
                    }
                }));
                return this;
            };
            lgQuery.prototype.trigger = function(event, detail) {
                if (!this.firstElement) return this;
                var customEvent = new CustomEvent(event.split(".")[0], {
                    detail: detail || null
                });
                this.firstElement.dispatchEvent(customEvent);
                return this;
            };
            lgQuery.prototype.load = function(url) {
                var _this = this;
                fetch(url).then((function(res) {
                    return res.text();
                })).then((function(html) {
                    _this.selector.innerHTML = html;
                }));
                return this;
            };
            lgQuery.prototype.html = function(html) {
                if (html === void 0) {
                    if (!this.firstElement) return "";
                    return this.firstElement.innerHTML;
                }
                this._each((function(el) {
                    el.innerHTML = html;
                }));
                return this;
            };
            lgQuery.prototype.append = function(html) {
                this._each((function(el) {
                    if (typeof html === "string") el.insertAdjacentHTML("beforeend", html); else el.appendChild(html);
                }));
                return this;
            };
            lgQuery.prototype.prepend = function(html) {
                this._each((function(el) {
                    if (typeof html === "string") el.insertAdjacentHTML("afterbegin", html); else if (html instanceof HTMLElement) el.insertBefore(html.cloneNode(true), el.firstChild);
                }));
                return this;
            };
            lgQuery.prototype.remove = function() {
                this._each((function(el) {
                    el.parentNode.removeChild(el);
                }));
                return this;
            };
            lgQuery.prototype.empty = function() {
                this._each((function(el) {
                    el.innerHTML = "";
                }));
                return this;
            };
            lgQuery.prototype.scrollTop = function(scrollTop) {
                if (scrollTop !== void 0) {
                    document.body.scrollTop = scrollTop;
                    document.documentElement.scrollTop = scrollTop;
                    return this;
                } else return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            };
            lgQuery.prototype.scrollLeft = function(scrollLeft) {
                if (scrollLeft !== void 0) {
                    document.body.scrollLeft = scrollLeft;
                    document.documentElement.scrollLeft = scrollLeft;
                    return this;
                } else return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
            };
            lgQuery.prototype.offset = function() {
                if (!this.firstElement) return {
                    left: 0,
                    top: 0
                };
                var rect = this.firstElement.getBoundingClientRect();
                var bodyMarginLeft = $LG("body").style().marginLeft;
                return {
                    left: rect.left - parseFloat(bodyMarginLeft) + this.scrollLeft(),
                    top: rect.top + this.scrollTop()
                };
            };
            lgQuery.prototype.style = function() {
                if (!this.firstElement) return {};
                return this.firstElement.currentStyle || window.getComputedStyle(this.firstElement);
            };
            lgQuery.prototype.width = function() {
                var style = this.style();
                return this.firstElement.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
            };
            lgQuery.prototype.height = function() {
                var style = this.style();
                return this.firstElement.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
            };
            lgQuery.eventListeners = {};
            return lgQuery;
        }();
        function $LG(selector) {
            initLgPolyfills();
            return new lgQuery(selector);
        }
        var defaultDynamicOptions = [ "src", "sources", "subHtml", "subHtmlUrl", "html", "video", "poster", "slideName", "responsive", "srcset", "sizes", "iframe", "downloadUrl", "download", "width", "facebookShareUrl", "tweetText", "iframeTitle", "twitterShareUrl", "pinterestShareUrl", "pinterestText", "fbHtml", "disqusIdentifier", "disqusUrl" ];
        function convertToData(attr) {
            if (attr === "href") return "src";
            attr = attr.replace("data-", "");
            attr = attr.charAt(0).toLowerCase() + attr.slice(1);
            attr = attr.replace(/-([a-z])/g, (function(g) {
                return g[1].toUpperCase();
            }));
            return attr;
        }
        var utils = {
            fetchCaptionFromUrl: function(url, element, insertMethod) {
                fetch(url).then((function(response) {
                    return response.text();
                })).then((function(htmlContent) {
                    if (insertMethod === "append") {
                        var contentDiv = '<div class="lg-sub-html">' + htmlContent + "</div>";
                        element.append(contentDiv);
                    } else element.html(htmlContent);
                }));
            },
            getSize: function(el, container, spacing, defaultLgSize) {
                if (spacing === void 0) spacing = 0;
                var LGel = $LG(el);
                var lgSize = LGel.attr("data-lg-size") || defaultLgSize;
                if (!lgSize) return;
                var isResponsiveSizes = lgSize.split(",");
                if (isResponsiveSizes[1]) {
                    var wWidth = window.innerWidth;
                    for (var i = 0; i < isResponsiveSizes.length; i++) {
                        var size_1 = isResponsiveSizes[i];
                        var responsiveWidth = parseInt(size_1.split("-")[2], 10);
                        if (responsiveWidth > wWidth) {
                            lgSize = size_1;
                            break;
                        }
                        if (i === isResponsiveSizes.length - 1) lgSize = size_1;
                    }
                }
                var size = lgSize.split("-");
                var width = parseInt(size[0], 10);
                var height = parseInt(size[1], 10);
                var cWidth = container.width();
                var cHeight = container.height() - spacing;
                var maxWidth = Math.min(cWidth, width);
                var maxHeight = Math.min(cHeight, height);
                var ratio = Math.min(maxWidth / width, maxHeight / height);
                return {
                    width: width * ratio,
                    height: height * ratio
                };
            },
            getTransform: function(el, container, top, bottom, imageSize) {
                if (!imageSize) return;
                var LGel = $LG(el).find("img").first();
                if (!LGel.get()) return;
                var containerRect = container.get().getBoundingClientRect();
                var wWidth = containerRect.width;
                var wHeight = container.height() - (top + bottom);
                var elWidth = LGel.width();
                var elHeight = LGel.height();
                var elStyle = LGel.style();
                var x = (wWidth - elWidth) / 2 - LGel.offset().left + (parseFloat(elStyle.paddingLeft) || 0) + (parseFloat(elStyle.borderLeft) || 0) + $LG(window).scrollLeft() + containerRect.left;
                var y = (wHeight - elHeight) / 2 - LGel.offset().top + (parseFloat(elStyle.paddingTop) || 0) + (parseFloat(elStyle.borderTop) || 0) + $LG(window).scrollTop() + top;
                var scX = elWidth / imageSize.width;
                var scY = elHeight / imageSize.height;
                var transform = "translate3d(" + (x *= -1) + "px, " + (y *= -1) + "px, 0) scale3d(" + scX + ", " + scY + ", 1)";
                return transform;
            },
            getIframeMarkup: function(iframeWidth, iframeHeight, iframeMaxWidth, iframeMaxHeight, src, iframeTitle) {
                var title = iframeTitle ? 'title="' + iframeTitle + '"' : "";
                return '<div class="lg-media-cont lg-has-iframe" style="width:' + iframeWidth + "; max-width:" + iframeMaxWidth + "; height: " + iframeHeight + "; max-height:" + iframeMaxHeight + '">\n                    <iframe class="lg-object" frameborder="0" ' + title + ' src="' + src + '"  allowfullscreen="true"></iframe>\n                </div>';
            },
            getImgMarkup: function(index, src, altAttr, srcset, sizes, sources) {
                var srcsetAttr = srcset ? 'srcset="' + srcset + '"' : "";
                var sizesAttr = sizes ? 'sizes="' + sizes + '"' : "";
                var imgMarkup = "<img " + altAttr + " " + srcsetAttr + "  " + sizesAttr + ' class="lg-object lg-image" data-index="' + index + '" src="' + src + '" />';
                var sourceTag = "";
                if (sources) {
                    var sourceObj = typeof sources === "string" ? JSON.parse(sources) : sources;
                    sourceTag = sourceObj.map((function(source) {
                        var attrs = "";
                        Object.keys(source).forEach((function(key) {
                            attrs += " " + key + '="' + source[key] + '"';
                        }));
                        return "<source " + attrs + "></source>";
                    }));
                }
                return "" + sourceTag + imgMarkup;
            },
            getResponsiveSrc: function(srcItms) {
                var rsWidth = [];
                var rsSrc = [];
                var src = "";
                for (var i = 0; i < srcItms.length; i++) {
                    var _src = srcItms[i].split(" ");
                    if (_src[0] === "") _src.splice(0, 1);
                    rsSrc.push(_src[0]);
                    rsWidth.push(_src[1]);
                }
                var wWidth = window.innerWidth;
                for (var j = 0; j < rsWidth.length; j++) if (parseInt(rsWidth[j], 10) > wWidth) {
                    src = rsSrc[j];
                    break;
                }
                return src;
            },
            isImageLoaded: function(img) {
                if (!img) return false;
                if (!img.complete) return false;
                if (img.naturalWidth === 0) return false;
                return true;
            },
            getVideoPosterMarkup: function(_poster, dummyImg, videoContStyle, playVideoString, _isVideo) {
                var videoClass = "";
                if (_isVideo && _isVideo.youtube) videoClass = "lg-has-youtube"; else if (_isVideo && _isVideo.vimeo) videoClass = "lg-has-vimeo"; else videoClass = "lg-has-html5";
                var _dummy = dummyImg;
                if (typeof dummyImg !== "string") _dummy = dummyImg.outerHTML;
                return '<div class="lg-video-cont ' + videoClass + '" style="' + videoContStyle + '">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="' + playVideoString + '"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>' + playVideoString + '</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ' + _dummy + '\n            <img class="lg-object lg-video-poster" src="' + _poster + '" />\n        </div>';
            },
            getFocusableElements: function(container) {
                var elements = container.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
                var visibleElements = [].filter.call(elements, (function(element) {
                    var style = window.getComputedStyle(element);
                    return style.display !== "none" && style.visibility !== "hidden";
                }));
                return visibleElements;
            },
            getDynamicOptions: function(items, extraProps, getCaptionFromTitleOrAlt, exThumbImage) {
                var dynamicElements = [];
                var availableDynamicOptions = lightgallery_es5_spreadArrays(defaultDynamicOptions, extraProps);
                [].forEach.call(items, (function(item) {
                    var dynamicEl = {};
                    for (var i = 0; i < item.attributes.length; i++) {
                        var attr = item.attributes[i];
                        if (attr.specified) {
                            var dynamicAttr = convertToData(attr.name);
                            var label = "";
                            if (availableDynamicOptions.indexOf(dynamicAttr) > -1) label = dynamicAttr;
                            if (label) dynamicEl[label] = attr.value;
                        }
                    }
                    var currentItem = $LG(item);
                    var alt = currentItem.find("img").first().attr("alt");
                    var title = currentItem.attr("title");
                    var thumb = exThumbImage ? currentItem.attr(exThumbImage) : currentItem.find("img").first().attr("src");
                    dynamicEl.thumb = thumb;
                    if (getCaptionFromTitleOrAlt && !dynamicEl.subHtml) dynamicEl.subHtml = title || alt || "";
                    dynamicEl.alt = alt || title || "";
                    dynamicElements.push(dynamicEl);
                }));
                console.log(dynamicElements, "dynamicElements");
                return dynamicElements;
            },
            isMobile: function() {
                return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            },
            isVideo: function(src, isHTML5VIdeo, index) {
                if (!src) if (isHTML5VIdeo) return {
                    html5: true
                }; else {
                    console.error("lightGallery :- data-src is not provided on slide item " + (index + 1) + ". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/");
                    return;
                }
                var youtube = src.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i);
                var vimeo = src.match(/\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i);
                var wistia = src.match(/https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/);
                if (youtube) return {
                    youtube
                }; else if (vimeo) return {
                    vimeo
                }; else if (wistia) return {
                    wistia
                };
            }
        };
        var lgId = 0;
        var LightGallery = function() {
            function LightGallery(element, options) {
                this.lgOpened = false;
                this.index = 0;
                this.plugins = [];
                this.lGalleryOn = false;
                this.lgBusy = false;
                this.currentItemsInDom = [];
                this.prevScrollTop = 0;
                this.bodyPaddingRight = 0;
                this.isDummyImageRemoved = false;
                this.dragOrSwipeEnabled = false;
                this.mediaContainerPosition = {
                    top: 0,
                    bottom: 0
                };
                if (!element) return this;
                lgId++;
                this.lgId = lgId;
                this.el = element;
                this.LGel = $LG(element);
                this.generateSettings(options);
                this.buildModules();
                if (this.settings.dynamic && this.settings.dynamicEl !== void 0 && !Array.isArray(this.settings.dynamicEl)) throw "When using dynamic mode, you must also define dynamicEl as an Array.";
                this.galleryItems = this.getItems();
                this.normalizeSettings();
                this.init();
                this.validateLicense();
                return this;
            }
            LightGallery.prototype.generateSettings = function(options) {
                this.settings = lightgallery_es5_assign(lightgallery_es5_assign({}, lightGalleryCoreSettings), options);
                if (this.settings.isMobile && typeof this.settings.isMobile === "function" ? this.settings.isMobile() : utils.isMobile()) {
                    var mobileSettings = lightgallery_es5_assign(lightgallery_es5_assign({}, this.settings.mobileSettings), this.settings.mobileSettings);
                    this.settings = lightgallery_es5_assign(lightgallery_es5_assign({}, this.settings), mobileSettings);
                }
            };
            LightGallery.prototype.normalizeSettings = function() {
                if (this.settings.slideEndAnimation) this.settings.hideControlOnEnd = false;
                if (!this.settings.closable) this.settings.swipeToClose = false;
                this.zoomFromOrigin = this.settings.zoomFromOrigin;
                if (this.settings.dynamic) this.zoomFromOrigin = false;
                if (this.settings.container) {
                    var container = this.settings.container;
                    if (typeof container === "function") this.settings.container = container(); else if (typeof container === "string") {
                        var el = document.querySelector(container);
                        this.settings.container = el !== null && el !== void 0 ? el : document.body;
                    }
                } else this.settings.container = document.body;
                this.settings.preload = Math.min(this.settings.preload, this.galleryItems.length);
            };
            LightGallery.prototype.init = function() {
                var _this = this;
                this.addSlideVideoInfo(this.galleryItems);
                this.buildStructure();
                this.LGel.trigger(lGEvents.init, {
                    instance: this
                });
                if (this.settings.keyPress) this.keyPress();
                setTimeout((function() {
                    _this.enableDrag();
                    _this.enableSwipe();
                    _this.triggerPosterClick();
                }), 50);
                this.arrow();
                if (this.settings.mousewheel) this.mousewheel();
                if (!this.settings.dynamic) this.openGalleryOnItemClick();
            };
            LightGallery.prototype.openGalleryOnItemClick = function() {
                var _this = this;
                var _loop_1 = function(index) {
                    var element = this_1.items[index];
                    var $element = $LG(element);
                    var uuid = lgQuery.generateUUID();
                    $element.attr("data-lg-id", uuid).on("click.lgcustom-item-" + uuid, (function(e) {
                        e.preventDefault();
                        var currentItemIndex = _this.settings.index || index;
                        _this.openGallery(currentItemIndex, element);
                    }));
                };
                var this_1 = this;
                for (var index = 0; index < this.items.length; index++) _loop_1(index);
            };
            LightGallery.prototype.buildModules = function() {
                var _this = this;
                this.settings.plugins.forEach((function(plugin) {
                    _this.plugins.push(new plugin(_this, $LG));
                }));
            };
            LightGallery.prototype.validateLicense = function() {
                if (!this.settings.licenseKey) console.error("Please provide a valid license key"); else if (this.settings.licenseKey === "0000-0000-000-0000") console.warn("lightGallery: " + this.settings.licenseKey + " license key is not valid for production use");
            };
            LightGallery.prototype.getSlideItem = function(index) {
                return $LG(this.getSlideItemId(index));
            };
            LightGallery.prototype.getSlideItemId = function(index) {
                return "#lg-item-" + this.lgId + "-" + index;
            };
            LightGallery.prototype.getIdName = function(id) {
                return id + "-" + this.lgId;
            };
            LightGallery.prototype.getElementById = function(id) {
                return $LG("#" + this.getIdName(id));
            };
            LightGallery.prototype.manageSingleSlideClassName = function() {
                if (this.galleryItems.length < 2) this.outer.addClass("lg-single-item"); else this.outer.removeClass("lg-single-item");
            };
            LightGallery.prototype.buildStructure = function() {
                var _this = this;
                var container = this.$container && this.$container.get();
                if (container) return;
                var controls = "";
                var subHtmlCont = "";
                if (this.settings.controls) controls = '<button type="button" id="' + this.getIdName("lg-prev") + '" aria-label="' + this.settings.strings["previousSlide"] + '" class="lg-prev lg-icon"> ' + this.settings.prevHtml + ' </button>\n                <button type="button" id="' + this.getIdName("lg-next") + '" aria-label="' + this.settings.strings["nextSlide"] + '" class="lg-next lg-icon"> ' + this.settings.nextHtml + " </button>";
                if (this.settings.appendSubHtmlTo !== ".lg-item") subHtmlCont = '<div class="lg-sub-html" role="status" aria-live="polite"></div>';
                var addClasses = "";
                if (this.settings.allowMediaOverlap) addClasses += "lg-media-overlap ";
                var ariaLabelledby = this.settings.ariaLabelledby ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"' : "";
                var ariaDescribedby = this.settings.ariaDescribedby ? 'aria-describedby="' + this.settings.ariaDescribedby + '"' : "";
                var containerClassName = "lg-container " + this.settings.addClass + " " + (document.body !== this.settings.container ? "lg-inline" : "");
                var closeIcon = this.settings.closable && this.settings.showCloseIcon ? '<button type="button" aria-label="' + this.settings.strings["closeGallery"] + '" id="' + this.getIdName("lg-close") + '" class="lg-close lg-icon"></button>' : "";
                var maximizeIcon = this.settings.showMaximizeIcon ? '<button type="button" aria-label="' + this.settings.strings["toggleMaximize"] + '" id="' + this.getIdName("lg-maximize") + '" class="lg-maximize lg-icon"></button>' : "";
                var template = '\n        <div class="' + containerClassName + '" id="' + this.getIdName("lg-container") + '" tabindex="-1" aria-modal="true" ' + ariaLabelledby + " " + ariaDescribedby + ' role="dialog"\n        >\n            <div id="' + this.getIdName("lg-backdrop") + '" class="lg-backdrop"></div>\n\n            <div id="' + this.getIdName("lg-outer") + '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' + addClasses + ' ">\n\n              <div id="' + this.getIdName("lg-content") + '" class="lg-content">\n                <div id="' + this.getIdName("lg-inner") + '" class="lg-inner">\n                </div>\n                ' + controls + '\n              </div>\n                <div id="' + this.getIdName("lg-toolbar") + '" class="lg-toolbar lg-group">\n                    ' + maximizeIcon + "\n                    " + closeIcon + "\n                    </div>\n                    " + (this.settings.appendSubHtmlTo === ".lg-outer" ? subHtmlCont : "") + '\n                <div id="' + this.getIdName("lg-components") + '" class="lg-components">\n                    ' + (this.settings.appendSubHtmlTo === ".lg-sub-html" ? subHtmlCont : "") + "\n                </div>\n            </div>\n        </div>\n        ";
                $LG(this.settings.container).append(template);
                if (document.body !== this.settings.container) $LG(this.settings.container).css("position", "relative");
                this.outer = this.getElementById("lg-outer");
                this.$lgComponents = this.getElementById("lg-components");
                this.$backdrop = this.getElementById("lg-backdrop");
                this.$container = this.getElementById("lg-container");
                this.$inner = this.getElementById("lg-inner");
                this.$content = this.getElementById("lg-content");
                this.$toolbar = this.getElementById("lg-toolbar");
                this.$backdrop.css("transition-duration", this.settings.backdropDuration + "ms");
                var outerClassNames = this.settings.mode + " ";
                this.manageSingleSlideClassName();
                if (this.settings.enableDrag) outerClassNames += "lg-grab ";
                this.outer.addClass(outerClassNames);
                this.$inner.css("transition-timing-function", this.settings.easing);
                this.$inner.css("transition-duration", this.settings.speed + "ms");
                if (this.settings.download) this.$toolbar.append('<a id="' + this.getIdName("lg-download") + '" target="_blank" rel="noopener" aria-label="' + this.settings.strings["download"] + '" download class="lg-download lg-icon"></a>');
                this.counter();
                $LG(window).on("resize.lg.global" + this.lgId + " orientationchange.lg.global" + this.lgId, (function() {
                    _this.refreshOnResize();
                }));
                this.hideBars();
                this.manageCloseGallery();
                this.toggleMaximize();
                this.initModules();
            };
            LightGallery.prototype.refreshOnResize = function() {
                if (this.lgOpened) {
                    var currentGalleryItem = this.galleryItems[this.index];
                    var __slideVideoInfo = currentGalleryItem.__slideVideoInfo;
                    this.mediaContainerPosition = this.getMediaContainerPosition();
                    var _a = this.mediaContainerPosition, top_1 = _a.top, bottom = _a.bottom;
                    this.currentImageSize = utils.getSize(this.items[this.index], this.outer, top_1 + bottom, __slideVideoInfo && this.settings.videoMaxSize);
                    if (__slideVideoInfo) this.resizeVideoSlide(this.index, this.currentImageSize);
                    if (this.zoomFromOrigin && !this.isDummyImageRemoved) {
                        var imgStyle = this.getDummyImgStyles(this.currentImageSize);
                        this.outer.find(".lg-current .lg-dummy-img").first().attr("style", imgStyle);
                    }
                    this.LGel.trigger(lGEvents.containerResize);
                }
            };
            LightGallery.prototype.resizeVideoSlide = function(index, imageSize) {
                var lgVideoStyle = this.getVideoContStyle(imageSize);
                var currentSlide = this.getSlideItem(index);
                currentSlide.find(".lg-video-cont").attr("style", lgVideoStyle);
            };
            LightGallery.prototype.updateSlides = function(items, index) {
                if (this.index > items.length - 1) this.index = items.length - 1;
                if (items.length === 1) this.index = 0;
                if (!items.length) {
                    this.closeGallery();
                    return;
                }
                var currentSrc = this.galleryItems[index].src;
                this.galleryItems = items;
                this.updateControls();
                this.$inner.empty();
                this.currentItemsInDom = [];
                var _index = 0;
                this.galleryItems.some((function(galleryItem, itemIndex) {
                    if (galleryItem.src === currentSrc) {
                        _index = itemIndex;
                        return true;
                    }
                    return false;
                }));
                this.currentItemsInDom = this.organizeSlideItems(_index, -1);
                this.loadContent(_index, true);
                this.getSlideItem(_index).addClass("lg-current");
                this.index = _index;
                this.updateCurrentCounter(_index);
                this.LGel.trigger(lGEvents.updateSlides);
            };
            LightGallery.prototype.getItems = function() {
                this.items = [];
                if (!this.settings.dynamic) {
                    if (this.settings.selector === "this") this.items.push(this.el); else if (this.settings.selector) if (typeof this.settings.selector === "string") if (this.settings.selectWithin) {
                        var selectWithin = $LG(this.settings.selectWithin);
                        this.items = selectWithin.find(this.settings.selector).get();
                    } else this.items = this.el.querySelectorAll(this.settings.selector); else this.items = this.settings.selector; else this.items = this.el.children;
                    return utils.getDynamicOptions(this.items, this.settings.extraProps, this.settings.getCaptionFromTitleOrAlt, this.settings.exThumbImage);
                } else return this.settings.dynamicEl || [];
            };
            LightGallery.prototype.shouldHideScrollbar = function() {
                return this.settings.hideScrollbar && document.body === this.settings.container;
            };
            LightGallery.prototype.hideScrollbar = function() {
                if (!this.shouldHideScrollbar()) return;
                this.bodyPaddingRight = parseFloat($LG("body").style().paddingRight);
                var bodyRect = document.documentElement.getBoundingClientRect();
                var scrollbarWidth = window.innerWidth - bodyRect.width;
                $LG(document.body).css("padding-right", scrollbarWidth + this.bodyPaddingRight + "px");
                $LG(document.body).addClass("lg-overlay-open");
            };
            LightGallery.prototype.resetScrollBar = function() {
                if (!this.shouldHideScrollbar()) return;
                $LG(document.body).css("padding-right", this.bodyPaddingRight + "px");
                $LG(document.body).removeClass("lg-overlay-open");
            };
            LightGallery.prototype.openGallery = function(index, element) {
                var _this = this;
                if (index === void 0) index = this.settings.index;
                if (this.lgOpened) return;
                this.lgOpened = true;
                this.outer.removeClass("lg-hide-items");
                this.hideScrollbar();
                this.$container.addClass("lg-show");
                var itemsToBeInsertedToDom = this.getItemsToBeInsertedToDom(index, index);
                this.currentItemsInDom = itemsToBeInsertedToDom;
                var items = "";
                itemsToBeInsertedToDom.forEach((function(item) {
                    items = items + '<div id="' + item + '" class="lg-item"></div>';
                }));
                this.$inner.append(items);
                this.addHtml(index);
                var transform = "";
                this.mediaContainerPosition = this.getMediaContainerPosition();
                var _a = this.mediaContainerPosition, top = _a.top, bottom = _a.bottom;
                if (!this.settings.allowMediaOverlap) this.setMediaContainerPosition(top, bottom);
                var __slideVideoInfo = this.galleryItems[index].__slideVideoInfo;
                if (this.zoomFromOrigin && element) {
                    this.currentImageSize = utils.getSize(element, this.outer, top + bottom, __slideVideoInfo && this.settings.videoMaxSize);
                    transform = utils.getTransform(element, this.outer, top, bottom, this.currentImageSize);
                }
                if (!this.zoomFromOrigin || !transform) {
                    this.outer.addClass(this.settings.startClass);
                    this.getSlideItem(index).removeClass("lg-complete");
                }
                var timeout = this.settings.zoomFromOrigin ? 100 : this.settings.backdropDuration;
                setTimeout((function() {
                    _this.outer.addClass("lg-components-open");
                }), timeout);
                this.index = index;
                this.LGel.trigger(lGEvents.beforeOpen);
                this.getSlideItem(index).addClass("lg-current");
                this.lGalleryOn = false;
                this.prevScrollTop = $LG(window).scrollTop();
                setTimeout((function() {
                    if (_this.zoomFromOrigin && transform) {
                        var currentSlide_1 = _this.getSlideItem(index);
                        currentSlide_1.css("transform", transform);
                        setTimeout((function() {
                            currentSlide_1.addClass("lg-start-progress lg-start-end-progress").css("transition-duration", _this.settings.startAnimationDuration + "ms");
                            _this.outer.addClass("lg-zoom-from-image");
                        }));
                        setTimeout((function() {
                            currentSlide_1.css("transform", "translate3d(0, 0, 0)");
                        }), 100);
                    }
                    setTimeout((function() {
                        _this.$backdrop.addClass("in");
                        _this.$container.addClass("lg-show-in");
                    }), 10);
                    setTimeout((function() {
                        if (_this.settings.trapFocus && document.body === _this.settings.container) _this.trapFocus();
                    }), _this.settings.backdropDuration + 50);
                    if (!_this.zoomFromOrigin || !transform) setTimeout((function() {
                        _this.outer.addClass("lg-visible");
                    }), _this.settings.backdropDuration);
                    _this.slide(index, false, false, false);
                    _this.LGel.trigger(lGEvents.afterOpen);
                }));
                if (document.body === this.settings.container) $LG("html").addClass("lg-on");
            };
            LightGallery.prototype.getMediaContainerPosition = function() {
                if (this.settings.allowMediaOverlap) return {
                    top: 0,
                    bottom: 0
                };
                var top = this.$toolbar.get().clientHeight || 0;
                var subHtml = this.outer.find(".lg-components .lg-sub-html").get();
                var captionHeight = this.settings.defaultCaptionHeight || subHtml && subHtml.clientHeight || 0;
                var thumbContainer = this.outer.find(".lg-thumb-outer").get();
                var thumbHeight = thumbContainer ? thumbContainer.clientHeight : 0;
                var bottom = thumbHeight + captionHeight;
                return {
                    top,
                    bottom
                };
            };
            LightGallery.prototype.setMediaContainerPosition = function(top, bottom) {
                if (top === void 0) top = 0;
                if (bottom === void 0) bottom = 0;
                this.$content.css("top", top + "px").css("bottom", bottom + "px");
            };
            LightGallery.prototype.hideBars = function() {
                var _this = this;
                setTimeout((function() {
                    _this.outer.removeClass("lg-hide-items");
                    if (_this.settings.hideBarsDelay > 0) {
                        _this.outer.on("mousemove.lg click.lg touchstart.lg", (function() {
                            _this.outer.removeClass("lg-hide-items");
                            clearTimeout(_this.hideBarTimeout);
                            _this.hideBarTimeout = setTimeout((function() {
                                _this.outer.addClass("lg-hide-items");
                            }), _this.settings.hideBarsDelay);
                        }));
                        _this.outer.trigger("mousemove.lg");
                    }
                }), this.settings.showBarsAfter);
            };
            LightGallery.prototype.initPictureFill = function($img) {
                if (this.settings.supportLegacyBrowser) try {
                    picturefill({
                        elements: [ $img.get() ]
                    });
                } catch (e) {
                    console.warn("lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document.");
                }
            };
            LightGallery.prototype.counter = function() {
                if (this.settings.counter) {
                    var counterHtml = '<div class="lg-counter" role="status" aria-live="polite">\n                <span id="' + this.getIdName("lg-counter-current") + '" class="lg-counter-current">' + (this.index + 1) + ' </span> /\n                <span id="' + this.getIdName("lg-counter-all") + '" class="lg-counter-all">' + this.galleryItems.length + " </span></div>";
                    this.outer.find(this.settings.appendCounterTo).append(counterHtml);
                }
            };
            LightGallery.prototype.addHtml = function(index) {
                var subHtml;
                var subHtmlUrl;
                if (this.galleryItems[index].subHtmlUrl) subHtmlUrl = this.galleryItems[index].subHtmlUrl; else subHtml = this.galleryItems[index].subHtml;
                if (!subHtmlUrl) if (subHtml) {
                    var fL = subHtml.substring(0, 1);
                    if (fL === "." || fL === "#") if (this.settings.subHtmlSelectorRelative && !this.settings.dynamic) subHtml = $LG(this.items).eq(index).find(subHtml).first().html(); else subHtml = $LG(subHtml).first().html();
                } else subHtml = "";
                if (this.settings.appendSubHtmlTo !== ".lg-item") if (subHtmlUrl) utils.fetchCaptionFromUrl(subHtmlUrl, this.outer.find(".lg-sub-html"), "replace"); else this.outer.find(".lg-sub-html").html(subHtml); else {
                    var currentSlide = $LG(this.getSlideItemId(index));
                    if (subHtmlUrl) utils.fetchCaptionFromUrl(subHtmlUrl, currentSlide, "append"); else currentSlide.append('<div class="lg-sub-html">' + subHtml + "</div>");
                }
                if (typeof subHtml !== "undefined" && subHtml !== null) if (subHtml === "") this.outer.find(this.settings.appendSubHtmlTo).addClass("lg-empty-html"); else this.outer.find(this.settings.appendSubHtmlTo).removeClass("lg-empty-html");
                this.LGel.trigger(lGEvents.afterAppendSubHtml, {
                    index
                });
            };
            LightGallery.prototype.preload = function(index) {
                for (var i = 1; i <= this.settings.preload; i++) {
                    if (i >= this.galleryItems.length - index) break;
                    this.loadContent(index + i, false);
                }
                for (var j = 1; j <= this.settings.preload; j++) {
                    if (index - j < 0) break;
                    this.loadContent(index - j, false);
                }
            };
            LightGallery.prototype.getDummyImgStyles = function(imageSize) {
                if (!imageSize) return "";
                return "width:" + imageSize.width + "px;\n                margin-left: -" + imageSize.width / 2 + "px;\n                margin-top: -" + imageSize.height / 2 + "px;\n                height:" + imageSize.height + "px";
            };
            LightGallery.prototype.getVideoContStyle = function(imageSize) {
                if (!imageSize) return "";
                return "width:" + imageSize.width + "px;\n                height:" + imageSize.height + "px";
            };
            LightGallery.prototype.getDummyImageContent = function($currentSlide, index, alt) {
                var $currentItem;
                if (!this.settings.dynamic) $currentItem = $LG(this.items).eq(index);
                if ($currentItem) {
                    var _dummyImgSrc = void 0;
                    if (!this.settings.exThumbImage) _dummyImgSrc = $currentItem.find("img").first().attr("src"); else _dummyImgSrc = $currentItem.attr(this.settings.exThumbImage);
                    if (!_dummyImgSrc) return "";
                    var imgStyle = this.getDummyImgStyles(this.currentImageSize);
                    var dummyImgContentImg = document.createElement("img");
                    dummyImgContentImg.alt = alt || "";
                    dummyImgContentImg.src = _dummyImgSrc;
                    dummyImgContentImg.className = "lg-dummy-img";
                    dummyImgContentImg.style.cssText = imgStyle;
                    $currentSlide.addClass("lg-first-slide");
                    this.outer.addClass("lg-first-slide-loading");
                    return dummyImgContentImg;
                }
                return "";
            };
            LightGallery.prototype.setImgMarkup = function(src, $currentSlide, index) {
                var currentGalleryItem = this.galleryItems[index];
                var alt = currentGalleryItem.alt, srcset = currentGalleryItem.srcset, sizes = currentGalleryItem.sizes, sources = currentGalleryItem.sources;
                var imgContent = "";
                var altAttr = alt ? 'alt="' + alt + '"' : "";
                if (this.isFirstSlideWithZoomAnimation()) imgContent = this.getDummyImageContent($currentSlide, index, altAttr); else imgContent = utils.getImgMarkup(index, src, altAttr, srcset, sizes, sources);
                var picture = document.createElement("picture");
                picture.className = "lg-img-wrap";
                $LG(picture).append(imgContent);
                $currentSlide.prepend(picture);
            };
            LightGallery.prototype.onSlideObjectLoad = function($slide, isHTML5VideoWithoutPoster, onLoad, onError) {
                var mediaObject = $slide.find(".lg-object").first();
                if (utils.isImageLoaded(mediaObject.get()) || isHTML5VideoWithoutPoster) onLoad(); else {
                    mediaObject.on("load.lg error.lg", (function() {
                        onLoad && onLoad();
                    }));
                    mediaObject.on("error.lg", (function() {
                        onError && onError();
                    }));
                }
            };
            LightGallery.prototype.onLgObjectLoad = function(currentSlide, index, delay, speed, isFirstSlide, isHTML5VideoWithoutPoster) {
                var _this = this;
                this.onSlideObjectLoad(currentSlide, isHTML5VideoWithoutPoster, (function() {
                    _this.triggerSlideItemLoad(currentSlide, index, delay, speed, isFirstSlide);
                }), (function() {
                    currentSlide.addClass("lg-complete lg-complete_");
                    currentSlide.html('<span class="lg-error-msg">' + _this.settings.strings["mediaLoadingFailed"] + "</span>");
                }));
            };
            LightGallery.prototype.triggerSlideItemLoad = function($currentSlide, index, delay, speed, isFirstSlide) {
                var _this = this;
                var currentGalleryItem = this.galleryItems[index];
                var _speed = isFirstSlide && this.getSlideType(currentGalleryItem) === "video" && !currentGalleryItem.poster ? speed : 0;
                setTimeout((function() {
                    $currentSlide.addClass("lg-complete lg-complete_");
                    _this.LGel.trigger(lGEvents.slideItemLoad, {
                        index,
                        delay: delay || 0,
                        isFirstSlide
                    });
                }), _speed);
            };
            LightGallery.prototype.isFirstSlideWithZoomAnimation = function() {
                return !!(!this.lGalleryOn && this.zoomFromOrigin && this.currentImageSize);
            };
            LightGallery.prototype.addSlideVideoInfo = function(items) {
                var _this = this;
                items.forEach((function(element, index) {
                    element.__slideVideoInfo = utils.isVideo(element.src, !!element.video, index);
                    if (element.__slideVideoInfo && _this.settings.loadYouTubePoster && !element.poster && element.__slideVideoInfo.youtube) element.poster = "//img.youtube.com/vi/" + element.__slideVideoInfo.youtube[1] + "/maxresdefault.jpg";
                }));
            };
            LightGallery.prototype.loadContent = function(index, rec) {
                var _this = this;
                var currentGalleryItem = this.galleryItems[index];
                var $currentSlide = $LG(this.getSlideItemId(index));
                var poster = currentGalleryItem.poster, srcset = currentGalleryItem.srcset, sizes = currentGalleryItem.sizes, sources = currentGalleryItem.sources;
                var src = currentGalleryItem.src;
                var video = currentGalleryItem.video;
                var _html5Video = video && typeof video === "string" ? JSON.parse(video) : video;
                if (currentGalleryItem.responsive) {
                    var srcDyItms = currentGalleryItem.responsive.split(",");
                    src = utils.getResponsiveSrc(srcDyItms) || src;
                }
                var videoInfo = currentGalleryItem.__slideVideoInfo;
                var lgVideoStyle = "";
                var iframe = !!currentGalleryItem.iframe;
                var isFirstSlide = !this.lGalleryOn;
                var delay = 0;
                if (isFirstSlide) if (this.zoomFromOrigin && this.currentImageSize) delay = this.settings.startAnimationDuration + 10; else delay = this.settings.backdropDuration + 10;
                if (!$currentSlide.hasClass("lg-loaded")) {
                    if (videoInfo) {
                        var _a = this.mediaContainerPosition, top_2 = _a.top, bottom = _a.bottom;
                        var videoSize = utils.getSize(this.items[index], this.outer, top_2 + bottom, videoInfo && this.settings.videoMaxSize);
                        lgVideoStyle = this.getVideoContStyle(videoSize);
                    }
                    if (iframe) {
                        var markup = utils.getIframeMarkup(this.settings.iframeWidth, this.settings.iframeHeight, this.settings.iframeMaxWidth, this.settings.iframeMaxHeight, src, currentGalleryItem.iframeTitle);
                        $currentSlide.prepend(markup);
                    } else if (poster) {
                        var dummyImg = "";
                        var hasStartAnimation = isFirstSlide && this.zoomFromOrigin && this.currentImageSize;
                        if (hasStartAnimation) dummyImg = this.getDummyImageContent($currentSlide, index, "");
                        markup = utils.getVideoPosterMarkup(poster, dummyImg || "", lgVideoStyle, this.settings.strings["playVideo"], videoInfo);
                        $currentSlide.prepend(markup);
                    } else if (videoInfo) {
                        markup = '<div class="lg-video-cont " style="' + lgVideoStyle + '"></div>';
                        $currentSlide.prepend(markup);
                    } else {
                        this.setImgMarkup(src, $currentSlide, index);
                        if (srcset || sources) {
                            var $img = $currentSlide.find(".lg-object");
                            this.initPictureFill($img);
                        }
                    }
                    if (poster || videoInfo) this.LGel.trigger(lGEvents.hasVideo, {
                        index,
                        src,
                        html5Video: _html5Video,
                        hasPoster: !!poster
                    });
                    this.LGel.trigger(lGEvents.afterAppendSlide, {
                        index
                    });
                    if (this.lGalleryOn && this.settings.appendSubHtmlTo === ".lg-item") this.addHtml(index);
                }
                var _speed = 0;
                if (delay && !$LG(document.body).hasClass("lg-from-hash")) _speed = delay;
                if (this.isFirstSlideWithZoomAnimation()) {
                    setTimeout((function() {
                        $currentSlide.removeClass("lg-start-end-progress lg-start-progress").removeAttr("style");
                    }), this.settings.startAnimationDuration + 100);
                    if (!$currentSlide.hasClass("lg-loaded")) setTimeout((function() {
                        if (_this.getSlideType(currentGalleryItem) === "image") {
                            var alt = currentGalleryItem.alt;
                            var altAttr = alt ? 'alt="' + alt + '"' : "";
                            $currentSlide.find(".lg-img-wrap").append(utils.getImgMarkup(index, src, altAttr, srcset, sizes, currentGalleryItem.sources));
                            if (srcset || sources) {
                                var $img = $currentSlide.find(".lg-object");
                                _this.initPictureFill($img);
                            }
                        }
                        if (_this.getSlideType(currentGalleryItem) === "image" || _this.getSlideType(currentGalleryItem) === "video" && poster) {
                            _this.onLgObjectLoad($currentSlide, index, delay, _speed, true, false);
                            _this.onSlideObjectLoad($currentSlide, !!(videoInfo && videoInfo.html5 && !poster), (function() {
                                _this.loadContentOnFirstSlideLoad(index, $currentSlide, _speed);
                            }), (function() {
                                _this.loadContentOnFirstSlideLoad(index, $currentSlide, _speed);
                            }));
                        }
                    }), this.settings.startAnimationDuration + 100);
                }
                $currentSlide.addClass("lg-loaded");
                if (!this.isFirstSlideWithZoomAnimation() || this.getSlideType(currentGalleryItem) === "video" && !poster) this.onLgObjectLoad($currentSlide, index, delay, _speed, isFirstSlide, !!(videoInfo && videoInfo.html5 && !poster));
                if ((!this.zoomFromOrigin || !this.currentImageSize) && $currentSlide.hasClass("lg-complete_") && !this.lGalleryOn) setTimeout((function() {
                    $currentSlide.addClass("lg-complete");
                }), this.settings.backdropDuration);
                this.lGalleryOn = true;
                if (rec === true) if (!$currentSlide.hasClass("lg-complete_")) $currentSlide.find(".lg-object").first().on("load.lg error.lg", (function() {
                    _this.preload(index);
                })); else this.preload(index);
            };
            LightGallery.prototype.loadContentOnFirstSlideLoad = function(index, $currentSlide, speed) {
                var _this = this;
                setTimeout((function() {
                    $currentSlide.find(".lg-dummy-img").remove();
                    $currentSlide.removeClass("lg-first-slide");
                    _this.outer.removeClass("lg-first-slide-loading");
                    _this.isDummyImageRemoved = true;
                    _this.preload(index);
                }), speed + 300);
            };
            LightGallery.prototype.getItemsToBeInsertedToDom = function(index, prevIndex, numberOfItems) {
                var _this = this;
                if (numberOfItems === void 0) numberOfItems = 0;
                var itemsToBeInsertedToDom = [];
                var possibleNumberOfItems = Math.max(numberOfItems, 3);
                possibleNumberOfItems = Math.min(possibleNumberOfItems, this.galleryItems.length);
                var prevIndexItem = "lg-item-" + this.lgId + "-" + prevIndex;
                if (this.galleryItems.length <= 3) {
                    this.galleryItems.forEach((function(_element, index) {
                        itemsToBeInsertedToDom.push("lg-item-" + _this.lgId + "-" + index);
                    }));
                    return itemsToBeInsertedToDom;
                }
                if (index < (this.galleryItems.length - 1) / 2) {
                    for (var idx = index; idx > index - possibleNumberOfItems / 2 && idx >= 0; idx--) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + idx);
                    var numberOfExistingItems = itemsToBeInsertedToDom.length;
                    for (idx = 0; idx < possibleNumberOfItems - numberOfExistingItems; idx++) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (index + idx + 1));
                } else {
                    for (idx = index; idx <= this.galleryItems.length - 1 && idx < index + possibleNumberOfItems / 2; idx++) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + idx);
                    numberOfExistingItems = itemsToBeInsertedToDom.length;
                    for (idx = 0; idx < possibleNumberOfItems - numberOfExistingItems; idx++) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (index - idx - 1));
                }
                if (this.settings.loop) if (index === this.galleryItems.length - 1) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + 0); else if (index === 0) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (this.galleryItems.length - 1));
                if (itemsToBeInsertedToDom.indexOf(prevIndexItem) === -1) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + prevIndex);
                return itemsToBeInsertedToDom;
            };
            LightGallery.prototype.organizeSlideItems = function(index, prevIndex) {
                var _this = this;
                var itemsToBeInsertedToDom = this.getItemsToBeInsertedToDom(index, prevIndex, this.settings.numberOfSlideItemsInDom);
                itemsToBeInsertedToDom.forEach((function(item) {
                    if (_this.currentItemsInDom.indexOf(item) === -1) _this.$inner.append('<div id="' + item + '" class="lg-item"></div>');
                }));
                this.currentItemsInDom.forEach((function(item) {
                    if (itemsToBeInsertedToDom.indexOf(item) === -1) $LG("#" + item).remove();
                }));
                return itemsToBeInsertedToDom;
            };
            LightGallery.prototype.getPreviousSlideIndex = function() {
                var prevIndex = 0;
                try {
                    var currentItemId = this.outer.find(".lg-current").first().attr("id");
                    prevIndex = parseInt(currentItemId.split("-")[3]) || 0;
                } catch (error) {
                    prevIndex = 0;
                }
                return prevIndex;
            };
            LightGallery.prototype.setDownloadValue = function(index) {
                if (this.settings.download) {
                    var currentGalleryItem = this.galleryItems[index];
                    var hideDownloadBtn = currentGalleryItem.downloadUrl === false || currentGalleryItem.downloadUrl === "false";
                    if (hideDownloadBtn) this.outer.addClass("lg-hide-download"); else {
                        var $download = this.getElementById("lg-download");
                        this.outer.removeClass("lg-hide-download");
                        $download.attr("href", currentGalleryItem.downloadUrl || currentGalleryItem.src);
                        if (currentGalleryItem.download) $download.attr("download", currentGalleryItem.download);
                    }
                }
            };
            LightGallery.prototype.makeSlideAnimation = function(direction, currentSlideItem, previousSlideItem) {
                var _this = this;
                if (this.lGalleryOn) previousSlideItem.addClass("lg-slide-progress");
                setTimeout((function() {
                    _this.outer.addClass("lg-no-trans");
                    _this.outer.find(".lg-item").removeClass("lg-prev-slide lg-next-slide");
                    if (direction === "prev") {
                        currentSlideItem.addClass("lg-prev-slide");
                        previousSlideItem.addClass("lg-next-slide");
                    } else {
                        currentSlideItem.addClass("lg-next-slide");
                        previousSlideItem.addClass("lg-prev-slide");
                    }
                    setTimeout((function() {
                        _this.outer.find(".lg-item").removeClass("lg-current");
                        currentSlideItem.addClass("lg-current");
                        _this.outer.removeClass("lg-no-trans");
                    }), 50);
                }), this.lGalleryOn ? this.settings.slideDelay : 0);
            };
            LightGallery.prototype.slide = function(index, fromTouch, fromThumb, direction) {
                var _this = this;
                var prevIndex = this.getPreviousSlideIndex();
                this.currentItemsInDom = this.organizeSlideItems(index, prevIndex);
                if (this.lGalleryOn && prevIndex === index) return;
                var numberOfGalleryItems = this.galleryItems.length;
                if (!this.lgBusy) {
                    if (this.settings.counter) this.updateCurrentCounter(index);
                    var currentSlideItem = this.getSlideItem(index);
                    var previousSlideItem_1 = this.getSlideItem(prevIndex);
                    var currentGalleryItem = this.galleryItems[index];
                    var videoInfo = currentGalleryItem.__slideVideoInfo;
                    this.outer.attr("data-lg-slide-type", this.getSlideType(currentGalleryItem));
                    this.setDownloadValue(index);
                    if (videoInfo) {
                        var _a = this.mediaContainerPosition, top_3 = _a.top, bottom = _a.bottom;
                        var videoSize = utils.getSize(this.items[index], this.outer, top_3 + bottom, videoInfo && this.settings.videoMaxSize);
                        this.resizeVideoSlide(index, videoSize);
                    }
                    this.LGel.trigger(lGEvents.beforeSlide, {
                        prevIndex,
                        index,
                        fromTouch: !!fromTouch,
                        fromThumb: !!fromThumb
                    });
                    this.lgBusy = true;
                    clearTimeout(this.hideBarTimeout);
                    this.arrowDisable(index);
                    if (!direction) if (index < prevIndex) direction = "prev"; else if (index > prevIndex) direction = "next";
                    if (!fromTouch) this.makeSlideAnimation(direction, currentSlideItem, previousSlideItem_1); else {
                        this.outer.find(".lg-item").removeClass("lg-prev-slide lg-current lg-next-slide");
                        var touchPrev = void 0;
                        var touchNext = void 0;
                        if (numberOfGalleryItems > 2) {
                            touchPrev = index - 1;
                            touchNext = index + 1;
                            if (index === 0 && prevIndex === numberOfGalleryItems - 1) {
                                touchNext = 0;
                                touchPrev = numberOfGalleryItems - 1;
                            } else if (index === numberOfGalleryItems - 1 && prevIndex === 0) {
                                touchNext = 0;
                                touchPrev = numberOfGalleryItems - 1;
                            }
                        } else {
                            touchPrev = 0;
                            touchNext = 1;
                        }
                        if (direction === "prev") this.getSlideItem(touchNext).addClass("lg-next-slide"); else this.getSlideItem(touchPrev).addClass("lg-prev-slide");
                        currentSlideItem.addClass("lg-current");
                    }
                    if (!this.lGalleryOn) this.loadContent(index, true); else setTimeout((function() {
                        _this.loadContent(index, true);
                        if (_this.settings.appendSubHtmlTo !== ".lg-item") _this.addHtml(index);
                    }), this.settings.speed + 50 + (fromTouch ? 0 : this.settings.slideDelay));
                    setTimeout((function() {
                        _this.lgBusy = false;
                        previousSlideItem_1.removeClass("lg-slide-progress");
                        _this.LGel.trigger(lGEvents.afterSlide, {
                            prevIndex,
                            index,
                            fromTouch,
                            fromThumb
                        });
                    }), (this.lGalleryOn ? this.settings.speed + 100 : 100) + (fromTouch ? 0 : this.settings.slideDelay));
                }
                this.index = index;
            };
            LightGallery.prototype.updateCurrentCounter = function(index) {
                this.getElementById("lg-counter-current").html(index + 1 + "");
            };
            LightGallery.prototype.updateCounterTotal = function() {
                this.getElementById("lg-counter-all").html(this.galleryItems.length + "");
            };
            LightGallery.prototype.getSlideType = function(item) {
                if (item.__slideVideoInfo) return "video"; else if (item.iframe) return "iframe"; else return "image";
            };
            LightGallery.prototype.touchMove = function(startCoords, endCoords, e) {
                var distanceX = endCoords.pageX - startCoords.pageX;
                var distanceY = endCoords.pageY - startCoords.pageY;
                var allowSwipe = false;
                if (this.swipeDirection) allowSwipe = true; else if (Math.abs(distanceX) > 15) {
                    this.swipeDirection = "horizontal";
                    allowSwipe = true;
                } else if (Math.abs(distanceY) > 15) {
                    this.swipeDirection = "vertical";
                    allowSwipe = true;
                }
                if (!allowSwipe) return;
                var $currentSlide = this.getSlideItem(this.index);
                if (this.swipeDirection === "horizontal") {
                    e === null || e === void 0 ? void 0 : e.preventDefault();
                    this.outer.addClass("lg-dragging");
                    this.setTranslate($currentSlide, distanceX, 0);
                    var width = $currentSlide.get().offsetWidth;
                    var slideWidthAmount = width * 15 / 100;
                    var gutter = slideWidthAmount - Math.abs(distanceX * 10 / 100);
                    this.setTranslate(this.outer.find(".lg-prev-slide").first(), -width + distanceX - gutter, 0);
                    this.setTranslate(this.outer.find(".lg-next-slide").first(), width + distanceX + gutter, 0);
                } else if (this.swipeDirection === "vertical") if (this.settings.swipeToClose) {
                    e === null || e === void 0 ? void 0 : e.preventDefault();
                    this.$container.addClass("lg-dragging-vertical");
                    var opacity = 1 - Math.abs(distanceY) / window.innerHeight;
                    this.$backdrop.css("opacity", opacity);
                    var scale = 1 - Math.abs(distanceY) / (window.innerWidth * 2);
                    this.setTranslate($currentSlide, 0, distanceY, scale, scale);
                    if (Math.abs(distanceY) > 100) this.outer.addClass("lg-hide-items").removeClass("lg-components-open");
                }
            };
            LightGallery.prototype.touchEnd = function(endCoords, startCoords, event) {
                var _this = this;
                var distance;
                if (this.settings.mode !== "lg-slide") this.outer.addClass("lg-slide");
                setTimeout((function() {
                    _this.$container.removeClass("lg-dragging-vertical");
                    _this.outer.removeClass("lg-dragging lg-hide-items").addClass("lg-components-open");
                    var triggerClick = true;
                    if (_this.swipeDirection === "horizontal") {
                        distance = endCoords.pageX - startCoords.pageX;
                        var distanceAbs = Math.abs(endCoords.pageX - startCoords.pageX);
                        if (distance < 0 && distanceAbs > _this.settings.swipeThreshold) {
                            _this.goToNextSlide(true);
                            triggerClick = false;
                        } else if (distance > 0 && distanceAbs > _this.settings.swipeThreshold) {
                            _this.goToPrevSlide(true);
                            triggerClick = false;
                        }
                    } else if (_this.swipeDirection === "vertical") {
                        distance = Math.abs(endCoords.pageY - startCoords.pageY);
                        if (_this.settings.closable && _this.settings.swipeToClose && distance > 100) {
                            _this.closeGallery();
                            return;
                        } else _this.$backdrop.css("opacity", 1);
                    }
                    _this.outer.find(".lg-item").removeAttr("style");
                    if (triggerClick && Math.abs(endCoords.pageX - startCoords.pageX) < 5) {
                        var target = $LG(event.target);
                        if (_this.isPosterElement(target)) _this.LGel.trigger(lGEvents.posterClick);
                    }
                    _this.swipeDirection = void 0;
                }));
                setTimeout((function() {
                    if (!_this.outer.hasClass("lg-dragging") && _this.settings.mode !== "lg-slide") _this.outer.removeClass("lg-slide");
                }), this.settings.speed + 100);
            };
            LightGallery.prototype.enableSwipe = function() {
                var _this = this;
                var startCoords = {};
                var endCoords = {};
                var isMoved = false;
                var isSwiping = false;
                if (this.settings.enableSwipe) {
                    this.$inner.on("touchstart.lg", (function(e) {
                        _this.dragOrSwipeEnabled = true;
                        var $item = _this.getSlideItem(_this.index);
                        if (($LG(e.target).hasClass("lg-item") || $item.get().contains(e.target)) && !_this.outer.hasClass("lg-zoomed") && !_this.lgBusy && e.touches.length === 1) {
                            isSwiping = true;
                            _this.touchAction = "swipe";
                            _this.manageSwipeClass();
                            startCoords = {
                                pageX: e.touches[0].pageX,
                                pageY: e.touches[0].pageY
                            };
                        }
                    }));
                    this.$inner.on("touchmove.lg", (function(e) {
                        if (isSwiping && _this.touchAction === "swipe" && e.touches.length === 1) {
                            endCoords = {
                                pageX: e.touches[0].pageX,
                                pageY: e.touches[0].pageY
                            };
                            _this.touchMove(startCoords, endCoords, e);
                            isMoved = true;
                        }
                    }));
                    this.$inner.on("touchend.lg", (function(event) {
                        if (_this.touchAction === "swipe") {
                            if (isMoved) {
                                isMoved = false;
                                _this.touchEnd(endCoords, startCoords, event);
                            } else if (isSwiping) {
                                var target = $LG(event.target);
                                if (_this.isPosterElement(target)) _this.LGel.trigger(lGEvents.posterClick);
                            }
                            _this.touchAction = void 0;
                            isSwiping = false;
                        }
                    }));
                }
            };
            LightGallery.prototype.enableDrag = function() {
                var _this = this;
                var startCoords = {};
                var endCoords = {};
                var isDraging = false;
                var isMoved = false;
                if (this.settings.enableDrag) {
                    this.outer.on("mousedown.lg", (function(e) {
                        _this.dragOrSwipeEnabled = true;
                        var $item = _this.getSlideItem(_this.index);
                        if ($LG(e.target).hasClass("lg-item") || $item.get().contains(e.target)) if (!_this.outer.hasClass("lg-zoomed") && !_this.lgBusy) {
                            e.preventDefault();
                            if (!_this.lgBusy) {
                                _this.manageSwipeClass();
                                startCoords = {
                                    pageX: e.pageX,
                                    pageY: e.pageY
                                };
                                isDraging = true;
                                _this.outer.get().scrollLeft += 1;
                                _this.outer.get().scrollLeft -= 1;
                                _this.outer.removeClass("lg-grab").addClass("lg-grabbing");
                                _this.LGel.trigger(lGEvents.dragStart);
                            }
                        }
                    }));
                    $LG(window).on("mousemove.lg.global" + this.lgId, (function(e) {
                        if (isDraging && _this.lgOpened) {
                            isMoved = true;
                            endCoords = {
                                pageX: e.pageX,
                                pageY: e.pageY
                            };
                            _this.touchMove(startCoords, endCoords);
                            _this.LGel.trigger(lGEvents.dragMove);
                        }
                    }));
                    $LG(window).on("mouseup.lg.global" + this.lgId, (function(event) {
                        if (!_this.lgOpened) return;
                        var target = $LG(event.target);
                        if (isMoved) {
                            isMoved = false;
                            _this.touchEnd(endCoords, startCoords, event);
                            _this.LGel.trigger(lGEvents.dragEnd);
                        } else if (_this.isPosterElement(target)) _this.LGel.trigger(lGEvents.posterClick);
                        if (isDraging) {
                            isDraging = false;
                            _this.outer.removeClass("lg-grabbing").addClass("lg-grab");
                        }
                    }));
                }
            };
            LightGallery.prototype.triggerPosterClick = function() {
                var _this = this;
                this.$inner.on("click.lg", (function(event) {
                    if (!_this.dragOrSwipeEnabled && _this.isPosterElement($LG(event.target))) _this.LGel.trigger(lGEvents.posterClick);
                }));
            };
            LightGallery.prototype.manageSwipeClass = function() {
                var _touchNext = this.index + 1;
                var _touchPrev = this.index - 1;
                if (this.settings.loop && this.galleryItems.length > 2) if (this.index === 0) _touchPrev = this.galleryItems.length - 1; else if (this.index === this.galleryItems.length - 1) _touchNext = 0;
                this.outer.find(".lg-item").removeClass("lg-next-slide lg-prev-slide");
                if (_touchPrev > -1) this.getSlideItem(_touchPrev).addClass("lg-prev-slide");
                this.getSlideItem(_touchNext).addClass("lg-next-slide");
            };
            LightGallery.prototype.goToNextSlide = function(fromTouch) {
                var _this = this;
                var _loop = this.settings.loop;
                if (fromTouch && this.galleryItems.length < 3) _loop = false;
                if (!this.lgBusy) if (this.index + 1 < this.galleryItems.length) {
                    this.index++;
                    this.LGel.trigger(lGEvents.beforeNextSlide, {
                        index: this.index
                    });
                    this.slide(this.index, !!fromTouch, false, "next");
                } else if (_loop) {
                    this.index = 0;
                    this.LGel.trigger(lGEvents.beforeNextSlide, {
                        index: this.index
                    });
                    this.slide(this.index, !!fromTouch, false, "next");
                } else if (this.settings.slideEndAnimation && !fromTouch) {
                    this.outer.addClass("lg-right-end");
                    setTimeout((function() {
                        _this.outer.removeClass("lg-right-end");
                    }), 400);
                }
            };
            LightGallery.prototype.goToPrevSlide = function(fromTouch) {
                var _this = this;
                var _loop = this.settings.loop;
                if (fromTouch && this.galleryItems.length < 3) _loop = false;
                if (!this.lgBusy) if (this.index > 0) {
                    this.index--;
                    this.LGel.trigger(lGEvents.beforePrevSlide, {
                        index: this.index,
                        fromTouch
                    });
                    this.slide(this.index, !!fromTouch, false, "prev");
                } else if (_loop) {
                    this.index = this.galleryItems.length - 1;
                    this.LGel.trigger(lGEvents.beforePrevSlide, {
                        index: this.index,
                        fromTouch
                    });
                    this.slide(this.index, !!fromTouch, false, "prev");
                } else if (this.settings.slideEndAnimation && !fromTouch) {
                    this.outer.addClass("lg-left-end");
                    setTimeout((function() {
                        _this.outer.removeClass("lg-left-end");
                    }), 400);
                }
            };
            LightGallery.prototype.keyPress = function() {
                var _this = this;
                $LG(window).on("keydown.lg.global" + this.lgId, (function(e) {
                    if (_this.lgOpened && _this.settings.escKey === true && e.keyCode === 27) {
                        e.preventDefault();
                        if (_this.settings.allowMediaOverlap && _this.outer.hasClass("lg-can-toggle") && _this.outer.hasClass("lg-components-open")) _this.outer.removeClass("lg-components-open"); else _this.closeGallery();
                    }
                    if (_this.lgOpened && _this.galleryItems.length > 1) {
                        if (e.keyCode === 37) {
                            e.preventDefault();
                            _this.goToPrevSlide();
                        }
                        if (e.keyCode === 39) {
                            e.preventDefault();
                            _this.goToNextSlide();
                        }
                    }
                }));
            };
            LightGallery.prototype.arrow = function() {
                var _this = this;
                this.getElementById("lg-prev").on("click.lg", (function() {
                    _this.goToPrevSlide();
                }));
                this.getElementById("lg-next").on("click.lg", (function() {
                    _this.goToNextSlide();
                }));
            };
            LightGallery.prototype.arrowDisable = function(index) {
                if (!this.settings.loop && this.settings.hideControlOnEnd) {
                    var $prev = this.getElementById("lg-prev");
                    var $next = this.getElementById("lg-next");
                    if (index + 1 === this.galleryItems.length) $next.attr("disabled", "disabled").addClass("disabled"); else $next.removeAttr("disabled").removeClass("disabled");
                    if (index === 0) $prev.attr("disabled", "disabled").addClass("disabled"); else $prev.removeAttr("disabled").removeClass("disabled");
                }
            };
            LightGallery.prototype.setTranslate = function($el, xValue, yValue, scaleX, scaleY) {
                if (scaleX === void 0) scaleX = 1;
                if (scaleY === void 0) scaleY = 1;
                $el.css("transform", "translate3d(" + xValue + "px, " + yValue + "px, 0px) scale3d(" + scaleX + ", " + scaleY + ", 1)");
            };
            LightGallery.prototype.mousewheel = function() {
                var _this = this;
                var lastCall = 0;
                this.outer.on("wheel.lg", (function(e) {
                    if (!e.deltaY || _this.galleryItems.length < 2) return;
                    e.preventDefault();
                    var now = (new Date).getTime();
                    if (now - lastCall < 1e3) return;
                    lastCall = now;
                    if (e.deltaY > 0) _this.goToNextSlide(); else if (e.deltaY < 0) _this.goToPrevSlide();
                }));
            };
            LightGallery.prototype.isSlideElement = function(target) {
                return target.hasClass("lg-outer") || target.hasClass("lg-item") || target.hasClass("lg-img-wrap") || target.hasClass("lg-img-rotate");
            };
            LightGallery.prototype.isPosterElement = function(target) {
                var playButton = this.getSlideItem(this.index).find(".lg-video-play-button").get();
                return target.hasClass("lg-video-poster") || target.hasClass("lg-video-play-button") || playButton && playButton.contains(target.get());
            };
            LightGallery.prototype.toggleMaximize = function() {
                var _this = this;
                this.getElementById("lg-maximize").on("click.lg", (function() {
                    _this.$container.toggleClass("lg-inline");
                    _this.refreshOnResize();
                }));
            };
            LightGallery.prototype.invalidateItems = function() {
                for (var index = 0; index < this.items.length; index++) {
                    var element = this.items[index];
                    var $element = $LG(element);
                    $element.off("click.lgcustom-item-" + $element.attr("data-lg-id"));
                }
            };
            LightGallery.prototype.trapFocus = function() {
                var _this = this;
                this.$container.get().focus({
                    preventScroll: true
                });
                $LG(window).on("keydown.lg.global" + this.lgId, (function(e) {
                    if (!_this.lgOpened) return;
                    var isTabPressed = e.key === "Tab" || e.keyCode === 9;
                    if (!isTabPressed) return;
                    var focusableEls = utils.getFocusableElements(_this.$container.get());
                    var firstFocusableEl = focusableEls[0];
                    var lastFocusableEl = focusableEls[focusableEls.length - 1];
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusableEl) {
                            lastFocusableEl.focus();
                            e.preventDefault();
                        }
                    } else if (document.activeElement === lastFocusableEl) {
                        firstFocusableEl.focus();
                        e.preventDefault();
                    }
                }));
            };
            LightGallery.prototype.manageCloseGallery = function() {
                var _this = this;
                if (!this.settings.closable) return;
                var mousedown = false;
                this.getElementById("lg-close").on("click.lg", (function() {
                    _this.closeGallery();
                }));
                if (this.settings.closeOnTap) {
                    this.outer.on("mousedown.lg", (function(e) {
                        var target = $LG(e.target);
                        if (_this.isSlideElement(target)) mousedown = true; else mousedown = false;
                    }));
                    this.outer.on("mousemove.lg", (function() {
                        mousedown = false;
                    }));
                    this.outer.on("mouseup.lg", (function(e) {
                        var target = $LG(e.target);
                        if (_this.isSlideElement(target) && mousedown) if (!_this.outer.hasClass("lg-dragging")) _this.closeGallery();
                    }));
                }
            };
            LightGallery.prototype.closeGallery = function(force) {
                var _this = this;
                if (!this.lgOpened || !this.settings.closable && !force) return 0;
                this.LGel.trigger(lGEvents.beforeClose);
                if (this.settings.resetScrollPosition && !this.settings.hideScrollbar) $LG(window).scrollTop(this.prevScrollTop);
                var currentItem = this.items[this.index];
                var transform;
                if (this.zoomFromOrigin && currentItem) {
                    var _a = this.mediaContainerPosition, top_4 = _a.top, bottom = _a.bottom;
                    var _b = this.galleryItems[this.index], __slideVideoInfo = _b.__slideVideoInfo, poster = _b.poster;
                    var imageSize = utils.getSize(currentItem, this.outer, top_4 + bottom, __slideVideoInfo && poster && this.settings.videoMaxSize);
                    transform = utils.getTransform(currentItem, this.outer, top_4, bottom, imageSize);
                }
                if (this.zoomFromOrigin && transform) {
                    this.outer.addClass("lg-closing lg-zoom-from-image");
                    this.getSlideItem(this.index).addClass("lg-start-end-progress").css("transition-duration", this.settings.startAnimationDuration + "ms").css("transform", transform);
                } else {
                    this.outer.addClass("lg-hide-items");
                    this.outer.removeClass("lg-zoom-from-image");
                }
                this.destroyModules();
                this.lGalleryOn = false;
                this.isDummyImageRemoved = false;
                this.zoomFromOrigin = this.settings.zoomFromOrigin;
                clearTimeout(this.hideBarTimeout);
                this.hideBarTimeout = false;
                $LG("html").removeClass("lg-on");
                this.outer.removeClass("lg-visible lg-components-open");
                this.$backdrop.removeClass("in").css("opacity", 0);
                var removeTimeout = this.zoomFromOrigin && transform ? Math.max(this.settings.startAnimationDuration, this.settings.backdropDuration) : this.settings.backdropDuration;
                this.$container.removeClass("lg-show-in");
                setTimeout((function() {
                    if (_this.zoomFromOrigin && transform) _this.outer.removeClass("lg-zoom-from-image");
                    _this.$container.removeClass("lg-show");
                    _this.resetScrollBar();
                    _this.$backdrop.removeAttr("style").css("transition-duration", _this.settings.backdropDuration + "ms");
                    _this.outer.removeClass("lg-closing " + _this.settings.startClass);
                    _this.getSlideItem(_this.index).removeClass("lg-start-end-progress");
                    _this.$inner.empty();
                    if (_this.lgOpened) _this.LGel.trigger(lGEvents.afterClose, {
                        instance: _this
                    });
                    if (_this.$container.get()) _this.$container.get().blur();
                    _this.lgOpened = false;
                }), removeTimeout + 100);
                return removeTimeout + 100;
            };
            LightGallery.prototype.initModules = function() {
                this.plugins.forEach((function(module) {
                    try {
                        module.init();
                    } catch (err) {
                        console.warn("lightGallery:- make sure lightGallery module is properly initiated");
                    }
                }));
            };
            LightGallery.prototype.destroyModules = function(destroy) {
                this.plugins.forEach((function(module) {
                    try {
                        if (destroy) module.destroy(); else module.closeGallery && module.closeGallery();
                    } catch (err) {
                        console.warn("lightGallery:- make sure lightGallery module is properly destroyed");
                    }
                }));
            };
            LightGallery.prototype.refresh = function(galleryItems) {
                if (!this.settings.dynamic) this.invalidateItems();
                if (galleryItems) this.galleryItems = galleryItems; else this.galleryItems = this.getItems();
                this.updateControls();
                this.openGalleryOnItemClick();
                this.LGel.trigger(lGEvents.updateSlides);
            };
            LightGallery.prototype.updateControls = function() {
                this.addSlideVideoInfo(this.galleryItems);
                this.updateCounterTotal();
                this.manageSingleSlideClassName();
            };
            LightGallery.prototype.destroyGallery = function() {
                this.destroyModules(true);
                if (!this.settings.dynamic) this.invalidateItems();
                $LG(window).off(".lg.global" + this.lgId);
                this.LGel.off(".lg");
                this.$container.remove();
            };
            LightGallery.prototype.destroy = function() {
                var closeTimeout = this.closeGallery(true);
                if (closeTimeout) setTimeout(this.destroyGallery.bind(this), closeTimeout); else this.destroyGallery();
                return closeTimeout;
            };
            return LightGallery;
        }();
        function lightGallery(el, options) {
            return new LightGallery(el, options);
        }
        const lightgallery_es5 = lightGallery;
        var lg_thumbnail_min = __webpack_require__(757);
        var lg_zoom_min = __webpack_require__(227);
        document.addEventListener("DOMContentLoaded", (async function() {
            try {
                const galleriesData = await getGallery();
                const container = document.querySelector(".galleries-container");
                if (!container) {
                    console.error("Головний контейнер .galleries-container не знайдено");
                    return;
                }
                galleriesData.forEach(((galleryData, index) => {
                    const galleryWrapper = document.createElement("div");
                    galleryWrapper.classList.add("galleries");
                    const galleryTitle = document.createElement("h2");
                    galleryTitle.textContent = galleryData.galleryTitle;
                    galleryTitle.classList.add("galleries__title");
                    const galleryContainer = document.createElement("div");
                    galleryContainer.classList.add("galleries__block");
                    galleryContainer.setAttribute("data-simplebar", "");
                    const galleryDiv = document.createElement("div");
                    galleryDiv.id = `animated-thumbnails-gallery-${index}`;
                    galleryDiv.classList.add("animated-thumbnails-gallery");
                    galleryData.gallery.forEach((image => {
                        const link = document.createElement("a");
                        link.href = image.url;
                        link.classList.add("gallery-item");
                        const img = document.createElement("img");
                        img.src = image.url;
                        img.alt = image.alt || "Gallery Image";
                        img.style.height = "180px";
                        img.style.marginBottom = "5px";
                        link.appendChild(img);
                        galleryDiv.appendChild(link);
                    }));
                    galleryContainer.appendChild(galleryDiv);
                    galleryWrapper.appendChild(galleryTitle);
                    galleryWrapper.appendChild(galleryContainer);
                    container.appendChild(galleryWrapper);
                    lightgallery_es5(galleryDiv, {
                        licenseKey: "7EC452A9-0CFD441C-BD984C7C-17C8456E",
                        plugins: [ lg_zoom_min, lg_thumbnail_min ],
                        autoplayFirstVideo: false,
                        pager: false,
                        galleryId: `gallery-${index}`,
                        mobileSettings: {
                            controls: true,
                            showCloseIcon: true,
                            download: true,
                            rotate: false
                        }
                    });
                }));
            } catch (err) {
                console.error("Помилка при завантаженні галереї:", err);
            }
        }));
        var debounce = __webpack_require__(221);
        var throttle = __webpack_require__(969);
        var dist_assign = function() {
            dist_assign = Object.assign || function __assign(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
            return dist_assign.apply(this, arguments);
        };
        function getElementWindow$1(element) {
            if (!element || !element.ownerDocument || !element.ownerDocument.defaultView) return window;
            return element.ownerDocument.defaultView;
        }
        function getElementDocument$1(element) {
            if (!element || !element.ownerDocument) return document;
            return element.ownerDocument;
        }
        var getOptions$1 = function(obj) {
            var initialObj = {};
            var options = Array.prototype.reduce.call(obj, (function(acc, attribute) {
                var option = attribute.name.match(/data-simplebar-(.+)/);
                if (option) {
                    var key = option[1].replace(/\W+(.)/g, (function(_, chr) {
                        return chr.toUpperCase();
                    }));
                    switch (attribute.value) {
                      case "true":
                        acc[key] = true;
                        break;

                      case "false":
                        acc[key] = false;
                        break;

                      case void 0:
                        acc[key] = true;
                        break;

                      default:
                        acc[key] = attribute.value;
                    }
                }
                return acc;
            }), initialObj);
            return options;
        };
        function addClasses$1(el, classes) {
            var _a;
            if (!el) return;
            (_a = el.classList).add.apply(_a, classes.split(" "));
        }
        function removeClasses$1(el, classes) {
            if (!el) return;
            classes.split(" ").forEach((function(className) {
                el.classList.remove(className);
            }));
        }
        function classNamesToQuery$1(classNames) {
            return ".".concat(classNames.split(" ").join("."));
        }
        var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
        var helpers = Object.freeze({
            __proto__: null,
            addClasses: addClasses$1,
            canUseDOM,
            classNamesToQuery: classNamesToQuery$1,
            getElementDocument: getElementDocument$1,
            getElementWindow: getElementWindow$1,
            getOptions: getOptions$1,
            removeClasses: removeClasses$1
        });
        var cachedScrollbarWidth = null;
        var cachedDevicePixelRatio = null;
        if (canUseDOM) window.addEventListener("resize", (function() {
            if (cachedDevicePixelRatio !== window.devicePixelRatio) {
                cachedDevicePixelRatio = window.devicePixelRatio;
                cachedScrollbarWidth = null;
            }
        }));
        function scrollbarWidth() {
            if (cachedScrollbarWidth === null) {
                if (typeof document === "undefined") {
                    cachedScrollbarWidth = 0;
                    return cachedScrollbarWidth;
                }
                var body = document.body;
                var box = document.createElement("div");
                box.classList.add("simplebar-hide-scrollbar");
                body.appendChild(box);
                var width = box.getBoundingClientRect().right;
                body.removeChild(box);
                cachedScrollbarWidth = width;
            }
            return cachedScrollbarWidth;
        }
        var getElementWindow = getElementWindow$1, getElementDocument = getElementDocument$1, getOptions = getOptions$1, dist_addClasses = addClasses$1, dist_removeClasses = removeClasses$1, classNamesToQuery = classNamesToQuery$1;
        var SimpleBarCore = function() {
            function SimpleBarCore(element, options) {
                if (options === void 0) options = {};
                var _this = this;
                this.removePreventClickId = null;
                this.minScrollbarWidth = 20;
                this.stopScrollDelay = 175;
                this.isScrolling = false;
                this.isMouseEntering = false;
                this.isDragging = false;
                this.scrollXTicking = false;
                this.scrollYTicking = false;
                this.wrapperEl = null;
                this.contentWrapperEl = null;
                this.contentEl = null;
                this.offsetEl = null;
                this.maskEl = null;
                this.placeholderEl = null;
                this.heightAutoObserverWrapperEl = null;
                this.heightAutoObserverEl = null;
                this.rtlHelpers = null;
                this.scrollbarWidth = 0;
                this.resizeObserver = null;
                this.mutationObserver = null;
                this.elStyles = null;
                this.isRtl = null;
                this.mouseX = 0;
                this.mouseY = 0;
                this.onMouseMove = function() {};
                this.onWindowResize = function() {};
                this.onStopScrolling = function() {};
                this.onMouseEntered = function() {};
                this.onScroll = function() {
                    var elWindow = getElementWindow(_this.el);
                    if (!_this.scrollXTicking) {
                        elWindow.requestAnimationFrame(_this.scrollX);
                        _this.scrollXTicking = true;
                    }
                    if (!_this.scrollYTicking) {
                        elWindow.requestAnimationFrame(_this.scrollY);
                        _this.scrollYTicking = true;
                    }
                    if (!_this.isScrolling) {
                        _this.isScrolling = true;
                        dist_addClasses(_this.el, _this.classNames.scrolling);
                    }
                    _this.showScrollbar("x");
                    _this.showScrollbar("y");
                    _this.onStopScrolling();
                };
                this.scrollX = function() {
                    if (_this.axis.x.isOverflowing) _this.positionScrollbar("x");
                    _this.scrollXTicking = false;
                };
                this.scrollY = function() {
                    if (_this.axis.y.isOverflowing) _this.positionScrollbar("y");
                    _this.scrollYTicking = false;
                };
                this._onStopScrolling = function() {
                    dist_removeClasses(_this.el, _this.classNames.scrolling);
                    if (_this.options.autoHide) {
                        _this.hideScrollbar("x");
                        _this.hideScrollbar("y");
                    }
                    _this.isScrolling = false;
                };
                this.onMouseEnter = function() {
                    if (!_this.isMouseEntering) {
                        dist_addClasses(_this.el, _this.classNames.mouseEntered);
                        _this.showScrollbar("x");
                        _this.showScrollbar("y");
                        _this.isMouseEntering = true;
                    }
                    _this.onMouseEntered();
                };
                this._onMouseEntered = function() {
                    dist_removeClasses(_this.el, _this.classNames.mouseEntered);
                    if (_this.options.autoHide) {
                        _this.hideScrollbar("x");
                        _this.hideScrollbar("y");
                    }
                    _this.isMouseEntering = false;
                };
                this._onMouseMove = function(e) {
                    _this.mouseX = e.clientX;
                    _this.mouseY = e.clientY;
                    if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) _this.onMouseMoveForAxis("x");
                    if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) _this.onMouseMoveForAxis("y");
                };
                this.onMouseLeave = function() {
                    _this.onMouseMove.cancel();
                    if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) _this.onMouseLeaveForAxis("x");
                    if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) _this.onMouseLeaveForAxis("y");
                    _this.mouseX = -1;
                    _this.mouseY = -1;
                };
                this._onWindowResize = function() {
                    _this.scrollbarWidth = _this.getScrollbarWidth();
                    _this.hideNativeScrollbar();
                };
                this.onPointerEvent = function(e) {
                    if (!_this.axis.x.track.el || !_this.axis.y.track.el || !_this.axis.x.scrollbar.el || !_this.axis.y.scrollbar.el) return;
                    var isWithinTrackXBounds, isWithinTrackYBounds;
                    _this.axis.x.track.rect = _this.axis.x.track.el.getBoundingClientRect();
                    _this.axis.y.track.rect = _this.axis.y.track.el.getBoundingClientRect();
                    if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) isWithinTrackXBounds = _this.isWithinBounds(_this.axis.x.track.rect);
                    if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) isWithinTrackYBounds = _this.isWithinBounds(_this.axis.y.track.rect);
                    if (isWithinTrackXBounds || isWithinTrackYBounds) {
                        e.stopPropagation();
                        if (e.type === "pointerdown" && e.pointerType !== "touch") {
                            if (isWithinTrackXBounds) {
                                _this.axis.x.scrollbar.rect = _this.axis.x.scrollbar.el.getBoundingClientRect();
                                if (_this.isWithinBounds(_this.axis.x.scrollbar.rect)) _this.onDragStart(e, "x"); else _this.onTrackClick(e, "x");
                            }
                            if (isWithinTrackYBounds) {
                                _this.axis.y.scrollbar.rect = _this.axis.y.scrollbar.el.getBoundingClientRect();
                                if (_this.isWithinBounds(_this.axis.y.scrollbar.rect)) _this.onDragStart(e, "y"); else _this.onTrackClick(e, "y");
                            }
                        }
                    }
                };
                this.drag = function(e) {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                    if (!_this.draggedAxis || !_this.contentWrapperEl) return;
                    var eventOffset;
                    var track = _this.axis[_this.draggedAxis].track;
                    var trackSize = (_b = (_a = track.rect) === null || _a === void 0 ? void 0 : _a[_this.axis[_this.draggedAxis].sizeAttr]) !== null && _b !== void 0 ? _b : 0;
                    var scrollbar = _this.axis[_this.draggedAxis].scrollbar;
                    var contentSize = (_d = (_c = _this.contentWrapperEl) === null || _c === void 0 ? void 0 : _c[_this.axis[_this.draggedAxis].scrollSizeAttr]) !== null && _d !== void 0 ? _d : 0;
                    var hostSize = parseInt((_f = (_e = _this.elStyles) === null || _e === void 0 ? void 0 : _e[_this.axis[_this.draggedAxis].sizeAttr]) !== null && _f !== void 0 ? _f : "0px", 10);
                    e.preventDefault();
                    e.stopPropagation();
                    if (_this.draggedAxis === "y") eventOffset = e.pageY; else eventOffset = e.pageX;
                    var dragPos = eventOffset - ((_h = (_g = track.rect) === null || _g === void 0 ? void 0 : _g[_this.axis[_this.draggedAxis].offsetAttr]) !== null && _h !== void 0 ? _h : 0) - _this.axis[_this.draggedAxis].dragOffset;
                    dragPos = _this.draggedAxis === "x" && _this.isRtl ? ((_k = (_j = track.rect) === null || _j === void 0 ? void 0 : _j[_this.axis[_this.draggedAxis].sizeAttr]) !== null && _k !== void 0 ? _k : 0) - scrollbar.size - dragPos : dragPos;
                    var dragPerc = dragPos / (trackSize - scrollbar.size);
                    var scrollPos = dragPerc * (contentSize - hostSize);
                    if (_this.draggedAxis === "x" && _this.isRtl) scrollPos = ((_l = SimpleBarCore.getRtlHelpers()) === null || _l === void 0 ? void 0 : _l.isScrollingToNegative) ? -scrollPos : scrollPos;
                    _this.contentWrapperEl[_this.axis[_this.draggedAxis].scrollOffsetAttr] = scrollPos;
                };
                this.onEndDrag = function(e) {
                    _this.isDragging = false;
                    var elDocument = getElementDocument(_this.el);
                    var elWindow = getElementWindow(_this.el);
                    e.preventDefault();
                    e.stopPropagation();
                    dist_removeClasses(_this.el, _this.classNames.dragging);
                    _this.onStopScrolling();
                    elDocument.removeEventListener("mousemove", _this.drag, true);
                    elDocument.removeEventListener("mouseup", _this.onEndDrag, true);
                    _this.removePreventClickId = elWindow.setTimeout((function() {
                        elDocument.removeEventListener("click", _this.preventClick, true);
                        elDocument.removeEventListener("dblclick", _this.preventClick, true);
                        _this.removePreventClickId = null;
                    }));
                };
                this.preventClick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                };
                this.el = element;
                this.options = dist_assign(dist_assign({}, SimpleBarCore.defaultOptions), options);
                this.classNames = dist_assign(dist_assign({}, SimpleBarCore.defaultOptions.classNames), options.classNames);
                this.axis = {
                    x: {
                        scrollOffsetAttr: "scrollLeft",
                        sizeAttr: "width",
                        scrollSizeAttr: "scrollWidth",
                        offsetSizeAttr: "offsetWidth",
                        offsetAttr: "left",
                        overflowAttr: "overflowX",
                        dragOffset: 0,
                        isOverflowing: true,
                        forceVisible: false,
                        track: {
                            size: null,
                            el: null,
                            rect: null,
                            isVisible: false
                        },
                        scrollbar: {
                            size: null,
                            el: null,
                            rect: null,
                            isVisible: false
                        }
                    },
                    y: {
                        scrollOffsetAttr: "scrollTop",
                        sizeAttr: "height",
                        scrollSizeAttr: "scrollHeight",
                        offsetSizeAttr: "offsetHeight",
                        offsetAttr: "top",
                        overflowAttr: "overflowY",
                        dragOffset: 0,
                        isOverflowing: true,
                        forceVisible: false,
                        track: {
                            size: null,
                            el: null,
                            rect: null,
                            isVisible: false
                        },
                        scrollbar: {
                            size: null,
                            el: null,
                            rect: null,
                            isVisible: false
                        }
                    }
                };
                if (typeof this.el !== "object" || !this.el.nodeName) throw new Error("Argument passed to SimpleBar must be an HTML element instead of ".concat(this.el));
                this.onMouseMove = throttle(this._onMouseMove, 64);
                this.onWindowResize = debounce(this._onWindowResize, 64, {
                    leading: true
                });
                this.onStopScrolling = debounce(this._onStopScrolling, this.stopScrollDelay);
                this.onMouseEntered = debounce(this._onMouseEntered, this.stopScrollDelay);
                this.init();
            }
            SimpleBarCore.getRtlHelpers = function() {
                if (SimpleBarCore.rtlHelpers) return SimpleBarCore.rtlHelpers;
                var dummyDiv = document.createElement("div");
                dummyDiv.innerHTML = '<div class="simplebar-dummy-scrollbar-size"><div></div></div>';
                var scrollbarDummyEl = dummyDiv.firstElementChild;
                var dummyChild = scrollbarDummyEl === null || scrollbarDummyEl === void 0 ? void 0 : scrollbarDummyEl.firstElementChild;
                if (!dummyChild) return null;
                document.body.appendChild(scrollbarDummyEl);
                scrollbarDummyEl.scrollLeft = 0;
                var dummyContainerOffset = SimpleBarCore.getOffset(scrollbarDummyEl);
                var dummyChildOffset = SimpleBarCore.getOffset(dummyChild);
                scrollbarDummyEl.scrollLeft = -999;
                var dummyChildOffsetAfterScroll = SimpleBarCore.getOffset(dummyChild);
                document.body.removeChild(scrollbarDummyEl);
                SimpleBarCore.rtlHelpers = {
                    isScrollOriginAtZero: dummyContainerOffset.left !== dummyChildOffset.left,
                    isScrollingToNegative: dummyChildOffset.left !== dummyChildOffsetAfterScroll.left
                };
                return SimpleBarCore.rtlHelpers;
            };
            SimpleBarCore.prototype.getScrollbarWidth = function() {
                try {
                    if (this.contentWrapperEl && getComputedStyle(this.contentWrapperEl, "::-webkit-scrollbar").display === "none" || "scrollbarWidth" in document.documentElement.style || "-ms-overflow-style" in document.documentElement.style) return 0; else return scrollbarWidth();
                } catch (e) {
                    return scrollbarWidth();
                }
            };
            SimpleBarCore.getOffset = function(el) {
                var rect = el.getBoundingClientRect();
                var elDocument = getElementDocument(el);
                var elWindow = getElementWindow(el);
                return {
                    top: rect.top + (elWindow.pageYOffset || elDocument.documentElement.scrollTop),
                    left: rect.left + (elWindow.pageXOffset || elDocument.documentElement.scrollLeft)
                };
            };
            SimpleBarCore.prototype.init = function() {
                if (canUseDOM) {
                    this.initDOM();
                    this.rtlHelpers = SimpleBarCore.getRtlHelpers();
                    this.scrollbarWidth = this.getScrollbarWidth();
                    this.recalculate();
                    this.initListeners();
                }
            };
            SimpleBarCore.prototype.initDOM = function() {
                var _a, _b;
                this.wrapperEl = this.el.querySelector(classNamesToQuery(this.classNames.wrapper));
                this.contentWrapperEl = this.options.scrollableNode || this.el.querySelector(classNamesToQuery(this.classNames.contentWrapper));
                this.contentEl = this.options.contentNode || this.el.querySelector(classNamesToQuery(this.classNames.contentEl));
                this.offsetEl = this.el.querySelector(classNamesToQuery(this.classNames.offset));
                this.maskEl = this.el.querySelector(classNamesToQuery(this.classNames.mask));
                this.placeholderEl = this.findChild(this.wrapperEl, classNamesToQuery(this.classNames.placeholder));
                this.heightAutoObserverWrapperEl = this.el.querySelector(classNamesToQuery(this.classNames.heightAutoObserverWrapperEl));
                this.heightAutoObserverEl = this.el.querySelector(classNamesToQuery(this.classNames.heightAutoObserverEl));
                this.axis.x.track.el = this.findChild(this.el, "".concat(classNamesToQuery(this.classNames.track)).concat(classNamesToQuery(this.classNames.horizontal)));
                this.axis.y.track.el = this.findChild(this.el, "".concat(classNamesToQuery(this.classNames.track)).concat(classNamesToQuery(this.classNames.vertical)));
                this.axis.x.scrollbar.el = ((_a = this.axis.x.track.el) === null || _a === void 0 ? void 0 : _a.querySelector(classNamesToQuery(this.classNames.scrollbar))) || null;
                this.axis.y.scrollbar.el = ((_b = this.axis.y.track.el) === null || _b === void 0 ? void 0 : _b.querySelector(classNamesToQuery(this.classNames.scrollbar))) || null;
                if (!this.options.autoHide) {
                    dist_addClasses(this.axis.x.scrollbar.el, this.classNames.visible);
                    dist_addClasses(this.axis.y.scrollbar.el, this.classNames.visible);
                }
            };
            SimpleBarCore.prototype.initListeners = function() {
                var _this = this;
                var _a;
                var elWindow = getElementWindow(this.el);
                this.el.addEventListener("mouseenter", this.onMouseEnter);
                this.el.addEventListener("pointerdown", this.onPointerEvent, true);
                this.el.addEventListener("mousemove", this.onMouseMove);
                this.el.addEventListener("mouseleave", this.onMouseLeave);
                (_a = this.contentWrapperEl) === null || _a === void 0 ? void 0 : _a.addEventListener("scroll", this.onScroll);
                elWindow.addEventListener("resize", this.onWindowResize);
                if (!this.contentEl) return;
                if (window.ResizeObserver) {
                    var resizeObserverStarted_1 = false;
                    var resizeObserver = elWindow.ResizeObserver || ResizeObserver;
                    this.resizeObserver = new resizeObserver((function() {
                        if (!resizeObserverStarted_1) return;
                        elWindow.requestAnimationFrame((function() {
                            _this.recalculate();
                        }));
                    }));
                    this.resizeObserver.observe(this.el);
                    this.resizeObserver.observe(this.contentEl);
                    elWindow.requestAnimationFrame((function() {
                        resizeObserverStarted_1 = true;
                    }));
                }
                this.mutationObserver = new elWindow.MutationObserver((function() {
                    elWindow.requestAnimationFrame((function() {
                        _this.recalculate();
                    }));
                }));
                this.mutationObserver.observe(this.contentEl, {
                    childList: true,
                    subtree: true,
                    characterData: true
                });
            };
            SimpleBarCore.prototype.recalculate = function() {
                if (!this.heightAutoObserverEl || !this.contentEl || !this.contentWrapperEl || !this.wrapperEl || !this.placeholderEl) return;
                var elWindow = getElementWindow(this.el);
                this.elStyles = elWindow.getComputedStyle(this.el);
                this.isRtl = this.elStyles.direction === "rtl";
                var contentElOffsetWidth = this.contentEl.offsetWidth;
                var isHeightAuto = this.heightAutoObserverEl.offsetHeight <= 1;
                var isWidthAuto = this.heightAutoObserverEl.offsetWidth <= 1 || contentElOffsetWidth > 0;
                var contentWrapperElOffsetWidth = this.contentWrapperEl.offsetWidth;
                var elOverflowX = this.elStyles.overflowX;
                var elOverflowY = this.elStyles.overflowY;
                this.contentEl.style.padding = "".concat(this.elStyles.paddingTop, " ").concat(this.elStyles.paddingRight, " ").concat(this.elStyles.paddingBottom, " ").concat(this.elStyles.paddingLeft);
                this.wrapperEl.style.margin = "-".concat(this.elStyles.paddingTop, " -").concat(this.elStyles.paddingRight, " -").concat(this.elStyles.paddingBottom, " -").concat(this.elStyles.paddingLeft);
                var contentElScrollHeight = this.contentEl.scrollHeight;
                var contentElScrollWidth = this.contentEl.scrollWidth;
                this.contentWrapperEl.style.height = isHeightAuto ? "auto" : "100%";
                this.placeholderEl.style.width = isWidthAuto ? "".concat(contentElOffsetWidth || contentElScrollWidth, "px") : "auto";
                this.placeholderEl.style.height = "".concat(contentElScrollHeight, "px");
                var contentWrapperElOffsetHeight = this.contentWrapperEl.offsetHeight;
                this.axis.x.isOverflowing = contentElOffsetWidth !== 0 && contentElScrollWidth > contentElOffsetWidth;
                this.axis.y.isOverflowing = contentElScrollHeight > contentWrapperElOffsetHeight;
                this.axis.x.isOverflowing = elOverflowX === "hidden" ? false : this.axis.x.isOverflowing;
                this.axis.y.isOverflowing = elOverflowY === "hidden" ? false : this.axis.y.isOverflowing;
                this.axis.x.forceVisible = this.options.forceVisible === "x" || this.options.forceVisible === true;
                this.axis.y.forceVisible = this.options.forceVisible === "y" || this.options.forceVisible === true;
                this.hideNativeScrollbar();
                var offsetForXScrollbar = this.axis.x.isOverflowing ? this.scrollbarWidth : 0;
                var offsetForYScrollbar = this.axis.y.isOverflowing ? this.scrollbarWidth : 0;
                this.axis.x.isOverflowing = this.axis.x.isOverflowing && contentElScrollWidth > contentWrapperElOffsetWidth - offsetForYScrollbar;
                this.axis.y.isOverflowing = this.axis.y.isOverflowing && contentElScrollHeight > contentWrapperElOffsetHeight - offsetForXScrollbar;
                this.axis.x.scrollbar.size = this.getScrollbarSize("x");
                this.axis.y.scrollbar.size = this.getScrollbarSize("y");
                if (this.axis.x.scrollbar.el) this.axis.x.scrollbar.el.style.width = "".concat(this.axis.x.scrollbar.size, "px");
                if (this.axis.y.scrollbar.el) this.axis.y.scrollbar.el.style.height = "".concat(this.axis.y.scrollbar.size, "px");
                this.positionScrollbar("x");
                this.positionScrollbar("y");
                this.toggleTrackVisibility("x");
                this.toggleTrackVisibility("y");
            };
            SimpleBarCore.prototype.getScrollbarSize = function(axis) {
                var _a, _b;
                if (axis === void 0) axis = "y";
                if (!this.axis[axis].isOverflowing || !this.contentEl) return 0;
                var contentSize = this.contentEl[this.axis[axis].scrollSizeAttr];
                var trackSize = (_b = (_a = this.axis[axis].track.el) === null || _a === void 0 ? void 0 : _a[this.axis[axis].offsetSizeAttr]) !== null && _b !== void 0 ? _b : 0;
                var scrollbarRatio = trackSize / contentSize;
                var scrollbarSize;
                scrollbarSize = Math.max(~~(scrollbarRatio * trackSize), this.options.scrollbarMinSize);
                if (this.options.scrollbarMaxSize) scrollbarSize = Math.min(scrollbarSize, this.options.scrollbarMaxSize);
                return scrollbarSize;
            };
            SimpleBarCore.prototype.positionScrollbar = function(axis) {
                var _a, _b, _c;
                if (axis === void 0) axis = "y";
                var scrollbar = this.axis[axis].scrollbar;
                if (!this.axis[axis].isOverflowing || !this.contentWrapperEl || !scrollbar.el || !this.elStyles) return;
                var contentSize = this.contentWrapperEl[this.axis[axis].scrollSizeAttr];
                var trackSize = ((_a = this.axis[axis].track.el) === null || _a === void 0 ? void 0 : _a[this.axis[axis].offsetSizeAttr]) || 0;
                var hostSize = parseInt(this.elStyles[this.axis[axis].sizeAttr], 10);
                var scrollOffset = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
                scrollOffset = axis === "x" && this.isRtl && ((_b = SimpleBarCore.getRtlHelpers()) === null || _b === void 0 ? void 0 : _b.isScrollOriginAtZero) ? -scrollOffset : scrollOffset;
                if (axis === "x" && this.isRtl) scrollOffset = ((_c = SimpleBarCore.getRtlHelpers()) === null || _c === void 0 ? void 0 : _c.isScrollingToNegative) ? scrollOffset : -scrollOffset;
                var scrollPourcent = scrollOffset / (contentSize - hostSize);
                var handleOffset = ~~((trackSize - scrollbar.size) * scrollPourcent);
                handleOffset = axis === "x" && this.isRtl ? -handleOffset + (trackSize - scrollbar.size) : handleOffset;
                scrollbar.el.style.transform = axis === "x" ? "translate3d(".concat(handleOffset, "px, 0, 0)") : "translate3d(0, ".concat(handleOffset, "px, 0)");
            };
            SimpleBarCore.prototype.toggleTrackVisibility = function(axis) {
                if (axis === void 0) axis = "y";
                var track = this.axis[axis].track.el;
                var scrollbar = this.axis[axis].scrollbar.el;
                if (!track || !scrollbar || !this.contentWrapperEl) return;
                if (this.axis[axis].isOverflowing || this.axis[axis].forceVisible) {
                    track.style.visibility = "visible";
                    this.contentWrapperEl.style[this.axis[axis].overflowAttr] = "scroll";
                    this.el.classList.add("".concat(this.classNames.scrollable, "-").concat(axis));
                } else {
                    track.style.visibility = "hidden";
                    this.contentWrapperEl.style[this.axis[axis].overflowAttr] = "hidden";
                    this.el.classList.remove("".concat(this.classNames.scrollable, "-").concat(axis));
                }
                if (this.axis[axis].isOverflowing) scrollbar.style.display = "block"; else scrollbar.style.display = "none";
            };
            SimpleBarCore.prototype.showScrollbar = function(axis) {
                if (axis === void 0) axis = "y";
                if (this.axis[axis].isOverflowing && !this.axis[axis].scrollbar.isVisible) {
                    dist_addClasses(this.axis[axis].scrollbar.el, this.classNames.visible);
                    this.axis[axis].scrollbar.isVisible = true;
                }
            };
            SimpleBarCore.prototype.hideScrollbar = function(axis) {
                if (axis === void 0) axis = "y";
                if (this.isDragging) return;
                if (this.axis[axis].isOverflowing && this.axis[axis].scrollbar.isVisible) {
                    dist_removeClasses(this.axis[axis].scrollbar.el, this.classNames.visible);
                    this.axis[axis].scrollbar.isVisible = false;
                }
            };
            SimpleBarCore.prototype.hideNativeScrollbar = function() {
                if (!this.offsetEl) return;
                this.offsetEl.style[this.isRtl ? "left" : "right"] = this.axis.y.isOverflowing || this.axis.y.forceVisible ? "-".concat(this.scrollbarWidth, "px") : "0px";
                this.offsetEl.style.bottom = this.axis.x.isOverflowing || this.axis.x.forceVisible ? "-".concat(this.scrollbarWidth, "px") : "0px";
            };
            SimpleBarCore.prototype.onMouseMoveForAxis = function(axis) {
                if (axis === void 0) axis = "y";
                var currentAxis = this.axis[axis];
                if (!currentAxis.track.el || !currentAxis.scrollbar.el) return;
                currentAxis.track.rect = currentAxis.track.el.getBoundingClientRect();
                currentAxis.scrollbar.rect = currentAxis.scrollbar.el.getBoundingClientRect();
                if (this.isWithinBounds(currentAxis.track.rect)) {
                    this.showScrollbar(axis);
                    dist_addClasses(currentAxis.track.el, this.classNames.hover);
                    if (this.isWithinBounds(currentAxis.scrollbar.rect)) dist_addClasses(currentAxis.scrollbar.el, this.classNames.hover); else dist_removeClasses(currentAxis.scrollbar.el, this.classNames.hover);
                } else {
                    dist_removeClasses(currentAxis.track.el, this.classNames.hover);
                    if (this.options.autoHide) this.hideScrollbar(axis);
                }
            };
            SimpleBarCore.prototype.onMouseLeaveForAxis = function(axis) {
                if (axis === void 0) axis = "y";
                dist_removeClasses(this.axis[axis].track.el, this.classNames.hover);
                dist_removeClasses(this.axis[axis].scrollbar.el, this.classNames.hover);
                if (this.options.autoHide) this.hideScrollbar(axis);
            };
            SimpleBarCore.prototype.onDragStart = function(e, axis) {
                var _a;
                if (axis === void 0) axis = "y";
                this.isDragging = true;
                var elDocument = getElementDocument(this.el);
                var elWindow = getElementWindow(this.el);
                var scrollbar = this.axis[axis].scrollbar;
                var eventOffset = axis === "y" ? e.pageY : e.pageX;
                this.axis[axis].dragOffset = eventOffset - (((_a = scrollbar.rect) === null || _a === void 0 ? void 0 : _a[this.axis[axis].offsetAttr]) || 0);
                this.draggedAxis = axis;
                dist_addClasses(this.el, this.classNames.dragging);
                elDocument.addEventListener("mousemove", this.drag, true);
                elDocument.addEventListener("mouseup", this.onEndDrag, true);
                if (this.removePreventClickId === null) {
                    elDocument.addEventListener("click", this.preventClick, true);
                    elDocument.addEventListener("dblclick", this.preventClick, true);
                } else {
                    elWindow.clearTimeout(this.removePreventClickId);
                    this.removePreventClickId = null;
                }
            };
            SimpleBarCore.prototype.onTrackClick = function(e, axis) {
                var _this = this;
                var _a, _b, _c, _d;
                if (axis === void 0) axis = "y";
                var currentAxis = this.axis[axis];
                if (!this.options.clickOnTrack || !currentAxis.scrollbar.el || !this.contentWrapperEl) return;
                e.preventDefault();
                var elWindow = getElementWindow(this.el);
                this.axis[axis].scrollbar.rect = currentAxis.scrollbar.el.getBoundingClientRect();
                var scrollbar = this.axis[axis].scrollbar;
                var scrollbarOffset = (_b = (_a = scrollbar.rect) === null || _a === void 0 ? void 0 : _a[this.axis[axis].offsetAttr]) !== null && _b !== void 0 ? _b : 0;
                var hostSize = parseInt((_d = (_c = this.elStyles) === null || _c === void 0 ? void 0 : _c[this.axis[axis].sizeAttr]) !== null && _d !== void 0 ? _d : "0px", 10);
                var scrolled = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
                var t = axis === "y" ? this.mouseY - scrollbarOffset : this.mouseX - scrollbarOffset;
                var dir = t < 0 ? -1 : 1;
                var scrollSize = dir === -1 ? scrolled - hostSize : scrolled + hostSize;
                var speed = 40;
                var scrollTo = function() {
                    if (!_this.contentWrapperEl) return;
                    if (dir === -1) {
                        if (scrolled > scrollSize) {
                            scrolled -= speed;
                            _this.contentWrapperEl[_this.axis[axis].scrollOffsetAttr] = scrolled;
                            elWindow.requestAnimationFrame(scrollTo);
                        }
                    } else if (scrolled < scrollSize) {
                        scrolled += speed;
                        _this.contentWrapperEl[_this.axis[axis].scrollOffsetAttr] = scrolled;
                        elWindow.requestAnimationFrame(scrollTo);
                    }
                };
                scrollTo();
            };
            SimpleBarCore.prototype.getContentElement = function() {
                return this.contentEl;
            };
            SimpleBarCore.prototype.getScrollElement = function() {
                return this.contentWrapperEl;
            };
            SimpleBarCore.prototype.removeListeners = function() {
                var elWindow = getElementWindow(this.el);
                this.el.removeEventListener("mouseenter", this.onMouseEnter);
                this.el.removeEventListener("pointerdown", this.onPointerEvent, true);
                this.el.removeEventListener("mousemove", this.onMouseMove);
                this.el.removeEventListener("mouseleave", this.onMouseLeave);
                if (this.contentWrapperEl) this.contentWrapperEl.removeEventListener("scroll", this.onScroll);
                elWindow.removeEventListener("resize", this.onWindowResize);
                if (this.mutationObserver) this.mutationObserver.disconnect();
                if (this.resizeObserver) this.resizeObserver.disconnect();
                this.onMouseMove.cancel();
                this.onWindowResize.cancel();
                this.onStopScrolling.cancel();
                this.onMouseEntered.cancel();
            };
            SimpleBarCore.prototype.unMount = function() {
                this.removeListeners();
            };
            SimpleBarCore.prototype.isWithinBounds = function(bbox) {
                return this.mouseX >= bbox.left && this.mouseX <= bbox.left + bbox.width && this.mouseY >= bbox.top && this.mouseY <= bbox.top + bbox.height;
            };
            SimpleBarCore.prototype.findChild = function(el, query) {
                var matches = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
                return Array.prototype.filter.call(el.children, (function(child) {
                    return matches.call(child, query);
                }))[0];
            };
            SimpleBarCore.rtlHelpers = null;
            SimpleBarCore.defaultOptions = {
                forceVisible: false,
                clickOnTrack: true,
                scrollbarMinSize: 25,
                scrollbarMaxSize: 0,
                ariaLabel: "scrollable content",
                tabIndex: 0,
                classNames: {
                    contentEl: "simplebar-content",
                    contentWrapper: "simplebar-content-wrapper",
                    offset: "simplebar-offset",
                    mask: "simplebar-mask",
                    wrapper: "simplebar-wrapper",
                    placeholder: "simplebar-placeholder",
                    scrollbar: "simplebar-scrollbar",
                    track: "simplebar-track",
                    heightAutoObserverWrapperEl: "simplebar-height-auto-observer-wrapper",
                    heightAutoObserverEl: "simplebar-height-auto-observer",
                    visible: "simplebar-visible",
                    horizontal: "simplebar-horizontal",
                    vertical: "simplebar-vertical",
                    hover: "simplebar-hover",
                    dragging: "simplebar-dragging",
                    scrolling: "simplebar-scrolling",
                    scrollable: "simplebar-scrollable",
                    mouseEntered: "simplebar-mouse-entered"
                },
                scrollableNode: null,
                contentNode: null,
                autoHide: true
            };
            SimpleBarCore.getOptions = getOptions;
            SimpleBarCore.helpers = helpers;
            return SimpleBarCore;
        }();
        var dist_extendStatics = function(d, b) {
            dist_extendStatics = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(d, b) {
                d.__proto__ = b;
            } || function(d, b) {
                for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
            };
            return dist_extendStatics(d, b);
        };
        function dist_extends(d, b) {
            if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            dist_extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __);
        }
        var _a = SimpleBarCore.helpers, dist_getOptions = _a.getOptions, simplebar_dist_addClasses = _a.addClasses, dist_canUseDOM = _a.canUseDOM;
        var SimpleBar = function(_super) {
            dist_extends(SimpleBar, _super);
            function SimpleBar() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
                var _this = _super.apply(this, args) || this;
                SimpleBar.instances.set(args[0], _this);
                return _this;
            }
            SimpleBar.initDOMLoadedElements = function() {
                document.removeEventListener("DOMContentLoaded", this.initDOMLoadedElements);
                window.removeEventListener("load", this.initDOMLoadedElements);
                Array.prototype.forEach.call(document.querySelectorAll("[data-simplebar]"), (function(el) {
                    if (el.getAttribute("data-simplebar") !== "init" && !SimpleBar.instances.has(el)) new SimpleBar(el, dist_getOptions(el.attributes));
                }));
            };
            SimpleBar.removeObserver = function() {
                var _a;
                (_a = SimpleBar.globalObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
            };
            SimpleBar.prototype.initDOM = function() {
                var _this = this;
                var _a, _b, _c;
                if (!Array.prototype.filter.call(this.el.children, (function(child) {
                    return child.classList.contains(_this.classNames.wrapper);
                })).length) {
                    this.wrapperEl = document.createElement("div");
                    this.contentWrapperEl = document.createElement("div");
                    this.offsetEl = document.createElement("div");
                    this.maskEl = document.createElement("div");
                    this.contentEl = document.createElement("div");
                    this.placeholderEl = document.createElement("div");
                    this.heightAutoObserverWrapperEl = document.createElement("div");
                    this.heightAutoObserverEl = document.createElement("div");
                    simplebar_dist_addClasses(this.wrapperEl, this.classNames.wrapper);
                    simplebar_dist_addClasses(this.contentWrapperEl, this.classNames.contentWrapper);
                    simplebar_dist_addClasses(this.offsetEl, this.classNames.offset);
                    simplebar_dist_addClasses(this.maskEl, this.classNames.mask);
                    simplebar_dist_addClasses(this.contentEl, this.classNames.contentEl);
                    simplebar_dist_addClasses(this.placeholderEl, this.classNames.placeholder);
                    simplebar_dist_addClasses(this.heightAutoObserverWrapperEl, this.classNames.heightAutoObserverWrapperEl);
                    simplebar_dist_addClasses(this.heightAutoObserverEl, this.classNames.heightAutoObserverEl);
                    while (this.el.firstChild) this.contentEl.appendChild(this.el.firstChild);
                    this.contentWrapperEl.appendChild(this.contentEl);
                    this.offsetEl.appendChild(this.contentWrapperEl);
                    this.maskEl.appendChild(this.offsetEl);
                    this.heightAutoObserverWrapperEl.appendChild(this.heightAutoObserverEl);
                    this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl);
                    this.wrapperEl.appendChild(this.maskEl);
                    this.wrapperEl.appendChild(this.placeholderEl);
                    this.el.appendChild(this.wrapperEl);
                    (_a = this.contentWrapperEl) === null || _a === void 0 ? void 0 : _a.setAttribute("tabindex", this.options.tabIndex.toString());
                    (_b = this.contentWrapperEl) === null || _b === void 0 ? void 0 : _b.setAttribute("role", "region");
                    (_c = this.contentWrapperEl) === null || _c === void 0 ? void 0 : _c.setAttribute("aria-label", this.options.ariaLabel);
                }
                if (!this.axis.x.track.el || !this.axis.y.track.el) {
                    var track = document.createElement("div");
                    var scrollbar = document.createElement("div");
                    simplebar_dist_addClasses(track, this.classNames.track);
                    simplebar_dist_addClasses(scrollbar, this.classNames.scrollbar);
                    track.appendChild(scrollbar);
                    this.axis.x.track.el = track.cloneNode(true);
                    simplebar_dist_addClasses(this.axis.x.track.el, this.classNames.horizontal);
                    this.axis.y.track.el = track.cloneNode(true);
                    simplebar_dist_addClasses(this.axis.y.track.el, this.classNames.vertical);
                    this.el.appendChild(this.axis.x.track.el);
                    this.el.appendChild(this.axis.y.track.el);
                }
                SimpleBarCore.prototype.initDOM.call(this);
                this.el.setAttribute("data-simplebar", "init");
            };
            SimpleBar.prototype.unMount = function() {
                SimpleBarCore.prototype.unMount.call(this);
                SimpleBar.instances["delete"](this.el);
            };
            SimpleBar.initHtmlApi = function() {
                this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this);
                if (typeof MutationObserver !== "undefined") {
                    this.globalObserver = new MutationObserver(SimpleBar.handleMutations);
                    this.globalObserver.observe(document, {
                        childList: true,
                        subtree: true
                    });
                }
                if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) window.setTimeout(this.initDOMLoadedElements); else {
                    document.addEventListener("DOMContentLoaded", this.initDOMLoadedElements);
                    window.addEventListener("load", this.initDOMLoadedElements);
                }
            };
            SimpleBar.handleMutations = function(mutations) {
                mutations.forEach((function(mutation) {
                    mutation.addedNodes.forEach((function(addedNode) {
                        if (addedNode.nodeType === 1) if (addedNode.hasAttribute("data-simplebar")) !SimpleBar.instances.has(addedNode) && document.documentElement.contains(addedNode) && new SimpleBar(addedNode, dist_getOptions(addedNode.attributes)); else addedNode.querySelectorAll("[data-simplebar]").forEach((function(el) {
                            if (el.getAttribute("data-simplebar") !== "init" && !SimpleBar.instances.has(el) && document.documentElement.contains(el)) new SimpleBar(el, dist_getOptions(el.attributes));
                        }));
                    }));
                    mutation.removedNodes.forEach((function(removedNode) {
                        var _a;
                        if (removedNode.nodeType === 1) if (removedNode.getAttribute("data-simplebar") === "init") !document.documentElement.contains(removedNode) && ((_a = SimpleBar.instances.get(removedNode)) === null || _a === void 0 ? void 0 : _a.unMount()); else Array.prototype.forEach.call(removedNode.querySelectorAll('[data-simplebar="init"]'), (function(el) {
                            var _a;
                            !document.documentElement.contains(el) && ((_a = SimpleBar.instances.get(el)) === null || _a === void 0 ? void 0 : _a.unMount());
                        }));
                    }));
                }));
            };
            SimpleBar.instances = new WeakMap;
            return SimpleBar;
        }(SimpleBarCore);
        if (dist_canUseDOM) SimpleBar.initHtmlApi();
        if (document.querySelectorAll("[data-simplebar]").length) document.querySelectorAll("[data-simplebar]").forEach((scrollBlock => {
            new SimpleBar(scrollBlock, {
                autoHide: false
            });
        }));
        let addWindowScrollEvent = false;
        setTimeout((() => {
            if (addWindowScrollEvent) {
                let windowScroll = new Event("windowScroll");
                window.addEventListener("scroll", (function(e) {
                    document.dispatchEvent(windowScroll);
                }));
            }
        }), 0);
        document.addEventListener("DOMContentLoaded", (async () => {
            const postsContainer = document.getElementById("posts");
            if (!postsContainer) return;
            const loadMoreButton = document.createElement("button");
            loadMoreButton.textContent = "Завантажити ще";
            loadMoreButton.id = "load-more";
            loadMoreButton.style.display = "none";
            let start = 0;
            const limit = 6;
            async function loadPosts() {
                try {
                    const posts = await getPosts(start, limit);
                    if (posts.length > 0) {
                        posts.forEach((post => {
                            const postElement = document.createElement("div");
                            postElement.classList.add("post");
                            const postLink = document.createElement("a");
                            postLink.href = `/post.html?slug=${post.slug}`;
                            postLink.classList.add("post-link");
                            const postBg = document.createElement("img");
                            postBg.classList.add("post-bg");
                            postBg.src = post.poster;
                            const postTitle = document.createElement("h2");
                            postTitle.classList.add("post-title");
                            postTitle.textContent = post.title;
                            const postDate = document.createElement("div");
                            postDate.classList.add("post-date");
                            postDate.textContent = new Date(post.publishDate).toLocaleDateString();
                            const postDeskr = document.createElement("div");
                            postDeskr.classList.add("post-deskr");
                            postDeskr.textContent = post.description;
                            postLink.append(postBg, postTitle, postDeskr, postDate);
                            postElement.appendChild(postLink);
                            postsContainer.appendChild(postElement);
                        }));
                        start += limit;
                        loadMoreButton.style.display = posts.length < limit ? "none" : "flex";
                    } else loadMoreButton.style.display = "none";
                } catch (error) {
                    console.error("Помилка завантаження постів:", error);
                    postsContainer.innerHTML = "<p>Не вдалося завантажити пости</p>";
                }
            }
            loadPosts();
            postsContainer.after(loadMoreButton);
            loadMoreButton.addEventListener("click", loadPosts);
        }));
        window["FLS"] = true;
        isWebp();
        addTouchClass();
        addLoadedClass();
        menuInit();
    })();
})();