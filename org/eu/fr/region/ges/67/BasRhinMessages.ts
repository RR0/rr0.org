import { BasRhinCityCode } from "./BasRhinCityCode.js"
import { urmattMessages } from "./Urmatt/UrmattMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"
import { bischwillerMessages } from "./Bischwiller/BischwillerMessages.js"

type DepMessages = { [key in BasRhinCityCode]: CityMessages }
export const basRhinMessages = DepartmentMessages.create<DepMessages>("Bas-Rhin", {
  [BasRhinCityCode.Urmatt]: urmattMessages,
  [BasRhinCityCode.Bischwiller]: bischwillerMessages
})
