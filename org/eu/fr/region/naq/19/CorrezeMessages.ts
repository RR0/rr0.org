import { CorrezeCityCode } from "./CorrezeCityCode"
import { larochePresFeytMessages } from "./LarochePresFeyt/LarochePresFeytMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { briveLaGaillardeMessages } from "./BriveLaGaillarde/BriveLaGaillardeMessages"

type CorrezeCityMessagesList = { [key in CorrezeCityCode]: OrganizationMessages }
export const correzeMessages = DepartmentMessages.create<CorrezeCityMessagesList>("Corrèze", {
  [CorrezeCityCode.BriveLaGaillarde]: briveLaGaillardeMessages,
  [CorrezeCityCode.LarochePresFeyt]: larochePresFeytMessages
})
