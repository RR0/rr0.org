import { BasRhinCityCode } from "./BasRhinCityCode"
import { urmattMessages } from "./urmatt/UrmattMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

export const basRhinMessages = DepartmentMessages.create("Bas-Rhin", {
  [BasRhinCityCode.Urmatt]: urmattMessages
})
