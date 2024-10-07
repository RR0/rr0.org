import { Place } from "place/Place.js"
import { UsaStates } from "../UsaStates.js"
import { PlaceLocation } from "../../../../place/PlaceLocation.js"
import { usaRegion } from "../../Usa.js"

export const florida = usaRegion(UsaStates.fl,
  new Place([PlaceLocation.fromDMS("24°27'N,80° 02' W"), PlaceLocation.fromDMS("31° 00' N,87° 38' W")]))
