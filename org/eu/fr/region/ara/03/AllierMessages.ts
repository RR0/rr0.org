import { vallonEnSullyMessages } from "./valonensully/VallonEnSullyMessages"
import { AllierCityCode } from "./AllierCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

export const allierMessages = DepartmentMessages.create("Allier", {
  [AllierCityCode.VallonEnSully]: vallonEnSullyMessages
})
