import { Place } from "place/Place.js"
import { PlaceLocation } from "../../../../place/PlaceLocation.js"
import { brazilRegion } from "../../Brazil.js"
import { BrazilRegionCode } from "../BrazilRegionCode.js"

export const southEast = brazilRegion(BrazilRegionCode.se, new Place([PlaceLocation.fromDMS("14°47′S,53°31′O")]))
