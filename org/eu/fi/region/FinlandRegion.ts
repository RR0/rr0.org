import { FinlandRegionCode } from "./FinlandRegionCode.js"
import { Place } from "../../../../place/Place.js"
import { europeanRegion } from "../../Region_eu.js"
import { finland } from "../Finland.js"

export function finlandRegion(code: FinlandRegionCode, place: Place) {
  return europeanRegion(code, finland, place)
}
