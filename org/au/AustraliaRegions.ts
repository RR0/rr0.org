import { RegionCode_au } from "./RegionCode_au"
import { Place } from "../../place/Place"
import { australia } from "./Country_au"
import { Region } from "../country/region/Region"

function createRegion_au(code: RegionCode_au, place: Place) {
  return new Region(code, australia, [place], `${australia.code}/${code}`)
}

export const australiaRegions: Region[] = [
  createRegion_au(RegionCode_au.WesternAustralia, Place.fromLocation(47.466667, 0.833333))
]
