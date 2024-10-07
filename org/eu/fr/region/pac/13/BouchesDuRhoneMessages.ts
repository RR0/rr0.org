import { eyraguesMessages } from "./eyragues/EyraguesMessages.js"
import { BouchesDuRhoneCityCode } from "./BouchesDuRhoneCityCode.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"

type BouchesDuRhoneCityList<T> = { [key in BouchesDuRhoneCityCode]: T }
const bouchesDuRhoneCityMessages: BouchesDuRhoneCityList<OrganizationMessages> = {
  [BouchesDuRhoneCityCode.Eyragues]: eyraguesMessages
}
export const bouchesDuRhoneMessages = DepartmentMessages.create<BouchesDuRhoneCityList<OrganizationMessages>>(
  "Bouches-du-Rhône",
  bouchesDuRhoneCityMessages)
