import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { usa } from "../../Usa"
import { Region } from "../../../country/region/Region"

export const maryland = new Region(UsaStates.md, usa,
  [Place.fromDMS("37°53'N,75°03'W"), Place.fromDMS("39°43'N,79°29'W")])
