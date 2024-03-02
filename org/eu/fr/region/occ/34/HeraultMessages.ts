import { HeraultCityCode } from "./HeraultCityCode"
import { montpellier34Messages } from "./montpellier/MontpellierMessages"
import { DepartmentMessages } from "../../../../../country/region/department/city/DepartmentMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"

type HeraultMessages = { [key in HeraultCityCode]: OrganizationMessages }
const heraultCityMessages: HeraultMessages = {
  [HeraultCityCode.Montpellier]: montpellier34Messages
}
export const heraultMessages = new DepartmentMessages<HeraultMessages>(["Hérault"], heraultCityMessages)
