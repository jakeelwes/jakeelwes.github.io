/*
 RequireJS 1.0.1 Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
 RequireJS text 1.0.0 Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
*/
var requirejs, require, define;
(function() {
    function h(g) {
        return "[object Function]" === l.call(g)
    }
    function a(g) {
        return "[object Array]" === l.call(g)
    }
    function c(g, a, b) {
        for (var n in a)
            n in e || n in g && !b || (g[n] = a[n]);
        return w
    }
    function d(g, a, n) {
        g = Error(a + "\nhttp://requirejs.org/docs/errors.html#" + g);
        n && (g.originalError = n);
        return g
    }
    function f(g, a, n) {
        var b, d, c;
        for (b = 0; c = a[b]; b++)
            c = "string" === typeof c ? {
                name: c
            } : c,
            d = c.location,
            n && (!d || 0 !== d.indexOf("/") && -1 === d.indexOf(":")) && (d = n + "/" + (d || c.name)),
            g[c.name] = {
                name: c.name,
                location: d || c.name,
                main: (c.main || "main").replace(x, "").replace(A, "")
            }
    }
    function b(g, a) {
        g.holdReady ? g.holdReady(a) : a ? g.readyWait += 1 : g.ready(!0)
    }
    function k(g) {
        function a(g, n) {
            var b, d;
            if (g && "." === g.charAt(0) && n) {
                C.pkgs[n] ? n = [n] : (n = n.split("/"),
                n = n.slice(0, n.length - 1));
                b = g = n.concat(g.split("/"));
                var c;
                for (d = 0; c = b[d]; d++)
                    if ("." === c)
                        b.splice(d, 1),
                        --d;
                    else if (".." === c)
                        if (1 !== d || ".." !== b[2] && ".." !== b[0])
                            0 < d && (b.splice(d - 1, 2),
                            d -= 2);
                        else
                            break;
                d = C.pkgs[b = g[0]];
                g = g.join("/");
                d && g === b + "/" + d.main && (g = b)
            }
            return g
        }
        function n(g, b) {
            var d = g ? g.indexOf("!") : -1, c = null, e = b ? b.name : null, p = g, m, f;
            -1 !== d && (c = g.substring(0, d),
            g = g.substring(d + 1, g.length));
            c && (c = a(c, e));
            g && (c ? m = (d = H[c]) && d.normalize ? d.normalize(g, function(g) {
                return a(g, e)
            }) : a(g, e) : (m = a(g, e),
            f = M[m],
            f || (f = z.nameToUrl(m, null, b),
            M[m] = f)));
            return {
                prefix: c,
                name: m,
                parentMap: b,
                url: f,
                originalName: p,
                fullName: c ? c + "!" + (m || "") : m
            }
        }
        function p() {
            var g = !0, n = C.priorityWait, a, b;
            if (n) {
                for (b = 0; a = n[b]; b++)
                    if (!N[a]) {
                        g = !1;
                        break
                    }
                g && delete C.priorityWait
            }
            return g
        }
        function m(g, n, a) {
            return function() {
                var b = y.call(arguments, 0), d;
                a && h(d = b[b.length - 1]) && (d.__requireJsBuild = !0);
                b.push(n);
                return g.apply(null, b)
            }
        }
        function l(g, n) {
            var b = m(z.require, g, n);
            c(b, {
                nameToUrl: m(z.nameToUrl, g),
                toUrl: m(z.toUrl, g),
                defined: m(z.requireDefined, g),
                specified: m(z.requireSpecified, g),
                isBrowser: w.isBrowser
            });
            return b
        }
        function q(g) {
            var b, a, c;
            c = g.callback;
            var e = g.map
              , m = e.fullName
              , p = g.deps
              , f = g.listeners;
            if (c && h(c)) {
                if (C.catchError.define)
                    try {
                        a = w.execCb(m, g.callback, p, H[m])
                    } catch (l) {
                        b = l
                    }
                else
                    a = w.execCb(m, g.callback, p, H[m]);
                m && (g.cjsModule && void 0 !== g.cjsModule.exports ? a = H[m] = g.cjsModule.exports : void 0 === a && g.usingExports ? a = H[m] : (H[m] = a,
                R[m] && (T[m] = !0)))
            } else
                m && (a = H[m] = c,
                R[m] && (T[m] = !0));
            P[g.id] && (delete P[g.id],
            g.isDone = !0,
            --z.waitCount,
            0 === z.waitCount && (aa = []));
            delete U[m];
            if (w.onResourceLoad && !g.placeholder)
                w.onResourceLoad(z, e, g.depArray);
            if (b)
                return a = (m ? n(m).url : "") || b.fileName || b.sourceURL,
                c = b.moduleTree,
                b = d("defineerror", 'Error evaluating module "' + m + '" at location "' + a + '":\n' + b + "\nfileName:" + a + "\nlineNumber: " + (b.lineNumber || b.line), b),
                b.moduleName = m,
                b.moduleTree = c,
                w.onError(b);
            for (b = 0; c = f[b]; b++)
                c(a)
        }
        function A(g, b) {
            return function(a) {
                g.depDone[b] || (g.depDone[b] = !0,
                g.deps[b] = a,
                --g.depCount,
                g.depCount || q(g))
            }
        }
        function L(g, b) {
            var a = b.map, n = a.fullName, d = a.name, c = S[g] || (S[g] = H[g]), m;
            b.loading || (b.loading = !0,
            m = function(g) {
                b.callback = function() {
                    return g
                }
                ;
                q(b);
                N[b.id] = !0;
                B()
            }
            ,
            m.fromText = function(g, b) {
                var a = G;
                N[g] = !1;
                z.scriptCount += 1;
                z.fake[g] = !0;
                a && (G = !1);
                w.exec(b);
                a && (G = !0);
                z.completeLoad(g)
            }
            ,
            n in H ? m(H[n]) : c.load(d, l(a.parentMap, !0), m, C))
        }
        function Q(g) {
            P[g.id] || (P[g.id] = g,
            aa.push(g),
            z.waitCount += 1)
        }
        function k(g) {
            this.listeners.push(g)
        }
        function J(g, b) {
            var a = g.fullName, d = g.prefix, c = d ? S[d] || (S[d] = H[d]) : null, m, e;
            a && (m = U[a]);
            m || (e = !0,
            m = {
                id: (d && !c ? ca++ + "__p@:" : "") + (a || "__r@" + ca++),
                map: g,
                depCount: 0,
                depDone: [],
                depCallbacks: [],
                deps: [],
                listeners: [],
                add: k
            },
            F[m.id] = !0,
            !a || d && !S[d] || (U[a] = m));
            d && !c ? (a = J(n(d), !0),
            a.add(function(b) {
                b = n(g.originalName, g.parentMap);
                b = J(b, !0);
                m.placeholder = !0;
                b.add(function(g) {
                    m.callback = function() {
                        return g
                    }
                    ;
                    q(m)
                })
            })) : e && b && (N[m.id] = !1,
            z.paused.push(m),
            Q(m));
            return m
        }
        function r(g, b, a, d) {
            g = n(g, d);
            var c = g.name, m = g.fullName, e = J(g), p = e.id, f = e.deps, K;
            if (m) {
                if (m in H || !0 === N[p] || "jquery" === m && C.jQuery && C.jQuery !== a().fn.jquery)
                    return;
                F[p] = !0;
                N[p] = !0;
                "jquery" === m && a && W(a())
            }
            e.depArray = b;
            e.callback = a;
            for (a = 0; a < b.length; a++)
                if (p = b[a])
                    p = n(p, c ? g : d),
                    K = p.fullName,
                    b[a] = K,
                    "require" === K ? f[a] = l(g) : "exports" === K ? (f[a] = H[m] = {},
                    e.usingExports = !0) : "module" === K ? e.cjsModule = f[a] = {
                        id: c,
                        uri: c ? z.nameToUrl(c, null, d) : void 0,
                        exports: H[m]
                    } : !(K in H) || K in P || m in R && !(m in R && T[K]) ? (m in R && (R[K] = !0,
                    delete H[K],
                    X[p.url] = !1),
                    e.depCount += 1,
                    e.depCallbacks[a] = A(e, a),
                    J(p, !0).add(e.depCallbacks[a])) : f[a] = H[K];
            e.depCount ? Q(e) : q(e)
        }
        function v(g, a) {
            if (!g.isDone) {
                var b = g.map.fullName, d = g.depArray, c, m, e, p;
                if (b) {
                    if (a[b])
                        return H[b];
                    a[b] = !0
                }
                if (d)
                    for (c = 0; c < d.length; c++)
                        if (m = d[c])
                            (e = n(m).prefix) && (p = P[e]) && v(p, a),
                            (e = P[m]) && !e.isDone && N[m] && (m = v(e, a),
                            g.depCallbacks[c](m));
                return b ? H[b] : void 0
            }
        }
        function x() {
            var g = 1E3 * C.waitSeconds, b = g && z.startTime + g < (new Date).getTime(), g = "", a = !1, n = !1, c;
            if (!(0 < z.pausedCount)) {
                if (C.priorityWait)
                    if (p())
                        B();
                    else
                        return;
                for (c in N)
                    if (!(c in e || (a = !0,
                    N[c])))
                        if (b)
                            g += c + " ";
                        else {
                            n = !0;
                            break
                        }
                if (a || z.waitCount) {
                    if (b && g)
                        return c = d("timeout", "Load timeout for modules: " + g),
                        c.requireType = "timeout",
                        c.requireModules = g,
                        w.onError(c);
                    if (n || z.scriptCount)
                        !t && !E || ba || (ba = setTimeout(function() {
                            ba = 0;
                            x()
                        }, 50));
                    else {
                        if (z.waitCount) {
                            for (K = 0; g = aa[K]; K++)
                                v(g, {});
                            z.paused.length && B();
                            5 > O && (O += 1,
                            x())
                        }
                        O = 0;
                        w.checkReadyState()
                    }
                }
            }
        }
        var z, B, C = {
            waitSeconds: 7,
            baseUrl: "./",
            paths: {},
            pkgs: {},
            catchError: {}
        }, D = [], F = {
            require: !0,
            exports: !0,
            module: !0
        }, M = {}, H = {}, N = {}, P = {}, aa = [], X = {}, ca = 0, U = {}, S = {}, R = {}, T = {}, Z = 0;
        W = function(g) {
            z.jQuery || !(g = g || ("undefined" !== typeof jQuery ? jQuery : null)) || C.jQuery && g.fn.jquery !== C.jQuery || !("holdReady"in g || "readyWait"in g) || (z.jQuery = g,
            r.apply(null, ["jquery", [], function() {
                return jQuery
            }
            ]),
            z.scriptCount && (b(g, !0),
            z.jQueryIncremented = !0))
        }
        ;
        B = function() {
            var g, b, a, n, c, m;
            Z += 1;
            0 >= z.scriptCount && (z.scriptCount = 0);
            for (; D.length; ) {
                g = D.shift();
                if (null === g[0])
                    return w.onError(d("mismatch", "Mismatched anonymous define() module: " + g[g.length - 1]));
                r.apply(null, g)
            }
            if (!C.priorityWait || p())
                for (; z.paused.length; ) {
                    c = z.paused;
                    z.pausedCount += c.length;
                    z.paused = [];
                    for (n = 0; g = c[n]; n++)
                        b = g.map,
                        a = b.url,
                        m = b.fullName,
                        b.prefix ? L(b.prefix, g) : X[a] || N[m] || (w.load(z, m, a),
                        X[a] = !0);
                    z.startTime = (new Date).getTime();
                    z.pausedCount -= c.length
                }
            1 === Z && x();
            --Z
        }
        ;
        z = {
            contextName: g,
            config: C,
            defQueue: D,
            waiting: P,
            waitCount: 0,
            specified: F,
            loaded: N,
            urlMap: M,
            urlFetched: X,
            scriptCount: 0,
            defined: H,
            paused: [],
            pausedCount: 0,
            plugins: S,
            needFullExec: R,
            fake: {},
            fullExec: T,
            managerCallbacks: U,
            makeModuleMap: n,
            normalize: a,
            configure: function(g) {
                var b, a, n;
                g.baseUrl && "/" !== g.baseUrl.charAt(g.baseUrl.length - 1) && (g.baseUrl += "/");
                b = C.paths;
                n = C.pkgs;
                c(C, g, !0);
                if (g.paths) {
                    for (a in g.paths)
                        a in e || (b[a] = g.paths[a]);
                    C.paths = b
                }
                if ((b = g.packagePaths) || g.packages) {
                    if (b)
                        for (a in b)
                            a in e || f(n, b[a], a);
                    g.packages && f(n, g.packages);
                    C.pkgs = n
                }
                g.priority && (a = z.requireWait,
                z.requireWait = !1,
                z.takeGlobalQueue(),
                B(),
                z.require(g.priority),
                B(),
                z.requireWait = a,
                C.priorityWait = g.priority);
                (g.deps || g.callback) && z.require(g.deps || [], g.callback)
            },
            requireDefined: function(g, a) {
                return n(g, a).fullName in H
            },
            requireSpecified: function(g, a) {
                return n(g, a).fullName in F
            },
            require: function(a, b, c) {
                if ("string" === typeof a) {
                    if (h(b))
                        return w.onError(d("requireargs", "Invalid require call"));
                    if (w.get)
                        return w.get(z, a, b);
                    b = n(a, b);
                    a = b.fullName;
                    return a in H ? H[a] : w.onError(d("notloaded", "Module name '" + b.fullName + "' has not been loaded yet for context: " + g))
                }
                (a && a.length || b) && r(null, a, b, c);
                if (!z.requireWait)
                    for (; !z.scriptCount && z.paused.length; )
                        z.takeGlobalQueue(),
                        B();
                return z.require
            },
            takeGlobalQueue: function() {
                I.length && (u.apply(z.defQueue, [z.defQueue.length - 1, 0].concat(I)),
                I = [])
            },
            completeLoad: function(g) {
                var a;
                for (z.takeGlobalQueue(); D.length; )
                    if (a = D.shift(),
                    null === a[0]) {
                        a[0] = g;
                        break
                    } else if (a[0] === g)
                        break;
                    else
                        r.apply(null, a),
                        a = null;
                a ? r.apply(null, a) : r.apply(null, [g, [], "jquery" === g && "undefined" !== typeof jQuery ? function() {
                    return jQuery
                }
                : null]);
                W();
                w.isAsync && --z.scriptCount;
                B();
                w.isAsync || --z.scriptCount
            },
            toUrl: function(g, a) {
                var b = g.lastIndexOf(".")
                  , n = null;
                -1 !== b && (n = g.substring(b, g.length),
                g = g.substring(0, b));
                return z.nameToUrl(g, n, a)
            },
            nameToUrl: function(g, b, n) {
                var c, d, m, e, p = z.config;
                g = a(g, n && n.fullName);
                if (w.jsExtRegExp.test(g))
                    b = g + (b ? b : "");
                else {
                    c = p.paths;
                    d = p.pkgs;
                    n = g.split("/");
                    for (e = n.length; 0 < e; e--)
                        if (m = n.slice(0, e).join("/"),
                        c[m]) {
                            n.splice(0, e, c[m]);
                            break
                        } else if (m = d[m]) {
                            g = g === m.name ? m.location + "/" + m.main : m.location;
                            n.splice(0, e, g);
                            break
                        }
                    b = n.join("/") + (b || ".js");
                    b = ("/" === b.charAt(0) || b.match(/^\w+:/) ? "" : p.baseUrl) + b
                }
                return p.urlArgs ? b + ((-1 === b.indexOf("?") ? "?" : "&") + p.urlArgs) : b
            }
        };
        z.jQueryCheck = W;
        z.resume = B;
        return z
    }
    function p() {
        var g, b, a;
        if (F && "interactive" === F.readyState)
            return F;
        g = document.getElementsByTagName("script");
        for (b = g.length - 1; -1 < b && (a = g[b]); b--)
            if ("interactive" === a.readyState)
                return F = a;
        return null
    }
    var r = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg, v = /require\(\s*["']([^'"\s]+)["']\s*\)/g, x = /^\.\//, A = /\.js$/, l = Object.prototype.toString, q = Array.prototype, y = q.slice, u = q.splice, t = !("undefined" === typeof window || !navigator || !document), E = !t && "undefined" !== typeof importScripts, C = t && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/, B = "undefined" !== typeof opera && "[object Opera]" === opera.toString(), e = {}, D = {}, I = [], F = null, O = 0, G = !1, w, q = {}, M, n, L, J, m, g, Q, K, z, W, ba;
    if ("undefined" === typeof define) {
        if ("undefined" !== typeof requirejs) {
            if (h(requirejs))
                return;
            q = requirejs;
            requirejs = void 0
        }
        "undefined" === typeof require || h(require) || (q = require,
        require = void 0);
        w = requirejs = function(g, b, n) {
            var c = "_", d;
            a(g) || "string" === typeof g || (d = g,
            a(b) ? (g = b,
            b = n) : g = []);
            d && d.context && (c = d.context);
            n = D[c] || (D[c] = k(c));
            d && n.configure(d);
            return n.require(g, b)
        }
        ;
        w.config = function(g) {
            return w(g)
        }
        ;
        require || (require = w);
        w.toUrl = function(g) {
            return D._.toUrl(g)
        }
        ;
        w.version = "1.0.1";
        w.jsExtRegExp = /^\/|:|\?|\.js$/;
        n = w.s = {
            contexts: D,
            skipAsync: {}
        };
        if (w.isAsync = w.isBrowser = t)
            if (L = n.head = document.getElementsByTagName("head")[0],
            J = document.getElementsByTagName("base")[0])
                L = n.head = J.parentNode;
        w.onError = function(g) {
            throw g;
        }
        ;
        w.load = function(g, a, n) {
            w.resourcesReady(!1);
            g.scriptCount += 1;
            w.attach(n, g, a);
            g.jQuery && !g.jQueryIncremented && (b(g.jQuery, !0),
            g.jQueryIncremented = !0)
        }
        ;
        define = function(g, b, n) {
            var c, d;
            "string" !== typeof g && (n = b,
            b = g,
            g = null);
            a(b) || (n = b,
            b = []);
            !b.length && h(n) && n.length && (n.toString().replace(r, "").replace(v, function(g, a) {
                b.push(a)
            }),
            b = (1 === n.length ? ["require"] : ["require", "exports", "module"]).concat(b));
            G && (c = M || p()) && (g || (g = c.getAttribute("data-requiremodule")),
            d = D[c.getAttribute("data-requirecontext")]);
            (d ? d.defQueue : I).push([g, b, n])
        }
        ;
        define.amd = {
            multiversion: !0,
            plugins: !0,
            jQuery: !0
        };
        w.exec = function(g) {
            return eval(g)
        }
        ;
        w.execCb = function(g, b, a, n) {
            return b.apply(n, a)
        }
        ;
        w.addScriptToDom = function(g) {
            M = g;
            J ? L.insertBefore(g, J) : L.appendChild(g);
            M = null
        }
        ;
        w.onScriptLoad = function(g) {
            var b = g.currentTarget || g.srcElement, a;
            if ("load" === g.type || b && C.test(b.readyState))
                F = null,
                g = b.getAttribute("data-requirecontext"),
                a = b.getAttribute("data-requiremodule"),
                D[g].completeLoad(a),
                b.detachEvent && !B ? b.detachEvent("onreadystatechange", w.onScriptLoad) : b.removeEventListener("load", w.onScriptLoad, !1)
        }
        ;
        w.attach = function(g, b, a, c, d, m) {
            var e;
            if (t)
                return c = c || w.onScriptLoad,
                e = b && b.config && b.config.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script"),
                e.type = d || "text/javascript",
                e.charset = "utf-8",
                e.async = !n.skipAsync[g],
                b && e.setAttribute("data-requirecontext", b.contextName),
                e.setAttribute("data-requiremodule", a),
                e.attachEvent && !B ? (G = !0,
                m ? e.onreadystatechange = function(g) {
                    "loaded" === e.readyState && (e.onreadystatechange = null,
                    e.attachEvent("onreadystatechange", c),
                    m(e))
                }
                : e.attachEvent("onreadystatechange", c)) : e.addEventListener("load", c, !1),
                e.src = g,
                m || w.addScriptToDom(e),
                e;
            E && (importScripts(g),
            b.completeLoad(a));
            return null
        }
        ;
        if (t)
            for (m = document.getElementsByTagName("script"),
            K = m.length - 1; -1 < K && (g = m[K]); K--)
                if (L || (L = g.parentNode),
                Q = g.getAttribute("data-main")) {
                    q.baseUrl || (m = Q.split("/"),
                    g = m.pop(),
                    m = m.length ? m.join("/") + "/" : "./",
                    q.baseUrl = m,
                    Q = g.replace(A, ""));
                    q.deps = q.deps ? q.deps.concat(Q) : [Q];
                    break
                }
        w.checkReadyState = function() {
            var g = n.contexts, b;
            for (b in g)
                if (!(b in e) && g[b].waitCount)
                    return;
            w.resourcesReady(!0)
        }
        ;
        w.resourcesReady = function(g) {
            var a, c;
            w.resourcesDone = g;
            if (w.resourcesDone)
                for (c in g = n.contexts,
                g)
                    c in e || (a = g[c],
                    a.jQueryIncremented && (b(a.jQuery, !1),
                    a.jQueryIncremented = !1))
        }
        ;
        w.pageLoaded = function() {
            "complete" !== document.readyState && (document.readyState = "complete")
        }
        ;
        t && document.addEventListener && !document.readyState && (document.readyState = "loading",
        window.addEventListener("load", w.pageLoaded, !1));
        w(q);
        w.isAsync && "undefined" !== typeof setTimeout && (z = n.contexts[q.context || "_"],
        z.requireWait = !0,
        setTimeout(function() {
            z.requireWait = !1;
            z.takeGlobalQueue();
            z.jQueryCheck();
            z.scriptCount || z.resume();
            w.checkReadyState()
        }, 0))
    }
})();
define("requireLib", function() {});
define("dat/utils/css", {
    link: function(h, a) {
        a = a || document;
        var c = a.createElement("link");
        c.type = "text/css";
        c.rel = "stylesheet";
        c.setAttribute("href", h);
        var d = a.getElementsByTagName("head")[0];
        c.disable = function() {
            d.removeChild(c)
        }
        ;
        var f = function() {};
        c.onLoad = function(b) {
            f = b
        }
        ;
        (function(b) {
            document.styleSheets.length != b ? f() : setTimeout(arguments.callee, 20)
        })(document.styleSheets.length);
        d.appendChild(c);
        return c
    },
    inject: function(h, a) {
        a = a || document;
        var c = a.createElement("style");
        c.type = "text/css";
        c.innerHTML = h;
        var d = a.getElementsByTagName("head")[0];
        d.disable = function() {
            d.removeChild(c)
        }
        ;
        d.appendChild(c);
        return c
    }
});
(function() {
    var h = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"]
      , a = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im
      , c = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im
      , d = "undefined" !== typeof location && location.href
      , f = d && location.protocol && location.protocol.replace(/\:/, "")
      , b = d && location.hostname
      , k = d && (location.port || void 0)
      , p = [];
    define("text", [], function() {
        var r, v, x;
        "undefined" !== typeof window && window.navigator && window.document ? v = function(b, a) {
            var c = r.createXhr();
            c.open("GET", b, !0);
            c.onreadystatechange = function(b) {
                4 === c.readyState && a(c.responseText)
            }
            ;
            c.send(null)
        }
        : "undefined" !== typeof process && process.versions && process.versions.node ? (x = require.nodeRequire("fs"),
        v = function(b, a) {
            a(x.readFileSync(b, "utf8"))
        }
        ) : "undefined" !== typeof Packages && (v = function(b, a) {
            var c = new java.io.File(b), d = java.lang.System.getProperty("line.separator"), c = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(c),"utf-8")), p, f, k = "";
            try {
                p = new java.lang.StringBuffer;
                (f = c.readLine()) && f.length() && 65279 === f.charAt(0) && (f = f.substring(1));
                for (p.append(f); null !== (f = c.readLine()); )
                    p.append(d),
                    p.append(f);
                k = String(p.toString())
            } finally {
                c.close()
            }
            a(k)
        }
        );
        return r = {
            version: "1.0.0",
            strip: function(b) {
                if (b) {
                    b = b.replace(a, "");
                    var d = b.match(c);
                    d && (b = d[1])
                } else
                    b = "";
                return b
            },
            jsEscape: function(b) {
                return b.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r")
            },
            createXhr: function() {
                var b, a, c;
                if ("undefined" !== typeof XMLHttpRequest)
                    return new XMLHttpRequest;
                for (a = 0; 3 > a; a++) {
                    c = h[a];
                    try {
                        b = new ActiveXObject(c)
                    } catch (d) {}
                    if (b) {
                        h = [c];
                        break
                    }
                }
                if (!b)
                    throw Error("createXhr(): XMLHttpRequest not available");
                return b
            },
            get: v,
            parseName: function(b) {
                var a = !1
                  , c = b.indexOf(".")
                  , d = b.substring(0, c);
                b = b.substring(c + 1, b.length);
                c = b.indexOf("!");
                -1 !== c && (a = b.substring(c + 1, b.length),
                a = "strip" === a,
                b = b.substring(0, c));
                return {
                    moduleName: d,
                    ext: b,
                    strip: a
                }
            },
            xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
            useXhr: function(b, a, c, d) {
                var p = r.xdRegExp.exec(b), f;
                if (!p)
                    return !0;
                b = p[2];
                p = p[3];
                p = p.split(":");
                f = p[1];
                p = p[0];
                return (!b || b === a) && (!p || p === c) && (!f && !p || f === d)
            },
            finishLoad: function(b, a, c, d, f) {
                c = a ? r.strip(c) : c;
                f.isBuild && f.inlineText && (p[b] = c);
                d(c)
            },
            load: function(a, c, p, h) {
                var v = r.parseName(a)
                  , x = v.moduleName + "." + v.ext
                  , E = c.toUrl(x)
                  , C = h && h.text && h.text.useXhr || r.useXhr;
                !d || C(E, f, b, k) ? r.get(E, function(b) {
                    r.finishLoad(a, v.strip, b, p, h)
                }) : c([x], function(b) {
                    r.finishLoad(v.moduleName + "." + v.ext, v.strip, b, p, h)
                })
            },
            write: function(b, a, c, d) {
                a in p && (d = r.jsEscape(p[a]),
                c.asModule(b + "!" + a, "define(function () { return '" + d + "';});\n"))
            },
            writeFile: function(b, a, c, d, p) {
                a = r.parseName(a);
                var f = a.moduleName + "." + a.ext
                  , k = c.toUrl(a.moduleName + "." + a.ext) + ".js";
                r.load(f, c, function(a) {
                    a = function(b) {
                        return d(k, b)
                    }
                    ;
                    a.asModule = function(b, a) {
                        return d.asModule(b, k, a)
                    }
                    ;
                    r.write(b, f, a, p)
                }, p)
            }
        }
    })
})();
define("text!dat/slides/style.css", [], function() {
    return ".dat-slides-container {\n  overflow: hidden; }\n  .dat-slides-container.auto-ui {\n    padding-top: 42px; }\n  .dat-slides-container ul.slides {\n    /* transitions */\n    -webkit-transition: all 350ms cubic-bezier(0.785, 0.135, 0.15, 0.86);\n    -moz-transition: all 350ms cubic-bezier(0.785, 0.135, 0.15, 0.86);\n    -ms-transition: all 350ms cubic-bezier(0.785, 0.135, 0.15, 0.86);\n    -o-transition: all 350ms cubic-bezier(0.785, 0.135, 0.15, 0.86);\n    transition: all 350ms cubic-bezier(0.785, 0.135, 0.15, 0.86);\n    height: 100%;\n    padding: 0 !important;\n    margin: 0;\n    position: relative; }\n    .dat-slides-container ul.slides > li {\n      display: inline-block;\n      position: relative;\n      padding: 0;\n      vertical-align: top; }\n    .dat-slides-container ul.slides.resize {\n      -webkit-transition: all 0ms cubic-bezier(0.785, 0.135, 0.15, 0.86);\n      -moz-transition: all 0ms cubic-bezier(0.785, 0.135, 0.15, 0.86);\n      -ms-transition: all 0ms cubic-bezier(0.785, 0.135, 0.15, 0.86);\n      -o-transition: all 0ms cubic-bezier(0.785, 0.135, 0.15, 0.86);\n      transition: all 0ms cubic-bezier(0.785, 0.135, 0.15, 0.86); }\n  .dat-slides-container .navigation-container {\n    font-family: 'Terminal Dosis', sans-serif;\n    position: fixed;\n    top: 0;\n    right: 0;\n    left: 0;\n    background: #000; }\n    .dat-slides-container .navigation-container ul.navigation {\n      height: 42px;\n      line-height: 42px;\n      width: 100%;\n      margin: 0 auto;\n      padding: 0;\n      position: relative; }\n      .dat-slides-container .navigation-container ul.navigation > li:first-child {\n        border: 0;\n        margin-left: 0;\n        padding-left: 0; }\n      .dat-slides-container .navigation-container ul.navigation li {\n        list-style: none;\n        float: left;\n        color: #fff;\n        border-left: 1px solid #303030;\n        border-right: 1px solid #303030;\n        font-size: 12px;\n        font-weight: 700;\n        background: #000; }\n        .dat-slides-container .navigation-container ul.navigation li:not(:first-child) {\n          padding: 0 18px; }\n        .dat-slides-container .navigation-container ul.navigation li.last {\n          float: right;\n          border-right: 0; }\n        .dat-slides-container .navigation-container ul.navigation li a + a {\n          display: inline-block;\n          padding-left: 10px;\n          margin-left: 10px; }\n        .dat-slides-container .navigation-container ul.navigation li a#back {\n          display: block;\n          padding: 0 20px; }\n        .dat-slides-container .navigation-container ul.navigation li a:link, .dat-slides-container .navigation-container ul.navigation li a:visited {\n          color: #777777;\n          text-decoration: none;\n          text-transform: uppercase;\n          letter-spacing: 2px; }\n        .dat-slides-container .navigation-container ul.navigation li a:hover, .dat-slides-container .navigation-container ul.navigation li a:active {\n          color: #fff; }\n        .dat-slides-container .navigation-container ul.navigation li.next:hover, .dat-slides-container .navigation-container ul.navigation li.prev:hover, .dat-slides-container .navigation-container ul.navigation li.next:hover *, .dat-slides-container .navigation-container ul.navigation li.prev:hover * {\n          color: #fff !important; }\n        .dat-slides-container .navigation-container ul.navigation li.next *, .dat-slides-container .navigation-container ul.navigation li.prev * {\n          font-size: 125%;\n          color: #777777; }\n        .dat-slides-container .navigation-container ul.navigation li.next, .dat-slides-container .navigation-container ul.navigation li.prev {\n          cursor: pointer; }\n        .dat-slides-container .navigation-container ul.navigation li span {\n          font-weight: 700;\n          color: #777777;\n          letter-spacing: 1px; }\n        .dat-slides-container .navigation-container ul.navigation li#dat-slides-desc {\n          min-width: 50px;\n          color: #777777;\n          border: 0;\n          text-align: center;\n          overflow: visible; }\n          .dat-slides-container .navigation-container ul.navigation li#dat-slides-desc span {\n            color: #fff;\n            font-weight: 700;\n            letter-spacing: 3px;\n            position: relative;\n            display: inline-block; }\n\n#dat-slides-toc {\n  -webkit-transition: all 350ms cubic-bezier(0.785, 0.135, 0.15, 0.86);\n  -moz-transition: all 350ms cubic-bezier(0.785, 0.135, 0.15, 0.86);\n  -ms-transition: all 350ms cubic-bezier(0.785, 0.135, 0.15, 0.86);\n  -o-transition: all 350ms cubic-bezier(0.785, 0.135, 0.15, 0.86);\n  transition: all 350ms cubic-bezier(0.785, 0.135, 0.15, 0.86);\n  background: #000;\n  position: fixed;\n  top: 42px;\n  left: 174px;\n  border: 0;\n  overflow: hidden; }\n  #dat-slides-toc span {\n    position: absolute;\n    display: block; }\n  #dat-slides-toc ul {\n    margin: 0;\n    padding: 0; }\n  #dat-slides-toc li {\n    border-top: 1px solid #303030;\n    border-left: 0;\n    border-right: 0;\n    border-bottom: 0;\n    padding: 0;\n    text-align: left;\n    display: block;\n    margin: 0;\n    width: 100%;\n    clear: both; }\n    #dat-slides-toc li a {\n      display: block;\n      padding: 0 18px; }\n"
});
define("dat/utils/common", [], function() {
    var h = Array.prototype.forEach
      , a = Array.prototype.slice;
    return {
        BREAK: {},
        extend: function(c) {
            this.each(a.call(arguments, 1), function(a) {
                for (var f in a)
                    this.isUndefined(a[f]) || (c[f] = a[f])
            }, this);
            return c
        },
        defaults: function(c) {
            this.each(a.call(arguments, 1), function(a) {
                for (var f in a)
                    this.isUndefined(c[f]) && (c[f] = a[f])
            }, this);
            return c
        },
        compose: function() {
            var c = a.call(arguments);
            return function() {
                for (var d = a.call(arguments), f = c.length - 1; 0 <= f; f--)
                    d = [c[f].apply(this, d)];
                return d[0]
            }
        },
        each: function(a, d, f) {
            if (h && a.forEach === h)
                a.forEach(d, f);
            else if (a.length === a.length + 0)
                for (var b = 0, k = a.length; b < k && !(b in a && d.call(f, a[b], b) === this.BREAK); b++)
                    ;
            else
                for (b in a)
                    if (d.call(f, a[b], b) === this.BREAK)
                        break
        },
        defer: function(a) {
            setTimeout(a, 0)
        },
        identity: function(a) {
            return a
        },
        toArray: function(c) {
            return c.toArray ? c.toArray() : a.call(c)
        },
        isUndefined: function(a) {
            return void 0 === a
        },
        isNull: function(a) {
            return null === a
        },
        isNaN: function(a) {
            return a !== a
        },
        isArray: Array.isArray || function(a) {
            return a.constructor === Array
        }
        ,
        isObject: function(a) {
            return a === Object(a)
        },
        isNumber: function(a) {
            return a === a + 0
        },
        isString: function(a) {
            return a === a + ""
        },
        isBoolean: function(a) {
            return !1 === a || !0 === a
        },
        isFunction: function(a) {
            return "[object Function]" === Object.prototype.toString.call(a)
        }
    }
});
define("dat/dom/dom", ["dat/utils/common"], function(h) {
    function a(a) {
        if ("0" === a || h.isUndefined(a))
            return 0;
        a = a.match(b);
        return h.isNull(a) ? 0 : parseFloat(a[1])
    }
    var c = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }
      , d = {}
      , f = {};
    h.each({
        HTMLEvents: ["change"],
        MouseEvents: ["click", "mousemove", "mousedown", "mouseup", "mouseover"],
        KeyboardEvents: ["keydown"]
    }, function(a, b) {
        h.each(a, function(a) {
            f[a] = b
        })
    });
    var b = /(-?\d+(\.\d+)?)px/
      , k = {
        makeSelectable: function(a, b) {
            if (void 0 !== a && void 0 !== a.style) {
                a.onselectstart = b ? function() {
                    return !1
                }
                : function() {}
                ;
                var c = b ? "auto" : "none";
                a.style.MozUserSelect = c;
                a.style.KhtmlUserSelect = c;
                a.style.webkitUserSelect = c;
                a.style.msUserSelect = c;
                a.unselectable = b ? "on" : "off";
                return k
            }
        },
        makeFullscreen: function(a, b, c) {
            h.isUndefined(b) && (b = !0);
            h.isUndefined(c) && (c = !0);
            a.style.position = "absolute";
            b && (a.style.left = 0,
            a.style.right = 0);
            c && (a.style.top = 0,
            a.style.bottom = 0);
            return k
        },
        fakeEvent: function(a, b, c, d) {
            c = c || {};
            var k = f[b];
            if (!k)
                throw Error("Event type " + b + " not supported.");
            var l = document.createEvent(k);
            switch (k) {
            case "MouseEvents":
                l.initMouseEvent(b, c.bubbles || !1, c.cancelable || !0, window, c.clickCount || 1, 0, 0, c.x || c.clientX || 0, c.y || c.clientY || 0, !1, !1, !1, !1, 0, null);
                break;
            case "KeyboardEvents":
                k = l.initKeyboardEvent || l.initKeyEvent;
                h.defaults(c, {
                    cancelable: !0,
                    ctrlKey: !1,
                    altKey: !1,
                    shiftKey: !1,
                    metaKey: !1,
                    keyCode: void 0,
                    charCode: void 0
                });
                k(b, c.bubbles || !1, c.cancelable, window, c.ctrlKey, c.altKey, c.shiftKey, c.metaKey, c.keyCode, c.charCode);
                break;
            default:
                l.initEvent(b, c.bubbles || !1, c.cancelable || !0)
            }
            h.defaults(l, d);
            a.dispatchEvent(l)
        },
        bind: function(a, b, f, h) {
            if (a) {
                if (b in c) {
                    var A = f;
                    b = c[b];
                    f = function(a) {
                        var b = a.relatedTarget;
                        b && (b === this || k.contains(this, b)) || A.call(this, a)
                    }
                    ;
                    d[A] = f
                }
                a.addEventListener ? a.addEventListener(b, f, !!h) : a.attachEvent && a.attachEvent("on" + b, f);
                return k
            }
        },
        makeBinding: function() {
            var a = h.toArray(arguments);
            return {
                unbind: function() {
                    k.unbind.apply(this, a);
                    return this
                },
                bind: function() {
                    k.bind.apply(this, a);
                    return this
                },
                addTo: function(a) {
                    a.push(this);
                    return this
                },
                context: function(b) {
                    var c = a[2];
                    a[2] = function() {
                        c.apply(b, arguments)
                    }
                    ;
                    return this
                }
            }
        },
        unbind: function(a, b, f, x) {
            if (a) {
                if (b in c) {
                    b = c[b];
                    var A = d[f];
                    h.isFunction(A) && (f = A,
                    delete d[f])
                }
                a.removeEventListener ? a.removeEventListener(b, f, !!x) : a.detachEvent && a.detachEvent("on" + b, f);
                return k
            }
        },
        addClass: function(a, b) {
            if (void 0 === a.className)
                a.className = b;
            else if (a.className !== b) {
                var c = a.className.split(/ +/);
                -1 == c.indexOf(b) && (c.push(b),
                a.className = c.join(" ").replace(/^\s+/, "").replace(/\s+$/, ""))
            }
            return k
        },
        removeClass: function(a, b) {
            if (b) {
                if (void 0 !== a.className)
                    if (a.className === b)
                        a.removeAttribute("class");
                    else {
                        var c = a.className.split(/ +/)
                          , d = c.indexOf(b);
                        -1 != d && (c.splice(d, 1),
                        a.className = c.join(" "))
                    }
            } else
                a.className = void 0;
            return k
        },
        getClasses: function(a) {
            return a.className.split(" ")
        },
        hasClass: function(a, b) {
            return _.isElement(a) ? (new RegExp("(?:^|\\s+)" + b + "(?:\\s+|$)")).test(a.className) || !1 : !1
        },
        contains: function(a, b) {
            for (var c = b.parentNode; null !== c; ) {
                if (c === a)
                    return !0;
                c = c.parentNode
            }
            return !1
        },
        getParent: function(a) {
            return a.parentElement ? a.parentElement : a.parentNode
        },
        getRect: function(b, c) {
            var d;
            if (b.getBoundingClientRect)
                d = b.getBoundingClientRect();
            else {
                d = this.getOffset(b);
                var f = this.getWidth(b)
                  , k = this.getHeight(b)
            }
            if (c) {
                var l = getComputedStyle(b)
                  , h = a(l["margin-top"] || l.marginTop)
                  , l = a(l["margin-left"] || l.marginLeft);
                d.top -= h;
                d.left -= l
            }
            _.extend(d, {
                right: d.left + f,
                bottom: d.top + k,
                width: f,
                height: k
            });
            return d
        },
        getWidth: function(b) {
            if (b === window)
                return "innerWidth"in window ? window.innerWidth : document.documentElement.offsetWidth;
            if (b === document)
                return Math.max(document.documentElement.clientWidth, document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth);
            b = getComputedStyle(b);
            return a(b["border-left-width"] || b.borderLeftWidth) + a(b["border-right-width"] || b.borderRightWidth) + a(b["padding-left"] || b.paddingLeft) + a(b["padding-right"] || b.paddingRight) + a(b.width)
        },
        getHeight: function(b) {
            if (b === window)
                return "innerHeight"in window ? window.innerHeight : document.documentElement.offsetHeight;
            if (b === document)
                return Math.max(document.documentElement.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight);
            b = getComputedStyle(b);
            return a(b["border-top-width"] || b.borderTopWidth) + a(b["border-bottom-width"] || b.borderBottomWidth) + a(b["padding-top"] || b.paddingTop) + a(b["padding-bottom"] || b.paddingBottom) + a(b.height)
        },
        getOffset: function(a) {
            var b = {
                left: 0,
                top: 0
            };
            if (a.offsetParent) {
                do
                    b.left += a.offsetLeft,
                    b.top += a.offsetTop;
                while (a = a.offsetParent)
            }
            return b
        },
        isActive: function(a) {
            return a === document.activeElement && (a.type || a.href)
        }
    };
    return k
});
define("dat/utils/requestAnimationFrame", [], function() {
    return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(h, a) {
        window.setTimeout(h, 1E3 / 60)
    }
});
define("dat/events/Events", {
    bind: function(h, a) {
        for (var c = h.split(" "), d = 0, f = c.length; d < f; d++)
            h = c[d],
            this._callbacks || (this._callbacks = {}),
            (this._callbacks[h] || (this._callbacks[h] = [])).push(a);
        return this
    },
    unbind: function(h, a) {
        var c;
        if (!h)
            this._callbacks = {};
        else if (c = this._callbacks)
            if (a) {
                c = c[h];
                if (!c)
                    return this;
                for (var d = 0, f = c.length; d < f; d++)
                    if (a === c[d]) {
                        c.splice(d, 1);
                        break
                    }
            } else
                c[h] = [];
        return this
    },
    trigger: function(h) {
        var a, c, d, f;
        if (!(c = this._callbacks))
            return this;
        if (a = c[h])
            for (d = 0,
            f = a.length; d < f; d++)
                a[d].apply(this, Array.prototype.slice.call(arguments, 1));
        if (a = c.all)
            for (d = 0,
            f = a.length; d < f; d++)
                a[d].apply(this, arguments);
        return this
    }
});
(function() {
    var h = this
      , a = h._
      , c = {}
      , d = Array.prototype
      , f = Object.prototype
      , b = d.slice
      , k = d.unshift
      , p = f.toString
      , r = f.hasOwnProperty
      , v = d.forEach
      , x = d.map
      , A = d.reduce
      , l = d.reduceRight
      , q = d.filter
      , y = d.every
      , u = d.some
      , t = d.indexOf
      , E = d.lastIndexOf
      , f = Array.isArray
      , C = Object.keys
      , B = Function.prototype.bind
      , e = function(a) {
        return new G(a)
    };
    "undefined" !== typeof module && module.exports ? (module.exports = e,
    e._ = e) : h._ = e;
    e.VERSION = "1.1.7";
    var D = e.each = e.forEach = function(a, b, d) {
        if (null != a)
            if (v && a.forEach === v)
                a.forEach(b, d);
            else if (a.length === +a.length)
                for (var m = 0, g = a.length; m < g && !(m in a && b.call(d, a[m], m, a) === c); m++)
                    ;
            else
                for (m in a)
                    if (r.call(a, m) && b.call(d, a[m], m, a) === c)
                        break
    }
    ;
    e.map = function(a, b, c) {
        var d = [];
        if (null == a)
            return d;
        if (x && a.map === x)
            return a.map(b, c);
        D(a, function(a, n, e) {
            d[d.length] = b.call(c, a, n, e)
        });
        return d
    }
    ;
    e.reduce = e.foldl = e.inject = function(a, b, c, d) {
        var g = void 0 !== c;
        null == a && (a = []);
        if (A && a.reduce === A)
            return d && (b = e.bind(b, d)),
            g ? a.reduce(b, c) : a.reduce(b);
        D(a, function(a, n, e) {
            g ? c = b.call(d, c, a, n, e) : (c = a,
            g = !0)
        });
        if (!g)
            throw new TypeError("Reduce of empty array with no initial value");
        return c
    }
    ;
    e.reduceRight = e.foldr = function(a, b, c, d) {
        null == a && (a = []);
        if (l && a.reduceRight === l)
            return d && (b = e.bind(b, d)),
            void 0 !== c ? a.reduceRight(b, c) : a.reduceRight(b);
        a = (e.isArray(a) ? a.slice() : e.toArray(a)).reverse();
        return e.reduce(a, b, c, d)
    }
    ;
    e.find = e.detect = function(a, b, c) {
        var d;
        I(a, function(a, n, e) {
            if (b.call(c, a, n, e))
                return d = a,
                !0
        });
        return d
    }
    ;
    e.filter = e.select = function(a, b, c) {
        var d = [];
        if (null == a)
            return d;
        if (q && a.filter === q)
            return a.filter(b, c);
        D(a, function(a, n, e) {
            b.call(c, a, n, e) && (d[d.length] = a)
        });
        return d
    }
    ;
    e.reject = function(a, b, c) {
        var d = [];
        if (null == a)
            return d;
        D(a, function(a, n, e) {
            b.call(c, a, n, e) || (d[d.length] = a)
        });
        return d
    }
    ;
    e.every = e.all = function(a, b, d) {
        var e = !0;
        if (null == a)
            return e;
        if (y && a.every === y)
            return a.every(b, d);
        D(a, function(a, n, f) {
            if (!(e = e && b.call(d, a, n, f)))
                return c
        });
        return e
    }
    ;
    var I = e.some = e.any = function(a, b, d) {
        b = b || e.identity;
        var m = !1;
        if (null == a)
            return m;
        if (u && a.some === u)
            return a.some(b, d);
        D(a, function(a, n, e) {
            if (m |= b.call(d, a, n, e))
                return c
        });
        return !!m
    }
    ;
    e.include = e.contains = function(a, b) {
        var c = !1;
        if (null == a)
            return c;
        if (t && a.indexOf === t)
            return -1 != a.indexOf(b);
        I(a, function(a) {
            if (c = a === b)
                return !0
        });
        return c
    }
    ;
    e.invoke = function(a, c) {
        var d = b.call(arguments, 2);
        return e.map(a, function(a) {
            return (c.call ? c || a : a[c]).apply(a, d)
        })
    }
    ;
    e.pluck = function(a, b) {
        return e.map(a, function(a) {
            return a[b]
        })
    }
    ;
    e.max = function(a, b, c) {
        if (!b && e.isArray(a))
            return Math.max.apply(Math, a);
        var d = {
            computed: -Infinity
        };
        D(a, function(a, n, e) {
            n = b ? b.call(c, a, n, e) : a;
            n >= d.computed && (d = {
                value: a,
                computed: n
            })
        });
        return d.value
    }
    ;
    e.min = function(a, b, c) {
        if (!b && e.isArray(a))
            return Math.min.apply(Math, a);
        var d = {
            computed: Infinity
        };
        D(a, function(a, n, e) {
            n = b ? b.call(c, a, n, e) : a;
            n < d.computed && (d = {
                value: a,
                computed: n
            })
        });
        return d.value
    }
    ;
    e.sortBy = function(a, b, c) {
        return e.pluck(e.map(a, function(a, g, d) {
            return {
                value: a,
                criteria: b.call(c, a, g, d)
            }
        }).sort(function(a, b) {
            var c = a.criteria
              , d = b.criteria;
            return c < d ? -1 : c > d ? 1 : 0
        }), "value")
    }
    ;
    e.groupBy = function(a, b) {
        var c = {};
        D(a, function(a, g) {
            var d = b(a, g);
            (c[d] || (c[d] = [])).push(a)
        });
        return c
    }
    ;
    e.sortedIndex = function(a, b, c) {
        c || (c = e.identity);
        for (var d = 0, g = a.length; d < g; ) {
            var f = d + g >> 1;
            c(a[f]) < c(b) ? d = f + 1 : g = f
        }
        return d
    }
    ;
    e.toArray = function(a) {
        return a ? a.toArray ? a.toArray() : e.isArray(a) || e.isArguments(a) ? b.call(a) : e.values(a) : []
    }
    ;
    e.size = function(a) {
        return e.toArray(a).length
    }
    ;
    e.first = e.head = function(a, c, d) {
        return null == c || d ? a[0] : b.call(a, 0, c)
    }
    ;
    e.rest = e.tail = function(a, c, d) {
        return b.call(a, null == c || d ? 1 : c)
    }
    ;
    e.last = function(a) {
        return a[a.length - 1]
    }
    ;
    e.compact = function(a) {
        return e.filter(a, function(a) {
            return !!a
        })
    }
    ;
    e.flatten = function(a) {
        return e.reduce(a, function(a, b) {
            if (e.isArray(b))
                return a.concat(e.flatten(b));
            a[a.length] = b;
            return a
        }, [])
    }
    ;
    e.without = function(a) {
        return e.difference(a, b.call(arguments, 1))
    }
    ;
    e.uniq = e.unique = function(a, b) {
        return e.reduce(a, function(a, c, g) {
            0 != g && (!0 === b ? e.last(a) == c : e.include(a, c)) || (a[a.length] = c);
            return a
        }, [])
    }
    ;
    e.union = function() {
        return e.uniq(e.flatten(arguments))
    }
    ;
    e.intersection = e.intersect = function(a) {
        var c = b.call(arguments, 1);
        return e.filter(e.uniq(a), function(a) {
            return e.every(c, function(b) {
                return 0 <= e.indexOf(b, a)
            })
        })
    }
    ;
    e.difference = function(a, b) {
        return e.filter(a, function(a) {
            return !e.include(b, a)
        })
    }
    ;
    e.zip = function() {
        for (var a = b.call(arguments), c = e.max(e.pluck(a, "length")), d = Array(c), f = 0; f < c; f++)
            d[f] = e.pluck(a, "" + f);
        return d
    }
    ;
    e.indexOf = function(a, b, c) {
        if (null == a)
            return -1;
        var d;
        if (c)
            return c = e.sortedIndex(a, b),
            a[c] === b ? c : -1;
        if (t && a.indexOf === t)
            return a.indexOf(b);
        c = 0;
        for (d = a.length; c < d; c++)
            if (a[c] === b)
                return c;
        return -1
    }
    ;
    e.lastIndexOf = function(a, b) {
        if (null == a)
            return -1;
        if (E && a.lastIndexOf === E)
            return a.lastIndexOf(b);
        for (var c = a.length; c--; )
            if (a[c] === b)
                return c;
        return -1
    }
    ;
    e.range = function(a, b, c) {
        1 >= arguments.length && (b = a || 0,
        a = 0);
        c = arguments[2] || 1;
        for (var d = Math.max(Math.ceil((b - a) / c), 0), g = 0, e = Array(d); g < d; )
            e[g++] = a,
            a += c;
        return e
    }
    ;
    e.bind = function(a, c) {
        if (a.bind === B && B)
            return B.apply(a, b.call(arguments, 1));
        var d = b.call(arguments, 2);
        return function() {
            return a.apply(c, d.concat(b.call(arguments)))
        }
    }
    ;
    e.bindAll = function(a) {
        var c = b.call(arguments, 1);
        0 == c.length && (c = e.functions(a));
        D(c, function(b) {
            a[b] = e.bind(a[b], a)
        });
        return a
    }
    ;
    e.memoize = function(a, b) {
        var c = {};
        b || (b = e.identity);
        return function() {
            var d = b.apply(this, arguments);
            return r.call(c, d) ? c[d] : c[d] = a.apply(this, arguments)
        }
    }
    ;
    e.delay = function(a, c) {
        var d = b.call(arguments, 2);
        return setTimeout(function() {
            return a.apply(a, d)
        }, c)
    }
    ;
    e.defer = function(a) {
        return e.delay.apply(e, [a, 1].concat(b.call(arguments, 1)))
    }
    ;
    var F = function(a, b, c) {
        var d;
        return function() {
            var g = this
              , e = arguments
              , f = function() {
                d = null;
                a.apply(g, e)
            };
            c && clearTimeout(d);
            if (c || !d)
                d = setTimeout(f, b)
        }
    };
    e.throttle = function(a, b) {
        return F(a, b, !1)
    }
    ;
    e.debounce = function(a, b) {
        return F(a, b, !0)
    }
    ;
    e.once = function(a) {
        var b = !1, c;
        return function() {
            if (b)
                return c;
            b = !0;
            return c = a.apply(this, arguments)
        }
    }
    ;
    e.wrap = function(a, c) {
        return function() {
            var d = [a].concat(b.call(arguments));
            return c.apply(this, d)
        }
    }
    ;
    e.compose = function() {
        var a = b.call(arguments);
        return function() {
            for (var c = b.call(arguments), d = a.length - 1; 0 <= d; d--)
                c = [a[d].apply(this, c)];
            return c[0]
        }
    }
    ;
    e.after = function(a, b) {
        return function() {
            if (1 > --a)
                return b.apply(this, arguments)
        }
    }
    ;
    e.keys = C || function(a) {
        if (a !== Object(a))
            throw new TypeError("Invalid object");
        var b = [], c;
        for (c in a)
            r.call(a, c) && (b[b.length] = c);
        return b
    }
    ;
    e.values = function(a) {
        return e.map(a, e.identity)
    }
    ;
    e.functions = e.methods = function(a) {
        var b = [], c;
        for (c in a)
            e.isFunction(a[c]) && b.push(c);
        return b.sort()
    }
    ;
    e.extend = function(a) {
        D(b.call(arguments, 1), function(b) {
            for (var c in b)
                void 0 !== b[c] && (a[c] = b[c])
        });
        return a
    }
    ;
    e.defaults = function(a) {
        D(b.call(arguments, 1), function(b) {
            for (var c in b)
                null == a[c] && (a[c] = b[c])
        });
        return a
    }
    ;
    e.clone = function(a) {
        return e.isArray(a) ? a.slice() : e.extend({}, a)
    }
    ;
    e.tap = function(a, b) {
        b(a);
        return a
    }
    ;
    e.isEqual = function(a, b) {
        if (a === b)
            return !0;
        var c = typeof a;
        if (c != typeof b)
            return !1;
        if (a == b)
            return !0;
        if (!a && b || a && !b)
            return !1;
        a._chain && (a = a._wrapped);
        b._chain && (b = b._wrapped);
        if (a.isEqual)
            return a.isEqual(b);
        if (b.isEqual)
            return b.isEqual(a);
        if (e.isDate(a) && e.isDate(b))
            return a.getTime() === b.getTime();
        if (e.isNaN(a) && e.isNaN(b))
            return !1;
        if (e.isRegExp(a) && e.isRegExp(b))
            return a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline;
        if ("object" !== c || a.length && a.length !== b.length)
            return !1;
        var c = e.keys(a)
          , d = e.keys(b);
        if (c.length != d.length)
            return !1;
        for (var g in a)
            if (!(g in b && e.isEqual(a[g], b[g])))
                return !1;
        return !0
    }
    ;
    e.isEmpty = function(a) {
        if (e.isArray(a) || e.isString(a))
            return 0 === a.length;
        for (var b in a)
            if (r.call(a, b))
                return !1;
        return !0
    }
    ;
    e.isElement = function(a) {
        return !(!a || 1 != a.nodeType)
    }
    ;
    e.isArray = f || function(a) {
        return "[object Array]" === p.call(a)
    }
    ;
    e.isObject = function(a) {
        return a === Object(a)
    }
    ;
    e.isArguments = function(a) {
        return !(!a || !r.call(a, "callee"))
    }
    ;
    e.isFunction = function(a) {
        return !!(a && a.constructor && a.call && a.apply)
    }
    ;
    e.isString = function(a) {
        return !!("" === a || a && a.charCodeAt && a.substr)
    }
    ;
    e.isNumber = function(a) {
        return !!(0 === a || a && a.toExponential && a.toFixed)
    }
    ;
    e.isNaN = function(a) {
        return a !== a
    }
    ;
    e.isBoolean = function(a) {
        return !0 === a || !1 === a
    }
    ;
    e.isDate = function(a) {
        return !!(a && a.getTimezoneOffset && a.setUTCFullYear)
    }
    ;
    e.isRegExp = function(a) {
        return !(!(a && a.test && a.exec) || !a.ignoreCase && !1 !== a.ignoreCase)
    }
    ;
    e.isNull = function(a) {
        return null === a
    }
    ;
    e.isUndefined = function(a) {
        return void 0 === a
    }
    ;
    e.noConflict = function() {
        h._ = a;
        return this
    }
    ;
    e.identity = function(a) {
        return a
    }
    ;
    e.times = function(a, b, c) {
        for (var d = 0; d < a; d++)
            b.call(c, d)
    }
    ;
    e.mixin = function(a) {
        D(e.functions(a), function(b) {
            M(b, e[b] = a[b])
        })
    }
    ;
    var O = 0;
    e.uniqueId = function(a) {
        var b = O++;
        return a ? a + b : b
    }
    ;
    e.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g
    };
    e.template = function(a, b) {
        var c = e.templateSettings
          , c = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + a.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(c.interpolate, function(a, b) {
            return "'," + b.replace(/\\'/g, "'") + ",'"
        }).replace(c.evaluate || null, function(a, b) {
            return "');" + b.replace(/\\'/g, "'").replace(/[\r\n\t]/g, " ") + "__p.push('"
        }).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');"
          , c = new Function("obj",c);
        return b ? c(b) : c
    }
    ;
    var G = function(a) {
        this._wrapped = a
    };
    e.prototype = G.prototype;
    var w = function(a, b) {
        return b ? e(a).chain() : a
    }
      , M = function(a, c) {
        G.prototype[a] = function() {
            var a = b.call(arguments);
            k.call(a, this._wrapped);
            return w(c.apply(e, a), this._chain)
        }
    };
    e.mixin(e);
    D("pop push reverse shift sort splice unshift".split(" "), function(a) {
        var b = d[a];
        G.prototype[a] = function() {
            b.apply(this._wrapped, arguments);
            return w(this._wrapped, this._chain)
        }
    });
    D(["concat", "join", "slice"], function(a) {
        var b = d[a];
        G.prototype[a] = function() {
            return w(b.apply(this._wrapped, arguments), this._chain)
        }
    });
    G.prototype.chain = function() {
        this._chain = !0;
        return this
    }
    ;
    G.prototype.value = function() {
        return this._wrapped
    }
})();
define("underscore", function() {});
define("dat/utils/urlArgs", ["underscore"], function() {
    var h = {}, a = {}, c = {}, d;
    h.getBoolean = function(c, b) {
        return a.hasOwnProperty(c) ? a.hasOwnProperty(c) && "false" !== a[c] && "0" !== a[c] || "1" === a[c] || "true" === a[c] || !1 : b
    }
    ;
    h.getFloat = function(c, b) {
        var d = parseFloat(a[c]);
        return _.isNaN(d) ? b || 0 : d
    }
    ;
    h.getInt = function(c, b) {
        var d = parseInt(a[c]);
        return _.isNaN(d) ? b || 0 : d
    }
    ;
    h.getHash = function() {
        return location.hash ? location.hash.substr(1) : location.hash
    }
    ;
    h.refresh = function(a, b) {
        var k = [];
        _.extend(c, a);
        _.each(c, function(a, b) {
            k.push(b + "=" + a)
        });
        window.location.href = (b || d) + "?" + k.join("&")
    }
    ;
    h.update = function() {
        a = {};
        c = {};
        d = window.location.href.substr(0, window.location.href.indexOf("?"));
        window.location.search.replace(RegExp("([^?=&]+)(=([^&]*))?", "g"), function(d, b, k, h) {
            a[b] = h;
            c[b] = h
        });
        h.result = a
    }
    ;
    h.get = function(c) {
        this.update();
        return a[c]
    }
    ;
    h.update();
    return h
});
define("dat/utils/System", ["underscore"], function() {
    function h(a) {
        var f = [];
        _.each(a, function(a, d) {
            a.test(c) && f.push(d)
        });
        return _.isEmpty(f) ? !1 : _.first(f)
    }
    var a = {}
      , c = navigator.userAgent;
    a.Browsers = {
        Arora: /Arora/,
        Chrome: /Chrome/,
        "Chrome iOS": /CriOS/,
        Epiphany: /Epiphany/,
        Firefox: /Firefox/,
        "Mobile Safari": /Mobile Safari/,
        "Internet Explorer": /MSIE/,
        Midori: /Midori/,
        Opera: /Opera/,
        Safari: /Safari/
    };
    a.OS = {
        Android: /Android/,
        "Chrome OS": /CrOS/,
        iOS: /iP[ao]d|iPhone/i,
        Linux: /Linux/,
        "Mac OS": /Mac OS/,
        Windows: /windows/
    };
    a.browser = h(a.Browsers);
    a.version = function() {
        var a = c, f = parseFloat(navigator.appVersion), b = parseInt(navigator.appVersion, 10), k;
        -1 != (b = a.indexOf("Opera")) ? (f = a.substring(b + 6),
        -1 != (b = a.indexOf("Version")) && (f = a.substring(b + 8))) : -1 != (b = a.indexOf("MSIE")) ? f = a.substring(b + 5) : -1 != (b = a.indexOf("Chrome")) ? f = a.substring(b + 7) : -1 != (b = a.indexOf("Safari")) ? (f = a.substring(b + 7),
        -1 != (b = a.indexOf("Version")) && (f = a.substring(b + 8))) : -1 != (b = a.indexOf("Firefox")) ? f = a.substring(b + 8) : a.lastIndexOf(" ") + 1 < (b = a.lastIndexOf("/")) && (f = a.substring(b + 1));
        -1 != (k = f.indexOf(";")) && (f = f.substring(0, k));
        -1 != (k = f.indexOf(" ")) && (f = f.substring(0, k));
        b = parseInt("" + f, 10);
        isNaN(b) && (f = parseFloat(navigator.appVersion),
        b = parseInt(navigator.appVersion, 10));
        return {
            full: f,
            major: b
        }
    }();
    a.os = h(a.OS);
    a.supports = {
        canvas: !!window.CanvasRenderingContext2D,
        localStorage: !!localStorage.getItem,
        file: !!window.File && !!window.FileReader && !!window.FileList && !!window.Blob,
        fileSystem: !!window.requestFileSystem,
        requestAnimationFrame: !!window.mozRequestAnimationFrame || !!window.webkitRequestAnimationFrame || !!window.oRequestAnimationFrame || !!window.msRequestAnimationFrame,
        sessionStorage: !!sessionStorage.getItem,
        webgl: !!window.WebGLRenderingContext,
        worker: !!window.Worker
    };
    return a
});
define("dat/slides/Slides", "dat/utils/css text!dat/slides/style.css dat/dom/dom dat/utils/requestAnimationFrame dat/events/Events dat/utils/urlArgs dat/utils/System underscore".split(" "), function(h, a, c, d, f, b, k) {
    function p(a) {
        var b = a.navContainer = document.createElement("div")
          , d = document.createElement("ul");
        c.addClass(b, "navigation-container").addClass(d, "navigation").makeSelectable(b, !1);
        var f = a.desc = document.createElement("li");
        c.addClass(f, "desc");
        f.setAttribute("id", "dat-slides-desc");
        f.innerHTML = '<span></span><div id="dat-slides-toc"></div>';
        var k = a._next = document.createElement("li");
        k.innerHTML = '<span id="s1-next-slide"></span><a>&rarr;</a>';
        var h = a._previous = document.createElement("li");
        h.innerHTML = '<a>&larr;</a><span id="s1-prev-slide"></span>';
        d.appendChild(h);
        d.appendChild(f);
        d.appendChild(k);
        c.addClass(k, "next").addClass(h, "prev").addClass(a.domElement, "auto-ui").bind(k, "click", function(b) {
            a.next()
        }).bind(h, "click", function(b) {
            a.prev()
        });
        b.appendChild(d);
        a.domElement.appendChild(b)
    }
    function r(a) {
        _.isElement(a.desc) && (a.desc.firstChild.innerHTML = a.cid() + 1 + "/" + a.deck.length);
        a.onChange.call(this)
    }
    function v(a) {
        return "Firefox" === k.browser ? 0 : a.navContainer ? c.getHeight(a.navContainer) : 0
    }
    var x = function(a, b, d) {
        this.domElement = document.createElement("li");
        _.isElement(a) ? this.domElement.appendChild(a) : this.domElement.innerHTML = a;
        c.addClass(this.domElement, "slide");
        this.domElement.width = this.domElement.style.width = d;
        this.update = b
    };
    b = function(b) {
        function f() {
            d(f);
            !_.isUndefined(k.active) && _.isFunction(k.active.update) && k.active.update()
        }
        var k = this
          , x = _.defaults(b || {}, {
            css: "",
            container: document.body,
            transition: function(a) {
                _.extend(k.domElement.firstChild.style, {
                    marginLeft: -c.getWidth(k.domElement) * k.cid() + "px"
                })
            },
            loopKeys: !1,
            onChange: _.identity,
            autoUI: !1
        });
        this.__loopKeys = x.loopKeys;
        h.inject(x.css || a);
        b = this.domElement = document.createElement("div");
        c.addClass(b, "dat-slides-container");
        b.innerHTML = '<ul class="slides"></ul>';
        x.container.appendChild(b);
        c.makeFullscreen(b);
        this.deck = [];
        this.urlMap = [];
        this.onLoadUrl = window.location.hash;
        x.autoUI && p(this);
        c.bind(window, "keyup", function(a) {
            if ("text" !== document.activeElement.type)
                switch (a.which) {
                case 37:
                    if (!k.__loopKeys && 0 == k.cid())
                        break;
                    k.prev();
                    break;
                case 39:
                    (k.__loopKeys || k.cid() != k.deck.length - 1) && k.next()
                }
        });
        this.transition = function(a) {
            x.transition.call(a)
        }
        ;
        this.transitioning = !1;
        this.onChange = x.onChange;
        var r = _.debounce(function() {
            c.removeClass(k.domElement.firstChild, "resize")
        }, 500);
        c.bind(window, "popstate", function(a) {
            a = window.location.hash.toString();
            for (var b = 0, c = k.urlMap.length; b < c; b++)
                if (a === k.urlMap[b]) {
                    k.activate(b, !0);
                    break
                }
        }).bind(window, "resize", function(a) {
            var b = c.getWidth(k.domElement)
              , d = c.getHeight(k.domElement) - v(k);
            c.addClass(k.domElement.firstChild, "resize");
            _.extend(k.domElement.firstChild.style, {
                marginLeft: -b * k.cid() + "px",
                width: b * k.deck.length + 5E3 + "px"
            });
            _.each(k.deck, function(a) {
                _.extend(a.domElement.style, {
                    overflowX: "auto",
                    height: d + "px",
                    width: b + "px"
                })
            });
            r()
        });
        f()
    }
    ;
    _.extend(b.prototype, f, {
        activate: function(a, b) {
            _.isUndefined(a) && (a = 0);
            this.active = this.deck[a];
            this.transition(this.active);
            r(this);
            history && !b && (window.location.hash = this.urlMap[a]);
            this.trigger("activated", {
                index: a
            })
        },
        add: function(a, b) {
            var d = c.getWidth(this.domElement)
              , f = c.getHeight(this.domElement) - v(this)
              , k = new x(a,b,d);
            _.extend(this.domElement.firstChild.style, {
                width: d * this.deck.length + 5E3 + "px"
            });
            _.extend(k.domElement.style, {
                width: d + "px",
                height: f + "px",
                overflow: "auto"
            });
            d = this.deck.length;
            f = a.querySelector("h1").innerHTML || "slide " + d;
            this.urlMap.push("#" + f.replace(/[\ \W\s]/g, "-"));
            this.deck.push(k);
            this.domElement.firstChild.appendChild(k.domElement);
            1 >= this.deck.length ? this.activate(0) : this.onLoadUrl === this.urlMap[d] && this.activate(d);
            r(this);
            return this
        },
        at: function(a) {
            return this.deck[a]
        },
        cid: function() {
            return this.indexOf(this.active)
        },
        indexOf: function(a) {
            return _.indexOf(this.deck, a)
        },
        next: function() {
            var a = (this.cid() + 1) % this.deck.length;
            this.activate(a)
        },
        prev: function() {
            var a = this.cid() - 1;
            0 > a && (a = this.deck.length - 1);
            this.activate(a)
        }
    });
    return b
});
define("text!examples/gui/contents.html", [], function() {
    return "<!DOCTYPE html>\n<html>\n<head>\n  <title></title>\n  <link rel=\"stylesheet\" href=\"../../css/examples.css\"/>\n  <script type=\"text/javascript\" src=\"../../third-party/prettify.js\">\x3c/script>\n</head>\n<body onload=\"prettyPrint()\">\n\n<article>\n\n  <h1>1. Basic Usage</h1>\n\n  <p>With very little code, dat.GUI creates an interface that you can use\n    to modify variables.</p>\n\n  <pre class=\"prettyprint lang-js\">&lt;script type=&quot;text/javascript&quot; src=&quot;dat.gui.js&quot;&gt;&lt;/script&gt;\n&lt;script type=&quot;text/javascript&quot;&gt;\n    \nvar FizzyText = function() {\n  this.message = 'dat.gui';\n  this.speed = 0.8;\n  this.displayOutline = false;\n  this.explode = function() { ... };\n  // Define render logic ...\n};\n\nwindow.onload = function() {\n  var text = new FizzyText();\n  var gui = new dat.GUI();\n  gui.add(text, 'message');\n  gui.add(text, 'speed', -5, 5);\n  gui.add(text, 'displayOutline');\n  gui.add(text, 'explode');\n};\n    \n&lt;/script&gt;</pre>\n\n  <ul>\n    <li>The property must be public, i.e. defined by <code class=\"prettyprint lang-js\">this.prop = value</code></li>\n    <li>dat.GUI determines controller type based on a property's initial value</li>\n    <li>Press H to show/hide all GUI's.</li>\n  </ul>\n\n</article>\n\n<article>\n  <h1>2. Constraining Input</h1>\n\n  <p>You can specify limits on numbers. A number with a min and max value becomes a slider. </p>\n\n  <pre class=\"prettyprint rag-top rag-bottom lang-js\">gui.add(text, 'noiseStrength').step(5); // Increment amount\ngui.add(text, 'growthSpeed', -5, 5); // Min and max\ngui.add(text, 'maxSize').min(0).step(0.25); // Mix and match</pre>\n\n  <p>You can also choose to select from a dropdown of values for both numbers\n    and strings.</p>\n\n  <pre class=\"prettyprint rag-top rag-bottom lang-js\">\n// Choose from accepted values\ngui.add(text, 'message', [ 'pizza', 'chrome', 'hooray' ] );\n\n// Choose from named values\ngui.add(text, 'speed', { Stopped: 0, Slow: 0.1, Fast: 5 } );</pre>\n\n</article>\n\n<article>\n  <h1>3. Folders</h1>\n\n  <p>You can nest as many GUI's as you please. Nested GUI's act as collapsible folders.</p>\n\n  <pre class=\"prettyprint  rag-top rag-bottom lang-js\">var gui = new dat.GUI();\n\nvar f1 = gui.addFolder('Flow Field');\nf1.add(text, 'speed');\nf1.add(text, 'noiseStrength');\n\nvar f2 = gui.addFolder('Letters');\nf2.add(text, 'growthSpeed');\nf2.add(text, 'maxSize');\nf2.add(text, 'message');\n\nf2.open();</pre>\n\n</article>\n\n\n<article>\n  <h1>4. Color Controllers</h1>\n\n  <p><code>dat.GUI</code> has a color selector and understands many\n    different representations of color. The following creates color\n    controllers for color variables of different formats.</p>\n\n  <pre class=\"prettyprint rag-top rag-bottom lang-js\">var FizzyText = function() {\n\n  this.color0 = \"#ffae23\"; // CSS string\n  this.color1 = [ 0, 128, 255 ]; // RGB array\n  this.color2 = [ 0, 128, 255, 0.3 ]; // RGB with alpha\n  this.color3 = { h: 350, s: 0.9, v: 0.3 }; // Hue, saturation, value\n\n  // Define render logic ...\n\n};\n\nwindow.onload = function() {\n\n  var text = new FizzyText();\n  var gui = new dat.GUI();\n\n  gui.addColor(text, 'color0');\n  gui.addColor(text, 'color1');\n  gui.addColor(text, 'color2');\n  gui.addColor(text, 'color3');\n\n};</pre>\n\n  <p><code>dat.GUI</code> will modify colors in the format defined by their\n    initial value. </p>\n\n</article>\n\n<article>\n  <h1>5. Saving Values</h1>\n\n  <p>Add a save menu to the GUI interface by calling <code>gui.remember</code>\n    on all the objects you've added to the GUI.</p>\n\n  <pre class=\"prettyprint rag-bottom lang-js\">var fizzyText = new FizzyText();\nvar gui = new dat.GUI();\n\ngui.remember(fizzyText);\n\n// Add controllers ...</pre>\n\n  <p>Click the <span id=\"save-icon\"> </span> icon to change your save settings. You can either save your\n    GUI's values to <code>localStorage</code>, or by copying and pasting a JSON\n    object into your source code as follows:</p>\n\n  <pre class=\"prettyprint rag-bottom lang-js\">var fizzyText = new FizzyText();\nvar gui = new dat.GUI({ load: JSON });\n\ngui.remember(fizzyText);\n\n// Add controllers ...</pre>\n\n</article>\n\n<article>\n  <h1>6. Presets</h1>\n\n  <p>The save menu also allows you to save all of your settings as presets.\n    Click <strong>Save</strong> to modify the current preset, or <strong>New</strong> to create a new\n    preset from existing settings. Clicking <strong>Revert</strong> will clear all unsaved changes to the current preset.</p>\n\n  <p>Switch between presets using the dropdown in the save menu. You can specify\n    the default preset as follows:</p>\n\n  <pre class=\"prettyprint rag-top rag-bottom lang-js\">var gui = new dat.GUI({\n  load: JSON,\n  preset: 'Flow'\n});</pre>\n\n  <p class=\"caution\">A word of caution about <code>localStorage</code>:</p><p>Paste the JSON save object into your source frequently. Using <code>localStorage</code> to save presets can make you faster, but its easy to lose your settings by clearing browsing data, changing browsers, or even by changing the URL of the page you're working on.</p>\n\n  \x3c!-- <p>These functions can also be triggered programmatically.</p> --\x3e\n\n  \x3c!-- <pre>\n        gui.save(); // Modify current settings\n        gui.saveAs('New Preset Name'); // New preset\n      </pre> --\x3e\n\n</article>\n\n<article>\n  <h1>7. Events</h1>\n\n  <p>You can listen for events on individual controllers using an event listener\n    syntax.</p>\n\n  <pre class=\"prettyprint rag-top rag-bottom lang-js\">var controller = gui.add(fizzyText, 'maxSize', 0, 10);\n\ncontroller.onChange(function(value) {\n  // Fires on every change, drag, keypress, etc.\n});\n\ncontroller.onFinishChange(function(value) {\n  // Fires when a controller loses focus.\n  alert(\"The new value is \" + value);\n});</pre>\n</p>\n</article>\n\n<article>\n  <h1>8. Custom Placement</h1>\n\n  <p>By default, dat.GUI panels are created with fixed position, and are\n    automatically appended to a DOM Element of dat.GUI's creation.</p>\n\n  <p>You can change this behavior by setting the <code>autoPlace</code>\n    parameter to <code>false</code>.\n\n    <pre class=\"prettyprint rag-bottom lang-js\">var gui = new dat.GUI({ autoPlace: false });\n\nvar customContainer = document.getElementById('my-gui-container');\ncustomContainer.appendChild(gui.domElement);</pre>\n\n\n</article>\n\n<article>\n  <h1>9. Updating the Display Automatically</h1>\n\n  <p>If you'd like controllers to react to changes made outside of the GUI, use\n    the <code>listen</code> method.\n  <pre class=\"prettyprint rag-top rag-bottom lang-js\">var fizzyText = new FizzyText();\nvar gui = new dat.GUI();\n\ngui.add(fizzyText, 'noiseStrength', 0, 100).listen();\n\nvar update = function() {\n  requestAnimationFrame(update);\n  fizzyText.noiseStrength = Math.random();\n};\n\nupdate();</pre>\n  <p>Calling <code>listen</code> on a controller adds it to an internal interval\n    of dat.GUI's creation. This interval checks for changes to a property's\n    value every frame, so if reading that property is expensive, this can be\n    very slow.</p>\n</article>\n\n<article>\n  <h1>10. Updating the Display Manually</h1>\n\n  <p>If you'd like to update controllers in a loop of your own definition, use\n    the <code>updateDisplay</code> method.</p>\n  <pre class=\"prettyprint rag-top rag-bottom lang-js\">var fizzyText = new FizzyText();\nvar gui = new dat.GUI();\n\ngui.add(fizzyText, 'noiseStrength', 0, 100);\n\nvar update = function() {\n\n  requestAnimationFrame(update);\n  fizzyText.noiseStrength = Math.cos(Date.getTime());\n\n  // Iterate over all controllers\n  for (var i in gui.__controllers) {\n    gui.__controllers[i].updateDisplay();\n  }\n\n};\n\nupdate();</pre>\n\n</article>\n</body>\n</html>"
});
define("text!dat/gui/saveDialogue.html", [], function() {
    return '<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>'
});
define("dat/controllers/Controller", ["dat/utils/common", "dat/dom/dom"], function(h, a) {
    var c = function(a, c) {
        this.initialValue = a[c];
        this.domElement = document.createElement("div");
        this.object = a;
        this.property = c;
        this.__onFinishChange = this.__onChange = void 0
    };
    h.extend(c.prototype, {
        onChange: function(a) {
            this.__onChange = a;
            return this
        },
        onFinishChange: function(a) {
            this.__onFinishChange = a;
            return this
        },
        setValue: function(a, c) {
            c || (this.object[this.property] = a);
            this.__onChange && this.__onChange.call(this, a);
            this.updateDisplay();
            return this
        },
        getValue: function() {
            return this.object[this.property]
        },
        updateDisplay: function() {
            return this
        },
        isModified: function() {
            return this.initialValue !== this.getValue()
        }
    });
    return c
});
define("dat/controllers/OptionController", ["dat/controllers/Controller", "dat/dom/dom", "dat/utils/common"], function(h, a, c) {
    var d = function(f, b, k) {
        d.superclass.call(this, f, b);
        var h = this;
        this.__select = document.createElement("select");
        if (c.isArray(k)) {
            var r = {};
            c.each(k, function(a) {
                r[a] = a
            });
            k = r
        }
        c.each(k, function(a, b) {
            var c = document.createElement("option");
            c.innerHTML = b;
            c.setAttribute("value", a);
            h.__select.appendChild(c)
        });
        this.updateDisplay();
        a.bind(this.__select, "change", function() {
            h.setValue(this.options[this.selectedIndex].value)
        });
        this.domElement.appendChild(this.__select)
    };
    d.superclass = h;
    c.extend(d.prototype, h.prototype, {
        setValue: function(a) {
            a = d.superclass.prototype.setValue.call(this, a);
            this.__onFinishChange && this.__onFinishChange.call(this, this.getValue());
            return a
        },
        updateDisplay: function() {
            this.__select.value = this.getValue();
            return d.superclass.prototype.updateDisplay.call(this)
        }
    });
    return d
});
define("dat/controllers/NumberController", ["dat/controllers/Controller", "dat/utils/common"], function(h, a) {
    var c = function(d, f, b) {
        c.superclass.call(this, d, f);
        b = b || {};
        this.__min = b.min;
        this.__max = b.max;
        this.__step = b.step;
        a.isUndefined(this.__step) ? this.__impliedStep = 0 == this.initialValue ? 1 : Math.pow(10, Math.floor(Math.log(this.initialValue) / Math.LN10)) / 10 : this.__impliedStep = this.__step;
        d = this.__impliedStep;
        d = d.toString();
        d = -1 < d.indexOf(".") ? d.length - d.indexOf(".") - 1 : 0;
        this.__precision = d
    };
    c.superclass = h;
    a.extend(c.prototype, h.prototype, {
        setValue: function(a) {
            void 0 !== this.__min && a < this.__min ? a = this.__min : void 0 !== this.__max && a > this.__max && (a = this.__max);
            void 0 !== this.__step && 0 != a % this.__step && (a = Math.round(a / this.__step) * this.__step);
            return c.superclass.prototype.setValue.call(this, a)
        },
        min: function(a) {
            this.__min = a;
            return this
        },
        max: function(a) {
            this.__max = a;
            return this
        },
        step: function(a) {
            this.__step = this.__impliedStep = a;
            return this
        }
    });
    return c
});
define("dat/controllers/NumberControllerBox", ["dat/controllers/NumberController", "dat/dom/dom", "dat/utils/common"], function(h, a, c) {
    var d = function(f, b, k) {
        function h() {
            var a = parseFloat(A.__input.value);
            c.isNaN(a) || A.setValue(a)
        }
        function r() {
            h();
            A.__onFinishChange && A.__onFinishChange.call(A, A.getValue())
        }
        function v(a) {
            var b = l - a.clientY;
            A.setValue(A.getValue() + b * A.__impliedStep);
            l = a.clientY
        }
        function x() {
            a.unbind(window, "mousemove", v);
            a.unbind(window, "mouseup", x)
        }
        this.__truncationSuspended = !1;
        d.superclass.call(this, f, b, k);
        var A = this, l;
        this.__input = document.createElement("input");
        this.__input.setAttribute("type", "text");
        a.bind(this.__input, "change", h);
        a.bind(this.__input, "blur", r);
        a.bind(this.__input, "mousedown", function(b) {
            a.bind(window, "mousemove", v);
            a.bind(window, "mouseup", x);
            l = b.clientY
        });
        a.bind(this.__input, "keydown", function(a) {
            13 === a.keyCode && (A.__truncationSuspended = !0,
            r(),
            A.__truncationSuspended = !1)
        });
        this.updateDisplay();
        this.domElement.appendChild(this.__input)
    };
    d.superclass = h;
    c.extend(d.prototype, h.prototype, {
        updateDisplay: function() {
            var a = this.__input, b;
            if (this.__truncationSuspended)
                b = this.getValue();
            else {
                b = this.getValue();
                var c = Math.pow(10, this.__precision);
                b = Math.round(b * c) / c
            }
            a.value = b;
            return d.superclass.prototype.updateDisplay.call(this)
        }
    });
    return d
});
define("text!dat/controllers/NumberControllerSlider.css", [], function() {
    return ".slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 100%;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}"
});
define("dat/controllers/NumberControllerSlider", ["dat/controllers/NumberController", "dat/dom/dom", "dat/utils/css", "dat/utils/common", "text!dat/controllers/NumberControllerSlider.css"], function(h, a, c, d, f) {
    function b(a, b, c, d, f) {
        return d + (a - b) / (c - b) * (f - d)
    }
    var k = function(c, d, f, h, A, l, q) {
        function y(c) {
            c.preventDefault();
            var d = a.getOffset(t.__background)
              , f = a.getWidth(t.__background);
            t.__normalized = b(c.clientX, d.left, d.left + f, 0, 1);
            c = t.__curve(t.__normalized);
            t.setValue(b(c, 0, 1, t.__min, t.__max));
            return !1
        }
        function u() {
            a.unbind(window, "mousemove", y);
            a.unbind(window, "mouseup", u);
            t.__onFinishChange && t.__onFinishChange.call(t, t.getValue())
        }
        k.superclass.call(this, c, d, {
            min: f,
            max: h,
            step: A
        });
        var t = this;
        this.__background = document.createElement("div");
        this.__foreground = document.createElement("div");
        this.__curve = l || function(a) {
            return a
        }
        ;
        this.__invCurve = q || function(a) {
            return a
        }
        ;
        a.bind(this.__background, "mousedown", function(b) {
            a.bind(window, "mousemove", y);
            a.bind(window, "mouseup", u);
            y(b)
        });
        a.addClass(this.__background, "slider");
        a.addClass(this.__foreground, "slider-fg");
        this.updateDisplay();
        this.__background.appendChild(this.__foreground);
        this.domElement.appendChild(this.__background)
    };
    k.superclass = h;
    k.useDefaultStyles = function() {
        c.inject(f)
    }
    ;
    d.extend(k.prototype, h.prototype, {
        updateDisplay: function() {
            var a = (this.getValue() - this.__min) / (this.__max - this.__min);
            this.__foreground.style.width = 100 * this.__invCurve(a) + "%";
            return k.superclass.prototype.updateDisplay.call(this)
        },
        curve: function(a, b) {
            this.__curve = a;
            this.__invCurve = b;
            return this
        }
    });
    return k
});
define("dat/controllers/StringController", ["dat/controllers/Controller", "dat/dom/dom", "dat/utils/common"], function(h, a, c) {
    var d = function(c, b) {
        function k() {
            h.setValue(h.__input.value)
        }
        d.superclass.call(this, c, b);
        var h = this;
        this.__input = document.createElement("input");
        this.__input.setAttribute("type", "text");
        a.bind(this.__input, "keyup", k);
        a.bind(this.__input, "change", k);
        a.bind(this.__input, "blur", function() {
            h.__onFinishChange && h.__onFinishChange.call(h, h.getValue())
        });
        a.bind(this.__input, "keydown", function(a) {
            13 === a.keyCode && this.blur()
        });
        this.updateDisplay();
        this.domElement.appendChild(this.__input)
    };
    d.superclass = h;
    c.extend(d.prototype, h.prototype, {
        updateDisplay: function() {
            a.isActive(this.__input) || (this.__input.value = this.getValue());
            return d.superclass.prototype.updateDisplay.call(this)
        }
    });
    return d
});
define("dat/controllers/FunctionController", ["dat/controllers/Controller", "dat/dom/dom", "dat/utils/common"], function(h, a, c) {
    var d = function(c, b, k) {
        d.superclass.call(this, c, b);
        var h = this;
        this.__button = document.createElement("div");
        this.__button.innerHTML = void 0 === k ? "Fire" : k;
        a.bind(this.__button, "click", function(a) {
            a.preventDefault();
            h.fire();
            return !1
        });
        a.addClass(this.__button, "button");
        this.domElement.appendChild(this.__button)
    };
    d.superclass = h;
    c.extend(d.prototype, h.prototype, {
        fire: function() {
            this.__onChange && this.__onChange.call(this);
            this.__onFinishChange && this.__onFinishChange.call(this, this.getValue());
            this.getValue().call(this.object)
        }
    });
    return d
});
define("dat/controllers/BooleanController", ["dat/controllers/Controller", "dat/dom/dom", "dat/utils/common"], function(h, a, c) {
    var d = function(c, b) {
        d.superclass.call(this, c, b);
        var k = this;
        this.__prev = this.getValue();
        this.__checkbox = document.createElement("input");
        this.__checkbox.setAttribute("type", "checkbox");
        a.bind(this.__checkbox, "change", function() {
            k.setValue(!k.__prev)
        }, !1);
        this.domElement.appendChild(this.__checkbox);
        this.updateDisplay()
    };
    d.superclass = h;
    c.extend(d.prototype, h.prototype, {
        setValue: function(a) {
            a = d.superclass.prototype.setValue.call(this, a);
            this.__onFinishChange && this.__onFinishChange.call(this, this.getValue());
            this.__prev = this.getValue();
            return a
        },
        updateDisplay: function() {
            !0 === this.getValue() ? (this.__checkbox.setAttribute("checked", "checked"),
            this.__checkbox.checked = !0) : this.__checkbox.checked = !1;
            return d.superclass.prototype.updateDisplay.call(this)
        }
    });
    return d
});
define("dat/controllers/factory", "dat/controllers/OptionController dat/controllers/NumberControllerBox dat/controllers/NumberControllerSlider dat/controllers/StringController dat/controllers/FunctionController dat/controllers/BooleanController dat/utils/common".split(" "), function(h, a, c, d, f, b, k) {
    return function(p, r, v, x, A, l, q) {
        var y = p[r];
        if (k.isArray(v) || k.isObject(v))
            return new h(p,r,v);
        if (k.isNumber(y))
            return k.isNumber(v) && k.isNumber(x) ? new c(p,r,v,x,A,l,q) : new a(p,r,{
                min: v,
                max: x
            });
        if (k.isString(y))
            return new d(p,r);
        if (k.isFunction(y))
            return new f(p,r,"");
        if (k.isBoolean(y))
            return new b(p,r)
    }
});
define("dat/color/toString", ["dat/utils/common"], function(h) {
    return function(a) {
        if (1 == a.a || h.isUndefined(a.a)) {
            for (a = a.hex.toString(16); 6 > a.length; )
                a = "0" + a;
            return "#" + a
        }
        return "rgba(" + Math.round(a.r) + "," + Math.round(a.g) + "," + Math.round(a.b) + "," + a.a + ")"
    }
});
define("dat/color/interpret", ["dat/color/toString", "dat/utils/common"], function(h, a) {
    var c, d, f = [{
        litmus: a.isString,
        conversions: {
            THREE_CHAR_HEX: {
                read: function(a) {
                    a = a.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
                    return null === a ? !1 : {
                        space: "HEX",
                        hex: parseInt("0x" + a[1].toString() + a[1].toString() + a[2].toString() + a[2].toString() + a[3].toString() + a[3].toString())
                    }
                },
                write: h
            },
            SIX_CHAR_HEX: {
                read: function(a) {
                    a = a.match(/^#([A-F0-9]{6})$/i);
                    return null === a ? !1 : {
                        space: "HEX",
                        hex: parseInt("0x" + a[1].toString())
                    }
                },
                write: h
            },
            CSS_RGB: {
                read: function(a) {
                    a = a.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
                    return null === a ? !1 : {
                        space: "RGB",
                        r: parseFloat(a[1]),
                        g: parseFloat(a[2]),
                        b: parseFloat(a[3])
                    }
                },
                write: h
            },
            CSS_RGBA: {
                read: function(a) {
                    a = a.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
                    return null === a ? !1 : {
                        space: "RGB",
                        r: parseFloat(a[1]),
                        g: parseFloat(a[2]),
                        b: parseFloat(a[3]),
                        a: parseFloat(a[4])
                    }
                },
                write: h
            }
        }
    }, {
        litmus: a.isNumber,
        conversions: {
            HEX: {
                read: function(a) {
                    return {
                        space: "HEX",
                        hex: a,
                        conversionName: "HEX"
                    }
                },
                write: function(a) {
                    return a.hex
                }
            }
        }
    }, {
        litmus: a.isArray,
        conversions: {
            RGB_ARRAY: {
                read: function(a) {
                    return 3 != a.length ? !1 : {
                        space: "RGB",
                        r: a[0],
                        g: a[1],
                        b: a[2]
                    }
                },
                write: function(a, c) {
                    c[0] = a.r;
                    c[1] = a.g;
                    c[2] = a.b;
                    return [a.r, a.g, a.b]
                }
            },
            RGBA_ARRAY: {
                read: function(a) {
                    return 4 != a.length ? !1 : {
                        space: "RGB",
                        r: a[0],
                        g: a[1],
                        b: a[2],
                        a: a[3]
                    }
                },
                write: function(a, c) {
                    c[0] = a.r;
                    c[1] = a.g;
                    c[2] = a.b;
                    c[3] = a.a;
                    return [a.r, a.g, a.b, a.a]
                }
            }
        }
    }, {
        litmus: a.isObject,
        conversions: {
            RGBA_OBJ: {
                read: function(b) {
                    return a.isNumber(b.r) && a.isNumber(b.g) && a.isNumber(b.b) && a.isNumber(b.a) ? {
                        space: "RGB",
                        r: b.r,
                        g: b.g,
                        b: b.b,
                        a: b.a
                    } : !1
                },
                write: function(a, c) {
                    c.r = a.r;
                    c.g = a.g;
                    c.b = a.b;
                    c.a = a.a;
                    return {
                        r: a.r,
                        g: a.g,
                        b: a.b,
                        a: a.a
                    }
                }
            },
            RGB_OBJ: {
                read: function(b) {
                    return a.isNumber(b.r) && a.isNumber(b.g) && a.isNumber(b.b) ? {
                        space: "RGB",
                        r: b.r,
                        g: b.g,
                        b: b.b
                    } : !1
                },
                write: function(a, c) {
                    c.r = a.r;
                    c.g = a.g;
                    c.b = a.b;
                    return {
                        r: a.r,
                        g: a.g,
                        b: a.b
                    }
                }
            },
            HSVA_OBJ: {
                read: function(b) {
                    return a.isNumber(b.h) && a.isNumber(b.s) && a.isNumber(b.v) && a.isNumber(b.a) ? {
                        space: "HSV",
                        h: b.h,
                        s: b.s,
                        v: b.v,
                        a: b.a
                    } : !1
                },
                write: function(a) {
                    return {
                        h: a.h,
                        s: a.s,
                        v: a.v,
                        a: a.a
                    }
                }
            },
            HSV_OBJ: {
                read: function(b) {
                    return a.isNumber(b.h) && a.isNumber(b.s) && a.isNumber(b.v) ? {
                        space: "HSV",
                        h: b.h,
                        s: b.s,
                        v: b.v
                    } : !1
                },
                write: function(a) {
                    return {
                        h: a.h,
                        s: a.s,
                        v: a.v
                    }
                }
            }
        }
    }];
    return function() {
        d = !1;
        var b = 1 < arguments.length ? a.toArray(arguments) : arguments[0];
        a.each(f, function(f) {
            if (f.litmus(b))
                return a.each(f.conversions, function(f, k) {
                    c = f.read(b);
                    if (!1 === d && !1 !== c)
                        return d = c,
                        c.conversionName = k,
                        c.conversion = f,
                        a.BREAK
                }),
                a.BREAK
        });
        return d
    }
});
define("dat/color/math", [], function() {
    var h;
    return {
        hsv_to_rgb: function(a, c, d) {
            var f = a / 60 - Math.floor(a / 60)
              , b = d * (1 - c)
              , k = d * (1 - f * c);
            c = d * (1 - (1 - f) * c);
            a = [[d, c, b], [k, d, b], [b, d, c], [b, k, d], [c, b, d], [d, b, k]][Math.floor(a / 60) % 6];
            return {
                r: 255 * a[0],
                g: 255 * a[1],
                b: 255 * a[2]
            }
        },
        rgb_to_hsv: function(a, c, d) {
            var f = Math.max(a, c, d)
              , b = f - Math.min(a, c, d);
            if (0 == f)
                return {
                    h: NaN,
                    s: 0,
                    v: 0
                };
            a = (a == f ? (c - d) / b : c == f ? 2 + (d - a) / b : 4 + (a - c) / b) / 6;
            0 > a && (a += 1);
            return {
                h: 360 * a,
                s: b / f,
                v: f / 255
            }
        },
        rgb_to_hex: function(a, c, d) {
            a = this.hex_with_component(0, 2, a);
            a = this.hex_with_component(a, 1, c);
            return a = this.hex_with_component(a, 0, d)
        },
        component_from_hex: function(a, c) {
            return a >> 8 * c & 255
        },
        hex_with_component: function(a, c, d) {
            return d << (h = 8 * c) | a & ~(255 << h)
        }
    }
});
define("dat/utils/utils", [], function() {
    var h = {
        unescape: function(a) {
            return ("" + a).replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#x2F;/g, "/")
        },
        sign: function(a) {
            return 0 <= a ? 1 : -1
        },
        lerp: function(a, c, d) {
            return (c - a) * d + a
        },
        map: function(a, c, d, f, b) {
            return f + (a - c) / (d - c) * (b - f)
        },
        cmap: function(a, c, d, f, b) {
            return h.clamp(f + (b - f) * (a - c) / (d - c), f, b)
        },
        wrap: function(a, c) {
            for (; 0 > a; )
                a += c;
            return a % c
        },
        cap: function(a, c) {
            return Math.abs(a) > c ? h.sign(a) * c : a
        },
        dist: function(a, c, d, f) {
            return Math.sqrt((a - d) * (a - d) + (c - f) * (c - f))
        },
        clamp: function(a, c, d) {
            return Math.max(Math.min(a, d), c)
        },
        roundToDecimal: function(a, c) {
            var d = Math.pow(10, c);
            return Math.round(a * d) / d
        },
        random: function() {
            if (0 == arguments.length)
                return Math.random();
            if (1 == arguments.length) {
                if ("number" == typeof arguments[0])
                    return random() * arguments[0];
                if ("array" == typeof arguments[0])
                    return arguments[0][Math.floor(random(arguments[0].length))]
            } else if (2 == arguments.length)
                return lerp(arguments[0], arguments[1], random())
        },
        clone: function(a) {
            if (null == a || "object" != typeof a)
                return a;
            var c = a.constructor(), d;
            for (d in a)
                c[d] = clone(a[d]);
            return c
        },
        bezier: function(a, c, d, f, b) {
            var k = 1 - b;
            return a * k * k * k + 3 * c * b * k * k + 3 * d * b * b * k + f * b * b * b
        },
        commaify: function(a, c) {
            c || (c = 3);
            a = a.toString().split("").reverse().join("");
            for (var d = "", f = 0, b = 0; b < a.length; b++) {
                var k = a.charAt(b);
                f > c - 1 ? (f = 0,
                d += ",") : f++;
                d += k
            }
            return d.split("").reverse().join("")
        },
        makeUnselectable: function(a) {
            if (void 0 != a && void 0 != a.style) {
                a.onselectstart = function() {
                    return !1
                }
                ;
                a.style.MozUserSelect = "none";
                a.style.KhtmlUserSelect = "none";
                a.unselectable = "on";
                a = a.childNodes;
                for (var c = a.length, d = 0; d < c; d++)
                    this.makeUnselectable(a[d])
            }
        },
        makeSelectable: function(a) {
            if (void 0 != a && void 0 != a.style) {
                a.onselectstart = function() {}
                ;
                a.style.MozUserSelect = "auto";
                a.style.KhtmlUserSelect = "auto";
                a.unselectable = "off";
                a = a.childNodes;
                for (var c = a.length, d = 0; d < c; d++)
                    this.makeSelectable(a[d])
            }
        },
        shuffle: function(a) {
            for (var c, d, f = a.length; f; c = parseInt(Math.random() * f),
            d = a[--f],
            a[f] = a[c],
            a[c] = d)
                ;
            return a
        }
    };
    return h
});
define("dat/color/Color", ["dat/color/interpret", "dat/color/math", "dat/color/toString", "dat/utils/common", "dat/utils/utils"], function(h, a, c, d, f) {
    function b(a, b, c) {
        Object.defineProperty(a, b, {
            get: function() {
                if ("RGB" === this.__state.space)
                    return this.__state[b];
                p(this, b, c);
                return this.__state[b]
            },
            set: function(a) {
                "RGB" !== this.__state.space && (p(this, b, c),
                this.__state.space = "RGB");
                this.__state[b] = a
            }
        })
    }
    function k(a, b) {
        Object.defineProperty(a, b, {
            get: function() {
                if ("HSV" === this.__state.space)
                    return this.__state[b];
                r(this);
                return this.__state[b]
            },
            set: function(a) {
                "HSV" !== this.__state.space && (r(this),
                this.__state.space = "HSV");
                this.__state[b] = a
            }
        })
    }
    function p(b, c, f) {
        if ("HEX" === b.__state.space)
            b.__state[c] = a.component_from_hex(b.__state.hex, f);
        else if ("HSV" === b.__state.space)
            d.extend(b.__state, a.hsv_to_rgb(b.__state.h, b.__state.s, b.__state.v));
        else
            throw "Corrupted color state";
    }
    function r(b) {
        var c = a.rgb_to_hsv(b.r, b.g, b.b);
        d.extend(b.__state, {
            s: c.s,
            v: c.v
        });
        d.isNaN(c.h) ? d.isUndefined(b.__state.h) && (b.__state.h = 0) : b.__state.h = c.h
    }
    var v = function() {
        this.__state = h.apply(this, arguments);
        if (!1 === this.__state)
            throw "Failed to interpret color arguments";
        this.__state.a = this.__state.a || 1
    };
    v.lerp_rgb = function(a, b, c) {
        return new v(f.lerp(a.r, b.r, c),f.lerp(a.g, b.g, c),f.lerp(a.b, b.b, c),f.lerp(a.a, b.a, c))
    }
    ;
    v.lerp_hsv = function(a, b, c) {
        return new v({
            h: f.lerp(a.h, b.h, c),
            s: f.lerp(a.s, b.s, c),
            v: f.lerp(a.v, b.v, c),
            a: f.lerp(a.a, b.a, c)
        })
    }
    ;
    v.lerp = v.lerp_rgb;
    v.inverse = function(a) {
        return new v(255 - a.r,255 - a.g,255 - a.b)
    }
    ;
    v.mix = function(a) {
        1 < arguments.length && (a = arguments);
        for (var b = 0, c = 0, d = 0, f = 0, k = a.length, h = 0; h < k; h++)
            b += a[h].r,
            c += a[h].g,
            d += a[h].b,
            f += a[h].a;
        return new v(b / k,c / k,d / k,f / k)
    }
    ;
    v.random = function() {
        return new v(255 * Math.random(),255 * Math.random(),255 * Math.random())
    }
    ;
    v.COMPONENTS = "r g b h s v hex a".split(" ");
    d.extend(v.prototype, {
        set: function(a) {
            d.extend(this.__state, a.__state)
        },
        toString: function() {
            return c(this)
        },
        toOriginal: function(a) {
            return this.__state.conversion.write(this, a)
        }
    });
    b(v.prototype, "r", 2);
    b(v.prototype, "g", 1);
    b(v.prototype, "b", 0);
    k(v.prototype, "h");
    k(v.prototype, "s");
    k(v.prototype, "v");
    Object.defineProperty(v.prototype, "a", {
        get: function() {
            return this.__state.a
        },
        set: function(a) {
            this.__state.a = a
        }
    });
    Object.defineProperty(v.prototype, "hex", {
        get: function() {
            this.__state.hex = a.rgb_to_hex(this.r, this.g, this.b);
            return this.__state.hex
        },
        set: function(a) {
            this.__state.space = "HEX";
            this.__state.hex = a
        }
    });
    return v
});
define("dat/controllers/ColorController", ["dat/controllers/Controller", "dat/dom/dom", "dat/color/Color", "dat/color/interpret", "dat/utils/common"], function(h, a, c, d, f) {
    function b() {
        this.setValue(this.__color.toOriginal(this.getValue()), !0)
    }
    function k(a, b, c, d) {
        a.style.background = "";
        f.each(v, function(f) {
            a.style.cssText += "background: " + f + "linear-gradient(" + b + ", " + c + " 0%, " + d + " 100%); "
        })
    }
    function p(a) {
        a.style.background = "";
        a.style.cssText += "background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);";
        a.style.cssText += "background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
        a.style.cssText += "background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
        a.style.cssText += "background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
        a.style.cssText += "background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"
    }
    var r = function(h, v, l) {
        function q(b) {
            E(b);
            a.bind(window, "mousemove", E);
            a.bind(window, "mouseup", y)
        }
        function y() {
            a.unbind(window, "mousemove", E);
            a.unbind(window, "mouseup", y)
        }
        function u() {
            var a = d(this.value);
            !1 !== a ? (B.__color.__state = a,
            B.setValue(B.__color)) : this.value = B.__color.toString();
            B.__onFinishChange(B.getValue())
        }
        function t() {
            a.unbind(window, "mousemove", C);
            a.unbind(window, "mouseup", t)
        }
        function E(c) {
            c.preventDefault();
            var d = a.getWidth(B.__saturation_field)
              , f = a.getHeight(B.__saturation_field)
              , h = a.getOffset(B.__saturation_field)
              , d = (c.clientX - h.left + document.body.scrollLeft) / d;
            c = 1 - (c.clientY - h.top + document.body.scrollTop) / f;
            1 < c ? c = 1 : 0 > c && (c = 0);
            1 < d ? d = 1 : 0 > d && (d = 0);
            B.__color.v = c;
            B.__color.s = d;
            b.call(B);
            return !1
        }
        function C(c) {
            c.preventDefault();
            var d = a.getHeight(B.__hue_field)
              , f = a.getOffset(B.__hue_field);
            c = 1 - (c.clientY - f.top + document.body.scrollTop) / d;
            1 < c ? c = 1 : 0 > c && (c = 0);
            B.__color.h = 360 * c;
            b.call(B);
            return !1
        }
        r.superclass.call(this, h, v);
        h = this.getValue();
        l = l || {};
        this.__byRef = f.isObject(h) || f.isArray(h);
        this.__color = new c(h);
        this.__temp = new c(0);
        this.__height = l.height || 100;
        this.__width = l.width || 100;
        var B = this;
        this.domElement = document.createElement("div");
        a.makeSelectable(this.domElement, !1);
        this.__selector = document.createElement("div");
        this.__selector.className = "selector";
        this.__saturation_field = document.createElement("div");
        this.__saturation_field.className = "saturation-field";
        this.__field_knob = document.createElement("div");
        this.__field_knob.className = "field-knob";
        this.__field_knob_border = "2px solid ";
        this.__hue_knob = document.createElement("div");
        this.__hue_knob.className = "hue-knob";
        this.__hue_field = document.createElement("div");
        this.__hue_field.className = "hue-field";
        this.__input = document.createElement("input");
        this.__input.type = "text";
        this.__input_textShadow = "0 1px 1px ";
        a.bind(this.__input, "keydown", function(a) {
            13 === a.keyCode && u.call(this)
        });
        a.bind(this.__input, "blur", u);
        a.bind(this.__selector, "mousedown", function(b) {
            var c = function(b) {
                a.removeClass(B.__selector, "drag");
                B.__onFinishChange(B.getValue());
                a.unbind(window, "mouseup", c)
            };
            a.addClass(this, "drag").bind(window, "mouseup", c)
        });
        l = document.createElement("div");
        f.extend(this.__selector.style, {
            width: this.__width + 22 + "px",
            height: this.__height + 2 + "px",
            padding: "3px",
            backgroundColor: "#222",
            boxShadow: "0px 1px 3px rgba(0,0,0,0.3)"
        });
        f.extend(this.__field_knob.style, {
            position: "absolute",
            width: "12px",
            height: "12px",
            border: this.__field_knob_border + (.5 > this.__color.v ? "#fff" : "#000"),
            boxShadow: "0px 1px 3px rgba(0,0,0,0.5)",
            borderRadius: "12px",
            zIndex: 1
        });
        f.extend(this.__hue_knob.style, {
            position: "absolute",
            width: "15px",
            height: "2px",
            borderRight: "4px solid #fff",
            zIndex: 1
        });
        f.extend(this.__saturation_field.style, {
            width: this.__width + "px",
            height: this.__height + "px",
            border: "1px solid #555",
            marginRight: "3px",
            display: "inline-block",
            cursor: "pointer"
        });
        f.extend(l.style, {
            width: "100%",
            height: "100%",
            background: "none"
        });
        k(l, "top", "rgba(0,0,0,0)", "#000");
        f.extend(this.__hue_field.style, {
            width: "15px",
            height: this.__height + "px",
            display: "inline-block",
            border: "1px solid #555",
            cursor: "ns-resize"
        });
        p(this.__hue_field);
        f.extend(this.__input.style, {
            outline: "none",
            textAlign: "center",
            color: "#fff",
            border: 0,
            fontWeight: "bold",
            textShadow: this.__input_textShadow + "rgba(0,0,0,0.7)"
        });
        a.bind(this.__saturation_field, "mousedown", q);
        a.bind(this.__field_knob, "mousedown", q);
        a.bind(this.__hue_field, "mousedown", function(b) {
            C(b);
            a.bind(window, "mousemove", C);
            a.bind(window, "mouseup", t)
        });
        this.__saturation_field.appendChild(l);
        this.__selector.appendChild(this.__field_knob);
        this.__selector.appendChild(this.__saturation_field);
        this.__selector.appendChild(this.__hue_field);
        this.__hue_field.appendChild(this.__hue_knob);
        this.domElement.appendChild(this.__input);
        this.domElement.appendChild(this.__selector);
        this.updateDisplay()
    };
    r.superclass = h;
    f.extend(r.prototype, h.prototype, {
        updateDisplay: function() {
            var b = this.getValue();
            if (f.isUndefined(b))
                return this;
            var d = new c(b);
            if (!1 !== d) {
                var h = !1;
                f.each(c.COMPONENTS, function(a) {
                    if (!f.isUndefined(d[a]) && !f.isUndefined(this.__color.__state[a]) && d[a] !== this.__color.__state[a])
                        return h = !0,
                        {}
                }, this);
                h && f.extend(this.__color.__state, d)
            }
            f.extend(this.__temp.__state, this.__color.__state);
            this.__temp.a = 1;
            var b = .5 > this.__color.v || .5 < this.__color.s ? 255 : 0
              , p = 255 - b
              , r = a.getHeight(this.__field_knob) / 2;
            f.extend(this.__field_knob.style, {
                marginLeft: this.__width * this.__color.s - r + "px",
                marginTop: Math.round(this.__height * (1 - this.__color.v) - r) + "px",
                backgroundColor: this.__temp.toString(),
                borderColor: "rgb(" + b + "," + b + "," + b + ")"
            });
            var r = a.getHeight(this.__hue_knob) / 2 + 1
              , v = new c(this.__color.r,this.__color.g,this.__color.b);
            v.s = v.v = 1;
            v.h = this.__color.h;
            f.extend(this.__hue_knob.style, {
                backgroundColor: v.toString(),
                marginTop: Math.round(this.__height * (1 - this.__color.h / 360) - r) + "px"
            });
            this.__temp.s = 1;
            this.__temp.v = 1;
            k(this.__saturation_field, "left", "#fff", this.__temp.toString());
            f.extend(this.__input.style, {
                backgroundColor: this.__input.value = this.__color.toString(),
                color: "rgb(" + b + "," + b + "," + b + ")",
                textShadow: this.__input_textShadow + "rgba(" + p + "," + p + "," + p + ",.7)"
            })
        }
    });
    var v = ["-moz-", "-o-", "-webkit-", "-ms-", ""];
    return r
});
define("dat/controllers/TinkerController", ["dat/controllers/Controller", "dat/dom/dom", "dat/utils/common"], function(h, a, c) {
    var d = function(c, b, h) {
        d.superclass.call(this, c, b);
        var p = this;
        this.__textarea = document.createElement("textarea");
        this.__textarea.innerHTML = this.getValue();
        a.bind(this.__textarea, "keyup", function(a) {
            var b;
            try {
                b = eval("(" + this.value + ")"),
                p.setValue(b)
            } catch (c) {
                throw c;
            }
        });
        this.domElement.appendChild(this.__textarea)
    };
    d.superclass = h;
    c.extend(d.prototype, h.prototype, {});
    return d
});
define("dat/dom/CenteredDiv", ["dat/dom/dom", "underscore"], function(h) {
    var a = function(a) {
        this.backgroundElement = document.createElement("div");
        _.extend(this.backgroundElement.style, {
            backgroundColor: "rgba(0,0,0,0.8)",
            top: 0,
            left: 0,
            display: "none",
            zIndex: "1000",
            opacity: 0,
            WebkitTransition: "opacity 0.2s linear"
        });
        h.makeFullscreen(this.backgroundElement);
        this.backgroundElement.style.position = "fixed";
        this.domElement = document.createElement("div");
        _.extend(this.domElement.style, {
            position: "fixed",
            display: "none",
            zIndex: "1001",
            opacity: 0,
            WebkitTransition: "-webkit-transform 0.2s ease-out, opacity 0.2s linear"
        });
        this.__visible = !1;
        document.body.appendChild(this.backgroundElement);
        document.body.appendChild(this.domElement);
        var d = this;
        this.permanent = !!a;
        h.bind(this.backgroundElement, "click", function() {
            d.permanent || d.hide()
        })
    };
    a.prototype.show = function(a) {
        var d = this;
        this.backgroundElement.style.display = "block";
        this.domElement.style.display = "block";
        this.domElement.style.opacity = 0;
        this.domElement.style.webkitTransform = "scale(1.1)";
        this.layout();
        _.defer(function() {
            d.backgroundElement.style.opacity = 1;
            d.domElement.style.opacity = 1;
            d.domElement.style.webkitTransform = "scale(1)"
        });
        _.isFunction(a) && _.delay(function() {
            a.call(d)
        }, 200);
        this.__visible = !0;
        return this
    }
    ;
    a.prototype.hide = function(a) {
        var d = this;
        _.delay(function() {
            d.domElement.style.display = "none";
            d.backgroundElement.style.display = "none";
            _.isFunction(a) && a.call(d)
        }, 200);
        this.backgroundElement.style.opacity = 0;
        this.domElement.style.opacity = 0;
        this.domElement.style.webkitTransform = "scale(1.1)";
        this.__visible = !1;
        return this
    }
    ;
    a.prototype.layout = function() {
        this.domElement.style.left = (h.getWidth(window) - h.getWidth(this.domElement)) / 2 + "px";
        this.domElement.style.top = (h.getHeight(window) - h.getHeight(this.domElement)) / 2 + "px"
    }
    ;
    return a
});
(function() {
    var h = {};
    define("dat/require/css", ["dat/utils/css", "text"], function(a, c) {
        return {
            load: function(d, f, b, k) {
                if (k.isBuild)
                    c.load(d, f, function(a) {
                        h[d] = a;
                        b()
                    }, k);
                else
                    a.link(f.toUrl(d)).onLoad(b)
            },
            write: function(a, f, b) {
                if (f in h) {
                    var k = c.jsEscape(h[f]);
                    b.asModule(a + "!" + f, "define(['dat/utils/css'], function(css) {return css.inject('" + k + "');});\n")
                }
            }
        }
    })
})();
define("dat/require/css!dat/gui/gui.css", ["dat/utils/css"], function(h) {
    return h.inject(".dg {\n  /** Clear list styles */\n  /* Auto-place container */\n  /* Auto-placed GUI's */\n  /* Line items that don't contain folders. */\n  /** Folder names */\n  /** Hides closed items */\n  /** Controller row */\n  /** Name-half (left) */\n  /** Controller-half (right) */\n  /** Controller placement */\n  /** Shorter number boxes when slider is present. */\n  /** Ensure the entire boolean and function row shows a hand */ }\n  .dg ul {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    width: 100%;\n    clear: both; }\n  .dg.ac {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 0;\n    z-index: 0; }\n  .dg:not(.ac) .main {\n    /** Exclude mains in ac so that we don't hide close button */\n    overflow: hidden; }\n  .dg.main {\n    -webkit-transition: opacity 0.1s linear;\n    -o-transition: opacity 0.1s linear;\n    -moz-transition: opacity 0.1s linear;\n    transition: opacity 0.1s linear; }\n    .dg.main.taller-than-window {\n      overflow-y: auto; }\n      .dg.main.taller-than-window .close-button {\n        opacity: 1;\n        /* TODO, these are style notes */\n        margin-top: -1px;\n        border-top: 1px solid #2c2c2c; }\n    .dg.main ul.closed .close-button {\n      opacity: 1 !important; }\n    .dg.main:hover .close-button,\n    .dg.main .close-button.drag {\n      opacity: 1; }\n    .dg.main .close-button {\n      /*opacity: 0;*/\n      -webkit-transition: opacity 0.1s linear;\n      -o-transition: opacity 0.1s linear;\n      -moz-transition: opacity 0.1s linear;\n      transition: opacity 0.1s linear;\n      border: 0;\n      position: absolute;\n      line-height: 19px;\n      height: 20px;\n      /* TODO, these are style notes */\n      cursor: pointer;\n      text-align: center;\n      background-color: #000; }\n      .dg.main .close-button:hover {\n        background-color: #111; }\n  .dg.a {\n    float: right;\n    margin-right: 15px;\n    overflow-x: hidden; }\n    .dg.a.has-save ul {\n      margin-top: 27px; }\n      .dg.a.has-save ul.closed {\n        margin-top: 0; }\n    .dg.a .save-row {\n      position: fixed;\n      top: 0;\n      z-index: 1002; }\n  .dg li {\n    -webkit-transition: height 0.1s ease-out;\n    -o-transition: height 0.1s ease-out;\n    -moz-transition: height 0.1s ease-out;\n    transition: height 0.1s ease-out; }\n  .dg li:not(.folder) {\n    cursor: auto;\n    height: 27px;\n    line-height: 27px;\n    overflow: hidden;\n    padding: 0 4px 0 5px; }\n  .dg li.folder {\n    padding: 0;\n    border-left: 4px solid rgba(0, 0, 0, 0); }\n  .dg li.tinker {\n    height: 200px; }\n    .dg li.tinker textarea {\n      margin-left: -5px;\n      width: 100%;\n      height: 200px;\n      resize: none; }\n  .dg li.title {\n    cursor: pointer;\n    margin-left: -4px; }\n  .dg .closed li:not(.title),\n  .dg .closed ul li,\n  .dg .closed ul li > * {\n    height: 0;\n    overflow: hidden;\n    border: 0; }\n  .dg .cr {\n    clear: both;\n    padding-left: 3px;\n    height: 27px; }\n  .dg .property-name {\n    cursor: default;\n    float: left;\n    clear: left;\n    width: 40%;\n    overflow: hidden;\n    text-overflow: ellipsis; }\n  .dg .c {\n    float: left;\n    width: 60%; }\n  .dg .c input[type=text] {\n    border: 0;\n    margin-top: 4px;\n    padding: 3px;\n    width: 100%;\n    float: right; }\n  .dg .has-slider input[type=text] {\n    width: 30%;\n    /*display: none;*/\n    margin-left: 0; }\n  .dg .slider {\n    float: left;\n    width: 66%;\n    margin-left: -5px;\n    margin-right: 0;\n    height: 19px;\n    margin-top: 4px; }\n  .dg .slider-fg {\n    height: 100%; }\n  .dg .c input[type=checkbox] {\n    margin-top: 9px; }\n  .dg .c select {\n    margin-top: 5px; }\n  .dg .cr.function:not(.tinker),\n  .dg .cr.function:not(.tinker) .property-name,\n  .dg .cr.function:not(.tinker) *,\n  .dg .cr.boolean,\n  .dg .cr.boolean * {\n    cursor: pointer; }\n  .dg .selector {\n    display: none;\n    position: absolute;\n    margin-left: -9px;\n    margin-top: 23px;\n    z-index: 10; }\n  .dg .c:hover .selector,\n  .dg .selector.drag {\n    display: block; }\n  .dg li.save-row {\n    padding: 0; }\n    .dg li.save-row .button {\n      display: inline-block;\n      padding: 0px 6px; }\n  .dg.dialogue {\n    background-color: #222;\n    width: 460px;\n    padding: 15px;\n    font-size: 13px;\n    line-height: 15px; }\n\n/* TODO Separate style and structure */\n#dg-new-constructor {\n  padding: 10px;\n  color: #222;\n  font-family: Monaco, monospace;\n  font-size: 10px;\n  border: 0;\n  resize: none;\n  box-shadow: inset 1px 1px 1px #888;\n  word-wrap: break-word;\n  margin: 12px 0;\n  display: block;\n  width: 440px;\n  overflow-y: scroll;\n  height: 100px;\n  position: relative; }\n\n#dg-local-explain {\n  display: none;\n  font-size: 11px;\n  line-height: 17px;\n  border-radius: 3px;\n  background-color: #333;\n  padding: 8px;\n  margin-top: 10px; }\n  #dg-local-explain code {\n    font-size: 10px; }\n\n#dat-gui-save-locally {\n  display: none; }\n\n/** Main type */\n.dg {\n  color: #eee;\n  font: 11px 'Lucida Grande', sans-serif;\n  text-shadow: 0 -1px 0 #111111;\n  /** Auto place */\n  /* Controller row, <li> */\n  /** Controllers */ }\n  .dg.main {\n    /** Scrollbar */ }\n    .dg.main::-webkit-scrollbar {\n      width: 5px;\n      background: #1a1a1a; }\n    .dg.main::-webkit-scrollbar-corner {\n      height: 0;\n      display: none; }\n    .dg.main::-webkit-scrollbar-thumb {\n      border-radius: 5px;\n      background: #676767; }\n  .dg li:not(.folder) {\n    background: #1a1a1a;\n    border-bottom: 1px solid #2c2c2c; }\n  .dg li.save-row {\n    line-height: 25px;\n    background: #dad5cb;\n    border: 0; }\n    .dg li.save-row select {\n      margin-left: 5px;\n      width: 108px; }\n    .dg li.save-row .button {\n      margin-left: 5px;\n      margin-top: 1px;\n      border-radius: 2px;\n      font-size: 9px;\n      line-height: 7px;\n      padding: 4px 4px 5px 4px;\n      background: #c5bdad;\n      color: #fff;\n      text-shadow: 0 1px 0 #b0a58f;\n      box-shadow: 0 -1px 0 #b0a58f;\n      cursor: pointer; }\n      .dg li.save-row .button.gears {\n        background: #c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;\n        height: 7px;\n        width: 8px; }\n      .dg li.save-row .button:hover {\n        background-color: #bab19e;\n        box-shadow: 0 -1px 0 #b0a58f; }\n  .dg li.folder {\n    border-bottom: 0; }\n  .dg li.title {\n    padding-left: 16px;\n    background: black url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;\n    cursor: pointer;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.2); }\n  .dg .closed li.title {\n    background-image: url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==); }\n  .dg .cr.boolean {\n    border-left: 3px solid #806787; }\n  .dg .cr.function {\n    border-left: 3px solid #e61d5f; }\n  .dg .cr.number {\n    border-left: 3px solid #2fa1d6; }\n    .dg .cr.number input[type=text] {\n      color: #2fa1d6; }\n  .dg .cr.string {\n    border-left: 3px solid #1ed36f; }\n    .dg .cr.string input[type=text] {\n      color: #1ed36f; }\n  .dg .cr.function:not(.tinker):hover, .dg .cr.boolean:hover {\n    background: #111; }\n  .dg .c input[type=text] {\n    background: #303030;\n    outline: none; }\n    .dg .c input[type=text]:hover {\n      background: #3c3c3c; }\n    .dg .c input[type=text]:focus {\n      background: #494949;\n      color: #fff; }\n  .dg .c .slider {\n    background: #303030;\n    cursor: ew-resize; }\n  .dg .c .slider-fg {\n    background: #2fa1d6; }\n  .dg .c .slider:hover {\n    background: #3c3c3c; }\n    .dg .c .slider:hover .slider-fg {\n      background: #44abda; }\n")
});
define("dat/gui/GUI", "text!dat/gui/saveDialogue.html dat/controllers/factory dat/controllers/Controller dat/controllers/BooleanController dat/controllers/FunctionController dat/controllers/NumberControllerBox dat/controllers/NumberControllerSlider dat/controllers/OptionController dat/controllers/ColorController dat/controllers/TinkerController dat/utils/requestAnimationFrame dat/dom/CenteredDiv dat/dom/dom dat/utils/common dat/require/css!dat/gui/gui.css".split(" "), function(h, a, c, d, f, b, k, p, r, v, x, A, l, q) {
    function y(b, d, e, f) {
        if (void 0 === d[e])
            throw Error("Object " + d + ' has no property "' + e + '"');
        f.color ? d = new r(d,e) : f.tinker ? d = new v(d,e) : (d = [d, e].concat(f.factoryArgs),
        d = a.apply(b, d));
        f.before instanceof c && (f.before = f.before.__li);
        E(b, d);
        l.addClass(d.domElement, "c");
        e = document.createElement("span");
        l.addClass(e, "property-name");
        e.innerHTML = d.property;
        var h = document.createElement("div");
        h.appendChild(e);
        h.appendChild(d.domElement);
        e = u(b, h, f.before);
        l.addClass(e, m.CLASS_CONTROLLER_ROW);
        l.addClass(e, typeof d.getValue());
        f.tinker && l.addClass(e, "tinker");
        t(b, e, d);
        b.__controllers.push(d);
        return d
    }
    function u(a, b, c) {
        var d = document.createElement("li");
        b && d.appendChild(b);
        c ? a.__ul.insertBefore(d, params.before) : a.__ul.appendChild(d);
        a.onResize();
        return d
    }
    function t(a, c, e) {
        e.__li = c;
        e.__gui = a;
        q.extend(e, {
            options: function(b) {
                if (1 < arguments.length)
                    return e.remove(),
                    y(a, e.object, e.property, {
                        before: e.__li.nextElementSibling,
                        factoryArgs: [q.toArray(arguments)]
                    });
                if (q.isArray(b) || q.isObject(b))
                    return e.remove(),
                    y(a, e.object, e.property, {
                        before: e.__li.nextElementSibling,
                        factoryArgs: [b]
                    })
            },
            name: function(a) {
                e.__li.firstElementChild.firstElementChild.innerHTML = a;
                return e
            },
            listen: function() {
                e.__gui.listen(e);
                return e
            },
            remove: function() {
                e.__gui.remove(e);
                return e
            }
        });
        if (e instanceof k) {
            var h = new b(e.object,e.property,{
                min: e.__min,
                max: e.__max,
                step: e.__step
            });
            e.attached = h;
            h.attached = e;
            q.each(b.prototype, function(a, b) {
                var c = e[b]
                  , g = h[b];
                e[b] = h[b] = function() {
                    var a = Array.prototype.slice.call(arguments);
                    g.apply(h, a);
                    return c.apply(e, a)
                }
            });
            l.addClass(c, "has-slider");
            e.domElement.insertBefore(h.domElement, e.domElement.firstElementChild)
        } else if (e instanceof b) {
            var m = function(b) {
                return q.isNumber(e.__min) && q.isNumber(e.__max) ? (e.remove(),
                y(a, e.object, e.property, {
                    before: e.__li.nextElementSibling,
                    factoryArgs: [e.__min, e.__max, e.__step]
                })) : b
            };
            e.min = q.compose(m, e.min);
            e.max = q.compose(m, e.max)
        } else
            e instanceof d ? (l.bind(c, "click", function() {
                l.fakeEvent(e.__checkbox, "click")
            }),
            l.bind(e.__checkbox, "click", function(a) {
                a.stopPropagation()
            })) : e instanceof f ? (l.bind(c, "click", function() {
                l.fakeEvent(e.__button, "click")
            }),
            l.bind(c, "mouseover", function() {
                l.addClass(e.__button, "hover")
            }),
            l.bind(c, "mouseout", function() {
                l.removeClass(e.__button, "hover")
            })) : e instanceof r && (l.addClass(c, "color"),
            e.updateDisplay = q.compose(function(a) {
                c.style.borderLeftColor = e.__color.toString();
                return a
            }, e.updateDisplay),
            e.updateDisplay());
        e.setValue = q.compose(function(b) {
            a.getRoot().__preset_select && e.isModified() && F(a.getRoot(), !0);
            return b
        }, e.setValue)
    }
    function E(a, b) {
        var c = a.getRoot()
          , d = c.__rememberedObjects.indexOf(b.object);
        if (-1 != d) {
            var e = c.__rememberedObjectIndecesToControllers[d];
            void 0 === e && (e = {},
            c.__rememberedObjectIndecesToControllers[d] = e);
            e[b.property] = b;
            if (c.load && c.load.remembered) {
                c = c.load.remembered;
                if (c[a.preset])
                    c = c[a.preset];
                else if (c.Default)
                    c = c.Default;
                else
                    return;
                c[d] && void 0 !== c[d][b.property] && (d = c[d][b.property],
                b.initialValue = q.isObject(d) ? _.clone(d) : d,
                b.setValue(q.isObject(d) ? _.clone(d) : d))
            }
        }
    }
    function C(a, b) {
        var c = a.__save_row = document.createElement("li");
        l.addClass(a.domElement, "has-save");
        b || a.__ul.insertBefore(c, a.__ul.firstChild);
        l.addClass(c, "save-row");
        var d = document.createElement("span");
        d.innerHTML = "&nbsp;";
        l.addClass(d, "button gears");
        var e = document.createElement("span");
        e.innerHTML = "Save";
        l.addClass(e, "button");
        l.addClass(e, "save");
        var f = document.createElement("span");
        f.innerHTML = "New";
        l.addClass(f, "button");
        l.addClass(f, "save-as");
        var h = document.createElement("span");
        h.innerHTML = "Revert";
        l.addClass(h, "button");
        l.addClass(h, "revert");
        var m = a.__preset_select = document.createElement("select");
        a.load && a.load.remembered ? q.each(a.load.remembered, function(b, c) {
            I(a, c, c == a.preset)
        }) : I(a, "Default", !1);
        l.bind(m, "change", function() {
            for (var b = 0; b < a.__preset_select.length; b++)
                a.__preset_select[b].innerHTML = a.__preset_select[b].value;
            a.preset = this.value
        });
        if (!b) {
            c.appendChild(m);
            c.appendChild(d);
            c.appendChild(e);
            c.appendChild(f);
            c.appendChild(h);
            if (G) {
                var k = function() {
                    p.style.display = a.useLocalStorage ? "block" : "none"
                }
                  , c = document.getElementById("dg-save-locally")
                  , p = document.getElementById("dg-local-explain");
                c.style.display = "block";
                c = document.getElementById("dg-local-storage");
                "true" === localStorage.getItem(document.location.href + ".isLocal") && c.setAttribute("checked", "checked");
                k();
                l.bind(c, "change", function() {
                    a.useLocalStorage = !a.useLocalStorage;
                    k()
                })
            }
            var n = document.getElementById("dg-new-constructor");
            l.bind(n, "keydown", function(a) {
                !a.metaKey || 67 !== a.which && 67 != a.keyCode || w.hide()
            });
            l.bind(d, "click", function() {
                n.innerHTML = JSON.stringify(a.getSaveObject(), void 0, 2);
                w.show();
                n.focus();
                n.select()
            });
            l.bind(e, "click", function() {
                a.save()
            });
            l.bind(f, "click", function() {
                var b = prompt("Enter a new preset name.");
                b && a.saveAs(b)
            });
            l.bind(h, "click", function() {
                a.revert()
            })
        }
    }
    function B(a) {
        function b(f) {
            f.preventDefault();
            e = f.clientX;
            l.addClass(a.__closeButton, m.CLASS_DRAG);
            l.bind(window, "mousemove", c);
            l.bind(window, "mouseup", d);
            return !1
        }
        function c(b) {
            b.preventDefault();
            a.width += e - b.clientX;
            a.onResize();
            e = b.clientX;
            return !1
        }
        function d() {
            l.removeClass(a.__closeButton, m.CLASS_DRAG);
            l.unbind(window, "mousemove", c);
            l.unbind(window, "mouseup", d)
        }
        a.__resize_handle = document.createElement("div");
        q.extend(a.__resize_handle.style, {
            width: "6px",
            marginLeft: "-3px",
            height: "200px",
            cursor: "ew-resize",
            position: "absolute"
        });
        var e;
        l.bind(a.__resize_handle, "mousedown", b);
        l.bind(a.__closeButton, "mousedown", b);
        a.domElement.insertBefore(a.__resize_handle, a.domElement.firstElementChild)
    }
    function e(a, b) {
        a.domElement.style.width = b + "px";
        a.__save_row && a.autoPlace && (a.__save_row.style.width = b + "px");
        a.__closeButton && (a.__closeButton.style.width = b + "px")
    }
    function D(a, b) {
        var c = {};
        q.each(a.__rememberedObjects, function(d, e) {
            var f = {}
              , h = a.__rememberedObjectIndecesToControllers[e];
            h || (h = {},
            _.each(d, function(b, c) {
                for (var d, e = 0, f = a.__controllers.length; e < f; e++) {
                    var m = a.__controllers[e];
                    if (m.property === c) {
                        d = m;
                        break
                    }
                }
                d && (h[c] = d)
            }),
            a.__rememberedObjectIndecesToControllers[e] = h);
            q.each(h, function(a, c) {
                var d = b ? a.initialValue : a.getValue();
                f[c] = q.isObject(d) ? _.clone(d) : d
            });
            c[e] = f
        });
        return c
    }
    function I(a, b, c) {
        if (a.__preset_select) {
            var d = document.createElement("option");
            d.innerHTML = b;
            d.value = b;
            a.__preset_select.appendChild(d);
            c && (a.__preset_select.selectedIndex = a.__preset_select.length - 1)
        }
    }
    function F(a, b) {
        if (a.__preset_select) {
            var c = a.__preset_select[a.__preset_select.selectedIndex];
            c.innerHTML = b ? c.value + "*" : c.value
        }
    }
    function O(a) {
        0 != a.length && x(function() {
            O(a)
        });
        q.each(a, function(a) {
            a.updateDisplay()
        })
    }
    p = document.createElement("br");
    q.extend(p.style, {
        clear: "both",
        width: 0,
        height: 0,
        display: "block",
        lineHeight: 0,
        fontSize: 0,
        visibility: "hidden"
    });
    var G;
    try {
        G = "localStorage"in window && null !== window.localStorage
    } catch (g) {
        G = !1
    }
    var w, M = !0, n, L = !1, J = [], m = function(a) {
        function b() {
            localStorage.setItem(document.location.href + ".gui", JSON.stringify(d.getSaveObject()))
        }
        function c() {
            var a = d.getRoot();
            a.width += 1;
            q.defer(function() {
                --a.width
            })
        }
        var d = this;
        this.domElement = document.createElement("div");
        this.__ul = document.createElement("ul");
        this.domElement.appendChild(this.__ul);
        l.addClass(this.domElement, "dg");
        this.__folders = {};
        this.__controllers = [];
        this.__rememberedObjects = [];
        this.__rememberedObjectIndecesToControllers = [];
        this.__listening = [];
        a = a || {};
        a = q.defaults(a, {
            autoPlace: !0,
            width: m.DEFAULT_WIDTH
        });
        a = q.defaults(a, {
            resizable: a.autoPlace,
            hideable: a.autoPlace
        });
        q.isUndefined(a.load) ? a.load = {
            preset: "Default"
        } : a.preset && (a.load.preset = a.preset);
        q.isUndefined(a.parent) && a.hideable && J.push(this);
        a.resizable = q.isUndefined(a.parent) && a.resizable;
        a.autoPlace && q.isUndefined(a.scrollable) && (a.scrollable = !0);
        var f = G && "true" === localStorage.getItem(document.location.href + ".isLocal");
        Object.defineProperties(this, {
            parent: {
                get: function() {
                    return a.parent
                }
            },
            scrollable: {
                get: function() {
                    return a.scrollable
                }
            },
            autoPlace: {
                get: function() {
                    return a.autoPlace
                }
            },
            preset: {
                get: function() {
                    return d.parent ? d.getRoot().preset : a.load.preset
                },
                set: function(b) {
                    d.parent ? d.getRoot().preset = b : a.load.preset = b;
                    if (this.__preset_select)
                        for (b = 0; b < this.__preset_select.length; b++)
                            this.__preset_select[b].value == this.preset && (this.__preset_select.selectedIndex = b);
                    d.revert()
                }
            },
            width: {
                get: function() {
                    return a.width
                },
                set: function(b) {
                    a.width = b;
                    e(d, b)
                }
            },
            name: {
                get: function() {
                    return a.name
                },
                set: function(b) {
                    a.name = b;
                    k && (k.innerHTML = a.name)
                }
            },
            closed: {
                get: function() {
                    return a.closed
                },
                set: function(b) {
                    a.closed = b;
                    a.closed ? l.addClass(d.__ul, m.CLASS_CLOSED) : l.removeClass(d.__ul, m.CLASS_CLOSED);
                    this.onResize();
                    d.__closeButton && (d.__closeButton.innerHTML = b ? m.TEXT_OPEN : m.TEXT_CLOSED)
                }
            },
            load: {
                get: function() {
                    return a.load
                }
            },
            useLocalStorage: {
                get: function() {
                    return f
                },
                set: function(a) {
                    G && ((f = a) ? l.bind(window, "unload", b) : l.unbind(window, "unload", b),
                    localStorage.setItem(document.location.href + ".isLocal", a))
                }
            }
        });
        if (q.isUndefined(a.parent)) {
            a.closed = !1;
            l.addClass(this.domElement, m.CLASS_MAIN);
            l.makeSelectable(this.domElement, !1);
            if (G && f) {
                d.useLocalStorage = !0;
                var h = localStorage.getItem(document.location.href + ".gui");
                h && (a.load = JSON.parse(h))
            }
            this.__closeButton = document.createElement("div");
            this.__closeButton.innerHTML = m.TEXT_CLOSED;
            l.addClass(this.__closeButton, m.CLASS_CLOSE_BUTTON);
            this.domElement.appendChild(this.__closeButton);
            l.bind(this.__closeButton, "click", function() {
                d.closed ? d.open() : d.close()
            })
        } else {
            void 0 === a.closed && (a.closed = !0);
            var k = document.createTextNode(a.name);
            l.addClass(k, "controller-name");
            h = u(d, k);
            l.addClass(this.__ul, m.CLASS_CLOSED);
            l.addClass(h, "title");
            l.bind(h, "click", function(a) {
                a.preventDefault();
                d.closed ? d.open() : d.close();
                return !1
            });
            a.closed || this.close()
        }
        a.autoPlace && (q.isUndefined(a.parent) && (M && (n = document.createElement("div"),
        n.style.zIndex = 1001,
        l.addClass(n, "dg"),
        l.addClass(n, m.CLASS_AUTO_PLACE_CONTAINER),
        document.body.appendChild(n),
        M = !1),
        n.appendChild(this.domElement),
        l.addClass(this.domElement, m.CLASS_AUTO_PLACE)),
        this.parent || e(d, a.width));
        l.bind(window, "resize", function() {
            d.onResize()
        });
        l.bind(this.__ul, "webkitTransitionEnd", function() {
            d.onResize()
        });
        l.bind(this.__ul, "transitionend", function() {
            d.onResize()
        });
        l.bind(this.__ul, "oTransitionEnd", function() {
            d.onResize()
        });
        this.onResize();
        a.resizable && B(this);
        d.getRoot();
        a.parent || c()
    };
    m.toggleHide = function() {
        L = !L;
        q.each(J, function(a) {
            a.domElement.style.display = L ? "none" : "block"
        })
    }
    ;
    m.CLASS_AUTO_PLACE = "a";
    m.CLASS_AUTO_PLACE_CONTAINER = "ac";
    m.CLASS_MAIN = "main";
    m.CLASS_CONTROLLER_ROW = "cr";
    m.CLASS_TOO_TALL = "taller-than-window";
    m.CLASS_CLOSED = "closed";
    m.CLASS_CLOSE_BUTTON = "close-button";
    m.CLASS_DRAG = "drag";
    m.DEFAULT_WIDTH = 245;
    m.TEXT_CLOSED = "Close Controls";
    m.TEXT_OPEN = "Open Controls";
    l.bind(window, "keydown", function(a) {
        "text" === document.activeElement.type || 72 !== a.which && 72 != a.keyCode || m.toggleHide()
    }, !1);
    q.extend(m.prototype, {
        add: function(a, b) {
            return y(this, a, b, {
                factoryArgs: Array.prototype.slice.call(arguments, 2)
            })
        },
        addColor: function(a, b) {
            return y(this, a, b, {
                color: !0
            })
        },
        tinker: function(a, b) {
            return y(this, a, b, {
                tinker: !0
            })
        },
        remove: function(a) {
            if (!a.__li.parentNode)
                return this;
            this.__ul.removeChild(a.__li);
            this.__controllers.slice(this.__controllers.indexOf(a), 1);
            var b = this;
            q.defer(function() {
                b.onResize()
            })
        },
        hideController: function(a) {
            if (0 > this.__controllers.indexOf(a))
                return this;
            if (a = a.__li)
                a.getAttribute("height") || a.setAttribute("height", l.getHeight(a) || 27),
                q.extend(a.style, {
                    height: 0
                });
            return this
        },
        showController: function(a) {
            if (0 > this.__controllers.indexOf(a))
                return this;
            (a = a.__li) && q.extend(a.style, {
                height: a.getAttribute("height") + "px"
            });
            return this
        },
        destroy: function() {
            this.autoPlace && n.removeChild(this.domElement)
        },
        addFolder: function(a) {
            if (void 0 !== this.__folders[a])
                throw Error('You already have a folder in this GUI by the name "' + a + '"');
            var b = {
                name: a,
                parent: this
            };
            b.autoPlace = this.autoPlace;
            this.load && this.load.folders && this.load.folders[a] && (b.closed = this.load.folders[a].closed,
            b.load = this.load.folders[a]);
            b = new m(b);
            this.__folders[a] = b;
            a = u(this, b.domElement);
            l.addClass(a, "folder");
            return b
        },
        open: function() {
            this.closed = !1
        },
        close: function() {
            this.closed = !0
        },
        onResize: function() {
            var a = this.getRoot();
            if (a.scrollable) {
                var b = l.getOffset(a.__ul).top
                  , c = 0;
                q.each(a.__ul.childNodes, function(b) {
                    a.autoPlace && b === a.__save_row || (c += l.getHeight(b))
                });
                window.innerHeight - b - 20 < c ? (l.addClass(a.domElement, m.CLASS_TOO_TALL),
                a.__ul.style.height = window.innerHeight - b - 20 + "px") : (l.removeClass(a.domElement, m.CLASS_TOO_TALL),
                a.__ul.style.height = "auto")
            }
            a.__resize_handle && q.defer(function() {
                a.__resize_handle.style.height = a.__ul.offsetHeight + "px"
            });
            a.__closeButton && (a.__closeButton.style.width = a.width + "px")
        },
        remember: function(a, b) {
            !b && q.isUndefined(w) && (w = new A,
            w.domElement.innerHTML = h);
            if (this.parent)
                throw Error("You can only call remember on a top level GUI.");
            0 == this.__rememberedObjects.length && C(this, !!b);
            -1 == this.__rememberedObjects.indexOf(a) && this.__rememberedObjects.push(a);
            this.autoPlace && e(this, this.width)
        },
        getRoot: function() {
            for (var a = this; a.parent; )
                a = a.parent;
            return a
        },
        getSaveObject: function() {
            var a = this.load;
            a.closed = this.closed;
            0 < this.__rememberedObjects.length && (a.preset = this.preset,
            a.remembered || (a.remembered = {}),
            a.remembered[this.preset] = D(this));
            a.folders = {};
            q.each(this.__folders, function(b, c) {
                a.folders[c] = b.getSaveObject()
            });
            return a
        },
        save: function() {
            this.load.remembered || (this.load.remembered = {});
            this.load.remembered[this.preset] = D(this);
            F(this, !1)
        },
        saveAs: function(a) {
            a = escape(a);
            this.load.remembered || (this.load.remembered = {},
            this.load.remembered.Default = D(this, !0));
            this.load.remembered[a] = D(this);
            this.preset = a;
            I(this, a, !0)
        },
        revert: function(a) {
            q.each(this.__controllers, function(b) {
                this.getRoot().load.remembered ? E(a || this.getRoot(), b) : b.setValue(b.initialValue)
            }, this);
            q.each(this.__folders, function(a) {
                a.revert(a)
            });
            a || F(this.getRoot(), !1)
        },
        listen: function(a) {
            var b = 0 == this.__listening.length;
            this.__listening.push(a);
            b && O(this.__listening)
        }
    });
    return m
});
define("workshop/improvedNoise", [], function() {
    function h(a, c) {
        var d = a || 362436069
          , f = c || 521288629
          , b = function() {
            d = 36969 * (d & 65535) + (d >>> 16) & 4294967295;
            f = 18E3 * (f & 65535) + (f >>> 16) & 4294967295;
            return ((d & 65535) << 16 | f & 65535) & 4294967295
        };
        this.nextDouble = function() {
            var a = b() / 4294967296;
            return 0 > a ? 1 + a : a
        }
        ;
        this.nextInt = b
    }
    h.createRandomized = function() {
        var a = new Date;
        return new h(a / 6E4 & 4294967295,a & 4294967295)
    }
    ;
    return (new function(a) {
        function c(a, b, c, d) {
            a &= 15;
            var f = 8 > a ? b : c;
            b = 4 > a ? c : 12 === a || 14 === a ? b : d;
            return (0 === (a & 1) ? f : -f) + (0 === (a & 2) ? b : -b)
        }
        function d(a, b, c) {
            v = 0 == (a & 1) ? b : c;
            return 0 == (a & 2) ? -v : v
        }
        function f(a, b, c) {
            return b + a * (c - b)
        }
        a = void 0 !== a ? new h(a) : h.createRandomized();
        var b, k, p = Array(512);
        for (b = 0; 256 > b; ++b)
            p[b] = b;
        for (b = 0; 256 > b; ++b) {
            var r = p[k = a.nextInt() & 255];
            p[k] = p[b];
            p[b] = r
        }
        for (b = 0; 256 > b; ++b)
            p[b + 256] = p[b];
        var v;
        this.noise3d = function(a, b, d) {
            var h = Math.floor(a) & 255
              , k = Math.floor(b) & 255
              , l = Math.floor(d) & 255;
            a -= Math.floor(a);
            b -= Math.floor(b);
            d -= Math.floor(d);
            var r = (3 - 2 * a) * a * a
              , q = (3 - 2 * b) * b * b
              , t = p[h] + k
              , v = p[t] + l
              , t = p[t + 1] + l
              , k = p[h + 1] + k
              , h = p[k] + l
              , l = p[k + 1] + l;
            return f((3 - 2 * d) * d * d, f(q, f(r, c(p[v], a, b, d), c(p[h], a - 1, b, d)), f(r, c(p[t], a, b - 1, d), c(p[l], a - 1, b - 1, d))), f(q, f(r, c(p[v + 1], a, b, d - 1), c(p[h + 1], a - 1, b, d - 1)), f(r, c(p[t + 1], a, b - 1, d - 1), c(p[l + 1], a - 1, b - 1, d - 1))))
        }
        ;
        var x, A, l, q, y, u, t, E;
        this.noise2d = function(a, b) {
            t = Math.floor(a);
            E = Math.floor(b);
            x = t & 255;
            A = E & 255;
            a -= t;
            b -= E;
            l = (3 - 2 * a) * a * a;
            u = (3 - 2 * b) * b * b;
            q = p[x] + A;
            y = p[x + 1] + A;
            return f(u, f(l, d(p[q], a, b), d(p[y], a - 1, b)), f(l, d(p[q + 1], a, b - 1), d(p[y + 1], a - 1, b - 1)))
        }
        ;
        this.noise1d = function(a) {
            var b = Math.floor(a) & 255;
            a -= Math.floor(a);
            var c = a - 1;
            return f((3 - 2 * a) * a * a, 0 === (p[b] & 1) ? -a : a, 0 === (p[b + 1] & 1) ? -c : c)
        }
    }
    (void 0)).noise2d
});
define("dat/types/ExtendableFloatArray", [], function() {
    var h;
    h = "undefined" != typeof Float32Array ? Float32Array : Array;
    var a, c;
    return function(d) {
        d = d || {};
        c = {};
        for (a in d)
            (function(d) {
                c[a] = {
                    get: function() {
                        return this[d]
                    },
                    set: function(a) {
                        this[d] = a
                    }
                }
            })(d[a]);
        Object.defineProperties(h.prototype, c);
        return h
    }
});
define("workshop/FizzyText", ["workshop/improvedNoise", "dat/types/ExtendableFloatArray"], function(h, a) {
    function c() {
        var a = new b(5);
        a[0] = 0;
        a[1] = 0;
        a[2] = 0;
        a[3] = 0;
        a[4] = 0;
        return a
    }
    var d = 2 * Math.PI, f, b = a({
        x: 0,
        y: 1,
        r: 2,
        vx: 3,
        vy: 4
    });
    b.prototype.render = function(a) {
        a.beginPath();
        a.arc(this[0], this[1], this[2], 0, d, !1);
        a.fill()
    }
    ;
    b.prototype.update = function(a) {
        f = h(this[0] / a.noiseScale, this[1] / a.noiseScale) * a.noiseStrength;
        0 < a.getColor(this[0], this[1]) ? this[2] += a.growthSpeed : this[2] -= a.growthSpeed;
        this[3] *= .8;
        this[4] *= .8;
        this[0] += Math.cos(f) * a.speed + this[3];
        this[1] -= Math.sin(f) * a.speed + this[4];
        if (this[2] > a.maxSize)
            this[2] = a.maxSize;
        else if (0 > this[2])
            return this[2] = 0,
            this[0] = Math.random() * a.width,
            this[1] = a.height2 + (2 * Math.random() - 1) * a.fontSize2,
            !1;
        return !0
    }
    ;
    return function(a, b, f, h, x) {
        this.growthSpeed = .37;
        this.maxSize = 8;
        this.noiseStrength = 10;
        this.speed = .4;
        this.displayOutline = !1;
        this.framesRendered = 0;
        Object.defineProperty(this, "message", {
            get: function() {
                return a
            },
            set: function(b) {
                b = a = b;
                y.clearRect(0, 0, l, q);
                y.fillStyle = "#f00";
                y.textAlign = u.textAlign = "center";
                y.textBaseline = u.textBaseline = "middle";
                y.fillText(b, l / 2, q / 2);
                t = y.getImageData(0, 0, l, q).data
            }
        });
        this.explode = function() {
            for (var a in E) {
                var b = Math.random() * d;
                E[a][3] = 30 * Math.cos(b);
                E[a][4] = 30 * Math.sin(b)
            }
        }
        ;
        var A = this
          , l = b
          , q = f;
        x = x || 140;
        this.noiseScale = 300;
        this.color0 = "#00aeff";
        this.color1 = "#0fa954";
        this.color2 = "#54396e";
        this.color3 = "#e61d5f";
        b = document.createElement("canvas");
        var y = b.getContext("2d")
          , u = (this.domElement = document.createElement("canvas")).getContext("2d");
        this.domElement.width = this.width = b.width = l;
        this.domElement.height = this.height = b.height = q;
        var t = []
          , E = []
          , C = h ? "darker" : "lighter";
        y.font = u.font = "bold " + x + "px Helvetica, Arial, sans-serif";
        u.globalCompositeOperation = C;
        for (b = 0; 1200 > b; b++)
            E.push(c());
        var B, e, D, I = E.length / 4;
        this.height2 = q / 2;
        this.fontSize2 = x / 2;
        this.render = function() {
            A.framesRendered++;
            u.clearRect(0, 0, l, q);
            A.displayOutline && (u.globalCompositeOperation = "source-over",
            u.strokeStyle = h ? "#000" : "#fff",
            u.lineWidth = 2,
            u.strokeText(a, l / 2, q / 2),
            u.globalCompositeOperation = C);
            for (var b = 0; 4 > b; b++)
                for (u.fillStyle = this["color" + b],
                D = I * b,
                e = 0; e < I; e++)
                    B = E[e + D],
                    B.update(this) && B.render(u)
        }
        ;
        this.getColor = function(a, b) {
            return t[4 * (~~b * l + ~~a)]
        }
        ;
        this.message = a
    }
});
define("dat/google/webfont/loader", ["underscore"], function() {
    return function(h) {
        window.WebFontConfig = window.WebFontConfig || {};
        _.extend(window.WebFontConfig, h);
        h = document.createElement("script");
        h.src = ("https:" == document.location.protocol ? "https" : "http") + "://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
        h.type = "text/javascript";
        h.async = "true";
        var a = document.getElementsByTagName("script")[0];
        a.parentNode.insertBefore(h, a)
    }
});
define("examples/utils/utils", ["dat/dom/dom", "dat/utils/utils"], function(h, a) {
    return {
        addTableOfContents: function(a, d) {
            var f = document.createElement("ul");
            _.each(d.domElement.getElementsByClassName("slide"), function(a, b) {
                var c = a.innerHTML.match(/\<h1\>(.*)\<\/h1\>/)[1]
                  , v = "#" + c.replace(/[\ \W\s]/g, "-")
                  , x = document.createElement("li")
                  , A = document.createElement("a");
                A.setAttribute("href", v);
                A.innerHTML = c;
                h.bind(A, "click", function(a) {
                    a.preventDefault();
                    d.activate(b);
                    return !1
                });
                x.appendChild(A);
                f.appendChild(x)
            });
            a.appendChild(f);
            var b = h.getHeight(a);
            a.style.height = "0px";
            a.style.zIndex = "1001";
            h.bind(a.parentNode, "mouseover", function(d) {
                a.style.height = b + "px"
            }).bind(a.parentNode, "mouseout", function(b) {
                a.style.height = "0px"
            })
        },
        addBackButton: function(a) {
            var d = document.createElement("li");
            d.innerHTML = '<a id="back" href="/">back to workshop</a>';
            a.insertBefore(d, a.firstChild)
        },
        makeFooter: function(c, d, f) {
            var b = d[a.wrap(c - 1, d.length)]
              , k = d[a.wrap(c + 1, d.length)]
              , b = b.match(/\<h1\>(.*)\<\/h1\>/)[1] || ""
              , k = k.match(/\<h1\>(.*)\<\/h1\>/)[1] || ""
              , p = document.createElement("div");
            h.addClass(p, "nav");
            if (0 < c) {
                var r = document.createElement("a");
                r.innerHTML = b;
                r.setAttribute("href", "#");
                h.bind(r, "click", function(a) {
                    a.preventDefault();
                    f.prev();
                    return !1
                });
                h.addClass(r, "prev");
                p.appendChild(r)
            }
            c < d.length - 1 && (c = document.createElement("a"),
            c.innerHTML = k,
            c.setAttribute("href", "#"),
            h.bind(c, "click", function(a) {
                a.preventDefault();
                f.next();
                return !1
            }),
            h.addClass(c, "next"),
            p.appendChild(c));
            return p
        }
    }
});
window.PR_SHOULD_USE_CONTINUATION = !0;
window.PR_TAB_WIDTH = 8;
window.PR_normalizedHtml = window.PR = window.prettyPrintOne = window.prettyPrint = void 0;
window._pr_isIE6 = function() {
    var h = navigator && navigator.userAgent && navigator.userAgent.match(/\bMSIE ([678])\./)
      , h = h ? +h[1] : !1;
    window._pr_isIE6 = function() {
        return h
    }
    ;
    return h
}
;
(function() {
    function h(a) {
        return a.replace(l, "&amp;").replace(q, "&lt;").replace(y, "&gt;")
    }
    function a(b, c, d) {
        switch (b.nodeType) {
        case 1:
            var e = b.tagName.toLowerCase();
            c.push("<", e);
            var f = b.attributes
              , k = f.length;
            if (k) {
                if (d) {
                    for (var n = [], p = k; 0 <= --p; )
                        n[p] = f[p];
                    n.sort(function(a, b) {
                        return a.name < b.name ? -1 : a.name === b.name ? 0 : 1
                    });
                    f = n
                }
                for (p = 0; p < k; ++p)
                    n = f[p],
                    n.specified && c.push(" ", n.name.toLowerCase(), '="', n.value.replace(l, "&amp;").replace(q, "&lt;").replace(y, "&gt;").replace(u, "&quot;"), '"')
            }
            c.push(">");
            for (f = b.firstChild; f; f = f.nextSibling)
                a(f, c, d);
            !b.firstChild && /^(?:br|link|img)$/.test(e) || c.push("</", e, ">");
            break;
        case 3:
        case 4:
            c.push(h(b.nodeValue))
        }
    }
    function c(a) {
        function b(a) {
            if ("\\" !== a.charAt(0))
                return a.charCodeAt(0);
            switch (a.charAt(1)) {
            case "b":
                return 8;
            case "t":
                return 9;
            case "n":
                return 10;
            case "v":
                return 11;
            case "f":
                return 12;
            case "r":
                return 13;
            case "u":
            case "x":
                return parseInt(a.substring(2), 16) || a.charCodeAt(1);
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
                return parseInt(a.substring(1), 8);
            default:
                return a.charCodeAt(1)
            }
        }
        function c(a) {
            if (32 > a)
                return (16 > a ? "\\x0" : "\\x") + a.toString(16);
            a = String.fromCharCode(a);
            if ("\\" === a || "-" === a || "[" === a || "]" === a)
                a = "\\" + a;
            return a
        }
        function d(a) {
            var e = a.substring(1, a.length - 1).match(RegExp("\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]", "g"));
            a = [];
            for (var f = [], h = "^" === e[0], m = h ? 1 : 0, k = e.length; m < k; ++m) {
                var l = e[m];
                switch (l) {
                case "\\B":
                case "\\b":
                case "\\D":
                case "\\d":
                case "\\S":
                case "\\s":
                case "\\W":
                case "\\w":
                    a.push(l);
                    continue
                }
                var l = b(l), n;
                m + 2 < k && "-" === e[m + 1] ? (n = b(e[m + 2]),
                m += 2) : n = l;
                f.push([l, n]);
                65 > n || 122 < l || (65 > n || 90 < l || f.push([Math.max(65, l) | 32, Math.min(n, 90) | 32]),
                97 > n || 122 < l || f.push([Math.max(97, l) & -33, Math.min(n, 122) & -33]))
            }
            f.sort(function(a, b) {
                return a[0] - b[0] || b[1] - a[1]
            });
            e = [];
            l = [NaN, NaN];
            for (m = 0; m < f.length; ++m)
                k = f[m],
                k[0] <= l[1] + 1 ? l[1] = Math.max(l[1], k[1]) : e.push(l = k);
            f = ["["];
            h && f.push("^");
            f.push.apply(f, a);
            for (m = 0; m < e.length; ++m)
                k = e[m],
                f.push(c(k[0])),
                k[1] > k[0] && (k[1] + 1 > k[0] && f.push("-"),
                f.push(c(k[1])));
            f.push("]");
            return f.join("")
        }
        function e(a) {
            for (var b = a.source.match(RegExp("(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)", "g")), c = b.length, g = [], m = 0, k = 0; m < c; ++m) {
                var l = b[m];
                "(" === l ? ++k : "\\" === l.charAt(0) && (l = +l.substring(1)) && l <= k && (g[l] = -1)
            }
            for (m = 1; m < g.length; ++m)
                -1 === g[m] && (g[m] = ++f);
            for (k = m = 0; m < c; ++m)
                l = b[m],
                "(" === l ? (++k,
                void 0 === g[k] && (b[m] = "(?:")) : "\\" === l.charAt(0) && (l = +l.substring(1)) && l <= k && (b[m] = "\\" + g[k]);
            for (k = m = 0; m < c; ++m)
                "^" === b[m] && "^" !== b[m + 1] && (b[m] = "");
            if (a.ignoreCase && h)
                for (m = 0; m < c; ++m)
                    l = b[m],
                    a = l.charAt(0),
                    2 <= l.length && "[" === a ? b[m] = d(l) : "\\" !== a && (b[m] = l.replace(/[a-zA-Z]/g, function(a) {
                        a = a.charCodeAt(0);
                        return "[" + String.fromCharCode(a & -33, a | 32) + "]"
                    }));
            return b.join("")
        }
        for (var f = 0, h = !1, k = !1, l = 0, n = a.length; l < n; ++l) {
            var p = a[l];
            if (p.ignoreCase)
                k = !0;
            else if (/[a-z]/i.test(p.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi, ""))) {
                h = !0;
                k = !1;
                break
            }
        }
        for (var r = [], l = 0, n = a.length; l < n; ++l) {
            p = a[l];
            if (p.global || p.multiline)
                throw Error("" + p);
            r.push("(?:" + e(p) + ")")
        }
        return new RegExp(r.join("|"),k ? "gi" : "g")
    }
    function d(a) {
        var b = 0;
        return function(c) {
            for (var d = null, e = 0, f = 0, h = c.length; f < h; ++f)
                switch (c.charAt(f)) {
                case "\t":
                    d || (d = []);
                    d.push(c.substring(e, f));
                    e = a - b % a;
                    for (b += e; 0 <= e; e -= 16)
                        d.push("                ".substring(0, e));
                    e = f + 1;
                    break;
                case "\n":
                    b = 0;
                    break;
                default:
                    ++b
                }
            if (!d)
                return c;
            d.push(c.substring(e));
            return d.join("")
        }
    }
    function f(a, b, c, d) {
        b && (a = {
            source: b,
            basePos: a
        },
        c(a),
        d.push.apply(d, a.decorations))
    }
    function b(a, b) {
        var d = {}, e;
        (function() {
            for (var f = a.concat(b), h = [], k = {}, l = 0, n = f.length; l < n; ++l) {
                var p = f[l]
                  , r = p[3];
                if (r)
                    for (var q = r.length; 0 <= --q; )
                        d[r.charAt(q)] = p;
                p = p[1];
                r = "" + p;
                k.hasOwnProperty(r) || (h.push(p),
                k[r] = null)
            }
            h.push(/[\0-\uffff]/);
            e = c(h)
        })();
        var h = b.length
          , k = function(a) {
            for (var c = a.basePos, m = [c, "pln"], l = 0, n = a.source.match(e) || [], p = {}, r = 0, q = n.length; r < q; ++r) {
                var t = n[r], u = p[t], w = void 0, y;
                if ("string" === typeof u)
                    y = !1;
                else {
                    var x = d[t.charAt(0)];
                    if (x)
                        w = t.match(x[1]),
                        u = x[0];
                    else {
                        for (y = 0; y < h; ++y)
                            if (x = b[y],
                            w = t.match(x[1])) {
                                u = x[0];
                                break
                            }
                        w || (u = "pln")
                    }
                    !(y = 5 <= u.length && "lang-" === u.substring(0, 5)) || w && "string" === typeof w[1] || (y = !1,
                    u = "src");
                    y || (p[t] = u)
                }
                x = l;
                l += t.length;
                if (y) {
                    y = w[1];
                    var A = t.indexOf(y)
                      , B = A + y.length;
                    w[2] && (B = t.length - w[2].length,
                    A = B - y.length);
                    u = u.substring(5);
                    f(c + x, t.substring(0, A), k, m);
                    f(c + x + A, y, v(u, y), m);
                    f(c + x + B, t.substring(B), k, m)
                } else
                    m.push(c + x, u)
            }
            a.decorations = m
        };
        return k
    }
    function k(a) {
        var c = []
          , d = [];
        a.tripleQuotedStrings ? c.push(["str", /^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/, null, "'\""]) : a.multiLineStrings ? c.push(["str", /^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/, null, "'\"`"]) : c.push(["str", /^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/, null, "\"'"]);
        a.verbatimStrings && d.push(["str", /^@\"(?:[^\"]|\"\")*(?:\"|$)/, null]);
        var e = a.hashComments;
        e && (a.cStyleComments ? (1 < e ? c.push(["com", /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, null, "#"]) : c.push(["com", /^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\r\n]*)/, null, "#"]),
        d.push(["str", /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h|[a-z]\w*)>/, null])) : c.push(["com", /^#[^\r\n]*/, null, "#"]));
        a.cStyleComments && (d.push(["com", /^\/\/[^\r\n]*/, null]),
        d.push(["com", /^\/\*[\s\S]*?(?:\*\/|$)/, null]));
        a.regexLiterals && d.push(["lang-regex", new RegExp("^" + A + "(/(?=[^/*])(?:[^/\\x5B\\x5C]|\\x5C[\\s\\S]|\\x5B(?:[^\\x5C\\x5D]|\\x5C[\\s\\S])*(?:\\x5D|$))+/)")]);
        a = a.keywords.replace(/^\s+|\s+$/g, "");
        a.length && d.push(["kwd", new RegExp("^(?:" + a.replace(/\s+/g, "|") + ")\\b"), null]);
        c.push(["pln", /^\s+/, null, " \r\n\t\u00a0"]);
        d.push(["lit", /^@[a-z_$][a-z_$@0-9]*/i, null], ["typ", /^@?[A-Z]+[a-z][A-Za-z_$@0-9]*/, null], ["pln", /^[a-z_$][a-z_$@0-9]*/i, null], ["lit", /^(?:0x[a-f0-9]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+\-]?\d+)?)[a-z]*/i, null, "0123456789"], ["pun", /^.[^\s\w\.$@\'\"\`\/\#]*/, null]);
        return b(c, d)
    }
    function p(a) {
        function b(a) {
            if (a > p) {
                r && r !== t && (n.push("</span>"),
                r = null);
                !r && t && (r = t,
                n.push('<span class="', r, '">'));
                var d = h(v(c.substring(p, a))).replace(B ? y : w, "$1&#160;");
                B = A.test(d);
                n.push(d.replace(x, D));
                p = a
            }
        }
        var c = a.source, e = a.extractedTags, f = a.decorations, k = a.numberLines, l = a.sourceNode, n = [], p = 0, r = null, t = null, q = 0, u = 0, v = d(window.PR_TAB_WIDTH), w = /([\r\n ]) /g, y = /(^| ) /gm, x = /\r\n?|\n/g, A = /[ \r\n]$/, B = !0, C = window._pr_isIE6(), l = C ? l && "PRE" === l.tagName ? 6 === C ? "&#160;\r\n" : 7 === C ? "&#160;<br />\r" : 8 === C ? "&#160;<br />" : "&#160;\r" : "&#160;<br />" : "<br />", D;
        if (k) {
            for (var E = [], C = 0; 10 > C; ++C)
                E[C] = l + '</li><li class="L' + C + '">';
            var G = "number" === typeof k ? k - 1 : 0;
            n.push('<ol class="linenums"><li class="L', G % 10, '"');
            G && n.push(' value="', G + 1, '"');
            n.push(">");
            D = function() {
                var a = E[++G % 10];
                return r ? "</span>" + a + '<span class="' + r + '">' : a
            }
        } else
            D = l;
        for (; ; )
            if (q < e.length && (u < f.length ? e[q] <= f[u] : 1))
                b(e[q]),
                r && (n.push("</span>"),
                r = null),
                n.push(e[q + 1]),
                q += 2;
            else if (u < f.length)
                b(f[u]),
                t = f[u + 1],
                u += 2;
            else
                break;
        b(c.length);
        r && n.push("</span>");
        k && n.push("</li></ol>");
        a.prettyPrintedHtml = n.join("")
    }
    function r(a, b) {
        for (var c = b.length; 0 <= --c; ) {
            var d = b[c];
            J.hasOwnProperty(d) ? "console"in window && console.warn("cannot override language handler %s", d) : J[d] = a
        }
    }
    function v(a, b) {
        a && J.hasOwnProperty(a) || (a = /^\s*</.test(b) ? "default-markup" : "default-code");
        return J[a]
    }
    function x(a) {
        var b, c = a.sourceCodeHtml, d = a.langExtension;
        a.prettyPrintedHtml = c;
        try {
            var f = c.match(O)
              , c = []
              , h = 0
              , k = [];
            if (f)
                for (var l = 0, r = f.length; l < r; ++l) {
                    var q = f[l];
                    if (1 < q.length && "<" === q.charAt(0)) {
                        if (!G.test(q))
                            if (w.test(q))
                                c.push(q.substring(9, q.length - 3)),
                                h += q.length - 12;
                            else if (M.test(q))
                                c.push("\n"),
                                ++h;
                            else if (0 <= q.indexOf("nocode") && q.replace(/\s(\w+)\s*=\s*(?:\"([^\"]*)\"|'([^\']*)'|(\S+))/g, ' $1="$2$3$4"').match(/[cC][lL][aA][sS][sS]=\"[^\"]*\bnocode\b/)) {
                                var u = q.match(n)[2], y = 1, x;
                                x = l + 1;
                                a: for (; x < r; ++x) {
                                    var A = f[x].match(n);
                                    if (A && A[2] === u)
                                        if ("/" === A[1]) {
                                            if (0 === --y)
                                                break a
                                        } else
                                            ++y
                                }
                                x < r ? (k.push(h, f.slice(l, x + 1).join("")),
                                l = x) : k.push(h, q)
                            } else
                                k.push(h, q)
                    } else {
                        var V;
                        var y = q
                          , F = y.indexOf("&");
                        if (0 > F)
                            V = y;
                        else {
                            for (--F; 0 <= (F = y.indexOf("&#", F + 1)); ) {
                                var J = y.indexOf(";", F);
                                if (0 <= J) {
                                    var I = y.substring(F + 3, J)
                                      , L = 10;
                                    I && "x" === I.charAt(0) && (I = I.substring(1),
                                    L = 16);
                                    var da = parseInt(I, L);
                                    isNaN(da) || (y = y.substring(0, F) + String.fromCharCode(da) + y.substring(J + 1))
                                }
                            }
                            V = y.replace(t, "<").replace(E, ">").replace(C, "'").replace(B, '"').replace(D, " ").replace(e, "&")
                        }
                        c.push(V);
                        h += V.length
                    }
                }
            b = c.join("");
            a.source = b;
            a.basePos = 0;
            a.extractedTags = k;
            v(d, b)(a);
            p(a)
        } catch (Y) {
            "console"in window && console.log(Y && Y.stack ? Y.stack : Y)
        }
    }
    var A = function() {
        for (var a = "! != !== # % %= & && &&= &= ( * *= += , -= -> / /= : :: ; < << <<= <= = == === > >= >> >>= >>> >>>= ? @ [ ^ ^= ^^ ^^= { | |= || ||= ~ break case continue delete do else finally instanceof return throw try typeof".split(" "), b = "(?:^^|[+-]", c = 0; c < a.length; ++c)
            b += "|" + a[c].replace(/([^=<>:&a-z])/g, "\\$1");
        return b + ")\\s*"
    }()
      , l = /&/g
      , q = /</g
      , y = />/g
      , u = /\"/g
      , t = /&lt;/g
      , E = /&gt;/g
      , C = /&apos;/g
      , B = /&quot;/g
      , e = /&amp;/g
      , D = /&nbsp;/g
      , I = /[\r\n]/g
      , F = null
      , O = RegExp("[^<]+|\x3c!--[\\s\\S]*?--\x3e|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>|</?[a-zA-Z](?:[^>\"']|'[^']*'|\"[^\"]*\")*>|<", "g")
      , G = /^<\!--/
      , w = /^<!\[CDATA\[/
      , M = /^<br\b/i
      , n = /^<(\/?)([a-zA-Z][a-zA-Z0-9]*)/
      , L = k({
        keywords: "break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof alignof align_union asm axiom bool concept concept_map const_cast constexpr decltype dynamic_cast explicit export friend inline late_check mutable namespace nullptr reinterpret_cast static_assert static_cast template typeid typename using virtual wchar_t where break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof abstract boolean byte extends final finally implements import instanceof null native package strictfp super synchronized throws transient as base by checked decimal delegate descending dynamic event fixed foreach from group implicit in interface internal into is lock object out override orderby params partial readonly ref sbyte sealed stackalloc string select uint ulong unchecked unsafe ushort var break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof debugger eval export function get null set undefined var with Infinity NaN caller delete die do dump elsif eval exit foreach for goto if import last local my next no our print package redo require sub undef unless until use wantarray while BEGIN END break continue do else for if return while and as assert class def del elif except exec finally from global import in is lambda nonlocal not or pass print raise try with yield False True None break continue do else for if return while alias and begin case class def defined elsif end ensure false in module next nil not or redo rescue retry self super then true undef unless until when yield BEGIN END break continue do else for if return while case done elif esac eval fi function in local set then until ",
        hashComments: !0,
        cStyleComments: !0,
        multiLineStrings: !0,
        regexLiterals: !0
    })
      , J = {};
    r(L, ["default-code"]);
    r(b([], [["pln", /^[^<?]+/], ["dec", /^<!\w[^>]*(?:>|$)/], ["com", /^<\!--[\s\S]*?(?:-\->|$)/], ["lang-", /^<\?([\s\S]+?)(?:\?>|$)/], ["lang-", /^<%([\s\S]+?)(?:%>|$)/], ["pun", /^(?:<[%?]|[%?]>)/], ["lang-", /^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i], ["lang-js", /^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i], ["lang-css", /^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i], ["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i]]), "default-markup htm html mxml xhtml xml xsl".split(" "));
    r(b([["pln", /^[\s]+/, null, " \t\r\n"], ["atv", /^(?:\"[^\"]*\"?|\'[^\']*\'?)/, null, "\"'"]], [["tag", /^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i], ["atn", /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i], ["lang-uq.val", /^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/], ["pun", /^[=<>\/]+/], ["lang-js", /^on\w+\s*=\s*\"([^\"]+)\"/i], ["lang-js", /^on\w+\s*=\s*\'([^\']+)\'/i], ["lang-js", /^on\w+\s*=\s*([^\"\'>\s]+)/i], ["lang-css", /^style\s*=\s*\"([^\"]+)\"/i], ["lang-css", /^style\s*=\s*\'([^\']+)\'/i], ["lang-css", /^style\s*=\s*([^\"\'>\s]+)/i]]), ["in.tag"]);
    r(b([], [["atv", /^[\s\S]+/]]), ["uq.val"]);
    r(k({
        keywords: "break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof alignof align_union asm axiom bool concept concept_map const_cast constexpr decltype dynamic_cast explicit export friend inline late_check mutable namespace nullptr reinterpret_cast static_assert static_cast template typeid typename using virtual wchar_t where ",
        hashComments: !0,
        cStyleComments: !0
    }), "c cc cpp cxx cyc m".split(" "));
    r(k({
        keywords: "null true false"
    }), ["json"]);
    r(k({
        keywords: "break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof abstract boolean byte extends final finally implements import instanceof null native package strictfp super synchronized throws transient as base by checked decimal delegate descending dynamic event fixed foreach from group implicit in interface internal into is lock object out override orderby params partial readonly ref sbyte sealed stackalloc string select uint ulong unchecked unsafe ushort var ",
        hashComments: !0,
        cStyleComments: !0,
        verbatimStrings: !0
    }), ["cs"]);
    r(k({
        keywords: "break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof abstract boolean byte extends final finally implements import instanceof null native package strictfp super synchronized throws transient ",
        cStyleComments: !0
    }), ["java"]);
    r(k({
        keywords: "break continue do else for if return while case done elif esac eval fi function in local set then until ",
        hashComments: !0,
        multiLineStrings: !0
    }), ["bsh", "csh", "sh"]);
    r(k({
        keywords: "break continue do else for if return while and as assert class def del elif except exec finally from global import in is lambda nonlocal not or pass print raise try with yield False True None ",
        hashComments: !0,
        multiLineStrings: !0,
        tripleQuotedStrings: !0
    }), ["cv", "py"]);
    r(k({
        keywords: "caller delete die do dump elsif eval exit foreach for goto if import last local my next no our print package redo require sub undef unless until use wantarray while BEGIN END ",
        hashComments: !0,
        multiLineStrings: !0,
        regexLiterals: !0
    }), ["perl", "pl", "pm"]);
    r(k({
        keywords: "break continue do else for if return while alias and begin case class def defined elsif end ensure false in module next nil not or redo rescue retry self super then true undef unless until when yield BEGIN END ",
        hashComments: !0,
        multiLineStrings: !0,
        regexLiterals: !0
    }), ["rb"]);
    r(k({
        keywords: "break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof debugger eval export function get null set undefined var with Infinity NaN ",
        cStyleComments: !0,
        regexLiterals: !0
    }), ["js"]);
    r(k({
        keywords: "all and by catch class else extends false finally for if in is isnt loop new no not null of off on or return super then true try unless until when while yes ",
        hashComments: 3,
        cStyleComments: !0,
        multilineStrings: !0,
        tripleQuotedStrings: !0,
        regexLiterals: !0
    }), ["coffee"]);
    r(b([], [["str", /^[\s\S]+/]]), ["regex"]);
    window.PR_normalizedHtml = a;
    window.prettyPrintOne = function(a, b, c) {
        a = {
            sourceCodeHtml: a,
            langExtension: b,
            numberLines: c
        };
        x(a);
        return a.prettyPrintedHtml
    }
    ;
    window.prettyPrint = function(b) {
        function c() {
            for (var d = window.PR_SHOULD_USE_CONTINUATION ? n.now() + 250 : Infinity; p < e.length && n.now() < d; p++) {
                var f = e[p];
                if (f.className && 0 <= f.className.indexOf("prettyprint")) {
                    var k = f.className.match(/\blang-(\w+)\b/);
                    k && (k = k[1]);
                    for (var l = !1, q = f.parentNode; q; q = q.parentNode)
                        if (("pre" === q.tagName || "code" === q.tagName || "xmp" === q.tagName) && q.className && 0 <= q.className.indexOf("prettyprint")) {
                            l = !0;
                            break
                        }
                    if (!l) {
                        q = f;
                        null === F && (l = document.createElement("PRE"),
                        l.appendChild(document.createTextNode('<!DOCTYPE foo PUBLIC "foo bar">\n<foo />')),
                        F = !/</.test(l.innerHTML));
                        if (F)
                            if (l = q.innerHTML,
                            "XMP" === q.tagName)
                                l = h(l);
                            else {
                                if ("PRE" !== q.tagName && I.test(l)) {
                                    var t = "";
                                    q.currentStyle ? t = q.currentStyle.whiteSpace : window.getComputedStyle && (t = window.getComputedStyle(q, null).whiteSpace);
                                    q = !t || "pre" === t
                                } else
                                    q = !0;
                                q || (l = l.replace(/(<br\s*\/?>)[\r\n]+/g, "$1").replace(/(?:[\r\n]+[ \t]*)+/g, " "))
                            }
                        else {
                            l = [];
                            for (q = q.firstChild; q; q = q.nextSibling)
                                a(q, l);
                            l = l.join("")
                        }
                        l = l.replace(/(?:\r\n?|\n)$/, "");
                        q = f.className.match(/\blinenums\b(?::(\d+))?/);
                        r = {
                            sourceCodeHtml: l,
                            langExtension: k,
                            sourceNode: f,
                            numberLines: q ? q[1] && q[1].length ? +q[1] : !0 : !1
                        };
                        x(r);
                        if (f = r.prettyPrintedHtml)
                            if (k = r.sourceNode,
                            "XMP" === k.tagName) {
                                l = document.createElement("PRE");
                                for (q = 0; q < k.attributes.length; ++q)
                                    t = k.attributes[q],
                                    t.specified && ("class" === t.name.toLowerCase() ? l.className = t.value : l.setAttribute(t.name, t.value));
                                l.innerHTML = f;
                                k.parentNode.replaceChild(l, k)
                            } else
                                k.innerHTML = f
                    }
                }
            }
            p < e.length ? setTimeout(c, 250) : b && b()
        }
        for (var d = [document.getElementsByTagName("pre"), document.getElementsByTagName("code"), document.getElementsByTagName("xmp")], e = [], f = 0; f < d.length; ++f)
            for (var k = 0, l = d[f].length; k < l; ++k)
                e.push(d[f][k]);
        var d = null
          , n = Date;
        n.now || (n = {
            now: function() {
                return (new Date).getTime()
            }
        });
        var p = 0, r;
        c()
    }
    ;
    window.PR = {
        combinePrefixPatterns: c,
        createSimpleLexer: b,
        registerLangHandler: r,
        sourceDecorator: k,
        PR_ATTRIB_NAME: "atn",
        PR_ATTRIB_VALUE: "atv",
        PR_COMMENT: "com",
        PR_DECLARATION: "dec",
        PR_KEYWORD: "kwd",
        PR_LITERAL: "lit",
        PR_NOCODE: "nocode",
        PR_PLAIN: "pln",
        PR_PUNCTUATION: "pun",
        PR_SOURCE: "src",
        PR_STRING: "str",
        PR_TAG: "tag",
        PR_TYPE: "typ"
    }
})();
define("prettyprint", function() {});
require({
    paths: {
        prettyprint: "../third-party/prettify",
        text: "../third-party/requirejs/text",
        underscore: "../third-party/underscore",
        order: "../third-party/requirejs/order"
    },
    baseUrl: "../../",
    priority: ["underscore"]
});
require("dat/slides/Slides dat/dom/dom text!examples/gui/contents.html dat/gui/GUI workshop/FizzyText dat/utils/utils dat/google/webfont/loader examples/utils/utils underscore prettyprint".split(" "), function(h, a, c, d, f, b, k, p) {
    k({
        google: {
            families: ["Terminal Dosis:300,500,700"]
        }
    });
    c = c.split("<article>");
    c.splice(0, 1);
    c[c.length - 1] = c[c.length - 1].replace(/\<\/body\>(\n|\r\n)\<\/html\>/, "");
    var r = new h({
        autoUI: !0
    });
    document.body.appendChild(r.domElement);
    var v = []
      , x = [];
    r.domElement.style.visibility = "hidden";
    var A = [, "constrain", "folders", "colors!", "saving", , "events"];
    _.each(c, function(b, h) {
        var k = {
            autoPlace: !1,
            resizable: !0,
            scrollable: !0,
            hideable: !0
        };
        5 == h && (k.load = {
            preset: "Flow",
            remembered: {
                Default: {
                    0: {
                        message: "Jake Elwes",
                        speed: .4,
                        growthSpeed: .37,
                        noiseStrength: 10,
                        maxSize: 6.4
                    }
                },
                Flow: {
                    0: {
                        message: "Doesn't really matter.",
                        speed: 1.76,
                        growthSpeed: .21,
                        noiseStrength: 88,
                        maxSize: 6.4
                    }
                },
                Slow: {
                    0: {
                        message: "SLOW",
                        speed: .12,
                        growthSpeed: .08,
                        noiseStrength: 13,
                        maxSize: 10
                    }
                }
            },
            closed: !1,
            folders: {}
        });
        v.push(new d(k));
        k = new f(A[h] || "Jake Elwes",600,150,!0,100);
        k.maxSize *= .8;
        x.push(k);
        var u = v[h]
          , t = x[h]
          , k = function() {
            t.render(!0)
        };
        _.extend(u.domElement.style, {
            position: "absolute",
            width: d.DEFAULT_WIDTH + "px",
            top: "0px",
            right: "20px"
        });
        var E = document.createElement("div");
        a.addClass(E, "content");
        E.innerHTML = b;
        E.appendChild(p.makeFooter(h, c, r));
        E.insertBefore(t.domElement, E.firstChild);
        E.insertBefore(u.domElement, t.domElement);
        switch (h) {
        case 0:
            u.add(t, "message");
            u.add(t, "speed", -5, 5);
            u.add(t, "displayOutline");
            u.add(t, "explode");
            break;
        case 1:
            t.noiseStrength = 10;
            t.growthSpeed = .2;
            t.maxSize = 6;
            t.speed = .1;
            u.add(t, "noiseStrength").step(5);
            u.add(t, "growthSpeed", -5, 5);
            u.add(t, "maxSize").min(0).step(.25);
            u.add(t, "message", ["constrain", "pizza", "chrome"]);
            u.add(t, "speed", {
                Stopped: 0,
                Slow: .1,
                Fast: 5
            });
            break;
        case 2:
            t.growthSpeed = .2;
            t.maxSize = 10;
            t.speed = .4;
            var C = u.addFolder("Flow Field");
            C.add(t, "speed");
            C.add(t, "noiseStrength");
            u = u.addFolder("Letters");
            u.open();
            u.add(t, "growthSpeed");
            u.add(t, "maxSize");
            u.add(t, "message");
            break;
        case 3:
            t.color0 = "#00d3e1";
            t.color1 = "#ffffff";
            t.color2 = "#fff000";
            t.color3 = "#000000";
            u.addColor(t, "color0");
            u.addColor(t, "color1");
            u.addColor(t, "color2");
            u.addColor(t, "color3");
            break;
        case 4:
            u.remember(t);
            u.add(t, "message");
            u.add(t, "speed", 0, 4);
            u.add(t, "growthSpeed", 0, 1);
            u.add(t, "noiseStrength", 0, 170);
            u.add(t, "maxSize", 0, 10);
            break;
        case 5:
            u.remember(t);
            u.add(t, "message");
            u.add(t, "speed", 0, 4);
            u.add(t, "growthSpeed", 0, 1);
            u.add(t, "noiseStrength", 0, 170);
            u.add(t, "maxSize", 0, 10);
            window.gg = u;
            break;
        case 6:
            u.add(t, "maxSize", 0, 10).onFinishChange(function(a) {
                alert("The new value is " + a)
            });
            break;
        case 7:
            u.add(t, "message");
            u.add(t, "speed", 0, 5);
            u.domElement.style.cssText = "position: absolute; -moz-transform: rotate(20deg);    -moz-transform-origin: 60% 100%;    -webkit-transform: rotate(20deg);    -webkit-transform-origin: 60% 100%;    -o-transform: rotate(20deg);     -o-transform-origin:60% 100%;    -ms-transform: rotate(20deg);    -ms-transform-origin: 60% 100%;    transform: rotate(20deg);    transform-origin: 60% 100%;";
            break;
        case 8:
            u.add(t, "noiseStrength", 0, 100).listen();
            k = _.compose(k, function() {
                t.noiseStrength = 50 * Math.cos(Date.now() / 1E3) + 50
            });
            break;
        case 9:
            u.add(t, "noiseStrength", 0, 100).listen();
            k = _.compose(k, function() {
                t.noiseStrength = 50 * Math.cos(Date.now() / 1E3) + 50
            });
            break;
        default:
            u.add(t, "message"),
            u.add(t, "speed")
        }
        t.domElement.setAttribute("id", "fizzy-" + h);
        r.add(E, k)
    });
    h = document.createElement("div");
    _.extend(h.style, {
        background: "url(/img/itgivesyouthis.gif) no-repeat",
        width: "130px",
        zIndex: -1,
        height: "95px",
        position: "absolute",
        top: "137px",
        right: "70px"
    });
    b = r.domElement.firstElementChild.firstElementChild;
    b.insertBefore(h, b.firstElementChild);
    (function(b) {
        var c = document.createElement("div");
        c.setAttribute("id", "downloads");
        a.addClass(c, "last");
        a.makeSelectable(c, !1);
        c.innerHTML = '<ul><li class="source"><a href="https://github.com/dataarts/dat.gui">Source</a></li><li class="min-dot-js"><a href="https://raw.github.com/dataarts/dat.gui/master/build/dat.gui.min.js">dat.gui.min.js</a></li><li class="dot-js"><a href="https://raw.github.com/dataarts/dat.gui/master/build/dat.gui.js">dat.gui.js</a></li></ul>';
        b.appendChild(c);
        b = b.getElementsByClassName("slides")[0];
        var d = a.getHeight(c);
        _.each(b.children, function(a) {
            a.getElementsByClassName("content")[0].style.paddingBottom = d + "px"
        })
    })(document.body);
    p.addBackButton(r.navContainer.firstChild);
    p.addTableOfContents(document.getElementById("dat-slides-toc"), r);
    _.delay(function() {
        r.domElement.style.visibility = "visible";
        prettyPrint()
    }, 250)
});
define("mainLib", function() {});
