import { HtmlRR0SsgContext, RR0SsgContext } from "../../RR0SsgContext"

/**
 * A source for cases.
 */
export abstract class CaseSource<S> {
  /**
   * @param author The datasource author to mention as a source.
   * @param copyright The datasource name/copyright to mention as a source.
   * @protected
   */
  protected constructor(readonly author: string, readonly copyright: string) {
  }

  /**
   * Get cases matching a context, in the datasource native format.
   *
   * @param context
   */
  abstract getAll(context: RR0SsgContext): Promise<S[]>
}
