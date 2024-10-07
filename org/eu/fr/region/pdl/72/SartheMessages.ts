import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { SartheCityCode } from "./SartheCityCode.js"
import { leMansMessages } from "./LeMans/LeMansMessages.js"
import { steCerotteMessages } from "./SteCerotte/SteCerotteMessages.js"
import { bazogeMessages } from "./bazoge/BazogeMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"
import { sougeLeGanelonMessages } from "./SougeLeGanelon/SougeLeGanelonMessages.js"

type SartheCityMessagesList = { [key in SartheCityCode]: CityMessages }
const sartheCityMessages: SartheCityMessagesList = {
  [SartheCityCode.Bazoge]: bazogeMessages,
  [SartheCityCode.LeMans]: leMansMessages,
  [SartheCityCode.SteCerotte]: steCerotteMessages,
  [SartheCityCode.SougeLeGanelon]: sougeLeGanelonMessages
}
export const sartheMessages = DepartmentMessages.create<SartheCityMessagesList>("Sarthe", sartheCityMessages)
