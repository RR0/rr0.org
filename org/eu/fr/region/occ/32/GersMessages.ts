import { GersCityCode } from "./GersCityCode"
import { estang33Messages } from "./estang/EstangMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

type GersCityMessages = { [key in GersCityCode]: OrganizationMessages }
const gersCityMessages: GersCityMessages = {
  [GersCityCode.Estang]: estang33Messages
}
export const gersMessages = DepartmentMessages.create<GersCityMessages>("Gers", gersCityMessages)
