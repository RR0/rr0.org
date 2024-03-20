import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { usa } from "../../Usa"
import { Region } from "../../../country/region/Region"

export const utah = new Region(UsaStates.ut, usa, [Place.fromDMS("37°0′N,109°0′W"), Place.fromDMS("42°0′N,114°0′W")])
