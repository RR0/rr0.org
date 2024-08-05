import { DefaultDataFactory } from "../DataService"
import { People } from "./People"
import path from "path"
import fs from "fs"
import { StringUtil } from "../util/string/StringUtil"

export class PeopleFactory extends DefaultDataFactory<People> {

  static readonly defaultPortraitFileNames = ["portrait.jpg", "portrait.gif", "portrait.png", "portrait.webp"]

  constructor() {
    super("people")
  }

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

  createFromData(dirName: string, data: People): People {
    const people = this.createFromDirName(dirName)
    const title = (data as any).title
    if (title) {
      const names = title.split(",")
      if (names.length > 1) {
        people.lastName = names.splice(0, 1)[0].trim()
        people.firstNames.length = 0
        people.firstNames.push(...names[0].trim().split(" "))
        people.lastAndFirstName = people.getLastAndFirstName()
      } else {
        const names = title.split(" ")
        if (names.length === 2) {
          people.firstNames.length = 0
          people.firstNames.push(names[0])
          people.lastName = names[1]
        } else {
          console.warn(`Could not determine first and last name from "${title}"}`)
        }
        people.lastAndFirstName = title
      }
    }
    Object.assign(people, data)
    const birthTime = people.birthTime as unknown as string
    let events = people.events
    if (!events) {
      people.events = events = []
    }
    if (birthTime) {
      delete people.birthTime
      events.push({type: "birth", time: birthTime as any, events: []})
    }
    this.parseEvents(events)
    if (!people.image) {
      let hasPortrait = false
      for (const defaultPortraitFileName of PeopleFactory.defaultPortraitFileNames) {
        const portraitPath = path.join(people.dirName, defaultPortraitFileName)
        hasPortrait = fs.existsSync(portraitPath)
        if (hasPortrait) {
          people.image = path.join("/", portraitPath)
          break
        }
      }
    }
    return people
  }
}
