import { slocombMessages } from "./slocomb/SlocombMessages"
import { GenevaCityCode } from "./GenevaCityCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"

export const genevaMessages_en = DepartmentMessages.create("Geneva County", {
  [GenevaCityCode.Slocomb]: slocombMessages
})
