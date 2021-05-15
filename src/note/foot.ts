import common, {CommonModule, Context, SelectorDirective} from "../common"

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

class NoteDirective extends SelectorDirective {
  private readonly a: HTMLAnchorElement
  private visible = false
  private span: HTMLSpanElement

  constructor(private footService: FootService) {
    super(".note")
  }

  protected handle(context: Context, el: HTMLElement) {
    const contents = el.innerHTML

    const a = document.createElement("a")
    a.href = "#"
    a.title = "Cliquez pour voir/cacher la note"
    a.onclick = _ev => a.classList.toggle("visible")
    const footCount = ++this.footService.notesCount
    a.innerText = String.fromCharCode(96 + footCount)

    const span = document.createElement("span")
    span.innerHTML = contents

    el.innerHTML = a.innerHTML + span.innerHTML
  }
}

class SourceDirective extends SelectorDirective {
  private readonly a: HTMLAnchorElement
  private visible = false
  private span: HTMLSpanElement

  constructor(private footService: FootService) {
    super(".source")
  }

  protected handle(context: Context, el: HTMLElement) {
    const contents = el.innerHTML

    const a = document.createElement("a")
    a.href = "#"
    a.title = "Cliquez pour voir/cacher la source"
    a.onclick = _ev => a.classList.toggle("visible")
    const footCount = ++this.footService.sourcesCount
    a.innerText = '' + footCount

    const span = document.createElement("span")
    span.innerHTML = "&nbsp;– " + contents

    el.innerHTML = a.innerHTML + span.innerHTML
  }
}

export class FootModule {
  readonly service: FootService

  constructor(common: CommonModule) {
    this.service = new FootService()
    document.getElementsByTagName("footer")[0].innerHTML += ""
    common.directives.push(new NoteDirective(this.service))
    common.directives.push(new SourceDirective(this.service))
  }
}

export class FootCtrl {
  isFramed() {
    return window !== top
  }
}

const foot = new FootModule(common)
export default foot
