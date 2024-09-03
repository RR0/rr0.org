import { UfoCaseFilter } from "./UfoCaseFilter"
import { RR0SsgContext } from "../../RR0SsgContext"

export abstract class ContextFilter<T> implements UfoCaseFilter<T> {
  /**
   * @param context The context to match
   * @protected
   */
  protected constructor(protected context: RR0SsgContext) {
  }

  /**
   * @param ufoCase
   * @return if that UFO case matches the filter.
   */
  abstract filter(ufoCase: T): boolean
}
