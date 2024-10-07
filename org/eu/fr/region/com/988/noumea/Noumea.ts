import { Place } from "../../../../../../../place/Place.js"
import { NouvelleCaledonieCityCode } from "../NouvelleCaledonieCityCode.js"
import { City } from "../../../../../../country/region/department/city/City.js"
import { nouvelleCaledonie } from "../NouvelleCaledonie.js"

export const noumea = City.create(NouvelleCaledonieCityCode.Noumea, nouvelleCaledonie,
  Place.fromDMS("22°16′33″S,166°27′29″E"))
