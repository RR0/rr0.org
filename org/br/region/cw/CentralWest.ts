import { Place } from "place/Place.js"
import { PlaceLocation } from "../../../../place/PlaceLocation.js"
import { brazilRegion } from "../../Brazil.js"
import { BrazilRegionCode } from "../BrazilRegionCode.js"

export const centralWest = brazilRegion(BrazilRegionCode.cw, new Place([PlaceLocation.fromDMS("14°47′S,53°31′O")]))
