import { VendeeCityCode } from "./VendeeCityCode.js"
import { chantonnayMessages } from "./Chantonnay/ChantonnayMessages.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"

type DepCityList<T> = { [key in VendeeCityCode]: T }
const depCityMessages: DepCityList<OrganizationMessages> = {
  [VendeeCityCode.Chantonnay]: chantonnayMessages
}
export const vendeeMessages = DepartmentMessages.create<DepCityList<OrganizationMessages>>("Vendée",
  depCityMessages)
