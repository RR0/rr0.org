import { alabama_en } from "./region/al/Alabama_en"
import { newMexico_en } from "./region/nm/NewMexico_en"
import { california_en } from "./region/ca/California_en"
import { tennessee_en } from "./region/tn/Tennessee_en"
import { texas_en } from "./region/tx/Texas_en"
import { florida_en } from "./region/fl/Florida_en"
import { pennsylvania_en } from "./region/pa/Pennsylvania_en"
import { washingtonState_en } from "./region/wa/WashingtonState_en"
import { indiana_en } from "./region/in/Indiana_en"
import { CountryMessages } from "../country/CountryMessages"
import { UsaRegionMessagesList } from "./UsaMessages"
import { northCarolina_en } from "./region/nc/NorthCarolina_en"
import { newJersey_en } from "./region/nj/NewJersey_en"
import { newYork_en } from "./region/ny/NewYork_en"
import { westVirginia_en } from "./region/wv/WestVirginia_en"
import { virginia_en } from "./region/va/Virginia_en"
import { hawai_en } from "./region/hi/Hawai_en"
import { nebraska_en } from "./region/ne/Nebraska_en"
import { arkansas_en } from "./region/ak/Arkansas_en"
import { connecticut_en } from "./region/ct/Connecticut_en"
import { colorado_en } from "./region/co/Colorado_en"
import { delaware_en } from "./region/de/Delaware_en"
import { illinois_en } from "./region/il/Illinois_en"
import { kentucky_en } from "./region/ky/Kentucky_en"
import { maine_en } from "./region/me/Maine_en"
import { maryland_en } from "./region/md/Maryland_en"
import { massachusetts_en } from "./region/ma/Massachusetts_en"
import { michigan_en } from "./region/mi/Michigan_en"
import { minnesota_en } from "./region/mn/Minnesota_en"
import { mississippi_en } from "./region/ms/Mississippi_en"
import { missouri_en } from "./region/mo/Missouri_en"
import { montana_en } from "./region/mt/Montana_en"
import { newHampshire_en } from "./region/nh/NewHampshire_en"
import { nevada_en } from "./region/nv/Nevada_en"
import { ohio_en } from "./region/oh/Ohio_en"
import { oklahoma_en } from "./region/ok/Oklahoma_en"
import { oregon_en } from "./region/or/Oregon_en"
import { puertoRico_en } from "./region/pr/PuertoRico_en"
import { southCarolina_en } from "./region/sc/SouthCarolina_en"
import { utah_en } from "./region/ut/Utah_en"
import { vermont_en } from "./region/vt/Vermont_en"
import { virginIslands_en } from "./region/vi/VirginIslands_en"
import { wisconsin_en } from "./region/wi/Wisconsin_en"
import { wyoming_en } from "./region/wy/Wyoming_en"

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
