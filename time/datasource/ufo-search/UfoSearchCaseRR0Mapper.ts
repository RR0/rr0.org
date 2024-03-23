import { CaseMapper } from "../CaseMapper"
import { UfoSearchCase } from "./UfoSearchCase"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { OnlineSource } from "../../../source/OnlineSource"
import { CityService } from "../../../org/country/region/department/city/CityService"
import assert from "assert"
import { france } from "../../../org/eu/fr/France"
import { NamedPlace, RR0CaseSummary } from "../rr0/RR0CaseSummary"
import { TimeContext } from "../../TimeContext"
import { Organization } from "../../../org/Organization"

export class UfoSearchCaseRR0Mapper implements CaseMapper<HtmlRR0SsgContext, UfoSearchCase, RR0CaseSummary> {

  constructor(protected cityService: CityService, readonly baseUrl: string, readonly copyright: string,
              readonly authors: string[]) {
  }

  getDescription(c: UfoSearchCase): string {
    const description = ["observation"]
    return description.join(" ")
  }

  map(context: HtmlRR0SsgContext, sourceCase: UfoSearchCase, sourceTime: Date): RR0CaseSummary {
    const caseSource: OnlineSource = {
      url: sourceCase.url, title: "cas n° " + sourceCase.caseNumber, authors: this.authors,
      publication: {publisher: this.copyright, time: TimeContext.fromDate(sourceTime, context.time.options)}
    }
    const place = this.getPlace(context, sourceCase)
    return {
      time: sourceCase.dateTime,
      place,
      description: this.getDescription(sourceCase),
      sources: [caseSource]
    }
  }

  protected getPlace(context: HtmlRR0SsgContext, sourceCase: UfoSearchCase): NamedPlace {
    const depCode = sourceCase.zoneCode
    assert.ok(depCode, `Should at least have one of department,region or country code`)
    const placeItems = /(.+?)(:?\s+\((.+)\))?$/.exec(sourceCase.city)
    const title = placeItems[1]
    let org: Organization
    if (title === "NATIONAL") {
      org = france
    } else {
      const placeName = title.replace("(DPT)", "").replace("(DEP)", "").trim()
      org = this.cityService.find(context, placeName, undefined)
      assert.ok(org,
        `Could not find city "${placeName}" in department "${depCode}" nor department with this name in country "${france.code}"`)
    }
    return {name: org.messages(context).toTitle(context, org, {parent: true}), org, place: org.places[0]}
  }
}
