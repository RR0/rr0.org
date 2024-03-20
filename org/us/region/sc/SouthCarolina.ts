import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { usa } from "../../Usa"
import { Region } from "../../../country/region/Region"

export const southCarolina = new Region(UsaStates.sc, usa,
  [Place.fromDMS("32°02′N,78°32′O"), Place.fromDMS("35°13′N,83°21′O")])
