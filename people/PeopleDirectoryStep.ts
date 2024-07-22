import { Occupation } from "./Occupation"
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

  constructor(rootDirs: string[], excludedDirs: string[], templateFileName: string, protected outputFunc: OutputFunc,
              config: SsgConfig, protected filterOccupations: Occupation[], protected service: PeopleService,
              name = "people directory") {
    super({
      rootDirs,
      excludedDirs,
      templateFileName,
      getOutputPath: config.getOutputPath
    }, name)
  }

  static async create(outputFunc: OutputFunc, config: SsgConfig,
                      service: PeopleService): Promise<PeopleDirectoryStep[]> {
    const dirs = RR0FileUtil.findDirectoriesContaining("people*.json", "out")
    const excludedDirs = ["people/Astronomers_fichiers", "people/witness", "people/author"]
    const scientistsDirectoryStep = this.createScientists(dirs, excludedDirs, outputFunc, config, service)
    const ufologistsDirectoryStep = this.createUfologists(dirs, excludedDirs, outputFunc, config, service)
    const ufoWitnessesDirectoryStep = this.createWitnesses(dirs, excludedDirs, outputFunc, config, service)
    const astronomersDirectoryStep = this.createAstronomers(dirs, excludedDirs, outputFunc, config, service)
    const contacteesDirectoryStep = this.createContactees(dirs, excludedDirs, outputFunc, config, service)
    const pilotsDirectoryStep = this.createPilots(dirs, excludedDirs, outputFunc, config, service)
    const militaryDirectoryStep = this.createMilitary(dirs, excludedDirs, outputFunc, config, service)
    const politiciansDirectoryStep = this.createPolicitians(dirs, excludedDirs, outputFunc, config, service)
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
      ...politiciansDirectoryStep,
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

  static createPolicitians(dirs: string[], excludedDirs: string[],
                           outputFunc: OutputFunc, config: SsgConfig, service: PeopleService) {
    return [
      new PeopleDirectoryStep(dirs, excludedDirs, "people/politicians.html", outputFunc, config,
        [Occupation.politician], service, "politicians directories"),
      new PeopleDirectoryStep(dirs, excludedDirs, "people/dirigeants.html", outputFunc, config,
        [Occupation.leader], service, "politcian leaders directories")
    ]
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
    let peopleList = await this.service.getFromDirs(context, dirNames)
    const outputPath = this.config.getOutputPath(context)
    const output = context.newOutput(outputPath)
    if (this.filterOccupations.length > 0) {
      peopleList = peopleList.filter((p: People) => p.occupations.some(o => this.filterOccupations.includes(o)))
    }
    const pseudoPeopleList = peopleList.reduce((prev: KnownPeople[], p: KnownPeople) => {
      if (p.pseudonyms?.length > 0) {
        for (const pseudonym of p.pseudonyms) {
          const pseudo = new KnownPeople(p.firstNames, p.lastName, p.pseudonyms, p.occupations, p.countries,
            p.discredited, p.birthTime, p.deathTime, p.gender, p.dirName, p.image)
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
    const ul = this.toList(context, peopleList, pseudoPeopleList, allCountries, occupations)
    output.contents = context.file.contents.replace(`<!--#echo var="directories" -->`, ul.outerHTML)
    {
      let countriesHtml = ""
      for (const country of Array.from(allCountries).sort()) {
        const countryStr = context.messages.country[country].title
        countriesHtml += `<span class="option"><label><input type="checkbox" id="country-${country}" onchange="findPeople(event)"> ${countryStr}</label></span>`
      }
      output.contents = output.contents.replace(`<!--#echo var="countries" -->`,
        HtmlTag.toString("div", countriesHtml, {id: "countries"}))
    }
    {
      let occupationsHtml = ""
      for (const occupation of Array.from(occupations).sort()) {
        const occupationStr = StringUtil.capitalizeFirstLetter(
          context.messages.people.occupation[occupation](Gender.male))
        occupationsHtml += `<span class="option"><label><input type="checkbox" id="occupation-${occupation}" onchange="findPeople(event)"> ${occupationStr}</label></span>`
      }
      output.contents = output.contents.replace(`<!--#echo var="occupations" -->`,
        HtmlTag.toString("div", occupationsHtml, {id: "occupations"}))
    }
    await this.outputFunc(context, output)
  }

  protected toList(context: HtmlRR0SsgContext, peopleList: KnownPeople[], pseudoPeopleList: KnownPeople[],
                   allCountries: Set<CountryCode>, occupations: Set<Occupation>): HTMLUListElement {
    const file = context.file
    const listItems = peopleList.map(
      people => this.toListItem(context, people, pseudoPeopleList, allCountries, occupations))
    const ul = file.document.createElement("ul")
    ul.append(...listItems)
    ul.className = "links"
    return ul
  }

  protected toListItem(context: HtmlRR0SsgContext, people: People, pseudoPeopleList: KnownPeople[],
                       allCountries: Set<CountryCode>, occupations: Set<Occupation>) {
    const ref = this.service.getLink(context, people, pseudoPeopleList, allCountries, occupations,
      this.filterOccupations)
    const item = context.file.document.createElement("li")
    item.appendChild(ref)
    return item
  }
}
