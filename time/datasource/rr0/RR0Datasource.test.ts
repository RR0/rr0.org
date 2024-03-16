import { beforeEach, describe, test } from "@javarome/testscript"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { rr0TestCases } from "./RR0TestCases"
import { DatasourceTestCase } from "../DatasourceTestCase"
import { rr0Mapping } from "./RR0Mapping"
import { RR0CaseSummary } from "./RR0CaseSummary"
import { TimeContext } from "../../TimeContext"
import { RR0CaseMapping } from "../ChronologyReplacer"
import { TimeTextBuilder } from "../../TimeTextBuilder"
import { StringUtil } from "../../../util/string/StringUtil"

describe("RR0CaseSource", () => {

  const testCase = new class extends DatasourceTestCase<RR0CaseSummary> {
    constructor(mapping: RR0CaseMapping<RR0CaseSummary>, sourceCases: RR0CaseSummary[]) {
      super(mapping, sourceCases)
    }

    protected getTime(c: RR0CaseSummary): TimeContext {
      return c.time
    }

    protected sortComparator(c1: RR0CaseSummary, c2: RR0CaseSummary): number {
      return !c1.time || c2.time && c1.time.isBefore(c2.time) ? -1 : !c2.time || c1.time.isAfter(c2.time) ? 1 : 0
    }

    protected expectedSourceTitle(context: HtmlRR0SsgContext, nativeCase: RR0CaseSummary): string {
      return StringUtil.capitalizeFirstLetter(TimeTextBuilder.build(context))
    }
  }(rr0Mapping, rr0TestCases)

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
