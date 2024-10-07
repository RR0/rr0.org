import { NordCityCode } from "./NordCityCode.js"
import { aniche59Messages } from "./Aniche/AnicheMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"
import { thiantMessages } from "./Thiant/ThiantMessages.js"
import { jeumontMessages } from "./Jeumont/JeumontMessages.js"
import { avesnesLesAubertMessages } from "./AvesnesLesAubert/AvesnesLesAubertMessages.js"

type NordCityMessagesList = { [key in NordCityCode]: CityMessages }
export const nordMessages = DepartmentMessages.create<NordCityMessagesList>("Nord", {
  [NordCityCode.Aniche]: aniche59Messages,
  [NordCityCode.AvesnesLesAubert]: avesnesLesAubertMessages,
  [NordCityCode.Jeumont]: jeumontMessages,
  [NordCityCode.Thiant]: thiantMessages
})
