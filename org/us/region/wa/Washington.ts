import { Place } from "place/Place"
import { usaRegion } from "../UsaRegion"
import { UsaRegionCode } from "../UsaRegionCode"
import { PlaceLocation } from "../../../../place/PlaceLocation"

export const washington = usaRegion(UsaRegionCode.wa,
  new Place([PlaceLocation.fromDMS("45°33′ N,116°55′ W"), PlaceLocation.fromDMS("49°0' N,124°46′ W")]))
