import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { GuadeloupeCityMessage } from "./GuadeloupeCityMessage"
import { GuadeloupeCityCode } from "./GuadeloupeCityCode"
import { capesterreDeMarieGalanteMessages } from "./CapesterreMarieGalante/CapesterreMarieGalanteMessages"

export const guadeloupe971Messages_fr = DepartmentMessages.create<GuadeloupeCityMessage>("Guadeloupe", {
  [GuadeloupeCityCode.CapesterreMarieGalante]: capesterreDeMarieGalanteMessages
})
