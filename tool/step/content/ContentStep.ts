import {SsgStep, SsgStepResult} from "../SsgStep"
import {SsgContext} from "../../SsgContext"
import {OutputFunc, SsgConfig} from "../../Ssg"
import {promise as glob} from "glob-promise"
import {getHtmlFileInfo} from "../../util/file/HtmlFileInfo"
import {HtmlSsgContext} from "../../HtmlSsgContext"
import {ReplaceCommand} from "./replace/ReplaceCommand"
import {FileInfo} from "../../util/file/FileInfo"

export type ContentStepConfig = {
  /**
   * The glob roots of contents to process.
   */
  roots: string[],

  /**
   * The replacements to process on contents.
   */
  replacements: ReplaceCommand[],

  /**
   * @param inputFile
   * @return the file where to output.
   */
  outputFile(inputFile: FileInfo): FileInfo
}


export class ContentStep implements SsgStep {

  constructor(protected contents: ContentStepConfig[], protected output: OutputFunc) {
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

  private async processContents(context: SsgContext, contentsConfig: ContentStepConfig) {
    let contentCount = 0
    for (const contentsRoot of contentsConfig.roots) {
      const contentFiles = await glob(contentsRoot)
      for (const filePath of contentFiles) {
        const inputFile = getHtmlFileInfo(context, filePath)
        let outputFile = contentsConfig.outputFile(inputFile)
        context.currentFile = outputFile
        for (const replacement of contentsConfig.replacements) {
          outputFile = await replacement.execute(context as HtmlSsgContext)
        }
        contentCount++
        await this.output(context, outputFile)
      }
    }
    return contentCount
  }
}
