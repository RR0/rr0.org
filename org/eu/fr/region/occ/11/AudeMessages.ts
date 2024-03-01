import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { AudeCityCode } from "./AudeCityCode"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { cucugnanMessages } from "./cucugnan/CucugnanMessages"

export type AudeCityList<T> = { [key in AudeCityCode]: T }

export const audeCityMessages: AudeCityList<CityMessages> = {
  [AudeCityCode.Cucugnan]: cucugnanMessages
}

export const audeMessages = new DepartmentMessages<AudeCityList<CityMessages>>("Aude", audeCityMessages)
