import { Chapter } from "./Chapters"
import { Source } from "../source/Source"

export type Book = Source & {
  /**
   * Here the "book" type is assertained.
   */
  type: "book"

  /**
   * Variants roots (language-specific, typically)
   */
  readonly variants: Chapter[],

  /**
   * ISBN codes
   */
  readonly isbn?: string
}
