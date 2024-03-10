import { SommeCityCode } from "./SommeCityCode"
import { bernavilleMessages } from "./bernaville/BernavilleMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

type PasDeCalaisCityMessagesList = { [key in SommeCityCode]: CityMessages }
const pasDeCalaisCityMessages: PasDeCalaisCityMessagesList = {
  [SommeCityCode.Bernaville]: bernavilleMessages
}
export const sommeMessages = DepartmentMessages.create<PasDeCalaisCityMessagesList>("Somme", pasDeCalaisCityMessages)
