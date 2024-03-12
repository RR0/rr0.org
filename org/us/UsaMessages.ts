import { RegionMessages } from "../country/region/RegionMessages"
import { UsaSates } from "./region/UsaSates"

export type UsaRegionMessagesList = { [key in UsaSates]: RegionMessages }
