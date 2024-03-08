import { beforeEach, describe, test } from "@javarome/testscript"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { NuforcCaseSummary } from "./NuforcCaseSummary"
import { nuforcRR0Mapping, nuforcSortComparator, nuforcTimeAccessor } from "./NuforcRR0Mapping"
import { nuforcTestCases } from "./NuforcTestCases"
import { DatasourceTestCase } from "../DatasourceTestCase"

describe("NuforcCaseSource", () => {

  const testCase = new DatasourceTestCase<NuforcCaseSummary>(nuforcRR0Mapping, nuforcTestCases, nuforcSortComparator,
    nuforcTimeAccessor)

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
