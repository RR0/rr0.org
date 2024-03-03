import { Place } from "../../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../../Organization"
import { eastman } from "../Eastman"
import { EastmanCityCode } from "../EastmanCityCode"

export let sundown = new Organization(EastmanCityCode.Sundown, [Place.fromDMS("49°6′13″N,96°16′0″W")],
  OrganizationType.city, eastman)
