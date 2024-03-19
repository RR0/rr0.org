import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { usa } from "../../Usa"
import { Region } from "../../../country/region/Region"

export const michigan = new Region(UsaStates.mi, usa,
  [Place.fromDMS("41°41'N,82°7'W"), Place.fromDMS("48°18'N,90°25'W")])
