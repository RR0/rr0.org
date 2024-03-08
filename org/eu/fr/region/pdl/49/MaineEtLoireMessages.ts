import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { MaineEtLoireCityCode } from "./MaineEtLoireCityCode"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { angersMessages } from "./angers/AngersMessages"

type SartheCityMessagesList = { [key in MaineEtLoireCityCode]: OrganizationMessages }
const maineEtLoireCityMessages: SartheCityMessagesList = {
  [MaineEtLoireCityCode.Angers]: angersMessages
}
export const maineEtLoireMessages = DepartmentMessages.create<SartheCityMessagesList>("Maine-et-Loire",
  maineEtLoireCityMessages)
