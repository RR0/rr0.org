import { PanamaRegionCode } from "./region/PanamaRegionCode"
import { RegionMessages } from "../country/region/RegionMessages"

export type PanamaMessages = { [key in PanamaRegionCode]: RegionMessages }
