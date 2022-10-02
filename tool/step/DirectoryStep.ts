import {SsgStep, SsgStepResult} from "./SsgStep"
import {OutputFunc, SsgConfig} from "../Ssg"
import {SsgContext} from "../SsgContext"
import {dirNames, dirToTitle, getFileInfo} from "../util/file/FileUtil"
import {Html} from "../util/Html"

export interface DirectoryResult extends SsgStepResult {
  directoryCount: number
}

export class DirectoryStep implements SsgStep {

  constructor(protected dir: string, protected template: string, protected outputFunc: OutputFunc) {
  }

  async execute(context: SsgContext, config: SsgConfig): Promise<DirectoryResult> {
    const fileInfo = getFileInfo(context, `${config.outDir}/${this.template}`)
    const dirames = await dirNames(this.dir)
    const directories = []
    for (const dirName of dirames) {
      directories.push(dirName)
    }
    const directoriesHtml = Html.element("ul", directories.map(dir => {
      const title = dirToTitle(dir)
      const a = Html.element("a", title, {href: dir + "/"})
      return Html.element("li", a)
    }).join("\n"))
    fileInfo.contents = fileInfo.contents.replace("${directories}", directoriesHtml)
    await this.outputFunc(context, fileInfo, "")
    return {directoryCount: directories.length}
  }
}
