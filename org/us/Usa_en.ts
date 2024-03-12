import { alabamaMessages_en } from "./region/al/AlabamaMessages_en"
import { newMexicoMessages_en } from "./region/nm/NewMexicoMessages_en"
import { californiaMessages_en } from "./region/ca/CaliforniaMessages_en"
import { tennesseeMessages_en } from "./region/tn/TennesseeMessages_en"
import { texas_en } from "./region/tx/Texas_en"
import { floridaMessages_en } from "./region/fl/FloridaMessages_en"
import { pennsylvaniaMessages_en } from "./region/pa/PennsylvaniaMessages_en"
import { washingtonMessages_en } from "./region/wa/WashingtonMessages_en"
import { indiana_en } from "./region/in/Indiana_en"
import { CountryMessages } from "../country/CountryMessages"
import { UsaRegionMessagesList } from "./UsaMessages"
import { northCarolina_en } from "./region/nc/NorthCarolina_en"
import { newJersey_en } from "./region/nj/NewJersey_en"
import { newYork_en } from "./region/ny/NewYork_en"
import { westVirginia_en } from "./region/wv/WestVirginia_en"
import { virginia_en } from "./region/va/Virginia_en"

export const usa_en = CountryMessages.create<UsaRegionMessagesList>("USA", {
  al: alabamaMessages_en,
  ca: californiaMessages_en,
  in: indiana_en,
  fl: floridaMessages_en,
  nc: northCarolina_en,
  nj: newJersey_en,
  nm: newMexicoMessages_en,
  ny: newYork_en,
  pa: pennsylvaniaMessages_en,
  tn: tennesseeMessages_en,
  tx: texas_en,
  va: virginia_en,
  wa: washingtonMessages_en,
  wv: westVirginia_en
})
