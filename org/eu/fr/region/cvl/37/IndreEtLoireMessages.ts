import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { IndreEtLoireCityCode } from "./IndreEtLoireCityCode.js"
import { blereMessages } from "./Blere/BlereMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"
import { montsMessages } from "./Monts/MontsMessages.js"
import { chambourgSurIndreMessages } from "./ChambourgSurIndre/ChambourgSurIndreMessages.js"

type IndreEtLoireCityMessagesList = { [key in IndreEtLoireCityCode]: CityMessages }
const indreEtLoireCityMessages: IndreEtLoireCityMessagesList = {
  [IndreEtLoireCityCode.Blere]: blereMessages,
  [IndreEtLoireCityCode.ChambourgSurIndre]: chambourgSurIndreMessages,
  [IndreEtLoireCityCode.Monts]: montsMessages
}
export const indreEtLoireMessages = DepartmentMessages.create<IndreEtLoireCityMessagesList>("Indre-et-Loire",
  indreEtLoireCityMessages)
