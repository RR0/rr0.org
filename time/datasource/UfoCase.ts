import { TimeContext } from "../TimeContext"

export interface UfoCase {
  caseNumber: string
  dateTime: TimeContext
  url?: URL
}
