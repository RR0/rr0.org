import { beforeEach, describe, test } from "@javarome/testscript"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { rr0TestCases } from "./RR0TestCases"
import { DatasourceTestCase } from "../DatasourceTestCase"
import { rr0Mapping } from "./RR0Mapping"
import { RR0CaseSummary } from "./RR0CaseSummary"
import { TimeContext } from "../../TimeContext"
import { Source } from "../../../source/Source"
import { HtmlTag } from "../../../util/HtmlTag"
import { RR0CaseMapping } from "./RR0CaseMapping"

describe("RR0CaseSource", () => {

  const testCase = new class extends DatasourceTestCase<RR0CaseSummary> {
    constructor(mapping: RR0CaseMapping<RR0CaseSummary>, sourceCases: RR0CaseSummary[]) {
      super(mapping, sourceCases)
    }

    protected getTime(c: RR0CaseSummary): TimeContext {
      return c.dateTime
    }

    protected sortComparator(c1: RR0CaseSummary, c2: RR0CaseSummary): number {
      return !c1.dateTime || c2.dateTime && c1.dateTime.isBefore(
        c2.dateTime) ? -1 : !c2.dateTime || c1.dateTime.isAfter(c2.dateTime) ? 1 : 0
    }


    protected expectedSourceStr(caseContext: HtmlRR0SsgContext, expectedSources: Source[],
                                nativeCase: RR0CaseSummary): string {
      return expectedSources.map(source => {
        const sourceItems: string[] = []
        let authorStr = source.authors.join(", ")
        if (authorStr) {
          authorStr += ": "
        }
        if (source.title) {
          sourceItems.push(source.title)
        }
        const publication = source.publication
        if (publication) {
          if (publication.publisher) {
            sourceItems.push(`<i>${publication.publisher}</i>`)
          }
          if (publication.time) {
            sourceItems.push(publication.time.toString())
          }
        }
        return " " + HtmlTag.toString("span", authorStr + sourceItems.join(", "), {class: "source"})
      }).join("")
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
