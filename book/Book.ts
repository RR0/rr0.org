import { Chapter } from "./Chapters.js"
import { Source } from "../source/Source.js"

export interface Book extends Source {

  type: "book"

  /**
   * Variants roots (language-specific, typically)
   */
  variants: Chapter[]
}
