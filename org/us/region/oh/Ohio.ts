import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { usa } from "../../Usa"
import { Region } from "../../../country/region/Region"

export const ohio = new Region(UsaStates.oh, usa, [Place.fromDMS("38°24'N,80°31'W"), Place.fromDMS("41°59'N,84°49'W")])
