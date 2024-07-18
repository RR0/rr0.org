import { TimeContext } from "./time/TimeContext"
import { Source } from "./source/Source"
import { NamedPlace } from "./time/datasource/rr0/RR0CaseSummary"

/**
 * Any kind of data on RR0 (see implementing classes).
 */
export interface RR0Data {
  /**
   * A unique identifier for this data.
   * // TODO: Make it mandatory
   */
  id?: string

  /**
   * The data type.
   */
  type?: string

  /**
   * The directory where the data is stored, relatively to RR0's root.
   * Should end with a trailing slash ("/").
   * @deprecated Use #url instead.
   */
  dirName?: string

  /**
   * Where the data is stored, relatively to RR0's root.
   */
  url?: URL

  /**
   * When this data occurred.
   */
  dateTime?: TimeContext

  /**
   * If this data is not more relevant, not the latest version, or state of art.
   */
  deprecated?: boolean

  /**
   * A possible note about this data.
   */
  note?: string

  /**
   * Where this data occurred
   */
  readonly place?: NamedPlace

  /**
   * A possible short description of this data.
   */
  readonly description?: string

  /**
   * External data from which this data was devised.
   */
  readonly sources?: Source[]

  /**
   * Keywords about that data.
   */
  tags?: string[]
}
