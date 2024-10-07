import { SceauCaseSummary } from "./SceauCaseSummary.js"
import { RR0CaseMapping } from "../rr0/RR0CaseMapping.js"

/**
 * Maps a SCEAU case to a RR0 case.
 */
export interface SceauCaseMapping extends RR0CaseMapping<SceauCaseSummary> {
}
