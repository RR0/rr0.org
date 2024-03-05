import { CaseMapper } from "../CaseMapper"
import { BaseOvniFranceCase } from "./BaseOvniFranceCase"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { OnlineSource } from "../../../source/OnlineSource"
import { DepartmentService } from "../../../org/country/region/department/DepartmentService"
import { CityService } from "../../../org/country/region/department/city/CityService"
import { NamedPlace, RR0Case } from "../../RR0Case"
import assert from "assert"

export class BaseOvniFranceRR0Mapper implements CaseMapper<HtmlRR0SsgContext, BaseOvniFranceCase, RR0Case> {

  constructor(
    protected depService: DepartmentService, protected cityService: CityService,
    readonly baseUrl: string, readonly copyright: string, readonly author: string
  ) {
  }

  protected getDescription(c: BaseOvniFranceCase): string {
    const description = ["observation"]
    if (c.landing) {
      description.push("avec atterrissage")
    }
    if (c.entities) {
      description.push("avec entités")
    }
    if (c.physicalEffect) {
      description.push("avec effet physique")
    }
    if (c.witnessEffect) {
      description.push("avec effet sur témoin")
    }
    return description.join(", ")
  }

  map(context: HtmlRR0SsgContext, sourceCase: BaseOvniFranceCase, sourceTime: Date): RR0Case {
    const caseSource = new OnlineSource(sourceCase.url, "cas n° " + sourceCase.caseNumber, [this.author],
      {publisher: this.copyright, time: sourceTime.toLocaleString()})
    const depCode = sourceCase.depCode
    const dep = this.depService.get(depCode, undefined)
    assert.ok(dep, `Could not find department "${depCode}"`)
    const placeName = sourceCase.city
    const city = this.cityService.find(context, placeName, dep)
    assert.ok(city, `Could not find city of name "${placeName}" in department of code "${dep.code}"`)
    const place: NamedPlace = {name: city.title(context), place: city.places[0]}
    return {
      time: sourceCase.dateTime,
      place,
      description: this.getDescription(sourceCase),
      sources: [caseSource]
    }
  }
}
