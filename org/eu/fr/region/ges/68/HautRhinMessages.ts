import { HautRhinCityCode } from "./HautRhinCityCode.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"
import { mulhouseMessages } from "./Mulhouse/MulhouseMessages.js"

type DepMessages = { [key in HautRhinCityCode]: CityMessages }
export const hautRhinMessages = DepartmentMessages.create<DepMessages>("Haut-Rhin", {
  [HautRhinCityCode.Mulhouse]: mulhouseMessages
})
