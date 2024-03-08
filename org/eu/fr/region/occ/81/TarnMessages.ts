import { TarnCityCode } from "./TarnCityCode"
import { albiMessages } from "./albi/AlbiMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"

const tarnCityMessages: { [key in TarnCityCode]: OrganizationMessages } = {
  [TarnCityCode.Albi]: albiMessages
}

export const tarnMessages = DepartmentMessages.create("Tarn", tarnCityMessages)
