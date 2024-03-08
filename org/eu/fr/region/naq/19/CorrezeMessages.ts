import { CorrezeCityCode } from "./CorrezeCityCode"
import { larochePresFeytMessages } from "./larochepresfeyt/LarochePresFeytMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"

type CorrezeCityMessagesList = { [key in CorrezeCityCode]: OrganizationMessages }
const correzeCityMessages: CorrezeCityMessagesList = {
  [CorrezeCityCode.LarochePresFeyt]: larochePresFeytMessages
}
export const correzeMessages = DepartmentMessages.create<CorrezeCityMessagesList>("Corrèze", correzeCityMessages)
