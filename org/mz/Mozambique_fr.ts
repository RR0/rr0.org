import { CountryMessages } from "../country/CountryMessages"
import { MozambiqueRegionMessagesList } from "./MozambiqueMessages"
import { MozambiqueRegionCode } from "./region/MozambiqueRegionCode"
import { sofalaMessages_fr } from "./region/sofala/SofalaMessages_fr"

export const mozambique_fr = CountryMessages.create<MozambiqueRegionMessagesList>("Mozambique", {
  [MozambiqueRegionCode.sofala]: sofalaMessages_fr
})
