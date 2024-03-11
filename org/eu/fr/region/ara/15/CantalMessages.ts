import { mauriacMessages } from "./mauriac/MauriacMessages"
import { CantalCityCode } from "./CantalCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

export const cantalMessages = DepartmentMessages.create("Cantal", {
    [CantalCityCode.Mauriac]: mauriacMessages
  }
)
