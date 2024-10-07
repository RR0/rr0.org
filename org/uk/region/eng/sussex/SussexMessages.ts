import { SussexCityCode } from "./SussexCityCode.js"
import { CityMessages } from "../../../../country/region/department/city/CityMessages.js"
import { frantMessages } from "./frant/FrantMessages.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"

type SussexCityMessagesList = { [key in SussexCityCode]: CityMessages }
const sussexCityMessages: SussexCityMessagesList = {
  [SussexCityCode.Beira]: frantMessages
}
export const sussexMessages = DepartmentMessages.create<SussexCityMessagesList>("Sussex", sussexCityMessages)
