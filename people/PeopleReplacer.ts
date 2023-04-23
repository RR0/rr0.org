import {PeopleFactory} from "./PeopleFactory"
import {DomReplacement} from "../time/DomReplacement"
import {HtmlRR0SsgContext} from "../RR0SsgContext"
import {PeopleDirectoryStep} from "./PeopleDirectoryStep"
import {CountryCode} from "../org/CountryCode"
import {Occupation} from "./Occupation"

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
    let url = people.dirName
    let replacement: HTMLElement
    const currentFileName = context.inputFile.name
    const dirName = currentFileName.substring(0, currentFileName.indexOf("/index"))
    if (url && url !== dirName) {
      // const urlAbsolute = UrlUtil.absolute(url)
      const peopleList = await PeopleDirectoryStep.getPeopleFromDir(context, url)
      const pseudoPeopleList = []
      const allCountries = new Set<CountryCode>()
      const occupations = new Set<Occupation>
      const peopl = peopleList[0] || people
      replacement = PeopleDirectoryStep.getPeopleLink(context, peopl, pseudoPeopleList, allCountries,
        occupations,
        [], peopleContent)
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
