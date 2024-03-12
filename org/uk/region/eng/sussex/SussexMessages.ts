import { SussexCityCode } from "./SussexCityCode"
import { CityMessages } from "../../../../country/region/department/city/CityMessages"
import { frantMessages } from "./frant/FrantMessages"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"

type SussexCityMessagesList = { [key in SussexCityCode]: CityMessages }
const sussexCityMessages: SussexCityMessagesList = {
  [SussexCityCode.Beira]: frantMessages
}
export const sussexMessages = DepartmentMessages.create<SussexCityMessagesList>("Sussex", sussexCityMessages)
