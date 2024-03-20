import { Place } from "../../../../../../../place/Place"
import { NouvelleCaledonieCityCode } from "../NouvelleCaledonieCityCode"
import { City } from "../../../../../../country/region/department/city/City"
import { nouvelleCaledonie } from "../NouvelleCaledonie"

export const noumea = City.create(NouvelleCaledonieCityCode.Noumea, nouvelleCaledonie,
  Place.fromDMS("22°16′33″S,166°27′29″E"))
