import {SsgStep, SsgStepResult} from "./SsgStep"
import {getFileInfo} from "../util/file/FileUtil"
import {SsgContext} from "../SsgContext"
import {ContentsConfig, OutputFunc, SsgConfig} from "../Ssg"
import {promise as glob} from "glob-promise"


export class ContentStep implements SsgStep {

  constructor(protected contents: ContentsConfig[], protected output: OutputFunc) {
  }

  async execute(context: SsgContext, config: SsgConfig): Promise<SsgStepResult> {
    let contentCount = 0
    for (const contents of this.contents) {
      contentCount += await this.processContents(context, contents)
    }
    return {
      contentCount
    }
  }

  private async processContents(context: SsgContext, contentsConfig: ContentsConfig) {
    let contentCount = 0
    for (const contentsRoot of contentsConfig.roots) {
      const contentFiles = await glob(contentsRoot)
      for (const filePath of contentFiles) {
        const inputFile = getFileInfo(context, filePath)
        let outputFile = contentsConfig.outputFile(inputFile)
        context.currentFile = outputFile
        for (const replacement of contentsConfig.replacements) {
          outputFile = await replacement.execute(context)
        }
        contentCount++
        await this.output(context, outputFile)
      }
    }
    return contentCount
  }
}
