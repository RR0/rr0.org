import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { RR0SsgContext } from "../../../RR0SsgContext"
import { CsvMapper } from "../CsvMapper"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { GeipanCaseSummary } from "./GeipanCaseSummary"
import { geipanTestCaseSummaries } from "./GeipanTestCases"
import fs from "fs"
import { geipanHttpDatasource } from "./GeipanRR0Mapping"
import { GeipanCase } from "./GeipanCase"
import { GeipanCaseSummaryMapper } from "./GeipanCaseSummaryMapper"
import { geipanFileDatasource } from "./geipan/GeipanRR0Mapping"

describe("CsvMapper", () => {

  const dataDate = new Date("2024-08-12 00:00:00 GMT+1")

  let context: RR0SsgContext
  let mapper: CsvMapper<GeipanCaseSummary>

  beforeEach(() => {
    context = rr0TestUtil.newContext("time/1/9/7/0/03/index.html")
    mapper = new CsvMapper()
  })

  test("columns for a case", () => {
    mapper.map(context, geipanTestCaseSummaries[0], dataDate)
    expect(Array.from(mapper.fields)).toEqual(
      ["caseNumber", "url", "city", "depCode", "dateTime", "postTime", "classification"])
  })

  test("values of a case", () => {
    const obj = geipanTestCaseSummaries[0]
    const csvRow = mapper.map(context, obj, dataDate)
    expect(csvRow).toBe(
      `${obj.caseNumber},${obj.url},${obj.city},${obj.zoneCode},${obj.dateTime},${obj.postTime},${obj.classification}`)
  })

  test("write", () => {
    const csvContents = mapper.mapAll(context, geipanTestCaseSummaries, dataDate)
    const expectedCsv = "caseNumber,url,city,depCode,dateTime,postTime,classification\n"
      + geipanTestCaseSummaries
        .map(c => `${c.caseNumber},${c.url},${c.city},${c.zoneCode},${c.dateTime},${c.postTime},${c.classification}`)
        .join("\n")
    expect(csvContents).toBe(expectedCsv)
  })

  test("read", () => {
    const fileMapper = new CsvMapper<GeipanCase>(";")
    const data = fs.readFileSync(geipanFileDatasource.fileName, {encoding: "latin1"})
    const csvMapper = new GeipanCaseSummaryMapper(geipanHttpDatasource.baseUrl, geipanHttpDatasource.searchPath,
      geipanHttpDatasource.authors)
    const cases = fileMapper.parse(context, data).map(csvCase => csvMapper.map(context, csvCase, dataDate))
    expect(cases.length).toEqual(2768)
    const expected1 = geipanTestCaseSummaries[0]
    const case1 = cases.find(c => c.caseNumber === expected1.caseNumber)
    expect(case1).toEqual(expected1)
    const expected2 = geipanTestCaseSummaries[1]
    const case2 = cases.find(c => c.caseNumber === expected2.caseNumber)
    expect(case2).toEqual(expected2)
  })
})
