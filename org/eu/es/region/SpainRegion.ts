import { Place } from "../../../../place/Place"
import { europeanRegion } from "../../Region_eu"
import { spain } from "../Spain"
import { SpainRegionCode } from "./SpainRegionCode"

export function spainRegion(code: SpainRegionCode, place: Place) {
  return europeanRegion(code, spain, place)
}
