import {HtmlSsgContext} from "../../../../../HtmlSsgContext"
import {ReplaceCommand} from "../../ReplaceCommand"
import {HtmlFileInfo, Link} from "../../../../../util/file/HtmlFileInfo"

/**
 */
export class LinkReplaceCommand implements ReplaceCommand<HtmlSsgContext> {

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
    if (inputFile.relStart) {
      this.addLink(outputDoc, ul, inputFile.relStart)
    }
    if (inputFile.relContents) {
      this.addLink(outputDoc, ul, inputFile.relContents)
    }
    if (inputFile.relPrev) {
      this.addLink(outputDoc, ul, inputFile.relPrev)
    }
    if (inputFile.relNext) {
      this.addLink(outputDoc, ul, inputFile.relNext)
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
