import { Place } from "place/Place"
import { UsaRegionCode } from "../UsaRegionCode"
import { PlaceLocation } from "../../../../place/PlaceLocation"
import { usaRegion } from "../../Usa"

export const wyoming = usaRegion(UsaRegionCode.wy,
  new Place([PlaceLocation.fromDMS("41°N,104°03′W"), PlaceLocation.fromDMS("45°N,111°03′W")]))
