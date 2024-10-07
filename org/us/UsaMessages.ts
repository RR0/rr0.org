import { RegionMessages } from "../country/region/RegionMessages.js"
import { UsaStates } from "./region/UsaStates.js"

export type UsaRegionMessagesList = { [key in UsaStates]: RegionMessages }
