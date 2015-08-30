function NavLink(l, url, t) {
  this.label = l;
  this.link = url;
  this.title = t;
}

angular.module('rr0.nav')
  .service('navigationService', [
    '$rootScope', '$q',
    'commonsService', 'netService', 'timeService', '$log',
    function ($rootScope, $q, commonsService, netService, timeService, $log) {
      'use strict';

      var startNav;
      var contents, contentsURL;
      var prev, prevLink;
      var next, nextLink;

      var navList;

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
            label: "<i class='fa fa-sitemap'></i> <span class='label'>Organisations</span></span>",
            title: "Organisations"
          },
          {
            dir: "/politique/",
            label: "Politique"
          }
        ];

      return {
        currentLevel: 1,
        getNavList: function () {
          if (!navList) {
            var n = document.getElementsByTagName("nav")[0];
            navList = n.querySelector('ul');
          }
          return navList;
        },
        addRel: function (l, t) {
          var rel = document.createElement("link");
          rel.setAttribute("rel", t);
          rel.setAttribute("href", l);
          org.addToHead(rel);
        },
        nextFromTime: function (n) {
          var t = timeService.getTime();
          var self = this;
          var lookAfter = function (y, m) {
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
          return $q(function (resolve, reject) {
            self.findTimeSibling(t.year, t.month, lookAfter, resolve);
          });
        },
        previousFromTime: function () {
          var t = timeService.getTime();
          var self = this;
          var lookBefore = function (y, m) {
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
          return $q(function (resolve, reject) {
            self.findTimeSibling(t.year, t.month, lookBefore, resolve);
          });
        },
        setPrev: function (p, pLink) {
          if (pLink) {
            prevLink = pLink;
          }
          if (p) {
            prev = p;
          }
        },
        setNext: function (n, nLink) {
          if (n) {
            next = n;
          }
          if (nLink) {
            nextLink = nLink;
          }
        },
        getNext: function () {
          var nn;
          if (!nextLink && !next) {
            if (timeService.getYear()) {
              nn = this.nextFromTime(next);
            }
          }
          if (!nn) {
            if (next && nextLink) {
              nn = {
                label: next,
                link: nextLink
              };
            } else {
              nn = $q(function (resolve, reject) {
                reject();
              });
            }
          }
          return $q.when(nn);
        },
        /**
         * Determine the "previous" link, if any.
         *
         * @returns {Promise}
         */
        getPrev: function () {
          var pp;
          var previousSpecified = prevLink || prev;
          if (!previousSpecified) {
            if (timeService.getYear()) {          // If no previous link has been specified, try to devise previous from context time.
              pp = this.previousFromTime();
            }
          }
          if (!pp) {
            if (prev && prevLink) {
              pp = {
                label: prev,
                link: prevLink
              };
            } else {
              pp = $q(function (resolve, reject) {
                reject();
              });
            }
          }
          return $q.when(pp);
        },
        getPrevLink: function () {
          return prevLink;
        },
        getNextLink: function () {
          return nextLink;
        },
        addStart: function (s) {
          starts.push(s);
        },
        setContents: function (c, cLink) {
          if (!contents) {
            contents = c;
            contentsURL = cLink;
            // addRel(contentsURL, "Contents");
          }
        },

        /**
         * Find some time-dedicated page near a given time.
         *
         * @param oy The starting year.
         * @param m The starting month.
         * @param changeProc How to determine the next date to look for.
         * @param foundProc What to do once a sibling page has been found.
         */
        findTimeSibling: function (oy, m, changeProc, foundProc) {
          $log.debug('Looking for time sibling of %o-%o', oy, m);
          var ret = changeProc(oy, m);
          var y = ret.y;
          var l = timeService.yearLink(y);
          m = ret.m;
          var label = y;
          var self = this;
          if (m) {
            self.setContents(oy, timeService.yearLink(oy));
            l += "/" + commonsService.zero(m);
            label = timeService.monthName(m);
            if (y !== timeService.getTime().year) {
              label += ' ' + y;
            }
          } else {
            var cLink = timeService.yearLink(oy, true);
            if (cLink !== commonsService.getUri()) {
              this.setContents(~~(oy / 10) + "0s", cLink);
            }
          }
          netService.onExists(l)
            .success(function (req) {
              var foundSibling = {label: label, link: l};
              $log.debug('Found sibling %o', foundSibling);
              foundProc(foundSibling);
            }).error(function (failReq) {
              var currentDate = new Date();
              if (y < currentDate.getFullYear()) {
                self.findTimeSibling(y, m, changeProc, foundProc);
              }
            });
        },
        setStart: function (s, sLink) {
          if (!startNav) {
            var ret = null;
            var t;
            if (window === top) {
              if (!s) {                       // Look for start induced by URI
                var uri = commonsService.getUri();
                for (var i = 0; i < starts.length; i++) {
                  var st = starts[i];
                  var dataPos = uri.indexOf(st.dir);
                  if (dataPos >= 0 && uri !== st.dir) {
                    s = st.label;
                    t = st.title;
                    sLink = st.dir;
                    if (st.css) {
                      commonsService.loadCSS(st.css);
                    }
                    if (st.js) {
                      commonsService.loadJS(st.js);
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
              startNav = new NavLink(s, sLink, t);
            }
            return ret;
          }
        },
        getContents: function () {
          return contents;
        },
        getContentsURL: function () {
          return contentsURL;
        },
        getStartNav: function () {
          return startNav;
        }
      };
    }]);