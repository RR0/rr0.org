import { RR0UfoCase } from "./RR0UfoCase"

export interface UfoCaseFilter {
  filter(c: RR0UfoCase): boolean
}
