import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { HauteGaronneCityCode } from "./HauteGaronneCityCode"
import { loudetMessages } from "./loudet/LoudetMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { stPlancardMessages } from "./stplancard/StPlancardMessages"

export type HauteGaronneCityList<T> = { [key in HauteGaronneCityCode]: T }

export const hauteGaronneCityMessages: HauteGaronneCityList<CityMessages> = {
  [HauteGaronneCityCode.Loudet]: loudetMessages,
  [HauteGaronneCityCode.StPlancard]: stPlancardMessages
}

export const hauteGaronneMessages = new DepartmentMessages<HauteGaronneCityList<CityMessages>>("Haute-Garonne",
  hauteGaronneCityMessages)
