import {FileInfo, writeFile} from "./FileUtil"
import {SsiIfReplaceCommand, SsiIncludeReplaceCommand} from "./Ssi"
import {Ssg, SsgConfig} from "./Ssg"

const config: SsgConfig = {
  contentsRoots: [
    "time/2/0/1/4/01/Bullard_IsTheAnomalistOnAFoolsErrand_Paranthropology/Exeter/index.html",
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
  output: async (info: FileInfo) => {
    info.name = "out/" + info.name
    writeFile(info).then(result => {
      console.log("Wrote", info.name)
    }).catch(err => {
      console.error(info.name, err)
    })
  },
  replacements: [
    new SsiIncludeReplaceCommand(),
    new SsiIfReplaceCommand()
  ],
  copies: [
    "rr0.css", "print.css",
    "rr0.js", "bower_components/VirtualSky/virtualsky.js", "bower_components/VirtualSky/virtualsky-planets.min.js"
  ]
}

new Ssg(config)
  .start()
  .then(result => console.log("Wrote", result.contentCount, "content files"))
