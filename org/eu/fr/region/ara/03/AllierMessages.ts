import { vallonEnSullyMessages } from "./valonensully/VallonEnSullyMessages"
import { AllierCityCode } from "./AllierCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { montmaraultMessages } from "./montmarault/MontmaraultMessages"

const allierCityMessages: { [key in AllierCityCode]: CityMessages } = {
  [AllierCityCode.VallonEnSully]: vallonEnSullyMessages,
  [AllierCityCode.Montmarault]: montmaraultMessages
}
export const allierMessages = DepartmentMessages.create("Allier", allierCityMessages)
