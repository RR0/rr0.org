import { Place } from "place/Place.js"
import { UsaStates } from "../UsaStates.js"
import { PlaceLocation } from "../../../../place/PlaceLocation.js"
import { usaRegion } from "../../Usa.js"

export const westVirginia = usaRegion(UsaStates.wv, new Place([PlaceLocation.fromDMS("38°51′27″N,82°7′43″W")]))
