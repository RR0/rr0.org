import { RegionMessages } from "../../country/region/RegionMessages"
import { AuvergneRhoneAlpesDepartmentMessages } from "./region/ara/AuvergneRhoneAlpesDepartmentMessages"
import { IdfDepartmentMessagesList } from "./region/idf/IdfDepartementMessages_fr"
import { PdlDepartmentMessagesList } from "./region/pdl/PdlDepartmentMessagesList"
import { PacDepartmentMessagesList } from "./region/pac/PacVilleMessagesList"
import { NorDepartmentMessagesList } from "./region/nor/NorMessages_fr"
import { NaqDepartmentMessagesList } from "./region/naq/NaqDepartmentMessagesList"
import { BourgogneFrancheComteDepartementMessages } from "./region/bfc/BourgogneFrancheComteDepartmentMessages"

export type FranceRegionsMessagesList = {
  ara: RegionMessages<AuvergneRhoneAlpesDepartmentMessages>
  bfc: RegionMessages<BourgogneFrancheComteDepartementMessages>
  idf: RegionMessages<IdfDepartmentMessagesList>
  nor: RegionMessages<NorDepartmentMessagesList>
  pac: RegionMessages<PacDepartmentMessagesList>
  pdl: RegionMessages<PdlDepartmentMessagesList>
  naq: RegionMessages<NaqDepartmentMessagesList>
}
