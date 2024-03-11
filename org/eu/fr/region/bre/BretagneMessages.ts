import { BretagneDepartementCode } from "./BretagneDepartementCode"
import { cotesDArmorMessages } from "./22/CotesDArmorMessages"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { illeEtVilaineMessages } from "./35/IlleEtVilaineMessages"

export type CotesDArmorDepartmentMessagesList = { [key in BretagneDepartementCode]: DepartmentMessages<any> }
export const cotesDArmorDepartmentsMessages: CotesDArmorDepartmentMessagesList = {
  [BretagneDepartementCode.CotesDArmor]: cotesDArmorMessages,
  [BretagneDepartementCode.IlleEtVilaine]: illeEtVilaineMessages
}
