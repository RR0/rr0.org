import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { PlaceLocation } from "../../../../place/PlaceLocation"
import { usaRegion } from "../../Usa"

export const wyoming = usaRegion(UsaStates.wy,
  new Place([PlaceLocation.fromDMS("41°0'N,104°03′W"), PlaceLocation.fromDMS("45°0'N,111°03′W")]))
