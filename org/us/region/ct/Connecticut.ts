import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { usa } from "../../Usa"
import { Region } from "../../../country/region/Region"

export const connecticut = new Region(UsaStates.ct, usa,
  [Place.fromDMS("40°58'N,71°47'W"), Place.fromDMS("42°03'N,73°44'W")])
