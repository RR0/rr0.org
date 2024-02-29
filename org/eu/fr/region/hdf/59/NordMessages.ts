import { NordCityCode } from "./NordCityCode"
import { aniche60Messages } from "./aniche/AnicheMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

type NordCityMessagesList = { [key in NordCityCode]: CityMessages }

const nordCityMessages: NordCityMessagesList = {
  [NordCityCode.Aniche]: aniche60Messages
}

export const nordMessages = new DepartmentMessages<NordCityMessagesList>("Nord", nordCityMessages)
