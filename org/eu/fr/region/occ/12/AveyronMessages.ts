import { AveyronCityCode } from "./AveyronCityCode.js"
import { espalionMessages } from "./Espalion/EspalionMessages.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"

type DepCityMessages = { [key in AveyronCityCode]: OrganizationMessages }
const depCityMessages: DepCityMessages = {
  [AveyronCityCode.Espalion]: espalionMessages
}
export const aveyronMessages = DepartmentMessages.create<DepCityMessages>("Aveyron", depCityMessages)
