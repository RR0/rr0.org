import { beforeEach, describe, test } from "@javarome/testscript"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { FuforaCase } from "./FuforaCase"
import { fuforaTestCases } from "./FuforaTestCases"
import { DatasourceTestCase } from "../DatasourceTestCase"
import { fuforaRR0Mapping, fuforaSortComparator } from "./FuforaRR0Mapping"

describe("FuforaCaseSource", () => {

  const testCase = new DatasourceTestCase<FuforaCase>(fuforaRR0Mapping, fuforaTestCases, fuforaSortComparator)
  let context: HtmlRR0SsgContext

  beforeEach(() => {
    context = rr0TestUtil.newHtmlContext("time/1/9/7/0/11/index.html")
    context.time.setYear(1970)
    context.time.setMonth(11)
  })

  test("fetch", async () => {
    await testCase.testFetch(context)
  })

  test("render", async () => {
    await testCase.testRender(context)
  })
})
