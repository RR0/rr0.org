import {KnownPeople, People} from "./People"
import {StringUtil} from "../util/string/StringUtil"
import {PeopleReplacer} from "./PeopleReplacer"
import {promise as glob} from "glob-promise"

export class PeopleFactory {
  protected static singleton: PeopleFactory

  readonly cache = new Map<string, KnownPeople>()

  constructor(protected peopleFiles: string[]) {
  }

  static async getInstance(filePattern = "people/*/*"): Promise<PeopleFactory> {
    if (!this.singleton) {
      const peopleFiles = await glob(filePattern)
      this.singleton = new PeopleFactory(peopleFiles)
    }
    return this.singleton
  }

  createFromFullName(fullName: string): KnownPeople {
    let lastName: string
    let firstNames: string[]
    let commaPos = fullName.indexOf(",")
    if (commaPos > 0) {
      lastName = fullName.substring(0, commaPos).trim()
      firstNames = fullName.substring(commaPos + 1).trim().replace("  ", " ").split(" ")
    } else {
      let spaceParts = fullName.split(" ")
      if (spaceParts.length > 1) {
        const lastPos = spaceParts.length - 1
        lastName = spaceParts[lastPos]
        firstNames = spaceParts.slice(0, lastPos)
      } else {
        lastName = fullName
        firstNames = []
      }
    }
    let dirName: string | undefined = this.cache.get(lastName)?.dirName || People.getUrl(lastName, firstNames)
    if (this.peopleFiles.indexOf(dirName) < 0) {
      dirName = undefined
    }
    if (dirName && !lastName && firstNames?.length <= 0) {
      return this.createFromDirName(dirName)
    } else {
      return new KnownPeople(firstNames, lastName, undefined, undefined, undefined, false, undefined, undefined,
        undefined, dirName)
    }
  }

  createFromDirName(dirName: string): KnownPeople {
    const lastSlash = dirName.lastIndexOf("/")
    const lastDir = dirName.substring(lastSlash + 1)
    const title = StringUtil.camelToText(lastDir)
    const firstSpace = title.indexOf(" ")
    const lastName = title.substring(0, firstSpace)
    const firstNameStr = title.substring(firstSpace + 1)
    const firstNames = firstNameStr.split(" ")
    return new KnownPeople(firstNames, lastName, undefined, undefined, undefined, false, undefined, undefined,
      undefined, dirName)
  }
}
