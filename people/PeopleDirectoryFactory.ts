import { Occupation } from "./Occupation"
import { promise as glob } from "glob-promise"
import { OutputFunc, SsgConfig } from "ssg-api"
import { RR0FileUtil } from "../util/file/RR0FileUtil"
import { PeopleService } from "./PeopleService"
import { PeopleDirectoryStep } from "./PeopleDirectoryStep"

/**
 * Scan directories for people information, then populates a template with collected data.
 */
export class PeopleDirectoryFactory {

  constructor(protected outputFunc: OutputFunc, protected config: SsgConfig, protected service: PeopleService,
              protected excludedDirs = ["people/Astronomers_fichiers", "people/witness", "people/author"]
  ) {
  }

  async create(): Promise<PeopleDirectoryStep[]> {
    const dirs = RR0FileUtil.findDirectoriesContaining("people*.json", "out")
    const scientistsDirectoryStep = this.createScientists(dirs)
    const ufologistsDirectoryStep = this.createUfologists(dirs)
    const ufoWitnessesDirectoryStep = this.createWitnesses(dirs)
    const astronomersDirectoryStep = this.createAstronomers(dirs)
    const contacteesDirectoryStep = this.createContactees(dirs)
    const pilotsDirectoryStep = this.createPilots(dirs)
    const militaryDirectoryStep = this.createMilitary(dirs)
    const politiciansDirectoryStep = this.createPolicitians(dirs)
    const softwareEngineersDirectoryStep = this.createSoftwareEngineers(dirs)
    const allPeopleDirectoryStep = this.createAll(dirs)
    const letterDirectorySteps = await this.createLetters()
    return [
      scientistsDirectoryStep,
      ufologistsDirectoryStep,
      ufoWitnessesDirectoryStep,
      astronomersDirectoryStep,
      contacteesDirectoryStep,
      pilotsDirectoryStep,
      militaryDirectoryStep,
      softwareEngineersDirectoryStep,
      ...politiciansDirectoryStep,
      allPeopleDirectoryStep,
      ...letterDirectorySteps
    ]
  }

  async createLetters() {
    const letterDirs = await glob("people/*/")
    const peopleLetterFiles = letterDirs.filter(l => /(.*?)\/[a-z]\//.test(l))
    const letterDirectorySteps: PeopleDirectoryStep[] = []
    for (const peopleLetterFile of peopleLetterFiles) {
      const c = peopleLetterFile.charAt(peopleLetterFile.length - 2)
      letterDirectorySteps.push(new PeopleDirectoryStep(
        [`people/${c}/*/`],
        [],
        `people/${c}/index.html`,
        this.outputFunc, this.config, [], this.service))
    }
    return letterDirectorySteps
  }

  createAll(dirs: string[]) {
    return new PeopleDirectoryStep(dirs, this.excludedDirs, "people/index.html", this.outputFunc, this.config, [],
      this.service, "all people directories")
  }

  createMilitary(dirs: string[]): PeopleDirectoryStep {
    return new PeopleDirectoryStep(dirs, this.excludedDirs, "people/militaires.html", this.outputFunc, this.config,
      [Occupation.military], this.service, "military people directories")
  }

  createPolicitians(dirs: string[]): PeopleDirectoryStep[] {
    return [
      new PeopleDirectoryStep(dirs, this.excludedDirs, "people/politicians.html", this.outputFunc, this.config,
        [Occupation.politician], this.service, "politicians directories"),
      new PeopleDirectoryStep(dirs, this.excludedDirs, "people/dirigeants.html", this.outputFunc, this.config,
        [Occupation.leader], this.service, "politcian leaders directories")
    ]
  }

  createSoftwareEngineers(dirs: string[]): PeopleDirectoryStep {
    return new PeopleDirectoryStep(dirs, this.excludedDirs, "tech/info/Personnes.html", this.outputFunc, this.config,
      [Occupation.softwareEngineer], this.service, "software engineers directories")
  }

  createPilots(dirs: string[]) {
    return new PeopleDirectoryStep(dirs, this.excludedDirs, "people/pilotes.html", this.outputFunc, this.config,
      [Occupation.astronaut, Occupation.pilot], this.service, "pilots directories")
  }

  createContactees(dirs: string[]) {
    return new PeopleDirectoryStep(dirs, this.excludedDirs, "people/contactes.html", this.outputFunc, this.config,
      [Occupation.contactee], this.service, "contactees directories")
  }

  createAstronomers(dirs: string[]) {
    return new PeopleDirectoryStep(dirs, this.excludedDirs, "people/astronomes.html", this.outputFunc, this.config,
      [Occupation.astronomer], this.service, "astronomers directories")
  }

  createWitnesses(dirs: string[]) {
    return new PeopleDirectoryStep(dirs, this.excludedDirs, "people/witness/index.html", this.outputFunc, this.config,
      [Occupation.ufoWitness, Occupation.ufoWitness2, Occupation.abductee, Occupation.contactee], this.service,
      `UFO witnesses directories`)
  }

  createUfologists(dirs: string[]) {
    return new PeopleDirectoryStep(dirs, this.excludedDirs, "people/ufologues.html", this.outputFunc, this.config,
      [Occupation.ufologist], this.service, "ufologists directories")
  }

  createScientists(dirs: string[]) {
    return new PeopleDirectoryStep(dirs, this.excludedDirs,
      "people/scientifiques.html",
      this.outputFunc, this.config,
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
        Occupation.philosopher, Occupation.psychologist, Occupation.physicist, Occupation.psychiatrist,
        Occupation.radioastronomer,
        Occupation.sociologist
      ],
      this.service,
      "scientists directories"
    )
  }
}
