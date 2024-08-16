import { Chapter } from "./Chapters"
import { Source } from "../source/Source"

export interface Book extends Source {

  type: "book"

  /**
   * Variants roots (language-specific, typically)
   */
  variants: Chapter[]
}
