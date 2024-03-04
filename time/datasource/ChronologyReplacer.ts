import { DomReplacement } from "../DomReplacement"
import { HtmlRR0SsgContext } from "../../RR0SsgContext"
import { RR0CaseRenderer } from "../RR0CaseRenderer"
import { RR0Case } from "../RR0Case"
import { CaseMapping } from "./CaseMapping"
import { CsvMapper } from "./CsvMapper"
import fs from "fs"
import path from "path"

export interface RR0CaseMapping<S> extends CaseMapping<HtmlRR0SsgContext, S, RR0Case> {
}

export class ChronologyReplacer implements DomReplacement<HtmlRR0SsgContext, HTMLUListElement> {

  protected readonly done = new Set<string>()

  constructor(protected mappings: RR0CaseMapping<any>[], protected renderer: RR0CaseRenderer, protected merge = false,
              protected save = true) {
  }

  async replacement(context: HtmlRR0SsgContext, element: HTMLUListElement): Promise<HTMLUListElement> {
    const existingItems = element.children
    // TODO: Merge with existing those items
    for (const mapping of this.mappings) {
      const datasource = mapping.datasource
      const datasourceKey = context.inputFile.name + "$" + datasource.copyright
      if (!this.done.has(datasourceKey)) {
        const sourceCases = await datasource.getAll(context)
        const fetchTime = new Date()
        if (this.save) {
          const csvContents = new CsvMapper().reduce(context, sourceCases, fetchTime)
          const specialChars = /[ -?!&*#.:;=°',]/g
          fs.writeFileSync(path.join(path.dirname(context.inputFile.name),
              datasource.author.replace(specialChars, "") + "_" + datasource.copyright.replace(specialChars, "")
              + ".csv"),
            csvContents, {encoding: "utf-8"})
        }
        if (this.merge) {
          const targetCases = sourceCases.map(sourceCase => mapping.mapper.map(context, sourceCase, fetchTime))
          const items = targetCases.map(c => this.renderer.render(context, c))
          for (const item of items) {
            element.append(item)
          }
        }
        this.done.add(datasourceKey)
      }
    }
    return element
  }
}
