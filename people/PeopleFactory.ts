import { People } from "./People"
import path from "path"
import { StringUtil } from "../util/string/StringUtil"
import { TypedDataFactory } from "../data/TypedDataFactory"
import { RR0EventFactory } from "../event/RR0EventFactory"
import { RR0Data } from "../data/RR0Data"

export class PeopleFactory extends TypedDataFactory<People> {

  constructor(eventFactory: RR0EventFactory) {
    super(eventFactory, "people")
  }

  /**
   * Determine people name from directory name.
   *
   * @param dirName
   */
  createFromDirName(dirName: string): People {
    const lastSlash = dirName.lastIndexOf("/")
    const lastDir = dirName.substring(lastSlash + 1)
    const title = StringUtil.camelToText(lastDir)
    const firstSpace = title.indexOf(" ")
    const lastName = title.substring(0, firstSpace)
    const firstNameStr = title.substring(firstSpace + 1)
    const firstNames = firstNameStr.split(" ")
    const id = path.basename(dirName)
    return new People(firstNames, lastName, undefined, undefined, undefined, false, undefined, undefined,
      undefined, id, dirName)
  }

  createFromData(data: RR0Data): People {
    const people = this.createFromDirName(data.dirName)
    data.name = people.name
    Object.assign(people, super.createFromData(data))
    let title = data.title
    let qualifier: string | undefined
    if (title) {
      const qualifStart = title.indexOf("(")
      if (qualifStart > 0) {
        qualifier = title.substring(qualifStart + 1, title.indexOf(")"))
        title = title.substring(0, qualifStart).trim()
      }
      const names = title.split(",")
      if (names.length > 1) {
        people.lastName = names.splice(0, 1)[0].trim()
        people.firstNames.length = 0
        people.firstNames.push(...names[0].trim().split(" "))
        people.lastAndFirstName = people.getLastAndFirstName()
      } else {
        const names = title.split(" ")
        people.firstNames = names.slice(0, names.length - 1)
        people.name = people.lastName = names[names.length - 1]
        people.lastAndFirstName = title
      }
    }
    people.title = people.firstAndLastName + (qualifier ? ` (${qualifier})` : "")
    return people
  }
}
