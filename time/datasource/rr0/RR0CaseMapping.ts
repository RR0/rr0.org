import { CaseMapping } from "../CaseMapping"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { RR0CaseSummary } from "./RR0CaseSummary"

/**
 * Maps some datasource case to a RR0 case.
 *
 * @param S The source case type.
 */
export interface RR0CaseMapping<S> extends CaseMapping<HtmlRR0SsgContext, S, RR0CaseSummary> {
}
