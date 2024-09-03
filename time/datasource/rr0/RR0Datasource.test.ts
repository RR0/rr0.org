import { beforeEach, describe, test } from "@javarome/testscript"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { rr0TestCases } from "./RR0TestCases"
import { DatasourceTestCase } from "../DatasourceTestCase"
import { rr0FileDatasource, rr0Mapper } from "./RR0Mapping"
import { RR0CaseSummary } from "./RR0CaseSummary"
import { TimeContext } from "../../TimeContext"
import { Source } from "../../../source/Source"
import { HtmlTag } from "../../../util/html/HtmlTag"
import { RR0CaseMapping } from "./RR0CaseMapping"
import { RR0Datasource } from "./RR0Datasource"
import { Datasource } from "../Datasource"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions"
import { TimeTextBuilder } from "../../TimeTextBuilder"

export class RR0TestDatasource extends RR0Datasource implements Datasource<RR0CaseSummary> {

  timeTextBuilder = new TimeTextBuilder(rr0TestUtil.intlOptions)

  constructor() { // Makes inherited constructor public
    super()
  }

  protected async readCases(_context: HtmlRR0SsgContext): Promise<RR0CaseSummary[]> {
    return rr0TestCases
  }
}

export class RR0TestMapping implements RR0CaseMapping<RR0CaseSummary> {
  readonly datasource = new RR0TestDatasource()
  readonly backupDatasource = rr0FileDatasource
  readonly mapper = rr0Mapper

  constructor(readonly actions: ChronologyReplacerActions) {
  }
}


describe("RR0CaseSource", () => {

  const testCase = new class extends DatasourceTestCase<RR0CaseSummary> {
    constructor(mapping: RR0CaseMapping<RR0CaseSummary>, sourceCases: RR0CaseSummary[]) {
      super(mapping, sourceCases)
    }

    protected getTime(c: RR0CaseSummary): TimeContext {
      return c.time
    }

    protected sortComparator(c1: RR0CaseSummary, c2: RR0CaseSummary): number {
      return !c1.time || c2.time && c1.time.isBefore(
        c2.time) ? -1 : !c2.time || c1.time.isAfter(c2.time) ? 1 : 0
    }

    /**
     * Specialization of sources for RR0 cases
     */
    protected expectedSourceStr(context: HtmlRR0SsgContext, expectedSources: Source[], _nativeCase: RR0CaseSummary) {
      return expectedSources.map(source => {
        const sourceItems: string[] = []
        let authorStr = source.authors.map(author => `<span class="people">${author}</span>`).join(" &amp; ")
        if (authorStr) {
          authorStr += "&nbsp;: "
        }
        if (source.title) {
          sourceItems.push(source.title)
        }
        const publication = source.publication
        if (publication) {
          if (publication.publisher) {
            sourceItems.push(`<i>${publication.publisher}</i>`)
          }
          if (publication.time) {
            const sourceContext = context.clone()
            sourceContext.time = source.publication.time
            const timeStr = this.timeTextBuilder.build(sourceContext)
            sourceItems.push(timeStr)
          }
        }
        const index = source.index
        if (index) {
          sourceItems.push(index)
        }
        return " " + HtmlTag.toString("span", authorStr + sourceItems.join(", "), {class: "source"})
      }).join("")
    }
  }(new RR0TestMapping({read: ["fetch"], write: []}), rr0TestCases)

  let context: HtmlRR0SsgContext

  beforeEach(() => {
    context = rr0TestUtil.newHtmlContext("time/1/9/7/0/03/index.html")
    context.time.setYear(1970)
    context.time.setMonth(3)
  })

  test("fetch", async () => {
    await testCase.testFetch(context)
  })

  test("render", async () => {
    await testCase.testRender(context)
  })
})
