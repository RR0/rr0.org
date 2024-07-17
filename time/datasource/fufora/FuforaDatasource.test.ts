import { beforeEach, describe, test } from "@javarome/testscript"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { fuforaTestCases } from "./FuforaTestCases"
import { DatasourceTestCase } from "../DatasourceTestCase"
import { fuforaRR0Mapping } from "./FuforaRR0Mapping"
import { TimeContext } from "../../TimeContext"
import { FuforaCaseSummary } from "./FuforaCaseSummary"
import { RR0CaseMapping } from "../rr0/RR0CaseMapping"

describe("FuforaCaseSource", () => {

  const testCase = new class extends DatasourceTestCase<FuforaCaseSummary> {
    constructor(mapping: RR0CaseMapping<FuforaCaseSummary>, sourceCases: FuforaCaseSummary[]) {
      super(mapping, sourceCases)
    }

    protected getTime(c: FuforaCaseSummary): TimeContext {
      return c.dateTime
    }

    protected sortComparator(c1: FuforaCaseSummary, c2: FuforaCaseSummary): number {
      return c1.id < c2.id ? -1 : c1.id > c2.id ? 1 : 0
    }
  }(fuforaRR0Mapping, fuforaTestCases)

  let context: HtmlRR0SsgContext

  beforeEach(() => {
    context = rr0TestUtil.newHtmlContext("time/1/9/7/0/11/index.html")
    context.time.setYear(1970)
    context.time.setMonth(11)
  })

  test("fetch", async () => {
    await testCase.testFetch(context)
  })

  test("render", async () => {
    await testCase.testRender(context)
  })
})
