import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { usa } from "../../Usa"
import { Region } from "../../../country/region/Region"

export const maine = new Region(UsaStates.me, usa, [Place.fromDMS("43°04'N,66°57'W"), Place.fromDMS("47°28'N,71°07'W")])
