import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { usa } from "../../Usa"
import { Region } from "../../../country/region/Region"

export const newHampshire = new Region(UsaStates.nh, usa,
  [Place.fromDMS("42°42'N,70°36'W"), Place.fromDMS("45°18'N,72°33'W")])
