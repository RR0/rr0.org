import { cambridgeMessages } from "./cambridge/CambridgeMessages"
import { MiddlesexCityCode } from "./MiddlesexCityCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"

export const middlesexMessages_fr = DepartmentMessages.create("Comté de Middlesex", {
  [MiddlesexCityCode.Cambridge]: cambridgeMessages
})
