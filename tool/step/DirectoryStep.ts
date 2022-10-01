import {SsgStep, SsgStepResult} from "./SsgStep"
import {OutputFunc, SsgConfig} from "../Ssg"
import {SsgContext} from "../SsgContext"
import {dirNames, getFileInfo} from "../FileUtil"
import {Html} from "../util/Html"

export class DirectoryStep implements SsgStep {

  constructor(protected dir: string, protected template: string, protected outputFunc: OutputFunc) {
  }

  async execute(context: SsgContext, config: SsgConfig): Promise<SsgStepResult> {
    const fileInfo = getFileInfo(context, "out/" + this.template)
    const dirames = await dirNames(this.dir)
    const directories = []
    for (const dirName of dirames) {
      directories.push(dirName)
    }
    let directoriesHtml = `<ul>
      ${directories.map(
      dir => {
        const result = dir.replace(/([A-Z0-9])/g, " $1").trim()
        const title = result.charAt(0).toUpperCase() + result.slice(1)
        const a = Html.element("a", title, {href: dir + "/"})
        return Html.element("li", a)
      }).join("\n")}
      </ul>`
    fileInfo.contents = fileInfo.contents.replace("${directories}", directoriesHtml)
    await this.outputFunc(context, fileInfo, "")
    return {directoryCount: directories.length}
  }
}
