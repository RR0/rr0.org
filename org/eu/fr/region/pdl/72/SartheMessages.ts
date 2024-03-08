import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { SartheCityCode } from "./SartheCityCode"
import { leMansMessages } from "./lemans/LeMansMessages"
import { steCerotteMessages } from "./stecerotte/SteCerotteMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { bazogeMessages } from "./bazoge/BazogeMessages"

type SartheCityMessagesList = { [key in SartheCityCode]: OrganizationMessages }
const sartheCityMessages: SartheCityMessagesList = {
  [SartheCityCode.LeMans]: leMansMessages,
  [SartheCityCode.SteCerotte]: steCerotteMessages,
  [SartheCityCode.Bazoge]: bazogeMessages
}
export const sartheMessages = DepartmentMessages.create<SartheCityMessagesList>("Sarthe", sartheCityMessages)
