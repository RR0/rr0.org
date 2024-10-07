import { rutlandCounty_en } from "./rutland/Rutland_en.js"
import { RegionMessages } from "../../../country/region/RegionMessages.js"
import { UsaCountyCode } from "../UsaCountyCode.js"

export const vermont_en = RegionMessages.create("Vermont", {
  [UsaCountyCode.rutland]: rutlandCounty_en
})
