import {FileInfo, writeFile} from "./FileUtil"
import {Ssg, SsgConfig} from "./Ssg"
import {SsiIncludeReplaceCommand} from "./replace/ssi/SsiIncludeReplaceCommand"
import {SsiIfReplaceCommand} from "./replace/ssi/SsiIfReplaceCommand"
import {SsiLastModifiedReplaceCommand} from "./replace/ssi/SsiLastModifiedReplaceCommand"
import {HtAccessToNetlifyReplaceCommand} from "./replace/htaccess/HtAccessToNetlifyReplaceCommand"
import {SsiVarReplaceCommand} from "./replace/ssi/SsiVarCommand"
import {HtmlTagReplaceCommand} from "./replace/html/HtmlTagReplaceCommand"
import {TimeReplacerFactory} from "./time/TimeReplacerFactory"
import {SsgContext} from "./SsgContext"
import {HtmlClassReplaceCommand} from "./replace/html/HtmlClassReplaceCommand"
import {PeopleReplacerFactory} from "./people/PeopleReplacerFactory"
import {TimeContext} from "./time/TimeContext"
import {ContentStep} from "./step/ContentStep"
import {CopyStep} from "./step/CopyStep"
import {DirectoryStep} from "./step/DirectoryStep"

const argv = process.argv
const args: Record<string, string> = {}
for (let i = 2; i < argv.length; i++) {
  const arg = argv[i]
  const dash = arg.lastIndexOf("-")
  if (dash >= 0) {
    const value = argv[i + 1]
    const key = arg.substring(dash + 1)
    args[key] = value
    i++
  }
}
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
  "**/*.png", "**/*.jpg", "**/*.gif", "**/*.webp", "!out/**/*"
]
const config: SsgConfig = {
  contents: [
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
  ],
  copies,
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

const context = new SsgContext("fr", new TimeContext({
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
  hour: "2-digit",
  minute: "2-digit"
}))

new Ssg(config)
  .add(new ContentStep(outputFunc))
  .add(new DirectoryStep("science/crypto/ufo/enquete/dossier", "science/crypto/ufo/enquete/dossier/index.html",
    outputFunc))
  .add(new CopyStep())
  .start(context)
  .then(result => console.log("Wrote", result))
  .catch(err => console.error(err))
