import { NuforcState } from "./NuforcState.js"
import { NuforcCountry } from "./NuforcCountry.js"
import { NuforcShape } from "./NuforcShape.js"
import { TimeContext } from "../../TimeContext.js"

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
