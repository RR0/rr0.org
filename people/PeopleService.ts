import { People } from "./People"
import { HtmlRR0SsgContext } from "../RR0SsgContext"
import path from "path"
import { AllDataService } from "../data/AllDataService"
import { CountryCode } from "../org/country/CountryCode"
import { Occupation } from "./Occupation"
import { Time } from "../time/Time"
import { Gender } from "@rr0/common"
import { PeopleFactory } from "./PeopleFactory"
import { AbstractDataFactory } from "../data/AbstractDataFactory"
import { AbstractDataService } from "../data/AbstractDataService"
import { RR0FileUtil } from "../util/file/RR0FileUtil"
import { glob } from "glob"

export class PeopleService extends AbstractDataService<People> {

  readonly cache = new Map<string, People>()

  constructor(dataService: AllDataService, protected peopleFactory: PeopleFactory) {
    super(dataService, peopleFactory)
  }

  async getFiles(): Promise<string[]> {
    if (!this.files) {
      const peopleDirs = await glob("people/?/*/")
      const dirsWithPeople = RR0FileUtil.findDirectoriesContaining("people*.json", "out")
      this.files = Array.from(new Set(peopleDirs.concat(dirsWithPeople)))
    }
    return this.files
  }

  createFromFullName(fullName: string): People {
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
    let dirName: string | undefined = this.cache.get(lastName.toLowerCase())?.dirName || People.getUrl(lastName,
      firstNames)
    if (this.files.indexOf(dirName) < 0) {
      dirName = undefined
    }
    let created: People
    if (dirName && !lastName && firstNames?.length <= 0) {
      created = this.peopleFactory.createFromDirName(dirName)
    } else {
      created = new People(firstNames, lastName, undefined, undefined, undefined, false, undefined, undefined,
        undefined, undefined, dirName)
    }
    this.cache.set(lastName, created)
    return created
  }

  async getAll(): Promise<People[]> {
    const dirNames = await this.getFiles()
    return this.getFromDirs(dirNames)
  }

  async getFromDirs(dirNames: string[]): Promise<People[]> {
    let peopleList: People[] = []
    for (const dirName of dirNames) {
      const list = await this.getFromDir(dirName)
      peopleList.push(...list)
    }
    return peopleList
  }

  async getFromDir(dirName: string): Promise<People[]> {
    let peopleList: People[] = []
    const fileSpec = ["people*.json"]
    const peopleDataList = await this.dataService.getFromDir<People>(dirName, ["people", undefined], fileSpec)
    for (const peopleData of peopleDataList) {
      const people = this.factory.createFromData(peopleData)
      peopleList.push(people)
    }
    return peopleList
  }

  getLink(context: HtmlRR0SsgContext,
          people: People, pseudoPeopleList: People[], allCountries: Set<CountryCode>,
          occupations: Set<Occupation>, filterOccupations: Occupation[] = [], content?: string): HTMLElement {
    const dirName = people.dirName
    const titles = []
    const classList = ["data-resolved", "people-resolved"]
    if (pseudoPeopleList.indexOf(people) >= 0 || people.pseudonyms.includes(content)) {
      classList.push("pseudonym")
      titles.push(`(pseudonyme de ${people.firstAndLastName})`)
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
    let portraitUrl = people.image
    if (!portraitUrl) {
      const portraitEvent = people.events.find(
        event => event.type === "image" && AbstractDataFactory.defaultImageFileNames.includes(event.url))
      if (portraitEvent) {
        portraitUrl = path.join("/", people.dirName, portraitEvent.url)
      }
    }
    if (portraitUrl) {
      const portraitElem = doc.createElement("img")
      portraitElem.src = path.join("/", portraitUrl)
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
