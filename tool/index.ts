import {FileInfo, writeFile} from "./FileUtil"
import {SsiIfReplaceCommand, SsiIncludeReplaceCommand} from "./Ssi"
import {ReplaceCommand, Ssg, SsgConfig} from "./Ssg"

const config: SsgConfig = {
  contents: "croyance/conspirationnisme/enquete/dossier/**/*.html",
  output: async (info: FileInfo) => {
    info.name = "out/" + info.name
    writeFile(info).then(result => {
      console.log("Wrote", info.name)
    }).catch(err => {
      console.error(info.name, err)
    })
  }
}

const replacements: ReplaceCommand[] = [
  new SsiIncludeReplaceCommand(),
  new SsiIfReplaceCommand()
]

const copies = [
  "rr0.css", "print.css",
  "rr0.js", "bower_components/VirtualSky/virtualsky.js", "bower_components/VirtualSky/virtualsky-planets.min.js"
]

new Ssg(config, replacements, copies)
  .start()
  .then(() => console.log("done"))
