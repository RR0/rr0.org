import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { VarCityCode } from "./VarCityCode"
import { foxAmphouxMessages } from "./foxamphoux/FoxAmphouxMessages"

export type VarCityList<T> = { [key in VarCityCode]: T }

export const varCityMessages: VarCityList<CityMessages> = {
  [VarCityCode.FoxAmphoux]: foxAmphouxMessages
}

export const varMessages = new DepartmentMessages<VarCityList<CityMessages>>("Var", varCityMessages)
