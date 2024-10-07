import { monroe_fr } from "./monroe/Monroe_fr.js"
import { RegionMessages } from "../../../country/region/RegionMessages.js"
import { elkhart_fr } from "./elkhart/Elkhart_fr.js"
import { IndianaMessages } from "./IndianaMessages.js"
import { whitley_fr } from "./whitley/Whitley_fr.js"

export const indiana_fr = RegionMessages.create<IndianaMessages>("Indiana", {
  elkhart: elkhart_fr,
  monroe: monroe_fr,
  whitley: whitley_fr
})
