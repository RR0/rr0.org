import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CoteDOrCityCode } from "./CoteDOrCityCode"
import { vitteauxMessages } from "./vitteaux/VitteauxMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

type JuraCityMessagesList = { [key in CoteDOrCityCode]: CityMessages }
const coteDOrCityMessages: JuraCityMessagesList = {
  [CoteDOrCityCode.Vitteaux]: vitteauxMessages
}
export const coteDOrMessages = DepartmentMessages.create("Côte-d'Or", coteDOrCityMessages)
