import { CountryMessages } from "../country/CountryMessages.js"
import { AlgeriaRegionCode } from "./region/AlgeriaRegionCode.js"
import { AlgeriaMessages } from "./AlgeriaMessages.js"
import { algerRegion_en } from "./region/al/AlgerRegion_en.js"

export const algeria_en = CountryMessages.create<AlgeriaMessages>("Canada", {
    [AlgeriaRegionCode.al]: algerRegion_en
  }
)
