import { Place } from "place/Place.js"
import { UsaStates } from "../UsaStates.js"
import { usa } from "../../Usa.js"
import { Region } from "../../../country/region/Region.js"

export const wisconsin = new Region(UsaStates.wi, usa,
  [Place.fromDMS("42°30′N 86°46′W"), Place.fromDMS(`47°05′N,92°54′W`)])
