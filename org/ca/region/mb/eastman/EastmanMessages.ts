import { EastmanCityCode } from "./EastmanCityCode.js"
import { sundownessages } from "./sundown/SundownMessages.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"

export const eastmanMessages = DepartmentMessages.create("Eastman", {
  [EastmanCityCode.Sundown]: sundownessages
})
