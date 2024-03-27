import { DomReplacement } from "../DomReplacement"
import { HtmlRR0SsgContext } from "../../RR0SsgContext"
import { RR0CaseRenderer } from "../RR0CaseRenderer"
import { CaseMapping } from "./CaseMapping"
import { CsvMapper } from "./CsvMapper"
import fs from "fs"
import path from "path"
import { StringUtil } from "../../util/string/StringUtil"
import { RR0CaseSummary } from "./rr0/RR0CaseSummary"
import { RR0Datasource } from "./rr0/RR0Datasource"
import { CaseSource } from "./CaseSource"
import { UfoCase } from "./UfoCase"

export interface RR0CaseMapping<S extends UfoCase> extends CaseMapping<HtmlRR0SsgContext, S, RR0CaseSummary> {
}

export type ChronologyReplacerActions = {
  readonly merge: boolean
  readonly save: boolean
}

export class ChronologyReplacer implements DomReplacement<HtmlRR0SsgContext, HTMLUListElement> {

  protected readonly done = new Set<string>()

  constructor(protected mappings: RR0CaseMapping<any>[], protected renderer: RR0CaseRenderer,
              protected actions: ChronologyReplacerActions, protected rr0Datasource: RR0Datasource) {
  }

  async replacement(context: HtmlRR0SsgContext, element: HTMLUListElement): Promise<HTMLUListElement> {
    element.classList.add("indexed")
    // TODO: Merge with existing those items
    if (this.actions.save || this.actions.merge) {
      await this.aggregate(context, element)
    }
    return element
  }

  protected async aggregate(context: HtmlRR0SsgContext, element: HTMLUListElement) {
    const existingItems = Array.from(element.children)
    // TODO: Get cases from local RR0, not the remote one
    const existingCases = this.rr0Datasource.getFromRows(context, existingItems)
    const casesToAdd: RR0CaseSummary[] = []
    for (const mapping of this.mappings) {
      const datasource = mapping.datasource
      const datasourceKey = context.inputFile.name + "$" + datasource.copyright
      if (!this.done.has(datasourceKey)) {
        const sourceCases = await datasource.fetch(context)
        const fetchTime = new Date()
        if (this.actions.save) {
          this.save(context, sourceCases, fetchTime, datasource)
        }
        if (this.actions.merge) {
          const toAddFromThisSource = this.merge(context, sourceCases, fetchTime, element, mapping, existingCases)
          casesToAdd.concat(toAddFromThisSource)
        }
        this.done.add(datasourceKey)
      }
    }
    if (this.actions.merge) {
      const allCases = existingCases.concat(casesToAdd)
      const items = allCases.map(c => this.renderer.render(context, c))
      for (const item of items) {
        element.append(item)
      }
    }
    if (this.actions.save) {
      this.save(context, existingCases.concat(casesToAdd), new Date(), this.rr0Datasource)
    }
  }

  protected merge(
    context: HtmlRR0SsgContext, sourceCases: any[], fetchTime: Date, element: HTMLUListElement,
    mapping: RR0CaseMapping<any>, existingCases: RR0CaseSummary[]
  ): RR0CaseSummary[] {
    const casesToMerge = sourceCases.map(sourceCase => mapping.mapper.map(context, sourceCase, fetchTime))
    const casesToAdd: RR0CaseSummary[] = []
    for (const caseToMerge of casesToMerge) {
      const foundExisting = existingCases.find(existingCase => existingCase.dateTime.equals(caseToMerge.dateTime)
        && existingCase.place?.name === caseToMerge.place?.name)
      if (foundExisting) {
        context.logger.debug("Merging ", caseToMerge, " into ", foundExisting)
      } else {
        casesToAdd.push(caseToMerge)
      }
    }
    return casesToAdd
  }

  protected save(context: HtmlRR0SsgContext, sourceCases: any[], fetchTime: Date, datasource: CaseSource<any>) {
    const csvContents = new CsvMapper().mapAll(context, sourceCases, fetchTime)
    const specialChars = /[ \-?!&*#().:\/\\;=°',]/g
    const authorsStr = datasource.authors.map(
      author => StringUtil.removeAccents(author).replace(specialChars, "")).join("-")
    const fileName = path.join(path.dirname(context.inputFile.name),
      authorsStr + "_" + StringUtil.removeAccents(datasource.copyright).replace(specialChars, "-") + ".csv")
    fs.writeFileSync(fileName, csvContents, {encoding: "utf-8"})
  }
}
