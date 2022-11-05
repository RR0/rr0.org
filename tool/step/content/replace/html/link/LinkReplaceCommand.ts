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
    const relStart = inputFile.links.start || this.defaultHandler?.start(context)
    if (relStart) {
      this.addLink(context, ul, relStart)
    }
    const relContents = inputFile.links.contents || this.defaultHandler?.contents(context)
    if (relContents) {
      this.addLink(context, ul, relContents)
    }
    const relPrev = inputFile.links.prev || this.defaultHandler?.prev(context)
    if (relPrev) {
      this.addLink(context, ul, relPrev)
    }
    const relNext = inputFile.links.next || this.defaultHandler?.next(context)
    if (relNext) {
      this.addLink(context, ul, relNext)
    }
    outputFile.dom = dom
    return outputFile
  }

  private addLink(context: HtmlSsgContext, ul: Element, link: Link) {
    const outputDoc = context.outputFile.dom.window.document
    const li = outputDoc.createElement("li")
    li.className = link.type
    const a = outputDoc.createElement("a")
    a.textContent = link.text
    a.href = link.url
    li.appendChild(a)
    li.title = context.messages.nav[link.type]
    ul.appendChild(li)
  }
}
