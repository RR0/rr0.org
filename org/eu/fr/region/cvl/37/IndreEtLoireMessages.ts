import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { IndreEtLoireCityCode } from "./IndreEtLoireCityCode"
import { blereMessages } from "./blere/BlereMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { montsMessages } from "./monts/MontsMessages"

type IndreEtLoireCityMessagesList = { [key in IndreEtLoireCityCode]: CityMessages }
const indreEtLoireCityMessages: IndreEtLoireCityMessagesList = {
  [IndreEtLoireCityCode.Blere]: blereMessages,
  [IndreEtLoireCityCode.Monts]: montsMessages
}
export const indreEtLoireMessages = DepartmentMessages.create<IndreEtLoireCityMessagesList>("Indre-et-Loire",
  indreEtLoireCityMessages)
