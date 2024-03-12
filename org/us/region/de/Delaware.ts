import { Place } from "place/Place"
import { UsaSates } from "../UsaSates"
import { usa } from "../../Usa"
import { Region } from "../../../country/region/Region"

export const delaware = new Region(UsaSates.de, usa,
  [Place.fromDMS("38°27'N,75°02'W"), Place.fromDMS("39°50'N,75°47'W")])
