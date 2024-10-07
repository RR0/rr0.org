import { GuadeloupeCityCode } from "./GuadeloupeCityCode.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { capesterreDeMarieGalanteMessages } from "./CapesterreMarieGalante/CapesterreMarieGalanteMessages.js"
import { GuadeloupeCityMessage } from "./GuadeloupeCityMessage.js"

export const guadeloupe971Messages_en = DepartmentMessages.create<GuadeloupeCityMessage>("Guadeloupe", {
  [GuadeloupeCityCode.CapesterreMarieGalante]: capesterreDeMarieGalanteMessages
})
