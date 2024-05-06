import { RR0CaseSummary } from "./datasource/rr0/RR0CaseSummary"
import { SourceRenderer } from "./SourceRenderer"
import { EventRenderer } from "./EventRenderer"

/**
 * Render a case summary as HTML.
 */
export class CaseSummaryRenderer extends EventRenderer<RR0CaseSummary> {

  constructor(sourceRenderer: SourceRenderer) {
    super(sourceRenderer)
  }
}
