import { PeopleService } from "./PeopleService.js"
import { DomReplacement } from "../time/DomReplacement.js"
import { HtmlRR0SsgContext } from "../RR0SsgContext.js"
import { Occupation } from "./Occupation.js"
import { CountryCode } from "../org/country/CountryCode.js"

export class PeopleReplacer implements DomReplacement<HtmlRR0SsgContext> {

  constructor(protected service: PeopleService) {
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
    peopleStr = peopleStr.trim().replaceAll("\n", "").replace(/  /g, " ")
    let people = this.service.cache.get(peopleStr)
    if (!people) {
      people = this.service.createFromFullName(peopleStr)
    }
    let url = people.dirName
    let replacement: HTMLElement
    const currentFileName = context.file.name
    const dirName = currentFileName.substring(0, currentFileName.indexOf("/index"))
    if (url && url !== dirName) {
      // const urlAbsolute = UrlUtil.absolute(url)
      const peopleList = await this.service.getFromDir(url)
      const pseudoPeopleList = []
      const allCountries = new Set<CountryCode>()
      const occupations = new Set<Occupation>
      const peopl = peopleList[0] || people
      replacement = this.service.getLink(context, peopl, pseudoPeopleList, allCountries,
        occupations, [], peopleContent)
    } else {
      const span = context.file.document.createElement("span") as HTMLSpanElement
      span.className = "peopl"  // People not found
      span.textContent = peopleStr
      replacement = span
    }
    if (people.pseudonyms.includes(peopleContent)) {
      replacement.classList.add("pseudonym")
    }
    replacement.translate = false  // Don't translate names
    context.debug("\tReplacing people", element.outerHTML, "with", replacement.outerHTML)
    return replacement
  }
}
