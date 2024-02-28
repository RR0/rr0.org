import { RegionMessages } from "../../country/region/RegionMessages"
import { AuvergneRhoneAlpesDepartmentMessagesList } from "./region/ara/AuvergneRhoneAlpesDepartmentMessagesList"
import { IdfDepartmentMessagesList } from "./region/idf/IdfDepartementMessages_fr"
import { PdlDepartmentMessagesList } from "./region/pdl/PdlDepartmentMessagesList"
import { NorDepartmentMessagesList } from "./region/nor/NorMessages_fr"
import { NaqDepartmentMessagesList } from "./region/naq/NaqDepartmentMessagesList"
import { BourgogneFrancheComteDepartmentMessagesList } from "./region/bfc/BourgogneFrancheComteDepartmentMessagesList"
import { PacaDepartementCode } from "./region/pac/PacaDepartementCode"
import { DepartmentMessages } from "../../country/region/department/DepartmentMessages"
import { OccitanieDepartementCode } from "./region/occ/OccitanieDepartementCode"

export type FranceRegionsMessagesList = {
  ara: RegionMessages<AuvergneRhoneAlpesDepartmentMessagesList>
  bfc: RegionMessages<BourgogneFrancheComteDepartmentMessagesList>
  idf: RegionMessages<IdfDepartmentMessagesList>
  nor: RegionMessages<NorDepartmentMessagesList>
  pac: RegionMessages<{ [key in PacaDepartementCode]: DepartmentMessages }>
  pdl: RegionMessages<PdlDepartmentMessagesList>
  naq: RegionMessages<NaqDepartmentMessagesList>
  occ: RegionMessages<{ [key in OccitanieDepartementCode]: DepartmentMessages }>
}
