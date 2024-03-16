import { Chapter } from "./Chapters"
import { Source } from "../source/Source"

export type Book = Source & {
  /**
   * Variants roots (language-specific, typically)
   */
  readonly variants: Chapter[],
  readonly isbn?: string
}
