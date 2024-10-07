import assert from "assert"
import { CaseMapper } from "../CaseMapper.js"
import { UrecatCase } from "./UrecatCase.js"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext.js"
import { NamedPlace, RR0CaseSummary } from "../rr0/RR0CaseSummary.js"
import { TimeContext } from "../../TimeContext.js"
import { CityService } from "../../../org/country/region/department/city/CityService.js"
import { CountryService } from "../../../org/country/CountryService.js"
import { Source } from "../../../source/Source.js"

export class UrecatRR0Mapper implements CaseMapper<HtmlRR0SsgContext, UrecatCase, RR0CaseSummary> {

  constructor(
    protected cityService: CityService, protected countryService: CountryService,
    readonly baseUrl: URL, readonly copyright: string, readonly authors: string[]) {
  }

  getDescription(c: UrecatCase): string {
    const description = ["observation"]
    return description.join(", ")
  }

  map(context: HtmlRR0SsgContext, sourceCase: UrecatCase, sourceTime: Date): RR0CaseSummary {
    const caseSource: Source = {
      events: [], previousSourceRefs: [],
      url: sourceCase.url, title: "cas n° " + sourceCase.id, authors: this.authors,
      publication: {publisher: this.copyright, time: TimeContext.fromDate(sourceTime)}
    }
    const location = sourceCase.basicInfo.base.location
    let sourceCountry = location.country
    assert.ok(sourceCountry, `URECAT country is ${sourceCountry}`)
    const fromPrefix = "depuis "
    if (sourceCountry.startsWith(fromPrefix)) {
      sourceCountry = sourceCountry.substring(fromPrefix.length)
    }
    const country = this.countryService.find(context, sourceCountry, undefined)
    assert.ok(country, `Could not find country "${sourceCountry}"`)
    const placeItems = /(.+?)(:?\s+\((.+)\))?$/.exec(location.placeName)
    const placeName = placeItems[1]
    const city = this.cityService.find(context, placeName, undefined)
    assert.ok(city,
      `Could not find city of name "${placeName}" in state "${location.departmentOrState}" of country "${sourceCountry}"`)
    const place: NamedPlace = {name: city.getTitle(context), place: city.places[0]}
    return {
      type: "case",
      id: sourceCase.id,
      url: sourceCase.url,
      events: [],
      time: sourceCase.basicInfo.base.sightingDate,
      place,
      description: this.getDescription(sourceCase),
      sources: [caseSource]
    }
  }
}
