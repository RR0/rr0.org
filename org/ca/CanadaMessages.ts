import { CanadaRegionCode } from "./region/CanadaRegionCode.js"
import { RegionMessages } from "../country/region/RegionMessages.js"

export type CanadaMessages = { [key in CanadaRegionCode]: RegionMessages }
