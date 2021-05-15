import common, {CommonModule, CommonService, Context} from "../common"
import lang, {LangModule, LangService} from '../lang'
import {titleScope, TitleScope} from "./rr0-title"
import {AnchorDirective} from "../rr0-a.directive"
import {Moment} from "../../time/time"

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
  prevHandlers: ((t: Moment, nextLink, next) => {})[] = []
  nextHandlers: ((t: Moment, nextLink, next) => {})[] = []

  constructor(private commonsService: CommonService, private root: ParentNode) {
  }

  getNavList() {
    if (!this.navList) {
      const n = this.root.querySelector("nav")
      this.navList = n.querySelector('ul')
    }
    return this.navList
  }

  addRel(l?, t?) {
    const rel = document.createElement("link")
    rel.setAttribute("rel", t)
    rel.setAttribute("href", l)
    common.service.addToHead(rel)
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

  async getNext(context: Context) {
    let nn
    if (!this.nextLink && !this.next) {
      for (let nextHandler of this.nextHandlers) {
        nn = nextHandler(context.time, this.nextLink, this.next)
        if (nn) {
          break
        }
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
    return nn
  }

  /**
   * Determine the "previous" link, if any.
   *
   * @returns {Promise}
   */
  getPrev(context: Context) {
    let pp
    let previousSpecified = this.prevLink || this.prev
    if (!previousSpecified) {
      for (let nextHandler of this.prevHandlers) {
        pp = nextHandler(context.time, this.prevLink, this.prev)
        if (pp) {
          break
        }
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
  titleHandlers = [
    this.titleFromURI.bind(this)
  ]
  private ns = []
  private navEl: HTMLElement
  private readonly titleSection: {}

  constructor(private $scope: TitleScope, private commonsService: CommonService, private langService: LangService,
              private navigationService: NavService, private constantClass: string, private root: ParentNode) {
    const scope = this.$scope
    this.scrolled = <HTMLElement>root.querySelector(".contents")
    this.header = <HTMLElement>root.querySelector('header')
    this.navEl = root.querySelector('nav')
    this.titleSection = {
      label: scope.title,
      outlineLabel: scope.title,
      id: "top",
      level: 0,
      elem: root.querySelector('#top')
    }

    this.outline = <HTMLElement>root.querySelector('.outline')

    if (!scope.title) {
      let titleValues = ""
      for (const titleHandler of this.titleHandlers) {
        if (!titleValues) {
          titleValues = titleHandler()
        }
      }
      const title = this.commonsService.capitalizeFirstLetter(titleValues)
      scope.setTitle(title)
    }

    const self = this

    this.scrolled.onscroll = (event) => {
      requestAnimationFrame(self.updateHeading)
    }

    if (window.addEventListener) {      // most non-IE browsers and IE9
      window.addEventListener("resize", this.onResize.bind(this), false)
    } else if ((<any>window).attachEvent) {    // Internet Explorer 5 or above
      (<any>window).attachEvent("onresize", this.onResize.bind(this))
    }
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

  /*initPeople(p) {
    this.peopleService.setPeopleName(p)
  }*/

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

  init(context: Context, s?, sLink?, c?, cLink?, p?, pLink?, n?, nLink?) {

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
      this.navigationService.getPrev(context).then(function (pp) {
        self.addPrev(pp, "Pr\xE9c\xE9dent", "prev")
      })
      this.navigationService.getNext(context).then(function (nn) {
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

    this.updateHeading()
    this.updatePos()
  }

  sectionClick(section) {
    scrollTo(section.id)
  }

  /*initAuthor(a, aLink, c, cLink) {
    this.peopleService.addAuthor(a, aLink, c, cLink)
  }*/

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
    return this.navEl.offsetHeight === (<HTMLElement>this.scrolled).offsetHeight
  }

  private getNavHeight() {
    return this.isNavLeft() ? 0 : nav[0].offsetHeight
  }

  private createNavElement(c) {
    let li = this.root.querySelector(c)
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
    const trigger = this.root.querySelector(triggerSelector)
    if (trigger) {
      if (!this.searchResults) {
        this.searchResults = this.root.querySelector('.search-result')
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
      const trigger = this.root.querySelector(triggerSelector)
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
    const isNavCollapsed = this.navEl.classList.contains('collapsed')
    const text = <HTMLElement>this.scrolled.querySelector('.text')
    if (this.isHeaderVisible()) {
      if (isNavCollapsed || !this.outline) {
        this.navEl.classList.remove('collapsed')
        text.style.paddingTop = '0'
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
        this.navEl.classList.add('collapsed')
        text.style.paddingTop = this.getNavHeight() + 'px'
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
      toSelectElem = this.root.querySelector("#out-" + toSelect.id)
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

  constructor(common: CommonModule, lang: LangModule, private root: ParentNode) {
    this.service = new NavService(common.service, root)
    common.directives.push(new AnchorDirective(this.host))
  }

  _headController: HeadController

  get headController() {
    if (!this._headController) {
      this._headController = new HeadController(titleScope, common.service, lang.service, this.service, common.service.constantClass, this.root)
    }
    return this._headController
  }
}

const nav = new NavModule(common, lang, document)
export default nav
