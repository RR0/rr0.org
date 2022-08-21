import {SsgContext} from "../SsgContext"
import {People} from "./People"

export class PeopleReplacer {
  readonly cache = new Map<string, People>()

  constructor(protected peopleFiles: string[]) {
  }

  replacement(context: SsgContext, substring: string, peopleStr: string): string {
    let people = this.cache.get(peopleStr)
    if (!people) {
      people = this.getPeople(peopleStr)
      this.cache.set(people.lastName, people)
    }
    const titleAttr = peopleStr != people.fullName ? ` title="${people.fullName}"` : ""
    const replacement = `<a href="/${people.url}"${titleAttr} translate="no">${peopleStr}</a>`
    context.debug("\tReplacing", substring, "with", replacement)
    return replacement
  }

  getPeople(peopleStr: string): People {
    let spaceParts = peopleStr.split(" ")
    let lastName: string
    let firstNames: string[]
    if (spaceParts.length > 1) {
      const lastPos = spaceParts.length - 1
      lastName = spaceParts[lastPos]
      firstNames = spaceParts.slice(0, lastPos)
    } else {
      lastName = peopleStr
      firstNames = []
    }
    let url: string | undefined = this.cache.get(lastName)?.url || this.getUrl(lastName, firstNames)
    if (this.peopleFiles.indexOf(url) < 0) {
      url = undefined
    }
    return new People(lastName, firstNames, url)
  }

  getUrl(lastName: string, firstNames: string[]): string {
    const normalizedLastName = this.withoutAccents(lastName)
    const normalizedFirstNames = firstNames.map(this.withoutAccents)
    return "people/" + normalizedLastName.charAt(0).toLowerCase() + "/" + normalizedLastName + normalizedFirstNames.join("")
  }

  private withoutAccents(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }
}
