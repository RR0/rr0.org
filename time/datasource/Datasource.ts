import { RR0SsgContext } from "../../RR0SsgContext"
import { RR0UfoCase } from "./RR0UfoCase"

/**
 * A source for cases.
 *
 * @param T The source case type.
 */
export interface Datasource<S extends RR0UfoCase> {
  /**
   * The datasource authors to mention as a source.
   */
  readonly authors: string[]

  /**
   * The datasource name to mention as a source.
   */
  readonly copyright: string

  /**
   * Get cases matching a context, in the datasource native format.
   *
   * @param context
   */
  fetch(context: RR0SsgContext): Promise<S[]>
}
