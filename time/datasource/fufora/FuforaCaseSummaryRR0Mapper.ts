import assert from "assert"
import { CaseMapper } from "../CaseMapper.js"
import { FuforaCaseSummary } from "./FuforaCaseSummary.js"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext.js"
import { NamedPlace, RR0CaseSummary } from "../rr0/RR0CaseSummary.js"
import { TimeContext } from "../../TimeContext.js"
import { CityService } from "../../../org/country/region/department/city/CityService.js"
import { Source } from "../../../source/Source.js"

/**
 * Maps FUFORA cases to RR0 cases.
 */
export class FuforaCaseSummaryRR0Mapper implements CaseMapper<HtmlRR0SsgContext, FuforaCaseSummary, RR0CaseSummary> {

  constructor(protected cityService: CityService, readonly baseUrl: URL, readonly copyright: string,
              readonly authors: string[]) {
  }

  map(context: HtmlRR0SsgContext, sourceCase: FuforaCaseSummary, sourceTime: Date): RR0CaseSummary {
    const id = sourceCase.id
    const source: Source = {
      previousSourceRefs: [], events: [],
      url: sourceCase.url, title: "cas n° " + id, authors: this.authors,
      publication: {publisher: this.copyright, time: TimeContext.fromDate(sourceTime)}
    }
    const cityName = sourceCase.city || sourceCase.sightingPlace
    const city = this.cityService.find(context, cityName, undefined)
    assert.ok(city, `Could not find city "${cityName}" for case ${id} at ${sourceCase.dateTime}`)
    const place: NamedPlace = {name: city.getTitle(context), place: city.places[0]}
    return {
      type: "case",
      events: [],
      id,
      time: sourceCase.dateTime,
      place,
      description: this.getDescription(sourceCase),
      sources: [source]
    }
  }

  protected getDescription(c: FuforaCaseSummary): string {
    const description = ["observation"]
    return description.join(", ")
  }
}
