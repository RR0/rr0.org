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
  replacements: ReplaceCommand<SsgContext>[],

  /**
   * @param context
   * @return the file where to output.
   */
  getOutputFile(context: SsgContext): FileInfo
}

export class ContentStep implements SsgStep {

  constructor(protected contents: ContentStepConfig[], protected output: OutputFunc) {
  }

  async execute(context: SsgContext, config: SsgConfig): Promise<SsgStepResult> {
    let contentCount = 0
    for (const contents of this.contents) {
      contentCount += await this.processRoots(context, contents)
    }
    return {
      contentCount
    }
  }

  private async processRoots(context: SsgContext, contentsConfig: ContentStepConfig) {
    let contentCount = 0
    for (const contentsRoot of contentsConfig.roots) {
      contentCount = await this.processRoot(context, contentsRoot, contentsConfig, contentCount)
    }
    return contentCount
  }

  private async processRoot(context: SsgContext, contentsRoot: string, contentsConfig: ContentStepConfig,
                            contentCount: number) {
    context.debug("Processing root", contentsRoot)
    const contentFiles = await glob(contentsRoot)
    for (const filePath of contentFiles) {
      contentCount = await this.processFile(context, filePath, contentsConfig, contentCount)
    }
    return contentCount
  }

  private async processFile(context: SsgContext, filePath: string, contentsConfig: ContentStepConfig,
                            contentCount: number) {
    context.inputFile = getHtmlFileInfo(context, filePath)
    context.outputFile = contentsConfig.getOutputFile(context)
    for (const replacement of contentsConfig.replacements) {
      context.outputFile = await replacement.execute(context as HtmlSsgContext)
    }
    contentCount++
    await this.output(context, context.outputFile)
    return contentCount
  }
}
