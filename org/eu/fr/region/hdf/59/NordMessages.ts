import { NordCityCode } from "./NordCityCode"
import { aniche60Messages } from "./aniche/AnicheMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

type NordCityMessagesList = { [key in NordCityCode]: CityMessages }
const nordCityMessages: NordCityMessagesList = {
  [NordCityCode.Aniche]: aniche60Messages
}
export const nordMessages = DepartmentMessages.create<NordCityMessagesList>("Nord", nordCityMessages)
