import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { VaucluseCityCode } from "./VaucluseCityCode"
import { bolleneMessages } from "./bollene/BolleneMessages"

export type VaucluseCityList<T> = { [key in VaucluseCityCode]: T }

export const vaucluseCityMessages: VaucluseCityList<CityMessages> = {
  [VaucluseCityCode.Bollene]: bolleneMessages
}

export const vaucluseMessages = new DepartmentMessages<VaucluseCityList<CityMessages>>("Vaucluse", vaucluseCityMessages)
