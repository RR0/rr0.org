import { ValDOiseCityCode } from "./ValDOiseCityCode.js"
import { tavernyMessages } from "./taverny/TavernyMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"

type ValDOiseCityMessagesList = { [key in ValDOiseCityCode]: CityMessages }
const valDOiseCityMessages: ValDOiseCityMessagesList = {
  [ValDOiseCityCode.Taverny]: tavernyMessages
}
export const valDOiseMessages = DepartmentMessages.create<ValDOiseCityMessagesList>("Val-d'Oise", valDOiseCityMessages)
