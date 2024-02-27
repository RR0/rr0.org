import { Chapter } from "./Chapters"
import { Publication, Source } from "../source/Source"

export class Book extends Source {

  constructor(
    title: string, authors: string[], subTitle: string = undefined,
    series: string = undefined, publication: Publication, dirName: string = undefined, summary: string = undefined,
    /**
     * Variants roots (language-specific, typically)
     */
    readonly variants: Chapter[],
    readonly isbn: string = undefined
  ) {
    super(title, authors, subTitle, series, publication, summary, dirName)
  }
}
