import { LandesCityCode } from "./LandesCityCode"
import { montDeMarsanMessages } from "./MontDeMarsan/MontDeMarsanMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

type LandesCityMessagesList = { [key in LandesCityCode]: OrganizationMessages }
export const landesMessages = DepartmentMessages.create<LandesCityMessagesList>("Landes", {
  [LandesCityCode.MontDeMarsan]: montDeMarsanMessages
})
