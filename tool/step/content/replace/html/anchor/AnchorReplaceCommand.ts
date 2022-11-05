import {DomReplaceCommand} from "../../DomReplaceCommand"
import {HtmlSsgContext} from "../../../../../HtmlSsgContext"
import {DomReplacer} from "../../DomReplacer"
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
