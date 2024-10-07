import { CountryMessages } from "../country/CountryMessages.js"
import { PanamaRegionCode } from "./region/PanamaRegionCode.js"
import { algerRegion_fr } from "./region/al/AlgerRegion_fr.js"

export const panama_fr = CountryMessages.create("Panama", {
    [PanamaRegionCode.al]: algerRegion_fr
  }
)
