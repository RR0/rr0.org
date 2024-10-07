import { ukCity } from "../../../RussiaCities.js"
import { Place } from "../../../../../../place/Place.js"
import { KabardinoBalkariaCityCode } from "../KabardinoBalkariaCityCode.js"
import { kabardinoBalkaria } from "../KabardinoBalkaria.js"

export const mountElbrus = ukCity(KabardinoBalkariaCityCode.Elbrus, kabardinoBalkaria,
  Place.fromDMS("43°21′18″N,42°26′21″E"))
