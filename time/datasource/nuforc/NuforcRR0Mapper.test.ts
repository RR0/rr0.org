import path from "path"
import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { NuforcCaseSource } from "./NuforcCaseSource"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { TimeContext } from "../../TimeContext"
import { OnlineSource } from "../../../source/OnlineSource"
import { briancon05 } from "../../../org/eu/fr/region/pac/05/Briancon"
import { chambonSurVoueize23 } from "../../../org/eu/fr/region/naq/23/ChambonSurVoueize"
import { lyon69 } from "../../../org/eu/fr/region/ara/69/Lyon"
import { leMans72 } from "../../../org/eu/fr/region/pdl/72/LeMans"
import { nuforcDatasource, nuforcRR0Mapper } from "./NuforcRR0Mapping"
import { nuforcTestCases } from "./NuforcTestCases"

function onlineSource(datasource: NuforcCaseSource, dataDate: Date, caseNumber: number) {
  return new OnlineSource(
    new URL(path.join(datasource.searchPath, "?typlist=20&page=0&numobs=" + caseNumber), datasource.baseUrl),
    "cas n° " + caseNumber,
    [datasource.author],
    {
      publisher: datasource.copyright,
      time: dataDate.toLocaleString()
    }
  )
}

describe("NuforcRR0Mapper", () => {

  let context: HtmlRR0SsgContext
  beforeEach(() => {
    context = rr0TestUtil.newHtmlContext("time/1/9/7/0/03/index.html")
    context.time.setYear(1970)
    context.time.setMonth(3)
  })

  test("fetch native cases", async () => {
    const items = await nuforcDatasource.getAll(context)
    expect(items).toEqual(nuforcTestCases)
  })

  test("fetch and map as RR0 cases", async () => {
    const dataDate = new Date("2024-08-12 00:00:00 GMT+1")
    const mapped = nuforcTestCases.map(sourceCase => nuforcRR0Mapper.map(context, sourceCase, dataDate))
    const nativeCase1 = nuforcTestCases[0]
    const nativeCase1Time = nativeCase1.dateTime
    const nativeCase2 = nuforcTestCases[1]
    const nativeCase2Time = nativeCase2.dateTime
    const nativeCase3 = nuforcTestCases[2]
    const nativeCase3Time = nativeCase3.dateTime
    const nativeCase4 = nuforcTestCases[3]
    const nativeCase4Time = nativeCase4.dateTime
    const expected = [
      {
        time: new TimeContext(context.time.options, nativeCase1Time.getYear(), nativeCase1Time.getMonth(),
          nativeCase1Time.getDayOfMonth(), nativeCase1Time.getHour(), nativeCase1Time.getMinutes(),
          nativeCase1Time.getTimeZone()),
        place: {name: "Le Mans", place: leMans72.places[0]},
        description: "observation",
        sources: [onlineSource(nuforcDatasource, dataDate, nuforcTestCases[0].caseNumber)]
      },
      {
        time: new TimeContext(context.time.options, nativeCase2Time.getYear(), nativeCase2Time.getMonth(),
          nativeCase2Time.getDayOfMonth(), nativeCase2Time.getHour(), nativeCase2Time.getMinutes(),
          nativeCase2Time.getTimeZone()),
        place: {name: "Lyon", place: lyon69.places[0]},
        description: "observation",
        sources: [onlineSource(nuforcDatasource, dataDate, nuforcTestCases[1].caseNumber)]
      },
      {
        time: new TimeContext(context.time.options, nativeCase3Time.getYear(), nativeCase3Time.getMonth(),
          nativeCase3Time.getDayOfMonth(), nativeCase3Time.getHour(), nativeCase3Time.getMinutes(),
          nativeCase3Time.getTimeZone()),
        place: {name: "Briançon", place: briancon05.places[0]},
        description: "observation",
        sources: [onlineSource(nuforcDatasource, dataDate, nuforcTestCases[2].caseNumber)]
      },
      {
        time: new TimeContext(context.time.options, nativeCase4Time.getYear(), nativeCase4Time.getMonth(),
          nativeCase4Time.getDayOfMonth(), nativeCase4Time.getHour(), nativeCase4Time.getMinutes(),
          nativeCase4Time.getTimeZone()),
        place: {name: "Chambon-sur-Voueize", place: chambonSurVoueize23.places[0]},
        description: "observation",
        sources: [onlineSource(nuforcDatasource, dataDate, nuforcTestCases[3].caseNumber)]
      }
    ]
    expect(mapped).toEqual(expected)
  })
})
