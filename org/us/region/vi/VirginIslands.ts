import { Place } from "place/Place.js"
import { UsaStates } from "../UsaStates.js"
import { usa } from "../../Usa.js"
import { Region } from "../../../country/region/Region.js"

export const virginIslands = new Region(UsaStates.vi, usa, [Place.fromDMS("18°34′N 64°90′W")])
