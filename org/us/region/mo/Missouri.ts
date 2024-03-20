import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { usa } from "../../Usa"
import { Region } from "../../../country/region/Region"

export const missouri = new Region(UsaStates.mo, usa,
  [Place.fromDMS("36°0'N,89°6'W"), Place.fromDMS("40°37'N,95°46'W")])
