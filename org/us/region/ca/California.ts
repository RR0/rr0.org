import { UsaSates } from "../UsaSates"
import { Place } from "../../../../place/Place"
import { usaRegion } from "../../Usa"

export const california = usaRegion(
  UsaSates.ca,
  Place.fromLocation(47.466667, 0.833333)
)
