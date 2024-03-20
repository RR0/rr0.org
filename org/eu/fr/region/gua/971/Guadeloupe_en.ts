import { GuadeloupeCityCode } from "./GuadeloupeCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { capesterreDeMarieGalanteMessages } from "./CapesterreMarieGalante/CapesterreMarieGalanteMessages"
import { GuadeloupeCityMessage } from "./GuadeloupeCityMessage"

export const guadeloupe971Messages_en = DepartmentMessages.create<GuadeloupeCityMessage>("Guadeloupe", {
  [GuadeloupeCityCode.CapesterreMarieGalante]: capesterreDeMarieGalanteMessages
})
