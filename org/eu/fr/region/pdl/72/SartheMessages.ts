import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { SartheCityCode } from "./SartheCityCode"
import { leMansMessages } from "./LeMans/LeMansMessages"
import { steCerotteMessages } from "./SteCerotte/SteCerotteMessages"
import { bazogeMessages } from "./bazoge/BazogeMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { sougeLeGanelonMessages } from "./SougeLeGanelon/SougeLeGanelonMessages"

type SartheCityMessagesList = { [key in SartheCityCode]: CityMessages }
const sartheCityMessages: SartheCityMessagesList = {
  [SartheCityCode.Bazoge]: bazogeMessages,
  [SartheCityCode.LeMans]: leMansMessages,
  [SartheCityCode.SteCerotte]: steCerotteMessages,
  [SartheCityCode.SougeLeGanelon]: sougeLeGanelonMessages
}
export const sartheMessages = DepartmentMessages.create<SartheCityMessagesList>("Sarthe", sartheCityMessages)
