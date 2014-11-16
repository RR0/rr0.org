function OrgModule() {

    this.getUri = function () {
        if (!docUri) {
            docUri = window.location.pathname;
        }
        return docUri;
    };

    this.isIE = /MSIE (\d+\.\d+);/.test(navigator.userAgent);

    this.debug = window.location.href.indexOf("?debug") >= 0;

    if (this.debug && typeof console !== 'undefined') {
        this.log = function (m) {
            console.log(m);
        };
    } else {
        this.log = function (m) {
        };
    }

// Add a getElementsByClassName function if the browser doesn't have one
// Limitation: only works with one class name
// Copyright: Eike Send http://eike.se/nd
// License: MIT License
    if (!document.getElementsByClassName) {
        document.getElementsByClassName = function (search) {
            var d = document, elements, pattern, i, results = [];
            if (d.querySelectorAll) { // IE8
                return d.querySelectorAll("." + search);
            }
            if (d.evaluate) { // IE6, IE7
                pattern = ".//*[contains(concat(' ', @class, ' '), ' " + search + " ')]";
                elements = d.evaluate(pattern, d, null, 0, null);
                while ((i = elements.iterateNext())) {
                    results.push(i);
                }
            } else {
                elements = d.getElementsByTagName("*");
                pattern = new RegExp("(^|\\s)" + search + "(\\s|$)");
                for (i = 0; i < elements.length; i++) {
                    if (pattern.test(elements[i].className)) {
                        results.push(elements[i]);
                    }
                }
            }
            return results;
        };
    }

    var docUri;

    function User() {
        this.language = navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage;
    }

    var user = new User();

    function Rr0Module() {
        function Context() {
            this.language = user.language.substring(0, 2);
            this.time = null;
            this.place = null;
            this.people = null;
        }

        this.context = new Context();
        this.getScreenWidth = function () {
            return document.body.clientWidth;
        };
        var sidePane;
        var rr0This = this;
        this.contentsZone = null;
        this.getSidePane = function () {
            if (!sidePane) {
                sidePane = document.querySelector('aside');
                /*if (!sidePane) {
                 sidePane = document.createElement("aside");
                 if (this.contentsZone) {
                 this.contentsZone.parentNode.appendChild(sidePane);
                 }
                 var divider = document.createElement("div");
                 divider.className = "divider";
                 sidePane.appendChild(divider);
                 divider.addEventListener('mousedown', function (e) {
                 e.preventDefault();
                 document.documentElement.addEventListener('mousemove', moveHandler, true);
                 document.documentElement.addEventListener('mouseup', upHandler, true);
                 function moveHandler(e) {
                 e.preventDefault();
                 e.stopPropagation();
                 org.rr0.leftWidth = e.pageX;
                 org.rr0.updateDivision();
                 }
                 function upHandler(e) {
                 e.preventDefault();
                 e.stopPropagation();
                 document.documentElement.removeEventListener('mousemove', moveHandler, true);
                 document.documentElement.removeEventListener('mouseup', upHandler, true);
                 }
                 }, false);
                 }*/
            }
            return sidePane;
        };
        this.sideCallbacks = [];
        this.callSideCallbacks = function () {
            for (var i = 0; i < this.sideCallbacks.length; i++) {
                this.sideCallbacks[i]();
            }
        };
        this.updateDivision = function () {
            this.contentsZone.style.width = this.leftWidth + "px";
            var aside = angular.element("aside");
            aside.width(this.getScreenWidth() - this.leftWidth);
            this.callSideCallbacks();
        };
        this.getSideZone = function (id) {
            var sideZone = document.getElementById(id);
            if (!sideZone) {
                sideZone = document.createElement("div");
                sideZone.id = id;
                rr0This.getSidePane().appendChild(sideZone);
            }
            return sideZone;
        };
        this.textZone = null;
        this.initStructure = function () {
            rr0This.contentsZone = document.querySelector(".contents");
            rr0This.textZone = document.querySelector(".text");
            rr0This.leftWidth = rr0This.getScreenWidth();
        };
        return this;
    }

    this.rr0 = new Rr0Module();

    /**
     * Elements of this class won't be modified.
     *
     * @type {String}
     */
    this.constantClass = "constant";

    this.hasClass = function (e, c) {
        var className = e.className;
        var found = !!className;
        if (className) {
            var pos = className.indexOf(org.constantClass) < 0 && className.indexOf(c);
            found = pos >= 0;
            if (found) {
                var lastChar = className.charCodeAt(pos + c.length);
                found = isNaN(lastChar) || lastChar === 0x20;
            }
        }
        return found;
    };

    this.isNumber = function (o) {
        return o && !isNaN(o - 0);
    };

    function addToElementType(n, e) {
        document.getElementsByTagName(n)[0].appendChild(e);
    }

    this.addToHead = function (e) {
        addToElementType("head", e);
    };

    this.loadJS = function (filename) {
        var e = document.createElement('script');
//    e.setAttribute("type", "text/javascript");
        e.setAttribute("src", filename);
        org.addToHead(e);
    };

    this.loadCSS = function (filename) {
        var e = document.createElement("link");
        e.setAttribute("rel", "stylesheet");
        e.setAttribute("type", "text/css");
        e.setAttribute("href", filename);
        org.addToHead(e);
    };

    this.arrayIndex = function (w, a) {
        w = w.toLowerCase();
        var u;
        for (u = 0; u < a.length; u++) {
            if (w === a[u].toLowerCase()) {
                break;
            }
        }
        return u < a.length ? u + 1 : null;
    };

    var wordSeparators = ".,\':!?;+=\"()[]/°%*&$#\n";
    this.wordBefore = function (txt, b) {
        var c;
        while (b >= 0 && wordSeparators.indexOf((c = txt.charAt(b))) < 0 && c !== ' ') {    // Pass current word
            b--;
        }
        while (b > 0 && txt.charAt(b) === ' ') {    // Pass next spaces
            b--;
        }
        var w = "";
        while (b >= 0 && wordSeparators.indexOf((c = txt.charAt(b--))) < 0 && c !== ' ') {  // Add next non separators
            w = c + w;
        }
        return w;
    };

    this.wordAfter = function (txt, b) {
        var c;
        while (b < txt.length && wordSeparators.indexOf((c = txt.charAt(b))) < 0 && c !== ' ') {    // Pass current word
            b++;
        }
        while (b < txt.length && txt.charAt(b) === ' ') {   // Pass next spaces
            b++;
        }
        var w = "";
        while (b < txt.length && wordSeparators.indexOf((c = txt.charAt(b++))) < 0 && c !== ' ') {  // Add next non separators
            w += c;
        }
        return w;
    };

    this.isProperName = function (w) {
        var firstChar = w.charAt(0);
        return firstChar >= 'A' && firstChar <= 'Z';
    };

    this.isPlural = function (w) {
        return w.charAt(w.length - 1) === 's';
    };

    var nonPlurals = ["les", "des", "ces", "ses", "dans"/*, "mes", "leur", "son", "sa", "ma", "ta", "ton"*/];
    this.isProNoun = function (w) {
        return org.arrayIndex(w, nonPlurals);
    };

    this.clone = function (o) {
        var c = {};
        for (var k in o) {
            c[k] = o[k];
        }
        return c;
    };

    this.text = function (e) {
        var txt = e.textContent;
        if (txt === undefined) {
            txt = e.innerText;  // IE8-
        } else {
            txt = txt.replace('\n', ' ');
        }
        return txt;
    };

    this.stripText = function (txt) {
        txt = txt.replace(/'/g, "'");
        txt = txt.replace(/\"/g, '"');
        txt = txt.replace(/\n/g, '');
        txt = txt.replace(/\s+/g, ' ');
        return txt;
    };

    this.strip = function (e) {
        var txt = this.text(e);
        return org.stripText(txt);
    };

    /**
     * Creates a new DOM element.
     *
     * @param t Element's name/type
     * @param e The element's contents
     * @returns {HTMLElement}
     */
    this.newElement = function (t, e) {
        var ne = document.createElement(t);
        if (e) {
            ne.appendChild(e);
        }
        return ne;
    };

    /**
     * Creates a new span element.
     *
     * @param c The span class(es) name(s).
     * @param e The span contents.
     * @returns {HTMLElement}
     */
    this.spanElement = function (c, e) {
        var se = this.newElement("span", e);
        if (c) {
            se.setAttribute("class", c);
        }
        return se;
    };

    this.validLink = function (l) {
        l = l.replace(/\n/g, ' ')
            .replace(/(\u00E0|\u00E2|\u00E4)/g, 'a')
            .replace(/\u00E7/g, 'c')
            .replace(/(\u00E8|\u00E9|\u00EA|\u00EB)/g, 'e')
            .replace(/(\u00EE|\u00EF)/g, 'i')
            .replace(/\u00F1/g, 'n')
            .replace(/(\u00F4|\u00F6)/g, 'o')
            .replace(/(\u00F9|\u00FB|\u00FC|\u00FA)/g, 'u');
        return l;
    };

    function linkStart(l, t) {
        var sp = "<a href=\"" + orgThis.validLink(l) + "\"";
        if (t) {
            sp += " title=\"" + t + "\"";
        }
        return sp + ">";
    }

    /**
     * Creates an hyperlink DOM element.
     *
     * @param a The URI
     * @param e The link contents (text) node
     * @param t The link hover tooltip (title)
     * @returns {HTMLElement}
     */
    this.linkElement = function (a, e, t) {
        var le;
        if (a) {
            le = org.newElement("a", e);
            le.setAttribute("href", a);
        } else {
            le = this.spanElement(null, e);
        }
        if (t) {
            le.setAttribute("title", t);
        }
        return le;
    };

    this.link = function (l, contents, t) {
        return linkStart(l, t) + contents + "</a>";
    };

    this.zero = function (v) {
        return v < 10 ? '0' + v : v;
    };

    var domLoadProcs = [];

    this.contentsLoaded = function () {
        for (var i = 0; i < domLoadProcs.length; i++) {
            var c = domLoadProcs[i];
            if (typeof c === 'string') {
                eval(c);
            } else if (typeof c === 'function') {
                c();
            } else {
                this.log('domLoadProc ' + c + ' of type ' + (typeof c) + ' is not supported');
            }
        }
    };

    this.onContentsLoaded = function (f) {
        domLoadProcs.push(f);
    };

//    function waitForDOMLoaded(callback) {
//        /* Internet Explorer */
//        /*@cc_on
//         @if (@_win32 || @_win64)
//         document.write('<script id="ieScriptLoad" defer src="//:"><\/script>');
//         document.getElementById('ieScriptLoad').onreadystatechange = function() {
//         if (this.readyState === 'complete') {
//         callbacks();
//         }
//         };
//         @end @*/
//        /* Mozilla, Chrome, Opera */
//        if (document.addEventListener) {
//            document.addEventListener('DOMContentLoaded', contentsLoaded, false);
//        } else
//        /* Safari, iCab, Konqueror */
//        if (/KHTML|WebKit|iCab/i.test(navigator.userAgent)) {
//            var DOMLoadTimer = setInterval(function () {
//                if (/loaded|complete/i.test(document.readyState)) {
//                    contentsLoaded();
//                    clearInterval(DOMLoadTimer);
//                }
//            }, 10);
//        } else      // Other web browsers
//            window.onload = contentsLoaded();
//    }

    this.addEndingSlash = function (l) {
        var lastSlash = l.length - 1;
        for (; lastSlash > 0; lastSlash--) {
            var c = l.charAt(lastSlash);
            if (c === '.') {
                break;
            }
            else if (c === '/') {
                if (lastSlash !== l.length - 1) {
                    l += '/';
                }
                break;
            }
        }
        return l;
    };

    this.parentLink = function (l) {
        var parentL = l;
        if (l.charAt(l.length - 1) === '/') {
            parentL = parentL.substring(0, parentL.length - 1);
        }
        for (var i = parentL.length - 1; i > 0 && parentL.charAt(i) !== '/';) {
            i--;
        }
        if (i > 0) {
            parentL = parentL.substring(0, i);
        }
        return parentL;
    };

    var pageCache = {};
    this.cache = sessionStorage ? sessionStorage : pageCache;
//var cache = pageCache;
    function toLink(l, k) {
        l = org.addEndingSlash(l);
        window.org.log("caching " + k + " as " + l);
        org.cache[k] = l;
    }

    function toLinks(l, kk) {
        for (var k = 0; k < kk.length; k++) {
            toLink(l, kk[k]);
        }
    }

    this.nounToLink = function (l, k) {
        toLinks(l, [k + "s", k]);     // Plural as well
    };

    function nounsToLink(l, kk) {
        for (var k = 0; k < kk.length; k++) {
            org.nounToLink(l, kk[k]);
        }
    }

    this.textValue = function (e) {
        var v = e.nodeValue;
        if (v && e.nodeType === Node.TEXT_NODE) {
            v = v.trim().replace(/\n/g, '');
            v = v.replace(/ +(?= )/g, '');
            if (v.length === 0 || e.parentNode.nodeName === 'A' || org.hasClass(e.parentNode, org.constantClass)) {
                v = null;
            }
        }
        /* && !hasClass(e.parentNode, "people") /* && !e.hasChildNodes() && e.className !== constantClass && (e.tagName === "P" || e.tagName === "LI" || e.tagName === "CAPTION" || (e.tagName === "TD" && !e.hasChildNodes()));*/
        return v;
    };

    /**
     * Transform some text into a link.
     *
     * @param {HTMLElement} e The element containing the text.
     * @param {string} k The text to look for.
     * @param {string} l The URI of the link to create
     * @param {string} [r] The text replacement, if any (matched text remains otherwise)
     * @param {boolean} [cacheIt]
     * @return {HTMLElement}
     */
    this.linkify = function (e, k, l, r, cacheIt) {
        if (!org.hasClass(e, org.constantClass) && l !== org.getUri() && (l + "/") !== org.getUri()) {
            var txt = org.text(e);
            if (txt) {
                var pos = txt.indexOf(k);
                if (pos >= 0) {
                    orgThis.log("linkify('" + txt + "', " + k + ", '" + l + "' for e'sparent=" + e.parentNode);
                    if (!r) {
                        r = k;
                    }
                    var text1;
                    if (pos > 0) {
                        text1 = document.createTextNode(txt.substring(0, pos));
                    }
                    var re = document.createTextNode(r);
                    var le = this.linkElement(l, re);
                    var endPos = pos + k.length;
                    var text2;
                    if (endPos < txt.length) {
                        text2 = document.createTextNode(txt.substring(endPos));
                    }
                    var pNode = e.parentNode;
                    if (pNode) {    // TODO: Should not occur
                        pNode.replaceChild(le, e);
                        if (text1) {
                            pNode.insertBefore(text1, le);
                        }
                        if (text2) {
                            pNode.insertBefore(text2, le.nextSibling);
                        }
                    }
                    if (cacheIt) {
                        toLink(l, r);
                    }
                    e = le;
                }
            }
        }
        return e;
    };

    /**
     * Walk a node and its child nodes to apply a proc on them.
     *
     * @param e the first node to walk from.
     * @param proc The proc to execute on it and its child nodes.
     */
    function walk(e, proc) {
        if (e) {
            var childNodes = e.childNodes;
            for (var i = 0; i < childNodes.length; i++) {
                walk(childNodes[i], proc);
            }
            proc(e);
        }
    }

    /**
     */
    this.handleTags = function () {
        var args = arguments;
        walk(org.rr0.textZone, function (e) {
//        context.add(e);
            for (var h = 0; h < args.length; h++) {
                if (e.parentNode) {
                    if (args[h](e)) {
                        break;
                    }
                }
            }
        });
    };

    var orgThis = this;
    this.processTags = function () {
        // Priority order (i.e. "vague belge" before "vague")
        nounsToLink("/science/crypto/ufo", ["ufologique", "ufologie"]);
        toLinks("/science/crypto/ufo/FlyingSaucers.html", ["soucoupe volante", "soucoupes volantes"]);
        toLink("/place/systeme/solaire/planete/terre", "Terre");
        toLink("/place/systeme/solaire/planete/terre/lune", "Lune");
        toLink("/place/systeme/solaire/Soleil", "Soleil");
        orgThis.nounToLink("/science/crypto/ufo/OVNI.html", "ovni");
        toLink("/org/us/dod/af/amc/atic/projet/bluebook", "Blue Book");
        toLink("/org/us/ic/fbi", "FBI");
        toLink("/org/us/ic/cia", "CIA");
        toLink("/org/us/dod/af", "USAF");
        toLink("/org/us/dod/af", "Air Force");
        orgThis.nounToLink("/science/crypto/ufo/enquete/indice/radar", "radar");
        orgThis.nounToLink("/science/crypto/ufo/observation/scenario/Abduction.html", "enl\xE8vement");
        orgThis.nounToLink("/science", "science");
        nounsToLink("/science/crypto/ufo/enquete/indice/temoignage/evaluation/Hypnose.html", ["hypnose", "hypnotique"]);
        //nametolink("scientifique", peopleUriPart + "scientifiques.html");
        orgThis.nounToLink("/science/crypto/ufo/enquete/indice/temoignage", "t\xE9moignage");
        orgThis.nounToLink("/science/crypto/ufo/enquete/meprise/ballon", "ballon");
        orgThis.nounToLink("/science/crypto/ufo/enquete/meprise/rentree/meteore", "m\xE9t\xE9ore");
    };

    this.onContentsLoaded(this.rr0.initStructure);
    this.onContentsLoaded(this.processTags);
//    waitForDOMLoaded();

    return this;
}
var org = new OrgModule();

// requestAnimationFrame() shim by Paul Irish
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
(function () {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;

        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
}());
//# sourceURL=common.js