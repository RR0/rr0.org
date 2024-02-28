import { auvergneRhoneAlpesDepartments } from "./ara/AuvergneRhoneAlpesDepartments"
import { idfDepartments } from "./idf/IdfDepartments"
import { normandieDepartments } from "./nor/NormandieDepartments"
import { pacaDepartments } from "./pac/PacaDepartments"
import { nouvelleAquitaineDepartments } from "./naq/NouvelleAquitaineDepartments"
import { paysDeLoireDepartments } from "./pdl/PaysDeLoireDepartments"
import { bourgogneFrancheComteDepartments } from "./bfc/BourgogneFrancheComteDepartments"

export const franceDepartments = {
  ...auvergneRhoneAlpesDepartments,
  ...bourgogneFrancheComteDepartments,
  ...idfDepartments,
  ...normandieDepartments,
  ...nouvelleAquitaineDepartments,
  ...pacaDepartments,
  ...paysDeLoireDepartments
}
