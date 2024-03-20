import { BasRhinCityCode } from "./BasRhinCityCode"
import { urmattMessages } from "./Urmatt/UrmattMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { bischwillerMessages } from "./Bischwiller/BischwillerMessages"

type DepMessages = { [key in BasRhinCityCode]: CityMessages }
export const basRhinMessages = DepartmentMessages.create<DepMessages>("Bas-Rhin", {
  [BasRhinCityCode.Urmatt]: urmattMessages,
  [BasRhinCityCode.Bischwiller]: bischwillerMessages
})
