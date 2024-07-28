import { TimeContext } from "../time/TimeContext"
import { RR0Data } from "../RR0Data"

export type Publication = {
  /**
   * The editor of the publication
   */
  publisher: string

  /**
   * When the publication occurred.
   */
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
   * A possible subtitle of this source.
   */
  readonly subTitle?: string

  /**
   * The author(s) name(s) of this source document.
   */
  readonly authors?: string[]

  /**
   * The details about where and when the source was published.
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
