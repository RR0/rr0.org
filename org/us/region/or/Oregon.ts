import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { usa } from "../../Usa"
import { Region } from "../../../country/region/Region"

export const oregon = new Region(UsaStates.or, usa,
  [Place.fromDMS("42°0'N,116°28'W"), Place.fromDMS("46°18'N,124°38'W")])
