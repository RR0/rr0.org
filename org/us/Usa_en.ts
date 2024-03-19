import { alabama_en } from "./region/al/Alabama_en"
import { newMexico_en } from "./region/nm/NewMexico_en"
import { california_en } from "./region/ca/California_en"
import { tennessee_en } from "./region/tn/Tennessee_en"
import { texas_en } from "./region/tx/Texas_en"
import { florida_en } from "./region/fl/Florida_en"
import { pennsylvania_en } from "./region/pa/Pennsylvania_en"
import { washington_en } from "./region/wa/Washington_en"
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
  me: maine_en,
  nc: northCarolina_en,
  nj: newJersey_en,
  ne: nebraska_en,
  nm: newMexico_en,
  ny: newYork_en,
  pa: pennsylvania_en,
  tn: tennessee_en,
  tx: texas_en,
  va: virginia_en,
  wa: washington_en,
  wv: westVirginia_en
})
