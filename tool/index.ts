import {writeFileInfo} from "./util/file/FileUtil"
import {Ssg, SsgConfig} from "./Ssg"
import {SsiIncludeReplaceCommand} from "./step/content/replace/html/ssi/SsiIncludeReplaceCommand"
import {SsiIfReplaceCommand} from "./step/content/replace/html/ssi/SsiIfReplaceCommand"
import {SsiLastModifiedReplaceCommand} from "./step/content/replace/html/ssi/SsiLastModifiedReplaceCommand"
import {
  HtAccessToNetlifyRedirectsReplaceCommand
} from "./step/content/replace/htaccess/HtAccessToNetlifyRedirectsReplaceCommand"
import {SsiSetVarReplaceCommand} from "./step/content/replace/html/ssi/SsiSetVarCommand"
import {HtmlTagReplaceCommand} from "./step/content/replace/html/tag/HtmlTagReplaceCommand"
import {TimeReplacerFactory} from "./step/content/replace/html/time/TimeReplacerFactory"
import {SsgContext} from "./SsgContext"
import {ClassRegexReplaceCommand} from "./step/content/replace/html/class/ClassRegexReplaceCommand"
import {PeopleReplacerFactory} from "./step/content/replace/html/people/PeopleReplacerFactory"
import {TimeContext} from "./step/content/replace/html/time/TimeContext"
import {ContentStep, ContentStepConfig} from "./step/content/ContentStep"
import {CopyStep} from "./step/CopyStep"
import {TitleReplaceCommand} from "./step/content/replace/html/head/title/TitleReplaceCommand"
import {FileInfo, getFileInfo} from "./util/file/FileInfo"
import {CaseDirectoryStep} from "./step/CaseDirectoryStep"
import {PeopleDirectoryStep} from "./step/PeopleDirectoryStep"
import {Occupation} from "./model/people/Occupation"
import {CLI} from "./util/cli/CLI"
import {
  HtAccessToNetlifyConfigReplaceCommand
} from "./step/content/replace/htaccess/HtAccessToNetlifyConfigReplaceCommand"
import {timeDefaultHandler} from "./step/content/replace/html/head/title/TimeDefaultTitle"
import {rr0DefaultCopyright} from "./step/content/replace/html/head/meta/copyright/RR0DefaultCopyright"
import {CaviarReplacerFactory} from "./step/content/replace/html/caviar/CaviarReplacerFactory"
import {NoteReplacerFactory} from "./step/content/replace/html/note/NoteReplacerFactory"
import {SourceReplacerFactory} from "./step/content/replace/html/source/SourceReplacerFactory"
import {ClassDomReplaceCommand} from "./step/content/replace/html/class/ClassDomReplaceCommand"
import {LinkReplaceCommand} from "./step/content/replace/html/head/link/LinkReplaceCommand"
import {OutlineReplaceCommand} from "./step/content/replace/html/outline/OutlineReplaceCommand"
import {AuthorReplaceCommand} from "./step/content/replace/html/head/meta/author/AuthorReplaceCommand"
import {TimeLinkDefaultHandler} from "./step/content/replace/html/head/link/TimeLinkDefaultHandler"
import {promise as glob} from "glob-promise"
import {SsiEchoVarReplaceCommand} from "./step/content/replace/html/ssi/SsiEchoVarCommand"
import {SsgContextImpl} from "./SsgContextImpl"
import {StringEchoVarReplaceCommand} from "./step/content/replace/html/StringEchoVarReplaceCommand"
import {GooglePlaceService} from "./model/place/GooglePlaceService"
import {PlaceReplacerFactory} from "./step/content/replace/html/place/PlaceReplacerFactory"
import {OrganizationService} from "./model/org/OrganizationService"
import {AnchorReplaceCommand} from "./step/content/replace/html/anchor/AnchorReplaceCommand"

const args = CLI.getArgs()
const contents = args.contents
const contentRoots = contents
  ? contents.split(",")
  : [
    "index.html", "404.html", "googlebe03dcf00678bb7c.html", "Contact.html", "Copyright.html", "preambule.html", "FAQ.html", "Referencement.html",
    "croyance/**/*.html",
    "droit/**/*.html",
    "org/**/*.html",
    "people/**/*.html",
    "place/**/*.html",
    "politique/**/*.html",
    "science/**/*.html",
    "tech/**/*.html",
    "time/**/*.html",
    "politique/**/*.html",
    "udb/*.html",
    "js/**/*.html"
  ]
const copiesArg = args.copies
const copies = copiesArg ? copiesArg.split(",") : [
  "favicon.ico", "manifest.json", "opensearch.xml",
  "rr0.css", "print.css",
  "rr0.js",
  "**/*.png", "**/*.jpg", "**/*.gif", "**/*.webp", "!out/**/*",
  "people/index.js",
  "people/index.css",
  "udb/**/*.js",
  "udb/netlify.toml",
  "udb/input/db/udb/data/*.*"
]
const config: SsgConfig = {
  outDir: "out"
}

async function outputFunc(context: SsgContext, info: FileInfo, outDir = config.outDir + "/"): Promise<void> {
  info.name = `${outDir}${info.name}`
  try {
    console.log("Writing", info.name)
    await writeFileInfo(info)
  } catch (e) {
    console.error(info.name, e)
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
const context = new SsgContextImpl("fr", timeContext)
context.setVar("mail", "javarome@gmail.com")

const htAccessToNetlifyRedirectsConfig: ContentStepConfig = {
  roots: [".htaccess"],
  replacements: [new HtAccessToNetlifyRedirectsReplaceCommand("https://rr0.org/")],
  getOutputFile(context: SsgContext): FileInfo {
    const inputFile = context.inputFile
    return new FileInfo("_redirects", inputFile.encoding, inputFile.contents, inputFile.lastModified, inputFile.lang)
  }
}

const htAccessToNetlifyConfig: ContentStepConfig = {
  roots: [".htaccess"],
  replacements: [new HtAccessToNetlifyConfigReplaceCommand("https://rr0.org/")],
  getOutputFile(context: SsgContext): FileInfo {
    return getFileInfo(context, "netlify.toml", "utf-8")
  }
}

async function getTimeFiles(): Promise<string[]> {
  const minusYearFiles = await glob("time/-?/?/?/?")
  const year1Files = await glob("time/?")
  const year2Files = await glob("time/?/?")
  const year3Files = await glob("time/?/?/?")
  const year4Files = await glob("time/?/?/?/?")
  const monthFiles = await glob("time/?/?/?/?/??")
  const dayFiles = await glob("time/?/?/?/?/??/??")
  const timeFiles = year1Files.concat(year2Files).concat(year3Files).concat(year4Files).concat(
    minusYearFiles).concat(monthFiles).concat(dayFiles).sort()
  return timeFiles
}

const scientistsDirectoryStep = new PeopleDirectoryStep(
  ["people/*/*/"],
  ["people/Astronomers_fichiers"],
  "people/scientifiques.html",
  outputFunc, [
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
  ])

const ufologistsDirectoryStep = new PeopleDirectoryStep(
  ["people/*/*/"],
  ["people/Astronomers_fichiers"],
  "people/ufologues.html",
  outputFunc, [Occupation.ufologist])

const astronomersDirectoryStep = new PeopleDirectoryStep(
  ["people/*/*/"],
  ["people/Astronomers_fichiers"],
  "people/astronomes.html",
  outputFunc, [Occupation.astronomer])

const contacteesDirectoryStep = new PeopleDirectoryStep(
  ["people/*/*/", "science/crypto/ufo/enquete/dossier/Villa"],
  ["people/Astronomers_fichiers"],
  "people/contactes.html",
  outputFunc, [Occupation.contactee])

const pilotsDirectoryStep = new PeopleDirectoryStep(
  [
    "people/*/*/",
    "science/crypto/ufo/enquete/dossier/Goshen",
    "science/crypto/ufo/enquete/dossier/Aurigny",
    "science/crypto/ufo/enquete/dossier/Tananarive",
    "science/crypto/ufo/enquete/dossier/Draguignan",
    "science/crypto/ufo/enquete/dossier/Coyne",
    "science/crypto/ufo/enquete/dossier/Mantell"
  ],
  ["people/Astronomers_fichiers"],
  "people/pilotes.html",
  outputFunc, [Occupation.astronaut, Occupation.pilot])

const ufoCasesDirectoryStep = new CaseDirectoryStep(
  [
    "science/crypto/ufo/enquete/dossier/*/",
    "time/1/6/0/8/Signes/",
    "science/crypto/ufo/enquete/dossier/Ummo/Aluche",
    "science/crypto/ufo/enquete/dossier/Ummo/SanJoseDeValderas",
    "science/crypto/ufo/observation/projet/Hessdalen",
    "people/a/AndreassonBetty",
    "people/c/CrowhurstDonaldC",
    "people/v/ValentichFrederik",
    "people/n/NapolitanoLinda"
  ],
  ["science/crypto/ufo/enquete/dossier/canular"],
  "science/crypto/ufo/enquete/dossier/index.html",
  outputFunc)

getTimeFiles().then(async (timeFiles) => {
  const letterDirs = await glob("people/*/")
  const peopleLetterFiles = letterDirs.filter(l => /(.*?)\/[a-z]\//.test(l))
  const letterDirectorySteps: PeopleDirectoryStep[] = []
  for (const peopleLetterFile of peopleLetterFiles) {
    const c = peopleLetterFile.charAt(peopleLetterFile.length - 2)
    letterDirectorySteps.push(new PeopleDirectoryStep(
      [`people/${c}/*/`],
      [],
      `people/${c}/index.html`,
      outputFunc, []))
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY
  if (!apiKey) {
    throw Error("GOOGLE_MAPS_API_KEY is required")
  }
  const placeService = new GooglePlaceService("place", apiKey)

  const orgService = new OrganizationService("org")

  const contentConfigs: ContentStepConfig[] = [
    htAccessToNetlifyConfig,
    {
      roots: contentRoots,
      replacements: [
        new SsiIncludeReplaceCommand(),
        new TitleReplaceCommand([timeDefaultHandler]),
        new StringEchoVarReplaceCommand("mail"),
        new SsiEchoVarReplaceCommand("copyright", [rr0DefaultCopyright]),
        new SsiIfReplaceCommand(),
        new SsiSetVarReplaceCommand("title", (match: string, ...args: any[]) => `<title>${args[0]}</title>`),
        new SsiSetVarReplaceCommand("url",
          (match: string, ...args: any[]) => `<meta name="url" content="${args[0]}"/>`),
        new SsiLastModifiedReplaceCommand(),
        new AuthorReplaceCommand(),
        new HtmlTagReplaceCommand("time", new TimeReplacerFactory(timeFiles)),
        new ClassRegexReplaceCommand("people", new PeopleReplacerFactory()),
        new ClassDomReplaceCommand("place", new PlaceReplacerFactory(placeService, orgService)),
        new ClassRegexReplaceCommand("temoin(.?)", new CaviarReplacerFactory()),
        new ClassDomReplaceCommand("note", new NoteReplacerFactory()),
        new ClassDomReplaceCommand("source", new SourceReplacerFactory()),
        new LinkReplaceCommand(new TimeLinkDefaultHandler(timeFiles)),
        new OutlineReplaceCommand(),
        new AnchorReplaceCommand("https://rr0.org/")
      ],
      getOutputFile(context: SsgContext): FileInfo {
        return context.inputFile
      }
    }
  ]
  new Ssg(config)
    .add(new ContentStep(contentConfigs, outputFunc))
    .add(ufoCasesDirectoryStep)
    .add(ufologistsDirectoryStep)
    .add(scientistsDirectoryStep)
    .add(contacteesDirectoryStep)
    .add(astronomersDirectoryStep)
    .add(...letterDirectorySteps)
    .add(pilotsDirectoryStep)
    .add(new CopyStep(copies))
    .start(context)
    .then(result => console.log("Completed", result))
    .catch(err => console.error(err, context.inputFile.name, "=>", context.outputFile.name))
})
