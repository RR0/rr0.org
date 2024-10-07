import { vallonEnSullyMessages } from "./valonensully/VallonEnSullyMessages.js"
import { AllierCityCode } from "./AllierCityCode.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"
import { montmaraultMessages } from "./montmarault/MontmaraultMessages.js"

const allierCityMessages: { [key in AllierCityCode]: CityMessages } = {
  [AllierCityCode.VallonEnSully]: vallonEnSullyMessages,
  [AllierCityCode.Montmarault]: montmaraultMessages
}
export const allierMessages = DepartmentMessages.create("Allier", allierCityMessages)
