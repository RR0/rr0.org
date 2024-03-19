import { Place } from "../../../place/Place"
import { TimeContext } from "../../TimeContext"
import { Source } from "../../../source/Source"
import { Organization } from "../../../org/Organization"

export type NamedPlace = {
  readonly place: Place
  readonly org?: Organization
  readonly name: string
}

export type RR0CaseSummary = {
  readonly time: TimeContext
  readonly place?: NamedPlace
  readonly description: string
  readonly sources: Source[]
  readonly url?: URL
}
