import { slocombMessages } from "./slocomb/SlocombMessages.js"
import { GenevaCityCode } from "./GenevaCityCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"

export const genevaMessages_fr = DepartmentMessages.create("Comté de Geneva", {
  [GenevaCityCode.Slocomb]: slocombMessages
})
