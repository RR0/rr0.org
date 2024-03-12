import { CountryMessages } from "../country/CountryMessages"
import { UkRegionMessagesList } from "./UkMessages"
import { englandMessages_en } from "./region/eng/EnglandMessages_en"
import { UkRegionCode } from "./region/UkRegionCode"

export const uk_en = new CountryMessages<UkRegionMessagesList>(["United Kingdom", "UK"], {
  [UkRegionCode.eng]: englandMessages_en
})
