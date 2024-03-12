import { CountryMessages } from "../country/CountryMessages"
import { northCaucasus_en } from "./region/nc/NorthCaucasus_en"
import { RussiaRegionCode } from "./region/RussiaRegionCode"

export const russia_en = CountryMessages.create("Russia", {
  [RussiaRegionCode.nc]: northCaucasus_en
})
