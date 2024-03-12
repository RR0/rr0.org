import { CountryMessages } from "../country/CountryMessages"
import { UkRegionMessagesList } from "./UkMessages"
import { UkRegionCode } from "./region/UkRegionCode"
import { englandMessages_fr } from "./region/eng/EnglandMessages_fr"

export const uk_fr = new CountryMessages<UkRegionMessagesList>(["Royaume-Uni", "R-U."], {
  [UkRegionCode.eng]: englandMessages_fr
})
