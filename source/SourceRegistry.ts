import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { Source } from "./Source"
import { AllDataService } from "../data/AllDataService"
import { HttpSource } from "../time/datasource/HttpSource"
import { SourceFactory } from "./SourceFactory"

/**
 * Create Source objects and register them.
 */
export class SourceRegistry extends SourceFactory {

  protected registry = {}

  constructor(dataService: AllDataService, http: HttpSource, baseUrl: string, options: Intl.DateTimeFormatOptions) {
    super(dataService, http, baseUrl, options)
  }

  /**
   * Create a Source object from an anchor's URL.
   *
   * @param context
   * @param href The anchor's URL string.
   */
  async createExternal(context: HtmlRR0SsgContext, href: string): Promise<Source> {
    let source = await this.get(href)
    if (!source) {
      source = await super.createExternal(context, href)
      await this.register(href, source)
    }
    return source
  }

  protected async get(href: string): Promise<Source> {
    return this.registry[href]
  }

  protected async register(href: string, source: Source) {
    this.registry[href] = source
  }
}
