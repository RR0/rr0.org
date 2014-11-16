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
            label: "Cryptoarch\xE9ologie"
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
            label: "Fant\xF4mes"
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
//        addRel(contentsURL, "Contents");
    }
}
function setStart(s, sLink) {
    if (!startNav) {
        var ret = null;
        var t;
        if (window === top) {
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
                t = "D\xE9but";
                s = "⇤ " + s;
            }
            startNav = new NavLink(s, sLink, t);
        }
        return ret;
    }
}
function setP(p, pLink) {
    if (!p) p = prev;
//    addRel(pLink, "Prev");

    var pes = document.getElementsByClassName("prev");
    for (var i = 0; i < pes.length; i++) {
        var pe = pes[i];
        if (pe) {
            pe.innerHTML = "<a href=\"" + pLink + "\" title='Pr\xE9c\xE9dent'>← " + p + "</a>";
        }
    }
    headResized();
}
function setN(n, nLink) {
    if (!n) n = next;
//    addRel(nLink, "Next");

    var nes = document.getElementsByClassName("next");
    for (var i = 0; i < nes.length; i++) {
        var ne = nes[i];
        if (ne) {
            ne.innerHTML = "<a href=\"" + nLink + "\" title='Suivant'>→ " + n + "</a>";
        }
    }
    headResized();
}
function previousFromTime(p) {
    var t = org.rr0.time.getTime();
    org.rr0.time.findTimeSibling(t.year, t.month,
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
    return p;
}
function setPrev(p, pLink) {
    if (!pLink) {
        if (!p && !prev) {
            if (org.rr0.time.getYear()) {
                p = previousFromTime(p);
            } else {
                pLink = "..";   // Default previous is previous directory
                setP(p, pLink);
            }
        } else {
            pLink = "..";   // Default previous is previous directory
            setP(p, pLink);
        }
    }
    if (pLink) {
        prevLink = pLink;
    }
    if (p) {
        prev = p;
    }
}
function nextFromTime(n) {
    var t = org.rr0.time.getTime();
    org.rr0.time.findTimeSibling(t.year, t.month,
        function (y, m) {
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
    return n;
}
function setNext(n, nLink) {
    if (!nLink) {
        if (!n && !next) {
            if (org.rr0.time.getYear()) {
                n = nextFromTime(n);
            }
        }
    }
    if (n) {
        next = n;
    }
    if (nLink) {
        nextLink = nLink;
    }
}
function navInit(s, sLink, c, cLink, p, pLink, n, nLink) {
    var onLoadDo = setStart(s, sLink);
    if (window === top) {
        addRel(sLink, "Start");
    }
//    if (onLoadDo) domLoadProcs.push(onLoadDo);
    setContents(c, cLink);
    setPrev(p, pLink);
    setNext(n, nLink);
}
var titleClass = "label";
var navTitle;
var navList;
function getNavList() {
    if (!navList) {
        var n = document.getElementsByTagName("nav")[0];
        navList = n.querySelector('ul');
    }
    return navList;
}
function createNavElement(c) {
    var li = document.getElementsByClassName(c)[0];
    if (!li) {
        li = document.createElement("li");
        c = !(!c) ? org.constantClass + " " + c : org.constantClass;
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

var style = null;
var hiddenPos = '-100em';

//var titleTag;
angular
    .module('rr0.nav', ['ngSanitize', /*'sun.scrollable', */'rr0.people', 'rr0.time'])
    .value('host', location.host)
    .filter('unsafe', ['$sce', function ($sce) {
        return function (val) {
            return $sce.trustAsHtml(val);
        };
    }])
    .service('navigationService', ['$rootScope', function ($rootScope) {
        this.currentLevel = 1;
        this.sections = [];
        this.menu = [];

        this.addSection = function (s) {
            var l;
            var outlineL;
            if (s.indexOf('<h') < 0) {
                l = '<h1>' + s + '</h1>';
                var tag = 'h' + (this.currentLevel) + '>';
                outlineL = '<' + tag + s + '</' + tag;
            } else {
                l = s;
                outlineL = l;
            }
            this.currentLevel++;
            var levelSections = this.sections[this.currentLevel];
            if (typeof levelSections !== "array") {
                levelSections = this.sections;
            }
            var index = this.sections.length;
            levelSections.push(l);
            function camelize(l) {
                var camel = '';
                var wasWord = false;
                for (var i = 0; i < l.length; i++) {
                    var s2 = l.charAt(i);
                    switch (s2) {
                        case '?':
                        case '!':
                        case ',':
                        case '&':
                        case '-':
                        case '\'':
                        case ' ':
                            wasWord = true;
                            break;
                        default:
                            if (wasWord) {
                                s2 = s2.toUpperCase();
                                wasWord = false;
                            }
                            camel += s2;
                    }
                }
                return camel;
            }

            var section = {
                label: l,
                outlineLabel: outlineL,
                id: camelize(org.validLink(s), this.currentLevel),
                level: this.currentLevel
            };
            $rootScope.$broadcast('sectionAdded', section);
            return section;
        };
    }])
/**
 * Sets controller's title to be displayed from the title header tag.
 */
    .directive('title', [function () {
        return {
            restrict: 'E',
            link: function (scope, elem, attrs) {
                scope.title = elem.text();
            }
        };
    }])
/**
 * Picks last image from contents to set header background
 */
    .directive('img', [function () {
        return {
            restrict: 'E',
            link: function (scope, elem, attrs) {
                var pageHeading = document.querySelector('header h1');
                if (pageHeading) {
                    var style = window.getComputedStyle(pageHeading).backgroundImage;
                    style += ', url(\'' + attrs.src + '\')';
                    pageHeading.style.backgroundImage = style;
                }
            }
        };
    }])
/**
 * Sets navigation menu items from relationship links meta tags.
 */
    .directive('link', [function () {
        return {
            restrict: 'E',
            link: function (scope, elem, attrs) {
                var rel = attrs.rel;
                if (rel) {
                    rel = rel.toLowerCase();
                }
                var linkTitle = attrs.title;

                switch (rel) {
                    case 'alternate':
                        var alternatelang = attrs.hreflang;
                        break;
                    case 'prev':
                        setPrev(linkTitle, attrs.href);
                        break;
                    case 'next':
                        setNext(linkTitle, attrs.href);
                        break;
                    case 'start':
                        setStart(linkTitle, attrs.href);
                        break;
                    case 'contents':
                        setContents(linkTitle, attrs.href);
                        break;
                }
            }
        };
    }])
/**
 * Adds "target=_blank" to external links so they will be opened in separate tabs
 */
    .directive('a', ['host', function (host) {
        return {
            restrict: 'E',
            link: function (scope, elem, attrs) {
                var a = elem[0];
                if (a.hostname && a.hostname.indexOf('.') > 0 && a.hostname != host) {
                    a.target = '_blank';
                }
            }
        }
    }])
/**
 * Registers each encountered HTML5 "section" tag as an document outline entry
 */
    .directive('section', ['navigationService', function (navigationService) {
        function addSec(sectionTitle, scope, elem) {
            var section = navigationService.addSection(sectionTitle);
            scope.level = section.level;
            scope.sectionTitle = section.label;
            elem[0].id = section.id;
        }

        return {
            restrict: 'E',
            transclude: true,
            scope: {title: '@title'},
            link: {
                pre: function (scope, elem, attrs) {
                    var sectionTitle = attrs.title;
                    if (sectionTitle) {
                        addSec(sectionTitle, scope, elem);
                    }
                },
                post: function (scope, elem, attrs) {
                    if (!scope.title) {
                        var titleElem = angular.element(elem.children()[1]).children()[0];
                        var sectionTitle = titleElem.outerHTML;
                        angular.element(titleElem).remove();
                        addSec(sectionTitle, scope, elem);
                    }
                    navigationService.currentLevel--;
                    scope.level = navigationService.currentLevel;
                }
            },
            template: '<span ng-bind-html="sectionTitle"></span><div ng-transclude></div> '
        };
    }])
/**
 * Registers each encountered HTML5 "article" tag as an document outline entry
 */
    .directive('article', ['navigationService', function (navigationService) {
        function addArt(sectionTitle, scope, elem) {
            var section = navigationService.addSection(sectionTitle);
            scope.level = section.level;
            scope.sectionTitle = section.label;
            elem[0].id = section.id;
        }

        return {
            restrict: 'E',
            transclude: true,
            scope: {title: '@title'},
            link: {
                pre: function (scope, elem, attrs) {
                    var sectionTitle = attrs.title;
                    if (sectionTitle) {
                        addArt(sectionTitle, scope, elem);
                    }
                },
                post: function (scope, elem, attrs) {
                    if (!scope.title) {
                        var titleElem = angular.element(elem.children()[0]).children()[0];
                        var sectionTitle = titleElem.outerHTML;
                        addArt(sectionTitle, scope, elem);
                    }
                    navigationService.currentLevel--;
                    scope.level = navigationService.currentLevel;
                }
            },
            template: '<p ng-transclude></p> '
        };
    }])
    .controller('HeadCtrl', ['$scope', '$rootScope', '$log', '$timeout', 'peopleService', function ($scope, $rootScope, $log, $timeout, peopleService) {
        function titleFromTime() {
            var title = org.rr0.time.getYear();
            if (title) {
                if (org.rr0.time.getTime().month) {
                    title = org.rr0.time.monthName() + " " + title;
                    var dayOfMonth = org.rr0.time.getDayOfMonth();
                    if (dayOfMonth) {
                        title = org.rr0.time.dayOfWeekNam(org.rr0.time.getDayOfWeek()) + " " + dayOfMonth + " " + title;
                    }
                }
            }
            return title;
        }

        function titleFromPeople() {
            var title;
            var p = getPeople();
            if (p) {
                title = p.toString();
            }
            return title;
        }

        function titleFromURI() {
            var title;
            var uri = org.getUri();
            var ls = uri.lastIndexOf("/");
            var htmlExt = uri.lastIndexOf(".html");
            if (htmlExt > 0 && uri.substring(htmlExt - 5, htmlExt) != "index") {
                title = uri.substring(ls + 1, htmlExt);
            } else if (ls < uri.length - 1) {
                var ps = ls - 1;
                while (uri.charAt(ps) != '/') ps--;
                title = uri.substring(ps + 1, ls).toUpperCase();  // Accronym assumed
            } else {
                title = uri.substring(ls + 1);
            }
            return title;
        }

        function getTitle() {
            if (!$scope.title) {
                $scope.title = titleFromTime() || titleFromPeople() || titleFromURI();
            }
            return $scope.title;
        }

        $scope.isFramed = function () {
            return window !== top;
        };
        $scope.initTitle = function (t, u, st) {
            $scope.title = t;
            $scope.url = u;
            $scope.style = st;
        };
        $scope.initPeople = function (p) {
            setPeopleName(p);
        };
        $scope.initLang = function (l) {

        };
        $scope.addNavElement = function (c) {
            return createNavElement(c);
        };
        $scope.ps = [];
        function addNavLinkBeforeTitle(t, l, tt, c) {
            $scope.ps.push({
                label: t,
                link: l,
                title: tt,
                style: c
            });
        }

        $scope.ns = [];
        function addNavLinkAfterTitle(t, l, tt, c) {
            $scope.ns.push({
                label: t,
                link: l,
                title: tt,
                style: c
            });

        }

        var scrolled = document.querySelector(".contents");
        var header = document.querySelector('header');
        var nav = document.querySelector('nav');
        var outline = document.querySelector('.outline');
        var search = document.getElementById('search');

        function isHeaderCollapsed() {
            return window !== top || scrolled.scrollTop > header.offsetHeight - getNavHeight();
        }

        function setOutline(digesting, outlineHTML) {
            if (digesting) {
                $scope.outline = outlineHTML;
            } else {
                $scope.$apply(function () {
                    $scope.outline = outlineHTML;
                });
            }
        }

        function updateHeading(digesting) {
            var navElement = nav;
            if (isHeaderCollapsed()) {
                navElement.style.position = 'fixed';
                navElement.style.top = '0';
                header.style.paddingBottom = getNavHeight() + 'px';
                setOutline(digesting, $scope.title);
            } else {
                navElement.style.position = 'absolute';
                var titleHeight = 80;
                navElement.style.top = titleHeight + 'px';
                var text = scrolled.querySelector('.text');
                text.style.position = 'absolute';
                setOutline(digesting, 'Sommaire');
            }
        }

        scrolled.onscroll = function (event) {
            updateHeading();
        };
        function showOutline() {
            outline.style.top = $scope.getHeadingHeight() + 'px';
        }

        function hideOutline() {
            outline.style.top = hiddenPos;
        }

        function getNavHeight() {
            return nav.offsetHeight > 80 ? 0 : nav.offsetHeight;
        }

        $scope.getHeadingHeight = function () {
            return getNavHeight();
        };

        $scope.init = function (s, sLink, c, cLink, p, pLink, n, nLink) {
            navInit(s, sLink, c, cLink, p, pLink, n, nLink);
            if (window === top) {
                addNavLinkBeforeTitle("RR0", "/", "Home", "home");
                addNavLinkBeforeTitle(startNav.label, startNav.link, startNav.title, "start");
                addNavLinkBeforeTitle('' + contents, contentsURL, "Table des matières", "toc");
                addNavLinkBeforeTitle(prev, prevLink, "Pr\xE9c\xE9dent", "prev");
            } else {
                //        org.rr0.contentsZone.style.boxShadow = "0.4em 0.4em 0,8em rgb(200,200,200) inset";
//        org.rr0.contentsZone.style.backgroundColor = "#e2e2e8";
            }
            function addTitle() {
                var headTitle = document.getElementsByTagName('title')[0];
                if (!headTitle) {
                    headTitle = document.createElement("title");
                    var titleText = getTitle();
                    headTitle.innerHTML = titleText;
                    org.addToHead(headTitle);
                    $scope.title = '' + titleText;
                } else {
                    $scope.title = org.text(headTitle);
                }
                setOutline(true, 'Sommaire');
            }

            var alternate;
            var alternateClass = "alternate";

            function setAlternates(innerHtml) {
                alternate = innerHtml;
            }

            function checkAlt() {
                if (!alternate) {
                    alternate = " ";
                    checkAlternate(org.getUri(),
                        function (original) {
                            setAlternates(original ? "<a href='" + original + "'>&#8668; Texte d'origine</a>" : "&#9888; Ce document est une traduction");
                        },
                        function (translation) {
                            setAlternates(translation ? "<a href='" + translation + "'>&#8669; Traduction française</a>" : "&#9888; Pas de traduction disponible");
                        });
                }
            }

            addTitle();
            if (window === top) {
                addNavLinkAfterTitle(next, nextLink, "Suivant", "next");
            }
            createNavElement(alternateClass);
            checkAlt();
        };
        $scope.$watch('title', function () {
            updateHeading(true);
        });
        $scope.initAuthor = function (a, aLink, c, cLink) {
            peopleService.addAuthor(a, aLink, c, cLink);
        };
        $scope.sections = [];
        function isOutlineVisible() {
            return outline.style.top !== hiddenPos;
        }

        $scope.titleClick = function () {
            if (isOutlineVisible()) {
                showOutline();
            } else {
                hideOutline();
            }
        };
        $scope.titleOver = function () {
            showOutline();
        };
        $scope.titleLeave = function () {
            hideOutline();
        };
        function smoothScroll(anchor, duration) {
            var easingPattern = function (duration) {
                return duration < 0.5 ? 4 * duration * duration * duration : (duration - 1) * (2 * duration - 2) * (2 * duration - 2) + 1; // acceleration until halfway, then deceleration
            };
            // Get the height of a fixed header if one exists
            var headerHeight = $scope.getHeadingHeight();

            // Calculate how far to scroll
            var startLocation = scrolled.scrollTop;
            var getEndLocation = function (anchor) {
                var location = 0;
                if (anchor.offsetParent) {
                    do {
                        location += anchor.offsetTop;
                        anchor = anchor.offsetParent;
                    } while (anchor);
                }
                location = location - headerHeight;
                return location >= 0 ? location : 0;
            };
            var endLocation = getEndLocation(anchor);
            var distance = endLocation - startLocation;

            var runAnimation;
            // Function to stop the scrolling animation
            var stopAnimationIfRequired = function () {
                var currentLocation = scrolled.scrollTop;
                if (currentLocation == endLocation || ( (scrolled.offsetHeight + currentLocation) >= scrolled.scrollHeight )) {
                    cancelAnimationFrame(runAnimation);
                }
            };
            // Set the animation variables to 0/undefined.
            var timeLapsed = 0;
            var percentage, position;

            var animateScroll = function () {
                runAnimation = requestAnimationFrame(animateScroll, scrolled);
                timeLapsed += 16;
                percentage = timeLapsed / duration;
                percentage = percentage > 1 ? 1 : percentage;
                position = startLocation + distance * easingPattern(percentage);
                scrolled.scrollTop = position;
                stopAnimationIfRequired();
            };
            // Loop the animation function
            animateScroll();
        }

        function scrollTo(id) {
            var anchor = document.getElementById(id);   // anchor.scrollIntoView(true, 'smooth');
            hideOutline();
            smoothScroll(anchor, 500);
        }

        $scope.sectionClick = function (section) {
            scrollTo(section.id);
        };
        $rootScope.$on('sectionAdded', function (event, section) {
//            for (var i = 2; i < section.level; i++) {
//                section.label = '&nbsp;&nbsp;' + section.label;
//            }
            $scope.sections.push(section);
        });
    }]);

function headResized() {
//    var headerHeight = header.offsetHeight;
//    var main = document.getElementById("main");
//    main.style.marginTop = headerHeight + "px";
//    document.getElementById("contents").style.height = (main.offsetHeight - headerHeight) + "px";
}

if (window.addEventListener) {    // most non-IE browsers and IE9
    window.addEventListener("resize", headResized, false);
} else if (window.attachEvent) {  // Internet Explorer 5 or above
    window.attachEvent("onresize", headResized);
}
