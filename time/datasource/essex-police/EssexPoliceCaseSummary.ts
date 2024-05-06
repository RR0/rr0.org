import { RR0UfoCase } from "../RR0UfoCase"

export interface EssexPoliceCaseSummary extends RR0UfoCase {
  /**
   * Essex District
   */
  district: string

  /**
   * Recorded Incident Comments
   */
  comments: string,
}
