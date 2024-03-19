import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { usa } from "../../Usa"
import { Region } from "../../../country/region/Region"

export const illinois = new Region(UsaStates.il, usa,
  [Place.fromDMS("36°58'N,42°30'W"), Place.fromDMS("87°30'N,91°30'W")])
