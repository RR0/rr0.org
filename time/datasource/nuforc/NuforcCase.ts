import { TimeContext } from "../../TimeContext"

export enum NuforcState {
  Alaska = "AK",
  Alabama = "AL",
  Arkansas = "AR",

  /**
   * British Columbia (Canada)
   */
  BritishColumbia = "BC",

  California = "CA",
  Connecticut = "CT",
  Colorado = "CO",
  Florida = "FL",
  Illinois = "IL",
  Indiana = "IN",
  Kentucky = "KY",
  Maine = "ME",
  Maryland = "MD",
  Massachussets = "MA",
  Mississippi = "MI",
  Nebraska = "NE",
  NewHampshire = "NH",
  NewMexico = "NM",
  NorthCarolina = "NC",
  NewJersey = "NJ",
  NewYork = "NY",
  Nevada = "NV",
  Ohio = "OH",
  Oklahoma = "OK",
  Oregon = "OR",
  Pennsylvania = "PA",

  /**
   * Manitoba (Canada)
   */
  Manitoba = "MB",

  /**
   * Québec (Canada)
   */
  Quebec = "QC",

  SouthCarolina = "SC",
  Tennessee = "TN",
  Texas = "TX",
  Utah = "UT",
  Virginia = "VA",
  Vermont = "VT",
  Washington = "WA",
  Wisconsin = "WI",
  WesternVirginia = "WV",

  /**
   * Western Australia (Australia)
   */
  WesternAustralia = "WesternAustralia",

  /**
   * Telangana (India)
   */
  Telangana = "Telangana",

  /**
   * Maharashtra (India)
   */
  Maharashtra = "Maharashtra"
}

export enum NuforcCountry {
  Australia = "Australia",
  Canada = "Canada",
  India = "India",
  USA = "USA"
}

export enum NuforcShape {
  Cigar = "Cigar",
  Circle = "Circle",
  Chevron = "Chevron",
  Cone = "Cone",
  Cube = "Cube",
  Cylinder = "Cylinder",
  Changing = "Changing",
  Diamond = "Diamond",
  Disk = "Disk",
  Flash = "Flash",
  Formation = "Formation",
  Light = "Light",
  Orb = "Orb",
  Oval = "Oval",
  Other = "Other",
  Rectangle = "Rectangle",
  Sphere = "Sphere",
  Star = "Star",
  Teardrop = "Teardrop",
  Triangle = "Triangle",
  Unknown = "Unknown"
}

export type NuforcCase = {
  readonly caseNumber: number
  readonly url: URL
  readonly city: string
  readonly state: NuforcState
  readonly country: NuforcCountry
  readonly dateTime: TimeContext
  readonly shape: NuforcShape
  readonly summary: string
  readonly reportDate: Date
  readonly postDate: Date
  readonly image: boolean
}
