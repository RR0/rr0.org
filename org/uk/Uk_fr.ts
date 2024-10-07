import { CountryMessages } from "../country/CountryMessages.js"
import { UkRegionMessagesList } from "./UkMessages.js"
import { UkRegionCode } from "./region/UkRegionCode.js"
import { englandMessages_fr } from "./region/eng/EnglandMessages_fr.js"

export const uk_fr = new CountryMessages<UkRegionMessagesList>(["Royaume-Uni", "R-U."], {
  [UkRegionCode.eng]: englandMessages_fr
})
