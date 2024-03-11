import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { IndreCityCode } from "./IndreCityCode"
import { issoudunMessages } from "./issoudun/IssoudunMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

type IndreCityMessagesList = { [key in IndreCityCode]: CityMessages }
const indreCityMessages: IndreCityMessagesList = {
  [IndreCityCode.Issoudun]: issoudunMessages
}
export const indreMessages = DepartmentMessages.create<IndreCityMessagesList>("Indre", indreCityMessages)
