import { DomReplacer, ReplacerFactory } from "ssg-api"
import { IndexedReplacer } from "./IndexedReplacer.js"
import { HtmlRR0SsgContext } from "../RR0SsgContext.js"

export class IndexedReplacerFactory implements ReplacerFactory<DomReplacer> {

  protected singleton = new IndexedReplacer()

  async create(context: HtmlRR0SsgContext): Promise<DomReplacer> {
    const instance = await this.getInstance()
    return {
      replace:
        (original: HTMLElement): Promise<HTMLElement> => {
          return instance.replacement(context, original)
        }
    }
  }

  protected async getInstance(): Promise<IndexedReplacer> {
    return this.singleton
  }
}
