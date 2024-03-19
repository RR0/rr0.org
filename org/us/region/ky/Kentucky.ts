import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { usa } from "../../Usa"
import { Region } from "../../../country/region/Region"

export const kentucky = new Region(UsaStates.ky, usa,
  [Place.fromDMS("36°30'N,81°58'W"), Place.fromDMS("39°09'N,89°34'W")])
