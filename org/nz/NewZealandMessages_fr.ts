import { CountryMessages } from "../country/CountryMessages"
import { NewZealandMessages } from "./NewZealandMessages"
import { gisborneMessages_fr } from "./region/gisborne/GisborneMessages_fr"
import { NewZealandRegionCode } from "./region/NewZealandRegionCode"

export const newZealandMessages_fr = new CountryMessages<NewZealandMessages>(
  "Nouvelle-Zélande",
  {
    [NewZealandRegionCode.gis]: gisborneMessages_fr
  }
)
