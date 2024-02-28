import { TimeContext } from "../../TimeContext"
import { NuforcState } from "./NuforcState"

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
