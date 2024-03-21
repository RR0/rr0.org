import { CalvadosCityCode } from "./CalvadosCityCode"
import { pontLeveque14Messages } from "./PontLEveque/PontLevequeMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { saintAubinSurMer14Messages } from "./SaintAubinSurMer/SaintAubinSurMerMessages"

type CalvadosCityMessagesList = { [key in CalvadosCityCode]: OrganizationMessages }
export const calvadosMessages = DepartmentMessages.create<CalvadosCityMessagesList>("Calvados", {
  [CalvadosCityCode.PontLEveque]: pontLeveque14Messages,
  [CalvadosCityCode.SaintAubinSurMer]: saintAubinSurMer14Messages
})
