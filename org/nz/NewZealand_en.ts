import { CountryMessages } from "../country/CountryMessages"
import { NewZealandMessages } from "./NewZealandMessages"
import { gisborneMessages_en } from "./region/gisborne/GisborneMessages_en"
import { NewZealandRegionCode } from "./region/NewZealandRegionCode"

export const newZealand_en = CountryMessages.create<NewZealandMessages>("New Zealand", {
    [NewZealandRegionCode.gis]: gisborneMessages_en
  }
)
