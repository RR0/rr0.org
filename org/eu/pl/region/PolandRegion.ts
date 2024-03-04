import { Place } from "../../../../place/Place"
import { europeanRegion } from "../../Region_eu"
import { poland } from "../Poland"
import { PolandRegionCode } from "./PolandRegionCode"

export function polandRegion(code: PolandRegionCode, place: Place) {
  return europeanRegion(code, poland, place)
}
