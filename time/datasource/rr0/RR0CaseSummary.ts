import { Place } from "../../../place/Place"
import { RR0UfoCase } from "../RR0UfoCase"
import { Organization } from "../../../org/Organization"

export type NamedPlace = {
  readonly place: Place
  readonly org?: Organization
  readonly name: string
}

export interface RR0CaseSummary extends RR0UfoCase {
}
