import { DirectoryStep, OutputFunc, SsgConfig } from "ssg-api"
import { HtmlRR0SsgContext, RR0SsgContext } from "../../../../../RR0SsgContext"
import { StringUtil } from "../../../../../util/string/StringUtil"
import { RR0Case } from "./RR0Case"
import { DataService } from "../../../../../DataService"
import { RR0FileUtil } from "../../../../../util/file/RR0FileUtil"
import { TimeService } from "../../../../../time/TimeService"
import { TimeReplacer } from "../../../../../time/TimeReplacer"
import path from "path"

export class CaseDirectoryStep extends DirectoryStep {
  protected readonly timeReplacer: TimeReplacer

  constructor(protected caseService: DataService, rootDirs: string[], excludedDirs: string[], templateFileName: string,
              protected outputFunc: OutputFunc, config: SsgConfig, protected timeService: TimeService) {
    super({rootDirs, excludedDirs, templateFileName, getOutputPath: config.getOutputPath}, "case directory")
    this.timeReplacer = new TimeReplacer(timeService.renderer)
  }

  static readonly template = "science/crypto/ufo/enquete/dossier/index.html"

  static async create(outputFunc: OutputFunc, config: SsgConfig, caseService: DataService,
                      timeService: TimeService): Promise<CaseDirectoryStep> {
    const caseFactory = caseService.factories.find(factory => factory.type === "case")
    const rootDirs = RR0FileUtil.findDirectoriesContaining(caseFactory.fileNames[0] + ".json", "out")
    return new CaseDirectoryStep(caseService, rootDirs, ["science/crypto/ufo/enquete/dossier/canular"],
      CaseDirectoryStep.template, outputFunc, config, timeService)
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
    const ref = this.getLink(context, dirCase, item)
    item.appendChild(ref)
    return item
  }

  protected getLink(context: HtmlRR0SsgContext, dirCase: RR0Case, item: HTMLLIElement): HTMLElement {
    const doc = context.file.document
    const titles: string[] = []
    const details: string[] = []
    const classList = ["data-resolved"]
    const classification = dirCase.classification
    const hynek = classification?.hynek
    if (hynek) {
      const classificationLabels = context.messages.case.classification.hynek[hynek]
      details.push(classificationLabels.short)
      titles.push(classificationLabels.long)
    }
    const timeStr = dirCase.time
    const caseContext = context.clone()
    if (timeStr) {
      const options = caseContext.time.options
      options.month = undefined
      options.day = undefined
      options.hour = undefined
      options.weekday = undefined
      options.minute = undefined
      const elem = this.timeReplacer.create(caseContext, timeStr, undefined)
      details.push(elem.outerHTML)
    }
    const text: (string | string[])[] = [dirCase.title]
    if (details.length > 0) {
      text.push(`(${details.join(", ")})`)
    }
    const link = doc.createElement("a")
    link.innerHTML = text.join(" ")
    link.href = path.join("/", dirCase.dirName)
    const elem = doc.createElement("span")
    if (titles.length > 0) {
      elem.title = titles.join(", ")
    }
    if (classList.length > 0) {
      elem.classList.add(...classList)
    }
    const portraitUrl = (dirCase as any).image
    if (portraitUrl) {
      const portraitElem = doc.createElement("img")
      portraitElem.src = path.join("/", portraitUrl)
      portraitElem.alt = dirCase.title
      portraitElem.className = "portrait"
      portraitElem.loading = "lazy"
      portraitElem.width = 75
      link.append(portraitElem)
    }
    elem.append(link)
    return elem
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
