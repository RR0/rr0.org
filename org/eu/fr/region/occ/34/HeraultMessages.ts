import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { HeraultCityCode } from "./HeraultCityCode"
import { montpellier34Messages } from "./montpellier/MontpellierMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

export type HeraultCityList<T> = {
  [key in HeraultCityCode]: T
}

export const heraultCityMessages: HeraultCityList<CityMessages> = {
  [HeraultCityCode.Montpellier]: montpellier34Messages
}

export const heraultMessages = new DepartmentMessages<HeraultCityList<CityMessages>>("Hérault", heraultCityMessages)
