import { DirectoryStep, OutputFunc, SsgConfig } from "ssg-api"
import { HtmlRR0SsgContext, RR0SsgContext } from "../../../../../RR0SsgContext"
import { StringUtil } from "../../../../../util/string/StringUtil"
import { RR0Case } from "./RR0Case"
import { CaseService } from "./CaseService"

/**
 * Builds a directory page for UFO cases.
 */
export class CaseDirectoryStep extends DirectoryStep {
  /**
   *
   * @param caseService
   * @param rootDirs The directories where UFO cases info can be found.
   * @param excludedDirs The directories to exclude from the UFO case directory search.
   * @param templateFileName The template of the directory page to build.
   * @param outputFunc
   * @param config
   */
  constructor(protected caseService: CaseService, rootDirs: string[], excludedDirs: string[], templateFileName: string,
              protected outputFunc: OutputFunc, config: SsgConfig) {
    super({rootDirs, excludedDirs, templateFileName, getOutputPath: config.getOutputPath}, "case directory")
  }

  static async create(outputFunc: OutputFunc, config: SsgConfig, caseService: CaseService): Promise<CaseDirectoryStep> {
    const rootDirs = await caseService.getFiles()
    return new CaseDirectoryStep(caseService, rootDirs, ["science/crypto/ufo/enquete/dossier/canular"],
      "science/crypto/ufo/enquete/dossier/index.html", outputFunc, config)
  }

  /**
   * Convert an array of Case[] to an <ul> HTML unordered list.
   *
   * @param context
   * @param cases
   */
  protected toList(context: HtmlRR0SsgContext, cases: RR0Case[]): HTMLUListElement {
    const listItems = cases.map(dirCase => {
      if (!dirCase.title) {
        const lastSlash = dirCase.dirName.lastIndexOf("/")
        const lastDir = dirCase.dirName.substring(lastSlash + 1)
        dirCase.title = StringUtil.camelToText(lastDir)
      }
      return this.toListItem(context, dirCase)
    })
    const ul = context.file.document.createElement("ul")
    ul.append(...listItems)
    ul.className = "links"
    return ul
  }

  /**
   * Convert a Case object to an HTML list item.
   *
   * @param context
   * @param dirCase
   */
  protected toListItem(context: HtmlRR0SsgContext, dirCase: RR0Case): HTMLLIElement {
    const item = context.file.document.createElement("li")
    const ref = this.caseService.getLink(context, dirCase)
    item.appendChild(ref)
    return item
  }

  protected async processDirs(context: HtmlRR0SsgContext, dirNames: string[]): Promise<void> {
    const cases = await this.scan(context, dirNames)
    const ul = this.toList(context, cases)
    const outputPath = this.config.getOutputPath(context)
    const output = context.newOutput(outputPath)
    output.contents = context.file.contents.replace(`<!--#echo var="directories" -->`, ul.outerHTML)
    await this.outputFunc(context, output)
  }

  /**
   * Read case JSON files contents and instantiate them as Case objects.
   *
   * @param context
   * @param dirNames The directories to look for case.json files.
   */
  protected async scan(context: RR0SsgContext, dirNames: string[]): Promise<RR0Case[]> {
    const cases: RR0Case[] = []
    for (const dirName of dirNames) {
      try {
        const dirCases = await this.caseService.get(dirName)
        cases.push(...dirCases)
      } catch (e) {
        context.warn(`${dirName} has no case.json description`)
        // No json, just guess title.
      }
    }
    return cases
  }
}
