import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { IndreCityCode } from "./IndreCityCode.js"
import { issoudunMessages } from "./Issoudun/IssoudunMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"

type DepMessages = { [key in IndreCityCode]: CityMessages }
export const indreMessages = DepartmentMessages.create<DepMessages>("Indre", {
  [IndreCityCode.Issoudun]: issoudunMessages
})
