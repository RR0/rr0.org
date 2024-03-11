import { RegionMessages } from "../../../../country/region/RegionMessages"
import { calvadosMessages } from "./14/CalvadosMessages"
import { NormandieDepartmentCode } from "./NormandieDepartmentCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { seineMaritimeMessages } from "./76/SeineMaritimeMessages"

const normandyMessageList: { [key in NormandieDepartmentCode]: DepartmentMessages<any> } = {
  [NormandieDepartmentCode.Calvados]: calvadosMessages,
  [NormandieDepartmentCode.SeineMaritime]: seineMaritimeMessages
}
/**
 * French translations of messages about the Normandy French region.
 */
export const normandieMessages_en = RegionMessages.create("Normandy", normandyMessageList)
