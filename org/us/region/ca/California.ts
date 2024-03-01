import { UsaRegionCode } from "../UsaRegionCode"
import { Place } from "../../../../place/Place"
import { usaRegion } from "../../Usa"

export const california = usaRegion(
  UsaRegionCode.ca,
  Place.fromLocation(47.466667, 0.833333)
)
