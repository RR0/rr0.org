import {LinkHandler} from "./LinkReplaceCommand"
import {HtmlSsgContext} from "../../../../../HtmlSsgContext"
import {Link, LinkType} from "../../../../../util/file/HtmlFileInfo"
import {Time} from "../../../../../model/time/Time"

export class TimeLinkDefaultHandler implements LinkHandler {

  constructor(protected timeFiles: string[]) {
  }

  contents(context: HtmlSsgContext): Link | undefined {
    const fileName = context.inputFile.name
    if (this.isTimeFile(fileName)) {
      return {
        type: LinkType.contents,
        text: "Historique",
        url: "/time/"
      }
    }
  }

  next(context: HtmlSsgContext): Link | undefined {
    let fileName = context.inputFile.name
    if (this.isTimeFile(fileName)) {
      const filePos = fileName.lastIndexOf("/index.html")
      if (filePos > 0) {
        fileName = fileName.substring(0, filePos)
      }
      const pos = this.timeFiles.indexOf(fileName)
      const nextFile = this.timeFiles[pos + 1]
      const text = Time.titleFromFile(context, nextFile)!
      return {type: LinkType.next, text, url: nextFile}
    }
  }

  prev(context: HtmlSsgContext): Link | undefined {
    let fileName = context.inputFile.name
    if (this.isTimeFile(fileName)) {
      const filePos = fileName.lastIndexOf("/index.html")
      if (filePos > 0) {
        fileName = fileName.substring(0, filePos)
      }
      const pos = this.timeFiles.indexOf(fileName)
      const prevFile = this.timeFiles[pos - 1]
      const text = Time.titleFromFile(context, prevFile)!
      return {type: LinkType.prev, text, url: prevFile}
    }
  }

  start(context: HtmlSsgContext): Link | undefined {
    return undefined
  }

  private isTimeFile(fileName: string) {
    return fileName.startsWith("time/")
  }
}
