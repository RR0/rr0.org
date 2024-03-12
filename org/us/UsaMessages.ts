import { RegionMessages } from "../country/region/RegionMessages"
import { UsaRegionCode } from "./region/UsaRegionCode"

export type UsaRegionMessagesList = { [key in UsaRegionCode]: RegionMessages }
