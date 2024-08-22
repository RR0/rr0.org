import { expect } from "@javarome/testscript"
import { CaseSummaryRenderer } from "../CaseSummaryRenderer"
import { HtmlRR0SsgContext } from "../../RR0SsgContext"
import { TimeContext } from "../TimeContext"
import { TimeTextBuilder } from "../TimeTextBuilder"
import { Source } from "../../source/Source"
import { RR0CaseMapping } from "./rr0/RR0CaseMapping"
import { SourceRenderer } from "../../source/SourceRenderer"
import { NoteRenderer } from "../../note/NoteRenderer"
import { SourceFactory } from "../../source/SourceFactory"
import { NoteFileCounter } from "../../note/NoteFileCounter"
import { AllDataService } from "../../data/AllDataService"
import { HttpSource } from "./HttpSource"
import { RR0CaseSummary } from "./rr0/RR0CaseSummary"
import { rr0TestUtil } from "../../test/RR0TestUtil"

export abstract class DatasourceTestCase<S extends RR0CaseSummary> {

  timeTextBuilder = new TimeTextBuilder(rr0TestUtil.intlOptions)

  protected constructor(readonly mapping: RR0CaseMapping<S>, readonly sourceCases: S[]) {
  }

  checkCaseHTML(context: HtmlRR0SsgContext, nativeCase: S, item: HTMLLIElement, dataDate: Date) {
    const expected = this.mapping.mapper.map(context, nativeCase, dataDate)
    const time = this.getTime(nativeCase)
    const caseContext = context.clone()
    Object.assign(caseContext, {time})
    const timeStr = this.timeTextBuilder.build(caseContext)
    const placeStr = expected.place ? ` À <span class="place">${expected.place.name}</span>` : ""
    const expectedSources = expected.sources
    const sourceStr = expectedSources?.length > 0 ? this.expectedSourceStr(context, expectedSources, nativeCase) : ""
    expect(item.innerHTML).toBe(
      `<time datetime="${time.toString()}">${timeStr}</time>${placeStr}, ${expected.description}${sourceStr}.`)
  }

  async testRender(context: HtmlRR0SsgContext) {
    const sourceCases = await this.mapping.datasource.fetch(context)
    const dataDate = new Date("2024-08-12 00:00:00 GMT+1")
    const cases = sourceCases.map(sourceCase => this.mapping.mapper.map(context, sourceCase, dataDate))
    const dataService = new AllDataService([])
    const baseUrl = "https://rr0.org"
    const http = new HttpSource()
    const sourceFactory = new SourceFactory(dataService, http, baseUrl, rr0TestUtil.intlOptions)
    const eventRenderer = new CaseSummaryRenderer(new NoteRenderer(new NoteFileCounter()), sourceFactory,
      new SourceRenderer(this.timeTextBuilder))
    const itemsPromises = cases.map(c => eventRenderer.render(context, c))
    const items = await Promise.all(itemsPromises)
    expect(items.length).toBe(sourceCases.length)
    for (let i = 0; i < sourceCases.length; i++) {
      this.checkCaseHTML(context, sourceCases[i], items[i], dataDate)
    }
  }

  protected abstract sortComparator(c1: S, c2: S): number

  async testFetch(context: HtmlRR0SsgContext) {
    const fetched = await this.mapping.datasource.fetch(context)
    const fetchSlice = fetched.slice(0, this.sourceCases.length)
    const sortedFetch = fetchSlice.sort(this.sortComparator)
    const sortedTestCases = this.sourceCases.sort(this.sortComparator)
    expect(sortedFetch).toEqual(sortedTestCases)
  }

  protected abstract getTime(c: S): TimeContext

  protected expectedSourceStr(context: HtmlRR0SsgContext, expectedSources: Source[], nativeCase: S) {
    const datasource = this.mapping.datasource
    const source = expectedSources[0]
    const sourceContext = context.clone()
    sourceContext.time = source.publication.time
    const publicationStr = source.publication ? `, ${this.timeTextBuilder.build(sourceContext)}` : ""
    const indexStr = source.index ? `, ${source.index}` : ""
    const authorStr = datasource.authors.map(authorStr => `<span class="people">${authorStr}</span>`).join(" &amp; ")
    const title = `cas n° ${nativeCase.id}`
    return ` <span class="source">${authorStr}: <a href="${nativeCase.url.replaceAll(
      "&",
      "&amp;")}">${title}</a>, <i>${datasource.copyright}</i>${publicationStr}${indexStr}</span>`
  }
}
