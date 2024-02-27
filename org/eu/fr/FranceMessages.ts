import { RegionMessages } from "../../country/region/RegionMessages"
import { AraDepartmentMessagesList } from "./region/ara/AraDepartmentMessagesList"
import { IdfDepartmentMessagesList } from "./region/idf/IdfDepartementMessages_fr"
import { PdlDepartmentMessagesList } from "./region/pdl/PdlDepartmentMessagesList"
import { PacDepartmentMessagesList } from "./region/pac/PacVilleMessagesList"
import { NorDepartmentMessagesList } from "./region/nor/NorMessages_fr"
import { NaqDepartmentMessagesList } from "./region/naq/NaqDepartmentMessagesList"

export type FranceRegionsMessagesList = {
  ara: RegionMessages<AraDepartmentMessagesList>
  idf: RegionMessages<IdfDepartmentMessagesList>
  nor: RegionMessages<NorDepartmentMessagesList>
  pac: RegionMessages<PacDepartmentMessagesList>
  pdl: RegionMessages<PdlDepartmentMessagesList>
  naq: RegionMessages<NaqDepartmentMessagesList>
}
