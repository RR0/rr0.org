import {Injectable} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

import {CommonsService, org} from '../Commons.service';
import {NetService} from '../Net.service';
import {TimeService} from '../time/Time.service';
import {Router} from '@angular/router';

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

@Injectable()
export class NavService {
  startNav: any;
  contentsURL: any;
  contents: any;
  nextLink: any;
  next: any;
  prev: any;
  prevLink: any;
  navList: any;

  title = '';
  author = '';
  copyright = '';

  private currentLevel = 1;

  starts: Start[] =
    [
      {
        dir: '/tech/info/',
        label: 'Informatique',
        css: '/js/pretty/prettify.css',
        js: '/js/pretty/prettify.js',
        onLoad: 'prettyPrint()'
      },
      {
        dir: '/science/crypto/ufo/',
        label: 'Ufologie'
      },
      {
        dir: '/science/crypto/zoo/',
        label: 'Cryptozoologie'
      },
      {
        dir: '/science/crypto/archeo/',
        label: 'Cryptoarch\xE9ologie'
      },
      {
        dir: '/science/para/psi/',
        label: 'Parapsychologie'
      },
      {
        dir: '/science/para/',
        label: 'Parasciences'
      },
      {
        dir: '/science/crypto/',
        label: 'Cryptosciences'
      },
      {
        dir: '/science/sur/fantome',
        label: 'Fant\xF4mes'
      },
      {
        dir: '/science/sur/',
        label: 'Surnaturel'
      },
      {
        dir: '/science/',
        label: 'Science'
      },
      {
        dir: '/tech/',
        label: 'Technique'
      },
      {
        dir: '/croyance/conspirationnisme/',
        label: 'Conspirationnisme'
      },
      {
        dir: '/croyance/',
        label: 'Croyance'
      },
      {
        dir: '/org/',
        label: '<i class=\'fa fa-sitemap\'></i> <span class=\'label\'>Organisations</span></span>',
        title: 'Organisations'
      },
      {
        dir: '/politique/',
        label: 'Politique'
      }
    ];

  constructor(private commonsService: CommonsService, private netService: NetService, private timeService: TimeService,
              private titleService: Title, private metaService: Meta, private router: Router) {
    /*router.events.subscribe((event: Event) => {
        console.log('event', event);
      if (event instanceof NavigationStart) {
        console.log('navstart', event);
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });*/
  }

  setTitle(newTitle: string) {
    this.title = newTitle;
    this.titleService.setTitle(this.title);
  }

  getNavList() {
    if (!this.navList) {
      const n = document.getElementsByTagName('nav')[0];
      this.navList = n.querySelector('ul');
    }
    return this.navList;
  }

  addRel(l: string, t: string) {
    const rel = document.createElement('link');
    rel.setAttribute('rel', t);
    rel.setAttribute('href', l);
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
    const previousSpecified = this.prevLink || this.prev;
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
    console.debug('Looking for time sibling of %o-%o', oy, m);
    const ret = changeProc(oy, m);
    const y = ret.y;
    let l = this.timeService.yearLink(y);
    m = ret.m;
    let label = y;
    const self = this;
    if (m) {
      self.setContents(oy, this.timeService.yearLink(oy));
      l += '/' + this.commonsService.zero(m);
      label = this.timeService.monthName(m);
      if (y !== this.timeService.getTime().year) {
        label += ' ' + y;
      }
    } else {
      const cLink = this.timeService.yearLink(oy, true);
      if (cLink !== this.commonsService.getUri()) {
        this.setContents(~~(oy / 10) + '0s', cLink);
      }
    }
    this.netService.onExists(l)
      .subscribe(req => {
        const foundSibling = {label: label, link: l};
        console.debug('Found sibling %o', foundSibling);
        foundProc(foundSibling);
      }, failReq => {
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
          t = 'D\xE9but';
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
