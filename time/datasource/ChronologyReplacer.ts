import { DomReplacement } from "../DomReplacement.js"
import { HtmlRR0SsgContext } from "../../RR0SsgContext.js"
import { CaseSummaryRenderer } from "../CaseSummaryRenderer.js"
import { RR0CaseSummary } from "./rr0/RR0CaseSummary.js"
import { RR0CaseMapping } from "./rr0/RR0CaseMapping.js"
import { RR0HttpDatasource } from "./rr0/RR0HttpDatasource.js"
import { HttpSource } from "./HttpSource.js"

/**
 * Replaces a (ul) tag from (chronology) files with case summaries from external datasources.
 */
export class ChronologyReplacer implements DomReplacement<HtmlRR0SsgContext, HTMLUListElement> {
  /**
   * Remember already processed datasources.
   *
   * @protected
   */
  protected readonly done = new Set<string>()

  constructor(protected mappings: RR0CaseMapping<any>[], protected renderer: CaseSummaryRenderer) {
  }

  async replacement(context: HtmlRR0SsgContext, element: HTMLUListElement): Promise<HTMLUListElement> {
    element.classList.add("indexed")  // Make sure the user can share an anchor to a list item.
    await this.aggregate(context, element)
    return element
  }

  protected async aggregate(context: HtmlRR0SsgContext, element: HTMLUListElement) {
    const existingCases: RR0CaseSummary[] = []
    const casesToAdd: RR0CaseSummary[] = []
    for (const mapping of this.mappings) {
      const datasource = mapping.datasource
      if (datasource instanceof RR0HttpDatasource) {
        datasource.http = new class extends HttpSource {

          async get(queryUrl: URL, init: RequestInit = {}, resOut: Partial<Response> = {}): Promise<HTMLElement> {
            return context.file.document.documentElement
          }
        }()
        datasource.findRows = (_doc: HTMLElement) => {
          return Array.from(element.children)   // Use local RR0 rows instead of remote ones
        }
      }
      const datasourceKey = context.file.name + "$" + datasource.copyright
      if (!this.done.has(datasourceKey)) {
        await this.aggregateDatasource(mapping, context, existingCases, casesToAdd)
        this.done.add(datasourceKey)
        const merge = mapping.actions.write.includes("pages")
        if (merge) {
          const allCases = existingCases.concat(casesToAdd)
          for (const c of allCases) {
            const outDoc = context.file.document
            const eventEl = outDoc.createElement("li")
            await this.renderer.render(context, c, eventEl)
            element.append(eventEl)
          }
        }
      }
    }
  }

  protected async aggregateDatasource(mapping: RR0CaseMapping<any>, context: HtmlRR0SsgContext,
                                      existingCases: RR0CaseSummary[], casesToAdd: RR0CaseSummary[]) {
    let fetched: any[]
    const datasource = mapping.datasource
    const backupDatasource = mapping.backupDatasource
    for (const readMethod of mapping.actions.read) {
      if (fetched) {
        break
      }
      switch (readMethod) {
        case "backup":
          try {
            fetched = await backupDatasource.fetch(context)
          } catch (e) {
            if (e.code !== "ENOENT") {
              throw e
            } else {
              context.debug("No backup file to read for" + context.time)
            }
          }
          break
        case "fetch":
          fetched = await datasource.fetch(context)
          break
        default:
          throw new Error(`Unsupported "${(mapping.actions.read)}" read method`)
      }
    }
    const fetchTime = new Date()
    for (const writeMethod of mapping.actions.write) {
      switch (writeMethod) {
        case "backup":
          backupDatasource.save(context, fetched, fetchTime)
          break
        case "pages":
          const toAddFromThisDatasource = this.merge(context, fetched, fetchTime, mapping, existingCases)
          casesToAdd.concat(toAddFromThisDatasource)
          break
      }
    }
  }

  protected merge(context: HtmlRR0SsgContext, sourceCases: any[], fetchTime: Date, mapping: RR0CaseMapping<any>,
                  existingCases: RR0CaseSummary[]
  ): RR0CaseSummary[] {
    const casesToMerge = sourceCases.map(sourceCase => mapping.mapper.map(context, sourceCase, fetchTime))
    const casesToAdd: RR0CaseSummary[] = []
    for (const caseToMerge of casesToMerge) {
      const foundExisting = existingCases.find(existingCase => existingCase.time.equals(caseToMerge.time)
        && existingCase.place?.name === caseToMerge.place?.name)
      if (foundExisting) {
        context.logger.debug("Merging ", caseToMerge, " into ", foundExisting)
      } else {
        casesToAdd.push(caseToMerge)
      }
    }
    return casesToAdd
  }
}
