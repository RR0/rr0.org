import { Place } from "../place/Place"
import { TimeContext } from "./TimeContext"
import { Source } from "../source/Source"

export type NamedPlace = {
  readonly place: Place
  readonly name: string
}

export type RR0Case = {
  readonly time: TimeContext
  readonly place: NamedPlace
  readonly description: string
  readonly sources: Source[]
}
