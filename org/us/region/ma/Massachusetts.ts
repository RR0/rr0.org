import { Place } from "place/Place.js"
import { UsaStates } from "../UsaStates.js"
import { usa } from "../../Usa.js"
import { Region } from "../../../country/region/Region.js"

export const massachusetts = new Region(UsaStates.ma, usa,
  [Place.fromDMS("41°10'N,68°57'W"), Place.fromDMS("42°53'N,73°30'W")])
