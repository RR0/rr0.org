import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { FinistereCityCode } from "./FinistereCityCode"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { concarneauMessages } from "./Concarneau/ConcarneauMessages"
import { fouesnantMessages } from "./Fouesnant/FouesnantMessages"
import { brestMessages } from "./Brest/BrestMessages"

type CotesDArmorCityMessagesList = { [key in FinistereCityCode]: OrganizationMessages }
export const finistereMessages = DepartmentMessages.create<CotesDArmorCityMessagesList>("Finistère", {
  [FinistereCityCode.Brest]: brestMessages,
  [FinistereCityCode.Concarneau]: concarneauMessages,
  [FinistereCityCode.Fouesnant]: fouesnantMessages
})
