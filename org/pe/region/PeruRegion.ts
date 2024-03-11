import { peru } from "../Peru"
import { PeruRegionCode } from "./PeruRegionCode"
import { Region } from "../../country/region/Region"
import { Place } from "../../../place/Place"

export function peruRegion(code: PeruRegionCode, place: Place) {
  return new Region(code, peru, [place])
}
