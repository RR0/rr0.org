import { Occupation } from "./Occupation"
import { Gender } from "@rr0/common"

export type OccupationMessages = { [key in Occupation]: (gender: Gender) => string }
