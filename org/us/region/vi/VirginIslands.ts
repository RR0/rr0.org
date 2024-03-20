import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { usa } from "../../Usa"
import { Region } from "../../../country/region/Region"

export const virginIslands = new Region(UsaStates.vi, usa, [Place.fromDMS("18°34′N 64°90′W")])
