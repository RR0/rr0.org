import { TarnCityCode } from "./TarnCityCode"
import { albiMessages } from "./albi/AlbiMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { castelnauDeMontmiralMessages } from "./CastelnauDeMontmiral/CastelnauDeMontmiralMessages"

const tarnCityMessages: { [key in TarnCityCode]: OrganizationMessages } = {
  [TarnCityCode.Albi]: albiMessages,
  [TarnCityCode.CastelnauDeMontmiral]: castelnauDeMontmiralMessages
}

export const tarnMessages = DepartmentMessages.create("Tarn", tarnCityMessages)
