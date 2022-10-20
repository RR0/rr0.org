import {writeFile} from "./util/file/FileUtil"
import {ContentsConfig, Ssg, SsgConfig} from "./Ssg"
import {SsiIncludeReplaceCommand} from "./step/content/replace/html/ssi/SsiIncludeReplaceCommand"
import {SsiIfReplaceCommand} from "./step/content/replace/html/ssi/SsiIfReplaceCommand"
import {SsiLastModifiedReplaceCommand} from "./step/content/replace/html/ssi/SsiLastModifiedReplaceCommand"
import {HtAccessToNetlifyReplaceCommand} from "./step/content/replace/htaccess/HtAccessToNetlifyReplaceCommand"
import {SsiVarReplaceCommand} from "./step/content/replace/html/ssi/SsiVarCommand"
import {HtmlTagReplaceCommand} from "./step/content/replace/html/tag/HtmlTagReplaceCommand"
import {TimeReplacerFactory} from "./time/TimeReplacerFactory"
import {SsgContext, SsgContextImpl} from "./SsgContext"
import {HtmlClassReplaceCommand} from "./step/content/replace/html/class/HtmlClassReplaceCommand"
import {PeopleReplacerFactory} from "./step/content/replace/html/people/PeopleReplacerFactory"
import {TimeContext} from "./time/TimeContext"
import {ContentStep} from "./step/content/ContentStep"
import {CopyStep} from "./step/CopyStep"
import {TitleReplaceCommand} from "./step/content/replace/TitleReplaceCommand"
import {FileInfo} from "./util/file/FileInfo"
import {CaseDirectoryStep} from "./step/CaseDirectoryStep"
import {PeopleDirectoryStep} from "./step/PeopleDirectoryStep"
import {Occupation} from "./model/people/Occupation"
import {CLI} from "./util/cli/CLI"

const args = CLI.getArgs()
const contents = args.contents
const roots = contents ? contents.split(",") : [
  "index.html", "404.html", "googlebe03dcf00678bb7c.html", "Contact.html", "Copyright.html", "preambule.html",
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
  "udb/**/*.*",
  "js/**/*.html"
]
const copiesArg = args.copies
const copies = copiesArg ? copiesArg.split(",") : [
  "favicon.ico",
  "rr0.css", "print.css",
  "rr0.js", "bower_components/VirtualSky/virtualsky.js", "bower_components/VirtualSky/virtualsky-planets.min.js",
  "**/*.png", "**/*.jpg", "**/*.gif", "**/*.webp", "!out/**/*",
  "people/index.js",
  "people/index.css"
]
const config: SsgConfig = {
  outDir: "out"
}

async function outputFunc(context: SsgContext, info: FileInfo, oudDir = config.outDir + "/"): Promise<void> {
  info.name = `${oudDir}${info.name}`
  try {
    console.log("Writing", info.name)
    await writeFile(info)
  } catch (e) {
    console.error(info.name, e)
  }
}

const context = new SsgContextImpl("fr", new TimeContext({
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
  hour: "2-digit",
  minute: "2-digit"
}))

const contentConfigs: ContentsConfig[] = [
  {
    roots: [".htaccess"],
    replacements: [new HtAccessToNetlifyReplaceCommand()],
    outputFile(inputFile: FileInfo): FileInfo {
      return Object.assign({...inputFile}, {name: "_redirects"})
    }
  },
  {
    roots,
    replacements: [
      new SsiIncludeReplaceCommand(),
      new TitleReplaceCommand(),
      new SsiIfReplaceCommand(),
      new SsiVarReplaceCommand("title", (match: string, ...args: any[]) => `<title>${args[0]}</title>`),
      new SsiVarReplaceCommand("url", (match: string, ...args: any[]) => `<meta name="url" content="${args[0]}"/>`),
      new SsiLastModifiedReplaceCommand(),
      new HtmlTagReplaceCommand("time", new TimeReplacerFactory()),
      new HtmlClassReplaceCommand("people", new PeopleReplacerFactory())
      // new HtmlAnchorReplaceCommand(new AnchorReplacerFactory())
    ],
    outputFile(inputFile: FileInfo): FileInfo {
      return inputFile
    }
  }
]
new Ssg(config)
  .add(new ContentStep(contentConfigs, outputFunc))
  .add(new CaseDirectoryStep(
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
  )
  .add(new PeopleDirectoryStep(
    ["people/*/*/"],
    ["people/Astronomers_fichiers"],
    "people/ufologues.html",
    outputFunc, [Occupation.ufologist]))
  .add(new PeopleDirectoryStep(
    ["people/*/*/"],
    ["people/Astronomers_fichiers"],
    "people/scientifiques.html",
    outputFunc, [
      Occupation.anthropologist, Occupation.astronomer, Occupation.astrophysicist, Occupation.archeologist,
      Occupation.biochemist, Occupation.biophysicist, Occupation.botanist,
      Occupation.chemist,
      Occupation.engineer, Occupation.ethnologist,
      Occupation.geologist, Occupation.geophysicist,
      Occupation.historian,
      Occupation.mathematician, Occupation.meteorologist,
      Occupation.neurologist, Occupation.neuroscientist, Occupation.neuropsychiatrist,
      Occupation.oceanographer,
      Occupation.psychologist, Occupation.philosopher, Occupation.physicist, Occupation.physician, Occupation.psychiatrist,
      Occupation.radioastronomer,
      Occupation.sociologist, Occupation.softwareEngineer
    ]))
  .add(new CopyStep(copies))
  .start(context)
  .then(result => console.log("Completed", result))
  .catch(err => console.error(err))
