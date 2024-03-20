import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { usa } from "../../Usa"
import { Region } from "../../../country/region/Region"

export const puertoRico = new Region(UsaStates.pr, usa, [Place.fromDMS("18°15′N,66°30′O")])
