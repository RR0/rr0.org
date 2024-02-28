import { RegionMessages } from "../../country/region/RegionMessages"
import { AuvergneRhoneAlpesDepartmentMessagesList } from "./region/ara/AuvergneRhoneAlpesDepartmentMessagesList"
import { IdfDepartmentMessagesList } from "./region/idf/IdfDepartementMessages_fr"
import { PdlDepartmentMessagesList } from "./region/pdl/PdlDepartmentMessagesList"
import { PacDepartmentMessagesList } from "./region/pac/PacVilleMessagesList"
import { NorDepartmentMessagesList } from "./region/nor/NorMessages_fr"
import { NaqDepartmentMessagesList } from "./region/naq/NaqDepartmentMessagesList"
import { OccitanieDepartmentMessagesList } from "./region/occ/OccitanieDepartmentMessagesList"
import { BourgogneFrancheComteDepartmentMessagesList } from "./region/bfc/BourgogneFrancheComteDepartmentMessagesList"

export type FranceRegionsMessagesList = {
  ara: RegionMessages<AuvergneRhoneAlpesDepartmentMessagesList>
  bfc: RegionMessages<BourgogneFrancheComteDepartmentMessagesList>
  idf: RegionMessages<IdfDepartmentMessagesList>
  nor: RegionMessages<NorDepartmentMessagesList>
  pac: RegionMessages<PacDepartmentMessagesList>
  pdl: RegionMessages<PdlDepartmentMessagesList>
  naq: RegionMessages<NaqDepartmentMessagesList>
  occ: RegionMessages<OccitanieDepartmentMessagesList>
}
