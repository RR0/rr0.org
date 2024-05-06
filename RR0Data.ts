import { TimeContext } from "./time/TimeContext"
import { Source } from "./source/Source"
import { NamedPlace } from "./time/datasource/rr0/RR0CaseSummary"

export interface RR0Data {

  type?: string

  id?: string

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

  dateTime?: TimeContext

  deprecated?: boolean

  note?: string

  readonly place?: NamedPlace
  readonly description?: string
  readonly sources?: Source[]
}
