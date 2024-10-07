import { SommeCityCode } from "./SommeCityCode.js"
import { bernavilleMessages } from "./bernaville/BernavilleMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"

type SommeCityMessagesList = { [key in SommeCityCode]: CityMessages }
const sommeCityMessages: SommeCityMessagesList = {
  [SommeCityCode.Bernaville]: bernavilleMessages
}
export const sommeMessages = DepartmentMessages.create<SommeCityMessagesList>("Somme", sommeCityMessages)
