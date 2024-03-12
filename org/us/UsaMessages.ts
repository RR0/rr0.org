import { RegionMessages } from "../country/region/RegionMessages"
import { UsaStates } from "./region/UsaStates"

export type UsaRegionMessagesList = { [key in UsaStates]: RegionMessages }
