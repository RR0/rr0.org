import { KnownPeople, People } from "./People"
import { StringUtil } from "../util/string/StringUtil"
import { RR0SsgContext } from "../RR0SsgContext"
import path from "path"
import fs from "fs"
import { DataService } from "../DataService"

export class PeopleService {

  readonly cache = new Map<string, KnownPeople>()

  constructor(protected peopleFiles: string[], protected readonly dataService: DataService) {
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

  async getFromDirs(context: RR0SsgContext, dirNames: string[]): Promise<KnownPeople[]> {
    let peopleList: People[] = []
    for (const dirName of dirNames) {
      const list = await this.getFromDir(context, dirName)
      peopleList.push(...list)
    }
    return peopleList
  }

  async getFromDir(context: RR0SsgContext, dirName: string): Promise<People[]> {
    let peopleList: People[] = []
    const fileSpec = ["people*.json"]
    const peopleDataList = await this.dataService.get(context, dirName, ["people", undefined], fileSpec) as People[]
    for (const peopleData of peopleDataList) {
      const people = this.createFromData(context, dirName, peopleData)
      peopleList.push(people)
    }
    return peopleList
  }

  createFromData(context: RR0SsgContext, dirName: string, data: People): People {
    const people = this.createFromDirName(dirName)
    const title = data.title
    if (title) {
      const names = title.split(", ")
      if (names > 0) {
        people.lastName = names.splice(0, 1)[0]
        people.firstNames.length = 0
        people.firstNames.push(...names[0].split(" "))
        people.lastAndFirstName = people.getLastAndFirstName()
      } else {
        const names = title.split(" ")
        if (names.length === 2) {
          people.firstNames.length = 0
          people.firstNames.push(names[0])
          people.lastName = names[1]
        } else {
          context.warn(`Could not determine first and last name from "${title}"}`)
        }
        people.lastAndFirstName = title
      }
    }
    Object.assign(people, data)
    if (!people.portraitUrl) {
      const possiblePortraitFiles = ["portrait.jpg", "portrait.gif", "portrait.png", "portrait.webp"]
      let hasPortrait = false
      for (let i = 0; i < possiblePortraitFiles.length; i++) {
        const portraitFile = possiblePortraitFiles[i]
        const portraitPath = path.join(people.dirName, portraitFile)
        hasPortrait = fs.existsSync(portraitPath)
        if (hasPortrait) {
          people.portraitUrl = path.join("/", portraitPath)
          break
        }
      }
    }
    return people
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
