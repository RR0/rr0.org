import { Place } from "../../../../../../place/Place"
import { City } from "../../../../../country/region/department/city/City"
import { finlandDepartments } from "../../FinlandDepartments"

export function createCity(zipCode: string, place: Place): City {
  return new City(zipCode, place, finlandDepartments.pk)
}
