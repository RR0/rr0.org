import { Place } from "../../../../place/Place.js"
import { europeanRegion } from "../../Region_eu.js"
import { poland } from "../Poland.js"
import { PolandRegionCode } from "./PolandRegionCode.js"

export function polandRegion(code: PolandRegionCode, place: Place) {
  return europeanRegion(code, poland, place)
}
