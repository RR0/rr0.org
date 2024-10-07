import { GersCityCode } from "./GersCityCode.js"
import { estang33Messages } from "./Estang/EstangMessages.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { miramontDAstaracMessages } from "./MiramontDAstarac/MiramontDAstaracMessages.js"
import { condomMessages } from "./Condom/CondomMessages.js"

type GersCityMessages = { [key in GersCityCode]: OrganizationMessages }
export const gersMessages = DepartmentMessages.create<GersCityMessages>("Gers", {
  [GersCityCode.Condom]: condomMessages,
  [GersCityCode.Estang]: estang33Messages,
  [GersCityCode.MiramontDAstarac]: miramontDAstaracMessages
})
