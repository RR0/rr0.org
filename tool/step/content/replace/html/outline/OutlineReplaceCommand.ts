import {HtmlSsgContext} from "../../../../../HtmlSsgContext"
import {ReplaceCommand} from "../../ReplaceCommand"
import {HtmlFileInfo} from "../../../../../util/file/HtmlFileInfo"
import {StringUtil} from "../../../../../util/string/StringUtil"

/**
 */
export class OutlineReplaceCommand implements ReplaceCommand<HtmlSsgContext> {

  async execute(context: HtmlSsgContext): Promise<HtmlFileInfo> {
    const inputFile = context.inputFile
    const outputFile = context.outputFile
    const dom = outputFile.dom
    const outputDoc = dom.window.document
    const inputDoc = inputFile.dom.window.document
    const ul = outputDoc.querySelector(".outline")
    if (!ul) {
      console.error("Could not find .outline in", context.inputFile.name)
      return inputFile
    }
    const from = inputDoc.documentElement
    if (this.process(from, ul, outputDoc, 2)) {
      outputDoc.querySelector(".outline-title").textContent = "Sommaire"
    }
    outputFile.dom = dom
    return outputFile
  }

  private process(from: Element, target: Element, outputDoc: Document, level: number): boolean {
    let added = false
    const sectionsHeadings = from.querySelectorAll("section h" + level)
    for (const titleElem of sectionsHeadings) {
      const text = titleElem.textContent
      if (text) {
        const localAnchor = StringUtil.textToCamel(text)
        const outlineElem = titleElem.cloneNode(true)
        const anchor = outputDoc.createElement("div")
        anchor.className = "anchor"
        anchor.ariaHidden = "true"
        anchor.id = localAnchor
        titleElem.prepend(anchor)
        const a = outputDoc.createElement("a")
        a.href = "#" + localAnchor
        a.appendChild(outlineElem)
        const li = outputDoc.createElement("li")
        li.appendChild(a)
        target.appendChild(li)
        added = true
        this.process(titleElem.parentElement!, target, outputDoc, level + 1)
      }
    }
    return added
  }
}
