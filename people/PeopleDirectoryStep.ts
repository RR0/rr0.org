import {Gender} from "./Gender"
import {CountryCode} from "../org/CountryCode"
import {Occupation} from "./Occupation"
import {Time} from "../time/Time"
import {People} from "./People"
import {promise as glob} from "glob-promise"
import {HtmlRR0SsgContext, RR0SsgContext} from "../RR0SsgContext"
import {HtmlTag} from "../util/HtmlTag"
import {DirectoryStep, OutputFunc, SsgConfig, SsgFile, SsgStep} from "ssg-api"
import {StringUtil} from "../util/string/StringUtil"

/**
 * Scan directories for people information, then populates a template with collected data.
 */
export class PeopleDirectoryStep extends DirectoryStep {

  constructor(dirs: string[], excludedDirs: string[], template: string, protected outputFunc: OutputFunc,
              config: SsgConfig,
              protected filterOccupations: Occupation[], name = "people directory") {
    super(dirs, excludedDirs, template, config, name)
  }

  static getPeopleLink(context: HtmlRR0SsgContext,
                       people: People, pseudoPeopleList: People[], allCountries: Set<CountryCode>,
                       occupations: Set<Occupation>, filterOccupations: Occupation[], content?: string): HTMLElement {
    const dirName = people.dirName
    const titles = []
    const classList = []
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
    const text = content || people.title
    let peopleLink = HtmlTag.toString("a", text, {href: `/${dirName}/`})
    if (people.discredited) {
      peopleLink += ` <img src="/people/lier.svg" title="Discrédité" class="people-icon" alt="discredited"/>`
    }
    const elem = context.outputFile.document.createElement("span")
    if (titles.length) {
      elem.title = titles.join(", ")
    }
    if (classList.length) {
      elem.classList.add(...classList)
    }
    elem.innerHTML = peopleLink
    return elem
  }

  static async getPeopleFromDirs(context: RR0SsgContext, dirNames: string[]): Promise<People[]> {
    let peopleList: People[] = []
    for (const dirName of dirNames) {
      const list = await this.getPeopleFromDir(context, dirName)
      peopleList.push(...list)
    }
    return peopleList
  }

  static async getPeopleFromDir(context: RR0SsgContext, dirName: string): Promise<People[]> {
    let peopleList: People[] = []
    const fileSpec = `/people*.json`
    const files = await glob(`${dirName}${fileSpec}`)
    for (const file of files) {
      const people = new People(dirName)
      peopleList.push(people)
      try {
        const jsonFileInfo = SsgFile.read(context, file)
        Object.assign(people, JSON.parse(jsonFileInfo.contents))
      } catch (e) {
        console.warn(`${dirName} has no ${fileSpec} description`)
        // No json, just guess title.
      }
    }
    return peopleList
  }

  protected async processDirs(context: HtmlRR0SsgContext, dirNames: string[]): Promise<void> {
    let peopleList = await PeopleDirectoryStep.getPeopleFromDirs(context, dirNames)
    if (this.filterOccupations.length > 0) {
      peopleList = peopleList.filter((p: People) => p.occupations.some(o => this.filterOccupations.includes(o)))
    }
    const pseudoPeopleList = peopleList.reduce((prev: People[], p: People) => {
      if (p.pseudonyms?.length > 0) {
        for (const pseudonym of p.pseudonyms) {
          const pseudo = new People(p.dirName, p.firstNames, p.lastName, p.pseudonyms, p.occupations, p.countries,
            p.discredited, p.birthTime, p.deathTime, p.gender)
          pseudo.title = pseudonym
          prev.push(pseudo)
        }
      }
      return prev
    }, [])
    peopleList = peopleList.concat(pseudoPeopleList).sort((p1, p2) => p1.title.localeCompare(p2.title))
    const allCountries = new Set<CountryCode>()
    const occupations = new Set<Occupation>()
    const outputFile = context.outputFile
    const listItems = peopleList.map(
      people => {
        const elem = PeopleDirectoryStep.getPeopleLink(context, people, pseudoPeopleList, allCountries, occupations,
          this.filterOccupations)
        const item = outputFile.document.createElement("li")
        item.appendChild(elem)
        return item
      })
    const ul = outputFile.document.createElement("ul")
    ul.append(...listItems)
    ul.className = "links"
    outputFile.contents = outputFile.contents.replace(`<!--#echo var="directories" -->`,
      ul.outerHTML)
    {
      let countriesHtml = ""
      for (const country of Array.from(allCountries).sort()) {
        const countryStr = context.messages.country[country].title
        countriesHtml += `<span class="option"><label><input type="checkbox" id="country-${country}" onchange="find(event)"> ${countryStr}</label></span>`
      }
      outputFile.contents = outputFile.contents.replace(`<!--#echo var="countries" -->`,
        HtmlTag.toString("div", countriesHtml, {id: "countries"}))
    }
    {
      let occupationsHtml = ""
      for (const occupation of Array.from(occupations).sort()) {
        const occupationStr = StringUtil.capitalizeFirstLetter(
          context.messages.people.occupation[occupation](Gender.male))
        occupationsHtml += `<span class="option"><label><input type="checkbox" id="occupation-${occupation}" onchange="find(event)"> ${occupationStr}</label></span>`
      }
      outputFile.contents = outputFile.contents.replace(`<!--#echo var="occupations" -->`,
        HtmlTag.toString("div", occupationsHtml, {id: "occupations"}))
    }
    await this.outputFunc(context, outputFile)
  }

  static async create(outputFunc: OutputFunc, config: SsgConfig,
                      findDirectoriesContaining: (fileName) => Promise<string[]>): Promise<SsgStep[]> {
    const peopleDirectories = await findDirectoriesContaining("people*.json")
    const excludedPeopleDirs = ["people/Astronomers_fichiers", "people/witness", "people/author"]

    const scientistsDirectoryStep = new PeopleDirectoryStep(peopleDirectories, excludedPeopleDirs,
      "people/scientifiques.html",
      outputFunc, config, [
        Occupation.anthropologist, Occupation.astronomer, Occupation.astrophysicist, Occupation.archeologist,
        Occupation.biochemist, Occupation.biologist, Occupation.biophysicist, Occupation.botanist,
        Occupation.chemist,
        Occupation.engineer, Occupation.exobiologist, Occupation.ethnologist,
        Occupation.geophysicist, Occupation.geologist, Occupation.geographer,
        Occupation.historian,
        Occupation.mathematician, Occupation.meteorologist,
        Occupation.neuroscientist, Occupation.neurologist, Occupation.neuropsychiatrist,
        Occupation.oceanographer,
        Occupation.philosopher, Occupation.physician, Occupation.psychologist, Occupation.physicist, Occupation.psychiatrist,
        Occupation.radioastronomer,
        Occupation.sociologist, Occupation.softwareEngineer
      ], "scientists directories")

    const ufologistsDirectoryStep = new PeopleDirectoryStep(peopleDirectories, excludedPeopleDirs,
      "people/ufologues.html",
      outputFunc, config, [Occupation.ufologist],
      "ufologists directories")

    const ufoWitnessesDirectoryStep = new PeopleDirectoryStep(peopleDirectories, excludedPeopleDirs,
      "people/witness/index.html",
      outputFunc, config, [Occupation.ufoWitness, Occupation.ufoWitness2, Occupation.contactee],
      "UFO witnesses directories")

    const astronomersDirectoryStep = new PeopleDirectoryStep(peopleDirectories, excludedPeopleDirs,
      "people/astronomes.html",
      outputFunc, config, [Occupation.astronomer],
      "astronomers directories")

    const contacteesDirectoryStep = new PeopleDirectoryStep(peopleDirectories, excludedPeopleDirs,
      "people/contactes.html",
      outputFunc, config, [Occupation.contactee],
      "contactees directories")

    const pilotsDirectoryStep = new PeopleDirectoryStep(
      peopleDirectories,
      excludedPeopleDirs,
      "people/pilotes.html",
      outputFunc, config, [Occupation.astronaut, Occupation.pilot])

    const peopleDirectoryStep = new PeopleDirectoryStep(peopleDirectories, excludedPeopleDirs,
      "people/index.html",
      outputFunc, config, [],
      "people directories")

    const letterDirs = await glob("people/*/")
    const peopleLetterFiles = letterDirs.filter(l => /(.*?)\/[a-z]\//.test(l))
    const letterDirectorySteps: PeopleDirectoryStep[] = []
    for (const peopleLetterFile of peopleLetterFiles) {
      const c = peopleLetterFile.charAt(peopleLetterFile.length - 2)
      letterDirectorySteps.push(new PeopleDirectoryStep(
        [`people/${c}/*/`],
        [],
        `people/${c}/index.html`,
        outputFunc, config, []))
    }
    return [scientistsDirectoryStep, ufologistsDirectoryStep, ufoWitnessesDirectoryStep, astronomersDirectoryStep, contacteesDirectoryStep, pilotsDirectoryStep, peopleDirectoryStep, ...letterDirectorySteps]
  }
}
