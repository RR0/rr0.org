import { saintMarcellinMessages } from "./SaintMarcellin/SaintMarcellinMessages"
import { IsereCityCode } from "./IsereCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { meylanMessages } from "./Meylan/MeylanMessages"
import { domeneMessages } from "./Domene/DomeneMessages"
import { valbonnaisMessages } from "./Valbonnais/ValbonnaisMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { saintGeoireEnValdaineMessages } from "./SaintGeoireEnValdaine/SaintGeoireEnValdaineMessages"

type DepCityMessages = { [key in IsereCityCode]: CityMessages }
export const isereMessages = DepartmentMessages.create<DepCityMessages>("Isère", {
  [IsereCityCode.Domene]: domeneMessages,
  [IsereCityCode.Meylan]: meylanMessages,
  [IsereCityCode.SaintGeoireEnValdaine]: saintGeoireEnValdaineMessages,
  [IsereCityCode.SaintMarcellin]: saintMarcellinMessages,
  [IsereCityCode.Valbonnais]: valbonnaisMessages
  }
)
