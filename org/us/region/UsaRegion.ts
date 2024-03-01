import { UsaRegionCode } from "./UsaRegionCode"
import { Place } from "../../../place/Place"
import { Region } from "../../country/region/Region"
import { usa } from "../Usa"

export function usaRegion(code: UsaRegionCode, place: Place) {
  return new Region(code, usa, [place])
}
