import { DirectoryStep, OutputFunc, SsgConfig, SsgFile } from "ssg-api"
import { RR0SsgContext } from "../../../../../RR0SsgContext"
import { HtmlTag } from "../../../../../util/HtmlTag"
import { StringUtil } from "../../../../../util/string/StringUtil"
import { Time } from "../../../../../time/Time"
import { RR0FileUtil } from "../../../../../util/file/RR0FileUtil"
import { RR0CaseSummary } from "../../../../../time/datasource/rr0/RR0CaseSummary"

enum HynekClassification {
  NL = "NL",
  DD = "DD",
  RV = "RV",
  CE1 = "CE1",
  CE2 = "CE2",
  CE3 = "CE3",
  CE4 = "CE3",
  CE5 = "CE3"
}

enum CaseConclusion {
  unknown = "unknown",
  misinterpretation = "misinterpretation",
  hoax = "hoax"
}

interface Case extends RR0CaseSummary {
  dirName: string
  title: string
  time: string
  classification?: {
    hynek: HynekClassification
  },
  conclusion?: CaseConclusion
}

const cssClasses: Record<string, string> = {
  hoax: "canular",
  misinterpretation: "meprise"
}

export class CaseDirectoryStep extends DirectoryStep {

  constructor(dirs: string[], excludedDirs: string[], template: string, protected outputFunc: OutputFunc,
              config: SsgConfig) {
    super(dirs, excludedDirs, template, config, "case directory")
  }

  static readonly template = "science/crypto/ufo/enquete/dossier/index.html"

  static async create(outputFunc: OutputFunc, config: SsgConfig): Promise<CaseDirectoryStep> {
    const ufoCasesDirectories = RR0FileUtil.findDirectoriesContaining("case.json")
    return new CaseDirectoryStep(
      ufoCasesDirectories,
      ["science/crypto/ufo/enquete/dossier/canular"],
      CaseDirectoryStep.template,
      outputFunc, config)
  }

  /**
   * Convert an array of Case[] to an <ul> HTML unordered list.
   *
   * @param context
   * @param cases
   */
  protected toList(context: RR0SsgContext, cases: Case[]) {
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
  protected toListItem(context: RR0SsgContext, dirCase: Case) {
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
    const conclusion = dirCase.conclusion
    if (conclusion) {
      attrs.class = cssClasses[conclusion]
      titles.push(context.messages.case.conclusion[conclusion])
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
    const cases = this.scan(context, dirNames)
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
  protected scan(context: RR0SsgContext, dirNames: string[]): Case[] {
    const cases: Case[] = []
    for (const dirName of dirNames) {
      const dirCase: Case = {dirName, time: "", title: ""}
      cases.push(dirCase)
      try {
        const jsonFileInfo = SsgFile.read(context, `${dirName}/case.json`)
        Object.assign(dirCase, JSON.parse(jsonFileInfo.contents))
      } catch (e) {
        context.warn(`${dirName} has no case.json description`)
        // No json, just guess title.
      }
    }
    return cases
  }
}
