import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CoteDOrCityCode } from "./CoteDOrCityCode"
import { vitteauxMessages } from "./vitteaux/VitteauxMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

type SaoneEtLoireCityMessagesList = { [key in CoteDOrCityCode]: CityMessages }
const coteDOrCityMessages: SaoneEtLoireCityMessagesList = {
  [CoteDOrCityCode.Vitteaux]: vitteauxMessages
}
export const coteDOrMessages = DepartmentMessages.create("Côte-d'Or", coteDOrCityMessages)
