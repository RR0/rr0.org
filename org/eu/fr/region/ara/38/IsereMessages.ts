import { stMarcellinMessages } from "./stmarcellin/StMarcellinMessages"
import { IsereCityCode } from "./IsereCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/city/DepartmentMessages"

export const isereMessages = DepartmentMessages.create(
  "Isère",
  {
    [IsereCityCode.StMarcellin]: stMarcellinMessages
  }
)
