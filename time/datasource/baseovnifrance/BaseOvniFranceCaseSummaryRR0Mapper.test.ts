import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { BaseOvniFranceHttpDatasource } from "./BaseOvniFranceHttpDatasource"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { TimeContext } from "../../TimeContext"
import { baseOvniFranceTestCases } from "./BaseOvniFranceTestCases"
import { baseOvniFranceDatasource, baseOvniFranceRR0Mapper } from "./BaseOvniFranceRR0Mapping"
import { leMans72 } from "../../../org/eu/fr/region/pdl/72/LeMans/LeMans"
import { lyon69 } from "../../../org/eu/fr/region/ara/69/Lyon/Lyon"
import { briancon05 } from "../../../org/eu/fr/region/pac/05/briancon/Briancon"
import { chambonSurVoueize23 } from "../../../org/eu/fr/region/naq/23/Chambon/Chambon"
import { Source } from "../../../source/Source"

function expectedSource(datasource: BaseOvniFranceHttpDatasource, dataDate: Date, caseNumber: string): Source {
  const url = new URL(datasource.searchPath + "?typlist=20&page=0&numobs=" + caseNumber, datasource.baseUrl).href
  return {
    previousSourceRefs: [], events: [],
    url, title: "cas n° " + caseNumber, authors: datasource.authors,
    publication: {publisher: datasource.copyright, time: TimeContext.fromDate(dataDate)}
  }
}

describe("BaseOvniFranceCaseSource", () => {

  let context: HtmlRR0SsgContext

  beforeEach(() => {
    context = rr0TestUtil.newHtmlContext("time/1/9/7/0/03/index.html")
    context.time.setYear(1970)
    context.time.setMonth(3)
  })

  test("map as RR0 cases", async () => {
    const dataDate = new Date("2024-08-12 00:00:00 GMT+1")
    const mapped = baseOvniFranceTestCases.map(sourceCase => baseOvniFranceRR0Mapper.map(context, sourceCase, dataDate))
    const nativeCase1 = baseOvniFranceTestCases[0]
    const nativeCase1Time = nativeCase1.time
    const nativeCase2 = baseOvniFranceTestCases[1]
    const nativeCase2Time = nativeCase2.time
    const nativeCase3 = baseOvniFranceTestCases[2]
    const nativeCase3Time = nativeCase3.time
    const nativeCase4 = baseOvniFranceTestCases[3]
    const nativeCase4Time = nativeCase4.time
    const expected = [
      {
        time: new TimeContext(nativeCase1Time.getYear(), nativeCase1Time.getMonth(), nativeCase1Time.getDayOfMonth(),
          nativeCase1Time.getHour(), nativeCase1Time.getMinutes(), nativeCase1Time.getTimeZone()),
        place: {name: "Le Mans", place: leMans72.places[0]},
        description: "observation",
        sources: [expectedSource(baseOvniFranceDatasource, dataDate, nativeCase1.id)]
      },
      {
        time: new TimeContext(nativeCase2Time.getYear(), nativeCase2Time.getMonth(), nativeCase2Time.getDayOfMonth(),
          nativeCase2Time.getHour(), nativeCase2Time.getMinutes(), nativeCase2Time.getTimeZone()),
        place: {name: "Lyon", place: lyon69.places[0]},
        description: "observation",
        sources: [expectedSource(baseOvniFranceDatasource, dataDate, nativeCase2.id)]
      },
      {
        time: new TimeContext(nativeCase3Time.getYear(), nativeCase3Time.getMonth(), nativeCase3Time.getDayOfMonth(),
          nativeCase3Time.getHour(), nativeCase3Time.getMinutes(), nativeCase3Time.getTimeZone()),
        place: {name: "Briançon", place: briancon05.places[0]},
        description: "observation",
        sources: [expectedSource(baseOvniFranceDatasource, dataDate, nativeCase3.id)]
      },
      {
        time: new TimeContext(nativeCase4Time.getYear(), nativeCase4Time.getMonth(), nativeCase4Time.getDayOfMonth(),
          nativeCase4Time.getHour(), nativeCase4Time.getMinutes(), nativeCase4Time.getTimeZone()),
        place: {name: "Chambon-sur-Voueize", place: chambonSurVoueize23.places[0]},
        description: "observation",
        sources: [expectedSource(baseOvniFranceDatasource, dataDate, nativeCase4.id)]
      }
    ]
    expect(mapped).toEqual(expected)
  })
})
