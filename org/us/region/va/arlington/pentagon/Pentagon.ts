import { arlington } from "../Arlington"
import { Place } from "../../../../../../place/Place"
import { City } from "../../../../../country/region/department/city/City"
import { ArlingtonCityCode } from "../ArlingtonCityCode"

export let pentagon = new City(ArlingtonCityCode.Pentagon, arlington, [Place.fromDMS("38°52′15″N,77°03′18″W")])
