import { PyreneesAtlantiquesCityCode } from "./PyreneesAtlantiquesCityCode.js"
import { magneMessages } from "./Magne/MagneMessages.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"

type DepMessages = { [key in PyreneesAtlantiquesCityCode]: OrganizationMessages }
export const pyreneesAtlantiquesMessages = new DepartmentMessages<DepMessages>(
  ["Pyrénées-Atlantiques", "Basses-Pyrénées"], {
    [PyreneesAtlantiquesCityCode.Magne]: magneMessages
  })
