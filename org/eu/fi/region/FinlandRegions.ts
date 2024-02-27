import { FinlandRegionCode } from "./FinlandRegionCode"
import { Place } from "../../../../place/Place"
import { createRegion_eu } from "../../Region_eu"
import { finland } from "../Finland"

function createRegion_fi(code: FinlandRegionCode, place: Place) {
  return createRegion_eu(code, finland, place)
}

export const finlandRegions = {
  nk: createRegion_fi(FinlandRegionCode.nk, Place.fromDMS("63°00′N 30°00′E"))
}
