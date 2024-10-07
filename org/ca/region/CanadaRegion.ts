import { CanadaRegionCode } from "./CanadaRegionCode.js"
import { Place } from "../../../place/Place.js"
import { canada } from "../Canada.js"
import { Region } from "../../country/region/Region.js"

export function canadaRegion(code: CanadaRegionCode, place: Place) {
  return new Region(code, canada, [place])
}
