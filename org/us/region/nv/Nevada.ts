import { Place } from "place/Place.js"
import { UsaStates } from "../UsaStates.js"
import { usa } from "../../Usa.js"
import { Region } from "../../../country/region/Region.js"

export const nevada = new Region(UsaStates.nv, usa,
  [Place.fromDMS("35°0'N,114°2'W"), Place.fromDMS("42°0'N,120°0'W")])
