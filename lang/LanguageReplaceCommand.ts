import {DomReplaceCommand, DomReplacer} from "ssg-api"
import {HtmlRR0SsgContext} from "../RR0SsgContext"

/**
 * Add links to page language variants.
 */
export class LanguageReplaceCommand extends DomReplaceCommand<HTMLElement, HtmlRR0SsgContext> {

  constructor() {
    super("#alternate")
  }

  protected async createReplacer(context: HtmlRR0SsgContext): Promise<DomReplacer> {
    const doc = context.outputFile.document
    return new class implements DomReplacer {
      async replace(original: HTMLElement): Promise<HTMLElement> {
        if (!original.hasChildNodes()) {
          const inputFile = context.inputFile
          const langInfo = inputFile.lang
          const variants = langInfo.variants
          const foundLang = langInfo.lang
          const lang = foundLang ? foundLang : variants.includes("en") ? "fr" : "en"
          const langVariants = variants.length == 1 && variants[0] == "" ? [lang == "fr" ? "en" : "fr"] : variants
          inputFile.lang.lang = lang
          for (let i = 0; i < langVariants.length; i++) {
            const langVariant = langVariants[i]
            const altLink = doc.createElement("a")
            altLink.href = context.inputFile.name.replace((foundLang ? "_" + foundLang : "") + ".",
              `${variants[i] == "" ? "" : "_" + langVariant}.`)
            altLink.textContent = langVariant === "en" ? "English translation" : "Traduction française"
            original.appendChild(altLink)
          }
        }
        return original
      }
    }
  }
}
