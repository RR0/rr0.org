import { LaReunionCityCode } from "./LaReunionCityCode"
import { steMarie874Messages } from "./stmarie/SteMarieMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/city/DepartmentMessages"

type LaReunionCityMessages = { [key in LaReunionCityCode]: OrganizationMessages }
export const laReunionCityMessages_en: LaReunionCityMessages = {
  [LaReunionCityCode.SteMarie]: steMarie874Messages
}
export const laReunion974Messages_en = DepartmentMessages.create<LaReunionCityMessages>("Réunion",
  laReunionCityMessages_en)
