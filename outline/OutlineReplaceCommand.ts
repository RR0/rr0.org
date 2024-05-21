import { HtmlSsgContext, ReplaceCommand } from "ssg-api"
import { StringUtil } from "../util/string/StringUtil"
import { LocalAnchor } from "../LocalAnchor"
import path from "path"

/**
 * Creates page outline from sections tags.
 */
export class OutlineReplaceCommand implements ReplaceCommand<HtmlSsgContext> {

  async execute(context: HtmlSsgContext): Promise<void> {
    const file = context.file
    const dom = file.dom
    const outputDoc = file.document
    const inputDoc = file.document
    const ul = outputDoc.querySelector(".outline")
    if (!ul) {
      context.error("Could not find .outline in", context.file.name)
      return
    }
    const from = inputDoc.documentElement
    if (this.process(context, from, ul, 2)) {
      outputDoc.querySelector(".outline-title").textContent = "Sommaire"
    }
    file.dom = dom
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
        const outputDoc = context.file.document
        const anchor = LocalAnchor.create(outputDoc, localAnchor)
        titleElem.prepend(anchor)
        const a = outputDoc.createElement("a")
        const outDir = "/out"
        const fileName = context.file.name.startsWith(outDir) ? context.file.name.substring(
          outDir.length) : context.file.name
        a.href = path.join("/", fileName) + "#" + localAnchor
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

  async contentStepEnd() {
    // NOP
  }
}
