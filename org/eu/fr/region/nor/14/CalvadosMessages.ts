import { CalvadosCityCode } from "./CalvadosCityCode"
import { pontLeveque14Messages } from "./pontleveque/PontLevequeMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/city/DepartmentMessages"

type CalvadosCityMessagesList = { [key in CalvadosCityCode]: OrganizationMessages }
const calvadosCityMessages: CalvadosCityMessagesList = {
  [CalvadosCityCode.PontLEveque]: pontLeveque14Messages
}
export const calvadosMessages = DepartmentMessages.create<CalvadosCityMessagesList>("Calvados", calvadosCityMessages)
