import { RR0CaseSummary } from "./datasource/rr0/RR0CaseSummary"
import { EventRenderer } from "./EventRenderer"
import { SourceRenderer } from "../source/SourceRenderer"

/**
 * Render a case summary as HTML.
 */
export class CaseSummaryRenderer extends EventRenderer<RR0CaseSummary> {

  constructor(sourceRenderer: SourceRenderer) {
    super(sourceRenderer)
  }
}
