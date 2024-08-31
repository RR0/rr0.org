import { SceauCaseSummary } from "./SceauCaseSummary"
import { RR0CaseMapping } from "../rr0/RR0CaseMapping"

/**
 * Maps a SCEAU case to a RR0 case.
 */
export interface SceauCaseMapping extends RR0CaseMapping<SceauCaseSummary> {
}
