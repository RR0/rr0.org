import { CountryMessages } from "../country/CountryMessages"
import { IndiaMessages } from "./IndiaMessages"
import { maharashtraMessages } from "./region/mh/MaharashtraMessages"
import { telanganaMessages } from "./region/tg/TelanganaMessages"
import { IndiaRegionCode } from "./region/IndiaRegionCode"

export const india_fr = CountryMessages.create<IndiaMessages>("Inde", {
  [IndiaRegionCode.mh]: maharashtraMessages,
  [IndiaRegionCode.tg]: telanganaMessages
  }
)
