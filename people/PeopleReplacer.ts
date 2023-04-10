import {UrlUtil} from "../util/url/UrlUtil"
import {PeopleFactory} from "./PeopleFactory"
import {DomReplacement} from "../time/DomReplacement"
import {HtmlRR0SsgContext} from "../RR0SsgContext"

export class PeopleReplacer implements DomReplacement<HtmlRR0SsgContext> {

  constructor(protected factory: PeopleFactory) {
  }

  async replacement(context: HtmlRR0SsgContext, element: HTMLElement): Promise<HTMLElement> {
    const title = element.title
    const peopleContent = element.textContent
    let peopleStr = peopleContent
    if (title) {
      peopleStr = title
    }
    const leftParent = peopleStr.indexOf("(")
    if (leftParent > 0) {
      peopleStr = peopleStr.substring(0, leftParent).trim()
    }
    const cache = context.people.cache
    let people = cache.get(peopleStr)
    if (!people) {
      people = this.factory.createFromString(peopleStr)
      cache.set(people.lastName, people)
    }
    const titleAttr = peopleStr.indexOf(people.fullName) < 0 ? people.fullName : null
    let url = people.dirName
    let replacement: HTMLElement
    const currentFileName = context.inputFile.name
    const dirName = currentFileName.substring(0, currentFileName.indexOf("/index"))
    if (url && url !== dirName) {
      const anchor = context.outputFile.document.createElement("a") as HTMLAnchorElement
      anchor.href = UrlUtil.absolute(url)
      if (titleAttr) {
        anchor.title = titleAttr
      }
      anchor.textContent = peopleContent
      replacement = anchor
    } else {
      const span = context.outputFile.document.createElement("span") as HTMLSpanElement
      span.className = "peopl"  // People not found
      span.textContent = peopleStr
      replacement = span
    }
    replacement.translate = false  // Don't translate names
    context.debug("\tReplacing people", element, "with", replacement)
    return replacement
  }
}
