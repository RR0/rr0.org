import { alabamaMessages_fr } from "./region/al/AlabamaMessages_fr"
import { californiaMessages_fr } from "./region/ca/CaliforniaMessages_fr"
import { newMexicoMessages_fr } from "./region/nm/NewMexicoMessages_fr"
import { tennesseeMessages_fr } from "./region/tn/TennesseeMessages_fr"
import { texas_fr } from "./region/tx/Texas_fr"
import { floridaMessages_fr } from "./region/fl/FloridaMessages_fr"
import { pennsylvaniaMessages_fr } from "./region/pa/PennsylvaniaMessages_fr"
import { washingtonMessages_fr } from "./region/wa/WashingtonMessages_fr"
import { indiana_fr } from "./region/in/Indiana_fr"
import { CountryMessages } from "../country/CountryMessages"
import { UsaRegionMessagesList } from "./UsaMessages"
import { northCarolina_fr } from "./region/nc/NorthCarolina_fr"
import { newJersey_fr } from "./region/nj/NewJersey_fr"
import { newYork_fr } from "./region/ny/NewYork_fr"
import { westVirginia_fr } from "./region/wv/WestVirginia_fr"
import { virginia_fr } from "./region/va/Virginia_fr"

export const usa_fr = CountryMessages.create<UsaRegionMessagesList>("USA", {
  al: alabamaMessages_fr,
  ca: californiaMessages_fr,
  in: indiana_fr,
  fl: floridaMessages_fr,
  nc: northCarolina_fr,
  nj: newJersey_fr,
  nm: newMexicoMessages_fr,
  ny: newYork_fr,
  pa: pennsylvaniaMessages_fr,
  tn: tennesseeMessages_fr,
  tx: texas_fr,
  va: virginia_fr,
  wa: washingtonMessages_fr,
  wv: westVirginia_fr
})
