import { CountryMessages } from "../country/CountryMessages.js"
import { IndiaMessages } from "./IndiaMessages.js"
import { maharashtraMessages } from "./region/mh/MaharashtraMessages.js"
import { telanganaMessages } from "./region/tg/TelanganaMessages.js"
import { IndiaRegionCode } from "./region/IndiaRegionCode.js"

export const india_fr = CountryMessages.create<IndiaMessages>("Inde", {
  [IndiaRegionCode.mh]: maharashtraMessages,
  [IndiaRegionCode.tg]: telanganaMessages
  }
)
