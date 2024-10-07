import { CountryMessages } from "../country/CountryMessages.js"
import { UkRegionMessagesList } from "./UkMessages.js"
import { englandMessages_en } from "./region/eng/EnglandMessages_en.js"
import { UkRegionCode } from "./region/UkRegionCode.js"

export const uk_en = new CountryMessages<UkRegionMessagesList>(["United Kingdom", "UK"], {
  [UkRegionCode.eng]: englandMessages_en
})
