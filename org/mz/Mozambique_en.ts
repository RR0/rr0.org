import { CountryMessages } from "../country/CountryMessages.js"
import { MozambiqueRegionMessagesList } from "./MozambiqueMessages.js"
import { sofalaMessages_en } from "./region/sofala/SofalaMessages_en.js"
import { MozambiqueRegionCode } from "./region/MozambiqueRegionCode.js"

export const mozambique_en = CountryMessages.create<MozambiqueRegionMessagesList>("Mozambique", {
  [MozambiqueRegionCode.sofala]: sofalaMessages_en
})
