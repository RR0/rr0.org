import {SsgStep, SsgStepResult} from "./SsgStep"
import {OutputFunc, SsgConfig} from "../Ssg"
import {SsgContext} from "../SsgContext"
import {camelToText, dirNames, FileInfo, getFileInfo} from "../util/file/FileUtil"
import {Html} from "../util/Html"

export interface DirectoryResult extends SsgStepResult {
  directoryCount: number
}

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

export class DirectoryStep implements SsgStep {

  constructor(protected dirs: string[], protected template: string, protected outputFunc: OutputFunc) {
  }

  async execute(context: SsgContext, config: SsgConfig): Promise<DirectoryResult> {
    const fileInfo = getFileInfo(context, `${config.outDir}/${this.template}`)
    let dirames: string[] = []
    for (let dir of this.dirs) {
      let d: string[]
      if (dir.endsWith("/*/")) {
        const baseDir = dir.substring(0, dir.length - 3)
        d = (await dirNames(baseDir)).map(x => baseDir + "/" + x)
      } else {
        d = [dir]
      }
      dirames = dirames.concat(d)
    }
    await this.processDirs(context, dirames, fileInfo)
    return {directoryCount: dirames.length}
  }

  private async processDirs(context: SsgContext, dirames: string[], fileInfo: FileInfo) {
    const cases: Case[] = []
    for (const dirName of dirames) {
      const dirCase: Case = {dirName, time: "", title: ""}
      cases.push(dirCase)
      try {
        const jsonFileInfo = getFileInfo(context, `${dirName}/index.json`)
        Object.assign(dirCase, JSON.parse(jsonFileInfo.contents))
      } catch (e) {
        console.warn(e)
        // No json, just guess title.
      }
    }
    const directoriesHtml = Html.element("ul", cases.map(dirCase => {
      if (!dirCase.title) {
        const lastSlash = dirCase.dirName.lastIndexOf("/")
        const lastDir = dirCase.dirName.substring(lastSlash + 1)
        dirCase.title = camelToText(lastDir)
      }
      const attrs: { [name: string]: string } = {}
      let titles = []
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
        details.push(Html.element("time", time))
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
      const a = Html.element("a", text.join(" "), {href: "/" + dirCase.dirName + "/"})
      if (titles.length) {
        attrs.title = titles.join(", ")
      }
      return Html.element("li", a, attrs)
    }).join("\n"))
    fileInfo.contents = fileInfo.contents.replace("${directories}", directoriesHtml)
    await this.outputFunc(context, fileInfo, "")
  }
}
