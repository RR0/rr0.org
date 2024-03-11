import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CotesDArmorCityCode } from "./CotesDArmorCityCode"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { binicMessages } from "./binic/BinicMessages"

type CotesDArmorCityMessagesList = { [key in CotesDArmorCityCode]: OrganizationMessages }
const cotesDArmorCityMessages: CotesDArmorCityMessagesList = {
  [CotesDArmorCityCode.Binic]: binicMessages
}
export const cotesDArmorMessages = DepartmentMessages.create<CotesDArmorCityMessagesList>("Côtes-d'Armor",
  cotesDArmorCityMessages)
