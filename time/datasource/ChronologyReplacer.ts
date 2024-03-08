import { DomReplacement } from "../DomReplacement"
import { HtmlRR0SsgContext } from "../../RR0SsgContext"
import { RR0CaseRenderer } from "../RR0CaseRenderer"
import { RR0Case } from "../RR0Case"
import { CaseMapping } from "./CaseMapping"
import { CsvMapper } from "./CsvMapper"
import fs from "fs"
import path from "path"
import { StringUtil } from "../../util/string/StringUtil"

export interface RR0CaseMapping<S> extends CaseMapping<HtmlRR0SsgContext, S, RR0Case> {
}

export class ChronologyReplacer implements DomReplacement<HtmlRR0SsgContext, HTMLUListElement> {

  protected readonly done = new Set<string>()

  constructor(
    protected mappings: RR0CaseMapping<any>[], protected renderer: RR0CaseRenderer,
    protected merge: boolean, protected save: boolean
  ) {
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
          const fileName = path.join(path.dirname(context.inputFile.name),
            StringUtil.removeAccents(datasource.author).replace(specialChars, "") + "_"
            + StringUtil.removeAccents(datasource.copyright).replace(specialChars, "") + ".csv")
          fs.writeFileSync(fileName, csvContents, {encoding: "utf-8"})
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
