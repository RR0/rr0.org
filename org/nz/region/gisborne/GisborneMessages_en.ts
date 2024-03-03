import { RegionMessages } from "../../../country/region/RegionMessages"
import { gisborneMessages } from "./gisborne/GisborneMessages"
import { NewZealandRegionCode } from "../NewZealandRegionCode"

export const gisborneMessages_en = new RegionMessages(["Gisborne District", "East Coast", "Eastland"], {
  [NewZealandRegionCode.gis]: gisborneMessages
})
