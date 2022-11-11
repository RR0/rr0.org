import {DomReplaceCommand, DomReplacer, HtmlSsgContext} from "ssg-api"
import {AnchorReplacerFactory} from "./AnchorReplacerFactory"

export class AnchorReplaceCommand extends DomReplaceCommand<HTMLAnchorElement> {

  private anchorReplacerFactory: AnchorReplacerFactory

  constructor(baseUrl: string) {
    super("a")
    this.anchorReplacerFactory = new AnchorReplacerFactory(baseUrl)
  }

  protected createReplacer(context: HtmlSsgContext): Promise<DomReplacer<HTMLAnchorElement>> {
    return this.anchorReplacerFactory.create(context)
  }
}
