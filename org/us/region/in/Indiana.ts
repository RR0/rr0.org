import { Place } from "place/Place.js"
import { UsaStates } from "../UsaStates.js"
import { PlaceLocation } from "../../../../place/PlaceLocation.js"
import { usaRegion } from "../../Usa.js"

export const indiana = usaRegion(UsaStates.in, new Place([PlaceLocation.fromDMS("39°09′44″N,86°31′45″O")]))
