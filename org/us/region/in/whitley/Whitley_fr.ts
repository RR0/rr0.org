import { southWhitleyMessages } from "./SouthWhitley/SouthWhitleyMessages.js"
import { WhitleyCityCode } from "./WhitleyCityCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"

export const whitley_fr = DepartmentMessages.create("Comté de Whitley", {
  [WhitleyCityCode.SouthWhitley]: southWhitleyMessages
})
