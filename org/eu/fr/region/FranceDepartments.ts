import { auvergneRhoneAlpesDepartments } from "./ara/AuvergneRhoneAlpesDepartments"
import { idfDepartments } from "./idf/IdfDepartments"
import { normandieDepartments } from "./nor/NormandieDepartments"
import { pacaDepartments } from "./pac/PacaDepartments"
import { nouvelleAquitaineDepartments } from "./naq/NouvelleAquitaineDepartments"
import { paysDeLoireDepartments } from "./pdl/PaysDeLoireDepartments"
import { bourgogneFrancheComteDepartments } from "./bfc/BourgogneFrancheComteDepartments"
import { occitanieDepartments } from "./occ/OccitanieDepartments"
import { hautsDeFranceDepartments } from "./hdf/HautsDeFranceDepartments"
import { grandEstDepartments } from "./ges/GrandEstDepartments"
import { laReunionDepartments } from "./lre/LaReunionDepartments"
import { Organization } from "../../../Organization"

export const franceDepartments: Organization[] = [
  ...auvergneRhoneAlpesDepartments,
  ...bourgogneFrancheComteDepartments,
  ...grandEstDepartments,
  ...idfDepartments,
  ...hautsDeFranceDepartments,
  ...laReunionDepartments,
  ...normandieDepartments,
  ...nouvelleAquitaineDepartments,
  ...occitanieDepartments,
  ...pacaDepartments,
  ...paysDeLoireDepartments
]
