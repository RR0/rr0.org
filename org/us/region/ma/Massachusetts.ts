import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { usa } from "../../Usa"
import { Region } from "../../../country/region/Region"

export const massachusetts = new Region(UsaStates.ma, usa,
  [Place.fromDMS("41°10'N,68°57'W"), Place.fromDMS("42°53'N,73°30'W")])
