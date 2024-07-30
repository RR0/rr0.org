import { NuforcState } from "./NuforcState"
import { NuforcCountry } from "./NuforcCountry"
import { NuforcShape } from "./NuforcShape"

export interface NuforcCaseSummary {
  readonly city: string
  readonly state: NuforcState
  readonly country: NuforcCountry
  readonly shape: NuforcShape
  readonly summary: string
  readonly reportDate: Date
  readonly postDate: Date
  readonly image: boolean
}
