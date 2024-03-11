import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { IndreEtLoireCityCode } from "./IndreEtLoireCityCode"
import { blereMessages } from "./issoudun/BlereMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

type IndreEtLoireCityMessagesList = { [key in IndreEtLoireCityCode]: CityMessages }
const indreEtLoireCityMessages: IndreEtLoireCityMessagesList = {
  [IndreEtLoireCityCode.Blere]: blereMessages
}
export const indreEtLoireMessages = DepartmentMessages.create<IndreEtLoireCityMessagesList>("Indre-et-Loire",
  indreEtLoireCityMessages)
