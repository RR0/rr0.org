import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { TarnCityCode } from "./TarnCityCode"
import { albiMessages } from "./albi/AlbiMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

export type TarnCityList<T> = { [key in TarnCityCode]: T }

const tarnCityMessages: TarnCityList<CityMessages> = {
  [TarnCityCode.Albi]: albiMessages
}

export const tarnMessages = new DepartmentMessages<TarnCityList<CityMessages>>("Tarn", tarnCityMessages)
