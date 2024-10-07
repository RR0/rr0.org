import { LandesCityCode } from "./LandesCityCode.js"
import { montDeMarsanMessages } from "./MontDeMarsan/MontDeMarsanMessages.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"

type LandesCityMessagesList = { [key in LandesCityCode]: OrganizationMessages }
export const landesMessages = DepartmentMessages.create<LandesCityMessagesList>("Landes", {
  [LandesCityCode.MontDeMarsan]: montDeMarsanMessages
})
