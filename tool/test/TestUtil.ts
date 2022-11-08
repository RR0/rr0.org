import {SsgContext} from "../SsgContext"
import {HtmlFileInfo} from "../util/file/HtmlFileInfo"
import {HtmlSsgContext} from "../HtmlSsgContext"
import {FileInfo} from "../util/file/FileInfo"
import {SsgContextImpl} from "../SsgContextImpl"

class TestUtil {

  newContext(inputFileName: string, contents: string): SsgContext {
    const context = new SsgContextImpl("fr")
    context.inputFile = new FileInfo(inputFileName, "utf8", contents, new Date(), "fr")
    context.outputFile = context.inputFile  // By default
    return context
  }

  newHtmlContext(inputFileName: string, contents: string): HtmlSsgContext {
    const context = this.newContext(inputFileName, contents)
    const titleExec = /<title>(.*)<\/title>/.exec(contents)
    const title = titleExec && titleExec.length > 0 ? titleExec[1].trim() : undefined
    const currentFile = context.inputFile
    context.inputFile = new HtmlFileInfo(currentFile.name, currentFile.encoding, currentFile.contents,
      currentFile.lastModified, currentFile.lang, {author: []}, {}, title)
    context.outputFile = context.inputFile  // By default
    return context as HtmlSsgContext
  }
}

export const testUtil = new TestUtil()
