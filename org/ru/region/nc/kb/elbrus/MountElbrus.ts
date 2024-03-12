import { ukCity } from "../../../RussiaCities"
import { Place } from "../../../../../../place/Place"
import { KabardinoBalkariaCityCode } from "../KabardinoBalkariaCityCode"
import { kabardinoBalkaria } from "../KabardinoBalkaria"

export const mountElbrus = ukCity(KabardinoBalkariaCityCode.Elbrus, kabardinoBalkaria,
  Place.fromDMS("43°21′18″N,42°26′21″E"))
