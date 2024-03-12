import { DenmarkRegionCode } from "./DenmarkRegionCode"
import { Place } from "../../../../place/Place"
import { europeanRegion } from "../../Region_eu"
import { denmark } from "../Denmark"

export function denmarkRegion(code: DenmarkRegionCode, place: Place) {
  return europeanRegion(code, denmark, place)
}
