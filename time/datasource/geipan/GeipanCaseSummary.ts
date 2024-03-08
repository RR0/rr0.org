import { TimeContext } from "../../TimeContext"
import { GeipanCaseClassification_calc } from "./GeipanCaseClassification"
import { GeipanSightingType } from "./GeipanSightingType"

export type GeipanCaseSummary = {
  /**
   * "AAAA-MM-number"
   */
  caseNumber: string

  url: URL

  sightingType?: GeipanSightingType

  /**
   * Sighting date.
   */
  dateTime: TimeContext

  city: string

  depCode: string

  postTime: TimeContext

  classification?: GeipanCaseClassification_calc
}
