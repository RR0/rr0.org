import {HtmlRR0SsgContext, RR0SsgContext, RR0SsgContextImpl} from "../RR0SsgContext"
import {TimeContext} from "../time/TimeContext"
import {HtmlSsgFile, SsgFile} from "ssg-api"

class RR0TestUtil {

  readonly intlOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short"
  }

  newContext(inputFileName: string, contents: string): RR0SsgContext {
    const context = new RR0SsgContextImpl("fr", new TimeContext(this.intlOptions))
    context.inputFile = new SsgFile(inputFileName, "utf8", contents, new Date(), "fr")
    context.outputFile = context.inputFile  // By default
    return context
  }

  newHtmlContext(inputFileName: string, contents: string): HtmlRR0SsgContext {
    const context = this.newContext(inputFileName, contents)
    const titleExec = /<title>(.*)<\/title>/.exec(contents)
    const title = titleExec && titleExec.length > 0 ? titleExec[1].trim() : undefined
    const currentFile = context.inputFile
    context.inputFile = new HtmlSsgFile(currentFile.name, currentFile.encoding, currentFile.contents,
      currentFile.lastModified, currentFile.lang, {author: []}, {}, title)
    context.outputFile = context.inputFile  // By default
    return context as HtmlRR0SsgContext
  }
}

export const rr0TestUtil = new RR0TestUtil()
