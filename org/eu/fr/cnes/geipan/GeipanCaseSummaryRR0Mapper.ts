import { GeipanCaseSummary } from "./GeipanCaseSummary"
import assert from "assert"
import { GeipanCaseClassification } from "./GeipanCaseClassification"
import { CaseMapper } from "../../../../../time/datasource/CaseMapper"
import { HtmlRR0SsgContext } from "../../../../../RR0SsgContext"
import { NamedPlace, RR0CaseSummary } from "../../../../../time/datasource/rr0/RR0CaseSummary"
import { CityService } from "../../../../country/region/department/city/CityService"
import { TimeContext } from "../../../../../time/TimeContext"
import { Organization } from "../../../../Organization"
import { france } from "../../France"
import { Source } from "../../../../../source/Source"

export class GeipanCaseSummaryRR0Mapper implements CaseMapper<HtmlRR0SsgContext, GeipanCaseSummary, RR0CaseSummary> {

  constructor(protected cityService: CityService, readonly baseUrl: URL, readonly copyright: string,
              readonly authors: string[]) {
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
    const id = sourceCase.id
    const caseSource: Source = {
      url: sourceCase.url, title: "cas n° " + id, authors: this.authors,
      publication: {publisher: this.copyright, time: TimeContext.fromDate(sourceTime, context.time.options)}
    }
    const place = this.getPlace(context, sourceCase)
    return {
      id,
      time: sourceCase.dateTime,
      place,
      description: this.getDescription(sourceCase),
      sources: [caseSource]
    }
  }

  protected getPlace(context: HtmlRR0SsgContext, sourceCase: GeipanCaseSummary): NamedPlace {
    const depCode = sourceCase.zoneCode
    assert.ok(depCode, `Should at least have one of department,region or country code`)
    const placeItems = /(.+?)(:?\s+\(([A-Z]+)\))?(:?\s+\((\d+)\))?$/.exec(sourceCase.city)
    const prefix = placeItems[3] ? placeItems[3] + " " : ""
    const title = prefix + placeItems[1]
    let org: Organization
    if (title === "NATIONAL") {
      org = france
    } else {
      const placeName = title.replace("(DPT)", "").replace("(DEP)", "").trim()
      org = this.cityService.find(context, placeName, undefined)
      assert.ok(org,
        `Could not find city "${placeName}" in department "${depCode}" nor department with this name in country "${france.code}"`)
    }
    return {name: org.getMessages(context).toTitle(context, org, {parent: true}), org, place: org.places[0]}
  }
}
