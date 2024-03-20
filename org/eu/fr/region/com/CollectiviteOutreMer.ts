import { FranceRegionCode } from "../FranceRegionCode"
import { france } from "../../France"
import { Organization, OrganizationType } from "../../../../Organization"

export const collectiviteOutreMer = new Organization(FranceRegionCode.com, [], OrganizationType.region, france)
