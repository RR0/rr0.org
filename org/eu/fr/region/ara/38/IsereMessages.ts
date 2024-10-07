import { saintMarcellinMessages } from "./SaintMarcellin/SaintMarcellinMessages.js"
import { IsereCityCode } from "./IsereCityCode.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { meylanMessages } from "./Meylan/MeylanMessages.js"
import { domeneMessages } from "./Domene/DomeneMessages.js"
import { valbonnaisMessages } from "./Valbonnais/ValbonnaisMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"
import { saintGeoireEnValdaineMessages } from "./SaintGeoireEnValdaine/SaintGeoireEnValdaineMessages.js"
import { chirensMessages } from "./Chirens/ChirensMessages.js"
import { saintVerandMessages } from "./SaintVerand/SaintVerandMessages.js"
import { allevardMessages } from "./Allevard/AllevardMessages.js"
import { venonMessages } from "./Venon/VenonMessages.js"
import { renageMessages } from "./Renage/RenageMessages.js"

type DepCityMessages = { [key in IsereCityCode]: CityMessages }
export const isereMessages = DepartmentMessages.create<DepCityMessages>("Isère", {
  [IsereCityCode.Allevard]: allevardMessages,
  [IsereCityCode.Chirens]: chirensMessages,
  [IsereCityCode.Domene]: domeneMessages,
  [IsereCityCode.Meylan]: meylanMessages,
  [IsereCityCode.Renage]: renageMessages,
  [IsereCityCode.SaintGeoireEnValdaine]: saintGeoireEnValdaineMessages,
  [IsereCityCode.SaintMarcellin]: saintMarcellinMessages,
  [IsereCityCode.SaintVerand]: saintVerandMessages,
  [IsereCityCode.Valbonnais]: valbonnaisMessages,
  [IsereCityCode.Venon]: venonMessages
  }
)
