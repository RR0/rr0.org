import { beforeEach, describe, test } from "@javarome/testscript"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { BaseOvniFranceCase } from "./BaseOvniFranceCase"
import { baseOvniFranceTestCases } from "./BaseOvniFranceTestCases"
import { DatasourceTestCase } from "../DatasourceTestCase"
import { baseOvniFranceRR0Mapping } from "./BaseOvniFranceRR0Mapping"

describe("BaseOvniFranceCaseSource", () => {

  const testCase = new DatasourceTestCase<BaseOvniFranceCase>(baseOvniFranceRR0Mapping, baseOvniFranceTestCases)
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
