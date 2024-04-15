import { DomReplaceCommand, DomReplacer } from "ssg-api"
import { AnchorReplacer } from "./AnchorReplacer"
import { CaseService } from "../science/crypto/ufo/enquete/dossier/CaseService"
import { HtmlRR0SsgContext } from "../RR0SsgContext"

/**
 * Contextual replacement of anchors (`<a>` tags).
 */
export class AnchorReplaceCommand extends DomReplaceCommand<HTMLAnchorElement> {

  protected readonly singleton: AnchorReplacer

  constructor(baseUrl: string, caseService: CaseService) {
    super("a")
    this.singleton = new AnchorReplacer(baseUrl, caseService)
  }

  protected async createReplacer(context: HtmlRR0SsgContext): Promise<DomReplacer<HTMLAnchorElement>> {
    return {
      replace: async (original: HTMLAnchorElement): Promise<HTMLAnchorElement> => {
        return this.singleton.replacement(context, original)
      }
    }
  }
}
