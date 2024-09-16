import { TimeContext } from "../time/TimeContext"
import { Source } from "../source/Source"
import { NamedPlace } from "../time/datasource/rr0/RR0CaseSummary"
import { RR0Event } from "../event/RR0Event"

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
   * The directory where the data is stored, relatively to RR0's root.
   * Should end with a trailing slash ("/").
   */
  dirName?: string

  /**
   * Public URL of the data (not the RR0 URL)
   */
  readonly url?: string

  /**
   * Events of the data.
   */
  events: RR0Event[]

  /**
   * The data type ("people", "place", "org", "book", "case", "sighting"...)
   */
  type?: string

  /**
   * Parent data.
   */
  parent?: RR0Data

  /**
   * Short name
   */
  name?: string

  /**
   * Unofficial name
   */
  surname?: string

  /**
   * Long name
   */
  title?: string

  /**
   * When this data occurred.
   */
  time?: TimeContext

  /**
   * If this data is not more relevant, not the latest version, or state of art,
   * this will hold the dirname (or name) of its successor.
   */
  next?: string

  /**
   * A possible note about this data.
   */
  note?: string

  /**
   * Where this data occurred
   */
  place?: NamedPlace

  /**
   * A possible short description of this data.
   */
  description?: string

  /**
   * External data from which this data was devised.
   */
  sources?: Source[]

  /**
   *
   */
  readonly notes?: string[]

  /**
   * Keywords about that data.
   */
  tags?: string[]

  image?: string
}
