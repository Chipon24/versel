(() => {
    "use strict";
    var __webpack_modules__ = {
        125: (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {
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
    var defaults = (obj, defaults2) => Object.keys(defaults2).concat(Object.keys(obj)).reduce(((target, prop) => (target[prop] = typeof obj[prop] > "u" ? defaults2[prop] : obj[prop], 
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
            ...defaults(opts, defaultOptions),
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
    async function getPosts(start = 0, limit = 4) {
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
    document.addEventListener("DOMContentLoaded", (async () => {
        const heroContainer = document.getElementById("hero");
        if (!heroContainer) {
            console.error("Контейнер для Hero не знайдений");
            return;
        }
        try {
            const hero = await getHero();
            console.log(hero);
            if (hero && hero[0] && hero[0].heroTitle && hero[0].heroDescription) {
                const heroElement = document.createElement("div");
                heroElement.classList.add("hero-content");
                heroElement.innerHTML = `\n        <h1>${hero[0].heroTitle}</h1>\n        <h2>${hero[0].heroDescription}</h2>\n      `;
                heroContainer.appendChild(heroElement);
            } else heroContainer.innerHTML = "<p>Немає даних про Hero</p>";
        } catch (error) {
            console.error("Помилка завантаження даних Hero:", error);
            heroContainer.innerHTML = "<p>Не вдалося завантажити дані Hero</p>";
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
    console.log("Привіт це нова папка скриптів!!!");
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
        const limit = 4;
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
                    loadMoreButton.style.display = posts.length < limit ? "none" : "block";
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
})();