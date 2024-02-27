import { Place } from "place/Place"
import { usaRegion } from "../UsaRegion"
import { UsaRegionCode } from "../UsaRegionCode"
import { PlaceLocation } from "../../../../place/PlaceLocation"

export const florida = usaRegion(UsaRegionCode.fl,
  new Place([PlaceLocation.fromDMS("24°27'N,80° 02' W"), PlaceLocation.fromDMS("31° 00' N,87° 38' W")]))
