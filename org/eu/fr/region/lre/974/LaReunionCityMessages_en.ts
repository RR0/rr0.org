import { LaReunionCityCode } from "./LaReunionCityCode"
import { steMarie974Messages } from "./SainteMarie/SteMarieMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { stBenoit974Messages } from "./SaintBenoit/SaintBenoitMessages"
import { saintPierre974Messages } from "./SaintPierre/SaintPierreMessages"

type LaReunionCityMessages_en = { [key in LaReunionCityCode]: OrganizationMessages }
export const laReunionCityMessages_en: LaReunionCityMessages_en = {
  [LaReunionCityCode.StBenoit]: stBenoit974Messages,
  [LaReunionCityCode.SaintPierre]: saintPierre974Messages,
  [LaReunionCityCode.SteMarie]: steMarie974Messages
}
export const laReunion974Messages_en = DepartmentMessages.create<LaReunionCityMessages_en>("Réunion",
  laReunionCityMessages_en)
