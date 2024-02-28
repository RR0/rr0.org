import { FinlandRegionCode } from "./FinlandRegionCode"
import { Place } from "../../../../place/Place"
import { createRegion_eu } from "../../Region_eu"
import { finland } from "../Finland"

export function finlandRegion(code: FinlandRegionCode, place: Place) {
  return createRegion_eu(code, finland, place)
}
