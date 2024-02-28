import { TimeContext } from "../../TimeContext"
import { GeipanTestimonial } from "./GeipanTestimonial"

export enum GeipanClassification {
  Identified = "A",
  LikelyIdentified = "B",

  /**
   * Missing reliable info.
   */
  MissingInfo = "C",

  Unidentified = "D",
  Unidentified1 = "D1",
  Unidentified2 = "D2",
}

enum IdentifiedPhenomenon {
  ThaiLanterns = "ThaiLanterns",
}

enum DocumentType {
  pdf, mov
}

type Document = {
  type: DocumentType
  contents: any
}

type Testimonial = {}

enum SightingType {
  FromGround,
  FromSea,
  FromAir,
}

export type GeipanCase = {
  /**
   * "AAAA-MM-number"
   */
  caseNumber: string

  url: URL

  sightingType?: SightingType

  /**
   * Sighting date.
   */
  dateTime: TimeContext

  city: string

  depCode: number

  postTime: TimeContext

  classification: GeipanClassification

  summary?: string

  /**
   * Between 0 and 1
   */
  strangeness?: number

  /**
   * Between 0 and 1
   */
  consistency?: number

  description?: string

  identification?: IdentifiedPhenomenon

  documents?: Document[]
  testimonials?: GeipanTestimonial[]

  /**
   * With photo/video
   */
  withMedia?: boolean
}
