import { Place } from "../../../../../../place/Place"
import { MonroeCityCode } from "../MonroeCityCode"
import { Organization, OrganizationType } from "../../../../../Organization"
import { monroe } from "../Monroe"

export let bloomington = new Organization(MonroeCityCode.Bloomington, [Place.fromDMS("39°09′44″N,86°31′45″O")],
  OrganizationType.city, monroe)
