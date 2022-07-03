import {promise as glob} from "glob-promise"
import {copy, FileInfo, getFileInfo} from "./FileUtil"

type OutputFileGeneration = (info: FileInfo) => Promise<void>

export type ContentsConfig = {
  roots: string[],
  replacements: ReplaceCommand[],
  outputFile(inputFile: FileInfo): FileInfo
}
export type SsgConfig = {
  contents: ContentsConfig[]
  copies: string[],
  outDir: string
}

export type SsgContext = {
  locales?: string | string[]
  options?: Intl.DateTimeFormatOptions
}

export interface ReplaceCommand {
  execute(context: SsgContext, fileInfo: FileInfo): FileInfo
}

export type SsgResult = {
  contentCount: number
}

export class Ssg {

  constructor(protected config: SsgConfig) {
  }

  async start(output: OutputFileGeneration): Promise<SsgResult> {
    const context: SsgContext = {locales: "fr", options: {year: "numeric", month: "long", day: "numeric"}}
    let config = this.config
    this.processCopies(config)
    let contentCount = 0
    for (const contents of config.contents) {
      contentCount += await this.processContents(contents, context, output)
    }
    return {
      contentCount
    }
  }

  private async processContents(contentsConfig: ContentsConfig, context: SsgContext, output: (info: FileInfo) => Promise<void>) {
    let contentCount = 0
    for (const contentsRoot of contentsConfig.roots) {
      const contentFiles = await glob(contentsRoot)
      contentFiles.forEach((fileName: string) => {
        let inputFile = getFileInfo(fileName)
        let outputFile: FileInfo = contentsConfig.outputFile(inputFile)
        for (const replacement of contentsConfig.replacements) {
          outputFile = replacement.execute(context, outputFile)
        }
        contentCount++
        output(outputFile)
      })
    }
    return contentCount
  }

  private processCopies(config: SsgConfig) {
    for (const file of config.copies) {
      copy(file, config.outDir).then(() => {
        console.log("Copied", file)
      }).catch(err => {
        console.error("Could not copy", file, err)
      })
    }
  }
}
