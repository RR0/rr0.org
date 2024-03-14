import { expect } from "@javarome/testscript"
import { RR0CaseRenderer } from "../RR0CaseRenderer"
import { RR0CaseMapping } from "./ChronologyReplacer"
import { HtmlRR0SsgContext, RR0SsgContext } from "../../RR0SsgContext"
import { TimeContext } from "../TimeContext"
import { TimeTextBuilder } from "../TimeTextBuilder"

export class DatasourceTestCase<S> {

  constructor(
    readonly mapping: RR0CaseMapping<S>,
    readonly sourceCases: S[],
    readonly sortComparator: (c1: S, c2: S) => number,
    readonly getTime: (c: S) => TimeContext
  ) {
  }

  async testFetch(context: RR0SsgContext) {
    const fetched = await this.mapping.datasource.getAll(context)
    const fetchSlice = fetched.slice(0, this.sourceCases.length)
    const sortedFetch = fetchSlice.sort(this.sortComparator)
    const sortedTestCases = this.sourceCases.sort(this.sortComparator)
    expect(sortedFetch).toEqual(sortedTestCases)
  }

  checkCaseHTML(context: HtmlRR0SsgContext, nativeCase: S, item: HTMLLIElement, dataDate: Date) {
    const datasource = this.mapping.datasource
    const expected = this.mapping.mapper.map(context, nativeCase, dataDate)
    const time = this.getTime(nativeCase)
    const caseContext = context.clone()
    Object.assign(caseContext, {time})
    const timeStr = TimeTextBuilder.build(caseContext)
    const caseNumber = nativeCase.caseNumber
    const placeStr = expected.place ? ` À <span class="place">${expected.place.name}</span>` : ""
    let sources = expected.sources
    if (sources?.length > 0) {
      const source = sources[0]
      const publicationStr = source.publication ? `, ${source.publication.time}` : ""
      const sourceStr = ` <span class="source">${datasource.author}: <a href="${nativeCase.url.href.replaceAll(
        "&",
        "&amp;")}">cas n°&nbsp;${caseNumber}</a>, <i>${datasource.copyright}</i>${publicationStr}</span>`
      expect(item.innerHTML).toBe(
        `<time datetime="${time.toString()}">${timeStr}</time>${placeStr}, ${expected.description}${sourceStr}`)
    }
  }

  async testRender(context: HtmlRR0SsgContext) {
    const sourceCases = await this.mapping.datasource.getAll(context)
    const dataDate = new Date("2024-08-12 00:00:00 GMT+1")
    const cases = sourceCases.map(sourceCase => this.mapping.mapper.map(context, sourceCase, dataDate))
    const eventRenderer = new RR0CaseRenderer()
    const items = cases.map(c => eventRenderer.render(context, c))
    expect(items.length).toBe(sourceCases.length)
    for (let i = 0; i < sourceCases.length; i++) {
      this.checkCaseHTML(context, sourceCases[i], items[i], dataDate)
    }
  }
}
