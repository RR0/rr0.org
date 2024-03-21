import { NordCityCode } from "./NordCityCode"
import { aniche59Messages } from "./Aniche/AnicheMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { thiantMessages } from "./Thiant/ThiantMessages"
import { jeumontMessages } from "./Jeumont/JeumontMessages"
import { avesnesLesAubertMessages } from "./AvesnesLesAubert/AvesnesLesAubertMessages"

type NordCityMessagesList = { [key in NordCityCode]: CityMessages }
export const nordMessages = DepartmentMessages.create<NordCityMessagesList>("Nord", {
  [NordCityCode.Aniche]: aniche59Messages,
  [NordCityCode.AvesnesLesAubert]: avesnesLesAubertMessages,
  [NordCityCode.Jeumont]: jeumontMessages,
  [NordCityCode.Thiant]: thiantMessages
})
