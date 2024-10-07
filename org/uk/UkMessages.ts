import { RegionMessages } from "../country/region/RegionMessages.js"
import { UkRegionCode } from "./region/UkRegionCode.js"

export type UkRegionMessagesList = { [key in UkRegionCode]: RegionMessages }
