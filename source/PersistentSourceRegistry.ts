import { Source } from "./Source"
import { AllDataService } from "../data/AllDataService"
import { HttpSource } from "../time/datasource/HttpSource"
import { SourceRegistry } from "./SourceRegistry"
import { FileContents } from "ssg-api"

/**
 * Create Source objects and register them.
 */
export class PersistentSourceRegistry extends SourceRegistry {

  constructor(dataService: AllDataService, http: HttpSource, baseUrl: string, protected fileName: string,
              options: Intl.DateTimeFormatOptions) {
    super(dataService, http, baseUrl, options)
    const registryFileContents = FileContents.read(fileName, "utf-8").contents
    this.registry = JSON.parse(registryFileContents)
  }

  protected async get(href: string): Promise<Source> {
    return super.get(href)
  }

  protected async register(href: string, source: Source) {
    return super.register(href, source)
  }
}
