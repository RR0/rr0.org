import { RR0SsgContext } from "../../RR0SsgContext"

/**
 * A source for cases.
 */
export interface CaseSource<S> {
  /**
   * @member {string[]} authors The datasource authors to mention as a source.
   */
  readonly authors: string[]
  /**
   * @member {string} authors The datasource name to mention as a source.
   */
  readonly copyright: string

  /**
   * Get cases matching a context, in the datasource native format.
   *
   * @param context
   */
  getAll(context: RR0SsgContext): Promise<S[]>
}
