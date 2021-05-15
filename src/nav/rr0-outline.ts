import {CommonService, Context, SelectorDirective} from "../common"
import {NavModule} from "./nav"

class SectionScope {
  level: number
  title: string
}

export class Section {
  label: string
  outlineLabel: string
  id: string
  level: number
  elem: HTMLElement
}

export class OutlineService {
  sections = []
  currentLevel: number

  constructor(private nav: NavModule, private commonsService: CommonService) {
  }

  addSection(s: string, elem: HTMLElement): Section {
    let l
    let outlineL
    const hPos = s.indexOf('<h')
    if (hPos < 0) {
      l = `<h1>${s}</h1>`
      const tag = 'h' + (this.currentLevel) + '>'
      outlineL = '<' + tag + s + '</' + tag
    } else {
      l = s
      outlineL = l
      const hPosEnd = s.indexOf('>', hPos + 1)
      const h2Pos = s.indexOf('</h', hPosEnd + 1)
      s = s.substring(hPosEnd + 1, h2Pos)
    }
    this.currentLevel++
    let levelSections = this.sections[this.currentLevel]
    const typ: string = typeof levelSections
    if (typ !== 'array') {
      levelSections = this.sections
    }
    levelSections.push(l)

    const idLink = this.commonsService.validLink(s)
    const sectionId = this.commonsService.camelize(idLink, this.currentLevel)
    const section: Section = {
      label: l,
      outlineLabel: outlineL,
      id: sectionId,
      level: this.currentLevel,
      elem: elem
    }
    this.nav.headController.sectionAdded(section)
    return section
  }
}

export class SectionDirective extends SelectorDirective {
  constructor(private outlineService: OutlineService) {
    super("section")
  }

  addSec(sectionTitle: string, scope, elem: HTMLElement) {
    const section = this.outlineService.addSection(sectionTitle, elem)
    scope.level = section.level
    scope.sectionTitle = section.label
    elem.id = section.id
  }

  protected handle(context: Context, elem: HTMLElement) {
    const transclude = elem.innerHTML
    const scope = new SectionScope()
    const sectionTitle = elem.title
    if (sectionTitle) {
      this.addSec(sectionTitle, scope, elem)
    }
    //post
    if (!scope.title) {
      const titleElem = elem.children[1].children[0]
      const sectionTitle = titleElem.outerHTML
      titleElem.remove()
      this.addSec(sectionTitle, scope, elem)
    }
    this.outlineService.currentLevel--
    scope.level = this.outlineService.currentLevel
    elem.innerHTML = `<span>${sectionTitle}</span><div>${transclude}</div>`
  }
}

export class ArticleDirective extends SelectorDirective {
  constructor(private outlineService: OutlineService) {
    super("article")
  }

  addArt(sectionTitle, scope, elem) {
    const section = this.outlineService.addSection(sectionTitle, elem)
    scope.level = section.level
    scope.sectionTitle = section.label
    elem[0].id = section.id
  }

  protected handle(context: Context, elem: HTMLElement) {
    const transclude = elem.innerHTML
    const scope = new SectionScope()
    const sectionTitle = elem.title
    if (sectionTitle) {
      this.addArt(sectionTitle, scope, elem)
    }
    // post:
    if (!scope.title) {
      const titleElem = elem.children[0].children[0]
      const sectionTitle = titleElem.outerHTML
      this.addArt(sectionTitle, scope, elem)
    }
    this.outlineService.currentLevel--
    scope.level = this.outlineService.currentLevel
    elem.innerHTML = `<p>${transclude}</p> `
  }
}
