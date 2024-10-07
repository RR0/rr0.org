import { RegionMessages } from "../../country/region/RegionMessages.js"
import { PacaDepartementCode } from "./region/pac/PacaDepartementCode.js"
import { OccitanieDepartementCode } from "./region/occ/OccitanieDepartementCode.js"
import { NouvelleAquitaineDepartmentCode } from "./region/naq/NouvelleAquitaineDepartmentCode.js"
import { HautsDeFranceDepartmentCode } from "./region/hdf/HautsDeFranceDepartmentCode.js"
import { NormandieDepartmentCode } from "./region/nor/NormandieDepartmentCode.js"
import { IdfDepartmentCode } from "./region/idf/IdfDepartmentCode.js"
import { PaysDeLoireDepartementCode } from "./region/pdl/PaysDeLoireDepartementCode.js"
import { GrandEstDepartementCode } from "./region/ges/GrandEstDepartementCode.js"
import { LaReunionDepartementCode } from "./region/lre/LaReunionDepartementCode.js"
import { FrenchOrganizationMessages } from "./FrenchOrganization.js"
import { DepartmentMessages } from "../../country/region/department/DepartmentMessages.js"
import { CentreValDeLoireDepartementCode } from "./region/cvl/CentreValDeLoireDepartementCode.js"
import { AuvergneRhoneAlpesDepartementCode } from "./region/ara/AuvergneRhoneAlpesDepartementCode.js"
import { BourgogneFrancheComteDepartementCode } from "./region/bfc/BourgogneFrancheComteDepartementCode.js"
import { BretagneDepartementCode } from "./region/bre/BretagneDepartementCode.js"
import { CollectiviteOutreMerDepartementCode } from "./region/com/CollectiviteOutreMerDepartementCode.js"

export type FranceRegionsMessagesList = {
  ara: RegionMessages<{ [key in AuvergneRhoneAlpesDepartementCode]: DepartmentMessages<any> }>
  bfc: RegionMessages<{ [key in BourgogneFrancheComteDepartementCode]: DepartmentMessages<any> }>
  bre: RegionMessages<{ [key in BretagneDepartementCode]: DepartmentMessages<any> }>
  com: RegionMessages<{ [key in CollectiviteOutreMerDepartementCode]: DepartmentMessages<any> }>
  cvl: RegionMessages<{ [key in CentreValDeLoireDepartementCode]: DepartmentMessages<any> }>
  ges: RegionMessages<{ [key in GrandEstDepartementCode]: DepartmentMessages<any> }>
  idf: RegionMessages<{ [key in IdfDepartmentCode]: DepartmentMessages<any> }>
  hdf: RegionMessages<{ [key in HautsDeFranceDepartmentCode]: DepartmentMessages<any> }>
  lre: RegionMessages<{ [key in LaReunionDepartementCode]: DepartmentMessages<any> }>
  nor: RegionMessages<{ [key in NormandieDepartmentCode]: DepartmentMessages<any> }>
  pac: RegionMessages<{ [key in PacaDepartementCode]: DepartmentMessages<any> }>
  pdl: RegionMessages<{ [key in PaysDeLoireDepartementCode]: DepartmentMessages<any> }>
  naq: RegionMessages<{ [key in NouvelleAquitaineDepartmentCode]: DepartmentMessages<any> }>
  occ: RegionMessages<{ [key in OccitanieDepartementCode]: DepartmentMessages<any> }>
}

export class FranceMessages extends FrenchOrganizationMessages {

  constructor(...titles: string[]) {
    super(...titles)
  }
}
