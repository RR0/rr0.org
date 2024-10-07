import { beforeEach, describe, test } from "@javarome/testscript"
import { rr0TestUtil } from "../../../test/RR0TestUtil.js"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext.js"
import { fuforaTestCases } from "./FuforaTestCases.js"
import { DatasourceTestCase } from "../DatasourceTestCase.js"
import { fuforaRR0Mapping } from "./FuforaRR0Mapping.js"
import { TimeContext } from "../../TimeContext.js"
import { FuforaCaseSummary } from "./FuforaCaseSummary.js"
import { RR0CaseMapping } from "../rr0/RR0CaseMapping.js"

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
