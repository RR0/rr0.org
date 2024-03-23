import { beforeEach, describe, test } from "@javarome/testscript"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { EssexPoliceCaseSummary } from "./EssexPoliceCaseSummary"
import { DatasourceTestCase } from "../DatasourceTestCase"
import { essexPoliceTestCases } from "./EssexPoliceTestCases"
import { RR0CaseMapping } from "../ChronologyReplacer"
import { TimeContext } from "../../TimeContext"
import { essexPoliceRR0Mapping } from "./EssexPoliceMapping"

describe("EssexPoliceCaseSource", () => {

  const testCase = new class extends DatasourceTestCase<EssexPoliceCaseSummary> {
    constructor(mapping: RR0CaseMapping<EssexPoliceCaseSummary>, sourceCases: EssexPoliceCaseSummary[]) {
      super(mapping, sourceCases)
    }

    protected getTime(c: EssexPoliceCaseSummary): TimeContext {
      return c.dateTime
    }

    protected sortComparator(c1: EssexPoliceCaseSummary, c2: EssexPoliceCaseSummary): number {
      return c1.caseNumber < c2.caseNumber ? -1 : c1.caseNumber > c2.caseNumber ? 1 : 0
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
