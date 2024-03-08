import { stMarcellinMessages } from "./stmarcellin/StMarcellinMessages"
import { IsereCityCode } from "./IsereCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { meylanMessages } from "./meylan/MeylanMessages"

export const isereMessages = DepartmentMessages.create(
  "Isère",
  {
    [IsereCityCode.StMarcellin]: stMarcellinMessages,
    [IsereCityCode.Meylan]: meylanMessages
  }
)
