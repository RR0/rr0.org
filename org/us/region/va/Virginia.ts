import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { PlaceLocation } from "../../../../place/PlaceLocation"
import { usaRegion } from "../../Usa"

export const virginia = usaRegion(UsaStates.va, new Place([PlaceLocation.fromDMS("38°0'N, 79°0'W")]))
