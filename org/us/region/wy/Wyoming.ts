import { Place } from "place/Place.js"
import { UsaStates } from "../UsaStates.js"
import { usa } from "../../Usa.js"
import { Region } from "../../../country/region/Region.js"

export const wyoming = new Region(UsaStates.wy, usa,
  [Place.fromDMS("41°0'N,104°03′W"), Place.fromDMS("45°0'N,111°03′W")])
