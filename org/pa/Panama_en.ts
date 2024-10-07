import { CountryMessages } from "../country/CountryMessages.js"
import { PanamaRegionCode } from "./region/PanamaRegionCode.js"
import { PanamaMessages } from "./PanamaMessages.js"
import { algerRegion_en } from "./region/al/AlgerRegion_en.js"

export const panama_en = CountryMessages.create<PanamaMessages>("Panama", {
    [PanamaRegionCode.al]: algerRegion_en
  }
)
