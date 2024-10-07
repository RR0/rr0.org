import { monroe_en } from "./monroe/Monroe_en.js"
import { elkhart_en } from "./elkhart/Elkhart_en.js"
import { RegionMessages } from "../../../country/region/RegionMessages.js"
import { IndianaMessages } from "./IndianaMessages.js"
import { whitley_en } from "./whitley/Whitley_en.js"

export const indiana_en = RegionMessages.create<IndianaMessages>("Indiana", {
  elkhart: elkhart_en,
  monroe: monroe_en,
  whitley: whitley_en
})
