import {TitleScope} from "nav/rr0-title"

import nav, {NavModule} from "./nav/nav"
import context, {ContextModule} from './rr0-context'
import science, {ScienceModule} from "../science/science"
import place, {PlaceModule} from "../place/place"
import foot, {FootModule} from "./note/foot"
import common, {CommonModule} from "./common"

import "../rr0.scss"

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

  constructor(common: CommonModule, nav: NavModule, place: PlaceModule, foot: FootModule, context: ContextModule, science: ScienceModule) {
    this.appController = new AppController()
  }
}

const rr0 = new Rr0Module(common, nav, place, foot, context, science)
export default rr0
