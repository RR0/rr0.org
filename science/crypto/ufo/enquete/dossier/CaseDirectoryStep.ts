import {DirectoryStep, getFileInfo, OutputFunc} from "ssg-api"
import {RR0SsgContext} from "../../../../../RR0SsgContext"
import {HtmlTag} from "../../../../../util/HtmlTag"
import {StringUtil} from "../../../../../util/string/StringUtil"

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

interface Case {
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

  constructor(dirs: string[], excludedDirs: string[], template: string, protected outputFunc: OutputFunc) {
    super(dirs, excludedDirs, template, outputFunc)
  }

  protected async processDirs(context: RR0SsgContext, dirames: string[]): Promise<void> {
    const cases: Case[] = []
    for (const dirName of dirames) {
      const dirCase: Case = {dirName, time: "", title: ""}
      cases.push(dirCase)
      try {
        const jsonFileInfo = getFileInfo(context, `${dirName}/case.json`)
        Object.assign(dirCase, JSON.parse(jsonFileInfo.contents))
      } catch (e) {
        console.warn(`${dirName} has no case.json description`)
        // No json, just guess title.
      }
    }
    const listItems = cases.map(dirCase => {
      if (!dirCase.title) {
        const lastSlash = dirCase.dirName.lastIndexOf("/")
        const lastDir = dirCase.dirName.substring(lastSlash + 1)
        dirCase.title = StringUtil.camelToText(lastDir)
      }
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
      const time = dirCase.time
      if (time) {
        details.push(HtmlTag.toString("time", time))
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
      const a = HtmlTag.toString("a", text.join(" "), {href: "/" + dirCase.dirName + "/"})
      if (titles.length) {
        attrs.title = titles.join(", ")
      }
      return HtmlTag.toString("li", a, attrs)
    })
    const directoriesHtml = HtmlTag.toString("ul", listItems.join("\n"), {class: "links"})
    context.outputFile.contents = context.outputFile.contents.replace(`<!--#echo var="directories" -->`,
      directoriesHtml)
    await this.outputFunc(context, context.outputFile, "")
  }
}
