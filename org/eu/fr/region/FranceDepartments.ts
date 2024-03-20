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
import { Department } from "../../../country/region/department/Department"
import { FranceDepartementCode } from "./FranceDepartementCode"
import { Place } from "../../../../place/Place"
import { Region } from "../../../country/region/Region"
import { centreValDeLoireDepartments } from "./cvl/CentreValDeLoireDepartments"
import { guadeloupeDepartments } from "./gua/GuadeloupeDepartments"
import { bretagneDepartments } from "./bre/BretagneDepartments"
import { martiniqueDepartments } from "./mtq/MartiniqueDepartments"
import { collectiviteOutreMerDepartments } from "./com/CollectiviteOutreMerDepartments"

export const franceDepartments: Department[] = [
  ...auvergneRhoneAlpesDepartments,
  ...bourgogneFrancheComteDepartments,
  ...bretagneDepartments,
  ...centreValDeLoireDepartments,
  ...grandEstDepartments,
  ...guadeloupeDepartments,
  ...idfDepartments,
  ...hautsDeFranceDepartments,
  ...laReunionDepartments,
  ...martiniqueDepartments,
  ...normandieDepartments,
  ...nouvelleAquitaineDepartments,
  ...collectiviteOutreMerDepartments,
  ...occitanieDepartments,
  ...pacaDepartments,
  ...paysDeLoireDepartments
]

export function franceDepartment(code: FranceDepartementCode, region: Region, place: Place) {
  return Department.create(code, region, place)
}
