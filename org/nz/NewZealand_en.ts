import { CountryMessages } from "../country/CountryMessages.js"
import { NewZealandMessages } from "./NewZealandMessages.js"
import { gisborneMessages_en } from "./region/gisborne/GisborneMessages_en.js"
import { NewZealandRegionCode } from "./region/NewZealandRegionCode.js"

export const newZealand_en = CountryMessages.create<NewZealandMessages>("New Zealand", {
    [NewZealandRegionCode.gis]: gisborneMessages_en
  }
)
