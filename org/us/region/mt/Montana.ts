import { Place } from "place/Place.js"
import { UsaStates } from "../UsaStates.js"
import { usa } from "../../Usa.js"
import { Region } from "../../../country/region/Region.js"

export const montana = new Region(UsaStates.mt, usa,
  [Place.fromDMS("44°21'N,104°2'W"), Place.fromDMS("49°0'N,116°3'W")])
