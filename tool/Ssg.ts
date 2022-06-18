import {promise as glob} from "glob-promise"
import {copy, FileInfo, getFileInfo} from "./FileUtil"

type OutputFileGeneration = (info: FileInfo) => Promise<void>

export type SsgConfig = {
  contentsRoots: string[],
  output: OutputFileGeneration,
  replacements: ReplaceCommand[],
  copies: string[]
}


export interface ReplaceCommand {
  execute(contents: string): string
}

export type SsgResult = {
  contentCount: number
}

export class Ssg {

  constructor(protected config: SsgConfig) {
  }

  async start(): Promise<SsgResult> {
    let config = this.config
    let contentCount = 0
    for (const contentsRoot of config.contentsRoots) {
      const contentFiles = await glob(contentsRoot)
      contentFiles.forEach((fileName: string) => {
        const fileInfo = getFileInfo(fileName)
        for (const replacement of config.replacements) {
          fileInfo.contents = replacement.execute(fileInfo.contents)
        }
        contentCount++
        config.output(fileInfo)
      })
    }
    for (const file of config.copies) {
      copy(file, `out/${file}`).then(() => {
        console.log("Copied", file)
      }).catch(err => {
        console.error("Could not copy", file, err)
      })
    }
    return {
      contentCount
    }
  }
}
