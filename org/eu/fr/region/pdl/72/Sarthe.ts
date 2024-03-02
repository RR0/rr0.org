import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../../Organization"
import { paysDeLoire } from "../PaysDeLoire"

export const sarthe = new Organization(FranceDepartementCode.Sarthe, [Place.fromLocation(48, 0.316667)],
  OrganizationType.department, paysDeLoire)
