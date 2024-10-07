import { Place } from "place/Place.js"
import { UsaStates } from "../UsaStates.js"
import { usa } from "../../Usa.js"
import { Region } from "../../../country/region/Region.js"

export const southCarolina = new Region(UsaStates.sc, usa,
  [Place.fromDMS("32°02′N,78°32′O"), Place.fromDMS("35°13′N,83°21′O")])
