import { PanamaRegionCode } from "./region/PanamaRegionCode.js"
import { RegionMessages } from "../country/region/RegionMessages.js"

export type PanamaMessages = { [key in PanamaRegionCode]: RegionMessages }
