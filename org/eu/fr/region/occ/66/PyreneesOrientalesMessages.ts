import { PyreneesOrientalesCityCode } from "./PyreneesOrientalesCityCode.js"
import { portePuymorensMessages } from "./PortePuymorens/PortePuymorensMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { thuirMessages } from "./Thuir/ThuirMessages.js"
import { planesMessages } from "./Planes/PlanesMessages.js"

type DepMessages = { [key in PyreneesOrientalesCityCode]: OrganizationMessages }
export const pyreneesOrientalesMessages = DepartmentMessages.create<DepMessages>("Pyrénées-Orientales", {
  [PyreneesOrientalesCityCode.Planes]: planesMessages,
  [PyreneesOrientalesCityCode.PortePuymorens]: portePuymorensMessages,
  [PyreneesOrientalesCityCode.Thuir]: thuirMessages
})
