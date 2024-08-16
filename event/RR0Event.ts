import { RR0Data } from "../data/RR0Data"

export type RR0EventType =
  "birth"
  | "death"
  | "image"
  | "book"
  | "article"
  | "sighting"
  | "move"
  | "degree"
  | "affiliate"

export interface RR0Event extends RR0Data {

}
