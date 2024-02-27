import { CaseMapper } from "../CaseMapper"
import { FuforaCase } from "./FuforaCase"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { OnlineSource } from "../../../source/OnlineSource"
import { CityService } from "../../../org/country/region/department/city/CityService"
import { NamedPlace, RR0Case } from "../../RR0Case"
import assert from "assert"

export class FuforaRR0Mapper implements CaseMapper<HtmlRR0SsgContext, FuforaCase, RR0Case> {

  constructor(
    protected cityService: CityService,
    readonly baseUrl: string, readonly copyright: string, readonly author: string
  ) {
  }

  protected getDescription(c: FuforaCase): string {
    const description = ["observation"]
    return description.join(", ")
  }

  map(context: HtmlRR0SsgContext, sourceCase: FuforaCase, sourceTime: Date): RR0Case {
    const source = new OnlineSource(sourceCase.url, "cas n° " + sourceCase.caseNumber, [this.author],
      {publisher: this.copyright, time: sourceTime.toLocaleString()})
    const cityName = sourceCase.city
    const city = this.cityService.find(context, cityName, undefined)
    assert.ok(city, `Could not find city of name "${cityName}"`)
    const place: NamedPlace = {name: city.title(context), place: city.places[0]}
    return {time: sourceCase.dateTime, place, description: this.getDescription(sourceCase), sources: [source]}
  }
}
