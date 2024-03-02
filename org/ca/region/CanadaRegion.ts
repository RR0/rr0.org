import { CanadaRegionCode } from "./CanadaRegionCode"
import { Place } from "../../../place/Place"
import { canada } from "../Canada"
import { Region } from "../../country/region/Region"

export function canadaRegion(code: CanadaRegionCode, place: Place) {
  return new Region(code, canada, [place])
}
