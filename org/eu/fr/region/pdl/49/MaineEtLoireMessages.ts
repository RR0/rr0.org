import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { MaineEtLoireCityCode } from "./MaineEtLoireCityCode.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { angersMessages } from "./Angers/AngersMessages.js"
import { choletMessages } from "./Cholet/CholetMessages.js"

type DepMessages = { [key in MaineEtLoireCityCode]: OrganizationMessages }
export const maineEtLoireMessages = DepartmentMessages.create<DepMessages>("Maine-et-Loire", {
  [MaineEtLoireCityCode.Angers]: angersMessages,
  [MaineEtLoireCityCode.Cholet]: choletMessages
})
