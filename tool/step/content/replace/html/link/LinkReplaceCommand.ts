import {HtmlSsgContext} from "../../../../../HtmlSsgContext"
import {ReplaceCommand} from "../../ReplaceCommand"
import {HtmlFileInfo, Link} from "../../../../../util/file/HtmlFileInfo"

export interface LinkHandler {

  start(context: HtmlSsgContext): Link | undefined

  contents(context: HtmlSsgContext): Link | undefined

  prev(context: HtmlSsgContext): Link | undefined

  next(context: HtmlSsgContext): Link | undefined
}

/**
 */
export class LinkReplaceCommand implements ReplaceCommand<HtmlSsgContext> {

  constructor(protected defaultHandler?: LinkHandler) {
  }

  async execute(context: HtmlSsgContext): Promise<HtmlFileInfo> {
    const inputFile = context.inputFile
    const outputFile = context.outputFile
    const dom = outputFile.dom
    const outputDoc = dom.window.document
    const ul = outputDoc.querySelector("nav ul")
    if (!ul) {
      console.error("Could not find nav list in " + context.outputFile.name)
      return inputFile
    }
    const relStart = inputFile.relStart || this.defaultHandler?.start(context)
    if (relStart) {
      this.addLink(outputDoc, ul, relStart)
    }
    const relContents = inputFile.relContents || this.defaultHandler?.contents(context)
    if (relContents) {
      this.addLink(outputDoc, ul, relContents)
    }
    const relPrev = inputFile.relPrev || this.defaultHandler?.prev(context)
    if (relPrev) {
      this.addLink(outputDoc, ul, relPrev)
    }
    const relNext = inputFile.relNext || this.defaultHandler?.next(context)
    if (relNext) {
      this.addLink(outputDoc, ul, relNext)
    }
    outputFile.dom = dom
    return outputFile
  }

  private addLink(outputDoc: Document, ul: Element, link: Link) {
    const li = outputDoc.createElement("li")
    li.className = link.type
    const a = outputDoc.createElement("a")
    a.textContent = link.text
    a.href = link.url
    li.appendChild(a)
    ul.appendChild(li)
  }
}
