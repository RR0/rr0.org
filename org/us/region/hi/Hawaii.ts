import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { PlaceLocation } from "../../../../place/PlaceLocation"
import { usaRegion } from "../../Usa"

export const hawaii = usaRegion(UsaStates.hi, new Place([PlaceLocation.fromDMS("21°28′00″N,157°58′00″W")]))
