import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { usa } from "../../Usa"
import { Region } from "../../../country/region/Region"

export const minnesota = new Region(UsaStates.mn, usa,
  [Place.fromDMS("43°34'N,89°34'W"), Place.fromDMS("49°23'N,97°12'W")])
