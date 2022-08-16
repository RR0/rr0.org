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

/**
 * Replace a SSI var=value but appropriate HTML.
 */
function ssiVarReplacer(substring: string, ...args: any[]): string {
  const [variable, value] = args
  let replacement: string
  switch (variable) {
    case "title":
      replacement = `<title>${value}</title>`
      break
    default:
      replacement = substring
  }
  return replacement
}

interface DateBuilder {

  build(): string
}

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
      roots: [
        "politique/mouvement/ecologie/energie/thermique/nucleaire/fission/index.html",
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
      ],
      replacements: [
        new SsiIncludeReplaceCommand(),
        new SsiIfReplaceCommand(),
        new SsiVarReplaceCommand({replacer: ssiVarReplacer}),
        new SsiLastModifiedReplaceCommand(),
        new HtmlTagReplaceCommand("time", new TimeReplacerFactory())
      ],
      outputFile(inputFile: FileInfo): FileInfo {
        return inputFile
      }
    }
  ],
  copies: [
    "favicon.ico",
    "rr0.css", "print.css",
    "rr0.js", "bower_components/VirtualSky/virtualsky.js", "bower_components/VirtualSky/virtualsky-planets.min.js",
    "**/*.png", "**/*.jpg", "**/*.gif", "!out/**/*"
  ],
  outDir: "out"
}

async function output(info: FileInfo): Promise<void> {
  info.name = `${config.outDir}/${info.name}`
  try {
    console.log("Writing", info.name)
    await writeFile(info)
  } catch (e) {
    console.error(info.name, e)
  }
}

const context = new SsgContext("fr", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
  hour: "2-digit",
  minute: "2-digit"
})
new Ssg(config)
  .start(context, output)
  .then(result => console.log("Wrote", result.contentCount, "content files"))
