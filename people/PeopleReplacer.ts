import {SsgContext} from "ssg-api"
import {UrlUtil} from "../util/url/UrlUtil"
import {PeopleFactory} from "./PeopleFactory"

export class PeopleReplacer {

  constructor(protected factory: PeopleFactory) {
  }

  replacement(context: SsgContext, match: string, peopleContent: string): string {
    const titleParts = / title="(.*?)"/.exec(match)
    let peopleStr = peopleContent
    if (titleParts && titleParts.length > 1) {
      peopleStr = titleParts[1]
    }
    const leftParent = peopleStr.indexOf("(")
    if (leftParent > 0) {
      peopleStr = peopleStr.substring(0, leftParent).trim()
    }
    const cache = this.factory.cache
    let people = cache.get(peopleStr)
    if (!people) {
      people = this.factory.createFromString(peopleStr)
      cache.set(people.lastName, people)
    }
    const titleAttr = peopleStr.indexOf(people.fullName) < 0 ? ` title="${people.fullName}"` : ""
    let url = people.dirName
    let replacement: string
    const currentFileName = context.inputFile.name
    const dirName = currentFileName.substring(0, currentFileName.indexOf("/index"))
    if (url && url !== dirName) {
      replacement = `<a href="${UrlUtil.absolute(url)}"${titleAttr} translate="no">${peopleContent}</a>`
    } else {
      replacement = `<span class="peopl" translate="no">${peopleStr}</span>`
    }
    context.debug("\tReplacing people", match, "with", replacement)
    return replacement
  }
}
