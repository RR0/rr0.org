(function () {/*

 Copyright 2018 Google Inc
 SPDX-License-Identifier: Apache-2.0
*/
  /*

 Copyright Google LLC
 SPDX-License-Identifier: Apache-2.0
*/
  /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
  var aa = "\"Helvetica Neue Light\", HelveticaNeue-Light, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
    ba = "#content", da = "#gadget-dock", ea = "#overview", fa = "#sidebar", ha = "#sidebar .items",
    ia = "-9223372036854775808", ja = ".filtered", ka = ".gadget-content", la = ".gadget-resize-detector", g = ".item",
    ma = ".item.filtered", na = ".item.open", oa = ".item[data-id=\"", pa = ".items", qa = ".items .item",
    ra = ".lightbox-content", sa = ".lightbox-panel", ta = ".overview-content",
    ua = ".singleton-element, #injected-iframe", va = ".toggle-container",
    wa = ".toggle-switch", xa = ".viewitem-panel", Aa = "/feeds/posts/default", Ba = "/search/label/",
    Ca = "18446744073709551615", Da = "9223372036854775807", Ea = "<a name='more'></a>", Fa = "Attribution",
    Ga = "BigInt too big", Ia = "BlogArchive", Ja = "Convert JSBI instances to native numbers using `toNumber`.",
    p = "Date", Ka = "Failed to parse post content", La = "Item", Ma = "Missing or invalid tag", Na = "Overview",
    Oa = "SCRIPT", Pa = "Symbol.dispose", Qa = "Symbol.iterator", Ra = "ViewItem", Sa = "__filtered", Ta = "__nested:",
    Ua = "_relative", Va = "about:invalid#zClosurez",
    Wa = "action", Xa = "active", Ya = "adsense_client_id", Za = "allowtransparency", $a = "animating",
    ab = "archive_blogspot", db = "bigint", eb = "blitzBaseUrl", fb = "blog_url", gb = "blogarchive-expanded",
    hb = "blogarchive-loading", ib = "body", jb = "boolean", kb = "class", lb = "clearselection", mb = "click",
    nb = "closing", ob = "collapse-breaks", pb = "comments_enabled", qb = "current", rb = "data-id",
    sb = "data-item-type", tb = "data-no-self-select", ub = "data-src",
    vb = "data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==", wb = "defer",
    xb = "dynamicviews", yb = "embed", zb = "enableGadgets", Ab = "false", Bb = "fetchend", Cb = "fetchstart",
    Db = "filter_permalink", q = "filtered", r = "function", Eb = "gadget-dock-overflow-bottom",
    Fb = "gadget-dock-overflow-client-area", Gb = "gadget-dock-overflow-normal", Hb = "gadget-opening",
    Ib = "gadget-selected", Jb = "goog.Promise.then", Kb = "head", Lb = "headless", Mb = "height", Nb = "href",
    Ob = "https", Pb = "https://lh3.googleusercontent.com", Qb = "id", Rb = "iframe", Sb = "implementation bug",
    Tb = "instant", Ub = "item_blogspot", Vb = "lightbox", Wb = "loadcomplete",
    Xb = "margin-top", Yb = "none", t = "number", Zb = "object", $b = "opacity", ac = "open",
    bc = "opt_onFulfilled should be a function.",
    cc = "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?",
    dc = "permalinked", ec = "photo", fc = "published", hc = "px", ic = "resize", jc = "responseType",
    kc = "rewriteforssl", lc = "right", mc = "scroll", nc = "searching", oc = "select", pc = "selected",
    qc = "singleton-element", rc = "size:thumbnail", sc = "smooth", v = "src", tc = "start",
    x = "state is only maintained on arrays.",
    uc = "static_page", z = "string", vc = "style", wc = "symbol", xc = "text/javascript", yc = "toggle-active",
    zc = "transition", Ac = "transparent", Bc = "true", Cc = "unhandledrejection", Dc = "unknown", Ec = "updated",
    Fc = "video", Gc = "view", Hc = "viewitem", Ic = "viewitem-show", Jc = "webkit", Kc = "widgetId", A

  function Lc(a) {
    var b = 0
    return function () {return b < a.length ? { done: !1, value: a[b++] } : { done: !0 }}
  }

  var Mc = typeof Object.defineProperties == r ? Object.defineProperty : function (a, b, c) {
    if (a == Array.prototype || a == Object.prototype) return a
    a[b] = c.value
    return a
  }

  function Nc(a) {
    a = [Zb == typeof globalThis && globalThis, a, Zb == typeof window && window, Zb == typeof self && self, Zb == typeof global && global]
    for (var b = 0; b < a.length; ++b) {
      var c = a[b]
      if (c && c.Math == Math) return c
    }
    throw Error("Cannot find global object")
  }

  var Oc = Nc(this)

  function C(a, b) {
    if (b) a:{
      var c = Oc
      a = a.split(".")
      for (var d = 0; d < a.length - 1; d++) {
        var e = a[d]
        if (!(e in c)) break a
        c = c[e]
      }
      a = a[a.length - 1]
      d = c[a]
      b = b(d)
      b != d && b != null && Mc(c, a, { configurable: !0, writable: !0, value: b })
    }
  }

  C("Symbol", function (a) {
    function b(f) {
      if (this instanceof b) throw new TypeError("Symbol is not a constructor")
      return new c(d + (f || "") + "_" + e++, f)
    }

    function c(f, h) {
      this.Ij = f
      Mc(this, "description", { configurable: !0, writable: !0, value: h })
    }

    if (a) return a
    c.prototype.toString = function () {return this.Ij}
    var d = "jscomp_symbol_" + (Math.random() * 1E9 >>> 0) + "_", e = 0
    return b
  })
  C(Qa, function (a) {
    if (a) return a
    a = Symbol(Qa)
    for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
      var d = Oc[b[c]]
      typeof d === r && typeof d.prototype[a] != r && Mc(d.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function () {return Pc(Lc(this))}
      })
    }
    return a
  })

  function Pc(a) {
    a = { next: a }
    a[Symbol.iterator] = function () {return this}
    return a
  }

  var Qc = typeof Object.create == r ? Object.create : function (a) {
    function b() {}

    b.prototype = a
    return new b
  }, Rc = function () {
    function a() {
      function c() {}

      new c
      Reflect.construct(c, [], function () {})
      return new c instanceof c
    }

    if (typeof Reflect != "undefined" && Reflect.construct) {
      if (a()) return Reflect.construct
      var b = Reflect.construct
      return function (c, d, e) {
        c = b(c, d)
        e && Reflect.setPrototypeOf(c, e.prototype)
        return c
      }
    }
    return function (c, d, e) {
      e === void 0 && (e = c)
      e = Qc(e.prototype || Object.prototype)
      return Function.prototype.apply.call(c,
        e, d) || e
    }
  }(), Sc
  if (typeof Object.setPrototypeOf == r) Sc = Object.setPrototypeOf else {
    var Tc
    a:{
      var Uc = { a: !0 }, Vc = {}
      try {
        Vc.__proto__ = Uc
        Tc = Vc.a
        break a
      } catch (a) {}
      Tc = !1
    }
    Sc = Tc ? function (a, b) {
      a.__proto__ = b
      if (a.__proto__ !== b) throw new TypeError(a + " is not extensible")
      return a
    } : null
  }
  var Wc = Sc

  function D(a, b) {
    a.prototype = Qc(b.prototype)
    a.prototype.constructor = a
    if (Wc) Wc(a, b) else for (var c in b) if (c != "prototype") if (Object.defineProperties) {
      var d = Object.getOwnPropertyDescriptor(b, c)
      d && Object.defineProperty(a, c, d)
    } else a[c] = b[c]
    a.L = b.prototype
  }

  function Xc(a) {
    var b = typeof Symbol != "undefined" && Symbol.iterator && a[Symbol.iterator]
    if (b) return b.call(a)
    if (typeof a.length == t) return { next: Lc(a) }
    throw Error(String(a) + " is not an iterable or ArrayLike")
  }

  function Yc(a) {
    if (a instanceof Array) return a
    a = Xc(a)
    for (var b, c = []; !(b = a.next()).done;) c.push(b.value)
    return c
  }

  function Zc(a) {return $c(a, a)}

  function $c(a, b) {
    a.raw = b
    Object.freeze && (Object.freeze(a), Object.freeze(b))
    return a
  }

  function ad(a, b) {return Object.prototype.hasOwnProperty.call(a, b)}

  var bd = typeof Object.assign == r ? Object.assign : function (a, b) {
    for (var c = 1; c < arguments.length; c++) {
      var d = arguments[c]
      if (d) for (var e in d) ad(d, e) && (a[e] = d[e])
    }
    return a
  }
  C("Object.assign", function (a) {return a || bd})

  function cd() {
    for (var a = Number(this), b = [], c = a; c < arguments.length; c++) b[c - a] = arguments[c]
    return b
  }

  C("globalThis", function (a) {return a || Oc})
  C("Reflect", function (a) {return a ? a : {}})
  C("Reflect.construct", function () {return Rc})
  C("Reflect.setPrototypeOf", function (a) {return a ? a : Wc ? function (b, c) {try {return Wc(b, c), !0} catch (d) {return !1}} : null})
  C("Promise", function (a) {
    function b(h) {
      this.wb = 0
      this.Vb = void 0
      this.Rb = []
      this.Ii = !1
      var k = this.Qe()
      try {h(k.resolve, k.reject)} catch (l) {k.reject(l)}
    }

    function c() {this.Pa = null}

    function d(h) {return h instanceof b ? h : new b(function (k) {k(h)})}

    if (a) return a
    c.prototype.dg = function (h) {
      if (this.Pa == null) {
        this.Pa = []
        var k = this
        this.eg(function () {k.Vk()})
      }
      this.Pa.push(h)
    }
    var e = Oc.setTimeout
    c.prototype.eg = function (h) {e(h, 0)}
    c.prototype.Vk = function () {
      for (; this.Pa && this.Pa.length;) {
        var h = this.Pa
        this.Pa = []
        for (var k = 0; k < h.length; ++k) {
          var l = h[k]
          h[k] = null
          try {l()} catch (m) {this.Hk(m)}
        }
      }
      this.Pa = null
    }
    c.prototype.Hk = function (h) {this.eg(function () {throw h})}
    b.prototype.Qe = function () {
      function h(m) {return function (n) {l || (l = !0, m.call(k, n))}}

      var k = this, l = !1
      return { resolve: h(this.Bm), reject: h(this.qf) }
    }
    b.prototype.Bm = function (h) {
      if (h === this) this.qf(new TypeError("A Promise cannot resolve to itself")) else if (h instanceof b) this.Km(h) else {
        a:switch (typeof h) {
          case Zb:
            var k = h != null
            break a
          case r:
            k = !0
            break a
          default:
            k = !1
        }
        k ? this.Am(h) : this.Cg(h)
      }
    }
    b.prototype.Am = function (h) {
      var k = void 0
      try {k = h.then} catch (l) {
        this.qf(l)
        return
      }
      typeof k == r ? this.Lm(k, h) : this.Cg(h)
    }
    b.prototype.qf = function (h) {this.qj(2, h)}
    b.prototype.Cg = function (h) {this.qj(1, h)}
    b.prototype.qj = function (h, k) {
      if (this.wb != 0) throw Error("Cannot settle(" + h + ", " + k + "): Promise already settled in state" + this.wb)
      this.wb = h
      this.Vb = k
      this.wb === 2 && this.Dm()
      this.Xk()
    }
    b.prototype.Dm = function () {
      var h = this
      e(function () {
        if (h.Fl()) {
          var k = Oc.console
          typeof k !==
          "undefined" && k.error(h.Vb)
        }
      }, 1)
    }
    b.prototype.Fl = function () {
      if (this.Ii) return !1
      var h = Oc.CustomEvent, k = Oc.Event, l = Oc.dispatchEvent
      if (typeof l === "undefined") return !0
      typeof h === r ? h = new h(Cc, { cancelable: !0 }) : typeof k === r ? h = new k(Cc, { cancelable: !0 }) : (h = Oc.document.createEvent("CustomEvent"), h.initCustomEvent(Cc, !1, !0, h))
      h.promise = this
      h.reason = this.Vb
      return l(h)
    }
    b.prototype.Xk = function () {
      if (this.Rb != null) {
        for (var h = 0; h < this.Rb.length; ++h) f.dg(this.Rb[h])
        this.Rb = null
      }
    }
    var f = new c
    b.prototype.Km =
      function (h) {
        var k = this.Qe()
        h.ed(k.resolve, k.reject)
      }
    b.prototype.Lm = function (h, k) {
      var l = this.Qe()
      try {h.call(k, l.resolve, l.reject)} catch (m) {l.reject(m)}
    }
    b.prototype.then = function (h, k) {
      function l(w, y) {return typeof w == r ? function (L) {try {m(w(L))} catch (B) {n(B)}} : y}

      var m, n, u = new b(function (w, y) {
        m = w
        n = y
      })
      this.ed(l(h, m), l(k, n))
      return u
    }
    b.prototype.catch = function (h) {return this.then(void 0, h)}
    b.prototype.ed = function (h, k) {
      function l() {
        switch (m.wb) {
          case 1:
            h(m.Vb)
            break
          case 2:
            k(m.Vb)
            break
          default:
            throw Error("Unexpected state: " +
              m.wb)
        }
      }

      var m = this
      this.Rb == null ? f.dg(l) : this.Rb.push(l)
      this.Ii = !0
    }
    b.resolve = d
    b.reject = function (h) {return new b(function (k, l) {l(h)})}
    b.race = function (h) {return new b(function (k, l) {for (var m = Xc(h), n = m.next(); !n.done; n = m.next()) d(n.value).ed(k, l)})}
    b.all = function (h) {
      var k = Xc(h), l = k.next()
      return l.done ? d([]) : new b(function (m, n) {
        function u(L) {
          return function (B) {
            w[L] = B
            y--
            y == 0 && m(w)
          }
        }

        var w = [], y = 0
        do w.push(void 0), y++, d(l.value).ed(u(w.length - 1), n), l = k.next() while (!l.done)
      })
    }
    return b
  })
  C("Array.from", function (a) {
    return a ? a : function (b, c, d) {
      c = c != null ? c : function (k) {return k}
      var e = [], f = typeof Symbol != "undefined" && Symbol.iterator && b[Symbol.iterator]
      if (typeof f == r) {
        b = f.call(b)
        for (var h = 0; !(f = b.next()).done;) e.push(c.call(d, f.value, h++))
      } else for (f = b.length, h = 0; h < f; h++) e.push(c.call(d, b[h], h))
      return e
    }
  })
  C("Object.entries", function (a) {
    return a ? a : function (b) {
      var c = [], d
      for (d in b) ad(b, d) && c.push([d, b[d]])
      return c
    }
  })
  C("Object.is", function (a) {return a ? a : function (b, c) {return b === c ? b !== 0 || 1 / b === 1 / c : b !== b && c !== c}})
  C("Array.prototype.includes", function (a) {
    return a ? a : function (b, c) {
      var d = this
      d instanceof String && (d = String(d))
      var e = d.length
      c = c || 0
      for (c < 0 && (c = Math.max(c + e, 0)); c < e; c++) {
        var f = d[c]
        if (f === b || Object.is(f, b)) return !0
      }
      return !1
    }
  })

  function dd(a, b, c) {
    if (a == null) throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined")
    if (b instanceof RegExp) throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression")
    return a + ""
  }

  C("String.prototype.includes", function (a) {return a ? a : function (b, c) {return dd(this, b, "includes").indexOf(b, c || 0) !== -1}})
  C("Object.setPrototypeOf", function (a) {return a || Wc})
  C(Pa, function (a) {return a ? a : Symbol(Pa)})
  C("Array.prototype.find", function (a) {
    return a ? a : function (b, c) {
      a:{
        var d = this
        d instanceof String && (d = String(d))
        for (var e = d.length, f = 0; f < e; f++) {
          var h = d[f]
          if (b.call(c, h, f, d)) {
            b = h
            break a
          }
        }
        b = void 0
      }
      return b
    }
  })
  C("WeakMap", function (a) {
    function b(l) {
      this.Wb = (k += Math.random() + 1).toString()
      if (l) {
        l = Xc(l)
        for (var m; !(m = l.next()).done;) m = m.value, this.set(m[0], m[1])
      }
    }

    function c() {}

    function d(l) {
      var m = typeof l
      return m === Zb && l !== null || m === r
    }

    function e(l) {
      if (!ad(l, h)) {
        var m = new c
        Mc(l, h, { value: m })
      }
    }

    function f(l) {
      var m = Object[l]
      m && (Object[l] = function (n) {
        if (n instanceof c) return n
        Object.isExtensible(n) && e(n)
        return m(n)
      })
    }

    if (function () {
      if (!a || !Object.seal) return !1
      try {
        var l = Object.seal({}), m = Object.seal({}), n = new a([[l,
          2], [m, 3]])
        if (n.get(l) != 2 || n.get(m) != 3) return !1
        n.delete(l)
        n.set(m, 4)
        return !n.has(l) && n.get(m) == 4
      } catch (u) {return !1}
    }()) return a
    var h = "$jscomp_hidden_" + Math.random()
    f("freeze")
    f("preventExtensions")
    f("seal")
    var k = 0
    b.prototype.set = function (l, m) {
      if (!d(l)) throw Error("Invalid WeakMap key")
      e(l)
      if (!ad(l, h)) throw Error("WeakMap key fail: " + l)
      l[h][this.Wb] = m
      return this
    }
    b.prototype.get = function (l) {return d(l) && ad(l, h) ? l[h][this.Wb] : void 0}
    b.prototype.has = function (l) {
      return d(l) && ad(l, h) && ad(l[h],
        this.Wb)
    }
    b.prototype.delete = function (l) {return d(l) && ad(l, h) && ad(l[h], this.Wb) ? delete l[h][this.Wb] : !1}
    return b
  })
  C("Map", function (a) {
    function b() {
      var k = {}
      return k.previous = k.next = k.head = k
    }

    function c(k, l) {
      var m = k[1]
      return Pc(function () {
        if (m) {
          for (; m.head != k[1];) m = m.previous
          for (; m.next != m.head;) return m = m.next, { done: !1, value: l(m) }
          m = null
        }
        return { done: !0, value: void 0 }
      })
    }

    function d(k, l) {
      var m = l && typeof l
      m == Zb || m == r ? f.has(l) ? m = f.get(l) : (m = "" + ++h, f.set(l, m)) : m = "p_" + l
      var n = k[0][m]
      if (n && ad(k[0], m)) for (k = 0; k < n.length; k++) {
        var u = n[k]
        if (l !== l && u.key !== u.key || l === u.key) return { id: m, list: n, index: k, entry: u }
      }
      return {
        id: m,
        list: n, index: -1, entry: void 0
      }
    }

    function e(k) {
      this[0] = {}
      this[1] = b()
      this.size = 0
      if (k) {
        k = Xc(k)
        for (var l; !(l = k.next()).done;) l = l.value, this.set(l[0], l[1])
      }
    }

    if (function () {
      if (!a || typeof a != r || !a.prototype.entries || typeof Object.seal != r) return !1
      try {
        var k = Object.seal({ x: 4 }), l = new a(Xc([[k, "s"]]))
        if (l.get(k) != "s" || l.size != 1 || l.get({ x: 4 }) || l.set({ x: 4 }, "t") != l || l.size != 2) return !1
        var m = l.entries(), n = m.next()
        if (n.done || n.value[0] != k || n.value[1] != "s") return !1
        n = m.next()
        return n.done || n.value[0].x != 4 || n.value[1] !=
        "t" || !m.next().done ? !1 : !0
      } catch (u) {return !1}
    }()) return a
    var f = new WeakMap
    e.prototype.set = function (k, l) {
      k = k === 0 ? 0 : k
      var m = d(this, k)
      m.list || (m.list = this[0][m.id] = [])
      m.entry ? m.entry.value = l : (m.entry = {
        next: this[1],
        previous: this[1].previous,
        head: this[1],
        key: k,
        value: l
      }, m.list.push(m.entry), this[1].previous.next = m.entry, this[1].previous = m.entry, this.size++)
      return this
    }
    e.prototype.delete = function (k) {
      k = d(this, k)
      return k.entry && k.list ? (k.list.splice(k.index, 1), k.list.length || delete this[0][k.id], k.entry.previous.next =
        k.entry.next, k.entry.next.previous = k.entry.previous, k.entry.head = null, this.size--, !0) : !1
    }
    e.prototype.clear = function () {
      this[0] = {}
      this[1] = this[1].previous = b()
      this.size = 0
    }
    e.prototype.has = function (k) {return !!d(this, k).entry}
    e.prototype.get = function (k) {return (k = d(this, k).entry) && k.value}
    e.prototype.entries = function () {return c(this, function (k) {return [k.key, k.value]})}
    e.prototype.keys = function () {return c(this, function (k) {return k.key})}
    e.prototype.values = function () {return c(this, function (k) {return k.value})}
    e.prototype.forEach = function (k, l) {for (var m = this.entries(), n; !(n = m.next()).done;) n = n.value, k.call(l, n[1], n[0], this)}
    e.prototype[Symbol.iterator] = e.prototype.entries
    var h = 0
    return e
  })
  C("Set", function (a) {
    function b(c) {
      this.Da = new Map
      if (c) {
        c = Xc(c)
        for (var d; !(d = c.next()).done;) this.add(d.value)
      }
      this.size = this.Da.size
    }

    if (function () {
      if (!a || typeof a != r || !a.prototype.entries || typeof Object.seal != r) return !1
      try {
        var c = Object.seal({ x: 4 }), d = new a(Xc([c]))
        if (!d.has(c) || d.size != 1 || d.add(c) != d || d.size != 1 || d.add({ x: 4 }) != d || d.size != 2) return !1
        var e = d.entries(), f = e.next()
        if (f.done || f.value[0] != c || f.value[1] != c) return !1
        f = e.next()
        return f.done || f.value[0] == c || f.value[0].x != 4 || f.value[1] !=
        f.value[0] ? !1 : e.next().done
      } catch (h) {return !1}
    }()) return a
    b.prototype.add = function (c) {
      c = c === 0 ? 0 : c
      this.Da.set(c, c)
      this.size = this.Da.size
      return this
    }
    b.prototype.delete = function (c) {
      c = this.Da.delete(c)
      this.size = this.Da.size
      return c
    }
    b.prototype.clear = function () {
      this.Da.clear()
      this.size = 0
    }
    b.prototype.has = function (c) {return this.Da.has(c)}
    b.prototype.entries = function () {return this.Da.entries()}
    b.prototype.values = function () {return this.Da.values()}
    b.prototype.keys = b.prototype.values
    b.prototype[Symbol.iterator] =
      b.prototype.values
    b.prototype.forEach = function (c, d) {
      var e = this
      this.Da.forEach(function (f) {return c.call(d, f, f, e)})
    }
    return b
  })
  C("Number.isFinite", function (a) {return a ? a : function (b) {return typeof b !== t ? !1 : !isNaN(b) && b !== Infinity && b !== -Infinity}})
  C("Number.MAX_SAFE_INTEGER", function () {return 9007199254740991})
  C("Number.MIN_SAFE_INTEGER", function () {return -9007199254740991})
  C("Number.isInteger", function (a) {return a ? a : function (b) {return Number.isFinite(b) ? b === Math.floor(b) : !1}})
  C("Number.isSafeInteger", function (a) {return a ? a : function (b) {return Number.isInteger(b) && Math.abs(b) <= Number.MAX_SAFE_INTEGER}})
  C("String.prototype.startsWith", function (a) {
    return a ? a : function (b, c) {
      var d = dd(this, b, "startsWith")
      b += ""
      var e = d.length, f = b.length
      c = Math.max(0, Math.min(c | 0, d.length))
      for (var h = 0; h < f && c < e;) if (d[c++] != b[h++]) return !1
      return h >= f
    }
  })

  function ed(a, b) {
    a instanceof String && (a += "")
    var c = 0, d = !1, e = {
      next: function () {
        if (!d && c < a.length) {
          var f = c++
          return { value: b(f, a[f]), done: !1 }
        }
        d = !0
        return { done: !0, value: void 0 }
      }
    }
    e[Symbol.iterator] = function () {return e}
    return e
  }

  C("Array.prototype.entries", function (a) {return a ? a : function () {return ed(this, function (b, c) {return [b, c]})}})
  C("Math.imul", function (a) {
    return a ? a : function (b, c) {
      b = Number(b)
      c = Number(c)
      var d = b & 65535, e = c & 65535
      return d * e + ((b >>> 16 & 65535) * e + d * (c >>> 16 & 65535) << 16 >>> 0) | 0
    }
  })
  C("Math.trunc", function (a) {
    return a ? a : function (b) {
      b = Number(b)
      if (isNaN(b) || b === Infinity || b === -Infinity || b === 0) return b
      var c = Math.floor(Math.abs(b))
      return b < 0 ? -c : c
    }
  })
  C("Math.log2", function (a) {return a ? a : function (b) {return Math.log(b) / Math.LN2}})
  C("Object.values", function (a) {
    return a ? a : function (b) {
      var c = [], d
      for (d in b) ad(b, d) && c.push(b[d])
      return c
    }
  })
  C("Number.isNaN", function (a) {return a ? a : function (b) {return typeof b === t && isNaN(b)}})
  C("Array.prototype.keys", function (a) {return a ? a : function () {return ed(this, function (b) {return b})}})
  C("Array.prototype.values", function (a) {return a ? a : function () {return ed(this, function (b, c) {return c})}})
  var E = this || self

  function fd(a, b) {
    a = a.split(".")
    for (var c = E, d; a.length && (d = a.shift());) a.length || b === void 0 ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b
  }

  function gd(a) {
    var b = typeof a
    return b != Zb ? b : a ? Array.isArray(a) ? "array" : b : "null"
  }

  function hd(a) {
    var b = gd(a)
    return b == "array" || b == Zb && typeof a.length == t
  }

  function id(a) {
    var b = typeof a
    return b == Zb && a != null || b == r
  }

  function jd(a, b, c) {return a.call.apply(a.bind, arguments)}

  function kd(a, b, c) {
    if (!a) throw Error()
    if (arguments.length > 2) {
      var d = Array.prototype.slice.call(arguments, 2)
      return function () {
        var e = Array.prototype.slice.call(arguments)
        Array.prototype.unshift.apply(e, d)
        return a.apply(b, e)
      }
    }
    return function () {return a.apply(b, arguments)}
  }

  function ld(a, b, c) {
    ld = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? jd : kd
    return ld.apply(null, arguments)
  }

  function md(a) {return a}

  function nd(a, b) {
    function c() {}

    c.prototype = b.prototype
    a.L = b.prototype
    a.prototype = new c
    a.prototype.constructor = a
    a.pn = function (d, e, f) {
      for (var h = Array(arguments.length - 2), k = 2; k < arguments.length; k++) h[k - 2] = arguments[k]
      return b.prototype[e].apply(d, h)
    }
  }

  function od() {this.reset()}

  var pd
  A = od.prototype
  A.reset = function () {this.xb = Object.assign({}, qd)}
  A.ready = function () {return !!this.xb.ready}
  A.get = function (a) {return this.xb[a]}
  A.set = function (a, b) {this.xb[a] = b}
  A.getAnalyticsId = function () {
    if (!this.get("analytics4")) {
      var a = this.get("analytics_id")
      if (a) return a
    }
  }
  A.headless = function () {return !!this.get(Lb)}

  function rd() {
    pd || (pd = new od)
    return pd
  }

  var qd = { showWelcome: !0, enableGadgets: !0 }

  function sd(a, b, c) {
    this.name = a
    this.profileUrl = b
    this.avatarUrl = c
  }

  function td(a) {
    this.query = a ? a.query : void 0
    this.Od = a && a.Od || "recent"
  }

  function ud(a, b) {
    this.url = a
    this.filter = b
    this.id = void 0
    this.baseUrl = this.url
  }

  ud.prototype.data = function () {
    var a = {}
    a.Title = this.title
    a.Subtitle = a.Description = this.subtitle
    a.BlogID = this.id
    rd().get("pages") && (a.Pages = rd().get("pages").map(function (c) {
      return {
        ID: c.page_id,
        URL: c.url,
        Label: c.title
      }
    }))
    var b = this.baseUrl || this.url || ""
    a.RSS = [b, b[b.length - 1] == "/" ? "" : "/", "feeds/posts/default"].join("")
    return a
  }
  var vd = {}, wd

  function xd() {
    vd.zc || (vd.zc = wd())
    return vd.zc
  }

  function yd(a, b) {
    b = b || {}
    this.type = a
    this.url = b.url
    this.thumbnail = b.thumbnail
    this.title = b.title
    this.content = b.content
    this.width = b.width
    this.height = b.height
  }

  function zd(a, b, c) {
    this.name = a
    this.latitude = b
    this.longitude = c
  }

  function Ad(a) {
    var b = [];
    (a = Array.isArray(a) ? a : a.split(",")) && (b = a.map(function (c) {return (c ? c.toLowerCase().trim() : "").replace(/[^\w\s]|_/g, "").replace(/\s+/g, "_")}))
    return b.sort().join(" ")
  }

  function Bd(a, b) {b && a.appendChild(document.createRange().createContextualFragment(b))}

  function Cd(a) {return document.createRange().createContextualFragment(a).firstElementChild}

  function Dd(a) {
    a = document.createRange().createContextualFragment(a)
    a = Array.from(a.childNodes).filter(function (b) {return !(b instanceof Text)})
    return [].concat(Yc(a))
  }

  function Ed(a, b) {a.setAttribute(v, b)}

  var F = {
    ag: /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,
    zk: /^(?:(([^:\/?#]+):){1}(\/\/)?)|(\/\/)/,
    rd: function () {return document.URL},
    isCrossDomain: function (a) {
      var b = F.decode()
      a = a instanceof Fd ? a : new Fd(a)
      return b.authority != a.authority
    },
    isSamePage: function (a, b) {
      var c = F.decode()
      a = a instanceof Fd ? a : new Fd(a)
      return (!!b || c.authority == a.authority) && c.path == a.path
    },
    decode: function (a) {return new Fd(a || F.rd())},
    authority: function (a, b) {
      var c = a || F.rd()
      a = (a = c.match(/^(https?:\/\/)/)) ?
        a[0] : "http://"
      c = c.replace(a, "")
      if (c = /([^\/]+)\/?(.*)/.exec(c)) return a + (c[1].indexOf(".") < 0 && b ? c[1] + "." + b : c[1]).toLowerCase()
    },
    rewritePath: function (a) {
      a = a instanceof Fd ? a : new Fd(a)
      if (window.history.pushState) try {return F.rd() != a.encode() && window.history.pushState(null, "", a.encode()), !0} catch (b) {}
      a = "#!" + (F.isCrossDomain(a) ? a.encode(!1, !1) : a.path)
      return window.location.hash != a ? (window.location.hash = a, !0) : !1
    },
    decodePath: function (a) {
      a = F.decode(a)
      if (a.fragment && a.fragment[0] == "!") {
        var b = new Fd(a.fragment.substr(1))
        b.authority || (b.scheme = a.scheme, b.authority = a.authority)
        a = b
      }
      return new Fd(a.encode(!1, !1))
    },
    zl: function (a) {return (new URL(a, F.rd())).href}
  }

  function Fd(a) {
    this.url = a !== null ? a instanceof Fd ? a.encode() : a : void 0
    this.params = {}
    this.url && Gd(this.url, this)
  }

  function Gd(a, b) {
    b = b || new Fd
    if ((a = F.zk.exec(a) ? F.ag.exec(a) : F.ag.exec("//" + a)) && a.length && (b.scheme = a[2], b.authority = a[4] && a[4].toLowerCase(), b.path = a[5], b.query = a[7], b.params = {}, b.fragment = a[9], b.query)) {
      a = b.query.replace(/&amp;/g, "&").split("&")
      for (var c = a.length, d = 0; d < c; d++) if (a[d]) {
        var e = a[d].split("=")
        b.params[e[0]] = e[1] || ""
      }
    }
    return b
  }

  A = Fd.prototype
  A.encode = function (a, b, c) {
    a = a !== void 0 ? a : !0
    b = b !== void 0 ? b : !0
    c = Hd(this, c)
    return [this.scheme ? this.scheme + ":" : "", this.authority ? "//" + this.authority : "", this.path, a && c ? "?" + c : "", b && this.fragment ? "#" + this.fragment : ""].join("")
  }
  A.root = function () {return [this.scheme ? this.scheme + ":" : "", this.authority ? "//" + this.authority : ""].join("")}

  function Hd(a, b) {
    if (b) return Object.entries(a.params).map(function (d) {return d.map(encodeURIComponent).join("=")}).join("&")
    b = []
    for (var c in a.params) a.params[c] !== void 0 ? b.push(c + "=" + a.params[c]) : b.push(c)
    return b.join("&")
  }

  A.param = function (a, b) {return b !== void 0 ? (this.params[a] = b, this) : this.params[a]}
  A.equals = function (a, b, c) {
    a = a instanceof Fd ? a : new Fd(a)
    return this.encode(b, c) == a.encode(b, c)
  }
  A.normalize = function () {
    this.scheme = this.scheme || F.decode().scheme
    this.path = this.path || "/"
    return this
  }

  function Id() {this.attributes = {}}

  function Jd(a, b) {
    var c = [], d = Object.assign({}, Kd, b)
    if (!a) return d.replace !== void 0 ? "" : c
    d.tag = d.tag.toLowerCase()
    b = d.tag ? Ld(d.tag) : Md.global ? new RegExp(Md) : Md
    a = a.replace(b, function (e) {
      var f = Nd(e), h = !0
      if (f.value && d.recurse) {
        var k = Jd(f.value, d)
        d.replace ? f.value = k : k && k.length && c.push.apply(c, Yc(k))
      }
      if (h = (h = h && (!d.tag || d.tag == f.name)) && (!d.attr || Od(f.attributes, d.attr, d.attrTest))) if (c.push(f), d.replace !== void 0) return typeof d.replace === r ? d.replace(f) : d.replace
      return e
    })
    return d.replace !== void 0 ?
      a : c
  }

  Id.prototype.encode = function () {
    var a = []
    a.push("<" + this.name)
    for (var b in this.attributes) {
      var c = this.attributes[b]
      a.push(" ")
      a.push(b)
      c !== null && (a.push("=\""), a.push(c !== void 0 ? ("" + c).replace(/"/g, "&#034;") : ""), a.push("\""))
    }
    !this.value && this.Sa.match(/\/>$/) ? a.push(this.Sa.match(/\s?\/>$/)) : (b = this.name) && Pd.includes(b.toLowerCase()) && this.Sa.match(/\/?>/) ? a.push(this.Sa.match(/\s?\/?>$/)) : (a.push(">"), a.push(this.value), a.push("</" + this.name + ">"))
    return a.join("")
  }
  Id.prototype.attr = function (a, b) {return b !== void 0 ? (this.attributes[a] = b, this) : this.attributes[a]}

  function Od(a, b, c) {
    b = (b || "").toLowerCase()
    for (var d in a) if (d.toLowerCase() == b) {
      if (c === void 0) return !0
      if (typeof c === z) return a[d] == c
      if (c instanceof RegExp) return c.test(a[d])
      if (typeof c === r) return c(a[d])
    }
    return !1
  }

  function Nd(a) {
    var b = new Id
    b.Sa = a
    var c = Ld(/<(\w+)/.exec(a)[1]).exec(a)
    c && c.length && (b.Sa = a, b.name = c[1].toLowerCase(), b.value = c[2], b.attributes = {}, (a = /<\w+([^>]*)?/.exec(a)) && (a[1] || "").replace(Qd.global ? new RegExp(Qd) : Qd, function (d, e) {b.attributes[e] = arguments[2] || arguments[3] || arguments[4] || ""}))
    return b
  }

  function Ld(a) {return new RegExp(a && Pd.includes(a.toLowerCase()) ? Rd.source.replace("<(\\w+)", "<(" + a + ")") : Md.source.replace("<(\\w+)", "<(" + a + ")"), "ig")}

  var Kd = { tag: "", attr: "", attrTest: void 0, replace: void 0, recurse: !0 },
    Md = /<(\w+)[^>]*?(?:(?:>((?:.|\n|\r)*?)<\/\1>)|(?:\/>))/ig, Rd = /<(\w+)[^>]*?(?:.*?)\/?>/ig,
    Qd = /([\w-_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,
    Pd = ["area", "base", yb, "br", "col", "hr", "img", "input", "link", "meta", "param", "command", "keygen", "source"]
  var Sd = {}, Td

  function G() {
    Sd.zc || (Sd.zc = Td())
    return Sd.zc
  }

  var Ud = "ontouchstart" in document.documentElement

  function Vd() {
    for (var a = G(), b = a.oa, c = {}, d = xd().resources().slice().reverse(), e, f = 0; e = d[f]; f++) typeof e.data === r && Object.assign(c, e.data())
    c.Posts = xd().items()
    a = b.call(a, c)
    return Wd(a)
  }

  function Xd(a) {return Wd(G().oa(a))}

  var Yd = null

  function Wd(a) {
    var b = Yd
    if (!b) {
      b = {}
      var c = rd(), d = xd().getSettings()
      b.Locale = c.get("blog_locale")
      b.BloggerBase = d.blogger_base
      b.PlusBase = d.plus_base
      if (blogger && blogger.l10n) for (var e in blogger.l10n) b["lang:" + e] = blogger.l10n[e];
      (d = c.getAnalyticsId()) && !c.headless() && (b.AnalyticsID = d)
      c.get(Ya) && !c.headless() && (b.Adsense = !!c.get("adsense_has_ads"), b.AdsenseClient = c.get(Ya), b.AdsenseHost = c.get("adsense_host_id"))
      d = !!c.get(pb)
      b.Comments = d
      b.Notes = d
      b.Gadgets = !!c.get(zb)
      var f = ""
      d = (c.get("views") ||
        []).map(function (m) {
        var n = m.name || "", u = n.charAt(0).toUpperCase() + n.slice(1)
        f = m.selected ? u : f || u
        var w = blogger.l10n && blogger.l10n[u] ? blogger.l10n[u] : u, y = m.url
        y && y.indexOf("?") > 0 && (y = y.slice(y.indexOf("?")))
        return { Name: n, URL: y, Label: u, LocalizedLabel: w, Current: m.selected }
      })
      d.sort(function (m, n) {return m.Label < n.Label ? -1 : m.Label == n.Label ? 0 : 1})
      b.Views = d
      b.CurrentView = f
      d = Zd()
      b["browser:" + d.type] = !0
      b["browser:" + d.type + d.versionX] = !0
      b.Mobile = c.get("is_mobile") || Ud
      b.Tablet = c.get("is_tablet")
      Object.assign(b,
        $d())
      d = 0
      e = !1
      for (var h, k = 0; h = xd().resources()[k]; k++) h.total && (d += h.total), e = e || h.filter
      b.PostCount = d
      e && (b.SearchQuery = e.query, b.SearchPage = !0, b.SearchResultCount = d, b.NoSearchResults = d == 0)
      d = F.decode(h && h.url).authority || ""
      b.CustomDomain = d.indexOf(".blogspot.") == -1
      b.BlogURL = c.get(fb) || "/"
      b.CanonicalUrl = c.get("canonical_url")
      b.BoqCommentIframeForm = !0
      b.LoginRedirectParam = c.get("login_redirect_param")
      Yd = b
    }
    for (var l in b) a.scope(l, b[l])
    return a
  }

  function $d() {
    var a = rd(), b = Object.assign({}, {
      "font:Text": aa,
      "color:Text": "#333",
      "image:Background": void 0,
      "color:Background": "#eee",
      "color:Header Background": "#f3f3f3",
      "image:Header": void 0,
      "color:Primary": "#333",
      "color:Menu Text": "white",
      "font:Menu": aa,
      "font:Link": aa,
      "color:Link": "#009eb8",
      "color:Link Visited": "#009eb8",
      "color:Link Hover": "#009eb8",
      "font:Blog Title": aa,
      "color:Blog Title": "#555",
      "font:Blog Description": aa,
      "color:Blog Description": "#555",
      "font:Post Title": aa,
      "color:Post Title": "#333",
      "color:Ribbon": "#666",
      "color:Ribbon Hover": "#ad3a2b",
      "color:Bubble": "#666"
    }, a.get("template_styles"));
    (a = a.get("additional_css")) && (b["text:Custom CSS"] = a)
    a = /^(bold|normal|italic|\d+%|\d+px|\s)+/i
    for (var c in b) if (c.indexOf("font:") == 0) b[c] = b[c].replace(a, "") else if (c == "image:Background") {
      var d = /.*url\((.*?)\).*/.exec(b[c])
      d && (b["image:Header"] = b[c] = d[1], b["text:BodyBackgroundCSS"] = b["text:HeaderBackgroundCSS"] = d[0])
    }
    return b
  }

  function ae(a) {
    var b = {}, c = xd().items(), d = (c || []).indexOf(a)
    if (d >= 0) {
      var e = d > 0 ? c[d - 1] : null
      c = d < c.length - 1 ? c[d + 1] : null
      b.PreviousPost = e ? e.url : !1
      b.NextPost = c ? c.url : xd().hasNext()
    }
    b.SameDayDate = e && e.published && e.published.getDate() == a.published.getDate() && e.published.getMonth() == a.published.getMonth() && e.published.getFullYear() == a.published.getFullYear() ? !0 : !1
    b.NewDayDate = !b.SameDayDate
    d != -1 && (a = d + 1, b.Odd = a % 2 == 1, b.Even = a % 2 == 0, b.Number = a, b["Post" + a] = !0)
    return b
  }

  function Zd() {
    var a = navigator.userAgent.toLowerCase(), b = /(opera)(?:.*version)?[ \/]([\w.]+)/, c = /(msie) ([\w.]+)/,
      d = /(mozilla)(?:.*? rv:([\w.]+))?/
    b = /(webkit)[ \/]([\w.]+)/.exec(a) || b.exec(a) || c.exec(a) || a.indexOf("compatible") < 0 && d.exec(a) || []
    a = {}
    a[b[1] || ""] = !0
    a.version = b[2] || "0"
    var e
    for (e in a) if (e == "version") var f = a[e] else if (e == Jc || e == "chrome" || e == "safari") {
      b = navigator.userAgent
      var h = (f = /chrome\/([\d\.]+)/i.exec(b)) && "chrome" || (f = /version\/([\d\.]+) safari/i.exec(b)) && "safari" || (f = [null,
        a.version], Jc)
      f = f && f[1]
    } else h = e
    a.type = h || Dc
    a.versionX = f ? parseInt(f, 10) : Dc
    return a
  }

  var be = RegExp("^((http(s)?):)?\\/\\/((((lh[3-6](-tt|-d[a-g,y,z]|-testonly)?\\.((ggpht)|(googleusercontent)|(google)|(sandbox\\.google)))|(lh7\\-(eu|us|qw|rt)\\.((googleusercontent)|(google)))|((photos|testonly|work)\\.fife\\.usercontent\\.google)|([\\w\\-]+\\.fife\\.usercontent\\.google)|(([1-4]\\.bp\\.blogspot)|(bp[0-3]\\.blogger))|(ccp-lh\\.googleusercontent)|((((cp|ci|gp)[3-6])|(ap[1-2]))\\.(ggpht|googleusercontent))|(gm[1-4]\\.ggpht)|(play-(ti-)?lh\\.googleusercontent)|(gz0\\.googleusercontent)|(((yt[3-4])|(sp[1-3]))\\.(ggpht|googleusercontent)))\\.com)|(drive\\.google\\.com\\/drive\\-(usercontent|viewer))|(dp[3-6]\\.googleusercontent\\.cn)|(lh[3-6]\\.(googleadsserving\\.cn|xn--9kr7l\\.com))|((photos|drive|contribution)\\-image\\-(dev|qa)(-us|-eu)?(-auth|-cookie)?\\.corp\\.google\\.com)|(photos\\-image\\-dev\\-dl\\-(auth|eu|us)\\.corp\\.google\\.com)|((dev|dev2|dev3|qa|qa2|qa3|qa-red|qa-blue|canary)[-.]lighthouse\\.sandbox\\.google\\.com\\/image)|(image\\-(dev|qa)\\-lighthouse(-auth)?\\.sandbox\\.google\\.com(\\/image)?)|(drive\\-qa\\.corp\\.google\\.com\\/drive\\-(usercontent|viewer)))\\/",
      "i"), ce = /^(https?:)?\/\/sp[1-4]\.((ggpht)|(googleusercontent))\.com\//i,
    de = /^(https?:)?\/\/(qa(-red|-blue)?|dev2?|image-dev)(-|\.)lighthouse(-auth)?\.sandbox\.google\.com\//i,
    ee = /^(https?:)?\/\/lighthouse-(qa(-red|-blue)?|dev2)\.corp\.google\.com\//i

  function fe(a) {return be.test(a) || ce.test(a) || de.test(a) || ee.test(a)}

  function ge(a, b) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, ge) else {
      var c = Error().stack
      c && (this.stack = c)
    }
    a && (this.message = String(a))
    b !== void 0 && (this.cause = b)
  }

  nd(ge, Error)
  ge.prototype.name = "CustomError"

  function he(a, b) {
    a = a.split("%s")
    for (var c = "", d = a.length - 1, e = 0; e < d; e++) c += a[e] + (e < b.length ? b[e] : "%s")
    ge.call(this, c + a[d])
  }

  nd(he, ge)
  he.prototype.name = "AssertionError"

  function ie(a, b, c, d) {
    var e = "Assertion failed"
    if (c) {
      e += ": " + c
      var f = d
    } else a && (e += ": " + a, f = b)
    throw new he("" + e, f || [])
  }

  function H(a, b, c) {a || ie("", null, b, Array.prototype.slice.call(arguments, 2))}

  function I(a, b, c) {
    a == null && ie("Expected to exist: %s.", [a], b, Array.prototype.slice.call(arguments, 2))
    return a
  }

  function je(a, b) {throw new he("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1))}

  function ke(a, b, c) {
    typeof a !== t && ie("Expected number but got %s: %s.", [gd(a), a], b, Array.prototype.slice.call(arguments, 2))
    return a
  }

  function le(a, b, c) {typeof a !== r && ie("Expected function but got %s: %s.", [gd(a), a], b, Array.prototype.slice.call(arguments, 2))}

  function me(a, b, c) {id(a) || ie("Expected object but got %s: %s.", [gd(a), a], b, Array.prototype.slice.call(arguments, 2))}

  function J(a, b, c) {
    Array.isArray(a) || ie("Expected array but got %s: %s.", [gd(a), a], b, Array.prototype.slice.call(arguments, 2))
    return a
  }

  function ne(a, b, c, d) {
    a instanceof b || ie("Expected instanceof %s but got %s.", [oe(b), oe(a)], c, Array.prototype.slice.call(arguments, 3))
    return a
  }

  function oe(a) {return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : a === null ? "null" : typeof a}

  function pe(a) {E.setTimeout(function () {throw a}, 0)}

  a:for (var qe = ["CLOSURE_FLAGS"], re = E, se = 0; se < qe.length; se++) if (re = re[qe[se]], re == null) break a

  function te() {
    var a = E.navigator
    return a && (a = a.userAgent) ? a : ""
  }

  var ue = Array.prototype.indexOf ? function (a, b) {
      H(a.length != null)
      return Array.prototype.indexOf.call(a, b, void 0)
    } : function (a, b) {
      if (typeof a === z) return typeof b !== z || b.length != 1 ? -1 : a.indexOf(b, 0)
      for (var c = 0; c < a.length; c++) if (c in a && a[c] === b) return c
      return -1
    }, ve = Array.prototype.forEach ? function (a, b) {
      H(a.length != null)
      Array.prototype.forEach.call(a, b, void 0)
    } : function (a, b) {for (var c = a.length, d = typeof a === z ? a.split("") : a, e = 0; e < c; e++) e in d && b.call(void 0, d[e], e, a)},
    we = Array.prototype.some ? function (a,
      b) {
      H(a.length != null)
      return Array.prototype.some.call(a, b, void 0)
    } : function (a, b) {
      for (var c = a.length, d = typeof a === z ? a.split("") : a, e = 0; e < c; e++) if (e in d && b.call(void 0, d[e], e, a)) return !0
      return !1
    }

  function xe(a) {
    var b = a.length
    if (b > 0) {
      for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d]
      return c
    }
    return []
  }

  var ye = te().indexOf("Gecko") != -1 && !(te().toLowerCase().indexOf(Jc) != -1 && te().indexOf("Edge") == -1) && !(te().indexOf("Trident") != -1 || te().indexOf("MSIE") != -1) && te().indexOf("Edge") == -1,
    ze = te().toLowerCase().indexOf(Jc) != -1 && te().indexOf("Edge") == -1

  function Ae() {return typeof BigInt === r}

  function Be(a, b) {
    b = b === void 0 ? new Set : b
    if (b.has(a)) return "(Recursive reference)"
    switch (typeof a) {
      case Zb:
        if (a) {
          var c = Object.getPrototypeOf(a)
          switch (c) {
            case Map.prototype:
            case Set.prototype:
            case Array.prototype:
              b.add(a)
              var d = "[" + Array.from(a, function (e) {return Be(e, b)}).join(", ") + "]"
              b.delete(a)
              c !== Array.prototype && (d = Ce(c.constructor) + "(" + d + ")")
              return d
            case Object.prototype:
              return b.add(a), c = "{" + Object.entries(a).map(function (e) {
                var f = Xc(e)
                e = f.next().value
                f = f.next().value
                return e + ": " +
                  Be(f, b)
              }).join(", ") + "}", b.delete(a), c
            default:
              return d = "Object", c && c.constructor && (d = Ce(c.constructor)), typeof a.toString === r && a.toString !== Object.prototype.toString ? d + "(" + String(a) + ")" : "(object " + d + ")"
          }
        }
        break
      case r:
        return "function " + Ce(a)
      case t:
        if (!Number.isFinite(a)) return String(a)
        break
      case db:
        return a.toString(10) + "n"
      case wc:
        return a.toString()
    }
    return JSON.stringify(a)
  }

  function Ce(a) {
    var b = a.displayName
    return b && typeof b === z || (b = a.name) && typeof b === z ? b : (a = /function\s+([^\(]+)/m.exec(String(a))) ? a[1] : "(Anonymous)"
  }

  function De(a, b) {
    var c = Ee, d = []
    Fe(b, a, d) || Ge.apply(null, [void 0, c, "Guard " + b.Ze().trim() + " failed:"].concat(Yc(d.reverse())))
  }

  function He(a, b) {
    De(a, b)
    return a
  }

  function K(a, b) {
    a.ol = !0
    a.Ze = typeof b === r ? b : function () {return b}
    return a
  }

  function Fe(a, b, c) {
    var d = a(b, c)
    d || Ie(c, function () {
      var e = ""
      e.length > 0 && (e += ": ")
      return e + "Expected " + a.Ze().trim() + ", got " + Be(b)
    })
    return d
  }

  function Ie(a, b) {a == null || a.push((typeof b === r ? b() : b).trim())}

  var Ee = void 0

  function Je(a) {return typeof a === r ? a() : a}

  function Ge() {throw Error(cd.apply(0, arguments).map(Je).filter(Boolean).join("\n").trim().replace(/:$/, ""))}

  K(function (a) {return a !== null && a !== void 0}, "exists")
  var Ke = K(function (a) {return typeof a === t}, t)
  Le(0)
  K(function (a) {return Number.isSafeInteger(a)}, "isSafeInteger")
  K(function (a) {return Number.isInteger(a)}, "isInteger")
  K(function (a) {return Number.isFinite(a)}, "isFinite")
  var Me = K(function (a) {return typeof a === z}, z)
  Le("")
  K(function (a) {return a.trim() !== ""}, "isNotBlank")
  K(function (a) {return a.trim() === ""}, "isBlank")
  var Ne = K(function (a) {return typeof a === jb}, jb), Oe = K(function (a) {return typeof a === db}, db)
  K(function (a) {return a === null}, "null")
  K(function (a) {return a === void 0}, "undefined")
  K(function (a) {return a == null}, "null | undefined")

  function Le(a) {K(function (b) {return b === a}, function () {return Be(a)})}

  K(function (a) {return a != null && typeof a === Zb && typeof a.then === r}, "Thenable")
  var Pe = K(function (a) {return typeof a === r}, "Function")
  K(function (a, b) {return Fe(Pe, a, b) ? a.ol === !0 : !1}, "isGuard")
  Qe(Date)
  K(function (a) {return !isNaN(a)}, "isValidDate")
  K(function (a) {return a.global}, "isGlobalRegExp")
  K(function (a) {return a.sticky}, "isStickyRegExp")
  K(function (a) {return !!a && (typeof a === Zb || typeof a === r)}, Zb)

  function Qe(a) {return K(function (b) {return b instanceof a}, function () {return Ce(a)})}

  K(function () {return !0}, Dc)
  Re()
  Re()

  function Re() {K(function (a) {return Array.isArray(a)}, "Array<unknown>")}

  Se()
  Se()

  function Se() {K(function (a) {return a instanceof Set}, "Set<unknown>")}

  Te()
  Te()

  function Te() {K(function (a) {return a instanceof Map}, "Map<unknown, unknown>")}

  function Ue() {
    var a = cd.apply(0, arguments)
    return K(function (b) {return a.some(function (c) {return c(b)})}, function () {return "" + a.map(function (b) {return b.Ze().trim()}).join(" | ")})
  }

  var Ve = typeof E.BigInt === r && typeof E.BigInt(0) === db

  function We(a) {this.yf = a}

  We.prototype.toString = function (a) {return this.yf.toString(a)}
  We.prototype.valueOf = function () {throw Error(Ja)}
  We.prototype[Symbol.toPrimitive] = function () {return this.yf}

  function Xe(a, b) {
    var c = Rc(Array, [a], this.constructor)
    c.sign = b
    Object.setPrototypeOf(c, Xe.prototype)
    if (a > Ye) throw new RangeError("Maximum BigInt size exceeded")
    return c
  }

  D(Xe, Array)
  A = Xe.prototype
  A.toString = function (a) {
    a = a === void 0 ? 10 : a
    if (a < 2 || a > 36) throw new RangeError("toString() radix argument must be between 2 and 36")
    if (this.length === 0) return "0"
    if ((a & a - 1) === 0) {
      var b = this.length, c = a - 1
      c = (c >>> 1 & 85) + (c & 85)
      c = (c >>> 2 & 51) + (c & 51)
      c = (c >>> 4 & 15) + (c & 15)
      --a
      var d = this.F(b - 1), e = (b * 30 - Ze(d) + c - 1) / c | 0
      this.sign && e++
      if (e > 268435456) throw Error("string too long")
      var f = Array(e)
      --e
      for (var h = 0, k = 0, l = 0; l < b - 1; l++) {
        var m = this.F(l)
        h = (h | m << k) & a
        f[e--] = $e[h]
        k = c - k
        h = m >>> k
        for (k = 30 - k; k >= c;) f[e--] = $e[h & a],
          h >>>= c, k -= c
      }
      f[e--] = $e[(h | d << k) & a]
      for (h = d >>> c - k; h !== 0;) f[e--] = $e[h & a], h >>>= c
      this.sign && (f[e--] = "-")
      if (e !== -1) throw Error(Sb)
      return f.join("")
    }
    return af(this, a, !1)
  }
  A.valueOf = function () {throw Error(Ja)}

  function bf(a, b) {
    if (b.sign) throw new RangeError("Exponent must be positive")
    if (b.length === 0) return cf(1)
    if (a.length === 0) return a
    if (a.length === 1 && a.F(0) === 1) return a.sign && (b.F(0) & 1) === 0 && a.length !== 0 && (b = a.Ak(), b.sign = !a.sign, a = b), a
    if (b.length > 1) throw new RangeError(Ga)
    b = b.Zc(0)
    if (b === 1) return a
    if (b >= df) throw new RangeError(Ga)
    if (a.length === 1 && a.F(0) === 2) {
      var c = 1 + (b / 30 | 0)
      a = new Xe(c, a.sign && (b & 1) !== 0)
      a.rc()
      a.J(c - 1, 1 << b % 30)
      return a
    }
    c = null
    var d = a;
    (b & 1) !== 0 && (c = a)
    for (b >>= 1; b !== 0; b >>= 1) d =
      ef(d, d), (b & 1) !== 0 && (c = c === null ? d : ef(c, d))
    return c
  }

  function ef(a, b) {
    if (a.length === 0) return a
    if (b.length === 0) return b
    var c = a.length + b.length
    a.bg() + b.bg() >= 30 && c--
    c = new Xe(c, a.sign !== b.sign)
    c.rc()
    for (var d = 0; d < a.length; d++) {
      var e = b, f = a.F(d), h = c, k = d
      if (f !== 0) {
        for (var l = f & 32767, m = f >>> 15, n = f = 0, u = 0; u < e.length; u++, k++) {
          var w = h.F(k), y = e.F(u), L = y & 32767, B = y >>> 15
          y = ff(L, m)
          var Ha = ff(B, l)
          B = ff(B, m)
          w += n + ff(L, l) + f
          f = w >>> 30
          w &= 1073741823
          w += ((y & 32767) << 15) + ((Ha & 32767) << 15)
          f += w >>> 30
          n = B + (y >>> 15) + (Ha >>> 15)
          h.J(k, w & 1073741823)
        }
        for (; f !== 0 || n !== 0; k++) e = h.F(k),
          e += f + n, n = 0, f = e >>> 30, h.J(k, e & 1073741823)
      }
    }
    return c.Ge()
  }

  function cf(a) {
    var b = new Xe(1, !1)
    b.J(0, a)
    return b
  }

  A.Ak = function () {
    for (var a = new Xe(this.length, this.sign), b = 0; b < this.length; b++) a[b] = this[b]
    return a
  }
  A.Ge = function () {
    for (var a = this.length, b = this[a - 1]; b === 0;) a--, b = this[a - 1], this.pop()
    a === 0 && (this.sign = !1)
    return this
  }
  A.rc = function () {for (var a = 0; a < this.length; a++) this[a] = 0}

  function af(a, b, c) {
    var d = a.length
    if (d === 0) return ""
    if (d === 1) return b = a.Zc(0).toString(b), c === !1 && a.sign && (b = "-" + b), b
    var e = gf[b] - 1
    d = (((d * 30 - Ze(a.F(d - 1))) * hf + (e - 1)) / e | 0) + 1 >> 1
    var f = bf(cf(b), cf(d))
    e = f.Zc(0)
    if (f.length === 1 && e <= 32767) {
      f = new Xe(a.length, !1)
      f.rc()
      for (var h = 0, k = a.length * 2 - 1; k >= 0; k--) h = h << 15 | a.Ga(k), f.Fe(k, h / e | 0), h = h % e | 0
      e = h.toString(b)
    } else {
      k = f.cg()
      h = f.length
      var l = a.cg() - k
      var m = new Xe(l + 2 >>> 1, !1)
      m.rc()
      var n = new Xe(k + 2 >>> 1, !1)
      n.rc()
      var u = Ze(f.Ga(k - 1)) - 15
      u > 0 && (f = jf(f, u, 0))
      e =
        jf(a, u, 1)
      for (var w = f.Ga(k - 1), y = 0; l >= 0; l--) {
        var L = 32767, B = e.Ga(l + k)
        if (B !== w) {
          B = (B << 15 | e.Ga(l + k - 1)) >>> 0
          L = B / w | 0
          B = B % w | 0
          for (var Ha = f.Ga(k - 2), ya = e.Ga(l + k - 2); ff(L, Ha) >>> 0 > (B << 16 | ya) >>> 0 && !(L--, B += w, B > 32767);)
        }
        B = f
        Ha = L
        ya = h
        for (var ca = 0, bb = 0, cb = 0; cb < ya; cb++) {
          var za = B.F(cb), Pj = ff(za >>> 15, Ha)
          za = ff(za & 32767, Ha) + ((Pj & 32767) << 15) + bb + ca
          ca = za >>> 30
          bb = Pj >>> 15
          n.J(cb, za & 1073741823)
        }
        if (n.length > ya) for (n.J(ya++, ca + bb); ya < n.length;) n.J(ya++, 0) else if (ca + bb !== 0) throw Error(Sb)
        B = e.Dk(n, l, k + 1)
        B !== 0 && (B = e.Bk(f,
          l, k), e.Fe(l + k, e.Ga(l + k) + B & 32767), L--)
        l & 1 ? y = L << 15 : m.J(l >>> 1, y | L)
      }
      e.Ck(u)
      f = m
      e = e.Ge()
      e = af(e, b, !0)
    }
    f.Ge()
    for (b = af(f, b, !0); e.length < d;) e = "0" + e
    c === !1 && a.sign && (b = "-" + b)
    return b + e
  }

  A.bg = function () {return Ze(this.F(this.length - 1))}
  A.nn = function (a, b, c) {
    c > this.length && (c = this.length)
    var d = a & 32767
    a >>>= 15
    for (var e = 0, f = 0; f < c; f++) {
      var h = this.F(f), k = h & 32767, l = h >>> 15
      h = ff(k, a)
      var m = ff(l, d)
      l = ff(l, a)
      k = b + ff(k, d) + e
      e = k >>> 30
      k &= 1073741823
      k += ((h & 32767) << 15) + ((m & 32767) << 15)
      e += k >>> 30
      b = l + (h >>> 15) + (m >>> 15)
      this.J(f, k & 1073741823)
    }
    if (e !== 0 || b !== 0) throw Error(Sb)
  }
  A.Bk = function (a, b, c) {
    for (var d = 0, e = 0; e < c; e++) {
      var f = this.Ga(b + e) + a.Ga(e) + d
      d = f >>> 15
      this.Fe(b + e, f & 32767)
    }
    return d
  }
  A.Dk = function (a, b, c) {
    var d = c - 1 >>> 1, e = 0
    if (b & 1) {
      b >>= 1
      for (var f = this.F(b), h = f & 32767, k = 0; k < d; k++) {
        var l = a.F(k)
        f = (f >>> 15) - (l & 32767) - e
        e = f >>> 15 & 1
        this.J(b + k, (f & 32767) << 15 | h & 32767)
        f = this.F(b + k + 1)
        h = (f & 32767) - (l >>> 15) - e
        e = h >>> 15 & 1
      }
      d = a.F(k)
      f = (f >>> 15) - (d & 32767) - e
      e = f >>> 15 & 1
      this.J(b + k, (f & 32767) << 15 | h & 32767)
      if (b + k + 1 >= this.length) throw new RangeError("out of bounds");
      (c & 1) === 0 && (f = this.F(b + k + 1), h = (f & 32767) - (d >>> 15) - e, e = h >>> 15 & 1, this.J(b + a.length, f & 1073709056 | h & 32767))
    } else {
      b >>= 1
      for (h = 0; h < a.length - 1; h++) d =
        this.F(b + h), f = a.F(h), k = (d & 32767) - (f & 32767) - e, e = k >>> 15 & 1, d = (d >>> 15) - (f >>> 15) - e, e = d >>> 15 & 1, this.J(b + h, (d & 32767) << 15 | k & 32767)
      k = this.F(b + h)
      a = a.F(h)
      d = (k & 32767) - (a & 32767) - e
      e = d >>> 15 & 1
      f = 0;
      (c & 1) === 0 && (f = (k >>> 15) - (a >>> 15) - e, e = f >>> 15 & 1)
      this.J(b + h, (f & 32767) << 15 | d & 32767)
    }
    return e
  }
  A.Ck = function (a) {
    if (a !== 0) {
      for (var b = this.F(0) >>> a, c = this.length - 1, d = 0; d < c; d++) {
        var e = this.F(d + 1)
        this.J(d, e << 30 - a & 1073741823 | b)
        b = e >>> a
      }
      this.J(c, b)
    }
  }

  function jf(a, b, c) {
    var d = a.length, e = new Xe(d + c, !1)
    if (b === 0) {
      for (b = 0; b < d; b++) e.J(b, a.F(b))
      c > 0 && e.J(d, 0)
      return e
    }
    for (var f = 0, h = 0; h < d; h++) {
      var k = a.F(h)
      e.J(h, k << b & 1073741823 | f)
      f = k >>> 30 - b
    }
    c > 0 && e.J(d, f)
    return e
  }

  A.F = function (a) {return this[a]}
  A.Zc = function (a) {return this[a] >>> 0}
  A.J = function (a, b) {this[a] = b | 0}
  A.on = function (a, b) {this[a] = b | 0}
  A.cg = function () {
    var a = this.length
    return this.Zc(a - 1) <= 32767 ? a * 2 - 1 : a * 2
  }
  A.Ga = function (a) {return this[a >>> 1] >>> (a & 1) * 15 & 32767}
  A.Fe = function (a, b) {
    var c = a >>> 1, d = this.F(c)
    this.J(c, a & 1 ? d & 32767 | b << 15 : d & 1073709056 | b & 32767)
  }
  var Ye = 33554432, df = Ye << 5,
    gf = [0, 0, 32, 51, 64, 75, 83, 90, 96, 102, 107, 111, 115, 119, 122, 126, 128, 131, 134, 136, 139, 141, 143, 145, 147, 149, 151, 153, 154, 156, 158, 159, 160, 162, 163, 165, 166],
    hf = 32, $e = "0123456789abcdefghijklmnopqrstuvwxyz".split(""), kf = new ArrayBuffer(8), lf = new Float64Array(kf)
  new Int32Array(kf)
  lf[0] = -0
  var Ze = Math.clz32 ? function (a) {return Math.clz32(a) - 2} : function (a) {return a === 0 ? 30 : 29 - (Math.log(a >>> 0) / Math.LN2 | 0) | 0},
    ff = Math.imul || function (a, b) {return a * b | 0}
  K(function (a) {return typeof a === db}, db)
  var mf = Qe(Xe), nf = Qe(We)
  var of = Ve ? nf : mf

  function pf(a) {
    var b = a
    if (Me(b)) {if (!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(b)) throw Error("Invalid string for toGbigint: " + b)} else if (Ke(b) && !Number.isSafeInteger(b)) throw Error("Invalid number for toGbigint: " + b)
    if (Ve) {
      if (of(a)) {
        if (!Ve) throw Error("This platform does not use BigInt.")
        a = He(a, nf).yf
      } else Oe(a) || (b = Ue(Me, Ne, Ke), De(a, b), a = BigInt(a))
      a = a % BigInt(2) === BigInt(qf()) ? a.toString() : a
      return a
    }
    return a = Ne(a) ? a ? "1" : "0" : Me(a) ? a.trim() || "0" : String(a)
  }

  K(function (a) {return Ve ? rf(a) : Me(a) && /^(?:-?[1-9]\d*|0)$/.test(a)}, "gbigint")
  var xf = K(function (a) {
      if (Ve) return De(sf, Oe), De(tf, Oe), a = BigInt(a), a >= sf && a <= tf
      a = He(a, Me)
      return a[0] === "-" ? uf(a, vf) : uf(a, wf)
    }, "isSafeInt52"), vf = Number.MIN_SAFE_INTEGER.toString(), sf = Ve ? BigInt(Number.MIN_SAFE_INTEGER) : void 0,
    wf = Number.MAX_SAFE_INTEGER.toString(), tf = Ve ? BigInt(Number.MAX_SAFE_INTEGER) : void 0
  K(function (a) {
    if (Ve) return De(yf, Oe), De(zf, Oe), a = BigInt(a), a >= yf && a <= zf
    a = He(a, Me)
    return a[0] === "-" ? uf(a, ia) : uf(a, Da)
  }, "isValidSignedInt64")
  var yf = Ve ? BigInt(ia) : void 0, zf = Ve ? BigInt(Da) : void 0
  K(function (a) {
    if (Ve) return De(Af, Oe), De(Bf, Oe), a = BigInt(a), a >= Af && a <= Bf
    a = He(a, Me)
    if (a[0] === "-") return !1
    De(Ca, Me)
    return uf(a, Ca)
  }, "isValidUnsignedInt64")
  var Af = Ve ? BigInt(0) : void 0, Bf = Ve ? BigInt(Ca) : void 0

  function uf(a, b) {
    if (a.length > b.length) return !1
    if (a.length < b.length || a === b) return !0
    for (var c = 0; c < a.length; c++) {
      var d = a[c], e = b[c]
      if (d > e) return !1
      if (d < e) return !0
    }
    c = Ee
    Ge("Assertion fail:", "isInRange weird case. Value was: " + a + ". Boundary was: " + b + "." || c)
  }

  function rf(a) {
    if (typeof a === db) return a % BigInt(2) === BigInt(qf()) ? (console.error("isGbigint: got a `bigint` when we were expecting a `string`. Make sure to call `toGbigint()` when creating `gbigint` instances!"), !1) : !0
    if (Me(a)) {
      if (!/^(?:-?[1-9]\d*|0)$/.test(a)) return !1
      if (Number(a[a.length - 1]) % 2 === qf()) return !0
      console.error("isGbigint: got a `string` when we were expecting a `bigint`. Make sure to call `toGbigint()` when creating `gbigint` instances!")
    }
    return !1
  }

  function qf() {
    var a = typeof Window === r && globalThis.top instanceof Window ? globalThis.top : globalThis
    a.gbigintUseStrInDebugToggleVal == null && Object.defineProperties(a, { gbigintUseStrInDebugToggleVal: { value: Math.round(Math.random()) } })
    return a.gbigintUseStrInDebugToggleVal
  }

  var Cf = 0, Df = 0

  function Ef(a) {
    var b = a >>> 0
    Cf = b
    Df = (a - b) / 4294967296 >>> 0
  }

  function Ff(a) {
    if (a < 0) {
      Ef(0 - a)
      var b = Xc(Gf(Cf, Df))
      a = b.next().value
      b = b.next().value
      Cf = a >>> 0
      Df = b >>> 0
    } else Ef(a)
  }

  function Hf(a, b) {
    var c = b * 4294967296 + (a >>> 0)
    return Number.isSafeInteger(c) ? c : If(a, b)
  }

  function If(a, b) {
    b >>>= 0
    a >>>= 0
    if (b <= 2097151) return "" + (4294967296 * b + a)
    if (Ae()) return "" + (BigInt(b) << BigInt(32) | BigInt(a))
    var c = (a >>> 24 | b << 8) & 16777215
    b = b >> 16 & 65535
    a = (a & 16777215) + c * 6777216 + b * 6710656
    c += b * 8147497
    b *= 2
    a >= 1E7 && (c += a / 1E7 >>> 0, a %= 1E7)
    c >= 1E7 && (b += c / 1E7 >>> 0, c %= 1E7)
    H(b)
    return b + Jf(c) + Jf(a)
  }

  function Jf(a) {
    a = String(a)
    return "0000000".slice(a.length) + a
  }

  function Kf() {
    var a = Cf, b = Df
    if (b & 2147483648) {
      if (Ae()) return "" + (BigInt(b | 0) << BigInt(32) | BigInt(a >>> 0))
      b = Xc(Gf(a, b))
      a = b.next().value
      b = b.next().value
      return "-" + If(a, b)
    }
    return If(a, b)
  }

  function Lf(a) {
    H(a.length > 0)
    if (a.length < 16) Ff(Number(a)) else if (Ae()) a = BigInt(a), Cf = Number(a & BigInt(4294967295)) >>> 0, Df = Number(a >> BigInt(32) & BigInt(4294967295)) else {
      H(a.length > 0)
      var b = +(a[0] === "-")
      Df = Cf = 0
      for (var c = a.length, d = 0 + b, e = (c - b) % 6 + b; e <= c; d = e, e += 6) d = Number(a.slice(d, e)), Df *= 1E6, Cf = Cf * 1E6 + d, Cf >= 4294967296 && (Df += Math.trunc(Cf / 4294967296), Df >>>= 0, Cf >>>= 0)
      b && (b = Xc(Gf(Cf, Df)), a = b.next().value, b = b.next().value, Cf = a, Df = b)
    }
  }

  function Gf(a, b) {
    b = ~b
    a ? a = ~a + 1 : b += 1
    return [a, b]
  }

  H(!0)
  var Mf = typeof Symbol === r && typeof Symbol() === wc

  function Nf(a, b, c) {return typeof Symbol === r && typeof Symbol() === wc ? (c === void 0 ? 0 : c) && Symbol.for && a ? Symbol.for(a) : a != null ? Symbol(a) : Symbol() : b}

  var Of = Nf("jas", void 0, !0), Pf = Nf("unknownBinaryFields", Symbol()), Qf = Nf("unknownBinaryThrottleKey", "0ubs"),
    Rf = Nf("m_m", "wn", !0), Sf = Nf("validPivotSelector", "vps")
  H(Math.round(Math.log2(Math.max.apply(Math, Yc(Object.values({
    gn: 1,
    fn: 2,
    en: 4,
    kn: 8,
    mn: 16,
    hn: 32,
    Zm: 64,
    cn: 128,
    an: 256,
    ln: 512,
    bn: 1024,
    dn: 2048,
    jn: 4096
  }))))) === 12)
  var Tf = { ml: { value: 0, configurable: !0, writable: !0, enumerable: !1 } }, Uf = Object.defineProperties,
    M = Mf ? I(Of) : "ml"

  function Vf(a) {
    J(a, x)
    return a[M] | 0
  }

  function Wf(a, b) {
    H((b & 8388607) === b)
    J(a, x)
    Mf || M in a || Uf(a, Tf)
    a[M] |= b
  }

  function Xf(a, b) {
    H((b & 8388607) === b)
    J(a, x)
    Mf || M in a || Uf(a, Tf)
    a[M] = b
  }

  function Yf(a, b) {
    H(b & 64, "state for messages must be constructed")
    H((b & 5) === 0, "state for messages should not contain repeated field state")
    if (b & 64) {
      H(b & 64)
      var c = b >> 13 & 1023 || 536870912
      H(b & 64)
      var d = a.length
      H(c + (b & 128 ? 0 : -1) >= d - 1, "pivot %s is pointing at an index earlier than the last index of the array, length: %s", c, d)
      b & 128 && H(typeof a[0] === z, "arrays with a message_id bit must have a string in the first position, got: %s", a[0])
    }
  }

  function Zf(a, b) {
    ke(b)
    H(b > 0 && b <= 1023 || 536870912 === b, "pivot must be in the range [1, 1024) or NO_PIVOT got %s", b)
    return a & -8380417 | (b & 1023) << 13
  }

  var $f = Object.getOwnPropertyDescriptor(Array.prototype, "ql")
  Object.defineProperties(Array.prototype, {
    ql: {
      get: function () {
        var a = ag(this)
        return $f ? $f.get.call(this) + "|" + a : a
      }, configurable: !0, enumerable: !1
    }
  })

  function ag(a) {
    function b(e, f) {e & c && d.push(f)}

    var c = Vf(a), d = []
    b(1, "IS_REPEATED_FIELD")
    b(2, "IS_IMMUTABLE_ARRAY")
    b(4, "IS_API_FORMATTED")
    b(512, "STRING_FORMATTED")
    b(1024, "GBIGINT_FORMATTED")
    b(1024, "BINARY")
    b(8, "ONLY_MUTABLE_VALUES")
    b(16, "UNFROZEN_SHARED")
    b(32, "MUTABLE_REFERENCES_ARE_OWNED")
    b(64, "CONSTRUCTED")
    b(128, "HAS_MESSAGE_ID")
    b(256, "FROZEN_ARRAY")
    b(2048, "HAS_WRAPPER")
    b(4096, "MUTABLE_SUBSTRUCTURES")
    c & 64 && (H(c & 64), a = c >> 13 & 1023 || 536870912, a !== 536870912 && d.push("pivot: " + a))
    return d.join(",")
  }

  var bg = Mf && Math.random() < .5, cg = bg ? Symbol() : void 0, dg, eg = typeof Rf === wc, fg = {}

  function gg(a) {
    var b = a[Rf], c = b === fg
    H(!dg || c === a instanceof dg)
    if (eg && b && !c) throw Error("multiple jspb runtimes detected")
    return c
  }

  function hg(a, b) {
    ke(a)
    H(a > 0)
    H(b === 0 || b === -1)
    return a + b
  }

  function ig(a) {
    H(void 0 === jg || !0)
    return a + -1
  }

  function kg(a, b) {
    ke(a)
    H(a >= 0)
    H(b === 0 || b === -1)
    return a - b
  }

  function lg(a, b) {
    if (b === void 0) {
      if (b = !mg(a)) H(gg(a)), a = bg ? a[I(cg)] : a.da, J(a, x), b = a[M] | 0, Yf(a, b), b = !!(2 & b)
      return b
    }
    H(gg(a))
    var c = bg ? a[I(cg)] : a.da
    J(c, x)
    var d = c[M] | 0
    Yf(c, d)
    H(b === d)
    return !!(2 & b) && !mg(a)
  }

  var ng = {}

  function mg(a) {
    var b = a.Ok, c;
    (c = !b) || (H(gg(a)), a = bg ? a[I(cg)] : a.da, J(a, x), c = a[M] | 0, Yf(a, c), c = !!(2 & c))
    H(c)
    H(b === void 0 || b === ng)
    return b === ng
  }

  function og(a, b) {
    H(gg(a))
    var c = bg ? a[I(cg)] : a.da
    J(c, x)
    var d = c[M] | 0
    Yf(c, d)
    H(b === !!(2 & d))
    a.Ok = b ? ng : void 0
  }

  var pg = Symbol("exempted jspb subclass"),
    qg = typeof Symbol != "undefined" && typeof Symbol.hasInstance != "undefined"

  function rg() {}

  function sg(a) {
    var b = J(a)
    J(b, x)
    b = b[M] | 0
    H(!(b & 2 && b & 4 || b & 256) || Object.isFrozen(a))
    J(a, x)
    a = a[M] | 0
    b = a & 4
    var c = (512 & a ? 1 : 0) + (1024 & a ? 1 : 0)
    H(b && c <= 1 || !b && c === 0, "Expected at most 1 type-specific formatting bit, but got " + c + " with state: " + a)
  }

  Object.freeze({})
  var jg = {}

  function tg(a) {
    J(a, x)
    a = a[M] | 0
    H(a & 64)
    a & 128 ? H(void 0 === jg) : H(!0)
  }

  function ug(a, b) {
    a.__closure__error__context__984382 || (a.__closure__error__context__984382 = {})
    a.__closure__error__context__984382.severity = b
  }

  var vg = {}

  function wg(a) {
    a = Error(a)
    ug(a, "warning")
    return a
  }

  function xg() {throw Error("Unknown format requested type for int64")}

  var yg = typeof BigInt === r ? BigInt.asIntN : void 0,
    zg = typeof BigInt === r ? BigInt.asUintN : void 0, Ag = Number.isSafeInteger, Bg = Number.isFinite,
    Cg = Math.trunc, Dg = Number.MAX_SAFE_INTEGER

  function Eg(a) {
    if (a == null || typeof a === t) return a
    if (a === "NaN" || a === "Infinity" || a === "-Infinity") return Number(a)
  }

  function Fg(a) {
    if (a == null || typeof a === jb) return a
    if (typeof a === t) return !!a
  }

  var Gg = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/

  function Hg(a) {
    switch (typeof a) {
      case db:
        return !0
      case t:
        return Bg(a)
      case z:
        return Gg.test(a)
      default:
        return !1
    }
  }

  function Ig(a) {return "Expected int32 as finite number but got " + gd(a) + ": " + a}

  function Jg(a) {
    if (a == null) return a
    if (typeof a === z && a) a = +a else if (typeof a !== t) return
    return Bg(a) ? a | 0 : void 0
  }

  function Kg(a) {
    var b = 0
    b = b === void 0 ? 0 : b
    if (!Hg(a)) throw wg("Expected an int64 value encoded as a number or a string but got " + gd(a) + ": " + a)
    var c = typeof a
    switch (b) {
      case 512:
        switch (c) {
          case z:
            return Lg(a, !0)
          case db:
            return String(yg(64, a))
          default:
            return Mg(He(a, Ke))
        }
      case 1024:
        switch (c) {
          case z:
            return Ng(a)
          case db:
            return Og(a)
          default:
            return Pg(He(a, Ke))
        }
      case 0:
        switch (c) {
          case z:
            return Lg(a, !1)
          case db:
            return Og(a)
          default:
            return Qg(He(a, Ke), !1)
        }
      default:
        return xg()
    }
  }

  function Rg(a) {
    if (a[0] === "-") return !1
    var b = a.length
    return b < 20 ? !0 : b === 20 && Number(a.substring(0, 6)) < 184467
  }

  function Sg(a) {
    var b = a.length
    return a[0] === "-" ? b < 20 ? !0 : b === 20 && Number(a.substring(0, 7)) > -922337 : b < 19 ? !0 : b === 19 && Number(a.substring(0, 6)) < 922337
  }

  function Tg(a) {
    H(a < 0 || !(0 < a && a < Dg))
    H(Number.isInteger(a))
    if (a < 0) {
      Ff(a)
      var b = If(Cf, Df)
      a = Number(b)
      return Ag(a) ? a : b
    }
    b = String(a)
    if (Rg(b)) return b
    Ff(a)
    return Hf(Cf, Df)
  }

  function Ug(a) {
    H(a.indexOf(".") === -1)
    if (Sg(a)) return a
    Lf(a)
    return Kf()
  }

  function Vg(a) {
    H(a.indexOf(".") === -1)
    if (Rg(a)) return a
    Lf(a)
    return If(Cf, Df)
  }

  function Qg(a, b) {
    H(Hg(a))
    H(b || !0)
    a = Cg(a)
    if (Ag(a)) return a
    H(!Ag(a))
    H(Number.isInteger(a))
    Ff(a)
    b = Cf
    var c = Df
    if (a = c & 2147483648) b = ~b + 1 >>> 0, c = ~c >>> 0, b == 0 && (c = c + 1 >>> 0)
    b = Hf(b, c)
    return typeof b === t ? a ? -b : b : a ? "-" + b : b
  }

  function Wg(a, b) {
    H(Hg(a))
    H(b || !0)
    a = Cg(a)
    return a >= 0 && Ag(a) ? a : Tg(a)
  }

  function Mg(a) {
    H(Hg(a))
    H(!0)
    a = Cg(a)
    if (Ag(a)) return String(a)
    H(!Ag(a))
    H(Number.isInteger(a))
    var b = String(a)
    Sg(b) ? a = b : (Ff(a), a = Kf())
    return a
  }

  function Xg(a) {
    H(Hg(a))
    H(!0)
    a = Cg(a)
    if (a >= 0 && Ag(a)) return String(a)
    H(a < 0 || !(0 < a && a < Dg))
    H(Number.isInteger(a))
    var b = String(a)
    Rg(b) ? a = b : (Ff(a), a = If(Cf, Df))
    return a
  }

  function Lg(a, b) {
    H(Hg(a))
    H(b || !0)
    b = Cg(Number(a))
    if (Ag(b)) return String(b)
    b = a.indexOf(".")
    b !== -1 && (a = a.substring(0, b))
    return Ug(a)
  }

  function Ng(a) {
    var b = Cg(Number(a))
    if (Ag(b)) return pf(b)
    b = a.indexOf(".")
    b !== -1 && (a = a.substring(0, b))
    return Ae() ? Og(BigInt(a)) : pf(Ug(a))
  }

  function Pg(a) {return Ag(a) ? pf(Qg(a, !0)) : pf(Mg(a))}

  function Yg(a) {return Ag(a) ? pf(Wg(a, !0)) : pf(Xg(a))}

  function Zg(a, b) {
    H(Hg(a))
    H(b || !0)
    b = Cg(Number(a))
    if (Ag(b) && b >= 0) return String(b)
    b = a.indexOf(".")
    b !== -1 && (a = a.substring(0, b))
    return Vg(a)
  }

  function $g(a) {
    var b = Cg(Number(a))
    if (Ag(b) && b >= 0) return pf(b)
    b = a.indexOf(".")
    b !== -1 && (a = a.substring(0, b))
    return Ae() ? ah(BigInt(a)) : pf(Vg(a))
  }

  function Og(a) {
    H(typeof a === db)
    return pf(yg(64, a))
  }

  function ah(a) {
    H(typeof a === db)
    return pf(zg(64, a))
  }

  function bh(a) {
    var b = typeof a
    if (a == null) return a
    if (b === db) return Og(a)
    if (Hg(a)) {
      if (b === z) return Ng(a)
      a = He(a, Ke)
      return Pg(a)
    }
  }

  function ch(a) {
    var b = 0
    b = b === void 0 ? 0 : b
    if (!Hg(a)) throw wg("Expected an uint64 value encoded as a number or a string but got " + gd(a) + ": " + a)
    var c = typeof a
    switch (b) {
      case 512:
        switch (c) {
          case z:
            return Zg(a, !0)
          case db:
            return String(zg(64, a))
          default:
            return Xg(He(a, Ke))
        }
      case 1024:
        switch (c) {
          case z:
            return $g(a)
          case db:
            return ah(a)
          default:
            return Yg(He(a, Ke))
        }
      case 0:
        switch (c) {
          case z:
            return Zg(a, !1)
          case db:
            return ah(a)
          default:
            return Wg(He(a, Ke), !1)
        }
      default:
        return xg()
    }
  }

  function dh(a) {
    var b = typeof a
    if (a == null) return a
    if (b === db) return ah(a)
    if (Hg(a)) {
      if (b === z) return $g(a)
      a = He(a, Ke)
      return Yg(a)
    }
  }

  function eh(a) {return a}

  eh[Sf] = {}

  function fh(a) {return a}

  function gh() {throw Error("please construct maps as mutable then call toImmutable")}

  if (qg) {
    var hh = function () {throw Error("Cannot perform instanceof checks on ImmutableMap: please use isImmutableMap or isMutableMap to assert on the mutability of a map. See go/jspb-api-gotchas#immutable-classes for more information")},
      ih = {}
    Object.defineProperties(gh, (ih[Symbol.hasInstance] = {
      value: hh,
      configurable: !1,
      writable: !1,
      enumerable: !1
    }, ih))
    H(gh[Symbol.hasInstance] === hh, "defineProperties did not work: was it monkey-patched?")
  }

  function jh() {}

  function kh(a, b) {for (var c in a) !isNaN(c) && b(a, +c, J(a[c]))}

  function lh(a) {
    var b = new jh
    kh(a, function (c, d, e) {b[d] = Array.prototype.slice.call(e)})
    b.Cm = a.Cm
    return b
  }

  function mh(a, b) {
    if (!(b < 100) && Qf != null) {
      var c
      a = (c = vg) != null ? c : vg = {}
      c = a[Qf] || 0
      c >= 1 || (a[Qf] = c + 1, c = Error("0ubs"), ug(c, "incident"), pe(c))
    }
  }

  function nh(a, b, c, d) {
    var e = d !== void 0
    d = !!d
    var f = md(Pf), h
    !e && Mf && f && (h = a[f]) && kh(h, mh)
    f = []
    var k = a.length
    h = 4294967295
    var l = !1, m = !!(b & 64)
    if (m) {
      H(b & 64)
      var n = b & 128 ? 0 : -1
    } else n = void 0
    if (!(b & 1)) {
      var u = k && a[k - 1]
      u != null && typeof u === Zb && u.constructor === Object ? (k--, h = k) : u = void 0
      if (m && !(b & 128) && !e) {
        l = !0
        var w, y;
        (w = oh) != null ? y = w : y = eh
        h = hg(y(kg(h, I(n)), I(n), a, u), I(n))
      }
    }
    b = void 0
    for (w = 0; w < k; w++) if (y = a[w], y != null && (y = c(y, d)) != null) if (m && w >= h) {
      ph()
      var L = kg(w, I(n)), B = void 0;
      ((B = b) != null ? B : b = {})[L] = y
    } else f[w] =
      y
    if (u) for (var Ha in u) k = u[Ha], k != null && (k = c(k, d)) != null && (w = +Ha, y = void 0, m && !Number.isNaN(w) && (y = hg(w, I(n))) < h ? (ph(), f[I(y)] = k) : (w = void 0, ((w = b) != null ? w : b = {})[Ha] = k))
    b && (l ? f.push(b) : (H(h < 4294967295), f[h] = b))
    e && md(Pf) && (J(f), J(a), H(f[Pf] === void 0), (a = (c = md(Pf)) ? J(a)[c] : void 0) && a instanceof jh && (f[Pf] = lh(a)))
    return f
  }

  function qh(a) {
    I(a)
    switch (typeof a) {
      case t:
        return Number.isFinite(a) ? a : "" + a
      case db:
        return xf(a) ? Number(a) : "" + a
      case jb:
        return a ? 1 : 0
      case Zb:
        if (Array.isArray(a)) {
          sg(a)
          J(a, x)
          var b = a[M] | 0
          return a.length === 0 && b & 1 ? void 0 : nh(a, b, qh)
        }
        if (a != null && gg(a)) return rh(a)
        H(!(a instanceof Uint8Array))
        return
    }
    return a
  }

  var oh

  function rh(a) {
    H(gg(a))
    a = bg ? a[I(cg)] : a.da
    J(a, x)
    var b = a[M] | 0
    Yf(a, b)
    return nh(a, b, qh)
  }

  function ph() {
    var a, b;
    (a = oh) != null ? b = a : b = eh
    H(b !== fh)
  }

  if (typeof Proxy !== "undefined") {
    var th = sh
    new Proxy({}, {
      getPrototypeOf: th,
      setPrototypeOf: th,
      isExtensible: th,
      preventExtensions: th,
      getOwnPropertyDescriptor: th,
      defineProperty: th,
      has: th,
      get: th,
      set: th,
      deleteProperty: th,
      apply: th,
      construct: th
    })
  }

  function sh() {throw Error("this array or object is owned by JSPB and should not be reused, did you mean to copy it with copyJspbArray? See go/jspb-api-gotchas#construct_from_array")}

  function uh(a, b, c) {
    var d = d === void 0 ? 0 : d
    if (a != null) for (var e = 0; e < a.length; e++) {
      var f = a[e]
      Array.isArray(f) && sg(f)
    }
    if (a == null) e = 32, c ? (a = [c], e |= 128) : a = [], b && (e = Zf(e, b)) else {
      if (!Array.isArray(a)) throw Error("data passed to JSPB constructors must be an Array, got '" + JSON.stringify(a) + "' a " + gd(a))
      e = a
      J(e, x)
      e = e[M] | 0
      if (1 & e) throw Error("Array passed to JSPB constructor is a repeated field array that belongs to another proto instance.")
      2048 & e && !(2 & e) && vh()
      if (Object.isFrozen(a) || !Object.isExtensible(a) ||
        Object.isSealed(a)) throw Error("data passed to JSPB constructors must be mutable")
      if (e & 256) throw Error("farr")
      if (e & 64) return d !== 0 || e & 2048 || Xf(a, e |= 2048), Yf(a, e), a
      if (c && (e |= 128, c !== a[0])) throw Error("Expected message to have a message id: \"" + c + "\" in the array, got: " + JSON.stringify(a[0]) + " a " + gd(a[0]) + ", are you parsing with the wrong proto?")
      a:{
        c = a
        e |= 64
        var h = c.length
        if (h) {
          var k = h - 1
          f = c[k]
          if (f != null && typeof f === Zb && f.constructor === Object) {
            H(e & 64)
            b = e & 128 ? 0 : -1
            h = kg(k, b)
            if (h >= 1024) throw Error("Found a message with a sparse object at fieldNumber " +
              h + " is >= the limit 1024")
            for (var l in f) k = +l, k < h && (k = hg(k, b), H(c[k] == null), c[k] = f[l], delete f[l])
            e = Zf(e, h)
            break a
          }
        }
        if (b) {
          H(e & 64)
          l = Math.max(b, kg(h, e & 128 ? 0 : -1))
          if (l > 1024) throw Error("a message was constructed with an array of length " + h + " which is longer than 1024, are you using a supported serializer?")
          e = Zf(e, l)
        }
      }
    }
    e |= 64
    d === 0 && (e |= 2048)
    Xf(a, e)
    return a
  }

  function vh() {throw Error("Array passed to JSPB constructor already belongs to another JSPB proto instance")}

  function wh(a, b) {
    I(a)
    if (typeof a !== Zb) return a
    if (Array.isArray(a)) {
      sg(a)
      J(a, x)
      var c = a[M] | 0
      if (a.length === 0 && c & 1) a = void 0 else if (!(c & 2)) {
        var d
        if (d = b) H(!(2 & c)), H(!(2048 & c)), d = !(4096 & c) && !(16 & c)
        d ? (Wf(a, 34), c & 4 && Object.freeze(a)) : a = xh(a, c, !1, b && !(c & 16))
      }
      return a
    }
    if (a != null && gg(a)) return H(a != null && gg(a)), H(gg(a)), b = bg ? a[I(cg)] : a.da, J(b, x), c = b[M] | 0, Yf(b, c), lg(a, c) ? a : yh(a, b, c) ? zh(a, b) : xh(b, c)
    H(!(a instanceof Uint8Array))
  }

  function zh(a, b, c) {
    a = new a.constructor(b)
    c && og(a, !0)
    a.Si = ng
    return a
  }

  function xh(a, b, c, d) {
    var e = b
    J(a, x)
    H(e === (a[M] | 0))
    d != null || (d = !!(34 & b))
    a = nh(a, b, wh, d)
    d = 32
    c && (d |= 2)
    b = b & 8380609 | d
    Xf(a, b)
    return a
  }

  function yh(a, b, c) {return pg && a[pg] ? !1 : c & 2 ? !0 : c & 32 && !(c & 4096) ? (Xf(b, c | 2), og(a, !0), !0) : !1}

  var Ah = {}

  function Bh(a, b, c, d) {
    H(Object.isExtensible(a))
    H(gg(a))
    var e = bg ? a[I(cg)] : a.da
    a:if (tg(e), b === -1) b = null; else {
      var f = ig(b)
      J(e, x)
      var h = e[M] | 0
      H(h & 64)
      H(f === hg(b, h & 128 ? 0 : -1))
      H(f >= 0)
      h = e.length - 1
      if (h < ig(1)) b = void 0 else {
        if (f >= h) {
          var k = e[h]
          if (k != null && typeof k === Zb && k.constructor === Object) {
            h = k[b]
            var l = !0
          } else if (f === h) h = k else {
            b = void 0
            break a
          }
        } else h = e[f]
        if (d && h != null) {
          d = d(h)
          if (d == null) {
            b = d
            break a
          }
          if (!Object.is(d, h)) {
            l ? k[b] = d : e[f] = d
            b = d
            break a
          }
        }
        b = h
      }
    }
    (e = b !== null) || (c && (a = a.Si, H(a === void 0 || a ===
      ng), c = a !== ng), e = c)
    if (e) return b
  }

  function Ch(a, b, c) {
    if (mg(a)) {
      H(gg(a))
      var d = bg ? a[I(cg)] : a.da
      var e = d
      J(e, x)
      var f = e[M] | 0
      Yf(e, f)
      H(f & 2)
      d = xh(d, f)
      Wf(d, 2048)
      H(gg(a))
      J(d)
      bg ? a[I(cg)] = d : a.da = d
      og(a, !1)
      a.Si = void 0
      d = !0
    } else d = !1
    if (!d && (H(gg(a)), d = bg ? a[I(cg)] : a.da, J(d, x), e = d[M] | 0, Yf(d, e), lg(a, e))) throw Error("Cannot mutate an immutable Message")
    H(gg(a))
    a = bg ? a[I(cg)] : a.da
    J(a, x)
    e = a[M] | 0
    Yf(a, e)
    a:{
      tg(a)
      d = ig(b)
      J(a, x)
      f = a[M] | 0
      H(f & 64)
      H(d === hg(b, f & 128 ? 0 : -1))
      H(d >= 0)
      f = a.length - 1
      if (f >= ig(1) && d >= f) {
        var h = a[f]
        if (h != null && typeof h ===
          Zb && h.constructor === Object) {
          h[b] = c
          break a
        }
      }
      d <= f ? a[d] = c : c !== void 0 && (e == null && (J(a, x), e = a[M] | 0, Yf(a, e)), H(e & 64), e = e >> 13 & 1023 || 536870912, b >= e ? (H(e !== 536870912), c != null && (d = {}, a[ig(e)] = (d[b] = c, d))) : a[d] = c)
    }
  }

  function Dh(a, b) {
    var c = c === void 0 ? !1 : c
    var d
    return (d = Fg(Bh(a, b))) != null ? d : c
  }

  function N(a, b) {return Fg(Bh(a, b, Ah))}

  function O(a, b) {return Jg(Bh(a, b, Ah))}

  function Eh(a, b) {
    a = Bh(a, b, Ah)
    return a == null || typeof a === z ? a : void 0
  }

  function P(a, b, c) {
    if (c != null && typeof c !== jb) throw Error("Expected boolean but got " + gd(c) + ": " + c)
    Ch(a, b, c)
  }

  function Q(a, b, c) {
    if (c != null) {
      if (typeof c !== t) throw wg(Ig(c))
      if (!Bg(c)) throw wg(Ig(c))
      c |= 0
    }
    Ch(a, b, c)
  }

  function Fh(a, b, c) {
    c = c == null ? c : Kg(c)
    Ch(a, b, c)
  }

  function Gh(a, b, c) {
    if (c != null && typeof c !== t) throw Error("Value of float/double field must be a number, found " + typeof c + ": " + c)
    Ch(a, b, c)
  }

  function Hh(a, b, c) {
    if (c != null && typeof c !== z) throw Error("Expected a string or null or undefined but got " + c + " a " + gd(c))
    Ch(a, b, c)
  }

  function Ih(a, b, c) {
    this.preventPassingToStructuredClone = rg
    ne(this, Ih, "The message constructor should only be used by subclasses")
    H(this.constructor !== Ih, "Message is an abstract class and cannot be directly constructed")
    a = uh(a, b, c)
    H(gg(this))
    J(a)
    bg ? this[I(cg)] = a : this.da = a
    H(gg(this))
    a = bg ? this[I(cg)] : this.da
    J(a, x)
    b = a[M] | 0
    Yf(a, b)
    H(b & 64)
    H(b & 2048)
  }

  Ih.prototype.toJSON = function () {
    H(!oh)
    var a = rh(this)
    return a
  }
  Ih.prototype.clone = function () {
    var a = ne(this, Ih)
    H(a != null && gg(a))
    H(gg(a))
    var b = bg ? a[I(cg)] : a.da
    J(b, x)
    var c = b[M] | 0
    Yf(b, c)
    return yh(a, b, c) ? zh(a, b, !0) : new a.constructor(xh(b, c, !1))
  }
  dg = Ih
  Ih.prototype[Rf] = fg
  Ih.prototype.toString = function () {
    H(gg(this))
    var a = bg ? this[I(cg)] : this.da
    return a.toString()
  }

  function Jh(a) {if (a instanceof Ih) return a.constructor.nl};(function () {
    var a = E.jspbGetTypeName
    E.jspbGetTypeName = a ? function (b) {return a(b) || Jh(b)} : Jh
  })()
  var Kh = Ih

  function Lh(a) {Kh.call(this, a)}

  D(Lh, Kh)
  A = Lh.prototype
  A.Fb = function () {return O(this, 1)}
  A.qc = function () {return O(this, 12)}
  A.oc = function () {return O(this, 13)}
  A.di = function () {return N(this, 33)}
  A.vd = function () {return Dh(this, 2)}
  A.ud = function () {return N(this, 51)}
  A.wd = function () {return N(this, 32)}
  A.zd = function () {return Dh(this, 19)}
  A.Ad = function () {return Dh(this, 52)}
  A.Bd = function () {return Dh(this, 67)}
  A.Ng = function () {return N(this, 80)}
  A.td = function () {return Dh(this, 20)}
  A.yd = function () {return N(this, 60)}
  A.Og = function () {return Dh(this, 3)}
  A.hh = function () {return Dh(this, 4)}
  A.Dh = function () {return dh(Bh(this, 7, Ah))}
  A.oh = function () {return N(this, 65)}
  A.Ug = function () {return O(this, 94)}
  A.dh = function () {return dh(Bh(this, 29, Ah))}
  A.ki = function () {return O(this, 9)}
  A.li = function () {return O(this, 10)}
  A.mi = function () {return O(this, 11)}
  A.ii = function () {return Dh(this, 14)}
  A.Zg = function () {return Dh(this, 34)}
  A.ji = function () {return Dh(this, 72)}
  A.Sg = function () {return O(this, 15)}
  A.Tg = function () {return O(this, 107)}
  A.kh = function () {return Eh(this, 16)}
  A.nh = function () {return N(this, 17)}
  A.ri = function () {return N(this, 18)}
  A.si = function () {return N(this, 45)}
  A.bl = function () {return N(this, 22)}
  A.mh = function () {return N(this, 54)}
  A.fi = function () {return N(this, 82)}
  A.Jh = function () {return N(this, 83)}
  A.gi = function () {return N(this, 93)}
  A.ei = function () {return N(this, 95)}
  A.Rg = function () {return N(this, 21)}
  A.Jg = function () {return Dh(this, 23)}
  A.ni = function () {return Eh(this, 24)}
  A.ti = function () {return Eh(this, 36)}
  A.Zh = function () {return Dh(this, 6)}
  A.Xh = function () {return O(this, 26)}
  A.gh = function () {return N(this, 30)}
  A.wi = function () {return N(this, 31)}
  A.Eh = function () {return N(this, 27)}
  A.Mh = function () {return Eh(this, 28)}
  A.Rh = function () {return N(this, 57)}
  A.Sh = function () {return N(this, 58)}
  A.Ph = function () {return N(this, 59)}
  A.Oh = function () {return Dh(this, 103)}
  A.Uh = function () {return Dh(this, 35)}
  A.Vh = function () {return Dh(this, 41)}
  A.Nh = function () {return Dh(this, 64)}
  A.Ch = function () {return Dh(this, 48)}
  A.Qh = function () {return Dh(this, 49)}
  A.ph = function () {return N(this, 97)}
  A.yh = function () {return Dh(this, 37)}
  A.Ig = function () {return O(this, 38)}
  A.Hg = function () {return O(this, 86)}
  A.Gg = function () {return O(this, 39)}
  A.Eg = function () {return O(this, 87)}
  A.Fh = function () {return O(this, 88)}
  A.hi = function () {return O(this, 89)}
  A.zh = function () {return N(this, 40)}
  A.Wg = function () {return O(this, 42)}
  A.Vg = function () {return O(this, 43)}
  A.Lh = function () {return O(this, 44)}
  A.Kh = function () {return O(this, 62)}
  A.Bh = function () {return N(this, 46)}
  A.Ih = function () {return N(this, 61)}
  A.ah = function () {return N(this, 50)}
  A.wh = function () {return N(this, 53)}
  A.uh = function () {return N(this, 55)}
  A.Yh = function () {return O(this, 56)}
  A.yi = function () {return O(this, 63)}
  A.Ci = function () {return Eh(this, 81)}
  A.Bi = function () {return N(this, 98)}
  A.Pg = function () {return N(this, 90)}
  A.xi = function () {return bh(Bh(this, 68, Ah))}
  A.Ai = function () {return bh(Bh(this, 69, Ah))}
  A.qh = function () {return N(this, 66)}
  A.jh = function () {return N(this, 70)}
  A.cl = function () {return O(this, 71)}
  A.sh = function () {return N(this, 73)}
  A.Yg = function () {return N(this, 84)}
  A.th = function () {return N(this, 91)}
  A.ih = function () {return N(this, 96)}
  A.Dg = function () {return N(this, 74)}
  A.Yf = function () {return bh(Bh(this, 75, Ah))}
  A.Gh = function () {return Bh(this, 76, Ah, Eg)}
  A.Di = function () {return Bh(this, 77, Ah, Eg)}
  A.Wh = function () {return Bh(this, 78, Ah, Eg)}
  A.bh = function () {return Bh(this, 79, Ah, Eg)}
  A.Fg = function () {return O(this, 85)}
  A.Lg = function () {return O(this, 92)}
  A.oi = function () {return N(this, 113)}
  A.Ah = function () {return N(this, 114)}
  A.Mg = function () {return Eh(this, 99)}
  A.Th = function () {return N(this, 100)}
  A.zi = function () {return Eh(this, 102)}
  A.Qg = function () {return N(this, 104)}
  A.eh = function () {return N(this, 105)}
  A.xh = function () {return N(this, 106)}
  A.Xg = function () {return N(this, 108)}
  A.ai = function () {return O(this, 109)}
  A.bi = function () {return O(this, 110)}
  A.Hh = function () {return Eh(this, 111)}
  A.Kg = function () {return Eh(this, 112)}
  Lh.nl = "photos.ImageUrlOptions"

  function Mh(a, b) {
    this.name = a
    this.value = b
  }

  Mh.prototype.toString = function () {return this.name}
  var Nh = new Mh("OFF", Infinity), Oh = new Mh("SEVERE", 1E3), Ph = new Mh("CONFIG", 700)

  function Qh() {this.clear()}

  var Rh
  Qh.prototype.clear = function () {}

  function Sh(a, b, c) {
    this.ug = void 0
    this.reset(a || Nh, b, c, void 0, void 0)
  }

  Sh.prototype.reset = function () {this.ug = void 0}

  function Th(a, b) {
    this.ee = null
    this.el = []
    this.parent = (b === void 0 ? null : b) || null
    this.children = []
    this.Qi = { de: function () {return a} }
  }

  function Uh(a) {
    if (a.ee) return a.ee
    if (a.parent) return Uh(a.parent)
    je("Root logger has no level set.")
    return Nh
  }

  function Vh(a, b) {for (; a;) a.el.forEach(function (c) {c(b)}), a = a.parent}

  function Wh() {
    this.entries = {}
    var a = new Th("")
    a.ee = Ph
    this.entries[""] = a
  }

  var Xh

  function Yh(a, b) {
    var c = a.entries[b]
    if (c) return c
    c = b.slice(0, Math.max(b.lastIndexOf("."), 0))
    c = Yh(a, c)
    var d = new Th(b, c)
    a.entries[b] = d
    c.children.push(d)
    return d
  }

  function Zh() {
    Xh || (Xh = new Wh)
    return Xh
  }

  function $h(a, b) {
    if (a) {
      var c = Oh, d
      if (d = a) if (a && c) {
        d = c.value
        if (a) {
          var e = Yh(Zh(), a.de())
          e = Uh(e)
        } else e = Nh
        d = d >= e.value
      } else d = !1
      d && (c = c || Nh, d = Yh(Zh(), a.de()), typeof b === r && (b = b()), Rh || (Rh = new Qh), a = new Sh(c, b, a.de()), a.ug = void 0, Vh(d, a))
    }
  }

  var ai = {}

  function bi() {if (ai !== ai) throw Error("Bad secret")}

  var ci = globalThis.trustedTypes, di

  function ei() {
    var a = null
    if (!ci) return a
    try {
      var b = function (c) {return c}
      a = ci.createPolicy("goog#html", { createHTML: b, createScript: b, createScriptURL: b })
    } catch (c) {throw c}
    return a
  }

  function fi() {
    di === void 0 && (di = ei())
    return di
  }

  function gi(a) {
    bi()
    this.jj = a
  }

  gi.prototype.toString = function () {return this.jj + ""}

  function hi(a) {
    var b = fi()
    a = b ? b.createScriptURL(a) : a
    return new gi(a)
  }

  function ii(a) {
    if (a instanceof gi) return a.jj
    throw Error("Unexpected type when unwrapping TrustedResourceUrl")
  }

  var ji = Zc([""]), ki = $c(["\x00"], ["\\0"]), li = $c(["\n"], ["\\n"]), mi = $c(["\x00"], ["\\u0000"]),
    ni = Zc([""]), oi = $c(["\x00"], ["\\0"]), pi = $c(["\n"], ["\\n"]), qi = $c(["\x00"], ["\\u0000"])

  function ri(a) {return Object.isFrozen(a) && Object.isFrozen(a.raw)}

  function si(a) {return a.toString().indexOf("`") === -1}

  var ti = si(function (a) {return a(ji)}) || si(function (a) {return a(ki)}) || si(function (a) {return a(li)}) || si(function (a) {return a(mi)}),
    ui = ri(ni) && ri(oi) && ri(pi) && ri(qi)

  function vi(a) {
    bi()
    this.kj = a
  }

  vi.prototype.toString = function () {return this.kj}
  new vi("about:blank")
  new vi(Va)
  var wi = /^\s*(?!javascript:)(?:[\w+.-]+:|[^:/?#]*(?:[/?#]|$))/i

  function xi(a) {
    var b = !wi.test(a)
    b && yi(a)
    if (!b) return a
  }

  function zi(a) {
    if (a instanceof vi) if (a instanceof vi) a = a.kj else throw Error("Unexpected type when unwrapping SafeUrl, got '" + a + "' of type '" + typeof a + "'") else a = xi(a)
    return a
  }

  var Ai = []

  function yi() {}

  Bi(function (a) {console.warn("A URL with content '" + a + "' was sanitized away.")})

  function Bi(a) {
    Ai.indexOf(a) === -1 && Ai.push(a)
    yi = function (b) {Ai.forEach(function (c) {c(b)})}
  }

  function Ci(a) {
    bi()
    this.ij = a
  }

  Ci.prototype.toString = function () {return this.ij + ""}

  function Di(a) {
    var b = fi()
    a = b ? b.createHTML(a) : a
    return new Ci(a)
  }

  function Ei(a) {
    if (a instanceof Ci) return a.ij
    throw Error("Unexpected type when unwrapping SafeHtml")
  }

  function Fi(a) {
    var b, c = a.ownerDocument
    c = c === void 0 ? document : c
    var d
    c = (d = (b = c).querySelector) == null ? void 0 : d.call(b, "script[nonce]");
    (b = c == null ? "" : c.nonce || c.getAttribute("nonce") || "") && a.setAttribute("nonce", b)
  }

  var Gi = String.prototype.repeat ? function (a, b) {return a.repeat(b)} : function (a, b) {return Array(b + 1).join(a)}

  function Hi(a) {return String(a).replace(/\-([a-z])/g, function (b, c) {return c.toUpperCase()})}

  function Ii(a) {return a.replace(RegExp("(^|[\\s]+)([a-z])", "g"), function (b, c, d) {return c + d.toUpperCase()})}

  function Ji(a, b) {
    var c = Array.prototype.slice.call(arguments), d = c.shift()
    if (typeof d == "undefined") throw Error("[goog.string.format] Template required")
    return d.replace(/%([0\- \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g, function (e, f, h, k, l, m, n, u) {
      if (m == "%") return "%"
      var w = c.shift()
      if (typeof w == "undefined") throw Error("[goog.string.format] Not enough arguments")
      arguments[0] = w
      return Ki[m].apply(null, arguments)
    })
  }

  var Ki = {
    s: function (a, b, c) {return isNaN(c) || c == "" || a.length >= Number(c) ? a : a = b.indexOf("-", 0) > -1 ? a + Gi(" ", Number(c) - a.length) : Gi(" ", Number(c) - a.length) + a},
    f: function (a, b, c, d, e) {
      d = a.toString()
      isNaN(e) || e == "" || (d = parseFloat(a).toFixed(e))
      var f = Number(a) < 0 ? "-" : b.indexOf("+") >= 0 ? "+" : b.indexOf(" ") >= 0 ? " " : ""
      Number(a) >= 0 && (d = f + d)
      if (isNaN(c) || d.length >= Number(c)) return d
      d = isNaN(e) ? Math.abs(Number(a)).toString() : Math.abs(Number(a)).toFixed(e)
      a = Number(c) - d.length - f.length
      return d = b.indexOf("-", 0) >= 0 ?
        f + d + Gi(" ", a) : f + Gi(b.indexOf("0", 0) >= 0 ? "0" : " ", a) + d
    },
    d: function (a, b, c, d, e, f, h, k) {return Ki.f(parseInt(a, 10), b, c, d, 0, f, h, k)}
  }
  Ki.i = Ki.d
  Ki.u = Ki.d

  function Li(a, b) {for (var c in a) b.call(void 0, a[c], c, a)}

  var Mi = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ")

  function Ni(a, b) {
    for (var c, d, e = 1; e < arguments.length; e++) {
      d = arguments[e]
      for (c in d) a[c] = d[c]
      for (var f = 0; f < Mi.length; f++) c = Mi[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
  }

  function Oi(a) {
    if (a.Va && typeof a.Va == r) return a.Va()
    if (typeof Map !== "undefined" && a instanceof Map || typeof Set !== "undefined" && a instanceof Set) return Array.from(a.values())
    if (typeof a === z) return a.split("")
    if (hd(a)) {
      for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d])
      return b
    }
    b = []
    c = 0
    for (d in a) b[c++] = a[d]
    return b
  }

  function Pi(a) {
    if (a.xd && typeof a.xd == r) return a.xd()
    if (!a.Va || typeof a.Va != r) {
      if (typeof Map !== "undefined" && a instanceof Map) return Array.from(a.keys())
      if (!(typeof Set !== "undefined" && a instanceof Set)) {
        if (hd(a) || typeof a === z) {
          var b = []
          a = a.length
          for (var c = 0; c < a; c++) b.push(c)
          return b
        }
        b = []
        c = 0
        for (var d in a) b[c++] = d
        return b
      }
    }
  }

  function Qi(a) {
    this.Ea = void 0
    this.R = {}
    if (a) {
      var b = Pi(a)
      a = Oi(a)
      for (var c = 0; c < b.length; c++) this.set(b[c], a[c])
    }
  }

  A = Qi.prototype
  A.set = function (a, b) {Ri(this, a, b, !1)}
  A.add = function (a, b) {Ri(this, a, b, !0)}

  function Ri(a, b, c, d) {
    for (var e = 0; e < b.length; e++) {
      var f = b.charAt(e)
      a.R[f] || (a.R[f] = new Qi)
      a = a.R[f]
    }
    if (d && a.Ea !== void 0) throw Error("The collection already contains the key \"" + b + "\"")
    a.Ea = c
  }

  function Si(a, b) {
    for (var c = 0; c < b.length; c++) if (a = a.R[b.charAt(c)], !a) return
    return a
  }

  A.get = function (a) {return (a = Si(this, a)) ? a.Ea : void 0}
  A.Va = function () {
    var a = []
    Ti(this, a)
    return a
  }

  function Ti(a, b) {
    a.Ea !== void 0 && b.push(a.Ea)
    for (var c in a.R) Ti(a.R[c], b)
  }

  A.xd = function (a) {
    var b = []
    if (a) {
      for (var c = this, d = 0; d < a.length; d++) {
        var e = a.charAt(d)
        if (!c.R[e]) return []
        c = c.R[e]
      }
      Ui(c, a, b)
    } else Ui(this, "", b)
    return b
  }

  function Ui(a, b, c) {
    a.Ea !== void 0 && c.push(b)
    for (var d in a.R) Ui(a.R[d], b + d, c)
  }

  A.clear = function () {
    this.R = {}
    this.Ea = void 0
  }
  A.remove = function (a) {
    for (var b = this, c = [], d = 0; d < a.length; d++) {
      var e = a.charAt(d)
      if (!b.R[e]) throw Error("The collection does not have the key \"" + a + "\"")
      c.push([b, e])
      b = b.R[e]
    }
    a = b.Ea
    for (delete b.Ea; c.length > 0;) if (d = c.pop(), b = d[0], d = d[1], b.R[d].Id()) delete b.R[d] else break
    return a
  }
  A.clone = function () {return new Qi(this)}
  A.Id = function () {
    var a
    if (a = this.Ea === void 0) a:{
      for (var b in this.R) {
        a = !1
        break a
      }
      a = !0
    }
    return a
  }

  function Vi() {
    if (!Wi) {
      var a = Wi = new Qi, b
      for (b in Xi) a.add(b, Xi[b])
    }
  }

  var Wi
  Vi.prototype.Ha = Yh(Zh(), "apps.photos.imageurl.ImageUrlOptionsParser").Qi

  function R(a, b) {
    this.types = a
    this.Jm = b
  }

  var Xi = {
    a: new R([3, 0], [function (a, b) {P(a, 21, b)}, function (a, b) {Q(a, 56, b)}]),
    al: new R([3], [function (a, b) {P(a, 74, b)}]),
    b: new R([3, 0], [function (a, b) {P(a, 23, b)}, function (a, b) {Q(a, 38, b)}]),
    ba: new R([0], [function (a, b) {Q(a, 85, b)}]),
    bc: new R([0], [function (a, b) {Q(a, 87, b)}]),
    br: new R([0], [function (a, b) {Q(a, 86, b)}]),
    c: new R([3, 0], [function (a, b) {P(a, 2, b)}, function (a, b) {Q(a, 39, b)}]),
    cc: new R([3], [function (a, b) {P(a, 51, b)}]),
    ci: new R([3], [function (a, b) {P(a, 32, b)}]),
    ckm: new R([3], [function (a, b) {P(a, 104, b)}]),
    cp: new R([0],
      [function (a, b) {Q(a, 92, b)}]),
    cr: new R([3], [function (a, b) {P(a, 108, b)}]),
    cv: new R([0], [function (a, b) {Q(a, 94, b)}]),
    d: new R([3], [function (a, b) {P(a, 3, b)}]),
    dc: new R([5], [function (a, b) {Hh(a, 99, b)}]),
    df: new R([3], [function (a, b) {P(a, 80, b)}]),
    dv: new R([3], [function (a, b) {P(a, 90, b)}]),
    e: new R([0], [function (a, b) {Q(a, 15, b)}]),
    em: new R([0], [function (a, b) {Q(a, 107, b)}]),
    f: new R([4], [function (a, b) {Hh(a, 16, b)}]),
    fg: new R([3], [function (a, b) {P(a, 34, b)}]),
    fh: new R([3], [function (a, b) {P(a, 30, b)}]),
    fm: new R([3], [function (a,
      b) {P(a, 84, b)}]),
    fo: new R([2], [function (a, b) {Gh(a, 79, b)}]),
    ft: new R([3], [function (a, b) {P(a, 50, b)}]),
    fv: new R([3], [function (a, b) {P(a, 31, b)}]),
    g: new R([3], [function (a, b) {P(a, 14, b)}]),
    gce: new R([4], [function (a, b) {Hh(a, 112, b)}]),
    gd: new R([3], [function (a, b) {P(a, 83, b)}]),
    gm: new R([3], [function (a, b) {P(a, 105, b)}]),
    h: new R([3, 0], [function (a, b) {P(a, 4, b)}, function (a, b) {Q(a, 13, b)}]),
    i: new R([3], [function (a, b) {P(a, 22, b)}]),
    ic: new R([0], [function (a, b) {Q(a, 71, b)}]),
    id: new R([3], [function (a, b) {P(a, 70, b)}]),
    il: new R([3],
      [function (a, b) {P(a, 96, b)}]),
    ip: new R([3], [function (a, b) {P(a, 54, b)}]),
    iv: new R([0], [function (a, b) {Fh(a, 75, b)}]),
    j: new R([1], [function (a, b) {
      b = b == null ? b : ch(b)
      Ch(a, 29, b)
    }]),
    k: new R([3, 0], [function (a, b) {P(a, 17, b)}, function (a, b) {Q(a, 42, b)}]),
    l: new R([0], [function (a, b) {Q(a, 44, b)}]),
    lf: new R([3], [function (a, b) {P(a, 65, b)}]),
    lo: new R([3], [function (a, b) {P(a, 97, b)}]),
    m: new R([0], [function (a, b) {Q(a, 63, b)}]),
    md: new R([3], [function (a, b) {P(a, 91, b)}]),
    mm: new R([4], [function (a, b) {Hh(a, 81, b)}]),
    mo: new R([3], [function (a,
      b) {P(a, 73, b)}]),
    mv: new R([3], [function (a, b) {P(a, 66, b)}]),
    n: new R([3], [function (a, b) {P(a, 20, b)}]),
    nc: new R([3], [function (a, b) {P(a, 55, b)}]),
    nd: new R([3], [function (a, b) {P(a, 53, b)}]),
    ng: new R([3], [function (a, b) {P(a, 95, b)}]),
    ngm: new R([3], [function (a, b) {P(a, 106, b)}]),
    no: new R([3], [function (a, b) {P(a, 37, b)}]),
    ns: new R([3], [function (a, b) {P(a, 40, b)}]),
    nt0: new R([4], [function (a, b) {Hh(a, 36, b)}]),
    ntm: new R([3], [function (a, b) {P(a, 114, b)}]),
    nu: new R([3], [function (a, b) {P(a, 46, b)}]),
    nw: new R([3], [function (a, b) {
      P(a,
        48, b)
    }]),
    o: new R([1, 3], [function (a, b) {
      b = b == null ? b : ch(b)
      Ch(a, 7, b)
    }, function (a, b) {P(a, 27, b)}]),
    p: new R([3, 0], [function (a, b) {P(a, 19, b)}, function (a, b) {Q(a, 43, b)}]),
    pa: new R([3], [function (a, b) {P(a, 61, b)}]),
    pc: new R([0], [function (a, b) {Q(a, 88, b)}]),
    pd: new R([3], [function (a, b) {P(a, 60, b)}]),
    pf: new R([3], [function (a, b) {P(a, 67, b)}]),
    pg: new R([3], [function (a, b) {P(a, 72, b)}]),
    pi: new R([2], [function (a, b) {Gh(a, 76, b)}]),
    pp: new R([3], [function (a, b) {P(a, 52, b)}]),
    pt: new R([4], [function (a, b) {Hh(a, 111, b)}]),
    q: new R([4],
      [function (a, b) {Hh(a, 28, b)}]),
    r: new R([3, 0], [function (a, b) {P(a, 6, b)}, function (a, b) {Q(a, 26, b)}]),
    ra: new R([3], [function (a, b) {P(a, 103, b)}]),
    rf: new R([3], [function (a, b) {P(a, 100, b)}]),
    rg: new R([3], [function (a, b) {P(a, 59, b)}]),
    rh: new R([3], [function (a, b) {P(a, 49, b)}]),
    rj: new R([3], [function (a, b) {P(a, 57, b)}]),
    ro: new R([2], [function (a, b) {Gh(a, 78, b)}]),
    rp: new R([3], [function (a, b) {P(a, 58, b)}]),
    rw: new R([3], [function (a, b) {P(a, 35, b)}]),
    rwa: new R([3], [function (a, b) {P(a, 64, b)}]),
    rwu: new R([3], [function (a, b) {
      P(a,
        41, b)
    }]),
    s: new R([3, 0], [function (a, b) {P(a, 33, b)}, function (a, b) {Q(a, 1, b)}]),
    sb: new R([0], [function (a, b) {Q(a, 110, b)}]),
    sc: new R([0], [function (a, b) {Q(a, 89, b)}]),
    sg: new R([3], [function (a, b) {P(a, 82, b)}]),
    sl: new R([0], [function (a, b) {Q(a, 109, b)}]),
    sm: new R([3], [function (a, b) {P(a, 93, b)}]),
    t: new R([4], [function (a, b) {Hh(a, 24, b)}]),
    tm: new R([3], [function (a, b) {P(a, 113, b)}]),
    u: new R([3], [function (a, b) {P(a, 18, b)}]),
    ut: new R([3], [function (a, b) {P(a, 45, b)}]),
    v: new R([0], [function (a, b) {Q(a, 62, b)}]),
    vb: new R([0], [function (a,
      b) {Fh(a, 68, b)}]),
    vf: new R([4], [function (a, b) {Hh(a, 102, b)}]),
    vl: new R([0], [function (a, b) {Fh(a, 69, b)}]),
    vm: new R([3], [function (a, b) {P(a, 98, b)}]),
    w: new R([0], [function (a, b) {Q(a, 12, b)}]),
    x: new R([0], [function (a, b) {Q(a, 9, b)}]),
    y: new R([0], [function (a, b) {Q(a, 10, b)}]),
    ya: new R([2], [function (a, b) {Gh(a, 77, b)}]),
    z: new R([0], [function (a, b) {Q(a, 11, b)}])
  }

  function Yi(a, b) {return Ji("For token '%s': %s", a, b)}

  A = Vi.prototype
  A.parse = function (a) {
    var b = new Lh, c = new Lh
    if (a == "") var d = !0 else {
      d = a.split("-")
      for (var e = !0, f = 0; f < d.length; f++) {
        var h = d[f]
        if (h.length == 0) $h(this.Ha, "Empty tokens not allowed."), e = !1 else {
          var k = h, l = !1
          var m = k
          var n = k.substring(0, 1)
          n != n.toLowerCase() && (l = !0, m = k.substring(0, 1).toLowerCase() + k.substring(1))
          var u = Wi
          for (n = 1; n <= m.length; ++n) {
            var w = u
            var y = m.substring(0, n)
            w = y.length == 0 ? !w.Id() : !!Si(w, y)
            if (!w) break
          }
          m = n == 1 ? null : (m = u.get(m.substring(0, n - 1))) ? {
            Xl: k.substring(0, n - 1), value: k.substring(n -
              1), Pm: l, attributes: m
          } : null
          if (m) {
            k = []
            l = []
            n = !1
            for (u = 0; u < m.attributes.types.length; u++) {
              w = m.attributes.types[u]
              var L = m.value
              y = f
              if (m.Pm && w == 1) for (var B = L.length; B < 12 && y < d.length - 1;) L += "-" + d[y + 1], B = L.length, ++y else if (w == 2) for (; y < d.length - 1 && d[y + 1].match(/^[\d\.]/);) L += "-" + d[y + 1], ++y
              B = m.attributes.Jm[u]
              L = Zi(this, w)(m.Xl, L, b, c, B)
              if (L === null) {
                n = !0
                f = y
                break
              } else k.push(w), l.push(L)
            }
            if (!n) for (m = 0; m < l.length; m++) u = k[m], L = l[m], $i(this, u)(h, L)
            e = e && n
          } else $h(this.Ha, "Unrecognized ImageUrlOptionsParser token: " +
            h), e = !1
        }
      }
      d = e
    }
    d || $h(this.Ha, "Options failed to parse: " + a)
    return new aj(b, c, d)
  }

  function bj(a, b, c, d, e, f) {
    e(c, b)
    a = a.substring(0, 1)
    f = f(a == a.toUpperCase())
    e(d, f)
  }

  A.bm = function (a, b, c, d, e) {
    if (b == "") return 0
    isFinite(b) && (b = String(b))
    b = typeof b === z ? /^\s*-?0x/i.test(b) ? parseInt(b, 16) : parseInt(b, 10) : NaN
    if (isNaN(b)) return 1
    bj(a, b, c, d, e, Number)
    return null
  }
  A.xl = function (a, b) {
    switch (b) {
      case 1:
        $h(this.Ha, Yi(a, "Option value could not be interpreted as an integer."))
        break
      case 0:
        $h(this.Ha, Yi(a, "Missing value for integer option."))
    }
  }
  A.am = function (a, b, c, d, e) {
    if (b == "") return 0
    var f = Number(b)
    b = f == 0 && /^[\s\xa0]*$/.test(b) ? NaN : f
    if (isNaN(b)) return 1
    bj(a, b, c, d, e, Number)
    return null
  }
  A.wl = function (a, b) {
    switch (b) {
      case 1:
        $h(this.Ha, Yi(a, "Option value could not be interpreted as a float."))
        break
      case 0:
        $h(this.Ha, Yi(a, "Missing value for float option."))
    }
  }
  A.Zl = function (a, b, c, d, e) {
    if (b != "") return 2
    bj(a, !0, c, d, e, Boolean)
    return null
  }
  A.ul = function (a, b) {
    switch (b) {
      case 2:
        $h(this.Ha, Yi(a, "Unexpected value specified for boolean option."))
    }
  }
  A.dm = function (a, b, c, d, e) {
    if (b == "") return 0
    bj(a, b, c, d, e, function (f) {return f ? "1" : ""})
    return null
  }
  A.yl = function (a, b) {
    switch (b) {
      case 0:
        $h(this.Ha, Yi(a, "Missing value for string option."))
    }
  }
  A.hm = function (a, b, c, d, e) {
    if (b == "") return 0
    bj(a, b, c, d, e, function (f) {return f ? 1 : 0})
    return null
  }

  function Zi(a, b) {
    switch (b) {
      case 0:
        return ld(a.bm, a)
      case 2:
        return ld(a.am, a)
      case 3:
        return ld(a.Zl, a)
      case 4:
        return ld(a.dm, a)
      case 1:
        return ld(a.hm, a)
      default:
        return function () {}
    }
  }

  function $i(a, b) {
    switch (b) {
      case 0:
        return ld(a.xl, a)
      case 2:
        return ld(a.wl, a)
      case 3:
        return ld(a.ul, a)
      case 4:
      case 1:
        return ld(a.yl, a)
      default:
        return function () {}
    }
  }

  function aj(a, b, c) {
    this.fa = a
    this.sa = b
    this.Jj = c
  }

  aj.prototype.Jd = function () {return this.Jj}

  function cj(a, b) {a != null && this.append.apply(this, arguments)}

  A = cj.prototype
  A.cb = ""
  A.set = function (a) {this.cb = "" + a}
  A.append = function (a, b, c) {
    this.cb += String(a)
    if (b != null) for (var d = 1; d < arguments.length; d++) this.cb += arguments[d]
    return this
  }
  A.clear = function () {this.cb = ""}
  A.toString = function () {return this.cb}

  function dj(a) {
    this.gf = null
    this.fe = []
    this.U = null
    this.Af = ej
    this.U = a ? typeof a === z ? fj(this).parse(a) : a : fj(this).parse("")
  }

  var ej = Yh(Zh(), "apps.photos.imagurl.ImageUrlOptionsBuilderBase").Qi

  function fj(a) {
    a.gf == null && (a.gf = new Vi)
    return a.gf
  }

  function gj(a, b, c, d) {
    if (b == c) return !1
    c != void 0 && d && $h(a.Af, "Changing an option included in the url signature! The signature will now probably be invalid.")
    return !0
  }

  A = dj.prototype
  A.ie = function (a) {
    a = a || void 0
    var b = this.U, c = b.fa
    gj(this, a, c.vd(), b.sa.vd()) && P(c, 2, a)
    return this
  }
  A.he = function (a) {
    a = a || void 0
    var b = this.U, c = b.fa
    gj(this, a, c.ud(), b.sa.ud()) && P(c, 51, a)
    return this
  }
  A.je = function (a) {
    a = a || void 0
    var b = this.U, c = b.fa
    gj(this, a, c.wd(), b.sa.wd()) && P(c, 32, a)
    return this
  }
  A.Lc = function (a) {
    var b = this.U, c = b.fa
    gj(this, a, c.oc(), b.sa.oc()) && Q(c, 13, a)
    return this
  }
  A.ge = function (a) {
    a = a || void 0
    var b = this.U, c = b.fa
    gj(this, a, c.td(), b.sa.td()) && P(c, 20, a)
    return this
  }
  A.Xb = function (a) {
    a = a || void 0
    var b = this.U, c = b.fa
    gj(this, a, c.zd(), b.sa.zd()) && P(c, 19, a)
    return this
  }
  A.ke = function (a) {
    a = a || void 0
    var b = this.U, c = b.fa
    gj(this, a, c.yd(), b.sa.yd()) && P(c, 60, a)
    return this
  }
  A.me = function (a) {
    a = a || void 0
    var b = this.U, c = b.fa
    gj(this, a, c.Bd(), b.sa.Bd()) && P(c, 67, a)
    return this
  }
  A.le = function (a) {
    a = a || void 0
    var b = this.U, c = b.fa
    gj(this, a, c.Ad(), b.sa.Ad()) && P(c, 52, a)
    return this
  }
  A.Na = function (a) {
    var b = this.U, c = b.fa
    gj(this, a, c.Fb(), b.sa.Fb()) && Q(c, 1, a)
    return this
  }
  A.Mc = function (a) {
    var b = this.U, c = b.fa
    gj(this, a, c.qc(), b.sa.qc()) && Q(c, 12, a)
    return this
  }
  A.yb = function () {
    this.fe.length = 0
    var a = this.U, b = a.fa
    a = a.sa
    S(this, "s", b.Fb(), a.Fb())
    S(this, "w", b.qc(), a.qc())
    T(this, "c", b.vd(), a.vd())
    T(this, "d", b.Og(), a.Og())
    S(this, "h", b.oc(), a.oc())
    T(this, "s", b.di(), a.di())
    T(this, "h", b.hh(), a.hh())
    T(this, "p", b.zd(), a.zd())
    T(this, "pp", b.Ad(), a.Ad())
    T(this, "pf", b.Bd(), a.Bd())
    T(this, "n", b.td(), a.td())
    S(this, "r", b.Xh(), a.Xh())
    T(this, "r", b.Zh(), a.Zh())
    T(this, "o", b.Eh(), a.Eh())
    var c = b.Dh()
    hj(this, "o", c, a.Dh())
    c = b.dh()
    hj(this, "j", c, a.dh())
    S(this, "x",
      b.ki(), a.ki())
    S(this, "y", b.li(), a.li())
    S(this, "z", b.mi(), a.mi())
    T(this, "g", b.ii(), a.ii())
    S(this, "e", b.Sg(), a.Sg())
    hj(this, "f", b.kh(), a.kh())
    T(this, "k", b.nh(), a.nh())
    T(this, "u", b.ri(), !0)
    T(this, "ut", b.si(), !0)
    T(this, "i", b.bl(), !0)
    T(this, "a", b.Rg(), a.Rg())
    T(this, "b", b.Jg(), a.Jg())
    S(this, "b", b.Ig(), a.Ig())
    S(this, "c", b.Gg(), a.Gg(), 16, 8)
    hj(this, "q", b.Mh(), a.Mh())
    T(this, "fh", b.gh(), a.gh())
    T(this, "fv", b.wi(), a.wi())
    T(this, "fg", b.Zg(), a.Zg())
    T(this, "ci", b.wd(), a.wd())
    hj(this, "t", b.ni(),
      a.ni())
    hj(this, "nt0", b.ti(), a.ti())
    T(this, "rw", b.Uh(), a.Uh())
    T(this, "rwu", b.Vh(), a.Vh())
    T(this, "rwa", b.Nh(), a.Nh())
    T(this, "nw", b.Ch(), a.Ch())
    T(this, "rh", b.Qh(), a.Qh())
    T(this, "no", b.yh(), a.yh())
    T(this, "ns", b.zh(), a.zh())
    S(this, "k", b.Wg(), a.Wg())
    S(this, "p", b.Vg(), a.Vg())
    S(this, "l", b.Lh(), a.Lh())
    S(this, "v", b.Kh(), a.Kh())
    T(this, "nu", b.Bh(), a.Bh())
    T(this, "ft", b.ah(), a.ah())
    T(this, "cc", b.ud(), a.ud())
    T(this, "nd", b.wh(), a.wh())
    T(this, "ip", b.mh(), a.mh())
    T(this, "nc", b.uh(), a.uh())
    S(this,
      "a", b.Yh(), a.Yh())
    T(this, "rj", b.Rh(), a.Rh())
    T(this, "rp", b.Sh(), a.Sh())
    T(this, "rg", b.Ph(), a.Ph())
    T(this, "pd", b.yd(), a.yd())
    T(this, "pa", b.Ih(), a.Ih())
    S(this, "m", b.yi(), a.yi())
    S(this, "vb", b.xi(), a.xi())
    S(this, "vl", b.Ai(), a.Ai())
    T(this, "lf", b.oh(), a.oh())
    T(this, "mv", b.qh(), a.qh())
    T(this, Qb, b.jh(), a.jh())
    S(this, "ic", b.cl(), !0)
    T(this, "pg", b.ji(), a.ji())
    T(this, "mo", b.sh(), a.sh())
    T(this, "al", b.Dg(), a.Dg())
    S(this, "iv", b.Yf(), a.Yf())
    S(this, "pi", b.Gh(), a.Gh())
    S(this, "ya", b.Di(), a.Di())
    S(this,
      "ro", b.Wh(), a.Wh())
    S(this, "fo", b.bh(), a.bh())
    T(this, "df", b.Ng(), a.Ng())
    hj(this, "mm", b.Ci(), a.Ci())
    T(this, "sg", b.fi(), a.fi())
    T(this, "gd", b.Jh(), a.Jh())
    T(this, "fm", b.Yg(), a.Yg())
    S(this, "ba", b.Fg(), a.Fg())
    S(this, "br", b.Hg(), a.Hg())
    S(this, "bc", b.Eg(), a.Eg(), 16, 8)
    S(this, "pc", b.Fh(), a.Fh(), 16, 8)
    S(this, "sc", b.hi(), a.hi(), 16, 8)
    T(this, "dv", b.Pg(), a.Pg())
    T(this, "md", b.th(), a.th())
    S(this, "cp", b.Lg(), a.Lg())
    T(this, "sm", b.gi(), a.gi())
    S(this, "cv", b.Ug(), a.Ug())
    T(this, "ng", b.ei(), a.ei())
    T(this,
      "il", b.ih(), a.ih())
    T(this, "lo", b.ph(), a.ph())
    T(this, "vm", b.Bi(), a.Bi())
    hj(this, "dc", b.Mg(), a.Mg())
    T(this, "rf", b.Th(), a.Th())
    hj(this, "vf", b.zi(), a.zi())
    T(this, "ra", b.Oh(), a.Oh())
    T(this, "ckm", b.Qg(), a.Qg())
    T(this, "gm", b.eh(), a.eh())
    T(this, "ngm", b.xh(), a.xh())
    S(this, "em", b.Tg(), a.Tg())
    T(this, "cr", b.Xg(), a.Xg())
    S(this, "sl", b.ai(), a.ai())
    S(this, "sb", b.bi(), a.bi())
    hj(this, "pt", b.Hh(), a.Hh())
    hj(this, "gce", b.Kg(), a.Kg())
    T(this, "tm", b.oi(), a.oi())
    T(this, "ntm", b.Ah(), a.Ah())
    return this.fe.join("-")
  }

  function S(a, b, c, d, e, f) {
    if (c != null) {
      if (e == void 0) var h = 10 else e != 10 && e != 16 ? ($h(a.Af, "Unsupported radix (" + e + ")"), h = 10) : h = e
      c = Number(c).toString(h)
      e = new cj
      e.append(h == 16 ? "0x" : "")
      h = e.append
      f == void 0 ? f = "" : (f -= c.length, f = f <= 0 ? "" : Gi("0", f))
      h.call(e, f)
      e.append(c)
      ij(a, b, e.toString(), !!Number(d))
    }
  }

  function T(a, b, c, d) {c && ij(a, b, "", !!d)}

  function hj(a, b, c, d) {c && ij(a, b, String(c), !!Number(d))}

  function ij(a, b, c, d) {
    d && (b = b.substring(0, 1).toUpperCase() + b.substring(1))
    a.fe.push(b + c)
  }

  function jj(a, b) {
    this.width = a
    this.height = b
  }

  A = jj.prototype
  A.clone = function () {return new jj(this.width, this.height)}
  A.toString = function () {return "(" + this.width + " x " + this.height + ")"}
  A.aspectRatio = function () {return this.width / this.height}
  A.Id = function () {return !(this.width * this.height)}
  A.ceil = function () {
    this.width = Math.ceil(this.width)
    this.height = Math.ceil(this.height)
    return this
  }
  A.floor = function () {
    this.width = Math.floor(this.width)
    this.height = Math.floor(this.height)
    return this
  }
  A.round = function () {
    this.width = Math.round(this.width)
    this.height = Math.round(this.height)
    return this
  }

  function kj(a) {
    dj.call(this, a)
    this.Qm = !1
  }

  nd(kj, dj)
  A = kj.prototype
  A.ie = function (a) {
    a && lj(this)
    return kj.L.ie.call(this, a)
  }
  A.Lc = function (a) {
    a = a == null || a < 0 ? void 0 : a
    a != null && this.Na()
    return kj.L.Lc.call(this, a)
  }
  A.je = function (a) {
    a && lj(this)
    return kj.L.je.call(this, a)
  }
  A.he = function (a) {
    a && lj(this)
    return kj.L.he.call(this, a)
  }
  A.Na = function (a) {
    id(a) ? a = Math.max(a.width, a.height) : H(a !== null, "Passing null to setSize is an error.", a)
    a = a == null || a < 0 ? void 0 : a
    a != null && (H(isFinite(a) && a % 1 == 0, "The size %s is invalid because it is not an integer", a), this.Mc(), this.Lc())
    return kj.L.Na.call(this, a)
  }
  A.Xb = function (a) {
    a && lj(this)
    return kj.L.Xb.call(this, a)
  }
  A.le = function (a) {
    a && lj(this)
    return kj.L.le.call(this, a)
  }
  A.me = function (a) {
    a && lj(this)
    return kj.L.me.call(this, a)
  }
  A.ge = function (a) {
    a && lj(this)
    return kj.L.ge.call(this, a)
  }
  A.ke = function (a) {
    a && lj(this)
    return kj.L.ke.call(this, a)
  }
  A.Mc = function (a) {
    a = a == null || a < 0 ? void 0 : a
    a != null && this.Na()
    return kj.L.Mc.call(this, a)
  }

  function lj(a) {
    a.ge()
    a.he()
    a.ie()
    a.je()
    a.ke()
    a.Xb()
    a.le()
    a.me()
  }

  A.yb = function () {
    var a = this.U.fa
    a.ri() || a.si() ? a.Fb() || this.Na(0) : (a = this.U.fa, a.Fb() || a.qc() || a.oc() || (this.Na(), this.Lc(), this.Mc(), lj(this)))
    return kj.L.yb.call(this)
  }
  var mj = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$")

  function nj(a, b) {
    if (a) {
      a = a.split("&")
      for (var c = 0; c < a.length; c++) {
        var d = a[c].indexOf("="), e = null
        if (d >= 0) {
          var f = a[c].substring(0, d)
          e = a[c].substring(d + 1)
        } else f = a[c]
        b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "")
      }
    }
  }

  function oj(a, b) {
    this.Fa = this.rb = this.ab = ""
    this.ob = null
    this.kb = this.xa = ""
    this.eb = !1
    var c
    if (a instanceof oj) this.eb = b !== void 0 ? b : a.eb, pj(this, a.ab), this.rb = a.rb, this.Fa = a.Fa, qj(this, a.ob), this.xa = a.xa, rj(this, a.Za.clone()), this.kb = a.kb else {
      var d
      if (d = a) d = c = String(a).match(mj)
      d ? (this.eb = !!b, pj(this, c[1] || "", !0), this.rb = sj(c[2] || ""), this.Fa = sj(c[3] || "", !0), qj(this, c[4]), this.xa = sj(c[5] || "", !0), rj(this, c[6] || "", !0), this.kb = sj(c[7] || "")) : (this.eb = !!b, this.Za = new tj(null, this.eb))
    }
  }

  oj.prototype.toString = function () {
    var a = [], b = this.ab
    b && a.push(uj(b, vj, !0), ":")
    var c = this.Fa
    if (c || b == "file") a.push("//"), (b = this.rb) && a.push(uj(b, vj, !0), "@"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.ob, c != null && a.push(":", String(c))
    if (c = this.xa) this.Fa && c.charAt(0) != "/" && a.push("/"), a.push(uj(c, c.charAt(0) == "/" ? wj : xj, !0));
    (c = this.Za.toString()) && a.push("?", c);
    (c = this.kb) && a.push("#", uj(c, yj))
    return a.join("")
  }
  oj.prototype.resolve = function (a) {
    var b = this.clone(), c = !!a.ab
    c ? pj(b, a.ab) : c = !!a.rb
    c ? b.rb = a.rb : c = !!a.Fa
    c ? b.Fa = a.Fa : c = a.ob != null
    var d = a.xa
    if (c) qj(b, a.ob) else if (c = !!a.xa) {
      if (d.charAt(0) != "/") if (this.Fa && !this.xa) d = "/" + d else {
        var e = b.xa.lastIndexOf("/")
        e != -1 && (d = b.xa.slice(0, e + 1) + d)
      }
      if (d == ".." || d == ".") d = "" else if (d.indexOf("./") != -1 || d.indexOf("/.") != -1) {
        e = d.lastIndexOf("/", 0) == 0
        d = d.split("/")
        for (var f = [], h = 0; h < d.length;) {
          var k = d[h++]
          k == "." ? e && h == d.length && f.push("") : k == ".." ? ((f.length > 1 ||
            f.length == 1 && f[0] != "") && f.pop(), e && h == d.length && f.push("")) : (f.push(k), e = !0)
        }
        d = f.join("/")
      }
    }
    c ? b.xa = d : c = a.Za.toString() !== ""
    c ? rj(b, a.Za.clone()) : c = !!a.kb
    c && (b.kb = a.kb)
    return b
  }
  oj.prototype.clone = function () {return new oj(this)}

  function pj(a, b, c) {
    a.ab = c ? sj(b, !0) : b
    a.ab && (a.ab = a.ab.replace(/:$/, ""))
  }

  function qj(a, b) {
    if (b) {
      b = Number(b)
      if (isNaN(b) || b < 0) throw Error("Bad port number " + b)
      a.ob = b
    } else a.ob = null
  }

  function rj(a, b, c) {b instanceof tj ? (a.Za = b, zj(a.Za, a.eb)) : (c || (b = uj(b, Aj)), a.Za = new tj(b, a.eb))}

  function Bj(a, b) {return a instanceof oj ? a.clone() : new oj(a, b)}

  function sj(a, b) {return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""}

  function uj(a, b, c) {return typeof a === z ? (a = encodeURI(a).replace(b, Cj), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null}

  function Cj(a) {
    a = a.charCodeAt(0)
    return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
  }

  var vj = /[#\/\?@]/g, xj = /[#\?:]/g, wj = /[#\?]/g, Aj = /[#\?@]/g, yj = /#/g

  function tj(a, b) {
    this.W = this.I = null
    this.ka = a || null
    this.ne = !!b
  }

  function Dj(a) {a.I || (a.I = new Map, a.W = 0, a.ka && nj(a.ka, function (b, c) {a.add(decodeURIComponent(b.replace(/\+/g, " ")), c)}))}

  A = tj.prototype
  A.add = function (a, b) {
    Dj(this)
    this.ka = null
    a = Ej(this, a)
    var c = this.I.get(a)
    c || this.I.set(a, c = [])
    c.push(b)
    this.W = ke(this.W) + 1
    return this
  }
  A.remove = function (a) {
    Dj(this)
    a = Ej(this, a)
    return this.I.has(a) ? (this.ka = null, this.W = ke(this.W) - this.I.get(a).length, this.I.delete(a)) : !1
  }
  A.clear = function () {
    this.I = this.ka = null
    this.W = 0
  }
  A.Id = function () {
    Dj(this)
    return this.W == 0
  }

  function Fj(a, b) {
    Dj(a)
    b = Ej(a, b)
    return a.I.has(b)
  }

  A.forEach = function (a, b) {
    Dj(this)
    this.I.forEach(function (c, d) {c.forEach(function (e) {a.call(b, e, d, this)}, this)}, this)
  }
  A.xd = function () {
    Dj(this)
    for (var a = Array.from(this.I.values()), b = Array.from(this.I.keys()), c = [], d = 0; d < b.length; d++) for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d])
    return c
  }
  A.Va = function (a) {
    Dj(this)
    var b = []
    if (typeof a === z) Fj(this, a) && (b = b.concat(this.I.get(Ej(this, a)))) else {
      a = Array.from(this.I.values())
      for (var c = 0; c < a.length; c++) b = b.concat(a[c])
    }
    return b
  }
  A.set = function (a, b) {
    Dj(this)
    this.ka = null
    a = Ej(this, a)
    Fj(this, a) && (this.W = ke(this.W) - this.I.get(a).length)
    this.I.set(a, [b])
    this.W = ke(this.W) + 1
    return this
  }
  A.get = function (a, b) {
    if (!a) return b
    a = this.Va(a)
    return a.length > 0 ? String(a[0]) : b
  }
  A.toString = function () {
    if (this.ka) return this.ka
    if (!this.I) return ""
    for (var a = [], b = Array.from(this.I.keys()), c = 0; c < b.length; c++) {
      var d = b[c], e = encodeURIComponent(String(d))
      d = this.Va(d)
      for (var f = 0; f < d.length; f++) {
        var h = e
        d[f] !== "" && (h += "=" + encodeURIComponent(String(d[f])))
        a.push(h)
      }
    }
    return this.ka = a.join("&")
  }
  A.clone = function () {
    var a = new tj
    a.ka = this.ka
    this.I && (a.I = new Map(this.I), a.W = this.W)
    return a
  }

  function Ej(a, b) {
    b = String(b)
    a.ne && (b = b.toLowerCase())
    return b
  }

  function zj(a, b) {
    b && !a.ne && (Dj(a), a.ka = null, a.I.forEach(function (c, d) {
      var e = d.toLowerCase()
      d != e && (this.remove(d), this.remove(e), c.length > 0 && (this.ka = null, this.I.set(Ej(this, e), xe(c)), this.W = ke(this.W) + c.length))
    }, a))
    a.ne = b
  }

  var Gj = /^[^\/]*\/\//

  function Hj(a, b) {
    b = b === void 0 ? !1 : b
    this.Bc = a
    this.Pd = "";
    (a = this.Bc.match(Gj)) && a[0] ? (this.Pd = a[0], a = this.Pd.match(/\w+/) ? this.Bc : "http://" + this.Bc.substring(this.Pd.length)) : a = "http://" + this.Bc
    this.be = Bj(a, !0)
    this.Hi = b
    this.Nc = !0
    this.Vi = !1
  }

  function Ij(a, b) {a.Ub = a.Ub ? a.Ub + ("/" + b) : b}

  function Jj(a) {
    if (a.H == void 0) {
      var b = a.be.xa.substring(1)
      a.Ub = null
      if (a.Hi) {
        a.H = []
        if ((b.match(/=/g) || []).length > 1) return a.Nc = !1, a.H
        var c = b.indexOf("=")
        c != -1 ? (a.H.push(b.substr(0, c)), a.H.push(b.substr(c + 1))) : a.H.push(b)
        return a.H
      }
      a.H = b.split("/")
      b = a.H.length
      b > 2 && a.H[0] == "u" && (Ij(a, a.H[0] + "/" + a.H[1]), a.H.shift(), a.H.shift(), b -= 2)
      if (b == 0 || b == 4 || b > 7) return a.Nc = !1, a.H
      if (b == 2) Ij(a, a.H[0]) else if (a.H[0] == "image") Ij(a, a.H[0]) else if (b == 7 || b == 3) return a.Nc = !1, a.H
      if (b <= 3) {
        a.Vi = !0
        b == 3 && (Ij(a,
          a.H[1]), a.H.shift(), --b)
        --b
        c = a.H[b]
        var d = c.indexOf("=")
        d != -1 && (a.H[b] = c.substr(0, d), a.H.push(c.substr(d + 1)))
      }
    }
    return a.H
  }

  Hj.prototype.Jd = function () {
    Jj(this)
    return this.Nc
  }

  function Kj(a) {
    Jj(a)
    return a.Vi
  }

  function Lj(a) {
    Jj(a)
    return a.Hi
  }

  function Mj(a) {
    Jj(a)
    a.Ub == void 0 && (a.Ub = null)
    return a.Ub
  }

  function Nj(a) {
    switch (Jj(a).length) {
      case 7:
        return !0
      case 6:
        return Mj(a) == null
      case 5:
        return !1
      case 3:
        return !0
      case 2:
        return Mj(a) == null
      case 1:
        return !1
      default:
        return !1
    }
  }

  function Oj(a, b) {
    if (Lj(a)) {
      a:{
        switch (b) {
          case 7:
            b = 0
            break
          case 4:
            if (!Nj(a)) {
              a = null
              break a
            }
            b = 1
            break
          default:
            a = null
            break a
        }
        a = Jj(a)[b]
      }
      return a
    }
    if (Kj(a)) {
      a:{
        var c = Mj(a) != null ? 1 : 0
        switch (b) {
          case 6:
            b = 0 + c
            break
          case 4:
            if (!Nj(a)) {
              a = null
              break a
            }
            b = 1 + c
            break
          default:
            a = null
            break a
        }
        a = Jj(a)[b]
      }
      return a
    }
    a:{
      c = Mj(a) != null ? 1 : 0
      switch (b) {
        case 0:
          b = 0 + c
          break
        case 1:
          b = 1 + c
          break
        case 2:
          b = 2 + c
          break
        case 3:
          b = 3 + c
          break
        case 4:
          if (!Nj(a)) {
            a = null
            break a
          }
          b = 4 + c
          break
        case 5:
          b = Nj(a) ? 1 : 0
          b = 4 + c + b
          break
        default:
          a = null
          break a
      }
      a =
        Jj(a)[b]
    }
    return a
  }

  function Qj() {}

  Qj.prototype.parse = function (a, b) {return new Rj(a, b === void 0 ? !1 : b)}

  function Rj(a, b) {Hj.call(this, a, b === void 0 ? !1 : b)}

  D(Rj, Hj)

  function Sj(a, b) {
    b = b === void 0 ? !1 : b
    this.K = null
    a instanceof Rj ? this.K = a : (Tj == void 0 && (Tj = new Qj), this.K = Tj.parse(a.toString(), b))
    a = this.K
    if (a.Bf == void 0) {
      a.dj == void 0 && (a.dj = Oj(a, 4));
      (b = a.dj) || (b = "")
      var c = new Vi
      a.Bf = c.parse(b)
    }
    kj.call(this, a.Bf)
    this.pm = this.K.Pd
    a = this.K
    b = a.be.ob
    this.Kj = a.be.Fa + (b ? ":" + b : "")
    this.Cf = this.K.be.Za.toString()
  }

  nd(Sj, kj)
  var Tj
  Sj.prototype.Jd = function () {return this.K.Jd()}
  Sj.prototype.yb = function () {
    if (!this.K.Jd()) return this.K.Bc
    var a = Sj.L.yb.call(this), b = []
    Mj(this.K) != null && b.push(Mj(this.K))
    var c = Lj(this.K)
    if (Kj(this.K)) {
      var d = this.K
      d.Ti == void 0 && (d.Ti = Oj(d, 6))
      b.push(d.Ti + (a ? "=" + a : ""))
    } else if (c) {
      d = b.push
      var e = this.K
      e.Ag === void 0 && (e.Ag = Oj(e, 7))
      d.call(b, e.Ag)
      a && b.push(a)
    } else d = b.push, e = this.K, e.Ui == void 0 && (e.Ui = Oj(e, 0)), d.call(b, e.Ui), d = b.push, e = this.K, e.fj == void 0 && (e.fj = Oj(e, 1)), d.call(b, e.fj), d = b.push, e = this.K, e.Fi == void 0 && (e.Fi = Oj(e, 2)), d.call(b,
      e.Fi), d = b.push, e = this.K, e.uj == void 0 && (e.uj = Oj(e, 3)), d.call(b, e.uj), a && b.push(a), a = b.push, d = this.K, d.yg == void 0 && (d.yg = Oj(d, 5)), a.call(b, d.yg)
    b = Bj(this.pm + this.Kj + "/" + (c ? b.join("=") : b.join("/")) + (this.Cf ? "?" + this.Cf : "")).toString()
    b.startsWith("%3a//") && (b = b.replace("%3a//", "://"))
    return b
  }

  function Uj(a) {
    if (a instanceof Ci) return a
    a = String(a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
    return Di(a)
  }

  function Vj(a) {return Wj(a)}

  function Wj(a) {
    var b = Uj("")
    return Di(a.map(function (c) {return Ei(Uj(c))}).join(Ei(b).toString()))
  }

  var Xj = /^[a-z][a-z\d-]*$/i,
    Yj = ["APPLET", "BASE", "EMBED", "IFRAME", "LINK", "MATH", "META", "OBJECT", Oa, "STYLE", "SVG", "TEMPLATE"],
    Zj = "AREA BR COL COMMAND HR IMG INPUT KEYGEN PARAM SOURCE TRACK WBR".split(" "), ak = [Wa, "formaction", Nb]

  function bk(a) {
    var b
    if (!Xj.test("div")) throw Error("Invalid tag name <div>.")
    if (Yj.indexOf("DIV") !== -1) throw Error("Tag name <div> is not allowed for createHtml.")
    var c = "<div"
    a && (c += ck(a))
    Array.isArray(b) || (b = b === void 0 ? [] : [b])
    if (Zj.indexOf("DIV") !== -1) {
      if (b.length > 0) throw Error("Void tag <div> does not allow content.")
      c += ">"
    } else a = Vj(b.map(function (d) {return d instanceof Ci ? d : Uj(String(d))})), c += ">" + a.toString() + "</div>"
    return Di(c)
  }

  function ck(a) {
    for (var b = "", c = Object.keys(a), d = 0; d < c.length; d++) {
      var e = c[d], f = a[e]
      if (!Xj.test(e)) throw Error("Invalid attribute name \"" + e + "\".")
      if (f !== void 0 && f !== null) {
        if (/^on./i.test(e)) throw Error("Attribute \"" + e + " is forbidden. Inline event handlers can lead to XSS. Please use the 'addEventListener' API instead.")
        ak.indexOf(e.toLowerCase()) !== -1 && (f = f instanceof vi ? f.toString() : xi(String(f)) || Va)
        if (!(f instanceof vi || f instanceof Ci) && typeof f !== z && typeof f !== t) throw Error("String or number value expected, got " +
          typeof f + " with value '" + f + "' given.")
        f = e + "=\"" + Uj(String(f)) + "\""
        b += " " + f
      }
    }
    return b
  }

  function dk(a) {
    var b = cd.apply(1, arguments)
    if (!Array.isArray(a) || !Array.isArray(a.raw) || a.length !== a.raw.length || !ti && a === a.raw || !(ti && !ui || ri(a)) || b.length + 1 !== a.length) throw new TypeError("\n    ############################## ERROR ##############################\n\n    It looks like you are trying to call a template tag function (fn`...`)\n    using the normal function syntax (fn(...)), which is not supported.\n\n    The functions in the safevalues library are not designed to be called\n    like normal functions, and doing so invalidates the security guarantees\n    that safevalues provides.\n\n    If you are stuck and not sure how to proceed, please reach out to us\n    instead through:\n     - go/ise-hardening-yaqs (preferred) // LINE-INTERNAL\n     - g/ise-hardening // LINE-INTERNAL\n     - https://github.com/google/safevalues/issues\n\n    ############################## ERROR ##############################")
    if (b.length === 0) return hi(a[0])
    var c = a[0].toLowerCase()
    if (/^data:/.test(c)) throw Error("Data URLs cannot have expressions in the template literal input.")
    if (/^https:\/\//.test(c) || /^\/\//.test(c)) {
      var d = c.indexOf("//") + 2
      var e = c.indexOf("/", d)
      if (e <= d) throw Error("Can't interpolate data in a url's origin, Please make sure to fully specify the origin, terminated with '/'.")
      d = c.substring(d, e)
      if (!/^[0-9a-z.:-]+$/i.test(d)) throw Error("The origin contains unsupported characters.")
      if (!/^[^:]*(:[0-9]+)?$/i.test(d)) throw Error("Invalid port number.")
      if (!/(^|\.)[a-z][^.]*$/i.test(d)) throw Error("The top-level domain must start with a letter.")
      d = !0
    } else d = !1
    if (d = !d) {
      if (/^\//.test(c)) if (c === "/" || c.length > 1 && c[1] !== "/" && c[1] !== "\\") d = !0 else throw Error("The path start in the url is invalid.") else d = !1
      d = !d
    }
    if (d = d && !RegExp("^[^:\\s\\\\/]+/").test(c)) {
      if (/^about:blank/.test(c)) {
        if (c !== "about:blank" && !/^about:blank#/.test(c)) throw Error("The about url is invalid.")
        c = !0
      } else c = !1
      d = !c
    }
    if (d) throw Error("Trying to interpolate expressions in an unsupported url format.")
    c = a[0]
    for (d = 0; d < b.length; d++) c += encodeURIComponent(b[d]) + a[d + 1]
    return hi(c)
  }

  function ek(a) {
    a = new Sj(a, !1)
    a.Qm = !1
    return a
  }

  var fk = RegExp("^((?:https?:)?//((?:blogger\\.googleusercontent\\.com|blogger-image(?:-(?:dev|staging|autopush|prod))?\\.corp\\.google\\.com))/img/(a))/([^/=? \"]+)(?:=([-a-zA-Z0-9_=]+))?(?:\\?[^/ \"]*)?$"),
    gk = RegExp("^((?:https?:)?//((?:blogger\\.googleusercontent\\.com|blogger-image(?:-(?:dev|staging|autopush|prod))?\\.corp\\.google\\.com))/img/(proxy))/([^/=? \"]+)(?:=([-a-zA-Z0-9_=]+))?(?:\\?[^/ \"]*)?$"),
    hk = RegExp("^((?:https?:)?//((?:blogger\\.googleusercontent\\.com|blogger-image(?:-(?:dev|staging|autopush|prod))?\\.corp\\.google\\.com)))/img/(b)/[^/? \"]*/([^/=? \"]+)/(?:([-a-zA-Z0-9_=]+)?/(?:[^/? \"]*)?)?(?:\\?[^/ \"]*)?$"),
    ik = { Um: 1, proxy: 1, Vm: 1 }

  function jk(a, b) {
    if (fe(a)) return b(a)
    if (fk.test(a)) {
      var c
      var d = (c = fk.exec(a)[ik.Um]) != null ? c : ""
    } else if (gk.test(a)) {
      var e
      d = (e = gk.exec(a)[ik.proxy]) != null ? e : ""
    } else if (hk.test(a)) {
      var f
      d = (f = hk.exec(a)[ik.Vm]) != null ? f : ""
    } else throw Error("Not a blogger image url: " + a)
    a = a.replace(d, Pb)
    return b(a).replace(Pb, d)
  }

  function kk(a, b) {
    if (a) {
      b = Object.assign({}, lk, b)
      b.O = b.O || Math.min(b.width, b.height)
      for (var c = a, d, e = 0; d = mk[e]; e++) if (d.match(a)) {
        b.Ve && d.Ba ? c = d.Ba(a) : d.qa && (c = d.qa(a, b), d.Ja || d.Ba && d.Ba(a))
        break
      }
      return c
    }
  }

  var lk = { un: 100, tn: 100, O: null, Ve: !1, od: !1 }, mk = [{
    Ja: !0,
    match: function (a) {return fk.test(a) || gk.test(a) || hk.test(a)},
    qa: function (a, b) {
      return jk(a, function (c) {
        c = ek(c)
        b.O && (c = c.Na(b.O))
        b.od && (c = c.Xb(!0))
        return c.yb()
      })
    },
    Ba: function (a) {return this.qa(a, { O: 1600 })}
  }, {
    Ja: !0, match: function (a) {return fe(a)}, qa: function (a, b) {
      a = ek(a)
      b.O && (a = a.Na(b.O))
      b.od && (a = a.Xb(!0))
      return a.yb()
    }, Ba: function (a) {return this.qa(a, { O: 1600 })}
  }, {
    Ja: !0,
    match: function (a) {return /farm[0-9]+\.static(?:\.)?flickr\.com\/[^\/]+\/[^_]+_[^_\.]+(_[mstzb])?\.jpg/.test(a)},
    qa: function (a, b) {
      for (var c = [{ Ca: "_b", size: 1024 }, { Ca: "_z", size: 640 }, {
        Ca: "",
        size: 500
      }, { Ca: "_m", size: 240 }, { Ca: "_t", size: 100 }, {
        Ca: "_s",
        size: 75
      }], d = c[0].Ca, e, f = 0; e = c[f]; f++) e.size >= b.O && (d = e.Ca)
      return a.replace(/(\/[^\/]+\/[^_]+_[^_\.]+)(_[mstzb])?\.jpg/, "$1") + d + ".jpg"
    },
    Ba: function (a) {return a.replace(/_[mstzb]\.jpg$/, "_b.jpg")}
  }, {
    Ja: !0, match: function (a) {return a.match(/maps\.googleapis\./i)}, qa: function (a, b) {
      a = F.decode(a)
      b.O = Math.min(640, b.O)
      var c = (a.params.size || "").split("x"), d = parseInt(a.params.zoom,
        10) || 1, e = parseInt(c[0], 10) || 512
      c = parseInt(c[1], 10) || 512
      var f = e > 180
      b.od ? c = e = b.O : (b = b.O / Math.max(e, c), e = Math.floor(e * b), c = Math.floor(c * b))
      e < 128 && f && (b = 128 / e, e = Math.floor(e * b), c = Math.floor(c * b), d--)
      a.size = e + "x" + c
      a.zoom = d
      return a.encode()
    }, Ba: function (a) {return this.qa(a, { O: 640 })}
  }, {
    Ja: !1,
    match: function (a) {return a.match(/i[0-9]+\.photobucket.com\/albums\/.*\.jpg$/)},
    qa: function (a) {return a.replace(/\/([^\/]+)$/, "/th_$1")},
    Ba: function (a) {return a.replace(/\/th_([^\/]+)$/, "$1")}
  }, {
    Ja: !1,
    match: function (a) {return a.match(/i[0-9]+\.tinypic.com\/[^\.]+.jpg$/)},
    qa: function (a) {return a.replace(/\/([^.]+).jpg$/, "/$1_th.jpg")},
    Ba: function (a) {return a.replace(/_th\.jpg$/, ".jpg")}
  }, {
    Ja: !1,
    match: function (a) {return a.match(/imbx.us\/[^\.]+.(jpg|png)$/)},
    qa: function (a) {return a},
    Ba: function (a) {return a}
  }, {
    Ja: !1, match: function (a) {return a.match(/\.ak\.fbcdn\.net\/.*photos.+_[abnqst]\.jpg$/)}, qa: function (a, b) {
      for (var c = [{ Ca: "a", size: 180 }, { Ca: "s", size: 130 }, {
        Ca: "t",
        size: 75
      }], d = /_[abnqst]\.jpg$/, e = 0; e < c.length; e++) if (e == c.length - 1 || b.O >= c[e].size) return a.replace(d,
        "_" + c[e].Ca + ".jpg")
    }, Ba: function (a) {return a.replace(/_[abnqst]\.jpg$/, "_n.jpg")}
  }]

  function nk(a, b, c, d) {
    this.url = a
    this.id = c
    this.filter = b
    this.baseUrl = d || this.url
    this.allowComments = !0
  }

  A = nk.prototype
  A.content = function () {
    !this.jd && this.body && (this.jd = Jd(this.body, {
      tag: Rb,
      attr: v,
      attrTest: /\/www.youtube.com\//,
      replace: ok
    }), this.jd = Jd(this.jd, { tag: yb, replace: ok }))
    return this.jd
  }

  function ok(a) {
    if (a.name == yb) return a.attr("wmode", "opaque").encode()
    if (a.name == Rb) {
      var b = Gd(a.attr(v))
      return b.authority == "www.youtube.com" ? a.attr(v, b.param("wmode", "opaque").encode()).encode() : a.Sa
    }
    return a.Sa
  }

  A.text = function () {
    this.yj || (this.yj = pk(this.body, "table"))
    return this.yj
  }
  A.summary = function (a) {
    a = a || 300
    var b = (this.body || "").indexOf(Ea)
    if (b >= 0) return pk(this.body.substr(0, b))
    a = this.text().substring(0, a).trim()
    return (b = a.match(/(?:.|\n|\r)*(\.(?=\s|\n|\r)|\.$)/)) ? b[0] : a
  }
  A.attachments = function (a) {
    this.Gb || (this.Gb = qk(this) || [])
    return (a === void 0 ? this.Gb : this.Gb.filter(function (b) {return b.type == a})) || []
  }
  A.attach = function (a, b) {
    this.Gb || (this.Gb = [])
    a = a instanceof yd ? a : new yd(a, b)
    this.Gb.push(a)
    return a
  }

  function qk(a) {
    var b = [], c = /(youtube\.com)|(youtu\.be)\//im, d = /(maps\.google\.)/im, e = a.title
    b.push.apply(b, Yc(rk(a.body).map(function (f) {return new yd(ec, { url: f, title: e })})))
    b.push.apply(b, Yc(Jd(a.body, { attr: v, attrTest: c }).map(function (f) {
      f = sk(f.attr(v))
      return new yd(Fc, { url: f.url, content: f.og, thumbnail: f.thumbnail, title: e })
    })))
    b.push.apply(b, Yc(Jd(a.body, { tag: Rb, attr: v, attrTest: function (f) {return !c.test(f)} }).map(function (f) {
      var h = new yd("other", { url: f.attr(v), content: f.encode() })
      if (d.test(f.attr(v))) {
        var k =
          F.decode(f.attr(v))
        if (k) {
          var l = F.decode("//maps.googleapis.com/maps/api/staticmap"),
            m = Math.min(640, parseInt(f.attr("width"), 10) || 512)
          f = Math.min(640, parseInt(f.attr(Mb), 10) || 512)
          l.params.center = k.params.ll
          l.params.zoom = k.params.z
          l.params.maptype = k.params.u && "satellite" || k.params.w && "hybrid" || k.params.f && "terrain" || k.params.t && "roadmap" || "roadmap"
          l.params.sensor = !1
          l.params.size = m + "x" + f
          return [new yd(ec, { url: l.encode(), title: e }), h]
        }
      }
      return h
    })))
    b.push.apply(b, Yc(Jd(a.body, { tag: yb, attr: v, attrTest: function (f) {return !c.test(f)} }).map(function (f) {
      return new yd("other",
        { url: f.src, content: f.encode() })
    })))
    return b
  }

  function tk(a) {
    var b = {}
    b.ID = a.id
    b.Permalink = a.url
    b.HttpPermalink = a.fl
    b.Date = a.published
    b.Body = a.content()
    b.SourceTitle = a.sourceTitle
    b.Text = !0
    var c = a.attachments(ec).length, d = a.attachments(Fc).length
    b.Photo = c == 1
    b.Photoset = c > 1
    b.Video = d > 0
    if (rd().get(Lb)) {
      var e = function (f) {
        var h = F.decode(f.attr(v))
        h.authority = "blitz.nocrawl." + h.authority
        return f.attr(v, h.encode()).encode()
      }
      b.Body = Jd(b.Body, { tag: Fc, attr: v, replace: e })
      b.Body = Jd(b.Body, { tag: Rb, attr: v, replace: e })
      b.Body = Jd(b.Body, {
        tag: yb, attr: v,
        replace: e
      })
      b.Body = Jd(b.Body, { tag: "script", replace: function (f) {return f.attr(v) ? e(f) : ""} })
    }
    b.Interstitial = uk(a)
    return b
  }

  function vk(a) {
    var b = {}
    b.Photos = a.attachments(ec).map(function (c) {
      var d = kk(c.url, { Ve: !0 }), e
      a:{
        if (d) for (var f = 0; e = mk[f]; f++) if (e.match(d) && e.Ja) {
          e = !0
          break a
        }
        e = !1
      }
      return e ? {
        Caption: c.title || a.title,
        LinkURL: d,
        PhotoURL: c.url,
        "PhotoURL-HighRes": d,
        PhotoWidth: c.width,
        PhotoHeight: c.height
      } : null
    })
    b.Photos && b.Photos.length && Object.assign(b, b.Photos[0])
    b.Videos = a.attachments(Fc).map(function (c) {
      var d = sk(c.url)
      return { Caption: c.title, Video: d.og, VideoURL: d.url, PhotoURL: d.thumbnail }
    })
    b.Videos && b.Videos.length &&
    (b.Video = b.Videos[0].Video, b.VideoURL = b.Videos[0].VideoURL, b.PhotoURL = b.PhotoURL || b.Videos[0].PhotoURL)
    b.Attachments = a.attachments().map(function (c) {
      var d = { Caption: c.title, URL: c.url, Content: c.content }
      c.type == ec ? (d.Photo = !0, d.PhotoURL = c.url, d["PhotoURL-HighRes"] = kk(c.url, { Ve: !0 }), d.PhotoWidth = c.width, d.PhotoHeight = c.height) : c.type == Fc ? (c = sk(c.url), d.Video = c.og, d.PhotoURL = c.thumbnail) : c.type == "article" && (d.Article = !0)
      return d
    })
    b.ShowThumbnail = !!b.PhotoURL && !uk(a)
    return b
  }

  A.data = function () {
    var a = tk(this), b = vk(this), c = {}
    a = Xc([a, b])
    for (b = a.next(); !b.done; b = a.next()) {
      b = Xc(Object.entries(b.value))
      for (var d = b.next(); !d.done; d = b.next()) {
        var e = Xc(d.value)
        d = e.next().value
        e = e.next().value
        e !== void 0 && (c[d] = e)
      }
    }
    c.Title = this.title
    c.PlaintextBody = this.text()
    this.body && this.body.indexOf(Ea) >= 0 && (c.Summary = this.summary())
    this.author && (c.PostAuthorName = this.author.name, c.PostAuthorURL = this.author.profileUrl, c.PostAuthorPortraitURL = this.author.image)
    this.geoLocation && (c.GeoLocationName =
      this.geoLocation.name, c.GeoLocationLatitude = this.geoLocation.latitude, c.GeoLocationLongitude = this.geoLocation.longitude)
    this.tags && (c.Tags = this.tags.map(function (f) {return { Tag: f }}), c.TagsAsClasses = Ad(this.tags))
    this.relatedUrl && (c.RelatedURL = this.relatedUrl)
    Object.assign(c, ae(this))
    return c
  }
  A.compareTo = function (a) {return a && this.id && this.id == a.id ? 0 : a && this.published && a.published ? this.published.getTime() - a.published.getTime() : -1}

  function sk(a) {
    var b = /(?:(?:vi?)|(?:\.be)|(?:embed))[=\/]([^\?&]+)/i
    if (b.test(a)) {
      var c = b.exec(a)
      var d = ["<iframe width=\"500\" height=\"281\" src=\"//www.youtube.com/embed/", c[1], "?wmode=opaque\" frameborder=\"0\" allowfullscreen></iframe>"].join("")
      a = "//www.youtube.com/v/" + c[1]
      c = ["//img.youtube.com/vi/", c[1], "/0.jpg"].join("")
    } else /vimeo/.test(a) && (d = ["<iframe width=\"500\" height=\"281\" src=\"", a, "\" frameborder=\"0\" allowfullscreen></iframe>"].join(""))
    return { embed: d, url: a, thumbnail: c }
  }

  function rk(a) {
    a = a || ""
    for (var b = [], c; c = wk.exec(a);) {
      c = c[1]
      for (var d, e = void 0, f = !0; d = xk.exec(c);) if (d[1] !== "" && d[2] !== "") {
        var h = d[1].toLowerCase()
        d = d[2].replace(/^('|")(.*)(\1)$/, "$2")
        h == v ? e = d : (h == "width" || h == Mb) && parseInt(d, 10) <= 1 && (f = !1)
      }
      e && f && b.push(e)
    }
    return b
  }

  function uk(a) {
    var b = !!rd().get("interstitial_accepted")
    return !!a.interstitial && !b
  }

  function pk(a, b) {
    a = a || ""
    for (var c, d = 0; c = yk[d]; d++) a = a.replace(c, "")
    c = document.createElement("div")
    Bd(c, a.replace(/\n/g, " "))
    c.querySelectorAll("div,h1,h2,h3,h4,h5,h6,p").forEach(function (e) {e.append("\n\n")})
    c.querySelectorAll("br").forEach(function (e) {e.replaceWith(document.createTextNode("\n\n"))})
    b !== void 0 && Array.from(c.querySelectorAll(b)).forEach(function (e) {e.remove()})
    a = c.textContent.replace(/(\n|\r){2}(\s|\n|\r)+/g, "\n\n")
    a = a.replace(/[ \t]+/g, " ")
    return a.replace(/ \n/g, "\n").trim()
  }

  var wk = /<img\b([^>]*(?:.*?))\/?>/ig, xk = /([^\s=]+)\s*=\s*((?:')[^<']*(?:')|(?:")[^<"]*(?:"))/g,
    yk = [/<head[^>]*?>(?:.|\n|\r)*?<\/head>/ig, /<style[^>]*?>(?:.|\n|\r)*?<\/style>/ig, /<script[^>]*?>(?:.|\n|\r)*?<\/script>/ig, /<object[^>]*?>(?:.|\n|\r)*?<\/object>/ig, /<embed[^>]*?>(?:.|\n|\r)*?<\/embed>/ig, /<applet[^>]*?>(?:.|\n|\r)*?<\/applet>/ig, /<noframes[^>]*?>(?:.|\n|\r)*?<\/noframes>/ig, /<noscript[^>]*?>(?:.|\n|\r)*?<\/noscript>/ig, /<noembed[^>]*?>(?:.|\n|\r)*?<\/noembed>/ig, /<img[^>]*?.*?\/?>/ig]

  function zk(a) {return a && a.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/'/g, "&#39;").replace(/`/g, "&#96;").replace(/"/g, "&quot;") || ""}

  function Ak(a, b, c, d) {nk.call(this, a, b, c, d)}

  D(Ak, nk)
  Ak.prototype.data = function () {
    var a = nk.prototype.data.call(this)
    a.Blogger = !0
    a.PostID = this.id
    a.BlogID = this.blogId
    a.Comments = a.Notes = !!rd().get(pb) && !!this.allowComments
    a.Comments && (a.CommentCount = a.NoteCount = this.commentCount || 0, a.CommentCountWithLabel = a.CommentCount + " comment" + (a.CommentCount != 1 ? "s" : ""), a.NoteCountWithLabel = a.CommentCountWithLabel, a.CommentModerationMode = this.rn)
    if (this.tags) {
      for (var b, c, d = 0; c = xd().resources()[d]; d++) c instanceof ud && c.id == this.blogId && (b = c.baseUrl)
      var e = b ||
        ""
      e += e[e.length - 1] == "/" ? "" : "/"
      e += "search/label/"
      a.Tags = this.tags.map(function (f) {
        return {
          Tag: zk(f),
          URLSafeTag: encodeURIComponent(f),
          TagURL: e + encodeURIComponent(f)
        }
      })
    }
    return a
  }

  function Bk(a) {
    if (a !== void 0) {
      var b = new Date,
        c = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{2,3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/.exec(a)
      if (!c) return Date.parse && b.setTime(Date.parse(a)), isNaN(b.getTime()) ? void 0 : b
      a = []
      a[1] = parseInt(c[1], 10) || 0
      a[4] = parseInt(c[4], 10) || 0
      a[5] = parseInt(c[5], 10) || 0
      a[6] = parseInt(c[6], 10) || 0
      a[7] = parseInt(c[7], 10) || 0
      a[10] = parseInt(c[10], 10) || 0
      a[11] = parseInt(c[11], 10) || 0
      a[2] = (parseInt(c[2], 10) || 1) - 1
      a[3] = parseInt(c[3],
        10) || 1
      var d = 0
      c[8] !== "Z" && c[9] && (d = a[10] * 60 + a[11], c[9] == "+" && (d = 0 - d))
      b.setTime(Date.UTC(a[1], a[2], a[3], a[4], a[5] + d, a[6], a[7]))
      return b
    }
  }

  function Ck(a) {
    function b(c) {return c < 10 ? "0" + c : c}

    return [a.getUTCFullYear(), "-", b(a.getUTCMonth() + 1), "-", b(a.getUTCDate()), "T", b(a.getUTCHours()), ":", b(a.getUTCMinutes()), ":", b(a.getUTCSeconds()), "Z"].join("")
  }

  function Dk(a) {
    this.source = a || window._WidgetManager && window._WidgetManager._GetAllData && window._WidgetManager._GetAllData()
    this.Cj = rd()
  }

  Dk.prototype.get = function () {
    if (!this.source || Object.keys(this.source).length == 0) return { ready: !1 }
    var a = { ready: !0 }
    if (this.source.blog) {
      var b = this.source.blog, c = this.source && this.source.skin && this.source.skin.vars || void 0,
        d = this.source.view, e = this.source.widgets
      if (b) {
        a.blog_locale = b.locale
        a.blog_title = b.title
        a.blog_id = b.blogId
        a.comments_enabled = !0
        a.comments_mtd = 2
        a.feeds_api = 2
        a.analytics_id = b.analyticsAccountNumber
        a.analytics4 = b.analytics4
        a.adsense_client_id = b.adsenseClientId
        a.adsense_host_id =
          "pub-1556223355139109"
        a.adsense_has_ads = b.adsenseHasAds
        a.blog_url = b.homepageUrl ? F.decode(b.homepageUrl).encode(!1, !1) : "/"
        if (b.bloggerUrl) {
          var f = F.decode(b.bloggerUrl)
          f.scheme = Ob
          a.blogger_base = f.encode()
        }
        a.canonical_url = b.canonicalUrl
        a["private"] = !!b.isPrivateBlog
        a.hasCustomDomain = !!b.hasCustomDomain
        a.is_mobile = !!b.isMobileRequest
        a.is_tablet = (!!b.isMobileRequest || Ud) && window.screen.width >= 768 && window.screen.width <= 1600
        f = this.Cj.zf
        a.filter_permalink = Ud && f == "classic"
        a.pageType = b.pageType
        a.postId = b.postId
        a.pageId = b.pageId
        a.boq_comment_iframe_form = !0
        a.login_redirect_param = b.loginRedirectParam
        a.interstitial_accepted = !!b.interstitialAccepted
      }
      c && (a.template_styles = {
        "font:Text": c.page_text_font,
        "color:Text": c.page_text_color,
        "image:Background": c.body_background,
        "color:Background": c.body_background_color,
        "color:Header Background": c.header_background_color,
        "color:Primary": c.primary_color,
        "color:Menu Text": c.menu_text_color,
        "font:Menu": c.menu_font,
        "font:Link": c.link_font,
        "color:Link": c.link_color,
        "color:Link Visited": c.link_visited_color,
        "color:Link Hover": c.link_hover_color,
        "font:Blog Title": c.blog_title_font,
        "color:Blog Title": c.blog_title_color,
        "font:Blog Description": c.blog_description_font,
        "color:Blog Description": c.blog_description_color,
        "font:Post Title": c.post_title_font,
        "color:Post Title": c.post_title_color,
        "color:Ribbon": c.ribbon_color,
        "color:Ribbon Hover": c.ribbon_hover_color
      }, a.additional_css = this.source && this.source.skin && this.source.skin.override || void 0)
      if (d) {
        var h = this.Cj.zf
        a.views = []
        Object.values(d).forEach(function (k) {
          k.name && k.url && a.views.push({
            name: k.name,
            url: k.url,
            selected: k.name == h
          })
        })
      }
      e && (a.widget_settings = {}, Object.entries(e).forEach(function (k) {
        k = Xc(k)
        var l = k.next().value
        k = k.next().value
        a.widget_ids || (a.widget_ids = [])
        a.widget_settings[l] = k.settings
        a.widget_ids.push(l)
        if (/^PageList\d+$/.test(l)) k = k.links.map(function (u) {
          return {
            title: u.title,
            url: u.href,
            page_id: u.id
          }
        }), a.pages || (a.pages = []), a.pages = a.pages.concat(k) else if (/^Blog\d+$/.test(l)) {
          if (l = k.previewPost) {
            var m =
              new Ak
            m.id = l.id
            m.url = l.url
            m.title = l.title
            m.body = l.body
            var n = l.timestampISO8601
            m.published = Bk(n)
            m.updated = Bk(n)
            m.commentCount = l.numComments
            m.allowComments = l.allowComments
            m.author = new sd(l.author, l.authorUrl, l.authorPhoto && l.authorPhoto.url || void 0)
            m.tags = (l.labels || []).map(function (u) {return u.name})
            a.preview = m
          }
          (k = k.navMessage) && b && b.pageType == "error_page" && (a.error = k)
        }
      }))
    } else Object.assign(a, this.source), a.views = blogger.views
    a.blog_url = a.blog_url || F.decode().root()
    a.canonical_url = a.canonical_url ||
      F.decode().encode(!1, !1)
    c = F.decode(a.canonical_url)
    c.scheme = "http"
    a.http_canonical_url = c.encode()
    c = F.decode()
    if (c.param("z") !== void 0 || c.fragment == "z") a.headless = !0
    return a
  }

  function Ek() {this.zb = {}}

  Ek.prototype.addListener = function (a, b) {
    this.zb[a] || (this.zb[a] = [])
    this.zb[a].push(b)
  }
  Ek.prototype.removeListener = function (a, b) {
    var c = this.zb[a]
    c && (this.zb[a] = c.filter(function (d) {return d !== b}))
  }
  Ek.prototype.notify = function (a, b) {
    var c = Array.from(arguments), d = c.shift(), e = this.zb[d]
    if (e) for (var f = { yc: 0 }; f.yc < e.length; f = { yc: f.yc }, ++f.yc) setTimeout(function (h) {
      return function () {
        var k = new CustomEvent(d)
        e[h.yc].apply(e, [k].concat(Yc(c)))
      }
    }(f), 0)
  }

  function Fk(a) {return typeof a.className == z ? a.className : a.getAttribute && a.getAttribute(kb) || ""}

  function Gk(a) {return a.classList ? a.classList : Fk(a).match(/\S+/g) || []}

  function Hk(a, b) {typeof a.className == z ? a.className = b : a.setAttribute && a.setAttribute(kb, b)}

  function Ik(a, b) {
    a.classList ? b = a.classList.contains(b) : (a = Gk(a), b = ue(a, b) >= 0)
    return b
  }

  function U(a, b) {
    if (a.classList) a.classList.add(b) else if (!Ik(a, b)) {
      var c = Fk(a)
      Hk(a, c + (c.length > 0 ? " " + b : b))
    }
  }

  function Jk(a) {
    var b = [wb, "delay"]
    if (a.classList) Array.prototype.forEach.call(b, function (e) {U(a, e)}) else {
      var c = {}
      Array.prototype.forEach.call(Gk(a), function (e) {c[e] = !0})
      Array.prototype.forEach.call(b, function (e) {c[e] = !0})
      b = ""
      for (var d in c) b += b.length > 0 ? " " + d : d
      Hk(a, b)
    }
  }

  function V(a, b) {a.classList ? a.classList.remove(b) : Ik(a, b) && Hk(a, Array.prototype.filter.call(Gk(a), function (c) {return c != b}).join(" "))}

  function Kk(a, b, c) {c ? U(a, b) : V(a, b)}

  function W() {
    this.hj = !1
    this.settings = {}
  }

  A = W.prototype
  A.start = function (a, b) {
    this.ui = a
    this.data = b
    this.settings = Object.assign({}, { name: Gc, scrollBuffer: 400, pageSize: 25, autoselect: !0 }, this.Ua())
    this.wa(this.lm)
  }
  A.Ua = function () {return {}}
  A.Ki = function () {return !0}
  A.Mj = function () {return this.settings.name}
  A.wa = function (a, b) {
    var c = Array.prototype.slice.call(arguments), d = c.shift()
    if (typeof d === r) {
      var e = this
      setTimeout(function () {d.apply(e, c)}, 0)
    }
  }
  A.template = function (a, b) {
    if (a = G().template(a)) {
      var c = a.apply
      b = b !== void 0 ? Xd(b) : Vd()
      this.scope(b)
      return (c.call(a, b) || "").trim()
    }
    return ""
  }
  A.scope = function () {}
  A.ef = function (a) {
    var b = a.target.closest(g)
    if (b) {
      var c = b.dataset.id
      if (c && !a.metaKey) {
        if (a.target.matches("a")) {
          if (a.target.hasAttribute(tb)) return
          var d = a.target.getAttribute(Nb)
          if (F.decode(d).authority && F.isCrossDomain(d) && a.target.closest(".title")) return
        }
        a.stopPropagation()
        a.preventDefault()
        this.ui.select(c, b)
        return !1
      }
    }
  }
  A.Aa = function (a) {
    a !== void 0 && (this.hj = !!a)
    return this.hj
  }
  A.La = function (a) {this.Aa() || this.ui.headless() || (a || this.Kd()) && this.wa(this.gj)}
  A.Kd = function () {
    if (!this.data.hasNext()) return !1
    var a = this.settings.scrollBuffer >= document.body.clientHeight - window.innerHeight - window.pageYOffset
    if (!a) {
      var b = this.ui.current()
      b && this.data.items().indexOf(b) == this.data.items().length - 1 && (a = !0)
    }
    return a
  }
  A.lm = function () {
    this.Ki() && this.ui.Tk()
    this.ui.configure().view(this)
    this.Ac()
    this.wa(this.Nj)
    for (var a = 0; a < Lk.length; a++) {
      var b = Lk[a]
      this.ui.shortcut(b.chord, b.action)
    }
  }
  A.Nj = function () {
    var a = this, b = document.querySelector(ib)
    U(b, this.settings.name)
    U(b, Ud ? "touch" : "notouch")
    window.addEventListener(mc, this.Qj.bind(this))
    window.addEventListener(ic, this.Pj.bind(this))
    this.settings.autoselect && document.body.addEventListener(mb, this.ef.bind(this))
    this.data.addListener(Wb, function (c, d) {
      V(document.querySelector(ib), "loading")
      a.wa(a.nm, d)
    })
    this.ui.addListener(oc, this.Rj.bind(this))
    this.ui.addListener(lb, this.Me.bind(this))
    this.ui.addListener("filter", this.Lj.bind(this))
    this.ui.addListener("clearfilter", this.Lk.bind(this))
    this.wa(this.gl)
  }
  A.gl = function () {
    this.Xa()
    this.wa(this.gj)
  }
  A.gj = function () {!this.data.waiting() && this.data.hasNext() && this.wa(this.Oj)}
  A.Oj = function () {
    U(document.querySelector(ib), "loading")
    this.data.next(parseInt(this.settings.pageSize, 10) || 1)
  }
  A.nm = function (a) {this.ui.headless() && /\.*(?:(\/\d{4}\/\d{2}\/[^\/]+)|\/p(\/[^\/]+\.html))$/.test(F.decode().path) || (this.Zi(a) !== !1 ? this.wa(this.um, a) : (this.wa(this.Df, a), this.ui.updated()))}
  A.um = function (a) {
    this.Ya(a)
    this.wa(this.Df)
  }
  A.Df = function () {
    this.ui.updated()
    this.Pc()
    this.wa(this.La)
  }
  A.Pj = function () {
    this.Nd()
    this.La()
  }
  A.Qj = function () {
    this.bj()
    this.La()
  }
  A.Rj = function (a, b) {this.ui.headless() || this.Qb(b)}
  A.Me = function () {this.Xi()}
  A.Lj = function (a, b, c) {this.Wa(b, c)}
  A.Lk = function () {this.Ma()}

  function Mk(a) {
    var b = document.querySelectorAll("head style")
    b && Array.from(b).forEach(function (c) {c.matches(".singleton-element") || c.remove()})
    Nk(a)
    b = document.querySelector(ib)
    Array.from(b.children).forEach(function (c) {c.matches(ua) || c.remove()})
    Bd(document.body, a.template("Main"))
    Kk(b, Tb, a.ui.headless())
    a.ui.notify(Ec)
  }

  function Nk(a) {
    var b = document.querySelector(Kb), c = b.querySelector("css")
    c && c.remove()
    c = document.createElement(vc)
    c.setAttribute(Qb, "css")
    c.append(a.template("CSS"))
    b.append(c)
  }

  A.log = function (a) {
    var b = window.console
    b && b.log && b.log(a)
  }
  A.Ac = function () {}
  A.Xa = function () {}
  A.Zi = function () {}
  A.Ya = function () {}
  A.Pc = function () {}
  A.Nd = function () {}
  A.bj = function () {}
  A.Qb = function () {}
  A.Xi = function () {}
  A.Wa = function () {}
  A.Ma = function () {}
  W.prototype.needMore = W.prototype.Kd
  W.prototype.maybeMore = W.prototype.La
  W.prototype.preventMore = W.prototype.Aa
  W.prototype.scope = W.prototype.scope
  W.prototype.template = W.prototype.template
  var Lk = [{ chord: "j", action: "next" }, { chord: "k", action: "previous" }, {
    chord: ":t",
    action: "templates"
  }, { chord: [37], action: "previous" }, { chord: [39], action: "next" }, { chord: [27], action: "clearSelection" }]

  function Ok() {
    this.uc = ""
    this.Ni = new Date
    this.He = {}
  }

  Ok.prototype.init = function (a) {
    this.A = a
    document.addEventListener("keypress", this.Nl.bind(this))
    document.addEventListener("keydown", this.Ml.bind(this))
  }

  function Pk(a) {return a.map(function (b) {return String.fromCharCode(b).toLowerCase()}).join("")}

  Ok.prototype.shortcut = function (a, b) {
    a = Array.isArray(a) ? Pk(a) : a
    b === null ? delete this.He[a] : this.He[a] = b
  }
  Ok.prototype.Nl = function (a) {return Qk(this, a)}
  Ok.prototype.Ml = function (a) {if ([27, 37, 38, 39, 40].indexOf(a.which || a.keyCode || 0) !== -1) return Qk(this, a)}

  function Qk(a, b) {
    if (/input|textarea|select|option|button/i.test(b.target.tagName)) return !0
    var c = a.He || {}, d = String.fromCharCode(b.which || b.keyCode || 0).toLowerCase(), e = new Date
    a.uc = e - a.Ni < 1E3 ? a.uc + d : d
    a.Ni = e
    d = a.uc.length
    for (e = 0; e < d; e++) {
      var f = a.uc.substr(e)
      if (c[f]) {
        a.uc = ""
        if (typeof c[f] === r) c[f]() else if (a.A[c[f]]) a.A[c[f]]() else a.A.notify(c[f])
        b.preventDefault()
        return !1
      }
      for (var h in c) if (h.indexOf(f) == 0) return
    }
  }

  function Rk(a, b, c) {
    this.name = a
    this.module = b
    this.Uk = c
  }

  function Sk() {this.Yb = {}}

  var Tk

  function Uk(a) {return Object.values(a.Yb).filter(function (b) {return b.Uk}).map(function (b) {return b.name})}

  function Vk(a, b, c) {Wk.Yb[a] = new Rk(a, b, c === void 0 ? !0 : c)}

  Sk.prototype.reset = function () {this.Yb = {}}

  function Xk() {
    Tk || (Tk = new Sk)
    return Tk
  }

  function Yk() {}

  A = Yk.prototype
  A.init = function (a, b) {
    this.value = a
    this.start = b
    return this
  }
  A.invalid = function (a) {
    a && (this.Ef = a)
    return this.Ef || !1
  }
  A.apply = function () {}
  A.extractAttributes = function (a, b) {
    b = this.Xe(b === !1 ? Zk : $k)
    for (var c, d = -1; c = b.exec(a);) if (d++, d += c[0].length, c[1] !== "" && c[2] !== "") {
      var e = c[2].replace(/^('|")(.*)(\1)$/, "$2")
      this.attr(c[1], e)
    } else this.invalid("Invalid attribute")
    d != a.length && this.invalid("Invalid attribute string")
  }
  A.attr = function (a, b) {
    b !== void 0 && (this.attributes = this.attributes || {}, this.attributes[a] = typeof b === z ? b : "" + b)
    if (this.attributes) return this.attributes[a]
  }
  A.Xe = function (a) {
    if (a.global) return new RegExp(a)
    a = a.source
    a = a.replace(/^\^/, "").replace(/\$$/, "")
    return new RegExp(a, "g")
  }
  var Zk = /([^\s=]+)\s*=\s*('[^<']*'|"[^"]*"|[\S]*)/g, $k = /([^\s=]+)\s*=\s*('[^']*'|"[^"]*")/g

  function al() {}

  D(al, Yk)
  al.prototype.init = function (a, b) {
    Yk.prototype.init.call(this, a, b);
    (this.variable = this.tag = (a = bl.exec(this.value)) && a[1]) ? a[2] && this.extractAttributes(a[2]) : this.invalid(Ma)
    if (this.tag) for (b = 0; a = cl[b]; b++) if (this.tag.indexOf(a.prefix) === 0) {
      this.transform = a.prefix
      this.variable = this.tag.substr(a.prefix.length)
      break
    }
    this.name = this.variable
    return this
  }
  al.prototype.apply = function (a) {
    if (this.variable) {
      var b = G(), c = b.template(this.tag)
      if (c && !a.scope(Ta + this.tag)) {
        var d = b.oa(a.context, a)
        d.scope(Ta + this.tag, !0)
        for (var e in this.attributes) d.scope(e, b.resolveAttr(this, e, a))
        return c.apply(d)
      }
      c = (b = b.generator(this.variable)) ? b.apply(this, [a]) : a.data(this.variable)
      b || c !== void 0 || this.variable != "Value" || (c = a.context)
      a:if (a = c, this.transform && a) for (c = 0; b = cl[c]; c++) if (b.prefix === this.transform) {
        a = b.transform(a)
        break a
      }
      return a
    }
  }

  function dl(a) {
    var b = document.createElement("div")
    Bd(b, a)
    return b.textContent
  }

  var bl = /^{([^\s:}]+)(?:\s(.+))?}$/, cl = [{
    prefix: "JSPlaintext", transform: function (a) {
      a = dl(a)
      return ["'", a ? a.replace(/'/g, "&#039;") : "", "'"].join("")
    }
  }, { prefix: "Plaintext", transform: function (a) {return dl(a)} }, {
    prefix: "URLEncoded",
    transform: function (a) {return encodeURIComponent(a)}
  }, { prefix: "JS", transform: function (a) {return ["'", a ? a.replace(/'/g, "&#039;") : "", "'"].join("")} }, {
    prefix: "HTMLEscaped", transform: function (a) {
      return (a || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g,
        "&lt;").replace(/>/g, "&gt;")
    }
  }]
  var el = /^\/(\d{4})_(\d{2})_(\d{2})_archive\.html$/, fl = /^\/(\d{4})(\/\d{2})?\/?$/,
    gl = /^([^\/?#]+)\.blogspot\.[^\/?#]+$/i

  function hl() {
    var a = rd(), b = F.decode(void 0), c = a.get("pageType"), d = new td
    if (b.path && b.path.indexOf(Ba) >= 0) return d.tags = [decodeURIComponent(b.path.substr(b.path.indexOf(Ba) + 14))], d
    if (el.test(b.path)) return b = el.exec(b.path), a = parseInt(b[1], 10), b = parseInt(b[2], 10) - 1, d.Jb = new Date(a, b, 1), d.Ib = new Date(a, b + 1, 0), d
    if (fl.test(b.path)) return b = fl.exec(b.path), a = parseInt(b[1], 10), b[2] ? (b = parseInt(b[2].substr(1), 10) - 1, d.Jb = new Date(a, b, 1), d.Ib = new Date(a, b + 1, 0)) : (d.Jb = new Date(a, 0, 1), d.Ib = new Date(a, 12,
      0)), d
    if (a.get(Db) && c == "item") return d.jm = b.path, d
    if (a.get(Db) && c == uc) return d.Yl = b.path, d
    if (b.path && b.path.indexOf("/search") == 0) return d.Jb = b.params["updated-min"] ? Bk(decodeURIComponent(b.params["updated-min"])) : void 0, d.Ib = b.params["updated-max"] ? Bk(decodeURIComponent(b.params["updated-max"])) : void 0, b.params.q && (d.query = decodeURIComponent(b.params.q).replace(/(\+)+/g, " ")), d.Jb || d.Ib || d.query ? d : void 0
  }

  function il(a) {
    a = typeof a === z ? F.decode(a) : a
    if (!a.scheme || a.scheme === "http" || a.scheme === Ob) if (a.authority) if (F.isCrossDomain(a.encode())) {
      a = gl.exec(a.authority)
      var b = gl.exec(F.decode().authority)
      if (b && a && b[1] == a[1]) return !0
    } else return !0 else return !0
    return !1
  }

  function jl(a) {
    var b = F.decode(rd().get(fb))
    b.path = "/search"
    b.params.q = a.trim().replace(/(\s)+/g, "+")
    a = window.location
    b = b.encode()
    b = zi(b)
    b !== void 0 && (a.href = b)
  }

  function kl() {this.nf = {}}

  var ll
  kl.prototype.create = function (a) {
    var b = a.match(/([^\d]*)(\d*)$/)
    a = b[1]
    b = b[2] !== "" ? b[2] : void 0
    return this.nf[a] && new this.nf[a](b)
  }

  function ml(a, b, c) {b && c && (a.nf[b] = c)}

  function nl() {
    ll || (ll = new kl)
    return ll
  }

  function ol() {this.bb = {}}

  var pl

  function ql() {
    pl || (pl = new ol)
    return pl
  }

  function rl() {
    this.B = xd()
    this.ta = rd()
    this.pe = []
    this.lb = []
    this.Zb = {}
    this.sj = new Ok
    this.sj.init(this)
    this.Qc = new Ek
    this.Gj = !1
    this.configure(void 0)
  }

  var sl

  function tl() {
    sl || (sl = new rl)
    return sl
  }

  A = rl.prototype
  A.Tk = function () {this.Gj = !0}
  A.getSetting = function (a) {return this.ta.get(a)}
  A.getAnalyticsId = function () {return this.ta.getAnalyticsId()}
  A.headless = function () {return this.ta.headless()}

  function ul(a, b) {a.Ec ? a.Ec.push(b) : (a.Ec = [b], a.Ff = setInterval(a.Kk.bind(a), 100))}

  A.Kk = function () {(new Dk(this.Re)).get().ready && (clearInterval(this.Ff), this.Ec && this.Ec.forEach(function (a) {a()}), delete this.Ec, delete this.Ff)}
  A.configure = function (a) {
    a && (this.Re = a)
    var b = (new Dk(this.Re)).get()
    b.ready || this.Re || ul(this, this.configure.bind(this, a))
    a = this.ta
    a.xb = Object.assign({}, qd, a.xb, b)
    this.B && this.B.configure(this.ta.xb)
    return this
  }
  A.cache = function (a, b) {
    b !== void 0 && (this.Zb = this.Zb || {}, this.Zb[a] = b)
    if (this.Zb) return this.Zb[a]
  }
  A.shortcut = function (a, b) {this.sj.shortcut(a, b)}
  A.addModule = function (a) {
    var b = Xk()
    if (a = b.Yb[a] && new b.Yb[a].module) {
      for (var c = 0; b = this.pe[c]; c++) if (a.constructor === b.constructor) return
      this.pe.push(a)
      a.init && a.init(this, this.B, this.Rc)
    }
  }

  function vl(a, b) {
    a.lb = []
    var c = a.getSetting("widget_ids") || []
    c = c.concat(b || [])
    b = c.length
    for (var d = 0; d < b; d++) {
      var e = nl().create(c[d])
      if (e) {
        var f = a
        f.getSetting(zb) && (f.lb.push(e), e.init && e.init(f, f.B))
      }
    }
  }

  A.selectView = function (a) {this.ta.zf = a}
  A.localize = function (a, b) {
    if (a = blogger.l10n && blogger.l10n[a] || a) {
      var c = G(), d = c.Ji(b) ? b : c.oa(b || "")
      a = a.replace(/{\w+}/g, function (e) {return (new al).init(e).apply(d)})
    }
    return a
  }
  A.view = function (a) {
    var b = this
    if (!this.ta.ready() && !(new Dk).get().ready) return ul(this, this.view.bind(this, a)), this
    if (a instanceof W) this.Rc = a, this.pe.length || (a = Xk(), Uk(a).forEach(function (c) {b.addModule(c)}), this.Gj && this.addModule(Ra)) else {
      a = a || this.getSetting(fb) || F.decode().root()
      a = F.zl(a)
      if (!wl(this)) return this
      this.B.open(a, hl())
      this.B.next(function () {
        b.B.reset()
        var c = ql()
        var d = b.ta.zf
        c = d ? (c = c.bb[d]) ? new c : void 0 : void 0
        b.Rc = c
        b.Rc.start(b, b.B)
      })
    }
    this.getSetting(zb) && vl(this, this.lb.length ==
    0 ? ["Subscribe"] : [])
    Yd = null
    this.za = -1
    delete this.oe
    return this
  }

  function xl() {Array.from(document.body.children).forEach(function (a) {a.matches(ua) || a.remove()})}

  function wl(a) {
    if (a.getSetting("error")) {
      var b = G().template("ErrorMessage")
      b && (xl(), Bd(document.body, b.apply(Xd(a.getSetting("error")))))
      return !1
    }
    if (document.querySelector("#injected-iframe")) return a.headless()
    a.getSetting("showWelcome") && (a = G().template("Welcome")) && (xl(), Bd(document.body, a.apply(Vd())))
    return !0
  }

  A.current = function () {
    if (this.za >= 0 && this.za < this.B.items().length) return this.B.items()[this.za]
    if (this.oe) return this.oe
  }
  A.hasPrevious = function () {return this.B.items().length > 0 && this.za > 0}
  A.hasNext = function () {
    var a = this.B.items().length
    return a > 0 && (this.za < a.length - 1 || this.B.hasNext())
  }
  A.next = function () {
    var a = this.cf()
    if (a != -1) return a < this.B.items().length ? this.select(this.B.items()[this.za = a]) : this.B.hasNext() && !this.B.waiting() && this.Rc.La(!0), this
  }
  A.cf = function () {
    var a = this.cache(Sa)
    if (a) {
      var b = (a || []).indexOf(this.current())
      a = a[Math.min(a.length - 1, b + 1)]
      return this.B.items().indexOf(a)
    }
    return this.za + 1
  }
  A.previous = function () {
    var a = this.jf()
    a >= 0 && a < this.B.items().length && this.select(this.B.items()[this.za = a])
    return this
  }
  A.jf = function () {
    var a = this.cache(Sa)
    if (a) {
      var b = a.indexOf(this.current())
      a = a[Math.max(0, b - 1)]
      return this.B.items().indexOf(a)
    }
    return Math.max(0, this.za - 1)
  }
  A.select = function (a, b) {
    var c = this, d = this.getSetting("pageType")
    if (a === void 0) if (this.getSetting("preview")) a = this.getSetting("preview") else if (d == uc || d == "item") this.ta.set(dc, !0), this.getSetting("pageId") ? a = this.getSetting("pageId") : this.getSetting("postId") && (a = this.getSetting("postId"))
    if (a === void 0) {
      var e = this.B.resources().length && this.B.resources()[0].url
      e && !F.isSamePage(e) && (e = F.decode(), e.path != "/" && (a = e.encode(!1, !1), this.ta.set(dc, !0)))
    }
    var f
    typeof a == t || typeof a == z ? f = this.find(a) : a &&
      (f = a)
    f ? yl(this, f, b) : a && b !== !1 && (b && b.getAttribute(sb) && (d = b.getAttribute(sb) == "page" ? uc : "item"), b = function (h) {h && yl(c, c.find(h.id) || h)}, d == uc ? this.B.page(a, b) : this.B.post(a, b))
  }

  function yl(a, b, c) {
    var d = a.B.items().indexOf(b)
    a.za = d >= 0 ? d : a.za
    a.oe = d >= 0 ? void 0 : b
    c !== !1 && a.notify(oc, b, c)
  }

  A.clearSelection = function () {
    this.ta.set(dc, !1)
    this.notify(lb)
  }
  A.find = function (a) {return this.B.find(a)}
  A.filter = function (a, b) {a && (this.cache(Sa, a), this.notify("filter", a, b))}
  A.clearFilter = function () {
    this.cache(Sa, null)
    this.notify("clearfilter", this.B.items())
  }
  A.updated = function () {this.notify(Ec, this.B.items())}
  A.viewItem = function (a, b) {this.notify(Hc, a, b)}
  A.notify = function (a, b) {
    var c = Array.prototype.slice.call(arguments), d = c.shift()
    this.Qc.notify.apply(this.Qc, [d].concat(Yc(c)))
  }
  A.addListener = function (a, b) {this.Qc.addListener(a, b)}
  A.removeListener = function (a, b) {this.Qc.removeListener(a, b)}

  function zl() {}

  D(zl, Yk)
  zl.prototype.init = function (a, b) {
    Yk.prototype.init.call(this, a, b)
    this.scope = (a = Al.exec(this.value)) && a[1]
    this.term = a && a[2]
    this.scope ? this.term ? (a = this.term.search($k), a > 0 && (this.extractAttributes(this.term.substr(a), !0), this.term = this.term.substring(0, a).replace(/\s+$/, ""))) : this.invalid("No term specified") : this.invalid("No scope specified")
    this.name = this.scope + ":" + this.term
    return this
  }
  zl.prototype.apply = function (a) {
    if (!this.invalid()) {
      var b = G(), c = this.scope + ":" + this.term, d = b.template(c)
      if (d && !a.scope(Ta + c)) {
        var e = b.oa(a.context, a)
        e.scope(Ta + c, !0)
        for (var f in this.attributes) e.scope(f, b.resolveAttr(this, f, a))
        return d.apply(e)
      }
      return (b = b.generator(c)) ? b.call(this, a) : a.data(c)
    }
  }
  var Al = /^{(\w+):(.*)}$/

  function Bl() {this.qe = []}

  D(Bl, Yk)
  Bl.prototype.init = function (a, b) {
    Yk.prototype.init.call(this, a, b);
    (this.tag = (a = /^{block:([^\s}]+)(?:\s(.+))?}$/.exec(this.value)) && a[1]) ? a[2] && this.extractAttributes(a[2]) : this.invalid(Ma)
    return this
  }
  Bl.prototype.children = function () {return this.qe}
  Bl.prototype.add = function (a) {this.qe.push(a)}
  Bl.prototype.apply = function (a) {
    var b = Cl(this, a), c = []
    if (b) if (Array.isArray(b)) for (var d = 0, e = b.length; d < e; d++) {
      var f = b[d], h = f = G().oa(f, a), k = e, l = d + 1
      h.scope("Odd", l % 2 == 1)
      h.scope("Even", l % 2 == 0)
      h.scope("Number", l)
      h.scope("First", l == 1)
      h.scope("Last", l == k)
      k = (k = this.tag.match(/^(\w+)s$/)) && k[1] || this.tag
      h.scope(k + l, !0)
      h.scope(k, h.context)
      Dl(this, f)
      c = c.concat(El(this, f))
    } else b = a, this.attributes && (b = G().oa(a.context, a), Dl(this, b)), c = c.concat(El(this, b))
    return c.join("")
  }

  function Dl(a, b) {
    var c = G()
    if (a.attributes) for (var d in a.attributes) b.scope(d, c.resolveAttr(a, d, b))
  }

  function Cl(a, b) {
    var c = /^(?:Has|If(?!Not))(.+)$/, d = /^(?:IfNot)(.+)$/
    a = a.tag
    var e = b.data(a)
    return e !== void 0 ? e : d.test(a) ? (c = d.exec(a)[1], e = b.data(c), e === void 0 || e == 0) : c.test(a) ? (c = c.exec(a)[1], e = b.data(c), e === void 0 ? !1 : e != 0) : b.data(a)
  }

  function El(a, b) {
    for (var c = [], d = 0, e; e = a.qe[d]; d++) c.push(e.apply(b))
    return c
  }

  function Fl() {}

  D(Fl, Yk)
  Fl.prototype.init = function (a, b) {
    Yk.prototype.init.call(this, a, b);
    (this.tag = (a = /^{\/(?:block|template):([^\s}]+)}$/.exec(this.value)) && a[1]) || this.invalid(Ma)
    return this
  }

  function Gl(a) {this.Ef = a}

  D(Gl, Yk)

  function Hl() {}

  D(Hl, Yk)
  Hl.prototype.apply = function () {return this.value}

  function Il(a) {
    this.name = a
    this.re = []
  }

  D(Il, Yk)
  A = Il.prototype
  A.init = function (a, b) {
    Yk.prototype.init.call(this, a, b);
    (this.name = this.tag = (a = /^{template:([^\s}]+)(?:\s(.+))?}$/.exec(this.value)) && a[1]) ? a[2] && this.extractAttributes(a[2]) : this.invalid("Missing or invalid name")
    return this
  }
  A.children = function () {return this.re}
  A.add = function (a) {this.re.push(a)}
  A.raw = function (a) {
    typeof a !== "undefined" && (this.qm = a)
    return this.qm
  }
  A.find = function (a, b, c) {
    function d(f) {
      if (f && f.children) for (var h, k = 0; h = f.children()[k]; k++) h.tag == a && (h instanceof Bl || b) && e.push({
        parent: f,
        child: h
      }), d(h)
    }

    var e = []
    d(c || this)
    return e
  }
  A.apply = function (a) {
    a = G().Ji(a) ? a : G().oa(a)
    for (var b = [], c, d = 0; c = this.re[d]; d++) b.push(c.apply(a))
    return Jl(this, b.join(""))
  }

  function Jl(a, b, c) {
    c = c || a.attr("whitespace")
    if (c === "preserve") return b
    if (c === "discard") return b.replace(/\s/g, "")
    if (c === "trim") return b.replace(/^\s+/, "").replace(/\s+$/, "")
    if (c === "collapse" || c === "preserve-breaks" || c === ob) {
      b = b.replace(/\n([\t ]+)/g, "\n")
      c == "collapse" && (b = b.replace(/\n/g, " "))
      b = b.replace(/\t/g, " ")
      b = b.replace(/ ( )+/g, " ")
      b = b.split("\n")
      for (var d = b.length, e = 0; e < d; e++) b[e] = b[e].replace(/^\s+/, "").replace(/\s+$/, "")
      b = b.join("\n")
      return c == ob ? Jl(a, b.replace(/\n[\s]+/g, "\n"),
        "trim") : b
    }
    return b
  }

  function Kl(a) {
    this.source = typeof a === z ? a : ""
    this.length = this.source.length
    this.column = this.line = this.Ia = 0
  }

  A = Kl.prototype
  A.hasNext = function () {return this.Ia < this.length}
  A.next = function () {
    if (this.hasNext()) {
      var a = this.source.charAt(this.Ia)
      this.Ia++
      a.charAt(0) == "\n" ? (this.line++, this.column = 0) : this.column++
      return a
    }
  }
  A.consume = function (a) {
    if (this.hasNext()) {
      for (var b = [], c = 0; c < a; c++) b.push(this.next())
      return b.join("")
    }
  }
  A.remainder = function () {
    if (this.hasNext()) {
      for (var a = []; this.hasNext();) a.push(this.next())
      return a.join("")
    }
  }
  A.peek = function (a) {
    a = a || this.Ia
    if (a < this.length && a >= 0) return this.source.charAt(a)
  }
  A.match = function (a, b) {
    b = this.source.substr(b || this.Ia)
    if (typeof a === z) {if (b.slice(0, a.length) === a) return a} else if (a instanceof RegExp && b.search(a) === 0) return b.match(a)[0]
  }
  A.search = function (a, b) {
    b = this.source.substr(b || this.Ia)
    if (typeof a === z) return b.indexOf(a)
    if (a instanceof RegExp) return b.search(a)
  }

  function Ll(a, b) {
    this.ancestor = b
    this.sf = {}
    this.context = (b = G().converter(a)) ? b(a, this) : a
  }

  Ll.prototype.scope = function (a, b) {
    typeof b !== "undefined" && (this.sf[a] = b)
    return typeof this.sf[a] !== "undefined" ? this.sf[a] : this.ancestor && this.ancestor.scope(a)
  }
  Ll.prototype.value = function (a) {
    var b = this.context && this.context[a]
    typeof b === "undefined" && (b = this.scope(a))
    if (typeof b === "undefined" && a.indexOf(".") >= 0) {
      a = a.split(".")
      for (var c = a.shift(), d = this.context[c] || this.scope(c); (c = a.shift()) && d;) if (d = d[c], a.length == 0) b = d else if (!d) break
    }
    return b
  }
  Ll.prototype.data = function (a, b) {return Ml.test(a) ? this.scope(a, b) : this.value(a)}
  var Ml = /(\w+):([^}]+)/

  function Nl() {
    this.se = {}
    this.ld = []
    this.We = []
  }

  A = Nl.prototype
  A.template = function (a, b) {
    typeof b !== "undefined" && (this.se[a] = this.compile(b))
    return this.se[a]
  }
  A.generator = function (a, b) {
    if (b && a) return a = {
      test: a,
      generator: b
    }, this.We.push(a), this.We.sort(function (d, e) {return (typeof e.test === z ? e.test.length : 0) - (typeof d.test === z ? d.test.length : 0)}), a.generator
    if (a && typeof a === z) for (var c = 0; b = this.We[c]; c++) if (typeof b.test === z && a.indexOf(b.test) === 0 || b.test instanceof RegExp && b.test.test(a)) return b.generator
  }
  A.converter = function (a, b) {
    for (var c = -1, d, e = 0; d = this.ld[e]; e++) if (a instanceof d.type) {
      c = e
      break
    }
    a && typeof b !== "undefined" && (c >= 0 && this.ld.splice(c, 1), c = this.ld.push({ type: a, converter: b }) - 1)
    return c >= 0 ? this.ld[c].converter : void 0
  }
  A.compile = function (a, b) {
    var c = new Kl(a)
    b = typeof b !== "undefined" ? b : !0
    var d = new Il
    d.raw(a)
    a = d
    for (var e = [d], f; f = Ol(c);) {
      var h
      f.type == "literal" ? h = Hl : f.value.indexOf("{block:") === 0 ? h = Bl : f.value.indexOf("{/block:") === 0 ? h = Fl : f.value.indexOf("{template:") === 0 ? h = Il : f.value.indexOf("{/template:") === 0 ? h = Fl : f.value.search(Pl) === 0 ? h = zl : h = al
      f = (new h).init(f.value, f.start)
      if (f instanceof Bl || f instanceof Il) a.tag == f.tag ? (b && Ql(this, e.pop(), c), a = e[e.length - 1]) : (a.add(f), a = f, e.push(a)) else if (f instanceof
        Fl) if (a.tag == f.tag) b && Ql(this, e.pop(), c), a = e[e.length - 1] else {
        var k = new Gl("Unexpected close block")
        k.init(f.value, f.start)
        a.add(k)
      } else a.add(f)
    }
    return d
  }

  function Ql(a, b, c) {b instanceof Il && b.name && (b.raw(c.source.substring(b.start || 0, c.Ia)), a.se[b.name] = b)}

  function Ol(a) {
    if (a && a.hasNext()) {
      var b = a.Ia, c = a.match(Rl)
      if (c) return { type: "token", value: a.consume(c.length), start: b }
      for (c = []; a.hasNext();) {
        if (a.peek() === "{") if (a.match(Rl)) break else if (a.match(Rl, a.Ia + 1)) {
          a.next()
          c.push(a.consume(a.match(Rl).length))
          continue
        }
        c.push(a.next())
      }
      return { type: "literal", value: c.join(""), start: b }
    }
  }

  A.oa = function (a, b) {return new Ll(a, b)}
  A.Ji = function (a) {return a instanceof Ll}
  A.resolveAttr = function (a, b, c) {
    if (b = a.attr(b)) {
      if (bl.exec(b)) return c ? Sl((new al).init(b).apply(c)) : void 0
      if (Al.exec(b)) return c ? Sl((new zl).init(b).apply(c)) : void 0
      b = b.replace(a.Xe(bl), function (d) {
        d = c ? (new al).init(d).apply(c) : void 0
        return d !== void 0 ? d : ""
      })
      b = b.replace(a.Xe(Al), function (d) {
        d = c ? (new zl).init(d).apply(c) : void 0
        return d !== void 0 ? d : ""
      })
    }
    return Sl(b)
  }

  function Sl(a) {return a === Bc ? !0 : a === Ab ? !1 : a}

  var Rl = /^{\/?([\w-]+(:[\w\-]+)?(?:(?:[\w:\-'"= \.#]*[^\s])|(\s*([^\s=]+)\s*=\s*('[^']*'|"[^"]*"))*)?)}/,
    Pl = /{(\w+:)/
  Td = function () {return new Nl}
  fd("blogger.data", xd)
  fd("blogger.ui", tl)
  fd("blogger.selectView", function (a) {tl().selectView(a)})
  fd("blogger.templates", G)
  fd("blogger.compileTemplate", function (a, b) {
    var c = G()
    b === void 0 ? c.compile(a) : c.template(a, b)
  })
  fd("blogger.tools.path", F)
  fd("blogger.views", [])
  fd("blogger.template.header", function () {
    function a() {
      V(d, "menu")
      U(d, "tabs")
      var f = 0
      Array.from(d.parentElement.children).forEach(function (h) {f += h.offsetWidth})
      parseFloat(getComputedStyle(d.parentElement).width) < f + 50 ? (V(d, "tabs"), U(d, "menu")) : U(d, "tabs")
    }

    function b(f, h) {
      c.querySelectorAll(".menu-item").forEach(function (k) {
        var l = !1
        if (h) {
          l = e.exec(k.getAttribute(Nb))
          var m = e.exec(h.url)
          l = !(!l || !m || l[1] != m[1])
        }
        Kk(k, qb, l)
      })
    }

    var c = document.querySelector("#pages"), d = c ? c : document.querySelector("#views")
    if (d) {
      window.addEventListener(ic, a)
      a()
      var e = RegExp("\\.*/p(/[^/]+\\.html$)")
      c && (tl().addListener(oc, b), tl().addListener(lb, b))
    }
  })

  function Tl() {this.a = this.b = this.Ta = this.Oa = 0}

  function Ul(a, b) {
    if (b !== void 0 && b !== !1) {
      var c = Vl.exec(b)
      return c ? Wl(a, parseInt(c[1].length == 1 ? c[1] + c[1] : c[1], 16), parseInt(c[2].length == 1 ? c[2] + c[2] : c[2], 16), parseInt(c[3].length == 1 ? c[3] + c[3] : c[3], 16)) : a
    }
    if (a.a == 0) return Ac
    c = ("0" + a.Oa.toString(16)).slice(-2)
    var d = ("0" + a.Ta.toString(16)).slice(-2)
    a = ("0" + a.b.toString(16)).slice(-2)
    if (b !== !1) return "#" + c + d + a
    b = new Tl
    b.Oa = c
    b.Ta = d
    b.b = a
    return b
  }

  function Xl(a, b, c, d, e) {
    if (b !== void 0 && b !== !1) {
      if (typeof b === z && c === void 0) if (e = Yl.exec(b)) b = e[1], c = e[2], d = e[3], e = e[4] else return a
      b = (parseFloat(b, 10) % 360 + 360) % 360
      b /= 360
      c = Zl(c, 1)
      d = Zl(d, 1)
      e = Zl(e, 1)
      var f = d <= .5 ? d * (c + 1) : d + c - d * c, h = d * 2 - f
      d = function (w) {
        var y = w < 0 ? w + 1 : w > 1 ? w - 1 : w
        return y * 6 < 1 ? h + (f - h) * y * 6 : y * 2 < 1 ? f : y * 3 < 2 ? h + (f - h) * (2 / 3 - w) * 6 : h
      }
      return $l(a, Math.round(d(b + 1 / 3) * 255), Math.round(d(b) * 255), Math.round(d(b - 1 / 3) * 255), e)
    }
    var k = a.Oa / 255, l = a.Ta / 255, m = a.b / 255
    e = a.a
    a = Math.max(k, l, m)
    c = Math.min(k, l, m)
    d =
      (a + c) / 2
    if (a == c) var n = c = 0 else {
      var u = a - c
      c = d > .5 ? u / (2 - a - c) : u / (a + c)
      a == k ? n = (l - m) / u + (l < m ? 6 : 0) : a == l ? n = 2 + (m - k) / u : a == m && (n = 4 + (k - l) / u)
      n /= 6
    }
    n = am(n * 360, 360, 0)
    c = am(c, 1, 5)
    d = am(d, 1, 5)
    return b !== !1 ? ["hsla(", n, ", ", am(c / 1 * 100, 100, 0) + "%", ", ", am(d / 1 * 100, 100, 0) + "%", ", ", e, ")"].join("") : {
      h: n,
      s: c,
      l: d,
      a: e
    }
  }

  function Wl(a, b, c, d) {
    if (b !== void 0 && b !== !1) {
      if (typeof b === z && c === void 0) if (d = bm.exec(b)) b = d[1], c = d[2], d = d[3] else return a
      $l(a, b, c, d, 1)
      return a
    }
    return ["rgb(", a.Oa, ", ", a.Ta, ", ", a.b, ")"].join("")
  }

  function $l(a, b, c, d, e) {
    if (b !== void 0 && b !== !1) {
      if (typeof b === z && c === void 0) if (e = cm.exec(b)) b = e[1], c = e[2], d = e[3], e = e[4] else return a
      a.Oa = Zl(b, 255, 0)
      a.Ta = Zl(c, 255, 0)
      a.b = Zl(d, 255, 0)
      a.a = Zl(e, 1, 5)
      return a
    }
    return ["rgba(", a.Oa, ", ", a.Ta, ", ", a.b, ", ", a.a, ")"].join("")
  }

  Tl.prototype.name = function (a) {
    if (a !== void 0) return a.toLowerCase() == Ac ? $l(this, 0, 0, 0, 0) : Ul(this, dm[a.toLowerCase()])
    if (!(this.Oa || this.Ta || this.b || this.a)) return Ac
    a = Ul(this)
    for (var b in dm) if (dm[b] == a) return b
  }
  Tl.prototype.alpha = function (a) {return a !== void 0 ? (this.a = Zl(a, 1), this) : this.a}
  Tl.prototype.shift = function (a) {
    var b = Xl(this, !1), c = (a = em.exec(a)) ? parseFloat(a[1]) : 0
    a && a[2] && (c = c / 100 * 360)
    b.Ei += c
    return Xl(this, b.Ei, b.xn, b.vn, b.a)
  }
  Tl.prototype.clone = function () {
    var a = new Tl
    $l(a, this.Oa, this.Ta, this.b, this.a)
    return a
  }

  function Zl(a, b, c) {
    var d = em.exec(a)
    a = d ? parseFloat(d[1], 10) : 0
    d && d[2] && (a = a / 100 * (b || 1))
    return am(a, b, c)
  }

  function am(a, b, c) {
    a = Math.min(b, Math.max(0, a))
    return c !== void 0 && parseInt(a, 10) != a ? (c = Math.pow(10, c), Math.round(a * c) / c) : a
  }

  var dm = {
      aliceblue: "#f0f8ff",
      antiquewhite: "#faebd7",
      aqua: "#00ffff",
      aquamarine: "#7fffd4",
      azure: "#f0ffff",
      beige: "#f5f5dc",
      bisque: "#ffe4c4",
      black: "#000000",
      blanchedalmond: "#ffebcd",
      blue: "#0000ff",
      blueviolet: "#8a2be2",
      brown: "#a52a2a",
      burlywood: "#deb887",
      cadetblue: "#5f9ea0",
      chartreuse: "#7fff00",
      chocolate: "#d2691e",
      coral: "#ff7f50",
      cornflowerblue: "#6495ed",
      cornsilk: "#fff8dc",
      crimson: "#dc143c",
      cyan: "#00ffff",
      darkblue: "#00008b",
      darkcyan: "#008b8b",
      darkgoldenrod: "#b8860b",
      darkgray: "#a9a9a9",
      darkgreen: "#006400",
      darkgrey: "#a9a9a9",
      darkkhaki: "#bdb76b",
      darkmagenta: "#8b008b",
      darkolivegreen: "#556b2f",
      darkorange: "#ff8c00",
      darkorchid: "#9932cc",
      darkred: "#8b0000",
      darksalmon: "#e9967a",
      darkseagreen: "#8fbc8f",
      darkslateblue: "#483d8b",
      darkslategray: "#2f4f4f",
      darkslategrey: "#2f4f4f",
      darkturquoise: "#00ced1",
      darkviolet: "#9400d3",
      deeppink: "#ff1493",
      deepskyblue: "#00bfff",
      dimgray: "#696969",
      dimgrey: "#696969",
      dodgerblue: "#1e90ff",
      firebrick: "#b22222",
      floralwhite: "#fffaf0",
      forestgreen: "#228b22",
      fuchsia: "#ff00ff",
      gainsboro: "#dcdcdc",
      ghostwhite: "#f8f8ff",
      gold: "#ffd700",
      goldenrod: "#daa520",
      gray: "#808080",
      green: "#008000",
      greenyellow: "#adff2f",
      grey: "#808080",
      honeydew: "#f0fff0",
      hotpink: "#ff69b4",
      indianred: "#cd5c5c",
      indigo: "#4b0082",
      ivory: "#fffff0",
      khaki: "#f0e68c",
      lavender: "#e6e6fa",
      lavenderblush: "#fff0f5",
      lawngreen: "#7cfc00",
      lemonchiffon: "#fffacd",
      lightblue: "#add8e6",
      lightcoral: "#f08080",
      lightcyan: "#e0ffff",
      lightgoldenrodyellow: "#fafad2",
      lightgray: "#d3d3d3",
      lightgreen: "#90ee90",
      lightgrey: "#d3d3d3",
      lightpink: "#ffb6c1",
      lightsalmon: "#ffa07a",
      lightseagreen: "#20b2aa",
      lightskyblue: "#87cefa",
      lightslategray: "#778899",
      lightslategrey: "#778899",
      lightsteelblue: "#b0c4de",
      lightyellow: "#ffffe0",
      lime: "#00ff00",
      limegreen: "#32cd32",
      linen: "#faf0e6",
      magenta: "#ff00ff",
      maroon: "#800000",
      mediumaquamarine: "#66cdaa",
      mediumblue: "#0000cd",
      mediumorchid: "#ba55d3",
      mediumpurple: "#9370db",
      mediumseagreen: "#3cb371",
      mediumslateblue: "#7b68ee",
      mediumspringgreen: "#00fa9a",
      mediumturquoise: "#48d1cc",
      mediumvioletred: "#c71585",
      midnightblue: "#191970",
      mintcream: "#f5fffa",
      mistyrose: "#ffe4e1",
      moccasin: "#ffe4b5",
      navajowhite: "#ffdead",
      navy: "#000080",
      oldlace: "#fdf5e6",
      olive: "#808000",
      olivedrab: "#6b8e23",
      orange: "#ffa500",
      orangered: "#ff4500",
      orchid: "#da70d6",
      palegoldenrod: "#eee8aa",
      palegreen: "#98fb98",
      paleturquoise: "#afeeee",
      palevioletred: "#db7093",
      papayawhip: "#ffefd5",
      peachpuff: "#ffdab9",
      peru: "#cd853f",
      pink: "#ffc0cb",
      plum: "#dda0dd",
      powderblue: "#b0e0e6",
      purple: "#800080",
      red: "#ff0000",
      rosybrown: "#bc8f8f",
      royalblue: "#4169e1",
      saddlebrown: "#8b4513",
      salmon: "#fa8072",
      sandybrown: "#f4a460",
      seagreen: "#2e8b57",
      seashell: "#fff5ee",
      sienna: "#a0522d",
      silver: "#c0c0c0",
      skyblue: "#87ceeb",
      slateblue: "#6a5acd",
      slategray: "#708090",
      slategrey: "#708090",
      snow: "#fffafa",
      springgreen: "#00ff7f",
      steelblue: "#4682b4",
      tan: "#d2b48c",
      teal: "#008080",
      thistle: "#d8bfd8",
      tomato: "#ff6347",
      turquoise: "#40e0d0",
      violet: "#ee82ee",
      wheat: "#f5deb3",
      white: "#ffffff",
      whitesmoke: "#f5f5f5",
      yellow: "#ffff00",
      yellowgreen: "#9acd32"
    }, em = /(-?[\d\.]+)(%)?/i, Vl = /#([a-f0-9]{1,2})([a-f0-9]{1,2})([a-f0-9]{1,2})/i,
    bm = /rgb\(\s*(-?\d{1,3}%?)\s*,\s*(-?\d{1,3}%?)\s*,\s*(-?\d{1,3}%?)\s*\)/i,
    cm = /rgba\(\s*(-?\d{1,3}%?)\s*,\s*(-?\d{1,3}%?)\s*,\s*(-?\d{1,3}%?)\s*,\s*([\d\.]+)\s*\)/i,
    fm = /hsl\(\s*(-?\d{1,3}%?)\s*,\s*(-?\d{1,3}%?)\s*,\s*(-?\d{1,3}%?)\s*\)/i,
    Yl = /hsla\(\s*(-?\d{1,3})\s*,\s*(-?\d{1,3}%)\s*,\s*(-?\d{1,3}%)\s*,\s*([\d\.]+)\s*\)/i
  var gm = "Allerta;Allerta Stencil;Arimo;Arvo;Bentham;Calibri;Calligraffitti;Cambria;Cantarell;Cardo;Cherry Cream Soda;Chewy;Coming Soon;Consolas;Copse;Corsiva;Cousine;Covered By Your Grace;Crafty Girls;Crimson Text;Crushed;Cuprum;Droid Sans;Droid Sans Mono;Droid Serif;Fontdiner Swanky;GFS Didot;GFS Neohellenic;Geo;Gruppo;Hanuman;Homemade Apple;IM Fell DW Pica;IM Fell DW Pica SC;IM Fell Double Pica;IM Fell Double Pica SC;IM Fell English;IM Fell English SC;IM Fell French Canon;IM Fell French Canon SC;IM Fell Great Primer;IM Fell Great Primer SC;Inconsolata;Irish Growler;Josefin Sans;Josefin Slab;Just Another Hand;Kenia;Kranky;Lobster;Luckiest Guy;Merriweather;Molengo;Mountains of Christmas;Neucha;Neuton;Nobile;OFL Sorts Mill Goudy TT;Old Standard TT;Open Sans;PT Sans;PT Sans Caption;PT Sans Narrow;Permanent Marker;Philosopher;Puritan;Reenie Beanie;Roboto;Rock Salt;Schoolbell;Slackey;Sunshiney;Syncopate;Tinos;UnifrakturMaguntia;Unkempt;Vollkorn;Walter Turncoat;Yanone Kaffeesatz".split(";"),
    hm = {}, im = []

  function jm(a, b, c) {return G().resolveAttr(a, b, c)}

  function km(a) {
    a = lm(a)
    im.push.apply(im, Yc(a.filter(function (b) {return !hm[b] && gm.indexOf(b) >= 0})))
    setTimeout(mm, 0)
  }

  function lm(a) {return a.replace(/'|"/g, ",").split(",").filter(function (b) {return b})}

  function mm() {
    var a = []
    im.forEach(function (d) {hm[d] || (a.push(d.replace(/\s/g, "+")), hm[d] = !0)})
    var b = a.join("|")
    if (b) {
      var c = document.querySelector(Kb)
      c && Bd(c, ["<link href=\"https://fonts.googleapis.com/css?family=", b, "\" rel=\"stylesheet\" type=\"text/css\">"].join(""))
    }
    im = []
  }

  var nm = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
    om = "January February March April May June July August September October November December".split(" ")

  function pm(a) {
    var b = "th", c = a % 10
    Math.floor(a / 10) % 10 != 1 && (c == 1 ? b = "st" : c == 2 ? b = "nd" : c == 3 && (b = "rd"))
    return b
  }

  var qm = [{
      test: /^DayOfMonth$/,
      generator: function (a) {if (a = a.data(p)) return a.getDate()}
    }, {
      test: /^DayOfMonthWithZero$/,
      generator: function (a) {if (a = a.data(p)) return a.getDate() < 10 ? "0" + a.getDate() : a.getDate()}
    }, {
      test: /^DayOfWeek$/,
      generator: function (a) {if (a = a.data(p)) return nm[a.getDay()]}
    }, {
      test: /^ShortDayOfWeek$/,
      generator: function (a) {if (a = a.data(p)) return nm[a.getDay()].substr(0, 3)}
    }, { test: /^DayOfWeekNumber$/, generator: function (a) {if (a = a.data(p)) return a.getDay() || 7} }, {
      test: /^DayOfMonthSuffix$/, generator: function (a) {
        if (a =
          a.data(p)) return pm(a.getDate())
      }
    }, {
      test: /^DayOfYear$/,
      generator: function (a) {if (a = a.data(p)) return Math.ceil((a - new Date(a.getFullYear(), 0, 1) + 1) / 864E5)}
    }, {
      test: /^WeekOfYear$/,
      generator: function (a) {if (a = a.data(p)) return Math.ceil(Math.ceil((a - new Date(a.getFullYear(), 0, 1) + 1) / 864E5) / 7)}
    }, { test: /^Month$/, generator: function (a) {if (a = a.data(p)) return om[a.getMonth()]} }, {
      test: /^ShortMonth$/,
      generator: function (a) {if (a = a.data(p)) return om[a.getMonth()].substr(0, 3)}
    }, {
      test: /^MonthNumber$/, generator: function (a) {
        if (a =
          a.data(p)) return a.getMonth() + 1
      }
    }, {
      test: /^MonthNumberWithZero$/,
      generator: function (a) {if (a = a.data(p)) return a.getMonth() < 9 ? "0" + (a.getMonth() + 1) : a.getMonth() + 1}
    }, { test: /^Year$/, generator: function (a) {if (a = a.data(p)) return a.getFullYear()} }, {
      test: /^ShortYear$/,
      generator: function (a) {if (a = a.data(p)) return a.getFullYear().toString().substr(2)}
    }, { test: /^AmPm$/, generator: function (a) {if (a = a.data(p)) return a.getHours() < 12 ? "am" : "pm"} }, {
      test: /^CapitalAmPm$/, generator: function (a) {
        if (a = a.data(p)) return a.getHours() <
        12 ? "AM" : "PM"
      }
    }, {
      test: /^12Hour$/,
      generator: function (a) {if (a = a.data(p)) return a.getHours() > 12 ? a.getHours() - 12 : a.getHours() || "12"}
    }, { test: /^24Hour$/, generator: function (a) {if (a = a.data(p)) return a.getHours()} }, {
      test: /^12HourWithZero$/,
      generator: function (a) {if (a = a.data(p)) return a = a.getHours() > 12 ? a.getHours() - 12 : a.getHours() || "12", a < 10 ? "0" + a : a}
    }, {
      test: /^Minutes$/,
      generator: function (a) {if (a = a.data(p)) return a = a.getMinutes(), a < 10 ? "0" + a : a}
    }, {
      test: /^Seconds$/, generator: function (a) {
        if (a = a.data(p)) return a = a.getSeconds(),
          a < 10 ? "0" + a : a
      }
    }, {
      test: /^Beats$/,
      generator: function (a) {if (a = a.data(p)) return a = a.getMilliseconds(), a < 10 ? "00" + a : a < 100 ? "0" + a : a}
    }, {
      test: /^Timestamp$/,
      generator: function (a) {if (a = a.data(p)) return Math.ceil(a.getTime() / 1E3)}
    }, { test: /^FormattedTime$/, generator: function (a) {if (a = a.data(p)) return a.toLocaleTimeString()} }, {
      test: /^TimeAgo$/, generator: function (a) {
        var b = a.data(p)
        if (b) {
          a = [b.getDate(), pm(b.getDate()), " ", om[b.getMonth()]].join("")
          b.getFullYear() < (new Date).getFullYear() && (a += " " + b.getFullYear())
          b = ((new Date).getTime() - b.getTime()) / 1E3
          var c = Math.floor(b / 86400)
          return isNaN(c) || c < 0 || c >= 31 ? a : c == 0 && (b < 60 && "just now" || b < 120 && "1 minute ago" || b < 3600 && Math.floor(b / 60) + " minutes ago" || b < 7200 && "1 hour ago" || b < 86400 && Math.floor(b / 3600) + " hours ago") || c == 1 && "Yesterday" || c < 7 && c + " days ago" || c < 14 && "1 week ago" || c < 31 && Math.ceil(c / 7) + " weeks ago"
        }
      }
    }, { test: /^ISO8601$/, generator: function (a) {if (a = a.data(p)) return Ck(a)} }],
    rm = /^((?:Photo|Portrait)URL)(?:-(\d+)(sq)?)?$/, sm = /^(Video)(?:-(\d+))?$/, tm = [{
      test: "color:",
      generator: function (a) {
        var b = a.data(this.name) || this.term
        if (b) {
          var c = new Tl
          if (Vl.test(b)) Ul(c, b) else if (bm.test(b)) Wl(c, b) else if (cm.test(b)) $l(c, b) else if (fm.test(b)) a:{
            var d
            if (b !== void 0 && b !== !1) {
              if (typeof b === z && e === void 0) if (d = fm.exec(b)) {
                b = d[1]
                var e = d[2]
                d = d[3]
              } else break a
              Xl(c, b, e, d, 1)
            } else Xl(c, !1)
          } else Yl.test(b) ? Xl(c, b) : c.name(b)
          for (var f in this.attributes) if (f in c && typeof c[f] === r) c[f](jm(this, f, a))
          return c.a == 0 ? Ac : $l(c)
        }
        return Ac
      }
    }, {
      test: "font:", generator: function (a) {
        a = a.data(this.name) ||
          this.term
        a = a !== void 0 ? a : "sans-serif"
        km(a)
        return a
      }
    }, {
      test: "image:", generator: function (a) {
        a = a.data(this.name)
        return a !== void 0 ? a : vb
      }
    }], um = {
      "lang:By PostAuthorName": "By {PostAuthorName}",
      "lang:By PostAuthorName 2": "Posted by <a class=\"url fn\" href=\"{PostAuthorURL}\" rel=\"author\" itemprop=\"author\">{PostAuthorName}</a>",
      "lang:Click Here": "click here",
      "lang:Location GeoLocationName": "Location: <a class=\"url fn\" href=\"{GeoLocationURL}\" itemprop=\"contentLocation\">{GeoLocationName}</a>",
      "lang:No results for SearchQuery": "No results for: {HTMLEscapedSearchQuery}",
      "lang:No results for SearchQuery2": "No results for <span class=\"search_query\">{HTMLEscapedSearchQuery}</span>",
      "lang:Show all SearchResultCount": "Show all {SearchResultCount} results",
      "lang:Post Interstitial Snippet": "This summary is not available. Please {ClickHere} to view the post.",
      "lang:Posted TimeAgo": "Posted {TimeAgo}",
      "lang:Posted TimeAgo by PostAuthorName": "Posted <abbr class=\"time published\" title=\"{ISO8601}\" itemprop=\"datePublished\">{TimeAgo}</abbr> by {PostAuthorName}",
      "lang:Posted TimeAgo by PostAuthorName 2": "Posted <abbr class=\"time published\" title=\"{ISO8601}\" itemprop=\"datePublished\">{TimeAgo}</abbr> by <a class=\"url fn\" href=\"{PostAuthorURL}\" rel=\"author\" itemprop=\"author\">{PostAuthorName}</a>",
      "lang:Posted at FormattedTime": "Posted at <abbr class=\"time published\" title=\"{ISO8601}\" itemprop=\"datePublished\">{12Hour}:{Minutes} {AmPm}</abbr>"
    }, vm = 0, wm = void 0
  for (; wm = qm[vm]; vm++) G().generator(wm.test, wm.generator)
  G().generator(rm, function (a) {
    var b = rm.exec(this.name), c = a.data(b[1])
    if (c) {
      var d = b[2] || jm(this, "size", a)
      a = b[3] == "sq" || !!jm(this, "square", a)
      if (d && !isNaN(parseInt(d, 10))) return kk(c, {
        O: parseInt(d, 10),
        od: a !== void 0 ? a : !0
      }).replace("'", "%27")
    }
    return c ? c : vb
  })
  G().generator(sm, function (a) {
    var b = sm.exec(this.name), c = a.data(b[1])
    if (c && (a = b[2] || jm(this, "size", a)) && !isNaN(parseInt(a, 10))) {
      var d = parseInt(a, 10), e = Math.ceil(d / 16 * 9)
      c = Jd(c, { tag: Rb, replace: function (f) {return f.attr("width", d).attr(Mb, e).encode()} })
    }
    return c
  })
  G().generator(/^Summary$/, function (a) {
    var b = jm(this, "text", a)
    if (!b) {
      if (a.data("Summary")) return a.data("Summary")
      b = a.data("PlaintextBody")
    }
    a = jm(this, "length", a) || 300
    return b && b.substring ? (b = b.substring(0, a).trim(), a = b.match(/(?:.|\n|\r)*(\.(?=\s|\n|\r)|\.$)/), (a ? zk(a[0]) : zk(b)).replace(/\n/g, "<br/>")) : b
  })
  G().generator(/^Snippet$/, function (a) {
    var b = jm(this, "text", a)
    if (!b) {
      if (a.data("Snippet")) return zk(a.data("Snippet"))
      b = a.data("PlaintextBody")
    }
    b = zk(b)
    var c = jm(this, "before", a) || 50, d = jm(this, "after", a) || 300, e = jm(this, "length", a) || 300,
      f = jm(this, "term", a) || "", h = jm(this, kb, a) || "term"
    if (b) {
      if (f && (a = b.toLowerCase().indexOf(f.toLowerCase()), a >= 0)) {
        var k = b.substr(0, a)
        var l = b.substr(a, f.length), m = b.substr(a + f.length, d)
        k.length > c && (a = k.indexOf(" ", k.length - c), k = "..." + (a >= 0 ? k.substr(a + 1) : k.substr(k.length -
          c)))
        m.length && (a = m.lastIndexOf(" "), m = (a >= 0 ? m.substr(0, a) : m.substr(0, d)) + "...")
        k = k + l + m
        h && (k = k.replace(new RegExp(f, "gim"), function (n) {return "<span class=\"" + h + "\">" + n + "</span>"}))
      }
      k || (k = b.substring(0, e).trim())
      return k
    }
    return b
  })
  G().generator("lang:", function (a) {
    var b = a.data(this.name)
    return (b = b || um[this.name]) ? b.replace(/{\w+}/g, function (c) {return (new al).init(c).apply(a)}) : this.term
  })
  for (var xm = 0, ym = void 0; ym = tm[xm]; xm++) G().generator(ym.test, ym.generator)

  function zm(a) {
    this.Tj = a
    this.Sj = []
  }

  zm.prototype.items = function () {return this.Sj}
  zm.prototype.resource = function () {return this.Tj}

  function Am(a, b) {
    this.S = a
    this.te = -1
    this.la = b || 25
    this.ac = []
    this.ec = []
    this.tc = this.mf = !1
    this.fd = !0
    this.Rm = this.Wj.bind(this)
    this.Uj = this.Vj.bind(this)
    this.Li = Bm(this.pl.bind(this))
  }

  A = Am.prototype
  A.items = function () {return this.S.items()}
  A.resources = function () {return [this.S.resource()]}
  A.waiting = function () {return this.tc}
  A.hasNext = function (a) {
    a !== void 0 && (this.fd = a)
    return this.fd != 0 || this.te == -1
  }
  A.reset = function () {this.te = -1}
  A.next = function (a) {
    var b = ++this.te
    b < this.ac.length ? a && a(this.ac[b]) : this.fd ? (this.ec.push({
      Qa: a,
      index: b
    }), this.tc || this.mf || this.Li()) : a && a(null)
  }
  A.pl = function () {
    var a = this.Pe()
    a && (this.Ud = [(new Date).getTime().toString(36), ((1 + Math.random()) * 65536 | 0).toString(36)].join("-"), xd().notify(Cb, this.Ud), fetch(a).then(function (b) {return b.text()}).then(function (b) {return JSON.parse(b)}).then(this.Rm).catch(this.Uj), this.tc = !0)
  }
  A.Wj = function (a) {
    xd().notify(Bb, this.Ud)
    if (a = this.kf(a)) {
      this.ac.push(a)
      var b;
      (b = this.items()).push.apply(b, Yc(a))
    }
    this.tc = !1
    Cm(this)
  }
  A.Vj = function () {
    xd().notify(Bb, this.Ud)
    this.tc = !1
    Cm(this)
  }

  function Cm(a) {
    a.mf = !0
    var b = a.ec
    a.ec = []
    for (var c, d = 0; c = b[d]; d++) c.index < a.ac.length ? c.Qa && c.Qa(a.ac[c.index]) : a.fd ? a.ec.push(c) : c.Qa && c.Qa(null)
    a.ec.length > 0 && a.Li()
    a.mf = !1
    delete a.Ud
  }

  A.Pe = function () {return null}
  A.kf = function () {return null}

  function Bm(a) {
    function b() {
      var k = f >= h ? f : f + 1
      f = new Date - d > (Math.pow(2, k + 1) - 1) * 50 ? Math.max(0, f - 1) : k
      e = (Math.pow(2, f) - 1) * 50
      d = new Date
    }

    var c = null, d = new Date, e = 0, f = 0, h = Math.floor(Math.log(600) / Math.LN2)
    return function () {
      var k = this, l = new Date - d
      clearTimeout(c)
      if (l >= e) b(), a.apply(this, arguments) else {
        var m = arguments
        c = setTimeout(function () {
          b()
          a.apply(k, m)
        }, e - l + 1)
      }
    }
  }

  function Dm() {}

  function Em() {}

  function Fm() {}

  function Gm() {}

  function Hm(a, b, c, d) {nk.call(this, a, b, c, d)}

  D(Hm, Ak)
  Hm.prototype.data = function () {
    var a = Ak.prototype.data.call(this)
    a.PostID = null
    a.PageID = this.id
    return a
  }

  function Im(a) {
    if (a && a.feed) {
      var b = new Fm, c = a.feed, d = new Em
      d.title = X(c.title)
      d.subtitle = X(c.subtitle)
      d.updated = Bk(X(c.updated))
      var e = /blog-(\d+)/.exec(X(c.id))
      d.id = e && e[1] || c.id
      c.author && (d.authors = Jm(c))
      b.bd = d
      b.fb = Km(a.feed)
      b.items = []
      if (a.feed.entry) for (c = 0; d = a.feed.entry[c]; c++) (d = Lm(d)) && d.published && !d.Gi && (d.sourceTitle = b.bd ? b.bd.title : void 0, b.items.push(d))
      b.items[0] && (b.bd.published = b.items[0].published)
      return b
    }
  }

  function Lm(a) {
    if (a) {
      var b = a.tag || X(a.id), c = a && /post-/i.test(b) && new Ak || a && /page-/i.test(b) && new Hm || new nk;
      (b = /blog-(\d+)\.\w{4}-(\d+)/.exec(X(a.id))) ? (c.blogId = b[1], c.id = b[2]) : c.id = a.id
      c.title = X(a.title)
      c.body = a.content ? X(a.content) : X(a.summary) + "..."
      c.updated = Bk(X(a.updated))
      c.published = Bk(X(a.published))
      c.Gi = !1
      a.app$control && a.app$control.app$draft && (c.Gi = a.app$control.app$draft.$t == "yes")
      if (a.replies || a.thr$total) c.commentCount = parseInt(X(a.replies || a.thr$total), 10)
      c.allowComments = a.thr$total !==
        void 0
      c.interstitial = a.interstitial !== void 0 && a.interstitial.$t === Bc
      b = Jm(a)
      b.length && (c.author = b[0])
      a.link && (Array.isArray(a.link) ? a.link.filter(function (d) {d.rel == "alternate" ? c.url = d.href : d.rel == "related" && (c.relatedUrl = d.href)}) : c.url = a.link, c.url && (b = F.decode(c.url), b.scheme = F.decode().scheme, c.url = b.encode(), b.scheme = "http", c.fl = b.encode(), b = c.url.split("/"), b.length >= 2 && (c.baseUrl = b[0] + "//" + b[2])))
      a.enclosure && a.enclosure.filter(function (d) {d.type == "related" && (c.relatedUrl = d.url)})
      a.Jk ?
        c.tags = a.Jk.slice(0) : a.category && (c.tags = a.category.map(function (d) {return d.term}))
      c.geoLocation = Mm(a)
      return c
    }
  }

  function Km(a) {
    return {
      total: parseInt(X(a.totalResults || a.openSearch$totalResults), 10),
      startIndex: parseInt(X(a.startIndex || a.openSearch$startIndex), 10),
      la: a.openSearch$itemsPerPage === void 0 ? void 0 : parseInt(X(a.openSearch$itemsPerPage), 10)
    }
  }

  function Jm(a) {
    var b = []
    a.author && (Array.isArray(a.author) ? b = a.author.map(function (c) {return new sd(X(c.name), X(c.uri), c.gd$image ? c.gd$image.src : void 0)}) : b.push(new sd(X(a.author.name), X(a.author.uri))))
    return b
  }

  function Mm(a) {
    if (a.georss$featurename && a.georss$point) {
      var b = X(a.georss$point).split(" ")
      if (b.length == 2) return new zd(X(a.georss$featurename), parseFloat(b[0], 10), parseFloat(b[1], 10))
    }
  }

  function Nm(a) {
    var b = {}
    a = a.gd$extendedProperty || []
    Array.isArray(a) && a.map(function (c) {b[c.name] = c.value})
    return b
  }

  function X(a) {return a && a.$t !== void 0 ? a.$t : a}

  function Om(a) {
    this.Fj = a
    this.fc = []
  }

  function Pm(a, b, c, d, e) {
    var f = a.fc.filter(function (h) {return h.identifier == b}).length > 0
    a.fc.push({ Qa: e, identifier: b })
    if (f) return !0
    xd().notify(Cb, b)
    fetch(d).then(function (h) {return h.text()}).then(function (h) {return JSON.parse(h)}).then(function (h) {
      xd().notify(Bb, b)
      c == uc ? h && h.entry ? h = Lm(h.entry) : (h && h.feed && (h = Im(h), a.ej = h && h.items), h = Qm(a, b)) : h = h && h.entry ? Lm(h.entry) : h && h.feed && h.feed.entry.length == 1 ? Im(h).items[0] : void 0
      if (h) {
        var k = a.fc
        a.fc = []
        for (var l, m = 0; l = k[m]; m++) l.identifier == b ? l.Qa(h) :
          a.fc.push(l)
      }
    }).catch(function () {xd().notify(Bb, b)})
    return !0
  }

  function Qm(a, b) {
    if (a.ej) return a.ej.find(function (c) {
      if (/^\d+$/.test(b)) return c.id == b
      var d = Rm(b)
      c = c.url && Rm(c.url)
      return d == c
    })
  }

  function Rm(a) {
    var b = xd().getSettings().blog_url
    if (a.indexOf(b) == 0) return a = a.replace(b, ""), b[b.length - 1] == "/" && (a = "/" + a), a
    b = F.decode(a).root()
    return a.replace(b, "")
  }

  function Sm(a, b) {
    Am.call(this, a, b || 25)
    this.ue = (b = Tm(this)) && b.Ib ? b.Ib.getTime() : void 0
    this.uf = 1
    this.qg = (b = Tm(this)) && b.Jb ? b.Jb.getTime() : void 0
    this.ve = a.resource().filter && (a.resource().filter.query || "").trim()
    this.hf = a.resource().filter && (a.resource().filter.jm || "").trim()
    this.Qd = a.resource().filter && (a.resource().filter.Yl || "").trim()
  }

  D(Sm, Am)
  Sm.prototype.Pe = function () {
    var a = xd().getSettings(), b = !!this.Qd
    var c = (c = Tm(this)) && c.tags ? c.tags : []
    c = c.length ? "/-/" + encodeURIComponent(c[0]).replace(/'/g, "%27") : ""
    c = new URL(["/feeds", b ? "/pages/default" : "/posts/default", c].join(""), this.S.resource().url || "")
    c.searchParams.set("alt", "json")
    c.searchParams.set("v", "2")
    c.searchParams.set(xb, "1")
    b || (c.searchParams.set("orderby", fc), c.searchParams.set("max-results", "" + this.la))
    a.feeds_api == 3 && c.searchParams.set("proxy_feed", Bc)
    this.ue && c.searchParams.set("published-max",
      Ck(new Date(this.ue)))
    this.qg && c.searchParams.set("published-min", Ck(new Date(this.qg)))
    this.ve && (c.searchParams.set("q", this.ve.replace(/(\s)+/g, "+")), "best" == this.S.resource().filter.Od && c.searchParams.set("orderby", "relevance"), c.searchParams.set("start-index", "" + this.uf))
    this.hf && c.searchParams.set("path", this.hf)
    F.decode().scheme == Ob && c.searchParams.set(kc, Bc)
    return c.href
  }

  function Tm(a) {if (a.S || a.S.resource()) return a.S.resource().filter}

  Sm.prototype.kf = function (a) {
    a = Im(a)
    var b = !!this.Qd
    a && a.items && a.items.length && (b && (a.items = [Um(this, a)]), (this.S.resource().filter && this.S.resource().filter.Od || "recent") != "best" && a.items.sort(function (c, d) {return d.published.getTime() - c.published.getTime()}), this.ve ? this.uf += a.fb.la : this.ue = a.items[a.items.length - 1].published.getTime() - 1)
    Object.assign(this.S.resource(), a.bd)
    a.fb && a.fb.total ? this.S.resource().total = a.fb.total : this.S.resource().total = a && a.items && a.items.length || 0;
    (!a.items || !a.items.length ||
      a.fb.startIndex + a.fb.la > a.fb.total || this.hf || this.Qd) && this.hasNext(!1)
    return a && a.items
  }

  function Um(a, b) {
    b = b.items
    for (var c = b.length, d = 0; d < c; d++) if ((new Fd(b[d].url)).path == a.Qd) return b[d]
    return null
  }

  function Vm() {
    G().converter(Ak, this.lg)
    G().converter(Hm, this.lg)
  }

  Vm.prototype.owns = function (a) {
    a = new Fd(a)
    return a.scheme && a.scheme != "http" && a.scheme != Ob ? !1 : !0
  }
  Vm.prototype.iterator = function (a, b, c) {return new Sm(new zm(new ud(a, b)), c)}
  Vm.prototype.lg = function (a, b) {
    a.Le || (a.Le = a.data())
    b.scope(a instanceof Hm ? "Page" : "Post", a.Le)
    return a.Le
  }

  function Wm(a, b) {
    this.ua = a
    this.Ne = !1
    this.gb = 0
    this.Tb = this.la(b) || 1
  }

  A = Wm.prototype
  A.la = function (a) {
    a !== void 0 && (this.Tb = parseInt(a, 10), this.Tb = this.Tb > 0 ? this.Tb : 1)
    return this.Tb
  }
  A.items = function () {return this.ua.items().slice(0, this.gb)}
  A.resources = function () {return this.ua.resources()}
  A.waiting = function () {return this.ua.waiting() || !!this.Ab}
  A.hasNext = function () {return this.ua.items().length >= this.gb + 1 || this.ua.hasNext()}
  A.reset = function () {
    this.ua.reset()
    this.gb = 0
    this.Ne = !1
  }
  A.next = function (a) {
    this.Ab = a || this.Ab
    clearTimeout(this.El)
    this.El = setTimeout(this.om.bind(this), 0)
  }
  A.om = function () {
    if (this.ua.items().length >= this.gb + 1) {
      var a = Math.min(this.gb + this.Tb, this.ua.items().length), b = this.ua.items().slice(this.gb, a)
      this.gb = a
      a = this.Ab
      this.Ab = null
      a && a(b)
    } else this.ua.waiting() || (this.Ne ? (b = this.Ab, this.Ab = null, b && b(null)) : this.ua.next(this.Dl.bind(this)))
  }
  A.Dl = function (a) {
    a == null && (this.Ne = !0)
    this.next(null)
  }

  function Xm() {
    this.settings = {}
    this.configure()
    this.Hf = []
    this.Sc = new Ek
    Ym || (Ym = new Vm)
  }

  var Ym
  A = Xm.prototype
  A.notify = function (a, b) {
    var c = Array.prototype.slice.call(arguments), d = c.shift()
    this.Sc.notify.apply(this.Sc, [d].concat(Yc(c)))
    return this
  }
  A.addListener = function (a, b) {this.Sc.addListener(a, b)}
  A.removeListener = function (a, b) {this.Sc.removeListener(a, b)}
  A.configure = function (a) {
    this.settings = Object.assign({}, Zm, this.settings, a)
    return this
  }
  A.open = function (a, b) {
    b = this.iterator(a, b)
    this.V = new Wm(b, this.Ie())
    this.cd = new Om(a)
    return this.V
  }
  A.items = function () {return this.V ? this.V.items() : []}
  A.resources = function () {return this.V ? this.V.resources() : []}
  A.waiting = function () {return this.V ? this.V.waiting() : !1}
  A.hasNext = function () {return this.V ? this.V.hasNext() : !1}
  A.next = function (a) {
    if (this.V) {
      var b, c = 0
      arguments[0] && (typeof arguments[0] === r ? b = arguments[0] : c = parseInt(arguments[0], 10))
      arguments[1] && (typeof arguments[1] === r ? b = arguments[1] : c = parseInt(arguments[1], 10))
      !isNaN(c) && c > 0 && this.V instanceof Wm && this.V.la(c)
      this.we = b
      this.V.next(this.Xj.bind(this))
    }
  }
  A.reset = function () {this.V && this.V.reset()}
  A.Xj = function (a) {
    this.notify(Wb, a)
    this.we && (this.we(a), delete this.we)
  }
  A.find = function (a) {
    if (a) {
      var b = /\./.test(a)
      b && (a = F.decode(a).encode(!1, !1))
      var c = function (d) {return a == (b ? d.url : d.id)}
      if ((c = this.items().filter(c).concat(this.Hf.filter(c))) && c.length > 0) return c[0]
    }
  }
  A.iterator = function (a, b, c) {if (Ym && Ym.owns(a)) return Ym.iterator(a, b, c || this.Ie())}
  A.post = function (a, b) {
    var c
    if (c = this.cd) {
      c = this.cd
      b = this.wg.bind(this, b)
      var d = Aa, e
      if (/^\d+$/.test(a)) d += "/" + a else {
        var f = Rm(a)
        f != "/" && (e = f)
      }
      d = new URL(d, c.Fj)
      d.searchParams.set("alt", "json")
      d.searchParams.set("v", "2")
      d.searchParams.set(xb, "1")
      e && d.searchParams.set("path", e)
      F.decode().scheme == Ob && d.searchParams.set(kc, Bc)
      c = Pm(c, a, "item", d.href, b)
    }
    return !!c
  }
  A.page = function (a, b) {
    var c
    if (c = this.cd) {
      c = this.cd
      b = this.wg.bind(this, b)
      var d = Qm(c, a)
      d ? (b && b(d), c = !1) : (d = "/feeds/pages/default", /^\d+$/.test(a) && (d += "/" + a), d = new URL(d, c.Fj), d.searchParams.set("alt", "json"), d.searchParams.set("v", "2"), d.searchParams.set(xb, "1"), F.decode().scheme == Ob && d.searchParams.set(kc, Bc), c = Pm(c, a, uc, d.href, b))
    }
    return !!c
  }
  A.wg = function (a, b) {
    b && this.Hf.push(b)
    a(b)
  }
  A.Ie = function () {return this.settings.batchSize}
  A.getSettings = function () {return this.settings}
  var Zm = { blogger_base: "https://www.blogger.com", batchSize: 25 }
  wd = function () {return new Xm}

  function $m(a, b) {Am.call(this, a, b || 50)}

  D($m, Am)
  $m.prototype.Pe = function () {
    var a = xd().getSettings(),
      b = new URL(["/feeds/", this.S.resource().id, "/comments/default"].join(""), a.blog_url)
    b.searchParams.set("alt", "json")
    b.searchParams.set("v", "2")
    b.searchParams.set(xb, "1")
    b.searchParams.set("orderby", fc)
    b.searchParams.set("reverse", Ab)
    b.searchParams.set("max-results", "" + this.la)
    a.feeds_api == 3 && b.searchParams.set("proxy_feed", Bc)
    this.If && b.searchParams.set("published-min", Ck(new Date(this.If)))
    F.decode().scheme == Ob && b.searchParams.set(kc, Bc)
    return b.href
  }
  $m.prototype.kf = function (a) {
    if (a && a.feed) {
      var b = new Gm
      b.Gf = Km(a.feed)
      b.comments = []
      if (a.feed.entry) for (var c, d = 0; c = a.feed.entry[d]; d++) {
        var e = b.comments, f = e.push, h = c
        c = new Dm
        var k = /blog-(\d+).post-(\d+)/.exec(X(h.id))
        k && (c.id = k[2])
        c.extensions = Nm(h)
        c.body = X(h.content || h.summary)
        c.timestamp = Bk(X(h.published)).getTime() + ""
        c.displayTime = c.extensions["blogger.displayTime"]
        c.extensions["blogger.contentRemoved"] == Bc && (c.body = "<span class=\"deleted-comment\">" + c.body + "</span>")
        if (k = Jm(h)) c.author =
          k[0]
        h.link && (h.link[2] && h.link[2].href && (k = F.decode(h.link[2].href), k.scheme = F.decode().scheme, c.url = c.link = c.permalink = k.encode()), h.link[3] && (h = /.*comments\/default\/(\d+)\?.*/.exec(h.link[3].href))) && (c.parentId = h[1])
        f.call(e, c)
      }
      a = b
    } else a = void 0
    if (b = a && a.comments && a.comments.length) this.If = parseInt(a.comments[a.comments.length - 1].timestamp, 10) + 1
    d = this.S.resource() || 0;
    (!b || a.Gf.startIndex + a.Gf.la > d) && this.hasNext(!1)
    return a && a.comments
  }

  function an(a, b, c) {
    var d = window.jstiming
    if (d && d.getLabels && d.getTick) {
      var e = {}
      for (a = a ? a.slice(0) : []; a.length > 0;) for (var f = a.shift(), h = d.getLabels(f) || [], k = 0; k < h.length; ++k) if (h[k][0] !== "_" && h[k] !== tc) {
        var l = d.getTick(f, h[k])
        e[f.name] ? e[f.name].push({ label: h[k], tick: l }) : e[f.name] = [{ label: h[k], tick: l }]
      }
      for (var m in e) {
        d = []
        for (a = 0; a < e[m].length; ++a) d.push(e[m][a].label + "." + e[m][a].tick)
        a = Object.assign({}, c)
        b && (a.e = b)
        f = []
        for (var n in a) f.push(n + "=" + a[n])
        d = ["//csi.gstatic.com/csi?v=3&s=blogger",
          "&action=" + m, "&it=" + d.join(","), f ? "&" + f.join("&") : ""].join("");
        (new Image).src = d
      }
    }
  }

  function bn(a, b) {Li(b, function (c, d) {d == vc ? a.style.cssText = c : d == kb ? a.className = c : d == "for" ? a.htmlFor = c : cn.hasOwnProperty(d) ? a.setAttribute(cn[d], c) : d.lastIndexOf("aria-", 0) == 0 || d.lastIndexOf("data-", 0) == 0 ? a.setAttribute(d, c) : a[d] = c})}

  var cn = {
    cellpadding: "cellPadding",
    cellspacing: "cellSpacing",
    colspan: "colSpan",
    frameborder: "frameBorder",
    height: Mb,
    maxlength: "maxLength",
    nonce: "nonce",
    role: "role",
    rowspan: "rowSpan",
    type: "type",
    usemap: "useMap",
    valign: "vAlign",
    width: "width"
  }

  function dn(a, b, c) {
    var d = arguments, e = document, f = d[1], h = en(e, String(d[0]))
    f && (typeof f === z ? h.className = f : Array.isArray(f) ? h.className = f.join(" ") : bn(h, f))
    d.length > 2 && fn(e, h, d, 2)
    return h
  }

  function fn(a, b, c, d) {
    function e(k) {k && b.appendChild(typeof k === z ? a.createTextNode(k) : k)}

    for (; d < c.length; d++) {
      var f = c[d]
      if (!hd(f) || id(f) && f.nodeType > 0) e(f) else {
        a:{
          if (f && typeof f.length == t) {
            if (id(f)) {
              var h = typeof f.item == r || typeof f.item == z
              break a
            }
            if (typeof f === r) {
              h = typeof f.item == r
              break a
            }
          }
          h = !1
        }
        ve(h ? xe(f) : f, e)
      }
    }
  }

  function en(a, b) {
    b = String(b)
    a.contentType === "application/xhtml+xml" && (b = b.toLowerCase())
    return a.createElement(b)
  }

  function gn(a) {
    H(a, "Node cannot be null or undefined.")
    return a.nodeType == 9 ? a : a.ownerDocument || a.document
  }

  function hn(a) {this.Rk = a || E.document || document}

  hn.prototype.append = function (a, b) {fn(gn(a), a, arguments, 1)}
  hn.prototype.contains = function (a, b) {
    if (!a || !b) return !1
    if (a.contains && b.nodeType == 1) return a == b || a.contains(b)
    if (typeof a.compareDocumentPosition != "undefined") return a == b || !!(a.compareDocumentPosition(b) & 16)
    for (; b && a != b;) b = b.parentNode
    return b == a
  }

  function Y(a, b, c) {
    if (typeof b === z) (b = jn(a, b)) && (a.style[b] = c) else for (var d in b) {
      c = a
      var e = b[d], f = jn(c, d)
      f && (c.style[f] = e)
    }
  }

  var kn = {}

  function jn(a, b) {
    var c = kn[b]
    if (!c) {
      var d = Hi(b)
      c = d
      a.style[d] === void 0 && (d = (ze ? "Webkit" : ye ? "Moz" : null) + Ii(d), a.style[d] !== void 0 && (c = d))
      kn[b] = c
    }
    return c
  }

  function ln(a, b) {
    var c = gn(a)
    return c.defaultView && c.defaultView.getComputedStyle && (a = c.defaultView.getComputedStyle(a, null)) ? a[b] || a.getPropertyValue(b) || "" : ""
  }

  function mn(a, b, c) {
    a.style.left = nn(b, !1)
    a.style.top = nn(c, !1)
  }

  function on(a, b, c) {
    if (b instanceof jj) c = b.height, b = b.width else if (c == void 0) throw Error("missing height argument")
    a.style.width = nn(b, !0)
    a.style.height = nn(c, !0)
  }

  function nn(a, b) {
    typeof a == t && (a = (b ? Math.round(a) : a) + hc)
    return a
  }

  function pn(a) {
    var b = qn
    if ((ln(a, "display") || (a.currentStyle ? a.currentStyle.display : null) || a.style && a.style.display) != Yb) return b(a)
    var c = a.style, d = c.display, e = c.visibility, f = c.position
    c.visibility = "hidden"
    c.position = "absolute"
    c.display = "inline"
    a = b(a)
    c.display = d
    c.position = f
    c.visibility = e
    return a
  }

  function qn(a) {
    var b = a.offsetWidth, c = a.offsetHeight, d = ze && !b && !c
    if ((b === void 0 || d) && a.getBoundingClientRect) {
      try {var e = a.getBoundingClientRect()} catch (f) {
        e = {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        }
      }
      a = e
      return new jj(a.right - a.left, a.bottom - a.top)
    }
    return new jj(b, c)
  }

  function rn(a, b) {a.style.display = b ? "" : Yb}

  var sn = Zc(["//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"])

  function tn() {
    this.Sd = []
    this.xg = !1
    this.Bg = 1
    this.pj = {}
  }

  tn.prototype.init = function (a) {
    var b = this
    this.A = a
    if (this.A.headless()) return this
    this.A.addListener(Ec, function () {un(b, { beforeRender: b.Hm.bind(b) })})
    return this
  }
  tn.prototype.Hm = function (a) {
    var b = this.A && this.A.getAnalyticsId()
    b && (a.analytics_id = b)
  }

  function un(a, b) {
    var c = document.querySelectorAll(".adsense")
    c && (vn(a) ? wn(a, c, b) : a.Sd.push(function () {wn(a, c, b)}))
  }

  function wn(a, b, c) {
    window.google_persistent_state_async = {}
    window.google_unique_id = null
    b.forEach(function (d) {
      var e = {}, f
      for (f in xn) {
        var h = d.dataset[f]
        h && (e[f] = h)
      }
      e = Object.assign({}, xn, e, c)
      yn(a, d, e)
    })
  }

  function vn(a) {
    var b = window.adsbygoogle
    if (b && b.push) return !0
    if (!a.xg) {
      a.xg = !0
      b = dn(Oa, { type: xc })
      var c = dk(sn)
      b.src = ii(c)
      Fi(b)
      b.onload = a.Mk.bind(a);
      (a = document.querySelector(Kb)) && a.append(b)
    }
    return !1
  }

  tn.prototype.Mk = function () {
    for (var a = 0; a < this.Sd.length; ++a) this.Sd[a]()
    this.Sd = []
  }

  function yn(a, b, c) {
    var d = {}, e = b.dataset.Nk
    e && (d = a.pj[e] || {})
    var f = zn(c)
    c && typeof c.beforeRender === r && c.beforeRender(f)
    c = !1
    if (d.kl) for (var h in f) {
      if (f[h] !== d[h]) {
        c = !0
        break
      }
    } else c = !0
    if (c && f.format && f.client) {
      for (; b.firstChild;) b.removeChild(b.firstChild)
      var k = document.createElement("ins")
      U(k, "adsbygoogle")
      f.client && k.setAttribute("data-ad-client", f.client)
      f.host && k.setAttribute("data-ad-host", f.host)
      f.slot && k.setAttribute("data-ad-slot", f.slot)
      f.type && k.setAttribute("data-ad-type", f.type)
      d = An[f.format]
      Y(k, "display", "block")
      d.Vd ? k.setAttribute("data-ad-format", d.format) : on(k, d.width, d.height)
      f.analytics_id && k.setAttribute("data-analytics-uacct", f.analytics_id)
      b.append(k)
      f.kl = !0
      e || (e = "" + a.Bg, a.Bg++)
      b.dataset.Nk = e
      a.pj[e] = f
      setTimeout(function () {try {window.adsbygoogle.push({ element: k })} catch (l) {}}, 0)
    }
  }

  function zn(a) {
    var b = {}
    Bn.forEach(function (d) {b[d] = a[d]})
    b.format && (b.format = b.format.toLowerCase().replace(/\s|_/g, ""))
    b.type && (b.type = b.type.toLowerCase().split(/\s|_|,|\//).filter(function (d) {return d == "text" || d == "image"}).sort().join(","))
    var c = An[a.format] ? a.format : "auto"
    b.format = c
    return b
  }

  var xn = {
    analytics_id: void 0,
    format: void 0,
    type: void 0,
    slot: void 0,
    host: void 0,
    client: void 0,
    beforeRender: void 0
  }, Bn = "analytics_id client format host slot type".split(" "), An = {
    auto: { format: "auto", Vd: !0 },
    horizontal: { format: "horizontal", Vd: !0 },
    vertical: { format: "vertical", Vd: !0 },
    rectangle: { format: "rectangle", Vd: !0 },
    banner: { format: "BANNER", width: 468, height: 60 },
    button: { format: "BUTTON", width: 125, height: 125 },
    halfbanner: { format: "HALF_BANNER", width: 234, height: 60 },
    largerectangle: {
      format: "LARGE_RECTANGLE", width: 336,
      height: 280
    },
    leaderboard: { format: "LEADERBOARD", width: 728, height: 90 },
    largeleaderboard: { format: "LARGE_LEADERBOARD", width: 970, height: 90 },
    billboard: { format: "BILLBOARD", width: 970, height: 250 },
    mediumrectangle: { format: "MEDIUM_RECTANGLE", width: 300, height: 250 },
    skyscraper: { format: "SKYSCRAPER", width: 120, height: 600 },
    smallsquare: { format: "SMALL_SQUARE", width: 200, height: 200 },
    smallrectangle: { format: "SMALL_RECTANGLE", width: 180, height: 150 },
    square: { format: "SQUARE", width: 250, height: 250 },
    verticalbanner: {
      format: "VERTICAL_BANNER",
      width: 120, height: 240
    },
    wideskyscraper: { format: "WIDE_SKYSCRAPER", width: 160, height: 600 },
    largeskyscraper: { format: "LARGE_SKYSCRAPER", width: 300, height: 600 },
    portrait: { format: "PORTRAIT", width: 300, height: 1050 }
  }

  function Cn() {
    this.qd = this.qd
    this.Md = this.Md
  }

  Cn.prototype.qd = !1
  Cn.prototype.dispose = function () {this.qd || (this.qd = !0, this.vc())}
  Cn.prototype[Symbol.dispose] = function () {this.dispose()}
  Cn.prototype.vc = function () {if (this.Md) for (; this.Md.length;) this.Md.shift()()}

  function Dn(a, b) {
    this.type = a
    this.hc = this.target = b
    this.defaultPrevented = this.Dc = !1
  }

  Dn.prototype.stopPropagation = function () {this.Dc = !0}
  Dn.prototype.preventDefault = function () {this.defaultPrevented = !0}
  var En = function () {
    if (!E.addEventListener || !Object.defineProperty) return !1
    var a = !1, b = Object.defineProperty({}, "passive", { get: function () {a = !0} })
    try {
      var c = function () {}
      E.addEventListener("test", c, b)
      E.removeEventListener("test", c, b)
    } catch (d) {}
    return a
  }()

  function Fn(a, b) {
    Dn.call(this, a ? a.type : "")
    this.relatedTarget = this.hc = this.target = null
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0
    this.key = ""
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1
    this.state = null
    this.pointerId = 0
    this.pointerType = ""
    this.wc = null
    a && this.init(a, b)
  }

  nd(Fn, Dn)
  Fn.prototype.init = function (a, b) {
    var c = this.type = a.type, d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null
    this.target = a.target || a.srcElement
    this.hc = b
    b = a.relatedTarget
    b || (c == "mouseover" ? b = a.fromElement : c == "mouseout" && (b = a.toElement))
    this.relatedTarget = b
    d ? (this.clientX = d.clientX !== void 0 ? d.clientX : d.pageX, this.clientY = d.clientY !== void 0 ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.clientX = a.clientX !== void 0 ? a.clientX : a.pageX, this.clientY = a.clientY !==
    void 0 ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0)
    this.button = a.button
    this.key = a.key || ""
    this.ctrlKey = a.ctrlKey
    this.altKey = a.altKey
    this.shiftKey = a.shiftKey
    this.metaKey = a.metaKey
    this.pointerId = a.pointerId || 0
    this.pointerType = a.pointerType
    this.state = a.state
    this.wc = a
    a.defaultPrevented && Fn.L.preventDefault.call(this)
  }
  Fn.prototype.stopPropagation = function () {
    Fn.L.stopPropagation.call(this)
    this.wc.stopPropagation ? this.wc.stopPropagation() : this.wc.cancelBubble = !0
  }
  Fn.prototype.preventDefault = function () {
    Fn.L.preventDefault.call(this)
    var a = this.wc
    a.preventDefault ? a.preventDefault() : a.returnValue = !1
  }
  var Gn = "closure_listenable_" + (Math.random() * 1E6 | 0)
  var Hn = 0

  function In(a, b, c, d, e) {
    this.listener = a
    this.proxy = null
    this.src = b
    this.type = c
    this.capture = !!d
    this.Dd = e
    this.key = ++Hn
    this.Hc = this.dd = !1
  }

  function Jn(a) {
    a.Hc = !0
    a.listener = null
    a.proxy = null
    a.src = null
    a.Dd = null
  }

  function Kn(a) {
    this.src = a
    this.ea = {}
    this.Kc = 0
  }

  Kn.prototype.add = function (a, b, c, d, e) {
    var f = a.toString()
    a = this.ea[f]
    a || (a = this.ea[f] = [], this.Kc++)
    var h = Ln(a, b, d, e)
    h > -1 ? (b = a[h], c || (b.dd = !1)) : (b = new In(b, this.src, f, !!d, e), b.dd = c, a.push(b))
    return b
  }
  Kn.prototype.remove = function (a, b, c, d) {
    a = a.toString()
    if (!(a in this.ea)) return !1
    var e = this.ea[a]
    b = Ln(e, b, c, d)
    return b > -1 ? (Jn(e[b]), H(e.length != null), Array.prototype.splice.call(e, b, 1), e.length == 0 && (delete this.ea[a], this.Kc--), !0) : !1
  }

  function Mn(a, b) {
    var c = b.type
    if (c in a.ea) {
      var d = a.ea[c], e = ue(d, b), f
      if (f = e >= 0) H(d.length != null), Array.prototype.splice.call(d, e, 1)
      f && (Jn(b), a.ea[c].length == 0 && (delete a.ea[c], a.Kc--))
    }
  }

  function Ln(a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
      var f = a[e]
      if (!f.Hc && f.listener == b && f.capture == !!c && f.Dd == d) return e
    }
    return -1
  }

  var Nn = "closure_lm_" + (Math.random() * 1E6 | 0), On = {}, Pn = 0

  function Qn(a, b, c, d, e) {if (d && d.once) Rn(a, b, c, d, e) else if (Array.isArray(b)) for (var f = 0; f < b.length; f++) Qn(a, b[f], c, d, e) else c = Sn(c), a && a[Gn] ? a.Yj(b, c, id(d) ? !!d.capture : !!d, e) : Tn(a, b, c, !1, d, e)}

  function Tn(a, b, c, d, e, f) {
    if (!b) throw Error("Invalid event type")
    var h = id(e) ? !!e.capture : !!e, k = Un(a)
    k || (a[Nn] = k = new Kn(a))
    c = k.add(b, c, d, h, f)
    if (!c.proxy) {
      d = Vn()
      c.proxy = d
      d.src = a
      d.listener = c
      if (a.addEventListener) En || (e = h), e === void 0 && (e = !1), a.addEventListener(b.toString(), d, e) else if (a.attachEvent) a.attachEvent(Wn(b.toString()), d) else if (a.addListener && a.removeListener) H(b === "change", "MediaQueryList only has a change event"), a.addListener(d) else throw Error("addEventListener and attachEvent are unavailable.")
      Pn++
    }
  }

  function Vn() {
    function a(c) {return b.call(a.src, a.listener, c)}

    var b = Xn
    return a
  }

  function Rn(a, b, c, d, e) {if (Array.isArray(b)) for (var f = 0; f < b.length; f++) Rn(a, b[f], c, d, e) else c = Sn(c), a && a[Gn] ? a.rl(b, c, id(d) ? !!d.capture : !!d, e) : Tn(a, b, c, !0, d, e)}

  function Yn(a, b, c, d, e) {if (Array.isArray(b)) for (var f = 0; f < b.length; f++) Yn(a, b[f], c, d, e) else (d = id(d) ? !!d.capture : !!d, c = Sn(c), a && a[Gn]) ? a.Zj(b, c, d, e) : a && (a = Un(a)) && (b = a.ea[b.toString()], a = -1, b && (a = Ln(b, c, d, e)), (c = a > -1 ? b[a] : null) && Zn(c))}

  function Zn(a) {
    if (typeof a !== t && a && !a.Hc) {
      var b = a.src
      if (b && b[Gn]) b.Dj(a) else {
        var c = a.type, d = a.proxy
        b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(Wn(c), d) : b.addListener && b.removeListener && b.removeListener(d)
        Pn--;
        (c = Un(b)) ? (Mn(c, a), c.Kc == 0 && (c.src = null, b[Nn] = null)) : Jn(a)
      }
    }
  }

  function Wn(a) {return a in On ? On[a] : On[a] = "on" + a}

  function Xn(a, b) {
    if (a.Hc) a = !0 else {
      b = new Fn(b, this)
      var c = a.listener, d = a.Dd || a.src
      a.dd && Zn(a)
      a = c.call(d, b)
    }
    return a
  }

  function Un(a) {
    a = a[Nn]
    return a instanceof Kn ? a : null
  }

  var $n = "__closure_events_fn_" + (Math.random() * 1E9 >>> 0)

  function Sn(a) {
    H(a, "Listener can not be null.")
    if (typeof a === r) return a
    H(a.handleEvent, "An object listener must have handleEvent method.")
    a[$n] || (a[$n] = function (b) {return a.handleEvent(b)})
    return a[$n]
  }

  function ao() {
    Cn.call(this)
    this.Ra = new Kn(this)
    this.Fk = this
    this.ff = null
  }

  nd(ao, Cn)
  ao.prototype[Gn] = !0
  A = ao.prototype
  A.addEventListener = function (a, b, c, d) {Qn(this, a, b, c, d)}
  A.removeEventListener = function (a, b, c, d) {Yn(this, a, b, c, d)}
  A.jc = function (a) {
    bo(this)
    var b = this.ff
    if (b) {
      var c = []
      for (var d = 1; b; b = b.ff) c.push(b), H(++d < 1E3, "infinite loop")
    }
    b = this.Fk
    d = a.type || a
    if (typeof a === z) a = new Dn(a, b) else if (a instanceof Dn) a.target = a.target || b else {
      var e = a
      a = new Dn(d, b)
      Ni(a, e)
    }
    e = !0
    var f
    if (c) for (f = c.length - 1; !a.Dc && f >= 0; f--) {
      var h = a.hc = c[f]
      e = h.sd(d, !0, a) && e
    }
    a.Dc || (h = a.hc = b, e = h.sd(d, !0, a) && e, a.Dc || (e = h.sd(d, !1, a) && e))
    if (c) for (f = 0; !a.Dc && f < c.length; f++) h = a.hc = c[f], e = h.sd(d, !1, a) && e
  }
  A.vc = function () {
    ao.L.vc.call(this)
    this.rm()
    this.ff = null
  }
  A.Yj = function (a, b, c, d) {
    bo(this)
    this.Ra.add(String(a), b, !1, c, d)
  }
  A.rl = function (a, b, c, d) {this.Ra.add(String(a), b, !0, c, d)}
  A.Zj = function (a, b, c, d) {this.Ra.remove(String(a), b, c, d)}
  A.Dj = function (a) {Mn(this.Ra, a)}
  A.rm = function () {
    if (this.Ra) {
      var a = this.Ra, b = 0, c
      for (c in a.ea) {
        for (var d = a.ea[c], e = 0; e < d.length; e++) ++b, Jn(d[e])
        delete a.ea[c]
        a.Kc--
      }
    }
  }
  A.sd = function (a, b, c) {
    a = this.Ra.ea[String(a)]
    if (!a) return !0
    a = a.concat()
    for (var d = !0, e = 0; e < a.length; ++e) {
      var f = a[e]
      if (f && !f.Hc && f.capture == b) {
        var h = f.listener, k = f.Dd || f.src
        f.dd && this.Dj(f)
        d = h.call(k, c) !== !1 && d
      }
    }
    return d && !c.defaultPrevented
  }

  function bo(a) {H(a.Ra, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")}

  function co() {
    ao.call(this)
    this.Tc = 0
    this.endTime = this.startTime = null
  }

  nd(co, ao)

  function eo() {}

  function fo(a, b) {
    Array.isArray(b) || (b = [b])
    H(b.length > 0, "At least one Css3Property should be specified.")
    b = b.map(function (c) {
      if (typeof c === z) return c
      me(c, "Expected css3 property to be an object.")
      var d = c.Rd + " " + c.duration + "s " + c.timing + " " + c.delay + "s"
      H(c.Rd && typeof c.duration === t && c.timing && typeof c.delay === t, "Unexpected css3 property value: %s", d)
      return d
    })
    Y(a, zc, b.join(","))
  }

  var go = function (a) {
    var b = !1, c
    return function () {
      b || (c = a(), b = !0)
      return c
    }
  }(function () {
    var a = en(document, "DIV"), b = ze ? "-webkit" : ye ? "-moz" : null, c = "transition:opacity 1s linear;"
    b && (c += b + "-transition:opacity 1s linear;")
    b = bk({ style: c })
    if (a.nodeType === 1 && (c = a.tagName, /^(script|style)$/i.test(c))) throw a = c.toLowerCase() === "script" ? "Use setScriptTextContent with a SafeScript." : "Use setStyleTextContent with a SafeStyleSheet.", Error(a)
    a.innerHTML = Ei(b)
    a = a.firstChild
    H(a.nodeType == Node.ELEMENT_NODE)
    b =
      a.style[Hi(zc)]
    a = typeof b !== "undefined" ? b : a.style[jn(a, zc)] || ""
    return a != ""
  })
  var ho = typeof AsyncContext !== "undefined" && typeof AsyncContext.Snapshot === r ? function (a) {return a && AsyncContext.Snapshot.wrap(a)} : function (a) {return a}

  function io(a, b) {
    this.Qk = a
    this.ym = b
    this.Ld = 0
    this.Ed = null
  }

  io.prototype.get = function () {
    if (this.Ld > 0) {
      this.Ld--
      var a = this.Ed
      this.Ed = a.next
      a.next = null
    } else a = this.Qk()
    return a
  }

  function jo(a, b) {
    a.ym(b)
    a.Ld < 100 && (a.Ld++, b.next = a.Ed, a.Ed = b)
  }

  function ko() {this.ce = this.ub = null}

  ko.prototype.add = function (a, b) {
    var c = lo.get()
    c.set(a, b)
    this.ce ? this.ce.next = c : (H(!this.ub), this.ub = c)
    this.ce = c
  }
  ko.prototype.remove = function () {
    var a = null
    this.ub && (a = this.ub, this.ub = this.ub.next, this.ub || (this.ce = null), a.next = null)
    return a
  }
  var lo = new io(function () {return new mo}, function (a) {return a.reset()})

  function mo() {this.next = this.scope = this.Ue = null}

  mo.prototype.set = function (a, b) {
    this.Ue = a
    this.scope = b
    this.next = null
  }
  mo.prototype.reset = function () {this.next = this.scope = this.Ue = null}
  var no = E.console && E.console.createTask ? E.console.createTask.bind(E.console) : void 0,
    oo = no ? Symbol("consoleTask") : void 0

  function po(a, b) {
    function c() {
      var k = cd.apply(0, arguments), l = this
      return h.run(function () {return a.call.apply(a, [l].concat(Yc(k)))})
    }

    b = b === void 0 ? "anonymous" : b
    if (oo && a[oo]) return a
    var d = a, e, f = (e = qo) == null ? void 0 : e()
    a = function () {
      var k = cd.apply(0, arguments), l, m = (l = qo) == null ? void 0 : l()
      if (f !== m) throw Error(b + " was scheduled in '" + f + "' but called in '" + m + "'.\nMake sure your test awaits all async calls.\n\nTIP: To help investigate, debug the test in Chrome and look at the async portion\nof the call stack to see what originally scheduled the callback.  Then, make the\ntest wait for the relevant asynchronous work to finish.")
      return d.call.apply(d,
        [this].concat(Yc(k)))
    }
    if (!no) return a
    var h = no(a.name || b)
    c[I(oo)] = h
    return c
  }

  var qo
  var ro, so = !1, to = new ko

  function uo(a, b) {
    a = po(a, "goog.async.run")
    ro || vo()
    so || (ro(), so = !0)
    to.add(a, b)
  }

  function vo() {
    var a = Promise.resolve(void 0)
    ro = function () {a.then(wo)}
  }

  function wo() {
    for (var a; a = to.remove();) {
      try {a.Ue.call(a.scope)} catch (b) {pe(b)}
      jo(lo, a)
    }
    so = !1
  }

  function xo(a) {
    if (!a) return !1
    try {return !!a.$goog_Thenable} catch (b) {return !1}
  }

  function yo(a) {
    this.ha = 0
    this.Jf = void 0
    this.Hb = this.Ka = this.hb = null
    this.Cd = this.Te = !1
    if (a != eo) try {
      var b = this
      a.call(void 0, function (c) {zo(b, 2, c)}, function (c) {
        if (!(c instanceof Ao)) try {
          if (c instanceof Error) throw c
          throw Error("Promise rejected.")
        } catch (d) {}
        zo(b, 3, c)
      })
    } catch (c) {zo(this, 3, c)}
  }

  function Bo() {
    this.next = this.context = this.Pb = this.nb = this.child = null
    this.ad = !1
  }

  Bo.prototype.reset = function () {
    this.context = this.Pb = this.nb = this.child = null
    this.ad = !1
  }
  var Co = new io(function () {return new Bo}, function (a) {a.reset()})

  function Do(a, b, c) {
    var d = Co.get()
    d.nb = a
    d.Pb = b
    d.context = c
    return d
  }

  yo.prototype.then = function (a, b, c) {
    a != null && le(a, bc)
    b != null && le(b, cc)
    return Eo(this, ho(typeof a === r ? a : null), ho(typeof b === r ? b : null), c)
  }
  yo.prototype.$goog_Thenable = !0
  yo.prototype.cancel = function (a) {
    if (this.ha == 0) {
      var b = new Ao(a)
      uo(function () {Fo(this, b)}, this)
    }
  }

  function Fo(a, b) {
    if (a.ha == 0) if (a.hb) {
      var c = a.hb
      if (c.Ka) {
        for (var d = 0, e = null, f = null, h = c.Ka; h && (h.ad || (d++, h.child == a && (e = h), !(e && d > 1))); h = h.next) e || (f = h)
        e && (c.ha == 0 && d == 1 ? Fo(c, b) : (f ? (d = f, H(c.Ka), H(d != null), d.next == c.Hb && (c.Hb = d), d.next = d.next.next) : Go(c), Ho(c, e, 3, b)))
      }
      a.hb = null
    } else zo(a, 3, b)
  }

  function Io(a, b) {
    a.Ka || a.ha != 2 && a.ha != 3 || Jo(a)
    H(b.nb != null)
    a.Hb ? a.Hb.next = b : a.Ka = b
    a.Hb = b
  }

  function Eo(a, b, c, d) {
    b && (b = po(b, Jb))
    c && (c = po(c, Jb))
    var e = Do(null, null, null)
    e.child = new yo(function (f, h) {
      e.nb = b ? function (k) {
        try {
          var l = b.call(d, k)
          f(l)
        } catch (m) {h(m)}
      } : f
      e.Pb = c ? function (k) {
        try {
          var l = c.call(d, k)
          l === void 0 && k instanceof Ao ? h(k) : f(l)
        } catch (m) {h(m)}
      } : h
    })
    e.child.hb = a
    Io(a, e)
    return e.child
  }

  yo.prototype.Wm = function (a) {
    H(this.ha == 1)
    this.ha = 0
    zo(this, 2, a)
  }
  yo.prototype.Xm = function (a) {
    H(this.ha == 1)
    this.ha = 0
    zo(this, 3, a)
  }

  function zo(a, b, c) {
    if (a.ha == 0) {
      a === c && (b = 3, c = new TypeError("Promise cannot resolve to itself"))
      a.ha = 1
      a:{
        var d = c, e = a.Wm, f = a.Xm
        if (d instanceof yo) {
          e != null && le(e, bc)
          f != null && le(f, cc)
          Io(d, Do(e || eo, f || null, a))
          var h = !0
        } else if (xo(d)) d.then(e, f, a), h = !0 else {
          if (id(d)) try {
            var k = d.then
            if (typeof k === r) {
              Ko(d, k, e, f, a)
              h = !0
              break a
            }
          } catch (l) {
            f.call(a, l)
            h = !0
            break a
          }
          h = !1
        }
      }
      h || (a.Jf = c, a.ha = b, a.hb = null, Jo(a), b != 3 || c instanceof Ao || Lo(a, c))
    }
  }

  function Ko(a, b, c, d, e) {
    function f(l) {k || (k = !0, d.call(e, l))}

    function h(l) {k || (k = !0, c.call(e, l))}

    var k = !1
    try {b.call(a, h, f)} catch (l) {f(l)}
  }

  function Jo(a) {a.Te || (a.Te = !0, uo(a.Wk, a))}

  function Go(a) {
    var b = null
    a.Ka && (b = a.Ka, a.Ka = b.next, b.next = null)
    a.Ka || (a.Hb = null)
    b != null && H(b.nb != null)
    return b
  }

  yo.prototype.Wk = function () {
    for (var a; a = Go(this);) Ho(this, a, this.ha, this.Jf)
    this.Te = !1
  }

  function Ho(a, b, c, d) {
    if (c == 3 && b.Pb && !b.ad) for (; a && a.Cd; a = a.hb) a.Cd = !1
    if (b.child) b.child.hb = null, Mo(b, c, d) else try {b.ad ? b.nb.call(b.context) : Mo(b, c, d)} catch (e) {No.call(null, e)}
    jo(Co, b)
  }

  function Mo(a, b, c) {b == 2 ? a.nb.call(a.context, c) : a.Pb && a.Pb.call(a.context, c)}

  function Lo(a, b) {
    a.Cd = !0
    uo(function () {a.Cd && No.call(null, b)})
  }

  var No = pe

  function Ao(a) {ge.call(this, a)}

  nd(Ao, ge)
  Ao.prototype.name = "cancel"

  function Oo(a, b, c) {
    if (typeof a === r) c && (a = ld(a, c)) else if (a && typeof a.handleEvent == r) a = ld(a.handleEvent, a) else throw Error("Invalid listener argument")
    return Number(b) > 2147483647 ? -1 : E.setTimeout(a, b || 0)
  }

  function Po(a, b, c, d, e) {
    co.call(this)
    this.Bb = a
    this.Sk = b
    this.hl = c
    this.zg = d
    this.Tm = Array.isArray(e) ? e : [e]
  }

  nd(Po, co)
  A = Po.prototype
  A.kc = function () {this.Tc != 1 && (this.jc("begin"), this.jc("play"), this.startTime = Date.now(), this.Tc = 1, go() ? (Y(this.Bb, this.hl), this.Kf = Oo(this.km, void 0, this)) : this.xe(!1))}
  A.km = function () {
    pn(this.Bb)
    fo(this.Bb, this.Tm)
    Y(this.Bb, this.zg)
    this.Kf = Oo(ld(this.xe, this, !1), this.Sk * 1E3)
  }
  A.ak = function () {this.Tc == 1 && this.xe(!0)}
  A.xe = function (a) {
    Y(this.Bb, zc, "")
    E.clearTimeout(this.Kf)
    Y(this.Bb, this.zg)
    this.endTime = Date.now()
    this.Tc = 0
    a ? this.jc("stop") : this.jc("finish")
    this.jc("end")
  }
  A.vc = function () {
    this.ak()
    Po.L.vc.call(this)
  }
  A.pause = function () {H(!1, "Css3 transitions does not support pause action.")}

  function Qo(a, b, c, d) {
    this.Y = b
    this.Z = c
    this.A = a
    this.lj = void 0
    this.settings = Object.assign({}, {
      bloggerBase: "//www.blogger.com",
      pageSize: 50,
      loadAfter: 2E3,
      maxDepth: 1,
      messages: {}
    }, d)
    this.Y.comments = null
    this.Wd = !1
    this.ib = new $m(new zm(this.Y), this.settings.pageSize || blogger.data().Ie())
    this.init()
  }

  A = Qo.prototype
  A.init = function () {
    var a = this, b = this.Y.comments ? 0 : this.settings.loadAfter || 0, c = !!this.Z.querySelector(wa),
      d = this.Z.getAttribute("data-defer"), e = d == Bc || d == Gc, f = F.decode(Ro)
    f.path == F.decode(this.Y.url).path && f.fragment && (So.test(f.fragment) || To.test(f.fragment)) && (e = !1, this.Wd = !0)
    this.A.headless() && (e = !1)
    if (c) if ((c = this.Z.querySelector(wa)) && c.addEventListener(mb, this.Zd.bind(this)), (c = this.Z.querySelector(va)) && rn(c, !1), !e) this.Nb = setTimeout(this.Zd.bind(this), b) else {
      if (d == Gc) {
        var h = function (k,
          l) {l.id == a.Y.id && /\.*(\/\d{4}\/\d{2}\/[^\/]+)$/.test(F.decode().path) && (a.bf || a.Zd(), a.A.removeListener(h))}
        this.A.addListener(Hc, h)
      }
    } else this.Nb = setTimeout(this.load.bind(this), b)
    return this
  }
  A.Zd = function () {
    if (this.bf) {
      var a = this.Z.querySelector(va)
      if (a) if (Ik(a, yc)) {
        V(a, yc)
        var b = parseFloat(ln(a, Mb))
        b = Uo(a, b, 0)
        Qn(b, "end", function () {rn(a, !1)})
        b.kc()
      } else U(a, yc), rn(a, !0), Y(a, Mb, "auto"), Uo(a, 0, a.offsetHeight).kc()
    } else this.Mm = !0, this.load()
  }

  function Uo(a, b, c) {
    return new Po(a, .4, { height: b + hc }, { height: c + hc }, [{
      Rd: "all",
      duration: .4,
      timing: "linear",
      delay: 0
    }])
  }

  A.items = function () {return this.ib.items()}
  A.load = function (a) {this.bf || (this.Y.comments ? this.Oi(this.Y.comments) : this.ib.waiting() && a !== !1 || !this.ib.hasNext() || (Vo(this, !0), this.ib.next(this.Oi.bind(this))))}
  A.Oi = function (a) {
    var b = this
    Vo(this, !1)
    this.bf = !0
    this.Y.comments = a || []
    this.render(a)
    this.Mm && this.Zd()
    this.Wd && !this.Z.closest(".no-autoscroll") && setTimeout(function () {
      var c = b.Wd ? b.Z.querySelector(".comments-replybox, .comment-replybox-thread") : b.Z
      c && c.scrollIntoView && c.scrollIntoView(!0)
    }, this.Wd ? 250 : 0)
    this.Y.commentCount <= this.settings.la && (a = this.Z.querySelector(".loadmore")) && rn(a, !1)
  }

  function Vo(a, b) {
    b !== void 0 && Kk(a.Z, "loading", b)
    Ik(a.Z, ".loading")
  }

  A.render = function (a) {
    var b = this
    if (a) {
      Wo(this)
      var c = this.Y.commentCount - this.settings.la, d = (window.location.hash || "#").substring(1), e, f
      So.test(d) ? e = d.substring(14) : To.test(d) && (f = d.substring(1))
      var h = {
        id: this.Y.id,
        data: a,
        loadNext: function (l) {
          b.ib.hasNext() ? b.ib.next(function (m) {
            Vo(b, !1)
            m ? (b.Y.comments.push.apply(b.Y.comments, Yc(m)), l(m)) : l(null)
            b.settings.la >= c ? (m = b.Z.querySelector(".loadmore")) && rn(m, !1) : c -= b.settings.la
          }) : l(null)
        },
        hasMore: function () {return b.ib.hasNext()},
        getMeta: this.dl.bind(this),
        onReply: this.Rl.bind(this),
        initComment: f,
        initReplyThread: e,
        config: { maxDepth: this.settings.maxDepth },
        messages: this.settings.messages
      }, k = this.Z.querySelector(".comments-content")
      window.goog && window.goog.comments && window.goog.comments.render ? window.goog.comments.render(k, h) : (window.goog = window.goog || {}, window.goog.comments = window.goog.comments || {}, window.goog.comments.Pi = window.goog.comments.Pi || [], window.goog.comments.Pi.push(function () {window.goog.comments.render(k, h)}))
    }
  }

  function Wo(a) {
    if (!a.Td) {
      var b = a.Z.querySelector(".comments-replybox"), c = b.getAttribute(ub)
      b && !b.getAttribute(v) && c && (a.Td = b, a.jl = c, Ed(b, c))
    }
  }

  A.Rl = function (a, b) {this.Td && a !== this.lj && (document.getElementById(b).insertBefore(this.Td, null), this.Td.src = this.jl + (a ? "&parentID=" + a : ""), this.lj = a)}
  A.dl = function (a, b) {return "iswriter" === a ? (a = this.Y, b = b && b.author ? b.author.profileUrl : null, b == (a && a.author ? a.author.profileUrl : null) && b != null ? Bc : Ab) : "deletelink" === a ? this.settings.bloggerBase + "/comment/delete/" + this.Y.blogId + "/" + b.id : "deleteclass" === a ? "item-control blog-admin " + (b.extensions["blogger.itemClass"] || "") : null}
  var Ro = document.URL, So = /^comment-form_/, To = /^c\d+$/

  function Xo() {this.Hj = {}}

  Xo.prototype.init = function (a, b) {
    var c = this
    this.A = a
    this.B = b
    if (this.A.headless()) return this
    var d = {
      loadMore: a.localize("Load more"),
      loading: a.localize("Loading"),
      loaded: a.localize("No more comments"),
      addComment: a.localize("Add comment"),
      reply: a.localize("Reply"),
      replies: a.localize("Replies"),
      "delete": a.localize("Delete")
    }, e = { bloggerBase: this.B.getSettings().blogger_base, maxDepth: this.A.getSetting("comments_mtd"), messages: d }
    this.A.addListener(Ec, function () {
      document.querySelectorAll(".blogger-comments").forEach(function (f) {
        var h = f.getAttribute("data-itemid"),
          k = f.closest(".viewitem-content") ? "v" : ""
        if (!c.Hj[h + k]) {
          var l = b.find(h)
          f = f.closest(".comments")
          l && f && (l = new Qo(a, l, f, e), c.Hj[h + k] = l)
        }
      })
    })
    return this
  }

  function Yo() {
    this.Lf = !1
    this.Mi = 0
  }

  Yo.prototype.init = function (a, b) {
    this.A = a
    this.B = b
    this.A.addListener(Ec, this.Ri.bind(this))
    Zo(this)
    return this
  }

  function Zo(a) {
    if (!a.Lf) {
      var b = document.querySelector("input#search")
      b && (b.addEventListener("keyup", a.Ri.bind(a)), a.Lf = !0)
    }
  }

  function $o() {
    var a = document.querySelector("#search")
    if (a) return a.value
  }

  Yo.prototype.Ri = function (a) {a.type == Ec ? (Zo(this), $o() && this.B.items().length != this.Mi && this.Mf()) : (clearTimeout(this.Zk), this.Zk = setTimeout(this.Mf.bind(this), 300))}
  Yo.prototype.Mf = function () {
    var a = $o()
    if (a && a.length !== 0) {
      var b = new RegExp(a, "im"),
        c = this.B.items().filter(function (d) {return b.test(d.title) || d.tags && d.tags.filter(function (e) {return b.test(e)}).length > 0 ? !0 : b.test(d.text())})
      this.Mi = this.B.items().length
      this.A.filter(c, a)
    } else this.A.clearFilter()
  }

  function ap(a) {
    a.addEventListener("keydown", bp.bind(a))
    a.addEventListener("wheel", bp.bind(a))
  }

  function bp(a) {
    for (var b = !1, c = a.target; c; c = c.parentElement) if (c === this) {
      b = !0
      break
    }
    if (b) {
      b = this.scrollTop == 0
      c = this.scrollHeight - this.scrollTop == this.clientHeight
      var d = a.deltaY > 0 || a.which == 32 || a.which == 40;
      ((a.deltaY < 0 || a.which == 38) && b || d && c) && a.preventDefault()
    }
  }

  function cp() {
    this.Hd = this.Nf = this.Of = !1
    this.pb = null
  }

  A = cp.prototype
  A.init = function (a, b) {
    this.A = a
    !this.A.getSetting(zb) || this.A.getSetting("is_mobile") || this.A.headless() || (this.A.addListener(Ec, this.ck.bind(this)), b.addListener(Wb, this.Ol.bind(this)))
    return this
  }

  function dp() {Array.from(document.querySelectorAll(la)).forEach(function (a) {a.remove()})}

  A.ck = function () {
    this.Of = !0
    ep(this)
  }
  A.Ol = function () {
    this.Nf = !0
    ep(this)
  }

  function ep(a) {!a.Hd && a.Of && a.Nf && (fp(a), document.querySelector("html").addEventListener(mb, a.bk.bind(a)), window.addEventListener(ic, a.Pf.bind(a)), setTimeout(function () {V(document.querySelector(da), "gadget-notifying")}, 5E3), a.Hd = !0)}

  A.bk = function (a) {
    var b = a.target
    if (b.closest(".gadget-selected .gadget-container")) a.stopPropagation() else {
      var c = this.pb
      if (this.pb != null) {
        var d = gp(this.pb)
        d && (V(d, Ib), V(document.querySelector(da), Hb), dp())
        this.pb = null
      }
      if (b = b.closest(".gadget-item")) {
        a.stopPropagation()
        a = b.getAttribute("data-gadget-id")
        if ((!a || a == c) && (c = this.A.lb[a]) && !c.Ic) return
        if ((c = this.A.lb[a]) && c.enabled) {
          if (c.Ic) c && (c = this.A.lb[a]) && (b = document.createElement("div"), c.render(b), this.A.notify(Vb, c.N(), b, gp(a))) else {
            c =
              gp(a)
            U(c, Ib)
            U(document.querySelector(da), Hb)
            hp(a)
            if (b = c.querySelector(ka)) d = (d = G().template("GadgetDockResizeDetector")) ? (d.apply() || "").trim() : "", Bd(b, d), document.querySelector(la).contentWindow.addEventListener(ic, this.Pf.bind(this))
            c.dataset.Em || ((b = c.querySelector(".gadget-container .gadget")) && ap(b), c.dataset.Em = !0)
          }
          this.pb = a
        }
      }
    }
  }
  A.Pf = function () {this.pb && hp(this.pb)}

  function hp(a) {
    if (a = gp(a)) {
      var b = a.querySelector(".gadget-title"), c = a.querySelector(ka)
      if (b && c) {
        var d = Gb, e = window.innerHeight
        b = pn(b).height
        c = b + pn(c).height
        b = a.getBoundingClientRect().top + (pn(a).height - b) / 2
        c + 27 > e ? d = Fb : b + c + 27 > e && (d = Eb)
        Kk(a, Gb, d == Gb)
        Kk(a, Eb, d == Eb)
        Kk(a, Fb, d == Fb)
      }
    }
  }

  function gp(a) {return document.querySelector("[data-gadget-id=\"" + a + "\"]")}

  function ip(a, b) {
    if (a = gp(a)) {
      var c = G()
      var d = c.template("GadgetDockItemContents")
      if (d) {
        var e = blogger.l10n && blogger.l10n[b.N()] ? blogger.l10n[b.N()] : b.N()
        c = d.apply(c.oa({ title: e, icon: b.ca(), "icon-selected": b.aa() })).trim()
      } else c = ""
      Bd(a, c)
      b.render(a.querySelector(ka))
    } else b.render(null)
  }

  A.Kl = function (a, b) {b.enabled ? ip(a, b) : gp(a).remove()}

  function fp(a) {
    for (var b = document.querySelector(da); b.firstChild;) b.removeChild(b.firstChild)
    b = 0
    for (var c; c = a.A.lb[b]; b++) {
      var d = a, e = b
      if (c && c.enabled) {
        if (c.tj) {
          var f = document.querySelector(da)
          if (f) {
            var h = e
            var k = G(), l = k.template("GadgetDockItem")
            h = l ? (l.apply(k.oa({ id: h })) || "").trim() : ""
            Bd(f, h)
          }
        }
        c.Mb ? ip(e, c) : c.Im(d.Kl.bind(d, e, c))
      }
    }
  }

  function jp() {
    this.mb = null
    this.Zf = /^([^\/?#]+)\.blogspot\.[^\/?#]+$/i
  }

  A = jp.prototype
  A.init = function (a, b) {
    this.A = a
    this.B = b
    this.A.addListener(oc, this.ek.bind(this))
    this.A.addListener(lb, this.dk.bind(this))
    a = this.Ql.bind(this)
    window.addEventListener("popstate", a)
    window.addEventListener("hashchange", a)
    return this
  }
  A.ek = function (a, b) {
    if (b && b.url && (this.mb && (clearTimeout(this.mb), this.mb = null), this.mb = setTimeout(this.Ej.bind(this, b.url), 1E3), b.title)) {
      a = b.title
      b = F.authority(b.url)
      for (var c, d = 0; c = this.B.resources()[d]; d++) if (b == F.authority(c.url)) {
        a += c.title ? " | " + c.title : ""
        break
      }
      document.title = a
    }
  }
  A.dk = function () {
    this.Ej()
    this.B.resources().length && this.B.resources()[0].title && (document.title = this.B.resources()[0].title)
  }

  function kp(a) {return a.B.resources().length && a.B.resources()[0].url ? a.B.resources()[0].url : (a = F.decode()) ? (a.path = "", a.encode(!1, !1)) : document.URL}

  A.Ej = function (a) {
    var b = F.decode().authority
    a = F.decode(a || kp(this))
    a.path = a.path || "/"
    a.scheme = a.scheme || F.decode().scheme
    a.authority = a.authority || b
    a.params = Object.assign({}, F.decode().params, a.params)
    var c = this.Zf.exec(b), d = this.Zf.exec(a.authority)
    c && d && c[1] == d[1] && (a.authority = b)
    this.Fd = !0
    this.Fd = F.rewritePath(a)
    window.location.hash || (this.Fd = !1)
  }
  A.Ql = function () {
    this.mb && (clearTimeout(this.mb), this.mb = null)
    if (this.Fd) this.Fd = !1 else {
      var a = F.decodePath(), b = F.decode(kp(this))
      a.path = a.path || "/"
      b.path = b.path || "/"
      a.scheme = a.scheme || F.decode().scheme
      b.scheme = b.scheme || a.scheme
      a.equals(b, !1, !1) ? this.A.clearSelection() : this.A.select(a.encode(!1, !1))
    }
  }

  function lp() {this.Uc = !1}

  A = lp.prototype
  A.init = function (a, b) {
    this.A = a
    this.B = b
    this.A.addListener(Vb, this.Sl.bind(this))
    this.A.addListener(oc, this.hd.bind(this))
    this.A.addListener(lb, this.hd.bind(this))
    window.addEventListener(mb, this.fk.bind(this))
    return this
  }
  A.gk = function (a) {(a = a.target.closest(sa)) && Kk(a, tc, a.querySelector(ra).scrollTop === 0)}
  A.fk = function (a) {this.Uc && (a.target.closest(".item, .lightbox-panel") || this.hd())}
  A.Sl = function (a, b, c, d) {
    if (a = document.querySelector("#lightbox")) this.Uc = !1, clearTimeout(this.Gc), a.remove()
    b = Cd((G().template("Lightbox").apply(Xd({ title: b })) || "").trim())
    document.body.prepend(b)
    var e = b.querySelector(sa)
    e.querySelector(".lightbox-contentwrap").append(c)
    if (d) {
      c = getComputedStyle(e)
      var f = c.top, h = c.right, k = c.bottom, l = c.left, m = d.getBoundingClientRect()
      c = m.top
      a = window.innerWidth - m.left - d.offsetWidth
      d = window.innerHeight - m.top - d.offsetHeight
      m = m.left
      U(e, Tb)
      mn(e, m, c)
      Y(e, lc, a)
      Y(e, "bottom", d)
      setTimeout(function () {
        V(e, Tb)
        mn(e, l, f)
        Y(e, lc, h)
        Y(e, "bottom", k)
      }, 0)
    }
    this.Uc = !0
    U(b, ac)
    U(e, qb)
    U(e, tc)
    d = e.querySelector(ra)
    d.focus()
    d.addEventListener(mc, this.gk.bind(this))
    e.querySelector(".close").addEventListener(mb, mp(this.hd))
    ap(d)
    U(document.body, "lightbox-open")
    this.A.updated()
  }

  function mp(a) {
    return function (b) {
      b.stopPropagation()
      b.preventDefault()
      a()
    }
  }

  A.hd = function () {
    var a = document.querySelector("#lightbox")
    a && U(a, nb)
    V(document.body, "lightbox-open")
    clearTimeout(this.Gc)
    this.Uc = !1
    this.Gc = setTimeout(function () {a && a.remove()}, 1E3)
  }

  function np() {this.Qf = !1}

  np.prototype.init = function (a) {
    this.A = a
    a.addListener(Ec, this.hk.bind(this))
    return this
  }
  np.prototype.hk = function () {
    if (!this.Qf) {
      var a = document.head, b = document.createComment(" Yo Dawg... "), c = document.createElement("meta")
      c.setAttribute("name", "meta")
      c.setAttribute("content", "meta")
      a.append(b)
      a.append(c)
      this.A.headless() && U(document.body, Lb)
      this.Qf = !0
    }
  }

  function op() {
    this.tg = {}
    var a = window.performance && window.performance.timing
    a && a.responseStart && a.navigationStart && (this.wf = a.responseStart)
    this.wf = this.wf || pp || (new Date).getTime()
  }

  op.prototype.tick = function (a, b) {this.tg[a] = (new Date).getTime() - (b && this.tg[b] || 0) - this.wf}
  var pp = (new Date).getTime()

  function qp() {
    this.zj = {}
    this.Bj = {}
    this.Jc = []
    this.Vc = []
    this.Yc = /\.*(?:(\/\d{4}\/\d{2}\/[^\/]+)|\/p(\/[^\/]+\.html))$/
    this.Yi = this.jk.bind(this)
  }

  A = qp.prototype
  A.init = function (a, b, c) {
    this.A = a
    this.B = b
    this.ik = c
    if (this.A.headless()) return this
    a = this.ik.Mj()
    this.Yk = ["blitz", a ? "blitz_" + a.replace(/\s+/g, "_") : ""].join()
    a = this.A.getAnalyticsId()
    window._gaq && a && window._gaq.push(["_setAccount", a])
    this.A.addListener(Hc, this.Vl.bind(this))
    this.A.addListener(oc, this.kk.bind(this))
    this.A.addListener(lb, this.Yi)
    this.B.addListener(Cb, this.Il.bind(this))
    this.B.addListener(Bb, this.Hl.bind(this))
    a = this.xm.bind(this)
    window.addEventListener("beforeunload", a)
    setInterval(a,
      15E3)
    return this
  }
  A.Il = function (a, b) {
    a = rp(this)
    if (b != (a && a.url)) {
      a = this.Yc.test(b) ? Ub : ab
      if (a == ab) {
        if (this.im) return
        this.im = b
      }
      sp(this, b, a, Ua)
    }
  }
  A.Hl = function (a, b) {
    a = rp(this)
    b != (a && a.url) && ((a = sp(this, b)) && a.tick("st"), this.Yc.test(b) && a && a.tick(Ua))
  }

  function rp(a) {for (var b, c = 0; b = a.B.resources()[c]; c++) if (b instanceof ud) return b}

  A.jk = function () {
    var a = rp(this), b = a && a.url
    b && !a.filter && tp(this, b)
    this.A.removeListener(lb, this.Yi)
  }
  A.kk = function (a, b) {
    a = up(this, b)
    sp(this, a) || sp(this, a, Ub, Ua)
  }
  A.Vl = function (a, b, c) {
    a = up(this, b)
    b && b.url && tp(this, b.url);
    (b = sp(this, a)) || (b = sp(this, a, Ub, Ua))
    b && (b.tick("prt"), vp(this, a, c || document.body))
  }

  function sp(a, b, c, d) {
    var e = a.Jc.filter(function (f) {return f.identifier == b})
    if (e && e.length) return e[0] && e[0].timer
    if (c !== void 0) {
      if (a.Yc.test(b)) {
        if (a.zj[b]) return
        a.zj[b] = !0
      }
      e = new (window.jstiming && window.jstiming.Timer || op)
      e.name = c
      d !== void 0 && e.tick(d)
      a.Jc.push({ identifier: b, timer: e })
      return e
    }
  }

  function wp(a, b) {
    var c = a.Jc.filter(function (d) {return d.identifier === b})
    c.length && (a.Vc.push(c[0]), a.Jc = a.Jc.filter(function (d) {return d.identifier !== b}))
  }

  function vp(a, b, c) {
    c && sp(a, b) && xp(c, function () {
      var d = sp(a, b)
      d && (d.tick("pst", Ua), wp(a, b))
    })
  }

  function up(a, b) {return (a = a.Yc.exec(typeof b == z ? b : b && b.url)) ? a[1] || a[2] : b}

  A.xm = function () {
    if (this.Vc.length) {
      var a = this.Vc.map(function (c) {return c.timer})
      this.Vc = []
      var b = rp(this)
      an(a, this.Yk, { blogId: b ? b.id : "" })
    }
  }

  function tp(a, b) {
    var c = F.decode(b).normalize().encode()
    !b || a.Bj[c] || F.isCrossDomain(c) || (a.Bj[c] = !0, F.decode(b).path != F.decode(yp).path && (a = window.location.href.split("/")[0], a != "https:" || b.toLowerCase().startsWith(a) || (b = b.replace(b.split("/")[0], a)), setTimeout(function () {
      var d = F.decode(b).param(xb, 1).param("v", 0).encode()
      fetch(d)
    }, 1E3)), window._gaq && b && window._gaq.push(["_trackPageview", F.decode(b).path]))
  }

  var yp = document.URL, zp = /url\((['"]?)(.*?)\1\)/

  function xp(a, b) {
    var c = []
    a.querySelectorAll("*").forEach(function (e) {e.matches("img") && !e.complete ? (e = e.getAttribute(v)) && e.indexOf("data:") === -1 && c.push(e) : (e = getComputedStyle(e).backgroundImage) && (e = zp.exec(e)) && e[2] && e[2].indexOf("data:") === -1 && c.push(e[2])})
    if (c.length) {
      var d = []
      c.forEach(function (e) {
        var f = new Promise(function (h) {
          var k = new Image
          k.addEventListener("load", h)
          k.addEventListener("error", h)
          k.src = e
        })
        d.push(f)
      })
      Promise.all(d).then(b)
    } else b()
  }

  function Ap() {}

  A = Ap.prototype
  A.init = function (a, b) {
    this.A = a
    this.B = b
    this.A.headless() && delete Ap.ye
    this.A.addListener(oc, this.nk.bind(this))
    this.A.addListener(lb, this.Rf.bind(this))
    this.A.addListener(Vb, this.Rf.bind(this))
    this.cf = this.A.next.bind(this.A)
    this.jf = this.A.previous.bind(this.A)
    this.Me = this.A.clearSelection.bind(this.A)
    window.addEventListener(mb, this.lk.bind(this))
    return this
  }
  A.mk = function (a) {if (a = a.target.closest(".overview-panel")) a = a.querySelector(ta), Kk(a, tc, a.scrollTop === 0)}
  A.lk = function (a) {this.Wc && (a.target.closest(".item, .overview-panel") || this.A.clearSelection())}
  A.nk = function (a, b, c) {
    a = document.querySelector(ea)
    var d = this.B.items().indexOf(b) >= 0
    d &= !this.A.headless()
    !a || !Ik(a, nb) && d || (delete this.Wc, clearTimeout(this.Gc), a.remove(), a = null)
    if (d) {
      var e = Cd((G().template("OverviewItem").apply(Xd(b)) || "").trim())
      if (a) {
        c = b.compareTo ? b.compareTo(this.Wc) : -1
        var f = document.querySelector("#overview .overview-panel.current")
        if (f) {
          if (c == 0) return
          V(f, qb)
          U(f, c < 0 ? "left" : lc)
          U(e, c < 0 ? lc : "left")
          setTimeout(function () {f.remove()}, Ap.ye || 0)
        }
        a.append(e)
        setTimeout(function () {
          e &&
          (V(e, lc), V(e, "left"))
        }, 0)
      } else {
        a = Cd((G().template(Na).apply(Xd(b)) || "").trim())
        document.body.prepend(a)
        try {a.append(e)} catch (l) {try {a.append(e)} catch (m) {window.console.log(Ka)}}
        if (c = c ? c : document.querySelector(oa + b.id + "\"]")) {
          d = getComputedStyle(e)
          var h = { top: d.top, right: d.right, bottom: d.bottom, left: d.left }
          d = c.getBoundingClientRect()
          c = {
            top: d.top + hc,
            right: window.innerWidth - d.left - c.offsetWidth + hc,
            bottom: window.innerHeight - d.top - c.offsetHeight + hc,
            left: d.left + hc
          }
          U(e, Tb)
          Y(e, c)
          setTimeout(function () {
            V(e,
              Tb)
            Y(e, h)
          }, 0)
        }
      }
      this.Wc = b
      U(a, ac)
      U(e, qb)
      U(e, tc)
      if (a = e.querySelector(ta)) a.focus(), a.addEventListener(mc, this.mk.bind(this));
      (a = e.querySelector(".next")) && a.addEventListener(mb, Bp(this.cf));
      (a = e.querySelector(".previous")) && a.addEventListener(mb, Bp(this.jf));
      (a = e.querySelector(".close")) && a.addEventListener(mb, Bp(this.Me))
      U(document.body, "overview-open")
      if ((a = F.decode().fragment) && F.isSamePage(b.url, !0)) {
        if (!/^[a-zA-Z][\w:.-]*$/.test(a)) return
        var k = e.querySelector("[id=\"" + a + "\"],[name=\"" + a + "\"]")
        k && setTimeout(function () {k.scrollIntoView()}, 1100)
      }
      this.A.viewItem(b, e)
      this.A.updated()
    }
  }

  function Bp(a) {
    return function (b) {
      b.stopPropagation()
      b.preventDefault()
      a()
    }
  }

  A.Rf = function () {
    var a = document.querySelector(ea)
    a && U(a, nb)
    V(document.body, "overview-open")
    delete this.Wc
    clearTimeout(this.Gc)
    this.Gc = setTimeout(function () {
      var b = document.querySelector(ea)
      b && b.remove()
    }, Ap.ye || 0)
  }
  Ap.ye = 1E3

  function Cp() {
    this.ze = !1
    this.lc = {}
    this.Xd = this.Tf.bind(this)
  }

  A = Cp.prototype
  A.init = function (a, b) {
    this.A = a
    this.B = b
    this.A.addListener(Ec, this.Sf.bind(this))
    this.Sf()
    return this
  }

  function Dp(a) {return a.ia ? a.ia.value : ""}

  A.Sf = function () {
    !this.ze && (this.ia = document.querySelector("input#search")) && (this.ia.addEventListener("keyup", this.Al.bind(this)), this.ia.addEventListener("focus", this.Jl.bind(this)), this.ia.addEventListener("blur", this.Gl.bind(this)), this.ze = !0)
    return this.ze
  }
  A.Al = function (a) {
    if (a.keyCode == 13) Ep(this), a.preventDefault() else if (a.keyCode == 27) Fp(this), a.preventDefault() else if (a.keyCode == 38 || a.keyCode == 40) {
      if (this.ma) {
        var b = Array.from(this.ma.querySelectorAll("li")), c = b.indexOf(this.ma.querySelector("li.active"))
        c = a.keyCode == 38 ? c < 0 ? b.length - 1 : Math.max(0, c - 1) : c < 0 ? 0 : Math.min(b.length - 1, c + 1)
        for (var d = 0; d < b.length; ++d) {
          var e = b[d]
          V(e, Xa)
          c === d && U(e, Xa)
        }
      }
      a.preventDefault()
    } else (a = Dp(this)) && a != this.xj && Fp(this), clearTimeout(this.Gm), this.Gm = setTimeout(this.nj.bind(this),
      this.lc[a] ? 0 : 500)
  }
  A.Jl = function (a) {this.nj(a)}
  A.Gl = function () {
    var a = this
    setTimeout(function () {Fp(a)}, 300)
  }

  function Ep(a) {
    var b = Dp(a)
    if (b) {
      if (a.ma) {
        var c = a.lc[b], d = a.ma.querySelector("li.active")
        if (d) {
          var e = d.dataset.identifier
          if (e && (c = c.items().filter(function (f) {return f.id == e})[0])) {
            a.A.select(c)
            return
          }
        }
      }
      jl(b)
    }
  }

  A.nj = function () {
    var a = this, b = Dp(this)
    if (b) {
      var c = this.lc[b]
      c || (c = this.B.iterator(this.A.getSetting(fb), new td({ query: b, Od: "best" }), 7), this.lc[b] = c)
      c && (c.reset(), this.ia && U(this.ia, nc), c.next(function (d) {
        if (Dp(a) == b) {
          a.xj = b
          var e = a.lc[b], f = blogger.templates().template("QuickSearch")
          if (f) {
            Fp(a)
            d = G().oa({ Posts: d })
            d.scope("SearchQuery", b)
            var h = 0
            e.S && (e = e.S.resource()) && (h = e.total)
            d.scope("SearchResultCount", h)
            f = Cd(f.apply(d))
            a.ma = f
            document.body.append(f)
            f.addEventListener(mb, a.pk.bind(a))
            window.addEventListener(mc, a.Xd)
            window.addEventListener(ic, a.Xd)
            a.Tf()
          }
          a.ia && V(a.ia, nc)
        }
      }))
    } else Fp(this)
  }
  A.Tf = function () {
    if (this.ma) {
      for (var a = this.ia, b = 0, c = !1, d = a; d; d = d.parentElement) getComputedStyle(d).position === "fixed" && (d !== a && (b = parseInt(getComputedStyle(d).top, 10)), c = !0)
      d = c ? a.offsetTop : a.getBoundingClientRect().top + window.pageYOffset
      c = this.ma.offsetWidth
      b = d + a.offsetHeight + b
      a = a.getBoundingClientRect().left + window.pageXOffset + a.offsetWidth - c
      mn(this.ma, a, b)
      Y(this.ma, "position", "fixed")
    }
  }

  function Fp(a) {
    a.ia && V(a.ia, nc)
    a.ma && (delete a.xj, a.ma.remove(), delete a.ma, window.removeEventListener(mc, a.Xd), window.removeEventListener(ic, a.Xd))
  }

  A.pk = function (a) {
    this.ma.querySelectorAll("li").forEach(function (b) {V(b, Xa)});
    (a = a.target.closest("li")) && U(a, Xa)
    Ep(this)
  }

  function Gp() {}

  Gp.prototype.init = function (a) {
    this.A = a
    document.body.addEventListener(mb, this.qk.bind(this))
    return this
  }
  Gp.prototype.qk = function (a) {
    var b = a.target.closest("a")
    if (!a.metaKey && b) {
      var c = F.decode(b.getAttribute(Nb))
      if (c && il(c) && b.getAttribute("target") !== "_blank" && !b.hasAttribute(tb) && !/^\/p\//.test(c.path)) {
        var d, e = b.closest("*[data-id]")
        e && (d = e.getAttribute(rb))
        e = !1
        var f = b.closest(".article-content")
        f && (e = f.getAttribute("itemprop") == "articleBody")
        if ((d || e) && !this.A.getSetting(Db) && !Ik(b, "label") && !c.path.startsWith("/search/label")) return this.A.select(e ? c.url : d, b), a.preventDefault(), a.stopPropagation(),
          !1
        a = b.getAttribute("data-view-name")
        b = F.decode()
        a ? (b.param(Gc, c.param(Gc)), c = b) : (b.param(eb) && b.param(eb).length > 0 && c.param(eb, b.param(eb)), b.param(Gc) && c.param(Gc, b.param(Gc)));
        (a = c.encode()) && window.location.href != a && (c = window.location, a = zi(a), a !== void 0 && (c.href = a))
        return !1
      }
    }
  }

  function Hp() {
    this.Nb = null
    this.Cb = []
  }

  Hp.prototype.init = function (a) {
    this.A = a
    if (this.A.headless()) return this
    this.A.addListener(Ec, this.sk.bind(this))
    window.addEventListener(mc, this.rk.bind(this))
    return this
  }
  Hp.prototype.sk = function () {
    var a = this
    this.Cb = []
    document.querySelectorAll(".share-controls").forEach(function (b) {
      function c() {
        Ip(b)
        a.Cb.splice(a.Cb.indexOf(b), 1)
        Jp()
        Kp(a)
      }

      b.dataset.defer ? (b.addEventListener("mouseover", c, { once: !0 }), a.Cb.push(b)) : b.dataset.delay && (Array.from(b.children).forEach(function (d) {Jk(d)}), Jk(b), setTimeout(c, b.dataset.delay || 0))
    })
    this.vj()
  }

  function Ip(a) {
    a.querySelectorAll(".defer").forEach(function (b) {V(b, wb)})
    V(a, wb)
  }

  Hp.prototype.rk = function () {
    clearTimeout(this.Nb)
    this.Nb = setTimeout(this.vj.bind(this), 300)
  }
  Hp.prototype.vj = function () {
    Lp(this)
    Jp()
    Kp(this)
  }

  function Lp(a) {a.Cb = a.Cb.filter(function (b) {return Mp(b) ? (Ip(b), !1) : !0})}

  function Mp(a) {
    var b = window.pageYOffset, c = window.pageXOffset + window.innerWidth, d = window.pageYOffset + window.innerHeight,
      e = window.pageXOffset, f = Np(a)
    if (!(f.top <= d && f.right >= e && f.bottom >= b && f.left <= c)) return !1
    for (b = []; a; a = a.parentElement) b.push(a)
    return !b.filter(function (h) {return getComputedStyle(h).display == Yb || getComputedStyle(h).opacity == 0}).length
  }

  function Np(a) {
    var b = a.getBoundingClientRect()
    return {
      top: b.top + window.pageYOffset,
      right: b.left + window.pageXOffset + parseFloat(getComputedStyle(a).width),
      bottom: b.top + window.pageYOffset + parseFloat(getComputedStyle(a).height),
      left: b.left + window.pageXOffset
    }
  }

  function Jp() {
    Array.from(document.querySelectorAll(".share-twitter")).filter(function (a) {return !a.dataset.initialized && !Ik(a, wb)}).forEach(function (a) {
      a.dataset.initialized = !0
      var b = ["//platform.twitter.com/widgets/tweet_button.html?url=", encodeURIComponent(a.dataset.url), "&count=", a.dataset.count || "horizontal", "&text=", encodeURIComponent(a.dataset.text), "&size=", a.dataset.size || "medium"].join(""),
        c = document.createElement(Rb)
      c.setAttribute(Za, Bc)
      c.setAttribute("frameborder", "0")
      c.setAttribute("scrolling",
        "no")
      Ed(c, b)
      a.append(c)
    })
  }

  function Kp(a) {
    Array.from(document.querySelectorAll(".share-facebook")).filter(function (b) {return !b.dataset.initialized && !Ik(b, wb)}).forEach(function (b) {
      b.dataset.initialized = !0
      var c = new URL("//www.facebook.com/plugins/like.php?", a.A.getSetting(fb))
      c.searchParams.set(Nb, b.dataset.url)
      c.searchParams.set("send", Ab)
      c.searchParams.set("layout", b.dataset.layout || "button_count")
      c.searchParams.set(Wa, "like")
      c.searchParams.set("show_faces", Ab)
      c.searchParams.set("colorscheme", "light")
      var d = document.createElement(Rb)
      d.setAttribute(Za, Bc)
      d.setAttribute("frameborder", "0")
      d.setAttribute("scrolling", "no")
      Ed(d, c.href)
      b.append(d)
    })
  }

  function Op() {this.cj = this.Wl.bind(this)}

  A = Op.prototype
  A.init = function (a, b) {
    this.A = a
    this.B = b
    this.A.headless() && delete Op.Vf
    a = this.uk.bind(this)
    this.A.addListener(oc, a)
    this.A.addListener(Ic, a)
    this.A.addListener(lb, this.tk.bind(this))
    return this
  }
  A.uk = function (a, b) {
    var c = a.type === Ic
    if (!b.compareTo || b.compareTo(this.Uf) != 0) if (a = !document.querySelector(xa), this.Ae(), c || !((this.B.items() || []).indexOf(b) >= 0) || this.A.headless()) {
      c = Xd(b)
      var d = Cd((G().template(Ra).apply(c) || "").trim())
      ap(d.querySelector(".viewitem-inner"));
      (c = d.querySelector(".close")) && c.addEventListener(mb, this.Ae.bind(this))
      Kk(d, "new", a)
      U(document.body, "viewitem-open")
      try {document.body.prepend(d)} catch (f) {try {document.body.prepend(d)} catch (h) {window.console.log(Ka)}}
      a &&
      setTimeout(function () {V(d, "new")}, 1)
      if ((c = F.decode().fragment) && F.isSamePage(b.url, !0)) {
        if (!/^[a-zA-Z][\w:.-]*$/.test(c)) return
        var e = d.querySelector("[id=\"" + c + "\"],[name=\"" + c + "\"]")
        e && setTimeout(function () {e.scrollIntoView()}, a ? 1E3 : 1)
      }
      this.A.viewItem(b, d)
      this.A.updated()
      this.Uf = b
      window.addEventListener(mb, this.cj)
    }
  }
  A.Ae = function () {
    V(document.body, "viewitem-open")
    delete this.Uf
    document.querySelectorAll(xa).forEach(function (a) {Ik(a, nb) || (U(a, nb), setTimeout(function () {a.remove()}, Op.Vf || 0))})
    window.removeEventListener(mb, this.cj)
  }
  A.Wl = function (a) {a.target.closest(xa) || this.A.clearSelection()}
  A.tk = function () {this.Ae()}
  Op.Vf = 1E3
  var Wk = Xk()
  Vk("Adsense", tn)
  Vk("Comments", Xo)
  Vk("Filter", Yo)
  Vk("GadgetDock", cp)
  Vk("ItemHistory", jp)
  Vk("Lightbox", lp)
  Vk("Meta", np)
  Vk("Metrics", qp)
  Vk("Search", Cp)
  Vk("SelfSelect", Gp)
  Vk("Sharing", Hp)
  Vk(Ra, Op, !1)
  Vk(Na, Ap, !1)

  function Z(a) {
    this.enabled = !0
    this.Mb = !1
    this.P = a || "1"
    this.C = {}
    this.Ic = !1
    this.tj = !0
  }

  A = Z.prototype
  A.init = function (a) {
    this.ui = a
    Pp(this)
  }
  A.Im = function (a) {this.aj = a}

  function Pp(a) {
    a.Mb = !0
    a.aj && a.aj()
  }

  function Qp(a) {return (a = a.match(/_WidgetManager\._HandleControllerResult\(.*?,.*?,\{(.*)\}\);/)) ? eval("(function(){ return{" + a[1] + "}; })()") : null}

  A.render = function (a) {this.Mb && this.enabled && (a && Bd(a, this.T()), this.ui.updated && this.ui.updated(), this.Oc(a))}
  A.template = function (a, b) {
    var c = G()
    a = c.template(a)
    b = b && c.oa(b)
    return a ? (a.apply(b) || "").trim() : ""
  }
  A.N = function () {return ""}
  A.ca = function () {return ""}
  A.aa = function () {return ""}
  A.T = function () {return ""}
  A.Oc = function () {}
  A.ga = function (a, b) {
    var c = a.getSettings().widget_settings[b]
    c ? this.Cc(c) : (a = a.resources()) && a.length > 0 && a[0] && a[0].baseUrl ? (a = new URL(a[0].baseUrl), a.searchParams.append("v", "0"), a.searchParams.append(Wa, "initial"), a.searchParams.append(Kc, b), a.searchParams.append(jc, "js"), window.__wavt && a.searchParams.append("xssi_token", window.__wavt), fetch(a.href).then(function (d) {return d.text()}).then(this.Tl.bind(this)).catch(this.Ob.bind(this))) : this.Ob()
  }
  A.Tl = function (a) {(a = Qp(a)) ? this.Cc(a) : this.Ob()}
  A.Ob = function () {
    this.enabled = !1
    Pp(this)
  }
  A.Cc = function (a) {
    this.C = a
    Pp(this)
  }
  blogger.compileTemplate("{template:AttributionCSS}\n.attribution {\n  background-color: #f5f5f5;\n  background-image: -webkit-linear-gradient(top,#f5f5f5,#f1f1f1);\n  background-image: -moz-linear-gradient(top,#f5f5f5,#f1f1f1);\n  background-image: -ms-linear-gradient(top,#f5f5f5,#f1f1f1);\n  background-image: -o-linear-gradient(top,#f5f5f5,#f1f1f1);\n  background-image: linear-gradient(top,#f5f5f5,#f1f1f1);\n  bottom: 0;\n  color: #444;\n  font-size: 11px;\n  padding: 5px;\n  position: fixed;\n  text-align: center;\n  width: 100%;\n  z-index: 998;\n}\n{/template:AttributionCSS}\n{template:Attribution}\n<div class=\"attribution\">{attribution}</div>\n{/template:Attribution}\n")

  function Rp(a) {
    Z.call(this, a)
    this.tj = !1
  }

  D(Rp, Z)
  Rp.prototype.init = function (a, b) {
    this.ui = a
    a = document.querySelector(Kb)
    var c = a.querySelector("#attributioncss")
    c && c.remove()
    c = document.createElement(vc)
    c.setAttribute(Qb, "attributioncss")
    c.setAttribute(kb, qc)
    c.append(this.template("AttributionCSS"))
    a.append(c)
    this.ga(b, Fa + this.P)
  }
  Rp.prototype.render = function () {this.Mb && this.enabled && Bd(document.querySelector("#attribution-container"), this.template(Fa, this.C))}
  blogger.compileTemplate("/* Copyright 2011 Google Inc. All Rights Reserved. */\n{template:BlogArchiveCSS}\n.blogarchive-tree {\n  padding: 12px;\n  {css-transition value=\"width 0.15s, height 0.15s\"}\n}\n\n.blogarchive-title {\n  padding: 8px;\n  vertical-align: middle;\n  line-height: 14px;\n  white-space: nowrap;\n  cursor: pointer;\n}\n\n.blogarchive-title:after {\n  content: \"\";\n  display: inline-block;\n  border-width: 5px;\n  border-color: transparent transparent transparent #666;\n  border-style: solid;\n  width: 0;\n  height: 0;\n  position: relative;\n  left: 4px;\n  visibility: hidden;\n}\n\n.blogarchive-title:hover:after {\n  border-color: transparent transparent transparent #ccc;\n}\n\n.blogarchive-expanded > .blogarchive-title:after {\n  border-color: transparent transparent transparent #666;\n}\n\n.blogarchive-title:hover:after,\n.blogarchive-expanded > .blogarchive-title:after {\n  visibility: visible;\n}\n\n.blogarchive-expanded > .blogarchive-title a {\n  color: #666;\n  font-weight: bold;\n}\n\n.blogarchive-flat .blogarchive-title:after {\n  display: none;\n}\n\n.blogarchive-loading {\n  background-image: url(data:image/gif;base64,R0lGODlhGAAYAPQAAP///wAAAM7Ozvr6+uDg4LCwsOjo6I6OjsjIyJycnNjY2KioqMDAwPLy8nZ2doaGhri4uGhoaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAHAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAGAAYAAAFriAgjiQAQWVaDgr5POSgkoTDjFE0NoQ8iw8HQZQTDQjDn4jhSABhAAOhoTqSDg7qSUQwxEaEwwFhXHhHgzOA1xshxAnfTzotGRaHglJqkJcaVEqCgyoCBQkJBQKDDXQGDYaIioyOgYSXA36XIgYMBWRzXZoKBQUMmil0lgalLSIClgBpO0g+s26nUWddXyoEDIsACq5SsTMMDIECwUdJPw0Mzsu0qHYkw72bBmozIQAh+QQABwABACwAAAAAGAAYAAAFsCAgjiTAMGVaDgR5HKQwqKNxIKPjjFCk0KNXC6ATKSI7oAhxWIhezwhENTCQEoeGCdWIPEgzESGxEIgGBWstEW4QCGGAIJEoxGmGt5ZkgCRQQHkGd2CESoeIIwoMBQUMP4cNeQQGDYuNj4iSb5WJnmeGng0CDGaBlIQEJziHk3sABidDAHBgagButSKvAAoyuHuUYHgCkAZqebw0AgLBQyyzNKO3byNuoSS8x8OfwIchACH5BAAHAAIALAAAAAAYABgAAAW4ICCOJIAgZVoOBJkkpDKoo5EI43GMjNPSokXCINKJCI4HcCRIQEQvqIOhGhBHhUTDhGo4diOZyFAoKEQDxra2mAEgjghOpCgz3LTBIxJ5kgwMBShACREHZ1V4Kg1rS44pBAgMDAg/Sw0GBAQGDZGTlY+YmpyPpSQDiqYiDQoCliqZBqkGAgKIS5kEjQ21VwCyp76dBHiNvz+MR74AqSOdVwbQuo+abppo10ssjdkAnc0rf8vgl8YqIQAh+QQABwADACwAAAAAGAAYAAAFrCAgjiQgCGVaDgZZFCQxqKNRKGOSjMjR0qLXTyciHA7AkaLACMIAiwOC1iAxCrMToHHYjWQiA4NBEA0Q1RpWxHg4cMXxNDk4OBxNUkPAQAEXDgllKgMzQA1pSYopBgonCj9JEA8REQ8QjY+RQJOVl4ugoYssBJuMpYYjDQSliwasiQOwNakALKqsqbWvIohFm7V6rQAGP6+JQLlFg7KDQLKJrLjBKbvAor3IKiEAIfkEAAcABAAsAAAAABgAGAAABbUgII4koChlmhokw5DEoI4NQ4xFMQoJO4uuhignMiQWvxGBIQC+AJBEUyUcIRiyE6CR0CllW4HABxBURTUw4nC4FcWo5CDBRpQaCoF7VjgsyCUDYDMNZ0mHdwYEBAaGMwwHDg4HDA2KjI4qkJKUiJ6faJkiA4qAKQkRB3E0i6YpAw8RERAjA4tnBoMApCMQDhFTuySKoSKMJAq6rD4GzASiJYtgi6PUcs9Kew0xh7rNJMqIhYchACH5BAAHAAUALAAAAAAYABgAAAW0ICCOJEAQZZo2JIKQxqCOjWCMDDMqxT2LAgELkBMZCoXfyCBQiFwiRsGpku0EshNgUNAtrYPT0GQVNRBWwSKBMp98P24iISgNDAS4ipGA6JUpA2WAhDR4eWM/CAkHBwkIDYcGiTOLjY+FmZkNlCN3eUoLDmwlDW+AAwcODl5bYl8wCVYMDw5UWzBtnAANEQ8kBIM0oAAGPgcREIQnVloAChEOqARjzgAQEbczg8YkWJq8nSUhACH5BAAHAAYALAAAAAAYABgAAAWtICCOJGAYZZoOpKKQqDoORDMKwkgwtiwSBBYAJ2owGL5RgxBziQQMgkwoMkhNqAEDARPSaiMDFdDIiRSFQowMXE8Z6RdpYHWnEAWGPVkajPmARVZMPUkCBQkJBQINgwaFPoeJi4GVlQ2Qc3VJBQcLV0ptfAMJBwdcIl+FYjALQgimoGNWIhAQZA4HXSpLMQ8PIgkOSHxAQhERPw7ASTSFyCMMDqBTJL8tf3y2fCEAIfkEAAcABwAsAAAAABgAGAAABa8gII4k0DRlmg6kYZCoOg5EDBDEaAi2jLO3nEkgkMEIL4BLpBAkVy3hCTAQKGAznM0AFNFGBAbj2cA9jQixcGZAGgECBu/9HnTp+FGjjezJFAwFBQwKe2Z+KoCChHmNjVMqA21nKQwJEJRlbnUFCQlFXlpeCWcGBUACCwlrdw8RKGImBwktdyMQEQciB7oACwcIeA4RVwAODiIGvHQKERAjxyMIB5QlVSTLYLZ0sW8hACH5BAAHAAgALAAAAAAYABgAAAW0ICCOJNA0ZZoOpGGQrDoOBCoSxNgQsQzgMZyIlvOJdi+AS2SoyXrK4umWPM5wNiV0UDUIBNkdoepTfMkA7thIECiyRtUAGq8fm2O4jIBgMBA1eAZ6Knx+gHaJR4QwdCMKBxEJRggFDGgQEREPjjAMBQUKIwIRDhBDC2QNDDEKoEkDoiMHDigICGkJBS2dDA6TAAnAEAkCdQ8ORQcHTAkLcQQODLPMIgIJaCWxJMIkPIoAt3EhACH5BAAHAAkALAAAAAAYABgAAAWtICCOJNA0ZZoOpGGQrDoOBCoSxNgQsQzgMZyIlvOJdi+AS2SoyXrK4umWHM5wNiV0UN3xdLiqr+mENcWpM9TIbrsBkEck8oC0DQqBQGGIz+t3eXtob0ZTPgNrIwQJDgtGAgwCWSIMDg4HiiUIDAxFAAoODwxDBWINCEGdSTQkCQcoegADBaQ6MggHjwAFBZUFCm0HB0kJCUy9bAYHCCPGIwqmRq0jySMGmj6yRiEAIfkEAAcACgAsAAAAABgAGAAABbIgII4k0DRlmg6kYZCsOg4EKhLE2BCxDOAxnIiW84l2L4BLZKipBopW8XRLDkeCiAMyMvQAA+uON4JEIo+vqukkKQ6RhLHplVGN+LyKcXA4Dgx5DWwGDXx+gIKENnqNdzIDaiMECwcFRgQCCowiCAcHCZIlCgICVgSfCEMMnA0CXaU2YSQFoQAKUQMMqjoyAglcAAyBAAIMRUYLCUkFlybDeAYJryLNk6xGNCTQXY0juHghACH5BAAHAAsALAAAAAAYABgAAAWzICCOJNA0ZVoOAmkY5KCSSgSNBDE2hDyLjohClBMNij8RJHIQvZwEVOpIekRQJyJs5AMoHA+GMbE1lnm9EcPhOHRnhpwUl3AsknHDm5RN+v8qCAkHBwkIfw1xBAYNgoSGiIqMgJQifZUjBhAJYj95ewIJCQV7KYpzBAkLLQADCHOtOpY5PgNlAAykAEUsQ1wzCgWdCIdeArczBQVbDJ0NAqyeBb64nQAGArBTt8R8mLuyPyEAOwAAAAAAAAAAAA==);\n  background-repeat: no-repeat;\n  background-position: left center;\n  height: 28px;\n}\n\n.blogarchive-loading:after {\n  content: \"loading\";\n  color: #666;\n  display: inline-block;\n  line-height: 28px;\n  margin-left: 28px;\n  min-width: 192px;\n}\n\n.blogarchive-dates {\n  min-width: 128px;\n}\n\n.blogarchive-tree > .blogarchive-dates {\n  position: relative;\n}\n\n.blogarchive-date > .blogarchive-dates {\n  display: none;\n  position: absolute;\n  top: 0;\n  left: 90%;\n  {css-transition value=\"left 0.15s ease-out\"}\n}\n\n.blogarchive-date.blogarchive-expanded > .blogarchive-dates {\n  display: block;\n  left: 100%;\n}\n\n.blogarchive-expanded > .blogarchive-dates {\n  display: inline-block;\n}\n\n.blogarchive-post-count {\n  color: #666;\n  font-size: 12px;\n}\n.blogarchive-post-count:before {\n  content: \" (\";\n}\n.blogarchive-post-count:after {\n  content: \")\";\n}\n.blogarchive-post {\n  padding: 8px 0 0 16px;\n  text-indent: -8px;\n  min-width: 200px;\n}\n\n@media only screen and (max-width : 546px) {\n  .blogarchive-tree {\n    height: auto !important;\n    width: auto !important;\n  }\n\n  .blogarchive-date > .blogarchive-dates {\n    position: static;\n    margin-left: 12px;\n  }\n\n  .blogarchive-post {\n    padding: 4px 0 4px 16px;\n  }\n}\n\n{/template:BlogArchiveCSS}\n{template:BlogArchiveGadgetDefaultTitle}\nArchive\n{/template:BlogArchiveGadgetDefaultTitle}\n\n\x3c!-- Attributes {dates, flat} --\x3e\n{template:BlogArchiveGadget}\n<div class=\"blogarchive-tree blogarchive-expanded{block:flat} blogarchive-flat{/block:flat}\">\n  <ul class=\"blogarchive-dates\">\n  {block:items}\n  {BlogArchiveGadgetYear}\n  {/block:items}\n  </ul>\n</div>\n{/template:BlogArchiveGadget}\n\n{template:BlogArchiveGadgetYear}\n<li class=\"blogarchive-date blogarchive-collapsed\">\n  <div class=\"blogarchive-title\">\n    <a href=\"{url}\">{name}</a><span class=\"blogarchive-post-count\">{post-count}</span>\n  </div>\n  <ul class=\"blogarchive-dates\">\n  {block:items}\n    {BlogArchiveGadgetMonth}\n  {/block:items}\n  {BlogArchiveGadgetPosts}\n  </ul>\n</li>\n{/template:BlogArchiveGadgetYear}\n\n{template:BlogArchiveGadgetMonth}\n<li class=\"blogarchive-date blogarchive-collapsed\">\n  <div class=\"blogarchive-title\">\n    <a href=\"{url}\">{name}</a><span class=\"blogarchive-post-count\">{post-count}</span>\n  </div>\n  <ul class=\"blogarchive-dates\">\n  {block:items}\n    {BlogArchiveGadgetDate}\n  {/block:items}\n  {BlogArchiveGadgetPosts}\n  </ul>\n</li>\n{/template:BlogArchiveGadgetMonth}\n\n{template:BlogArchiveGadgetDate}\n<li class=\"blogarchive-date blogarchive-collapsed\">\n  <div class=\"blogarchive-title\">\n    <a href=\"{url}\">{name}</a><span class=\"blogarchive-post-count\">{post-count}</span>\n  </div>\n  <ul>\n  {BlogArchiveGadgetPosts}\n  </ul>\n</li>\n{/template:BlogArchiveGadgetDate}\n\n{template:BlogArchiveGadgetPosts}\n{block:posts}\n  {BlogArchiveGadgetPost}\n{/block:posts}\n{/template:BlogArchiveGadgetPosts}\n\n{template:BlogArchiveGadgetPost}\n<li class=\"blogarchive-post\">\n  <a href=\"{url}\">{title}</a>\n</li>\n{/template:BlogArchiveGadgetPost}\n\n{template:BlogArchiveGadgetIconUrl}\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYAgMAAACdGdVrAAAACVBMVEX///8AAAD///9+749PAAAAAnRSTlMAAHaTzTgAAAAwSURBVHherYyxCQAwCAR/yhTZy8ZeC6c0BETU1msOjucBeyBF54s1FHEs5fZYWb12TL8307RAxVQAAAAASUVORK5CYII=\n{/template:BlogArchiveGadgetIconUrl}\n\n{template:BlogArchiveGadgetIconSelectedUrl}\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYAgMAAACdGdVrAAAACVBMVEX///8AAAAzMzMTx/ayAAAAAnRSTlMAAHaTzTgAAAAwSURBVHherYyxCQAwCAR/yhTZy8ZeC6c0BFS09pqD43nAHijR+WINZZxLuTN2Vq8dTL8301DjA9oAAAAASUVORK5CYII=\n{/template:BlogArchiveGadgetIconSelectedUrl}\n")

  function Sp(a) {
    Z.call(this, a)
    this.af = !1
    this.xf = null
  }

  D(Sp, Z)
  A = Sp.prototype
  A.init = function (a, b) {
    this.ui = a
    a = document.querySelector(Kb)
    var c = a.querySelector("#blogarchivecss")
    c && c.remove()
    c = document.createElement(vc)
    c.setAttribute(Qb, "blogarchivecss")
    c.setAttribute(kb, qc)
    c.append(this.template("BlogArchiveCSS"))
    a.append(c)
    this.ga(b, Ia + this.P)
  }
  A.render = function (a) {
    var b = this
    this.Mb && this.enabled && (Bd(a, this.T()), this.af || a.querySelectorAll(".blogarchive-title").forEach(function (c) {c.addEventListener(mb, b.Ul.bind(b))}), this.xf = a)
  }

  function Tp(a) {
    if (a.data) {
      for (var b = a.data, c = b.length, d = 0; d < c; d++) Tp(b[d])
      a.items = a.data
      delete a.data
    }
  }

  A.Cc = function (a) {
    Tp(a)
    this.C = a
    this.af = a.style == "FLAT" || a.style == "MENU"
    Pp(this)
  }
  A.Ul = function (a) {
    if (!a.target.matches("a")) {
      var b = a.target.closest(".blogarchive-date")
      a = Ik(b, gb)
      Up(b, a)
      a = b.querySelectorAll(".blogarchive-dates", b)
      var c = 0
      a.forEach(function (d) {c += d.children.length})
      c === 0 && (b = (b = b.querySelector("a")) ? b.getAttribute(Nb) : void 0, Vp(this, a[0], b))
      Wp(this)
    }
  }

  function Up(a, b) {
    a.parentNode.querySelectorAll(".blogarchive-expanded").forEach(function (c) {Xp(c, !0)})
    Xp(a, b)
  }

  function Xp(a, b) {
    Kk(a, gb, !b)
    Kk(a, "blogarchive-collapsed", b)
  }

  function Yp(a) {
    var b = 0, c = 0
    a.xf.querySelectorAll(".blogarchive-expanded > .blogarchive-dates").forEach(function (d) {
      d = getComputedStyle(d)
      b += parseFloat(d.width)
      c = Math.max(parseFloat(d.height), c)
    })
    return { width: b, height: c }
  }

  function Wp(a) {
    var b = a.xf.querySelector(".blogarchive-tree")
    a = Yp(a)
    on(b, a.width, a.height)
  }

  function Vp(a, b, c) {
    if (b && c) {
      U(b, hb)
      var d = new URL(window.location.href)
      d.searchParams.set("v", "0")
      d.searchParams.set(Wa, "getTitles")
      d.searchParams.set(Kc, Ia + a.P)
      d.searchParams.set("widgetType", Ia)
      d.searchParams.set(jc, "js")
      d.searchParams.set("path", c)
      fetch(d.href).then(function (e) {return e.text()}).then(function (e) {
        e = Qp(e)
        Tp(e)
        e && (V(b, hb), Bd(b, a.template("BlogArchiveGadgetPosts", { posts: e.posts })), Wp(a))
      }).catch(function () {})
    }
  }

  A.N = function () {return this.C.title || this.template("BlogArchiveGadgetDefaultTitle")}
  A.ca = function () {return this.template("BlogArchiveGadgetIconUrl")}
  A.aa = function () {return this.template("BlogArchiveGadgetIconSelectedUrl")}
  A.T = function () {return this.template("BlogArchiveGadget", { items: this.C.items || {}, flat: this.af })}
  blogger.compileTemplate("/* Copyright 2012 Google Inc. All Rights Reserved. */\n{template:GadgetLogoCSS}\n\n.gadget-logo { padding: 6px; }\n\n.gadget-logo-item { line-height: 14px; }\n\n{/template:GadgetLogoCSS}\n{template:GadgetLogoDefaultTitle}\nLogo\n{/template:GadgetLogoDefaultTitle}\n\n\x3c!-- Attributes {links} --\x3e\n{template:GadgetLogo}\n  <ul class=\"gadget-logo\">\n    <li class=\"gadget-logo-item\">\n      <a href=\"//www.blogger.com\"><img src=\"{fullButton}\"/></a>\n    </li>\n  </ul>\n{/template:GadgetLogo}\n\n\x3c!-- Base 64 code for image /bloggerbutton/resources/icon.png --\x3e\n{template:GadgetLogoIconUrl}\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWBAMAAAAoU0G7AAAAKlBMVEUAAAD///////////////////////////////////////////////////+Gu8ovAAAADXRSTlMAAFCfr0DvzyAQj3C/rdBwigAAAHZJREFUeF6dz70JhGAQhOHxJ7ULMd4GDO7AXDsQe7ABc0Hs6Dq447I7phf3W3ZBMPPNHiYaADW1DkAGFLTE0NL6JeT0ekUZEEUVGBUrOQM7+U6LYSH/myF6nfG5iwla45CE4rKUjPiwC94AtIGv3fZEgZrWE9kBCpSeoeUfB5QAAAAASUVORK5CYII=\n{/template:GadgetLogoIconUrl}\n\n\x3c!-- Base 64 code for image /bloggerbutton/resources/icon-selected.png --\x3e\n{template:GadgetLogoIconSelectedUrl}\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWBAMAAAAoU0G7AAAAKlBMVEUAAAD///83Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3NzchX4A7AAAADXRSTlMAAFCfr0DvzyAQj3C/rdBwigAAAHZJREFUeF6dz70JhGAQhOHxJ7ULMd4GDO7AXDsQe7ABc0Hs6Dq447I7phf3W3ZBMPPNHiYaADW1DkAGFLTE0NL6JeT0ekUZEEUVGBUrOQM7+U6LYSH/myF6nfG5iwla45CE4rKUjPiwC94AtIGv3fZEgZrWE9kBCpSeoeUfB5QAAAAASUVORK5CYII=\n{/template:GadgetLogoIconSelectedUrl}\n")

  function Zp(a) {Z.call(this, a)}

  D(Zp, Z)
  A = Zp.prototype
  A.init = function (a, b) {
    this.ui = a
    a = document.querySelector(Kb)
    var c = a.querySelector("#logocss")
    c && c.remove()
    c = document.createElement(vc)
    c.setAttribute(Qb, "logocss")
    c.setAttribute(kb, qc)
    c.append(this.template("GadgetLogoCSS"))
    a.append(c)
    this.ga(b, "BloggerButton" + this.P)
  }
  A.N = function () {return this.C.title || this.template("GadgetLogoDefaultTitle")}
  A.ca = function () {return this.template("GadgetLogoIconUrl")}
  A.aa = function () {return this.template("GadgetLogoIconSelectedUrl")}
  A.T = function () {return this.template("GadgetLogo", this.C)}
  blogger.compileTemplate("/* Copyright 2012 Google Inc. All Rights Reserved. */\n{template:GadgetBlogListCSS}\n.gadget-bloglist {\n  padding: 12px;\n  min-width: 240px;\n}\n\n.gadget-bloglist-item {\n  line-height: 14px;\n  padding: 8px;\n}\n\n.gadget-bloglist-title {\n  font-weight: bold;\n  height: 16px;\n  line-height: 16px;\n  margin: 0 0 2px 0;\n}\n\n.gadget-bloglist-title img, .gadget-bloglist-title a {\n  vertical-align: middle;\n}\n\n.gadget-bloglist-recent {\n  font-size: 11px;\n}\n\n.gadget-bloglist-recent-title {\n  display: none;\n}\n.gadget-bloglist-show-recent-title .gadget-bloglist-recent-title {\n  display: block;\n}\n\n.gadget-bloglist-recent-thumbnail {\n  display: none;\n  float: left;\n  margin: 4px 8px 0 0;\n}\n.gadget-bloglist-show-recent-thumbnail .gadget-bloglist-recent-thumbnail {\n  display: inline-block;\n}\n\n.gadget-bloglist-recent-snippet {\n  display: none;\n}\n.gadget-bloglist-show-recent-snippet .gadget-bloglist-recent-snippet {\n  display: inline;\n}\n\n.gadget-bloglist-recent-update {\n  display: none;\n}\n.gadget-bloglist-show-recent-update .gadget-bloglist-recent-update {\n  display: block;\n}\n\n{/template:GadgetBlogListCSS}\n{template:GadgetBlogListDefaultTitle}\nLink List\n{/template:GadgetBlogListDefaultTitle}\n\n\x3c!-- Attributes {items} --\x3e\n{template:GadgetBlogList}\n<ul class=\"gadget-bloglist\n    {block:IfshowItemTitle}gadget-bloglist-show-recent-title{/block:IfshowItemTitle}\n    {block:IfshowItemSnippet}gadget-bloglist-show-recent-snippet{/block:IfshowItemSnippet}\n    {block:IfshowItemThumbnail}gadget-bloglist-show-recent-thumbnail{/block:IfshowItemThumbnail}\n    {block:IfshowTimePeriodSinceLastUpdate}gadget-bloglist-show-recent-update{/block:IfshowTimePeriodSinceLastUpdate}\">\n  {block:items}\n  {GadgetBlogListItem}\n  {/block:items}\n</ul>\n{/template:GadgetBlogList}\n\n\x3c!-- Attributes {blogTitle, blogUrl, blogIconUrl,\n    itemTitle, itemUrl, itemSnippet, itemThumbnail,\n    timePeriodSinceLastUpdate} --\x3e\n{template:GadgetBlogListItem}\n<li class=\"gadget-bloglist-item\">\n  <div class=\"gadget-bloglist-title\">\n    {block:IfblogIconUrl}\n    <img src=\"{blogIconUrl}\" width=\"16\" height=\"16\" />\n    {/block:IfblogIconUrl}\n    <a href=\"{blogUrl}\">\n      {blogTitle}\n    </a>\n  </div>\n  <div class=\"gadget-bloglist-recent\">\n    <p>\n      {block:IfitemTitle}\n      <a href=\"{itemUrl}\" class=\"gadget-bloglist-recent-title\">{itemTitle}</a>\n      {/block:IfitemTitle}\n      {block:IfitemThumbnail}\n      {block:IfitemThumbnail.url}\n      <a href=\"{itemUrl}\" class=\"gadget-bloglist-recent-thumbnail\">\n        <img src=\"{itemThumbnail.url}\"\n            width=\"{itemThumbnail.width}\" height=\"{itemThumbnail.height}\"/>\n      </a>\n      {/block:IfitemThumbnail.url}\n      {/block:IfitemThumbnail}\n      <span class=\"gadget-bloglist-recent-snippet\">{itemSnippet}</span>\n    </p>\n    {block:IftimePeriodSinceLastUpdate}\n    <div class=\"gadget-bloglist-recent-update\">{timePeriodSinceLastUpdate}</div>\n    {/block:IftimePeriodSinceLastUpdate}\n  </div>\n</li>\n{/template:GadgetBlogListItem}\n\n{template:GadgetBlogListIconUrl}\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAOCAYAAADJ7fe0AAAAIUlEQVQoz2P4jwQYoOA/iYBh8BgyeMBowI4GLD0CFmQGAJeZHQCjUvPAAAAAAElFTkSuQmCC\n{/template:GadgetBlogListIconUrl}\n\n{template:GadgetBlogListIconSelectedUrl}\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAOCAYAAADJ7fe0AAAAJ0lEQVQoz2MwNjb+D8MMUIAsRgxmGDyGDB4wGrCjAUuPgP3//z8DAG+r2iZzG/daAAAAAElFTkSuQmCC\n{/template:GadgetBlogListIconSelectedUrl}\n")

  function $p(a) {Z.call(this, a)}

  D($p, Z)
  A = $p.prototype
  A.init = function (a, b) {
    this.ui = a
    a = document.querySelector(Kb)
    var c = a.querySelector("#bloglistcss")
    c && c.remove()
    c = document.createElement(vc)
    c.setAttribute(Qb, "bloglistcss")
    c.setAttribute(kb, qc)
    c.append(this.template("GadgetBlogListCSS"))
    a.append(c)
    this.ga(b, "BlogList" + this.P)
  }
  A.N = function () {return this.C.title || this.template("GadgetBlogListDefaultTitle")}
  A.ca = function () {return this.template("GadgetBlogListIconUrl")}
  A.aa = function () {return this.template("GadgetBlogListIconSelectedUrl")}
  A.T = function () {return this.template("GadgetBlogList", this.C)}
  blogger.compileTemplate("/* Copyright 2012 Google Inc. All Rights Reserved. */\n{template:GadgetImageCSS}\n\n.image-gadget-content {\n  padding: 0 12px;\n  text-align: center;\n}\n\n{/template:GadgetImageCSS}\n{template:GadgetImageDefaultTitle}\nPicture\n{/template:GadgetImageDefaultTitle}\n\n\x3c!-- Attributes {link, width, height, title, sourceUrl, caption} --\x3e\n{template:GadgetImage}\n  <div class=\"image-gadget-content\">\n    <a href=\"{link}\">\n      <img width=\"{width}\" height=\"{height}\" src=\"{sourceUrl}\"\n           alt=\"{title}\" style=\"visibility: visible;\" />\n    </a>\n    <div class=\"caption\">{caption}</div>\n  </div>\n{/template:GadgetImage}\n\n\x3c!-- Base 64 code for image/resources/icon.png --\x3e\n{template:GadgetImageIconUrl}\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAAAyUlEQVR42u2UMQoCMRBFR7Sw0ksseIDUNiIewNZmK2sLwXN4E8EDiFUSSO0BrMUrjH+qhFhkRzaI4INXpJi8yRZLzAyrQcSVSQPUp//ADwWstXN4ggtjDBXUB0IILCDwdM5New3g0i1HJLJHhFIzdAHZPkXOuHQEx/AK73CmC8Ttl/yOBDbwkJwvnwbOHMkjj+xVK1UAA40MFonB4L0faAJHViDLILDuFMDlExnQgsANDrsEdhzRRtpiIN9e+6m+8C+qTP1A5Qi9ANfX3A/iP+/QAAAAAElFTkSuQmCC\n{/template:GadgetImageIconUrl}\n\n\x3c!-- Base 64 code for image/resources/icon-selected.png --\x3e\n{template:GadgetImageIconSelectedUrl}\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAMAAADto6y6AAAAb1BMVEX///83Nzc2NjY4ODjPz881NTVOTk739/dJSUl2dnZFRUXz8/Ovr6+kpKRaWlrLy8v5+floaGjg4ODKysq4uLiioqJpaWlzc3NcXFxGRkbIyMjj4+NfX1+NjY2+vr709PRAQEBWVlanp6ezs7NSUlISFTdWAAAAAXRSTlMAQObYZgAAAIJJREFUeF610TcSAzAIRFEWkJxzzvH+ZzQjeWwxpvUved1CCh/XlBBDMlD6SQtQEPM/QHuTEDpd6Q8iGIrIKIKxQabpLM89LMTCcgWsPWwMgO0OwL6Fg+DTsYUTms5fuFwb4JvBe8S73/1RgA2e7s6ZKBlw9I8ClnuelSr4Uo00vusL6wAErFKALucAAAAASUVORK5CYII=\n\n{/template:GadgetImageIconSelectedUrl}\n")

  function aq(a) {Z.call(this, a)}

  D(aq, Z)
  A = aq.prototype
  A.init = function (a, b) {
    this.ui = a
    this.Ic = !0
    a = document.querySelector(Kb)
    var c = a.querySelector("#Imagecss")
    c && c.remove()
    c = document.createElement(vc)
    c.setAttribute(Qb, "Imagecss")
    c.setAttribute(kb, qc)
    c.append(this.template("GadgetImageCSS"))
    a.append(c)
    this.ga(b, "Image" + this.P)
  }
  A.N = function () {return this.C.title || this.template("GadgetImageDefaultTitle")}
  A.ca = function () {return this.template("GadgetImageIconUrl")}
  A.aa = function () {return this.template("GadgetImageIconSelectedUrl")}
  A.T = function () {
    this.Ic = !this.C.shrinkToFit
    return this.template("GadgetImage", this.C || [])
  }
  A.Oc = function (a) {a && !this.Ic && (a = a.closest(".gadget-title, .gadget")) && U(a, "image-gadget-content")}
  blogger.compileTemplate("/* Copyright 2011 Google Inc. All Rights Reserved. */\n{template:GadgetLabelCSS}\n.gadget-label {\n  padding: 12px;\n  min-width: 320px;\n}\n\n.gadget-label-item {\n  line-height: 14px;\n  padding: 8px;\n}\n\n.gadget-label-cloud .gadget-label-item {\n  display: inline-block;\n}\n\n.gadget-label-cloud .gadget-label-size-1 {\n  font-size: 80%;\n}\n.gadget-label-cloud .gadget-label-size-2 {\n  font-size: 90%;\n}\n.gadget-label-cloud .gadget-label-size-3 {\n  font-size: 100%;\n}\n.gadget-label-cloud .gadget-label-size-4 {\n  font-size: 120%;\n}\n.gadget-label-cloud .gadget-label-size-5 {\n  font-size: 160%;\n}\n\n.gadget-label-count {\n  display: none;\n  color: #666;\n  font-size: 12px;\n}\n.gadget-label-show-freq-numbers .gadget-label-count {\n  display: inline;\n}\n.gadget-label-count:before {\n  content: \" (\";\n}\n.gadget-label-count:after {\n  content: \")\";\n}\n\n{/template:GadgetLabelCSS}\n{template:GadgetLabelDefaultTitle}\nLabel\n{/template:GadgetLabelDefaultTitle}\n\n\x3c!-- Attributes {labels, display, showFreqNumbers} --\x3e\n{template:GadgetLabel}\n<ul class=\"gadget-label gadget-label-{display}{block:IfshowFreqNumbers} gadget-label-show-freq-numbers{/block:IfshowFreqNumbers}\">\n  {block:labels}\n  {GadgetLabelItem}\n  {/block:labels}\n</ul>\n{/template:GadgetLabel}\n\n\x3c!-- Attributes {name, count, cssSize, url} --\x3e\n{template:GadgetLabelItem}\n<li class=\"gadget-label-item gadget-label-size-{cssSize}\">\n  <a href=\"{url}\">{name}</a><span class=\"gadget-label-count\">{count}</span>\n</li>\n{/template:GadgetLabelItem}\n\n{template:GadgetLabelIconUrl}\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAgUlEQVQ4y6XTwQ3AIAgFUEZyhI7gCIzuCGzwe9HWKhgo/2SUvBBFgi8XGQFAtBQ3AxEAxYPUvlkj0Iy05cDdUbQTFYrciQlpSCQCoGSRt6O+SEHUW8pAMm44A/H83n8gBrBNXwTi54mVMfZA/Bk241OdIF5qyYwBsVJHx0yQaMBAblcXSj0+j7awAAAAAElFTkSuQmCC\n{/template:GadgetLabelIconUrl}\n\n{template:GadgetLabelIconSelectedUrl}\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAgklEQVQ4jaXSAQrAIAgAQJ8U9IE9YU/w6T2hH7gVWxPR0BlIUXJYBrVWcsQBxiAiAJHcDKTfUTzIOTbHHIE40vhBpKJoJSoUeRMT0pBITCiLfBU9ixQ0kJKE+tvSDIT8b/yBcD6s+GQRCFeL5XBC6woq4oCQ55rIBkKZt0UE1DXgRS6+HFtDSeJYlgAAAABJRU5ErkJggg==\n{/template:GadgetLabelIconSelectedUrl}\n")

  function bq(a) {Z.call(this, a)}

  D(bq, Z)
  A = bq.prototype
  A.init = function (a, b) {
    this.ui = a
    a = document.querySelector(Kb)
    var c = a.querySelector("#labelcss")
    c && c.remove()
    c = document.createElement(vc)
    c.setAttribute(Qb, "labelcss")
    c.setAttribute(kb, qc)
    c.append(this.template("GadgetLabelCSS"))
    a.append(c)
    this.ga(b, "Label" + this.P)
  }
  A.N = function () {return this.C.title || this.template("GadgetLabelDefaultTitle")}
  A.ca = function () {return this.template("GadgetLabelIconUrl")}
  A.aa = function () {return this.template("GadgetLabelIconSelectedUrl")}
  A.T = function () {
    return this.template("GadgetLabel", {
      labels: this.C.labels || [],
      display: this.C.display,
      showFreqNumbers: this.C.showFreqNumbers
    })
  }
  blogger.compileTemplate("/* Copyright 2012 Google Inc. All Rights Reserved. */\n{template:GadgetLinkListCSS}\n.gadget-linklist {\n  padding: 12px;\n  min-width: 120px;\n  max-width: 320px;\n}\n\n.gadget-linklist-item {\n  line-height: 14px;\n  padding: 8px;\n}\n\n{/template:GadgetLinkListCSS}\n{template:GadgetLinkListDefaultTitle}\nLink List\n{/template:GadgetLinkListDefaultTitle}\n\n\x3c!-- Attributes {links} --\x3e\n{template:GadgetLinkList}\n<ul class=\"gadget-linklist\">\n  {block:links}\n  {GadgetLinkListItem}\n  {/block:links}\n</ul>\n{/template:GadgetLinkList}\n\n\x3c!-- Attributes {target, name} --\x3e\n{template:GadgetLinkListItem}\n<li class=\"gadget-linklist-item\">\n  <a href=\"{target}\">{name}</a>\n</li>\n{/template:GadgetLinkListItem}\n\n{template:GadgetLinkListIconUrl}\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAOCAYAAADJ7fe0AAAAIUlEQVQoz2P4jwQYoOA/iYBh8BgyeMBowI4GLD0CFmQGAJeZHQCjUvPAAAAAAElFTkSuQmCC\n{/template:GadgetLinkListIconUrl}\n\n{template:GadgetLinkListIconSelectedUrl}\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAOCAYAAADJ7fe0AAAAJ0lEQVQoz2MwNjb+D8MMUIAsRgxmGDyGDB4wGrCjAUuPgP3//z8DAG+r2iZzG/daAAAAAElFTkSuQmCC\n{/template:GadgetLinkListIconSelectedUrl}\n")

  function cq(a) {Z.call(this, a)}

  D(cq, Z)
  A = cq.prototype
  A.init = function (a, b) {
    this.ui = a
    a = document.querySelector(Kb)
    var c = a.querySelector("#linklistcss")
    c && c.remove()
    c = document.createElement(vc)
    c.setAttribute(Qb, "linklistcss")
    c.setAttribute(kb, qc)
    c.append(this.template("GadgetLinkListCSS"))
    a.append(c)
    this.ga(b, "LinkList" + this.P)
  }
  A.N = function () {return this.C.title || this.template("GadgetLinkListDefaultTitle")}
  A.ca = function () {return this.template("GadgetLinkListIconUrl")}
  A.aa = function () {return this.template("GadgetLinkListIconSelectedUrl")}
  A.T = function () {return this.template("GadgetLinkList", { links: this.C.links || [] })}
  blogger.compileTemplate("/* Copyright 2012 Google Inc. All Rights Reserved. */\n{template:GadgetPopularPostsCSS}\n\n.PopularPosts {\n  max-width: 350px;\n  min-width: 250px;\n  padding: 0 12px;\n}\n\n.PopularPosts-content { padding: 8px; line-height: 14px; }\n\n.PopularPosts ul { padding: 0.7em 0; }\n\n.PopularPosts .PopularPosts-title { padding-bottom: 0.2em; }\n\n.hide-snippet .PopularPosts-snippet,\n.hide-thumbnail .PopularPosts-thumbnail {\n  display: none;\n}\n\n.PopularPosts .PopularPosts-thumbnail { float: left; margin: 0 5px 5px 0; }\n\n{/template:GadgetPopularPostsCSS}\n{template:GadgetPopularPostsDefaultTitle}\nPopular Posts\n{/template:GadgetPopularPostsDefaultTitle}\n\n\x3c!-- Popular Posts gadget main template --\x3e\n{template:GadgetPopularPosts}\n  <div class=\"PopularPosts {block:IfNotshowBoth} {block:IfNotshowSnippets} hide-snippet {/block:IfNotshowSnippets} {block:IfNotshowThumbnails} hide-thumbnail {/block:IfNotshowThumbnails} {/block:IfNotshowBoth} \">\n    <ul>\n      {block:posts}\n        {GadgetPopularPostsContent}\n      {/block:posts}\n    </ul>\n  </div>\n{/template:GadgetPopularPosts}\n\n\x3c!-- Attributes {href, title, snippet} --\x3e\n{template:GadgetPopularPostsContent}\n <li>\n    <div class=\"PopularPosts-content\">\n    {block:Ifthumbnail}\n      <div class=\"PopularPosts-thumbnail\">\n        <a href=\"{href}\" target=\"_blank\">\n          <img alt=\"{title}\" border=\"0\" height=\"72\" src=\"{thumbnail}\" width=\"72\" />\n        </a>\n      </div>\n    {/block:Ifthumbnail}\n      <div class=\"PopularPosts-title\">\n        <a href=\"{href}\">{title}</a>\n      </div>\n      <div class=\"PopularPosts-snippet\">\n        {snippet}\n      </div>\n    </div>\n    <div style=\"clear:both;\"></div>\n  </li>\n{/template:GadgetPopularPostsContent}\n\n\x3c!-- Base 64 code for image /popularposts/resources/icon.png --\x3e\n{template:GadgetPopularPostsIconUrl}\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAAAOVBMVEUAAAD///////////////////////////////////////+0tLRdXV03NzdQUFDz8/OCgoLm5uba2tpH+D6LAAAACnRSTlMAYJ8w799AzyCvT73IhwAAAHZJREFUeF6NzNsOwyAMBNE1kLQdkt7+/2MrEauAlUrdx2NrJOEjaRy7b3ToPDj7wO6R3Z3hmyJG/mZv/I7cuZ7xE5sinqmks8ibS+BKX/JI6z7w2RTZXg2XHNpb4+ztMDu4r8ICt8bh0yial4tJWss6s+XjatIHHJAOzO96uu0AAAAASUVORK5CYII=\n{/template:GadgetPopularPostsIconUrl}\n\n\x3c!-- Base 64 code for image /popularposts/resources/icon-selected.png --\x3e\n{template:GadgetPopularPostsIconSelectedUrl}\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAAAOVBMVEUAAAA3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3NzeCgoLa2tr////m5uZERES0tLRQUFBdXV0qcSKbAAAACnRSTlMAYJ8w799AzyCvT73IhwAAAHZJREFUeF6NzNsOwyAMBNE1kLQdkt7+/2MrEauAlUrdx2NrJOEjaRy7b3ToPDj7wO6R3Z3hmyJG/mZv/I7cuZ7xE5sinqmks8ibS+BKX/JI6z7w2RTZXg2XHNpb4+ztMDu4r8ICt8bh0yial4tJWss6s+XjatIHHJAOzO96uu0AAAAASUVORK5CYII=\n{/template:GadgetPopularPostsIconSelectedUrl}\n")

  function dq(a) {Z.call(this, a)}

  D(dq, Z)
  A = dq.prototype
  A.init = function (a, b) {
    this.ui = a
    a = document.querySelector(Kb)
    var c = a.querySelector("#PopularPostsCSS")
    c && c.remove()
    c = document.createElement(vc)
    c.setAttribute(Qb, "PopularPostsCSS")
    c.setAttribute(kb, qc)
    c.append(this.template("GadgetPopularPostsCSS"))
    a.append(c)
    this.ga(b, "PopularPosts" + this.P)
  }
  A.N = function () {return this.C.title || this.template("GadgetPopularPostsDefaultTitle")}
  A.ca = function () {return this.template("GadgetPopularPostsIconUrl")}
  A.aa = function () {return this.template("GadgetPopularPostsIconSelectedUrl")}
  A.T = function () {
    for (var a = this.C && this.C.posts && this.C.posts.length, b = 0; b < a; b++) {
      var c = this.C.posts[b].title
      this.C.posts[b].title = c.length > 50 ? c.substring(0, 50) + "..." : c
    }
    return this.template("GadgetPopularPosts", {
      posts: this.C.posts,
      showBoth: this.C.Nm && this.C.Om,
      showSnippets: this.C.Nm,
      showThumbnails: this.C.Om,
      thumbnailSize: this.C.yn || "",
      title: this.C.title || ""
    })
  }
  blogger.compileTemplate("/* Copyright 2011 Google Inc. All Rights Reserved. */\n{template:ProfileCSS}\n\n.profile {\n  color: #666;\n  min-width: 280px;\n  padding: 8px 16px 16px 16px;\n}\n\n.profile-data {\n  margin: 0;\n}\n\n.profile-name {\n  display: inline-block;\n}\n\n.profile-name-link {\n  background: no-repeat left center;\n  display: inline-block;\n  min-height: 20px;\n  padding-left: 20px;\n}\n\n.profile-photo {\n  display: inline-block;\n  float: left;\n  margin: 0 12px 10px 0;\n}\n\n.profile-name, .profile-location, .profile-occupation {\n  font-size: 16px;\n  margin-bottom: 6px;\n}\n\n.profile-photo img {\n  vertical-align: middle;\n}\n.profile-aboutme {\n  clear: both;\n  line-height: 1.2em;\n  margin: 0;\n}\n\n.profile-link {\n  clear: both;\n  display: block;\n  margin-top: 4px;\n  text-align: right;\n}\n\n{/template:ProfileCSS}\n{template:ProfileGadget}\n<div class=\"profile\">\n  {block:IfisDisplayable}\n    {block:Ifteam}\n      {ProfileGadgetTeam}\n    {/block:Ifteam}\n    {block:IfNotteam}\n      {ProfileGadgetPersonal}\n    {/block:IfNotteam}\n  {/block:IfisDisplayable}\n</div>\n{/template:ProfileGadget}\n\n{template:ProfileGadgetPersonal}\n<dl class=\"profile-data\">\n  {block:displayname}\n  <dt class=\"profile-name\">\n  <a href=\"{userUrl}\" class=\"profile-name-link g-profile\"\n      rel=\"author\"\n      style=\"background-image: url('{profileLogo}');\">{displayname}</a>\n  </dt>\n  {/block:displayname}\n  {block:Ifphoto}\n    {block:Ifphoto.url}\n    <dd class=\"profile-photo\">\n      <a href=\"{userUrl}\">\n        <img src=\"{photo.url}\"\n            {block:photo.width} width=\"{photo.width}\" {/block:photo.width}\n            {block:photo.height} height=\"{photo.height}\" {/block:photo.height}\n            {block:photo.alt} alt=\"{photo.alt}\" {/block:photo.alt} />\n      </a>\n    </dd>\n    {/block:Ifphoto.url}\n  {/block:Ifphoto}\n  {block:showlocation}\n  <dd class=\"profile-location\">\n    {location}\n  </dd>\n  {/block:showlocation}\n  {block:showoccupation}\n  <dd class=\"profile-occupation\">\n    {occupation}\n  </dd>\n  {/block:showoccupation}\n  {block:showaboutme}\n  <dd class=\"profile-aboutme\">{aboutme}</dd>\n  {/block:showaboutme}\n</dl>\n{/template:ProfileGadgetPersonal}\n\n{template:ProfileGadgetTeam}\n<ul class=\"profile-data-list\">\n  {block:authors}\n  <li><a href=\"{userUrl}\" class=\"profile-name-link g-profile\"\n      style=\"background-image: url('{profileLogo}');\">{display-name}</a></li>\n  {/block:authors}\n</ul>\n{/template:ProfileGadgetTeam}\n\n{template:ProfileGadgetDefaultIcon}\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAB40lEQVRIx7XWwWoTURQG4Lst0jTiolRa2qW4sAWhbrsTBJ8h2bpKNkUUBKGL2idQfIgGuhNsLW7UTaiPYTFpN92Y1s/NmTSEzGSmpj8MAzPnP//cc/97zqRUACyggX30cIlB3C/j2X7E1HJyJBSKtNGPZJ/wAg8xh3lsYhtHEdNDq7QQVnGCP3iJO2kKsIId/AruaqEQ1mMVh7iXKgJL6OIM6xOFYiV9fMTddENgEQchtjpJqIvDNAPEPn6PnNdCIxv/oIBcx7FrHKNeEL+B32hhaOE+3kz5ylGRodgUzl64sZbQxMU0d8lHfYobL9BI6OBribpXFgreZ3RSuONVCaHKpQvea/QT/uJJCUIlM4zwnuIqE6pVsG69jMDYubrKaj+fbglYzoQusVkQuIa30cPGcRLv1gr4zzOhHrZzgpo4Nx3naObk2M3MsI+jipYubXV8y+zdiM6wMgOhrQlGGKCZUIvy7dyC0Ic4pwvZgxZOsTQWuFXxqo9wH8fwbI+PiZNo64szsPT92Jtu0eA7wNx/inzJ9r1olJ/hJzZuIPIoWlP+KB9bWTeG1t4kN+a0mffhsO4op8zvVivceIEfeIdnkXQ5TvxujOxBHNp25f+6CKrFOetEza/Grn68aw4tnCP0D7HegqWQsg0fAAAAAElFTkSuQmCC\n{/template:ProfileGadgetDefaultIcon}\n\n{template:ProfileGadgetDefaultIconSelected}\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAB8klEQVRIx7XWT0uUURTH8buVcJxoIYaiy2iRwgds6y4Ieg3OttW4kSgIAhfmKyh6ETPgLkiTNtVmsJeR5OjGTWpPm/MM0zjz/DE9cHng3nPO93nu/d1znpQKDDNYRwfHuMB5PC9irhM+jXE5sixLWZYVQjbQj2Qf8RwPMYVprGIT++FzjHZlEBZxiN94gTupxLCALfyM2MVCEJbjK/ZwL9U0zKGHEyzH3L+g+JI+PuBuuqZhFrsBWxwH6mEv3YDFOX6LnAlXDv5BQXATB8hiHKBZ4L+CX2hjIOE+Xpe85TBkACuJ2Qk1NhJaOCtT1xhIPpolajzDekIXXyrse21QxH1CN4U6XlYA1d66iHuFfsIfPK4QUEsMQ3FPcJmDGjWk26wCGLlXl/neT6dbMsznoAusFjgu4U3UsNEzOoy1pYL4ZznoGJsTnFo4LVBcPk7RmpBjOxdDB/s1JV1Z6viay3s9KsPCDYDWxgjhHK2ERmzf1i2A3sc9nckn2jjC3IjjWs3RHIoVzXNjUL1j4TDK+uwNSPp+nE2vqPHtYuo/IZ/zc78CGmrlJ/iBlWtAHkVpGrTysp+TXjStnXFqnFBm3oXCesMxVX632qHGM3zHWzyNpPNx47ejZZ/Hpd0YzVMKClgj7lk39vxyZPRjrTWQ8ATQX2/rqVTnkWAqAAAAAElFTkSuQmCC\n{/template:ProfileGadgetDefaultIconSelected}\n")

  function eq(a) {Z.call(this, a)}

  D(eq, Z)
  A = eq.prototype
  A.init = function (a, b) {
    this.ui = a
    a = document.querySelector(Kb)
    var c = a.querySelector("#profilecss")
    c && c.remove()
    c = document.createElement(vc)
    c.setAttribute(Qb, "profilecss")
    c.setAttribute(kb, qc)
    c.append(this.template("ProfileCSS"))
    a.append(c)
    this.ga(b, "Profile" + this.P)
  }
  A.N = function () {return this.C.title || "Profile"}
  A.ca = function () {return this.C.photo && this.C.photo.url || this.template("ProfileGadgetDefaultIcon")}
  A.aa = function () {return this.C.photo && this.C.photo.url || this.template("ProfileGadgetDefaultIconSelected")}
  A.T = function () {return this.template("ProfileGadget", this.C)}
  blogger.compileTemplate("/* Copyright 2012 Google Inc. All Rights Reserved. */\n{template:GadgetStatsCSS}\n\n.gadget-stats { margin: 5px }\n\n.gadget-stats .blind-plate {\n  border-bottom: 1px solid #fff;\n  border-top: 1px solid #000;\n  filter: alpha(opacity=65);\n  height: 0;\n  left: 0;\n  opacity: .65;\n  position: absolute;\n  top: 13px;\n  width: 22px;\n}\n\n.gadget-stats .counter-wrapper {\n  display: inline-block;\n  font-size: 24px;\n  font-weight: bold;\n  height: 30px;\n  line-height: 30px;\n  vertical-align: top;\n}\n\n.gadget-stats .counter-wrapper {\n  display: inline-block;\n  font-size: 24px;\n  font-weight: bold;\n  height: 30px;\n  line-height: 30px;\n  vertical-align: top;\n}\n\n.gadget-stats .digit {\n  background: url(\"https://resources.blogblog.com/img/widgets/stats-flipper.png\") no-repeat left !important;\n  border: 1px solid #fff;\n  display: inline-block;\n  height: 28px;\n  line-height: 28px;\n  margin-left: -8px;\n  position: relative;\n  text-align: center;\n  width: 22px;\n}\n\n.gadget-stats .graph-counter-wrapper {\n  color: #fff;\n  font-size: 20px;\n  font-weight: bold;\n}\n\n.gadget-stats .stage-0 { background-position: 0 0 !important; }\n\n.gadget-stats .chart {\n  display:inline-block;\n  height:30px;\n  width:75px;\n}\n\n.gadget-stats .chart.white {\n  background-color: grey;\n}\n\n{/template:GadgetStatsCSS}\n{template:GadgetStatsDefaultTitle}\nBlogs Stats\n{/template:GadgetStatsDefaultTitle}\n\n\x3c!-- Attributes {sparklineUrl} --\x3e\n{template:GadgetStats}\n<div class=\"gadget-stats\">\n  \x3c!-- Content is going to be visible when data will be fetched from server. --\x3e\n  <div style=\"text-align: center\">\n    {block:IfshowSparkline}\n      {block:IfNotsparklineData}\n        <img src=\"{sparklineUrl}\" width=\"75\" height=\"30\" alt=\"sparkline\" {block:Ifbackgroundwhite}style=\"background-color: grey;\"{/block:Ifbackgroundwhite}/>\n      {/block:IfNotsparklineData}\n      {block:IfsparklineData}\n        <span class=\"chart\"/>\n      {/block:IfsparklineData}\n    {/block:IfshowSparkline}\n    {block:IfshowGraphicalCounter}\n      <span class=\"counter-wrapper graph-counter-wrapper\"\n            style=\"padding:5px;\">\n        {block:splitValues}\n          {IndividualCounter}\n        {/block:splitValues}\n      </span>\n    {/block:IfshowGraphicalCounter}\n    {block:IfNotshowGraphicalCounter}\n      <span class=\"counter-wrapper\">{total}</span>\n    {/block:IfNotshowGraphicalCounter}\n  </div>\n</div>\n{/template:GadgetStats}\n\n\x3c!-- Attributes {individualCounter} --\x3e\n{template:IndividualCounter}\n  <span class=\"digit stage-0\">\n    <strong>{individualCounter}</strong>\n    <span class=\"blind-plate\"></span>\n  </span>\n{/template:IndividualCounter}\n\n\x3c!-- Base 64 code for image /stats/resources/icon.png --\x3e\n{template:GadgetStatsIconUrl}\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYBAMAAAASWSDLAAAALVBMVEX///////9dXV03Nzf////z8/Obm5va2tqCgoJERES0tLSPj4/Nzc12dnZQUFANaTq2AAAAAnRSTlPvMImsErcAAACDSURBVHheldAxCgJBDAXQETyAZ9iQwsYi04ggWPxvYxey2NjpTTyEB/AKHsGDOQtBx3J/E14Tkl9W+GZRlj8cCrrMB28dfN/h/kgwcKrvhCueu1xAsUt9TRgBN1lv0cAhKOpVJ7ThFtxEA2UwUeCMBrdRLPKcq8IViWOAMfOfvpC/qj5eR0uIUNLLMAAAAABJRU5ErkJggg==\n{/template:GadgetStatsIconUrl}\n\n\x3c!-- Base 64 code for image /stats/resources/icon-selected.png --\x3e\n{template:GadgetStatsIconSelectedUrl}\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYBAMAAAASWSDLAAAALVBMVEU3Nzc3Nzfa2tr///83NzdERESbm5tdXV20tLTz8/OCgoKoqKhpaWnBwcHm5uZSesK3AAAAAnRSTlPvMImsErcAAACDSURBVHheldAxCgJBDAXQETyAZ9iQwsYi04ggWPxvYxey2NjpTTyEB/AKHsGDOQtBx3J/E14Tkl9W+GZRlj8cCrrMB28dfN/h/kgwcKrvhCueu1xAsUt9TRgBN1lv0cAhKOpVJ7ThFtxEA2UwUeCMBrdRLPKcq8IViWOAMfOfvpC/qj5eR0uIUNLLMAAAAABJRU5ErkJggg==\n{/template:GadgetStatsIconSelectedUrl}\n")/*

 Copyright 2005, 2007 Bob Ippolito. All Rights Reserved.
 Copyright The Closure Library Authors.
 SPDX-License-Identifier: MIT
*/
  function fq(a) {
    var b = gq
    this.Yd = []
    this.Wi = b
    this.mg = a || null
    this.xc = this.Kb = !1
    this.Eb = void 0
    this.tf = this.ig = this.Je = !1
    this.ae = 0
    this.Db = null
    this.Ke = 0
  }

  A = fq.prototype
  A.cancel = function (a) {
    if (this.Kb) this.Eb instanceof fq && this.Eb.cancel() else {
      if (this.Db) {
        var b = this.Db
        delete this.Db
        a ? b.cancel(a) : (b.Ke--, b.Ke <= 0 && b.cancel())
      }
      this.Wi ? this.Wi.call(this.mg, this) : this.tf = !0
      this.Kb || this.Se(new hq(this))
    }
  }
  A.kg = function (a, b) {
    this.Je = !1
    iq(this, a, b)
  }

  function iq(a, b, c) {
    a.Kb = !0
    a.Eb = c
    a.xc = !b
    jq(a)
  }

  function kq(a) {
    if (a.Kb) {
      if (!a.tf) throw new lq(a)
      a.tf = !1
    }
  }

  A.Qa = function (a) {
    kq(this)
    mq(a)
    iq(this, !0, a)
  }
  A.Se = function (a) {
    kq(this)
    mq(a)
    iq(this, !1, a)
  }

  function mq(a) {H(!(a instanceof fq), "An execution sequence may not be initiated with a blocking Deferred.")}

  function nq(a, b, c, d) {
    H(!a.ig, "Blocking Deferreds can not be re-used")
    var e = a.Kb
    e || (b === c ? b = c = ho(b) : (b = ho(b), c = ho(c)))
    a.Yd.push([b, c, d])
    e && jq(a)
  }

  A.then = function (a, b, c) {
    var d, e, f = new yo(function (h, k) {
      e = h
      d = k
    })
    nq(this, e, function (h) {
      h instanceof hq ? f.cancel() : d(h)
      return oq
    }, this)
    return f.then(a, b, c)
  }
  fq.prototype.$goog_Thenable = !0

  function pq(a) {return we(a.Yd, function (b) {return typeof b[1] === r})}

  var oq = {}

  function jq(a) {
    if (a.ae && a.Kb && pq(a)) {
      var b = a.ae, c = qq[b]
      c && (E.clearTimeout(c.mc), delete qq[b])
      a.ae = 0
    }
    a.Db && (a.Db.Ke--, delete a.Db)
    b = a.Eb
    for (var d = c = !1; a.Yd.length && !a.Je;) {
      var e = a.Yd.shift(), f = e[0], h = e[1]
      e = e[2]
      if (f = a.xc ? h : f) try {
        var k = f.call(e || a.mg, b)
        k === oq && (k = void 0)
        k !== void 0 && (a.xc = a.xc && (k == b || k instanceof Error), a.Eb = b = k)
        if (xo(b) || typeof E.Promise === r && b instanceof E.Promise) d = !0, a.Je = !0
      } catch (l) {b = l, a.xc = !0, pq(a) || (c = !0)}
    }
    a.Eb = b
    d && (k = ld(a.kg, a, !0), d = ld(a.kg, a, !1), b instanceof fq ? (nq(b,
      k, d), b.ig = !0) : b.then(k, d))
    c && (b = new rq(b), qq[b.mc] = b, a.ae = b.mc)
  }

  function lq() {ge.call(this)}

  nd(lq, ge)
  lq.prototype.message = "Deferred has already fired"
  lq.prototype.name = "AlreadyCalledError"

  function hq() {ge.call(this)}

  nd(hq, ge)
  hq.prototype.message = "Deferred was canceled"
  hq.prototype.name = "CanceledError"

  function rq(a) {
    this.mc = E.setTimeout(ld(this.Sm, this), 0)
    this.vk = a
  }

  rq.prototype.Sm = function () {
    H(qq[this.mc], "Cannot throw an error that is not scheduled.")
    delete qq[this.mc]
    throw this.vk
  }
  var qq = {}

  function sq() {
    var a = dk(tq), b = {}, c = b.document || document, d = ii(a).toString(), e = en((new hn(c)).Rk, Oa),
      f = { mj: e, Aj: void 0 }, h = new fq(f), k = null, l = b.timeout != null ? b.timeout : 5E3
    l > 0 && (k = window.setTimeout(function () {
      uq(e, !0)
      h.Se(new vq(1, "Timeout reached for loading script " + d))
    }, l), f.Aj = k)
    e.onload = e.onreadystatechange = function () {e.readyState && e.readyState != "loaded" && e.readyState != "complete" || (uq(e, b.qn || !1, k), h.Qa(null))}
    e.onerror = function () {
      uq(e, !0, k)
      h.Se(new vq(0, "Error while loading script " + d))
    }
    f =
      b.attributes || {}
    Ni(f, { type: xc, charset: "UTF-8" })
    bn(e, f)
    e.src = ii(a)
    Fi(e)
    wq(c).appendChild(e)
    return h
  }

  function wq(a) {
    var b
    return (b = (a || document).getElementsByTagName("HEAD")) && b.length !== 0 ? b[0] : a.documentElement
  }

  function gq() {
    if (this && this.mj) {
      var a = this.mj
      a && a.tagName == Oa && uq(a, !0, this.Aj)
    }
  }

  function uq(a, b, c) {
    c != null && E.clearTimeout(c)
    a.onload = function () {}
    a.onerror = function () {}
    a.onreadystatechange = function () {}
    b && window.setTimeout(function () {a && a.parentNode && a.parentNode.removeChild(a)}, 0)
  }

  function vq(a, b) {
    var c = "Jsloader error (code #" + a + ")"
    b && (c += ": " + b)
    ge.call(this, c)
    this.code = a
  }

  nd(vq, ge)
  var tq = Zc(["https://www.gstatic.com/charts/loader.js"])

  function xq(a) {
    Z.call(this, a)
    this.wj = {}
  }

  D(xq, Z)
  A = xq.prototype
  A.init = function (a, b) {
    this.ui = a
    a = document.querySelector(Kb)
    var c = a.querySelector("#statscss")
    c && c.remove()
    c = document.createElement(vc)
    c.setAttribute(Qb, "statscss")
    c.setAttribute(kb, qc)
    c.append(this.template("GadgetStatsCSS"))
    a.append(c)
    this.ga(b, "Stats" + this.P)
  }
  A.Cc = function (a) {
    var b = this
    this.C = a
    a = new URL(a.statsUrl, window.location.href)
    a.searchParams.set("v", "0")
    a.searchParams.set(Wa, "initial")
    a.searchParams.set(Kc, "Stats" + this.P)
    a.searchParams.set(jc, "js")
    fetch(a.href).then(function (c) {return c.text()}).then(function (c) {
      b.wj = c
      Pp(b)
    }).catch(this.Ob.bind(this))
  }
  A.N = function () {return this.C.title || this.template("GadgetStatsDefaultTitle")}
  A.ca = function () {return this.template("GadgetStatsIconUrl")}
  A.aa = function () {return this.template("GadgetStatsIconSelectedUrl")}
  A.T = function () {
    this.na = eval("(" + this.wj + ")")
    if (!this.na) return ""
    for (var a = this.na.total && this.na.total.toString().length, b = [], c = 0; c < a; c++) {
      var d = {}
      d.individualCounter = this.na.total.toString().charAt(c)
      b.push(d)
    }
    this.na.splitValues = b
    this.na.lenViews = a
    for (var e in this.C) this.na[e.toString()] = this.C[e]
    this.na.showSparkline && (a = F.decode(this.C.statsUrl), this.na.backgroundwhite = a.params.style && a.params.style.match(/WHITE/))
    return this.template("GadgetStats", this.na)
  }
  A.Oc = function (a) {
    var b = this
    if (a) {
      var c = a.querySelector(".chart")
      c && (this.na.backgroundwhite && (c.className += " white"), sq().then(function () {
        google.charts.load(qb, { packages: ["corechart"] })
        google.charts.setOnLoadCallback(function () {
          (new google.visualization.AreaChart(c)).draw(google.visualization.arrayToDataTable(b.na.sparklineData, !0), Object.assign({
            enableInteractivity: !1,
            chartArea: { top: 0, left: 0, width: 75, height: 30 },
            hAxis: { textPosition: Yb, gridlines: { color: Ac } },
            vAxis: { textPosition: Yb, gridlines: { color: Ac } },
            legend: { position: Yb }
          }, b.na.sparklineOptions))
        })
      }))
    }
  }
  blogger.compileTemplate("/* Copyright 2011 Google Inc. All Rights Reserved. */\n{template:SubscribeCSS}\n\n#subscribe {\n  text-align: left;\n  margin: 10px;\n  vertical-align: middle;\n  white-space: nowrap;\n}\n\n.subscribe-by-email,\n.subscribe-rss-feed {\n  min-width: 250px;\n  padding: 4px 16px 16px 16px;\n}\n\n.subscribe-by-email {\n  border-bottom: 1px solid #ddd;\n}\n\n.subscribe-by-email-title,\n.subscribe-rss-feed-title {\n  font-size: 16px;\n  margin: 8px 0;\n}\n\n.subscribe-by-email-address {\n  border: 1px solid #ddd;\n  {css-box-shadow value=\"inset 0 0 1px rgba(0, 0, 0, 0.3)\"};\n  font-size: 12px;\n  height: 27px;\n  line-height: 27px;\n  min-width: 192px;\n  padding: 0 0 0 6px;\n}\n\n.subscribe-by-email-submit {\n  display: inline-block;\n  min-width: 54px;\n  border: 1px solid #dcdcdc;\n  text-align: center;\n  color: #444;\n  font-size: 11px;\n  font-weight: bold;\n  height: 27px;\n  padding: 0 8px;\n  line-height: 27px;\n  {css-border-radius value=\"2px\"}\n  {css-transition value=\"right 0.218s\"};\n  background-color: #f5f5f5;\n  background-image: -webkit-gradient(linear,left top,left bottom,from(#f5f5f5),to(#f1f1f1));\n  background-image: -webkit-linear-gradient(top,#f5f5f5,#f1f1f1);\n  background-image: -moz-linear-gradient(top,#f5f5f5,#f1f1f1);\n  background-image: -ms-linear-gradient(top,#f5f5f5,#f1f1f1);\n  background-image: -o-linear-gradient(top,#f5f5f5,#f1f1f1);\n  background-image: linear-gradient(top,#f5f5f5,#f1f1f1);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorStr='#f5f5f5',EndColorStr='#f1f1f1');\n  {css-box-sizing value=\"content-box\"};\n}\n.subscribe-by-email-submit:hover {\n  border: 1px solid #c6c6c6;\n  color: #222;\n  -webkit-transition: all 0.0s;\n  -moz-transition: all 0.0s;\n  -o-transition: all 0.0s;\n  transition: all 0.0s;\n  background-color: #f8f8f8;\n  background-image: -webkit-gradient(linear,left top,left bottom,from(#f8f8f8),to(#f1f1f1));\n  background-image: -webkit-linear-gradient(top,#f8f8f8,#f1f1f1);\n  background-image: -moz-linear-gradient(top,#f8f8f8,#f1f1f1);\n  background-image: -ms-linear-gradient(top,#f8f8f8,#f1f1f1);\n  background-image: -o-linear-gradient(top,#f8f8f8,#f1f1f1);\n  background-image: linear-gradient(top,#f8f8f8,#f1f1f1);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorStr='#f8f8f8',EndColorStr='#f1f1f1');\n  {css-box-shadow value=\"0px 1px 1px rgba(0,0,0,0.1)\"};\n}\n.subscribe-by-email-submit:active {\n  background-color: #f6f6f6;\n  background-image: -webkit-gradient(linear,left top,left bottom,from(#f6f6f6),to(#f1f1f1));\n  background-image: -webkit-linear-gradient(top,#f6f6f6,#f1f1f1);\n  background-image: -moz-linear-gradient(top,#f6f6f6,#f1f1f1);\n  background-image: -ms-linear-gradient(top,#f6f6f6,#f1f1f1);\n  background-image: -o-linear-gradient(top,#f6f6f6,#f1f1f1);\n  background-image: linear-gradient(top,#f6f6f6,#f1f1f1);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorStr='#f6f6f6',EndColorStr='#f1f1f1');\n  {css-box-shadow value=\"inset 0px 1px 2px rgba(0,0,0,0.1)\"};\n}\n.subscribe-by-email-submit:visited {\n  color: #666;\n}\n\n.subscribe-rss-feed-view-rss {\n  display: inline-block;\n  height: 24px;\n  line-height: 24px;\n  padding-left: 28px;\n}\n\n.subscribe-rss-feed-add-to {\n  /* http://www.google.com/images/icons/product/reader-16.png */\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACfElEQVQ4T22TXUhTYRjH/0dn6pZNkkZa2rKrRMgshO4q6KbooqCbbrwqQhMsEPqAvsuK6KYuoroRQigogkxErMhMIqxZGNTWtjbSmcO5zfOx856vznlOmx3Zc3He8/7f5/k9H7wvh2XG3+gwLIml0tCEHJ3K8wvgY3MFz4aHj+FuauYsgT55ywcL3lp4MokCxAKwVBZsMQeFFyGlJbTFZ4sDKk7ehKowYrKJUagvn0CMW7AlgCIxtIamiwNcXVcoWNNUaLoKXeAhPLgLefw9VSAm01BlDb43g/BvauUcLaRudRu5PYcKLa30b4RugVQV2etXwY+8hpU9JyioHx82k+j2DMqvKTS4vOnZP47RtrgT6D9YAv54B5RIDKqqLwHKezUDhl402JBFGIwHFBmt610Y8A0hfOkO+RYqsLILPTKiKRVvf+noHdUQn5fJ6X+Atf99rgrRtt10VvduCKqmgbMAme5Fx+DufdRwZlCyIf8qsP5jZz1Ith+BFIw6AcN7g/BVV6ChpsqevDm4L/FFHHikIZMVCu0F/M+hTwQgfpgkgCQzu4JU1wIFBqILaFxTiapKF03+WSCNY09lsxXBdPRgZLKLYDWXL2Dd1ibMzCZsQLIzSVmpzKTdTq23jNZ99zP4FM7AUCTM3t4CZvrV+nyQcyLCP7+Dc50IGq/aFXJurqukNZKUsKGmzKyCYeAbw9G+adKVvl0QxSzc7lW0D4WmwJV2fjbmzleTMDUjYfNaO/NYMI0djW66LPWnY6R9PbWaVsbshNu27+QIMNXjJYE3Xx9XWgJPxQqM/cigzV9OesvFCK1G/37HzbU0+0EcfuG4ieS9zIoFWy5/AXxpdXGYm4ahAAAAAElFTkSuQmCC);\n  background-repeat: no-repeat;\n  background-position: 4px center;\n  padding-left: 25px;\n}\n\na.feed-reader-link {\n  margin: .5em 0;\n}\n\n.subscribe-netvibes,\n.subscribe-myyahoo {\n  background-repeat: no-repeat;\n  height: 17px;\n  width: 91px;\n}\n\n.subscribe-netvibes {\n  /* http://img1.blogblog.com/img/widgets/subscribe-netvibes.png */\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAAARCAMAAACFKyChAAAC7lBMVEX////////o8f9fti79/v/y9/+It/55rv5Fbrj8/f76+/33+v/z+P/q8//l7/+Cs/5rpv5dnf76/P9VmP74+vyUvv6Gtv56r/41oTVLcrqqqqr2+Pvv9f/h7f/e6//Y4fDL4P/R2+3F3P/C2v/N2OyqzP+2xuSix/5Ysy/5+//MzMxxqf5qpf6EntBno/5Zm/5fti9eti41ojQ1oTSSvf4+aLYsWa4iUqv5/P/4+fz0+f/29/v09vrx9Pro8v/r7/jm8P/g7P/j6fXa6f/e5fLU5f/T5P/a4vHV3u/J3//E2//L1uu+1/+51f+uzv+9y+atzv+6yeWoy/6myf+fxf6wweGcw/6awf6Nuv6gtNuJuP6EtP6CtP6As/6SqtV3rf51q/5tp/5mov5jof5env5bnP5ctS5ctC9btC9TsDBOrjFhg8NIqzI+pjM9pjM+pTM5pDRRdr1Mc7tIb7lBarcvkRg9Z7UrixgriRgqiRglghkxXbEifxkifRkgeRqQvP4ddhuuv+AyoDX+/v/2+f/2+Pzy9vvy9frt9P/w8/rs8//s7/fq7vfo7fbi7v/i7f/n7Pbg7f/k7Pnn6/bh7P/f7P/d6v/h6PTh5/Tf5vPY5//W5v/d5PLR5P/a4fHO4v/X4PDH3f/D2//C2v7C2f7M1+zM1+u/2P671/+61f+31P630/7Cz+ix0P+/zeawz/60xOOyw+KywuGawv6Zwv6rvd+YwP6XwP6Svv+httuLuf+Luf6Kuf6LuP6KuP6es9qbsdl+sv58r/6PptOFp9+JotKGoNCDndB9ms5enf50kspRlv5dtC5ctC5XszBYsi9TsTBTsC9oiMVPrjFPrjBjhcRJrDFJqzJFqjJFqTJCqTJDqDI/pzNApjNYfMA8pTQ7pDM5pDNWer84pDQ5ozQ5ozM4ozU3ozQ0ojU0oTRKcbpJcLpIcLkvkRcvjxgtjhgtjBg8ZbI6ZbQohhgohRk0YLIifxoifRooVq4aTKg1STZjAAAAAXRSTlMAQObYZgAAAmVJREFUeF611EOMbE0ch+H+tc2xbdu2bdv2XNu2bdu2bdv8uLsnmaRzchaTWUw/VUn9a/Puqmg2KkOj2UBFbHSINkYpDXr7I0NJC/3xVU6pbkhziB9A+11FZcW39vavVyuvvEc/TlgoR7oB9IstB9B+bmVl9R34QRwvQBIZpbsw0R+A7rYt3kBUx+lZM4OnM6fNFdP1WYAkRWAUCgIz3EgIQGi0KIhFbT+t7uruBjo7u24+Acnd3mdcj1pvGH9u+dQchkueP89wyiTWJ8uPpDlmABocjt3FQ0KI8m01i8NB1yzUVGygth/W/O67/VXzACQL3GvDdv4dotZqz+PbN6tN5R4fJ7YzRZKtng97OHCsPEZvaak52DnW2ChlbXJgebHXUNv36nr6bj1190Hi9yUZxu6zzTzOFxTY/78WLSOBTHWc2gq4EW3JPgApuQElB5LMzRVxYmlRhomA2r7z6J+hQ4AhQ/99fBsk41t3wMx9SqxHdnq6RXKgrzbRnmcbJxURbTcgLxOApSSoJDVm1cpoOs8gIbcsntq+0VjfOAwY1tBQXw2SGdy9PLMOw7Hcc8C6C/663Gw+mDmO+wF5VpbcS0NmIlgu2w6Nw3LQd09azfYZfZRNbV9787JpBOHt66brIHnl2Rsb+V/bZGPtNu1fZ/nMW54HgfWKCMBS4Ziw53I+p1SmLgA9T8pxUB+zWVZUaBdNbVd9cHUhlpaWi2sVSJYYrvBTW2bIx8TEXfMBBFqEAHIxDxAFz9ETGQgnmCxmArCOMNUHWAGhpnRQ23BmMJwYTs7EHtw3r9q/SlWINk1HZf4AwCDWutwHXcUAAAAASUVORK5CYII=);\n}\n\n.subscribe-myyahoo {\n  /* http://img1.blogblog.com/img/widgets/subscribe-yahoo.png */\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAAARCAMAAACFKyChAAAAe1BMVEX////8GSH///9UVFT+xcj/8PH8KzL+jZH/5eb9SlH/Zmb+19j+sbP8dnv9bnOjz//8PEP+n6KZmZn09PT9f4P9WmDU1NRmZmYNJppeXl7f398pXOZ0dHR+fn7q6ur/9vbMzMwPQtuJiYm0tLQAAJmpqakYMqUAM8xKc+0wAtJHAAAAAXRSTlMAQObYZgAAAXdJREFUeF6108eu2zAYhFHPsDd1ubfbkrz/E4bShQ3aSRYBrE+ACGhx8IMiV91irVYdF6rbZPvnY58vtX/lDofD29z2xfY07jY3rf+yvfcpGcWHLorFF2WtJS0Qn23Whf0hjuRanNZi1/MqvkhZAU6x9aMbJUkb8mM0BjJIaUnlkNOKgC3seWrW+XWzv4T44FGc2Imu3x05FQBJpdGkNgQaIJESVA1yLedxrYaFK/bkkEXOlfauE9nuN+Jd7DnXAjbCUAEjmdAa4xyhSUa4iSYtDNKTXdes67qw34Xoss1rXvkdBwCSDFqnya5G3zgJyRya73FHSB0L++1ve7I+bfrJ5lH0vDXT1KOHooYlBxggStngEoFUaUQalnb5L+/2+crZPgne0yBVg0hU0ulByqGKtnKjc4EMlfeDZQv/h517sMlne9CAdu1glATSpTiJ5dFUVSDu9o9t2WyfJ5rrM8n9/mbI7/7r7nw+9NJ7uUyzvVTZXm0W6zcSt0JtZ/HJvQAAAABJRU5ErkJggg==);\n}\n\n{/template:SubscribeCSS}\n{template:SubscribeGadgetTitle}\nSubscribe\n{/template:SubscribeGadgetTitle}\n\n\x3c!-- Attributes {feedPath}, {feedUrl} --\x3e\n{template:SubscribeGadget}\n{SubscribeGadgetFollowByEmail feedPath=\"{feedPath}\"}\n{SubscribeGadgetRssFeed feedUrl=\"{feedUrl}\"}\n{/template:SubscribeGadget}\n\n{template:SubscribeGadgetFollowByEmail}\n{block:feedPath}\n<div class=\"subscribe-by-email\">\n  <div class=\"subscribe-by-email-title\">{lang:Subscribe via email}</div>\n  <form name=\"subscribe-by-email\" method=\"post\" target=\"popupwindow\"\n      action=\"https://feedburner.google.com/fb/a/mailverify?uri={feedPath}\"\n      onsubmit=\"window.open('https://feedburner.google.com/fb/a/mailverify?uri={feedPath}', 'popupwindow', 'scrollbars=yes,width=550,height=520'); return true\">\n    <input type=\"text\" placeholder=\"{lang:Enter email address}\" name=\"email\" class=\"subscribe-by-email-address\" />\n    <input type=\"submit\" class=\"subscribe-by-email-submit\" value=\"{lang:Submit}\" />\n  </form>\n</div>\n{/block:feedPath}\n{/template:SubscribeGadgetFollowByEmail}\n\n{template:SubscribeGadgetRssFeed}\n{block:feedUrl}\n<div class=\"subscribe-rss-feed\">\n<div class=\"subscribe-rss-feed-title\">{lang:RSS Feed}</div>\n<div>\n  <a class=\"feed-reader-link subscribe-netvibes\" href=\"https://www.netvibes.com/subscribe.php?url={feedUrl}\" target=\"_blank\">&nbsp;</a>\n  <a class=\"feed-reader-link subscribe-myyahoo\" href=\"https://add.my.yahoo.com/content?url={feedUrl}\" target=\"_blank\">&nbsp;</a>\n  <a href=\"{feedUrl}\" class=\"subscribe-rss-feed-add-to\">{lang:View RSS Feed}</a>\n</div>\n</div>\n{/block:feedUrl}\n{/template:SubscribeGadgetRssFeed}\n\n{template:SubscribeGadgetIconUrl}\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAt0lEQVQ4y62UWw3FIBBEkVAJlVAJSLgSKqESkIAEpFQCEioBB6c/kGw22xZuO19kQ05mhocDAu8VHB9JgvbqLtb136DghIAJWHuhEpQAD8xOCfgBpRckddSIs3KYR0FYke9gVrTN2JyBScDKSNleAbPq7PH4FxUlXcTce8uWQOlsrrO1t+zSYMAi5lG4vY0WhO3DiGLN7LLVQ26uNiNeHAEFcYpNXu97iibnSd25cBXt9Tfyycd2AhigSpokj0DUAAAAAElFTkSuQmCC\n{/template:SubscribeGadgetIconUrl}\n\n{template:SubscribeGadgetIconSelectedUrl}\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAvUlEQVQ4y62UUQ3EIBBEkVAJSCB5BpBwEiqhEpCAhEqphEpAQh3QH5psNnttuYOEhEyWl5ndgAMSUP/cyQ2AVKBK0Nbc5Xb+GZScWMAEzG+hErQCEfBOLeADHG9BcpcW0SuHey+oWpHvYFa0xSjegUnADjqaHRVwVz17HH9QUdYvMbc3PSoKKJ35ps09zQ7tUhBaFm5voyVhuxhRLM1utnrIl6vFiJd7QElM8dKirnuKJnU5vVXXDf1GhnxsJxCDnsRGe0FLAAAAAElFTkSuQmCC\n{/template:SubscribeGadgetIconSelectedUrl}\n")

  function yq(a) {
    Z.call(this, a)
    this.vg = ""
  }

  D(yq, Z)
  A = yq.prototype
  A.init = function (a, b) {
    this.ui = a
    a = document.querySelector(Kb)
    var c = a.querySelector("#subscribecss")
    c && c.remove()
    c = document.createElement(vc)
    c.setAttribute(Qb, "subscribecss")
    c.setAttribute(kb, qc)
    c.append(this.template("SubscribeCSS"))
    a.append(c)
    b = b.resources()[0].baseUrl
    this.vg = (b.match(/^https?:/) ? "" : "http:") + b + Aa
    Pp(this)
  }
  A.N = function () {return this.template("SubscribeGadgetTitle")}
  A.ca = function () {return this.template("SubscribeGadgetIconUrl")}
  A.aa = function () {return this.template("SubscribeGadgetIconSelectedUrl")}
  A.T = function () {return this.template("SubscribeGadget", { feedPath: this.C.feedPath, feedUrl: this.vg })}
  blogger.compileTemplate("/* Copyright 2012 Google Inc. All Rights Reserved. */\n{template:GadgetTextCSS}\n\n.text-widget-content {\n  background: #fff;\n  border: 0;\n  color: #000;\n  height: 100px;\n  max-height: 600px;\n  max-width: 400px;\n  overflow: auto;\n  padding: 10px 18px;\n  width: 200px;\n}\n\n{/template:GadgetTextCSS}\n{template:GadgetTextDefaultTitle}\nText\n{/template:GadgetTextDefaultTitle}\n\n\x3c!-- Attributes {content} --\x3e\n{template:GadgetText}\n<div class=\"text-widget-content\"></div>\n<textarea id=\"text-widget-tpl\" style=\"display:none\">{content}</textarea>\n{/template:GadgetText}\n\n{template:GadgetTextIconUrl}\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWAQMAAADgs87LAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAADFJREFUeF6FyDEOACAMAkBWV3/lq5w7du7H+poqITqX5BIACYifkkU/m13aLx7jGjQvlkEeTw1lSDgAAAAASUVORK5CYII=\n{/template:GadgetTextIconUrl}\n\n{template:GadgetTextIconSelectedUrl}\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWAQMAAADgs87LAAAABlBMVEUAAAA3Nzes+U/hAAAAAXRSTlMAQObYZgAAADFJREFUeF6FyDEOACAMAkBWV3/lq5w7du7H+poqITqX5BIACYifkkU/m13aLx7jGjQvlkEeTw1lSDgAAAAASUVORK5CYII=\n{/template:GadgetTextIconSelectedUrl}\n")

  function zq(a) {Z.call(this, a)}

  D(zq, Z)
  A = zq.prototype
  A.init = function (a, b) {
    this.ui = a
    a = document.querySelector(Kb)
    var c = a.querySelector("#Textcss")
    c && c.remove()
    c = document.createElement(vc)
    c.setAttribute(Qb, "Textcss")
    c.setAttribute(kb, qc)
    c.append(this.template("GadgetTextCSS"))
    a.append(c)
    this.ga(b, "Text" + this.P)
  }
  A.Oc = function (a) {
    if (a) {
      var b = a.querySelector(".text-widget-content")
      b ? (a = a.querySelector("#text-widget-tpl"), b.innerHTML = a.value.replace(/<\s*script([^>]*)>/g, "&lt;script$1&gt;").replace(/<\s*\/\s*script\s*>/g, "&lt;/script&gt;"), a.value = "") : this.Ob()
    }
  }
  A.N = function () {return this.C.title || this.template("GadgetTextDefaultTitle")}
  A.ca = function () {return this.template("GadgetTextIconUrl")}
  A.aa = function () {return this.template("GadgetTextIconSelectedUrl")}
  A.T = function () {return this.template("GadgetText", this.C)}
  blogger.compileTemplate("/* Copyright 2012 Google Inc. All Rights Reserved. */\n{template:GadgetTextListCSS}\n.gadget-textlist {\n  padding: 12px;\n  max-width: 320px;\n  min-width: 120px;\n}\n\n.gadget-textlist-item {\n  line-height: 14px;\n  padding: 8px;\n}\n\n{/template:GadgetTextListCSS}\n{template:GadgetTextListDefaultTitle}\nText List\n{/template:GadgetTextListDefaultTitle}\n\n\x3c!-- Attributes {links} --\x3e\n{template:GadgetTextList}\n<ul class=\"gadget-textlist\">\n  {block:items}\n  {GadgetTextListItem}\n  {/block:items}\n</ul>\n{/template:GadgetTextList}\n\n{template:GadgetTextListItem}\n<li class=\"gadget-textlist-item\">\n  {item}\n</li>\n{/template:GadgetTextListItem}\n\n{template:GadgetTextListIconUrl}\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAOCAYAAADJ7fe0AAAAIUlEQVQoz2P4jwQYoOA/iYBh8BgyeMBowI4GLD0CFmQGAJeZHQCjUvPAAAAAAElFTkSuQmCC\n{/template:GadgetTextListIconUrl}\n\n{template:GadgetTextListIconSelectedUrl}\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAOCAYAAADJ7fe0AAAAJ0lEQVQoz2MwNjb+D8MMUIAsRgxmGDyGDB4wGrCjAUuPgP3//z8DAG+r2iZzG/daAAAAAElFTkSuQmCC\n{/template:GadgetTextListIconSelectedUrl}\n")

  function Aq(a) {Z.call(this, a)}

  D(Aq, Z)
  A = Aq.prototype
  A.init = function (a, b) {
    this.ui = a
    a = document.querySelector(Kb)
    var c = a.querySelector("#textlistcss")
    c && c.remove()
    c = document.createElement(vc)
    c.setAttribute(Qb, "textlistcss")
    c.setAttribute(kb, qc)
    c.append(this.template("GadgetTextListCSS"))
    a.append(c)
    this.ga(b, "TextList" + this.P)
  }
  A.Cc = function (a) {
    this.C = a
    Pp(this)
  }
  A.Ob = function () {
    this.enabled = !1
    Pp(this)
  }
  A.N = function () {return this.C.title || this.template("GadgetTextListDefaultTitle")}
  A.ca = function () {return this.template("GadgetTextListIconUrl")}
  A.aa = function () {return this.template("GadgetTextListIconSelectedUrl")}
  A.T = function () {return this.template("GadgetTextList", { items: this.C.items || [] })}
  blogger.compileTemplate("/* Copyright 2012 Google Inc. All Rights Reserved. */\n{template:GadgetTranslateCSS}\n.gadget-translate {\n  padding: 9px 13px;\n}\n{/template:GadgetTranslateCSS}\n{template:GadgetTranslateTitle}\nGoogle Translate\n{/template:GadgetTranslateTitle}\n\n\x3c!-- Attributes {suffix} --\x3e\n{template:GadgetTranslate}\n<div id=\"gadget-translate{suffix}\" class=\"gadget-translate\">\n</div>\n{/template:GadgetTranslate}\n\n{template:GadgetTranslateIconUrl}\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAABvUlEQVRIx63WsWsUURDH8SRnJIQDLwTBNMZe8P6HFBamCWIrhHQ2MWihkEDKNGLl3yCxEMQqjZB/IJgihXbRNCIoAQPHyZmPzUQe6+7dvtsMDLtvZofv23n7fm8n0MV79NW3ftR0J+oa9rGF2Yya2ajZzwHBVEVuDo8xV5KbgixQct/BYuJLMZGlQrxTrM0F7dRco52moIX4OMr8LT7E/UIjUBK7gydoxfg6fuHhqNpcUAc/8DTGL3GC6UsFRXwDZ7iHHjbq1uaCruAoFv+o+DaX1bpreIEBTuO6HJt7kKEgg6jplu2jZ7E+3/Eo3mwVH41vB0XQbXzBJtolCjK2/SdBmMFqhVRV2efwoaB/oop2bEp4hckaoMPkmcNhoHGOidTWMR++XgkqtOdWkjut0bp+AJ6Hz1dNuBYIk/hTUv8GLXwNb0VsbNAM1nBeqL+LlWS8ErGRoKvYS2Hh3xJZurDjOPzauBHejtjxUFAy+73Cc70k/zpi25jGLt6F70ZseySoAtaL+DJ+RwsXcb+kSw8idz4SlIjqRUtuxnHeSzTsU0hV0X5GblALVPIjctZIgjJU/qCRqGaAuk2Oib+ZfjulBtlUHAAAAABJRU5ErkJggg==\n{/template:GadgetTranslateIconUrl}\n\n{template:GadgetTranslateIconSelectedUrl}\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAABw0lEQVRIx62WvUoDQRSFY6IiIWAkCKZRe8Et8gYpLLQJYiuInU0ULRQUUqYRK59BYiGIVRohLxBMkcJ0URsRlICBJbJGz4UTGcbd7Ew2gY/duXfvnvnbM4nlcjkH3IEe+DGkxxonZvrDwzVwBpIWNUnW1GyEpIfxgNwc2JerTy4utVZCyn0aLCnk2ZG8Fk/rtbZCZcM1KkcVynJz+HED7nmfjSSkxFbBIUiwPQ8+wXZYra2QrNU7OGL7AryAqbEKMX4AumAduNI2rbUVmgRNLn5TH824pm4WnAMPdHjd4MftWTiIxxrH7zs65vq8gT2ObAc8WAjo1HWhFfAETkHKx0FG5p8F4X5GRhBgVUG0yFChP1OVUfCjlOQlmDAQaijPNIYJjXJMqBRBhhQDhbTpWVaSHYOp61HghGSCOmwkJFMIvn1ecC02BZ5JgrGRhWSD7IK+9oI1UFDaBcZChaZBVRUjr4otDXJtHn6ygRZIirH2UCGl91XtQVfJXzFWElsCFXBLKoyVQoUCxFzGxYa+OIVy0m76TNMWc/1QIcVUB1OyyOPcVTzskValC30w5xkJ+fwR6UayIAuXr0cyVQshJ8ox8Qty20EB8f+CcwAAAABJRU5ErkJggg==\n{/template:GadgetTranslateIconSelectedUrl}\n")
  var Bq = Zc(["//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"])

  function Cq(a) {Z.call(this, a)}

  D(Cq, Z)
  A = Cq.prototype
  A.init = function (a, b) {
    this.ui = a
    a = document.querySelector(Kb)
    var c = a.querySelector("#gadget-translate-css")
    c && c.remove()
    c = document.createElement(vc)
    c.setAttribute(Qb, "gadget-translate-css")
    c.setAttribute(kb, qc)
    c.append(this.template("GadgetTranslateCSS"))
    a.append(c)
    this.ga(b, "Translate" + this.P)
  }
  A.Pl = function () {
    var a = google.translate.TranslateElement
    new a({
      pageLanguage: this.C.pageLanguage || "en",
      autoDisplay: Bc,
      layout: this.C.layout && a.InlineLayout[this.C.layout]
    }, "gadget-translate" + this.P)
  }
  A.render = function (a) {
    if (this.Mb && this.enabled) {
      a && Bd(a, this.T())
      window.googleTranslateElementInit = this.Pl.bind(this)
      a = dn(Oa, { type: xc })
      var b = dk(Bq)
      a.src = ii(b)
      Fi(a);
      (b = document.querySelector(Kb)) && b.append(a)
    }
  }
  A.N = function () {return this.C.title || this.template("GadgetTranslateTitle")}
  A.ca = function () {return this.template("GadgetTranslateIconUrl")}
  A.aa = function () {return this.template("GadgetTranslateIconSelectedUrl")}
  A.T = function () {return this.template("GadgetTranslate", { suffix: this.P })}
  ml(nl(), Fa, Rp)
  ml(nl(), "BloggerButton", Zp)
  ml(nl(), Ia, Sp)
  ml(nl(), "BlogList", $p)
  ml(nl(), "Image", aq)
  ml(nl(), "Label", bq)
  ml(nl(), "LinkList", cq)
  ml(nl(), "PopularPosts", dq)
  ml(nl(), "Profile", eq)
  ml(nl(), "Stats", xq)
  ml(nl(), "Subscribe", yq)
  ml(nl(), "Text", zq)
  ml(nl(), "TextList", Aq)
  ml(nl(), "Translate", Cq)

  function Dq() {
    W.call(this)
    this.Ek = this.oj.bind(this)
    this.jg = !1
    this.Be = []
    this.Ym = !blogger.ui().getSetting(Db)
  }

  D(Dq, W)
  A = Dq.prototype
  A.Ua = function () {return { name: "classic", pageSize: 10, itemsPerAd: 3, animate: !0 }}
  A.Ki = function () {return this.Ym}
  A.Xa = function () {
    Mk(this)
    blogger.ui().getSetting(Db) || this.ui.select()
  }
  A.Pc = function () {this.ui.current() || this.oj()}
  A.Ya = function (a) {
    var b = this
    if (a) {
      var c = document.querySelector(pa), d = document.querySelectorAll(qa).length
      a.forEach(function (e) {
        var f = b.template(La, e)
        f = Cd(Eq(b, f))
        f.dataset.id = e.id
        if (f) {
          b.settings.itemsPerAd && d++ % b.settings.itemsPerAd == 0 && (e = Cd(b.template("Ad"))) && c.append(e)
          try {c.append(f)} catch (h) {}
        }
      })
      this.ui.headless() || Fq(this)
    }
  }

  function Fq(a) {
    var b = document.querySelector(pa)
    b && (a.jg || (window.addEventListener(mc, function () {
      clearTimeout(a.Nb)
      a.Nb = setTimeout(a.tl.bind(a), 250)
    }), a.jg = !0), b.querySelectorAll("img").forEach(function (c) {
      var d = c.dataset.src
      if (d || !c.complete) Gq(c) ? d && (delete c.dataset.src, Ed(c, d)) : (d || (d = c.getAttribute(v), c.setAttribute(ub, d)), Ed(c, vb), U(c, "deferred"), a.Be.push(c))
    }))
  }

  A.tl = function () {
    this.Be = this.Be.filter(function (a) {
      if (Gq(a)) {
        var b = document.createElement("img")
        b.onload = function () {
          Ed(a, a.dataset.src)
          delete a.dataset.src
          V(a, "deferred");
          (new Po(a, .6, { opacity: 0 }, { opacity: 1 }, [{
            Rd: $b,
            duration: .6,
            timing: "ease-in-out",
            delay: 0
          }])).kc()
        }
        Ed(b, a.dataset.src)
        return !1
      }
      return !0
    })
  }

  function Gq(a) {
    var b = Hq(), c = Iq(a)
    c.top -= 400
    c.right += 400
    c.bottom += 400
    c.left -= 400
    if (!(c.top <= b.bottom && c.right >= b.left && c.bottom >= b.top && c.left <= b.right)) return !1
    for (; a; a = a.parentElement) if (getComputedStyle(a).display == Yb || getComputedStyle(a).opacity == "0") return !1
    return !0
  }

  function Eq(a, b) {
    return a.ui.headless() ? b : Jd(b, {
      tag: "img",
      attr: v,
      replace: function (c) {return c.name == "img" && c.attr(v) ? (c.attr(ub, c.attr(v)), delete c.attributes.src, c.encode()) : c.Sa}
    })
  }

  A.Wa = function (a) {
    this.Aa(!0)
    var b = a.map(function (d) {return d.id})
    a = document.querySelector(pa)
    U(a, q)
    Array.from(a.children).forEach(function (d) {Kk(d, q, b.includes(d.getAttribute(rb)))})
    if (this.settings.animate) {
      var c = Array.from(a.children)
      a = c.filter(function (d) {return !d.matches(ja)})
      c = c.filter(function (d) {return d.matches(ja)})
      a.forEach(function (d) {Jq(d)})
      c.forEach(function (d) {Kq(d)})
    }
    window.scroll({ top: 0, behavior: sc })
  }

  function Lq(a, b, c) {
    var d = {
      height: "0px",
      "margin-top": "0px",
      "margin-bottom": "0px",
      "padding-top": "0px",
      "padding-bottom": "0px"
    }
    c = {
      height: c.height + hc,
      "margin-top": c.marginTop + hc,
      "margin-bottom": c.marginBottom + hc,
      "padding-top": c.paddingTop + hc,
      "padding-bottom": c.paddingBottom + hc
    }
    return new Po(a, .2, b ? d : c, b ? c : d, [{ Rd: "all", duration: .2, timing: "linear", delay: 0 }])
  }

  function Mq(a) {
    return {
      height: parseFloat(ln(a, Mb)),
      marginTop: parseFloat(ln(a, Xb)),
      marginBottom: parseFloat(ln(a, "margin-height")),
      paddingTop: parseFloat(ln(a, "padding-top")),
      paddingBottom: parseFloat(ln(a, "padding-height"))
    }
  }

  function Jq(a) {
    if (a.style.display != Yb) {
      var b = Mq(a)
      b.height === 0 || a.dataset.height || (a.dataset.height = b.height, a.dataset.marginTop = b.marginTop, a.dataset.marginBottom = b.marginBottom, a.dataset.paddingTop = b.paddingTop, a.dataset.paddingBottom = b.paddingBottom)
      b = Lq(a, !1, b)
      Qn(b, "end", function () {rn(a, !1)})
      b.kc()
    }
  }

  function Kq(a) {
    var b = Mq(a)
    if (b.height === 0 || b.height !== a.dataset.height) b.height === 0 && (b.height = a.dataset.height, b.marginTop = a.dataset.marginTop, b.marginBottom = a.dataset.marginBottom, b.paddingTop = a.dataset.paddingTop, b.paddingBottom = a.dataset.paddingBottom), rn(a, !0), a = Lq(a, !0, b), Qn(a, "end", function () {window.dispatchEvent(new CustomEvent(mc))}), a.kc()
  }

  A.Ma = function () {
    var a = document.querySelector(pa)
    V(a, q)
    this.settings.animate ? Array.from(a.children).forEach(function (b) {
      V(b, q)
      Kq(b)
    }) : Array.from(a.children).forEach(function (b) {V(b, q)})
    this.Aa(!1)
  }
  A.Qb = function (a) {
    if (a) if (this.ui.getSetting(dc)) this.ui.notify(Ic, a) else {
      var b = document.querySelector(oa + a.id + "\"]")
      if (b) {
        if (!this.Ce) {
          var c = document.querySelector(".item[data-id]")
          this.Ce = c ? Iq(c) : { top: 0, left: 0 }
        }
        c = Iq(b)
        window.scroll({ top: c.top - this.Ce.top, left: c.left - this.Ce.left, behavior: sc })
        this.ui.viewItem(a, b)
      }
      this.La()
    }
  }
  A.oj = function () {
    var a = Hq()
    a = (a.top + a.bottom) / 2
    for (var b = document.querySelectorAll(qa), c = 0, d; d = b[c]; c++) if (Iq(d).top < a) var e = d else break
    e && (a = this.ui.find(e.dataset.id)) && a != this.ui.current() && (this.ui.select(a, !1), this.ui.viewItem(a, e))
  }
  A.bj = function () {
    clearTimeout(this.wk)
    this.wk = setTimeout(this.Ek, 400)
  }
  A.ef = function () {}

  function Hq() {
    return {
      top: window.pageYOffset,
      right: window.pageXOffset + window.innerWidth,
      bottom: window.pageYOffset + window.innerHeight,
      left: window.pageXOffset
    }
  }

  function Iq(a) {
    var b = a.getBoundingClientRect()
    return {
      top: b.top + window.pageYOffset,
      right: b.left + window.pageXOffset + parseFloat(getComputedStyle(a, null).width),
      bottom: b.top + window.pageYOffset + parseFloat(getComputedStyle(a, null).height),
      left: b.left + window.pageXOffset
    }
  }

  function Nq(a, b) {
    var c = Oq[b]
    if (!c) return null
    a = Pq(c, a, b)
    a.sort(function (d, e) {return d.qb || e.qb ? d.qb ? 1 : -1 : c.compare(d, e)})
    return a
  }

  function Pq(a, b, c) {
    for (var d = [], e, f = 0; e = b[f]; f++) if (c == "tag") for (var h = a.Pk(e), k, l = 0; k = h[l]; l++) {
      for (var m = !0, n, u = 0; n = d[u]; u++) if (n.caption == k.caption) {
        m = !1
        Qq(n, f, e)
        break
      }
      m && (d.push(k), Qq(k, f, e))
    } else {
      h = null
      for (l = 0; k = d[l]; l++) if (a.Gd(k, e)) {
        h = k
        break
      }
      h || (h = a.Oe(e), d.push(h))
      Qq(h, f, e)
    }
    return d
  }

  var Oq = {
    author: {
      Gd: function (a, b) {return b.author ? a.attr("value") == b.author.name : a.qb},
      Oe: function (a) {
        return a.author ? new Rq(a.author.name, {
          type: "author",
          value: a.author.name
        }) : new Rq(Dc, void 0, !0)
      },
      compare: function (a, b) {return a.caption.toLowerCase() > b.caption.toLowerCase() ? 1 : -1}
    },
    tag: {
      Gd: function (a, b) {
        if (b.tags && b.tags.length > 0) {
          for (var c = 0; c < b.tags.length; c++) if (a.attr("value") == b.tags[c]) return !0
          return !1
        }
        return a.qb
      }, Pk: function (a) {
        var b = []
        a.tags && a.tags.length > 0 ? a.tags.forEach(function (c) {
          b.push(new Rq(c,
            { type: "tag", value: c }))
        }) : b.push(new Rq("No labels", void 0, !0))
        return b
      }, compare: function (a, b) {return a.caption.toLowerCase() > b.caption.toLowerCase() ? 1 : -1}
    },
    published: {
      Gd: function (a, b) {return b.published ? a.attr("year") == b.published.getFullYear() && a.attr("month") == b.published.getMonth() : a.qb},
      Oe: function (a) {
        return a.published ? new Rq("January February March April May June July August September October November December".split(" ")[a.published.getMonth()] + " " + a.published.getFullYear(), {
          type: fc, year: a.published.getFullYear(),
          month: a.published.getMonth()
        }) : new Rq(Dc, void 0, !0)
      },
      compare: function (a, b) {return a.attr("year") == b.attr("year") ? a.attr("month") < b.attr("month") ? 1 : -1 : a.attr("year") < b.attr("year") ? 1 : -1}
    },
    service: {
      Gd: function (a, b) {return (b = b instanceof Ak && "Blogger") ? a.attr("value") == b : a.qb},
      Oe: function (a) {
        return (a = a instanceof Ak && "Blogger") ? new Rq(a, {
          type: "service",
          value: a
        }) : new Rq(Dc, void 0, !0)
      },
      compare: function (a, b) {return a.caption.toLowerCase() > b.caption.toLowerCase() ? 1 : -1}
    }
  }

  function Rq(a, b, c) {
    c = c === void 0 ? !1 : c
    this.caption = a
    this.xk = []
    this.gg = Object.assign({}, b)
    this.qb = !!c
  }

  Rq.prototype.attr = function (a, b) {
    b != null && (this.gg[a] = b)
    return this.gg[a]
  }

  function Qq(a, b, c) {a.items().push({ index: b, item: c })}

  Rq.prototype.values = function () {return this.items().map(function (a) {return a.item})}
  Rq.prototype.items = function () {return this.xk}
  Rq.prototype.count = function () {return this.items().length}

  function Sq() {W.call(this)}

  D(Sq, W)
  A = Sq.prototype
  A.Ua = function () {
    return {
      name: "flipcard",
      size: 125,
      groupedSize: 50,
      spacing: 5,
      groupSpacing: 25,
      groupedSizeTablet: 125,
      groupSpacingTablet: 60,
      labelGroupSpacing: 0,
      labelGroupSpacingTablet: 30,
      offset: 0,
      pageSize: 25,
      randomizeFlip: !1,
      animateLoad: !0
    }
  }
  A.scope = function (a) {
    a.scope(rc, this.settings.size)
    this.settings.randomizeFlip && a.scope("setting:direction", ["flipLeft", "flipRight", "flipUp", "flipDown"][Math.floor(Math.random() * 4)])
  }
  A.Ac = function () {this.ui.addModule(Na)}
  A.Xa = function () {
    this.ui.headless() && (this.settings.animateLoad = !1)
    Mk(this)
    Tq(this);
    (this.kd = document.querySelector("#controls")) && this.kd.addEventListener(mb, this.Ll.bind(this))
    this.ui.select()
  }
  A.Ya = function (a) {
    var b = this
    if (a) {
      var c = document.querySelector(pa), d = c.querySelectorAll(g).length, e = d, f = []
      a.forEach(function (h, k) {
        var l = Cd(b.template(La, h))
        l.dataset.id = h.id
        h = Uq(b, d++)
        var m = b.settings.size
        mn(l, h.left, h.top)
        on(l, m, m)
        b.settings.animateLoad && (h.left = h.left + window.innerWidth + m * k, mn(l, h.left, h.top), U(l, "new"), f.push(l))
        c.append(l)
      })
      this.settings.animateLoad && setTimeout(function () {
        f.forEach(function (h, k) {
          V(h, "new")
          k = Uq(b, e + k)
          mn(h, k.left, k.top)
        })
      }, 0)
    }
  }
  A.Kd = function () {return this.settings.scrollBuffer >= Uq(this, document.querySelectorAll(qa).length).top - window.innerHeight - window.pageYOffset}

  function Tq(a) {
    a.settings.columnWidth = a.settings.size + a.settings.spacing
    a.settings.rowHeight = a.settings.size + a.settings.spacing
    a.settings.numColumns = Math.max(1, Math.floor(document.querySelector(pa).clientWidth / a.settings.columnWidth))
  }

  A.Nd = function () {
    Tq(this)
    clearTimeout(this.Fc)
    this.Fc = setTimeout(this.yk.bind(this), 500)
  }
  A.yk = function () {this.Lb ? (Array.from(document.querySelectorAll(".cloned")).forEach(function (a) {a.remove()}), Vq(this)) : Wq(this)}

  function Uq(a, b) {
    var c = a.settings.numColumns, d = b % c, e = d * a.settings.columnWidth
    b = Math.floor(b / c) * a.settings.rowHeight
    d % 2 && (b += a.settings.offset)
    return { left: e, top: b }
  }

  A.Wa = function (a) {
    this.De = !0
    Xq(this)
    var b = a.map(function (c) {return c.id})
    document.querySelectorAll(g).forEach(function (c) {Kk(c, q, !b.includes(c.getAttribute(rb)))})
    window.scroll({ top: 0, behavior: sc })
    Yq(this)
  }
  A.Ma = function () {
    document.querySelectorAll(g).forEach(function (a) {V(a, q)})
    this.De = !1
    Xq(this)
    Yq(this)
  }
  A.Ll = function (a) {
    var b = a.target.getAttribute("data-category")
    b && b != this.Ye && this.kd && (this.kd.querySelectorAll(".group").forEach(function (c) {V(c, pc)}), (a = a.target.closest(".group")) && U(a, pc), this.Ye = b, Yq(this))
  }

  function Yq(a) {
    document.querySelectorAll(".cloned").forEach(function (d) {
      mn(d, 0, 0)
      Y(d, $b, "0")
      d.addEventListener("transitionend", function () {d.remove()})
    })
    var b = Array.from(document.querySelectorAll(g)).filter(function (d) {return !d.matches(".ad")}),
      c = a.data.items().map(function (d, e) {if (!b[e].matches(ja)) return d})
    a.Lb = Nq(c, a.Ye)
    Xq(a);
    (c = document.querySelector("#main")) && Kk(c, "grouped", a.Lb != null)
    for (c = document.querySelector("#labels"); c.firstChild;) c.removeChild(c.firstChild)
    a.Lb ? Vq(a) : Wq(a)
  }

  function Xq(a) {a.Aa(!(!a.Lb && !a.De))}

  function Wq(a) {
    Array.from(document.querySelectorAll(g)).filter(function (b) {return !b.matches(ja)}).forEach(function (b, c) {
      c = Uq(a, c)
      var d = a.settings.size
      V(b, "grouped")
      mn(b, c.left, c.top)
      on(b, d, d)
    })
  }

  function Vq(a) {
    var b = a.data.getSettings().is_tablet, c = b ? a.settings.groupedSizeTablet : a.settings.groupedSize,
      d = b ? a.settings.groupSpacingTablet : a.settings.groupSpacing,
      e = b ? a.settings.labelGroupSpacingTablet : a.settings.labelGroupSpacing, f = c + a.settings.spacing,
      h = c + a.settings.spacing, k = Math.max(1, Math.floor(document.querySelector(pa).clientWidth / f)), l = 0, m = 0
    if (!b) {
      for (var n = 0; m = a.Lb[n]; n++) l = Math.max(l, m.count())
      m = Math.max(1, Math.ceil(l / k))
    }
    l = Array.from(document.querySelectorAll(g)).filter(function (za) {return !za.matches(ja)})
    for (n = document.querySelector("#labels"); n.firstChild;) n.removeChild(n.firstChild)
    for (var u = 0, w = 0, y = {}, L = document.querySelector(ba), B, Ha = 0; B = a.Lb[Ha]; Ha++) {
      for (var ya = void 0, ca = {}, bb = 0; ya = B.items()[bb]; ca = { jb: void 0, ja: void 0 }, bb++) {
        ca.ja = {
          left: (b ? bb % k : Math.floor(bb / m)) * f,
          top: (u + (b ? Math.floor(bb / k) : bb % m)) * h + w + e,
          width: c,
          height: c
        }
        var cb = l[ya.index]
        U(cb, "grouped")
        a.Ye == "tag" ? y[ya.index] ? (ca.jb = cb.cloneNode(!0), U(ca.jb, "cloned"), Y(ca.jb, $b, "0"), L.append(ca.jb), setTimeout(function (za) {
          return function () {
            mn(za.jb,
              za.ja.left, za.ja.top)
            on(za.jb, za.ja.width, za.ja.height)
            Y(za.jb, $b, "1")
          }
        }(ca), 0)) : (y[ya.index] = !0, mn(cb, ca.ja.left, ca.ja.top), on(cb, ca.ja.width, ca.ja.height)) : (mn(cb, ca.ja.left, ca.ja.top), on(cb, ca.ja.width, ca.ja.height))
      }
      ya = b ? Math.ceil(B.count() / k) : Math.min(B.count(), m)
      B = Cd(a.template("GroupLabel", {
        Tag: zk(a.ui.localize(B.caption)),
        TagAsClass: Ad(B.caption),
        TagURL: B.url
      })) || null
      mn(B, 0, u * h + w)
      Y(B, "position", "absolute")
      Y(B, "max-height", "" + ya * h + hc)
      B && n.append(B)
      u += ya
      w += d
    }
  }

  A.Pc = function () {
    this.De && this.Ma()
    Yq(this)
  }

  function Zq() {W.call(this)}

  D(Zq, W)
  A = Zq.prototype
  A.Ua = function () {return { name: "magazine", imgSize: 200, imgSizeLead: 500, pageSize: 10, numFeature: 4 }}
  A.scope = function (a) {a.data("Number") == 1 ? (a.scope("column:lead", !0), a.scope(rc, this.settings.imgSizeLead)) : (a.data("Number") <= this.settings.numFeature + 1 ? a.scope("column:feature", !0) : a.scope("column:fold", !0), a.scope(rc, this.settings.imgSize))}
  A.Ac = function () {this.ui.addModule(Na)}
  A.Xa = function () {
    Mk(this)
    this.ui.select()
  }
  A.Ya = function (a) {
    var b = this
    if (a) {
      var c = document.querySelectorAll(g).length, d = document.querySelector("#lead"),
        e = document.querySelector("#feature"), f = document.querySelector("#fold")
      a.forEach(function (h, k) {
        var l = Cd(b.template(La, h))
        l.dataset.id = h.id
        l && (c + k == 0 ? d.append(l) : c + k <= b.settings.numFeature ? e.append(l) : f.append(l))
      })
    }
  }
  A.Wa = function (a, b) {
    var c = a.map(function (d) {return d.id})
    document.querySelectorAll(g).forEach(function (d) {Kk(d, q, c.indexOf(d.dataset.id) >= 0)})
    if (this.Wf != b) {
      if (a = document.querySelector(ma)) a = a.getBoundingClientRect().top - document.querySelector(ba).getBoundingClientRect().top, window.scroll({
        top: a,
        behavior: sc
      })
      this.Wf = b
    }
  }
  A.Ma = function () {
    document.querySelectorAll(g).forEach(function (a) {V(a, q)})
    delete this.Wf
  }

  function $q(a, b) {
    this.va = a
    this.blockSize = b
    this.M = []
    this.G = []
  }

  function ar(a, b, c) {
    a = a.M[b]
    if (c === void 0) {
      for (c = 0; c < a.length; c++) if (a[c] == null) return !1
      return !0
    }
    return a[c] != null
  }

  function br(a, b) {
    if (b.height && !(b.height <= 0)) {
      for (; a.M.length < b.D + b.height;) {
        for (var c = a.M, d = c.push, e = a, f = [], h = 0; h < e.va; h++) f.push(null)
        d.call(c, f)
      }
      b.id == null && (b.id = a.G.length, a.G.push(b))
      for (c = 0; c < b.height; c++) for (d = a.M[b.D + c], e = 0; e < b.width; e++) d[b.column + e] = b.id
    }
  }

  $q.prototype.remove = function (a) {
    a = this.G[a]
    for (var b = 0; b < a.height; b++) for (var c = this.M[a.D + b], d = 0; d < a.width; d++) c[a.column + d] = null
  }

  function cr(a) {
    for (var b = 0; b < a.M.length; b++) for (var c = 0; c < a.va; c++) a.M[b][c] = null
    for (b = 0; b < a.G.length; b++) br(a, a.G[b])
  }

  function dr(a) {
    cr(a)
    var b
    do {
      for (b = !1; er(a);) cr(a), b = !0
      for (; fr(a);) cr(a), b = !0
    } while (b)
  }

  function er(a) {
    for (var b = !1, c = a.M.length - 1; c >= 0; c--) {
      for (var d = !0, e = 0; e < a.va; e++) if (ar(a, c, e)) {
        d = !1
        break
      }
      if (d) for (d = 0; d < a.G.length; d++) e = a.G[d], e.D > c && (e.D--, b = !0)
    }
    return b
  }

  function fr(a) {
    for (var b = !1, c = 0; c < a.M.length; c++) for (var d = 0; d < a.va; d++) {
      a:{
        var e = a
        for (var f = c, h = d, k = null, l = f != null ? f : 0; l < e.M.length; l++) {
          for (var m = k ? k.right + 1 : e.va, n = k ? k.left : 0; n < m; n++) if (!ar(e, l, n)) if (k) k.D == l && (k.width++, k.right++) else {
            if (!f || f != l || h != null && h != n) k = {
              D: l,
              top: l,
              bottom: l,
              column: n,
              left: n,
              right: n,
              width: 1,
              height: 1
            }
          } else if (k) {
            e = k
            break a
          }
          k && k.D != l && (k.height++, k.bottom++)
        }
        e = k
      }
      if (e) {
        k = f = null
        for (h = e.column; h < a.va; h++) {
          a:{
            k = a
            l = e.D + e.height
            if (l != null && h != null) for (; l < k.M.length; l++) if (m =
              k.G[k.M[l][h]]) {
              k = m
              break a
            }
            k = void 0
          }
          if (k && (l = k.position(), l.left >= e.left && l.right <= e.right)) {
            f = k
            break
          }
        }
        f && (f = !1, k && k.id > 0 && (f = a.G[k.id - 1].position(), f = f.top == e.top ? e.right < f.left : f.top > e.top), f || (a.remove(k.id), k.D = e.D, br(a, k), b = !0))
      }
    }
    return b
  }

  function gr(a, b, c) {
    b = a.G[b]
    if (b.height != c || b.width != a.va) {
      b.Sb || (b.Sb = {
        width: b.width,
        height: b.height,
        D: b.D,
        column: b.column
      })
      for (var d = a.va, e = -1, f = 0; f < b.id; f++) e = Math.max(a.G[f].position().bottom + 1, e)
      e < b.D && (e = b.D)
      f = c - b.height
      for (var h = b.position(), k = h.top; k <= h.bottom; k++) for (var l = 0; l < a.va; l++) {
        var m = a.G[a.M[k][l]]
        m && m.id > b.id && (f = Math.max(f, c - (m.D - b.D)))
      }
      f += e - b.D
      b.D = e
      b.width = d
      b.height = c
      b.column = 0
      for (c = b.id + 1; c < a.G.length; c++) a.G[c].D += f
      dr(a)
    }
  }

  function hr(a, b, c, d) {
    this.width = a
    this.height = b
    this.D = c
    this.column = d
  }

  hr.prototype.position = function () {
    return {
      top: this.D,
      right: this.column + this.width - 1,
      bottom: this.D + this.height - 1,
      left: this.column
    }
  }

  function ir() {
    W.call(this)
    this.Xc = !1
  }

  D(ir, W)
  A = ir.prototype
  A.Ua = function () {
    return {
      name: "mosaic",
      size: 160,
      imgSize: 320,
      minColumns: 2,
      maxColumns: 20,
      maxWidth: 2,
      maxHeight: 2,
      margin: 0,
      spacing: 5,
      animateTimer: 700,
      measureInterval: 1E3,
      autoCollapse: !0,
      pageSize: 10
    }
  }
  A.scope = function (a) {a.scope(rc, this.settings.size * Math.max(this.settings.maxWidth, this.settings.maxHeight))}
  A.Xa = function () {
    this.ui.headless() && (this.settings.animateTimer = 0)
    Mk(this)
    document.querySelector(ba).focus()
    jr(this)
    this.ui.select()
  }
  A.Nd = function () {
    clearTimeout(this.Fc)
    Ik(document.querySelector(ib), $a) || (this.Fc = setTimeout(this.zm.bind(this), 500))
  }
  A.Ya = function (a) {
    var b = this
    if (a) {
      var c = [], d = 0, e = this.settings.spacing
      a.forEach(function (h) {
        var k = kr(b), l = Cd(b.template(La, h)), m = lr(b, k)
        l.dataset.id = h.id
        l.dataset.Ik = k.id
        on(l, m.width, m.height)
        mn(l, m.left, m.top)
        d = Math.max(d, m.top + m.height + e * 2)
        h && c.push(l)
      })
      a = this.X.columns
      a = (a + 1) * e + a * this.X.size
      if (c.length > 0) {
        var f = document.querySelector(pa)
        f.append.apply(f, Yc(c))
        on(f, a, d)
      }
    }
  }

  function mr(a, b) {
    a = Cd(a.template("Post", b))
    a.dataset.id = b.id
    return a
  }

  A.zm = function () {
    var a = document.querySelector(na)
    nr(this)
    or(this)
    a && (a = this.ui.find(a.dataset.id), this.Qb(a))
    this.La()
  }

  function or(a) {
    var b = pr(a), c = !a.X || a.X.columns != b.columns
    a.X = b
    c && jr(a)
    qr(a)
  }

  function qr(a) {
    for (var b = Array.from(document.querySelectorAll(g)).filter(function (k) {return !k.matches(ja)}), c = a.settings.spacing, d = 0, e, f = 0; e = a.tb.G[f]; f++) {
      var h = b[f]
      e = lr(a, e)
      on(h, e.width, e.height)
      mn(h, e.left, e.top)
      d = Math.max(d, e.top + e.height + c * 2)
    }
    b = a.X.columns
    on(document.querySelector(pa), (b + 1) * c + b * a.X.size, d)
  }

  function rr(a, b) {
    if (!b) return null
    if (a.Xc) if (b) {
      a = 0
      for (b = b.previousSibling; b; b = b.previousSibling) b.matches(ja) || a++
      b = a
    } else b = 0 else b = b.dataset.Ik
    return b
  }

  A.Bl = function () {
    if (!Ik(document.querySelector(ib), $a)) {
      var a = document.querySelector(na)
      if (a) {
        var b = rr(this, a)
        if (b != null) {
          var c = -15
          Array.from(a.children).forEach(function (d) {c += d.offsetHeight})
          a = Math.ceil(c / (this.settings.spacing + this.X.size))
          this.tb.G[b].height != a && (gr(this.tb, b, a), sr(this), qr(this))
        }
      }
    }
  }

  function nr(a) {
    clearInterval(a.Cl)
    document.querySelectorAll(na).forEach(function (b) {
      var c = rr(a, b)
      V(b, ac);
      (b = b.querySelector(".article")) && b.remove()
      b = a.tb
      var d = b.G[c]
      d.column = d.Sb.column
      c = d.Sb.width
      var e = d.Sb.height
      d = b.G[d.id]
      if (d.height != e || d.width != b.width) {
        d.Sb || (d.Sb = { width: d.width, height: d.height, D: d.D, column: d.column })
        for (var f = -1, h = 0; h < d.id; h++) f = Math.max(b.G[h].position().bottom + 1, f)
        f < d.D && (f = d.D)
        h = e - d.height
        for (var k = d.position(), l = k.top; l <= k.bottom; l++) for (var m = 0; m < b.va; m++) {
          var n =
            b.G[b.M[l][m]]
          n && n.id > d.id && (h = Math.max(h, e - (n.D - d.D)))
        }
        h += f - d.D
        d.D = f
        d.width = c
        d.height = e
        for (c = d.id + 1; c < b.G.length; c++) b.G[c].D += h
        dr(b)
      }
    })
    sr(a)
  }

  function tr(a, b) {
    var c = rr(a, b), d = a.ui.find(b.dataset.id)
    if (d) {
      var e = ur(a, d) + 5
      gr(a.tb, c, Math.ceil(e / (a.settings.spacing + a.X.size)))
      sr(a)
      c = mr(a, d)
      U(b, ac)
      b.querySelectorAll(".article").forEach(function (f) {for (; f.firstChild;) f.removeChild(f.firstChild)})
      try {b.append(c)} catch (f) {try {b.append(c)} catch (h) {a.log(Ka)}}
      a.Cl = setInterval(a.Bl.bind(a), a.settings.measureInterval)
      a.ui.viewItem(d, c)
      a.ui.updated()
    }
  }

  function sr(a) {
    U(document.querySelector(ib), $a)
    clearTimeout(a.Gk)
    a.Gk = setTimeout(function () {V(document.querySelector(ib), $a)}, a.settings.animateTimer)
  }

  A.Qb = function (a) {
    a = document.querySelector(oa + a.id + "\"]")
    var b = !Ik(a, ac)
    this.settings.autoCollapse && nr(this)
    b ? (tr(this, a), qr(this), vr(this, a)) : this.ui.clearSelection()
  }
  A.Xi = function () {
    var a = document.querySelector(na)
    nr(this)
    or(this)
    vr(this, a)
  }

  function vr(a, b) {
    b = rr(a, b)
    if (b != null) {
      b = lr(a, a.tb.G[b])
      var c = document.querySelector("#main").getBoundingClientRect().top + window.pageYOffset
      c -= document.querySelector("#header .header-bar").getBoundingClientRect().height
      window.scroll({ top: b.top - a.settings.spacing + c, behavior: a.ui.headless() ? "auto" : sc })
    }
  }

  function jr(a) {
    a.X || (a.X = pr(a))
    a.tb = new $q(a.X.columns, a.X.size)
    if (a.data.items() && a.data.items().length) for (var b = a.Xc ? Array.from(document.querySelectorAll(g)).filter(function (d) {return !d.matches(ja)}).length : a.data.items().length, c = 0; c < b; c++) kr(a)
  }

  function kr(a) {
    var b = a.tb
    var c = b.M.length
    for (var d = c - 1; d >= 0 && !ar(b, d); d--) c = d
    if (c == b.M.length) c = { D: c, column: 0, width: b.va } else {
      d = b.M[c]
      for (var e = -1, f = 0, h = 0; h < d.length; h++) if (!ar(b, c, h)) e < 0 && (e = h), f++ else if (e >= 0) break
      c = e >= 0 ? { D: c, column: e, width: f } : void 0
    }
    a = new hr(Math.min(Math.floor(Math.random() * a.settings.maxWidth) + 1, c.width), Math.floor(Math.random() * a.settings.maxHeight) + 1, c.D, c.column)
    br(b, a)
    return a
  }

  function pr(a) {
    var b = document.querySelector("#main").clientWidth - a.settings.margin * 2, c = Math.floor(b / a.settings.size)
    b - (c + 1) * a.settings.spacing / c > a.settings.size && c++
    c = Math.max(c, a.settings.minColumns)
    c = Math.min(c, a.settings.maxColumns)
    return { size: Math.floor((b - (c + 1) * a.settings.spacing) / c), columns: c }
  }

  function ur(a, b) {
    var c = document.querySelector("#virtualWall")
    c && c.remove()
    c = document.createElement("div")
    c.setAttribute(Qb, "virtualWall")
    var d = document.createElement("div")
    U(d, "virtualBrick")
    c.append(d)
    document.querySelector(ib).append(c)
    var e = a.X.columns
    e = a.X.size * e + (e - 1) * a.settings.spacing
    b = mr(a, b)
    d.style.width = nn(e, !0)
    try {d.append(b)} catch (f) {try {d.append(b)} catch (h) {a.log(Ka)}}
    a = pn(b).height - 20
    c.remove()
    return a
  }

  function lr(a, b) {
    var c = a.X.size
    a = a.settings.spacing
    return {
      width: c * b.width + (b.width - 1) * a,
      height: c * b.height + (b.height - 1) * a,
      left: b.column * (c + a) + a,
      top: b.D * (c + a) + a
    }
  }

  A.Wa = function (a) {
    this.Aa(!0)
    nr(this)
    this.Xc = !0
    var b = a.map(function (c) {return c.id})
    document.querySelectorAll(g).forEach(function (c) {Kk(c, q, !b.includes(c.dataset.id))})
    or(this)
    window.scroll({ top: 0, behavior: sc })
  }
  A.Ma = function () {
    nr(this)
    document.querySelectorAll(g).forEach(function (a) {V(a, q)})
    or(this)
    this.Xc = !1
    this.Aa(!1)
  }
  A.ef = function (a) {
    var b = a.target.closest(g)
    if (b) {
      var c = b.dataset.id
      if ((!Ik(b, ac) || a.target.matches(".item, .article")) && c && !a.metaKey) return a.stopPropagation(), a.preventDefault(), this.ui.select(c, b), !1
    }
  }

  function wr() {W.call(this)}

  D(wr, W)
  A = wr.prototype
  A.Ua = function () {return { name: "sidebar", imgSize: 30, tabsVisible: 5 }}
  A.scope = function (a) {a.scope(rc, this.settings.imgSize)}
  A.Xa = function () {
    this.ui.headless() && (this.settings.scrollSpeed = 0)
    Mk(this)
    var a = document.querySelector(fa)
    a && (a.addEventListener("wheel", this.Fm.bind(this)), Y(a, "top", document.querySelector(ba).getBoundingClientRect().top + window.pageYOffset + hc))
    Ud && Y(a, "overflow-y", "auto")
    this.ui.select()
  }
  A.Zi = function (a) {
    var b = this
    if (!document.querySelector(ba).children.length && a && a.length) {
      var c = a[0].id
      setTimeout(function () {
        b.ui.select(c, !1)
        b.Qb(b.ui.current())
      }, 0)
    }
  }
  A.Ya = function (a) {
    var b = this
    if (a) {
      var c = document.querySelector(ha)
      a.forEach(function (d) {
        var e = Cd(b.template(La, d))
        e.dataset.id = d.id
        c.append(e)
      })
    }
  }
  A.Pc = function () {xr(this)}
  A.Qb = function (a) {this.data.items().indexOf(a) != -1 && (yr(this, a), xr(this), zr(this), this.La())}

  function yr(a, b) {
    var c = Cd(a.template("Post", b))
    try {
      for (var d = document.querySelector(ba); d.firstChild;) d.removeChild(d.firstChild)
      d.append(c)
    } catch (f) {
      try {
        for (var e = document.querySelector(ba); e.firstChild;) e.removeChild(e.firstChild)
        e.append(c)
      } catch (h) {a.log(Ka)}
    }
    setTimeout(function () {window.scroll({ top: 0, behavior: sc })}, 0)
    a.ui.viewItem(b, c)
    a.ui.updated()
  }

  function xr(a) {
    document.querySelectorAll("#sidebar .item").forEach(function (b) {V(b, pc)});
    (a = a.ui.current() && a.ui.current().id) && (a = document.querySelector("#sidebar .item[data-id=\"" + a + "\"]")) && U(a, pc)
  }

  A.Fm = function (a) {
    a.preventDefault()
    var b = document.querySelector(ha)
    a = parseInt(getComputedStyle(b, null).marginTop, 10) + -1.25 * a.deltaY
    var c = b.querySelectorAll(g)
    c.length > 0 && (c = c[c.length - 1].offsetTop, a > 0 ? a = 0 : a < -c && (a = -c))
    U(b, Tb)
    Y(b, Xb, a + hc)
    setTimeout(function () {V(document.querySelector(ha), Tb)}, 500)
    this.La()
  }

  function zr(a) {
    if (!Ud) {
      var b = document.querySelector(fa), c = b.querySelector(".item.selected")
      if (c) {
        var d = Ar(c)
        a = d * a.settings.tabsVisible
        var e = parseInt(getComputedStyle(b.querySelector(pa), null).marginTop, 10), f = Ar(b), h = c.offsetTop
        if (Ik(b, q)) {
          h = 1
          for (c = c.previousSibling; c; c = c.previousSibling) c.matches(".item:not(.filtered)") && h++
          h *= d
        }
        c = 0
        if (h + e < a) c = a - h else if (f - a < h - e && (c = f - a - h - d, c > e)) return
        Y(b.querySelector(pa), Xb, Math.min(0, c))
      }
    }
  }

  A.Kd = function () {
    if (Ud) return !0
    var a = document.querySelector(fa), b = a.querySelector(pa)
    return this.settings.scrollBuffer >= Ar(b) - Ar(a) + parseInt(getComputedStyle(b, null).marginTop, 10)
  }
  A.Wa = function (a) {
    this.Aa(!0)
    var b = a.map(function (e) {return e.id}), c = document.querySelector(fa)
    U(c, q)
    c.querySelectorAll(g).forEach(function (e) {Kk(e, q, !(b.indexOf(e.dataset.id) >= 0))})
    var d = this.ui.current()
    if (d && (c = c.querySelector(oa + d.id + "\"]")) && c.matches(ja) && a && a.length) {
      this.ui.select(a[0].id)
      return
    }
    zr(this)
  }
  A.Ma = function () {
    var a = document.querySelector(fa)
    V(a, q)
    a.querySelectorAll(g).forEach(function (b) {V(b, q)})
    this.Aa(!1)
    zr(this)
  }

  function Ar(a) {return a ? parseFloat(getComputedStyle(a, null).height) : 0}

  function Br() {W.call(this)}

  D(Br, W)
  A = Br.prototype
  A.Ua = function () {return { name: "snapshot", spacing: 20, imgSize: 200, pageSize: 5, itemsPerAd: 10 }}
  A.scope = function (a) {
    a.scope(rc, this.settings.imgSize)
    a.scope("setting:askew", !0)
  }
  A.Ac = function () {this.ui.addModule(Na)}
  A.Xa = function () {
    Mk(this)
    this.ui.select()
  }
  A.Nd = function () {
    Cr(this)
    clearTimeout(this.Fc)
    this.Fc = setTimeout(this.Ee.bind(this), 500)
  }
  A.Ee = function () {
    var a = this
    Array.from(document.querySelectorAll(g)).filter(function (b) {return !b.matches(ja)}).forEach(function (b, c) {
      c = Dr(a, c)
      mn(b, c.left, c.top)
    })
  }
  A.Ya = function (a) {
    var b = this
    if (a) {
      var c = []
      a.forEach(function (e) {
        var f = Dd(b.template(La, e))
        f.forEach(function (h) {h.dataset.id = e.id})
        c.push.apply(c, Yc(f))
      })
      a = document.querySelector(pa)
      if (c.length > 0) {
        var d = a.querySelectorAll(g).length
        this.Hd || (a.append.apply(a, Yc(c)), Cr(this), this.Hd = !0)
        c.forEach(function (e, f) {
          f = Dr(b, d + f)
          mn(e, f.left, f.top)
        })
        a.append.apply(a, Yc(c))
      }
    }
  }

  function Cr(a) {
    var b = document.querySelector(pa), c = b ? b.clientWidth : 0
    b = b.querySelector(g)
    a.settings.itemWidth = b ? b.offsetWidth : a.settings.imgSize
    a.settings.itemHeight = b ? b.offsetHeight : a.settings.imgSize
    a.settings.columnWidth = a.settings.itemWidth + a.settings.spacing
    a.settings.rowHeight = a.settings.itemHeight + a.settings.spacing
    a.settings.numColumns = Math.max(1, Math.floor(c / a.settings.columnWidth))
  }

  function Dr(a, b) {
    return {
      left: b % a.settings.numColumns * a.settings.columnWidth,
      top: Math.floor(b / a.settings.numColumns) * a.settings.rowHeight
    }
  }

  A.Wa = function (a) {
    this.Aa(!0)
    var b = a.map(function (c) {return c.id})
    document.querySelectorAll(g).forEach(function (c) {
      var d = b.includes(c.dataset.id)
      Kk(c, q, !d)
    })
    this.Ee()
    window.scroll({ top: 0, behavior: sc })
  }
  A.Ma = function () {
    document.querySelectorAll(g).forEach(function (a) {V(a, q)})
    this.Ee()
    this.Aa(!1)
  }

  function Er() {W.call(this)}

  D(Er, W)
  A = Er.prototype
  A.Ua = function () {return { name: "timeslide", imgSize: 300, pageSize: 10, columnOffset: 50 }}
  A.scope = function (a) {
    a.scope(rc, this.settings.imgSize)
    var b = Fr(this)
    b && (b.matches(".large") ? a.scope("column:large", !0) : b.matches(".medium") ? a.scope("column:medium", !0) : b.matches(".small") && a.scope("column:small", !0))
  }
  A.Ac = function () {this.ui.addModule(Na)}
  A.Xa = function () {
    Mk(this)
    this.ui.select()
  }
  A.Ya = function (a) {
    var b = this
    if (a) {
      var c = Gr(this)
      a.forEach(function (d) {
        var e = Fr(b, c)
        e.matches(".large") && e.children.length && (c = Gr(b, !0), e = Fr(b, c))
        var f = Cd(b.template(La, d))
        f.dataset.id = d.id
        e.append(f)
        U(f, "new")
      })
    }
  }

  function Gr(a, b) {
    var c = document.querySelectorAll(".slice")
    return !c.length || b ? (a = Cd(a.template("Slice")), document.querySelector("#main").append(a), a) : c[c.length - 1]
  }

  function Fr(a, b) {
    if (b = b ? b : Array.from(document.querySelectorAll(".slice")).pop()) {
      var c = Array.from(b.querySelectorAll(".large .item")).pop(),
        d = Array.from(b.querySelectorAll(".medium .item")).pop(),
        e = Array.from(b.querySelectorAll(".small .item")).pop()
      c = c ? parseFloat(getComputedStyle(c, null).height) + c.offsetTop : 0
      d = d ? parseFloat(getComputedStyle(d, null).height) + d.offsetTop : 0
      e = e ? parseFloat(getComputedStyle(e, null).height) + e.offsetTop : 0
      return !c || c <= d + a.settings.columnOffset && e + a.settings.columnOffset >=
      d ? b.querySelector(".large") : d + a.settings.columnOffset < c ? b.querySelector(".medium") : b.querySelector(".small")
    }
  }

  A.Wa = function (a, b) {
    var c = a.map(function (d) {return d.id})
    document.querySelectorAll(g).forEach(function (d) {Kk(d, q, c.indexOf(d.getAttribute(rb)) >= 0)})
    if (this.Xf != b) {
      if (a = document.querySelector(ma)) a = a.getBoundingClientRect().top - document.querySelector(".slice").getBoundingClientRect().top, window.scroll({
        top: a,
        behavior: sc
      })
      this.Xf = b
    }
  }
  A.Ma = function () {
    document.querySelectorAll(g).forEach(function (a) {V(a, q)})
    delete this.Xf
  }
  var Hr = ql()
  Hr.bb.classic = Dq
  Hr.bb.flipcard = Sq
  Hr.bb.magazine = Zq
  Hr.bb.mosaic = ir
  Hr.bb.sidebar = wr
  Hr.bb.snapshot = Br
  Hr.bb.timeslide = Er
  if (window.jstiming) {
    window.jstiming.hg = {}
    window.jstiming.wm = 1
    var Ir = function (a, b, c) {
      var d = a.t[b], e = a.t.start
      if (d && (e || c)) return d = a.t[b][0], c != void 0 ? e = c : e = e[0], Math.round(d - e)
    }
    window.jstiming.getTick = Ir
    window.jstiming.getLabels = function (a) {
      var b = [], c
      for (c in a.t) b.push(c)
      return b
    }
    var Jr = function (a, b, c) {
      var d = ""
      window.jstiming.srt && (d += "&srt=" + window.jstiming.srt, delete window.jstiming.srt)
      window.jstiming.pt && (d += "&tbsrt=" + window.jstiming.pt, delete window.jstiming.pt)
      try {
        window.external &&
        window.external.tran ? d += "&tran=" + window.external.tran : window.gtbExternal && window.gtbExternal.tran ? d += "&tran=" + window.gtbExternal.tran() : window.chrome && window.chrome.csi && (d += "&tran=" + window.chrome.csi().tran)
      } catch (u) {}
      var e = window.chrome
      if (e && (e = e.loadTimes) && typeof e === r && (e = e())) {
        e.wasFetchedViaSpdy && (d += "&p=s")
        if (e.wasNpnNegotiated) {
          d += "&npn=1"
          var f = e.npnNegotiatedProtocol
          f && (d += "&npnv=" + (encodeURIComponent || escape)(f))
        }
        e.wasAlternateProtocolAvailable && (d += "&apa=1")
      }
      var h = a.t, k = h.start
      e =
        []
      f = []
      for (var l in h) if (l != tc && l.indexOf("_") != 0) {
        var m = h[l][1]
        m ? h[m] && f.push(l + "." + Ir(a, l, h[m][0])) : k && e.push(l + "." + Ir(a, l))
      }
      delete h.start
      if (b) for (var n in b) d += "&" + n + "=" + b[n];
      (b = c) || (b = "https:" == document.location.protocol ? "https://csi.gstatic.com/csi" : "http://csi.gstatic.com/csi")
      return [b, "?v=3", "&s=" + (window.jstiming.sn || "blogger") + "&action=", a.name, f.length ? "&it=" + f.join(",") : "", d, "&rt=", e.join(",")].join("")
    }, Kr = function (a, b, c) {
      a = Jr(a, b, c)
      if (!a) return ""
      b = new Image
      var d = window.jstiming.wm++
      window.jstiming.hg[d] = b
      b.onload = b.onerror = function () {window.jstiming && delete window.jstiming.hg[d]}
      b.src = a
      b = null
      return a
    }
    window.jstiming.report = function (a, b, c) {
      var d = document.visibilityState, e = "visibilitychange"
      d || (d = document.webkitVisibilityState, e = "webkitvisibilitychange")
      if (d == "prerender") {
        var f = !1, h = function () {
          if (!f) {
            b ? b.prerender = "1" : b = { prerender: "1" }
            if ((document.visibilityState || document.webkitVisibilityState) == "prerender") var k = !1 else Kr(a, b, c), k = !0
            k && (f = !0, document.removeEventListener(e,
              h, !1))
          }
        }
        document.addEventListener(e, h, !1)
        return ""
      }
      return Kr(a, b, c)
    }
  }

}).call(this)
