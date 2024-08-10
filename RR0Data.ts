import { TimeContext } from "./time/TimeContext"
import { Source } from "./source/Source"
import { NamedPlace } from "./time/datasource/rr0/RR0CaseSummary"
import { RR0Event } from "./event/RR0Event"

/**
 * Any kind of data on RR0 (see implementing classes).
 */
export class RR0Data {

  constructor(
    /**
     * The data type ("people", "place", "org", "book", "case", "sighting"...)
     */
    public id?: string,
    /**
     * A unique identifier for this data.
     * // TODO: Make it mandatory
     */
    public dirName?: string,
    /**
     * The directory where the data is stored, relatively to RR0's root.
     * Should end with a trailing slash ("/").
     */
    readonly url?: string,
    /**
     * Public URL of the data (not the RR0 URL)
     */
    public events: RR0Event[] = [],
    /**
     * Data type
     */
    readonly type?: string,
    /**
     * Parent data.
     */
    public parent?: RR0Data
  ) {
  }

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
   *
   */
  readonly notes?: string[]

  /**
   * Keywords about that data.
   */
  tags?: string[]

  image?: string

  clone(withParent = true) {
    const clonedEvents = this.events.map(event => event.clone())
    return new RR0Data(this.id, this.dirName, this.url, clonedEvents, this.type, withParent ? this.parent : undefined)
  }

  toJSON(): string {
    const clone = this.clone(false)
    delete clone.parent
    return JSON.stringify(clone)
  }
}
