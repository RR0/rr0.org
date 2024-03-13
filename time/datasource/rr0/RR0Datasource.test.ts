import { beforeEach, describe, test } from "@javarome/testscript"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { rr0TestCases } from "./RR0TestCases"
import { DatasourceTestCase } from "../DatasourceTestCase"
import { rr0Mapping, rr0SortComparator, rr0TimeAccessor } from "./RR0Mapping"

describe("RR0CaseSource", () => {

  const testCase = new DatasourceTestCase<Rr0CaseSummary>(rr0Mapping, rr0TestCases, rr0SortComparator, rr0TimeAccessor)
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
