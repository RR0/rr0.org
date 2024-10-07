import { ArdennesCityCode } from "./ArdennesCityCode.js"
import { revinMessages } from "./Revin/RevinMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"

type DepMessages = { [key in ArdennesCityCode]: CityMessages }
export const ardennesMessages = DepartmentMessages.create<DepMessages>("Ardennes", {
  [ArdennesCityCode.Revin]: revinMessages
})
