import { centralWestCities } from "./cw/CentralWestCities"
import { southEastCities } from "./se/SouthEastCities"
import { Organization } from "../../Organization"

export const brazilCities: Organization[] = [
  ...centralWestCities,
  ...southEastCities
]
