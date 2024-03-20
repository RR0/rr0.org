import { LaReunionCityCode } from "./LaReunionCityCode"
import { steMarie974Messages } from "./SainteMarie/SteMarieMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { stBenoit974Messages } from "./SaintBenoit/SaintBenoitMessages"
import { saintPierre974Messages } from "./SaintPierre/SaintPierreMessages"
import { LaReunionMessages } from "./LaReunionMessages"
import { saintDenis974Messages } from "./SaintDenis/SaintPierreMessages"
import { saintPaul974Messages } from "./SaintPaul/SaintPaulMessages"

export const laReunion974Messages_en = DepartmentMessages.create<LaReunionMessages>("Réunion", {
  [LaReunionCityCode.StBenoit]: stBenoit974Messages,
  [LaReunionCityCode.SaintDenis]: saintDenis974Messages,
  [LaReunionCityCode.SaintPaul]: saintPaul974Messages,
  [LaReunionCityCode.SaintPierre]: saintPierre974Messages,
  [LaReunionCityCode.SteMarie]: steMarie974Messages
})
