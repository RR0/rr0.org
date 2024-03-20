import { PyreneesOrientalesCityCode } from "./PyreneesOrientalesCityCode"
import { portePuymorensMessages } from "./PortePuymorens/PortePuymorensMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { thuirMessages } from "./Thuir/ThuirMessages"
import { planesMessages } from "./Planes/PlanesMessages"

type DepMessages = { [key in PyreneesOrientalesCityCode]: OrganizationMessages }
export const pyreneesOrientalesMessages = DepartmentMessages.create<DepMessages>("Pyrénées-Orientales", {
  [PyreneesOrientalesCityCode.Planes]: planesMessages,
  [PyreneesOrientalesCityCode.PortePuymorens]: portePuymorensMessages,
  [PyreneesOrientalesCityCode.Thuir]: thuirMessages
})
