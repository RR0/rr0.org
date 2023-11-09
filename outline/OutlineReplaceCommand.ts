import {HtmlSsgContext, HtmlSsgFile, ReplaceCommand} from "ssg-api"
import {StringUtil} from "../util/string/StringUtil"
import {LocalAnchor} from "../LocalAnchor"

/**
 * Creates page outline from sections tags.
 */
export class OutlineReplaceCommand implements ReplaceCommand<HtmlSsgContext> {

  async execute(context: HtmlSsgContext): Promise<HtmlSsgFile> {
    const inputFile = context.inputFile
    const outputFile = context.outputFile
    const dom = outputFile.dom
    const outputDoc = outputFile.document
    const inputDoc = inputFile.document
    const ul = outputDoc.querySelector(".outline")
    if (!ul) {
      context.error("Could not find .outline in", context.inputFile.name)
      return inputFile
    }
    const from = inputDoc.documentElement
    if (this.process(context, from, ul, 2)) {
      outputDoc.querySelector(".outline-title").textContent = "Sommaire"
    }
    outputFile.dom = dom
    return outputFile
  }

  protected process(context: HtmlSsgContext, from: Element, target: Element, level: number): boolean {
    let added = false
    const sectionsHeadings = from.querySelectorAll("section h" + level)
    const articlesHeadings = from.querySelectorAll("article h" + level)
    const headings = Array.from(sectionsHeadings).concat(Array.from(articlesHeadings))
    for (const titleElem of headings) {
      const text = titleElem.textContent
      if (text) {
        const localAnchor = StringUtil.textToCamel(text)
        const outlineElem = titleElem.cloneNode(true)
        const outputDoc = context.outputFile.document
        const anchor = LocalAnchor.create(outputDoc, localAnchor)
        titleElem.prepend(anchor)
        const a = outputDoc.createElement("a")
        a.href = '/' + context.inputFile.name + "#" + localAnchor
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
