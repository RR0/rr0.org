import { FinlandRegionCode } from "./FinlandRegionCode"
import { Place } from "../../../../place/Place"
import { europeanRegion } from "../../Region_eu"
import { finland } from "../Finland"

export function finlandRegion(code: FinlandRegionCode, place: Place) {
  return europeanRegion(code, finland, place)
}
