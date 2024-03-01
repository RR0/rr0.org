import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { YvelinesCityCode } from "./YvelinesCityCode"
import { neauphleLeChateauMessages } from "./neauphleLechateau/NeauphleLeChateauMessages"

export const yvelinesCityMessages: { [key in YvelinesCityCode]: CityMessages } = {
  [YvelinesCityCode.NeauphleLeChateau]: neauphleLeChateauMessages
}

export const yvelinesMessages = new DepartmentMessages("Yvelines", yvelinesCityMessages)
