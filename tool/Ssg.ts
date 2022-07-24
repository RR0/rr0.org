import {promise as glob} from "glob-promise"
import {FileInfo, getFileInfo, ssgCopy} from "./FileUtil"

type OutputFileGeneration = (info: FileInfo) => Promise<void>

export type ContentsConfig = {
  roots: string[],
  replacements: ReplaceCommand[],
  outputFile(inputFile: FileInfo): FileInfo
}
export type SsgConfig = {
  contents: ContentsConfig[]
  copies: string[]
  outDir: string
}

export type SsgContext = {
  date?: Date
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
    //  await this.processCopies(config)
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
      for (const fileName of contentFiles) {
        const inputFile = getFileInfo(fileName)
        let outputFile: FileInfo = contentsConfig.outputFile(inputFile)
        for (const replacement of contentsConfig.replacements) {
          outputFile = replacement.execute(context, outputFile)
        }
        contentCount++
        await output(outputFile)
      }
    }
    return contentCount
  }

  private async processCopies(config: SsgConfig) {
    let copies: string[] = config.copies
    const dest = config.outDir
    try {
      console.log("Copying to", dest, copies)
      const files = await ssgCopy(dest, ...copies)
      console.log(files.length, "files copied")
    } catch (e) {
      console.error("Could not copy", copies, e)
    }
  }
}
