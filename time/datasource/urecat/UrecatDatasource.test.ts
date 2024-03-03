import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { UrecatCase } from "./UrecatCase"
import { urecatRR0Mapping, urecatSortComparator } from "./UrecatRR0Mapping"
import { urecatTestCases } from "./UrecatTestCases"
import { DatasourceTestCase } from "../DatasourceTestCase"
import { UrecatDatasource } from "./UrecatDatasource"

describe("UrecatCaseSource", () => {

  const testCase = new DatasourceTestCase<UrecatCase>(urecatRR0Mapping, urecatTestCases, urecatSortComparator)

  let context: HtmlRR0SsgContext

  beforeEach(() => {
    context = rr0TestUtil.newHtmlContext("time/1/9/7/0/03/index.html")
    context.time.setYear(1977)
    context.time.setMonth(3)
  })

  test("witnesses", () => {
    const datasource = testCase.mapping.datasource as UrecatDatasource
    expect(datasource.getWitnesses("")).toEqual([{name: ""}])
    expect(datasource.getWitnesses("Scott C. Waring")).toEqual([{name: "Scott C. Waring"}])
    expect(datasource.getWitnesses("Un couple anonyme")).toEqual([{name: "Un couple anonyme"}])
    expect(datasource.getWitnesses("Quelqu'un")).toEqual([{name: "Quelqu'un"}])
    expect(datasource.getWitnesses("Une femme")).toEqual([{name: "Une femme"}])
    expect(datasource.getWitnesses("Un homme anomyme")).toEqual([{name: "Un homme anomyme"}])
    expect(datasource.getWitnesses("Une fille ou une femme")).toEqual([{name: "Une fille ou une femme"}])
    expect(datasource.getWitnesses("Constantin Toader et d'autres")).toEqual([
      {name: "Constantin Toader"}, {name: "d'autres"}
    ])
    expect(datasource.getWitnesses("Une femme et sa fille")).toEqual([
      {name: "Une femme"}, {name: "sa fille"}
    ])
    expect(datasource.getWitnesses("Une femme, un homme, deux parents")).toEqual([
      {name: "Une femme"}, {name: "un homme"}, {name: "parent 1"}, {name: "parent 2"}
    ])
    expect(datasource.getWitnesses("Walter Lopez, Omar Ferlatti, une bergère")).toEqual([
      {name: "Walter Lopez"}, {name: "Omar Ferlatti"}, {name: "une bergère"}
    ])
    expect(datasource.getWitnesses("Judi et David Simpson")).toEqual([
      {name: "Judi Simpson"}, {name: "David Simpson"}
    ])
    expect(datasource.getWitnesses("Une femme et ses deux enfants")).toEqual([
      {name: "Une femme"}, {name: "enfant 1"}, {name: "enfant 2"}
    ])
  })

  test("fetch", async () => {
    await testCase.testFetch(context)
  })

  test("render", async () => {
    await testCase.testRender(context)
  })
})
