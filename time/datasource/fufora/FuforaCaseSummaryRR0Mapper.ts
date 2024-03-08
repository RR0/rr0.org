import { CaseMapper } from "../CaseMapper"
import { FuforaCaseSummary } from "./FuforaCaseSummary"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { OnlineSource } from "../../../source/OnlineSource"
import { CityService } from "../../../org/country/region/department/city/CityService"
import { NamedPlace, RR0Case } from "../../RR0Case"
import assert from "assert"

/**
 * Maps FUFORA cases to RR0 cases.
 */
export class FuforaCaseSummaryRR0Mapper implements CaseMapper<HtmlRR0SsgContext, FuforaCaseSummary, RR0Case> {

  constructor(
    protected cityService: CityService,
    readonly baseUrl: string, readonly copyright: string, readonly author: string
  ) {
  }

  map(context: HtmlRR0SsgContext, sourceCase: FuforaCaseSummary, sourceTime: Date): RR0Case {
    const source = new OnlineSource(sourceCase.url, "cas n° " + sourceCase.caseNumber, [this.author],
      {publisher: this.copyright, time: sourceTime.toLocaleString()})
    const cityName = sourceCase.city || sourceCase.sightingPlace
    const city = this.cityService.find(context, cityName, undefined)
    assert.ok(city, `Could not find city "${cityName}" for case ${sourceCase.caseNumber} at ${sourceCase.dateTime}`)
    const place: NamedPlace = {name: city.title(context), place: city.places[0]}
    return {time: sourceCase.dateTime, place, description: this.getDescription(sourceCase), sources: [source]}
  }

  protected getDescription(c: FuforaCaseSummary): string {
    const description = ["observation"]
    return description.join(", ")
  }
}
