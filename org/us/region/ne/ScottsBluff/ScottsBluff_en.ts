import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { ScottsBluffCityCode } from "./ScottsBluffCityCode.js"
import { scottsbluffMessages } from "./Scottsbluff/ScottsbluffMessages.js"

export const scottsBluff_en = DepartmentMessages.create("Scotts Bluff County", {
    [ScottsBluffCityCode.Scottsbluff]: scottsbluffMessages
  }
)
