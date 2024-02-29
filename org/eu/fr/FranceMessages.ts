import { RegionMessages } from "../../country/region/RegionMessages"
import { AuvergneRhoneAlpesDepartmentMessagesList } from "./region/ara/AuvergneRhoneAlpesDepartmentMessagesList"
import { IdfDepartmentMessagesList } from "./region/idf/IdfDepartementMessages_fr"
import { PdlDepartmentMessagesList } from "./region/pdl/PdlDepartmentMessagesList"
import { NorDepartmentMessagesList } from "./region/nor/NorMessages_fr"
import { BourgogneFrancheComteDepartmentMessagesList } from "./region/bfc/BourgogneFrancheComteDepartmentMessagesList"
import { PacaDepartementCode } from "./region/pac/PacaDepartementCode"
import { DepartmentMessages } from "../../country/region/department/DepartmentMessages"
import { OccitanieDepartementCode } from "./region/occ/OccitanieDepartementCode"
import { NouvelleAquitaineDepartmentCode } from "./region/naq/NouvelleAquitaineDepartmentCode"
import { CountryMessages } from "../../country/CountryMessages"

export type FranceRegionsMessagesList = {
  ara: RegionMessages<AuvergneRhoneAlpesDepartmentMessagesList>
  bfc: RegionMessages<BourgogneFrancheComteDepartmentMessagesList>
  idf: RegionMessages<IdfDepartmentMessagesList>
  nor: RegionMessages<NorDepartmentMessagesList>
  pac: RegionMessages<{ [key in PacaDepartementCode]: DepartmentMessages }>
  pdl: RegionMessages<PdlDepartmentMessagesList>
  naq: RegionMessages<{ [key in NouvelleAquitaineDepartmentCode]: DepartmentMessages }>
  occ: RegionMessages<{ [key in OccitanieDepartementCode]: DepartmentMessages }>
}

export class FranceMessages extends CountryMessages<FranceRegionsMessagesList> {

  cityName(cityStr: string): string {
    let base = super.cityName(cityStr)
    if (base.toLowerCase().startsWith("saint")) {
      base = "St" + base.substring(5)
    }
    return base
  }
}
