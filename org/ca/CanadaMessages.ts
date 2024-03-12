import { CanadaRegionCode } from "./region/CanadaRegionCode"
import { RegionMessages } from "../country/region/RegionMessages"

export type CanadaMessages = { [key in CanadaRegionCode]: RegionMessages }
