import { City } from "../../../../../country/region/department/city/City"
import { Place } from "../../../../../../place/Place"
import { federalDistrict } from "../FederalDistrict"
import { FederalDistrictCityCode } from "../FederalDistrictCityCode"

export let brasilia = new City(FederalDistrictCityCode.Brasilia, Place.fromDMS("15°47′38″S,47°52′58″W"),
  federalDistrict)
