import { CountryMessages } from "../country/CountryMessages"
import { IndiaMessages } from "./IndiaMessages"
import { maharashtraMessages } from "./region/mh/MaharashtraMessages"
import { telanganaMessages } from "./region/tg/TelanganaMessages"

export const india_fr = CountryMessages.create<IndiaMessages>("Inde", {
    mh: maharashtraMessages,
    tg: telanganaMessages
  }
)
