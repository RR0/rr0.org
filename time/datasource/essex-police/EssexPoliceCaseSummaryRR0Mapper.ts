import assert from "assert"
import { CaseMapper } from "../CaseMapper"
import { EssexPoliceCaseSummary } from "./EssexPoliceCaseSummary"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { NamedPlace, RR0CaseSummary } from "../rr0/RR0CaseSummary"
import { TimeContext } from "../../TimeContext"
import { CityService } from "../../../org/country/region/department/city/CityService"
import { Organization } from "../../../org/Organization"
import { france } from "../../../org/eu/fr/France"
import { Source } from "../../../source/Source"

export class EssexPoliceCaseSummaryRR0Mapper implements CaseMapper<HtmlRR0SsgContext, EssexPoliceCaseSummary, RR0CaseSummary> {

  constructor(protected cityService: CityService, readonly baseUrl: string, readonly copyright: string,
              readonly authors: string[]) {
  }

  getDescription(c: EssexPoliceCaseSummary): string {
    const description = ["observation"]
    return description.join(" ")
  }

  map(context: HtmlRR0SsgContext, sourceCase: EssexPoliceCaseSummary, sourceTime: Date): RR0CaseSummary {
    const caseSource: Source = {
      previousSourceRefs: [], events: [],
      url: sourceCase.url, title: "cas n° " + sourceCase.id, authors: this.authors,
      publication: {publisher: this.copyright, time: TimeContext.fromDate(sourceTime)}
    }
    const place = this.getPlace(context, sourceCase)
    return {
      type: "case",
      events: [],
      time: sourceCase.time,
      place,
      description: this.getDescription(sourceCase),
      sources: [caseSource]
    }
  }

  protected getPlace(context: HtmlRR0SsgContext, sourceCase: EssexPoliceCaseSummary): NamedPlace {
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
        `Could not find city "${placeName}" in department "${depCode}" nor department with this name in country "${france.id}"`)
    }
    return {name: org.getMessages(context).toTitle(context, org, {parent: true}), org, place: org.places[0]}
  }
}
