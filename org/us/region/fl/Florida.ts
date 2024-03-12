import { Place } from "place/Place"
import { UsaSates } from "../UsaSates"
import { PlaceLocation } from "../../../../place/PlaceLocation"
import { usaRegion } from "../../Usa"

export const florida = usaRegion(UsaSates.fl,
  new Place([PlaceLocation.fromDMS("24°27'N,80° 02' W"), PlaceLocation.fromDMS("31° 00' N,87° 38' W")]))
