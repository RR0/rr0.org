import { NuforcState } from "./NuforcState"
import { NuforcCountry } from "./NuforcCountry"
import { NuforcShape } from "./NuforcShape"
import { TimeContext } from "../../TimeContext"

export interface NuforcCaseSummary {
  readonly id: string
  readonly time: TimeContext
  readonly url: string
  readonly city: string
  readonly state: NuforcState
  readonly country: NuforcCountry
  readonly shape: NuforcShape
  readonly summary: string
  readonly reportDate: Date
  readonly postDate: Date
  readonly image: boolean
}
