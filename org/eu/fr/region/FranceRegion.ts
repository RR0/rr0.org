import { FranceRegionCode } from "./FranceRegionCode"
import { Place } from "../../../../place/Place"
import { createRegion_eu } from "../../Region_eu"
import { france } from "../France"

export function franceRegion(code: FranceRegionCode, place: Place) {
  return createRegion_eu(code, france, place)
}
