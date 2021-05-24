import "../rr0.scss"

import {TitleDirective, TitleScope} from "./nav/rr0-title"

import nav, {NavModule} from "./nav/nav"
import context, {ContextModule} from './rr0-context'
import science, {ScienceModule} from "../science/science"
import place, {PlaceModule} from "../place/place"
import foot, {FootModule} from "./note/foot"
import common, {CommonModule, Context, User} from "./common"

import time, {TimeModule} from "../time/time"
import people, {People, PeopleModule} from "../people/people"
import {PlaceDirective} from "../place/rr0-place"
import {ArticleDirective, OutlineService, SectionDirective} from "./nav/rr0-outline"
import {Moment} from "../time/Moment"
import {MetaDirective} from "../people/rr0-meta"
import {CopyrightDirective} from "../people/rr0-copyright"
import {TweetDirective} from "./social/tweet-directive"
import {FacebookDirective} from "./social/fb/rr0-fb-like"
import {SearchDirective} from "./search/rr0-search"
import {SearchService} from "./search/search-service"
import {LinkDirective} from "./nav/rr0-link"
import {HeadController} from "./nav/HeadController"
import {ImageDirective} from "./nav/rr0-img"

export class Rr0Context extends Context {

  constructor(user: User) {
    super(user)
    this.time = new Moment()
  }

  setPName(name: string) {
    if (name && name.length > 0) {
      this.people = new People(name)
      return this.people
    }
  }

  setPeopleName(name: string) {
    this.setPName(name)
  }
}

export interface RR0Window extends Window {
  copyright: string;
}

export class AppController implements TitleScope {
  title: string
  readonly copyright: string
  readonly author: string

  constructor(private headController: HeadController) {
    this.title = ''
    this.author = ''
    this.copyright = ''
  }

  setTitle(newTitle: string) {
    this.title = newTitle
    const h1 = document.querySelector("h1") as HTMLHeadingElement
    let inner: HTMLElement
    if (this.headController.titleUrl) {
      const link: HTMLAnchorElement = inner = document.createElement("a")
      link.href = this.headController.titleUrl
      h1.replaceChild(inner, h1.children[0])
    } else {
      inner = h1
    }
    inner.innerText = newTitle
  }
}

export class Rr0Module {
  leftWidth: number
  user = new User()
  context = new Context(this.user)
  sidePane
  contentsZone = null
  sideCallbacks = []
  textZone = null
  private readonly appController: AppController

  constructor(common: CommonModule, nav: NavModule, private place: PlaceModule, foot: FootModule, context: ContextModule,
              science: ScienceModule, private time: TimeModule, private people: PeopleModule, footModule: FootModule) {
    this.context.time = new Moment()
    this.appController = new AppController(nav.headController)
    this.initStructure()
    const mapZone = this.getSideZone("map-canvas")
    this.place.mapService.init(mapZone, () => this.place.mapService.onceMapIsLoaded(this.contentsZone, this.toggleMap.bind(this)))
    const headController = nav.headController
    headController.titleHandlers.push(this.titleFromPeople.bind(this))
    const outlineService = new OutlineService(nav, common.service)

    const directives = common.directives
    // Head
    directives.push(new MetaDirective(people.service, headController))
    directives.push(new LinkDirective(nav.service))
    directives.push(new TitleDirective(this.appController))
    // Heading
    const searchService = new SearchService()
    directives.push(new SearchDirective(searchService))
    // Text
    directives.push(new PlaceDirective(place.service, place.mapService, this))
    directives.push(new SectionDirective(outlineService))
    directives.push(new ArticleDirective(outlineService))
    directives.push(new ImageDirective())
    // Footer
    directives.push(new CopyrightDirective(people.service))
    directives.push(new TweetDirective())
    directives.push(new FacebookDirective())

    const promises = []
    for (let i = 0; i < directives.length; i++) {
      const directive = directives[i]
      promises.push(directive.execute(this.context))
    }
    Promise.all(promises).then(() => {
      console.log("applied directives")
    })
    nav.headController.setTitleScope(this.appController)
    headController.init(this.context).then(() => {
      console.log("headController.init() done")
    })
  }

  focusOn(placeOnMap) {
    if (this.isMapWidthAvailable()) {
      this.mapShow()
    }
    if (this.isPlanetariumWidthAvailable()) {
      this.place.mapService.planetariumShow()
    }
    if (this.isMapVisible()) {
      placeOnMap.show()
    }
  }

  /**
   */
  handleTags() {
    const args = arguments
    common.service.walk(this.textZone, e => {
//        context.add(e);
      for (let h = 0; h < args.length; h++) {
        if (e.parentNode) {
          if (args[h](e)) {
            break
          }
        }
      }
    })
  }

  getScreenWidth() {
    return document.body.clientWidth
  }

  getScreenHeight() {
    return document.body.clientHeight
  }

  getSidePane() {
    if (!this.sidePane) {
      this.sidePane = document.querySelector('aside')
      /*if (!sidePane) {
       sidePane = document.createElement("aside");
       if (this.contentsZone) {
       this.contentsZone.parentNode.appendChild(sidePane);
       }
       var divider = document.createElement("div");
       divider.className = "divider";
       sidePane.appendChild(divider);
       divider.addEventListener('mousedown', function (e) {
       e.preventDefault();
       document.documentElement.addEventListener('mousemove', moveHandler, true);
       document.documentElement.addEventListener('mouseup', upHandler, true);
       function moveHandler(e) {
       e.preventDefault();
       e.stopPropagation();
       org.rr0.leftWidth = e.pageX;
       org.rr0.updateDivision();
       }
       function upHandler(e) {
       e.preventDefault();
       e.stopPropagation();
       document.documentElement.removeEventListener('mousemove', moveHandler, true);
       document.documentElement.removeEventListener('mouseup', upHandler, true);
       }
       }, false);
       }*/
    }
    return this.sidePane
  }

  callSideCallbacks() {
    for (let i = 0; i < this.sideCallbacks.length; i++) {
      this.sideCallbacks[i]()
    }
  }

  updateDivision() {
    this.contentsZone.style.width = this.leftWidth + "px"
    const aside = document.querySelector("aside")
    aside.style.width = (this.getScreenWidth() - this.leftWidth) + "px"
    this.callSideCallbacks()
  }

  getSideZone(id: string) {
    let sideZone = document.getElementById(id)
    if (!sideZone) {
      sideZone = document.createElement("div")
      sideZone.id = id
      this.getSidePane().appendChild(sideZone)
    }
    return sideZone
  }

  initStructure() {
    this.contentsZone = document.querySelector(".contents")
    this.textZone = document.querySelector(".text")
    this.leftWidth = this.getScreenWidth()
  }

  private mapHide() {
    if (this.isMapWidthAvailable()) {
      this.splitWithMap(this.getScreenWidth())
    } else {
      const parentNode = this.contentsZone.parentNode.parentNode
      const swipe = this.place.mapService.getSwipe(parentNode, this.isMapVisible())
      swipe.prev()
    }
  }

  private toggleMap() {
    const mapVisible = this.isMapVisible()
    if (mapVisible) {
      this.mapHide()
    } else {
      this.mapShow()
    }
  }

  private isMapVisible() {
    return this.leftWidth < this.getScreenWidth()
  }

  private isMapWidthAvailable() {
    return this.getScreenWidth() > 320
  }

  private isPlanetariumWidthAvailable() {
    return this.getScreenHeight() > 400
  }

  private splitWithMap(contentWidth) {
    this.leftWidth = contentWidth
    this.updateDivision()
  }

  private mapShow() {
    const sideWidth = rr0.getScreenWidth() - rr0.leftWidth
    if (sideWidth <= 0) {
      rr0.leftWidth = rr0.getScreenWidth() * ((100 - 28) / 100)
    }
    this.splitWithMap(rr0.leftWidth)
    //org.rr0.time.drawChart();
  }

  private titleFromPeople() {
    let title
    const p = this.context.people
    if (p) {
      title = p.toString()
    }
    return title
  }
}

const rr0 = new Rr0Module(common, nav, place, foot, context, science, time, people, foot)
export default rr0
