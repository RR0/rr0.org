import { UsaRegionMessagesList } from "./UsaMessages"
import { CountryMessages } from "../country/CountryMessages"
import { alabamaMessages_fr } from "./region/al/AlabamaMessages_fr"
import { caMessages_fr } from "./region/ca/CaMessages_fr"
import { nmMessages_fr } from "./region/nm/NmMessages_fr"
import { tennesseeMessages_fr } from "./region/tn/TennesseeMessages_fr"
import { texasMessages_fr } from "./region/tx/TexasMessages_fr"
import { floridaMessages_fr } from "./region/fl/FloridaMessages_fr"
import { pennsylvaniaMessages_fr } from "./region/pa/PennsylvaniaMessages_fr"
import { washingtonMessages_fr } from "./region/wa/WashingtonMessages_fr"

export const usaMessages_fr = new CountryMessages<UsaRegionMessagesList>(
  "USA",
  {
    al: alabamaMessages_fr,
    ca: caMessages_fr,
    fl: floridaMessages_fr,
    nm: nmMessages_fr,
    pa: pennsylvaniaMessages_fr,
    tn: tennesseeMessages_fr,
    tx: texasMessages_fr,
    wa: washingtonMessages_fr
  }
)
