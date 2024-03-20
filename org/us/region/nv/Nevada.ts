import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { usa } from "../../Usa"
import { Region } from "../../../country/region/Region"

export const nevada = new Region(UsaStates.nv, usa,
  [Place.fromDMS("35°0'N,114°2'W"), Place.fromDMS("42°0'N,120°0'W")])
