import { MartiniqueCityCode } from "./MartiniqueCityCode.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { fortDeFranceMessages } from "./FortDeFrance/FortDeFranceMessages.js"
import { casePiloteMessages } from "./CasePilote/CasePiloteMessages.js"

type MartiniqueMessages = { [key in MartiniqueCityCode]: OrganizationMessages }
const guadeloupeCityMessages: MartiniqueMessages = {
  [MartiniqueCityCode.CasePilote]: casePiloteMessages,
  [MartiniqueCityCode.FortDeFrance]: fortDeFranceMessages
}
export const martinique972Messages = DepartmentMessages.create<MartiniqueMessages>("Martinique",
  guadeloupeCityMessages)
