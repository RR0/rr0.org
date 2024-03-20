import { AveyronCityCode } from "./AveyronCityCode"
import { espalionMessages } from "./Espalion/EspalionMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

type DepCityMessages = { [key in AveyronCityCode]: OrganizationMessages }
const depCityMessages: DepCityMessages = {
  [AveyronCityCode.Espalion]: espalionMessages
}
export const aveyronMessages = DepartmentMessages.create<DepCityMessages>("Aveyron", depCityMessages)
