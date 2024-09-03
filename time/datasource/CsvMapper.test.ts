import { beforeEach, describe, expect, test } from "@javarome/testscript"
import fs from "fs"
import { RR0SsgContext } from "../../RR0SsgContext"
import { CsvMapper } from "./CsvMapper"
import { rr0TestUtil } from "../../test/RR0TestUtil"
import { GeipanCaseSummary } from "../../org/eu/fr/cnes/geipan/GeipanCaseSummary"
import { geipanTestCaseSummaries } from "../../org/eu/fr/cnes/geipan/GeipanTestCases"
import { GeipanCase } from "../../org/eu/fr/cnes/geipan/GeipanCase"
import { geipanFileDatasource, geipanHttpDatasource } from "../../org/eu/fr/cnes/geipan/GeipanRR0Mapping"
import { GeipanCaseToSummaryMapper } from "../../org/eu/fr/cnes/geipan/GeipanCaseToSummaryMapper"
import path from "path"
import * as process from "node:process"

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
      ["id", "url", "city", "zoneType", "zoneCode", "dateTime", "postTime", "classification"])
  })

  test("values of a case", () => {
    const obj = geipanTestCaseSummaries[0]
    const csvRow = mapper.map(context, obj, dataDate)
    expect(csvRow).toBe(
      `${obj.id},${obj.url},${obj.city},${obj.zoneType},${obj.zoneCode},${obj.dateTime},${obj.postTime},${obj.classification}`)
  })

  test("write", () => {
    const csvContents = mapper.mapAll(context, geipanTestCaseSummaries, dataDate)
    const expectedCsv = "id,url,city,zoneType,zoneCode,dateTime,postTime,classification\n"
      + geipanTestCaseSummaries
        .map(
          c => `${c.id},${c.url},${c.city},${c.zoneType},${c.zoneCode},${c.dateTime},${c.postTime},${c.classification}`)
        .join("\n")
    expect(csvContents).toBe(expectedCsv)
  })

  test("read", () => {
    const fileMapper = new CsvMapper<GeipanCase>(";")
    const fileName = path.join(process.cwd(), geipanFileDatasource.defaultFileName)
    const data = fs.readFileSync(fileName, {encoding: "latin1"})
    const csvMapper = new GeipanCaseToSummaryMapper(geipanHttpDatasource.baseUrl, geipanHttpDatasource.searchPath,
      geipanHttpDatasource.authors)
    const parsed = fileMapper.parse(data)
    const cases = parsed.map(csvCase => csvMapper.map(context, csvCase, dataDate))
    expect(cases.length).toEqual(2768)
    const expected1 = geipanTestCaseSummaries[0]
    const case1 = cases.find(c => c.id === expected1.id)
    expect(case1).toEqual(expected1)
    const expected2 = geipanTestCaseSummaries[1]
    const case2 = cases.find(c => c.id === expected2.id)
    expect(case2).toEqual(expected2)
  })
})
