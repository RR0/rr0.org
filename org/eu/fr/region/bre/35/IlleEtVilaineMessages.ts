import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { IlleEtVilaineCityCode } from "./IlleEtVilaineCityCode.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { pleineFougeresMessages } from "./pleinefougeres/PleineFougeresMessages.js"

type IlleEtVilaineCityMessagesList = { [key in IlleEtVilaineCityCode]: OrganizationMessages }
const illeEtVilaineCityMessages: IlleEtVilaineCityMessagesList = {
  [IlleEtVilaineCityCode.PleineFougeres]: pleineFougeresMessages
}
export const illeEtVilaineMessages = DepartmentMessages.create<IlleEtVilaineCityMessagesList>("Ille-et-Vilaine",
  illeEtVilaineCityMessages)
