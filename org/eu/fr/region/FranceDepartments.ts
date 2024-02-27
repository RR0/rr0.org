import { araDepartments } from "./ara/AraDepartments"
import { idfDepartments } from "./idf/IdfDepartments"
import { norDepartments } from "./nor/NorDepartments"
import { pacDepartments } from "./pac/PacDepartments"
import { naqDepartments } from "./naq/NaqDepartments"
import { pdlDepartments } from "./pdl/PdlDepartments"

export const franceDepartments = {
  ...araDepartments,
  ...idfDepartments,
  ...norDepartments,
  ...pacDepartments,
  ...naqDepartments,
  ...pdlDepartments
}
