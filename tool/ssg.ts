import {promise as glob} from "glob-promise"
import {FileInfo, getFileInfo, writeFile} from "./FileUtil"
import {SsiIfReplaceCommand, SsiIncludeReplaceCommand} from "./Ssi"

type OutputFileGeneration = (info: FileInfo) => Promise<void>

type SsgConfig = {
  glob: string,
  output: OutputFileGeneration
}


export interface ReplaceCommand {
  execute(contents: string): string
}

export class Ssg {

  constructor(protected config: SsgConfig, protected replacements: ReplaceCommand[]) {
  }

  async start() {
    const files = await glob(config.glob)
    files.forEach((fileName: string) => {
      const fileInfo = getFileInfo(fileName)
      for (const replacement of this.replacements) {
        fileInfo.contents = replacement.execute(fileInfo.contents)
      }
      this.config.output(fileInfo)
    })
  }
}

const config: SsgConfig = {
  glob: "croyance/conspirationnisme/enquete/dossier/**/*.html",
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
new Ssg(config, replacements).start().then(() => console.log("done"))
