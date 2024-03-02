import { NordCityCode } from "./NordCityCode"
import { aniche60Messages } from "./aniche/AnicheMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/city/DepartmentMessages"

type NordCityMessagesList = { [key in NordCityCode]: OrganizationMessages }
const nordCityMessages: NordCityMessagesList = {
  [NordCityCode.Aniche]: aniche60Messages
}
export const nordMessages = DepartmentMessages.create<NordCityMessagesList>("Nord", nordCityMessages)
