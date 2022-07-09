import {FileInfo, writeFile} from "./FileUtil"
import {Ssg, SsgConfig} from "./Ssg"
import {SsiIncludeReplaceCommand} from "./replace/ssi/SsiIncludeReplaceCommand"
import {SsiIfReplaceCommand} from "./replace/ssi/SsiIfReplaceCommand"
import {SsiLastModifiedReplaceCommand} from "./replace/ssi/SsiLastModifiedReplaceCommand"
import {HtAccessToNetlifyReplaceCommand} from "./replace/htaccess/HtAccessToNetlifyReplaceCommand"

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
        "index.html", "404.html",
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
        "udb/**/*.*"
      ],
      replacements: [
        new SsiIncludeReplaceCommand(),
        new SsiIfReplaceCommand(),
        new SsiLastModifiedReplaceCommand()
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
    "**/*.png", "**/*.jpg", "**/*.gif"
  ],
  outDir: "out"
}

const output = async (info: FileInfo) => {
  info.name = `${config.outDir}/${info.name}`
  writeFile(info).then(result => {
    console.log("Wrote", info.name)
  }).catch(err => {
    console.error(info.name, err)
  })
}
new Ssg(config)
  .start(output)
  .then(result => console.log("Wrote", result.contentCount, "content files"))
