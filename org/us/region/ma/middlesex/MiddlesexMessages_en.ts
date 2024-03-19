import { cambridgeMessages } from "./cambridge/CambridgeMessages"
import { MiddlesexCityCode } from "./MiddlesexCityCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"

export const middlesexMessages_en = DepartmentMessages.create("Middlesex County", {
  [MiddlesexCityCode.Cambridge]: cambridgeMessages
})
