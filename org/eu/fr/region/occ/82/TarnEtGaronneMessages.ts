import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { TarnEtGaronneCityCode } from "./TarnEtGaronneCityCode"
import { touffaillesMessages } from "./touffailles/TouffaillesMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

export type TarnEtGaronneCityList<T> = { [key in TarnEtGaronneCityCode]: T }

const tarnEtGaronneCityMessages: TarnEtGaronneCityList<CityMessages> = {
  [TarnEtGaronneCityCode.Touffailles]: touffaillesMessages
}

export const tarnEtGaronneMessages = new DepartmentMessages<TarnEtGaronneCityList<CityMessages>>("Tarn-et-Garonne",
  tarnEtGaronneCityMessages)
