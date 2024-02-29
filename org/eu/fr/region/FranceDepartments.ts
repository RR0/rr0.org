import { auvergneRhoneAlpesDepartments } from "./ara/AuvergneRhoneAlpesDepartments"
import { idfDepartments } from "./idf/IdfDepartments"
import { normandieDepartments } from "./nor/NormandieDepartments"
import { pacaDepartments } from "./pac/PacaDepartments"
import { nouvelleAquitaineDepartments } from "./naq/NouvelleAquitaineDepartments"
import { paysDeLoireDepartments } from "./pdl/PaysDeLoireDepartments"
import { bourgogneFrancheComteDepartments } from "./bfc/BourgogneFrancheComteDepartments"
import { occitanieDepartments } from "./occ/OccitanieDepartments"
import { Department } from "../../../country/region/department/Department"
import { hautsDeFranceDepartments } from "./hdf/HautsDeFranceDepartments"

export const franceDepartments: Department[] = [
  ...auvergneRhoneAlpesDepartments,
  ...bourgogneFrancheComteDepartments,
  ...idfDepartments,
  ...hautsDeFranceDepartments,
  ...normandieDepartments,
  ...nouvelleAquitaineDepartments,
  ...occitanieDepartments,
  ...pacaDepartments,
  ...paysDeLoireDepartments
]
