import { CaseMapper } from "../CaseMapper"
import { UrecatCase } from "./UrecatCase"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { OnlineSource } from "../../../source/OnlineSource"
import { CityService } from "../../../org/country/region/department/city/CityService"
import { NamedPlace, RR0Case } from "../../RR0Case"
import assert from "assert"
import { CountryService } from "../../../org/country/CountryService"

export class UrecatRR0Mapper implements CaseMapper<HtmlRR0SsgContext, UrecatCase, RR0Case> {

  constructor(
    protected cityService: CityService, protected countryService: CountryService,
    readonly baseUrl: string,
    readonly copyright: string, readonly author: string
  ) {
  }

  getDescription(c: UrecatCase): string {
    const description = ["observation"]
    return description.join(", ")
  }

  map(context: HtmlRR0SsgContext, sourceCase: UrecatCase, sourceTime: Date): RR0Case {
    const caseSource = new OnlineSource(sourceCase.url, "cas n° " + sourceCase.caseNumber,
      [this.author],
      {publisher: this.copyright, time: sourceTime.toLocaleString()})
    const location = sourceCase.basicInfo.base.location
    const sourceCountry = location.country
    assert.ok(sourceCountry, `URECAT country is ${sourceCountry}`)
    const country = this.countryService.find(context, sourceCountry, undefined)
    assert.ok(country, `Could not find country "${sourceCountry}"`)
    const placeItems = /(.+?)(:?\s+\((.+)\))?$/.exec(location.placeName)
    const placeName = placeItems[1]
    const city = this.cityService.find(context, placeName, undefined)
    assert.ok(city,
      `Could not find city of name "${placeName}" in state "${location.departmentOrState}" of country "${sourceCountry}"`)
    const place: NamedPlace = {name: city.title(context), place: city.places[0]}
    return {
      time: sourceCase.basicInfo.base.sightingDate,
      place,
      description: this.getDescription(sourceCase),
      sources: [caseSource]
    }
  }
}
