import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { collectiviteOutreMer } from "../CollectiviteOutreMer"
import { Department } from "../../../../../country/region/department/Department"

export const nouvelleCaledonie = Department.create(FranceDepartementCode.NouvelleCaledonie, collectiviteOutreMer,
  Place.fromDMS(`21°15′S,165°18′E`))
