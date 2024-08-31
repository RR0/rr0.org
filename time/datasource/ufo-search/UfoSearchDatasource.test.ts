import { beforeEach, describe, test } from "@javarome/testscript"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { UfoSearchCase } from "./UfoSearchCase"
import { DatasourceTestCase } from "../DatasourceTestCase"
import { ufoSearchTestCases } from "./UfoSearchTestCases"
import { TimeContext } from "../../TimeContext"
import { ufoSearchRR0Mapping } from "./UfoSearchMapping"
import { RR0CaseMapping } from "../rr0/RR0CaseMapping"

describe("UfoSearchCaseSource", () => {

  const testCase = new class extends DatasourceTestCase<UfoSearchCase> {
    constructor(mapping: RR0CaseMapping<UfoSearchCase>, sourceCases: UfoSearchCase[]) {
      super(mapping, sourceCases)
    }

    protected getTime(c: UfoSearchCase): TimeContext {
      return c.time
    }

    protected sortComparator(c1: UfoSearchCase, c2: UfoSearchCase): number {
      return c1.id < c2.id ? -1 : c1.id > c2.id ? 1 : 0
    }
  }(ufoSearchRR0Mapping, ufoSearchTestCases)

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
