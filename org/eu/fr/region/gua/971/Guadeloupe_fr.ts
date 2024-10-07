import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { GuadeloupeCityMessage } from "./GuadeloupeCityMessage.js"
import { GuadeloupeCityCode } from "./GuadeloupeCityCode.js"
import { capesterreDeMarieGalanteMessages } from "./CapesterreMarieGalante/CapesterreMarieGalanteMessages.js"
import { leMouleMessages } from "./LeMoule/LeMouleMessages.js"

export const guadeloupe971Messages_fr = DepartmentMessages.create<GuadeloupeCityMessage>("Guadeloupe", {
  [GuadeloupeCityCode.CapesterreMarieGalante]: capesterreDeMarieGalanteMessages,
  [GuadeloupeCityCode.LeMoule]: leMouleMessages
})
