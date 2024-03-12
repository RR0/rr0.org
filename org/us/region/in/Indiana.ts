import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { PlaceLocation } from "../../../../place/PlaceLocation"
import { usaRegion } from "../../Usa"

export const indiana = usaRegion(UsaStates.in, new Place([PlaceLocation.fromDMS("39°09′44″N,86°31′45″O")]))
