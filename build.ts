import {writeFileInfo} from "./tool/util/file/FileUtil"
import {Ssg, SsgConfig} from "./tool/Ssg"
import {SsiIncludeReplaceCommand} from "./tool/step/content/replace/html/ssi/SsiIncludeReplaceCommand"
import {SsiIfReplaceCommand} from "./tool/step/content/replace/html/ssi/SsiIfReplaceCommand"
import {SsiLastModifiedReplaceCommand} from "./tool/step/content/replace/html/ssi/SsiLastModifiedReplaceCommand"
import {
  HtAccessToNetlifyRedirectsReplaceCommand
} from "./tool/step/content/replace/htaccess/HtAccessToNetlifyRedirectsReplaceCommand"
import {SsiSetVarReplaceCommand} from "./tool/step/content/replace/html/ssi/SsiSetVarCommand"
import {HtmlTagReplaceCommand} from "./tool/step/content/replace/html/tag/HtmlTagReplaceCommand"
import {TimeReplacerFactory} from "./time/TimeReplacerFactory"
import {SsgContext} from "./tool/SsgContext"
import {ClassRegexReplaceCommand} from "./tool/step/content/replace/html/class/ClassRegexReplaceCommand"
import {PeopleReplacerFactory} from "./people/PeopleReplacerFactory"
import {TimeContext} from "./time/TimeContext"
import {ContentStep, ContentStepConfig} from "./tool/step/content/ContentStep"
import {CopyStep} from "./tool/step/CopyStep"
import {FileInfo, getFileInfo} from "./tool/util/file/FileInfo"
import {CaseDirectoryStep} from "./science/crypto/ufo/enquete/dossier/CaseDirectoryStep"
import {PeopleDirectoryStep} from "./people/PeopleDirectoryStep"
import {Occupation} from "./people/Occupation"
import {CLI} from "./tool/util/cli/CLI"
import {
  HtAccessToNetlifyConfigReplaceCommand
} from "./tool/step/content/replace/htaccess/HtAccessToNetlifyConfigReplaceCommand"
import {timeDefaultHandler} from "./time/TimeDefaultTitle"
import {rr0DefaultCopyright} from "./RR0DefaultCopyright"
import {NoteReplacerFactory} from "./note/NoteReplacerFactory"
import {SourceReplacerFactory} from "./source/SourceReplacerFactory"
import {ClassDomReplaceCommand} from "./tool/step/content/replace/html/class/ClassDomReplaceCommand"
import {LinkReplaceCommand} from "./LinkReplaceCommand"
import {OutlineReplaceCommand} from "./outline/OutlineReplaceCommand"
import {AuthorReplaceCommand} from "./people/author/AuthorReplaceCommand"
import {TimeLinkDefaultHandler} from "./time/TimeLinkDefaultHandler"
import {promise as glob} from "glob-promise"
import {SsiEchoVarReplaceCommand} from "./tool/step/content/replace/html/ssi/SsiEchoVarCommand"
import {StringEchoVarReplaceCommand} from "./tool/step/content/replace/html/StringEchoVarReplaceCommand"
import {GooglePlaceService} from "./place/GooglePlaceService"
import {PlaceReplacerFactory} from "./place/PlaceReplacerFactory"
import {OrganizationService} from "./org/OrganizationService"
import {AnchorReplaceCommand} from "./tool/step/content/replace/html/anchor/AnchorReplaceCommand"
import {AngularExpressionReplaceCommand} from "./tool/step/content/replace/angular/AngularExpressionReplaceCommand"
import {WitnessReplacerFactory} from "./people/witness/WitnessReplacerFactory"
import {RR0SsgContextImpl} from "./RR0SsgContext"
import {TitleReplaceCommand} from "./time/TitleReplaceCommand"

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
const context = new RR0SsgContextImpl("fr", timeContext)
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
        new AngularExpressionReplaceCommand(),
        new SsiEchoVarReplaceCommand("copyright", [rr0DefaultCopyright]),
        new SsiIfReplaceCommand(),
        new SsiSetVarReplaceCommand("title", (match: string, ...args: any[]) => `<title>${args[0]}</title>`),
        new SsiSetVarReplaceCommand("url",
          (match: string, ...args: any[]) => `<meta name="url" content="${args[0]}"/>`),
        new SsiLastModifiedReplaceCommand(context.time.options),
        new AuthorReplaceCommand(),
        new HtmlTagReplaceCommand("time", new TimeReplacerFactory(timeFiles)),
        new ClassRegexReplaceCommand("people", new PeopleReplacerFactory()),
        new ClassDomReplaceCommand("place", new PlaceReplacerFactory(placeService, orgService)),
        new ClassRegexReplaceCommand("temoin(.?)", new WitnessReplacerFactory()),
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
