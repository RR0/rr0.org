import { beforeEach, describe, test } from "@javarome/testscript"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { BaseOvniFranceCaseSummary } from "./BaseOvniFranceCaseSummary"
import { baseOvniFranceTestCases } from "./BaseOvniFranceTestCases"
import { DatasourceTestCase } from "../DatasourceTestCase"
import {
  baseOvniFranceRR0Mapping,
  baseOvniFranceSortComparator,
  baseOvniFranceTimeAccessor
} from "./BaseOvniFranceRR0Mapping"

describe("BaseOvniFranceCaseSource", () => {

  const testCase = new DatasourceTestCase<BaseOvniFranceCaseSummary>(
    baseOvniFranceRR0Mapping, baseOvniFranceTestCases, baseOvniFranceSortComparator, baseOvniFranceTimeAccessor
  )
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
