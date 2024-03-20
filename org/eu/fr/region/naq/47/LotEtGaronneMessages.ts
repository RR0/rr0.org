import { LotEtGaronneCityCode } from "./LotEtGaronneCityCode"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { laroqueTimbautMessages } from "./LaroqueTimbaut/LaroqueTimbautMessages"

type LandesCityMessagesList = { [key in LotEtGaronneCityCode]: OrganizationMessages }
export const lotEtGaronneMessages = DepartmentMessages.create<LandesCityMessagesList>("Lot-et-Garonne", {
  [LotEtGaronneCityCode.LaroqueTimbaut]: laroqueTimbautMessages
})
