import {TimeContext} from "./time/TimeContext"
import {CaseDirectoryStep} from "./science/crypto/ufo/enquete/dossier/CaseDirectoryStep"
import {PeopleDirectoryStep} from "./people/PeopleDirectoryStep"
import {Occupation} from "./people/Occupation"
import {promise as glob} from "glob-promise"
import {GooglePlaceService} from "./place/GooglePlaceService"
import {OrganizationService} from "./org/OrganizationService"
import {RR0SsgContextImpl} from "./RR0SsgContext"
import {CLI} from "./util/cli/CLI"
import {
  AngularExpressionReplaceCommand,
  ClassDomRegexReplaceCommand,
  ClassDomReplaceCommand,
  ContentStepConfig,
  CopyStep,
  HtAccessToNetlifyConfigReplaceCommand,
  HtmlTagReplaceCommand,
  Ssg,
  SsgConfig,
  SsgContext,
  SsgFile,
  SsgStep,
  SsiEchoVarReplaceCommand,
  SsiIfReplaceCommand,
  SsiIncludeReplaceCommand,
  SsiLastModifiedReplaceCommand,
  SsiSetVarReplaceCommand,
  StringEchoVarReplaceCommand
} from "ssg-api"
import {LanguageReplaceCommand} from "./lang/LanguageReplaceCommand"
import {TitleReplaceCommand} from "./time/TitleReplaceCommand"
import {PeopleReplacerFactory} from "./people/PeopleReplacerFactory"
import {SourceReplacerFactory} from "./source/SourceReplacerFactory"
import {timeDefaultHandler} from "./time/TimeDefaultTitle"
import {NoteReplacerFactory} from "./note/NoteReplacerFactory"
import {WitnessReplacerFactory} from "./people/witness/WitnessReplacerFactory"
import {AnchorReplaceCommand} from "./anchor/AnchorReplaceCommand"
import {TimeLinkDefaultHandler} from "./time/TimeLinkDefaultHandler"
import {AuthorReplaceCommand} from "./people/author/AuthorReplaceCommand"
import {rr0DefaultCopyright} from "./RR0DefaultCopyright"
import {PlaceReplacerFactory} from "./place/PlaceReplacerFactory"
import {TimeReplacerFactory} from "./time/TimeReplacerFactory"
import {LinkReplaceCommand} from "./LinkReplaceCommand"
import {OutlineReplaceCommand} from "./outline/OutlineReplaceCommand"
import {RR0ContentStep} from "./RR0ContentStep"
import {ImageRegistryCommand} from "./ImageRegistryCommand"

const args = CLI.getArgs()
const cliContents = args.contents
const contentRoots = cliContents
  ? cliContents.split(",")
  : [
    "time/**/*.html",
    "index.html", "404.html", "googlebe03dcf00678bb7c.html", "Contact.html", "Copyright.html", "preambule.html", "FAQ.html", "Referencement.html",
    "croyance/**/*.html",
    "droit/**/*.html",
    "org/**/*.html",
    "people/**/*.html",
    "place/**/*.html",
    "politique/**/*.html",
    "science/**/*.html",
    "tech/**/*.html",
    "politique/**/*.html",
    "udb/*.html",
    "js/**/*.html"
  ]
const copiesArg = args.copies
const copies = copiesArg ? copiesArg.split(",") : [
  "favicon.ico", "manifest.json", "opensearch.xml", "apple-touch-icon.png", "apple-touch-icon_400x400.png", "screenshot1.jpg",
  "rr0.css", "print.css",
  "rr0.js",
  // "**/*.png", "**/*.jpg", "**/*.gif", "**/*.webp", "!out/**/*",
  "people/index.js",
  "people/lier.svg",
  "people/index.css",
  "udb/**/*.js",
  "udb/netlify.toml",
  "udb/input/db/udb/data/*.*"
]
const config: SsgConfig = {
  outDir: "out"
}

async function outputFunc(context: SsgContext, info: SsgFile, outDir = config.outDir + "/"): Promise<void> {
  info.name = `${outDir}${info.name}`
  try {
    context.log("Writing", info.name)
    await info.write()
  } catch (e) {
    context.error(info.name, e)
  }
}

const timeFormat: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
  hour: "2-digit",
  minute: "2-digit"
}
const timeContext = new TimeContext(timeFormat)
const context = new RR0SsgContextImpl("fr", timeContext)
context.setVar("mail", "javarome@gmail.com")

const htAccessToNetlifyConfig: ContentStepConfig = {
  replacements: [new HtAccessToNetlifyConfigReplaceCommand("https://rr0.org/")],
  roots: [".htaccess"],
  getOutputFile(context: SsgContext): SsgFile {
    return SsgFile.read(context, "netlify.toml", "utf-8")
  }
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

async function findDirectoriesContaining(fileName) {
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index
  }

  return (await glob("**/" + fileName))
    .map(path => path.substring(0, path.lastIndexOf("/")))
    .filter(onlyUnique)
}

async function createPeopleSteps(): Promise<SsgStep[]> {
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

async function createUfoCasesStep(): Promise<CaseDirectoryStep> {
  const ufoCasesDirectories = await findDirectoriesContaining("case.json")
  return new CaseDirectoryStep(
    ufoCasesDirectories,
    ["science/crypto/ufo/enquete/dossier/canular"],
    "science/crypto/ufo/enquete/dossier/index.html",
    outputFunc, config)
}

getTimeFiles().then(async (timeFiles) => {
  const ufoCasesDirectoryStep = await createUfoCasesStep()
  const peopleSteps = await createPeopleSteps()

  const apiKey = process.env.GOOGLE_MAPS_API_KEY
  if (!apiKey) {
    throw Error("GOOGLE_MAPS_API_KEY is required")
  }
  context.setVar("mapsApiKey", apiKey)
  const placeService = new GooglePlaceService("place", apiKey)

  const orgService = new OrganizationService("org")

  const contentConfigs: ContentStepConfig[] = [
    htAccessToNetlifyConfig,
    {
      roots: contentRoots,
      replacements: [
        new SsiIncludeReplaceCommand(),
        new LanguageReplaceCommand(),
        new StringEchoVarReplaceCommand("mail"),
        new StringEchoVarReplaceCommand("mapsApiKey"),
        new AngularExpressionReplaceCommand(),
        new SsiEchoVarReplaceCommand("copyright", [rr0DefaultCopyright]),
        new SsiIfReplaceCommand(),
        new SsiSetVarReplaceCommand("title", (match: string, ...args: any[]) => `<title>${args[0]}</title>`),
        new SsiSetVarReplaceCommand("url",
          (match: string, ...args: any[]) => `<meta name="url" content="${args[0]}"/>`),
        new SsiLastModifiedReplaceCommand(context.time.options),
        new TitleReplaceCommand([timeDefaultHandler]),
        new AuthorReplaceCommand(),
        new HtmlTagReplaceCommand("time", new TimeReplacerFactory(timeFiles)),
        new ClassDomRegexReplaceCommand("people", new PeopleReplacerFactory()),
        new ClassDomReplaceCommand("place", new PlaceReplacerFactory(placeService, orgService)),
        new ClassDomRegexReplaceCommand("temoin(.?)", new WitnessReplacerFactory()),
        new ClassDomReplaceCommand("note", new NoteReplacerFactory()),
        new ClassDomReplaceCommand("source", new SourceReplacerFactory()),
        new LinkReplaceCommand(new TimeLinkDefaultHandler(timeFiles)),
        new OutlineReplaceCommand(),
        new AnchorReplaceCommand("https://rr0.org/"),
        new ImageRegistryCommand(config.outDir)
      ],
      getOutputFile(context: SsgContext): SsgFile {
        return context.outputFile
      }
    }
  ]
  new Ssg(config)
    .add(new RR0ContentStep(contentConfigs, outputFunc))
    .add(ufoCasesDirectoryStep)
    .add(...peopleSteps)
    .add(new CopyStep(copies, config))
    .start(context)
    .then(result => context.log("Completed", result))
    .catch(err => {
      try {
        context.error(err, context.inputFile.name, "=>", context.outputFile?.name)
      } catch (e) {
        context.error(err)
      }
    })
})
