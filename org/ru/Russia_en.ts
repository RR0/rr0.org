import { CountryMessages } from "../country/CountryMessages.js"
import { northCaucasus_en } from "./region/nc/NorthCaucasus_en.js"
import { RussiaRegionCode } from "./region/RussiaRegionCode.js"

export const russia_en = CountryMessages.create("Russia", {
  [RussiaRegionCode.nc]: northCaucasus_en
})
