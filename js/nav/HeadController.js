angular.module('rr0.nav')
  .controller('HeadController',
  ['$scope', '$rootScope', '$log', '$timeout',
    'commonsService', 'langService', 'peopleService', 'timeService', 'navigationService', 'constantClass',
    function ($scope, $rootScope, $log, $timeout,
              commonsService, langService, peopleService, timeService, navigationService, constantClass) {
      'use strict';

      var scrolled = document.querySelector(".contents");
      var header = document.querySelector('header');
      var nav = angular.element('nav');
      var text = scrolled.querySelector('.text');
      var titleSection = {
        label: $scope.title,
        outlineLabel: $scope.title,
        id: "top",
        level: 0,
        elem: angular.element('#top')
      };
      var currentSection;

      var outline = document.querySelector('.outline');

      function isNavLeft() {
        return nav[0].offsetHeight === scrolled.offsetHeight;
      }

      function getNavHeight() {
        return isNavLeft() ? 0 : nav[0].offsetHeight;
      }

      $scope.getHeadingHeight = function () {
        return nav[0].offsetTop + getNavHeight();
      };

      function titleFromTime() {
        var title = timeService.getYear();
        if (title) {
          if (timeService.getTime().month) {
            title = timeService.monthName() + " " + title;
            var dayOfMonth = timeService.getDayOfMonth();
            if (dayOfMonth) {
              title = timeService.dayOfWeekName(timeService.getDayOfWeek()) + " " + dayOfMonth + " " + title;
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

      if (!$scope.title) {
        $scope.setTitle(commonsService.capitalizeFirstLetter("" + (titleFromTime() || titleFromPeople() || titleFromURI())));
      }

      $scope.initPeople = function (p) {
        peopleService.setPeopleName(p);
      };
      $scope.addNavElement = function (c) {
        return createNavElement(c);
      };

      $scope.ps = [];
      function addPrev(pp, tt, c) {
        $scope.ps.push({
          label: commonsService.capitalizeFirstLetter("" + pp.label),
          link: pp.link,
          title: tt,
          style: c
        });
      }

      $scope.ns = [];
      function addNext(nn, tt, c) {
        $scope.ns.push({
          label: commonsService.capitalizeFirstLetter("" + nn.label),
          link: nn.link,
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

      var searchResults;

      function updateSearchPos(triggerSelector) {
        var trigger = document.querySelector(triggerSelector);
        if (trigger) {
          if (!searchResults) {
            searchResults = document.querySelector('.search-result');
          }
          if (searchResults) {
            searchResults.style.top = (trigger.offsetTop + trigger.offsetHeight) + 'px';
            searchResults.style.left = "";
          }
        }
      }

      function updateOutlinePos(triggerSelector) {
        if (isNavLeft()) {
          outline.style.top = 0;
        } else {
          var trigger = document.querySelector(triggerSelector);
          if (trigger && outline) {
            outline.style.top = (trigger.offsetTop + trigger.offsetHeight) + 'px';
          }
        }
      }

      function updatePos() {
        updateOutlinePos('.outline-title');
        updateSearchPos('.search form');
      }

      function updateHeading() {
        var isNavCollapsed = nav.hasClass('collapsed');
        if (isHeaderVisible()) {
          if (isNavCollapsed || !$scope.outline) {
            nav.removeClass('collapsed');
            text.style.paddingTop = '0';
            $scope.$apply(function () {
              // if (outline && outline.childElementCount > 0) {
              setOutline('Sommaire');
              /* } else {
               setOutline('');
               }*/
            });
            selectOutline(null);
            updatePos();
          }
        } else {
          if (isNavCollapsed) {
            updateOutline();
          } else {
            nav.addClass('collapsed');
            text.style.paddingTop = getNavHeight() + 'px';
            $scope.$apply(function () {
              setOutline($scope.title);
            });
            selectOutline(titleSection);
            updatePos();
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

      function onResize(event) {
        scrolled.onscroll(event);
        updatePos();
      }

      if (window.addEventListener) {      // most non-IE browsers and IE9
        window.addEventListener("resize", onResize, false);
      } else if (window.attachEvent) {    // Internet Explorer 5 or above
        window.attachEvent("onresize", onResize);
      }

      function isOutlineVisible() {
        return outline && outline.style.height !== '0px';
      }

      $scope.titleClick = function () {
        if (isOutlineVisible()) {
          outline.classList.add('clicked');
        } else if (outline) {
          outline.classList.remove('clicked');
        }
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
          addPrev(startNav, startNav.title, "start");
          addPrev({
            label: '' + navigationService.getContents(),
            link: navigationService.getContentsURL()
          }, "Table des mati\xE8res", "toc");
          navigationService.getPrev().then(function (pp) {
            addPrev(pp, "Pr\xE9c\xE9dent", "prev");
          });
          navigationService.getNext().then(function (nn) {
            addNext(nn, "Suivant", "next");
          });
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
      $scope.init();
      $scope.initAuthor = function (a, aLink, c, cLink) {
        peopleService.addAuthor(a, aLink, c, cLink);
      };

      $scope.sections = [];

      function smoothScroll(anchor, duration) {
        var easingPattern = function (percent) {
          return percent < 0.5 ? 4 * percent * percent * percent : (percent - 1) * (2 * percent - 2) * (2 * percent - 2) + 1; // acceleration until halfway, then deceleration
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
          if (scrolled.scrollTop === endLocation) {
            cancelAnimationFrame(runAnimation);
          }
        };
        // Set the animation variables to 0/undefined.
        var timeLapsed = 0;
        var percentage, position;

        var animateScroll = function () {
          runAnimation = requestAnimationFrame(animateScroll);
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
        //hideOutline();
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
      $timeout(function () {
        updateHeading();
        updatePos();
      });
    }]);