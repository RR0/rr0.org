import { YvelinesCityCode } from "./YvelinesCityCode"
import { neauphleLeChateauMessages } from "./neauphleLechateau/NeauphleLeChateauMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/city/DepartmentMessages"

type YvelinesCityMessages = { [key in YvelinesCityCode]: OrganizationMessages }
export const yvelinesCityMessages: YvelinesCityMessages = {
  [YvelinesCityCode.NeauphleLeChateau]: neauphleLeChateauMessages
}
export const yvelinesMessages = DepartmentMessages.create<YvelinesCityMessages>("Yvelines", yvelinesCityMessages)
