import { City } from "../../../../../country/region/department/city/City"
import { Place } from "../../../../../../place/Place"
import { finlandDepartments } from "../../FinlandDepartments"

function createCity(zipCode: string, place: Place): City {
  return new City(zipCode, place, finlandDepartments.pk)
}

export const pkCities = {
  Lieksa: createCity("81700", Place.fromDMS("63°19′05″N,030°01′30″E"))
}
