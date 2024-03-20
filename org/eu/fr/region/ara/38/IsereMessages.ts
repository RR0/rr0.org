import { saintMarcellinMessages } from "./SaintMarcellin/SaintMarcellinMessages"
import { IsereCityCode } from "./IsereCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { meylanMessages } from "./Meylan/MeylanMessages"
import { domeneMessages } from "./Domene/DomeneMessages"
import { valbonnaisMessages } from "./Valbonnais/ValbonnaisMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { saintGeoireEnValdaineMessages } from "./SaintGeoireEnValdaine/SaintGeoireEnValdaineMessages"
import { chirensMessages } from "./Chirens/ChirensMessages"
import { saintVerandMessages } from "./SaintVerand/SaintVerandMessages"
import { allevardMessages } from "./Allevard/AllevardMessages"
import { venonMessages } from "./Venon/VenonMessages"

type DepCityMessages = { [key in IsereCityCode]: CityMessages }
export const isereMessages = DepartmentMessages.create<DepCityMessages>("Isère", {
  [IsereCityCode.Allevard]: allevardMessages,
  [IsereCityCode.Chirens]: chirensMessages,
  [IsereCityCode.Domene]: domeneMessages,
  [IsereCityCode.Meylan]: meylanMessages,
  [IsereCityCode.SaintGeoireEnValdaine]: saintGeoireEnValdaineMessages,
  [IsereCityCode.SaintMarcellin]: saintMarcellinMessages,
  [IsereCityCode.SaintVerand]: saintVerandMessages,
  [IsereCityCode.Valbonnais]: valbonnaisMessages,
  [IsereCityCode.Venon]: venonMessages
  }
)
