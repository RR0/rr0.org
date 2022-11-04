import {ReplacerFactory} from "../../ReplacerFactory"
import {DomReplacer} from "../../DomReplacer"
import {AnchorReplacer} from "./AnchorReplacer"
import {HtmlSsgContext} from "../../../../../HtmlSsgContext"

export class AnchorReplacerFactory implements ReplacerFactory<DomReplacer<HTMLAnchorElement>> {

  protected singleton?: AnchorReplacer

  constructor(protected baseUrl: string) {
  }

  async create(context: HtmlSsgContext): Promise<DomReplacer<HTMLAnchorElement>> {
    const instance = await this.getInstance()
    return {
      async replace(original: HTMLAnchorElement): Promise<HTMLAnchorElement> {
        return instance.replacement(context, original)
      }
    }
  }

  protected async getInstance(): Promise<AnchorReplacer> {
    if (!this.singleton) {
      this.singleton = new AnchorReplacer(this.baseUrl)
    }
    return this.singleton
  }
}
