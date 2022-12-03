import {DomReplaceCommand, DomReplacer, HtmlSsgContext} from "ssg-api"
import {AnchorReplacer} from "./AnchorReplacer"

/**
 * Contextual replacement of anchors (`<a>` tags).
 */
export class AnchorReplaceCommand extends DomReplaceCommand<HTMLAnchorElement> {

  protected readonly singleton: AnchorReplacer

  constructor(baseUrl: string) {
    super("a")
    this.singleton = new AnchorReplacer(baseUrl)
  }

  protected async createReplacer(context: HtmlSsgContext): Promise<DomReplacer<HTMLAnchorElement>> {
    return {
      replace: async (original: HTMLAnchorElement): Promise<HTMLAnchorElement> => {
        return this.singleton.replacement(context, original)
      }
    }
  }
}
