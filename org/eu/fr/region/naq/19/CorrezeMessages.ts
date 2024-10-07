import { CorrezeCityCode } from "./CorrezeCityCode.js"
import { larochePresFeytMessages } from "./LarochePresFeyt/LarochePresFeytMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { briveLaGaillardeMessages } from "./BriveLaGaillarde/BriveLaGaillardeMessages.js"

type CorrezeCityMessagesList = { [key in CorrezeCityCode]: OrganizationMessages }
export const correzeMessages = DepartmentMessages.create<CorrezeCityMessagesList>("Corrèze", {
  [CorrezeCityCode.BriveLaGaillarde]: briveLaGaillardeMessages,
  [CorrezeCityCode.LarochePresFeyt]: larochePresFeytMessages
})
