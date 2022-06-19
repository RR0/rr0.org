import {FileInfo, writeFile} from "./FileUtil"
import {Ssg, SsgConfig} from "./Ssg"
import {SsiIncludeReplaceCommand} from "./ssi/SsiIncludeReplaceCommand"
import {SsiIfReplaceCommand} from "./ssi/SsiIfReplaceCommand"
import {SsiLastModifiedReplaceCommand} from "./ssi/SsiLastModifiedReplaceCommand"

const config: SsgConfig = {
  contentsRoots: [
    "index.html", "404.html",
    "croyance/**/*.html",
    "droit/**/*.html",
    "org/**/*.html",
    "people/**/*.html",
    "place/**/*.html",
    "politique/**/*.html",
    "science/**/*.html",
    "tech/**/*.html",
    "time/**/*.html"
  ],
  replacements: [
    new SsiIncludeReplaceCommand(),
    new SsiIfReplaceCommand(),
    new SsiLastModifiedReplaceCommand()
  ],
  copies: [
    "favicon.ico",
    "rr0.css", "print.css",
    "rr0.js", "bower_components/VirtualSky/virtualsky.js", "bower_components/VirtualSky/virtualsky-planets.min.js",
    "**/*.png", "**/*.jpg"
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
