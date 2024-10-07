import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { FinistereCityCode } from "./FinistereCityCode.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { concarneauMessages } from "./Concarneau/ConcarneauMessages.js"
import { fouesnantMessages } from "./Fouesnant/FouesnantMessages.js"
import { brestMessages } from "./Brest/BrestMessages.js"

type CotesDArmorCityMessagesList = { [key in FinistereCityCode]: OrganizationMessages }
export const finistereMessages = DepartmentMessages.create<CotesDArmorCityMessagesList>("Finistère", {
  [FinistereCityCode.Brest]: brestMessages,
  [FinistereCityCode.Concarneau]: concarneauMessages,
  [FinistereCityCode.Fouesnant]: fouesnantMessages
})
