import { FranceRegionCode } from "./FranceRegionCode.js"
import { Place } from "../../../../place/Place.js"
import { europeanRegion } from "../../Region_eu.js"
import { france } from "../France.js"

export function franceRegion(code: FranceRegionCode, place: Place) {
  return europeanRegion(code, france, place)
}
