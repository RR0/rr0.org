import { usaRegion } from "../UsaRegion"
import { UsaRegionCode } from "../UsaRegionCode"
import { Place } from "../../../../place/Place"

export const california = usaRegion(
  UsaRegionCode.ca,
  Place.fromLocation(47.466667, 0.833333)
)
