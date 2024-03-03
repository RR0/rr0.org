import { GisborneCityCode } from "../GisborneCityCode"
import { Organization, OrganizationType } from "../../../../Organization"
import { Place } from "../../../../../place/Place"
import { gisborne } from "../Gisborne"

export let gisborne06 = new Organization(GisborneCityCode.Gisborne, [Place.fromLocation(44.896389, 6.635556)],
  OrganizationType.city, gisborne)
