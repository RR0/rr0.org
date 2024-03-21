import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CoteDOrCityCode } from "./CoteDOrCityCode"
import { vitteauxMessages } from "./Vitteaux/VitteauxMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { mirebeauSurBezeMessages } from "./MirebeauSurBeze/MirebeauSurBezeMessages"

type DepMessages = { [key in CoteDOrCityCode]: CityMessages }
export const coteDOrMessages = DepartmentMessages.create<DepMessages>("Côte-d'Or", {
  [CoteDOrCityCode.MirebeauSurBeze]: mirebeauSurBezeMessages,
  [CoteDOrCityCode.Vitteaux]: vitteauxMessages
})
