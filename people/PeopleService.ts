import { KnownPeople, People } from "./People"
import { StringUtil } from "../util/string/StringUtil"
import { HtmlRR0SsgContext, RR0SsgContext } from "../RR0SsgContext"
import path from "path"
import fs from "fs"
import { DataService } from "../DataService"
import { CountryCode } from "../org/country/CountryCode"
import { Occupation } from "./Occupation"
import { Time } from "../time/Time"
import { Gender } from "@rr0/common"

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

  getLink(context: HtmlRR0SsgContext,
          people: KnownPeople, pseudoPeopleList: People[], allCountries: Set<CountryCode>,
          occupations: Set<Occupation>, filterOccupations: Occupation[], content?: string): HTMLElement {
    const dirName = people.dirName
    const titles = []
    const classList = ["data-resolved"]
    if (pseudoPeopleList.indexOf(people) >= 0) {
      classList.push("pseudonym")
      titles.push("(pseudonyme)")
    }
    if (people.hoax) {
      classList.push("canular")
    }
    let birthTimeStr = people.birthTime as unknown as string
    if (birthTimeStr) {
      const birthTime = people.birthTime = Time.dateFromIso(birthTimeStr)
      birthTimeStr = birthTime.getFullYear().toString()
    }
    let deathTimeStr = people.deathTime as unknown as string
    if (deathTimeStr) {
      const deathTime = people.deathTime = Time.dateFromIso(deathTimeStr)
      deathTimeStr = deathTime.getFullYear().toString()
    }
    if (people.isDeceased()) {
      classList.push("deceased")
    }
    if (birthTimeStr || deathTimeStr) {
      const timeStr = birthTimeStr ? deathTimeStr ? birthTimeStr + "-" + deathTimeStr : birthTimeStr + "-" : "-" + deathTimeStr
      titles.push(timeStr)
    }
    const age = people.getAge()
    if (age) {
      titles.push(`${age} ans`)
    }
    const countries = people.countries
    if (countries) {
      for (const country of countries) {
        allCountries.add(country)
        const countryLabel = context.messages.country[country]?.title
        if (!countryLabel) {
          throw new Error(`No title for country "${country}"`)
        }
        titles.push(countryLabel)
        classList.push(`country-${country}`)
      }
    }
    const gender = people.gender || Gender.male
    for (const occupation of people.occupations) {
      if (filterOccupations.length > 1 || !filterOccupations.includes(occupation)) {
        occupations.add(occupation)
        const occupationMsg = context.messages.people.occupation[occupation]
        if (!occupationMsg) {
          throw Error(
            `No message to translate occupation "${occupation}" in ${context.locale}, as specified in ${people.dirName}/people*.json`)
        }
        classList.push(`occupation-${occupation}`)
        titles.push(occupationMsg(gender))
      }
    }
    const text = content || people.lastAndFirstName
    const doc = context.file.document
    const link = doc.createElement("a")
    link.innerHTML = text
    link.href = `/${dirName}/`
    if (people.discredited) {
      link.append(" 🤥")
      titles.push("discrédité")
    }
    const elem = doc.createElement("span")
    if (titles.length > 0) {
      elem.title = titles.join(", ")
    }
    if (classList.length > 0) {
      elem.classList.add(...classList)
    }
    const portraitUrl = people.portraitUrl
    if (portraitUrl) {
      const portraitElem = doc.createElement("img")
      portraitElem.src = portraitUrl
      portraitElem.alt = people.lastAndFirstName
      portraitElem.className = "portrait"
      portraitElem.loading = "lazy"
      portraitElem.width = 75
      link.append(portraitElem)
    }
    elem.append(link)
    return elem
  }
}
