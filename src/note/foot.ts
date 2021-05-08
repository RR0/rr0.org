import social, {SocialModule} from "../social/social"
import {directives} from "../common"

/*
 * Foot notes and sources references
 */

function footsources() {
}

function footnotes() {
}

export class FootService {
  notesCount = 0
  sourcesCount = 0

  constructor() {
  }
}

export abstract class SelectorDirective {
  constructor(private selector: string, private from: ParentNode = document) {
  }

  execute() {
    const els = this.from.querySelectorAll(this.selector)
    els.forEach(el => this.handle(el as HTMLElement))
  }

  protected abstract handle(el: HTMLElement)
}

class NoteDirective extends SelectorDirective {
  private readonly a: HTMLAnchorElement
  private visible = false
  private span: HTMLSpanElement

  constructor(private footService: FootService) {
    super(".note")
  }

  protected handle(elem: HTMLElement) {
    const contents = elem.innerHTML

    const a = document.createElement("a")
    a.href = "#"
    a.title = "Cliquez pour voir/cacher la note"
    a.onclick = _ev => a.classList.toggle("visible")
    const footCount = ++this.footService.notesCount
    a.innerText = String.fromCharCode(96 + footCount)

    const span = document.createElement("span")
    span.innerHTML = contents

    elem.innerHTML = this.a.innerHTML + span.innerHTML
  }
}

class SourceDirective extends SelectorDirective {
  private readonly a: HTMLAnchorElement
  private visible = false
  private span: HTMLSpanElement

  constructor(private footService: FootService) {
    super(".source")
  }

  protected handle(elem: HTMLElement) {
    const contents = elem.innerHTML

    const a = document.createElement("a")
    a.href = "#"
    a.title = "Cliquez pour voir/cacher la source"
    a.onclick = _ev => a.classList.toggle("visible")
    const footCount = ++this.footService.sourcesCount
    a.innerText = '' + footCount

    const span = document.createElement("span")
    span.innerHTML = "&nbsp;– " + contents

    elem.innerHTML = this.a.innerHTML + span.innerHTML
  }
}

export class FootModule {
  readonly service: FootService

  constructor(private social: SocialModule) {
    this.service = new FootService()
    document.getElementsByTagName("footer")[0].innerHTML += ""
    directives.push(new NoteDirective(this.service))
    directives.push(new SourceDirective(this.service))
  }
}

export class FootCtrl {
  isFramed() {
    return window !== top
  }
}

const foot = new FootModule(social)
export default foot
