import { CountryMessages } from "../country/CountryMessages.js"
import { MozambiqueRegionMessagesList } from "./MozambiqueMessages.js"
import { MozambiqueRegionCode } from "./region/MozambiqueRegionCode.js"
import { sofalaMessages_fr } from "./region/sofala/SofalaMessages_fr.js"

export const mozambique_fr = CountryMessages.create<MozambiqueRegionMessagesList>("Mozambique", {
  [MozambiqueRegionCode.sofala]: sofalaMessages_fr
})
