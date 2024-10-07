import { FranceRegionCode } from "../FranceRegionCode.js"
import { france } from "../../France.js"
import { Organization, OrganizationType } from "../../../../Organization.js"

export const collectiviteOutreMer = new Organization(FranceRegionCode.com, [], OrganizationType.region, france)
