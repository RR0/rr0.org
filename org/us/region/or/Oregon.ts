import { Place } from "place/Place.js"
import { UsaStates } from "../UsaStates.js"
import { usa } from "../../Usa.js"
import { Region } from "../../../country/region/Region.js"

export const oregon = new Region(UsaStates.or, usa,
  [Place.fromDMS("42°0'N,116°28'W"), Place.fromDMS("46°18'N,124°38'W")])
