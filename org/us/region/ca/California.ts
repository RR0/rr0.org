import { UsaStates } from "../UsaStates.js"
import { Place } from "../../../../place/Place.js"
import { usaRegion } from "../../Usa.js"

export const california = usaRegion(
  UsaStates.ca,
  Place.fromLocation(47.466667, 0.833333)
)
