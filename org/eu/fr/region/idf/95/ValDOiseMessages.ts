import { ValDOiseCityCode } from "./ValDOiseCityCode"
import { tavernyMessages } from "./taverny/TavernyMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

type ValDOiseCityMessagesList = { [key in ValDOiseCityCode]: CityMessages }
const valDOiseCityMessages: ValDOiseCityMessagesList = {
  [ValDOiseCityCode.Taverny]: tavernyMessages
}
export const valDOiseMessages = DepartmentMessages.create<ValDOiseCityMessagesList>("Val-d'Oise", valDOiseCityMessages)
