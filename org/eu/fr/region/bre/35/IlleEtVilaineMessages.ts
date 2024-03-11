import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { IlleEtVilaineCityCode } from "./IlleEtVilaineCityCode"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { pleineFougeresMessages } from "./pleinefougeres/PleineFougeresMessages"

type IlleEtVilaineCityMessagesList = { [key in IlleEtVilaineCityCode]: OrganizationMessages }
const illeEtVilaineCityMessages: IlleEtVilaineCityMessagesList = {
  [IlleEtVilaineCityCode.PleineFougeres]: pleineFougeresMessages
}
export const illeEtVilaineMessages = DepartmentMessages.create<IlleEtVilaineCityMessagesList>("Ille-et-Vilaine",
  illeEtVilaineCityMessages)
