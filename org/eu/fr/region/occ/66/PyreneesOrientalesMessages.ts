import { PyreneesOrientalesCityCode } from "./PyreneesOrientalesCityCode"
import { portePuymorensMessages } from "./PortePuymorens/PortePuymorensMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { thuirMessages } from "./Thuir/ThuirMessages"

type DepMessages = { [key in PyreneesOrientalesCityCode]: OrganizationMessages }
export const pyreneesOrientalesMessages = DepartmentMessages.create<DepMessages>("Pyrénées-Orientales", {
  [PyreneesOrientalesCityCode.PortePuymorens]: portePuymorensMessages,
  [PyreneesOrientalesCityCode.Thuir]: thuirMessages
})
