import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { IndreCityCode } from "./IndreCityCode"
import { issoudunMessages } from "./Issoudun/IssoudunMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

type DepMessages = { [key in IndreCityCode]: CityMessages }
export const indreMessages = DepartmentMessages.create<DepMessages>("Indre", {
  [IndreCityCode.Issoudun]: issoudunMessages
})
