import { LaReunionCityCode } from "./LaReunionCityCode"
import { steMarie974Messages } from "./SainteMarie/SteMarieMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { stBenoit974Messages } from "./SaintBenoit/SaintBenoitMessages"
import { saintPierre974Messages } from "./SaintPierre/SaintPierreMessages"

type LaReunionCityMessages = { [key in LaReunionCityCode]: OrganizationMessages }
export const laReunionCityMessages_fr: LaReunionCityMessages = {
  [LaReunionCityCode.StBenoit]: stBenoit974Messages,
  [LaReunionCityCode.SaintPierre]: saintPierre974Messages,
  [LaReunionCityCode.SteMarie]: steMarie974Messages
}
export const laReunion974Messages_fr = DepartmentMessages.create<LaReunionCityMessages>("La Réunion",
  laReunionCityMessages_fr)
