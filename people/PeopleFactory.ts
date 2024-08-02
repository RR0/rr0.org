import { DefaultDataFactory } from "../DataService"
import { KnownPeople, People } from "./People"
import path from "path"
import fs from "fs"
import { RR0Data } from "../RR0Data"
import { StringUtil } from "../util/string/StringUtil"

export class PeopleFactory extends DefaultDataFactory<KnownPeople> {
  constructor() {
    super("people")
  }

  protected parseData(data: RR0Data[]) {
    for (const datum of data) {
      switch (datum.type) {
        default:
          if (typeof datum.place === "string") {
            datum.place = {name: datum.place}
          }
      }
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
    const id = path.basename(dirName)
    return new KnownPeople(firstNames, lastName, undefined, undefined, undefined, false, undefined, undefined,
      undefined, id, dirName)
  }

  createFromData(dirName: string, data: People): KnownPeople {
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
    let subData = people.events
    if (!subData) {
      people.events = subData = []
    }
    if (birthTime) {
      delete people.birthTime
      subData.push({type: "birth", time: birthTime as any})
    }
    this.parseData(subData)
    if (!people.image) {
      const possiblePortraitFiles = ["portrait.jpg", "portrait.gif", "portrait.png", "portrait.webp"]
      let hasPortrait = false
      for (let i = 0; i < possiblePortraitFiles.length; i++) {
        const portraitFile = possiblePortraitFiles[i]
        const portraitPath = path.join(people.dirName, portraitFile)
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
