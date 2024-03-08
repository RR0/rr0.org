import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { IndreCityCode } from "./IndreCityCode"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { issoudunMessages } from "./issoudun/IssoudunMessages"

type IndreCityMessagesList = { [key in IndreCityCode]: OrganizationMessages }
const indreCityMessages: IndreCityMessagesList = {
  [IndreCityCode.Issoudun]: issoudunMessages
}
export const indreMessages = DepartmentMessages.create<IndreCityMessagesList>("Indre", indreCityMessages)
