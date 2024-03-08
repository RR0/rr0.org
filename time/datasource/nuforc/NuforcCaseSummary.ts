import { TimeContext } from "../../TimeContext"
import { NuforcState } from "./NuforcState"
import { NuforcCountry } from "./NuforcCountry"
import { NuforcShape } from "./NuforcShape"

export type NuforcCaseSummary = {
  readonly caseNumber: number
  readonly url: URL
  readonly city: string
  readonly state: NuforcState
  readonly country: NuforcCountry
  readonly dateTime: TimeContext
  readonly shape: NuforcShape
  readonly summary: string
  readonly reportDate: Date
  readonly postDate: Date
  readonly image: boolean
}
