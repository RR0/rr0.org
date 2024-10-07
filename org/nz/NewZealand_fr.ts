import { CountryMessages } from "../country/CountryMessages.js"
import { NewZealandMessages } from "./NewZealandMessages.js"
import { gisborneMessages_fr } from "./region/gisborne/GisborneMessages_fr.js"
import { NewZealandRegionCode } from "./region/NewZealandRegionCode.js"

export const newZealand_fr = CountryMessages.create<NewZealandMessages>("Nouvelle-Zélande", {
    [NewZealandRegionCode.gis]: gisborneMessages_fr
  }
)
