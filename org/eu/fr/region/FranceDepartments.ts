import { auvergneRhoneAlpesDepartments } from "./ara/AuvergneRhoneAlpesDepartments.js"
import { idfDepartments } from "./idf/IdfDepartments.js"
import { normandieDepartments } from "./nor/NormandieDepartments.js"
import { pacaDepartments } from "./pac/PacaDepartments.js"
import { nouvelleAquitaineDepartments } from "./naq/NouvelleAquitaineDepartments.js"
import { paysDeLoireDepartments } from "./pdl/PaysDeLoireDepartments.js"
import { bourgogneFrancheComteDepartments } from "./bfc/BourgogneFrancheComteDepartments.js"
import { occitanieDepartments } from "./occ/OccitanieDepartments.js"
import { hautsDeFranceDepartments } from "./hdf/HautsDeFranceDepartments.js"
import { grandEstDepartments } from "./ges/GrandEstDepartments.js"
import { laReunionDepartments } from "./lre/LaReunionDepartments.js"
import { Department } from "../../../country/region/department/Department.js"
import { FranceDepartementCode } from "./FranceDepartementCode.js"
import { Place } from "../../../../place/Place.js"
import { Region } from "../../../country/region/Region.js"
import { centreValDeLoireDepartments } from "./cvl/CentreValDeLoireDepartments.js"
import { guadeloupeDepartments } from "./gua/GuadeloupeDepartments.js"
import { bretagneDepartments } from "./bre/BretagneDepartments.js"
import { martiniqueDepartments } from "./mtq/MartiniqueDepartments.js"
import { collectiviteOutreMerDepartments } from "./com/CollectiviteOutreMerDepartments.js"

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
