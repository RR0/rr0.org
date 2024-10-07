import { HeraultCityCode } from "./HeraultCityCode.js"
import { montpellier34Messages } from "./Montpellier/MontpellierMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { saintGeniesDesMourguesMessages } from "./SaintGeniesDesMourgues/SaintGeniesDesMourguesMessages.js"

type DepMessages = { [key in HeraultCityCode]: OrganizationMessages }
export const heraultMessages = new DepartmentMessages<DepMessages>(["Hérault"], {
  [HeraultCityCode.Montpellier]: montpellier34Messages,
  [HeraultCityCode.SaintGeniesDesMourgues]: saintGeniesDesMourguesMessages
})
