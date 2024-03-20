import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { MaineEtLoireCityCode } from "./MaineEtLoireCityCode"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { angersMessages } from "./Angers/AngersMessages"
import { choletMessages } from "./Cholet/CholetMessages"

type DepMessages = { [key in MaineEtLoireCityCode]: OrganizationMessages }
export const maineEtLoireMessages = DepartmentMessages.create<DepMessages>("Maine-et-Loire", {
  [MaineEtLoireCityCode.Angers]: angersMessages,
  [MaineEtLoireCityCode.Cholet]: choletMessages
})
