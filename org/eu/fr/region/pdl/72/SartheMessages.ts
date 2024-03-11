import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { SartheCityCode } from "./SartheCityCode"
import { leMansMessages } from "./lemans/LeMansMessages"
import { steCerotteMessages } from "./stecerotte/SteCerotteMessages"
import { bazogeMessages } from "./bazoge/BazogeMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

type SartheCityMessagesList = { [key in SartheCityCode]: CityMessages }
const sartheCityMessages: SartheCityMessagesList = {
  [SartheCityCode.LeMans]: leMansMessages,
  [SartheCityCode.SteCerotte]: steCerotteMessages,
  [SartheCityCode.Bazoge]: bazogeMessages
}
export const sartheMessages = DepartmentMessages.create<SartheCityMessagesList>("Sarthe", sartheCityMessages)
