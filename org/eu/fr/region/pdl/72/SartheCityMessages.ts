import { DepartmentMessages } from "../../../../../country/region/department/city/DepartmentMessages"
import { SartheCityCode } from "./SartheCityCode"
import { leMansMessages } from "./lemans/LeMansMessages"
import { steCerotteMessages } from "./stecerotte/SteCerotteMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"

type SartheCityMessagesList = { [key in SartheCityCode]: OrganizationMessages }
const sartheCityMessages: SartheCityMessagesList = {
  [SartheCityCode.LeMans]: leMansMessages,
  [SartheCityCode.SteCerotte]: steCerotteMessages
}
export const sartheMessages = DepartmentMessages.create<SartheCityMessagesList>("Sarthe", sartheCityMessages)
