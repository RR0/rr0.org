import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { RR0SsgContext } from "../../../RR0SsgContext"
import { CsvMapper } from "../CsvMapper"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { BaseOvniFranceCase } from "./BaseOvniFranceCase"
import { baseOvniFranceTestCases } from "./BaseOvniFranceTestCases"

describe("CsvMapper", () => {

  const dataDate = new Date("2024-08-12 00:00:00 GMT+1")

  let context: RR0SsgContext
  let mapper: CsvMapper<BaseOvniFranceCase>

  beforeEach(() => {
    context = rr0TestUtil.newContext("time/1/9/7/0/03/index.html")
    mapper = new CsvMapper()
  })

  test("columns for a case", () => {
    mapper.map(context, baseOvniFranceTestCases[0], dataDate)
    expect(mapper.fields).toEqual(
      ["caseNumber", "url", "place", "depCode", "dateTime", "physicalEffect", "witnessEffect", "entities", "landing"])
  })

  test("values of a case", () => {
    const obj = baseOvniFranceTestCases[0]
    const csvRow = mapper.map(context, obj, dataDate)
    expect(csvRow).toBe(
      `${obj.caseNumber},${obj.url},${obj.place},${obj.depCode},${obj.dateTime},${obj.landing},${obj.entities},${obj.witnessEffect},${obj.physicalEffect}`)
  })

  test("write", () => {
    const csvContents = mapper.reduce(context, baseOvniFranceTestCases, dataDate)
    expect(csvContents).toBe("")
  })
})
