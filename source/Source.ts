import { TimeContext } from "../time/TimeContext"
import { RR0Data } from "../RR0Data"

export type Publication = {
  publisher: string
  time: TimeContext | undefined
}

/**
 * The origin of some RR0 data.
 */
export interface Source extends RR0Data {
  /**
   * Dependent sources.
   */
  readonly previousSourceRefs?: string[]

  /**
   * The title of this source (book, article, etc.)
   */
  readonly title?: string

  /**
   * A possible sub-title of this source.
   */
  readonly subTitle?: string

  /**
   * The author(s)' name(s) of this source document.
   */
  readonly authors?: string[]

  /**
   * The details about when the sources was published (editor, date)
   */
  readonly publication?: Publication

  /**
   * A possible series this source was part of.
   */
  readonly series?: string

  /**
   * A possible summary of the source's contents.
   */
  readonly summary?: string

  /**
   * Chapter, page, etc.
   */
  index?: string
}
