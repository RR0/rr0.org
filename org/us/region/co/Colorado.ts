import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { usa } from "../../Usa"
import { Region } from "../../../country/region/Region"

export const colorado = new Region(UsaStates.co, usa,
  [Place.fromDMS("37°0'N,102°0'W"), Place.fromDMS("41°0'N,109°0'W")])
