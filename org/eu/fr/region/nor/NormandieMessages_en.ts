import { RegionMessages } from "../../../../country/region/RegionMessages.js"
import { calvadosMessages } from "./14/CalvadosMessages.js"
import { NormandieDepartmentCode } from "./NormandieDepartmentCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { seineMaritimeMessages } from "./76/SeineMaritimeMessages.js"

const normandyMessageList: { [key in NormandieDepartmentCode]: DepartmentMessages<any> } = {
  [NormandieDepartmentCode.Calvados]: calvadosMessages,
  [NormandieDepartmentCode.SeineMaritime]: seineMaritimeMessages
}
/**
 * French translations of messages about the Normandy French region.
 */
export const normandieMessages_en = RegionMessages.create("Normandy", normandyMessageList)
