import { Place } from "place/Place.js"
import { UsaStates } from "../UsaStates.js"
import { PlaceLocation } from "../../../../place/PlaceLocation.js"
import { usaRegion } from "../../Usa.js"

export const hawaii = usaRegion(UsaStates.hi, new Place([PlaceLocation.fromDMS("21°28′00″N,157°58′00″W")]))
