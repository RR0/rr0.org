import { CountryMessages } from "../country/CountryMessages"
import { MozambiqueRegionMessagesList } from "./MozambiqueMessages"
import { sofalaMessages_en } from "./region/sofala/SofalaMessages_en"
import { MozambiqueRegionCode } from "./region/MozambiqueRegionCode"

export const mozambique_en = CountryMessages.create<MozambiqueRegionMessagesList>("Mozambique", {
  [MozambiqueRegionCode.sofala]: sofalaMessages_en
})
