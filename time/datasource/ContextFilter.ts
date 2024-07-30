import { UfoCaseFilter } from "./UfoCaseFilter"
import { RR0SsgContext } from "../../RR0SsgContext"

export abstract class ContextFilter<T> implements UfoCaseFilter<T> {

  protected constructor(protected context: RR0SsgContext) {
  }

  abstract filter(c: T): boolean
}
