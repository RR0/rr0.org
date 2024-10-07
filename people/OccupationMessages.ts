import { Occupation } from "./Occupation.js"
import { Gender } from "@rr0/common"

export type OccupationMessages = { [key in Occupation]: (gender: Gender) => string }
