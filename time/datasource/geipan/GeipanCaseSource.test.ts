import { beforeEach, describe, test } from "@javarome/testscript"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { GeipanCase } from "./GeipanCase"
import { geipanRR0Mapping, geipanSortComparator } from "./GeipanRR0Mapping"
import { DatasourceTestCase } from "../DatasourceTestCase"
import { geipanTestCases } from "./GeipanTestCases"

describe("GeipanCaseSource", () => {

  const testCase = new DatasourceTestCase<GeipanCase>(geipanRR0Mapping, geipanTestCases, geipanSortComparator)

  let context: HtmlRR0SsgContext

  beforeEach(() => {
    context = rr0TestUtil.newHtmlContext("time/1/9/7/0/03/index.html")
    context.time.setYear(1977)
    context.time.setMonth(3)
  })

  test("fetch", async () => {
    await testCase.testFetch(context)
  })

  test("render", async () => {
    await testCase.testRender(context)
  })
})
