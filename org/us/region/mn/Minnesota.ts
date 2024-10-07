import { Place } from "place/Place.js"
import { UsaStates } from "../UsaStates.js"
import { usa } from "../../Usa.js"
import { Region } from "../../../country/region/Region.js"

export const minnesota = new Region(UsaStates.mn, usa,
  [Place.fromDMS("43°34'N,89°34'W"), Place.fromDMS("49°23'N,97°12'W")])
