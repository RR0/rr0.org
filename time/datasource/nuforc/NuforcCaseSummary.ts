import { NuforcState } from "./NuforcState"
import { NuforcCountry } from "./NuforcCountry"
import { NuforcShape } from "./NuforcShape"
import { RR0UfoCase } from "../RR0UfoCase"

export interface NuforcCaseSummary extends RR0UfoCase {
  readonly city: string
  readonly state: NuforcState
  readonly country: NuforcCountry
  readonly shape: NuforcShape
  readonly summary: string
  readonly reportDate: Date
  readonly postDate: Date
  readonly image: boolean
}
