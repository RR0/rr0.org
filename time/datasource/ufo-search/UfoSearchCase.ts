import { UfoCase } from "../UfoCase"

export enum UfoSearchCaseType {
  letter = "letter",
  researchGroup = "research group",
  debriefing = "debriefing",
  historicalEvent = "historical event",
  crashRetrieval = "crash retrieval",
  atomic = "atomic",
  sighting = "sighting",
  ufoSightings = "ufo sightings"
}

export interface UfoSearchCase extends UfoCase {
  location?: string
  desc: string,
  key_vals: {
    Country?: string,
    Credibility?: number,
    Duration?: number,
    HatchDesc?: string,

    /**
     * "31.766668 35.233335"
     */
    LatLong?: string,

    /**
     * "31:46:00 N 35:14:00 E"
     */
    LatLongDMS?: string,

    Locale?: string,

    /**
     * "[Google Maps](https://www.google.com/maps/place/31.766668,35.233335)"
     */
    LocationLink?: string,

    "State/Prov"?: string,
    Strangeness?: number,
    url: URL
  },
  ref: string,

  /**
   * Search keywords for that case.
   */
  search?: string,

  source: string,
  source_id: string,
  type: UfoSearchCaseType
}
