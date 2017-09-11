import people from '../../people/people';
import time from '../../time/time';
import {org} from "../common";
import lang from '../lang';

const angular = require('angular');

function NavLink(l, url, t) {
  this.label = l;
  this.link = url;
  this.title = t;
}

interface Start {
  dir: string;
  label: string;
  title?: string;
  css?: string;
  js?: string;
  onLoad?: string;
}

export class NavService {
  startNav: any;
  contentsURL: any;
  contents: any;
  nextLink: any;
  next: any;
  prev: any;
  prevLink: any;
  navList: any;

  starts: Start[] =
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
        label: "<i class='fa fa-sitemap'></i> <span class='label'>Organisations</span></span>",
        title: "Organisations"
      },
      {
        dir: "/politique/",
        label: "Politique"
      }
    ];

  constructor(private commonsService, private netService, private timeService, private $log) {
    'use strict';
  }

  private currentLevel = 1;

  getNavList() {
    if (!this.navList) {
      const n = document.getElementsByTagName("nav")[0];
      this.navList = n.querySelector('ul');
    }
    return this.navList;
  }

  addRel(l, t) {
    const rel = document.createElement("link");
    rel.setAttribute("rel", t);
    rel.setAttribute("href", l);
    org.addToHead(rel);
  }

  nextFromTime(n) {
    const t = this.timeService.getTime();
    const self = this;
    const lookAfter = function (y, m) {
      if (m) {
        if (m < 12) {
          m++;                    // Before December?
          return {y: y, m: m};    // Return date with incremented month
        } else {
          m = 1;                  // January
        }
      }
      y++;
      return {y: y, m: m};        // Return date with incremented year
    };
    return new Promise((resolve, reject) => {
      self.findTimeSibling(t.year, t.month, lookAfter, resolve);
    });
  }

  previousFromTime() {
    const t = this.timeService.getTime();
    const self = this;
    const lookBefore = function (y, m) {
      if (m) {
        if (m > 1) {            // Month above february?
          m--;
          return {y: y, m: m};  // Return date with decremented month
        } else {
          m = 12;               // December
        }
      }
      y--;                      // Return date with decremented year
      return {y: y, m: m};
    };
    return new Promise((resolve, reject) => {
      self.findTimeSibling(t.year, t.month, lookBefore, resolve);
    });
  }

  setPrev(p, pLink) {
    if (pLink) {
      this.prevLink = pLink;
    }
    if (p) {
      this.prev = p;
    }
  }

  setNext(n, nLink) {
    if (n) {
      this.next = n;
    }
    if (nLink) {
      this.nextLink = nLink;
    }
  }

  getNext() {
    let nn;
    if (!this.nextLink && !this.next) {
      if (this.timeService.getYear()) {
        nn = this.nextFromTime(this.next);
      }
    }
    if (!nn) {
      if (this.next && this.nextLink) {
        nn = {
          label: this.next,
          link: this.nextLink
        };
      } else {
        nn = new Promise((resolve, reject) => {
          reject();
        });
      }
    }
    return nn.then ? nn : Promise.resolve(nn);
  }

  /**
   * Determine the "previous" link, if any.
   *
   * @returns {Promise}
   */
  getPrev() {
    let pp;
    let previousSpecified = this.prevLink || this.prev;
    if (!previousSpecified) {
      if (this.timeService.getYear()) {          // If no previous link has been specified, try to devise previous from context time.
        pp = this.previousFromTime();
      }
    }
    if (!pp) {
      if (this.prev && this.prevLink) {
        pp = {
          label: this.prev,
          link: this.prevLink
        };
      } else {
        pp = new Promise((resolve, reject) => {
          reject();
        });
      }
    }
    return pp.then ? pp : Promise.resolve(pp);
  }

  getPrevLink() {
    return this.prevLink;
  }

  getNextLink() {
    return this.nextLink;
  }

  addStart(s) {
    this.starts.push(s);
  }

  setContents(c, cLink) {
    if (!this.contents) {
      this.contents = c;
      this.contentsURL = cLink;
      // addRel(contentsURL, "Contents");
    }
  }

  /**
   * Find some time-dedicated page near a given time.
   *
   * @param oy The starting year.
   * @param m The starting month.
   * @param changeProc How to determine the next date to look for.
   * @param foundProc What to do once a sibling page has been found.
   */
  findTimeSibling(oy, m, changeProc, foundProc) {
    this.$log.debug('Looking for time sibling of %o-%o', oy, m);
    const ret = changeProc(oy, m);
    const y = ret.y;
    let l = this.timeService.yearLink(y);
    m = ret.m;
    let label = y;
    const self = this;
    if (m) {
      self.setContents(oy, this.timeService.yearLink(oy));
      l += "/" + this.commonsService.zero(m);
      label = this.timeService.monthName(m);
      if (y !== this.timeService.getTime().year) {
        label += ' ' + y;
      }
    } else {
      const cLink = this.timeService.yearLink(oy, true);
      if (cLink !== this.commonsService.getUri()) {
        this.setContents(~~(oy / 10) + "0s", cLink);
      }
    }
    this.netService.onExists(l)
      .then(function (req) {
        const foundSibling = {label: label, link: l};
        this.$log.debug('Found sibling %o', foundSibling);
        foundProc(foundSibling);
      })
      .catch(function (failReq) {
        const currentDate = new Date();
        if (y < currentDate.getFullYear()) {
          self.findTimeSibling(y, m, changeProc, foundProc);
        }
      });
  }

  setStart(s, sLink) {
    if (!this.startNav) {
      let ret = null;
      let t;
      if (window === top) {
        if (!s) {                       // Look for start induced by URI
          const uri = this.commonsService.getUri();
          for (let i = 0; i < this.starts.length; i++) {
            const st: Start = this.starts[i];
            const dataPos = uri.indexOf(st.dir);
            if (dataPos >= 0 && uri !== st.dir) {
              s = st.label;
              t = st.title;
              sLink = st.dir;
              if (st.css) {
                this.commonsService.loadCSS(st.css);
              }
              if (st.js) {
                this.commonsService.loadJS(st.js);
              }
              if (st.onLoad) {
                ret = st.onLoad;
              }
              break;
            }
          }
        }
        if (!t) {
          t = "D\xE9but";
        }
        this.startNav = new NavLink(s, sLink, t);
      }
      return ret;
    }
  }

  getContents() {
    return this.contents;
  }

  getContentsURL() {
    return this.contentsURL;
  }

  getStartNav() {
    return this.startNav;
  }
}

class HeadController {
  constructor($scope, $rootScope, $timeout, commonsService, langService, peopleService, timeService, navigationService, constantClass) {
    'use strict';

    const scrolled: HTMLElement = <HTMLElement>document.querySelector(".contents");
    const header: HTMLElement = <HTMLElement>document.querySelector('header');
    const nav = angular.element('nav');
    const text: HTMLElement = <HTMLElement>scrolled.querySelector('.text');
    const titleSection = {
      label: $scope.title,
      outlineLabel: $scope.title,
      id: "top",
      level: 0,
      elem: angular.element('#top')
    };
    let currentSection;

    const outline: HTMLElement = <HTMLElement>document.querySelector('.outline');

    function isNavLeft() {
      return nav[0].offsetHeight === (<HTMLElement>scrolled).offsetHeight;
    }

    function getNavHeight() {
      return isNavLeft() ? 0 : nav[0].offsetHeight;
    }

    $scope.getHeadingHeight = function () {
      return nav[0].offsetTop + getNavHeight();
    };

    function titleFromTime() {
      let title = timeService.getYear();
      if (title) {
        if (timeService.getTime().month) {
          title = timeService.monthName() + " " + title;
          const dayOfMonth = timeService.getDayOfMonth();
          if (dayOfMonth) {
            title = timeService.dayOfWeekName(timeService.getDayOfWeek()) + " " + dayOfMonth + " " + title;
          }
        }
      }
      return title;
    }

    function createNavElement(c) {
      let li = document.getElementsByClassName(c)[0];
      if (!li) {
        li = document.createElement("li");
        c = !(!c) ? constantClass + " " + c : constantClass;
        li.setAttribute("class", c);
        navigationService.getNavList().appendChild(li);
      }
      return li;
    }

    function titleFromPeople() {
      let title;
      const p = peopleService.getPeople();
      if (p) {
        title = p.toString();
      }
      return title;
    }

    function titleFromURI() {
      let title;
      const uri = commonsService.getUri();
      const ls = uri.lastIndexOf("/");
      const htmlExt = uri.lastIndexOf(".html");
      if (htmlExt > 0 && uri.substring(htmlExt - 5, htmlExt) !== "index") {
        title = uri.substring(ls + 1, htmlExt);
      } else if (ls < uri.length - 1) {
        let ps = ls - 1;
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

    let searchResults;

    function updateSearchPos(triggerSelector) {
      const trigger = document.querySelector(triggerSelector);
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
        (<HTMLElement>outline).style.top = '0';
      } else {
        const trigger = document.querySelector(triggerSelector);
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
      const isNavCollapsed = nav.hasClass('collapsed');
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
      let toSelectElem;
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
      let lastSec = titleSection;
      let newSec;
      if ($scope.sections.length) {
        for (let i = 0; i < $scope.sections.length; i++) {
          newSec = $scope.sections[i];
          let found;
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
    } else if ((<any>window).attachEvent) {    // Internet Explorer 5 or above
      (<any>window).attachEvent("onresize", onResize);
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
        const onLoadDo = navigationService.setStart(s, sLink);
        if (window === top) {
          navigationService.addRel(sLink, "Start");
        }
//    if (onLoadDo) domLoadProcs.push(onLoadDo);
        navigationService.setContents(c, cLink);
        navigationService.setPrev(p, pLink);
        navigationService.setNext(n, nLink);
      }

      navInit(s, sLink, c, cLink, p, pLink, n, nLink);

      const startNav = navigationService.getStartNav();
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
      const alternateClass = "alternate";

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
      const easingPattern = function (percent) {
        return percent < 0.5 ? 4 * percent * percent * percent : (percent - 1) * (2 * percent - 2) * (2 * percent - 2) + 1; // acceleration until halfway, then deceleration
      };
      // Get the height of a fixed header if one exists
      const headerHeight = $scope.getHeadingHeight();

      // Calculate how far to scroll
      const startLocation = scrolled.scrollTop;
      const getEndLocation = function (anchor) {
        let location = 0;
        if (anchor.offsetParent) {
          do {
            location += anchor.offsetTop;
            anchor = anchor.offsetParent;
          } while (anchor);
        }
        location = location - headerHeight;
        return location >= 0 ? location : 0;
      };
      const endLocation = getEndLocation(anchor);
      const distance = endLocation - startLocation;

      let runAnimation;
      // Function to stop the scrolling animation
      const stopAnimationIfRequired = function () {
        if (scrolled.scrollTop === endLocation) {
          cancelAnimationFrame(runAnimation);
        }
      };
      // Set the animation variables to 0/undefined.
      let timeLapsed = 0;
      let percentage, position;

      const animateScroll = function () {
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
      const anchor = document.getElementById(id);   // anchor.scrollIntoView(true, 'smooth');
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
  }
}

function handleUrlRedirect() {
  'use strict';
  return null;
  /*  var path = location.pathname;
   if (path.indexOf('index.new') < 0) {
   location.href = '/index.new.html?p=' + path;
   path = null;
   } else {
   path = location.search.substring(location.search.indexOf('?p=') + 3);
   }
   return path;*/
}

function pageContents(template) {
  'use strict';
  const startMark = '<div class="text">';
  const startIndex = template.indexOf(startMark);
  const endMark = '</div><!--text-->';
  const endIndex = template.indexOf(endMark);
  const templateContents = template.substring(startIndex + startMark.length, endIndex);
  return templateContents;
}

export default navModule => {
  var navModule = angular.module('rr0.nav', ['ngSanitize', 'ui.router', 'rr0.lang', 'rr0.people', 'rr0.time']);
  lang(navModule);
  people(navModule);
  time(navModule);
  return navModule
    .value('host', location.host)
    .constant('hiddenPos', '-100em')
    .config(function (/*$urlRouterProvider, */$stateProvider) {
      'use strict';
      $stateProvider
        .state('any', {
          url: '*path',
          views: {
            'textView': {
              templateProvider: function ($stateParams, $http) {
                const url = location.pathname;
                return $http.get(url).then(function (response) {
                  const template = response.data;
                  return pageContents(template);
                });
              },
              controller: function () {
                console.log('time controller');
              }
            }
          }
        })
        .state('page', {
          url: '/index.new.html?p =:path',
          templateUrl: function ($stateParams) {
            return $stateParams.path;
          },
          controller: function ($scope) {
            console.log('ok');
          }
        })
        .state('home', {
          url: '^/dist/home',
          views: {
            'textView': {
              templateUrl: './home.new.html',
              controller: function ($scope) {
                console.log('home controller');
              }
            }
          }
        })
        .state('time', {
          url: '^/dist/time',
          views: {
            'textView': {
              templateProvider: function ($stateParams, $http) {
                return $http.get('/time').then(function (response) {
                  const template = response.data;
                  return pageContents(template);
                });
              },
              controller: function () {
                console.log('time controller');
              }
            }
          }
        });
      /*  $urlRouterProvider.otherwise(function($injector, $location) {
       var path = $location.path(), normalized = path.toLowerCase();
       if (path !== normalized) {
       //instead of returning a new url string, I'll just change the $location.path directly so I don't have to worry about constructing a new url string and so a new state change is not triggered
       $location.replace().path(normalized);
       }
       });*/
    }).run(function ($state, $rootScope) {
      'use strict';
      $state.go('home')
        .then(val => {
          console.log('going home: ', val)
        })
        .catch(err => {
          console.log('error when going home: ', err)
        });
      /*    var page = handleUrl();
       if (page) {
       $state.go('page', {path:page}, {location:false});
       }*/
    })
    .filter('unsafe', ['$sce', function ($sce) {
      'use strict';
      return function (val) {
        return $sce.trustAsHtml(val);
      };
    }])
    .service('navigationService', NavService)
    .controller('HeadController', HeadController);
};
