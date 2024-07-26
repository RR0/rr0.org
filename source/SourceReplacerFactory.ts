import { DomReplacer, ReplacerFactory } from "ssg-api"
import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { DataService } from "../DataService"
import { HttpSource } from "../time/datasource/HttpSource"
import { SourceRenderer } from "./SourceRenderer"
import { SourceReplacer } from "./SourceReplacer"

/**
 * Creates replacers for sources HTML in a given context.
 */
export class SourceReplacerFactory implements ReplacerFactory<DomReplacer> {

  constructor(protected renderer: SourceRenderer, readonly dataService: DataService, readonly http: HttpSource,
              protected baseUrl: string) {
  }

  async create(context: HtmlRR0SsgContext): Promise<DomReplacer> {
    const replacer = new SourceReplacer(this.renderer, this.dataService, this.http, this.baseUrl)
    return {
      async replace(original: HTMLElement): Promise<HTMLElement> {
        return replacer.replacement(context, original)
      }
    }
  }
}
