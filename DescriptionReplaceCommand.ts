import { HtmlRR0SsgContext } from "./RR0SsgContext"
import { ReplaceCommand } from "ssg-api/dist/src/step/content/replace/ReplaceCommand"

/**
 * Adds an "abstract" HTML paragraph from a <meta name="description">, if any.
 */
export class DescriptionReplaceCommand implements ReplaceCommand<HtmlRR0SsgContext> {
  constructor(protected readonly defaultDescription: string, protected readonly abstractClass = "abstract") {
  }

  async execute(context: HtmlRR0SsgContext): Promise<void> {
    const file = context.file
    const inDescription = file.meta.description
    const outDoc = file.document
    let descriptionMeta = outDoc.head.querySelector("meta[name='description']")
    if (!descriptionMeta) {
      const existingAbstract = outDoc.querySelector(`.${this.abstractClass}`)
      let outDescription: string
      if (existingAbstract) {
        outDescription = inDescription || existingAbstract.textContent.toString()
      } else if (inDescription) {
        const abstractFromDescription = outDoc.createElement("p")
        abstractFromDescription.className = this.abstractClass
        abstractFromDescription.textContent = inDescription
        const body = outDoc.body
        body.insertBefore(abstractFromDescription, body.firstChild)
        outDescription = inDescription
      } else {
        outDescription = this.defaultDescription
      }
      outDescription = outDescription.replace(/\s{2,}/g, " ")
      file.meta.description = outDescription
      const descriptionMeta = outDoc.createElement("meta") as HTMLMetaElement
      descriptionMeta.name = "description"
      descriptionMeta.content = file.meta.description
      outDoc.head.append(descriptionMeta)
      context.file.contents = outDoc.documentElement.outerHTML
    }
  }

  async contentStepEnd() {
    // NOP
  }
}
