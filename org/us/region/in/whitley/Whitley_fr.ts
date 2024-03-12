import { southWhitleyMessages } from "./SouthWhitley/SouthWhitleyMessages"
import { WhitleyCityCode } from "./WhitleyCityCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"

export const whitley_fr = DepartmentMessages.create("Comté de Whitley", {
  [WhitleyCityCode.SouthWhitley]: southWhitleyMessages
})
