import { LaReunionCityCode } from "./LaReunionCityCode"
import { steMarie974Messages } from "./stmarie/SteMarieMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { stBenoit974Messages } from "./stbenoit/SaintBenoitMessages"

type LaReunionCityMessages = { [key in LaReunionCityCode]: OrganizationMessages }
export const laReunionCityMessages_fr: LaReunionCityMessages = {
  [LaReunionCityCode.SteMarie]: steMarie974Messages,
  [LaReunionCityCode.StBenoit]: stBenoit974Messages
}
export const laReunion974Messages_fr = DepartmentMessages.create<LaReunionCityMessages>("La Réunion",
  laReunionCityMessages_fr)
