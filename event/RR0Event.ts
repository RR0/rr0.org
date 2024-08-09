import { RR0Data } from "../RR0Data"

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

export class RR0Event extends RR0Data {

  constructor(id: string, dirName: string, url: string, events: RR0Event[], type: RR0EventType) {
    super(id, dirName, url, events, type)
  }
}
