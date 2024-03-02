import { CaseMapper } from "../CaseMapper"
import { GeipanCase } from "./GeipanCase"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { OnlineSource } from "../../../source/OnlineSource"
import { CityService } from "../../../org/country/region/department/city/CityService"
import { NamedPlace, RR0Case } from "../../RR0Case"
import assert from "assert"
import { australia } from "../../../org/au/Australia"
import { canada } from "../../../org/ca/Canada"
import { india } from "../../../org/in/Country_in"
import { usa } from "../../../org/us/Usa"
import { DepartmentService } from "../../../org/country/region/department/DepartmentService"
import { france } from "../../../org/eu/fr/France"

export class GeipanRR0Mapper implements CaseMapper<HtmlRR0SsgContext, GeipanCase, RR0Case> {

  static readonly countryMap = {
    Australia: australia.code,
    Canada: canada.code,
    India: india.code,
    USA: usa.code
  }

  constructor(
    protected cityService: CityService, protected departmentService: DepartmentService,
    readonly baseUrl: string, readonly copyright: string, readonly author: string
  ) {
  }

  getDescription(c: GeipanCase): string {
    const description = ["observation"]
    return description.join(", ")
  }

  map(context: HtmlRR0SsgContext, sourceCase: GeipanCase, sourceTime: Date): RR0Case {
    const caseSource = new OnlineSource(sourceCase.url, "cas n° " + sourceCase.caseNumber,
      [this.author],
      {publisher: this.copyright, time: sourceTime.toLocaleString()})
    const depCode = String(sourceCase.depCode)
    const dep = this.departmentService.get(depCode, undefined)
    assert.ok(dep, `Could not find department with code "${depCode}" in country "${france.code}"`)
    const placeItems = /(.+?)(:?\s+\((.+)\))?$/.exec(sourceCase.city)
    const placeName = placeItems[1]
    const city = this.cityService.find(context, placeName, undefined)
    assert.ok(city, `Could not find city "${placeName}" in department "${depCode}" of country "${france.code}"`)
    const place: NamedPlace = {name: city.title(context), place: city.places[0]}
    return {
      time: sourceCase.dateTime,
      place,
      description: this.getDescription(sourceCase),
      sources: [caseSource]
    }
  }
}
