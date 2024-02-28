import { LandesCityCode } from "./LandesCityCode"
import { montDeMarsanMessages } from "./montigne/MontigneMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

type LandesCityMessagesList = { [key in LandesCityCode]: CityMessages }

const landesCityMessages: LandesCityMessagesList = {
  [LandesCityCode.MontDeMarsan]: montDeMarsanMessages
}

export const landesMessages = new DepartmentMessages<LandesCityMessagesList>("Landes", landesCityMessages)
