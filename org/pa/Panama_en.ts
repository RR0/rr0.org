import { CountryMessages } from "../country/CountryMessages"
import { PanamaRegionCode } from "./region/PanamaRegionCode"
import { PanamaMessages } from "./PanamaMessages"
import { algerRegion_en } from "./region/al/AlgerRegion_en"

export const panama_en = CountryMessages.create<PanamaMessages>("Panama", {
    [PanamaRegionCode.al]: algerRegion_en
  }
)
