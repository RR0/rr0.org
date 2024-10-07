import { RR0Data } from "../data/RR0Data.js"
import { People } from "../people/People.js"

export type RR0EventType =
  "birth"
  | "death"
  | "image"
  | "book"
  | "article"
  | "sighting"

export interface RR0Event extends RR0Data {
  type: RR0EventType
  subject: People
}
