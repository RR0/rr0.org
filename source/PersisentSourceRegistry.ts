import { Source } from "./Source"
import { DataService } from "../data/DataService"
import { HttpSource } from "../time/datasource/HttpSource"
import { SourceRegistry } from "./SourceRegistry"
import { FileContents } from "ssg-api"

/**
 * Create Source objects and register them.
 */
export class PersisentSourceRegistry extends SourceRegistry {

  constructor(dataService: DataService, http: HttpSource, baseUrl: string, protected fileName: string) {
    super(dataService, http, baseUrl)
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
