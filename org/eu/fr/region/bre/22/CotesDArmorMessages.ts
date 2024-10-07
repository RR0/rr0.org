import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { CotesDArmorCityCode } from "./CotesDArmorCityCode.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { binicMessages } from "./binic/BinicMessages.js"

type CotesDArmorCityMessagesList = { [key in CotesDArmorCityCode]: OrganizationMessages }
const cotesDArmorCityMessages: CotesDArmorCityMessagesList = {
  [CotesDArmorCityCode.Binic]: binicMessages
}
export const cotesDArmorMessages = DepartmentMessages.create<CotesDArmorCityMessagesList>("Côtes-d'Armor",
  cotesDArmorCityMessages)
