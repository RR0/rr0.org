import { CanadaRegionCode } from "./CanadaRegionCode"
import { Place } from "../../../place/Place"
import { canadaRegion } from "./CanadaRegion"
import { britishColumbia } from "./bc/BritishColumbia"
import { Region } from "../../country/region/Region"

export const canadaRegions: Region[] = [
  canadaRegion(CanadaRegionCode.mb, Place.fromLocation(47.466667, 0.833333)),
  canadaRegion(CanadaRegionCode.qc, Place.fromLocation(47.466667, 0.833333)),
  britishColumbia
]
