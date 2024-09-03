import { beforeEach, describe, test } from "@javarome/testscript"
import { DatasourceTestCase } from "../DatasourceTestCase"
import { SceauCaseSummary } from "./SceauCaseSummary"
import { TimeContext } from "../../TimeContext"
import { Source } from "../../../source/Source"
import { HtmlTag } from "../../../util/html/HtmlTag"
import { SceauCaseMapping } from "./SceauCaseMapping"
import { SceauDatasource } from "./SceauDatasource"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions"
import { TimeTextBuilder } from "../../TimeTextBuilder"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { sceauDatasource, sceauRR0Mapper } from "./SceauRR0Mapping"
import { sceauTestCases } from "./SceauTestCases"

export class SceauTestDatasource extends SceauDatasource {

  timeTextBuilder = new TimeTextBuilder(rr0TestUtil.intlOptions)

  constructor() { // Makes inherited constructor public
    super()
  }

  /*protected async readCases(_context: HtmlRR0SsgContext): Promise<SceauCaseSummary[]> {
    return sceauTestCases
  }*/
}

export class SceauTestMapping implements SceauCaseMapping {
  readonly datasource = sceauDatasource // new SceauTestDatasource()
  readonly mapper = sceauRR0Mapper

  constructor(readonly actions: ChronologyReplacerActions) {
  }
}


describe("SCEAUCaseSource", () => {

  const testCase = new class extends DatasourceTestCase<SceauCaseSummary> {
    constructor(mapping: SceauCaseMapping, sourceCases: SceauCaseSummary[]) {
      super(mapping, sourceCases)
    }

    protected getTime(c: SceauCaseSummary): TimeContext {
      return c.time
    }

    protected sortComparator(c1: SceauCaseSummary, c2: SceauCaseSummary): number {
      return !c1.time || c2.time && c1.time.isBefore(
        c2.time) ? -1 : !c2.time || c1.time.isAfter(c2.time) ? 1 : 0
    }

    /**
     * Specialization of sources for SCEAU cases
     */
    protected expectedSourceStr(context: HtmlRR0SsgContext, expectedSources: Source[], _nativeCase: SceauCaseSummary) {
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
  }(new SceauTestMapping({read: ["fetch"], write: []}), sceauTestCases)

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
