import { TimeContext } from "../../TimeContext"

export interface EssexPoliceCaseSummary {
  zoneCode: string

  city: string

  time: TimeContext

  id: string

  url: string

  /**
   * Essex District
   */
  district: string

  /**
   * Recorded Incident Comments
   */
  comments: string
}
