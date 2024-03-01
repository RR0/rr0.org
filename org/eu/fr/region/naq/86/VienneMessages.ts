import { VienneCityCode } from "./VienneCityCode"
import { montDeMarsanMessages } from "./montigne/MontigneMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

type VienneCityMessagesList = { [key in VienneCityCode]: CityMessages }

const vienneCityMessages: VienneCityMessagesList = {
  [VienneCityCode.MontDeMarsan]: montDeMarsanMessages
}

export const vienneMessages = new DepartmentMessages<VienneCityMessagesList>("Vienne", vienneCityMessages)
