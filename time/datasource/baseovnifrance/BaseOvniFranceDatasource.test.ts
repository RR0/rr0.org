import { beforeEach, describe, test } from "@javarome/testscript"
import { rr0TestUtil } from "../../../test/RR0TestUtil.js"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext.js"
import { baseOvniFranceTestCases } from "./BaseOvniFranceTestCases.js"
import { DatasourceTestCase } from "../DatasourceTestCase.js"
import { TimeContext } from "../../TimeContext.js"
import { BaseOvniFranceCaseSummary } from "./BaseOvniFranceCaseSummary.js"
import { baseOvniFranceRR0Mapping } from "./BaseOvniFranceRR0Mapping.js"
import { RR0CaseMapping } from "../rr0/RR0CaseMapping.js"

describe("BaseOvniFranceCaseSource", () => {

  const testCase = new class extends DatasourceTestCase<BaseOvniFranceCaseSummary> {
    constructor(mapping: RR0CaseMapping<BaseOvniFranceCaseSummary>, sourceCases: BaseOvniFranceCaseSummary[]) {
      super(mapping, sourceCases)
    }

    protected getTime(c: BaseOvniFranceCaseSummary): TimeContext {
      return c.time
    }

    protected sortComparator(c1: BaseOvniFranceCaseSummary, c2: BaseOvniFranceCaseSummary): number {
      return c1.id < c2.id ? -1 : c1.id > c2.id ? 1 : 0
    }
  }(baseOvniFranceRR0Mapping, baseOvniFranceTestCases)

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
