import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { NuforcHttpDatasource } from "./NuforcHttpDatasource"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { TimeContext } from "../../TimeContext"
import { OnlineSource } from "../../../source/OnlineSource"
import { nuforcDatasource, nuforcRR0Mapper, nuforcSortComparator } from "./NuforcRR0Mapping"
import { nuforcTestCases } from "./NuforcTestCases"
import { slocomb } from "../../../org/us/region/al/geneva/slocomb/Slocomb"
import { castlegar } from "../../../org/ca/region/bc/rdck/Castlegar/Castlegar"
import { fortWorth } from "../../../org/us/region/tx/tarrant/fortworth/FortWorth"
import { campPendleton } from "../../../org/us/region/ca/sandiego/camppendleton/CampPendleton"
import { stPetersburg } from "../../../org/us/region/fl/pinellas/stpetersburg/StPetersburg"
import { monessen } from "../../../org/us/region/pa/westmoreland/monessen/Monessen"
import { bonneyLake } from "../../../org/us/region/wa/pierce/bonneylake/BonneyLake"

function expectedSource(datasource: NuforcHttpDatasource, dataDate: Date, caseNumber: number) {
  const url = new URL("sighting/?id=" + caseNumber, datasource.baseUrl)
  return new OnlineSource(url, "cas n° " + caseNumber, [datasource.author],
    {publisher: datasource.copyright, time: dataDate.toLocaleString()})
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
    const testCases = nuforcTestCases.sort(nuforcSortComparator)
    const mapped = testCases.map(sourceCase => nuforcRR0Mapper.map(context, sourceCase, dataDate))
    const nativeCase1 = testCases[0]
    const nativeCase1Time = nativeCase1.dateTime
    const nativeCase2 = testCases[1]
    const nativeCase2Time = nativeCase2.dateTime
    const nativeCase3 = testCases[2]
    const nativeCase3Time = nativeCase3.dateTime
    const nativeCase4 = testCases[3]
    const nativeCase4Time = nativeCase4.dateTime
    const nativeCase5 = testCases[4]
    const nativeCase5Time = nativeCase5.dateTime
    const nativeCase6 = testCases[5]
    const nativeCase6Time = nativeCase6.dateTime
    const nativeCase7 = testCases[6]
    const nativeCase7Time = nativeCase7.dateTime
    const expected = [
      {
        time: new TimeContext(context.time.options, nativeCase1Time.getYear(), nativeCase1Time.getMonth(),
          nativeCase1Time.getDayOfMonth(), nativeCase1Time.getHour(), nativeCase1Time.getMinutes(),
          nativeCase1Time.getTimeZone()),
        place: {name: slocomb.messages(context).title, place: slocomb.places[0]},
        description: nuforcRR0Mapper.getDescription(nativeCase1),
        sources: [expectedSource(nuforcDatasource, dataDate, nativeCase1.caseNumber)]
      },
      {
        time: new TimeContext(context.time.options, nativeCase2Time.getYear(), nativeCase2Time.getMonth(),
          nativeCase2Time.getDayOfMonth(), nativeCase2Time.getHour(), nativeCase2Time.getMinutes(),
          nativeCase2Time.getTimeZone()),
        place: {name: castlegar.messages(context).title, place: castlegar.places[0]},
        description: nuforcRR0Mapper.getDescription(nativeCase2),
        sources: [expectedSource(nuforcDatasource, dataDate, nativeCase2.caseNumber)]
      },
      {
        time: new TimeContext(context.time.options, nativeCase3Time.getYear(), nativeCase3Time.getMonth(),
          nativeCase3Time.getDayOfMonth(), nativeCase3Time.getHour(), nativeCase3Time.getMinutes(),
          nativeCase3Time.getTimeZone()),
        place: {name: fortWorth.messages(context).title, place: fortWorth.places[0]},
        description: nuforcRR0Mapper.getDescription(nativeCase3),
        sources: [expectedSource(nuforcDatasource, dataDate, nativeCase3.caseNumber)]
      },
      {
        time: new TimeContext(context.time.options, nativeCase4Time.getYear(), nativeCase4Time.getMonth(),
          nativeCase4Time.getDayOfMonth(), nativeCase4Time.getHour(), nativeCase4Time.getMinutes(),
          nativeCase4Time.getTimeZone()),
        place: {name: campPendleton.messages(context).title, place: campPendleton.places[0]},
        description: nuforcRR0Mapper.getDescription(nativeCase4),
        sources: [expectedSource(nuforcDatasource, dataDate, nativeCase4.caseNumber)]
      },
      {
        time: new TimeContext(context.time.options, nativeCase5Time.getYear(), nativeCase5Time.getMonth(),
          nativeCase5Time.getDayOfMonth(), nativeCase5Time.getHour(), nativeCase5Time.getMinutes(),
          nativeCase5Time.getTimeZone()),
        place: {name: stPetersburg.messages(context).title, place: stPetersburg.places[0]},
        description: nuforcRR0Mapper.getDescription(nativeCase5),
        sources: [expectedSource(nuforcDatasource, dataDate, nativeCase5.caseNumber)]
      },
      {
        time: new TimeContext(context.time.options, nativeCase6Time.getYear(), nativeCase6Time.getMonth(),
          nativeCase6Time.getDayOfMonth(), nativeCase6Time.getHour(), nativeCase6Time.getMinutes(),
          nativeCase6Time.getTimeZone()),
        place: {name: monessen.messages(context).title, place: monessen.places[0]},
        description: nuforcRR0Mapper.getDescription(nativeCase6),
        sources: [expectedSource(nuforcDatasource, dataDate, nativeCase6.caseNumber)]
      },
      {
        time: new TimeContext(context.time.options, nativeCase7Time.getYear(), nativeCase7Time.getMonth(),
          nativeCase7Time.getDayOfMonth(), nativeCase7Time.getHour(), nativeCase7Time.getMinutes(),
          nativeCase7Time.getTimeZone()),
        place: {name: bonneyLake.messages(context).title, place: bonneyLake.places[0]},
        description: nuforcRR0Mapper.getDescription(nativeCase7),
        sources: [expectedSource(nuforcDatasource, dataDate, nativeCase7.caseNumber)]
      }
    ]
    expect(mapped).toEqual(expected)
  })
})
