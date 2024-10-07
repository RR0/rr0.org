import { AlgeriaRegionCode } from "./AlgeriaRegionCode.js"
import { Place } from "../../../place/Place.js"
import { algeria } from "../Algeria.js"
import { Region } from "../../country/region/Region.js"
import { RegionMessages } from "../../country/region/RegionMessages.js"

export function algeriaRegion(code: AlgeriaRegionCode, place: Place) {
  return new Region<RegionMessages<any>, AlgeriaRegionCode>(code, algeria, [place])
}
