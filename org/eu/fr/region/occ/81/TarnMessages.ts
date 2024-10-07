import { TarnCityCode } from "./TarnCityCode.js"
import { albiMessages } from "./Albi/AlbiMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { castelnauDeMontmiralMessages } from "./CastelnauDeMontmiral/CastelnauDeMontmiralMessages.js"

type DepMessages = { [key in TarnCityCode]: OrganizationMessages }
export const tarnMessages = DepartmentMessages.create<DepMessages>("Tarn", {
  [TarnCityCode.Albi]: albiMessages,
  [TarnCityCode.CastelnauDeMontmiral]: castelnauDeMontmiralMessages
})
