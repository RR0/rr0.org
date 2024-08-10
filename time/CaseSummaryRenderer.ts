import { RR0CaseSummary } from "./datasource/rr0/RR0CaseSummary"
import { EventRenderer } from "./EventRenderer"
import { SourceRenderer } from "../source/SourceRenderer"
import { SourceFactory } from "../source/SourceFactory"
import { NoteRenderer } from "../note/NoteRenderer"

/**
 * Render a case summary as HTML.
 */
export class CaseSummaryRenderer extends EventRenderer<RR0CaseSummary> {

  constructor(noteRenderer: NoteRenderer, sourceFactory: SourceFactory, sourceRenderer: SourceRenderer) {
    super(noteRenderer, sourceFactory, sourceRenderer)
  }
}
