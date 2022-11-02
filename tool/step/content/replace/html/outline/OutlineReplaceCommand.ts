import {HtmlSsgContext} from "../../../../../HtmlSsgContext"
import {ReplaceCommand} from "../../ReplaceCommand"
import {HtmlFileInfo} from "../../../../../util/file/HtmlFileInfo"
import {StringUtil} from "../../../../../util/string/StringUtil"
import {LocalAnchor} from "../LocalAnchor"

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
    if (this.process(context, from, ul, 2)) {
      outputDoc.querySelector(".outline-title").textContent = "Sommaire"
    }
    outputFile.dom = dom
    return outputFile
  }

  private process(context: HtmlSsgContext, from: Element, target: Element, level: number): boolean {
    let added = false
    const sectionsHeadings = from.querySelectorAll("section h" + level)
    for (const titleElem of sectionsHeadings) {
      const text = titleElem.textContent
      if (text) {
        const localAnchor = StringUtil.textToCamel(text)
        const outlineElem = titleElem.cloneNode(true)
        const outputDoc = context.outputFile.dom.window.document
        const anchor = LocalAnchor.create(outputDoc, localAnchor)
        titleElem.prepend(anchor)
        const a = outputDoc.createElement("a")
        a.href = "#" + localAnchor
        a.appendChild(outlineElem)
        const li = outputDoc.createElement("li")
        li.appendChild(a)
        target.appendChild(li)
        added = true
        this.process(context, titleElem.parentElement!, target, level + 1)
      }
    }
    return added
  }
}
