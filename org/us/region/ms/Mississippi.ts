import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { usa } from "../../Usa"
import { Region } from "../../../country/region/Region"

export const mississippi = new Region(UsaStates.ms, usa, [Place.fromDMS("33°0'N,90°0'W")])
