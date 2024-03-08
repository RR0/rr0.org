import { eyraguesMessages } from "./eyragues/EyraguesMessages"
import { BouchesDuRhoneCityCode } from "./BouchesDuRhoneCityCode"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

type BouchesDuRhoneCityList<T> = { [key in BouchesDuRhoneCityCode]: T }
const bouchesDuRhoneCityMessages: BouchesDuRhoneCityList<OrganizationMessages> = {
  [BouchesDuRhoneCityCode.Eyragues]: eyraguesMessages
}
export const bouchesDuRhoneMessages = DepartmentMessages.create<BouchesDuRhoneCityList<OrganizationMessages>>(
  "Bouches-du-Rhône",
  bouchesDuRhoneCityMessages)
