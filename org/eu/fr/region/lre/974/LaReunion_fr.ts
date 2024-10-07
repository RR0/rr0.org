import { LaReunionCityCode } from "./LaReunionCityCode.js"
import { steMarie974Messages } from "./SainteMarie/SteMarieMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { stBenoit974Messages } from "./SaintBenoit/SaintBenoitMessages.js"
import { saintPierre974Messages } from "./SaintPierre/SaintPierreMessages.js"
import { LaReunionMessages } from "./LaReunionMessages.js"
import { saintDenis974Messages } from "./SaintDenis/SaintPierreMessages.js"
import { saintPaul974Messages } from "./SaintPaul/SaintPaulMessages.js"

export const laReunion974Messages_fr = DepartmentMessages.create<LaReunionMessages>("La Réunion", {
  [LaReunionCityCode.StBenoit]: stBenoit974Messages,
  [LaReunionCityCode.SaintDenis]: saintDenis974Messages,
  [LaReunionCityCode.SaintPaul]: saintPaul974Messages,
  [LaReunionCityCode.SaintPierre]: saintPierre974Messages,
  [LaReunionCityCode.SteMarie]: steMarie974Messages
})
