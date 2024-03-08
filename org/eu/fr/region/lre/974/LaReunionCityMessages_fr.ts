import { LaReunionCityCode } from "./LaReunionCityCode"
import { steMarie874Messages } from "./stmarie/SteMarieMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

type LaReunionCityMessages = { [key in LaReunionCityCode]: OrganizationMessages }
export const laReunionCityMessages_fr: LaReunionCityMessages = {
  [LaReunionCityCode.SteMarie]: steMarie874Messages
}
export const laReunion974Messages_fr = DepartmentMessages.create<LaReunionCityMessages>("La Réunion",
  laReunionCityMessages_fr)
