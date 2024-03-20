import { SommeCityCode } from "./SommeCityCode"
import { bernavilleMessages } from "./bernaville/BernavilleMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

type SommeCityMessagesList = { [key in SommeCityCode]: CityMessages }
const sommeCityMessages: SommeCityMessagesList = {
  [SommeCityCode.Bernaville]: bernavilleMessages
}
export const sommeMessages = DepartmentMessages.create<SommeCityMessagesList>("Somme", sommeCityMessages)
