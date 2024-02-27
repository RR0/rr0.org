import { CanadaRegionCode } from "./CanadaRegionCode"
import { Place } from "../../../place/Place"
import { Region } from "../../country/region/Region"
import { canada } from "../Canada"

export function canadaRegion(code: CanadaRegionCode, place: Place) {
  return new Region(code, canada, [place], `${canada.code}/${code}`)
}
