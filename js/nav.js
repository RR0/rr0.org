function NavLink(l, url, t) {
    this.label = l;
    this.link = url;
    this.title = t;
}
var startNav;
var contents, contentsURL;
var prev, prevLink;
var next, nextLink;

var starts =
    [
        {
            dir: "/tech/info/",
            label: "Informatique",
            css: "/js/pretty/prettify.css",
            js: "/js/pretty/prettify.js",
            onLoad: "prettyPrint()"
        },
        {
            dir: "/science/crypto/ufo/",
            label: "Ufologie"
        },
        {
            dir: "/science/crypto/zoo/",
            label: "Cryptozoologie"
        },
        {
            dir: "/science/crypto/archeo/",
            label: "Cryptoarchéologie"
        },
        {
            dir: "/science/para/psi/",
            label: "Parapsychologie"
        },
        {
            dir: "/science/para/",
            label: "Parasciences"
        },
        {
            dir: "/science/crypto/",
            label: "Cryptosciences"
        },
        {
            dir: "/science/sur/fantome",
            label: "Fantômes"
        },
        {
            dir: "/science/sur/",
            label: "Surnaturel"
        },
        {
            dir: "/science/",
            label: "Science"
        },
        {
            dir: "/tech/",
            label: "Technique"
        },
        {
            dir: "/croyance/conspirationnisme/",
            label: "Conspirationnisme"
        },
        {
            dir: "/croyance/",
            label: "Croyance"
        },
        {
            dir: "/org/",
            label: "<span class='iconic home'></span>",
            title: "Organisations"
        },
        {
            dir: "/politique/",
            label: "Politique"
        }
    ];
function addRel(l, t) {
    var rel = document.createElement("link");
    rel.setAttribute("rel", t);
    rel.setAttribute("href", l);
    org.addToHead(rel);
}
function setContents(c, cLink) {
    if (!contents) {
        contents = c;
        contentsURL = cLink;
        addRel(contentsURL, "Contents");
    }
}
function setStart(s, sLink) {
    var ret = null;
    var t;
    if (window == top) {
        if (!s) {                       // Look for start induced by URI
            var uri = org.getUri();
            for (var i = 0; i < starts.length; i++) {
                var st = starts[i];
                var dataPos = uri.indexOf(st.dir);
                if (dataPos >= 0 && uri != st.dir) {
                    s = st.label;
                    t = st.title;
                    sLink = st.dir;
                    if (st.css) org.loadCSS(st.css);
                    if (st.js) org.loadJS(st.js);
                    if (st.onLoad) ret = st.onLoad;
                    break;
                }
            }
        }
        if (!t) {
            t = "Début";
            s = "⇤ " + s;
        }
        startNav = new NavLink(s, sLink, t);
        addRel(sLink, "Start");
    }
    return ret;
}
function setP(p, pLink) {
    if (!p) p = prev;
    addRel(pLink, "Prev");

    var pes = document.getElementsByClassName("prev");
    for (var i = 0; i < pes.length; i++) {
        var pe = pes[i];
        if (pe) {
            pe.innerHTML = "<a href=\"" + pLink + "\" title='Précédent'>← " + p + "</a>";
        }
    }
    headResized();
}
function setN(n, nLink) {
    if (!n) n = next;
    addRel(nLink, "Next");

    var nes = document.getElementsByClassName("next");
    for (var i = 0; i < nes.length; i++) {
        var ne = nes[i];
        if (ne) {
            ne.innerHTML = "<a href=\"" + nLink + "\" title='Suivant'>→ " + n + "</a>";
        }
    }
    headResized();
}
function setPrev(p, pLink) {
    if (!pLink) {
        if (!p) {
            var y = time.getYear();
            if (y) {
                var t = getTime();
                time.findTimeSibling(t.year, t.month,
                    function (y, m) {
                        if (m) {
                            if (m > 1) {
                                m--;
                                return {y: y, m: m};
                            } else
                                m = 12;
                        }
                        y--;
                        return {y: y, m: m};
                    }, setP);
                p = "...";
            } else {
                pLink = "..";   // Default previous is previous directory
                setP(p, pLink);
            }
        } else {
            pLink = "..";   // Default previous is previous directory
            setP(p, pLink);
        }
    }
    prevLink = pLink;
    prev = p;
}
function setNext(n, nLink) {
    if (!nLink) {
        if (!n) {
            var y = time.getYear();
            if (y) {
                var t = getTime();
                time.findTimeSibling(t.year, t.month, function (y, m) {
                    if (m) {
                        if (m < 12) {
                            m++;
                            return {y: y, m: m};
                        } else
                            m = 1;
                    }
                    y++;
                    return {y: y, m: m};
                }, setN);
                n = "...";
            }
        }
    }
    next = n;
    nextLink = nLink;
}
function navInit(s, sLink, c, cLink, p, pLink, n, nLink) {
    var onLoadDo = setStart(s, sLink);
//    if (onLoadDo) domLoadProcs.push(onLoadDo);
    setContents(c, cLink);
    setPrev(p, pLink);
    setNext(n, nLink);
}
var alternate;
var alternateClass = "alternate";
function setAlternates(innerHtml) {
    alternate = innerHtml;
}
var titleClass = "label";
var navTitle;
function setNavTitle(innerHtml) {
    navTitle = innerHtml;
}
function checkAlt() {
    if (!alternate) {
        alternate = " ";
        checkAlternate(getUri(),
            function (original) {
                setAlternates(original ? "<a href='" + original + "'>&#8668; Texte d'origine</a>" : "&#9888; Ce document est une traduction");
            },
            function (translation) {
                setAlternates(translation ? "<a href='" + translation + "'>&#8669; Traduction française</a>" : "&#9888; Pas de traduction disponible");
            });
    }
}
var navList;
function getNavList() {
    if (!navList) {
        var n = document.getElementsByTagName("nav")[0];
        navList = n.childNodes[0];
    }
    return navList;
}
function createNavElement(c) {
    var li = document.getElementsByClassName(c)[0];
    if (!li) {
        li = document.createElement("li");
        c = !(!c) ? constantClass + " " + c : org.constantClass;
        li.setAttribute("class", c);
        getNavList().appendChild(li);
    }
    return li;
}
/**
 * Creates a choice in the navigation menu.
 *
 * @param t {string} The choice's text
 * @param l {string} The choice's link
 * @param tt {string} The choice's tooltip
 * @param c {string} The choice's styling class
 * @returns {HtmlElement}
 */
function createNavLink(t, l, tt, c) {
    var li = createNavElement(c);
    if (l && t) {
        var le;
        if (li.childElementCount <= 0) {
            var i = document.createElement("span");
            i.innerHTML = t;
            le = org.linkElement(l, i, tt);
        } else {
            le = li.childNodes[0];
        }
        li.appendChild(le);
    }
    return li;
}
sections = [];
function navTagHandler(element) {
    var handled = element.tagName === 'SECTION';
    if (handled) {
        var firstChildTag = element.children[0];
        var tagName = firstChildTag.tagName;
        if (tagName.charAt(0) === 'H') {
            var sectionTitle = org.text(firstChildTag);
            var level = parseInt(tagName.substring(1), 10);
            var levelSections = sections[level];
            if (typeof levelSections == "array") {
            } else {
                levelSections = sections;
            }
            element.id = "section" + sections.length;
            levelSections.push(sectionTitle);
        }
    }
    return false;
}
var searchResults;
var searchInput;
function doSearch() {
    org.rr0.net.onCorsRequest("https://www.googleapis.com/customsearch/v1?key=AIzaSyCBM8ZUsYyJNdwKTKxoARTr673_8IaWKSo&cx=014557949845581334805:gdnqsazbu8i&q=" + searchInput.value, "GET", function (req) {
        var response = JSON.parse(req.responseText);
        searchResults.innerHTML = '';
        for (var i = 0; i < response.items.length; i++) {
            var item = response.items[i];
            var resultItem = document.createElement("li");
            // in production code, item.htmlTitle should have the HTML entities escaped.
            var a = document.createElement('a');
            a.href = item.link;
            a.innerHTML += item.htmlTitle;
            a.title += item.snippet;
            resultItem.appendChild(a);
            searchResults.appendChild(resultItem);
        }
    });
}
function addSearch() {
    if (window == top) {
        var searchLi = createNavElement();

        var searchForm = document.createElement("form");
        searchInput = document.createElement("input");
        searchInput.setAttribute("type", "search");
        searchForm.appendChild(searchInput);
//        var searchSubmit = org.spanElement("iconic magnifying_glass", " ")
//        searchForm.appendChild(searchSubmit);
        searchLi.appendChild(searchForm);

        searchResults = document.createElement("ul");
    }
    searchForm.setAttribute("action", "javascript:doSearch()");
    searchLi.appendChild(searchResults);
}

function nav() {
    if (window == top) {
        createNavLink("RR0", "/", "Home", "home", "");
        createNavLink(startNav.label, startNav.link, startNav.title, "start");
        createNavLink(contents, contentsURL, "Table des matières", "toc", "⇇ ");
        createNavLink(prev, prevLink, "Précédent", "prev", "← ");
    } else {
//        org.rr0.contentsZone.style.boxShadow = "0.4em 0.4em 0,8em rgb(200,200,200) inset";
//        org.rr0.contentsZone.style.backgroundColor = "#e2e2e8";
    }
    org.handleTags.apply(null, [navTagHandler]);
    createNavElement(titleClass).innerHTML = navTitle;
    if (window == top) {
        createNavLink(next, nextLink, "Suivant", "next", "→ ");
    }
    createNavElement(alternateClass);
    addSearch();
    checkAlt();
    headResized();
}
org.onContentsLoaded(nav);