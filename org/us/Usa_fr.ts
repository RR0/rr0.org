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
import { hawai_fr } from "./region/hi/Hawai_fr"
import { nebraska_fr } from "./region/ne/Nebraska_fr"
import { arkansas_fr } from "./region/ak/Arkansas_fr"
import { connecticut_fr } from "./region/ct/Connecticut_fr"
import { colorado_fr } from "./region/co/Colorado_fr"
import { delaware_fr } from "./region/de/Delaware_fr"
import { illinois_fr } from "./region/il/Illinois_fr"
import { kentucky_fr } from "./region/ky/Kentucky_fr"
import { maine_fr } from "./region/me/Maine_fr"

export const usa_fr = CountryMessages.create<UsaRegionMessagesList>("USA", {
  ak: arkansas_fr,
  al: alabamaMessages_fr,
  ca: californiaMessages_fr,
  co: colorado_fr,
  ct: connecticut_fr,
  de: delaware_fr,
  fl: floridaMessages_fr,
  hi: hawai_fr,
  il: illinois_fr,
  in: indiana_fr,
  ky: kentucky_fr,
  me: maine_fr,
  nc: northCarolina_fr,
  ne: nebraska_fr,
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
