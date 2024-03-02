import { chambonMessages } from "./chambon/ChambonMessages"
import { CreuseCityCode } from "./CreuseCityCode"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/city/DepartmentMessages"

type CreuseCityMessagesList = { [key in CreuseCityCode]: OrganizationMessages }
const creuseCityMessages: CreuseCityMessagesList = {
  [CreuseCityCode.ChambonSurVoueize]: chambonMessages
}
export const creuseMessages = DepartmentMessages.create<CreuseCityMessagesList>("Creuse", creuseCityMessages)
