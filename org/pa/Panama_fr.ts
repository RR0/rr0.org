import { CountryMessages } from "../country/CountryMessages"
import { PanamaRegionCode } from "./region/PanamaRegionCode"
import { algerRegion_fr } from "./region/al/AlgerRegion_fr"

export const panama_fr = CountryMessages.create("Panama", {
    [PanamaRegionCode.al]: algerRegion_fr
  }
)
