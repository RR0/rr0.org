import { MartiniqueCityCode } from "./MartiniqueCityCode"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { fortDeFranceMessages } from "./FortDeFrance/FortDeFranceMessages"
import { casePiloteMessages } from "./CasePilote/CasePiloteMessages"

type MartiniqueMessages = { [key in MartiniqueCityCode]: OrganizationMessages }
const guadeloupeCityMessages: MartiniqueMessages = {
  [MartiniqueCityCode.CasePilote]: casePiloteMessages,
  [MartiniqueCityCode.FortDeFrance]: fortDeFranceMessages
}
export const martinique972Messages = DepartmentMessages.create<MartiniqueMessages>("Martinique",
  guadeloupeCityMessages)
