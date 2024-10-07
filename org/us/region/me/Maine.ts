import { Place } from "place/Place.js"
import { UsaStates } from "../UsaStates.js"
import { usa } from "../../Usa.js"
import { Region } from "../../../country/region/Region.js"

export const maine = new Region(UsaStates.me, usa, [Place.fromDMS("43°04'N,66°57'W"), Place.fromDMS("47°28'N,71°07'W")])
