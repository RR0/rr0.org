import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { usa } from "../../Usa"
import { Region } from "../../../country/region/Region"

export const delaware = new Region(UsaStates.de, usa,
  [Place.fromDMS("38°27'N,75°02'W"), Place.fromDMS("39°50'N,75°47'W")])
