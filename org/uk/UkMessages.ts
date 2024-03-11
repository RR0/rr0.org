import { RegionMessages } from "../country/region/RegionMessages"
import { UkRegionCode } from "./region/UkRegionCode"

export type UkRegionMessagesList = { [key in UkRegionCode]: RegionMessages }
