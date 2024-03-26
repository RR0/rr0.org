import { AlgeriaRegionCode } from "./AlgeriaRegionCode"
import { Place } from "../../../place/Place"
import { algeria } from "../Algeria"
import { Region } from "../../country/region/Region"
import { RegionMessages } from "../../country/region/RegionMessages"

export function algeriaRegion(code: AlgeriaRegionCode, place: Place) {
  return new Region<RegionMessages<any>, AlgeriaRegionCode>(code, algeria, [place])
}
