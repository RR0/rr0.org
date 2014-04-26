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
                t = "Début";
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
            pe.innerHTML = "<a href=\"" + pLink + "\" title='Précédent'>← " + p + "</a>";
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
function setPrev(p, pLink) {
    if (!pLink) {
        if (!p && !prev) {
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
    if (pLink) {
        prevLink = pLink;
    }
    if (p) {
        prev = p;
    }
}
function setNext(n, nLink) {
    if (!nLink) {
        if (!n && !next) {
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

style = null;

//var titleTag;
angular.module('rr0.nav', ['ngSanitize', 'rr0.people', 'rr0.time'])
    .filter('unsafe', ['$sce', function ($sce) {
        return function (val) {
            return $sce.trustAsHtml(val);
        };
    }])
    .service('navigationService', ['$rootScope', function ($rootScope) {
        this.currentLevel = 1;
        this.sections = [];
        this.menu = [];

        this.addSection = function (l) {
            this.currentLevel++;
            var levelSections = this.sections[this.currentLevel];
            if (typeof levelSections !== "array") {
                levelSections = this.sections;
            }
            var index = this.sections.length;
            levelSections.push(l);
            var section = {
                label: l,
                id: 'section' + index,
                level: this.currentLevel
            };
            $rootScope.$broadcast('sectionAdded', section);
            return section;
        }
    }])
    .directive('title', [function () {
        return {
            restrict: 'E',
            link: function (scope, elem, attrs) {
                scope.title = elem.text();
            }
        };
    }])
    .directive('img', [function () {
        return {
            restrict: 'E',
            link: function (scope, elem, attrs) {
                scope.headImage = attrs.src;
            }
        };
    }])
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
    .directive('section', ['navigationService', function (navigationService) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                title: '@title'
            },
            link: {
                pre: function (scope, elem, attrs) {
                    if (attrs.title) {
                        var section = navigationService.addSection(attrs.title);
                        scope.level = section.level;
                        scope.sectionTitle = section.label;
                        elem[0].id = section.id;
                    }
                },
                post: function (scope, elem, attrs) {
                    navigationService.currentLevel--;
                    scope.level = navigationService.currentLevel;
                }
            },
            template: '<h1>{{sectionTitle}}</h1><div ng-transclude></div> '
        };
    }])
    .controller('HeadCtrl', ['$scope', '$rootScope', '$http', '$log', '$timeout', 'peopleService', function ($scope, $rootScope, $http, $log, $timeout, peopleService) {
        function getTitle() {
            if (!$scope.title) {
                $scope.title = time.getYear();
                if ($scope.title) {
                    if (getTime().month) {
                        $scope.title = time.monthName() + " " + $scope.title;
                        var dayOfMonth = time.getDayOfMonth();
                        if (dayOfMonth) {
                            $scope.title = org.rr0.time.dayOfWeekNam(time.getDayOfWeek()) + " " + dayOfMonth + " " + $scope.title;
                        }
                    }
                } else {
                    var p = getPeople();
                    if (p) {
                        $scope.title = p.toString();
                    } else {
                        var uri = getUri();
                        var ls = uri.lastIndexOf("/");
                        var htmlExt = uri.lastIndexOf(".html");
                        if (htmlExt > 0 && uri.substring(htmlExt - 5, htmlExt) != "index") {
                            $scope.title = uri.substring(ls + 1, htmlExt);
                        } else if (ls < uri.length - 1) {
                            var ps = ls - 1;
                            while (uri.charAt(ps) != '/') ps--;
                            $scope.title = uri.substring(ps + 1, ls).toUpperCase();  // Accronym assumed
                        } else {
                            $scope.title = uri.substring(ls + 1);
                        }
                    }
                }
            }
            return $scope.title;
        }

        $scope.isFramed=function() {
          return window !== top;
        };
        $scope.initTitle = function (t, u, st) {
            $scope.title = t;
            url = u;
            style = st;
        };
        $scope.initPeople = function (p) {
            setPeopleName(p);
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

        var scrolled = document.getElementById("contents");
        var header = document.querySelector('header');
        var nav = document.querySelector('nav');
        var outline = document.getElementById('outline');
        var search = document.getElementById('search');

        function getHeaderHeight() {
            return header.offsetHeight;
        }

        function getNavHeight() {
            return nav.offsetHeight;
        }

        function isHeaderCollapsed() {
            return window !== top || scrolled.scrollTop > header.offsetHeight - getNavHeight();
        }

        function getHeadingHeight() {
            return getNavHeight();
        }

        function updateHeading(digesting) {
            var navElement = nav;
//            var contents = document.getElementById('contents');
            if (isHeaderCollapsed()) {
                navElement.style.position = 'fixed';
                navElement.style.top = '0';
                header.style.paddingBottom = getNavHeight() + 'px';
//                contents.style.position='absolute';
//                contents.style.top=getNavHeight() + 'px';
                if (digesting) {
                    $scope.outline = $scope.title;
                } else {
                    $scope.$apply(function () {
                        $scope.outline = $scope.title;
                    });
                }
            } else {
                navElement.style.position = 'absolute';
                var titleHeight = 80;
                navElement.style.top = titleHeight + 'px';
                var text = scrolled.querySelector('#text');
                text.style.position = 'absolute';
//                contents.style.top='0';
                text.style.top = titleHeight + getNavHeight() + 'px';
                if (digesting) {
                    $scope.outline = 'Sommaire';
                } else {
                    $scope.$apply(function () {
                        $scope.outline = 'Sommaire';
                    });
                }
            }
        }

        scrolled.onscroll = function (event) {
            updateHeading();
        };
        function showOutline() {
            outline.style.top = getHeadingHeight() + 'px';
        }

        var hiddenPos = '-100em';

        function hideOutline() {
            outline.style.top = hiddenPos;
        }

        function isSearchVisible() {
            return search.style.top === hiddenPos;
        }

        function showSearch() {
            search.style.top = getHeadingHeight() + 'px';
        }

        function hideSearch() {
            search.style.top = hiddenPos;
        }

        $scope.searchInput = '';
        $scope.doSearch = function () {
            $http.get("https://www.googleapis.com/customsearch/v1?key=AIzaSyCBM8ZUsYyJNdwKTKxoARTr673_8IaWKSo&cx=014557949845581334805:gdnqsazbu8i&q=" + $scope.searchInput)
                .success(function (data, status, headers, config) {
                    $scope.searchResults = [];
                    if (data.searchInformation.totalResults > 0) {
                        $scope.searchResults = data.items;
                    } else {
                        log("No results for '" + $scope.searchInput + "'");
                    }
                    showSearch();
                });
        };
        $scope.searchKey = function (event, item) {
            if (event.keyCode === 40) {
                if (!isSearchVisible()) {
                    showSearch();
                } else {
                    // Focus next search result
                }
                $scope.searchClick(item);
            }
        };
        $scope.searchClick = function (item) {
            document.body.className += ' wait';
            $timeout(function () {
                window.location = item.link;
            }, 10);
        };
        $scope.init = function (s, sLink, c, cLink, p, pLink, n, nLink) {
            navInit(s, sLink, c, cLink, p, pLink, n, nLink);
            if (window === top) {
                addNavLinkBeforeTitle("RR0", "/", "Home", "home");
                addNavLinkBeforeTitle(startNav.label, startNav.link, startNav.title, "start");
                addNavLinkBeforeTitle('' + contents, contentsURL, "Table des matières", "toc");
                addNavLinkBeforeTitle(prev, prevLink, "Précédent", "prev");
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
                $scope.outline = 'Sommaire';
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
        $scope.sections = [
            {
                label: '⤒',
                id: 'contents'
            }
        ];
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
        $scope.outlineOver = function () {
            $log.info('outline over')
        };
        $scope.outlineLeave = function () {
            $log.info('outline leave')
        };
        $scope.searchOver = function () {
            showSearch();
        };
        $scope.searchLeave = function () {
            search.style.top = hiddenPos;
        };
        function smoothScroll(anchor, duration, url) {
            var easingPattern = function (duration) {
                return duration < 0.5 ? 4 * duration * duration * duration : (duration - 1) * (2 * duration - 2) * (2 * duration - 2) + 1; // acceleration until halfway, then deceleration
            };
            var updateURL = function (url, anchor) {
                if (url === true && history.pushState) {
                    window.location.hash = '#' + anchor.id;
                }
            };
            // Get the height of a fixed header if one exists
            var headerHeight = getHeadingHeight();

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

            // Function to stop the scrolling animation
            var stopAnimationIfRequired = function () {
                var currentLocation = scrolled.scrollTop;
                if (currentLocation == endLocation || ( (scrolled.offsetHeight + currentLocation) >= scrolled.scrollHeight )) {
                    clearInterval(runAnimation);
                    updateURL(url, anchor);
                }
            };
            // Set the animation variables to 0/undefined.
            var timeLapsed = 0;
            var percentage, position;

            var animateScroll = function () {
                timeLapsed += 16;
                percentage = timeLapsed / duration;
                percentage = percentage > 1 ? 1 : percentage;
                position = startLocation + distance * easingPattern(percentage);
                scrolled.scrollTop = position;
                stopAnimationIfRequired();
            };
            // Loop the animation function
            var runAnimation = setInterval(animateScroll, 16);
        }

        $scope.sectionClick = function (section) {
            var anchor = document.getElementById(section.id);   // anchor.scrollIntoView(true, 'smooth');
            hideOutline();
            smoothScroll(anchor, 500, false);
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
