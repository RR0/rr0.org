import { Occupation } from "./Occupation.js"
import { OutputFunc, SsgConfig } from "ssg-api"
import { RR0FileUtil } from "../util/file/RR0FileUtil.js"
import { PeopleService } from "./PeopleService.js"
import { PeopleDirectoryStep, peopleOccupationFilter } from "./PeopleDirectoryStep.js"
import { glob } from "glob"
import { People } from "./People.js"
import path from "path"

/**
 * Scan directories for people information, then populates a template with collected data.
 */
export class PeopleDirectoryStepFactory {

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
    const peopleLetterFiles = letterDirs.filter(l => /(.+)\/[a-z]$/.test(l))
    const letterDirectorySteps: PeopleDirectoryStep[] = []
    for (const peopleLetterFile of peopleLetterFiles) {
      const c = peopleLetterFile.charAt(peopleLetterFile.length - 1)
      const peopleDir = `people/${c}/`
      const peopleDirectoryStep = new PeopleDirectoryStep(`directory of people with name starting with "${c}"`,
        [peopleDir], [], path.join(peopleDir, "index.html"), this.outputFunc, this.config, this.service,
        (p: People) => p.dirName.startsWith(peopleDir))
      letterDirectorySteps.push(peopleDirectoryStep)
    }
    return letterDirectorySteps
  }

  createAll(dirs: string[]) {
    return new PeopleDirectoryStep("all people directories", dirs, this.excludedDirs, "people/index.html",
      this.outputFunc, this.config, this.service)
  }

  createMilitary(dirs: string[]): PeopleDirectoryStep {
    return new PeopleDirectoryStep("military people directories", dirs, this.excludedDirs, "people/militaires.html",
      this.outputFunc, this.config, this.service, peopleOccupationFilter([Occupation.military]))
  }

  createPolicitians(dirs: string[]): PeopleDirectoryStep[] {
    return [
      new PeopleDirectoryStep("politicians directories", dirs, this.excludedDirs, "people/politicians.html",
        this.outputFunc, this.config, this.service, peopleOccupationFilter([Occupation.politician])),
      new PeopleDirectoryStep("politician leaders directories", dirs, this.excludedDirs, "people/dirigeants.html",
        this.outputFunc, this.config, this.service, peopleOccupationFilter([Occupation.leader]))
    ]
  }

  createSoftwareEngineers(dirs: string[]): PeopleDirectoryStep {
    return new PeopleDirectoryStep("software engineers directories", dirs, this.excludedDirs,
      "tech/info/Personnes.html", this.outputFunc, this.config, this.service,
      peopleOccupationFilter([Occupation.softwareEngineer]))
  }

  createPilots(dirs: string[]) {
    return new PeopleDirectoryStep("pilots directories", dirs, this.excludedDirs, "people/pilotes.html",
      this.outputFunc, this.config, this.service, peopleOccupationFilter([Occupation.astronaut, Occupation.pilot]))
  }

  createContactees(dirs: string[]) {
    return new PeopleDirectoryStep("contactees directories", dirs, this.excludedDirs, "people/contactes.html",
      this.outputFunc, this.config, this.service, peopleOccupationFilter([Occupation.contactee]))
  }

  createAstronomers(dirs: string[]) {
    return new PeopleDirectoryStep("astronomers directories", dirs, this.excludedDirs, "people/astronomes.html",
      this.outputFunc, this.config, this.service, peopleOccupationFilter([Occupation.astronomer]))
  }

  createWitnesses(dirs: string[]) {
    return new PeopleDirectoryStep(`UFO witnesses directories`, dirs, this.excludedDirs, "people/witness/index.html",
      this.outputFunc, this.config, this.service,
      peopleOccupationFilter(
        [Occupation.ufoWitness, Occupation.ufoWitness2, Occupation.abductee, Occupation.contactee]))
  }

  createUfologists(dirs: string[]) {
    return new PeopleDirectoryStep("ufologists directories", dirs, this.excludedDirs, "people/ufologues.html",
      this.outputFunc, this.config, this.service, peopleOccupationFilter([Occupation.ufologist]))
  }

  createScientists(dirs: string[]) {
    return new PeopleDirectoryStep("scientists directories", dirs, this.excludedDirs, "people/scientifiques.html",
      this.outputFunc, this.config, this.service, peopleOccupationFilter([
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
      ]))
  }
}
