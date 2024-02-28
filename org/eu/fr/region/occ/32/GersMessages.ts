import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { GersCityCode } from "./GersCityCode"
import { estang33Messages } from "./estang/EstangMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

export type GersCityList<T> = {
  [key in GersCityCode]: T
}

export const gersCityMessages: GersCityList<CityMessages> = {
  [GersCityCode.Estang]: estang33Messages
}

export const gersMessages = new DepartmentMessages<GersCityList<CityMessages>>("Gers", gersCityMessages)
