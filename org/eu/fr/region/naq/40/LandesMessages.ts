import { LandesCityCode } from "./LandesCityCode"
import { montDeMarsanMessages } from "./montigne/MontigneMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/city/DepartmentMessages"

type LandesCityMessagesList = { [key in LandesCityCode]: OrganizationMessages }

const landesCityMessages: LandesCityMessagesList = {
  [LandesCityCode.MontDeMarsan]: montDeMarsanMessages
}

export const landesMessages = new DepartmentMessages<LandesCityMessagesList>(["Landes"], landesCityMessages)
