import { expect } from "@javarome/testscript"
import { CaseSummaryRenderer } from "../CaseSummaryRenderer"
import { HtmlRR0SsgContext, RR0SsgContext } from "../../RR0SsgContext"
import { TimeContext } from "../TimeContext"
import { TimeTextBuilder } from "../TimeTextBuilder"
import { Source } from "../../source/Source"
import { RR0UfoCase } from "./RR0UfoCase"
import { SourceRenderer } from "../SourceRenderer"
import { RR0CaseMapping } from "./rr0/RR0CaseMapping"

export abstract class DatasourceTestCase<S extends RR0UfoCase> {

  protected constructor(readonly mapping: RR0CaseMapping<S>, readonly sourceCases: S[]) {
  }

  checkCaseHTML(context: HtmlRR0SsgContext, nativeCase: S, item: HTMLLIElement, dataDate: Date) {
    const expected = this.mapping.mapper.map(context, nativeCase, dataDate)
    const time = this.getTime(nativeCase)
    const caseContext = context.clone()
    Object.assign(caseContext, {time})
    const timeStr = TimeTextBuilder.build(caseContext)
    const placeStr = expected.place ? ` À <span class="place">${expected.place.name}</span>` : ""
    const sourceStr = expected.sources?.length > 0 ? this.expectedSourceStr(caseContext, expected.sources,
      nativeCase) : ""
    expect(item.innerHTML).toBe(
      `<time datetime="${time.toString()}">${timeStr}</time>${placeStr}, ${expected.description}${sourceStr}.`)
  }

  protected expectedSourceStr(caseContext: HtmlRR0SsgContext, expectedSources: Source[], nativeCase: S) {
    const datasource = this.mapping.datasource
    const source = expectedSources[0]
    const publicationStr = source.publication ? `, ${source.publication.time}` : ""
    const authorStr = datasource.authors.join(", ")
    const title = `cas n°&nbsp;${nativeCase.id}`
    return ` <span class="source">${authorStr}: <a href="${nativeCase.url.href.replaceAll(
      "&",
      "&amp;")}">${title}</a>, <i>${datasource.copyright}</i>${publicationStr}</span>`
  }

  protected abstract sortComparator(c1: S, c2: S): number

  async testFetch(context: RR0SsgContext) {
    const fetched = await this.mapping.datasource.fetch(context)
    const fetchSlice = fetched.slice(0, this.sourceCases.length)
    const sortedFetch = fetchSlice.sort(this.sortComparator)
    const sortedTestCases = this.sourceCases.sort(this.sortComparator)
    expect(sortedFetch).toEqual(sortedTestCases)
  }

  protected abstract getTime(c: S): TimeContext

  async testRender(context: HtmlRR0SsgContext) {
    const sourceCases = await this.mapping.datasource.fetch(context)
    const dataDate = new Date("2024-08-12 00:00:00 GMT+1")
    const cases = sourceCases.map(sourceCase => this.mapping.mapper.map(context, sourceCase, dataDate))
    const eventRenderer = new CaseSummaryRenderer(new SourceRenderer())
    const items = cases.map(c => eventRenderer.render(context, c))
    expect(items.length).toBe(sourceCases.length)
    for (let i = 0; i < sourceCases.length; i++) {
      this.checkCaseHTML(context, sourceCases[i], items[i], dataDate)
    }
  }
}
