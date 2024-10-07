import { Place } from "../../../../../../../place/Place.js"
import { CotesDArmorCityCode } from "../CotesDArmorCityCode.js"
import { City } from "../../../../../../country/region/department/city/City.js"
import { cotesDArmor } from "../CotesDArmor.js"

export const binic = new City(CotesDArmorCityCode.Binic, cotesDArmor,
  [Place.fromDMS("48°36′09″N,2°49′27″W"), Place.fromDMS("48°37′38″N,2°50′02″W")])
