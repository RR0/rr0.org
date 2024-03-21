import { TarnCityCode } from "./TarnCityCode"
import { albiMessages } from "./Albi/AlbiMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { castelnauDeMontmiralMessages } from "./CastelnauDeMontmiral/CastelnauDeMontmiralMessages"

type DepMessages = { [key in TarnCityCode]: OrganizationMessages }
export const tarnMessages = DepartmentMessages.create<DepMessages>("Tarn", {
  [TarnCityCode.Albi]: albiMessages,
  [TarnCityCode.CastelnauDeMontmiral]: castelnauDeMontmiralMessages
})
