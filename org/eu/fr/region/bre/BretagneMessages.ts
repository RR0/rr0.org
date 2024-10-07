import { BretagneDepartementCode } from "./BretagneDepartementCode.js"
import { cotesDArmorMessages } from "./22/CotesDArmorMessages.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { illeEtVilaineMessages } from "./35/IlleEtVilaineMessages.js"
import { finistereMessages } from "./29/FinistereMessages.js"

export type CotesDArmorDepartmentMessagesList = { [key in BretagneDepartementCode]: DepartmentMessages<any> }
export const cotesDArmorDepartmentsMessages: CotesDArmorDepartmentMessagesList = {
  [BretagneDepartementCode.CotesDArmor]: cotesDArmorMessages,
  [BretagneDepartementCode.Finistere]: finistereMessages,
  [BretagneDepartementCode.IlleEtVilaine]: illeEtVilaineMessages
}
