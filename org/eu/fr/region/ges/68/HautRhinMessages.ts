import { HautRhinCityCode } from "./HautRhinCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { mulhouseMessages } from "./Mulhouse/MulhouseMessages"

type DepMessages = { [key in HautRhinCityCode]: CityMessages }
export const hautRhinMessages = DepartmentMessages.create<DepMessages>("Haut-Rhin", {
  [HautRhinCityCode.Mulhouse]: mulhouseMessages
})
