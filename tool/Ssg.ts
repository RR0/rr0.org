import {promise as glob} from "glob-promise"
import {copy, FileInfo, getFileInfo} from "./FileUtil"

type OutputFileGeneration = (info: FileInfo) => Promise<void>

export type SsgConfig = {
  contents: string,
  output: OutputFileGeneration
}


export interface ReplaceCommand {
  execute(contents: string): string
}

export class Ssg {

  constructor(protected config: SsgConfig, protected replacements: ReplaceCommand[], protected copies: string[]) {
  }

  async start() {
    const contentFiles = await glob(this.config.contents)
    contentFiles.forEach((fileName: string) => {
      const fileInfo = getFileInfo(fileName)
      for (const replacement of this.replacements) {
        fileInfo.contents = replacement.execute(fileInfo.contents)
      }
      this.config.output(fileInfo)
    })
    for (const file of this.copies) {
      copy(file, `out/${file}`).then(() => {
        console.log("copied", file)
      }).catch(err => {
        console.error("Could not copy", file, err)
      })
    }
  }
}
