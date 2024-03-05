import { Place } from "../../../../place/Place"
import { europeanRegion } from "../../Region_eu"
import { philippines } from "../Philippines"
import { PolandRegionCode } from "./PolandRegionCode"

export function polandRegion(code: PolandRegionCode, place: Place) {
  return europeanRegion(code, philippines, place)
}
