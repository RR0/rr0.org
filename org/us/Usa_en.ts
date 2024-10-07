import { alabama_en } from "./region/al/Alabama_en.js"
import { newMexico_en } from "./region/nm/NewMexico_en.js"
import { california_en } from "./region/ca/California_en.js"
import { tennessee_en } from "./region/tn/Tennessee_en.js"
import { texas_en } from "./region/tx/Texas_en.js"
import { florida_en } from "./region/fl/Florida_en.js"
import { pennsylvania_en } from "./region/pa/Pennsylvania_en.js"
import { washingtonState_en } from "./region/wa/WashingtonState_en.js"
import { indiana_en } from "./region/in/Indiana_en.js"
import { CountryMessages } from "../country/CountryMessages.js"
import { UsaRegionMessagesList } from "./UsaMessages.js"
import { northCarolina_en } from "./region/nc/NorthCarolina_en.js"
import { newJersey_en } from "./region/nj/NewJersey_en.js"
import { newYork_en } from "./region/ny/NewYork_en.js"
import { westVirginia_en } from "./region/wv/WestVirginia_en.js"
import { virginia_en } from "./region/va/Virginia_en.js"
import { hawai_en } from "./region/hi/Hawai_en.js"
import { nebraska_en } from "./region/ne/Nebraska_en.js"
import { arkansas_en } from "./region/ak/Arkansas_en.js"
import { connecticut_en } from "./region/ct/Connecticut_en.js"
import { colorado_en } from "./region/co/Colorado_en.js"
import { delaware_en } from "./region/de/Delaware_en.js"
import { illinois_en } from "./region/il/Illinois_en.js"
import { kentucky_en } from "./region/ky/Kentucky_en.js"
import { maine_en } from "./region/me/Maine_en.js"
import { maryland_en } from "./region/md/Maryland_en.js"
import { massachusetts_en } from "./region/ma/Massachusetts_en.js"
import { michigan_en } from "./region/mi/Michigan_en.js"
import { minnesota_en } from "./region/mn/Minnesota_en.js"
import { mississippi_en } from "./region/ms/Mississippi_en.js"
import { missouri_en } from "./region/mo/Missouri_en.js"
import { montana_en } from "./region/mt/Montana_en.js"
import { newHampshire_en } from "./region/nh/NewHampshire_en.js"
import { nevada_en } from "./region/nv/Nevada_en.js"
import { ohio_en } from "./region/oh/Ohio_en.js"
import { oklahoma_en } from "./region/ok/Oklahoma_en.js"
import { oregon_en } from "./region/or/Oregon_en.js"
import { puertoRico_en } from "./region/pr/PuertoRico_en.js"
import { southCarolina_en } from "./region/sc/SouthCarolina_en.js"
import { utah_en } from "./region/ut/Utah_en.js"
import { vermont_en } from "./region/vt/Vermont_en.js"
import { virginIslands_en } from "./region/vi/VirginIslands_en.js"
import { wisconsin_en } from "./region/wi/Wisconsin_en.js"
import { wyoming_en } from "./region/wy/Wyoming_en.js"

export const usa_en = CountryMessages.create<UsaRegionMessagesList>("USA", {
  ak: arkansas_en,
  al: alabama_en,
  ca: california_en,
  co: colorado_en,
  ct: connecticut_en,
  de: delaware_en,
  fl: florida_en,
  hi: hawai_en,
  il: illinois_en,
  in: indiana_en,
  ky: kentucky_en,
  ma: massachusetts_en,
  md: maryland_en,
  me: maine_en,
  mi: michigan_en,
  mn: minnesota_en,
  mo: missouri_en,
  ms: mississippi_en,
  mt: montana_en,
  nc: northCarolina_en,
  ne: nebraska_en,
  nh: newHampshire_en,
  nj: newJersey_en,
  nv: nevada_en,
  nm: newMexico_en,
  ny: newYork_en,
  oh: ohio_en,
  ok: oklahoma_en,
  or: oregon_en,
  pa: pennsylvania_en,
  pr: puertoRico_en,
  sc: southCarolina_en,
  tn: tennessee_en,
  tx: texas_en,
  ut: utah_en,
  va: virginia_en,
  vi: virginIslands_en,
  vt: vermont_en,
  wa: washingtonState_en,
  wi: wisconsin_en,
  wv: westVirginia_en,
  wy: wyoming_en
})
