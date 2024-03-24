import { UfoCase } from "../UfoCase"

export interface EssexPoliceCaseSummary extends UfoCase {
  /**
   * Essex District
   */
  district: string

  /**
   * Recorded Incident Comments
   */
  comments: string,
}
