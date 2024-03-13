import { CaseMapper } from "../CaseMapper"
import { GeipanCaseSummary } from "./GeipanCaseSummary"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { OnlineSource } from "../../../source/OnlineSource"
import { CityService } from "../../../org/country/region/department/city/CityService"
import { NamedPlace, RR0CaseSummary } from "../../RR0CaseSummary"
import assert from "assert"
import { DepartmentService } from "../../../org/country/region/department/DepartmentService"
import { france } from "../../../org/eu/fr/France"
import { RegionService } from "../../../org/country/region/RegionService"
import { CountryCode } from "../../../org/country/CountryCode"
import { GeipanCaseClassification } from "./GeipanCaseClassification"
import { FranceDepartementCode } from "../../../org/eu/fr/region/FranceDepartementCode"

export class GeipanCaseSummaryRR0Mapper implements CaseMapper<HtmlRR0SsgContext, GeipanCaseSummary, RR0CaseSummary> {

  constructor(
    protected cityService: CityService, protected departmentService: DepartmentService,
    protected regionService: RegionService,
    readonly baseUrl: string, readonly copyright: string, readonly author: string
  ) {
  }

  getDescription(c: GeipanCaseSummary): string {
    const description = ["observation"]
    switch (c.classification) {
      case GeipanCaseClassification.Identified:
        description.push("identifiée")
        break
      case GeipanCaseClassification.LikelyIdentified:
        description.push("probablement identifiée")
        break
      case GeipanCaseClassification.MissingInfo:
        description.push("inexploitable")
        break
      case GeipanCaseClassification.Unidentified1:
        description.push("non identifiée")
        break
      case GeipanCaseClassification.Unidentified2:
        description.push("non identifiée et consistante")
        break
      default:
        description.push(c.classification)
    }
    return description.join(" ")
  }

  map(context: HtmlRR0SsgContext, sourceCase: GeipanCaseSummary, sourceTime: Date): RR0CaseSummary {
    const caseSource = new OnlineSource(sourceCase.url, "cas n° " + sourceCase.caseNumber,
      [this.author],
      {publisher: this.copyright, time: sourceTime.toLocaleString()})
    const place = this.getPlace(context, sourceCase)
    return {
      time: sourceCase.dateTime,
      place,
      description: this.getDescription(sourceCase),
      sources: [caseSource]
    }
  }

  protected getPlace(context: HtmlRR0SsgContext, sourceCase: GeipanCaseSummary): NamedPlace {
    let place: NamedPlace
    const depCode = sourceCase.depCode
    if (depCode) {
      assert.ok(depCode, `Should at least have one of department,region or country code`)
      const dep = this.departmentService.get(depCode, undefined)
      assert.ok(dep, `Could not find department with code "${depCode}" in country "${france.code}"`)
      const placeItems = /(.+?)(:?\s+\((.+)\))?$/.exec(sourceCase.city)
      const placeName = placeItems[1]
      const city = this.cityService.find(context, placeName, undefined)
      if (!city) {
        const depWithCityName = this.departmentService.find(context, placeName, undefined)
        assert.ok(depWithCityName,
          `Could not find city "${placeName}" in department "${depCode}" nor department with this name in country "${france.code}"`)
        sourceCase.city = undefined
        sourceCase.depCode = depWithCityName.code as FranceDepartementCode
        place = {name: depWithCityName.title(context), place: depWithCityName.places[0]}
      } else {
        place = {name: city.title(context), place: city.places[0]}
      }
    } else if (sourceCase.regionCode) {
      const region = this.regionService.get(sourceCase.regionCode, undefined)
      place = {name: region.title(context), place: region.places[0]}
    } else if (sourceCase.countryCode) {
      assert.equal(sourceCase.countryCode, CountryCode.fr,
        `GEIPAN country code "${sourceCase.countryCode}" is not France`)
      place = {name: france.title(context), place: france.places[0]}
    } else {
      assert.fail("No place for case " + JSON.stringify(sourceCase))
    }
    return place
  }
}
