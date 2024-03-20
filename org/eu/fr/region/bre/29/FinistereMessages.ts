import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { FinistereCityCode } from "./FinistereCityCode"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { concarneauMessages } from "./concarneau/ConcarneauMessages"

type CotesDArmorCityMessagesList = { [key in FinistereCityCode]: OrganizationMessages }
const cotesDArmorCityMessages: CotesDArmorCityMessagesList = {
  [FinistereCityCode.Concarneau]: concarneauMessages
}
export const finistereMessages = DepartmentMessages.create<CotesDArmorCityMessagesList>("Finistère",
  cotesDArmorCityMessages)
