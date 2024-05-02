import { Place } from "../../../place/Place"
import { Source } from "../../../source/Source"
import { UfoCase } from "../UfoCase"
import { Organization } from "../../../org/Organization"

export type NamedPlace = {
  readonly place: Place
  readonly org?: Organization
  readonly name: string
}

export interface RR0CaseSummary extends UfoCase {
  readonly place?: NamedPlace
  readonly description: string
  readonly sources: Source[]
}
