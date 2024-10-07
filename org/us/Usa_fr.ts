import { alabama_fr } from "./region/al/Alabama_fr.js"
import { california_fr } from "./region/ca/California_fr.js"
import { newMexico_fr } from "./region/nm/NewMexico_fr.js"
import { tennessee_fr } from "./region/tn/Tennessee_fr.js"
import { texas_fr } from "./region/tx/Texas_fr.js"
import { florida_fr } from "./region/fl/Florida_fr.js"
import { pennsylvania_fr } from "./region/pa/Pennsylvania_fr.js"
import { washingtonState_fr } from "./region/wa/WashingtonState_fr.js"
import { indiana_fr } from "./region/in/Indiana_fr.js"
import { CountryMessages } from "../country/CountryMessages.js"
import { UsaRegionMessagesList } from "./UsaMessages.js"
import { northCarolina_fr } from "./region/nc/NorthCarolina_fr.js"
import { newJersey_fr } from "./region/nj/NewJersey_fr.js"
import { newYork_fr } from "./region/ny/NewYork_fr.js"
import { westVirginia_fr } from "./region/wv/WestVirginia_fr.js"
import { virginia_fr } from "./region/va/Virginia_fr.js"
import { hawai_fr } from "./region/hi/Hawai_fr.js"
import { nebraska_fr } from "./region/ne/Nebraska_fr.js"
import { arkansas_fr } from "./region/ak/Arkansas_fr.js"
import { connecticut_fr } from "./region/ct/Connecticut_fr.js"
import { colorado_fr } from "./region/co/Colorado_fr.js"
import { delaware_fr } from "./region/de/Delaware_fr.js"
import { illinois_fr } from "./region/il/Illinois_fr.js"
import { kentucky_fr } from "./region/ky/Kentucky_fr.js"
import { maine_fr } from "./region/me/Maine_fr.js"
import { maryland_fr } from "./region/md/Maryland_fr.js"
import { massachusetts_fr } from "./region/ma/Massachusetts_fr.js"
import { michigan_fr } from "./region/mi/Michigan_fr.js"
import { minnesota_fr } from "./region/mn/Minnesota_fr.js"
import { mississippi_fr } from "./region/ms/Mississippi_fr.js"
import { missouri_fr } from "./region/mo/Missouri_fr.js"
import { montana_fr } from "./region/mt/Montana_fr.js"
import { newHampshire_fr } from "./region/nh/NewHampshire_fr.js"
import { nevada_fr } from "./region/nv/Nevada_fr.js"
import { ohio_fr } from "./region/oh/Ohio_fr.js"
import { oklahoma_fr } from "./region/ok/Oklahoma_fr.js"
import { oregon_fr } from "./region/or/Oregon_fr.js"
import { puertoRico_fr } from "./region/pr/PuertoRico_fr.js"
import { southCarolina_fr } from "./region/sc/SouthCarolina_fr.js"
import { utah_fr } from "./region/ut/Utah_fr.js"
import { vermont_fr } from "./region/vt/Vermont_fr.js"
import { virginIslands_fr } from "./region/vi/VirginIslands_fr.js"
import { wisconsin_fr } from "./region/wi/Wisconsin_fr.js"
import { wyoming_fr } from "./region/wy/Wyoming_fr.js"

export const usa_fr = CountryMessages.create<UsaRegionMessagesList>("USA", {
  ak: arkansas_fr,
  al: alabama_fr,
  ca: california_fr,
  co: colorado_fr,
  ct: connecticut_fr,
  de: delaware_fr,
  fl: florida_fr,
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
  nm: newMexico_fr,
  ny: newYork_fr,
  nv: nevada_fr,
  oh: ohio_fr,
  ok: oklahoma_fr,
  or: oregon_fr,
  pa: pennsylvania_fr,
  pr: puertoRico_fr,
  sc: southCarolina_fr,
  tn: tennessee_fr,
  tx: texas_fr,
  ut: utah_fr,
  va: virginia_fr,
  vi: virginIslands_fr,
  vt: vermont_fr,
  wa: washingtonState_fr,
  wi: wisconsin_fr,
  wv: westVirginia_fr,
  wy: wyoming_fr
})
