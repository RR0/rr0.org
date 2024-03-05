import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { RR0SsgContext } from "../../../RR0SsgContext"
import { CsvMapper } from "../CsvMapper"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { BaseOvniFranceCase } from "./BaseOvniFranceCase"
import { baseOvniFranceTestCases } from "./BaseOvniFranceTestCases"
import fs from "fs"
import { baseOvniFranceDatasource, baseOvniFranceSortComparator } from "./BaseOvniFranceRR0Mapping"
import { TimeContext } from "../../TimeContext"

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
    expect(Array.from(mapper.fields)).toEqual(
      ["caseNumber", "url", "city", "depCode", "dateTime", "physicalEffect", "witnessEffect", "entities", "landing"])
  })

  test("values of a case", () => {
    const obj = baseOvniFranceTestCases[0]
    const csvRow = mapper.map(context, obj, dataDate)
    expect(csvRow).toBe(
      `${obj.caseNumber},${obj.url},${obj.city},${obj.depCode},${obj.dateTime},${obj.landing},${obj.entities},${obj.witnessEffect},${obj.physicalEffect}`)
  })

  test("write", () => {
    const csvContents = mapper.reduce(context, baseOvniFranceTestCases, dataDate)
    expect(csvContents).toBe(`caseNumber,url,city,depCode,dateTime,physicalEffect,witnessEffect,entities,landing
2760,http://baseovnifrance.free.fr/listgen.php?typlist=20&page=0&numobs=2760,Le Mans,72,1970-03 16:00,false,false,false,false
1650,http://baseovnifrance.free.fr/listgen.php?typlist=20&page=0&numobs=1650,Lyon,69,1970-03-12 07:40,false,false,false,false
3088,http://baseovnifrance.free.fr/listgen.php?typlist=20&page=0&numobs=3088,Briançon,05,1970-03-16 20:00,false,false,false,false
1655,http://baseovnifrance.free.fr/listgen.php?typlist=20&page=0&numobs=1655,Chambon sur Voueize,23,1970-03-17 19:15,false,false,false,false`)
  })

  test("read", () => {
    const exportMapper = new CsvMapper("&", "\"", "")
    const data = fs.readFileSync("time/1/9/7/7/03/05_03_24_1709676761.txt", {encoding: "latin1"})
    const cases = exportMapper.read(context, data)
      .map((csvCase) => {
        const caseNumber = parseInt(csvCase["Num cas"], 10)
        const dateFields = csvCase["Date"].split("-")
        const timeFields = csvCase["Heure"].split(":")
        let dayField = dateFields[0]
        const dayOfMonth = dayField && dayField !== "00" ? parseInt(dayField, 10) : undefined
        const c: BaseOvniFranceCase = {
          caseNumber,
          url: new URL("listgen.php?typlist=20&page=0&numobs=" + caseNumber, baseOvniFranceDatasource.baseUrl),
          city: csvCase["Ville"],
          depCode: csvCase["Départ."],
          dateTime: new TimeContext(rr0TestUtil.intlOptions, parseInt(dateFields[2], 10), parseInt(dateFields[1], 10),
            dayOfMonth, parseInt(timeFields[0], 10), parseInt(timeFields[1], 10), "GMT+1"),
          physicalEffect: Boolean(csvCase["Effet Physique"]),
          witnessEffect: Boolean(csvCase["Effet témoin"]),
          entities: csvCase["Nbre entité"] > 0,
          landing: Boolean(csvCase["Atter"])
        }
        return c
      })
      .sort(baseOvniFranceSortComparator)
    const expected = baseOvniFranceTestCases.sort(baseOvniFranceSortComparator)
    expect(cases).toEqual(expected)
  })
})
