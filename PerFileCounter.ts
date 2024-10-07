import { HtmlSsgContext } from "ssg-api/dist/src/HtmlSsgContext.js"
import { ReferenceGenerator } from "./ReferenceGenerator.js"

export abstract class PerFileCounter<C extends HtmlSsgContext> implements ReferenceGenerator<C> {
  /**
   * Source counter in the scope of the current page/context.
   */
  protected number = 1

  /**
   * The current/previous page
   *
   * @protected
   */
  protected fileName: string

  get value(): string {
    return "" + this.number
  }

  next(context: C): string {
    const contextFilename = context.file.name
    if (contextFilename !== this.fileName) {
      this.fileName = contextFilename
      this.number = 1
    } else {
      this.number++
    }
    return this.value
  }
}
