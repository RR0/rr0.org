import {Section} from "nav/rr0-outline"
import {TitleScope} from "nav/rr0-title"
import {CommonService, Context} from "common"
import {LangService} from "lang"
import {NavLink, NavService} from "./nav"

export class HeadController {
  ps = []
  sections: Section[] = []
  searchResults
  currentSection: HTMLElement
  alternate: any
  header: HTMLElement
  scrolled: HTMLElement
  outlineEl: HTMLElement
  titleUrl: string
  titleHandlers = [
    this.titleFromURI.bind(this)
  ]
  private ns = []
  private navEl: HTMLElement
  private titleSection: Section
  private outline: string
  private $scope: TitleScope

  constructor(private commonsService: CommonService, private langService: LangService, private navigationService: NavService,
              private constantClass: string, private root: ParentNode) {
    this.scrolled = <HTMLElement>root.querySelector(".contents")
    this.header = <HTMLElement>root.querySelector('header')
    this.navEl = root.querySelector('nav')
    this.outlineEl = <HTMLElement>root.querySelector('.outline')
    this.scrolled.onscroll = (_event) => {
      requestAnimationFrame(() => this.updateHeading())
    }
    if (window.addEventListener) {      // most non-IE browsers and IE9
      window.addEventListener("resize", this.onResize.bind(this), false)
    } else if ((<any>window).attachEvent) {    // Internet Explorer 5 or above
      (<any>window).attachEvent("onresize", this.onResize.bind(this))
    }
  }

  setTitleScope(scope: TitleScope) {
    this.$scope = scope
    this.titleSection = {
      label: scope.title,
      outlineLabel: scope.title,
      id: "top",
      level: 0,
      elem: this.root.querySelector('#top')
    }
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
  }

  sectionAdded(section: Section) {
//            for (var i = 2; i < section.level; i++) {
//                section.label = '&nbsp;&nbsp;' + section.label;
//            }
    this.sections.push(section)
    const outlineEl = document.querySelector(".outline")
    outlineEl.innerHTML = ""
    for (let i = 0; i < this.sections.length; i++) {
      const sec = this.sections[i]
      const item = document.createElement("li")
      const id = sec.id
      item.innerHTML = `<a data-ng-href="#${id}" id="out-${id}">${sec.outlineLabel}</span></a>`
      item.className = "constant"
      item.tabIndex = 100 + i
      item.onclick = () => this.sectionClick(sec)
      outlineEl.append(item)
    }
  }

  getHeadingHeight(): number {
    return this.navEl.offsetTop + this.getNavHeight()
  }

  titleFromURI(): string {
    let title: string
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

  isFramed(): boolean {
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
      this.outlineEl.classList.add('clicked')
    } else if (this.outlineEl) {
      this.outlineEl.classList.remove('clicked')
    }
  }

  async init(context: Context, s?, sLink?, c?, cLink?, p?, pLink?, n?, nLink?) {

    const self = this

    function navInit(s?, sLink?, c?, cLink?, p?, pLink?, n?, nLink?) {
      const onLoadDo = self.navigationService.setStart(s, sLink)
      if (!self.isFramed()) {
        self.navigationService.addRel(sLink, "Start")
      }
//    if (onLoadDo) domLoadProcs.push(onLoadDo);
      self.navigationService.setContents(c, cLink)
      self.navigationService.setPrev(p, pLink)
      self.navigationService.setNext(n, nLink)
    }

    navInit(s, sLink, c, cLink, p, pLink, n, nLink)

    const startNav = this.navigationService.getStartNav()
    if (!this.isFramed()) {
      if (startNav) {
        this.addPrev(startNav, startNav.title, "start")
      }
      this.addPrev({
        label: this.navigationService.getContents(),
        link: this.navigationService.getContentsURL()
      }, "Table des mati\xE8res", "toc")
      const pp = await this.navigationService.getPrev(context)
      if (pp) {
        this.addPrev(pp, "Pr\xE9c\xE9dent", "prev")
      }
      const nn = await this.navigationService.getNext(context)
      if (nn) {
        this.addNext(nn, "Suivant", "next")
      }
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
    this.scrollTo(section.id)
  }

  /*initAuthor(a, aLink, c, cLink) {
    this.peopleService.addAuthor(a, aLink, c, cLink)
  }*/

  private setAlternates(innerHtml: string) {
    this.alternate = innerHtml
    const altEl = this.root.querySelector(".alternate") as HTMLElement
    altEl.innerHTML = innerHtml
  }

  private async checkAlt() {
    if (!this.alternate) {
      this.alternate = " "
      await this.langService.checkAlternate(this.commonsService.getUri(),
        (original) => {
          this.setAlternates(original ? `<a href="${original}">&#8668; Texte d'origine</a>` : `&#9888; Ce document est une traduction`)
        },
        (translation) => {
          this.setAlternates(translation ? `<a href="${translation}">&#8669; Traduction fran\xE7aise</a>` : "&#9888; Pas de traduction disponible")
        })
    }
  }

  private isNavLeft() {
    return this.navEl.offsetHeight === (<HTMLElement>this.scrolled).offsetHeight
  }

  private getNavHeight(): number {
    return this.isNavLeft() ? 0 : this.navEl.offsetHeight
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
    return this.outlineEl && this.outlineEl.style.height !== '0px'
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

  private scrollTo(id: string) {
    const anchor = document.getElementById(id)   // anchor.scrollIntoView(true, 'smooth');
    //hideOutline();
    this.smoothScroll(anchor, 500)
  }

  private addPrev(pp: NavLink, tt: string, c: string) {
    if (pp && pp.label) {
      this.ps.push({
        label: this.commonsService.capitalizeFirstLetter(pp.label),
        link: pp.link,
        title: tt,
        style: c
      })
      const prevEl = this.root.querySelector(".prev") as HTMLElement
      const p = this.ps[0]
      prevEl.innerHTML = `<a href="${p.link}"><span title="${p.title}">${p.label}</span></a>`
    }
  }

  private addNext(nn: NavLink, tt: string, c: string) {
    if (nn && nn.label) {
      this.ns.push({
        label: this.commonsService.capitalizeFirstLetter(nn.label),
        link: nn.link,
        title: tt,
        style: c
      })
      const nextEl = this.root.querySelector(".next") as HTMLElement
      const n = this.ns[0]
      nextEl.innerHTML = `<a href="${n.link}"><span title="${n.title}">${n.label}</span></a>`
    }
  }

  private isHeaderVisible() {
    return window === top && this.scrolled.scrollTop <= this.header.offsetHeight
  }

  private setOutline(outlineHTML) {
    this.outline = outlineHTML
    document.querySelector(".outline-title").innerHTML = outlineHTML
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

  private updateOutlinePos(triggerSelector: string) {
    if (this.isNavLeft()) {
      (<HTMLElement>this.outlineEl).style.top = '0'
    } else {
      const trigger = this.root.querySelector(triggerSelector) as HTMLElement
      if (trigger && this.outlineEl) {
        this.outlineEl.style.top = `${trigger.offsetTop + trigger.offsetHeight}px`
      }
    }
  }

  private updatePos() {
    this.updateOutlinePos('.outline-title')
    this.updateSearchPos('.search form')
  }

  private updateHeading(_time?: number) {
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
        text.style.paddingTop = `${this.getNavHeight()}px`
        this.setOutline(this.$scope.title)
        this.selectOutline(this.titleSection)
        this.updatePos()
      }
    }
  }

  private unselect(sec: HTMLElement) {
    if (sec) {
      sec.classList.remove('hovered')
    }
  }

  private select(toSelect) {
    let toSelectElem
    if (toSelect) {
      toSelectElem = this.root.querySelector(`#out-${toSelect.id}`)
      /*if (currentSection && toSelectElem[0] === currentSection[0]) {
       return;
       }*/
      toSelectElem.classList.add('hovered')
    }
    return toSelectElem
  }

  private selectOutline(newSelection) {
    this.unselect(this.currentSection)
    this.currentSection = this.select(newSelection)
  }

  private updateOutline() {
    let lastSec = this.titleSection
    let newSec: Section
    if (this.sections.length) {
      for (let i = 0; i < this.sections.length; i++) {
        newSec = this.sections[i]
        let found
        found = this.scrolled.scrollTop > newSec.elem.offsetTop
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
