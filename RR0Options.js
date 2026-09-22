import { glob } from "glob"

/**
 * @typedef RR0Options
 * @property {string} mail
 * @property {{}} dataOptions
 * @property {string} siteBaseUrl
 * @property {string} sourceRegistryFileName
 * @property {{}} directoryOptions
 *
 */
/**
 * Chronological order: a period's page comes before the pages of its sub-periods ("1960" before "April 1960"),
 * which a plain sort does not do since "04/index.html" < "index.html".
 */
function periodFirst(a, b) {
  const dirA = a.substring(0, a.lastIndexOf("/") + 1)
  const dirB = b.substring(0, b.lastIndexOf("/") + 1)
  return dirA < dirB ? -1 : dirA > dirB ? 1 : 0
}

export async function getTimeFiles() {
  const minusYearFiles = await glob("time/-?/?/?/?/index.html")
  const year1Files = await glob("time/?/index.html")
  const year2Files = await glob("time/?/?/index.html")
  const year3Files = await glob("time/?/?/?/index.html")
  const year4Files = await glob("time/?/?/?/?/index.html")
  const monthFiles = await glob("time/?/?/?/?/??/index.html")
  const dayFiles = await glob("time/?/?/?/?/??/??/index.html")
  return year1Files.concat(year2Files).concat(year3Files).concat(year4Files).concat(
    minusYearFiles).concat(monthFiles).concat(dayFiles).sort(periodFirst)
}

export async function getDataOptions(timeFiles) {
  const orgFiles = await glob("org/**/index.html")
  const sourceRegistryFileName = "source/index.json"
  /** @type PeopleDirectoryStepOptions */
  const directoryOptions = {
    root: "people/index.html",
    scientists: "people/scientifiques.html",
    ufologists: "people/ufologues.html",
    ufoWitnesses: "people/witness/index.html",
    astronomers: "people/astronomes.html",
    contactees: "people/contactes.html",
    pilots: "people/pilotes.html",
    military: "people/militaires.html",
    softwareEngineers: "tech/info/Personnes.html",
    politicians: "people/politicians.html",
    rulers: "people/dirigeants.html"
  }
  const siteBaseUrl = "https://rr0.org/"
  const mail = "rr0@rr0.org"
  /** @type TimeOptions */
  const timeOptions = { rootDir: "time", files: timeFiles }
  /** @type DataOptions */
  const orgOptions = { rootDir: "org", files: orgFiles }
  const dataOptions = { time: timeOptions, org: orgOptions }
  return { mail, dataOptions, siteBaseUrl, sourceRegistryFileName, directoryOptions }
}

/** @rerturn {RR0Options} */
export async function getRR0Options() {
  const timeFiles = await getTimeFiles()
  return getDataOptions(timeFiles)
}
