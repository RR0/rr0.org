import { Occupation } from "./Occupation"
import { Time } from "../time/Time"
import { KnownPeople, People } from "./People"
import { promise as glob } from "glob-promise"
import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { HtmlTag } from "../util/HtmlTag"
import { DirectoryStep, OutputFunc, SsgConfig, SsgStep } from "ssg-api"
import { StringUtil } from "../util/string/StringUtil"
import { RR0FileUtil } from "../util/file/RR0FileUtil"
import { PeopleService } from "./PeopleService"
import { CountryCode } from "../org/country/CountryCode"
import { Gender } from "@rr0/common"

/**
 * Scan directories for people information, then populates a template with collected data.
 */
export class PeopleDirectoryStep extends DirectoryStep {

  constructor(dirs: string[], excludedDirs: string[], template: string, protected outputFunc: OutputFunc,
              config: SsgConfig, protected filterOccupations: Occupation[], protected service: PeopleService,
              name = "people directory") {
    super(dirs, excludedDirs, template, config, name)
  }

  static getPeopleLink(context: HtmlRR0SsgContext,
                       people: KnownPeople, pseudoPeopleList: People[], allCountries: Set<CountryCode>,
                       occupations: Set<Occupation>, filterOccupations: Occupation[], content?: string): HTMLElement {
    const dirName = people.dirName
    const titles = []
    const classList = ["people-resolved"]
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
    const document = context.outputFile.document
    const peopleLink = document.createElement("a")
    peopleLink.innerHTML = text
    peopleLink.href = `/${dirName}/`
    if (people.discredited) {
      peopleLink.append(" 🤥")
      titles.push("discrédité")
    }
    const elem = document.createElement("span")
    if (titles.length) {
      elem.title = titles.join(", ")
    }
    if (classList.length) {
      elem.classList.add(...classList)
    }
    const portraitUrl = people.portraitUrl
    if (portraitUrl) {
      const portraitElem = document.createElement("img")
      portraitElem.src = portraitUrl
      portraitElem.alt = people.lastAndFirstName
      portraitElem.className = "portrait"
      portraitElem.loading = "lazy"
      portraitElem.width = 75
      peopleLink.append(portraitElem)
    }
    elem.append(peopleLink)
    return elem
  }

  static async create(outputFunc: OutputFunc, config: SsgConfig, service: PeopleService): Promise<SsgStep[]> {
    const dirs = RR0FileUtil.findDirectoriesContaining("people*.json")
    const excludedDirs = ["people/Astronomers_fichiers", "people/witness", "people/author"]
    const scientistsDirectoryStep = this.createScientists(dirs, excludedDirs, outputFunc, config, service)
    const ufologistsDirectoryStep = this.createUfologists(dirs, excludedDirs, outputFunc, config, service)
    const ufoWitnessesDirectoryStep = this.createWitnesses(dirs, excludedDirs, outputFunc, config, service)
    const astronomersDirectoryStep = this.createAstronomers(dirs, excludedDirs, outputFunc, config, service)
    const contacteesDirectoryStep = this.createContactees(dirs, excludedDirs, outputFunc, config, service)
    const pilotsDirectoryStep = this.createPilots(dirs, excludedDirs, outputFunc, config, service)
    const militaryDirectoryStep = this.createMilitary(dirs, excludedDirs, outputFunc, config, service)
    const allPeopleDirectoryStep = this.createAll(dirs, excludedDirs, outputFunc, config, service)
    const letterDirectorySteps = await this.createLetters(outputFunc, config, service)
    return [
      scientistsDirectoryStep,
      ufologistsDirectoryStep,
      ufoWitnessesDirectoryStep,
      astronomersDirectoryStep,
      contacteesDirectoryStep,
      pilotsDirectoryStep,
      militaryDirectoryStep,
      allPeopleDirectoryStep,
      ...letterDirectorySteps
    ]
  }

  static async createLetters(outputFunc: OutputFunc, config: SsgConfig, service: PeopleService) {
    const letterDirs = await glob("people/*/")
    const peopleLetterFiles = letterDirs.filter(l => /(.*?)\/[a-z]\//.test(l))
    const letterDirectorySteps: PeopleDirectoryStep[] = []
    for (const peopleLetterFile of peopleLetterFiles) {
      const c = peopleLetterFile.charAt(peopleLetterFile.length - 2)
      letterDirectorySteps.push(new PeopleDirectoryStep(
        [`people/${c}/*/`],
        [],
        `people/${c}/index.html`,
        outputFunc, config, [], service))
    }
    return letterDirectorySteps
  }

  static createAll(dirs: string[], excludedDirs: string[],
                   outputFunc: OutputFunc, config: SsgConfig, service: PeopleService) {
    return new PeopleDirectoryStep(dirs, excludedDirs, "people/index.html", outputFunc, config, [], service,
      "all people directories")
  }

  static createMilitary(dirs: string[], excludedDirs: string[],
                        outputFunc: OutputFunc, config: SsgConfig, service: PeopleService) {
    return new PeopleDirectoryStep(dirs, excludedDirs, "people/militaires.html", outputFunc, config,
      [Occupation.military], service, "military people directories")
  }

  static createPilots(dirs: string[], excludedDirs: string[], outputFunc: OutputFunc, config: SsgConfig,
                      service: PeopleService) {
    return new PeopleDirectoryStep(dirs, excludedDirs, "people/pilotes.html", outputFunc, config,
      [Occupation.astronaut, Occupation.pilot], service, "pilots directories")
  }

  static createContactees(dirs: string[], excludedDirs: string[], outputFunc: OutputFunc, config: SsgConfig,
                          service: PeopleService) {
    return new PeopleDirectoryStep(dirs, excludedDirs, "people/contactes.html", outputFunc, config,
      [Occupation.contactee], service, "contactees directories")
  }

  static createAstronomers(dirs: string[], excludedDirs: string[], outputFunc: OutputFunc, config: SsgConfig,
                           service: PeopleService) {
    return new PeopleDirectoryStep(dirs, excludedDirs, "people/astronomes.html", outputFunc, config,
      [Occupation.astronomer], service, "astronomers directories")
  }

  static createWitnesses(dirs: string[], excludedDirs: string[], outputFunc: OutputFunc, config: SsgConfig,
                         service: PeopleService) {
    return new PeopleDirectoryStep(dirs, excludedDirs, "people/witness/index.html", outputFunc, config,
      [Occupation.ufoWitness, Occupation.ufoWitness2, Occupation.contactee], service, "UFO witnesses directories")
  }

  static createUfologists(dirs: string[], excludedDirs: string[], outputFunc: OutputFunc, config: SsgConfig,
                          service: PeopleService) {
    return new PeopleDirectoryStep(dirs, excludedDirs, "people/ufologues.html", outputFunc, config,
      [Occupation.ufologist], service, "ufologists directories")
  }

  static createScientists(dirs: string[], excludedDirs: string[], outputFunc: OutputFunc, config: SsgConfig,
                          service: PeopleService) {
    return new PeopleDirectoryStep(dirs, excludedDirs,
      "people/scientifiques.html",
      outputFunc, config,
      [
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
      ],
      service,
      "scientists directories"
    )
  }

  protected async processDirs(context: HtmlRR0SsgContext, dirNames: string[]): Promise<void> {
    let peopleList = await this.service.getPeopleFromDirs(context, dirNames)
    if (this.filterOccupations.length > 0) {
      peopleList = peopleList.filter((p: People) => p.occupations.some(o => this.filterOccupations.includes(o)))
    }
    const pseudoPeopleList = peopleList.reduce((prev: KnownPeople[], p: KnownPeople) => {
      if (p.pseudonyms?.length > 0) {
        for (const pseudonym of p.pseudonyms) {
          const pseudo = new KnownPeople(p.firstNames, p.lastName, p.pseudonyms, p.occupations, p.countries,
            p.discredited, p.birthTime, p.deathTime, p.gender, p.dirName, p.portraitUrl)
          pseudo.lastAndFirstName = pseudonym
          prev.push(pseudo)
        }
      }
      return prev
    }, [])
    peopleList = peopleList.concat(pseudoPeopleList).sort(
      (p1, p2) => p1.lastAndFirstName.localeCompare(p2.lastAndFirstName))
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
}
