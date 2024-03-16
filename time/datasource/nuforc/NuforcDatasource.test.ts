import { beforeEach, describe, test } from "@javarome/testscript"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { NuforcCaseSummary } from "./NuforcCaseSummary"
import { nuforcRR0Mapping } from "./NuforcRR0Mapping"
import { nuforcTestCases } from "./NuforcTestCases"
import { DatasourceTestCase } from "../DatasourceTestCase"
import { RR0CaseMapping } from "../ChronologyReplacer"
import { TimeContext } from "../../TimeContext"

describe("NuforcCaseSource", () => {

  const testCase = new class extends DatasourceTestCase<NuforcCaseSummary> {
    constructor(mapping: RR0CaseMapping<NuforcCaseSummary>, sourceCases: NuforcCaseSummary[]) {
      super(mapping, sourceCases)
    }

    protected getTime(c: NuforcCaseSummary): TimeContext {
      return c.dateTime
    }

    protected sortComparator(c1: NuforcCaseSummary, c2: NuforcCaseSummary): number {
      return c1.caseNumber < c2.caseNumber ? -1 : c1.caseNumber > c2.caseNumber ? 1 : 0
    }
  }(nuforcRR0Mapping, nuforcTestCases)

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
