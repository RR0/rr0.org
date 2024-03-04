import { FranceRegionCode } from "./FranceRegionCode"
import { Place } from "../../../../place/Place"
import { europeanRegion } from "../../Region_eu"
import { france } from "../France"

export function franceRegion(code: FranceRegionCode, place: Place) {
  return europeanRegion(code, france, place)
}
