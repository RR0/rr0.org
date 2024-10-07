import { DomReplaceCommand, DomReplacer } from "ssg-api"
import { AnchorReplacer } from "./AnchorReplacer.js"
import { HtmlRR0SsgContext } from "../RR0SsgContext.js"
import { AnchorHandler } from "./AnchorHandler.js"

/**
 * Contextual replacement of anchors (`<a>` tags).
 */
export class AnchorReplaceCommand extends DomReplaceCommand<HTMLAnchorElement> {

  protected readonly singleton: AnchorReplacer

  constructor(baseUrl: string, handlers: AnchorHandler[]) {
    super("a")
    this.singleton = new AnchorReplacer(baseUrl, handlers)
  }

  protected async createReplacer(context: HtmlRR0SsgContext): Promise<DomReplacer<HTMLAnchorElement>> {
    return {
      replace: async (original: HTMLAnchorElement): Promise<HTMLAnchorElement> => {
        return this.singleton.replacement(context, original)
      }
    }
  }
}
