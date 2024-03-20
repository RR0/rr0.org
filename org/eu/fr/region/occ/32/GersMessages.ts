import { GersCityCode } from "./GersCityCode"
import { estang33Messages } from "./Estang/EstangMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { miramontDAstaracMessages } from "./MiramontDAstarac/MiramontDAstaracMessages"

type GersCityMessages = { [key in GersCityCode]: OrganizationMessages }
export const gersMessages = DepartmentMessages.create<GersCityMessages>("Gers", {
  [GersCityCode.Estang]: estang33Messages,
  [GersCityCode.MiramontDAstarac]: miramontDAstaracMessages
})
