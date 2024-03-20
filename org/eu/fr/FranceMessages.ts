import { RegionMessages } from "../../country/region/RegionMessages"
import { PacaDepartementCode } from "./region/pac/PacaDepartementCode"
import { OccitanieDepartementCode } from "./region/occ/OccitanieDepartementCode"
import { NouvelleAquitaineDepartmentCode } from "./region/naq/NouvelleAquitaineDepartmentCode"
import { HautsDeFranceDepartmentCode } from "./region/hdf/HautsDeFranceDepartmentCode"
import { NormandieDepartmentCode } from "./region/nor/NormandieDepartmentCode"
import { IdfDepartmentCode } from "./region/idf/IdfDepartmentCode"
import { PaysDeLoireDepartementCode } from "./region/pdl/PaysDeLoireDepartementCode"
import { GrandEstDepartementCode } from "./region/ges/GrandEstDepartementCode"
import { LaReunionDepartementCode } from "./region/lre/LaReunionDepartementCode"
import { FrenchOrganizationMessages } from "./FrenchOrganization"
import { DepartmentMessages } from "../../country/region/department/DepartmentMessages"
import { CentreValDeLoireDepartementCode } from "./region/cvl/CentreValDeLoireDepartementCode"
import { AuvergneRhoneAlpesDepartementCode } from "./region/ara/AuvergneRhoneAlpesDepartementCode"
import { BourgogneFrancheComteDepartementCode } from "./region/bfc/BourgogneFrancheComteDepartementCode"
import { BretagneDepartementCode } from "./region/bre/BretagneDepartementCode"
import { CollectiviteOutreMerDepartementCode } from "./region/com/CollectiviteOutreMerDepartementCode"

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
