import { HeraultCityCode } from "./HeraultCityCode"
import { montpellier34Messages } from "./Montpellier/MontpellierMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { saintGeniesDesMourguesMessages } from "./SaintGeniesDesMourgues/SaintGeniesDesMourguesMessages"

type DepMessages = { [key in HeraultCityCode]: OrganizationMessages }
export const heraultMessages = new DepartmentMessages<DepMessages>(["Hérault"], {
  [HeraultCityCode.Montpellier]: montpellier34Messages,
  [HeraultCityCode.SaintGeniesDesMourgues]: saintGeniesDesMourguesMessages
})
