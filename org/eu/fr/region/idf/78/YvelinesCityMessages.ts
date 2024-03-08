import { YvelinesCityCode } from "./YvelinesCityCode"
import { neauphleLeChateauMessages } from "./neauphlelechateau/NeauphleLeChateauMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { mesnilLeRoiMessages } from "./mesnilleroi/MesnilLeRoiMessages"

type YvelinesCityMessages = { [key in YvelinesCityCode]: OrganizationMessages }
export const yvelinesCityMessages: YvelinesCityMessages = {
  [YvelinesCityCode.NeauphleLeChateau]: neauphleLeChateauMessages,
  [YvelinesCityCode.MesnilLeRoi]: mesnilLeRoiMessages
}
export const yvelinesMessages = DepartmentMessages.create<YvelinesCityMessages>("Yvelines", yvelinesCityMessages)
