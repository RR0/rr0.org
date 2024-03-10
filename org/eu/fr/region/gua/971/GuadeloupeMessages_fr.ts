import { GuadeloupeCityCode } from "./GuadeloupeCityCode"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { stBenoit974Messages } from "./stbenoit/SaintBenoitMessages"

type LaReunionCityMessages = { [key in GuadeloupeCityCode]: OrganizationMessages }
export const guadeloupeCityMessages_fr: LaReunionCityMessages = {
  [GuadeloupeCityCode.StBenoit]: stBenoit974Messages
}
export const guadeloupe971Messages_fr = DepartmentMessages.create<LaReunionCityMessages>("Guadeloupe",
  guadeloupeCityMessages_fr)
