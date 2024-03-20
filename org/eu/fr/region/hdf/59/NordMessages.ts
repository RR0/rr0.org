import { NordCityCode } from "./NordCityCode"
import { aniche59Messages } from "./aniche/AnicheMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { thiantMessages } from "./thiant/ThiantMessages"
import { jeumontMessages } from "./jeumont/JeumontMessages"

type NordCityMessagesList = { [key in NordCityCode]: CityMessages }
const nordCityMessages: NordCityMessagesList = {
  [NordCityCode.Aniche]: aniche59Messages,
  [NordCityCode.Jeumont]: jeumontMessages,
  [NordCityCode.Thiant]: thiantMessages
}
export const nordMessages = DepartmentMessages.create<NordCityMessagesList>("Nord", nordCityMessages)
