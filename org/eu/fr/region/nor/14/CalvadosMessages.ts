import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { CalvadosCityCode } from "./CalvadosCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { pontLeveque14Messages } from "./pontleveque/PontLevequeMessages"

export type CalvadosCityMessagesList = { [key in CalvadosCityCode]: CityMessages }

export const calvadosCityMessages: CalvadosCityMessagesList = {
  [CalvadosCityCode.PontLEveque]: pontLeveque14Messages
}

export const calvadosMessages = new DepartmentMessages<CalvadosCityMessagesList>("Calvados", calvadosCityMessages)
