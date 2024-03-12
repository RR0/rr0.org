import { Place } from "place/Place"
import { UsaSates } from "../UsaSates"
import { PlaceLocation } from "../../../../place/PlaceLocation"
import { usaRegion } from "../../Usa"

export const wyoming = usaRegion(UsaSates.wy,
  new Place([PlaceLocation.fromDMS("41°N,104°03′W"), PlaceLocation.fromDMS("45°N,111°03′W")]))
