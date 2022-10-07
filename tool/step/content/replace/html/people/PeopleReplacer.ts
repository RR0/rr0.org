import {SsgContext} from "../../../../../SsgContext"
import {People} from "../../../../../model/people/People"
import {UrlUtil} from "../../../../../util/url/UrlUtil"

export class PeopleReplacer {
  readonly cache = new Map<string, People>()

  constructor(protected peopleFiles: string[]) {
  }

  replacement(context: SsgContext, matchingString: string, peopleContent: string): string {
    const titleParts = / title="(.*?)"/.exec(matchingString)
    let peopleStr = peopleContent
    if (titleParts && titleParts.length > 1) {
      peopleStr = titleParts[1]
    }
    const leftParent = peopleStr.indexOf("(")
    if (leftParent > 0) {
      peopleStr = peopleStr.substring(0, leftParent).trim()
    }
    let people = this.cache.get(peopleStr)
    if (!people) {
      people = this.getPeople(peopleStr)
      this.cache.set(people.lastName, people)
    }
    const titleAttr = peopleStr.indexOf(people.fullName) < 0 ? ` title="${people.fullName}"` : ""
    let url = people.url
    let replacement: string
    const currentFileName = context.currentFile?.name!
    const dirName = currentFileName.substring(0, currentFileName.indexOf("/index"))
    if (url && url !== dirName) {
      replacement = `<a href="${UrlUtil.absolute(url)}"${titleAttr} translate="no">${peopleContent}</a>`
    } else {
      replacement = `<span class="peopl" translate="no">${peopleStr}</span>`
    }
    context.debug("\tReplacing people", matchingString, "with", replacement)
    return replacement
  }

  getPeople(peopleStr: string): People {
    let lastName: string
    let firstNames: string[]
    let commaPos = peopleStr.indexOf(",")
    if (commaPos > 0) {
      lastName = peopleStr.substring(0, commaPos).trim()
      firstNames = peopleStr.substring(commaPos + 1).trim().replace("  ", " ").split(" ")
    } else {
      let spaceParts = peopleStr.split(" ")
      if (spaceParts.length > 1) {
        const lastPos = spaceParts.length - 1
        lastName = spaceParts[lastPos]
        firstNames = spaceParts.slice(0, lastPos)
      } else {
        lastName = peopleStr
        firstNames = []
      }
    }
    let url: string | undefined = this.cache.get(lastName)?.url || this.getUrl(lastName, firstNames)
    if (this.peopleFiles.indexOf(url) < 0) {
      url = undefined
    }
    return new People(lastName, firstNames, url)
  }

  getUrl(lastName: string, firstNames: string[]): string {
    const normalizedLastName = this.withoutAccents(lastName)
    const normalizedFirstNames = firstNames.map(this.withoutAccents).map(this.withoutDots)
    return "people/" + normalizedLastName.charAt(0).toLowerCase() + "/" + normalizedLastName + normalizedFirstNames.join("")
  }

  private withoutDots(str: string): string {
    return str.replace(".", "")
  }

  private withoutAccents(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }
}
