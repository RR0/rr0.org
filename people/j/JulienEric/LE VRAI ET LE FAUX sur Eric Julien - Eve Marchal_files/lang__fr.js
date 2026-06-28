(function () {/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
  var a = a || {}
  a.global = this || self
  a.N = function (b, c, d, e) {
    b = b.split(".")
    e = e || a.global
    for (var f; b.length && (f = b.shift());) if (b.length || c === void 0) e = e[f] && e[f] !== Object.prototype[f] ? e[f] : e[f] = {} else if (!d && a.F(c) && a.F(e[f])) for (var g in c) c.hasOwnProperty(g) && (e[f][g] = c[g]) else e[f] = c
  }
  a.U = typeof CLOSURE_DEFINES !== "undefined" ? CLOSURE_DEFINES : a.global.U
  a.W = typeof CLOSURE_UNCOMPILED_DEFINES !== "undefined" ? CLOSURE_UNCOMPILED_DEFINES : a.global.W
  a.define = function (b, c) {return b = c}
  a.Y = 2012
  a.l = !0
  a.Ia = "fr"
  a.ha = !0
  a.X = !a.l
  a.Da = !1
  a.qb = function (b, c) {
    var d = a.na(a.Z)
    b = d && d[b]
    return b != null ? b : c
  }
  a.Z = "CLOSURE_FLAGS"
  a.Fa = !0
  a.J = typeof CLOSURE_TOGGLE_ORDINALS === "object" ? CLOSURE_TOGGLE_ORDINALS : a.global.J
  a.rb = function (b) {
    var c = a.J
    b = c && c[b]
    return typeof b !== "number" ? !!b : !!(a.fa[Math.floor(b / 30)] & 1 << b % 30)
  }
  a.ga = "_F_toggles"
  a.fa = a.global[a.ga] || []
  a.aa = !0
  a.h = { da: 0, u: 1, m: 2, v: 3 }
  a.ba = { FEMININE: a.h.m, MASCULINE: a.h.u, NEUTER: a.h.v }
  a.I = a.ba[a.aa && a.global._F_VIEWER_GRAMMATICAL_GENDER] || a.h.da
  a.mb = { u: a.I === a.h.u, m: a.I === a.h.m, v: a.I === a.h.v }
  a.s = a.global
  a.pb = function (b) {
    if (a.P()) throw Error("goog.provide cannot be used within a module.")
    a.L(b)
  }
  a.L = function (b, c, d) {a.N(b, c, d, a.s)}
  a.ca = /^[\w+/_-]+[=]{0,2}$/
  a.bb = function (b) {
    b = (b || a.global).document
    return (b = b.querySelector && b.querySelector("script[nonce]")) && (b = b.nonce || b.getAttribute("nonce")) && a.ca.test(b) ? b : ""
  }
  a.Ka = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/
  a.module = function () {}
  a.module.get = function () {return null}
  a.module.Ya = function () {return null}
  a.tb = function () {return null}
  a.oa = null
  a.wa = null
  a.xb = function (b) {a.oa = b}
  a.zb = function (b) {a.wa = b}
  a.lb = function () {}
  a.j = { K: "es6", o: "goog" }
  a.g = null
  a.P = function () {return a.qa() || a.pa()}
  a.qa = function () {return !!a.g && a.g.type == a.j.o}
  a.pa = function () {
    var b = !!a.g && a.g.type == a.j.K
    return b ? !0 : (b = a.s.$jscomp) ? typeof b.B != "function" ? !1 : !!b.B() : !1
  }
  a.module.A = function () {a.g.A = !0}
  a.module.H = function () {a.g.H = !0}
  a.Ta = function (b) {
    if (a.g) a.g.G = b else {
      var c = a.s.$jscomp
      if (!c || typeof c.B != "function") throw Error("Module with namespace \"" + b + "\" has been loaded incorrectly.")
      c = c.ua(c.B())
      a.R[b] = { exports: c, type: a.j.K, ta: b }
    }
  }
  a.yb = function (b) {if (a.X) throw b = b || "", Error("Importing test-only code into non-debug environment" + (b ? ": " + b : "."))}
  a.Va = function () {}
  a.na = function (b, c) {
    b = b.split(".")
    c = c || a.global
    for (var d = 0; d < b.length; d++) if (c = c[b[d]], c == null) return null
    return c
  }
  a.Ma = function () {}
  a.Ea = !1
  a.sa = function (b) {a.global.console && a.global.console.error(b)}
  a.ua = function () {}
  a.ub = function () {return {}}
  a.Pa = ""
  a.La = function () {throw Error("unimplemented abstract method")}
  a.Na = function (b) {
    b.D = void 0
    b.Xa = function () {
      if (b.D) return b.D
      a.l && (a.O[a.O.length] = b)
      return b.D = new b
    }
  }
  a.O = []
  a.Ha = !0
  a.ea = a.l
  a.R = {}
  a.Aa = !1
  a.xa = !1
  a.Ja = "goog"
  a.kb = function (b) {
    var c = a.g
    try {
      a.g = { G: "", A: !1, H: !1, type: a.j.o }
      var d = {}, e = d
      if (typeof b === "function") e = b.call(void 0, e) else if (typeof b === "string") e = a.ra.call(void 0, e, b) else throw Error("Invalid module definition")
      var f = a.g.G
      if (typeof f === "string" && f) {
        a.g.A ? (b = d !== e, a.L(f, e, b)) : a.ea && Object.seal && typeof e == "object" && e != null && !a.g.H && Object.seal(e)
        var g = { exports: e, type: a.j.o, ta: a.g.G }
        a.R[f] = g
      } else throw Error("Invalid module name \"" + f + "\"")
    } finally {a.g = c}
  }
  a.ra = function (b) {
    eval(a.ya.createScript(arguments[1]))
    return b
  }
  a.nb = function (b) {
    b = b.split("/")
    for (var c = 0; c < b.length;) b[c] == "." ? b.splice(c, 1) : c && b[c] == ".." && b[c - 1] && b[c - 1] != ".." ? b.splice(--c, 2) : c++
    return b.join("/")
  }
  a.jb = function (b) {
    if (a.global.V) return a.global.V(b)
    try {
      var c = new a.global.XMLHttpRequest
      c.open("get", b, !1)
      c.send()
      return c.status == 0 || c.status == 200 ? c.responseText : null
    } catch (d) {return null}
  }
  a.S = function (b) {
    var c = typeof b
    return c != "object" ? c : b ? Array.isArray(b) ? "array" : c : "null"
  }
  a.hb = function (b) {
    var c = a.S(b)
    return c == "array" || c == "object" && typeof b.length == "number"
  }
  a.ib = function (b) {return a.F(b) && typeof b.getFullYear == "function"}
  a.F = function (b) {
    var c = typeof b
    return c == "object" && b != null || c == "function"
  }
  a.cb = function (b) {return Object.prototype.hasOwnProperty.call(b, a.i) && b[a.i] || (b[a.i] = ++a.va)}
  a.fb = function (b) {return !!b[a.i]}
  a.sb = function (b) {
    b !== null && "removeAttribute" in b && b.removeAttribute(a.i)
    try {delete b[a.i]} catch (c) {}
  }
  a.i = "closure_uid_" + (Math.random() * 1E9 >>> 0)
  a.va = 0
  a.ka = function (b) {
    var c = a.S(b)
    if (c == "object" || c == "array") {
      if (typeof b.clone === "function") return b.clone()
      if (typeof Map !== "undefined" && b instanceof Map) return new Map(b)
      if (typeof Set !== "undefined" && b instanceof Set) return new Set(b)
      c = c == "array" ? [] : {}
      for (var d in b) c[d] = a.ka(b[d])
      return c
    }
    return b
  }
  a.ja = function (b, c, d) {return b.call.apply(b.bind, arguments)}
  a.ia = function (b, c, d) {
    if (!b) throw Error()
    if (arguments.length > 2) {
      var e = Array.prototype.slice.call(arguments, 2)
      return function () {
        var f = Array.prototype.slice.call(arguments)
        Array.prototype.unshift.apply(f, e)
        return b.apply(c, f)
      }
    }
    return function () {return b.apply(c, arguments)}
  }
  a.bind = function (b, c, d) {
    a.bind = a.ha && a.Y > 2012 || Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? a.ja : a.ia
    return a.bind.apply(null, arguments)
  }
  a.ob = function (b, c) {
    var d = Array.prototype.slice.call(arguments, 1)
    return function () {
      var e = d.slice()
      e.push.apply(e, arguments)
      return b.apply(this, e)
    }
  }
  a.now = function () {return Date.now()}
  a.eb = function (b) {(0, eval)(b)}
  a.Wa = function (b, c) {
    if (String(b).charAt(0) == ".") throw Error("className passed in goog.getCssName must not start with \".\". You passed: " + b)
    var d = function (f) {return a.M[f] || f}, e = function (f) {
      f = f.split("-")
      for (var g = [], h = 0; h < f.length; h++) g.push(d(f[h]))
      return g.join("-")
    }
    e = a.M ? a.la == "BY_WHOLE" ? d : e : function (f) {return f}
    b = c ? b + "-" + e(c) : e(b)
    return a.global.T ? a.global.T(b) : b
  }
  a.wb = function (b, c) {
    a.M = b
    a.la = c
  }
  a.Ga = function () {}
  a.Za = function (b, c, d) {
    d && d.gb && (b = b.replace(/</g, "&lt;"))
    d && d.Bb && (b = b.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&apos;/g, "'").replace(/&quot;/g, "\"").replace(/&amp;/g, "&"))
    c && (b = b.replace(/\{\$([^}]+)}/g, function (e, f) {return c != null && f in c ? c[f] : e}))
    return b
  }
  a.ab = function (b) {return b}
  a.ma = function (b, c, d) {a.N(b, c, !0, d)}
  a.Ua = function (b, c, d) {b[c] = d}
  a.Cb = function (b) {return b}
  a.inherits = function (b, c) {
    function d() {}

    d.prototype = c.prototype
    b.Ab = c.prototype
    b.prototype = new d
    b.prototype.constructor = b
    b.Oa = function (e, f, g) {
      for (var h = Array(arguments.length - 2), k = 2; k < arguments.length; k++) h[k - 2] = arguments[k]
      return c.prototype[f].apply(e, h)
    }
  }
  a.scope = function (b) {
    if (a.P()) throw Error("goog.scope is not supported within a module.")
    b.call(a.global)
  }
  a.C = function (b) {return b}
  a.Sa = function (b) {
    var c = null, d = a.global.trustedTypes
    if (!d || !d.createPolicy) return c
    try {
      c = d.createPolicy(b, {
        createHTML: a.C,
        createScript: a.C,
        createScriptURL: a.C
      })
    } catch (e) {a.sa(e.message)}
    return c
  }
  a.za = { Ba: "", Ca: "." }
  a.Qa = function () {return ""}
  a.Ra = function (b) {return b}
  a.ma("blogger.l10n", {
    "Add a comment": "Ajouter un commentaire",
    "Add to Google Reader": "Ajouter \u00e0 Google\u00a0Reader",
    "Ads by Google": "Annonces Google",
    Archive: "Archive",
    Author: "Auteur",
    Back: "Retour",
    "Blogs Stats": "Statistiques des blogs",
    "By PostAuthorName": "Par {PostAuthorName}",
    "By PostAuthorName 2": "Envoy\u00e9 par <a class=\"url fn\" href=\"{PostAuthorURL}\" rel=\"author\" itemprop=\"author\">{PostAuthorName}</a>",
    Classic: "Classique",
    "Click Here": "click here",
    Close: "Fermer",
    Date: "Date",
    Dashboard: "Tableau de bord",
    Delete: "Supprimer",
    "Enter email address": "Saisissez votre adresse e-mail",
    Flipcard: "Carte",
    Followers: "Abonn\u00e9s",
    "Google Translate": "Google\u00a0Traduction",
    "Google+ Badge": "Badge\u00a0Google+",
    "Google+ Followers": "Abonn\u00e9s\u00a0Google+",
    "Group by author": "Grouper par auteur",
    "Group by date": "Grouper par date",
    "Group by label": "Grouper par libell\u00e9",
    Home: "Accueil",
    Label: "Libell\u00e9",
    Labels: "Libell\u00e9s",
    "Link List": "Liste des liens",
    Loading: "Chargement en cours",
    "Load more": "Charger plus",
    "Location GeoLocationName": "Localisation\u00a0: <a class=\"url fn\" href=\"{GeoLocationURL}\" itemprop=\"contentLocation\">{GeoLocationName}</a>",
    Logo: "Logo",
    Magazine: "Magazine",
    Mosaic: "Mosa\u00efque",
    Newer: "Plus r\u00e9cent",
    Newsreel: "Actualit\u00e9s",
    "New post": "Nouvel article",
    Next: "Suivant",
    "No labels": "Aucun libell\u00e9",
    "No more comments": "Aucun autre commentaire.",
    "No more posts": "Aucun autre article.",
    "No posts found": "Aucun article n'a \u00e9t\u00e9 trouv\u00e9.",
    "No results for SearchQuery": "Aucun r\u00e9sultat pour\u00a0: {HTMLEscapedSearchQuery}.",
    "No results for SearchQuery2": "Aucun r\u00e9sultat pour <span class=\"search_query\">{HTMLEscapedSearchQuery}</span>.",
    "No results found": "Aucun r\u00e9sultat.",
    Older: "Plus ancien",
    Picture: "Image",
    Poll: "Sondage",
    "Popular Posts": "Articles les plus consult\u00e9s",
    "Post Interstitial Snippet": "This summary is not available. Please {ClickHere} to view the post.",
    "Posted at FormattedTime": "Publi\u00e9 \u00e0 <abbr class=\"time published\" title=\"{ISO8601}\" itemprop=\"datePublished\">{12Hour}:{Minutes} {AmPm}</abbr>",
    "Posted TimeAgo": "Publi\u00e9 il y a {TimeAgo}",
    "Posted TimeAgo by PostAuthorName": "Publi\u00e9 il y a <abbr class=\"time published\" title=\"{ISO8601}\" itemprop=\"datePublished\">{TimeAgo}</abbr> par {PostAuthorName}",
    "Posted TimeAgo by PostAuthorName 2": "Publi\u00e9 il y a <abbr class=\"time published\" title=\"{ISO8601}\" itemprop=\"datePublished\">{TimeAgo}</abbr> par <a class=\"url fn\" href=\"{PostAuthorURL}\" rel=\"author\" itemprop=\"author\">{PostAuthorName}</a>",
    "Powered by": "Fourni par",
    Previous: "Pr\u00e9c\u00e9dent",
    Recent: "R\u00e9cent",
    Reply: "R\u00e9pondre",
    Replies: "R\u00e9ponses",
    "RSS Feed": "Flux RSS",
    Search: "Rechercher",
    "Show all": "Tout afficher",
    "Show all SearchResultCount": "Afficher les {SearchResultCount} r\u00e9sultats",
    Sidebar: "Barre lat\u00e9rale",
    Snapshot: "Instantan\u00e9",
    Submit: "Envoyer",
    "Subscribe via email": "S'abonner par e-mail",
    "Subscribe via RSS": "S'abonner via RSS",
    Subscribe: "S'abonner",
    Text: "Texte",
    "Text List": "Liste de texte",
    Timeslide: "Chronologie",
    "Toggle Slideshow": "Activer/d\u00e9sactiver le diaporama",
    VideoBar: "Barre vid\u00e9o",
    "View comments": "Afficher les commentaires",
    "View RSS Feed": "Afficher le fil RSS"
  })
}).call(this)
