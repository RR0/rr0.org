import { CanadaRegionCode } from "./CanadaRegionCode"
import { Place } from "../../../place/Place"
import { canadaRegion } from "./CanadaRegion"
import { britishColumbia } from "./bc/BritishColumbia"

export const canadaRegions = {
  Manitoba: canadaRegion(CanadaRegionCode.mb, Place.fromLocation(47.466667, 0.833333)),
  Quebec: canadaRegion(CanadaRegionCode.qc, Place.fromLocation(47.466667, 0.833333)),
  britishColumbia
}
