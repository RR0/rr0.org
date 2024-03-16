import { DomReplacement } from "../DomReplacement"
import { HtmlRR0SsgContext } from "../../RR0SsgContext"
import { RR0CaseRenderer } from "../RR0CaseRenderer"
import { CaseMapping } from "./CaseMapping"
import { CsvMapper } from "./CsvMapper"
import fs from "fs"
import path from "path"
import { StringUtil } from "../../util/string/StringUtil"
import { RR0HttpDatasource } from "./rr0/RR0HttpDatasource"
import { RR0CaseSummary } from "./rr0/RR0CaseSummary"

export interface RR0CaseMapping<S> extends CaseMapping<HtmlRR0SsgContext, S, RR0CaseSummary> {
}

export class ChronologyReplacer implements DomReplacement<HtmlRR0SsgContext, HTMLUListElement> {

  protected readonly done = new Set<string>()

  constructor(protected mappings: RR0CaseMapping<any>[], protected renderer: RR0CaseRenderer,
              protected merge: boolean, protected save: boolean) {
  }

  async replacement(context: HtmlRR0SsgContext, element: HTMLUListElement): Promise<HTMLUListElement> {
    element.classList.add("indexed")
    // TODO: Merge with existing those items
    if (this.save || this.merge) {
      await this.aggregate(context, element)
    }
    return element
  }

  protected async aggregate(context: HtmlRR0SsgContext, element: HTMLUListElement) {
    for (const mapping of this.mappings) {
      const datasource = mapping.datasource
      const datasourceKey = context.inputFile.name + "$" + datasource.copyright
      if (!this.done.has(datasourceKey)) {
        const sourceCases = await datasource.getAll(context)
        const fetchTime = new Date()
        if (this.save) {
          const csvContents = new CsvMapper().reduce(context, sourceCases, fetchTime)
          const specialChars = /[ -?!&*#.:;=°',]/g
          const authorsStr = datasource.authors.map(
            author => StringUtil.removeAccents(author).replace(specialChars, "")).join("-")
          const fileName = path.join(path.dirname(context.inputFile.name),
            authorsStr + "_"
            + StringUtil.removeAccents(datasource.copyright).replace(specialChars, "") + ".csv")
          fs.writeFileSync(fileName, csvContents, {encoding: "utf-8"})
        }
        if (this.merge) {
          const existingItems = Array.from(element.children)
          const rr0Datasource = new RR0HttpDatasource()
          rr0Datasource.getFromRows(context, existingItems)
          const targetCases = sourceCases.map(sourceCase => mapping.mapper.map(context, sourceCase, fetchTime))
          const items = targetCases.map(c => this.renderer.render(context, c))
          for (const item of items) {
            element.append(item)
          }
        }
        this.done.add(datasourceKey)
      }
    }
  }
}
