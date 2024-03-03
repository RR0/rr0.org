import { RegionMessages } from "../../../country/region/RegionMessages"
import { gisborneMessages } from "./gisborne/GisborneMessages"
import { NewZealandRegionCode } from "../NewZealandRegionCode"

export const gisborneMessages_fr = new RegionMessages(["Gisborne", "East Coast", "Eastland"], {
  [NewZealandRegionCode.gis]: gisborneMessages
})
