import { Place } from "place/Place"
import { PlaceLocation } from "../../../../place/PlaceLocation"
import { brazilRegion } from "../../Brazil"
import { BrazilRegionCode } from "../BrazilRegionCode"

export const southEast = brazilRegion(BrazilRegionCode.se, new Place([PlaceLocation.fromDMS("14°47′S,53°31′O")]))
