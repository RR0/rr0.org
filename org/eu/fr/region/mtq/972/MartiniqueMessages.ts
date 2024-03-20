import { MartiniqueCityCode } from "./MartiniqueCityCode"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { fortDeFranceMessages } from "./fortDeFrance/FortDeFranceMessages"

type MartiniqueMessages = { [key in MartiniqueCityCode]: OrganizationMessages }
const guadeloupeCityMessages: MartiniqueMessages = {
  [MartiniqueCityCode.FortDeFrance]: fortDeFranceMessages
}
export const martinique972Messages = DepartmentMessages.create<MartiniqueMessages>("Martinique",
  guadeloupeCityMessages)
