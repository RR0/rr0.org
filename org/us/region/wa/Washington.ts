import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { PlaceLocation } from "../../../../place/PlaceLocation"
import { usaRegion } from "../../Usa"

export const washington = usaRegion(UsaStates.wa,
  new Place([PlaceLocation.fromDMS("45°33′ N,116°55′ W"), PlaceLocation.fromDMS("49°0' N,124°46′ W")]))
