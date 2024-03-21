import { CountryMessages } from "../country/CountryMessages"
import { AlgeriaRegionCode } from "./region/AlgeriaRegionCode"
import { AlgeriaMessages } from "./AlgeriaMessages"
import { algerRegion_en } from "./region/al/AlgerRegion_en"

export const algeria_en = CountryMessages.create<AlgeriaMessages>("Canada", {
    [AlgeriaRegionCode.al]: algerRegion_en
  }
)
