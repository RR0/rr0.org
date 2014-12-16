angular.module('rr0.nav')
    .controller('HeadController', ['$scope', '$rootScope', '$log', '$timeout', 'commonsService', 'langService', 'peopleService', 'timeService', 'navigationService', 'hiddenPos', 'constantClass', function ($scope, $rootScope, $log, $timeout, commonsService, langService, peopleService, timeService, navigationService, hiddenPos, constantClass) {
        'use strict';

        var scrolled = document.querySelector(".contents");
        var header = document.querySelector('header');
        var titleHeight = 80;
        var nav = angular.element('nav');
        var outline = document.querySelector('.outline');
        var text = scrolled.querySelector('.text');
        var titleSection = {
            label: $scope.title,
            outlineLabel: $scope.title,
            id: "top",
            level: 0,
            elem: angular.element('#top')
        };
        var currentSection;

        function titleFromTime() {
            var title = timeService.getYear();
            if (title) {
                if (timeService.getTime().month) {
                    title = timeService.monthName() + " " + title;
                    var dayOfMonth = timeService.getDayOfMonth();
                    if (dayOfMonth) {
                        title = timeService.dayOfWeekNam(timeService.getDayOfWeek()) + " " + dayOfMonth + " " + title;
                    }
                }
            }
            return title;
        }

        function createNavElement(c) {
            var li = document.getElementsByClassName(c)[0];
            if (!li) {
                li = document.createElement("li");
                c = !(!c) ? constantClass + " " + c : constantClass;
                li.setAttribute("class", c);
                navigationService.getNavList().appendChild(li);
            }
            return li;
        }

        function titleFromPeople() {
            var title;
            var p = peopleService.getPeople();
            if (p) {
                title = p.toString();
            }
            return title;
        }

        function titleFromURI() {
            var title;
            var uri = commonsService.getUri();
            var ls = uri.lastIndexOf("/");
            var htmlExt = uri.lastIndexOf(".html");
            if (htmlExt > 0 && uri.substring(htmlExt - 5, htmlExt) !== "index") {
                title = uri.substring(ls + 1, htmlExt);
            } else if (ls < uri.length - 1) {
                var ps = ls - 1;
                while (uri.charAt(ps) !== '/') {
                    ps--;
                }
                title = uri.substring(ps + 1, ls).toUpperCase();  // Accronym assumed
            } else {
                title = uri.substring(ls + 1);
            }
            return title;
        }

        $scope.isFramed = function () {
            return window !== top;
        };

        function getTitle() {
            if (!$scope.title) {
                $scope.title = "" + (titleFromTime() || titleFromPeople() || titleFromURI());
            }
            return $scope.title;
        }

        $scope.initTitle = function (t, u, st) {
            $scope.title = $scope.title || t;
            $scope.url = u;
            $scope.style = st;
        };
        $scope.title = getTitle();
        $scope.outline = 'Sommaire';

        $scope.initPeople = function (p) {
            peopleService.setPeopleName(p);
        };
        $scope.addNavElement = function (c) {
            return createNavElement(c);
        };
        $scope.ps = [];
        function addPrev(t, l, tt, c) {
            $scope.ps.push({
                label: t,
                link: l,
                title: tt,
                style: c
            });
        }

        $scope.ns = [];
        function addNext(t, l, tt, c) {
            $scope.ns.push({
                label: t,
                link: l,
                title: tt,
                style: c
            });
        }

        function isHeaderVisible() {
            return window === top && scrolled.scrollTop <= header.offsetHeight;
        }

        function setOutline(outlineHTML) {
            $scope.outline = outlineHTML;
        }

        function updateHeading() {
            var hasCollapsedState = nav.hasClass('collapsed');
            if (isHeaderVisible()) {
                if (hasCollapsedState) {
                    nav.removeClass('collapsed');
                    $scope.$apply(function () {
                        setOutline('Sommaire');
                    });
                    selectOutline(null);
                }
            } else {
                if (!hasCollapsedState) {
                    nav.addClass('collapsed');
                    $scope.$apply(function () {
                        setOutline($scope.title);
                    });
                    selectOutline(titleSection);
                } else {
                    updateOutline();
                }
            }
        }

        function unselect(sec) {
            if (sec) {
                sec.removeClass('hovered');
            }
        }

        function select(toSelect) {
            var toSelectElem;
            if (toSelect) {
                toSelectElem = angular.element("#out-" + toSelect.id);
                /*if (currentSection && toSelectElem[0] === currentSection[0]) {
                 return;
                 }*/
                toSelectElem.addClass('hovered');
            }
            return toSelectElem;
        }

        function selectOutline(newSelection) {
            unselect(currentSection);
            currentSection = select(newSelection);
        }

        function updateOutline() {
            var lastSec = titleSection;
            var newSec;
            if ($scope.sections.length) {
                for (var i = 0; i < $scope.sections.length; i++) {
                    newSec = $scope.sections[i];
                    var found;
                    found = scrolled.scrollTop > newSec.elem[0].offsetTop;
                    if (lastSec) {
                        if (!found) {
                            selectOutline(lastSec);
                            return;
                        }
                    }
                    lastSec = newSec;
                }
                selectOutline(newSec);
            }
        }

        scrolled.onscroll = function (event) {
            requestAnimationFrame(updateHeading);
        };

        if (window.addEventListener) {    // most non-IE browsers and IE9
            window.addEventListener("resize", scrolled.onscroll, false);
        } else if (window.attachEvent) {  // Internet Explorer 5 or above
            window.attachEvent("onresize", scrolled.onscroll);
        }

        function showOutline() {
            outline.style.top = $scope.getHeadingHeight() + 'px';
        }

        function hideOutline() {
            outline.style.top = hiddenPos;
        }

        function getNavHeight() {
            return nav[0].offsetHeight > titleHeight ? 0 : nav[0].offsetHeight;
        }

        $scope.getHeadingHeight = function () {
            return getNavHeight();
        };

        $scope.init = function (s, sLink, c, cLink, p, pLink, n, nLink) {

            function navInit(s, sLink, c, cLink, p, pLink, n, nLink) {
                var onLoadDo = navigationService.setStart(s, sLink);
                if (window === top) {
                    navigationService.addRel(sLink, "Start");
                }
//    if (onLoadDo) domLoadProcs.push(onLoadDo);
                navigationService.setContents(c, cLink);
                navigationService.setPrev(p, pLink);
                navigationService.setNext(n, nLink);
            }

            navInit(s, sLink, c, cLink, p, pLink, n, nLink);

            var startNav = navigationService.getStartNav();
            if (window === top) {
                addPrev("RR0", "/", "Home", "home");
                addPrev(startNav.label, startNav.link, startNav.title, "start");
                addPrev('' + navigationService.getContents(), navigationService.getContentsURL(), "Table des mati\xE8res", "toc");
                addPrev(navigationService.getPrev(), navigationService.getPrevLink(), "Pr\xE9c\xE9dent", "prev");
                addNext(navigationService.getNext(), navigationService.getNextLink(), "Suivant", "next");
            } else {
                //        org.rr0.contentsZone.style.boxShadow = "0.4em 0.4em 0,8em rgb(200,200,200) inset";
//        org.rr0.contentsZone.style.backgroundColor = "#e2e2e8";
            }

            $scope.alternate = null;
            var alternateClass = "alternate";

            function setAlternates(innerHtml) {
                $scope.alternate = innerHtml;
            }

            function checkAlt() {
                if (!$scope.alternate) {
                    $scope.alternate = " ";
                    langService.checkAlternate(commonsService.getUri(),
                        function (original) {
                            setAlternates(original ? "<a href='" + original + "'>&#8668; Texte d'origine</a>" : "&#9888; Ce document est une traduction");
                        },
                        function (translation) {
                            setAlternates(translation ? "<a href='" + translation + "'>&#8669; Traduction fran\xE7aise</a>" : "&#9888; Pas de traduction disponible");
                        });
                }
            }

            createNavElement(alternateClass);
            checkAlt();
        };

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
            var lastLocation;
            // Function to stop the scrolling animation
            var stopAnimationIfRequired = function () {
                var currentLocation = scrolled.scrollTop;
                if (currentLocation === endLocation || ( (scrolled.offsetHeight + currentLocation) >= scrolled.scrollHeight ) || currentLocation === lastLocation) {
                    cancelAnimationFrame(runAnimation);
                }
                lastLocation = currentLocation;
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