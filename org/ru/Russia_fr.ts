import { CountryMessages } from "../country/CountryMessages.js"
import { RussiaRegionCode } from "./region/RussiaRegionCode.js"
import { northCaucasus_fr } from "./region/nc/NorthCaucasus_fr.js"

export const russia_fr = CountryMessages.create("Russie", {
  [RussiaRegionCode.nc]: northCaucasus_fr
})
