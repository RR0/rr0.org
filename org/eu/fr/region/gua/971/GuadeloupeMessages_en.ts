import { GuadeloupeCityCode } from "./GuadeloupeCityCode"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { stBenoit974Messages } from "./stbenoit/SaintBenoitMessages"

type GuadeloupeMessages_en = { [key in GuadeloupeCityCode]: OrganizationMessages }
const guadeloupeCityMessages_en: GuadeloupeMessages_en = {
  [GuadeloupeCityCode.StBenoit]: stBenoit974Messages
}
export const guadeloupe971Messages_en = DepartmentMessages.create<GuadeloupeMessages_en>("Guadeloupe",
  guadeloupeCityMessages_en)
