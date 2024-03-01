import { RegionMessages } from "../../country/region/RegionMessages"
import { AuvergneRhoneAlpesDepartmentMessagesList } from "./region/ara/AuvergneRhoneAlpesDepartmentMessagesList"
import { BourgogneFrancheComteDepartmentMessagesList } from "./region/bfc/BourgogneFrancheComteDepartmentMessagesList"
import { PacaDepartementCode } from "./region/pac/PacaDepartementCode"
import { DepartmentMessages } from "../../country/region/department/DepartmentMessages"
import { OccitanieDepartementCode } from "./region/occ/OccitanieDepartementCode"
import { NouvelleAquitaineDepartmentCode } from "./region/naq/NouvelleAquitaineDepartmentCode"
import { HautsDeFranceDepartmentCode } from "./region/hdf/HautsDeFranceDepartmentCode"
import { NormandieDepartmentCode } from "./region/nor/NormandieDepartmentCode"
import { IdfDepartmentCode } from "./region/idf/IdfDepartmentCode"
import { PaysDeLoireDepartementCode } from "./region/pdl/PaysDeLoireDepartementCode"
import { GrandEstDepartementCode } from "./region/ges/GrandEstDepartementCode"
import { LaReunionDepartementCode } from "./region/lre/LaReunionDepartementCode"
import { FrenchOrganizationMessages } from "./FrenchOrganization"

export type FranceRegionsMessagesList = {
  ara: RegionMessages<AuvergneRhoneAlpesDepartmentMessagesList>
  bfc: RegionMessages<BourgogneFrancheComteDepartmentMessagesList>
  ges: RegionMessages<{ [key in GrandEstDepartementCode]: DepartmentMessages }>
  idf: RegionMessages<{ [key in IdfDepartmentCode]: DepartmentMessages }>
  hdf: RegionMessages<{ [key in HautsDeFranceDepartmentCode]: DepartmentMessages }>
  lre: RegionMessages<{ [key in LaReunionDepartementCode]: DepartmentMessages }>
  nor: RegionMessages<{ [key in NormandieDepartmentCode]: DepartmentMessages }>
  pac: RegionMessages<{ [key in PacaDepartementCode]: DepartmentMessages }>
  pdl: RegionMessages<{ [key in PaysDeLoireDepartementCode]: DepartmentMessages }>
  naq: RegionMessages<{ [key in NouvelleAquitaineDepartmentCode]: DepartmentMessages }>
  occ: RegionMessages<{ [key in OccitanieDepartementCode]: DepartmentMessages }>
}

export class FranceMessages extends FrenchOrganizationMessages {

  constructor(...titles: string[]) {
    super(...titles)
  }
}
