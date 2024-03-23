import { TimeContext } from "../../TimeContext"

export type EssexPoliceCaseSummary = {
  /**
   * Year.
   */
  date: TimeContext

  /**
   * Essex District
   */
  district: string

  /**
   * Recorded Incident Comments
   */
  comments: string,
}
