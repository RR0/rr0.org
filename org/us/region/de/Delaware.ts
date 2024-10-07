import { Place } from "place/Place.js"
import { UsaStates } from "../UsaStates.js"
import { usa } from "../../Usa.js"
import { Region } from "../../../country/region/Region.js"

export const delaware = new Region(UsaStates.de, usa,
  [Place.fromDMS("38°27'N,75°02'W"), Place.fromDMS("39°50'N,75°47'W")])
