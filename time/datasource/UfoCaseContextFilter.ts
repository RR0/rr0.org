import { UfoCaseFilter } from "./UfoCaseFilter"
import { RR0SsgContext } from "../../RR0SsgContext"
import { RR0UfoCase } from "./RR0UfoCase"

export abstract class UfoCaseContextFilter implements UfoCaseFilter {
  protected constructor(protected context: RR0SsgContext) {
  }

  abstract filter(c: RR0UfoCase): boolean
}
