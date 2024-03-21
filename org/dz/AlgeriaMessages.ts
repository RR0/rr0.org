import { AlgeriaRegionCode } from "./region/AlgeriaRegionCode"
import { RegionMessages } from "../country/region/RegionMessages"

export type AlgeriaMessages = { [key in AlgeriaRegionCode]: RegionMessages }
