import {People} from "./People"

export class PeopleFactory {
  readonly cache = new Map<string, People>()

  constructor(protected peopleFiles: string[]) {
  }

  createFromString(peopleStr: string): People {
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
    let dirName: string | undefined = this.cache.get(lastName)?.dirName || People.getUrl(lastName, firstNames)
    if (this.peopleFiles.indexOf(dirName) < 0) {
      dirName = undefined
    }
    return new People(dirName, firstNames, lastName)
  }
}
