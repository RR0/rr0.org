import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { IndreEtLoireCityCode } from "./IndreEtLoireCityCode"
import { blereMessages } from "./Blere/BlereMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { montsMessages } from "./Monts/MontsMessages"
import { chambourgSurIndreMessages } from "./ChambourgSurIndre/ChambourgSurIndreMessages"

type IndreEtLoireCityMessagesList = { [key in IndreEtLoireCityCode]: CityMessages }
const indreEtLoireCityMessages: IndreEtLoireCityMessagesList = {
  [IndreEtLoireCityCode.Blere]: blereMessages,
  [IndreEtLoireCityCode.ChambourgSurIndre]: chambourgSurIndreMessages,
  [IndreEtLoireCityCode.Monts]: montsMessages
}
export const indreEtLoireMessages = DepartmentMessages.create<IndreEtLoireCityMessagesList>("Indre-et-Loire",
  indreEtLoireCityMessages)
