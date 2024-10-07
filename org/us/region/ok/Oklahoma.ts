import { Place } from "place/Place.js"
import { UsaStates } from "../UsaStates.js"
import { usa } from "../../Usa.js"
import { Region } from "../../../country/region/Region.js"

export const oklahoma = new Region(UsaStates.ok, usa, [Place.fromDMS("33°0'N,90°0'W")])
