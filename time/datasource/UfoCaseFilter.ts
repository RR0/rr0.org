import { UfoCase } from "./UfoCase"

export interface UfoCaseFilter {
  filter(c: UfoCase): boolean
}
