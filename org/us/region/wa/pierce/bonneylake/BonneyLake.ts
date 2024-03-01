import { Place } from "../../../../../../place/Place"
import { PierceCityCode } from "../PierceCityCode"
import { Organization, OrganizationType } from "../../../../../Organization"
import { pierce } from "../Pierce"

export let bonneyLake = new Organization(PierceCityCode.BonneyLake, [Place.fromDMS("47°11′13″N 122°10′12″W")],
  OrganizationType.city, pierce)
