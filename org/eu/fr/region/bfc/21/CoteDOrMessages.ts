import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { CoteDOrCityCode } from "./CoteDOrCityCode.js"
import { vitteauxMessages } from "./Vitteaux/VitteauxMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"
import { mirebeauSurBezeMessages } from "./MirebeauSurBeze/MirebeauSurBezeMessages.js"

type DepMessages = { [key in CoteDOrCityCode]: CityMessages }
export const coteDOrMessages = DepartmentMessages.create<DepMessages>("Côte-d'Or", {
  [CoteDOrCityCode.MirebeauSurBeze]: mirebeauSurBezeMessages,
  [CoteDOrCityCode.Vitteaux]: vitteauxMessages
})
