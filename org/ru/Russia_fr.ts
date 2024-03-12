import { CountryMessages } from "../country/CountryMessages"
import { RussiaRegionCode } from "./region/RussiaRegionCode"
import { northCaucasus_fr } from "./region/nc/NorthCaucasus_fr"

export const russia_fr = CountryMessages.create("Russie", {
  [RussiaRegionCode.nc]: northCaucasus_fr
})
