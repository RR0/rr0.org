import { alabamaMessages_en } from "./region/al/AlabamaMessages_en"
import { newMexicoMessages_en } from "./region/nm/NewMexicoMessages_en"
import { californiaMessages_en } from "./region/ca/CaliforniaMessages_en"
import { tennesseeMessages_en } from "./region/tn/TennesseeMessages_en"
import { texasMessages_en } from "./region/tx/TexasMessages_en"
import { floridaMessages_en } from "./region/fl/FloridaMessages_en"
import { pennsylvaniaMessages_en } from "./region/pa/PennsylvaniaMessages_en"
import { washingtonMessages_en } from "./region/wa/WashingtonMessages_en"
import { OrganizationMessages } from "../OrganizationMessages"
import { OrganizationType } from "../Organization"
import { indianaMessages_en } from "./region/in/IndianaMessages_en"

export const usaMessages_en = new OrganizationMessages("USA")
usaMessages_en[OrganizationType.region] = {
  al: alabamaMessages_en,
  ca: californiaMessages_en,
  in: indianaMessages_en,
  fl: floridaMessages_en,
  nm: newMexicoMessages_en,
  pa: pennsylvaniaMessages_en,
  tn: tennesseeMessages_en,
  tx: texasMessages_en,
  wa: washingtonMessages_en
}
