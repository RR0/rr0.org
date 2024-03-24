import { UfoCaseFilter } from "./UfoCaseFilter"
import { RR0SsgContext } from "../../RR0SsgContext"
import { UfoCase } from "./UfoCase"

export abstract class UfoCaseContextFilter implements UfoCaseFilter {
  protected constructor(protected context: RR0SsgContext) {
  }

  abstract filter(c: UfoCase): boolean
}
