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
import { nebraskaCounties } from "./ne/NebraskaCounties"
import { arkansasCounties } from "./ak/ArkansasCounties"
import { connecticutCounties } from "./ct/ConnecticutCounties"
import { coloradoCounties } from "./co/ColoradoCounties"
import { delawareCounties } from "./de/DelawareCounties"
import { illinoisCounties } from "./il/IllinoisCounties"
import { kentuckyCounties } from "./ky/KentuckyCounties"
import { maineCounties } from "./me/MaineCounties"
import { marylandCounties } from "./md/MarylandCounties"
import { massachusettsCounties } from "./ma/MassachusettsCounties"
import { michiganCounties } from "./mi/MichiganCounties"
import { minnesotaCounties } from "./mn/MinnesotaCounties"

export const usaCounties: Organization[] = [
  ...alabamaCounties,
  ...arkansasCounties,
  ...californiaCounties,
  ...coloradoCounties,
  ...connecticutCounties,
  ...delawareCounties,
  ...floridaCounties,
  ...hawaiiCounties,
  ...illinoisCounties,
  ...kentuckyCounties,
  ...maineCounties,
  ...marylandCounties,
  ...massachusettsCounties,
  ...michiganCounties,
  ...minnesotaCounties,
  ...pennsylvaniaCounties,
  ...nebraskaCounties,
  ...newJerseyCounties,
  ...newMexicoCounties,
  ...newYorkCounties,
  ...texasCounties,
  ...virginiaCounties,
  ...washingtonCounties,
  ...westVirginaCounties
]
