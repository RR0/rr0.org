import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { usa } from "../../Usa"
import { Region } from "../../../country/region/Region"

export const wisconsin = new Region(UsaStates.wi, usa,
  [Place.fromDMS("42°30′N 86°46′W"), Place.fromDMS(`47°05′N,92°54′W`)])
