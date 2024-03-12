import { alabamaCounties } from "./al/AlabamaCounties"
import { californiaCounties } from "./ca/CaliforniaCounties"
import { floridaCounties } from "./fl/FloridaCounties"
import { texasCounties } from "./tx/TexasCounties"
import { pennsylvaniaCounties } from "./pa/PennsylvaniaCounties"
import { washingtonCounties } from "./wa/WashingtonCounties"
import { Organization } from "../../Organization"
import { newMexicoCounties } from "./nm/NewMexicoCounties"
import { newJerseyCounties } from "./nj/NewJerseyCounties"
import { newYorkCounties } from "./ny/NewYorkCounties"
import { westVirginaCounties } from "./wv/WestVirginiaCounties"
import { virginiaCounties } from "./va/VirginiaCounties"
import { hawaiiCounties } from "./hi/HawaiiCounties"

export const usaCounties: Organization[] = [
  ...alabamaCounties,
  ...californiaCounties,
  ...floridaCounties,
  ...hawaiiCounties,
  ...pennsylvaniaCounties,
  ...newJerseyCounties,
  ...newMexicoCounties,
  ...newYorkCounties,
  ...texasCounties,
  ...virginiaCounties,
  ...washingtonCounties,
  ...westVirginaCounties
]
