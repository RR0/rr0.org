import { beforeEach, describe, test } from "@javarome/testscript"
import { rr0TestUtil } from "../../../test/RR0TestUtil.js"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext.js"
import { EssexPoliceCaseSummary } from "./EssexPoliceCaseSummary.js"
import { DatasourceTestCase } from "../DatasourceTestCase.js"
import { essexPoliceTestCases } from "./EssexPoliceTestCases.js"
import { TimeContext } from "../../TimeContext.js"
import { essexPoliceRR0Mapping } from "./EssexPoliceMapping.js"
import { RR0CaseMapping } from "../rr0/RR0CaseMapping.js"

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
