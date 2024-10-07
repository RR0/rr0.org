import { Place } from "place/Place.js"
import { UsaStates } from "../UsaStates.js"
import { usa } from "../../Usa.js"
import { Region } from "../../../country/region/Region.js"

export const newHampshire = new Region(UsaStates.nh, usa,
  [Place.fromDMS("42°42'N,70°36'W"), Place.fromDMS("45°18'N,72°33'W")])
