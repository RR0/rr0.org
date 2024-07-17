import { beforeEach, describe, test } from "@javarome/testscript"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { EssexPoliceCaseSummary } from "./EssexPoliceCaseSummary"
import { DatasourceTestCase } from "../DatasourceTestCase"
import { essexPoliceTestCases } from "./EssexPoliceTestCases"
import { TimeContext } from "../../TimeContext"
import { essexPoliceRR0Mapping } from "./EssexPoliceMapping"
import { RR0CaseMapping } from "../rr0/RR0CaseMapping"

describe("EssexPoliceCaseSource", () => {

  const testCase = new class extends DatasourceTestCase<EssexPoliceCaseSummary> {
    constructor(mapping: RR0CaseMapping<EssexPoliceCaseSummary>, sourceCases: EssexPoliceCaseSummary[]) {
      super(mapping, sourceCases)
    }

    protected getTime(c: EssexPoliceCaseSummary): TimeContext {
      return c.dateTime
    }

    protected sortComparator(c1: EssexPoliceCaseSummary, c2: EssexPoliceCaseSummary): number {
      return c1.id < c2.id ? -1 : c1.id > c2.id ? 1 : 0
    }
  }(essexPoliceRR0Mapping, essexPoliceTestCases)

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
