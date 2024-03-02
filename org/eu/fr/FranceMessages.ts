import { RegionMessages } from "../../country/region/RegionMessages"
import { AuvergneRhoneAlpesDepartmentMessagesList } from "./region/ara/AuvergneRhoneAlpesDepartmentMessagesList"
import { BourgogneFrancheComteDepartmentMessagesList } from "./region/bfc/BourgogneFrancheComteDepartmentMessagesList"
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
import { DepartmentMessages } from "../../country/region/department/city/DepartmentMessages"

export type FranceRegionsMessagesList = {
  ara: RegionMessages<AuvergneRhoneAlpesDepartmentMessagesList>
  bfc: RegionMessages<BourgogneFrancheComteDepartmentMessagesList>
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
