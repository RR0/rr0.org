import people, {PeopleModule, PeopleService} from '../../people/people'
import time, {TimeModule, TimeService} from '../../time/time'
import common, {CommonModule, CommonService, org} from "../common"
import lang, {LangModule, LangService} from '../lang'
import net, {NetModule} from "../net"
import {titleScope, TitleScope} from "./rr0-title"

function NavLink(l, url, t) {
  this.label = l
  this.link = url
  this.title = t
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
  startNav: any
  contentsURL: any
  contents: any
  nextLink: any
  next: any
  prev: any
  prevLink: any
  navList: any
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
    ]
  currentLevel = 1

  constructor(private commonsService, private netService, private timeService) {
  }

  getNavList() {
    if (!this.navList) {
      const n = document.getElementsByTagName("nav")[0]
      this.navList = n.querySelector('ul')
    }
    return this.navList
  }

  addRel(l?, t?) {
    const rel = document.createElement("link")
    rel.setAttribute("rel", t)
    rel.setAttribute("href", l)
    org.addToHead(rel)
  }

  nextFromTime(n) {
    const t = this.timeService.getTime()
    const self = this
    const lookAfter = function (y, m) {
      if (m) {
        if (m < 12) {
          m++                    // Before December?
          return {y: y, m: m}    // Return date with incremented month
        } else {
          m = 1                  // January
        }
      }
      y++
      return {y: y, m: m}        // Return date with incremented year
    }
    return new Promise((resolve, reject) => {
      self.findTimeSibling(t.year, t.month, lookAfter, resolve)
    })
  }

  previousFromTime() {
    const t = this.timeService.getTime()
    const self = this
    const lookBefore = function (y, m) {
      if (m) {
        if (m > 1) {            // Month above february?
          m--
          return {y: y, m: m}  // Return date with decremented month
        } else {
          m = 12               // December
        }
      }
      y--                      // Return date with decremented year
      return {y: y, m: m}
    }
    return new Promise((resolve, reject) => {
      self.findTimeSibling(t.year, t.month, lookBefore, resolve)
    })
  }

  setPrev(p?, pLink?) {
    if (pLink) {
      this.prevLink = pLink
    }
    if (p) {
      this.prev = p
    }
  }

  setNext(n?, nLink?) {
    if (n) {
      this.next = n
    }
    if (nLink) {
      this.nextLink = nLink
    }
  }

  getNext() {
    let nn
    if (!this.nextLink && !this.next) {
      if (this.timeService.getYear()) {
        nn = this.nextFromTime(this.next)
      }
    }
    if (!nn) {
      if (this.next && this.nextLink) {
        nn = {
          label: this.next,
          link: this.nextLink
        }
      } else {
        nn = new Promise((resolve, reject) => {
          reject()
        })
      }
    }
    return nn.then ? nn : Promise.resolve(nn)
  }

  /**
   * Determine the "previous" link, if any.
   *
   * @returns {Promise}
   */
  getPrev() {
    let pp
    let previousSpecified = this.prevLink || this.prev
    if (!previousSpecified) {
      if (this.timeService.getYear()) {          // If no previous link has been specified, try to devise previous from context time.
        pp = this.previousFromTime()
      }
    }
    if (!pp) {
      if (this.prev && this.prevLink) {
        pp = {
          label: this.prev,
          link: this.prevLink
        }
      } else {
        pp = new Promise((resolve, reject) => {
          reject()
        })
      }
    }
    return pp.then ? pp : Promise.resolve(pp)
  }

  getPrevLink() {
    return this.prevLink
  }

  getNextLink() {
    return this.nextLink
  }

  addStart(s) {
    this.starts.push(s)
  }

  setContents(c?, cLink?) {
    if (!this.contents) {
      this.contents = c
      this.contentsURL = cLink
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
    org.log('Looking for time sibling of %o-%o', oy, m)
    const ret = changeProc(oy, m)
    const y = ret.y
    let l = this.timeService.yearLink(y)
    m = ret.m
    let label = y
    const self = this
    if (m) {
      self.setContents(oy, this.timeService.yearLink(oy))
      l += "/" + this.commonsService.zero(m)
      label = this.timeService.monthName(m)
      if (y !== this.timeService.getTime().year) {
        label += ' ' + y
      }
    } else {
      const cLink = this.timeService.yearLink(oy, true)
      if (cLink !== this.commonsService.getUri()) {
        this.setContents(~~(oy / 10) + "0s", cLink)
      }
    }
    this.netService.onExists(l)
      .then(function (req) {
        const foundSibling = {label: label, link: l}
        org.log('Found sibling %o', foundSibling)
        foundProc(foundSibling)
      })
      .catch(function (failReq) {
        const currentDate = new Date()
        if (y < currentDate.getFullYear()) {
          self.findTimeSibling(y, m, changeProc, foundProc)
        }
      })
  }

  setStart(s?, sLink?) {
    if (!this.startNav) {
      let ret = null
      let t
      if (window === top) {
        if (!s) {                       // Look for start induced by URI
          const uri = this.commonsService.getUri()
          for (let i = 0; i < this.starts.length; i++) {
            const st: Start = this.starts[i]
            const dataPos = uri.indexOf(st.dir)
            if (dataPos >= 0 && uri !== st.dir) {
              s = st.label
              t = st.title
              sLink = st.dir
              if (st.css) {
                this.commonsService.loadCSS(st.css)
              }
              if (st.js) {
                this.commonsService.loadJS(st.js)
              }
              if (st.onLoad) {
                ret = st.onLoad
              }
              break
            }
          }
        }
        if (!t) {
          t = "D\xE9but"
        }
        this.startNav = new NavLink(s, sLink, t)
      }
      return ret
    }
  }

  getContents() {
    return this.contents
  }

  getContentsURL() {
    return this.contentsURL
  }

  getStartNav() {
    return this.startNav
  }
}

export class HeadController {
  ps = []
  sections = []
  searchResults
  currentSection
  alternate: any
  header: HTMLElement
  scrolled: HTMLElement
  outline: HTMLElement
  titleUrl: string
  private ns = []
  private nav: HTMLElement
  private text: HTMLElement
  private readonly titleSection: {}

  constructor(private $scope: TitleScope, private commonsService: CommonService, private langService: LangService,
              private peopleService: PeopleService, private timeService: TimeService,
              private navigationService: NavService, private constantClass: string) {
    this.scrolled = <HTMLElement>document.querySelector(".contents")
    this.header = <HTMLElement>document.querySelector('header')
    this.nav = document.querySelector('nav')
    this.text = <HTMLElement>this.scrolled.querySelector('.text')
    this.titleSection = {
      label: $scope.title,
      outlineLabel: $scope.title,
      id: "top",
      level: 0,
      elem: document.querySelector('#top')
    }

    this.outline = <HTMLElement>document.querySelector('.outline')

    if (!$scope.title) {
      $scope.setTitle(commonsService.capitalizeFirstLetter("" + (this.titleFromTime() || this.titleFromPeople() || this.titleFromURI())))
    }

    const self = this

    this.scrolled.onscroll = function (event) {
      requestAnimationFrame(self.updateHeading)
    }

    if (window.addEventListener) {      // most non-IE browsers and IE9
      window.addEventListener("resize", this.onResize.bind(this), false)
    } else if ((<any>window).attachEvent) {    // Internet Explorer 5 or above
      (<any>window).attachEvent("onresize", this.onResize.bind(this))
    }

    this.init()

    setTimeout(function () {
      self.updateHeading()
      self.updatePos()
    })
  }

  sectionAdded(section) {
//            for (var i = 2; i < section.level; i++) {
//                section.label = '&nbsp;&nbsp;' + section.label;
//            }
    this.sections.push(section)
  }

  getHeadingHeight() {
    return nav[0].offsetTop + this.getNavHeight()
  }

  titleFromPeople() {
    let title
    const p = this.peopleService.getPeople()
    if (p) {
      title = p.toString()
    }
    return title
  }

  titleFromURI() {
    let title
    const uri = this.commonsService.getUri()
    const ls = uri.lastIndexOf("/")
    const htmlExt = uri.lastIndexOf(".html")
    if (htmlExt > 0 && uri.substring(htmlExt - 5, htmlExt) !== "index") {
      title = uri.substring(ls + 1, htmlExt)
    } else if (ls < uri.length - 1) {
      let ps = ls - 1
      while (uri.charAt(ps) !== '/') {
        ps--
      }
      title = uri.substring(ps + 1, ls).toUpperCase()  // Accronym assumed
    } else {
      title = uri.substring(ls + 1)
    }
    return title
  }

  isFramed() {
    return window !== top
  }

  initPeople(p) {
    this.peopleService.setPeopleName(p)
  }

  addNavElement(c) {
    return this.createNavElement(c)
  }

  titleClick() {
    if (this.isOutlineVisible()) {
      this.outline.classList.add('clicked')
    } else if (this.outline) {
      this.outline.classList.remove('clicked')
    }
  }

  init(s?, sLink?, c?, cLink?, p?, pLink?, n?, nLink?) {

    const self = this

    function navInit(s?, sLink?, c?, cLink?, p?, pLink?, n?, nLink?) {
      const onLoadDo = self.navigationService.setStart(s, sLink)
      if (window === top) {
        self.navigationService.addRel(sLink, "Start")
      }
//    if (onLoadDo) domLoadProcs.push(onLoadDo);
      self.navigationService.setContents(c, cLink)
      self.navigationService.setPrev(p, pLink)
      self.navigationService.setNext(n, nLink)
    }

    navInit(s, sLink, c, cLink, p, pLink, n, nLink)

    const startNav = this.navigationService.getStartNav()
    if (window === top) {
      this.addPrev(startNav, startNav.title, "start")
      this.addPrev({
        label: '' + this.navigationService.getContents(),
        link: this.navigationService.getContentsURL()
      }, "Table des mati\xE8res", "toc")
      this.navigationService.getPrev().then(function (pp) {
        self.addPrev(pp, "Pr\xE9c\xE9dent", "prev")
      })
      this.navigationService.getNext().then(function (nn) {
        self.addNext(nn, "Suivant", "next")
      })
    } else {
      //        org.rr0.contentsZone.style.boxShadow = "0.4em 0.4em 0,8em rgb(200,200,200) inset";
//        org.rr0.contentsZone.style.backgroundColor = "#e2e2e8";
    }

    self.alternate = null
    const alternateClass = "alternate"

    this.createNavElement(alternateClass)
    this.checkAlt().then(() => console.log("checkalt done"))
  }

  sectionClick(section) {
    scrollTo(section.id)
  }

  initAuthor(a, aLink, c, cLink) {
    this.peopleService.addAuthor(a, aLink, c, cLink)
  }

  private setAlternates(innerHtml) {
    this.alternate = innerHtml
  }

  private async checkAlt() {
    if (!this.alternate) {
      this.alternate = " "
      await this.langService.checkAlternate(this.commonsService.getUri(),
        (original) => {
          this.setAlternates(original ? "<a href='" + original + "'>&#8668; Texte d'origine</a>" : "&#9888; Ce" +
            " document est une traduction")
        },
        (translation) => {
          this.setAlternates(translation ? "<a href='" + translation + "'>&#8669; Traduction fran\xE7aise</a>" : "&#9888; Pas de traduction disponible")
        })
    }
  }

  private isNavLeft() {
    return nav[0].offsetHeight === (<HTMLElement>this.scrolled).offsetHeight
  }

  private getNavHeight() {
    return this.isNavLeft() ? 0 : nav[0].offsetHeight
  }

  private titleFromTime() {
    let title = this.timeService.getYear()
    if (title) {
      if (this.timeService.getTime().month) {
        title = this.timeService.monthName() + " " + title
        const dayOfMonth = this.timeService.getDayOfMonth()
        if (dayOfMonth) {
          title = this.timeService.dayOfWeekName(this.timeService.getDayOfWeek()) + " " + dayOfMonth + " " + title
        }
      }
    }
    return title
  }

  private createNavElement(c) {
    let li = document.getElementsByClassName(c)[0]
    if (!li) {
      li = document.createElement("li")
      c = !(!c) ? this.constantClass + " " + c : this.constantClass
      li.setAttribute("class", c)
      this.navigationService.getNavList().appendChild(li)
    }
    return li
  }

  private isOutlineVisible() {
    return this.outline && this.outline.style.height !== '0px'
  }

  private onResize(event) {
    this.scrolled.onscroll(event)
    this.updatePos()
  }

  private smoothScroll(anchor, duration) {
    const easingPattern = function (percent) {
      return percent < 0.5 ? 4 * percent * percent * percent : (percent - 1) * (2 * percent - 2) * (2 * percent - 2) + 1 // acceleration until halfway, then deceleration
    }
    // Get the height of a fixed header if one exists
    const headerHeight = this.getHeadingHeight()

    // Calculate how far to scroll
    const startLocation = this.scrolled.scrollTop
    const getEndLocation = function (anchor) {
      let location = 0
      if (anchor.offsetParent) {
        do {
          location += anchor.offsetTop
          anchor = anchor.offsetParent
        } while (anchor)
      }
      location = location - headerHeight
      return location >= 0 ? location : 0
    }
    const endLocation = getEndLocation(anchor)
    const distance = endLocation - startLocation

    const self = this
    let runAnimation
    // Function to stop the scrolling animation
    const stopAnimationIfRequired = function () {
      if (self.scrolled.scrollTop === endLocation) {
        cancelAnimationFrame(runAnimation)
      }
    }
    // Set the animation variables to 0/undefined.
    let timeLapsed = 0
    let percentage, position

    const animateScroll = function () {
      runAnimation = requestAnimationFrame(animateScroll)
      timeLapsed += 16
      percentage = timeLapsed / duration
      percentage = percentage > 1 ? 1 : percentage
      position = startLocation + distance * easingPattern(percentage)
      self.scrolled.scrollTop = position
      stopAnimationIfRequired()
    }
    // Loop the animation function
    animateScroll()
  }

  private scrollTo(id) {
    const anchor = document.getElementById(id)   // anchor.scrollIntoView(true, 'smooth');
    //hideOutline();
    this.smoothScroll(anchor, 500)
  }

  private addPrev(pp, tt, c) {
    this.ps.push({
      label: this.commonsService.capitalizeFirstLetter("" + pp.label),
      link: pp.link,
      title: tt,
      style: c
    })
  }

  private addNext(nn, tt, c) {
    this.ns.push({
      label: this.commonsService.capitalizeFirstLetter("" + nn.label),
      link: nn.link,
      title: tt,
      style: c
    })
  }

  private isHeaderVisible() {
    return window === top && this.scrolled.scrollTop <= this.header.offsetHeight
  }

  private setOutline(outlineHTML) {
    this.outline = outlineHTML
  }

  private updateSearchPos(triggerSelector) {
    const trigger = document.querySelector(triggerSelector)
    if (trigger) {
      if (!this.searchResults) {
        this.searchResults = document.querySelector('.search-result')
      }
      if (this.searchResults) {
        this.searchResults.style.top = (trigger.offsetTop + trigger.offsetHeight) + 'px'
        this.searchResults.style.left = ""
      }
    }
  }

  private updateOutlinePos(triggerSelector) {
    if (this.isNavLeft()) {
      (<HTMLElement>this.outline).style.top = '0'
    } else {
      const trigger = document.querySelector(triggerSelector)
      if (trigger && this.outline) {
        this.outline.style.top = (trigger.offsetTop + trigger.offsetHeight) + 'px'
      }
    }
  }

  private updatePos() {
    this.updateOutlinePos('.outline-title')
    this.updateSearchPos('.search form')
  }

  private updateHeading() {
    const isNavCollapsed = nav.classList.contains('collapsed')
    if (this.isHeaderVisible()) {
      if (isNavCollapsed || !this.outline) {
        nav.classList.remove('collapsed')
        this.text.style.paddingTop = '0'
        // if (outline && outline.childElementCount > 0) {
        this.setOutline('Sommaire')
        /* } else {
         setOutline('');
         }*/
        this.selectOutline(null)
        this.updatePos()
      }
    } else {
      if (isNavCollapsed) {
        this.updateOutline()
      } else {
        nav.classList.add('collapsed')
        this.text.style.paddingTop = this.getNavHeight() + 'px'
        this.setOutline(this.$scope.title)
        this.selectOutline(this.titleSection)
        this.updatePos()
      }
    }
  }

  private unselect(sec) {
    if (sec) {
      sec.removeClass('hovered')
    }
  }

  private select(toSelect) {
    let toSelectElem
    if (toSelect) {
      toSelectElem = document.querySelector("#out-" + toSelect.id)
      /*if (currentSection && toSelectElem[0] === currentSection[0]) {
       return;
       }*/
      toSelectElem.addClass('hovered')
    }
    return toSelectElem
  }

  private selectOutline(newSelection) {
    this.unselect(this.currentSection)
    this.currentSection = this.select(newSelection)
  }

  private updateOutline() {
    let lastSec = this.titleSection
    let newSec
    if (this.sections.length) {
      for (let i = 0; i < this.sections.length; i++) {
        newSec = this.sections[i]
        let found
        found = this.scrolled.scrollTop > newSec.elem[0].offsetTop
        if (lastSec) {
          if (!found) {
            this.selectOutline(lastSec)
            return
          }
        }
        lastSec = newSec
      }
      this.selectOutline(newSec)
    }
  }
}

function handleUrlRedirect() {
  'use strict'
  return null
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
  'use strict'
  const startMark = '<div class="text">'
  const startIndex = template.indexOf(startMark)
  const endMark = '</div><!--text-->'
  const endIndex = template.indexOf(endMark)
  const templateContents = template.substring(startIndex + startMark.length, endIndex)
  return templateContents
}

export class NavModule {
  host = location.host
  hiddenPos = '-100em'
  readonly service: NavService
  readonly headController: HeadController

  constructor(common: CommonModule, lang: LangModule, people: PeopleModule, time: TimeModule, net: NetModule, $stateProvider, $state) {
    $stateProvider
      .state('any', {
        url: '*path',
        views: {
          'textView': {
            templateProvider: function ($stateParams, $http) {
              const url = location.pathname
              return $http.get(url).then(function (response) {
                const template = response.data
                return pageContents(template)
              })
            },
            controller: function () {
              console.log('time controller')
            }
          }
        }
      })
      .state('page', {
        url: '/index.new.html?p =:path',
        templateUrl: function ($stateParams) {
          return $stateParams.path
        },
        controller: function ($scope) {
          console.log('ok')
        }
      })
      .state('home', {
        url: '^/dist/home',
        views: {
          'textView': {
            templateUrl: './home.new.html',
            controller: function ($scope) {
              console.log('home controller')
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
                const template = response.data
                return pageContents(template)
              })
            },
            controller: function () {
              console.log('time controller')
            }
          }
        }
      })
    /*  $urlRouterProvider.otherwise(function($injector, $location) {
     var path = $location.path(), normalized = path.toLowerCase();
     if (path !== normalized) {
     //instead of returning a new url string, I'll just change the $location.path directly so I don't have to worry about constructing a new url string and so a new state change is not triggered
     $location.replace().path(normalized);
     }
     });*/
    $state.go('home')
      .then(val => {
        console.log('going home: ', val)
      })
      .catch(err => {
        console.log('error when going home: ', err)
      })
    this.service = new NavService(common.service, net.service, time.service)
    this.headController = new HeadController(titleScope, common.service, lang.service, people.service, time.service, this.service, common.constantClass)
  }
}

const nav = new NavModule(common, lang, people, time, net, null, null)
export default nav
