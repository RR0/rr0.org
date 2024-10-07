import { Place } from "place/Place.js"
import { UsaStates } from "../UsaStates.js"
import { usa } from "../../Usa.js"
import { Region } from "../../../country/region/Region.js"

export const vermont = new Region(UsaStates.vt, usa, [Place.fromDMS("37°0′N,109°0′W"), Place.fromDMS("42°0′N,114°0′W")])
