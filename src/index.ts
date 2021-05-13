import {TitleScope} from "nav/rr0-title"

import nav, {NavModule} from "./nav/nav"
import context, {ContextModule} from './rr0-context'
import science, {ScienceModule} from "../science/science"
import place, {PlaceModule} from "../place/place"
import foot, {FootModule} from "./note/foot"
import common, {CommonModule, Context, User} from "./common"

import "../rr0.scss"
import time, {TimeModule} from "../time/time"

export interface RR0Window extends Window {
  copyright: string;
}

class AppController implements TitleScope {
  title: string
  readonly copyright: string
  readonly author: string

  constructor() {
    this.title = ''
    this.author = ''
    this.copyright = ''
  }

  setTitle(newTitle) {
    this.title = newTitle
  }
}

export class Rr0Module {
  private appController: AppController
  leftWidth: number
  user = new User()
  context = new Context(this.user)
  sidePane
  contentsZone = null
  sideCallbacks = []
  textZone = null

  constructor(common: CommonModule, nav: NavModule, place: PlaceModule, foot: FootModule, context: ContextModule,
              science: ScienceModule, time: TimeModule) {
    this.appController = new AppController()
    this.initStructure()
    for (const directive of common.directives) (
      directive.execute()
    )
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

  getSideZone(id) {
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
}

const rr0 = new Rr0Module(common, nav, place, foot, context, science, time)
export default rr0
