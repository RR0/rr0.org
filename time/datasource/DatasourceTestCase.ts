import { expect } from "@javarome/testscript"
import { RR0CaseRenderer } from "../RR0CaseRenderer"
import { RR0CaseMapping } from "./ChronologyReplacer"
import { HtmlRR0SsgContext, RR0SsgContext } from "../../RR0SsgContext"
import { TimeContext } from "../TimeContext"
import { CsvMapper } from "./CsvMapper"

export class DatasourceTestCase<S> {

  readonly csvMapper = new CsvMapper<S>()

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
    const nativeTime = this.getTime(nativeCase)
    const dayOfMonth = nativeTime.getDayOfMonth()
    const dateStr = `${nativeTime.getYear()}-${String(nativeTime.getMonth()).padStart(2, "0")}`
      + (dayOfMonth ? "-" + String(dayOfMonth).padStart(2, "0") : "")
    const hour = nativeTime.getHour()
    const timeStr = hour ? " " + String(hour).padStart(2, "0") + ":"
      + String(nativeTime.getMinutes()).padStart(2, "0") : ""
    const caseNumber = nativeCase.caseNumber
    expect(item.innerHTML).toBe(
      `<time>${dateStr}${timeStr}</time> À <span class="place">${expected.place.name}</span>, ${expected.description} <span class="source">${datasource.author}: <a href="${nativeCase.url.href.replaceAll(
        "&",
        "&amp;")}">cas n°&nbsp;${caseNumber}</a>, <i>${datasource.copyright}</i>, ${expected.sources[0].publication.time}</span>`)
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
