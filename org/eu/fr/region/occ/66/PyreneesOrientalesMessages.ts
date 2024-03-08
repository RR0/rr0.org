import { PyreneesOrientalesCityCode } from "./PyreneesOrientalesCityCode"
import { portePuymorensMessages } from "./albi/PortePuymorensMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"

const tarnCityMessages: { [key in PyreneesOrientalesCityCode]: OrganizationMessages } = {
  [PyreneesOrientalesCityCode.PortePuymorens]: portePuymorensMessages
}

export const pyreneesOrientalesMessages = DepartmentMessages.create("Pyrénées-Orientales", tarnCityMessages)
