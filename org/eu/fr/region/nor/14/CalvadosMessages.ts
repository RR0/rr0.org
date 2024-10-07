import { CalvadosCityCode } from "./CalvadosCityCode.js"
import { pontLeveque14Messages } from "./PontLEveque/PontLevequeMessages.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { saintAubinSurMer14Messages } from "./SaintAubinSurMer/SaintAubinSurMerMessages.js"

type CalvadosCityMessagesList = { [key in CalvadosCityCode]: OrganizationMessages }
export const calvadosMessages = DepartmentMessages.create<CalvadosCityMessagesList>("Calvados", {
  [CalvadosCityCode.PontLEveque]: pontLeveque14Messages,
  [CalvadosCityCode.SaintAubinSurMer]: saintAubinSurMer14Messages
})
