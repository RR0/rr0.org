import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { vallonEnSullyMessages } from "./stetienne/VallonEnSullyMessages"
import { AllierCityCode } from "./AllierCityCode"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

type AllierCityMessagesList = {
  [key in AllierCityCode]: CityMessages
}
const allierCityMessages: AllierCityMessagesList = {
  [AllierCityCode.VallonEnSully]: vallonEnSullyMessages
}
export const allierMessages = new DepartmentMessages<AllierCityMessagesList>("Allier", allierCityMessages)
