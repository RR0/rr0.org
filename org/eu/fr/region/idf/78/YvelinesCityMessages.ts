import { YvelinesCityCode } from "./YvelinesCityCode.js"
import { neauphleLeChateauMessages } from "./neauphlelechateau/NeauphleLeChateauMessages.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { mesnilLeRoiMessages } from "./mesnilleroi/MesnilLeRoiMessages.js"
import { noisyLeRoiMessages } from "./noisyleroi/NoisyLeRoiMessages.js"

type YvelinesCityMessages = { [key in YvelinesCityCode]: OrganizationMessages }
export const yvelinesCityMessages: YvelinesCityMessages = {
  [YvelinesCityCode.NeauphleLeChateau]: neauphleLeChateauMessages,
  [YvelinesCityCode.NoisyLeRoi]: noisyLeRoiMessages,
  [YvelinesCityCode.MesnilLeRoi]: mesnilLeRoiMessages
}
export const yvelinesMessages = DepartmentMessages.create<YvelinesCityMessages>("Yvelines", yvelinesCityMessages)
