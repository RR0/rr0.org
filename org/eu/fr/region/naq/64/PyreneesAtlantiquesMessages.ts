import { PyreneesAtlantiquesCityCode } from "./PyreneesAtlantiquesCityCode"
import { magneMessages } from "./Magne/MagneMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

type DepMessages = { [key in PyreneesAtlantiquesCityCode]: OrganizationMessages }
export const pyreneesAtlantiquesMessages = new DepartmentMessages<DepMessages>(
  ["Pyrénées-Atlantiques", "Basses-Pyrénées"], {
    [PyreneesAtlantiquesCityCode.Magne]: magneMessages
  })
