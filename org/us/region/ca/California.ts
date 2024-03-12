import { UsaStates } from "../UsaStates"
import { Place } from "../../../../place/Place"
import { usaRegion } from "../../Usa"

export const california = usaRegion(
  UsaStates.ca,
  Place.fromLocation(47.466667, 0.833333)
)
