import { Place } from "../../../../../../place/Place"
import { geneva } from "../Geneva"
import { Organization, OrganizationType } from "../../../../../Organization"
import { GenevaCityCode } from "../GenevaCityCode"

export let slocomb = new Organization(GenevaCityCode.Slocomb, [Place.fromLocation(44.896389, 6.635556)],
  OrganizationType.city, geneva)
