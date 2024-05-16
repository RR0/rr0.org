import { DirectoryStep, OutputFunc, SsgConfig } from "ssg-api"
import { RR0SsgContext } from "../../../../../RR0SsgContext"
import { HtmlTag } from "../../../../../util/HtmlTag"
import { StringUtil } from "../../../../../util/string/StringUtil"
import { Time } from "../../../../../time/Time"
import { RR0Case } from "./RR0Case"
import { DataService } from "../../../../../DataService"

export class CaseDirectoryStep extends DirectoryStep {

  constructor(protected caseService: DataService, excludedDirs: string[], templateFileName: string,
              protected outputFunc: OutputFunc, config: SsgConfig) {
    super(caseService.dirs, excludedDirs, templateFileName, config, "case directory")
  }

  static readonly template = "science/crypto/ufo/enquete/dossier/index.html"

  static async create(outputFunc: OutputFunc, config: SsgConfig, caseService: DataService): Promise<CaseDirectoryStep> {
    return new CaseDirectoryStep(caseService, ["science/crypto/ufo/enquete/dossier/canular"],
      CaseDirectoryStep.template, outputFunc, config)
  }

  /**
   * Convert an array of Case[] to an <ul> HTML unordered list.
   *
   * @param context
   * @param cases
   */
  protected toList(context: RR0SsgContext, cases: RR0Case[]) {
    const listItems = cases.map(dirCase => {
      if (!dirCase.title) {
        const lastSlash = dirCase.dirName.lastIndexOf("/")
        const lastDir = dirCase.dirName.substring(lastSlash + 1)
        dirCase.title = StringUtil.camelToText(lastDir)
      }
      return this.toListItem(context, dirCase)
    })
    return HtmlTag.toString("ul", listItems.join("\n"), {class: "links"})
  }

  /**
   * Convert a Case object to an HTML list item.
   *
   * @param context
   * @param dirCase
   */
  protected toListItem(context: RR0SsgContext, dirCase: RR0Case) {
    const attrs: { [name: string]: string } = {}
    const titles = []
    const details: string[] = []
    const classification = dirCase.classification
    const hynek = classification?.hynek
    if (hynek) {
      const classificationLabels = context.messages.case.classification.hynek[hynek]
      details.push(classificationLabels.short)
      titles.push(classificationLabels.long)
    }
    const timeStr = dirCase.time
    if (timeStr) {
      const timeDetail = Time.dateFromIso(timeStr).getFullYear()
      details.push(HtmlTag.toString("time", timeDetail.toString()))
    }
    const text: (string | string[])[] = [dirCase.title]
    if (details.length > 0) {
      text.push(`(${details.join(", ")})`)
    }
    const a = HtmlTag.toString("a", text.join(" "), {href: `/${dirCase.dirName}/`})
    if (titles.length) {
      attrs.title = titles.join(", ")
    }
    return HtmlTag.toString("li", a, attrs)
  }

  protected async processDirs(context: RR0SsgContext, dirNames: string[]): Promise<void> {
    const cases = await this.scan(context, dirNames)
    const directoriesHtml = this.toList(context, cases)
    context.outputFile.contents = context.outputFile.contents.replace(`<!--#echo var="directories" -->`,
      directoriesHtml)
    await this.outputFunc(context, context.outputFile)
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
        const dirCases = await this.caseService.get<RR0Case>(context, dirName, ["case", undefined], ["case*.json"])
        cases.push(...dirCases)
      } catch (e) {
        context.warn(`${dirName} has no case.json description`)
        // No json, just guess title.
      }
    }
    return cases
  }
}
