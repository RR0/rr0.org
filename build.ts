import { FileContents } from "@javarome/fileutil"
import {
  BaseReplaceCommand,
  CLI,
  CMSGenerator,
  CodeReplacerFactory,
  DataOptions,
  DescriptionReplaceCommand,
  IndexedReplacerFactory,
  LanguageReplaceCommand,
  PeopleDirectoryStepOptions,
  PlaceReplacerFactory,
  RR0CaseMapping,
  rr0DefaultCopyright,
  RR0Mapping,
  TimeOptions,
  UnitReplaceCommand,
  WitnessReplacerFactory
} from "@rr0/cms"
import { glob } from "glob"
import {
  AngularExpressionReplaceCommand,
  ClassDomReplaceCommand,
  DomReplaceCommand,
  SsiEchoVarReplaceCommand,
  SsiIfReplaceCommand,
  SsiLastModifiedReplaceCommand,
  SsiSetVarReplaceCommand,
  StringEchoVarReplaceCommand
} from "ssg-api"

interface CMSGeneratorArgs {
  /**
   * Configuration file
   */
  config?: string

  /**
   * If the search index must be regenerated or not.
   * For ex: "pages,sources"
   */
  reindex?: string[]

  /**
   * Comma-separated list of file patterns to parse as contents.
   */
  contents?: string[]

  /**
   * Comma-separated list of file patterns to copy to out dir.
   */
  copies?: string[]

  /**
   * Comma-separated list of file patterns to books to generate TOCs for.
   */
  books?: string

  /**
   * Force re-generation even if file has not changed.
   */
  force?: string
}

console.time("ssg")
let args = new CLI().getArgs<CMSGeneratorArgs>()
const configFile = args.config
if (configFile) {
  args = JSON.parse(FileContents.read(configFile).contents)
}
const cliContents = args.contents
console.debug("contents", cliContents)

const mandatoryRoots = ["index.html", "people/*.html", "science/crypto/ufo/enquete/dossier/*.html"]
const contentRoots = (cliContents
  ? cliContents
  : [
    "croyance/**/*.html",
    "index.html", "404.html", "googlebe03dcf00678bb7c.html", "Contact.html", "Copyright.html", "preambule.html", "FAQ.html", "Referencement.html",
    "time/**/*.html",
    "book/**/*.html",
    "droit/**/*.html",
    "org/**/*.html",
    "people/**/*.html",
    "place/**/*.html",
    "politique/**/*.html",
    "science/**/*.html",
    "tech/**/*.html",
    "udb/*.html",
    "js/**/*.html"
  ]).concat(mandatoryRoots)
const copiesArg = args.copies
const copies = copiesArg ? copiesArg : [
  "favicon.ico", "manifest.json", "opensearch.xml", "apple-touch-icon.png", "apple-touch-icon_400x400.png", "screenshot1.jpg",
  "rr0.css", "map.css", "diagram.css", "print.css", "figure.css", "section.css", "table.css", "nav.css",
  // "**/*.png", "**/*.jpg", "**/*.gif", "**/*.webp", "!out/**/*",
  "**/*.cmmn", "**/*.bpmn",
  "tech/info/soft/reseau/protocole/index.js", "tech/info/soft/reseau/protocole/ports.json", "tech/info/soft/reseau/protocole/index.css",
  "tech/info/soft/data/doc/index.js", "tech/info/soft/data/doc/index.json", "tech/info/soft/data/doc/index.css",
  "people/index.js", "people/index.css", "people/witness/index.css",
  "search/SearchComponent.mjs", "search/index.json", "search/search.css",
  "source/index.css", "note/index.css",
  "link.css", "quote.css",
  "footer.css", "images/facebook.svg", "images/instagram.svg", "images/medium.svg", "images/youtube.svg", "images/X_logo.svg", "images/github.svg", "images/email.svg", "images/tiktok.svg", "images/bluesky.svg",
  "time/DualRangeComponent.mjs",
  "index/index.js", "lang/form.js", "lang/form.css", "lang/speech.js", "lang/speech.css",
  "croyance/divin/theisme/mono/livre/islam/coran/index.js",
  "nav.js"
]
const outDir = "out"
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY
if (!googleMapsApiKey) {
  throw Error("GOOGLE_MAPS_API_KEY is required")
}
const timeFormat: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
  hour: "2-digit",
  minute: "2-digit"
}

async function getTimeFiles(): Promise<string[]> {
  const minusYearFiles = await glob("time/-?/?/?/?/index.html")
  const year1Files = await glob("time/?/index.html")
  const year2Files = await glob("time/?/?/index.html")
  const year3Files = await glob("time/?/?/?/index.html")
  const year4Files = await glob("time/?/?/?/?/index.html")
  const monthFiles = await glob("time/?/?/?/?/??/index.html")
  const dayFiles = await glob("time/?/?/?/?/??/??/index.html")
  return year1Files.concat(year2Files).concat(year3Files).concat(year4Files).concat(
    minusYearFiles).concat(monthFiles).concat(dayFiles).sort()
}

const directoryPages = [
  "people/index.html", "people/witness/index.html", "people/militaires.html", "people/scientifiques.html", "people/astronomes.html", "people/politicians.html", "people/dirigeants.html", "people/pilotes.html", "people/contactes.html", "people/ufologues.html", "tech/info/Personnes.html", "people/Contributeurs.html"
]
getTimeFiles().then(async (timeFiles) => {
  const orgFiles = await glob("org/**/index.html")
  const sourceRegistryFileName = "source/index.json"
  const directoryOptions: PeopleDirectoryStepOptions = {
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
  const timeOptions: TimeOptions = {rootDir: "time", files: timeFiles}
  const orgOptions: DataOptions = {rootDir: "org", files: orgFiles}
  const dataOptions = {
    time: timeOptions,
    org: orgOptions
  }
  const mappings: RR0CaseMapping<any>[] = [
    new RR0Mapping({read: ["fetch"], write: ["backup"]})
  ]
  const pageReplacers = [new BaseReplaceCommand("/"),
    new LanguageReplaceCommand(),
    new SsiEchoVarReplaceCommand("copyright", [rr0DefaultCopyright]),
    new StringEchoVarReplaceCommand(),
    new AngularExpressionReplaceCommand(),
    new SsiIfReplaceCommand(),
    new SsiSetVarReplaceCommand("title", (_match: string, ...args: any[]) => `<title>${args[0]}</title>`),
    new SsiSetVarReplaceCommand("url",
      (_match: string, ...args: any[]) => `<meta name="url" content="${args[0]}"/>`),
    new SsiLastModifiedReplaceCommand(timeFormat),
    new DescriptionReplaceCommand("UFO data for french-reading people", "abstract")
  ]
  const contentsReplacers = [
    new DomReplaceCommand("code", new CodeReplacerFactory()),
    new ClassDomReplaceCommand(new PlaceReplacerFactory(), "place"),
    new ClassDomReplaceCommand(new WitnessReplacerFactory(), "temoin", "temoin1", "temoin2", "temoin3"),
    new ClassDomReplaceCommand(new IndexedReplacerFactory(), "indexed"),
    new UnitReplaceCommand()
  ]
  const generator = new CMSGenerator({
    contentRoots, copies, outDir, locale: "fr", googleMapsApiKey, mail, dataOptions,
    siteBaseUrl, timeFormat, directoryPages,
    ufoCaseDirectoryFile: "science/crypto/ufo/enquete/dossier/index.html",
    ufoCasesExclusions: ["science/crypto/ufo/enquete/dossier/canular"], sourceRegistryFileName,
    directoryExcluded: ["people/Astronomers_fichiers", "people/witness", "people/author"],
    directoryOptions,
    mappings: mappings,
    contentReplacers: [...pageReplacers, ...contentsReplacers]
  })
  await generator.generate(args)
})
