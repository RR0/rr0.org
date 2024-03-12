import { alabamaMessages_fr } from "./region/al/AlabamaMessages_fr"
import { californiaMessages_fr } from "./region/ca/CaliforniaMessages_fr"
import { newMexicoMessages_fr } from "./region/nm/NewMexicoMessages_fr"
import { tennesseeMessages_fr } from "./region/tn/TennesseeMessages_fr"
import { texasMessages_fr } from "./region/tx/TexasMessages_fr"
import { floridaMessages_fr } from "./region/fl/FloridaMessages_fr"
import { pennsylvaniaMessages_fr } from "./region/pa/PennsylvaniaMessages_fr"
import { washingtonMessages_fr } from "./region/wa/WashingtonMessages_fr"
import { indianaMessages_fr } from "./region/in/IndianaMessages_fr"
import { CountryMessages } from "../country/CountryMessages"
import { UsaRegionMessagesList } from "./UsaMessages"
import { northCarolina_fr } from "./region/nc/NorthCarolina_fr"

export const usa_fr = CountryMessages.create<UsaRegionMessagesList>("USA", {
  al: alabamaMessages_fr,
  ca: californiaMessages_fr,
  in: indianaMessages_fr,
  fl: floridaMessages_fr,
  nc: northCarolina_fr,
  nm: newMexicoMessages_fr,
  pa: pennsylvaniaMessages_fr,
  tn: tennesseeMessages_fr,
  tx: texasMessages_fr,
  wa: washingtonMessages_fr
})
