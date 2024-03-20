import { VendeeCityCode } from "./VendeeCityCode"
import { chantonnayMessages } from "./Chantonnay/ChantonnayMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

type DepCityList<T> = { [key in VendeeCityCode]: T }
const depCityMessages: DepCityList<OrganizationMessages> = {
  [VendeeCityCode.Chantonnay]: chantonnayMessages
}
export const vendeeMessages = DepartmentMessages.create<DepCityList<OrganizationMessages>>("Vendée",
  depCityMessages)
