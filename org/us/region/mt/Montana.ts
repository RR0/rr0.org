import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { usa } from "../../Usa"
import { Region } from "../../../country/region/Region"

export const montana = new Region(UsaStates.mt, usa,
  [Place.fromDMS("44°21'N,104°2'W"), Place.fromDMS("49°0'N,116°3'W")])
