import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { usa } from "../../Usa"
import { Region } from "../../../country/region/Region"

export const arkansas = new Region(UsaStates.ak, usa,
  [Place.fromDMS("33°0'N,89°41'W"), Place.fromDMS("36°30'N,94°42'W")])
