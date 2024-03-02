import { Place } from "../../../../../../../place/Place"
import { PkCityCode } from "../PkCityCode"
import { City } from "../../../../../../country/region/department/city/City"
import { finlandDepartments } from "../../../FinlandDepartments"

export let lieksa = new City(PkCityCode.Kieksa, finlandDepartments.pk, [Place.fromDMS("63°19′05″N,030°01′30″E")])
