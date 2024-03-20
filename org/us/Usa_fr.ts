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
import { maryland_fr } from "./region/md/Maryland_fr"
import { massachusetts_fr } from "./region/ma/Massachusetts_fr"
import { michigan_fr } from "./region/mi/Michigan_fr"
import { minnesota_fr } from "./region/mn/Minnesota_fr"
import { mississippi_fr } from "./region/ms/Mississippi_fr"
import { missouri_fr } from "./region/mo/Missouri_fr"
import { montana_fr } from "./region/mt/Montana_fr"
import { newHampshire_fr } from "./region/nh/NewHampshire_fr"
import { nevada_fr } from "./region/nv/Nevada_fr"
import { ohio_fr } from "./region/oh/Ohio_fr"
import { oklahoma_fr } from "./region/ok/Oklahoma_fr"
import { oregon_fr } from "./region/or/Oregon_fr"
import { puertoRico_fr } from "./region/pr/PuertoRico_fr"
import { southCarolina_fr } from "./region/sc/SouthCarolina_fr"
import { utah_fr } from "./region/ut/Utah_fr"

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
  ma: massachusetts_fr,
  md: maryland_fr,
  me: maine_fr,
  mi: michigan_fr,
  mn: minnesota_fr,
  mo: missouri_fr,
  ms: mississippi_fr,
  mt: montana_fr,
  nc: northCarolina_fr,
  ne: nebraska_fr,
  nh: newHampshire_fr,
  nj: newJersey_fr,
  nm: newMexicoMessages_fr,
  ny: newYork_fr,
  nv: nevada_fr,
  oh: ohio_fr,
  ok: oklahoma_fr,
  or: oregon_fr,
  pa: pennsylvaniaMessages_fr,
  pr: puertoRico_fr,
  sc: southCarolina_fr,
  tn: tennesseeMessages_fr,
  tx: texas_fr,
  ut: utah_fr,
  va: virginia_fr,
  wa: washingtonMessages_fr,
  wv: westVirginia_fr
})
