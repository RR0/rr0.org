import {SsgStep, SsgStepResult} from "./SsgStep"
import {OutputFunc, SsgConfig} from "../Ssg"
import {SsgContext} from "../SsgContext"
import {camelToText, dirNames, getFileInfo} from "../util/file/FileUtil"
import {Html} from "../util/Html"

export interface DirectoryResult extends SsgStepResult {
  directoryCount: number
}

interface Case {
  dirName: string
  url: string
  title: string
  time: string
  classification: {
    hynek: string
  }
}

export class DirectoryStep implements SsgStep {

  constructor(protected dir: string, protected template: string, protected outputFunc: OutputFunc) {
  }

  async execute(context: SsgContext, config: SsgConfig): Promise<DirectoryResult> {
    const fileInfo = getFileInfo(context, `${config.outDir}/${this.template}`)
    const dirames = await dirNames(this.dir)
    const cases: Case[] = []
    for (const dirName of dirames) {
      const dirCase: Case = {
        dirName, classification: {hynek: ""}, time: "", title: "", url: ""
      }
      cases.push(dirCase)
      try {
        const jsonFileInfo = getFileInfo(context, `${this.dir}/${dirName}/index.json`)
        Object.assign(dirCase, JSON.parse(jsonFileInfo.contents))
      } catch (e) {
        console.warn(e)
        // No json, just guess title.
      }
    }
    const directoriesHtml = Html.element("ul", cases.map(dirCase => {
      dirCase.title = camelToText(dirCase.dirName)
      const details: string[] = []
      if (dirCase.classification.hynek) {
        details.push(dirCase.classification.hynek)
      }
      if (dirCase.time) {
        details.push(Html.element("time", dirCase.time))
      }
      const text: (string | string[])[] = [dirCase.title]
      if (details.length > 0) {
        text.push(`(${details.join(", ")})`)
      }
      const a = Html.element("a", text.join(" "), {href: dirCase.dirName + "/"})
      return Html.element("li", a)
    }).join("\n"))
    fileInfo.contents = fileInfo.contents.replace("${directories}", directoriesHtml)
    await this.outputFunc(context, fileInfo, "")
    return {directoryCount: cases.length}
  }
}
