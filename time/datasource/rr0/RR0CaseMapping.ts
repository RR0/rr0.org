import { CaseMapping } from "../CaseMapping.js"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext.js"
import { RR0CaseSummary } from "./RR0CaseSummary.js"

/**
 * Maps some datasource case to a RR0 case.
 *
 * @param S The source case type.
 */
export interface RR0CaseMapping<S> extends CaseMapping<HtmlRR0SsgContext, S, RR0CaseSummary> {
}
